import React, { Component } from "react";
import PropTypes from "prop-types";
import {createContainer} from "meteor/react-meteor-data";
import {Meteor} from "meteor/meteor";
import {pathFor, menuItemClass} from "/client/lib/router_utils";
import {Loading} from "/client/pages/loading/loading.jsx";


export class VerifyEmailPage extends Component {
	constructor () {
		super();
		this.state = {
			errorMessage: ""
		};
		this.renderErrorMessage = this.renderErrorMessage.bind(this);
		this.onSubmit = this.onSubmit.bind(this);
	}

	componentWillMount() {
		/*TEMPLATE_CREATED_CODE*/
	}

	componentWillUnmount() {
		/*TEMPLATE_DESTROYED_CODE*/
	}

	componentDidMount() {
		let self = this;

		this.setState({ errorMessage: "" });

		let verifyEmailToken = FlowRouter.current().params.verifyEmailToken;
		if(verifyEmailToken) {
			Accounts.verifyEmail(verifyEmailToken, function(err) {
				if(err) {
					self.setState({ errorMessage: err.message });
				}
			});
		} else {
			self.setState({ errorMessage: "Verification token not found." });
		}

		/*TEMPLATE_RENDERED_CODE*/

		Meteor.defer(function() {
			globalOnRendered();
		});
	}

	renderErrorMessage() {
		return (
	<div className="accounts-info-box">
		<h2>
			Verify e-mail
		</h2>
		<div className="alert alert-warning">
			{this.state.errorMessage}
		</div>
		<a href={pathFor('login')} className="btn btn-lg btn-primary btn-block">
			OK
		</a>
	</div>
);
	}

	onSubmit(e) {
		e.preventDefault();
		this.setState({ errorMessage: "" });

		let self = this;

		let submitButton = $(e.target).find("button[type='submit']");

		getFormData(e.target, {
			onSuccess: function(values) {
				submitButton.button("loading");
				Meteor.loginWithPassword(values.email, values.password, function(err) {
					submitButton.button("reset");
					if(err) {
						self.setState({ errorMessage: err.message });
						return false;
					}
				});
			},
			onError: function(message) {
				self.setState({ errorMessage: message });
			},
			fields: {
				email: { type: "email", required: true },
				password: { required: true }
			}
		});

		return false;
	}

	render() {
		if(this.props.data.dataLoading) {
			return (
	<Loading />
);
		} else {
			return (
	<div className="page-container container" id="content">
		<div className="account-form">
			{this.state.errorMessage ? this.renderErrorMessage() : null}
		</div>
	</div>
);
		}
	}
}

export const VerifyEmailPageContainer = createContainer(function(props) {
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

			};
		

		
	}
	return { data: data };

}, VerifyEmailPage);
