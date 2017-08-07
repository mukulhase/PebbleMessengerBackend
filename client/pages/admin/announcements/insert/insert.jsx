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


export class AdminAnnouncementsInsertPage extends Component {
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
			<AdminAnnouncementsInsertPageForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
    );

  }
}

export const AdminAnnouncementsInsertPageContainer = createContainer(function (props) {
  var isReady = function () {


    var subs = [
      Meteor.subscribe('announcements_null'),
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

      announcements_null: Announcements.findOne({_id: null}, {}),
    };



  }
  return { data: data };

}, AdminAnnouncementsInsertPage);
export class AdminAnnouncementsInsertPageForm extends Component {
  constructor () {
    super();
    this.state = {
      adminAnnouncementsInsertPageFormErrorMessage: '',
      adminAnnouncementsInsertPageFormInfoMessage:  '',
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
		{this.state.adminAnnouncementsInsertPageFormErrorMessage}
	</div>
    );
  }

  renderInfoMessage () {
    return(
	<div className="alert alert-success">
		{this.state.adminAnnouncementsInsertPageFormInfoMessage}
	</div>
    );
  }

  onSubmit (e) {
    e.preventDefault();
    this.setState({ adminAnnouncementsInsertPageFormInfoMessage: '' });
    this.setState({ adminAnnouncementsInsertPageFormErrorMessage: '' });

    var self = this;
    var $form = $(e.target);

    function submitAction (result, msg) {
      var adminAnnouncementsInsertPageFormMode = 'insert';
      if(!$('#admin-announcements-insert-page-form').find('#form-cancel-button').length) {
        switch(adminAnnouncementsInsertPageFormMode) {
          case 'insert': {
            $form[0].reset();
          } break;

          case 'update': {
            var message = msg || 'Saved.';
            self.setState({ adminAnnouncementsInsertPageFormInfoMessage: message });
          } break;
        }
      }

      FlowRouter.go('admin.announcements', objectUtils.mergeObjects(FlowRouter.current().params, {}));
    }

    function errorAction (msg) {
      msg = msg || '';
      var message = msg.message || msg || 'Error.';
      self.setState({ adminAnnouncementsInsertPageFormErrorMessage: message });
    }

    formUtils.validateForm(
			$form,
			function (fieldName, fieldValue) {

},
			function (msg) {

},
			function (values) {


  Meteor.call('announcementsInsert', values, function (e, r) { if(e) errorAction(e); else submitAction(r); });
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
	<div id="admin-announcements-insert-page-form" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
			New Announcement
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.adminAnnouncementsInsertPageFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.adminAnnouncementsInsertPageFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-title">
				<label htmlFor="Title">
				</label>
				<div className="input-div">
					<input type="text" name="Title" defaultValue="" className="form-control " autoFocus="autoFocus" data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-description">
				<label htmlFor="Description">
				</label>
				<div className="input-div">
					<input type="text" name="Description" defaultValue="" className="form-control " data-type="string" />
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
