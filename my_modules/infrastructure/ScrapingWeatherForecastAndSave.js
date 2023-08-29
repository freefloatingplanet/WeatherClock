const ax = require('axios');
const conf = require('config');
const fs = require('fs').promises;

let ScrapeingWeatherForecastAndSave= {};

ScrapeingWeatherForecastAndSave.do = ()=>{
    let url = 'https://www.jma.go.jp/bosai/jmatile/data/wdist/VPFD/130010.json';
    ax(url)
        .then(response => {
            const html = response.data;
            const timeDefinesAreaArray = html.areaTimeSeries.timeDefines;
            const weatherArray = html.areaTimeSeries.weather;
            const temperatureArray = html.pointTimeSeries.temperature;
            //ポイントのtimeDefinesはこうやったら取れるがAreaの数と一致しない(pointの方が多いので使わない)
            //const timeDefinesPointArray = html.pointTimeSeries.timeDefines;
            retList = [];
            timeDefinesAreaArray.forEach(function(ele,index,array){
                let retJson = {};
                let retDateTimeJson = {}
                let retWeatherJson = {}


                let dateTime = ele.dateTime;
                let weather = weatherArray[index];
                let retTemperature = temperatureArray[index];

                let retDateTime = new Date(dateTime);
                let retMonDate = format("{0}/{1}",retDateTime.getMonth()+1,retDateTime.getDate());
                let retTime = retDateTime.getHours();
                retDateTime = formatDate(retDateTime,"yyyy-MM-dd HH:mm:ss");

                let [retWeather,retIcon,retId] = convertSystemWeather(weather);

                retDateTimeJson["datetime"] = retDateTime;
                retDateTimeJson["date"] = retMonDate;
                retDateTimeJson["time"] = retTime;

                retWeatherJson["main"] = retWeather;
                retWeatherJson["icon"] = retIcon;
                retWeatherJson["id"] = retId;

                retJson["timeinfo"] = retDateTimeJson;
                retJson["temp"] = retTemperature;
                retJson["weather"] = retWeatherJson;

                retList.push(retJson);

            })
            fs.writeFile(conf.forecast,JSON.stringify({"list":retList}));
        }).catch(err => console.error(err));
}

// テキストフォーマット
// arg1: 書式
// arg2~: arg1に指定した書式に対する文字列に対して引数を複数指定
// 例) format("{0} aaa {1}", "1st Arg","2nd Arg")
const format = (str, ...args) => {
    for (const [i, arg] of args.entries()) {
      const regExp = new RegExp(`\\{${i}\\}`, 'g')
      str = str.replace(regExp, arg)
    }
    return str
  }
  
// dateオブジェクトを書式指定して文字列返却
const formatDate = (date, format) => {
    format = format.replace(/yyyy/g, date.getFullYear());
    format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2));
    format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2));
    format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2));
    format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2));
    format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2));
    format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3));
    return format;
}

// 天気予報変換
//   以下のサイト準拠
//   https://openweathermap.org/weather-conditions
const convertSystemWeather = (weather) => {
    let sysWeather = "";
    let icon = "";
    let id = "";
    switch(weather){
        case "晴れ":
            sysWeather = "Clear";
            icon = "01d";
            id = "800";
            break;
        case "くもり":
            sysWeather = "Cloud";
            icon = "04d";
            id = "804";
            break;
        case "雨":
            sysWeather = "Rain";
            icon = "09d";
            id = "521";
            break;
        case "雪":
            sysWeather = "Snow";
            icon = "13d";
            id = "601";
            break;
        default:
            break;
    }
    return [sysWeather,icon,id];
}

module.exports = ScrapeingWeatherForecastAndSave;