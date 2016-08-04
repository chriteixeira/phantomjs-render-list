"use strict"
const Crawl = require('./CrawlNode');
var Crawler = function(startUrl, maxDepth){
    this._startUrl = startUrl; 
    this._queue = new Array();
    this._visited = [];
    this._maxDepth = maxDepth;
};


Crawler.prototype.start = function(){
    this._currDepth = 0;
    var startNode = new CrawlNode(this._startUrl);
    startNode.crawl(this.next);
};

Crawler.prototype.next = function(node){
    var children = node.childs;
    for(var i=0;i < children.length; i++){
        this._queue.push(children[i]);
    }

    this._queue.shift().crawl(next);
    //TODO
    //add stop condition (max depth reached)
    //add to the visited and check if already visited
};