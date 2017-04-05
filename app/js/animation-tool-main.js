(function (window) {
"use strict";

    var currentFrame = null;
    var currentAnimationElement = null;

    var frames = [];
    var animationElements = [];

    var transformationsForm = document.getElementById('transformationsForm');
    var formHandler;



    var displayBoxCtrl;

    function handleElementClick (event, element) {
        console.log('handleElementClick', event, element);
        setCurrentAnimationElement(element);
    }

    function setCurrentAnimationElement (animation) {
        console.log('setCurrentAnimationElement', animation);
        currentAnimationElement = animation;
        currentAnimationElement.animationDiv = animation.animationDiv;

        //transformedElement = currentAnimationElement.animationDiv;

        formHandler.activateElement(currentAnimationElement);
        console.log('currentAnimationElement', currentAnimationElement);
    }

    function addNewAnimationElement (config) {
        var source = currentAnimationElement && currentAnimationElement.model || config
        var newAnimationElement = new AnimationElement(source);
        console.log('newAnimationElement', newAnimationElement);
        animationElements.push(newAnimationElement);

        newAnimationElement.animationDiv.addEventListener('click', function(event){
            handleElementClick(event, newAnimationElement);
        });

        displayBoxCtrl.addAnimationElement(newAnimationElement);

        return newAnimationElement;
    }


    function init () {
        AnimationFrame.animationElements = animationElements;

        displayBoxCtrl = new DisplayBoxCtrl();

        formHandler = new FormHandler(transformationsForm);

        currentFrame = new AnimationFrame();
        frames.push(currentFrame);

        currentAnimationElement = addNewAnimationElement({
            width: 100, height: 100, background: 'red'
        });

        formHandler.activateElement(currentAnimationElement);
    }

    init();


    var animationToolApi = new Object({
        setDisplayHeight: function (element){
            console.log('setDisplayHeight', element.value);
            displayBoxCtrl.setDisplayBoxSize(null, element.value);
        },
        setDisplayWidth: function (element){
            console.log('setDisplayWidth', element.value);
            displayBoxCtrl.setDisplayBoxSize(element.value, null);
        },
        removeFrame: function () {
            console.log('remove frame now');
        },
        addFrame: function () {
            console.log('add frame now');
            var newFrame = new AnimationFrame();
            console.log('newFrame', newFrame);
            frames.push(newFrame);
        },
        removeAnimationElement: function () {
            console.log('removeAnimationElement now');
        },
        addAnimationElement: function () {
            console.log('addAnimationElement now');
            addNewAnimationElement();
        }
    });

    window.animationTool = animationToolApi;

})(window);
