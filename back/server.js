const Users = require("./dataBase");
const dotEnv = require("dotenv");
const cors = require("cors");
dotEnv.config();
const express = require("express");
const app = express();
app.use(express.json());
app.use(cors({ origin: "*" }));
//========================================Amadeus SDK
var Amadeus = require("amadeus");
console.log(process.env.AMADEUS_KEY);
console.log(process.env.AMADEUS_SECRET);
var amadeus = new Amadeus({
  clientId: process.env.AMADEUS_KEY,
  clientSecret: process.env.AMADEUS_SECRET,
});

app.get("/flights", (req, res) => {
  amadeus.shopping.flightOffersSearch
    .get({
      originLocationCode: "PAR",
      destinationLocationCode: "LCY",
      departureDate: "2023-01-17",
      adults: "1",
      currencyCode: "DZD",
    })
    .then(function (response) {
      console.log(response.data);
      return res.send(response.data);
    })
    .catch(function (responseError) {
      console.log(responseError);
      res.send("there is an error accouring");
    });
});
//=========================

app.get("/", (req, res) => {
  res.send("Hello ");
});
app.post("/login", (req, res) => {
  let { username, password } = req.body;
  const FoundUsers = Users.filter((e) => {
    return e.username === username && e.password === password;
  });
  if (FoundUsers.length > 0) {
    return res.send("successfuly loged in");
  } else {
    return res.send("incorrect");
  }
});

app.listen(8090, () => {
  console.log("server started");
});
