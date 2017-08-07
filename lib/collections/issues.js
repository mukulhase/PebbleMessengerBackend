import {Mongo} from 'meteor/mongo';

export const Issues = new Mongo.Collection('issues');

Issues.userCanInsert = function (userId, doc) {
  return Users.isInRoles(userId, ['admin', 'user']);
};

Issues.userCanUpdate = function (userId, doc) {
  return userId && (doc.createdBy == userId || Users.isInRoles(userId, ['admin']));
};

Issues.userCanRemove = function (userId, doc) {
  return userId && (doc.createdBy == userId || Users.isInRoles(userId, ['admin']));
};
