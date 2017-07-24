import {Mongo} from "meteor/mongo";

export const PebbleTokens = new Mongo.Collection("pebble_tokens");

PebbleTokens.userCanInsert = function(userId, doc) {
	return true;
};

PebbleTokens.userCanUpdate = function(userId, doc) {
	return true;
};

PebbleTokens.userCanRemove = function(userId, doc) {
	return true;
};
