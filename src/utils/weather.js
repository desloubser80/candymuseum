const request = require('request');

var getWeather= (coordinates,callback)=>
{
    var lat = coordinates.lat;
    var long = coordinates.long;
    var place = coordinates.place;
   

    var dsUrl = "https://api.darksky.net/forecast/b2af32d00887e7b85105ecb45d4de3fe/"+lat+","+long+"?units=si";

    request
    (
        {
            url : dsUrl
            ,json  :true
        },
        (error,response)=>{
            if(error)
            {
                callback('There has been issue',undefined);
            }
            else if(response.body.error)
            {
                callback(response.body.error,undefined);
            }
            else
            {
                var temp = response.body.currently.temperature;    
                var summary = response.body.currently.summary;   
                callback(undefined,{temp,summary,place});
            }
        }
    );
}

module.exports = getWeather;

