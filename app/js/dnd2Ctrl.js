meetingAgendaPlanner.controller('MainCtrl', function ($scope) {

  $scope.items = [{
    name: 'item 1'
  }, {
    name: 'item 2'
  }, {
    name: 'item 3'
  }, {
    name: 'item 4'
  }, {
    name: 'item 5'
  }, {
    name: 'item 6'
  }, {
    name: 'item 7'
  }, {
    name: 'item 10'
  }]
  console.log($scope.items)
  $scope.test = function () {
    console.log($scope.items)
  } 
  $scope.sortableOptions = {
    containment: '#sortable-container'
  };
});