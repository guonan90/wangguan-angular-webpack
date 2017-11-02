/**
 * Created by qujingguo on 2017/9/28.
 */
module.exports = ['restRequest', function (restRequest) {
    /**
     * 保存路由信息
     */
    var saveRoute = function (data, u) {
        restRequest.post('v1/route', data)
            .then(u
                // ,function(error){
                //     //此处处理请求失败信息，可以不予理会
                // }
            )

    };

    /**
     * 获取路由信息
     */
    var getList = function (params, u) {
        restRequest.get('v1/route.json', params)
            .then(u)
    }

    var deleteRoute = function (ids, u) {
        restRequest.delete('v1/route/delete/' + ids)
            .then(u)
    }

    var enable = function (id, data, u) {
        restRequest.put('v1/route/enable/' + id, data)
            .then(u)
    }
    return {
        saveRoute: saveRoute,
        getList: getList,
        deleteRoute: deleteRoute,
        enable: enable
    }
}];