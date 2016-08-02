"use strict";
var system = require('system'),
    fs = require('fs'),
    webpage = require("webpage");

function Page(address){
    this.page = webpage.create();
    this.address = address;
    this.renderName = 'results/'+address.replace('://','_')+'.png';
    this.openPage = function(){
        var url = this.address;
        this.page.open(this.address,function(status){
            if (status !== 'success') {
                console.log('FAIL to load the address: '+url);
            } else {
                console.debug('Loading ' + url);
            }
        });
    };

    this.renderPage = function(){
        document.body.bgColor = 'white';
        this.page.render(this.renderName);
    };
}

var renderCompare = function(filename){
    var file = fs.read(filename);
    var array = file.toString().split("\n");
   
    var resemble = require("resemblejs");

    for(var i in array){
        var urls = array[i].split("|");

        if(urls.length != 2 ){
            console.log("Error: line "+i+" incorrect.");
        }
        else{
            console.log(urls[0]);
            var page1 = new Page(urls[0]);
            var page2 = new Page(urls[1]);
            page1.openPage();
            page1.page.onLoadFinished = function(){
                page2.openPage();
                page1.renderPage();
                page2.page.onLoadFinished = function(){
                    page2.renderPage();
                    resemble.outputSettings({
                            errorColor: {
                                red: 255,
                                green: 0,
                                blue: 255
                            }
                        });
                    setTimeout(function(){
                        console.log(page1.renderName);
                    var diff = resemble(page1.renderName).compareTo(page2.renderName).onComplete(function(data){
                        console.log(JSON.stringify(data));
                        var img = data.getImageDataUrl().replace(/^data:image\/\w+;base64,/, "");
                        var buf = new Buffer(img, 'base64');
                        fs.writeFile('diff/image.png', buf);
                    });
                    diff.repaint();
                    },1000);
                }
            } 
        }
    }

}

renderCompare(system.args[1]);