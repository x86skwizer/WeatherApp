/*items from html*/
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput'); /* l */
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

/* default city */
let cityInput = "London";

/* Add click event to each city in the panel */
cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    //Change from default city to the clicked one
    cityInput = e.target.innerHTML;
    /*Function that fetches and displays
    all the data from the Weather API*/
    fetchWeatherData();
    //simple animation
    app.style.opacity = "0";
    });
})

/* Add submit event to the form */
form.addEventListener('submit', (e) => {
  /*If the input field (search bar)
  is empty, throw an alert*/
  if(search.value.length = 0) {
  alert('Please type in a city name');
  } else {
  /*Change from default city to the
  one written in the input field*/
  cityInput = search.value;
  /*Function that fetches and displays
  all the data from the Weather API*/
  fetchWeatherData();
  //Remove all text from the input field
  search.value = "";
  //simple animation
  app.style.opacity = "0";
}

  //Prevents the default behavior of the from
  e.preventDefault();
});

/*from a date (12 03 2021)*/
function dayOfTheWeek (day, month, year) {
  const weekday = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
  ];
    // Create a new Date object using the provided day, month, and year
    const date = new Date(`${month}/${day}/${year}`);

    // Use the getDay() method to get the numerical representation of the day of the week
    const dayOfWeekIndex = date.getDay();

    // Use the day of the week index to access the corresponding day name from the weekday array
    return weekday[dayOfWeekIndex];
};
/*Function that fetches and displays
the data from the weather API*/
function fetchWeatherData() {
  /*Fetch the data and dynamicaly add the city name with template LitearaLs*/
  // Replace 'YOUR_API_KEY' with your OpenWeather API key
  const apiKey = '161605b56a64407da5501216242903&q';
  fetch(`http://api.weatherapi.com/v1/current.json?key=af45538534b443f6ac4163437241804&q=${cityInput}`)
  /* take data json and convert it to a js object*/
  .then(response => response.json())
  .then(data => {

    /*adding to page*/
    temp.innerHTML = data.current.temp_c + "&#176;";
    conditionOutput.innerHTML = data.current.condition.text;

    /* Get data and time */
    const date = data.location.localtime;
    const y = parseInt(date.substr(0, 4));
    const m = parseInt(date.substr(5, 2));
    const d = parseInt(date.substr(8, 2));
    const time = date.substr(11);

    /* formatting */
    console.log(`${dayOfTheWeek(d, m, y)}`);
    dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
    timeOutput.innerHTML = time;

    nameOutput.innerHTML = data.location.name;

    const iconId = data.current.condition.icon.substr(
      "//cdn.weatherapi.com/weather/64x64/".length);
	  /* reformat icons*/
      icon.src = "./icons/" + iconId;

      /* Add the weather details to the page*/
      cloudOutput.innerHTML = data.current.cloud + "%";
      humidityOutput.innerHTML = data.current.humidity + "%";
      windOutput.innerHTML = data.current.wind_kph + "km/h";

      /*set time */
      let timeOfDay = "day";
      /* each weather condition  */
      const code = data.current.condition.code;

      /* change to night if its night in the city */
      if (!data.current.is_day) {
        timeOfDay = "night";
      }
      console.log(code);

      if (code == 1000) {
        /*change background */
        app.style.backgroundImage = `url(./images/${timeOfDay}/bc.jpg)`;
        /*button bg color */
        btn.style.background = "#e5ba92";
        if (timeOfDay == 'night') {
          btn.style.background = "#181e27";
        }
      }
      /* cloudy weather */
      else if (
        code == 1003 ||
        code == 1006 ||
        code == 1009 ||
        code == 1030 ||
        code == 1069 ||
        code == 1087 ||
        code == 1135 ||
        code == 1273 ||
        code == 1276 ||
        code == 1279 ||
        code == 1282 
      ){
        console.log("test cloud");
        app.style.backgroundImage = `
          url("./images/${timeOfDay}/cloudy.jpeg")`;
          btn.style.background ="#fa6d1b";
        if(timeOfDay == "night") {
        btn.style.background = "#181e27";
        }
        /*rain*/
        } else if (
        code == 1063 ||
        code == 1069 ||
        code == 1072 ||
        code == 1150 ||
        code == 1153 ||
        code == 1180 ||
        code == 1183 ||
        code == 1186 ||
        code == 1189 ||
        code == 1192 ||
        code == 1195 ||
        code == 1204 ||
        code == 1207 ||
        code == 1240 ||
        code == 1243 ||
        code == 1246 ||
        code == 1249 ||
        code == 1252
        ) {
          app.style.backgroundImage = `
          url("./images/${timeOfDay}/rainy.jpeg")`;
        btn.style.background ="#647d75";
        if(timeOfDay == "night") {
        btn.style.background = "#325c80";
        }
      } else {
        /* Snow */
        app.style.backgroundImage = `
          url(./images/${timeOfDay}/snow.jpg)`;
        btn.style.background = "#4d72aa";
        if(timeOfDay == "night") {
          btn.style.background = "#1b1b1b";
        }
      }
      app.style.opacity = "1";
    })

    .catch(() => {
      alert('City not found');
      app.style.opacity = "1";
    });
  }

  fetchWeatherData();
  app.style.opacity = "1";