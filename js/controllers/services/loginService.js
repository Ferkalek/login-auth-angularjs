'user strict';

app.factory('loginService', function($http,$location,sessionService){
    return{
        login: function(data, scope){
            var $promise = $http.post('data/user.php',data);
            $promise.then(function(msg){
                var uid = msg.data;
                if (uid) {
                    sessionService.set('uid',uid);
                    $location.path('/home');
                } else {
                    scope.msgtext = 'Данные указаны неверно!';
                    $location.path('/login');
                }
            });
        },
        logout: function(){
            sessionService.destroy('uid');
            $location.path('/login');
        },
        isslogged: function(){
            var $checkSessionServer = $http.post('data/check_session.php');
            return $checkSessionServer;
        }
    }
});