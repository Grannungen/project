meetingAgendaPlanner.controller('calendarViewCtrl', function ($scope, $rootScope, meetingAgendaModel) {
	$rootScope.activityPopUpCtrlGlobal = {
		
	}


	$rootScope.Events={
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

console.log(meetingAgendaModel.jsonDays);

  
					


	$(document).ready(function() {
		alert()
		
		$('#calendar').fullCalendar($rootScope.Events);
		
	});

	$scope.print = function () {

	$(document).ready(function() {
		$('#calendar').fullCalendar($rootScope.Events);
		
	});




		console.log($scope.Events)
	}



});
