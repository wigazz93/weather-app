//const apiKey = "23f5426762124b1fba2162519231810";

//const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=Brest`;

//fetch(url)
//  .then((data) => data.json())
//  .then((res) => console.log(res));

const form = document.querySelector(".form");
const input = document.querySelector(".input-city");
const apiKey = "23f5426762124b1fba2162519231810";

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
  document.querySelector(".card").remove();
  if (data.error) {
    const html = `<div class="card">${data.error.message}</div>`;
    main.insertAdjacentHTML("afterbegin", html);
  }

  const html = `<div class="card">
      <h2 class="card-city">${data.location.name} <span>${data.location.country}</span></h2>
      <div class="card-weather">
        <div class="card-value">
        ${data.current.temp_c}<sup><small>&#8451;</small></sup>
        </div>
        <img
          src="../images/8.png"
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
