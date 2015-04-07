meetingAgendaPlanner.controller('meetingEditorCtrl', function ($scope) {
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
		 console.log($scope.hourList)
	}
	this.setHourList();

	// var test = meetingModel.test;
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