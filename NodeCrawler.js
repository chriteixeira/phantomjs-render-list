"use strict";
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");

var NodeCrawler = function(hostname, maxDepth, currentDepth){
    this.hostname = hostname;
    this.url = "http://"+hostname;
    this.maxDepth = maxDepth;
    this.currentDepth = currentDepth;
    this.child = [];
};

NodeCrawler.prototype.start = function(){
    var self = this;
    var options = {
        url: this.url,
        strictSSL: false
    }
    request(options, function(err, response, html){
        var self1 = self;
        if(err) console.log("error reading "+self.url+" "+err);
        else{
            self.response = response;
            self.html = html;
            var $ = cheerio.load(html);
            $('a').each(function(i,e){
                var href = $(e).attr('href');
                if(href !== undefined && href.indexOf('http') < 0 && href.indexOf('html') >= 0){
                    console.log(href);
                    console.log(response.request.path);
                }
            });
        }
    });  
};

var c = new NodeCrawler("coca-cola.com.br",1,1);
c.start();