module.exports = ['restRequest',function(restRequest){
    var getList = function (params, u) {
        restRequest.get('v1/authority.json',params).then(u)
       
    };
    var saveAuthoirty = function (data, u) {
        restRequest.post('v1/authority',data).then(u)
    };
    var deleteAuthoirtys = function (id, u) {
        restRequest.delete('v1/authority/' + id).then(u)
    };
    var getDetils = function (params, u) {
        restRequest.get('v1/authority/getDetils' ,params).then(u)
    };

    return {
        getList: getList,
        saveAuthoirty: saveAuthoirty,
        deleteAuthoirtys: deleteAuthoirtys,
        getDetils: getDetils
    }
}]