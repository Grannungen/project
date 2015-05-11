meetingAgendaPlanner.controller('dragAndDropCtrl', function ($scope, $rootScope, meetingAgendaModel) {
  var tmpList = [];
  for (var i = 1; i <= 6; i++){
    tmpList.push({
      text: 'Itemene ' + i,
      value: i
    });
  }
  // alert($rootScope.variables.selectedDay.getName())
  // $scope.list = tmpList;
  // $scope.list = $rootScope.variables.selectedDay._activities;
  $scope.list = meetingAgendaModel.selectedDay._activities;

  
  $scope.sortingLog = [];
  
  $scope.sortableOptions = {
    update: function(e, ui) {
      // var logEntry = tmpList.map(function(i){
      //   return i.value;
      // }).join(', ');
      // $scope.sortingLog.push('Update: ' + logEntry);
    },
    stop: function(e, ui) {
      // this callback has the changed model
      // var logEntry = tmpList.map(function(i){
      //   return i.value;
      // }).join(', ');
      // $scope.sortingLog.push('Stop: ' + logEntry);
      console.log($scope.list)
      meetingAgendaModel.updateActivityIndex($scope.list);
      
    }

  };
});