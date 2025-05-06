import { useState } from 'react';
import { Sun, Cloud, CloudRain, CloudSnow, CloudLightning, Wind, Thermometer } from 'lucide-react';

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
        return <Sun size={size} className="text-yellow-500" />;
      case 'cloudy':
        return <Cloud size={size} className="text-gray-500" />;
      case 'partly-cloudy':
        return (
          <div className="relative">
            <Sun size={size} className="text-yellow-500" />
            <Cloud size={size * 0.8} className="text-gray-400 absolute -top-1 -right-1" />
          </div>
        );
      case 'rainy':
        return <CloudRain size={size} className="text-blue-500" />;
      case 'snowy':
        return <CloudSnow size={size} className="text-blue-200" />;
      case 'stormy':
        return <CloudLightning size={size} className="text-purple-500" />;
      case 'windy':
        return <Wind size={size} className="text-blue-300" />;
      default:
        return <Sun size={size} className="text-yellow-500" />;
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
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-300 p-4 font-sans">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        
        {/* Search Bar */}
        <div className="p-4 flex gap-2">
          <input
            type="text"
            placeholder="Search location..."
            className="flex-1 p-2 border border-gray-300 rounded"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <button 
            onClick={handleSearch}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Search
          </button>
        </div>
        
        {/* Current Weather */}
        <div className="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold">{location}</h2>
              <p className="text-lg capitalize">{weather}</p>
              <div className="flex items-center gap-2 mt-1">
                <Thermometer size={20} />
                <span className="text-2xl font-semibold">
                  {convertTemperature(temperature)}°{unit}
                </span>
                <button 
                  onClick={toggleUnit}
                  className="text-xs bg-white bg-opacity-20 px-2 py-1 rounded hover:bg-opacity-30"
                >
                  °{unit === 'F' ? 'C' : 'F'}
                </button>
              </div>
            </div>
            <div className="text-6xl">
              {getWeatherIcon(weather, 64)}
            </div>
          </div>
        </div>
        
        {/* 5-Day Forecast */}
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">5-Day Forecast</h3>
          <div className="flex justify-between">
            {forecast.map((day, index) => (
              <div key={index} className="flex flex-col items-center">
                <p className="font-medium">{day.day}</p>
                <div className="my-2">{getWeatherIcon(day.weather)}</div>
                <div className="text-xs flex gap-1">
                  <span className="text-gray-900">{convertTemperature(day.high)}°</span>
                  <span className="text-gray-500">{convertTemperature(day.low)}°</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Details */}
        <div className="border-t border-gray-200">
          <div className="grid grid-cols-2 gap-4 p-4 text-sm">
            <div className="flex items-center gap-2">
              <Wind size={18} className="text-blue-500" />
              <div>
                <p className="text-gray-500">Wind</p>
                <p>8 mph</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-blue-500">💧</div>
              <div>
                <p className="text-gray-500">Humidity</p>
                <p>65%</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-blue-500">🌅</div>
              <div>
                <p className="text-gray-500">Sunrise</p>
                <p>6:24 AM</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <div className="text-blue-500">🌇</div>
              <div>
                <p className="text-gray-500">Sunset</p>
                <p>8:12 PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}