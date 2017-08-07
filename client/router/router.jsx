import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {mount, withOptions} from 'react-mounter';
import {LayoutContainer} from '/client/pages/layout/layout.jsx';
import {NotFound} from '/client/pages/not_found/not_found.jsx';
import {HomePublicPageContainer} from '/client/pages/home_public/home_public.jsx';
import {LoginPageContainer} from '/client/pages/login/login.jsx';
import {RegisterPageContainer} from '/client/pages/register/register.jsx';
import {VerifyEmailPageContainer} from '/client/pages/verify_email/verify_email.jsx';
import {ForgotPasswordPageContainer} from '/client/pages/forgot_password/forgot_password.jsx';
import {ResetPasswordPageContainer} from '/client/pages/reset_password/reset_password.jsx';
import {HomePrivatePageContainer} from '/client/pages/home_private/home_private.jsx';
import {HomePrivateDetailsPageContainer} from '/client/pages/home_private/details/details.jsx';
import {HomePrivateInsertPageContainer} from '/client/pages/home_private/insert/insert.jsx';
import {HomePrivateUpdatePageContainer} from '/client/pages/home_private/update/update.jsx';
import {HomePrivateDetails1PageContainer} from '/client/pages/home_private/details1/details1.jsx';
import {HomePrivateInsert1PageContainer} from '/client/pages/home_private/insert1/insert1.jsx';
import {HomePrivateUpdate1PageContainer} from '/client/pages/home_private/update1/update1.jsx';
import {AdminPageContainer} from '/client/pages/admin/admin.jsx';
import {AdminUsersPageContainer} from '/client/pages/admin/users/users.jsx';
import {AdminUsersDetailsPageContainer} from '/client/pages/admin/users/details/details.jsx';
import {AdminUsersInsertPageContainer} from '/client/pages/admin/users/insert/insert.jsx';
import {AdminUsersEditPageContainer} from '/client/pages/admin/users/edit/edit.jsx';
import {AdminAnnouncementsPageContainer} from '/client/pages/admin/announcements/announcements.jsx';
import {AdminAnnouncementsDetailsPageContainer} from '/client/pages/admin/announcements/details/details.jsx';
import {AdminAnnouncementsInsertPageContainer} from '/client/pages/admin/announcements/insert/insert.jsx';
import {AdminAnnouncementsUpdatePageContainer} from '/client/pages/admin/announcements/update/update.jsx';
import {UserSettingsPageContainer} from '/client/pages/user_settings/user_settings.jsx';
import {UserSettingsProfilePageContainer} from '/client/pages/user_settings/profile/profile.jsx';
import {UserSettingsChangePassPageContainer} from '/client/pages/user_settings/change_pass/change_pass.jsx';
import {LogoutPageContainer} from '/client/pages/logout/logout.jsx';
import {TokensPageContainer} from '/client/pages/tokens/tokens.jsx';
import {TokensDetailsPageContainer} from '/client/pages/tokens/details/details.jsx';
import {TokensInsertPageContainer} from '/client/pages/tokens/insert/insert.jsx';
import {TokensUpdatePageContainer} from '/client/pages/tokens/update/update.jsx';
/*IMPORTS*/

const reactMount = withOptions({
  rootProps: {
    className: 'react-root',
  },
}, mount);

// Wait user data to arrive
FlowRouter.wait();

// subscribe to user data
var userDataSubscription = Meteor.subscribe('current_user_data');

Tracker.autorun(function () {
  if(userDataSubscription.ready() && !FlowRouter._initialized) {
		// user data arrived, start router
    FlowRouter.initialize();
  }
});


Tracker.autorun(function () {
  var userId = Meteor.userId();
  var user = Meteor.user();
  if(userId && !user) {
    return;
  }

  var currentContext = FlowRouter.current();
  var route = currentContext.route;
  if(route) {
    if(user) {
      if(route.group.name == 'public') {
        FlowRouter.reload();
      }
    } else {
      if(route.group.name == 'private') {
        FlowRouter.reload();
      }
    }
  }
});

const publicRouteNames = [
  'home_public',
  'login',
  'register',
  'verify_email',
  'forgot_password',
  'reset_password',
];

const privateRouteNames = [
  'home_private',
  'home_private.details',
  'home_private.insert',
  'home_private.update',
  'home_private.details1',
  'home_private.insert1',
  'home_private.update1',
  'admin',
  'admin.users',
  'admin.users.details',
  'admin.users.insert',
  'admin.users.edit',
  'admin.announcements',
  'admin.announcements.details',
  'admin.announcements.insert',
  'admin.announcements.update',
  'user_settings',
  'user_settings.profile',
  'user_settings.change_pass',
  'logout',
  'tokens',
  'tokens.details',
  'tokens.insert',
  'tokens.update',
];

const freeRouteNames = [

];

const roleMap = [
	{ route: 'admin',	roles: ['admin'] },
	{ route: 'admin.users',	roles: ['admin'] },
	{ route: 'admin.users.details',	roles: ['admin'] },
	{ route: 'admin.users.insert',	roles: ['admin'] },
	{ route: 'admin.users.edit',	roles: ['admin'] },
	{ route: 'admin.announcements',	roles: ['admin'] },
	{ route: 'admin.announcements.details',	roles: ['admin'] },
	{ route: 'admin.announcements.insert',	roles: ['admin'] },
	{ route: 'admin.announcements.update',	roles: ['admin'] },
	{ route: 'user_settings',	roles: ['user', 'admin'] },
	{ route: 'user_settings.profile',	roles: ['user', 'admin'] },
	{ route: 'user_settings.change_pass',	roles: ['user', 'admin'] },
];

const firstGrantedRoute = function (preferredRoute) {
  if(preferredRoute && routeGranted(preferredRoute)) return preferredRoute;

  var grantedRoute = '';

  _.every(privateRouteNames, function (route) {
    if(routeGranted(route)) {
      grantedRoute = route;
      return false;
    }
    return true;
  });
  if(grantedRoute) return grantedRoute;

  _.every(publicRouteNames, function (route) {
    if(routeGranted(route)) {
      grantedRoute = route;
      return false;
    }
    return true;
  });
  if(grantedRoute) return grantedRoute;

  _.every(freeRouteNames, function (route) {
    if(routeGranted(route)) {
      grantedRoute = route;
      return false;
    }
    return true;
  });
  if(grantedRoute) return grantedRoute;

  if(!grantedRoute) {
    console.log('All routes are restricted for current user.');
    return 'notFound';
  }

  return '';
};

// this function returns true if user is in role allowed to access given route
export const routeGranted = function (routeName) {
  if(!routeName) {
		// route without name - enable access (?)
    return true;
  }

  if(!roleMap || roleMap.length === 0) {
		// this app doesn't have role map - enable access
    return true;
  }

  var roleMapItem = _.find(roleMap, function (roleItem) { return roleItem.route == routeName; });
  if(!roleMapItem) {
		// page is not restricted
    return true;
  }

	// if user data not arrived yet, allow route - user will be redirected anyway after his data arrive
  if(Meteor.userId() && !Meteor.user()) {
    return true;
  }

  if(!Meteor.user() || !Meteor.user().roles) {
		// user is not logged in or doesn't have "role" member
    return false;
  }

	// this page is restricted to some role(s), check if user is in one of allowedRoles
  var allowedRoles = roleMapItem.roles;
  var granted = _.intersection(allowedRoles, Meteor.user().roles);
  if(!granted || granted.length === 0) {
    return false;
  }

  return true;
};


FlowRouter.subscriptions = function () {
  this.register('current_user_data', Meteor.subscribe('current_user_data'));
};


const freeRoutes = FlowRouter.group({
  name:          'free',
  triggersEnter: [
    function (context, redirect, stop) {
      if(!routeGranted(context.route.name)) {
				// user is not in allowedRoles - redirect to first granted route
        var redirectRoute = firstGrantedRoute('');
        redirect(redirectRoute);
      }
    },
  ],
});

const publicRoutes = FlowRouter.group({
  name:          'public',
  triggersEnter: [
    function (context, redirect, stop) {
      if(Meteor.user()) {
        var redirectRoute = firstGrantedRoute('home_private');
        redirect(redirectRoute);
      }
    },
  ],
});

const privateRoutes = FlowRouter.group({
  name:          'private',
  triggersEnter: [
    function (context, redirect, stop) {
      if(!Meteor.user()) {
				// user is not logged in - redirect to public home
        var redirectRoute = firstGrantedRoute('home_public');
        redirect(redirectRoute);
      } else {
				// user is logged in - check role
        if(!routeGranted(context.route.name)) {
					// user is not in allowedRoles - redirect to first granted route
          var redirectRoute = firstGrantedRoute('home_private');
          redirect(redirectRoute);
        }
      }
    },
  ],
});

FlowRouter.notFound = {
  action () {
    reactMount(LayoutContainer, {
      content: (<NotFound />),
    });
  },
};

publicRoutes.route('/', {
  name: 'home_public',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<HomePublicPageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

publicRoutes.route('/login', {
  name: 'login',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<LoginPageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

publicRoutes.route('/register', {
  name: 'register',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<RegisterPageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

publicRoutes.route('/verify_email/:verifyEmailToken', {
  name: 'verify_email',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<VerifyEmailPageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

publicRoutes.route('/forgot_password', {
  name: 'forgot_password',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<ForgotPasswordPageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

publicRoutes.route('/reset_password/:resetPasswordToken', {
  name: 'reset_password',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<ResetPasswordPageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/home_private', {
  name: 'home_private',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<HomePrivatePageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/home_private/details/:accountId', {
  name: 'home_private.details',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<HomePrivateDetailsPageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/home_private/insert', {
  name: 'home_private.insert',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<HomePrivateInsertPageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/home_private/update/:accountId', {
  name: 'home_private.update',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<HomePrivateUpdatePageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/home_private/details1/:issueId', {
  name: 'home_private.details1',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<HomePrivateDetails1PageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/home_private/insert1', {
  name: 'home_private.insert1',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<HomePrivateInsert1PageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/home_private/update1/:issueId', {
  name: 'home_private.update1',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<HomePrivateUpdate1PageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/admin', {
  name: 'admin',

  triggersEnter: [
    function (context, redirect, stop) {
      FlowRouter.withReplaceState(function () {
        redirect('admin.users', context.params, context.queryParams);
      });

    },
  ],
  action: function (routeParams, routeQuery) {

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/admin/users', {
  name: 'admin.users',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<AdminPageContainer routeParams={routeParams} subcontent={
					<AdminUsersPageContainer routeParams={routeParams} />
				} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/admin/users/details/:userId', {
  name: 'admin.users.details',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<AdminPageContainer routeParams={routeParams} subcontent={
					<AdminUsersDetailsPageContainer routeParams={routeParams} />
				} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/admin/users/insert', {
  name: 'admin.users.insert',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<AdminPageContainer routeParams={routeParams} subcontent={
					<AdminUsersInsertPageContainer routeParams={routeParams} />
				} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/admin/users/edit/:userId', {
  name: 'admin.users.edit',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<AdminPageContainer routeParams={routeParams} subcontent={
					<AdminUsersEditPageContainer routeParams={routeParams} />
				} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/admin/announcements', {
  name: 'admin.announcements',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<AdminPageContainer routeParams={routeParams} subcontent={
					<AdminAnnouncementsPageContainer routeParams={routeParams} />
				} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/admin/announcements/details/:announcementId', {
  name: 'admin.announcements.details',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<AdminPageContainer routeParams={routeParams} subcontent={
					<AdminAnnouncementsDetailsPageContainer routeParams={routeParams} />
				} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/admin/announcements/insert', {
  name: 'admin.announcements.insert',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<AdminPageContainer routeParams={routeParams} subcontent={
					<AdminAnnouncementsInsertPageContainer routeParams={routeParams} />
				} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/admin/announcements/update/:announcementId', {
  name: 'admin.announcements.update',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<AdminPageContainer routeParams={routeParams} subcontent={
					<AdminAnnouncementsUpdatePageContainer routeParams={routeParams} />
				} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/user_settings', {
  name: 'user_settings',

  triggersEnter: [
    function (context, redirect, stop) {
      FlowRouter.withReplaceState(function () {
        redirect('user_settings.profile', context.params, context.queryParams);
      });

    },
  ],
  action: function (routeParams, routeQuery) {

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/user_settings/profile', {
  name: 'user_settings.profile',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<UserSettingsPageContainer routeParams={routeParams} subcontent={
					<UserSettingsProfilePageContainer routeParams={routeParams} />
				} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/user_settings/change_pass', {
  name: 'user_settings.change_pass',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<UserSettingsPageContainer routeParams={routeParams} subcontent={
					<UserSettingsChangePassPageContainer routeParams={routeParams} />
				} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/logout', {
  name: 'logout',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<LogoutPageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/tokens', {
  name: 'tokens',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<TokensPageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/tokens/details/:tokenId', {
  name: 'tokens.details',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<TokensDetailsPageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/tokens/insert', {
  name: 'tokens.insert',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<TokensInsertPageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});

privateRoutes.route('/tokens/update/:tokenId', {
  name: 'tokens.update',

  triggersEnter: [
    function (context, redirect, stop) {

    },
  ],
  action: function (routeParams, routeQuery) {
    	reactMount(LayoutContainer, {
      content: (
				<TokensUpdatePageContainer routeParams={routeParams} />
			),
    });

  },
  triggersExit: [
    function (context, redirect) {

    },
  ],
});
