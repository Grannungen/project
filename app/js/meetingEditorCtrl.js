meetingAgendaPlanner.controller('meetingEditorCtrl', function ($scope, meetingAgendaModel) {
	$scope.showEditor = false;
	$scope.showMeetingEditorPopUp = true;
	$scope.hej = "hej!";
	$scope.hourList = ["a"];
	$scope.hej1 = "hej";
	this.setHourList = function () {
		var i = 1;
		while(i<24){	
		var time = i.toString();
		time = time + ":00"
		$scope.hourList.push(time);
		i++;
		}
	}
	this.setHourList();


	
	// create new metting when the new meeting page is loaded. The meeting (day) is pushed to meetingAgendaModel.days
	
	//put in start time of the meeting in hours and minutes as a parameter in addDay
	
	$scope.days = meetingAgendaModel.days;

	// Gör lokal!!!!!!!!!!!!!!!!!!!!
	$scope.ActivityType = ActivityType;
	
	// Add a new meeting
	$scope.addNewDay = function () {
		// Av någon anledning hittas inte $scope.nameOfMeeing...
		// alert($scope.nameOfMeeting);
		// var day = meetingAgendaModel.addDay($scope.startHoursMeeting, $scope.startMinutesMeeting, $scope.nameOfMeeting);
		var day = meetingAgendaModel.addDay(5,0, "bengt");
		$scope.dayIndex = $scope.days.indexOf(day);
		alert("This is meeting number " + $scope.dayIndex);
		// console.log("meeting " + $scope.dayIndex + ": ");
		// console.log($scope.days);
	}


	// Add activities to day by using addAvtivity(activity, day, position)
	$scope.addNewActivity = function(){
		console.log("activityName" + $scope.ActivityName)
		// activity = New Activity(name,length,typeid,description)
		meetingAgendaModel.addActivity(new Activity($scope.ActivityName,$scope.length,$scope.typeId,$scope.description),$scope.dayIndex);
		// meetingAgendaModel.addActivity(new Activity("ethoieonehehrtlonethrkln",$scope.length,$scope.typeId,$scope.description),0);
			
			$.each(ActivityType,function(index,type){
			console.log("Day '" + ActivityType[index] + "' Length: " +  meetingAgendaModel.days[0].getLengthByType(index) + " min");
			 });
			// meetingAgendaModel.days[0]._activities[0].setName();	
			$scope.test = meetingAgendaModel.days[0]._activities[0].getName();
		// console.log($scope.test);
		console.log($scope.days);
	}




	// you can use this method to create some test data and test your implementation
	$scope.createTestData = function(){
		meetingAgendaModel.addDay(8,0,"Test1");
		meetingAgendaModel.addActivity(new Activity("Introduction",10,0,"Here we will have some introduction"),0);
		meetingAgendaModel.addActivity(new Activity("Idea 1",30,0,""),0);
		meetingAgendaModel.addActivity(new Activity("Working in groups",35,1,""),0);
		meetingAgendaModel.addActivity(new Activity("Idea 1 discussion",15,2,""),0);
		meetingAgendaModel.addActivity(new Activity("Coffee break",20,3,""),0);

		meetingAgendaModel.addDay(9,0,"Test2");
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





	// $scope.hej = function () {
	// 	alert()
	// 	// showMeetingEditorPopUp=true;
	// 	// $scope.showMeetingEditorPopUp = true;
	// 	// alert($scope.showMeetingEditorPopUp);
	// 		}
	
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