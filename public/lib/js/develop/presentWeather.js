/**
 *
 */
function showPresentWeather(){

	$.ajax({
		type: "get",
		url:"/WeatherClock/GetPresentWeatherInfoController",
		dataType:"json"
	}).done((data => {
		console.log(data);
		var msg1 = data.outsideTemperature + "°C";
		var msg2 = '<img src="../icon/' + data.weather.icon + '@2x.png" width="20%">';
		document.getElementById("PresentOutsideTemperatureArea").innerHTML = msg1;
		document.getElementById("PresentWeatherArea").innerHTML = msg2;
	})).fail((data) => {
		console.log('cannot access url');
	})
}

