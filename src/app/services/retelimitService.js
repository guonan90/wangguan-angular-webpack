/**
 * 
 */
module.exports = ['restRequest', function (restRequest) {

    var getPolicyList = function (params, u) {
        restRequest.get('v1/policy',params).then(u)
    };
    var addPolicy = function (data, u) {
        restRequest.post('v1/policy', data).then(u)
    };
    var updatePolicy = function (data, u) {
        restRequest.put('v1/policy/' + data.id, data).then(u)
    };
    var deletePolicy = function (id, u) {
        restRequest.delete('v1/policy/' + id).then(u)
    };
    return {
        getPolicyList: getPolicyList,
        addPolicy: addPolicy,
        updatePolicy: updatePolicy,
        deletePolicy: deletePolicy
    }
}]