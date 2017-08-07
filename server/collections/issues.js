import {Issues} from '/lib/collections/issues.js';

Issues.allow({
  insert: function (userId, doc) {
    return Issues.userCanInsert(userId, doc);
  },

  update: function (userId, doc, fields, modifier) {
    return Issues.userCanUpdate(userId, doc);
  },

  remove: function (userId, doc) {
    return Issues.userCanRemove(userId, doc);
  },
});

Issues.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
  doc.createdBy = userId;
  doc.modifiedAt = doc.createdAt;
  doc.modifiedBy = doc.createdBy;


  if(!doc.createdBy) doc.createdBy = userId;
});

Issues.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = new Date();
  modifier.$set.modifiedBy = userId;


});

Issues.before.upsert(function (userId, selector, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = new Date();
  modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Issues.before.remove(function (userId, doc) {

});

Issues.after.insert(function (userId, doc) {

});

Issues.after.update(function (userId, doc, fieldNames, modifier, options) {

});

Issues.after.remove(function (userId, doc) {

});
