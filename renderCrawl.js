"use strict";
var system = require('system'),
	fs = require('fs'),
    webpage = require("webpage");


var RenderCrawl = function(url, maxDepth, currentDepth){
    this.url = url;
    this.page = webpage.create();
    this.title = null;
    this.links = null;

};

RenderCrawl.prototype.start = function(){
    console.log("starting");
    var self = this; 
    this.page.open(this.url, function(status){
        if (status !== 'success') {
            console.log('FAIL to load the address: '+ self.url);
        }
        else{
            console.log('Loading ' + self.url);
            var documentHTML = page.evaluate(function () {
                    return document.body && document.body.innerHTML ? document.body.innerHTML : "";
                });
            console.log(documentHTML);
            self.evaluate();
            self.render();
        }
    });
};

RenderCrawl.prototype.crawl = function(url){
    if(currentDepth+1 <= maxDepth){
        var crawl = new RenderCrawl(url, this.maxDepth, currentDepth+1);
        crawl.start();
    }
};

RenderCrawl.prototype.evaluate = function() {
    var self = this;
    console.log("evaluating");
    this.page.evaluate(function(){
        console.log("evaluating");
        self.title = document.title;
        self.links = [];
        var linkArray = document.querySelectorAll("a");
        for(var i=0; i < linkArray.length; i++){
            self.links.push(linkArray[i].href);
        }
    });
};

RenderCrawl.prototype.render = function(){
    console.log("rendering");
    //document.body.bgColor = 'white';
    this.page.viewportSize = {
					width: 1280,
					height: 720
				};
    this.page.render('results/'+this.url.replace('://','_')+'/'+this.title+'.png');
};

var x = new RenderCrawl('http://www.coca-cola.com.br',1,1);
x.start();

