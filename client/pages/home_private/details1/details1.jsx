import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {pathFor, menuItemClass} from '/client/lib/router_utils';
import {Loading} from '/client/pages/loading/loading.jsx';
import {Issues} from '/lib/collections/issues.js';
import * as formUtils from '/client/lib/form_utils';
import * as objectUtils from '/lib/utils/object_utils';
import * as dateUtils from '/lib/utils/date_utils';
import * as stringUtils from '/lib/utils/string_utils';


export class HomePrivateDetails1Page extends Component {
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
			<HomePrivateDetails1PageForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
    );

  }
}

export const HomePrivateDetails1PageContainer = createContainer(function (props) {
  var isReady = function () {


    var subs = [
      Meteor.subscribe('issue', props.routeParams.issueId),
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

      issue: Issues.findOne({_id: props.routeParams.issueId}, {}),
    };



  }
  return { data: data };

}, HomePrivateDetails1Page);
export class HomePrivateDetails1PageForm extends Component {
  constructor () {
    super();
    this.state = {
      homePrivateDetails1PageFormErrorMessage: '',
      homePrivateDetails1PageFormInfoMessage:  '',
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
		{this.state.homePrivateDetails1PageFormErrorMessage}
	</div>
    );
  }

  renderInfoMessage () {
    return(
	<div className="alert alert-success">
		{this.state.homePrivateDetails1PageFormInfoMessage}
	</div>
    );
  }

  onSubmit (e) {
    e.preventDefault();
    this.setState({ homePrivateDetails1PageFormInfoMessage: '' });
    this.setState({ homePrivateDetails1PageFormErrorMessage: '' });

    var self = this;
    var $form = $(e.target);

    function submitAction (result, msg) {
      var homePrivateDetails1PageFormMode = 'read_only';
      if(!$('#home-private-details1page-form').find('#form-cancel-button').length) {
        switch(homePrivateDetails1PageFormMode) {
          case 'insert': {
            $form[0].reset();
          } break;

          case 'update': {
            var message = msg || 'Saved.';
            self.setState({ homePrivateDetails1PageFormInfoMessage: message });
          } break;
        }
      }

			/*SUBMIT_REDIRECT*/
    }

    function errorAction (msg) {
      msg = msg || '';
      var message = msg.message || msg || 'Error.';
      self.setState({ homePrivateDetails1PageFormErrorMessage: message });
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

    FlowRouter.go('home_private', objectUtils.mergeObjects(FlowRouter.current().params, {}));
  }

  onBack (e) {
    e.preventDefault();
    self = this;

    FlowRouter.go('home_private', objectUtils.mergeObjects(FlowRouter.current().params, {}));
  }

  render () {
    return (
	<div id="home-private-details1page-form" className="">
		<h2 id="component-title">
			<a href="#" id="form-back-button" className="btn btn-default" title="back" onClick={this.onBack}>
				<span className="fa fa-chevron-left">
				</span>
			</a>
			<span id="component-title-icon" className="">
			</span>
			Issue Details
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.homePrivateDetails1PageFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.homePrivateDetails1PageFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-issue">
				<label htmlFor="Issue">
					Issue/Feature Request
				</label>
				<div className="input-div">
					<p className="form-control-static  control-field-issue">
						{this.props.data.issue.Issue}
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
