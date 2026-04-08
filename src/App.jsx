import { useState, useEffect } from "react";
import axios from "./api/axios";

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_KEY;

  useEffect(() => {
    const savedCity = localStorage.getItem("city");
    if (savedCity) {
      fetchWeather(savedCity);
    }
  }, []);

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setData(response.data);

      localStorage.setItem("city", city);
    } catch (error) {
      console.log(error.response);
      alert("Kota tidak ditemukan!");
    }
  };

  const searchLocation = (event) => {
    if (event.key === "Enter") {
      if (!location) return;

      fetchWeather(location);
      setLocation("");
    }
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_#0f172a,_#020617)] text-white flex flex-col items-center pt-24 px-4">

      <h1 className="text-4xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-500 text-transparent bg-clip-text tracking-wide drop-shadow-lg">
        Weather App
      </h1>

      <div className="w-full max-w-md">
        <input
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          onKeyDown={searchLocation}
          placeholder="Cari kota..."
          className="w-full p-4 rounded-full bg-white/5 border border-white/10 
          focus:border-cyan-400 focus:ring-2 focus:ring-cyan-500 
          outline-none transition-all backdrop-blur-lg 
          placeholder:text-gray-400 shadow-[0_0_20px_rgba(0,255,255,0.1)]"
        />
      </div>

      {data.name && (
        <div className="mt-10 w-full max-w-md bg-white/5 p-8 rounded-3xl 
        border border-white/10 backdrop-blur-2xl shadow-[0_0_40px_rgba(0,0,0,0.6)] 
        text-center transition-all duration-500 hover:scale-105">

          <h1 className="text-2xl font-semibold tracking-wide text-gray-200">
            📍 {data.name}
          </h1>

          <div className="mt-6">
            <h2 className="text-7xl font-extrabold bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg">
              {data.main?.temp.toFixed()}°C
            </h2>
          </div>

          <p className="mt-3 text-lg text-cyan-300 uppercase tracking-widest">
            {data.weather?.[0]?.main}
          </p>

          {data.weather && (
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="weather icon"
              className="mx-auto mt-2 scale-110 drop-shadow-[0_0_15px_rgba(0,255,255,0.5)]"
            />
          )}

          <div className="flex justify-between mt-8 gap-4">

            <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
              <p className="text-gray-400 text-xs uppercase tracking-wider">
                💧 Humidity
              </p>
              <p className="font-bold text-xl mt-1 text-cyan-300">
                {data.main?.humidity}%
              </p>
            </div>

            <div className="flex-1 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
              <p className="text-gray-400 text-xs uppercase tracking-wider">
                🌬 Wind
              </p>
              <p className="font-bold text-xl mt-1 text-cyan-300">
                {data.wind?.speed} MPH
              </p>
            </div>

          </div>
        </div>
      )}

      {!data.name && (
        <p className="text-gray-500 mt-10 animate-pulse">
          🌍 Cari kota dulu bro...
        </p>
      )}

    </div>
  );
}

export default App;