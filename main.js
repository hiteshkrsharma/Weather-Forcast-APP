const apiKey = '592ba863a09d5ab45b388a71dba9fa77'; 
const locationInput = document.getElementById('location-input');
const searchBtn = document.getElementById('search-btn');
const locationName = document.getElementById('location-name');
const temperature = document.getElementById('temperature');
const weatherCondition = document.getElementById('weather-condition');

// List of sample locations
const locations = ['New York', 'London', 'Tokyo', 'Sydney', 'Berlin', 'Paris'];

// Populate the datalist for autocomplete
const locationList = document.getElementById('location-list');
locations.forEach(location => {
  const option = document.createElement('option');
  option.value = location;
  locationList.appendChild(option);
});

// Event listener for the search button
searchBtn.addEventListener('click', () => {
  const location = locationInput.value;
  if (location) {
    getWeatherData(location);
  } else {
    alert('Please enter a valid location');
  }
});

// Function to fetch weather data from OpenWeather API
function getWeatherData(location) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;
  
  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.cod === 200) {
        displayWeatherData(data);
      } else {
        alert(`Location not found: ${data.message}`);
      }
    })
    .catch(error => {
      console.error('Error fetching weather data:', error);
      alert('Error fetching weather data');
    });
}

// Function to display the fetched weather data
function displayWeatherData(data) {
  locationName.textContent = `Location: ${data.name}, ${data.sys.country}`;
  temperature.textContent = `Temperature: ${data.main.temp} °C`;
  weatherCondition.textContent = `Condition: ${data.weather[0].description}`;
}