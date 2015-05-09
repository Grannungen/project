meetingAgendaPlanner.controller('weekViewCtrl', function($scope, $rootScope, meetingAgendaModel, $location, $resource){
	$scope.wholeHourList = [];
	
	//$scope.dataElement = $(".dataElement");
	$scope.testObject = {number:1};
	// console.log("$scope.testObject:" + $scope.testObject)
	// console.log($scope.testObject)

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
	$scope.today = new Date()
	console.log($scope.today);
	
	$scope.days = ["","","","","","",""];
	
	$scope.setdayList = function (inputData) {
		console.log($scope.today);
		if (inputData == undefined) {
		$scope.dayList = [];
		$scope.dayList.push($scope.today);

		for (var i = 1; i < $scope.today.getDay(); i++) {
			var day = new Date();
			day.setDate($scope.today.getDate()-i);
			$scope.dayList.push(day);
		};
		for (var j = 1; j < (8-$scope.today.getDay()); j++) {
			var dayAfter = new Date();
			dayAfter.setDate($scope.today.getDate()+j);
			$scope.dayList.push(dayAfter);
		}
		console.log($scope.dayList);

		
		 	for (var k = 0; k < $scope.dayList.length; k++) {
		 		dayString = $scope.dayList[k].toString();
		 		$scope.dayListPres = dayString.split(" ");
		 		$scope.days.splice($scope.dayList[k].getDay()-1, 1 ,[$scope.dayListPres[0],$scope.dayListPres[1],$scope.dayListPres[2]]);
			}
		}	else {
			for (var k = 0; k < $scope.dayList.length; k++) {
		 		console.log($scope.dayList[k].getDate());
		 		$scope.dayList[k].setDate($scope.dayList[k].getDate()+inputData);
		 		dayString = $scope.dayList[k].toString();
		 		$scope.dayListPres = dayString.split(" ");
		 		$scope.days.splice($scope.dayList[k].getDay()-1, 1 ,[$scope.dayListPres[0],$scope.dayListPres[1],$scope.dayListPres[2]]);

			};
		};

		console.log($scope.days[0][1]+$scope.days[0][2]);
		};
	$scope.setdayList();

	this.createCalBlock = function (){
		$scope.table=$("#weektable");
		// console.log($scope.table);
		$("#Mo 1.00").append("<p>Hej</p>");
		// console.log($("#Mo 1.00"));
		// console.log($scope.meeting);
	}

	this.createCalBlock();
})
