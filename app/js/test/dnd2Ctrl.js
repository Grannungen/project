// meetingAgendaPlanner.controller('MainCtrl', function ($scope) {

//   $scope.items = [{
//     name: 'item 1'
//   }, {
//     name: 'item 2'
//   }, {
//     name: 'item 3'
//   }, {
//     name: 'item 4'
//   }, {
//     name: 'item 5'
//   }, {
//     name: 'item 6'
//   }, {
//     name: 'item 7'
//   }, {
//     name: 'item 10'
//   }]
//   console.log($scope.items)
//   $scope.test = function () {
//     // console.log($scope.items)
//   } 
//   $scope.sortableOptions = {
//     containment: '#sortable-container'
//   };
// });




meetingAgendaPlanner.controller('MainCtrl', function ($scope) {
  var tmpList = [];
  
  for (var i = 1; i <= 6; i++){
    tmpList.push({
      text: 'Itemen ' + i,
      value: i
    });
  }
  
  $scope.list = tmpList;
  
  
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
      console.log(tmpList)
      
    }

  };
});