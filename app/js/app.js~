
var meetingAgendaPlanner = angular.module('meetingAgendaPlanner', ['ngRoute','ngResource']);


meetingAgendaPlanner.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider
      .when('/login', {
        templateUrl: 'partials/start-log-in.html',
        // controller: 'view1Ctrl'
      })
      .when('/weekView', {
        templateUrl: 'partials/weekView.html',

	controller: 'weekViewCtrl'
      })
      .when('/dailyView', {
        templateUrl: 'partials/dailyView.html',
      
  controller: 'dailyViewCtrl'
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
      .otherwise({
        redirectTo: '/login'
      });
  }]);
