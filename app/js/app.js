
var meetingAgendaPlanner = angular.module('meetingAgendaPlanner', ['ngRoute','ngResource', 'firebase','ngDragDrop', 'ui.sortable', 'ui.calendar', 'ngCookies']);


meetingAgendaPlanner.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/start-log-in.html'
      })
      .when('/calendarView', {
        templateUrl: 'partials/calendarView.html',
        controller: 'calendarViewCtrl',
      })
      .when('/meeting', {
      templateUrl: 'partials/meetingView2.html',
      controller: 'meetingCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);
