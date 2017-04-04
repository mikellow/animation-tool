(function (window) {
"use strict";

    var currentFrame = null;
    var currentAnimationElement = null;

    var frames = [];
    var animationElements = [];

    var displayBoxCtrl;

    function init () {
        displayBoxCtrl = new DisplayBoxCtrl();

        currentFrame = new AnimationFrame();
        frames.push(currentFrame);

        currentAnimationElement = new AnimationElement({
            width: 100, height: 100, background: 'red'
        });
        animationElements.push(currentAnimationElement);
        displayBoxCtrl.addAnimationElement(currentAnimationElement);

        AnimationFrame.animationElements = animationElements;

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
            var newAnimationElement = new AnimationElement(currentAnimationElement.model);
            console.log('newAnimationElement', newAnimationElement);
            animationElements.push(newAnimationElement);

            displayBoxCtrl.addAnimationElement(newAnimationElement);
        }
    });

    window.animationTool = animationToolApi;





    var form = document.getElementById('transformationsForm');
    console.log('form elemenets', form.elements);

    // var transformedElement = document.getElementById('transformed');
    var transformedElement = currentAnimationElement.animationDiv;
    var transformProperties = {};

    var i = 0;
    var iMax = form.elements.length;

    for(;i < iMax; i++){
        form.elements[i].addEventListener('input', function (event) {
            var cssProperty = this.dataset.property;
            var unit = this.dataset.unit;
            var value = this.value;
            console.log('cssProperty:', cssProperty, value, unit);
            handleCssProperty(transformedElement, cssProperty, value, unit);
        });
    }

    function handleCssProperty (element, property, value, unit) {
        if (transformProperties[property]) {
            transformProperties[property].value = value;
        } else {
            transformProperties[property] = { 'name': property, 'value': value, 'unit': unit};
        }
        console.log(transformProperties);
        updateElementStyle(element);
        updateInputsValues(transformProperties[property]);

    }
    function updateInputsValues (property) {

        var elements = form.elements[property.name];
        var i = 0;
        var max = elements.length;
        for (; i < max; i++) {
            elements[i].value = property.value;
        }
    }
    function updateElementStyle (element) {
        var styleStr ='';
        var prop;
        for (var property in transformProperties) {
            prop = transformProperties[property];
            console.log('prop', prop);
            styleStr += prop.name + '(' + prop.value + prop.unit + ') ';
        }
        console.log('styleStr', styleStr);

        element.style.WebkitTransform = styleStr;
        // Code for IE9
        element.style.msTransform = styleStr;
        // Standard syntax
        element.style.transform = styleStr;
    }

})(window);
