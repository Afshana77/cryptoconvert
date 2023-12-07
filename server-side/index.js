const express = require("express");
const axios = require("axios");

const app = express();
const port = 4000;
// as  showing cors error added allow origin for localhost:3000
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'http://localhost:3000'); // Update with your React app's origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');

  if (req.method === "OPTIONS") {
    res.sendStatus(200);
  } else {
    next();
  }
});

app.get("/list", async (req, res) => {
  try {
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?&start=1&convert=INR&CMC_PRO_API_KEY=dfadb850-58ca-433a-abba-e0468c959fef`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error occurred");
  }
});
app.get("/convert", async (req, res) => {
  try {
    const { amount, symbol, convert } = req.query;
    const response = await axios.get(
      `https://pro-api.coinmarketcap.com/v1/tools/price-conversion?&amount=${amount}&symbol=${symbol}&convert=${convert}&CMC_PRO_API_KEY=dfadb850-58ca-433a-abba-e0468c959fef`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error occurred");
  }
});
app.listen(port, () => {
  console.log("server running on ", port);
});
