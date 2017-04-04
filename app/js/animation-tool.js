function AnimationFrame () {

    var model = {
        timelinePosition : 0
    }

    function init () {
        console.log('AnimationFrame init', AnimationFrame.animationElements);
    }

    init();

    /* public */
    function setTimelinePosition (position) {
        model.timelinePosition = position;
    }

    return {
        setTimelinePosition: setTimelinePosition
    }

}

AnimationFrame.animationElements = [];

function AnimationElement (config) {

    var animationDiv;

    var model = {
        width: config.width,
        height: config.height,
        background: config.background
    }

    function init () {
        var div = document.createElement("div");
        div.style.width = model.width + "px";
        div.style.height = model.height + "px";
        div.style.background = model.background;
        div.style.top = div.style.left = "0";
        div.classList.add('display-element');

        div.innerHTML = "Hello"

        animationDiv = div;
    }

    /* public */

    init();

    return {
        model: model,
        animationDiv : animationDiv
    }

}

function DisplayBoxCtrl () {

    var displayBox = document.getElementById('displayBox');
    var displayContainer = document.getElementById('displayContainer');
    var displayToolsForm = document.getElementById('displayToolsForm');


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

    /* public */
    function setDisplayBoxSize (width, height) {
        if (width) {
            displayBox.style.width = width + 'px';
        }
        if (height) {
            displayBox.style.height = height + 'px';
        }
    }

    function addAnimationElement (element) {
        console.log('addAnimationElement', element.animationDiv);
        displayBox.appendChild(element.animationDiv);
    }

    return {
        setDisplayBoxSize   : setDisplayBoxSize,
        addAnimationElement : addAnimationElement
    }
}