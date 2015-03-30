
var meetingAgendaPlanner = angular.module('meetingAgendaPlanner', ['ngRoute','ngResource']);


meetingAgendaPlanner.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/view1', {
        templateUrl: 'partials/view1.html',
        controller: 'view1Ctrl'
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
        redirectTo: '/view1'
      });
  }]);