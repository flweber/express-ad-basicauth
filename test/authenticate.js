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

describe("Authentication", () => {
  beforeEach(done => {
    auth.initAd(config);
    server = auth.app.listen(port);
    Ad(() => {
      done();
    });
  });

  describe("#authentication()", () => {
    it("should return true if the username and password are correct", done => {
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
      }).auth("username@domain.com", "password");
    });

    it("should return false if the username is empty", done => {
      request(`http://localhost:${port}/test`, null, (err, res, body) => {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(401);
        expect(body).to.contain("Unauthorized");
        done();
      }).auth("", "password");
    });

    it("should return false if the password is empty", done => {
      request(`http://localhost:${port}/test`, null, (err, res, body) => {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(401);
        expect(body).to.contain("Unauthorized");
        done();
      }).auth("username@domain.com", "");
    });

    it("should return false if the username and password are empty", done => {
      request(`http://localhost:${port}/test`, null, (err, res, body) => {
        expect(err).to.be.null;
        expect(res.statusCode).to.equal(401);
        expect(body).to.contain("Unauthorized");
        done();
      }).auth("", "");
    });
  });

  afterEach(() => {
    server.close();
  });
});
