/**
 * Created by qujingguo on 2017/9/28.
 */
module.exports = ['restRequest',function(restRequest){

    var getList = function (params, u) {
        restRequest.get('v1/developer.json',params).then(u)
    };

    var deleteDevelopers = function (id, u) {
        restRequest.delete('v1/developer/' + id).then(u)

    };
    var updateDevelopers = function (data, u) {
        restRequest.post('v1/developer',data).then(u)
    };


    return {
        getList: getList,
        updateDevelopers: updateDevelopers,
        deleteDevelopers: deleteDevelopers
    }


}];