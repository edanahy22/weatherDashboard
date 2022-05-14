// global variables
// var searchBtn = document.getElementById('search-button');
var savedCitiesBtn = document.querySelector('.saved-cities');
var apiKey= 'd35cd0aa37b6ae911ac59a75948a0658';
var apiUrl= 'https://api.openweathermap.org/';


function renderWeather(data){
    console.log(data.current.temp);
    $('#city-name').text($("#city").val()); 
    $('#temp').text(data.current.temp);
}


function weather(lat,lon){
    console.log('here');
    var weatherApi= `${apiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
    fetch(weatherApi)
    .then(function(res){
        return res.json();
    })
    .then(function(data){ 
        
        renderWeather(data);
    })
}

function coordinates (city) {
    var coordApi= `${apiUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    fetch(coordApi)
       .then(function(res){
           return res.json();
       })
       .then(function(data){
        //    var lat= data[0].lat;
        //    console.log(lat);
        //    var lon=data[0].lon;
        //    console.log(lon);
           let cityObj= {lat:data[0].lat, lon:data[0].lon};
           weather(cityObj.lat,cityObj.lon);
       })
       .catch(function(err){
           console.error(err)
       })

    }




$('#search-button').on("click", function(event){
    event.preventDefault();
    var city =$(this).siblings("#city").val();
    console.log(city);
    var input=$(this).siblings(".input");
    console.log(input);
  
    coordinates (city);
    localStorage.setItem(city, input);
  });



// function renderSavedCities(){
//     var savedCitiesBtn= localStorage.getItem('.input');
//     savedCitiesBtn
// }
 
