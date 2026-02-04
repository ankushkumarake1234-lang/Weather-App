# 🌦️ Weather App

A modern and responsive **Weather Application** that provides real-time weather information for any city in the world.  
This app uses the OpenWeatherMap API to fetch live data and displays it with a clean UI and smooth animations.

![Weather App Preview](https://img.shields.io/badge/Status-Active-success)
![Version](https://img.shields.io/badge/Version-1.0.0-blue)
![License](https://img.shields.io/badge/License-MIT-green)

---

## 🚀 Features

- 🌍 **Search weather by city name** - Find weather information for any city worldwide
- 🌡️ **Comprehensive weather data** - Shows temperature, humidity, wind speed, and "feels like" temperature
- ☁️ **Weather conditions** - Displays current weather condition (Clear, Clouds, Rain, Snow, etc.)
- 🎨 **Smooth animations** - Fade-in, slide-up, bounce, and hover effects for better UX
- 📱 **Fully responsive** - Works seamlessly on mobile, tablet, and desktop devices
- ⚡ **Fast and lightweight** - No external libraries, pure vanilla JavaScript
- 🎯 **Real-time data** - Live weather updates from OpenWeatherMap API
- 💫 **Animated weather icons** - Dynamic emoji-based weather icons with bounce effect

---

## 🛠️ Technologies Used

- **HTML5** - Semantic markup structure
- **CSS3** - Modern styling with animations & transitions
  - CSS Grid for responsive layout
  - Keyframe animations
  - Gradient backgrounds
  - Smooth transitions
- **JavaScript (ES6+)** - API handling & DOM manipulation
  - Async/Await for API calls
  - Modern event handling
  - Dynamic content rendering
- **OpenWeatherMap API** - Real-time weather data

---

## 🎥 Animations & UI

### Animation Features:
- ✨ **Fade-in effect** on page load
- 📤 **Slide-up animation** when weather data loads
- 🎈 **Bounce animation** for weather icons
- 🖱️ **Hover effects** on buttons and detail cards
- 🔍 **Input focus animations** with scaling and shadow
- 🤝 **Shake animation** for error messages
- ⏳ **Loading spinner** during data fetch

### UI Components:
- 🎨 Gradient background (purple theme)
- 💳 Card-style layout with frosted glass effect
- 🔘 Rounded buttons with shadow effects
- 📊 Grid-based weather details display
- 🎯 Clean and minimal design

---

## 📂 Project Structure

```
weather-app/
│
├── weather-app.html          # Main application file (HTML + CSS + JS)
├── README.md                 # Project documentation
└── screenshots/              # (Optional) App screenshots
```

---

## ⚙️ Setup Instructions

### Prerequisites:
- A modern web browser (Chrome, Firefox, Safari, Edge)
- OpenWeatherMap API key (free tier available)

### Steps:

1. **Get your API Key**
   - Visit [OpenWeatherMap](https://openweathermap.org/api)
   - Sign up for a free account
   - Navigate to "API Keys" section
   - Copy your API key

2. **Update the code**
   - Open `weather-app.html`
   - Find line with `const API_KEY = 'YOUR_API_KEY_HERE';`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key

3. **Run the application**
   - Open `weather-app.html` in your web browser
   - The app will load with default city (London)
   - Search for any city to see its weather

---

## 🔧 Configuration

### API Key Setup:
```javascript
const API_KEY = 'your_actual_api_key_here';
```

### Change Default City:
```javascript
// At the bottom of the script section
window.addEventListener('load', () => {
    getWeather('YourCityName'); // Change 'London' to your preferred city
});
```

### Customize Temperature Units:
```javascript
// In getWeather function, change units parameter:
`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${API_KEY}`
// Options: metric (Celsius), imperial (Fahrenheit), standard (Kelvin)
```

---

## 📱 Responsive Design

The app is fully responsive and adapts to different screen sizes:

- **Desktop** (>768px): Full layout with 3-column grid for weather details
- **Tablet** (481px - 768px): Optimized spacing and font sizes
- **Mobile** (<480px): Single-column layout, adjusted font sizes

---

## 🎨 Color Scheme

- **Primary Gradient**: Purple (#667eea → #764ba2)
- **Background**: White with 95% opacity
- **Text**: Dark gray (#333) for primary, Light gray (#666) for secondary
- **Accents**: Gradient backgrounds on detail cards

---

## 🌐 API Information

**OpenWeatherMap API Endpoints Used:**
- Current Weather Data: `api.openweathermap.org/data/2.5/weather`

**Data Retrieved:**
- Temperature (current & feels like)
- Weather condition & description
- Humidity percentage
- Wind speed
- City name & country code

---

## 🚀 Future Enhancements

Potential features for future versions:

- [ ] 5-day weather forecast
- [ ] Hourly weather predictions
- [ ] Weather maps integration
- [ ] Geolocation support (auto-detect user location)
- [ ] Multiple city comparison
- [ ] Favorite cities list
- [ ] Dark mode toggle
- [ ] Temperature unit switcher (°C/°F)
- [ ] Weather alerts and notifications
- [ ] Historical weather data

---

## 🐛 Troubleshooting

### Common Issues:

**1. "City not found" error**
- Check spelling of city name
- Try including country code (e.g., "London,UK")
- Ensure city exists in OpenWeatherMap database

**2. API not working**
- Verify API key is correct
- Check if API key is activated (may take a few hours)
- Ensure you haven't exceeded free tier limits (60 calls/minute)

**3. No data displaying**
- Open browser console (F12) to check for errors
- Verify internet connection
- Check if API key is properly inserted

---

## 📄 License

This project is licensed under the MIT License - feel free to use, modify, and distribute.

---

## 👨‍💻 Author

Created with ❤️ by Ankush Kumar

---

## 🙏 Acknowledgments

- Weather data provided by [OpenWeatherMap](https://openweathermap.org/)
- Icons: Emoji-based weather representations
- Inspiration: Modern weather app designs

---

## 📞 Support

For issues or questions:
- Open an issue on GitHub
- Contact: ankushkumarke1234@gamil.com

---

## ⭐ Show Your Support

Give a ⭐️ if you like this project!

---

**Last Updated:** February 2026
