'user strict';

app.controller('registrationCtrl', function($scope, $http, $location){
    $scope.msgtext = '';
    $scope.registration = function(user) {
        //console.log(user.pass1);
        if (user.pass1 == user.pass2) {
            $http.post('data/registration.php',user)
                .success(function(data){
                    $scope.msgtext = data;
                    if (data.bool == 'true') {
                        console.log(data);
                        console.log(data.msg);
                        $location.path('/home');
                    }
                })
                .error(function(data){
                    $scope.msgtext = data;
                });
        } else {
            $scope.msgtext = 'Пароль не совпадает!';
        }


    }
});