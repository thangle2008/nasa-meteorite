var NearAsteroids = {
	asteroids: null,
	LAST_DAY: "2016-10-10",
	counter: 0,

	// get near-earth asteroid information from NASA
	getAsteroid: function() {
		var today = new Date();

		var dd = today.getDate();
		var mm = today.getMonth() + 1;
		var yyyy = today.getFullYear();

		if(dd < 10)
			dd = "0" + dd;
		if(mm < 10)
			mm = "0" + dd;

		today = yyyy + '-' + mm + '-' + dd;

		NearAsteroids.LAST_DAY = window.localStorage.getItem("date");
		if(NearAsteroids.LAST_DAY !== today) {
			window.localStorage.removeItem("date");
			window.localStorage.removeItem("asteroids");
		}

		savedAsteroids = window.localStorage.getItem("asteroids");
		if(savedAsteroids !== null)
			NearAsteroids.asteroids = JSON.parse(savedAsteroids);

		if(NearAsteroids.LAST_DAY !== today || NearAsteroids.asteroids === null) {
			$.ajax({
			    url: "https://api.nasa.gov/neo/rest/v1/feed?api_key=mOHr7NInM8k6SbMFguHIriSJ0yzaH9MOgDnB5OI4",
			    type: "GET",
			}).done(function(data) {
				console.log("Successfully collect data");
				NearAsteroids.LAST_DAY = today;
			  	NearAsteroids.asteroids = data["near_earth_objects"][today];

			  	window.localStorage.setItem("date", NearAsteroids.LAST_DAY);
			  	window.localStorage.setItem("asteroids", JSON.stringify(NearAsteroids.asteroids));

			  	NearAsteroids.writeInformation();
			});
		}
		else NearAsteroids.writeInformation();
	},

	// display asteroid information
	writeInformation: function() {
		var asteroids = NearAsteroids.asteroids;
		var counter = NearAsteroids.counter;
		if(asteroids !== null && asteroids.length > 0) {
			counter++;

			if(counter >= asteroids.length)
				counter = 0;

			NearAsteroids.counter = counter;
			
			var asteroidText = document.getElementById("asteroidInformation");

			asteroidText.innerHTML = "Name: " + "<font color=\"red\">" + asteroids[counter]["name"] + "</font>"
					+ "\t <a href=" + asteroids[counter]["nasa_jpl_url"] + " target=\"_blank\">NASA URL</a>";

			var ed = asteroids[counter]["estimated_diameter"]["meters"];
			asteroidText.innerHTML += "<br/>Estimated diameter: from " + Math.floor(ed["estimated_diameter_min"])
									+ " to " + Math.floor(ed["estimated_diameter_max"]) + " meters";

			var approach_data = asteroids[counter]["close_approach_data"][0];
			asteroidText.innerHTML += "<br/>Approach date: " + approach_data["close_approach_date"];
			
			asteroidText.innerHTML += "<br/>Relative velocity: " + 
							parseFloat(approach_data['relative_velocity']['kilometers_per_second']).toFixed(2) + " km/s";

			asteroidText.innerHTML += "<br/>Miss distance: " +
							parseFloat(approach_data['miss_distance']['kilometers']).toFixed(2) + " km";

			asteroidText.innerHTML += "<br/>Is hazardous: " + 
									asteroids[counter]['is_potentially_hazardous_asteroid'];

			asteroidText.setAttribute("class", "asteroidDisplay");
		}
	}
}

