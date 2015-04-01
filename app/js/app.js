
var meetingAgendaPlanner = angular.module('meetingAgendaPlanner', ['ngRoute','ngResource']);


meetingAgendaPlanner.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/start-log-in.html',
        // controller: 'view1Ctrl'
      })
      .when('/view2', {
        templateUrl: 'partials/view2.html',
      })
      .when('/view3', {
        templateUrl: 'partials/view3.html',
      })
      .when('/meetingAgendaEditor', {
        templateUrl: 'partials/meetingAgendaEditor.html',
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);