"use strict";
/* eslint-env node, mocha */
/* eslint-disable no-unused-expressions */

const expect = require("chai").expect;
const request = require("request");
const config = require("./config");
const auth = require("../src/index");
const Ad = require("./mockServer");

const port = 3000;

let server = null;

const editPass = password => {
  return password.toLowerCase();
};

describe("Edit password", () => {
  beforeEach(done => {
    auth.initAd(config);
    auth.editPass(editPass);
    server = auth.app.listen(port);
    Ad(() => {
      done();
    });
  });

  describe("#editPass()", () => {
    it("should return true if the password is corrected", done => {
      request(`http://localhost:${port}/test`, null, (err, res, body) => {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(200);
        try {
          body = JSON.parse(body);
        } catch (parsingErr) {
          // Do nothing, test will fail
        }
        expect(body).to.be.an("object");
        done();
      }).auth("username", "PASSWORD");
    });
  });

  afterEach(() => {
    server.close();
  });
});
