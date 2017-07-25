import {Meteor} from 'meteor/meteor';
import {Users} from 'meteor-user-roles';
import {PebbleTokens} from '/lib/collections/pebble_tokens.js';

Meteor.publish('token_list', function () {
  return PebbleTokens.find({}, {});
});

Meteor.publish('tokens_null', function () {
  return PebbleTokens.find({_id: null}, {});
});

Meteor.publish('token', function (tokenId) {
  return PebbleTokens.find({_id: tokenId}, {});
});

