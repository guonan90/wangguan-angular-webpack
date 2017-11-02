/**
 * Created by qujingguo on 2017/9/28.
 */
module.exports = [
    '$scope',
    'loginService',
    '$state',
  
    '$stateParams',
    function ($scope, loginService, $state, $stateParams) {

        function load() {
            if (localStorage.token) {
                $state.go('index');
                return;
            }else{

            }
        }
        load()

        $scope.user = {
            loginUsername: "",
            loginPassword: ""
        };

        $scope.unamecr=function (e) {
            if (e.which == 13) { // enter key event
                // $("input[name=loginPassword]").focus();
                angular.element(document).find('[name="loginPassword"]').focus(); 
            }
        }
        $scope.upasscr=function (e) {
            
            if (e.which == 13) { // enter key event
                // $("#loginBtn").click();
                $scope.login();
            }
        }

        //function load() {
        //    if (localStorage.getItem('login')) {
        //        $('.body').show();
        //        $('.login').hide();
        //    }
        //}
        //
        //load()

        //debugger
        $scope.login = function () {
            if(!$scope.loginform.$valid)
                return
            if ($scope.user.username === '') {
                alert('请输入用户名');
                return
            } else if ($scope.user.password === '') {
                alert('请输入密码');
                return
            } else {
                // $state.go('index')
              
                loginService.login($scope.user, function (result) {
                    if (result.success) {
                        localStorage.setItem("token", result.data);//后台获取
                        var from = $stateParams["from"];
                        $state.go(from && from != "login" ? from : 'index');
                        // var loginCache = $cacheFactory('login');
                        // loginCache.put("login", result);
                        // $state.go('index')
                    } else {
                        alert(result.errorMessage);
                        $scope.user = {}
                    }
                });
            }
        }


    }
];