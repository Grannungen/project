var meetingAgendaPlanner = angular.module('meetingAgendaPlanner', ['ngRoute','ngResource', 'firebase','ngDragDrop', 'ui.sortable', 'ui.calendar']);

meetingAgendaPlanner.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider      
      .when('/calendarView', {
        templateUrl: 'partials/calendarView.html',
        controller: 'calendarViewCtrl',
      })
      .when('/meeting', {
      templateUrl: 'partials/meetingView.html',
      controller: 'meetingCtrl'
      })
      .otherwise({
        redirectTo: '/calendarView'
      });
  }]);
