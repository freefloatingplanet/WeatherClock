const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser')
const fs = require('fs')
const readline = require('readline')
const os = require('os');
const conf = require('config');
const scrape = require('./my_modules/infrastructure/ScrapingWeatherForecastAndSave');

app.listen(conf.port, () => {
  console.log('Running at Port '+conf.port+'...');
});

// 静的ファイルのルーティング
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

// 天気予報情報更新
app.get('/WeatherClock/CollectWeatherForecastData',(req,res) => {
  scrape.getRainyForecast();
  scrape.getWeatherTemp();
  res.send("success");
});

// 天気予報取得
app.get('/WeatherClock/GetForecastWeatherInfoController',(req,res) => {
  console.log(req.body);

  // 降水確率を読み込み
  const rainyJson = JSON.parse(fs.readFileSync(conf.rainyforecast));
  const forecastJson = JSON.parse(fs.readFileSync(conf.forecast));
  for(let ele of forecastJson.list){
    ele.rainypops = "-";
    for(let rain of rainyJson.list){
      if(ele.timeinfo.datetime === rain.timeinfo){
        ele.rainypops = rain.rainypops;
      }
    }
  }
  console.log(forecastJson);
  res.send(forecastJson);




  // Streamを準備
  /** 
  const stream = fs.createReadStream(conf.forecast, {
    encoding: "utf8",         // 文字コード
    highWaterMark: 1024       // 一度に取得するbyte数
  });

  // readlineにStreamを渡す
  const reader = readline.createInterface({ input: stream });

  let retdata = {};
  reader.on("line", (data) => {
    console.log(data);
    retdata = JSON.parse(data);
  });
  reader.on('close',(data) => {



    console.log(retdata);
    res.send(retdata);  
  })
  */

});
