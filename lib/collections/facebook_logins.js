import {Mongo} from 'meteor/mongo';
import {Users} from 'meteor-user-roles';
import {PebbleTokens} from '/lib/collections/pebble_tokens.js';

export const FacebookLogins = new Mongo.Collection('facebook_logins');

FacebookLogins.userCanInsert = function (userId, doc) {
  if(!PebbleTokens.findOne({token: parseInt(doc.pebble_token)})) {
    return false;
  }
  return Users.isInRoles(userId, ['admin', 'user']);
};

FacebookLogins.userCanUpdate = function (userId, doc) {

  if(!PebbleTokens.findOne({token: parseInt(doc.pebble_token)})) {
    return false;
  }
  return userId && (doc.createdBy === userId || Users.isInRoles(userId, ['admin']));
};

FacebookLogins.userCanRemove = function (userId, doc) {
  return userId && (doc.createdBy === userId || Users.isInRoles(userId, ['admin']));
};
