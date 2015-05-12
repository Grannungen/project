meetingAgendaPlanner.controller('activityCtrl', function ($scope, $rootScope, meetingAgendaModel) {
	$rootScope.activityCtrlGlobal = {
		selectedActivity:meetingAgendaModel.selectedActivity,
		showActivityInfo: false

	}
	$scope.activityCtrl = {
		
	}

		$scope.setSelectedActivity = function (activity) {
		meetingAgendaModel.selectedActivity = activity;
		$scope.activityCtrlGlobal.selectedActivity = meetingAgendaModel.selectedActivity;
		$rootScope.activityCtrlGlobal.selectedActivity = activity;
		$rootScope.activityCtrlGlobal.selectedActivityName = activity.getName();
		$rootScope.activityCtrlGlobal.selectedActivityLength = activity.getLength();
		$rootScope.activityCtrlGlobal.selectedActivityTypeId = activity.getTypeId();
		$rootScope.activityCtrlGlobal.selectedActivityDescription = activity.getDescription();
	}

	$scope.removeActivity = function (activity, day){

		var position = day._activities.indexOf(activity);
		day._removeActivity(position);
	}


	var testInput = function () {
		console.log("$scope.activityCtrlGlobal.ActivityName: " + $scope.activityCtrlGlobal.ActivityName)
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
	// Add activities to day by using addAvtivity(activity, day, position)

	$scope.addNewActivity = function(){
		var bool = testInput()
		if(bool !=false){
			$rootScope.activityCtrlGlobal.showActivityPopUpNew=false
			var Activity = meetingAgendaModel.Activity;
			var ActivityType = meetingAgendaModel.ActivityType;
			meetingAgendaModel.selectedDay._addActivity(new Activity($scope.activityCtrlGlobal.ActivityName,$scope.activityCtrlGlobal.length,$scope.activityCtrlGlobal.typeId,$scope.activityCtrlGlobal.description),$scope.dayIndex);
			$.each(ActivityType,function(index,type){
			// console.log("Day '" + ActivityType[index] + "' Length: " +  meetingAgendaModel.days[0].getLengthByType(index) + " min");
			 });

		}
		
	}
	$scope.changeActivity = function () {
		var bool = testInput();
		if(bool !=false){
			$rootScope.activityCtrlGlobal.showActivityPopUpEdit=false;
			var activity = meetingAgendaModel.selectedActivity;
			activity.setName($rootScope.activityCtrlGlobal.selectedActivityName);
			activity.setLength($rootScope.activityCtrlGlobal.selectedActivityLength);
			activity.setTypeId($scope.activityCtrlGlobal.typeId);
			activity.setDescription($rootScope.activityCtrlGlobal.selectedActivityDescription);
		}
		
	}
});