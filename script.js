const cityInputE1 = document.getElementById("city-input");
const seachBtnE1 = document.getElementById("seach-btn");
const clearHistoryE1 = document.getElementById("clear-history");
const cityNameE1 = document.getElementById("city-name");
const historyE1 = document.getElementById("history");
const imageE1 = document.getElementById("image");
const tempE1 = document.getElementById("temperature");
const humidityE1 = document.getElementById("humidity");
const windSpeedE1 = document.getElementById("wind-speed");
const uvIndexE1 = document.getElementById("UV-index");


searchBtnE1.addEventListener('click',()=>{
    
    fetch(
        "api.openweathermap.org/data/2.5/forecast?q=" + cityNameE1 + "&c0443b1297dbab0e3849b6173dea9ceb" 
    
    )
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
        const {temperature} = data;
        temperature.textContent= temperature;
    });
    
})



    
