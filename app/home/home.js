meetingAgendaPlanner.controller('HomeCtrl', ['$scope','$firebaseSimpleLogin',function($scope,$firebaseSimpleLogin) {
 	$scope.SignIn = function($scope) {
    var username = $scope.user.email;
    var password = $scope.user.password;
    console.log("pelle");
    var firebaseObj = new Firebase("https://blistering-heat-2473.firebaseio.com");
    var loginObj = $firebaseSimpleLogin(firebaseObj);
    // Auth Logic will be here
	}
}]);