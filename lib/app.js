"use strict"
const request = require('request');
const cheerio = require('cheerio');
const phantom = require('phantom');
const express = require('express');

const CrawlNode = require('./CrawlNode');
const Crawler = require('./Crawler');

const app = express();

app.get('/', function name(req, res) {
    //var crawlNode = new CrawlNode("https://github.com/");
    //crawlNode.start();
    var crawler = new Crawler('https://github.com/',2);
    crawler.start();
});

app.listen(3000, function name() {
   console.log('Application running on port '+3000); 
});