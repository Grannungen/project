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


	// Add activities to day by using addAvtivity(activity, day, position)
	$scope.addNewActivity = function(){
		
		var Activity = meetingAgendaModel.Activity;
		var ActivityType = meetingAgendaModel.ActivityType;
		$rootScope.meetingCtrlGlobal.selectedDay._addActivity(new Activity($scope.activityCtrlGlobal.ActivityName,$scope.activityCtrlGlobal.length,$scope.activityCtrlGlobal.typeId,$scope.activityCtrlGlobal.description),$scope.dayIndex);
			$.each(ActivityType,function(index,type){
			// console.log("Day '" + ActivityType[index] + "' Length: " +  meetingAgendaModel.days[0].getLengthByType(index) + " min");
			 });
	}
	$scope.changeActivity = function () {
		var activity = meetingAgendaModel.selectedActivity;
		activity.setName($rootScope.activityCtrlGlobal.selectedActivityName);
		activity.setLength($rootScope.activityCtrlGlobal.selectedActivityLength);
		activity.setTypeId($scope.activityCtrlGlobal.typeId);
		activity.setDescription($rootScope.activityCtrlGlobal.selectedActivityDescription);
	}
});