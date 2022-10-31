let apiKey = "1fe2887c968df0d2eb792f5a73dc0bde";

let makeIconURL = (iconId) => `https://openweathermap.org/img/wn/${iconId}@2x.png`

let getFormattedWeatherData = async(city, units = "metric") => {

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

    let data = await fetch(url)
        .then(res => res.json())
        .then(data => data)

    let {
        weather,
        main: {
            temp,
            feels_like,
            temp_min,
            temp_max,
            pressure,
            humidity
        },
        wind: {
            speed
        },
        sys: {
            country
        },
        name
    } = data;

    let {description, icon} = weather[0];

    return {
        description,
        iconUrl: makeIconURL(icon),
        temp,
        feels_like,
        temp_min,
        temp_max,
        pressure,
        humidity,
        speed,
        country,
        name,
    }
}; 

export {getFormattedWeatherData}