
var webDriver = require('../../node_modules/selenium-webdriver');
//var FactoryGirl = require('factory_girl');


var World = function World(callback){
    this.driver = new webDriver.Builder()
        .withCapabilities(webDriver.Capabilities.chrome()).
        build();

    callback();
};
module.exports.World = World;