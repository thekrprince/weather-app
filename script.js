window.addEventListener('load', () => {
  let long;
  let lat;

  let timeZone = document.querySelector('.location-timezone');
  let tempDegree = document.querySelector('.temperature-degree');
  let description = document.querySelector('.description');
  let icon = document.querySelector('.icon');
  let tempSection = document.querySelector('.degree-section');
  let tempScale = document.querySelector('.temperature-scale');
  let humiditySection = document.querySelector('.humidity');
  let wind = document.querySelector('.wind');
  let area = document.querySelector('.area');
  let time = document.querySelector('.time');

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
          const { temp_c, condition, last_updated, humidity, wind_kph } =
            data.current;
          const { country, name, region, tz_id, localtime } = data.location;
          console.log(temp_c);
          // Set DOM Elements from the API
          timeZone.textContent = tz_id;
          tempDegree.textContent = temp_c;
          description.textContent = condition.text;
          icon.src = condition.icon;
          humiditySection.textContent = `Humidity: ${humidity}%`;
          wind.textContent = `Wind: ${wind_kph} km/h`;
          area.textContent = `${name}, ${region}, ${country}`;
          time.textContent = localtime;

          tempSection.addEventListener('click', () => {
            if (tempScale.textContent === 'C') {
              tempScale.textContent = 'F';
            }
            if (tempScale.textContent === 'F') {
              tempScale.textContent = 'C';
            }
          });
        });
    });
  } else {
    h1.textContent = 'This is not working';
  }
});
