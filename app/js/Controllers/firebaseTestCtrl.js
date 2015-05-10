meetingAgendaPlanner.controller('firebaseTestCtrl', function ($scope, $rootScope, $firebaseObject, meetingAgendaModel) {

    var ref = new Firebase("https://brilliant-torch-7105.firebaseio.com/");
    var syncObject = $firebaseObject(ref);
    console.log(syncObject);
    syncObject.$bindTo($rootScope, "syncObject").then(function () {
      // console.log($scope.syncObject);
      meetingAgendaModel.daysInFirebase = $scope.syncObject;
    });

    // $scope.syncObject.tttttttttttttt=1;
    // console.log($scope.syncObject)
    // console.log("meetingAgendaModel.daysInFirebase: " +  meetingAgendaModel.daysInFirebase)

  $scope.createObj = function(){
    meetingAgendaModel.daysInFirebase = $scope.syncObject.day4.name="123";
    // $scope.syncObject={name:'Pelle'}
    // $scope.syncObject={name:'Pelle'}
    // console.log($scope.syncObject);

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

