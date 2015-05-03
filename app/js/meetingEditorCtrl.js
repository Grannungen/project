meetingAgendaPlanner.controller('meetingEditorCtrl', function ($scope, meetingAgendaModel) {
		$scope.meeting = {
		nameOfMeeting: "",
		weekDay: "Mo",
		startHoursMeeting: 8,
		startMinutesMeeting: 0
	}
	$scope.meeting.showEditor = false;
	$scope.showMeetingEditorPopUp = true;
	$scope.hej = "hej!";
	$scope.hourList = [];
	$scope.hej1 = "hej";
	$scope.weekDays = ["Mo","Tu","We","Th","Fr","Sa","Su"];






	var Day = meetingAgendaModel.Day;
	var Activity = meetingAgendaModel.Activity;

	this.setHourList = function () {
		var i = 1;
		while(i<24){	
		var time = i.toString();
		time = time + ":00"
		$scope.hourList.push(time);
		i++;
		}
	}
	// this.setHourList();

		this.setHourList2 = function () {
		var i = 8;
		
		while(i<17){
			var hour = i.toString();
			var time = hour + ":00"
			$scope.hourList.push(time);
			var j = 15;
			while(j<60){
				var minutes = j.toString();
				hour_string = hour.toString();
				time = hour_string + ":" + minutes;
				$scope.hourList.push(time);
				j = j + 15;
			}
		i++;
		}
	}
	this.setHourList2();

	
	// create new metting when the new meeting page is loaded. The meeting (day) is pushed to meetingAgendaModel.days
	
	//put in start time of the meeting in hours and minutes as a parameter in addDay
	
	$scope.days = meetingAgendaModel.days;

	var ActivityType = meetingAgendaModel.ActivityType;
	$scope.ActivityType = ActivityType;
	
	// Add a new meeting
	$scope.addNewDay = function () {
		var weekDay = $scope.meeting.weekDay;
		var day = meetingAgendaModel.addDay($scope.meeting.startHoursMeeting, $scope.meeting.startMinutesMeeting, $scope.meeting.nameOfMeeting);
		day.weekDay = weekDay;
		// alert($scope.meeting.nameOfMeeting);
		// var day = meetingAgendaModel.addDay(5,0, "bengt");
		$scope.dayIndex = $scope.days.indexOf(day);
		$scope.meeting.selectedDay = day;
		// alert("This is meeting number " + $scope.dayIndex);
		// console.log("meeting " + $scope.dayIndex + ": ");
		// console.log($scope.days);
	}

	$scope.removeDay = function (day) {
		meetingAgendaModel.removeDay(day);
	}

	$scope.removeActivity = function (activity, day){
		console.log(day);
		var position = day._activities.indexOf(activity);
		day._removeActivity(position);
	}


	// Add activities to day by using addAvtivity(activity, day, position)
	$scope.addNewActivity = function(){
		// activity = New Activity(name,length,typeid,description)
		// meetingAgendaModel.addActivity(new Activity($scope.meeting.ActivityName,$scope.meeting.length,$scope.meeting.typeId,$scope.meeting.description),$scope.dayIndex);
		$scope.meeting.selectedDay._addActivity(new Activity($scope.meeting.ActivityName,$scope.meeting.length,$scope.meeting.typeId,$scope.meeting.description),$scope.dayIndex);

		// meetingAgendaModel.addActivity(new Activity("ethoieonehehrtlonethrkln",$scope.length,$scope.typeId,$scope.description),0);
			
			$.each(ActivityType,function(index,type){
			console.log("Day '" + ActivityType[index] + "' Length: " +  meetingAgendaModel.days[0].getLengthByType(index) + " min");
			 });
			// meetingAgendaModel.days[0]._activities[0].setName();	
			// $scope.test = meetingAgendaModel.days[0]._activities[0].getName();
		// console.log($scope.test);
		console.log($scope.days);
	}




	// you can use this method to create some test data and test your implementation
	$scope.createTestData = function(){
		var day = meetingAgendaModel.addDay(8,0,"Test1");
		day.weekDay = "Fr";
		meetingAgendaModel.addActivity(new Activity("Introduction",10,0,"Here we will have some introduction"),0);
		meetingAgendaModel.addActivity(new Activity("Idea 1",30,0,""),0);
		meetingAgendaModel.addActivity(new Activity("Working in groups",35,1,""),0);
		meetingAgendaModel.addActivity(new Activity("Idea 1 discussion",15,2,""),0);
		meetingAgendaModel.addActivity(new Activity("Coffee break",20,3,""),0);

		day = meetingAgendaModel.addDay(9,0,"Test2");
		day.weekDay = "Th";
		meetingAgendaModel.addActivity(new Activity("Introduction",10,0,""),1);
		meetingAgendaModel.addActivity(new Activity("Idea 1",30,0,""),1);
		meetingAgendaModel.addActivity(new Activity("Working in groups",35,1,""),1);
		meetingAgendaModel.addActivity(new Activity("Idea 1 discussion",15,2,""),1);
		meetingAgendaModel.addActivity(new Activity("Coffee break",20,3,""),1);
		// console.log("Day Start: " + meetingAgendaModel.days[0].getStart());
		// console.log("Day End: " + meetingAgendaModel.days[0].getEnd());
		// console.log("Day Length: " + meetingAgendaModel.days[0].getTotalLength() + " min");
		// $.each(ActivityType,function(index,type){
		// 	console.log("Day '" + ActivityType[index] + "' Length: " +  meetingAgendaModel.days[0].getLengthByType(index) + " min");
		// });
		console.log(meetingAgendaModel.days)
	}





	$scope.hej = function () {
		alert($scope.meeting.showEditor)
		// showMeetingEditorPopUp=true;
		// $scope.showMeetingEditorPopUp = true;
		// alert($scope.showMeetingEditorPopUp);
			}
	
	// var test = meetingmeetingAgendaModel.test;
	// alert = test;

	// $scope.mainWindowClicked = function (e) {
	// 	console.log(e);
	// 	if($(e).hasClass("activity"))
	// 		{alert()}
	// 	if($scope.showEditor == true){
	// 		$scope.showEditor = false
	// 	}
	// }
	// $scope.mainWindowClicked = function (argument) {
	// 	$scope.show = false;
	// }

  // }

});
