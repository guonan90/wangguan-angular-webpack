/**
 * Created by qujingguo on 2017/9/28.
 */
module.exports = ['restRequest', function (restRequest) {
    var getList = function (params, u) {
        restRequest.get('v1/mapping.json',params)
        .then(u)
    };
    var deleteMapping = function (id, u) {
        restRequest.delete('v1/mapping/delete/' + id).then(u)
        // $http({
        //     method: 'DELETE',
        //     url: '/v1/mapping/delete/' + id
        //     //params: params
        // }).success(u);
    };
    var saveMapping = function (data, u) {
        restRequest.post('v1/mapping',data).then(u)
    };

    return {
        getList: getList,
        saveMapping: saveMapping,
        deleteMapping: deleteMapping

    }
}];