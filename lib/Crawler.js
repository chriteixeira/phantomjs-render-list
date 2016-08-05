"use strict"
const _ = require('lodash');
const CrawlNode = require('./CrawlNode');

var Crawler = function(startUrl, maxDepth){
    this._startUrl = startUrl; 
    this._queue = new Array();
    this._visited = [startUrl];
    this._maxDepth = maxDepth;
};

Crawler.prototype.start = function(){
    this._currDepth = 0;
    var startNode = new CrawlNode(this._startUrl);
    startNode.crawl(this);
};

Crawler.prototype.next = function(node){
    var children = node.childs;
    for(var i=0;i < children.length; i++){
        this._queue.push(children[i]);
    }

    //Get the next non-visited node
    var nextNode = null;
    do {
        nextNode = this._queue.shift();
        console.log(_.includes(this._visited, nextNode.url)+" - "+nextNode.url);
    } while(_.includes(this._visited, nextNode.url));
    //Crawl the next page if max depth was not been reached
    console.log(nextNode.depth);
    console.log(this._maxDepth);
    if(nextNode.depth <= this._maxDepth){
        console.log('a');
        nextNode.crawl(this);
        this._visited.push(nextNode.url);
    }
};

module.exports = Crawler;