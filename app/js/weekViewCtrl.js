meetingAgendaPlanner.controller('weekViewCtrl', function($scope, meetingAgendaModel, $location, $resource){
	$scope.wholeHourList = [];
	//$scope.dataElement = $(".dataElement");
	//this.Dish = $resource('http://www.google.com/calendar/feeds/developer-calendar@google.com/public/full?alt=json-in-script&callback=insertAgenda&orderby=starttime&max-results=15&singleevents=true&sortorder=ascending&futureevents=true');
	//console.log(Dish);
	this.Dish = $resource("https://www.google.com/calendar/render#main_7");
	// console.log(this.Dish);
	//$.ajax({
      //      type: "GET",
        //    dataType: 'json',
          //  cache: false,
          //  url: url,
           // success: function (data) {
 	//				console.log(data);
      //          }
       // });
	$scope.addNew = function () {
		var target = event.target.id;
		var chosenDayTime = target.split(",");
		// console.log(chosenDayTime);
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
		// console.log($scope.table);
		$("#Mo 1.00").append("<p>Hej</p>");
		// console.log($("#Mo 1.00"));
		// console.log($scope.meeting);
	}
	this.createCalBlock();
})
