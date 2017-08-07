import {Meteor} from 'meteor/meteor';
import {Users} from 'meteor-user-roles';
import {Announcements} from '/lib/collections/announcements.js';

Meteor.publish('announcements', function () {
  return Announcements.find({}, {});
});

Meteor.publish('announcement_list', function () {
  return Announcements.find({}, {});
});

Meteor.publish('announcements_null', function () {
  return Announcements.find({_id: null}, {});
});

Meteor.publish('announcement', function (announcementId) {
  return Announcements.find({_id: announcementId}, {});
});

