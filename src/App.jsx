import {useEffect, useState} from 'react';
import './App.css'
import ColdBg from "./assets/cold.jpg"
import HotBg from "./assets/hot.jpg"
import Descriptions from './components/Descriptions';
import {getFormattedWeatherData} from './WeatherService';

function App() {

    let [City,
        setCity] = useState("paris");
    let [weatherData, setWeatherData] = useState(null);
    let [units, setUnits] = useState("metric")
    let [bg, setBg] = useState(ColdBg)

    useEffect(() => {
        let fetchWeatherData = async() => {
            let data = await getFormattedWeatherData(City, units);
            setWeatherData(data);

            let threshold = units === "metric" ? 20 : 60;
            if(data.temp <= threshold) setBg(ColdBg)
            else setBg(HotBg)
        }

        fetchWeatherData();
    }, [City, units]);

    let handleUnitsClick = () => {
      units === "metric" ? setUnits("imperial") : setUnits("metric");
    }

    // let enterKeyPressed = (e) => {
    //   if(e.key === "Enter") {
    //     setCity(e.target.value)
    //     console.log(City)
    //     e.target.blur();
    //   }
    // }

    const enterKeyPressed = (e) => {
      if (e.key === "Enter") {
        setCity(e.target.value);
        e.currentTarget.blur();
        e.target.value = ""
      }
    };

    return (
      <div
        className="app"
        style={{
          backgroundImage: `url(${bg})`,
        }}
      >
        <div className="overlay">
          <div className="container">
            <div className="section section-inputs">
              <input
                type="text"
                name="city"
                placeholder="Enter a city"
                onKeyPress={enterKeyPressed}
              />
              <button onClick={handleUnitsClick}>
                {units === "metric" ? "C" : "F"}
              </button>
            </div>
            {weatherData && (
              <>
                <div className="section section-temp">
                  <div className="icon">
                    <h3>
                      {weatherData && `${weatherData.name},`}
                      {weatherData && `${weatherData.country}`}
                    </h3>
                    <img src={weatherData?.iconUrl} alt="weatherIcon" />
                    <h3>{weatherData?.description}</h3>
                  </div>
                  <div className="temp">
                    <h1>{`${weatherData?.temp?.toFixed()} ${
                      units === "metric" ? "C" : "F"
                    }`}</h1>
                  </div>
                </div>
                <Descriptions weather={weatherData} units={units} />
              </>
            )}
          </div>
        </div>
      </div>
    );
}

export default App;
