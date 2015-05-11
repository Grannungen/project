meetingAgendaPlanner.controller('googleApiCtrl', function ($scope, $rootScope, meetingAgendaModel, $firebaseObject, $firebaseArray) {
      var CLIENT_ID = '907587605785-n1dav3sembqi5fap2h11bdc9oe662g69.apps.googleusercontent.com';

      // This quickstart only requires read-only scope, check
      // https://developers.google.com/google-apps/calendar/auth if you want to
      // request write scope.
      var SCOPES = ['https://www.googleapis.com/auth/calendar.readonly'];

      /**
       * Check if current user has authorized this application.
       */
      this.checkAuth = function () {
        gapi.auth.authorize(
          {
            'client_id': CLIENT_ID,
            'scope': SCOPES,
            'immediate': true
          }, handleAuthResult);
      }

      /**
       * Handle response from authorization server.
       *
       * @param {Object} authResult Authorization result.
       */
      $scope.handleAuthResult = function (authResult) {
        var authorizeDiv = document.getElementById('authorize-div');
        if (authResult && !authResult.error) {
          // Hide auth UI, then load Calendar client library.
          authorizeDiv.style.display = 'none';
          $scope.loadCalendarApi();
        } else {
          // Show auth UI, allowing the user to initiate authorization by
          // clicking authorize button.
          authorizeDiv.style.display = 'inline';
        }
      }

      /**
       * Initiate auth flow in response to user clicking authorize button.
       *
       * @param {Event} event Button click event.
       */
      $scope.handleAuthClick = function (event) {
        gapi.auth.authorize(
          {client_id: CLIENT_ID, scope: SCOPES, immediate: false},
          $scope.handleAuthResult);
        return false;
      }

      /**
       * Load Google Calendar client library. List upcoming events
       * once client library is loaded.
       */
      $scope.loadCalendarApi = function () {
        gapi.client.load('calendar', 'v3', $scope.listUpcomingEvents);
      }

      /**
       * Print the summary and start datetime/date of the next ten events in
       * the authorized user's calendar. If no events are found an
       * appropriate message is printed.
       */
      $scope.listUpcomingEvents = function () {
        var request = gapi.client.calendar.events.list({
          'calendarId': 'primary',
          'timeMin': (new Date()).toISOString(),
          'showDeleted': false,
          'singleEvents': true,
          'maxResults': 10,
          'orderBy': 'startTime'
        });

        request.execute(function(resp) {
          var events = resp.items;
          console.log(events);
          for (var i = 0; i < events.length; i++) {
            var start = events[i].start.dateTime;
            var end = events[i].end.dateTime;
            var name = events[i].summary;
            console.log(name);

            var day = meetingAgendaModel.addJson(start,name, "externalAPI", end);


            console.log(day);
            $rootScope.$apply()

            
          };
          console.log(meetingAgendaModel.externalAPIEvents);

          
        });
      }
  });
  