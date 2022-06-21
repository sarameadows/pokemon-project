//variables for html elements
var pokemonPhotoAreaEL = document.querySelector("#pokemon-photo-area");
var pokemonNameDisplayEL = document.querySelector("#pokemon-name-display");
var pokemonStatsDisplayEL = document.querySelector("#pokemon-stats-display");
var pokemonInputEl = document.querySelector("#pokemon-name-select");
var cityInputEl = document.querySelector("#city");
var weatherDisplayEl = document.querySelector("#weather-display");
var pokemonSearchFormEl = document.querySelector("#pokemon-search");
var weatherSearchFormEl = document.querySelector("#weather-search");
var pokemonButtonsEl = document.querySelector("#pokemon-history");
var pokemon = [];

const myKey = "e2a5d3faf3cdaf95fb1600353eedf99c";

var displayPokeData = function(pokemon) {
    //reset photo area
    pokemonPhotoAreaEL.innerHTML = "";  
    //set pokemon name
    pokemonNameDisplayEL.innerHTML = pokemon.name;

    //height element
    var height = document.createElement("p");
    height.innerHTML = "Height: " + pokemon.height + " decimeters";
    pokemonStatsDisplayEL.appendChild(height);

    //weight element
    var weight = document.createElement("p");
    weight.innerHTML = "Weight: " + pokemon.weight + " hectograms";
    pokemonStatsDisplayEL.appendChild(weight);

    //type element
    var type = document.createElement("p");
    type.innerHTML = "Type: " + pokemon.types[0].type.name;
    pokemonStatsDisplayEL.appendChild(type);

    //image element
    var image = document.createElement("img");
    image.setAttribute("src", pokemon.sprites.front_default);
    pokemonPhotoAreaEL.appendChild(image);

    //moves element
    var moves = document.createElement("p");
    moves.innerHTML = "Move: " + pokemon.moves[0].move.name;
    pokemonStatsDisplayEL.appendChild(moves);
}

//get pokemon data based on input
var getPokeData = function(pokemon) {
    //clear previous data
    pokemonStatsDisplayEL.innerHTML = "";
    pokemonNameDisplayEL.innerHTML = "";
    
    //format the url to get data for the selected pokemon
    var apiUrl = "https://pokeapi.co/api/v2/pokemon/" + pokemon + "/";
    
    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    displayPokeData(data);
                });
            }
        })
        .catch(function(error) {
            alert("unable to connect");
        });
};

// send pokemon name from search bar to getPokeDatafunction
var pokemonFormSubmitHandler = function(event) {
    event.preventDefault();
    
    //get value from input element
    var selectedPokemon = pokemonInputEl.value.trim();

    // if it is a real pokemon get the stats
    if(selectedPokemon) {
        getPokeData(selectedPokemon);
        pokemonInputEl.value = "";
        //set to local storage
        store(selectedPokemon);
    }
};

//display the weather in weatherDisplayEl
var displayWeather = function(weather) {
    //current date element
    var today = document.createElement("p");
    today.innerHTML = weather.name + "(" + moment().format("MMM D, YYYY") + ")";
    weatherDisplayEl.appendChild(today);

    //get image for forecast
    var icon = document.createElement("img");
    icon.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.weather[0].icon + "@2x.png")
    weatherDisplayEl.appendChild(icon);

    //temp element
    var todayTemp = document.createElement("p");
    todayTemp.innerHTML = "Temp: " + weather.main.temp + "&#176 F";
    weatherDisplayEl.appendChild(todayTemp);
}

//get the weather info for selected city
var getWeather = function(city) {
    //clear weather display for new data
    weatherDisplayEl.innerHTML = "";

    //format the url to get the data for selected city
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + myKey + "&units=imperial";

    fetch(apiUrl)
        .then(function(response) {
            if(response.ok) {
                response.json().then(function(data) {
                    displayWeather(data);
                });
            }
        })
        .catch(function(error) {
            alert("Unable to connect");
        });
}

var weatherFormSubmitHandler = function(event) {
    event.preventDefault();

    //get value from input element
    var selectedCity = cityInputEl.value.trim();

    //if it is a real city get the weather
    if(selectedCity) {
        getWeather(selectedCity);
        cityInputEl.value = "";
    }
}

//load previously searched pokemon
var load = function() {
    if(localStorage.getItem("pokemon")){
        pokemon = JSON.parse(localStorage.getItem("pokemon"));
        for (var i = 0; i < pokemon.length; i++) {
            addButton(pokemon[i]);
        }
    }
}

//store the searched for city in local storage
var store = function(selectedPokemon) {
    addButton(selectedPokemon);
    pokemon.push(selectedPokemon);
    localStorage.setItem("pokemon", JSON.stringify(pokemon));
}

//add a button for previously searched pokemon
var addButton = function(pokemon) {
    var newButton = document.createElement("button");
    newButton.innerHTML = pokemon;
    newButton.classList.add("history-btn");
    pokemonButtonsEl.appendChild(newButton);
}

var pokemonButtonClickHandler = function(event) {
    var historyPokemon = event.target.innerHTML;

    if(historyPokemon) {
        getPokeData(historyPokemon);
    }
}

load();
pokemonSearchFormEl.addEventListener("submit", pokemonFormSubmitHandler);
weatherSearchFormEl.addEventListener("submit", weatherFormSubmitHandler);
pokemonButtonsEl.addEventListener("click", pokemonButtonClickHandler);