meetingAgendaPlanner.controller('dragAndDropCtrl', function ($scope, $rootScope, meetingAgendaModel) {
  //controller for drag and drop
  meetingCtrlGlobal.selectedActivities = meetingAgendaModel.selectedDay._activities
  $scope.sortableOptions = {
    update: function(e, ui) {
    },
    stop: function(e, ui) {
      meetingAgendaModel.updateActivityIndex($scope.list);
    }
  };
});