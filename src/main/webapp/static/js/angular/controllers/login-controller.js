/**
 * LoginController
 * 
 * @autor thiago-amm
 * @version v1.0.0
 * @date 21/09/2017
 */

var app = angular.module('WebApp');

app.controller('LoginController', function($scope, $api, $alerta) {
   $scope.login = function(usuario) {
      $api.login(usuario).success(function(response) {
         window.location = '/webapp/admin';
      }).error(function(response) {
         $alerta.erro('Usuário ou senha inválidos!');
      });
   };
});
