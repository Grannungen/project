meetingAgendaPlanner.controller('activityCtrl', function ($scope, $rootScope, meetingAgendaModel) {

	$rootScope.activityCtrlGlobal = {	// Needed for access when mutliple activityCtrl are created.
		selectedActivity:meetingAgendaModel.selectedActivity,
		showActivityInfo: false
	}
	$scope.activityCtrl = {} //Makes it easier to see which controller the variablel belongs to.


	//Sets the selected activity when the info button is clicked.
	$scope.setSelectedActivity = function (activity) {
		meetingAgendaModel.selectedActivity = activity;
		$rootScope.activityCtrlGlobal.selectedActivity = activity;
		$rootScope.activityCtrlGlobal.selectedActivityName = activity.getName(); //This will be the input value in the pop up 
		$rootScope.activityCtrlGlobal.selectedActivityLength = activity.getLength(); //This will be the input value in the pop up 
		// $rootScope.activityCtrlGlobal.selectedActivityTypeId = activity.getTypeId(); //This will be the input value in the pop up 
		$rootScope.activityCtrlGlobal.selectedActivityDescription = activity.getDescription(); //This will be the input value in the pop up 
	}

	//removes the activity from selected day
	$scope.removeActivity = function (activity, day){
		var position = day._activities.indexOf(activity);
		day._removeActivity(position);
	}

	// Will give an error message if the input is incorrect in the pop up.
	var testInput = function () {
		if($scope.activityCtrlGlobal.showActivityPopUpNew==true){
			if($scope.activityCtrlGlobal.ActivityName==undefined || $scope.activityCtrlGlobal.ActivityName==""){
			alert("Please enter a name for the activity.")
			return false
			}
			if($scope.activityCtrlGlobal.length==undefined){
				alert("Please enter the time length of the activity.")
				return false
			}
		}
		if($scope.activityCtrlGlobal.showActivityPopUpEdit==true){
			if($scope.activityCtrlGlobal.selectedActivityName==undefined || $scope.activityCtrlGlobal.selectedActivityName==""){
			alert("Please enter a name for the activity.")
			return false
			}
			if($scope.activityCtrlGlobal.selectedActivityLength==undefined){
				alert("Please enter the time length of the activity.")
				return false
			}		
		}
	}

	// Add activity to day
	$scope.addNewActivity = function(){
		var bool = testInput()
		if(bool !=false){
			$rootScope.activityCtrlGlobal.showActivityPopUpNew=false
			var Activity = meetingAgendaModel.Activity;
			// var ActivityType = meetingAgendaModel.ActivityType;
			if (meetingAgendaModel.selectedDay._dayJson.activities == undefined){
				meetingAgendaModel.selectedDay._dayJson.activities = [];			
			}
			var jsonActivity = meetingAgendaModel.addJsonActivity($scope.activityCtrlGlobal.ActivityName,$scope.activityCtrlGlobal.length, $scope.activityCtrlGlobal.description, meetingAgendaModel.selectedDay._dayJson.activities.length);
			
			meetingAgendaModel.selectedDay._dayJson.activities.push(jsonActivity);
			meetingAgendaModel.selectedDay._addActivity(new Activity(jsonActivity));
		}	
	}

	//Will edit in the selected activity
	$scope.changeActivity = function () {
		var bool = testInput();
		if(bool !=false){
			$rootScope.activityCtrlGlobal.showActivityPopUpEdit=false;
			var activity = meetingAgendaModel.selectedActivity;
			activity.setName($rootScope.activityCtrlGlobal.selectedActivityName);
			activity.setLength($rootScope.activityCtrlGlobal.selectedActivityLength);
			// activity.setTypeId($scope.activityCtrlGlobal.typeId);
			activity.setDescription($rootScope.activityCtrlGlobal.selectedActivityDescription);
			return activity;
		}
		
	}
});
