import {FacebookLogins} from "/lib/collections/facebook_logins.js";

FacebookLogins.allow({
	insert: function (userId, doc) {
		return FacebookLogins.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return FacebookLogins.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return FacebookLogins.userCanRemove(userId, doc);
	}
});

FacebookLogins.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
//facebook login code here
//check if the token is subscribed

});

FacebookLogins.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

FacebookLogins.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

FacebookLogins.before.remove(function(userId, doc) {
	
});

FacebookLogins.after.insert(function(userId, doc) {
	
});

FacebookLogins.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

FacebookLogins.after.remove(function(userId, doc) {
	
});
