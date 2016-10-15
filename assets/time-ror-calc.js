"use strict";

let rect         = document.getElementById("rect1")
let resetButton  = document.getElementById("reset")
let redrawButton = document.getElementById("redraw")

rect.style.setProperty("fill", "#ff0000", "")

reset.onclick = function(){
    rect.style.setProperty("fill", "#ffffff", "")
    }

redraw.onclick = function(){
    let color = getRandomIntInclusive(0,0xffffff)
    rect.style.setProperty("fill", "#" + color.toString(16), "")
    }

// code from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
