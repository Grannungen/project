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
	if(meetingAgendaModel.firebaseUpdated != true){
		for (var i = 0; i < firebaseArray.length; i++) {
  			meetingAgendaModel.jsonDays.push(firebaseArray[i]);
  			meetingAgendaModel.addDay(firebaseArray[i])
		}
		console.log("$scope.syncObject");
		console.log($scope.syncObject);
		// meetingAgendaModel.jsonDays = [{name:'bertil'}]
		$rootScope.syncObject = meetingAgendaModel.jsonDays;
		meetingAgendaModel.firebaseUpdated = true;
		// alert()
		// meetingAgendaModel.jsonDays = [{name:'berta'}]
		// $rootScope.syncObject = [{name:'bertil'}]
	}

		

      
      

      // $rootScope.syncObject = [{name:'af'}, {name:'ad'}]

// $scope.eventSources = [firebaseArray, meetingAgendaModel.externalAPIEvents];

    });
   }
   $scope.fire()


   meetingAgendaModel.firebaseArray = firebaseArray;
   // var list = [1,2,3]
   // firebaseArray.$add(list)
   // firebaseArray['Jp2wGkTS40v4EeOJgdA'] = "hej"
   // firebaseArray.$save('Jp2wGkTS40v4EeOJgdA')
    




$scope.eventSources = [meetingAgendaModel.jsonDays, meetingAgendaModel.externalAPIEvents];


$scope.alertEventOnClick=function (event) {

	// console.log(event);
	$rootScope.meetingCtrlGlobal.startTime = event._d;
	$rootScope.meetingCtrlGlobal.date = event._d;
	$rootScope.meetingCtrlGlobal.selectedDayIsNew=true;
	$scope.meetingCtrlGlobal.showMeetingEditorPopUp=true;
}

$scope.eventClickHandler = function (event) {

	for(var i = 0; i < meetingAgendaModel.days.length; i += 1) {
		// alert(this.jsonDays[i].id)
		if(meetingAgendaModel.days[i]._id == event.id) {
			// alert(meetingAgendaModel.days[i]._name + "hit")
			$rootScope.meetingCtrlGlobal.setSelectedDay(meetingAgendaModel.days[i])
			// alert("sel")
		}
	}
	// meetingAgendaModel.selectedDayIndex = event.index;
	// meetingAgendaModel.selectedDay = meetingAgendaModel.days[event.index]
	// alert(meetingAgendaModel.selectedDay)
	// $rootScope.meetingCtrlGlobal.selectedJsonDay = meetingAgendaModel.jsonDays[event.index]
	// alert($rootScope.meetingCtrlGlobal.selectedJsonDay.title)


		// meetingAgendaModel.selectedDayIndex = event.index;
		// meetingAgendaModel.selectedDay = meetingAgendaModel.days[event.index]
		// $rootScope.meetingCtrlGlobal.selectedJsonDay = meetingAgendaModel.jsonDays[event.index]
		// alert(meetingAgendaModel.selectedDay.getName())

}

$scope.alertOnDrop = function(event) {
	
	if (event.listSource == "externalAPI") {
		for (var i = 0; i < meetingAgendaModel.externalAPIEvents.length; i++) {
			if (meetingAgendaModel.externalAPIEvents[i]._id == event._id) {
				meetingAgendaModel.externalAPIEvents[i].start = event.start._d;
				meetingAgendaModel.externalAPIEvents[i].end = event.end._d;
				console.log(meetingAgendaModel.externalAPIEvents);
			}
		};
	} else {
		for (var i = 0; i < meetingAgendaModel.jsonDays.length; i++) {
			if (meetingAgendaModel.jsonDays[i]._id == event._id) {
				meetingAgendaModel.jsonDays[i].start = event.start._d;
			}
		};
	}
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