import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {createContainer} from 'meteor/react-meteor-data';
import {pathFor, menuItemClass} from '/client/lib/router_utils';
import {Loading} from '/client/pages/loading/loading.jsx';
import {PebbleTokens} from '/lib/collections/pebble_tokens.js';
import * as formUtils from '/client/lib/form_utils';
import * as objectUtils from '/lib/utils/object_utils';
import * as dateUtils from '/lib/utils/date_utils';
import * as stringUtils from '/lib/utils/string_utils';


export class TokensInsertPage extends Component {
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
			<TokensInsertPageForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
    );

  }
}

export const TokensInsertPageContainer = createContainer(function (props) {
  var isReady = function () {


    var subs = [
      Meteor.subscribe('tokens_null'),
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

      tokens_null: PebbleTokens.findOne({_id: null}, {}),
    };



  }
  return { data: data };

}, TokensInsertPage);
export class TokensInsertPageForm extends Component {
  constructor () {
    super();
    this.state = {
      tokensInsertPageFormErrorMessage: '',
      tokensInsertPageFormInfoMessage:  '',
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
		{this.state.tokensInsertPageFormErrorMessage}
	</div>
    );
  }

  renderInfoMessage () {
    return(
	<div className="alert alert-success">
		{this.state.tokensInsertPageFormInfoMessage}
	</div>
    );
  }

  onSubmit (e) {
    e.preventDefault();
    this.setState({ tokensInsertPageFormInfoMessage: '' });
    this.setState({ tokensInsertPageFormErrorMessage: '' });

    var self = this;
    var $form = $(e.target);

    function submitAction (result, msg) {
      var tokensInsertPageFormMode = 'insert';
      if(!$('#tokens-insert-page-form').find('#form-cancel-button').length) {
        switch(tokensInsertPageFormMode) {
          case 'insert': {
            $form[0].reset();
          }
            break;
          case 'update': {
            var message = msg || 'Saved.';
            self.setState({ tokensInsertPageFormInfoMessage: message });
          }
            break;
        }
      }

      FlowRouter.go('tokens', objectUtils.mergeObjects(FlowRouter.current().params, {}));
    }

    function errorAction (msg) {
      msg = msg || '';
      var message = msg.message || msg || 'Error.';
      self.setState({ tokensInsertPageFormErrorMessage: message });
    }

    formUtils.validateForm(
			$form,
			function (fieldName, fieldValue) {

},
			function (msg) {

},
			function (values) {


  Meteor.call('pebbleTokensInsert', values, function (e, r) { if(e) errorAction(e); else submitAction(r); });
}
		);

    return false;
  }

  onCancel (e) {
    e.preventDefault();
    self = this;


    FlowRouter.go('tokens', objectUtils.mergeObjects(FlowRouter.current().params, {}));
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
	<div id="tokens-insert-page-form" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
			New Token
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.tokensInsertPageFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.tokensInsertPageFormInfoMessage ? this.renderInfoMessage() : null}
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
