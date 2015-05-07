
var meetingAgendaPlanner = angular.module('meetingAgendaPlanner', ['ngRoute','ngResource', 'firebase','ngDragDrop', 'ui.sortable']);


meetingAgendaPlanner.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/start-log-in.html',
        controller: 'meetingEditorCtrl'
      })
      .when('/weekView', {
        templateUrl: 'partials/weekView.html',
        controller: 'meetingEditorCtrl',
	     // controller: 'weekViewCtrl'
      })
      .when('/dailyView', {
        templateUrl: 'partials/dailyView.html',
        controller: 'meetingEditorCtrl'
      
  // controller: 'dailyViewCtrl'
      })
      .when('/meetingAgendaEditor', {
        templateUrl: 'partials/meetingAgendaEditor.html',
        controller: 'meetingEditorCtrl'
      })
      .when('/testMeetingDrawer', {
        templateUrl: 'partials/testMeetingDrawer.html',
        controller: 'meetingEditorCtrl'
      })
      .when('/meeting', {
      templateUrl: 'partials/meetingView.html',
      controller: 'meetingEditorCtrl'
      })
      .when('/dnd', {
      templateUrl: 'partials/dragndroptest.html',
      controller: 'OverviewCtrl'
      })
      .when('/dnd2', {
      templateUrl: 'partials/dnd2.html',
      controller: 'MainCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);
