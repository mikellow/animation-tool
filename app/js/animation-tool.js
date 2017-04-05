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

    function handleAction (action) {
        console.log('handleAction', action);
    }

    function generateAnimationDiv () {
        var div = document.createElement("div");
        div.style.width = model.width + "px";
        div.style.height = model.height + "px";
        div.style.background = model.background;
        div.style.top = div.style.left = "0";
        div.classList.add('display-element');
        div.innerHTML = "Hello " + parseInt(Math.random() * (100 - 1 ) + 1);
        animationDiv = div;

    }

    function init () {
        generateAnimationDiv();
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


function FormHandler (transformationsForm) {
    var activeAnimationElement;
    var transformedElement;
    var transformProperties = {};

    // console.log('transformationsForm elements', transformationsForm.elements);

    function attachEvents () {
        var i = 0;
        var iMax = transformationsForm.elements.length;
        for(;i < iMax; i++){
            transformationsForm.elements[i].addEventListener('input', function (event) {
                // console.log('input ACTION', this);
                var cssProperty = this.dataset.property;
                var unit = this.dataset.unit;
                var value = this.value;
                // console.log('cssProperty:', cssProperty, value, unit);
                handleCssProperty(transformedElement, cssProperty, value, unit);

                activeAnimationElement.transformProperties = transformProperties;
            });
        }
    }

    function handleCssProperty (element, property, value, unit) {
        if (transformProperties[property]) {
            transformProperties[property].value = value;
        } else {
            transformProperties[property] = { 'name': property, 'value': value, 'unit': unit};
        }
        updateElementStyle(element);
        updateInputsValuesForProperty(transformProperties[property]);
    }

    function updateInputsValuesForProperty (property) {
        // console.log('updateInputsValuesForProperty', property);
        var elements = transformationsForm.elements[property.name];
        var i = 0;
        var max = elements.length;
        for (; i < max; i++) {
            elements[i].value = property.value;
            //handleCssProperty(transformedElement, property.name, property.value, property.unit);
        }
    }

    function setInputValues (animationElement) {

        var i = 0;
        var iMax = transformationsForm.elements.length;
        for(;i < iMax; i++){
            var propName = transformationsForm.elements[i].name;
            var newValue =  animationElement.transformProperties &&
                            animationElement.transformProperties[propName] &&
                            animationElement.transformProperties[propName].value || 0;
            var unit =  animationElement.transformProperties &&
                            animationElement.transformProperties[propName] &&
                            animationElement.transformProperties[propName].unit || '';

            updateInputsValuesForProperty({
                name: propName,
                value: newValue
            });
        }
    }

    function updateElementStyle (element) {
        var styleStr ='';
        var prop;
        for (var property in transformProperties) {
            prop = transformProperties[property];
            styleStr += prop.name + '(' + prop.value + prop.unit + ') ';
        }
        // console.log('styleStr', styleStr);

        element.style.WebkitTransform = styleStr;
        // Code for IE9
        element.style.msTransform = styleStr;
        // Standard syntax
        element.style.transform = styleStr;
    }

    function init () {
        attachEvents();
    }

    init();

    function activateElement (element) {
        console.log('activateElement', element)
        activeAnimationElement = element;
        transformedElement = element.animationDiv;
        transformProperties = activeAnimationElement.transformProperties || {};
        setInputValues(activeAnimationElement);
    }

    return {
        setInputValues: setInputValues,
        activateElement: activateElement
    }
}