meetingAgendaPlanner.controller('meetingEditorCtrl', function ($scope, $rootScope, meetingAgendaModel, $firebaseObject, $firebaseArray) {
	
	//When the views are linked to each other they can't keep track of the variables unless you declare
	//them as $scope.meeting.variables


	$rootScope.variables = {
		// showNewMeetingEditor: false,
		// selectedDayIsNew:false,
		// selectedActivity:meetingAgendaModel.selectedActivity,
		// selectedActivityName:"",
		// selectedActivityLength:0,
		// selectedActivityTypeId:"",
		// selectedActivityDescription:"",

	}
	$rootScope.variables.showNewMeetingEditor = false;
	$rootScope.test=function (h) {
		alert(h);
	}
	$scope.meeting = {
		// days: meetingAgendaModel.days,
		nameOfMeeting: "",
		// showActivityInfo:false,
		// showEditor: false,
		// showMeetingEditorPopUp:false,
		startHoursMeeting: 8,
		startMinutesMeeting: 0,
		// selectedDay:meetingAgendaModel.selectedDay,
		// selectedActivity:meetingAgendaModel.selectedActivity,
		// weekDay: "Mon"
	}
	$scope.days = meetingAgendaModel.days;
	$scope.hourList = [];
	$scope.showMeetingEditorPopUp = false;

	
		
	
	// var syncObject = meetingAgendaModel.firebaseArray();

	// console.log(syncObject);
	// console.log(syncObject.length);
	// syncObject.$loaded().then(function(syncObject){
	// 	// console.log(syncObject.length);
	// 	//for (i=0; i< syncObject.length; i++){
	// 	//	syncObject.$remove(i);
	// 	//};
	// });
	
	
	


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
		day.weekDay = "Fri";
		meetingAgendaModel.addActivity(new Activity("Introduction",10,0,"Here we will have some introduction"),0);
		meetingAgendaModel.addActivity(new Activity("Idea 1",30,0,""),0);
		meetingAgendaModel.addActivity(new Activity("Working in groups",35,1,""),0);
		meetingAgendaModel.addActivity(new Activity("Idea 1 discussion",15,2,""),0);
		meetingAgendaModel.addActivity(new Activity("Coffee break",20,3,""),0);

		day = meetingAgendaModel.addDay(9,0,"Test2");
		day.weekDay = "Thu";
		meetingAgendaModel.addActivity(new Activity("Introduction",10,0,""),1);
		meetingAgendaModel.addActivity(new Activity("Idea 1",30,0,""),1);
		meetingAgendaModel.addActivity(new Activity("Working in groups",35,1,""),1);
		meetingAgendaModel.addActivity(new Activity("Idea 1 discussion",15,2,""),1);
		meetingAgendaModel.addActivity(new Activity("Coffee break",20,3,""),1);

		meetingAgendaModel.days[0].setName('dag1');
		meetingAgendaModel.days[1].setName('dag2');		
		
		console.log(meetingAgendaModel.days);
		console.log(meetingAgendaModel.days[0].getActivity());
		var obj = meetingAgendaModel.firebaseObject();
		var child = obj.child('day');
		var dayArray = [];
		for (i=0; i<meetingAgendaModel.days.length;i++) {
			var activityArray = []
			for (j=0;j<meetingAgendaModel.days[i].getActivity().length; j++){
				var activityObject = new meetingAgendaModel.convertedActivity(meetingAgendaModel.days[i].getActivity()[j]);
				activityArray.push(activityObject);
			}
			var dayObject = new meetingAgendaModel.convertedDay(meetingAgendaModel.days[i], activityArray);
			dayArray.push(dayObject);
		};
		child.set({dayArray}, meetingAgendaModel.onComplete());
	
		// console.log("Day Start: " + meetingAgendaModel.days[0].getStart());
		// console.log("Day End: " + meetingAgendaModel.days[0].getEnd());
		// console.log("Day Length: " + meetingAgendaModel.days[0].getTotalLength() + " min");
		// $.each(ActivityType,function(index,type){
		// 	console.log("Day '" + ActivityType[index] + "' Length: " +  meetingAgendaModel.days[0].getLengthByType(index) + " min");
		// });
	}
	
// $scope.createTestData();

});
