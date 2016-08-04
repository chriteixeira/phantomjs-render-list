"use strict";
var system = require('system');
var fs = require('fs');
var webpage = require('webpage');


phantom.onError = function (msg, trace) {
    var msgStack = ['PHANTOM ERROR: ' + msg];
    if (trace && trace.length) {
        msgStack.push('TRACE:');
        trace.forEach(function (t) {
            msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function + ')' : ''));
        });
    }
    console.error(msgStack.join('\n'));
    phantom.exit(1);
};

function renderSections(page, htmlCollection) {
    console.log(htmlCollection.length);
    for (var i = 0; i < htmlCollection.length; i++) {
        console.log('b');
        page.clipRect = {
            top: htmlCollection[i].top,
            left: htmlCollection[i].left,
            width: htmlCollection[i].width,
            height: htmlCollection[i].height
        };
        page.render('results/section_' + i + '-' + htmlCollection[i] + nodeName);
    }
}

function execute(url, options) { 
    var _page = webpage.create();
    var _debug = true;

    if (options !== undefined) {
        _page.viewportSize = options.viewportSize;
        options.debug = true;
    }

    // Open the page and log the error
    _page.open(url, function (status) {
        if (status !== 'success')
            return console.error('Error opening page - Status ' + status);
        if (_debug) console.log('Opening url');

        _page.viewportSize = {
            width: 1280,
            height: 720
        };
        var bodyChildrenBounds = _page.evaluate(function () {
            var result = [];
            var htmlCollection = document.body.children;
            console.log(htmlCollection);
            for (var i = 0; i < htmlCollection.length; i++) {
                if (htmlCollection[i].nodeName !== 'SCRIPT') {
                    result.push(htmlCollection[i].getBoundingClientRect());
                }
            }
            return result;
        });

        _page.render('results/page.png');

        for (var i = 0; i < bodyChildrenBounds.length; i++) {
            _page.clipRect = {
                top: bodyChildrenBounds[i].top,
                left: bodyChildrenBounds[i].left,
                width: bodyChildrenBounds[i].width,
                height: bodyChildrenBounds[i].height
            };
            _page.render('results/section_' + i + '.png');
        }

        _page.close();
        phantom.exit();
    });
}


/*
 * Parse the parameters and save it to the options object
 * 
 * 1 - url
 * 2 - 
 */
function parseParameters() {

}

execute(system.args[1], null);

