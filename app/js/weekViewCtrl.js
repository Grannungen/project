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
	this.setDayList = function (inputData) {
		console.log(inputData);

		dayList = [];
		var today = new Date();
		dayList.push(today);
		for (var i = 1; i < today.getDay(); i++) {
			var day = new Date();
			day.setDate(today.getDate()-i)
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
		 		console.log(dayListPres);
		 		$scope.days.splice(dayList[i].getDay()-1, 1 ,[dayListPres[0],dayListPres[1],dayListPres[2]]);
			
		 };

		console.log($scope.days);
		//$scope.days = ["Mo","Tu","We","Th","Fr","Sa","Su"];
		};
	this.setDayList();

	$scope.getNextWeek = function () {
		this.setDayList(7);
	}

	$scope.getLastWeek = function () {
		this.setDayList(-7);
	}



	this.createCalBlock = function (){
		$scope.table=$("#weektable");
		// console.log($scope.table);
		$("#Mo 1.00").append("<p>Hej</p>");
		// console.log($("#Mo 1.00"));
		// console.log($scope.meeting);
	}

	this.createCalBlock();
})
