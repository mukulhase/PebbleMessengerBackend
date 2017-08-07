import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {pathFor, menuItemClass} from '/client/lib/router_utils';
import {Loading} from '/client/pages/loading/loading.jsx';
import {Announcements} from '/lib/collections/announcements.js';
import * as formUtils from '/client/lib/form_utils';
import * as objectUtils from '/lib/utils/object_utils';
import * as dateUtils from '/lib/utils/date_utils';
import * as stringUtils from '/lib/utils/string_utils';


export class AdminAnnouncementsUpdatePage extends Component {
  constructor () {
    super();
  }

  componentWillMount () {
		/*TEMPLATE_CREATED_CODE*/
  }

  componentWillUnmount () {
		/*TEMPLATE_DESTROYED_CODE*/
  }

  componentDidMount () {
		/*TEMPLATE_RENDERED_CODE*/

    Meteor.defer(function () {
      globalOnRendered();
    });
  }

  render () {
    if(this.props.data.dataLoading) {
      return (
	<Loading />
      );
    }
    return (
	<div>
		<div className="page-container container" id="content">
			<div className="row" id="title_row">
				<div className="col-md-12">
					<div id="page_menu" className="pull-right">
					</div>
				</div>
			</div>
			<AdminAnnouncementsUpdatePageForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
    );

  }
}

export const AdminAnnouncementsUpdatePageContainer = createContainer(function (props) {
  var isReady = function () {


    var subs = [
      Meteor.subscribe('announcement', props.routeParams.announcementId),
    ];
    var ready = true;
    _.each(subs, function (sub) {
      if(!sub.ready())        {ready = false;}
    });
    return ready;
  };

  var data = { dataLoading: true };

  if(isReady()) {


    data = {

      announcement: Announcements.findOne({_id: props.routeParams.announcementId}, {}),
    };



  }
  return { data: data };

}, AdminAnnouncementsUpdatePage);
export class AdminAnnouncementsUpdatePageForm extends Component {
  constructor () {
    super();
    this.state = {
      adminAnnouncementsUpdatePageFormErrorMessage: '',
      adminAnnouncementsUpdatePageFormInfoMessage:  '',
    };

    this.renderErrorMessage = this.renderErrorMessage.bind(this);
    this.renderInfoMessage = this.renderInfoMessage.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onCancel = this.onCancel.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onBack = this.onBack.bind(this);
  }

  componentWillMount () {
		/*TEMPLATE_CREATED_CODE*/
  }

  componentWillUnmount () {
		/*TEMPLATE_DESTROYED_CODE*/
  }

  componentDidMount () {
		/*TEMPLATE_RENDERED_CODE*/

    $("select[data-role='tagsinput']").tagsinput();
    $('.bootstrap-tagsinput').addClass('form-control');
  }

  renderErrorMessage () {
    return(
	<div className="alert alert-warning">
		{this.state.adminAnnouncementsUpdatePageFormErrorMessage}
	</div>
    );
  }

  renderInfoMessage () {
    return(
	<div className="alert alert-success">
		{this.state.adminAnnouncementsUpdatePageFormInfoMessage}
	</div>
    );
  }

  onSubmit (e) {
    e.preventDefault();
    this.setState({ adminAnnouncementsUpdatePageFormInfoMessage: '' });
    this.setState({ adminAnnouncementsUpdatePageFormErrorMessage: '' });

    var self = this;
    var $form = $(e.target);

    function submitAction (result, msg) {
      var adminAnnouncementsUpdatePageFormMode = 'update';
      if(!$('#admin-announcements-update-page-form').find('#form-cancel-button').length) {
        switch(adminAnnouncementsUpdatePageFormMode) {
          case 'insert': {
            $form[0].reset();
          } break;

          case 'update': {
            var message = msg || 'Saved.';
            self.setState({ adminAnnouncementsUpdatePageFormInfoMessage: message });
          } break;
        }
      }

      FlowRouter.go('admin.announcements', objectUtils.mergeObjects(FlowRouter.current().params, {}));
    }

    function errorAction (msg) {
      msg = msg || '';
      var message = msg.message || msg || 'Error.';
      self.setState({ adminAnnouncementsUpdatePageFormErrorMessage: message });
    }

    formUtils.validateForm(
			$form,
			function (fieldName, fieldValue) {

},
			function (msg) {

},
			function (values) {


  Meteor.call('announcementsUpdate', self.props.data.announcement._id, values, function (e, r) { if(e) errorAction(e); else submitAction(r); });
}
		);

    return false;
  }

  onCancel (e) {
    e.preventDefault();
    self = this;


    FlowRouter.go('admin.announcements', objectUtils.mergeObjects(FlowRouter.current().params, {}));
  }

  onClose (e) {
    e.preventDefault();
    self = this;

		/*CLOSE_REDIRECT*/
  }

  onBack (e) {
    e.preventDefault();
    self = this;

		/*BACK_REDIRECT*/
  }

  render () {
    return (
	<div id="admin-announcements-update-page-form" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
			Edit Announcement
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.adminAnnouncementsUpdatePageFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.adminAnnouncementsUpdatePageFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-title">
				<label htmlFor="Title">
				</label>
				<div className="input-div">
					<input type="text" name="Title" defaultValue={this.props.data.announcement.Title} className="form-control " autoFocus="autoFocus" data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-description">
				<label htmlFor="Description">
				</label>
				<div className="input-div">
					<input type="text" name="Description" defaultValue={this.props.data.announcement.Description} className="form-control " data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group">
				<div className="submit-div">
					<button id="form-submit-button" className="btn btn-success" type="submit">
						<span className="fa fa-check" />
						Save
					</button>
					<a href="#" id="form-cancel-button" className="btn btn-default" onClick={this.onCancel}>
						Cancel
					</a>
				</div>
			</div>
		</form>
	</div>
    );
  }
}
