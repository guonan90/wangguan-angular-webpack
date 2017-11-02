module.exports = ['restRequest', function (restRequest) {
    var getList = function (params, u) {
        restRequest.get('v1/resource.json',params).then(u)
    };
    var deleteResources = function (id, u) {
        restRequest.delete('v1/resource/delete/' + id).then(u)
    };
    var saveResources = function (data, u) {
        restRequest.post('v1/resource/bacth',data).then(u)
    };

    var getTreeLit = function (u) {
        restRequest.get('v1/resource/getzTree','').then(u)
    };
    var getDetils = function (params, u) {
        restRequest.get('v1/resource/getDetils',params).then(u)
    };

    return {
        getList: getList,
        saveResources: saveResources,
        deleteResources: deleteResources,
        getTreeLit: getTreeLit,
        getDetils: getDetils

    }
}]