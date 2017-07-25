import {PebbleTokens} from '/lib/collections/pebble_tokens.js';

Meteor.methods({
  'pebbleTokensInsert': function (data) {
    if(!PebbleTokens.userCanInsert(this.userId, data)) {
      throw new Meteor.Error(403, 'Forbidden.');
    }

    return PebbleTokens.insert(data);
  },

  'pebbleTokensUpdate': function (id, data) {
    var doc = PebbleTokens.findOne({ _id: id });
    if(!PebbleTokens.userCanUpdate(this.userId, doc)) {
      throw new Meteor.Error(403, 'Forbidden.');
    }

    PebbleTokens.update({ _id: id }, { $set: data });
  },

  'pebbleTokensRemove': function (id) {
    var doc = PebbleTokens.findOne({ _id: id });
    if(!PebbleTokens.userCanRemove(this.userId, doc)) {
      throw new Meteor.Error(403, 'Forbidden.');
    }

    PebbleTokens.remove({ _id: id });
  },
});
