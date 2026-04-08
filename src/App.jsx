import { useState } from "react";
import axios from "./api/axios";

function App() {
  const [data, setData] = useState(null);
  const [query, setQuery] = useState("");

  const API_KEY = import.meta.env.VITE_WEATHER_KEY;

  const fetchWeather = async (city) => {
    try {
      const res = await axios.get(
        `/weather?q=${city}&units=metric&appid=${API_KEY}`
      );
      setData(res.data);
    } catch {
      alert("Kota tidak ditemukan");
    }
  };

  const handleSearch = (e) => {
    if (e.key === "Enter" && query) {
      fetchWeather(query);
      setQuery("");
    }
  };

  return (
    <div className="w-full h-screen text-white relative overflow-hidden font-sans">

      {/* BACKGROUND GRADIENT */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#020617] to-black" />

      {/* BLUR LIGHT EFFECT */}
      <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-blue-500/20 blur-[120px] rounded-full" />

      {/* SEARCH */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[90%] max-w-xl z-10">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
          placeholder="Search city..."
          className="w-full p-4 rounded-3xl 
          bg-white/10 backdrop-blur-xl
          border border-white/20
          text-white placeholder-white/60
          focus:outline-none"
        />
      </div>

      {/* CONTENT */}
      {data ? (
        <div className="flex flex-col items-center justify-center h-full z-10 relative">

          {/* MINI INFO TOP */}
          <div className="absolute top-24 right-10 px-4 py-2 rounded-2xl 
          bg-white/10 backdrop-blur-xl border border-white/20 text-sm">
            {data.main.temp.toFixed()}° • {data.weather[0].main}
          </div>

          {/* MAIN CARD */}
          <div className="p-10 rounded-[30px] 
          bg-white/10 backdrop-blur-2xl
          border border-white/20 shadow-2xl w-[90%] max-w-md text-center">

            {/* LOCATION */}
            <h2 className="text-xl font-semibold mb-2">
              {data.name}, {data.sys.country}
            </h2>

            {/* ICON */}
            <img
              src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`}
              alt="weather"
              className="mx-auto"
            />

            {/* TEMP */}
            <p className="text-6xl font-bold">
              {data.main.temp.toFixed()}°
            </p>

            <p className="text-white/70 capitalize mb-6">
              {data.weather[0].description}
            </p>

            {/* DETAILS */}
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="p-3 rounded-xl bg-white/10">
                {data.main.humidity}%
                <p className="text-xs text-white/60">Humidity</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10">
                {data.wind.speed}
                <p className="text-xs text-white/60">Wind</p>
              </div>
              <div className="p-3 rounded-xl bg-white/10">
                {data.main.pressure}
                <p className="text-xs text-white/60">Pressure</p>
              </div>
            </div>

          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center h-full text-white/40">
          Cari kota dulu 👀
        </div>
      )}
    </div>
  );
}

export default App;