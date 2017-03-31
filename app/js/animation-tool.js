(function (window) {
"use strict";

    var frames = [];
    var animationElements = [];

    var displayBox = document.getElementById('displayBox');
    var displayContainer = document.getElementById('displayContainer');
    var displayToolsForm = document.getElementById('displayToolsForm');

    function setDisplayBoxSize (width, height) {
        if (width) {
            displayBox.style.width = width + 'px';
        }
        if (height) {
            displayBox.style.height = height + 'px';
        }
    }

    function setDisplayBoxFormValues(width, height) {
        displayToolsForm.elements['displayWidth'].value = width;
        displayToolsForm.elements['displayWidth'].max = width;
        displayToolsForm.elements['displayHeight'].value = height;
    }

    function handleDisplayBoxEvents () {
        window.addEventListener('resize', function(event){
            displayBox.style.width = '';
            displayBox.style.height = '';
            var displayContainerComputed = window.getComputedStyle(displayContainer);
            var initialWidth = parseInt(displayContainerComputed.width);
            var initialHeight = parseInt(displayContainerComputed.height);
            setDisplayBoxSize(initialWidth, initialHeight);
            setDisplayBoxFormValues(initialWidth, initialHeight);
        });
    }

    function initDisplayBox () {
        var displayContainerComputed = window.getComputedStyle(displayContainer);
        var initialWidth = parseInt(displayContainerComputed.width);
        var initialHeight = parseInt(displayContainerComputed.height);
        setDisplayBoxSize(initialWidth, initialHeight);
        setDisplayBoxFormValues(initialWidth, initialHeight);

        handleDisplayBoxEvents();
    }

    function init () {
        initDisplayBox();
    }

    init();

    var animationToolApi = new Object({
        setDisplayHeight: function (element){
            console.log('setDisplayHeight', element.value);
            setDisplayBoxSize(null, element.value);
        },
        setDisplayWidth: function (element){
            console.log('setDisplayWidth', element.value);
            setDisplayBoxSize(element.value, null);
        },
        removeFrame: function () {
            console.log('remove frame now');
        },
        addFrame: function () {
            console.log('add frame now');
        }
    });

    window.animationTool = animationToolApi;
})(window);