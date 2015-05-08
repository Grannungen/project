	meetingAgendaPlanner.controller('OverviewCtrl', function($scope) {
  	// $scope.list1 = {title: 'AngularJS - Drag Me'};
  	// $scope.list2 = {};
  	// $scope.list3 = {title: '1', title: '2', title: '3', title: '4', title: '5'}
  	// $scope.list4 = ["ett","två","tre","fyra"]
  	// $scope.testar = "hej!";
  	// $scope.karlJohan = "Karl Johan"
  	// $scope.testing = function () {
  	// 	console.log($scope.list4);
  	// 	console.log("el: " + $scope.el)
  	// }
  	// $scope.setDraggedElement = function (element) {
  	// 	$scope.draggedElement = element;
  	// 	console.log("element: " + element);
  	// 	console.log(element);

  	// }








  	        $scope.list1 = [];
        $scope.list2 = [];
        $scope.list3 = [];
        $scope.list4 = [];
        
        $scope.list5 = [
          { 'title': 'Item 1', 'drag': true },
          { 'title': 'Item 2', 'drag': true },
          { 'title': 'Item 3', 'drag': true },
          { 'title': 'Item 4', 'drag': true },
          { 'title': 'Item 5', 'drag': true },
          { 'title': 'Item 6', 'drag': true },
          { 'title': 'Item 7', 'drag': true },
          { 'title': 'Item 8', 'drag': true }
        ];

        // Limit items to be dropped in list1
        $scope.optionsList1 = {
          accept: function(dragEl) {
            if ($scope.list1.length >= 2) {
              return false;
            } else {
              return true;
            }
          }
        };
	});
	