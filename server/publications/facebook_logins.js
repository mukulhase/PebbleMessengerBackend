import {Meteor} from "meteor/meteor";
import {Users} from "meteor-user-roles";
import {FacebookLogins} from "/lib/collections/facebook_logins.js";

Meteor.publish("fb_login", function() {
	if(Users.isInRoles(this.userId, ["admin"])) {
		return FacebookLogins.find({}, {});
	}
	return FacebookLogins.find({createdBy:this.userId}, {});
});

Meteor.publish("account_list", function() {
	if(Users.isInRoles(this.userId, ["admin"])) {
		return FacebookLogins.find({}, {});
	}
	return FacebookLogins.find({createdBy:this.userId}, {});
});

Meteor.publish("accounts_null", function() {
	if(Users.isInRoles(this.userId, ["admin"])) {
		return FacebookLogins.find({_id:null}, {});
	}
	return FacebookLogins.find({_id:null,createdBy:this.userId}, {});
});

Meteor.publish("account", function(accountId) {
	if(Users.isInRoles(this.userId, ["admin"])) {
		return FacebookLogins.find({_id:accountId}, {});
	}
	return FacebookLogins.find({_id:accountId,createdBy:this.userId}, {});
});

