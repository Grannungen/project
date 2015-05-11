meetingAgendaPlanner.controller('calendarViewCtrl', function ($scope, $rootScope, meetingAgendaModel, $location) {
	$rootScope.activityPopUpCtrlGlobal = {
		
	}


	$scope.Events={
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay',
				
			},
			defaultDate: '2015-02-12',
			editable: true,
			eventLimit: true, // allow "more" link when too many events
			events: [
				{
					title: 'All Day Event',
					start: '2015-02-05',
					activities: ["f", "u", "f"]
				},
				{
					title: 'Long Event',
					start: '2015-02-07',
					end: '2015-02-10'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2015-02-09T16:00:00'
				},
				{
					id: 999,
					title: 'Repeating Event',
					start: '2015-02-16T16:00:00'
				},
				{
					title: 'Conference',
					start: '2015-02-11',
					end: '2015-02-13'
				},
				{
					title: 'Meeting',
					start: '2015-02-12T10:30:00',
					end: '2015-02-12T12:30:00'
				},
				{
					title: 'Lunch',
					start: '2015-02-12T12:00:00'
				},
				{
					title: 'Meeting',
					start: '2015-02-12T14:30:00'
				},
				{
					title: 'Happy Hour',
					start: '2015-02-12T17:30:00'
				},
				{
					title: 'Dinner',
					start: '2015-02-12T20:00:00'
				},
				{
					title: 'Birthday Party',
					start: '2015-02-13T07:00:00'
				},
				{
					title: 'Click for Google',
					url: 'http://google.com/',
					start: '2015-02-28'
				}
			],
			eventDrop: function(event,dayDelta,minuteDelta,allDay,revertFunc) {

        alert(
            event.title + " was moved " +
            dayDelta + " days and " +
            minuteDelta + " minutes."
        );

        if (allDay) {
            alert("Event is now all-day");
        }else{
            alert("Event has a time-of-day");
        }

        if (!confirm("Are you sure about this change?")) {
            revertFunc();
        }

    }
		}









var date = new Date();
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();

$rootScope.myEvents = [
    {
        title: 'All Day Test Event',
        start: new Date(y, m, 1)
    },
    {
    	title: "Gröna Lund ", 
    	start: "2015-05-16T10:00:00+02:00"
    },
    {
        title: 'Long Test Event',
        start: new Date(y, m, d - 5),
        end: new Date(y, m, d - 2)
    },
    {
        title: 'Test Birthday Party',
        start: new Date(y, m, d + 1, 19, 0),
        end: new Date(y, m, d + 1, 22, 30),
        allDay: false
    }];





$scope.eventSources = [meetingAgendaModel.jsonDays, meetingAgendaModel.externalAPIEvents];

$scope.alertEventOnClick=function (event) {


	this.chosenDate = event._d;
	//$scope.showNewMeetingEditor = true;
	//$scope.showMeetingEditorPopUp = false;
	$rootScope.meetingCtrlGlobal.date = event._d;
	$rootScope.meetingCtrlGlobal.selectedDayIsNew=true;
	$scope.meetingCtrlGlobal.showMeetingEditorPopUp=true;
}

$scope.eventClickHandler = function (event) {


	if (event.listSource != "externalAPI") {

		meetingAgendaModel.selectedDayIndex = event.index;
		meetingAgendaModel.selectedDay = meetingAgendaModel.days[event.index]
		$rootScope.meetingCtrlGlobal.selectedJsonDay = meetingAgendaModel.jsonDays[event.index]
		$location.path('/meeting');
	}
	else{
		$location.path('/calendarView');
	}
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