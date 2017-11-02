/**
 * Created by qujingguo on 2017/9/28.
 */
module.exports = function (ngModule) {

    ngModule
        .factory('developerService', require('./developerService'))
        .factory('loginService', require('./loginService'))
        .factory('routeService', require('./routingservice'))
        .factory('mappingService', require('./mappingService'))
        .factory('skipMappingService', require('./skipMappingService'))
        .factory('retelimitService', require('./retelimitService'))
        .factory('serviceInfo', require('./serviceInfo'))
        .factory('resourcesService', require('./resourcesService'))
        .factory('authenticationService', require('./authenticationService'))
        
    

};