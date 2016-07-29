"use strict"
const phantom = require('node-phantom');

var RenderPage = function(url){
    this.url = url;
};

RenderPage.prototype.render = function(options){

};

module.exports = RenderPage;