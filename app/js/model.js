// JavaScript Document

// meetingAgendaPlanner.factory('meetingAgendaModel', function ($resource) {

meetingAgendaPlanner.factory('meetingAgendaModel', function ($resource, $firebaseObject) {
	
	var _this = this;
	this.daysInFirebase;

	// this.firebaseObject = function(name) {
	// 	var ref = new Firebase("http://brilliant-torch-7105.firebaseio.com");
	// 	var objectRef = ref.child(name);
	//  	return $firebaseObject(objectRef);
	// };
	// this.onComplete = function(error) {
 //  		if (error) {
 //    			console.log('Synchronization failed');
 //  		} else {
 //    			console.log('Synchronization succeeded');
 //  		}
	// };
	// this.convertedDay = function(dayObject, activityArray){
	// 	this.name = dayObject.getName();
	// 	this.weekDay = dayObject.getWeekDay();
	// 	this.start = dayObject.getStart();
	// 	this.end = dayObject.getEnd();
	// 	this.totalLength = dayObject.getTotalLength();
	// 	this.activities = activityArray;
	// };
	// this.convertedActivity = function(activityObject) {
	// 	this.name = activityObject.getName();
	// 	this.totalLength = activityObject.getLength();
	// 	this.typeId = activityObject.getTypeId();
	// 	this.description = activityObject.getDescription();
	// };

	// this.updateActivityIndex = function(listToFix) {
	// 		for (var i = 0; i < listToFix.length; i++) {
	// 			listToFix[i].index = i;
	// 		};
	// 		console.log(listToFix);

	// 	}
	
	// The possible activity types
	var _this = this;
	this.ActivityType = ["Presentation","Group Work","Discussion","Break"]

	////////////////////////flytta till rootScope ////////////////////////
	this.selectedDay;
	this.firebaseUpdated;
	// this.selectedDayIndex;
	this.selectedActivity;
	this.firebaseArray;
	
	// This is an activity constructor
	// When you want to create a new activity you just call
	// var act = new Activity("some activity",20,1,"Some description);

	this.Activity = function(JsonActivity){
		var _name = JsonActivity.name;
		var _length = JsonActivity.Length;
		//var _typeid = JsonActivity.typeid;
		var _description = JsonActivity.description;
		this.index = JsonActivity.index;
		// console.log("name: " + _name);
		

		// sets the name of the activity
		this.setName = function(name) {
			_name = name;
		}

		// get the name of the activity
		this.getName = function(name) {
			return _name;
		}
		
		// sets the length of the activity
		this.setLength = function(length) {
			_length = length;
		}

		// get the name of the activity
		this.getLength = function() {
			return _length;
		}
		
		// sets the typeid of the activity
		this.setTypeId = function(typeid) {
			_typeid = typeid;
		}

		// get the type id of the activity
		//this.getTypeId = function() {
			//return _typeid;
		//}
		
		// sets the description of the activity
		this.setDescription = function(description) {
			_description = description;
		}

		// get the description of the activity
		this.getDescription = function() {
			return _description;
		}
		
		// This method returns the string representation of the
		// activity type.
		this.getType = function () {
			return _this.ActivityType[_typeid];
		};
	}

	// This is a day consturctor. You can use it to create days, 
	// but there is also a specific function in the Model that adds
	// days to the model, so you don't need call this yourself.
	this.Day = function(dayJson ,startH,startM, name, firebaseObject, date) {
		var self = this;

		//Använd $firebaseObject för att redigera data, $firebaseArray för att lägga till
		// alert(FB.name + name)

		// this.firebaseObject = firebaseObject.day2;
		// this.firebaseObject._name = name;
		// // this.firebaseObject.date = date;
		// this.firebaseObject._weekDay = "";
		// this.firebaseObject._startH = startH;
		// this.firebaseObject._startH = startM;
		// this.firebaseObject._start = startH * 60 + startM;
		// this.firebaseObject._activities = ["kkk"];
		// this.firebaseObject.push("hej")

		// console.log("FB")
		// console.log(FB)

		// this.FB.day4.name = name
		// console.log(FB)
		this._dayJson = dayJson;
		this._name = dayJson.title;
		this._date = dayJson.start;
		this._activities = [];	//hämta från funktion
		this._id = dayJson.id;
		// alert(dayJson.$id)



		// this._name = name;
		//this._name = this.FB.day4.name;
		// this._date = date;
		// this.weekDay = "";
		// this.startH = startH;
		// this._start = startH * 60 + startM;
		// this._activities = [];

		// this.FB.name = "hejhej"

		


		this.setName = function (name) {
			// alert(this.FB.name)
			// alert(name)
			this._dayJson.title = name;
			// this._name = name;
			//console.log("self.FB")

			//console.log(self.FB)
			// self.FB.day4.name = name;

			// self.firebaseObject._name = name;
			// alert(this._name)


		}
		this.getName = function(){
			 return this._name;
			// alert(this.FB.day4.name)
			// return this.firebaseObject._name;
		}
		this.setWeekDay = function(day){
			this.weekDay = day;
		}
		this.getWeekDay = function(){
			return this.weekDay;
		}
		// sets the start time to new value
		this.setStart = function(startH,startM) {
			this._start = startH * 60 + startM;
		}

		// returns the total length of the acitivities in 
		// a day in minutes
		this.getTotalLength = function () {
			var totalLength = 0;
			$.each(this._activities,function(index,activity){
				totalLength += activity.getLength();
			});
			return totalLength;
		};
		
		// returns the string representation Hours:Minutes of 
		// the end time of the day
		this.getEnd = function() {
			var end = this._start + this.getTotalLength();
			return Math.floor(end/60) + ":" + end % 60;
	
		};
		
		// returns the string representation Hours:Minutes of 
		// the start time of the day
		this.getStart = function() {
			return Math.floor(this._start/60) + ":" + this._start % 60;
		};
		
		
		// adds an activity to specific position
		// if the position is not provided then it will add it to the 
		// end of the list
		this._addActivity = function(activity,position){
			if(position != null){
				this._activities.splice(position,0,activity);
			} else {
				this._activities.push(activity);
			}
		};
		
		// removes an activity from specific position
		// this method will be called when needed from the model
		// don't call it directly
		this._removeActivity = function(position) {
			return this._activities.splice(position,1)[0];
		};
		
		this.getActivity = function() {
			return this._activities;
		};
	}


	// this is our main module that contians days and praked activities
	// this.Model = function(){
		
		
		this.days = [];
		this.jsonDays = [];
		this.externalAPIEvents = [];
		this.parkedActivities = [];
		var _this = this;
		
		// adds a new day. if startH and startM (start hours and minutes)
		// are not provided it will set the default start of the day to 08:00
			this.hello = function () {
			alert("hej");
		}


		this.addJson = function (start,name, listSource, end) {


			this.jsonObject = {};
			this.jsonObject.title = name;
			this.jsonObject.start = start;
			if(listSource){
				this.jsonObject.listSource = listSource;
			}
			
			this.jsonObject.durationEditable = false;
			if (end) {
				this.jsonObject.end = end;
			}
			this.jsonObject.index = this.jsonDays.length;
			this.jsonObject.id = this.jsonDays.length;
			alert();
			this.jsonObject.activities = ['!'];
			// this.jsonObject.end = moments+activity...
			this.jsonObject.url = '#/meeting';
			// this.jsonObject.start = "2015-02-10T16:00:00";
			if(this.jsonObject.listSource == "externalAPI"){
				this.jsonObject.url = "";
				this.jsonObject.color = "green";
				this.jsonObject.editable = false;
				this.externalAPIEvents.push(this.jsonObject);
			}
			else{
				this.jsonDays.push(this.jsonObject);
			}
			
			return this.jsonObject;

		}

		this.addJsonActivity = function(name,length,description,index) {
			this.JsonActivity = {};
			this.JsonActivity.name = name;
			this.JsonActivity.Length = length;
			//this.JsonActivity.typeid = typeid;
			this.JsonActivity.description = description;
			this.JsonActivity.index = index;
			return this.JsonActivity;
		};



		this.addDay = function (dayJson, startH,startM, name, date) {
			var day;
			if(startH){
				// day = new this.Day(startH,startM, name, this.daysInFirebase,date);
				console.log(dayJson)
				day = new this.Day(dayJson);
			} else {
				// alert("hit")
				// day = new this.Day(8,0);
				day = new this.Day(dayJson);

			}
			this.days.push(day);
			console.log(this.days);
			return day;
		};

		this.removeDay = function (day){

			
			// alert(this.days[0]._name)
			// alert(this.selectedDay.getName())
			// alert(day._name)
			var index = this.days.indexOf(day);
			// alert(this.days[index]._name)
			// alert(this.days[index]._id)
			var d = this.days.splice(index, 1);
			// alert(day._id)
    		for(var i = 0; i < this.jsonDays.length; i += 1) {
    			// alert(this.jsonDays[i].id)
        		if(this.jsonDays[i].id === day._id) {
        			var index = this.jsonDays.indexOf(this.jsonDays[i]);
        			// alert(index + " index")
        			// alert(index)
        			// alert(this.jsonDays[index].id)
        			// alert(this.jsonDays[index].title)
        			var j =this.jsonDays.splice(index, 1);
        			
        		}
    		}
    		// alert("json" + j.title)
    		// alert("days" + d._name)

			var index = this.days.indexOf(day);
			// console.log(index)
			// console.log(day)
			// console.log(this.days)
			// console.log(this.jsonDays)

			// alert(index)
			// alert(2)
			// this.jsonDays[index].remove()
			// this.firebaseArray.$remove(index);
			// delete this.jsonDays[2];
			// alert(day.getName())
			// this.jsonDays.splice(index, 1);
			// this.days.splice(index, 1);

		}
		
		// add an activity to model
		this.addActivity = function (activity,day,position) {
			if(day != null) {
				this.days[day]._addActivity(activity,position);
			} else {
				if (position != null) {
					this.parkedActivities.splice(position,0,activity);
				}
				else this.parkedActivities.push(activity);
			}
		}
		
	// }
	// this is the instance of our main model
	// this is what you should use in your application

    	return this;




}); 
