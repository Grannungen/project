
var meetingAgendaPlanner = angular.module('meetingAgendaPlanner', ['ngRoute','ngResource', 'firebase','ngDragDrop', 'ui.sortable', 'ui.calendar']);


meetingAgendaPlanner.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/start-log-in.html',
        controller: 'meetingEditorCtrl'
      })

      
      .when('/calendarView', {
        templateUrl: 'partials/calendarView.html',
        controller: 'calendarViewCtrl',
       // controller: 'weekViewCtrl'
      })
     
      .when('/meetingAgendaEditor', {
        templateUrl: 'partials/meetingAgendaEditor.html',
        controller: 'meetingEditorCtrl'
      })

      .when('/meeting', {
      templateUrl: 'partials/meetingView2.html',
      controller: 'meetingCtrl'
      })
      .when('/dnd', {
      templateUrl: 'partials/dragndroptest.html',
      controller: 'OverviewCtrl'
      })
      .when('/dnd2', {
      templateUrl: 'partials/dnd2.html',
      controller: 'MainCtrl'
      })
      .when('/firebase', {
      templateUrl: 'partials/firebaseTest.html',
      controller: 'firebaseTestCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);
