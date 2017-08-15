import {FacebookLogins} from '/lib/collections/facebook_logins.js';

Meteor.methods({
  'facebookLoginsInsert': function (data) {
    if(!FacebookLogins.userCanInsert(this.userId, data)) {
      throw new Meteor.Error(403, 'Invalid Token/User not authorized');
    }

    return FacebookLogins.insert(data);
  },

  'facebookLoginsUpdate': function (id, data) {
    var doc = FacebookLogins.findOne({ _id: id });
    if(!FacebookLogins.userCanUpdate(this.userId, data)) {
      throw new Meteor.Error(403, 'Invalid Token/User not authorized');
    }

    FacebookLogins.update({ _id: id }, { $set: data });
  },

  'facebookLoginsRemove': function (id) {
    var doc = FacebookLogins.findOne({ _id: id });
    if(!FacebookLogins.userCanRemove(this.userId, doc)) {
      throw new Meteor.Error(403, 'Forbidden.');
    }

    FacebookLogins.remove({ _id: id });
  },
  'facebookLoginsRetry': function (id) {
    FacebookLogins.update({ _id: id }, {});
  },
});
