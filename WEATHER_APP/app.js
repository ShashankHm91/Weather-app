let locationDetail = document.getElementById("location")
let tempicon = document.getElementById("temp-icon")
let tempvalue = document.getElementById("temp-value")
let climate = document.getElementById("climate")
let humid = document.getElementById("humidity")
let visibility_upto = document.getElementById("visibility")
let wind_speed = document.getElementById("wind-speed")
let iconfile;
const searchInput = document.getElementById("search-input")
const searchButton = document.getElementById("search-button")


searchButton.addEventListener("click", (e) => {
    e.preventDefault()
    getWeather(searchInput.value);
    searchInput.value = "";
})

const getWeather = async (city) => {
    try {
        const resp = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fd9ee0b486596836ec82ac9366a93c2e`,
            { mode: 'cors' })

        const weatherData = await resp.json()
        console.log(weatherData);

        const { name } = weatherData
        const { feels_like, humidity } = weatherData.main
        const { id, main } = weatherData.weather[0]
        const { speed } = weatherData.wind
        const { visibility } = weatherData;
        locationDetail.textContent = name
        climate.textContent = main

        tempvalue.textContent = Math.round(feels_like - 273);
        humid.textContent = `Humidity : ${humidity}%`;
        visibility_upto.textContent = `Visibility : ${visibility / 1000}km`;
        wind_speed.textContent = `Wind : ${speed}km/h`;

        if (id < 300 && id >= 200) {
            tempicon.src = "./icons/thunder-storm.svg"
        }
        else if (id < 400 && id >= 300) {
            tempicon.src = "./icons/cloud.svg"
        }
        else if (id < 600 && id >= 500) {
            tempicon.src = "./icons/rain.svg"
        }
        else if (id < 700 && id >= 600) {
            tempicon.src = "./icons/snow.svg"
        }
        else if (id < 800 && id > 700) {
            tempicon.src = "./icons/smoke.svg"
        }
        else if (id == 800) {
            tempicon.src = "./icons/clear-sky.svg"
        }
        else if (id > 800) {
            tempicon.src = "./icons/cloud.svg"
        }

    }
    catch (error) {
        alert("City not found")
    }
}




window.addEventListener("load", () => {
    let Longitude;
    let Latitude;

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            Longitude = position.coords.longitude
            Latitude = position.coords.latitude
            const proxy = "https://cors.zimjs.com/"

            const api = `${proxy}api.openweathermap.org/data/2.5/weather?lat=${Latitude}&lon=${Longitude}&appid=fd9ee0b486596836ec82ac9366a93c2e`

            fetch(api).then(res => res.json())
                .then(data => {
                    const { name } = data
                    const { feels_like, humidity } = data.main
                    const { id, main } = data.weather[0]
                    const { speed } = data.wind
                    const { visibility } = data;
                    locationDetail.textContent = name
                    climate.textContent = main

                    tempvalue.textContent = Math.round(feels_like - 273);
                    humid.textContent = `Humidity : ${humidity}%`;
                    visibility_upto.textContent = `Visibility : ${visibility / 1000}km`;
                    wind_speed.textContent = `Wind : ${speed}km/h`;

                    if (id < 300 && id >= 200) {
                        tempicon.src = "./icons/thunder-storm.svg"
                    }
                    else if (id < 400 && id >= 300) {
                        tempicon.src = "./icons/cloud.svg"
                    }
                    else if (id < 600 && id >= 500) {
                        tempicon.src = "./icons/rain.svg"
                    }
                    else if (id < 700 && id >= 600) {
                        tempicon.src = "./icons/snow.svg"
                    }
                    else if (id < 800 && id > 700) {
                        tempicon.src = "./icons/smoke.svg"
                    }
                    else if (id == 800) {
                        tempicon.src = "./icons/clear-sky.svg"
                    }
                    else if (id > 800) {
                        tempicon.src = "./icons/cloud.svg"
                    }
                })
        }

        )
    }
})