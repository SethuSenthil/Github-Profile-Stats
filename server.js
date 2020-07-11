const express = require("express");
const app = express();
const geoip = require("geoip-lite");
const countryFlagEmoji = require("country-flag-emoji");

// Telegram imports //
const TelegramBot = require("node-telegram-bot-api");
const token = process.env.BOT_KEY;
const bot = new TelegramBot(token, { polling: false });
// Telegram imports //

app.get("/", (req, res) => {
  res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
  res.header("Expires", "-1");
  res.header("Pragma", "no-cache");

  let transparentB64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
  let img = Buffer.from(transparentB64, "base64");

  res.writeHead(200, {
    "x-random" : (Math.random() * 10).toString(),
    "Content-Type": "image/png",
    "Content-Length": img.length
  });

  res.end(img);

  let headerVerify = [];
  try {
    headerVerify = [
      req.header("x-forwarded-proto") == "https,http,http",
      req.header("user-agent").includes("github-camo"),
      req.header("accept") == "image/webp,image/apng,image/*,*/*;q=0.8",
      req.header("via").includes("github-camo"),
      req.header("accept-language") != undefined,
      req.header("x-forwarded-port") != undefined,
      req.header("host") != undefined,
      req.header("x-forwarded-host") != undefined,
      req.header("x-forwarded-host") != undefined
    ];
  } catch (err) {
    headerVerify = [false, false];
  }

  if (!headerVerify.includes(false)) {
    //real request from github profile (not some bot)
    let ipInfo = geoip.lookup(req.header("x-forwarded-for").split(",")[0]);

    //do what you want using this info
    //Telegram Bot example
    let emoji = countryFlagEmoji.get(ipInfo.country);
    if (emoji != undefined) {
      emoji = emoji.emoji;
    } else {
      emoji = "❓";
    }

    bot.sendMessage(
      process.env.CHAT_ID,
      `New Profile View from ${emoji} ${ipInfo.country} 
 `
    );

    //Telegram Bot example
  }
});

const listener = app.listen(process.env.PORT, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
