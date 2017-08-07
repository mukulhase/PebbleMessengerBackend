import {Meteor} from 'meteor/meteor';
import {Users} from 'meteor-user-roles';
import {Announcements} from '/lib/collections/announcements.js';

Meteor.publish('announcements', function () {
  return Announcements.find({}, {});
});

