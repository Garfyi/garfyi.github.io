var h1Scale = 1;
var pageLoaded = false;
var shouldIncrease = true;
var devil = "devil";
var angel = "angel";
var cloud = "cloud";
var fire = "fire";
var stairDown = "stairDown";
var stairUp = "stairUp";
var devilAudio;
var angelAudio;

function setScale(id, size) {
    element = document.getElementById(id);
    style = window.getComputedStyle(element, null).getPropertyValue('scale');

    element.style.scale = size;
}

function setOpacity(id, amount) {
    element = document.getElementById(id);
    style = window.getComputedStyle(element, null).getPropertyValue('opacity');

    element.style.opacity = amount;
}

function onLoad() {
    devilAudio = document.getElementById("devilAudio");
    angelAudio = document.getElementById("angelAudio");
}

const interval = setInterval(function() {
    if (shouldIncrease) {
        h1Scale += 0.01;
        setScale('h1Where', h1Scale);
        if (h1Scale > 1.3) {
            shouldIncrease = false;
        }
    }
    else {
        h1Scale += -0.01;
        setScale('h1Where', h1Scale);
        if (h1Scale < 1) {
            shouldIncrease = true;
        }
    }
    
}, 50);

// Gets info on mouse position
(function() {
    let mousePos;

    document.onmousemove = handleMouseMove;
    setInterval(getMousePosition, 50); // setInterval repeats every X ms

    function handleMouseMove(event) {
        let dot, eventDoc, doc, body, pageX, pageY;

        event = event || window.event; // IE-ism

        // If pageX/Y aren't available and clientX/Y are,
        // calculate pageX/Y - logic taken from jQuery.
        // (This is to support old IE)
        if (event.pageX == null && event.clientX != null) {
            eventDoc = (event.target && event.target.ownerDocument) || document;
            doc = eventDoc.documentElement;
            body = eventDoc.body;

            event.pageX = event.clientX +
              (doc && doc.scrollLeft || body && body.scrollLeft || 0) -
              (doc && doc.clientLeft || body && body.clientLeft || 0);
            event.pageY = event.clientY +
              (doc && doc.scrollTop  || body && body.scrollTop  || 0) -
              (doc && doc.clientTop  || body && body.clientTop  || 0 );
        }

        mousePos = {
            x: event.pageX,
            y: event.pageY
        };
    }
    function getMousePosition() {
        let pos = mousePos;
        if (!pos) {
            // We haven't seen any movement yet
        }
        else {
            // Mouse has moved

            let htlmElement = document.getElementById('html');
            let positionInfo = htlmElement.getBoundingClientRect();
            let screenWidth = positionInfo.width;
            let halfScreenWidth = screenWidth / 2;

            if (pos.x > halfScreenWidth) {
                setScale(angel, 1 + ((pos.x - halfScreenWidth) / halfScreenWidth));
                setScale(cloud, 1 + ((pos.x - halfScreenWidth) / halfScreenWidth) / 2);
                setOpacity(stairUp, ((pos.x - halfScreenWidth) / halfScreenWidth));
                setScale(devil, 1);
                setScale(fire, 1);
                setOpacity(stairDown, 0);
                if (pos.x > halfScreenWidth + halfScreenWidth / 2) {
                    angelAudio.play();
                }
            }
            else {
                setScale(angel, 1);
                setScale(cloud, 1);
                setOpacity(stairUp, 0);
                setScale(devil, 1 + ((halfScreenWidth - pos.x) / halfScreenWidth));
                setScale(fire, 1 + ((halfScreenWidth - pos.x) / halfScreenWidth) / 2);
                setOpacity(stairDown, ((halfScreenWidth - pos.x) / halfScreenWidth));
                if (pos.x < halfScreenWidth - halfScreenWidth / 2) {
                    devilAudio.play();
                }
            }
        }
    }
})();