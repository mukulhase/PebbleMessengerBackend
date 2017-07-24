import React, { Component } from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {Loading} from "/client/pages/loading/loading.jsx";
import {FacebookLogins} from "/lib/collections/facebook_logins.js";
import * as formUtils from "/client/lib/form_utils";
import * as objectUtils from "/lib/utils/object_utils";
import * as dateUtils from "/lib/utils/date_utils";
import * as stringUtils from "/lib/utils/string_utils";


export class HomePrivateUpdatePage extends Component {
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
			<HomePrivateUpdatePageForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const HomePrivateUpdatePageContainer = createContainer(function(props) {
		var isReady = function() {
		

		var subs = [
			Meteor.subscribe("account", props.routeParams.accountId)
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

				account: FacebookLogins.findOne({_id:props.routeParams.accountId}, {})
			};
		

		
	}
	return { data: data };

}, HomePrivateUpdatePage);
export class HomePrivateUpdatePageForm extends Component {
	constructor () {
		super();
		this.state = {
			homePrivateUpdatePageFormErrorMessage: "",
			homePrivateUpdatePageFormInfoMessage: ""
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
		{this.state.homePrivateUpdatePageFormErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.homePrivateUpdatePageFormInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ homePrivateUpdatePageFormInfoMessage: "" });
		this.setState({ homePrivateUpdatePageFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var homePrivateUpdatePageFormMode = "update";
			if(!$("#home-private-update-page-form").find("#form-cancel-button").length) {
				switch(homePrivateUpdatePageFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ homePrivateUpdatePageFormInfoMessage: message });
					}; break;
				}
			}

			FlowRouter.go("home_private", objectUtils.mergeObjects(FlowRouter.current().params, {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ homePrivateUpdatePageFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("facebookLoginsUpdate", self.props.data.account._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		FlowRouter.go("home_private", objectUtils.mergeObjects(FlowRouter.current().params, {}));
	}

	onClose(e) {
		e.preventDefault();
		self = this;

		/*CLOSE_REDIRECT*/
	}

	onBack(e) {
		e.preventDefault();
		self = this;

		/*BACK_REDIRECT*/
	}

	render() {
		return (
	<div id="home-private-update-page-form" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
			Edit Account
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.homePrivateUpdatePageFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.homePrivateUpdatePageFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-username">
				<label htmlFor="username">
					Facebook User Name
				</label>
				<div className="input-div">
					<input type="text" name="username" defaultValue={this.props.data.account.username} className="form-control " autoFocus="autoFocus" required="required" data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-password">
				<label htmlFor="password">
					Facebook Password
				</label>
				<div className="input-div">
					<input type="password" name="password" defaultValue={this.props.data.account.password} className="form-control " />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-pebble_token">
				<label htmlFor="pebble_token">
					Token on Watch
				</label>
				<div className="input-div">
					<input type="text" name="pebble_token" defaultValue={this.props.data.account.pebble_token} className="form-control " required="required" data-type="string" />
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
