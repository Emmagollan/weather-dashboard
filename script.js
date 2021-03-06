const cities = [];
const cityFormEl = document.querySelector("#form");
const cityInputEl = document.querySelector("#city-input");
const weatherContainerEl = document.querySelector("#weather");
const citySearchInputEl = document.querySelector("#searched-city");
const forecastTitle = document.querySelector("#heading");
const forecastContainerEl = document.querySelector("#forecast");
const pastSearchButtonEl = document.querySelector("#past-search");

const formSumbitHandler = function(event){
    event.preventDefault();
    var city = cityInputEl.value.trim();
    if(city){
        getCityWeather(city);
        get5Day(city);
        cities.unshift({city});
        cityInputEl.value = "";
    } else{
        alert("Please enter a City");
    }
    saveSearch();
    pastSearch(city);
}

const saveSearch = function(){
    localStorage.setItem("cities", JSON.stringify(cities));
};

const getCityWeather = function(city){
    
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${"c0443b1297dbab0e3849b6173dea9ceb"}`)
    .then(function(response){
        response.json().then(function(data){
            displayWeather(data, city);
        });
    });
};

const displayWeather = function(weather, searchCity){
   //clear old content
   weatherContainerEl.textContent= "";  
   citySearchInputEl.textContent=searchCity;

   //console.log(weather);

   //create date element
   let currentDate = document.createElement("span")
   currentDate.textContent=" (" + moment(weather.dt.value).format("MMM D, YYYY") + ") ";
   citySearchInputEl.appendChild(currentDate);

   //create an image element
   let weatherIcon = document.createElement("img")
   weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`);
   citySearchInputEl.appendChild(weatherIcon);

   //create a span element to hold temperature data
   let temperatureEl = document.createElement("span");
   temperatureEl.textContent = "Temperature: " + weather.main.temp + " °F";
   temperatureEl.classList = "list-group-item"
  
   //create a span element to hold Humidity data
   let humidityEl = document.createElement("span");
   humidityEl.textContent = "Humidity: " + weather.main.humidity + " %";
   humidityEl.classList = "list-group-item"

   //create a span element to hold Wind data
   let windSpeedEl = document.createElement("span");
   windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + " MPH";
   windSpeedEl.classList = "list-group-item"

   //append to container
   weatherContainerEl.appendChild(temperatureEl);

   //append to container
   weatherContainerEl.appendChild(humidityEl);

   //append to container
   weatherContainerEl.appendChild(windSpeedEl);

}

const get5Day = function(city){
    

    fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${"c0443b1297dbab0e3849b6173dea9ceb"}`)
    .then(function(response){
        response.json().then(function(data){
           display5Day(data);
        });
    });
};

const display5Day = function(weather){
    forecastContainerEl.textContent = ""
    forecastTitle.textContent = "5-Day Forecast:";

    let forecast = weather.list;
        for(var i=5; i < forecast.length; i=i+8){
       let dailyForecast = forecast[i];
        
       
       let forecastEl=document.createElement("div");
       forecastEl.classList = "card bg-primary text-light m-2";

        //create date element
       let forecastDate = document.createElement("h5")
       forecastDate.textContent= moment.unix(dailyForecast.dt).format("MMM D, YYYY");
       forecastDate.classList = "card-header text-center"
       forecastEl.appendChild(forecastDate);

        //create an image element
       let weatherIcon = document.createElement("img")
       weatherIcon.classList = "card-body text-center";
       weatherIcon.setAttribute("src", `https://openweathermap.org/img/wn/${dailyForecast.weather[0].icon}@2x.png`);  

       //append to forecast card
       forecastEl.appendChild(weatherIcon);

        //create temperature span
       let forecastTempEl=document.createElement("span");
       forecastTempEl.classList = "card-body text-center";
       forecastTempEl.textContent = dailyForecast.main.temp + " °F";

       //append to forecast card
        forecastEl.appendChild(forecastTempEl);

       let forecastHumEl=document.createElement("span");
       forecastHumEl.classList = "card-body text-center";
       forecastHumEl.textContent = dailyForecast.main.humidity + "  %";

       //append to forecast card
       forecastEl.appendChild(forecastHumEl);
        //append to five day container
        forecastContainerEl.appendChild(forecastEl);
    }

}

const pastSearch = function(pastSearch){
    pastSearchEl = document.createElement("button");
    pastSearchEl.textContent = pastSearch;
    pastSearchEl.classList = "d-flex w-100 btn-light border p-2";
    pastSearchEl.setAttribute("data-city",pastSearch)
    pastSearchEl.setAttribute("type", "submit");
    pastSearchButtonEl.prepend(pastSearchEl);
}


const pastSearchHandler = function(event){
    let city = event.target.getAttribute("data-city")
    if(city){
        getCityWeather(city);
        get5Day(city);
    }
}

cityFormEl.addEventListener("submit", formSumbitHandler);
pastSearchButtonEl.addEventListener("click", pastSearchHandler);