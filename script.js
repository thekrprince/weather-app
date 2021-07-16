window.addEventListener('load', () => {
  let long;
  let lat;

  let timeZone = document.querySelector('.location-timezone');
  let tempDegree = document.querySelector('.temperature-degree');
  let description = document.querySelector('.description');
  let icon = document.querySelector('.icon');
  let tempSection = document.querySelector('.temperature-section');
  let tempScale = document.querySelector('.temperature-scale');
  let humiditySection = document.querySelector('.humidity');
  let wind = document.querySelector('.wind');
  let area = document.querySelector('.area');
  let time = document.querySelector('.time');

  console.log(tempScale.innerText);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const api = `https://api.weatherapi.com/v1/current.json?key=5d282295d8f54ef894712710211607&q=${lat},${long}&aqi=no`;

      fetch(api)
        .then((data) => {
          return data.json();
        })
        .then((data) => {
          console.log(data);
          const { temp_c, temp_f, condition, humidity, wind_kph } =
            data.current;
          const { country, name, region, tz_id, localtime } = data.location;
          // Set DOM Elements from the API
          timeZone.textContent = tz_id;
          tempDegree.textContent = temp_c;
          description.textContent = condition.text;
          icon.src = condition.icon;
          humiditySection.textContent = `Humidity: ${humidity}%`;
          wind.textContent = `Wind: ${wind_kph} km/h`;
          area.textContent = `${name}, ${region}, ${country}`;
          time.textContent = localtime;

          // Change temperature to Celsius/Fahrenheit
          tempSection.addEventListener('click', () => {
            if (tempScale.innerHTML === '℃') {
              tempScale.innerHTML = '℉';
              tempDegree.textContent = temp_f;
            } else {
              tempScale.innerHTML = '℃';
              tempDegree.textContent = temp_c;
            }
          });
        });
    });
  } else {
    h1.textContent = 'This is not working';
  }
});
