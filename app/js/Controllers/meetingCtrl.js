meetingAgendaPlanner.controller('meetingCtrl', function ($scope, $rootScope, meetingAgendaModel) {
	// Add a new meeting

	$rootScope.meetingCtrlGlobal = {
		days: meetingAgendaModel.days,
		selectedDay:meetingAgendaModel.selectedDay,
		selectedDayIsNew:false
	}


	$scope.meeting = function (argument) {
		alert()
	}

	$scope.meetingCtrl = {
		weekDay: "Mon",
		weekDays: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
		selectedDay: meetingAgendaModel.selectedDay,
		startHoursMeeting: 8,
		startMinutesMeeting: 0
	}
	$scope.addNewDay = function () {
		if($rootScope.meetingCtrlGlobal.selectedDayIsNew==true){
			var weekDay = $scope.meetingCtrl.weekDay;
			var day = meetingAgendaModel.addDay($scope.meetingCtrl.startHoursMeeting, $scope.meetingCtrl.startMinutesMeeting,$scope.meetingCtrl.nameOfMeeting);

			day.weekDay = weekDay;
			// alert($scope.meetingCtrl.nameOfMeeting);
			// var day = meetingAgendaModel.addDay(5,0, "bengt");
			$scope.dayIndex = $scope.meetingCtrlGlobal.days.indexOf(day);
			$scope.meetingCtrlGlobal.selectedDay = day;
			// alert("This is meeting number " + $scope.dayIndex);
			// console.log("meeting " + $scope.dayIndex + ": ");
			// console.log("$scope.meetingCtrl.days: " + $scope.meetingCtrl.days);
			// console.log($scope.meetingCtrl.days);
			$rootScope.variables.selectedDayIsNew = false;
			meetingAgendaModel.selectedDay = day;
			console.log(meetingAgendaModel.days)

		}
		else{
			var day = meetingAgendaModel.selectedDay;
			day.setName($scope.meetingCtrl.nameOfMeeting);
			day.setWeekDay($scope.meetingCtrl.weekDay);
			day.setStart($scope.meetingCtrl.startHoursMeeting, $scope.meetingCtrl.startMinutesMeeting);
		}

		for(var i in $rootScope.meetingCtrlGlobal.days){
			console.log($rootScope.meetingCtrlGlobal.days[i])
			console.log($rootScope.meetingCtrlGlobal.days[i].getName())
			console.log($rootScope.meetingCtrlGlobal.days[i].getWeekDay())
			console.log($rootScope.meetingCtrlGlobal.days[i].getTotalLength())
			console.log($rootScope.meetingCtrlGlobal.days[i].getStart())
			console.log($rootScope.meetingCtrlGlobal.days[i].getEnd())



		}


	}

	$scope.removeDay = function (day) {
			meetingAgendaModel.removeDay(day);
	}

	$scope.setSelectedDay = function (day) {
		// console.log("day input: " + day);
		meetingAgendaModel.selectedDay = day;
		// console.log("meetingAgendaModel.selectedDay.name: " + meetingAgendaModel.selectedDay.name);
		// console.log(meetingAgendaModel.selectedDay);
		// $rootScope.variables.nameOfMeeting = day.getName();
		// console.log("$scope.variables.nameOfMeeting: " + $scope.variables.nameOfMeeting)

		// $scope.list = meetingAgendaModel.selectedDay._activities;
		// $rootScope.variables.selectedDay = day;

	}
});