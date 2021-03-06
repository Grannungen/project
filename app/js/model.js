meetingAgendaPlanner.factory('meetingAgendaModel', function ($resource, $firebaseObject) {
	

	this.updateActivityIndex = function() {
	 	for (var i = 0; i < _this.selectedDay._activities.length; i++) {
	 		_this.selectedDay._activities[i].setIndex(i);
		};
	}
	


	//Variables that need to be access from multiple controllers
	this.selectedDay;
	this.firebaseUpdated;
	this.selectedActivity;
	// this.firebaseArray;
	

	var _this = this;	//fixes problem with indefined in nested structures
	this.days = []; //Days stored as a Day object
	this.jsonDays = []; //Days stored without functions. Is used in firebase and fullcalendar.
	this.externalAPIEvents = []; //Stores the event from external API i.e goole calendar. 

	// This is an activity constructor
	this.Activity = function(JsonActivity){
		var _jsonActivity = JsonActivity;
		var _name = JsonActivity.name;

		var _length = JsonActivity.length;
		var _description = JsonActivity.description;

		this._index = JsonActivity.index;
		
		this.setIndex = function(index){
			this._index = index;
			_jsonActivity.index = index;
		}
		
		this.getIndex = function() {
			return _index;
		}


		
		// sets the name of the activity
		this.setName = function(name) {
			_name = name;
			_jsonActivity.name = name;

		}

		// get the name of the activity
		this.getName = function() {
			return _name;
		}
		
		// sets the length of the activity
		this.setLength = function(length) {
			_length = length;
			_jsonActivity.Length = length

		}

		// get the name of the activity
		this.getLength = function() {
			return _length;
		}
		
		
		// sets the description of the activity
		this.setDescription = function(description) {
			_description = description;
			_jsonActivity.description = description;

		}

		// get the description of the activity
		this.getDescription = function() {
			return _description;
		}
		
	}

	// This is a day consturctor. You can use it to create days, 
	// but there is also a specific function in the Model that adds
	// days to the model, so you don't need call this yourself.
	this.Day = function(dayJson ,startH,startM, name, firebaseObject, date) {
		var self = this;

		this._dayJson = dayJson; //A javascript object without functions. This is synced with firebase.
		this._name = dayJson.title;
		this._date = dayJson.start;
		this._activities = [];	//hämta från funktion
		this._id = dayJson.id;

		this.setName = function (name) {
			this._dayJson.title = name;
			this._name = name;
		}
		this.getName = function(){
			 return this._name;
		}

		// sets the start time to new value
		this.setDate = function(start) {
			this._dayJson.start = start;
			this._date = start;
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
			var date = moment(this._date)
			var totalLength = this.getTotalLength();
			var end = date.add(totalLength, 'minutes')
			if (totalLength != 0){
				this._dayJson.end = end.format('YYYY-MM-DD hh:mm a');
			}
			return end.format('YYYY-MM-DD HH:mm a')
		};

		// returns the start date on the format YYYY-MM-DD
		this.getDate = function() {
			var date = moment(this._date)
			return date.format('YYYY-MM-DD')
		};
		
		
		// returns the string representation Hours:Minutes of 
		// the start time of the day
		this.getStart = function() {
			var date = moment(this._date)
			return date.format('YYYY-MM-DD HH:mm a');
		};
		
		
		// adds an activity to specific position
		// if the position is not provided then it will add it to the 
		// end of the list
		this._addActivity = function(activity,position){
				this._activities.push(activity);
		};

		// removes an activity from specific position
		// this method will be called when needed from the model
		// don't call it directly
		this._removeActivity = function(position) {
			this._dayJson.activities.splice(position,1);
			return this._activities.splice(position,1)[0];
		};
		
		// return the activities as a list
		this.getActivity = function() {
			return this._activities;
		};
	}

		//generates an unique id
		this.generateId = function (list) {
			var a = 0;
			while(a == 0){
				a = 1;
				var rand = Math.random();
				for (var i = 0; i < list.length; i++) {
					if (list[i]._id == rand) {
							a = 0;
						}
					}
				};
				return rand
			}


		//This function will create an javascript day object without any functions. 
		this.addJson = function (start,name, listSource, end) {
			this.jsonObject = {};
			this.jsonObject.title = name;	//fullcalendar uses title
			this.jsonObject.start = start;	//start time
			this.jsonObject.activities = [];
			var id = this.generateId(this.jsonDays)
			this.jsonObject._id = id;
			this.jsonObject.url = '#/meeting';	//When you click on a calendar event you will be redirected to meetingView
			this.jsonObject.durationEditable = false; //You can rezise the event block in the calendar
			if (end) {
				this.jsonObject.end = end;
			}
			if(listSource == "externalAPI"){
				this.jsonObject.listSource = listSource; //stores the string 'externalAPI'
				this.jsonObject.url = ""; //External sources are not editable and should there for not link anywhere
				this.jsonObject.color = "green";
				this.jsonObject.editable = false;
				this.externalAPIEvents.push(this.jsonObject);
			}
			else{
				this.jsonDays.push(this.jsonObject);
			}
			return this.jsonObject;

		}

		//This function will create a javascript activity object without functions.
		this.addJsonActivity = function(name,length,description,index) {
			this.JsonActivity = {};
			this.JsonActivity.name = name;
			this.JsonActivity.length = length;	//length in minutes 
			this.JsonActivity.description = description;
			this.JsonActivity.index = index;
			return this.JsonActivity;
		};


		//creates a new Day object
		this.addDay = function (dayJson) {
			var day;
			day = new this.Day(dayJson);
			this.days.push(day);
			return day;
		};

		//removes the Day object on this.days and this.jsonDays
		this.removeDay = function (day){			
			var index = this.days.indexOf(day);
			this.days.splice(index, 1);
    		for(var i = 0; i < this.jsonDays.length; i += 1) {
        		if(this.jsonDays[i].title === day._name) {
        			var index = this.jsonDays.indexOf(this.jsonDays[i]);
        			var j =this.jsonDays.splice(index, 1);
        		}
    		}
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
		
    	return this;
    	// this is the instance of our main model
}); 
