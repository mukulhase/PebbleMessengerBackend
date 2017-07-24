import {Mongo} from "meteor/mongo";
import {Users} from "meteor-user-roles";
export const FacebookLogins = new Mongo.Collection("facebook_logins");

FacebookLogins.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","user"]);
};

FacebookLogins.userCanUpdate = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};

FacebookLogins.userCanRemove = function(userId, doc) {
	return userId && (doc.createdBy == userId || Users.isInRoles(userId, ["admin"]));
};
