(function (window) {
"use strict";


    var animationTool = new Object({
        removeFrame: function () {
            console.log('remove frame now');
        },
        addFrame: function () {
            console.log('add frame now');
        }
    });

    window.animationTool = animationTool;
})(window)