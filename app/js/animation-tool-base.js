(function () {
"use strict";

var form = document.getElementById('transformationsForm');
console.log('form elemenets', form.elements);

var transformedElement = document.getElementById('transformed');
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

})();