"use strict"
/*
 * Crawl a URL and fetch all childs of that page.
 * TODO: Validate repeated pages through the site
 * 
 * Created by chriteixeira 
 */
const request = require('request');
const cheerio = require('cheerio');
var Crawl = function(url, options, _parent){
    this.url = url;
    this.options = options; 
    this.response = null;
    this.html = null;
    this.childs = [];
    this.parent = _parent;
}


Crawl.prototype.start = function(){
    var options = {
        url: this.url,
        strictSSL: false
    }
    var self = this;
    request(options,function(err, response, html){
        if(err)
            return console.error(err);
        var $ = cheerio.load(html);
        self.html = html;
        self.response = response;
        extractChilds(self,$);
    });
}

/*
 * Extract all the child pages of a single page. The child extaction will be based on the 
 * crawl options.
 */
function extractChilds(crawl, $){
    var links = $("a[href^='/']");  
    var url = crawl.response.request.uri.protocol + "//" + crawl.response.request.uri.host;
    for(var i in links){
        if( links[i].attribs !== undefined && links[i].attribs['href'] !== undefined ){
            var linkUrl = url + links[i].attribs['href'];
            if(linkUrl !== crawl.url && crawl.childs.indexOf(linkUrl) === -1){
                crawl.childs.push(new Crawl(linkUrl, crawl.options, crawl));
            }
        }
    }
    console.log(crawl.childs);
}

module.exports = Crawl;