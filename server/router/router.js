import {Picker} from 'meteor/meteorhacks:picker';
import {PebbleTokens} from '/lib/collections/pebble_tokens.js';
import {FacebookLogins} from '/lib/collections/facebook_logins.js';
const login = require('facebook-chat-api');

function loginFromToken () {
  if (PebbleTokens.findOne({token: token}).count() === 1) {
    let account = FacebookLogins.findOne({token: token});
    if(account) {
      if(account.login_data) {
        loginSync = Meteor.wrapAsync(login);
        return loginSync({appState: login_data});
      }
    } else {
      return 'Not a valid account, please sign up';
    }
  } else {
    return 'Not a valid token';
  }
}

Picker.route('/getToken', function (params, req, res, next) {
  id = PebbleTokens.insert({});
  token = PebbleTokens.findOne(id);
  console.log(token);
  res.setHeader( 'Content-Type', 'application/json' );
  res.end( JSON.stringify({token: token.token}) );
});


Picker.route('/list', function (params, req, res, next) {
  console.log(arguments);
  fb = loginFromToken();
  fb.getThreadList(0, 5, (err, arr) => {
    res.json(arr.map((obj)=>({
      name: obj.name || obj.nicknames ?
              obj.nicknames[obj.participants[0]] :
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

timestamp = undefined;
Picker.route('/thread', function (params, req, res, next) {
  fb = loginFromToken();
  fb.getThreadHistory(req.query.threadID, 5, timestamp, (err, history) => {
    if (err) return console.error(err);
    res.json(history.map((obj) => {
      return {
        name:      obj.senderName,
        body:      obj.body,
        timestamp: obj.timestamp,
      };
    }));
  });
});
Picker.route('/send', function (params, req, res, next) {
  fb = loginFromToken();
  fb.sendMessage(req.query.message, req.query.threadID, (err, mes) => {
    if (err) {
      res.json(err);
    } else {
      res.json({
        success: true,
      });
    }
  });
});