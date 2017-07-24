import React, { Component } from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {Loading} from "/client/pages/loading/loading.jsx";
import {PebbleTokens} from "/lib/collections/pebble_tokens.js";
import * as formUtils from "/client/lib/form_utils";
import * as objectUtils from "/lib/utils/object_utils";
import * as dateUtils from "/lib/utils/date_utils";
import * as stringUtils from "/lib/utils/string_utils";


export class TokensDetailsPage extends Component {
	constructor () {
		super();
	}

	componentWillMount() {
		/*TEMPLATE_CREATED_CODE*/
	}

	componentWillUnmount() {
		/*TEMPLATE_DESTROYED_CODE*/
	}

	componentDidMount() {
		/*TEMPLATE_RENDERED_CODE*/

		Meteor.defer(function() {
			globalOnRendered();
		});
	}

	render() {
		if(this.props.data.dataLoading) {
			return (
	<Loading />
);
		} else {
			return (
	<div>
		<div className="page-container container" id="content">
			<div className="row" id="title_row">
				<div className="col-md-12">
					<div id="page_menu" className="pull-right">
					</div>
				</div>
			</div>
			<TokensDetailsPageForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const TokensDetailsPageContainer = createContainer(function(props) {
		var isReady = function() {
		

		var subs = [
			Meteor.subscribe("token", props.routeParams.tokenId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	};

	var data = { dataLoading: true };

	if(isReady()) {
		

		data = {

				token: PebbleTokens.findOne({_id:props.routeParams.tokenId}, {})
			};
		

		
	}
	return { data: data };

}, TokensDetailsPage);
export class TokensDetailsPageForm extends Component {
	constructor () {
		super();
		this.state = {
			tokensDetailsPageFormErrorMessage: "",
			tokensDetailsPageFormInfoMessage: ""
		};

		this.renderErrorMessage = this.renderErrorMessage.bind(this);
		this.renderInfoMessage = this.renderInfoMessage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
		this.onCancel = this.onCancel.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onBack = this.onBack.bind(this);
	}

	componentWillMount() {
		/*TEMPLATE_CREATED_CODE*/
	}

	componentWillUnmount() {
		/*TEMPLATE_DESTROYED_CODE*/
	}

	componentDidMount() {
		/*TEMPLATE_RENDERED_CODE*/

		$("select[data-role='tagsinput']").tagsinput();
		$(".bootstrap-tagsinput").addClass("form-control");
	}

	renderErrorMessage() {
		return(
	<div className="alert alert-warning">
		{this.state.tokensDetailsPageFormErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.tokensDetailsPageFormInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ tokensDetailsPageFormInfoMessage: "" });
		this.setState({ tokensDetailsPageFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var tokensDetailsPageFormMode = "read_only";
			if(!$("#tokens-details-page-form").find("#form-cancel-button").length) {
				switch(tokensDetailsPageFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ tokensDetailsPageFormInfoMessage: message });
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ tokensDetailsPageFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		/*CANCEL_REDIRECT*/
	}

	onClose(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("tokens", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		FlowRouter.go("tokens", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	render() {
		return (
	<div id="tokens-details-page-form" className="">
		<h2 id="component-title">
			<a href="#" id="form-back-button" className="btn btn-default" title="back" onClick={this.onBack}>
				<span className="fa fa-chevron-left">
				</span>
			</a>
			<span id="component-title-icon" className="">
			</span>
			Token Details
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.tokensDetailsPageFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.tokensDetailsPageFormInfoMessage ? this.renderInfoMessage() : null}
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
