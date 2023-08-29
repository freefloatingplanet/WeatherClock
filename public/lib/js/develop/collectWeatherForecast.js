/**
 *
 */
function collectWeatherForecastData(){
	$.ajax({
		type: "get",
		url:"/WeatherClock/CollectWeatherForecastData",
		dataType:"json"
	}).done((data => {
		console.log(data);
	})).fail((data) => {
		console.log('cannot access url');
	})
}

