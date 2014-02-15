var derpBearStepDefs = function () {
    var should = require('../../node_modules/should');
    var webDriver = require('../../node_modules/selenium-webdriver');
    this.World = require('../support/world.js').World;

    //actual step definitions
    this.When(/^I login as a valid user$/, function (callback) {

        callback.pending();
    });

    this.Then(/^I should see that I am logged in$/, function (callback) {

        callback.pending();
    });

};

module.exports = derpBearStepDefs;
