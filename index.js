var ourRequest = new XMLHttpRequest(); // Create a new instance
var cityContainer = document.getElementById('city');
var conditionContainer = document.getElementById('condition');
var tempContainer = document.getElementById('temp');

// GET request from ip-api
ourRequest.open('GET', 'http://ip-api.com/json');

// Function to load on initial page load
ourRequest.onload = function() {
    // Local variables
    var ourData = JSON.parse(ourRequest.responseText);
    var lat = ourData.lat;
    var lon = ourData.lon;
    var city = ourData.city;
    var weatherRequest = new XMLHttpRequest(); // Create another instance

    // GET request from open weather map
    weatherRequest.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=f62651bb11bb663233a4e55634a22266');

    // Function to load on initial page load
    weatherRequest.onload = function(){
        // Local variable
        var weatherData = JSON.parse(weatherRequest.responseText);
        var condition = weatherData.weather[0].main;
        var temp = weatherData.main.temp;
        console.log("The condition is " + condition + ".");
        renderHTMLCondition(condition);
        console.log("The temperature is " + temp + " kelvin.");
        renderHTMLTemp(temp);
    };
    // Send GET request to open weather map
    weatherRequest.send();

    console.log("I live in " + city + ".");
    renderHTMLCity(city);
};
// Send GET request to ip-api
ourRequest.send();

// Render HTML
function renderHTMLCity(data) {
    var htmlString = " ";
    htmlString += data;
    cityContainer.insertAdjacentHTML('beforeend', htmlString);
}
function renderHTMLCondition(data) {
    var htmlString = " ";
    htmlString += data;
    conditionContainer.insertAdjacentHTML('beforeend', htmlString);
}
function renderHTMLTemp(data) {
    var htmlString = " ";
    htmlString += data;
    tempContainer.insertAdjacentHTML('beforeend', htmlString);
}
