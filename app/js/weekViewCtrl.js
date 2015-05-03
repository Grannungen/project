meetingAgendaPlanner.controller('weekViewCtrl', function($scope, meetingAgendaModel, $location){
	$scope.wholeHourList = [];
	//$scope.dataElement = $(".dataElement");
	$scope.addNew = function () {
		var target = event.target.id;
		var chosenDayTime = target.split(",");
		console.log(chosenDayTime);
	}

	$scope.hejhej = function () {
		alert()
	}

	$scope.go = function (path) {
		$location.path(path);
	}
		// body...
	
	this.setHourList = function () {
		var i = 1;
		while(i<24){	
		// var time = i.toString();
		// time = time + ":00"
		$scope.wholeHourList.push(i);
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
