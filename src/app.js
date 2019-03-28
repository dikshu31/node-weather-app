const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Define paths for express configuration
const publicPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebar engines, views and register partials
app.set("views", viewsPath);
app.set("view engine", "hbs");
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Dikshant"
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Dikshant"
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Dikshant"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "Please enter your address"
    });
  }
  const location = req.query.address;
  geocode(location, (geocodeError, { latitude, longitude, location } = {}) => {
    if (geocodeError) {
      return res.send({ error: geocodeError });
    }
    forecast(latitude, longitude, (forecastError, forecastResponse) => {
      if (forecastError) {
        return res.send({ error: forecastError });
      }
      res.send({
        latitude,
        longitude,
        location,
        forecast: forecastResponse
      });
    });
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dikshant",
    errorMessage: "Help article not found"
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Dikshant",
    errorMessage: "Page not found"
  });
});

app.listen(3000, () => {
  console.log("Server is up at Port 3000");
});
