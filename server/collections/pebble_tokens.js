import {PebbleTokens} from '/lib/collections/pebble_tokens.js';

PebbleTokens.allow({
  insert: function (userId, doc) {
    return PebbleTokens.userCanInsert(userId, doc);
  },

  update: function (userId, doc, fields, modifier) {
    return PebbleTokens.userCanUpdate(userId, doc);
  },

  remove: function (userId, doc) {
    return PebbleTokens.userCanRemove(userId, doc);
  },
});

PebbleTokens.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
  doc.createdBy = userId;
  doc.modifiedAt = doc.createdAt;
  doc.modifiedBy = doc.createdBy;
  doc.token = Math.floor(Math.random() * 100000 + 1);

  if(!doc.createdBy) doc.createdBy = userId;
});

PebbleTokens.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = new Date();
  modifier.$set.modifiedBy = userId;


});

PebbleTokens.before.upsert(function (userId, selector, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = new Date();
  modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

PebbleTokens.before.remove(function (userId, doc) {

});

PebbleTokens.after.insert(function (userId, doc) {

});

PebbleTokens.after.update(function (userId, doc, fieldNames, modifier, options) {

});

PebbleTokens.after.remove(function (userId, doc) {

});
