
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
      .when('/weekView', {
        templateUrl: 'partials/weekView.html',
      })
      .when('/meetingAgendaEditor', {
        templateUrl: 'partials/meetingAgendaEditor.html',
        controller: 'meetingEditorCtrl'
      })
      .when('/testMeetingData', {
        templateUrl: 'partials/testMeetingData.html',
        controller: 'meetingEditorCtrl'
      })
      .otherwise({
        redirectTo: '/login'
      });
  }]);