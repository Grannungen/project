meetingAgendaPlanner.controller('dragAndDropCtrl', function ($scope, $rootScope, meetingAgendaModel) {

  //controller for drag and drop

  $scope.sortableOptions = {
    update: function(e, ui) {
    },
    stop: function(e, ui) {
	meetingAgendaModel.updateActivityIndex();

    }
  };
});
