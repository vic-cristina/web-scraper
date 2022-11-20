const PORT = 5003;
const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const estrSamples = [
  "climene",
  "cicloprimogyna",
  "oestrogel",
  "ciclovular",
  "espironolactona",
  "bicalutamida",
  "acetato de ciproterona",
];
const samples = [];
const sampleAddr = [];

for (const estradiol of estrSamples) {
  let url = `https://www.ultrafarma.com.br/busca?q=${estradiol}`;
  console.log(url);
  axios(url)
    .then((response) => {
      const html = response.data;
      const $ = cheerio.load(html);

      $(".product-price-sell", html).each(function () {
        const price = $(this).text();
        console.log(estradiol, price);
        samples.push(price);
      });
      $(".product-item-link", html).each(function () {
        const url = $(this).attr("href");
        console.log(url);
        sampleAddr.push(url);
      });
    })
    .catch((err) => console.log(err));
}

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
