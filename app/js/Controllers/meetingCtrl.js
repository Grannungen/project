meetingAgendaPlanner.controller('meetingCtrl', function ($scope, $rootScope, meetingAgendaModel, $location, $cookieStore) {
	$rootScope.meetingCtrlGlobal = {	// Needed for access when mutliple meetingCtrl are created.
		days: meetingAgendaModel.days,
		selectedDayIsNew:false,
		selectedJsonDay: meetingAgendaModel.jsonDays[meetingAgendaModel.selectedDayIndex]
	}
	$scope.meetingCtrl = {}	//Makes it easier to see which controller the variablel belongs to.

// 	//sets the selectedDay from cookie.
// if(meetingAgendaModel.days[meetingAgendaModel.selectedDayIndex-1] in $cookieStore){
// 	var index = meetingAgendaModel.selectedDay._id;
// 	meetingAgendaModel.selectedDay = meetingAgendaModel.days[$cookieStore.get(index)];
// }



if(meetingAgendaModel.selectedDay != undefined){
	$rootScope.meetingCtrlGlobal.selectedDay = meetingAgendaModel.selectedDay //fixes the bug that you can't access the meeting the first time you create it
	$rootScope.meetingCtrlGlobal.selectedActivities = meetingAgendaModel.selectedDay._activities;
}

	//Formates the input time and date to a suitable format for the calendar.
	$scope.formatTime = function () {
		var dateList = $rootScope.meetingCtrlGlobal.date.toString().split(" ");
		var time = $rootScope.meetingCtrlGlobal.startTime;
		var timearray = time.toString().split(" ");
		time = timearray[4];
		dateList[4] = time;
		var start = dateList.join(" ")
		var momentStart = moment(start);
		var formatedStart = momentStart.format('YYYY-MM-DD hh:mm:ss a');
		return formatedStart
		
	}

	//alerts an error message if the input is incorrect.
	$scope.testInput = function (argument) {
		if($scope.meetingCtrl.nameOfMeeting==undefined || $scope.meetingCtrl.nameOfMeeting==""){
				alert("Please enter a name for the meeting");
				return false;
			}
		else if($rootScope.meetingCtrlGlobal.date==undefined){
				alert("Please enter the date correctly");
				return false;
			}

		else if($rootScope.meetingCtrlGlobal.startTime==undefined){
				alert("Please enter start time correctly");
				return false;
			}
	}

	
	$scope.addNewDay = function () {
		var test = $scope.testInput()
		if(test !=false){
			//Creates a new day from input data.
			if($rootScope.meetingCtrlGlobal.selectedDayIsNew==true){
				formatedStart = $scope.formatTime()
				var eventName = $scope.meetingCtrl.nameOfMeeting;
				var dayJson = meetingAgendaModel.addJson(formatedStart,eventName);
				var day = meetingAgendaModel.addDay(dayJson);
				$rootScope.meetingCtrlGlobal.setSelectedDay(day);
				$rootScope.meetingCtrlGlobal.selectedDayIsNew = false;
				$rootScope.meetingCtrlGlobal.showMeetingEditorPopUp = false;
				$scope.meetingCtrl.nameOfMeeting = "";
				// $location.path('/meeting');
			}
			//Edit the selected day according to input data
			else{
				formatedStart = $scope.formatTime()
				var day = meetingAgendaModel.selectedDay;
				day.setName($scope.meetingCtrl.nameOfMeeting);
				day.setDate(formatedStart);
			}
			$rootScope.meetingCtrlGlobal.showMeetingEditorPopUp=false; 
		}
	}

	//Removes the day.
	$scope.removeDay = function (day) {
			meetingAgendaModel.removeDay(meetingAgendaModel.selectedDay);
	}

	//Redirects to calendarView if selectedDay is undefined
	$scope.selectedDayUndefinedTest = function () {
		meetingAgendaModel.meetingViewUpdated = true
		$rootScope.meetingViewUpdated = true;
		if(meetingAgendaModel.selectedDay == undefined && $rootScope.meetingViewUpdated){
			$location.path("/calendarView");
		}
	}
	$scope.selectedDayUndefinedTest()

	//Redirect to the url in the variable path
	$rootScope.go = function (path) {
		$location.path(path);
	}

	//Sets the selected day.
	$rootScope.meetingCtrlGlobal.setSelectedDay = function (day) {
		meetingAgendaModel.selectedDay = day;
		$cookieStore.put('selectedDayByID', meetingAgendaModel.selectedDay._id);
		$rootScope.meetingCtrlGlobal.selectedDay = day;
		$rootScope.meetingCtrlGlobal.selectedJsonDay = day.dayJson;
		$rootScope.meetingCtrlGlobal.selectedActivities = day._activities;
	}
});
