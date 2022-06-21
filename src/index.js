/*SEARCH BY USING A CITY NAME (e.g. athens) OR A COMMA-SEPARATED CITY NAME ALONG WITH THE COUNTRY CODE (e.g. athens,gr)*/
const form = document.querySelector("form");
const input = document.querySelector("input");
const msg = document.querySelector(".msg");
const cardElement = document.getElementById("weather-card");
const country = document.getElementById("country");
const tempertureElement = document.getElementById("temperature-value");
const pressureElement = document.getElementById("pressure-value");
const humidityElement = document.getElementById("humidity-value");
const weatherFigureElement = document.getElementById("weather-figure");

/*SUBSCRIBE HERE FOR API KEY: https://home.openweathermap.org/users/sign_up*/
const apiKey = "377f4e93015c9918032b8b28bf421eca";

input.addEventListener("keyup", (e) => {
  if (e.key !== "Enter") msg.textContent = "";
});
form.addEventListener("submit", (e) => {
  e.preventDefault();
  let inputVal = input.value;

  if (input.value) {
    //ajax here
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${inputVal}&appid=${apiKey}&units=metric`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const { main, name, sys, weather } = data;
        const icon = `https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${weather[0]["icon"]}.svg`;

        country.innerHTML = `${name}(${sys.country})`;
        tempertureElement.innerHTML = `${Math.round(main.temp)}`;
        pressureElement.innerHTML = `${Math.round(main.pressure)}`;
        humidityElement.innerHTML = `${Math.round(main.humidity)}`;

        const figureMarkup = `
          <img class="city-icon" src="${icon}" alt="${weather[0]["description"]}">
          <figcaption>${weather[0]["description"]}</figcaption>
      `;
        weatherFigureElement.innerHTML = figureMarkup;
        cardElement.style.display = "block";
        msg.textContent = "";
        form.reset();
        input.focus();
      })
      .catch(() => {
        msg.textContent = "Please search for a valid city";
      });
  } else {
    msg.textContent = "Please enter a city name";
  }
});
