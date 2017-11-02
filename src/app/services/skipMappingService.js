/**
 * Created by qujingguo on 2017/9/28.
 */
module.exports = ['restRequest', function (restRequest) {
    var getList = function (params, u) {
        restRequest.get('v1/skipMapping.json',params).then(u)
    };
    var deleteSkipMappings = function (id, u) {
        restRequest.delete( 'v1/skipMapping/' + id).then(u)
    };
    var saveSkipMapping = function (data, u) {
        restRequest.post('v1/skipMapping',data).then(u)
    };

    return {
        getList: getList,
        saveSkipMapping: saveSkipMapping,
        deleteSkipMappings: deleteSkipMappings

    }
}];