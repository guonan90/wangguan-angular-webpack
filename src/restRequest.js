/**
 * Created by qujg on 17/9/28.
 */
//引入angular
angular = require('angular');


//定义全局请求
module.exports = angular.module('restRequest', [])
    .service('restRequest', restRequest)
    .name;


restRequest.$inject = ['$http', '$q', 'ENV'];

function restRequest($http, $q, ENV) {
    var confObj = {};

    var request = function () {
        var deferred = $q.defer();
        // 设置请求可以携带cookie
        confObj.withCredentials = true;
        confObj.crossDomain = true
        $http(confObj)
            .then(function (res) {  
                deferred.resolve(res.data, res.status);
            }, function (error) {
                deferred.reject(error);
            });
        return deferred.promise;
    };


    this.get = function (url, params) {
        confObj = {
            method: 'GET',
            url: ENV.api + url,
            params: params
        };
        return request();
    };

    this.post = function (url, data) {
        var requestJson = {};
        requestJson.data = data;
        confObj = {
            method: 'POST',
            url: ENV.api + url,
            data: JSON.stringify(requestJson)
        };//$.param($scope.formData),  /
        return request();
    };

    this.put = function (url, data) {
        var requestJson = {};
        requestJson.data = data;
        confObj = {
            method: 'PUT',
            url: ENV.api + url,
            data: JSON.stringify(requestJson)
        };
        return request();
    };

    this.delete = function (url) {
        confObj = {
            method: 'DELETE',
            url: ENV.api + url
        };
        return request();
    }
}