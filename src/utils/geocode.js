const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoibWF0dGZpY2tlIiwiYSI6ImNqNnM2YmFoNzAwcTMzM214NTB1NHdwbnoifQ.Or19S7KmYPHW8YjRz82v6g&limit=1";
  request({ url, json: true }, (error, response) => {
    const { features } = response.body;
    if (error) {
      callback("Unable to connect to geocoding service", undefined);
    } else if (features.length === 0) {
      callback("Unable to find the specified location", undefined);
    } else {
      const data = features[0];
      callback(undefined, {
        latitude: data.center[1],
        longitude: data.center[0],
        location: data.place_name
      });
    }
  });
};

module.exports = geocode;
