"use strict"
/*
 * Crawl a URL and fetch all childs of that page.
 * 
 * Created by chriteixeira 
 */
const request = require('request');
const cheerio = require('cheerio');

var CrawlNode = function (url, options, _parent) {
    this.url = url;
    this.options = options;
    this.response = null;
    this.html = null;
    this.childs = [];
    this.parent = _parent;

    this.depth = (_parent === undefined) ? 0 : _parent.depth + 1;
}


CrawlNode.prototype.crawl = function (crawlNode) {
    var options = {
        url: this.url,
        strictSSL: false
    }
    var self = this;
    request(options, function (err, response, html) {
        if (err)
            return console.error(err);
        var $ = cheerio.load(html);
        self.html = html;
        self.response = response;
        extractChilds(self, $);
        crawlNode.next(self);
    });
};

/*
 * Extract all the child pages of a single page. The child extaction will be based on the 
 * crawl options.
 */
function extractChilds(crawlNode, $) {
    var links = $("a[href^='/']");
    var url = crawlNode.response.request.uri.protocol + "//" + crawlNode.response.request.uri.host;
    for (var i in links) {
        if (links[i].attribs !== undefined && links[i].attribs['href'] !== undefined) {
            var linkUrl = url + links[i].attribs['href'];
            if (linkUrl !== crawlNode.url && crawlNode.childs.indexOf(linkUrl) === -1) {
                crawlNode.childs.push(new CrawlNode(linkUrl, crawlNode.options, crawlNode));
                console.log(linkUrl);
            }
        }
    }
}

module.exports = CrawlNode;