meetingAgendaPlanner.controller('meetingCtrl', function ($scope, $rootScope, meetingAgendaModel, $location) {

// $rootScope.meetingCtrlGlobal.selectedJsonDay

$scope.hello = function  () {
	alert("hej")
}
	$rootScope.meetingCtrlGlobal = {
		days: meetingAgendaModel.days,
		selectedDayIsNew:false,
		selectedJsonDay: meetingAgendaModel.jsonDays[meetingAgendaModel.selectedDayIndex]
	}

	$scope.meetingCtrl = {
		weekDay: "Mon",
		weekDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
		startHoursMeeting: 8,
		startMinutesMeeting: 0
	}

if(meetingAgendaModel.selectedDay != undefined){
	$rootScope.meetingCtrlGlobal.selectedDay = meetingAgendaModel.selectedDay //fixes the bug that you can't access the meeting the first time you create it
	$rootScope.meetingCtrlGlobal.selectedActivities = meetingAgendaModel.selectedDay._activities;
}



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
		//if($scope.meetingCtrl.nameOfMeeting==undefined || $scope.meetingCtrl.nameOfMeeting==""){
		//		alert("Please enter a name for the meeting");
		//	}
		//else if($scope.meetingCtrl.startHoursMeeting==undefined){
		//		alert("Please enter start time correctly");
		//	}

		//else if($scope.meetingCtrl.startMinutesMeeting==undefined){
		//		alert("Please enter start time correctly");
		//	}
		//else{
		var test = $scope.testInput()
		if(test !=false){
			if($rootScope.meetingCtrlGlobal.selectedDayIsNew==true){

				formatedStart = $scope.formatTime()
				var eventName = $scope.meetingCtrl.nameOfMeeting;
				var dayJson = meetingAgendaModel.addJson(formatedStart,eventName);
				var day = meetingAgendaModel.addDay(dayJson);
				// $scope.dayIndex = $scope.meetingCtrlGlobal.days.indexOf(day);
				$rootScope.meetingCtrlGlobal.setSelectedDay(day);
				$rootScope.meetingCtrlGlobal.selectedDayIsNew = false;
				$rootScope.meetingCtrlGlobal.showMeetingEditorPopUp = false;
				// $location.path('/meeting');
				// alert($rootScope.meetingCtrlGlobal.selectedDay.getName())

				
				

			}
			else{
				//Edit
				formatedStart = $scope.formatTime()
				meetingAgendaModel.jsonDays[0].title = $scope.meetingCtrl.nameOfMeeting;
				var day = meetingAgendaModel.selectedDay;
				day.setName($scope.meetingCtrl.nameOfMeeting);
				day.setDate(formatedStart);
			}
			$rootScope.meetingCtrlGlobal.showMeetingEditorPopUp=false; 
		}
			
		//}

		

		for(var i in $rootScope.meetingCtrlGlobal.days){
			// console.log($rootScope.meetingCtrlGlobal.days[i])
			// console.log($rootScope.meetingCtrlGlobal.days[i].getName())
			// console.log($rootScope.meetingCtrlGlobal.days[i].getWeekDay())
			// console.log($rootScope.meetingCtrlGlobal.days[i].getTotalLength())
			// console.log($rootScope.meetingCtrlGlobal.days[i].getStart())
			// console.log($rootScope.meetingCtrlGlobal.days[i].getEnd())
		}


	}

	$scope.removeDay = function (day) {
		// alert("hit")

			meetingAgendaModel.removeDay(meetingAgendaModel.selectedDay);
	}

	$rootScope.go = function (path) {
		$location.path(path);
	}

	$rootScope.meetingCtrlGlobal.setSelectedDay = function (day) {
		// console.log("day input: " + day);
		meetingAgendaModel.selectedDay = day;
		$rootScope.meetingCtrlGlobal.selectedDay = day;
		$rootScope.meetingCtrlGlobal.selectedJsonDay = day.dayJson;
		$rootScope.meetingCtrlGlobal.selectedActivities = day._activities;
		// console.log("meetingAgendaModel.selectedDay.name: " + meetingAgendaModel.selectedDay.name);
		// console.log(meetingAgendaModel.selectedDay);
		// $rootScope.variables.nameOfMeeting = day.getName();
		// console.log("$scope.variables.nameOfMeeting: " + $scope.variables.nameOfMeeting)

		// $scope.list = meetingAgendaModel.selectedDay._activities;
		// $rootScope.variables.selectedDay = day;

	}
});
