meetingAgendaPlanner.controller('dailyViewCtrl', function($scope, meetingAgendaModel){
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
})
