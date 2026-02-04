// ============================================
// WEATHER APP - UI ENHANCEMENT
// API Logic is preserved - UI updates only
// ============================================

// DOM Elements - Modern UI Components
const searchInput = document.querySelector("#location-input");
const searchBtn = document.querySelector("#search-btn");
const weatherCard = document.querySelector("#weather-card");
const notification = document.querySelector("#notification");

// Temperature & Location Elements
const temperatureValue = document.querySelector("#temperature");
const temperatureUnit = document.querySelector("#temperature-unit");
const locationName = document.querySelector("#location-name");
const conditionText = document.querySelector("#condition-text");
const conditionIcon = document.querySelector("#condition-icon");

// Time & Date Elements
const currentTime = document.querySelector("#current-time");
const currentDay = document.querySelector("#current-day");
const currentDate = document.querySelector("#current-date");

// Weather Details Elements
const windSpeed = document.querySelector("#wind-speed");
const humidity = document.querySelector("#humidity");
const feelsLike = document.querySelector("#feels-like");

// Last Updated
const lastUpdated = document.querySelector("#last-updated");

// Current temperature unit (Celsius by default)
let isCelsius = true;
let currentWeatherData = null;

// ============================================
// EVENT LISTENERS - UI INTERACTIONS ONLY
// ============================================

// Search button click handler
searchBtn.addEventListener("click", () => {
  const location = searchInput.value.trim();
  
  if (!location) {
    showNotification("Please enter a location", "error");
    return;
  }

  // Show loading state
  showLoading(true);
  
  // Call existing API function (NO CHANGES TO API LOGIC)
  fetchWeather(location)
    .then((data) => {
      console.log("Data received: ", data);
      currentWeatherData = data;
      
      // Update UI with received data
      updateDOM(data);
      
      // Hide loading state
      showLoading(false);
      
      // Show success notification
      showNotification("Weather updated successfully!", "success");
      
      // Add fade-in animation to card
      animateWeatherCard();
    })
    .catch((error) => {
      console.error("Error: ", error);
      showLoading(false);
      showNotification("Location not found. Please try again.", "error");
    });

  searchInput.value = "";
});

// Enter key support for search
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// Units toggle (Celsius/Fahrenheit)
const unitsToggle = document.querySelector("#units-toggle");
unitsToggle.addEventListener("click", () => {
  isCelsius = !isCelsius;
  
  // Toggle visual state
  const slider = document.querySelector(".toggle-slider");
  const unitC = document.querySelector(".unit-c");
  const unitF = document.querySelector(".unit-f");
  
  if (isCelsius) {
    slider.style.transform = "translateX(0)";
    unitC.style.color = "var(--primary-light)";
    unitF.style.color = "var(--text-secondary)";
    temperatureUnit.textContent = "C";
  } else {
    slider.style.transform = "translateX(40px)";
    unitC.style.color = "var(--text-secondary)";
    unitF.style.color = "var(--primary-light)";
    temperatureUnit.textContent = "F";
  }
  
  // Update temperature display if data exists
  if (currentWeatherData) {
    updateTemperatureDisplay(currentWeatherData);
  }
});

// Card tilt effect with mouse movement (3D effect)
weatherCard.addEventListener("mousemove", (e) => {
  const card = weatherCard;
  const rect = card.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  
  const centerX = rect.width / 2;
  const centerY = rect.height / 2;
  
  const rotateX = (y - centerY) / 20;
  const rotateY = (centerX - x) / 20;
  
  card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
});

weatherCard.addEventListener("mouseleave", () => {
  weatherCard.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
});

// ============================================
// API FUNCTION - NO CHANGES (PRESERVED)
// ============================================
async function fetchWeather(location) {
  const url = `https://api.weatherapi.com/v1/current.json?key=c7236d36debb4636a18170654262201&q=${location}&aqi=no`;
  const response = await fetch(url);

  // Error handling
  if (response.status === 400) {
    throw new Error("Location not found");
  } else {
    const jsonData = await response.json();
    return jsonData;
  }
}

// ============================================
// UI UPDATE FUNCTIONS
// ============================================

function updateDOM(data) {
  // Extract data from API response (using existing variable names)
  const temp = data.current.temp_c;
  const location = data.location.name;
  const region = data.location.region;
  const country = data.location.country;
  const timeData = data.location.localtime;
  const condition = data.current.condition.text;
  const iconUrl = data.current.condition.icon;
  
  // Additional weather details
  const wind = data.current.wind_kph;
  const humidityValue = data.current.humidity;
  const feelsLikeTemp = data.current.feelslike_c;
  
  // Update temperature display
  updateTemperatureDisplay(data);
  
  // Update location display
  const locationDisplay = `${location}${region ? ', ' + region : ''}`;
  locationName.textContent = locationDisplay;
  
  // Update weather condition
  conditionText.textContent = condition;
  
  // Update weather icon
  updateWeatherIcon(iconUrl, condition);
  
  // Update date and time
  updateDateTime(timeData);
  
  // Update weather details
  windSpeed.textContent = `${wind} km/h`;
  humidity.textContent = `${humidityValue}%`;
  
  // Update feels like temperature
  const feelsLikeDisplay = isCelsius ? feelsLikeTemp : celsiusToFahrenheit(feelsLikeTemp);
  feelsLike.textContent = `${Math.round(feelsLikeDisplay)}°`;
  
  // Update last updated time
  updateLastUpdated();
}

// Update temperature display based on current unit
function updateTemperatureDisplay(data) {
  const temp = data.current.temp_c;
  const displayTemp = isCelsius ? temp : celsiusToFahrenheit(temp);
  temperatureValue.textContent = `${Math.round(displayTemp)}°`;
}

// Update weather icon with animation
function updateWeatherIcon(iconUrl, condition) {
  // Use API icon if available
  if (iconUrl) {
    conditionIcon.innerHTML = `<img src="https:${iconUrl}" alt="${condition}" style="width: 80px; height: 80px; filter: drop-shadow(0 8px 16px rgba(99, 102, 241, 0.3));">`;
  }
}

// Update date and time display
function updateDateTime(timeData) {
  const [date, time] = timeData.split(" ");
  
  // Parse date
  const dateObj = new Date(date + " " + time);
  
  // Format time (12-hour format)
  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
  currentTime.textContent = `${displayHours}:${displayMinutes} ${ampm}`;
  
  // Format day
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  currentDay.textContent = days[dateObj.getDay()];
  
  // Format date
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const displayDate = `${months[dateObj.getMonth()]} ${dateObj.getDate()}, ${dateObj.getFullYear()}`;
  currentDate.textContent = displayDate;
}

// ============================================
// UI HELPER FUNCTIONS
// ============================================

// Show/Hide loading state
function showLoading(isLoading) {
  if (isLoading) {
    searchBtn.classList.add("loading");
    searchBtn.disabled = true;
    weatherCard.style.opacity = "0.5";
    weatherCard.style.pointerEvents = "none";
  } else {
    searchBtn.classList.remove("loading");
    searchBtn.disabled = false;
    weatherCard.style.opacity = "1";
    weatherCard.style.pointerEvents = "auto";
  }
}

// Show notification with animation
function showNotification(message, type = "success") {
  const notificationContent = notification.querySelector("span");
  const icon = notification.querySelector("i");
  
  notificationContent.textContent = message;
  
  // Update icon based on type
  if (type === "success") {
    icon.className = "fas fa-check-circle";
    icon.style.color = "#10b981";
  } else {
    icon.className = "fas fa-exclamation-circle";
    icon.style.color = "#ef4444";
  }
  
  // Show notification
  notification.classList.add("show");
  
  // Hide after 3 seconds
  setTimeout(() => {
    notification.classList.remove("show");
  }, 3000);
}

// Animate weather card on update
function animateWeatherCard() {
  weatherCard.style.animation = "none";
  setTimeout(() => {
    weatherCard.style.animation = "fadeInUp 0.6s ease-out";
  }, 10);
}

// Update last updated timestamp
function updateLastUpdated() {
  const now = new Date();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes < 10 ? '0' + minutes : minutes;
  
  lastUpdated.textContent = `Updated at ${displayHours}:${displayMinutes} ${ampm}`;
}

// Temperature conversion
function celsiusToFahrenheit(celsius) {
  return (celsius * 9/5) + 32;
}

// ============================================
// ANIMATIONS & 3D EFFECTS (CSS-based)
// ============================================

// Add fade-in animation keyframes dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
document.head.appendChild(style);

// Initialize app with default location on load
window.addEventListener("load", () => {
  // Set default location (optional)
  const defaultLocation = "London";
  
  showLoading(true);
  fetchWeather(defaultLocation)
    .then((data) => {
      currentWeatherData = data;
      updateDOM(data);
      showLoading(false);
    })
    .catch((error) => {
      console.log("Could not load default location");
      showLoading(false);
    });
});
