const apiKey = "b32c91c992192632c44fbf5cc8a711f9";

const searchBtn = document.getElementById("searchBtn");
const locationBtn = document.getElementById("locationBtn");


searchBtn.onclick = () => {

    let city = document.getElementById("city").value;

    if(city === ""){
        alert("Enter city name");
        return;
    }

    getWeather(city);

};



locationBtn.onclick = () => {


    navigator.geolocation.getCurrentPosition(

        (position)=>{

            let lat = position.coords.latitude;
            let lon = position.coords.longitude;

            getLocationWeather(lat,lon);

        },

        ()=>{
            alert("Location permission denied");
        }

    );

};





async function getWeather(city){


    let url =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;


    let response = await fetch(url);

    let data = await response.json();


    console.log("CITY DATA:",data);


    showWeather(data);

}





async function getLocationWeather(lat,lon){


    let url =
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;


    let response = await fetch(url);


    let data = await response.json();


    console.log("LOCATION DATA:",data);


    showWeather(data);


}





function showWeather(data){

    console.log(data);

    document.getElementById("cityName").innerHTML =
    data.name;


    document.getElementById("country").innerHTML =
    data.sys.country;



    document.getElementById("temperature").innerHTML =
    Math.round(data.main.temp)+"°C";



    document.getElementById("weatherType").innerHTML =
    data.weather[0].main;



    document.getElementById("description").innerHTML =
    data.weather[0].description;



    document.getElementById("feelsLike").innerHTML =
    Math.round(data.main.feels_like)+"°C";



    document.getElementById("humidity").innerHTML =
    data.main.humidity+"%";



    document.getElementById("wind").innerHTML =
    (data.wind.speed*3.6).toFixed(1)+" km/h";



    document.getElementById("pressure").innerHTML =
    data.main.pressure+" hPa";



    document.getElementById("visibility").innerHTML =
    (data.visibility/1000).toFixed(1)+" km";



    document.getElementById("weatherIcon").src =
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;



    document.getElementById("dateTime").innerHTML =
    new Date().toLocaleString();


}