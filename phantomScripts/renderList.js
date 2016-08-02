"use strict";
var system = require('system'),
	fs = require('fs');


var renderList = function(fileName){
	var webpage = require("webpage");
	var file = fs.read(fileName);
	var array = file.toString().split("\n");
	for(var i in array){
		if(array[i].length > 0){
			(function(address){
				var page = webpage.create();
				console.log('Processing '+address);
				page.viewportSize = {
					width: 1280,
					height: 720
				};
				page.open(address, function(status){
					if (status !== 'success') {
						console.log('FAIL to load the address:'+address);
					} else {
						console.log('Loading ' + address);
					}
				});
				page.onLoadFinished = function(){
					document.body.bgColor = 'white';
					page.render('results/'+address.replace('://','_')+'.png');
					page.close()
				}

			})(array[i]);
		}
	}
};

renderList(system.args[1]);

