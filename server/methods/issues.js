import {Issues} from '/lib/collections/issues.js';

Meteor.methods({
  'issuesInsert': function (data) {
    if(!Issues.userCanInsert(this.userId, data)) {
      throw new Meteor.Error(403, 'Forbidden.');
    }

    return Issues.insert(data);
  },

  'issuesUpdate': function (id, data) {
    var doc = Issues.findOne({ _id: id });
    if(!Issues.userCanUpdate(this.userId, doc)) {
      throw new Meteor.Error(403, 'Forbidden.');
    }

    Issues.update({ _id: id }, { $set: data });
  },

  'issuesRemove': function (id) {
    var doc = Issues.findOne({ _id: id });
    if(!Issues.userCanRemove(this.userId, doc)) {
      throw new Meteor.Error(403, 'Forbidden.');
    }

    Issues.remove({ _id: id });
  },
});
