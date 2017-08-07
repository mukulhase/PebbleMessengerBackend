import {Mongo} from 'meteor/mongo';
import {Users} from 'meteor-user-roles';

export const Announcements = new Mongo.Collection('announcements');

Announcements.userCanInsert = function (userId, doc) {
  return Users.isInRoles(userId, ['admin']);
};

Announcements.userCanUpdate = function (userId, doc) {
  return userId && Users.isInRoles(userId, ['admin']);
};

Announcements.userCanRemove = function (userId, doc) {
  return userId && Users.isInRoles(userId, ['admin']);
};
