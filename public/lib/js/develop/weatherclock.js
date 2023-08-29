/**
 *
 */
var forcastApp = new Vue({
	el: '#forcastApp',
	created: function(){
		this.updateData();
		this.showGetData();
		this.showClock();
	},
	data: {
		forcastData : []
	},
	methods:{
		showGetData: function(){
			setInterval(() => {
				//			showRoomTemperature();
				//			showPresentWeather();		
				showForecastWeather();				
			},60000)
		},
		showClock: function(){
			// analog start
			const { context , hankei } =  initialCanvas("analog");
			const cCircle = centerCircle( context );
			const mBan = mojiban ( context , hankei );
			const hourHand = new handObj( handDatas.hour , context , hankei );
			const minuteHand = new handObj( handDatas.minute , context , hankei );
			const secondHand = new handObj( handDatas.second , context , hankei );
			  
			const sideLength = hankei * 2;

			// analog end

			setInterval(() => {
				showClock1();
				// analog start
				const date = new Date();
				// 時計を消去
				context.clearRect(-hankei , -hankei , sideLength , sideLength);
				mBan();
				hourHand.rewrite( (date.getHours()%12) * 60 + date.getMinutes() );
				minuteHand.rewrite( date.getMinutes() );
				secondHand.rewrite( date.getSeconds() );
				cCircle( );
				// analog end
		
			},1000)
		},
		updateData: function(){
			setInterval(() => {
				collectWeatherForecastData();
			},600000)
		}
	}
})

