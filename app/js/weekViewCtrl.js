meetingAgendaPlanner.controller('weekViewCtrl', function($scope, $rootScope, meetingAgendaModel, $location, $resource){
	$scope.wholeHourList = [];
	
	//$scope.dataElement = $(".dataElement");

	$scope.addNew = function () {
		var target = event.target.id;
		var chosenDayTime = target.split(",");
		// console.log(chosenDayTime);
	}

	$scope.hejhej = function () {
		alert()
	}

	$rootScope.go = function (path) {
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
	$scope.setDayList = function (inputData) {

		dayList = [];
		var today = new Date();
		if (inputData != undefined) {
			var nextWeekDay = new Date();
			nextWeekDay.setDate(today.getDate()+inputData);
			today = nextWeekDay;
			dayList.push(nextWeekDay);
		}	else {
			
			dayList.push(today);
		};

		console.log(today.getDate());
		console.log(today.getDay());
		for (var i = 1; i < today.getDay(); i++) {
			var day = new Date();
			day.setDate(today.getDate()-i);
			dayList.push(day);
		};
		for (var i = 1; i < (8-today.getDay()); i++) {
			var day = new Date();
			day.setDate(today.getDate()+i)
			dayList.push(day);
		}

		 $scope.days = ["","","","","","",""];
		 for (var i = 0; i < dayList.length; i++) {
		 		dayString = dayList[i].toString();
		 		dayListPres = dayString.split(" ");
		 		$scope.days.splice(dayList[i].getDay()-1, 1 ,[dayListPres[0],dayListPres[1],dayListPres[2]]);
			
		 };

		console.log($scope.days);
		//$scope.days = ["Mo","Tu","We","Th","Fr","Sa","Su"];
		};
	$scope.setDayList();

	this.createCalBlock = function (){
		$scope.table=$("#weektable");
		// console.log($scope.table);
		$("#Mo 1.00").append("<p>Hej</p>");
		// console.log($("#Mo 1.00"));
		// console.log($scope.meeting);
	}

	this.createCalBlock();
})
