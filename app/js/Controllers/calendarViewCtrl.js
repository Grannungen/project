meetingAgendaPlanner.controller('calendarViewCtrl', function ($scope, $rootScope, meetingAgendaModel, $location, $firebaseObject, $firebaseArray) {
	$rootScope.activityPopUpCtrlGlobal = {
		
	}

		    var ref = new Firebase("https://brilliant-torch-7105.firebaseio.com/");
    var syncObject = $firebaseObject(ref);
   var firebaseArray = $firebaseArray(ref);

   $scope.fire = function () {
   		syncObject.$bindTo($rootScope, "syncObject").then(function () {

	//console.log($scope.syncObject);
	
	// meetingAgendaModel.jsonDays = $rootScope.syncObject

	// meetingAgendaModel.days = [];
	if(meetingAgendaModel.days.length == 0){
		alert()
		for (var i = 0; i < firebaseArray.length; i++) {
  			meetingAgendaModel.jsonDays.push(firebaseArray[i]);
  			meetingAgendaModel.addDay(firebaseArray[i])
		}
		console.log("$scope.syncObject");
		console.log($scope.syncObject);
		$rootScope.syncObject = meetingAgendaModel.jsonDays;

	}
   		
		

      
      

      // $rootScope.syncObject = [{name:'af'}, {name:'ad'}]

// $scope.eventSources = [firebaseArray, meetingAgendaModel.externalAPIEvents];

    });
   }


   meetingAgendaModel.firebaseArray = firebaseArray;
   // var list = [1,2,3]
   // firebaseArray.$add(list)
   // firebaseArray['Jp2wGkTS40v4EeOJgdA'] = "hej"
   // firebaseArray.$save('Jp2wGkTS40v4EeOJgdA')
    




$scope.eventSources = [meetingAgendaModel.jsonDays, meetingAgendaModel.externalAPIEvents];


$scope.alertEventOnClick=function (event) {
	console.log(event._d);
	this.chosenDate = event._d;
	//$scope.showNewMeetingEditor = true;
	//$scope.showMeetingEditorPopUp = false;
	$rootScope.meetingCtrlGlobal.date = event._d;
	$rootScope.meetingCtrlGlobal.selectedDayIsNew=true;
	$scope.meetingCtrlGlobal.showMeetingEditorPopUp=true;
}

$scope.eventClickHandler = function (event) {
	meetingAgendaModel.selectedDayIndex = event.index;
	meetingAgendaModel.selectedDay = meetingAgendaModel.days[event.index]
	// alert(meetingAgendaModel.selectedDay)
	$rootScope.meetingCtrlGlobal.selectedJsonDay = meetingAgendaModel.jsonDays[event.index]
	// alert($rootScope.meetingCtrlGlobal.selectedJsonDay.title)

	console.log(meetingAgendaModel.jsonDays[event.index]);
	console.log(event);
	$location.path('/meeting');
	console.log($scope.uiConfig.uiConfig)
}




$scope.uiConfig = {
      calendar:{
        // height: 450,
        editable: true,
        // showWeeks:true,
        header:{
          left: 'month agendaWeek agendaDay',
          center: 'title',
          right: 'today prev,next'
        },
        dayClick: $scope.alertEventOnClick,
        eventClick: $scope.eventClickHandler,
        eventDrop: $scope.alertOnDrop,
        eventResize: $scope.alertOnResize,
      }
    };





});