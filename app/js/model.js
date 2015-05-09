// JavaScript Document

// meetingAgendaPlanner.factory('meetingAgendaModel', function ($resource) {

meetingAgendaPlanner.factory('meetingAgendaModel', function ($resource, $firebaseObject) {
	
	var _this = this;
	this.daysInFirebase;

	this.firebaseObject = function() {
		var ref = new Firebase("http://brilliant-torch-7105.firebaseio.com");
	 	return ref;	
	};
	this.onComplete = function(error) {
  		if (error) {
    			console.log('Synchronization failed');
  		} else {
    			console.log('Synchronization succeeded');
  		}
	};
	this.convertedDay = function(dayObject, activityArray){
		this.name = dayObject.getName();
		this.weekDay = dayObject.getWeekDay();
		this.start = dayObject.getStart();
		this.end = dayObject.getEnd();
		this.totalLength = dayObject.getTotalLength();
		this.activities = activityArray;
	};
	this.convertedActivity = function(activityObject) {
		this.name = activityObject.getName();
		this.totalLength = activityObject.getLength();
		this.typeId = activityObject.getTypeId();
		this.description = activityObject.getDescription();
	};
	
	// The possible activity types
	var _this = this;
	this.ActivityType = ["Presentation","Group Work","Discussion","Break"]

	// //////////////////////flytta till rootScope ////////////////////////
	this.selectedDay;
	this.selectedActivity;

	
	// This is an activity constructor
	// When you want to create a new activity you just call
	// var act = new Activity("some activity",20,1,"Some description);

	this.Activity = function(name,length,typeid,description, index){
		var _name = name;
		var _length = length;
		var _typeid = typeid;
		var _description = description;
		
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
		this.getTypeId = function() {
			return _typeid;
		}
		
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
	this.Day = function(startH,startM, name, FB) {


		// firebaseObject.name = name


		// alert(FB.name + name)
		var self = this;
		this.FB = FB
		console.log("FB")
		console.log(FB)

		this.FB.day4.name = name
		console.log(FB)


		this._name = this.FB.day4.name;
		// this.FB.name = this._name
		this.weekDay = "";
		this.startH = startH;
		this._start = startH * 60 + startM;
		this._activities = [];

		// this.FB.name = "hejhej"


		this.setName = function (name) {
			// alert(this.FB.name)
			// alert(name)
			// this._name = name;
			console.log("self.FB")

			console.log(self.FB)
			self.FB.name = name;
			// alert(this._name)


		}
		this.getName = function(){
			// return this._name;
			// alert(this.FB.day4.name)
			return this.FB.day4.name;
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
		
		// returns the length (in minutes) of activities of certain type
		this.getLengthByType = function (typeid) {
			var length = 0;
			$.each(this._activities,function(index,activity){
				if(activity.getTypeId() == typeid){
					length += activity.getLength();
				}
			});
			return length;
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
		
		// moves activity inside one day
		// this method will be called when needed from the model
		// don't call it directly
		this._moveActivity = function(oldposition,newposition) {
			// In case new position is greater than the old position and we are not moving
			// to the last position of the array
			if(newposition > oldposition && newposition < this._activities.length - 1) {
				newposition--;
			}
			var activity = this._removeActivity(oldposition);
			this._addActivity(activity, newposition);
		};
		this.getActivity = function() {
			return this._activities;
		};
	}


	// this is our main module that contians days and praked activites
	// this.Model = function(){
		
		
		this.days = [];
		this.parkedActivities = [];
		
		// adds a new day. if startH and startM (start hours and minutes)
		// are not provided it will set the default start of the day to 08:00
			this.hello = function () {
			alert("hej");
		}


		this.addDay = function (startH,startM, name) {
			_this.daysInFirebase.day4={name:'mötet', tid:14}
			console.log("this.daysInFirebase" + this.daysInFirebase)
			console.log(this.daysInFirebase)
			var day;
			if(startH){
				day = new this.Day(startH,startM, name, _this.daysInFirebase);
			} else {
				day = new this.Day(8,0);
			}
			this.days.push(day);
			return day;
		};

		this.removeDay = function (day){
			var index = this.days.indexOf(day);
			this.days.splice(index, 1);
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
		
		// add an activity to parked activities
		this.addParkedActivity = function(activity,position){
			this.addActivity(activity,null,position);
		};
		
		// remove an activity on provided position from parked activites 
		this.removeParkedActivity = function(position) {
			act = this.parkedActivities.splice(position,1)[0];
			return act;
		};
		
		// moves activity between the days, or day and parked activities.
		// to park activity you need to set the new day to null
		// to move a parked activity to let's say day 0 you set oldday to null
		// and new day to 0
		this.moveActivity = function(oldday, oldposition, newday, newposition) {
			if(oldday !== null && oldday == newday) {
				this.days[oldday]._moveActivity(oldposition,newposition);
			}else if(oldday == null && newday == null) {
				var activity = this.removeParkedActivity(oldposition);
				this.addParkedActivity(activity,newposition);
			}else if(oldday == null) {
				var activity = this.removeParkedActivity(oldposition);
				this.days[newday]._addActivity(activity,newposition);
			}else if(newday == null) {
				var activity = this.days[oldday]._removeActivity(oldposition);
				this.addParkedActivity(activity,newposition);
			} else {
				var activity = this.days[oldday]._removeActivity(oldposition);
				this.days[newday]._addActivity(activity,newposition);
			}
		};
	// }
	// this is the instance of our main model
	// this is what you should use in your application

    	return this;




}); 
