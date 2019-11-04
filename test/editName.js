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

const editName = user => {
  if (!user.includes("@")) user = `${user}@domain.com`;
  return user;
};

describe("Edit username", () => {
  beforeEach(done => {
    auth.initAd(config);
    auth.editName(editName);
    server = auth.app.listen(port);
    Ad(() => {
      done();
    });
  });

  describe("#editName()", () => {
    it("should return true if the username is expanded with @domain.com", done => {
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
      }).auth("username", "password");
    });
  });

  afterEach(() => {
    server.close();
  });
});
