// global variables
// var searchBtn = document.getElementById('search-button');
var savedCitiesBtn = document.querySelector('.saved-cities');
var apiKey = 'd35cd0aa37b6ae911ac59a75948a0658';
var apiUrl = 'https://api.openweathermap.org/';
var output = $('#future').innerHTML;
var searchHistory = [];


// function to display day
function displayDate() {
    var todayDate = moment().format('l');
    $('#today-date').text(todayDate);
}

// function to display future days
function displayFuture() {
    var tomorrowDate = moment().add(1, 'days').format('l');
    $('#future-date1').text(tomorrowDate);

    var twoDate = moment().add(2, 'days').format('l');
    $('#future-date2').text(twoDate);

    var threeDate = moment().add(3, 'days').format('l');
    $('#future-date3').text(threeDate);

    var fourDate = moment().add(4, 'days').format('l');
    $('#future-date4').text(fourDate);

    var fiveDate = moment().add(5, 'days').format('l');
    $('#future-date5').text(fiveDate);

}

// render current weather data to page
function renderWeather(data) {
    console.log(data);
    $('#city-name').text($("#city").val());
    $('#icon').attr('src', `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`)
    $('#temp').text('Temperature: ' + data.current.temp);
    $('#wind').text('Wind: ' + data.current.wind_speed);
    $('#humidity').text('Humidity: ' + data.current.humidity);
    $('#uv-index').text('UV Index: ' + data.current.uvi);
   

    var uvi = data.current.uvi;
    function uvColor() {
        if (uvi < 3) {
            $('#uv-index').attr('style', 'color: green');
        } else if (uvi > 7) {
            $('#uv-index').attr('style','color: red');
        } else {
            $('#uv-index').attr('style','color: yellow');
        }
    }
    displayDate();
    uvColor();
}

function renderFuture(data) {
    console.log(data.daily[1]);


    $('#f-temp1').text('Temp: ' + data.daily[1].temp.day);
    $('#icon1').attr('src', `https://openweathermap.org/img/w/${data.daily[1].weather[0].icon}.png`)
    $('#f-wind1').text('Wind: ' + data.daily[1].wind_speed);
    $('#f-humidity1').text('Humidity: ' + data.daily[1].humidity);

    $('#f-temp2').text('Temp: ' + data.daily[2].temp.day);
    $('#icon2').attr('src', `https://openweathermap.org/img/w/${data.daily[2].weather[0].icon}.png`)
    $('#f-wind2').text('Wind: ' + data.daily[2].wind_speed);
    $('#f-humidity2').text('Humidity: ' + data.daily[2].humidity);

    $('#f-temp3').text('Temp: ' + data.daily[3].temp.day);
    $('#icon3').attr('src', `https://openweathermap.org/img/w/${data.daily[3].weather[0].icon}.png`)
    $('#f-wind3').text('Wind: ' + data.daily[3].wind_speed);
    $('#f-humidity3').text('Humidity: ' + data.daily[3].humidity);

    $('#f-temp4').text('Temp: ' + data.daily[4].temp.day);
    $('#icon4').attr('src', `https://openweathermap.org/img/w/${data.daily[4].weather[0].icon}.png`)
    $('#f-wind4').text('Wind: ' + data.daily[4].wind_speed);
    $('#f-humidity4').text('Humidity: ' + data.daily[4].humidity);

    $('#f-temp5').text('Temp: ' + data.daily[5].temp.day);
    $('#icon5').attr('src', `https://openweathermap.org/img/w/${data.daily[5].weather[0].icon}.png`)
    $('#f-wind5').text('Wind: ' + data.daily[5].wind_speed);
    $('#f-humidity5').text('Humidity: ' + data.daily[5].humidity);

    displayFuture();
}



function weather(lat, lon) {
    console.log('here');
    var weatherApi = `${apiUrl}/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&exclude=minutely,hourly&appid=${apiKey}`;
    fetch(weatherApi)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {

            renderWeather(data);
            renderFuture(data);
            // renderFuture(data);
        })
}

function coordinates(city) {
    var coordApi = `${apiUrl}/geo/1.0/direct?q=${city}&limit=5&appid=${apiKey}`;
    fetch(coordApi)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            //    var lat= data[0].lat;
            //    console.log(lat);
            //    var lon=data[0].lon;
            //    console.log(lon);
            let cityObj = { lat: data[0].lat, lon: data[0].lon };
            weather(cityObj.lat, cityObj.lon);
        })
        .catch(function (err) {
            console.error(err)
        })

}




$('#search-button').on("click", function (event) {
    event.preventDefault();
    var city = $(this).siblings("#city").val();
    console.log(city);
    var input = $(this).siblings(".input");
    console.log(input);

    coordinates(city);
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
});

function pullHistory() {
    var history = localStorage.getItem('searchHistory');
    if (history) {
        searchHistory = JSON.parse(history);
    }
    console.log(searchHistory);
}

function renderHistory() {
    var searchHistory = $('#history');

    for (var i = 0; i < searchHistory.length; i++) {
        var button = document.createElement('button');
        button.setAttribute('type', 'button');
        button.setAttribute('data-search', searchHistory[i]);
        button.textContent = searchHistory[i];
        searchHistory.append(button);
        console.log('hello');
    }
    console.log('hi');
}


pullHistory();
renderHistory();


// function renderSavedCities(){
//     var savedCitiesBtn= localStorage.getItem('.input');
//     savedCitiesBtn
// }

