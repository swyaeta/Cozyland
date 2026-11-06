const dog = document.getElementById("dog");

let position = 50;
let direction = 1;
let sleeping = false;
let dragging = false;
let lastTouched = Date.now();

let offsetX = 0;
let offsetY = 0;


// to make the dog move up and down
function moveDog() {
    if (sleeping || dragging) return;

    position += direction * 0.5;

    if (position >= 51) {
        direction = -1;
        dog.src = "images/dog_up.png";
    }

    if (position <= 49) {
        direction = 1;
        dog.src = "images/dog_down.png";
    }

    dog.style.top = position + "%";
}

setInterval(moveDog, 1000);


// to make my dog sleep after 20 sec
setInterval(() => {
    if (!dragging && Date.now() - lastTouched >= 20000) {
        sleeping = true;
        dog.src = "images/dog_sleep.png";
    }
}, 1000);


// to make the dog wakeup after sleeping
dog.addEventListener("click", () => {
    lastTouched = Date.now();
    sleeping = false;
    dog.src = "images/dog_down.png";
});


// to darg the dog around
dog.addEventListener("pointerdown", (e) => {

    dragging = true;
    sleeping = false;
    lastTouched = Date.now();

    const rect = dog.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    dog.setPointerCapture(e.pointerId);
});


// MOVE DOG WHILE DRAGGING
dog.addEventListener("pointermove", (e) => {

    if (!dragging) return;

    const room = dog.parentElement;
    const rect = room.getBoundingClientRect();

    let x = e.clientX - rect.left - offsetX;
    let y = e.clientY - rect.top - offsetY;

    x = Math.max(0, Math.min(x, room.clientWidth - dog.offsetWidth));
    y = Math.max(0, Math.min(y, room.clientHeight - dog.offsetHeight));

    dog.style.left = x + "px";
    dog.style.top = y + "px";

});


// RELEASE DOG
dog.addEventListener("pointerup", () => {
    dragging = false;
    lastTouched = Date.now();

    position = (dog.offsetTop / dog.parentElement.clientHeight) * 100;
});

dog.addEventListener("pointercancel", () => {
    dragging = false;
    lastTouched = Date.now();
});