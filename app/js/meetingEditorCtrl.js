meetingAgendaPlanner.controller('meetingEditorCtrl', function ($scope, meetingAgendaModel) {
	$scope.showEditor = false;
	$scope.hourList = [];
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
	// meetingAgendaModel.hello();
	// meetingAgendaModel.addActivity();
	// meetingAgendaModel.model.addDay();
	// meetingAgendaModel.hello();


	// you can use this method to create some test data and test your implementation
	




	// använd setName för att lägga till info om aktivitet
	$scope.addNewActivity = function(){
		meetingAgendaModel.addDay();
		meetingAgendaModel.addActivity(new Activity($scope.ActivityType,$scope.length,0,$scope.description),0);
				$.each(ActivityType,function(index,type){
			console.log("Day '" + ActivityType[index] + "' Length: " +  meetingAgendaModel.days[0].getLengthByType(index) + " min");
			 });
		console.log(meetingAgendaModel.days[0]._activities[0].getName);
	}


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