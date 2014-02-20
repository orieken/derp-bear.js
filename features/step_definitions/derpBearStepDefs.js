var webDriver = require('../../node_modules/selenium-webdriver');
var FactoryGirl = require('factory_girl');

var should = require('../../node_modules/should');
var webDriver = require('../../node_modules/selenium-webdriver');

FactoryGirl.define('validUser', function () {
    this.userName = 'Bond';
    this.passWord = '007';
    this.firstName = 'James';
    this.lastName = 'Bond';
});


var derpBearStepDefs = function () {
    this.World = require('../support/world.js').World;

    var driver = new webDriver.Builder().
        withCapabilities(webDriver.Capabilities.chrome()).
        build();


    //trying out hooks
    this.Before(function (callback) {
        driver.get('http://derp-bear.herokuapp.com');
        callback();
    });

    this.After(function (callback) {
        driver.quit().then(function(){
            callback();
        });
    });

    //actual step definitions
    this.When(/^I login as a valid user$/, function (callback) {
        valid_user = FactoryGirl.create('validUser');
        driver.findElement(webDriver.By.id('login_link')).click();
        driver.findElement(webDriver.By.id('username')).sendKeys(valid_user.userName);
        driver.findElement(webDriver.By.id('password')).sendKeys(valid_user.passWord);
        driver.findElement(webDriver.By.id('submit')).click().then(function(){
        callback();
        });

    });

//        this.driver.wait(function () {
//            return this.driver.findElement(webDriver.By.css('.flash')).textContent.then(function (notice) {
//                console.log(notice);
//                callback();
//            });
//        }, 5000);

    this.Then(/^I should see that I am logged in$/, function (callback) {
        driver.wait(function () {
            return driver.findElement(webDriver.By.css('.flash')).getText().then(function (elementText) {
                (elementText).should.equal("You are now Logged in.");
            }).then(function(){
                    callback();
                });
        }, 5000);

    });

};

module.exports = derpBearStepDefs;
