import React, { Component } from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {Loading} from "/client/pages/loading/loading.jsx";
import {Users} from "meteor-user-roles";
import * as formUtils from "/client/lib/form_utils";
import * as objectUtils from "/lib/utils/object_utils";
import * as dateUtils from "/lib/utils/date_utils";
import * as stringUtils from "/lib/utils/string_utils";


export class AdminUsersInsertPage extends Component {
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
			<AdminUsersInsertPageInsertForm data={this.props.data} routeParams={this.props.routeParams} />
		</div>
	</div>
);
		}
	}
}

export const AdminUsersInsertPageContainer = createContainer(function(props) {
		var isReady = function() {
		

		var subs = [
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

				users_null: Users.findOne({_id:null}, {})
			};
		

		
	}
	return { data: data };

}, AdminUsersInsertPage);
export class AdminUsersInsertPageInsertForm extends Component {
	constructor () {
		super();
		this.state = {
			adminUsersInsertPageInsertFormErrorMessage: "",
			adminUsersInsertPageInsertFormInfoMessage: ""
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
		{this.state.adminUsersInsertPageInsertFormErrorMessage}
	</div>
);
	}

	renderInfoMessage() {
		return(
	<div className="alert alert-success">
		{this.state.adminUsersInsertPageInsertFormInfoMessage}
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ adminUsersInsertPageInsertFormInfoMessage: "" });
		this.setState({ adminUsersInsertPageInsertFormErrorMessage: "" });

		var self = this;
		var $form = $(e.target);

		function submitAction(result, msg) {
			var adminUsersInsertPageInsertFormMode = "insert";
			if(!$("#admin-users-insert-page-insert-form").find("#form-cancel-button").length) {
				switch(adminUsersInsertPageInsertFormMode) {
					case "insert": {
						$form[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						self.setState({ adminUsersInsertPageInsertFormInfoMessage: message });
					}; break;
				}
			}

			FlowRouter.go("admin.users", objectUtils.mergeObjects(FlowRouter.current().params, {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			self.setState({ adminUsersInsertPageInsertFormErrorMessage: message });
		}

		formUtils.validateForm(
			$form,
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("createUserAccount", values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	}

	onCancel(e) {
		e.preventDefault();
		self = this;
		

		FlowRouter.go("admin.users", objectUtils.mergeObjects(FlowRouter.current().params, {}));
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
	<div id="admin-users-insert-page-insert-form" className="">
		<h2 id="component-title">
			<span id="component-title-icon" className="">
			</span>
			Add new user
		</h2>
		<form role="form" onSubmit={this.onSubmit}>
			{this.state.adminUsersInsertPageInsertFormErrorMessage ? this.renderErrorMessage() : null}
					{this.state.adminUsersInsertPageInsertFormInfoMessage ? this.renderInfoMessage() : null}
			<div className="form-group  field-profile-name">
				<label htmlFor="profile.name">
					Name
				</label>
				<div className="input-div">
					<input type="text" name="profile.name" defaultValue="" className="form-control " autoFocus="autoFocus" required="required" data-type="string" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-profile-email">
				<label htmlFor="profile.email">
					E-mail
				</label>
				<div className="input-div">
					<input type="text" name="profile.email" defaultValue="" className="form-control " required="required" data-type="email" />
					<span id="help-text" className="help-block" />
					<span id="error-text" className="help-block" />
				</div>
			</div>
			<div className="form-group  field-password">
				<label htmlFor="password">
					Password
				</label>
				<div className="input-div">
					<input type="password" name="password" defaultValue="" className="form-control " />
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
