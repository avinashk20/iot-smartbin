const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");
const TelegramBot = require("node-telegram-bot-api");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

const URL = "https://react-b5a1f-default-rtdb.firebaseio.com/smartbins.json";

const BOT_TOKEN = "6228586208:AAEP1H63oQ3VI82HLuW_MyFJqPHgcuZVdKA";
const CHAT_ID = "-1001657670679";
const bot = new TelegramBot(BOT_TOKEN);

app.get("/bins", function (req, res) {
  https.get(URL, (response) => {
    response.on("data", (data) => {
      const binsData = JSON.parse(data);
      res.json(binsData);
    });
  });
});

app.post("/alert", function (req, res) {
  console.log(req.body);
  const message = req.body.message;
  // Sending a text message
  bot
    .sendMessage(CHAT_ID, message)
    .then(() => {
      console.log("Telegram alert sent successfully");
    })
    .catch((error) => {
      console.error("Error sending Telegram alert:", error);
    });
  res.json({ result: "message sent" });
});

app.listen(5000, function () {
  console.log("server started on port 5000");
});
