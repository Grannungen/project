meetingAgendaPlanner.controller('firebaseTestCtrl', function ($scope, $firebaseObject) {


    var ref = new Firebase("https://brilliant-torch-7105.firebaseio.com/");
    var syncObject = $firebaseObject(ref);
    syncObject.$bindTo($scope, "syncObject");

  $scope.createObj = function(){
    $scope.syncObject={name:'Pelle'}
    console.log($scope.syncObject);
  }

  $scope.addAttr = function(){
    $scope.syncObject.age=14;
    console.log($scope.syncObject);
  }
    $scope.changeAttri = function(){

    $scope.syncObject.name="Oskar"

    console.log($scope.syncObject);

  }
    $scope.removeAttri = function(){
    delete $scope.syncObject.age
    console.log($scope.syncObject);

  }


});

