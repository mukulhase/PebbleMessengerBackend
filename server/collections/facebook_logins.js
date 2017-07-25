import {FacebookLogins} from '/lib/collections/facebook_logins.js';
import {PebbleTokens} from '/lib/collections/pebble_tokens.js';
const login = require('facebook-chat-api');

FacebookLogins.allow({
  insert: function (userId, doc) {
    if(!PebbleTokens.findOne(doc.token)){
      return false;
    }
    return FacebookLogins.userCanInsert(userId, doc);
  },

  update: function (userId, doc, fields, modifier) {
    return FacebookLogins.userCanUpdate(userId, doc);
  },

  remove: function (userId, doc) {
    return FacebookLogins.userCanRemove(userId, doc);
  },
});

function tryLogin (username, password) {
  var credentials = {email: username, password: password};
  let loginSync = Meteor.wrapAsync(login);
  try{
    api = loginSync(credentials);
  }
  catch(e) {
    return false;
  }
  return api.getAppState();
}

FacebookLogins.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
  doc.createdBy = userId;
  doc.modifiedAt = doc.createdAt;
  doc.modifiedBy = doc.createdBy;
  doc.login_data = tryLogin(doc.username, doc.password);
  if(!doc.createdBy) doc.createdBy = userId;
//facebook login code here
//check if the token is subscribed

});

FacebookLogins.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = new Date();
  modifier.$set.modifiedBy = userId;
  modifier.$set.login_data = tryLogin(modifier.$set.username, modifier.$set.password);
});

FacebookLogins.before.upsert(function (userId, selector, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = new Date();
  modifier.$set.modifiedBy = userId;


	/*BEFORE_UPSERT_CODE*/
});

FacebookLogins.before.remove(function (userId, doc) {

});

FacebookLogins.after.insert(function (userId, doc) {

});

FacebookLogins.after.update(function (userId, doc, fieldNames, modifier, options) {

});

FacebookLogins.after.remove(function (userId, doc) {

});
