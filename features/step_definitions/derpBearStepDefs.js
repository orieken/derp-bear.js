var should = require('../../node_modules/should');
var webDriver = require('../../node_modules/selenium-webdriver');
var driver;

var casual = require('../../node_modules/casual');
var FactoryGirl = require('../../node_modules/factory_girl');


FactoryGirl.define('validUser', function () {
    this.userName = 'Bond';
    this.passWord = '007';
    this.firstName = 'James';
    this.lastName = 'Bond';
    this.emailAddress = 'james.bond@example.com';
    this.websiteUrl = 'http://www.example.com';
    this.pet = 'Snake';
    this.dob = '01/01/1971';
    this.sex = 'male';
    this.work = 'car';
    this.freeText = casual.short_description
});


var derpBearStepDefs = function () {
    this.World = require('../support/world.js').World;

// need to move this into hooks.js


    //trying out hooks
    this.Before(function (callback) {
        valid_user = FactoryGirl.create('validUser');
        driver = new webDriver.Builder().
            withCapabilities(webDriver.Capabilities.chrome()).
            build();
        driver.get('http://derp-bear.herokuapp.com').then(function () {
            callback();
        });
    });

    this.After(function (callback) {
        driver.quit().then(function () {
            callback();
        });
    });

    //actual step definitions
    this.When(/^I login as a valid user$/, function (callback) {
        driver.findElement(webDriver.By.id('login_link')).click();
        driver.findElement(webDriver.By.id('username')).sendKeys(valid_user.userName);
        driver.findElement(webDriver.By.id('password')).sendKeys(valid_user.passWord);
        driver.findElement(webDriver.By.id('submit')).click().then(function () {
            callback();
        });

    });

    this.Then(/^I should see that I am logged in$/, function (callback) {
        driver.wait(function () {
            return driver.findElement(webDriver.By.css('.flash')).getText().then(function (elementText) {
                (elementText).should.equal("You are now Logged in.");
            }).then(function () {
                    callback();
                });
        }, 5000);
    });

    this.When(/^I submit the basic form example$/, function (callback) {
        driver.wait(function () {
            driver.findElement(webDriver.By.id('first_name')).sendKeys(valid_user.firstName);
            driver.findElement(webDriver.By.id('last_name')).sendKeys(valid_user.lastName);
            driver.findElement(webDriver.By.id('email')).sendKeys(valid_user.emailAddress);
            driver.findElement(webDriver.By.id('website_url')).sendKeys(valid_user.websiteUrl);
            driver.findElement(webDriver.By.tagName('button')).click().then(function () {
                driver.findElement(webDriver.By.linkText(valid_user.pet)).click();
            });
            driver.findElement(webDriver.By.id('date_of_birth')).sendKeys(valid_user.dob);
            driver.findElement(webDriver.By.css('label[for=' + valid_user.sex + ']')).click();
            driver.findElement(webDriver.By.css('label[for=' + valid_user.work + ']')).click();
            driver.findElement(webDriver.By.id('free_text_area')).sendKeys(valid_user.freeText);
            driver.findElement(webDriver.By.id('submit_button')).click().then(function () {
                callback();
            });
        }, 10000);
    });

    this.Then(/^I should see the thank you message$/, function (callback) {
        driver.wait(function () {
            return driver.findElement(webDriver.By.tagName('h1')).getText().then(function (successMessage) {
                (successMessage).should.equal('Thank you for submitting the form');
            }).then(function () {
                    callback();
                });
        }, 5000);
    });

};

module.exports = derpBearStepDefs;
