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


	
	// create new metting when the new meeting page is loaded. The meeting (day) is pushed to meetingAgenfaModel.days
	
	//put in start time of the meeting in hours and minutes as a parameter in addDay
	
	$scope.days = meetingAgendaModel.days;

	// Gör lokal!!!!!!!!!!!!!!!!!!!!
	$scope.ActivityType = ActivityType;
	

	$scope.addNewDay = function () {
		var day = meetingAgendaModel.addDay(8,0,"hasse");
		$scope.dayIndex = $scope.days.indexOf(day);
		alert($scope.dayIndex);
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


	$scope.hej = function () {
		// showMeetingEditorPopUp=true;
		// $scope.showMeetingEditorPopUp = true;
		// alert($scope.showMeetingEditorPopUp);
			}
	


	// setName, setLength mm...


	// getName mm... to scope to print out data


	// list in scope thats contains all days and activities. Use  ng-repeat="day in days"

	// meetingAgendaModel.hello();
	// meetingAgendaModel.addActivity();
	// meetingAgendaModel.model.addDay();
	// meetingAgendaModel.hello();


	// you can use this method to create some test data and test your implementation
	function createTestData(){
		// meetingAgendaModel.addDay();
		// meetingAgendaModel.addActivity(new Activity("Introduction",10,0,""),0);
		// meetingAgendaModel.addActivity(new Activity("Idea 1",30,0,""),0);
		// meetingAgendaModel.addActivity(new Activity("Working in groups",35,1,""),0);
		// meetingAgendaModel.addActivity(new Activity("Idea 1 discussion",15,2,""),0);
		// meetingAgendaModel.addActivity(new Activity("Coffee break",20,3,""),0);
		
		// console.log("Day Start: " + meetingAgendaModel.days[0].getStart());
		// console.log("Day End: " + meetingAgendaModel.days[0].getEnd());
		// console.log("Day Length: " + meetingAgendaModel.days[0].getTotalLength() + " min");
		// $.each(ActivityType,function(index,type){
		// 	console.log("Day '" + ActivityType[index] + "' Length: " +  meetingAgendaModel.days[0].getLengthByType(index) + " min");
		// });
		console.log(meetingAgendaModel.days)
	}
	createTestData();










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