meetingAgendaPlanner.controller('calendarViewCtrl', function ($scope, $rootScope, meetingAgendaModel, $location) {
	$rootScope.activityPopUpCtrlGlobal = {
		
	}


	$scope.Events={
			header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay'
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





	// $(document).ready(function() {
	// 	alert()
		
	// 	$('#calendar').fullCalendar($scope.Events);
		
	// });

	$scope.print = function () {
		// $scope.myEvents.push({
  //       title: 'Test',
  //       start: new Date(y, m, d + 1, 19, 0),
  //       end: new Date(y, m, d + 1, 22, 30),
  //       allDay: false
  //  		 })
		// console.log("$scope.eventSources")
		// console.log($scope.eventSources)
		console.log("pelle");

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

// meetingAgendaModel.jsonDays = $rootScope.myEvents;




$scope.eventSources = [meetingAgendaModel.jsonDays, meetingAgendaModel.externalAPIEvents];
    // console.log($scope.eventSources)

// $scope.eventSources = [
//       {title: 'All Day Event',start: new Date(y, m, 1)},
//       {title: 'Long Event',start: new Date(y, m, d - 5),end: new Date(y, m, d - 2)},
//       {id: 999,title: 'Repeating Event',start: new Date(y, m, d - 3, 16, 0),allDay: false},
//       {id: 999,title: 'Repeating Event',start: new Date(y, m, d + 4, 16, 0),allDay: false},
//       {title: 'Birthday Party',start: new Date(y, m, d + 1, 19, 0),end: new Date(y, m, d + 1, 22, 30),allDay: false},
//       {title: 'Click for Google',start: new Date(y, m, 28),end: new Date(y, m, 29),url: 'http://google.com/'}
//     ];

$scope.alertEventOnClick=function () {
	
}

$scope.eventClickHandler = function (event) {
	meetingAgendaModel.selectedDayIndex = event.index;
	meetingAgendaModel.selectedDay = meetingAgendaModel.days[event.index]
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
        eventResize: $scope.alertOnResize
      }
    };





});