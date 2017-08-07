import {Meteor} from 'meteor/meteor';
import {Users} from 'meteor-user-roles';
import {Issues} from '/lib/collections/issues.js';

Meteor.publish('issue_list', function () {
  if(Users.isInRoles(this.userId, ['admin', 'user'])) {
    return Issues.find({}, {});
  }
  return Issues.find({createdBy: this.userId}, {});
});

Meteor.publish('issues_null', function () {
  if(Users.isInRoles(this.userId, ['admin', 'user'])) {
    return Issues.find({_id: null}, {});
  }
  return Issues.find({_id: null, createdBy: this.userId}, {});
});

Meteor.publish('issue', function (issueId) {
  if(Users.isInRoles(this.userId, ['admin', 'user'])) {
    return Issues.find({_id: issueId}, {});
  }
  return Issues.find({_id: issueId, createdBy: this.userId}, {});
});

