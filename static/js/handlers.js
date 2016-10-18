ASTEROIDS = [];
LAST_DAY = "2016-10-10";
COUNTER = 0;

var getAsteroid = function() {
	var asteroidText = document.getElementById("asteroidInformation");

	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();

	if(dd < 10)
		dd = "0" + dd;
	if(mm < 10)
		mm = "0" + dd;

	today = yyyy + '-' + mm + '-' + dd;

	if(LAST_DAY !== today || ASTEROIDS.length === 0) {
		$.ajax({
		    url: "https://api.nasa.gov/neo/rest/v1/feed?api_key=DEMO_KEY",
		    type: "GET",
		}).done(function(data) {
			LAST_DAY = today;
			console.log(data);
		  	ASTEROIDS = data["near_earth_objects"][today];
		  	getAsteroid();
		});
	}

	// write information
	if(ASTEROIDS.length > 0) {
		asteroidText.innerHTML = "Asteroid's name: " + ASTEROIDS[0]["name"] + "<br/>"
							+ "<a href=" + ASTEROIDS[0]["nasa_jpl_url"] + " target=\"_blank\">NASA URL</a>";

		var ed = ASTEROIDS[0]["estimated_diameter"]["meters"];
		asteroidText.innerHTML += "<br/> Estimated diameter: from " + Math.floor(ed["estimated_diameter_min"])
								+ " to " + Math.floor(ed["estimated_diameter_max"]) + " meters";

		var approach_data = ASTEROIDS[0]["close_approach_data"][0];
		asteroidText.innerHTML += "<br/> Approach date: " + approach_data["close_approach_date"];
		asteroidText
		asteroidText.innerHTML += "<br/> Relative velocity: " + 
						parseFloat(approach_data['relative_velocity']['kilometers_per_second']).toFixed(2) + " km/s";

		asteroidText.innerHTML += "<br/> Is hazardous: " + ASTEROIDS[0]['is_potentially_hazardous_asteroid'];

		asteroidText.setAttribute("class", "asteroidDisplay");
	}
}
