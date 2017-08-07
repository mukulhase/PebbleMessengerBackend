import {Announcements} from '/lib/collections/announcements.js';

Meteor.methods({
  'announcementsInsert': function (data) {
    if(!Announcements.userCanInsert(this.userId, data)) {
      throw new Meteor.Error(403, 'Forbidden.');
    }

    return Announcements.insert(data);
  },

  'announcementsUpdate': function (id, data) {
    var doc = Announcements.findOne({ _id: id });
    if(!Announcements.userCanUpdate(this.userId, doc)) {
      throw new Meteor.Error(403, 'Forbidden.');
    }

    Announcements.update({ _id: id }, { $set: data });
  },

  'announcementsRemove': function (id) {
    var doc = Announcements.findOne({ _id: id });
    if(!Announcements.userCanRemove(this.userId, doc)) {
      throw new Meteor.Error(403, 'Forbidden.');
    }

    Announcements.remove({ _id: id });
  },
});
