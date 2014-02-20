var should = require('../node_modules/should');
var webDriver = require('../node_modules/selenium-webdriver');
var casual = require('casual');
var driver;

var FactoryGirl = require('../node_modules/factory_girl');

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




describe('Derp-Bear', function () {

    beforeEach(function (done) {
        driver = new webDriver.Builder().withCapabilities(webDriver.Capabilities.chrome()).build();
        driver.get('http://derp-bear.herokuapp.com');
        done();
    });

    afterEach(function (done) {
        driver.quit().then(function(){
            done();
        });
    });

    describe('authentication', function () {
        var valid_user = FactoryGirl.create('validUser');
        this.timeout(60000);

        it('is in the right place', function (done) {
            driver.wait(function () {
                return driver.getTitle().then(function (title) {
                    (title).should.equal("Welcome to Derp-Bear");
                }).then(function(){
                        done();
                    });
            }, 5000);
        });

        it('shows me as logged in', function (done) {
            driver.findElement(webDriver.By.id('login_link')).click();
            driver.findElement(webDriver.By.id('username')).sendKeys(valid_user.userName);
            driver.findElement(webDriver.By.id('password')).sendKeys(valid_user.passWord);
            driver.findElement(webDriver.By.id('submit')).click();
            driver.wait(function () {
                return driver.findElement(webDriver.By.className('flash')).getText().then(function (notice) {
                    (notice).should.equal("You are now Logged in.");

                }).then(function(){
                        done();
                    });
            }, 5000);
        });

        it('submit form after login', function(done){
            driver.findElement(webDriver.By.id('login_link')).click();
            driver.findElement(webDriver.By.id('username')).sendKeys(valid_user.userName);
            driver.findElement(webDriver.By.id('password')).sendKeys(valid_user.passWord);
            driver.findElement(webDriver.By.id('submit')).click();
            driver.wait(function () {
                driver.findElement(webDriver.By.id('first_name')).sendKeys(valid_user.firstName);
                driver.findElement(webDriver.By.id('last_name')).sendKeys(valid_user.lastName);
                driver.findElement(webDriver.By.id('email')).sendKeys(valid_user.emailAddress);
                driver.findElement(webDriver.By.id('website_url')).sendKeys(valid_user.websiteUrl);
                driver.findElement(webDriver.By.tagName('button')).click().then(function(){
                    driver.findElement(webDriver.By.linkText(valid_user.pet)).click();

                });
                driver.findElement(webDriver.By.id('date_of_birth')).sendKeys(valid_user.dob).then(function(wdElement){

                });
//                driver.findElement(webDriver.By.id(valid_user.sex)).click();
//                driver.findElement(webDriver.By.id(valid_user.work)).click();
                driver.findElement(webDriver.By.id('free_text_area')).sendKeys(valid_user.freeText);

                driver.findElement(webDriver.By.id('submit_button')).click().then(function(){
                    done();
                });
            }, 5000);
        })
    });
});