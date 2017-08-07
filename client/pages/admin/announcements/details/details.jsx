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


export class AdminAnnouncementsDetailsPage extends Component {
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
			<AdminAnnouncementsDetailsPageForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
    );

  }
}

export const AdminAnnouncementsDetailsPageContainer = createContainer(function (props) {
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

}, AdminAnnouncementsDetailsPage);
export class AdminAnnouncementsDetailsPageForm extends Component {
  constructor () {
    super();
    this.state = {
      adminAnnouncementsDetailsPageFormErrorMessage: '',
      adminAnnouncementsDetailsPageFormInfoMessage:  '',
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
		{this.state.adminAnnouncementsDetailsPageFormErrorMessage}
	</div>
    );
  }

  renderInfoMessage () {
    return(
	<div className="alert alert-success">
		{this.state.adminAnnouncementsDetailsPageFormInfoMessage}
	</div>
    );
  }

  onSubmit (e) {
    e.preventDefault();
    this.setState({ adminAnnouncementsDetailsPageFormInfoMessage: '' });
    this.setState({ adminAnnouncementsDetailsPageFormErrorMessage: '' });

    var self = this;
    var $form = $(e.target);

    function submitAction (result, msg) {
      var adminAnnouncementsDetailsPageFormMode = 'read_only';
      if(!$('#admin-announcements-details-page-form').find('#form-cancel-button').length) {
        switch(adminAnnouncementsDetailsPageFormMode) {
          case 'insert': {
            $form[0].reset();
          } break;

          case 'update': {
            var message = msg || 'Saved.';
            self.setState({ adminAnnouncementsDetailsPageFormInfoMessage: message });
          } break;
        }
      }

			/*SUBMIT_REDIRECT*/
    }

    function errorAction (msg) {
      msg = msg || '';
      var message = msg.message || msg || 'Error.';
      self.setState({ adminAnnouncementsDetailsPageFormErrorMessage: message });
    }

    formUtils.validateForm(
			$form,
			function (fieldName, fieldValue) {

},
			function (msg) {

},
			function (values) {



}
		);

    return false;
  }

  onCancel (e) {
    e.preventDefault();
    self = this;


		/*CANCEL_REDIRECT*/
  }

  onClose (e) {
    e.preventDefault();
    self = this;

    FlowRouter.go('admin.announcements', objectUtils.mergeObjects(FlowRouter.current().params, {}));
  }

  onBack (e) {
    e.preventDefault();
    self = this;

    FlowRouter.go('admin.announcements', objectUtils.mergeObjects(FlowRouter.current().params, {}));
  }

  render () {
    return (
	<div id="admin-announcements-details-page-form" className="">
		<h2 id="component-title">
			<a href="#" id="form-back-button" className="btn btn-default" title="back" onClick={this.onBack}>
				<span className="fa fa-chevron-left">
				</span>
			</a>
			<span id="component-title-icon" className="">
			</span>
			Announcement Details
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.adminAnnouncementsDetailsPageFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.adminAnnouncementsDetailsPageFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-title">
				<label htmlFor="Title">
				</label>
				<div className="input-div">
					<p className="form-control-static  control-field-title">
						{this.props.data.announcement.Title}
					</p>
				</div>
			</div>
			<div className="form-group  field-description">
				<label htmlFor="Description">
				</label>
				<div className="input-div">
					<p className="form-control-static  control-field-description">
						{this.props.data.announcement.Description}
					</p>
				</div>
			</div>
			<div className="form-group">
				<div className="submit-div">
					<a href="#" id="form-close-button" className="btn btn-primary" onClick={this.onClose}>
						OK
					</a>
				</div>
			</div>
		</form>
	</div>
    );
  }
}
