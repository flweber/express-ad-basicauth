const express = require("express");
const ActiveDirectory = require("activedirectory2");
const basicAuth = require("basic-auth-connect");
require("./utils");

const app = express();
let config = {};
let group = null;
let editName = null;
let editPass = null;

const init = (adConf, userGroup) => {
  config = adConf;
  group = userGroup;
};

const setNameFunc = func => {
  editName = func;
};

const setPassFunc = func => {
  editPass = func;
};

const adAuth = (user, pass, cb) => {
  try {
    if (editName) user = editName(user);
    if (editPass) pass = editPass(pass);
    config.username = user;
    config.password = pass;
    const ad = new ActiveDirectory(config);
    ad.authenticate(user, pass, (err, auth) => {
      if (err) {
        try {
          switch (err.lde_message.split(":")[0]) {
            case "80090308":
              return cb(new Error("Password incorrect!"), null);
            default:
              return cb(err, null);
          }
        } catch (error) {
          return cb(
            new Error(
              JSON.stringify({
                originalError: err,
                errorWhileProcessingError: error
              }),
              null
            )
          );
        }
      }
      if (auth) {
        if (!group) {
          return cb(null, { user });
        }
        ad.isUserMemberOf(user, group, (err, isMember) => {
          if (err) return cb(err, null);
          return cb(!isMember ? new Error("Not allowed!") : null, {
            user
          });
        });
      } else {
        return cb(new Error("Not allowed!"), null);
      }
      return;
    });
  } catch (err) {
    console.log(JSON.stringify(err));
  }
};

app.use(
  basicAuth((user, pass, fn) => {
    adAuth(user, pass, fn);
  })
);

app.get("/test", (req, res) => {
  if (!res.headersSent) return res.status(200).json({ auth: true });
  return;
});

module.exports.initAd = init;
module.exports.app = app;
module.exports.editName = setNameFunc;
module.exports.editPass = setPassFunc;
