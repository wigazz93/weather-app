//const apiKey = "23f5426762124b1fba2162519231810";

//const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Brest`;

import { conditions } from "./conditions.js";

const form = document.querySelector(".form");
const input = document.querySelector(".input-city");
const apiKey = "14f01f33554d44faaba70650231910";

async function getWeather(city) {
  const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;
  let res = await fetch(url);
  let data = await res.json();
  return data;
}

form.onsubmit = async function (e) {
  e.preventDefault;
  let city = input.value.trim();

  const data = await getWeather(city);
  input.value = null;
  let card = document.querySelector(".card");
  if (card) card.remove();
  if (data.error) {
    const html = `<div class="card">${data.error.message}</div>`;
    main.insertAdjacentHTML("afterbegin", html);
  }

  const info = conditions.find((el) => el.code === data.current.condition.code);
  console.log(info);
  ////if (data.current.is_day){info.day}
  //data.current.is_day ? info.day : info.night;
  const html = `<div class="card">
      <h2 class="card-city">${data.location.name} <span>${
    data.location.country
  }</span></h2>
      <div class="card-weather">
        <div class="card-value">
        ${data.current.temp_c}<sup><small>&#8451;</small></sup>
        </div>
        <img
          src="../images/${data.current.is_day ? "day" : "night"}/${
    data.current.is_day ? info.day : info.night
  }.png"
          width="100"
          height="100"
          alt="cloud"
          class="card-img"
        />
      </div>
      <div class="card-description">${data.current.condition.text}</div>
    </div>`;

  main.insertAdjacentHTML("afterbegin", html);
};
