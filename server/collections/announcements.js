import {Announcements} from '/lib/collections/announcements.js';

Announcements.allow({
  insert: function (userId, doc) {
    return Announcements.userCanInsert(userId, doc);
  },

  update: function (userId, doc, fields, modifier) {
    return Announcements.userCanUpdate(userId, doc);
  },

  remove: function (userId, doc) {
    return Announcements.userCanRemove(userId, doc);
  },
});

Announcements.before.insert(function (userId, doc) {
  doc.createdAt = new Date();
  doc.createdBy = userId;
  doc.modifiedAt = doc.createdAt;
  doc.modifiedBy = doc.createdBy;


  if(!doc.createdBy) doc.createdBy = userId;
});

Announcements.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = new Date();
  modifier.$set.modifiedBy = userId;


});

Announcements.before.upsert(function (userId, selector, modifier, options) {
  modifier.$set = modifier.$set || {};
  modifier.$set.modifiedAt = new Date();
  modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Announcements.before.remove(function (userId, doc) {

});

Announcements.after.insert(function (userId, doc) {

});

Announcements.after.update(function (userId, doc, fieldNames, modifier, options) {

});

Announcements.after.remove(function (userId, doc) {

});
