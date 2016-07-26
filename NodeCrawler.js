"use strict";
const fs = require("fs");
const request = require("request");
const cheerio = require("cheerio");
const async = require("async");

var NodeCrawler = function(hostname, maxDepth, currentDepth){
    this.hostname = hostname;
    this.url = "http://"+hostname;
    this.maxDepth = maxDepth;
    this.currentDepth = currentDepth;
    this.childs = [];
};

NodeCrawler.prototype.start = function(callback){
    var self = this;
    var options = {
        url: this.url,
        strictSSL: false
    }
    request(options, function(err, response, html){
        var self1 = self;
        if(err) console.error("error reading "+self.url+" "+err);
        else{
            self.response = response;
            self.html = html;
            var $ = cheerio.load(html);
            $('a').each(function(i,e){
                if($(e).attr('href') != undefined){
                    var href = removeAnchor($(e).attr('href'));
                    var path = response.request.path;
                    if(href !== undefined && href.indexOf('http') < 0 && href.indexOf('html') >= 0 && self.childs.indexOf(href) < 0 && href.indexOf(path.substring(0,path.length-1)) < 0){
                        self.childs.push(href);
                        callback(self,href);
                    }
                }
            });
        }
    });  
};

function removeAnchor(str){
    return str.substring(0, str.indexOf('#'));
}

var array = fs.readFileSync('sites.txt').toString().split("\r\n");
var result = '';
async.each(array, function(e,callback){
    console.log(e);
    var c = new NodeCrawler(e,1,1);
    c.start(saveToFile);
    setTimeout(callback(), 3000);
});


function saveToFile(c,href){
    console.log(c.url+href);
}