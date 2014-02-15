var should = require('../node_modules/should');
var webDriver = require('../node_modules/selenium-webdriver');
var FactoryGirl = require('factory_girl');
var driver;

FactoryGirl.define('validUser', function(){
    this.userName = 'Bond';
    this.passWord = '007';
    this.firstName = 'James';
    this.lastName = 'Bond';
});


describe('Derp-Bear', function(){
    beforeEach(function(done){
        driver = new webDriver.Builder().withCapabilities(webDriver.Capabilities.chrome()).build();
        driver.get('http://derp-bear.herokuapp.com');
        done();
    });

    afterEach(function(done){
       driver.quit().then(done);

    });

   describe('authentication', function(){
       this.timeout(60000);

       it('is in the right place', function(done){
           driver.wait(function () {
               return driver.getTitle().then(function (title) {
                   (title).should.equal("Welcome to Derp-Bear");
                   done();
               });
           }, 5000);
       });

       it('lets me log in with a valid user', function(done){
           valid_user = FactoryGirl.create('validUser');

           driver.findElement(webDriver.By.id('login_link')).click();
           driver.findElement(webDriver.By.id('username')).sendKeys(valid_user.userName);
           driver.findElement(webDriver.By.id('password')).sendKeys(valid_user.passWord);
           driver.findElement(webDriver.By.id('submit')).click();
           driver.wait(function () {
               return driver.getTitle().then(function (title) {
                   (title).should.equal("Basic Form Example");
                   done();
               });
           }, 5000);

       });
   }) ;
});