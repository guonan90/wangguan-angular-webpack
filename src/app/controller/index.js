/**
 * Created by qujingguo on 2017/9/28.
 */
module.exports = function (ngModule) {

    ngModule
        .controller('developerCtrl', require('./developerCtrl'))
        .controller('loginCtrl', require('./loginCtrl'))
        .controller('indexCtrl', require('./indexCtrl'))
        .controller('topCtrl', require('./topCtrl'))
        .controller('routeCtrl', require('./routingCtrl'))
        .controller('mappingCtrl', require('./mappingCtrl'))
        .controller('skipMappingCtrl', require('./skipMappingCtrl'))
        .controller('resourcesCtrl', require('./resourcesCtrl'))
        .controller('authenticationCtrl', require('./authenticationCtrl'))
        .controller('ratelimitCtrl', require('./ratelimitCtrl'))
        .controller('serverInfoCtrl', require('./serverInfoCtrl'))
        // angular.module('gatewayApp', ['ui.router', restRequest]).controller('demoCtroller',function($scope){        })

};