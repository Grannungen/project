meetingAgendaPlanner.controller('calendarViewCtrl', function ($scope, $rootScope, meetingAgendaModel, $location, $firebaseObject, $firebaseArray, $cookieStore) {
	$rootScope.activityPopUpCtrlGlobal = {
		
	}


	//download and pushes the firebasedata to meetingAgendaModel.days and meetingAgendaModel.jsonDays
   $scope.firebase = function () {
   	var ref = new Firebase("https://brilliant-torch-7105.firebaseio.com/");
    var syncObject = $firebaseObject(ref);
   	var firebaseArray = $firebaseArray(ref);
   	syncObject.$bindTo($rootScope, "syncObject").then(function () {
		for (var i = 0; i < firebaseArray.length; i++) {
  			meetingAgendaModel.jsonDays.push(firebaseArray[i]);
  			meetingAgendaModel.addDay(firebaseArray[i])
		}
		meetingAgendaModel.firebaseArray = firebaseArray;
		$rootScope.syncObject = meetingAgendaModel.jsonDays;
		meetingAgendaModel.firebaseUpdated = true;
    });

   }
   if(meetingAgendaModel.firebaseUpdated != true){
   		$scope.firebase()
   }
   

//Contains the data that will be displayed in the calendar.
$scope.eventSources = [meetingAgendaModel.jsonDays, meetingAgendaModel.externalAPIEvents];

//When you click on the calendar you will be asked to create a new day.
$scope.alertEventOnClick=function (event) {
	var momentStart = moment(event);
	var formatedStart = momentStart.format('MMM DD YYYY hh:mm:ss a');
	var formatedDate = new Date(formatedStart)
	$rootScope.meetingCtrlGlobal.startTime = formatedDate;
	$rootScope.meetingCtrlGlobal.date = event._d;
	$rootScope.meetingCtrlGlobal.selectedDayIsNew=true;
	$scope.meetingCtrlGlobal.showMeetingEditorPopUp=true;
}

//When the event block is clicked in the calendar the user will be redirected to meetingView (not for external api events).
$scope.eventClickHandler = function (event) {
	for(var i = 0; i < meetingAgendaModel.jsonDays.length; i += 1) {
		if(meetingAgendaModel.jsonDays[i]._id == event._id) {
			$rootScope.meetingCtrlGlobal.setSelectedDay(meetingAgendaModel.days[i])
			$cookieStore.put('dayByID', meetingAgendaModel.days.indexOf(meetingAgendaModel.selectedDay));
		}
	}
}


//The start time will be changed when the event block is dragged
$scope.alertOnDrop = function(event) {
		for (var i = 0; i < meetingAgendaModel.jsonDays.length; i++) {
			if (meetingAgendaModel.jsonDays[i]._id == event._id) {
				meetingAgendaModel.jsonDays[i].start = event.start._d;
				var date = moment(event.start._d).format('YYYY-MM-DD hh:mm:ss a');
				meetingAgendaModel.days[i].setDate(date);
			}
		}
}

//Configuration for the calendar view.
$scope.uiConfig = {
      calendar:{
        	editable: true,
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