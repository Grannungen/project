meetingAgendaPlanner.controller('meetingEditorCtrl', function ($scope, meetingAgendaModel, $firebaseObject, $firebaseArray) {
	
	//When the views are linked to each other they can't keep track of the varibles unless you declare
	//them as $scope.meeting.variables
	$scope.meeting = {
		days: meetingAgendaModel.days,
		nameOfMeeting: "",
		showActivityInfo:false,
		showEditor: false,
		showMeetingEditorPopUp:false,
		startHoursMeeting: 8,
		startMinutesMeeting: 0,
		selectedDay:meetingAgendaModel.selectedDay,
		selectedActivity:meetingAgendaModel.selectedActivity,
		weekDay: "Mo"
	}
	$scope.days = meetingAgendaModel.days;
	$scope.hourList = [];
	$scope.showMeetingEditorPopUp = false;
	$scope.weekDays = ["Mo","Tu","We","Th","Fr","Sa","Su"];
		
	
	var syncObject = meetingAgendaModel.firebaseArray();
	console.log(syncObject);
	console.log(syncObject.length);
	syncObject.$loaded().then(function(syncObject){
		console.log(syncObject.length);
		//for (i=0; i< syncObject.length; i++){
		//	syncObject.$remove(i);
		//};
	});
	
	
	

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

	


	//put in start time of the meeting in hours and minutes as a parameter in addDay
	

	var Day = meetingAgendaModel.Day;
	var Activity = meetingAgendaModel.Activity;
	var ActivityType = meetingAgendaModel.ActivityType;
	$scope.ActivityType = ActivityType;
	


	// Add a new meeting
	$scope.addNewDay = function () {

		if(meetingAgendaModel.newDay==true){
			var weekDay = $scope.meeting.weekDay;
			var day = meetingAgendaModel.addDay($scope.meeting.startHoursMeeting, $scope.meeting.startMinutesMeeting, $scope.meeting.nameOfMeeting);
			day.weekDay = weekDay;
			// alert($scope.meeting.nameOfMeeting);
			// var day = meetingAgendaModel.addDay(5,0, "bengt");
			$scope.dayIndex = $scope.days.indexOf(day);
			$scope.meeting.selectedDay = day;
			// alert("This is meeting number " + $scope.dayIndex);
			// console.log("meeting " + $scope.dayIndex + ": ");
			console.log("$scope.meeting.days: " + $scope.meeting.days);
			console.log($scope.meeting.days);
		}
		else{
			var day = meetingAgendaModel.selectedDay;
			day.setName($scope.meeting.nameOfMeeting);
			day.setWeekDay($scope.meeting.weekDay);
			day.setStart($scope.meeting.startHoursMeeting, $scope.meeting.startMinutesMeeting);

		}


	}

	$scope.removeDay = function (day) {
		meetingAgendaModel.removeDay(day);
	}

	$scope.setSelectedDay = function (day) {
		console.log("day input: " + day);
		meetingAgendaModel.selectedDay = day;
		console.log("meetingAgendaModel.selectedDay.name: " + meetingAgendaModel.selectedDay.name);
		console.log(meetingAgendaModel.selectedDay);
		$scope.list = meetingAgendaModel.selectedDay._activities;
	}

		$scope.setSelectedActivity = function (activity) {
		console.log("hit")
		console.log("activity input: " + activity.getName());
		console.log(activity);

		meetingAgendaModel.selectedActivity = activity;
		$scope.meeting.selectedActivity = meetingAgendaModel.selectedActivity;
		console.log("$scope.meeting.selectedActivity.getName(): " + $scope.meeting.selectedActivity.getName())
		// $scope
		// console.log("meetingAgendaModel.selectedDay.name: " + meetingAgendaModel.selectedDay.name);
		// console.log(meetingAgendaModel.selectedDay);
		// $scope.list = meetingAgendaModel.selectedDay._activities;
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
	$scope.changeActivity = function () {
		var activity = meetingAgendaModel.selectedActivity;
		activity.setName($scope.meeting.ActivityName);
		activity.setLength($scope.meeting.length);
		activity.setTypeId($scope.meeting.typeId);
		activity.setDescription($scope.meeting.description);
	}




// Test funcitons

	$scope.hej = function () {
		alert("hej");
		// $scope.meeting.showActivityInfo=true;
		// alert($scope.meeting.selectedActivity.getName);

		// showMeetingEditorPopUp=true;
		// $scope.showMeetingEditorPopUp = true;
		// alert($scope.showMeetingEditorPopUp);
			}


		$scope.meeting.hej = function () {
		alert("hej");
		// alert($scope.meeting.showEditor)

		// showMeetingEditorPopUp=true;
		// $scope.showMeetingEditorPopUp = true;
		// alert($scope.showMeetingEditorPopUp);
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
// $scope.createTestData();

});
