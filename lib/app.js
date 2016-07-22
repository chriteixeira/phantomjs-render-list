"use strict"
const request = require('request');
const cheerio = require('cheerio');
const phantom = require('phantom');
const express = require('express');

const Crawl = require('./Crawl');

const app = express();

app.get('/', function name(req, res) {
    var crawl = new Crawl("http://www.coca-cola.com.br");
    crawl.start();
});

app.listen(3000, function name() {
   console.log('Application running on port '+3000); 
});