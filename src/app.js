var $ = require('jquery');

angular = require('angular'); // 引入angular
// 引入angular-ui-router
require('angular-ui-router');

require('angular-ui-load');

require('angular-animate');

require('echarts');

restRequest = require('./restRequest.js');

//  var $=require('jquery');//.noConflict();

require('./js/bootstrap-paginator') // 分页
var BPDefaultOptions = require('./js/pagerHaper')

//css less                  test: /\.css$/,


var ngModule = angular.module('gatewayApp', ['ui.router', restRequest])
   

require('./constant.js')(ngModule) //全局变量

require('./route.js')(ngModule); // 引入路由文件

require('./app/services')(ngModule); // services请求数据

require('./app/controller')(ngModule); // 控制器

require('./css/index.less');
require('./css/reset.css');
require('./css/pager.css');
require('./css/global.css');
require('./css/aside.less');
require('./css/header.less');
require('./css/routing.less');
require('./css/developer.less');
require('./css/mapping.less');
require('./css/skipMapping.less');
require('./css/resources.less');
require('./css/authentication.less');
require('./css/ratelimit.less');
require('./css/chart.less');