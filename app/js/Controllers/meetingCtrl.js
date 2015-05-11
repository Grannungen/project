meetingAgendaPlanner.controller('meetingCtrl', function ($scope, $rootScope, meetingAgendaModel, $location) {
	// Add a new meeting

	$rootScope.meetingCtrlGlobal = {
		days: meetingAgendaModel.days,
		selectedDay:meetingAgendaModel.selectedDay,
		selectedDayIsNew:false,
		selectedJsonDay: meetingAgendaModel.jsonDays[meetingAgendaModel.selectedDayIndex]
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
			if($rootScope.meetingCtrlGlobal.selectedDayIsNew==true){
				var weekDay = $scope.meetingCtrl.weekDay;
				
				// alert($scope.meetingCtrl.date);
				var dateList = $scope.meetingCtrl.date.toString().split(" ");
				// alert(dateList)
				// alert($scope.meetingCtrl.startTime)
				var time = $scope.meetingCtrl.startTime;
				var timearray = time.toString().split(" ");
				time = timearray[4];
				dateList[4] = time;
				var start = dateList.join(" ")
				var eventName = $scope.meetingCtrl.nameOfMeeting;
				// var momentO = moment(start)
				// console.log("moment")
				// console.log(momentO.format("YYYY-MM-DD"))
				var dayJson = meetingAgendaModel.addJson(start,eventName);
				// console.log(dayJson)
				// $rootScope.myEvents.push(dayJson);
				// console.log(dayJson);




				var eventName = $scope.meetingCtrl.nameOfMeeting;
				// alert($scope.meetingCtrl.date)
				

				// var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
				// var monthNumber = monthArray.indexOf(pelle[1])+1;
				// console.log(monthNumber);
				// if (monthNumber.length == 1) {
				// 	monthNumber = "0"+monthNumber.toString();
				// }
				// var dateJson = pelle[3]+"-"+monthNumber+"-"+pelle[2];
				// var time = $scope.meetingCtrl.startTime;
				// var timearray = time.toString().split(" ");
				// time = timearray[4];
				// alert(monthNumber)
				// var startJson = dateJson+"T"+time;
				
				// var dayJson = meetingAgendaModel.addJson($scope.meetingCtrl.date,eventName);

				// $rootScope.Events.events.push(dayJson);
				// alert($scope.meetingCtrl.nameOfMeeting);
				// var day = meetingAgendaModel.addDay(5,0, "bengt");
				// var day = meetingAgendaModel.addDay($scope.meetingCtrl.startHoursMeeting, $scope.meetingCtrl.startMinutesMeeting,$scope.meetingCtrl.nameOfMeeting);
				var day = meetingAgendaModel.addDay(dayJson);
				$scope.dayIndex = $scope.meetingCtrlGlobal.days.indexOf(day);
				$scope.meetingCtrlGlobal.selectedDay = day;
				// alert("This is meeting number " + $scope.dayIndex);
				// console.log("meeting " + $scope.dayIndex + ": ");
				// console.log("$scope.meetingCtrl.days: " + $scope.meetingCtrl.days);
				// console.log($scope.meetingCtrl.days);
				$rootScope.meetingCtrlGlobal.selectedDayIsNew = false;
				meetingAgendaModel.selectedDay = day;
				$rootScope.meetingCtrlGlobal.showMeetingEditorPopUp = false;
				// $location.path('/meeting');
			}
			else{
				//Edit
				meetingAgendaModel.jsonDays[0].title = $scope.meetingCtrl.nameOfMeeting;
				var day = meetingAgendaModel.selectedDay;
				day.setName($scope.meetingCtrl.nameOfMeeting);
				day.setWeekDay($scope.meetingCtrl.weekDay);
				day.setStart($scope.meetingCtrl.startHoursMeeting, $scope.meetingCtrl.startMinutesMeeting);
			}
			$rootScope.meetingCtrlGlobal.showMeetingEditorPopUp=false; 
		//}

		

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

	$rootScope.go = function (path) {
		$location.path(path);
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
