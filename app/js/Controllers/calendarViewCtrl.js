meetingAgendaPlanner.controller('calendarViewCtrl', function ($scope, $rootScope, meetingAgendaModel, $location, $firebaseObject, $firebaseArray, $cookieStore) {
	$rootScope.activityPopUpCtrlGlobal = {
		
	}

   $scope.fire = function () {
   	var ref = new Firebase("https://brilliant-torch-7105.firebaseio.com/");
    var syncObject = $firebaseObject(ref);
   var firebaseArray = $firebaseArray(ref);
   	// alert()
   		syncObject.$bindTo($rootScope, "syncObject").then(function () {
	//console.log($scope.syncObject);
	// meetingAgendaModel.jsonDays = $rootScope.syncObject
	// meetingAgendaModel.days = [];
	if(meetingAgendaModel.firebaseUpdated != true){
		// alert()
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
   		meetingAgendaModel.firebaseArray = firebaseArray;
   }
   // $scope.fire()


   
   // var list = [1,2,3]
   // firebaseArray.$add(list)
   // firebaseArray['Jp2wGkTS40v4EeOJgdA'] = "hej"
   // firebaseArray.$save('Jp2wGkTS40v4EeOJgdA')
    




$scope.eventSources = [meetingAgendaModel.jsonDays, meetingAgendaModel.externalAPIEvents];


$scope.alertEventOnClick=function (event) {
	var momentStart = moment(event);
	var formatedStart = momentStart.format('MMM DD YYYY hh:mm:ss a');
	var formatedDate = new Date(formatedStart)
	$rootScope.meetingCtrlGlobal.startTime = formatedDate;
	$rootScope.meetingCtrlGlobal.date = event._d;
	$rootScope.meetingCtrlGlobal.selectedDayIsNew=true;
	$scope.meetingCtrlGlobal.showMeetingEditorPopUp=true;
}

$scope.eventClickHandler = function (event) {
	console.log(event);

	for(var i = 0; i < meetingAgendaModel.jsonDays.length; i += 1) {
		if(meetingAgendaModel.jsonDays[i]._id == event._id) {
			$rootScope.meetingCtrlGlobal.setSelectedDay(meetingAgendaModel.days[i])
			$cookieStore.put('dayByID', meetingAgendaModel.days.indexOf(meetingAgendaModel.selectedDay));
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
		console.log(event);
	
	
		for (var i = 0; i < meetingAgendaModel.jsonDays.length; i++) {
			if (meetingAgendaModel.jsonDays[i]._id == event._id) {
				meetingAgendaModel.jsonDays[i].start = event.start._d;
				console.log(meetingAgendaModel.jsonDays);
			}
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