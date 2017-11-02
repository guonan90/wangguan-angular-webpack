/**
 * Created by qujingguo on 2017/9/28.
 */
module.exports = ['restRequest', function (restRequest) {
    var getRegistServer = function (u) {
        restRequest.get('v1/serverInfo/getRegistServer').then(u)
        // $http({
        //     method: 'GET',
        //     url: '/v1/serverInfo/getRegistServer'
        // }).success(u);
    };
    var checkStatus = function (u) {
        restRequest.get('v1/serverInfo/checkStatus').then(u)
        // $http({
        //     method: 'GET',
        //     url: '/v1/serverInfo/checkStatus'
        // }).success(u);
    };
    var start = function (data, u) {
        restRequest.post('v1/serverInfo/startServer',data).then(u)
        // $http({
        //     method: 'POST',
        //     url: '/v1/serverInfo/startServer',
        //     data: data
        // }).success(u);
    };
    var stopServers = function ( u) {
        restRequest.get('v1/serverInfo/stopServer','').then(u)
        // $http({
        //     method: 'GET',
        //     url: '/v1/serverInfo/stopServer'
        // }).success(u);
    };

    return {
        checkStatus: checkStatus,
        getRegistServer: getRegistServer,
        start: start,
        stopServers:stopServers

    }
}];