const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "https://api.darksky.net/forecast/957e5196716ea2876551f14547107fc2/" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "?units=si";
  request({ url, json: true }, (error, response) => {
    const { body } = response;
    if (error) {
      callback("Unable to connect to weather service", undefined);
    } else if (body.error) {
      callback(body.error, undefined);
    } else {
      const { currently, daily } = body;
      callback(
        undefined,
        daily.data[0].summary +
          " It is currently " +
          currently.temperature +
          " degrees out. There is a " +
          currently.precipProbability +
          "% chance of rain."
      );
    }
  });
};

module.exports = forecast;
