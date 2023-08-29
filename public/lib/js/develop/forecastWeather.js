/**
 *
 */
function showForecastWeather(){

	$.ajax({
		type: "get",
		url:"/WeatherClock/GetForecastWeatherInfoController",
		dataType:"json"
	}).done((data => {
		console.log(data);
		var dispdate = "";
		var prevdate = "";
		var nowdate = "";

		var forcastData = [];
		var forcast;

		for(let i=0; i < 9; i++){
			forcast = data.list[i]
			nowdate = forcast.timeinfo.date;
			if(nowdate == prevdate){
				dispdate = "";
			}else{
				dispdate = nowdate;
			}
			forcast.timeinfo.dispdate = dispdate;
			forcast.weather.iconPath = "/lib/icon/" + forcast.weather.icon + "@2x.png";
			forcastData.push(forcast);

//			document.getElementById("time"+i).innerHTML = dispdate + "&emsp;" + forecast.timeinfo.time;
//			document.getElementById("temp"+i).innerHTML = forecast.temp;
//			document.getElementById("weather"+i).innerHTML = '<img src="../icon/' + forecast.weather.icon + '@2x.png" width="65%">';
//			document.getElementById("weather"+i).innerHTML = {"Clear":"晴れ","Clouds":"曇り","Rain":"雨"}[forecast.weather.main];
			prevdate = nowdate;
		}

		forcastApp.forcastData = forcastData;

	})).fail(() => {
		console.log('cannot access url');
	})
}

