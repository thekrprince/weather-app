window.addEventListener('load', () => {
  let long;
  let lat;

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
        });
    });
  } else {
    h1.textContent = 'This is not working';
  }
});
