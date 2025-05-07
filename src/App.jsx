import { useState } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Thermometer } from 'lucide-react';
import './WeatherApp.css';

export default function WeatherApp() {
  const [location, setLocation] = useState('New York');
  const [weather, setWeather] = useState('sunny');
  const [temperature, setTemperature] = useState(72);
  const [forecast, setForecast] = useState([
    { day: 'Wed', weather: 'rainy', high: 68, low: 55 },
    { day: 'Thu', weather: 'cloudy', high: 70, low: 57 },
    { day: 'Fri', weather: 'sunny', high: 75, low: 60 },
    { day: 'Sat', weather: 'sunny', high: 80, low: 63 },
    { day: 'Sun', weather: 'partly-cloudy', high: 77, low: 62 }
  ]);
  const [searchInput, setSearchInput] = useState('');
  const [unit, setUnit] = useState('F');

  const getWeatherIcon = (condition, size = 24) => {
    switch (condition) {
      case 'sunny':
        return <Sun size={size} color="#f59e0b" />;
      case 'cloudy':
        return <Cloud size={size} color="#6b7280" />;
      case 'partly-cloudy':
        return (
          <div className="icon-container">
            <Sun size={size} color="#f59e0b" />
            <Cloud size={size * 0.8} color="#9ca3af" className="icon-overlay" />
          </div>
        );
      case 'rainy':
        return <CloudRain size={size} color="#3b82f6" />;
      case 'snowy':
        return <CloudSnow size={size} color="#bfdbfe" />;
      case 'stormy':
        return <CloudLightning size={size} color="#8b5cf6" />;
      case 'windy':
        return <Wind size={size} color="#93c5fd" />;
      default:
        return <Sun size={size} color="#f59e0b" />;
    }
  };

  const convertTemperature = (temp) => {
    if (unit === 'C') {
      return Math.round((temp - 32) * 5/9);
    }
    return temp;
  };

  const handleSearch = () => {
    // This would normally fetch real weather data
    // For demo purposes, we're just setting random weather
    const conditions = ['sunny', 'cloudy', 'rainy', 'partly-cloudy', 'stormy', 'windy'];
    const newWeather = conditions[Math.floor(Math.random() * conditions.length)];
    const newTemp = Math.floor(Math.random() * 40) + 50; // 50-90°F
    
    setLocation(searchInput);
    setWeather(newWeather);
    setTemperature(newTemp);
    setSearchInput('');
  };

  const toggleUnit = () => {
    setUnit(unit === 'F' ? 'C' : 'F');
  };

  return (
    <div className="weather-container">
      <div className="weather-card">
        
        {/* Search Bar */}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search location..."
            className="search-input"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="search-button"
          >
            Search
          </button>
        </div>
        
        {/* Current Weather */}
        <div className="current-weather">
          <div className="current-weather-content">
            <div>
              <h2 className="location">{location}</h2>
              <p className="weather-status">{weather}</p>
              <div className="temperature-container">
                <Thermometer size={20} />
                <span className="temperature">
                  {convertTemperature(temperature)}°{unit}
                </span>
                <button 
                  onClick={toggleUnit}
                  className="unit-toggle"
                >
                  °{unit === 'F' ? 'C' : 'F'}
                </button>
              </div>
            </div>
            <div className="weather-icon-large">
              {getWeatherIcon(weather, 64)}
            </div>
          </div>
        </div>
        
        {/* 5-Day Forecast */}
        <div className="forecast-section">
          <h3 className="forecast-title">5-Day Forecast</h3>
          <div className="forecast-days">
            {forecast.map((day, index) => (
              <div key={index} className="forecast-day">
                <p className="day-name">{day.day}</p>
                <div className="forecast-icon">{getWeatherIcon(day.weather)}</div>
                <div className="temperature-range">
                  <span className="high-temp">{convertTemperature(day.high)}°</span>
                  <span className="low-temp">{convertTemperature(day.low)}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Details */}
        <div className="details-section">
          <div className="details-grid">
            <div className="detail-item">
              <Wind size={18} className="detail-icon" />
              <div>
                <p className="detail-label">Wind</p>
                <p className="detail-value">8 mph</p>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon">💧</div>
              <div>
                <p className="detail-label">Humidity</p>
                <p className="detail-value">65%</p>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon">🌅</div>
              <div>
                <p className="detail-label">Sunrise</p>
                <p className="detail-value">6:24 AM</p>
              </div>
            </div>
            <div className="detail-item">
              <div className="detail-icon">🌇</div>
              <div>
                <p className="detail-label">Sunset</p>
                <p className="detail-value">8:12 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}