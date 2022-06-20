//variables for html elements
var pokemonPhotoAreaEL = document.querySelector("#pokemon-photo-area");
var pokemonNameDisplayEL = document.querySelector("#pokemon-name-display");
var pokemonStatsDisplayEL = document.querySelector("#pokemon-stats-display");
var pokemonInputEl = document.querySelector("#pokemon-name-select");
var cityInputEl = document.querySelector("#city");
var pokemonSearchButtonEl = document.querySelector("#pokemon-btn");
var citySearchButtonEl = document.querySelector("#weather-btn");
var weatherDisplayEl = document.querySelector("#weather-display");
var pokemonSearchFormEl = document.querySelector("#pokemon-search");


var displayPokeData = function(pokemon) {
    pokemonNameDisplayEL.innerHTML = pokemon.name;

    var height = document.createElement("p");
    height.innerHTML = "Height: " + pokemon.height + " decimeters";
    pokemonStatsDisplayEL.appendChild(height);

    var weight = document.createElement("p");
    weight.innerHTML = "Weight: " + pokemon.weight + " hectograms";
    pokemonStatsDisplayEL.appendChild(weight);

    var type = document.createElement("p");
    type.innerHTML = "Type: " + pokemon.types[0].type.name;
    pokemonStatsDisplayEL.appendChild(type);

    var image = document.createElement("img");
    image.setAttribute("src", pokemon.sprites.front_default);
    pokemonPhotoAreaEL.appendChild(image);

    var moves = document.createElement("p");
    moves.innerHTML = "Move: " + pokemon.moves[0].move.name;
    pokemonStatsDisplayEL.appendChild(moves);
}

//get pokemon data based on input
var getPokeData = function(pokemon) {
    //clear previous data
    pokemonStatsDisplayEL.innerHTML = "";
    
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
var formSubmitHandler = function(event) {
    event.preventDefault();
    
    //get value from input element
    var selectedPokemon = pokemonInputEl.value.trim();

    // if it is a real pokemon get the stats, otherwise display error
    if(selectedPokemon) {
        getPokeData(selectedPokemon);
        pokemonInputEl.value = "";
        //set to local storage
        //store(selectedCity);
    }
};

pokemonSearchFormEl.addEventListener("submit", formSubmitHandler);