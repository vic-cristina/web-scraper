const PORT = 8000;

const axios = require("axios");
const cheerio = require("cheerio");
const express = require("express");

const app = express();

const url = "https://www.ultrafarma.com.br/busca?q=climene";

axios(url).then((response) => {
  const html = response.data;
  const $ = cheerio.load(html);

  $(".product-price-sell", html).each(function () {
    const price = $(this).text();
    console.log(price);
  });
  $(".product-item-link", html).each(function () {
    const url = $(this).attr("href");
    console.log(url);
  });
});

app.listen(PORT, () => console.log(`server running on PORT ${PORT}`));
