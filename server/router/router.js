import {Picker} from 'meteor/meteorhacks:picker';
import {PebbleTokens} from '/lib/collections/pebble_tokens.js';
import {FacebookLogins} from '/lib/collections/facebook_logins.js';
let memoize = require('memoizee');
const promiseAllRecursive = require('promise-all-recursive');


const login = require('facebook-chat-api');

const jsonSend = (res) => ((obj) => {
  promiseAllRecursive(obj).then((obj)=>{
    res.setHeader( 'Content-Type', 'application/json' );
    res.end( JSON.stringify(obj) );
  });
});


function funcError (string) {
  return {
    error:   true,
    message: string,
  };
}

let loginFromToken = memoize( (token) => {
  if (PebbleTokens.findOne({token: parseInt(token)})) {
    let account = FacebookLogins.findOne({pebble_token: token});
    if(account) {
      if(account.login_data) {
        loginSync = Meteor.wrapAsync(login);
        return loginSync({appState: account.login_data});
      }
    } else {
      return funcError('Not a valid account, please sign up');
    }
  } else {
    return funcError('Not a valid token');
  }
});

Picker.route('/tokenStatus', function (params, req, res, next) {
  fb = loginFromToken(params.query.token);
  jsonSend(res)(fb);
});

Picker.route('/getToken', function (params, req, res, next) {
  id = PebbleTokens.insert({});
  token = PebbleTokens.findOne(id);
  jsonSend(res)({token: token.token});
});


Picker.route('/list', function (params, req, res, next) {
  fb = loginFromToken(params.query.token);
  if (fb.error) {
    jsonSend(res)(fb);
  }
  fb.getThreadList(0, 5, (err, arr) => {
    jsonSend(res)(arr.map((obj)=>({
      name: obj.name ||
              new Promise((resolve, reject) => {
                fb.getUserInfo(obj.participants[0], (err, user) => {
                  if (err) {
                    reject(err);
                  } else {
                    resolve(user[obj.participants[0]].name);
                  }
                });
              }),
      snippet:  obj.snippet,
      threadID: obj.threadID,
    })));
  });
});
console.log('how often?');
timestamp = undefined;
Picker.route('/thread', function (params, req, res, next) {
  fb = loginFromToken(params.query.token);
  fb.getThreadHistory(params.query.threadID, 5, timestamp, (err, history) => {
    if (err) return console.error(err);
    jsonSend(res)(history.map((obj) => {
      return {
        name:      obj.senderName,
        body:      obj.body,
        timestamp: obj.timestamp,
      };
    }));
  });
});
Picker.route('/send', function (params, req, res, next) {
  fb = loginFromToken(params.query.token);
  fb.sendMessage(params.query.message, params.query.threadID, (err, mes) => {
    if (err) {
      jsonSend(res)(err);
    } else {
      jsonSend(res)({
        success: true,
      });
    }
  });
});