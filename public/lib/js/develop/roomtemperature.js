/**
 *
 */
function showRoomTemperature(){
	$.ajax({
		type: "get",
		url:"/WeatherClock/GetRoomTemperatureController",
		dataType:"json"
	}).done((data => {
		console.log(data);
		var msg = data.roomTemperature + "°C";
		document.getElementById("RoomTemperatureArea").innerHTML = msg;
	})).fail((data) => {
		console.log('cannot access url');
	})
}

