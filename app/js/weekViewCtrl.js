meetingAgendaPlanner.controller('weekViewCtrl', function($scope, meetingAgendaModel){
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
	this.createCalBlock = function (){
		$scope.table=$("#weektable");
		console.log($scope.table);
		$("#Mo 1.00").append("<p>Hej</p>");
		console.log($("#Mo 1.00"));
	}
	this.createCalBlock();
})
