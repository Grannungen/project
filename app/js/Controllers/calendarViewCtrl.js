meetingAgendaPlanner.controller('calendarViewCtrl', function ($scope, $rootScope, meetingAgendaModel, $location, $firebaseObject, $firebaseArray) {
	$rootScope.activityPopUpCtrlGlobal = {
		
	}



$scope.launchConfirmation = function() {
	alert()
  //They Confirmed
  //Do Async stuff
  $scope.confirmationOpen = true;
}

	$scope.splice = function () {
		var ref = new Firebase("https://brilliant-torch-7105.firebaseio.com/");
		var list = meetingAgendaModel.fireDays;
		console.log("list before")
		console.log(list)
		list.splice(1,1);
		console.log("splice")
		console.log(list)
		ref.set(list);
	}


  $scope.fire = function () {
   	var ref = new Firebase("https://brilliant-torch-7105.firebaseio.com/");
    var syncObject = $firebaseObject(ref);
   var firebaseArray = $firebaseArray(ref);

   		syncObject.$bindTo($rootScope, "syncObject").then(function () {

	if(meetingAgendaModel.firebaseUpdated != true){
		for (var i = 0; i < firebaseArray.length; i++) {
  			meetingAgendaModel.jsonDays.push(firebaseArray[i]);
  			meetingAgendaModel.addDay(firebaseArray[i])
		}
		console.log("$scope.syncObject");
		console.log($scope.syncObject);
		meetingAgendaModel.firebaseUpdated = true;
	}
		meetingAgendaModel.firebaseArray = firebaseArray;
   		console.log("firebaseArray")
   		console.log(meetingAgendaModel.jsonDays)
		$rootScope.syncObject = meetingAgendaModel.jsonDays;

    });
   			
   			// firebaseArray.$add({foo:'a'})
   			// firebaseArray.$add("b")
   			// alert()
   			// firebaseArray.foo = "ö"
   			// firebaseArray.$save(0)

   }
   $scope.fire()




   $scope.firebase = function () {
   	alert()

   	if(meetingAgendaModel.firebaseUpdated != true){
	 	var list = [];
	 	meetingAgendaModel.firebaseRef.on('value', function(snap) {
	 	list = snap.val();
	 	console.log("list");
	 	// meetingAgendaModel.jsonDays = list
	 	console.log(list);
	 	console.log(meetingAgendaModel.jsonDays)
	 	for (var i = 0; i < list.length; i++) {
	 		alert(list[i])
	 		meetingAgendaModel.jsonDays.push(list[i])
  			meetingAgendaModel.addDay(meetingAgendaModel.jsonDays[i])
		}
	 });
	meetingAgendaModel.firebaseUpdated = true;
   	}
   }
   // $scope.firebase()


$scope.eventSources = [meetingAgendaModel.jsonDays, meetingAgendaModel.externalAPIEvents];




$scope.alertEventOnClick=function (event) {
	console.log(event);
	var momentStart = moment(event);
	console.log(event._d);
	var formatedStart = momentStart.format('MMM DD YYYY hh:mm:ss a');
	console.log("formatedStart");
	console.log(formatedStart);
	var formatedDate = new Date(formatedStart)
	// console.log(event);
	$rootScope.meetingCtrlGlobal.startTime = formatedDate;
	$rootScope.meetingCtrlGlobal.date = event._d;
	$rootScope.meetingCtrlGlobal.selectedDayIsNew=true;
	$scope.meetingCtrlGlobal.showMeetingEditorPopUp=true;
}

$scope.eventClickHandler = function (event) {

	for(var i = 0; i < meetingAgendaModel.days.length; i += 1) {
		// alert(this.jsonDays[i].id)
		if(meetingAgendaModel.days[i]._id == event.id) {
			// alert(meetingAgendaModel.days[i]._name + "hit")
			// alert(event.title)
			// alert(meetingAgendaModel.days[i]._name)
			// alert("selectedDay before click " + meetingAgendaModel.selectedDay.getName())
			$rootScope.meetingCtrlGlobal.setSelectedDay(meetingAgendaModel.days[i])
			// alert("selectedDay after click " + meetingAgendaModel.selectedDay.getName())
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
	
	
		for (var i = 0; i < meetingAgendaModel.jsonDays.length; i++) {
			if (meetingAgendaModel.jsonDays[i]._id == event._id) {
				alert()
				meetingAgendaModel.jsonDays[i].start = event.start._d;
				alert()
			}
		}
}


$scope.uiConfig = {
      calendar:{
        // height: 450,
        editable: false,
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