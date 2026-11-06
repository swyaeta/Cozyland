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


// to move the dog while dragging 
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


// to release the dog after dragging
dog.addEventListener("pointerup", () => {
    dragging = false;
    lastTouched = Date.now();

    position = (dog.offsetTop / dog.parentElement.clientHeight) * 100;
});

dog.addEventListener("pointercancel", () => {
    dragging = false;
    lastTouched = Date.now();
});


const items = document.querySelectorAll(".toy1, .toy2, .food");

items.forEach(item => {

    let dragging = false;
    let offsetX = 0;
    let offsetY = 0;

    item.addEventListener("pointerdown", (e) => {
        e.preventDefault();

        dragging = true;

        const rect = item.getBoundingClientRect();

        offsetX = e.clientX - rect.left;
        offsetY = e.clientY - rect.top;

        item.style.zIndex = "100";
        item.setPointerCapture(e.pointerId);
    });

    item.addEventListener("pointermove", (e) => {
        if (!dragging) return;

        const parent = item.parentElement;
        const parentRect = parent.getBoundingClientRect();

        let x = e.clientX - parentRect.left - offsetX;
        let y = e.clientY - parentRect.top - offsetY;

        item.style.position = "absolute";
        item.style.left = x + "px";
        item.style.top = y + "px";
    });

    item.addEventListener("pointerup", () => {
        dragging = false;
    });

});


const girl = document.getElementById("girl");
const room = document.querySelector(".room");

let girlDragging = false;
let grabX = 0;
let grabY = 0;

girl.addEventListener("pointerdown", (e) => {
    girlDragging = true;
    girl.style.cursor = "grabbing";

    const rect = girl.getBoundingClientRect();

    grabX = e.clientX - rect.left;
    grabY = e.clientY - rect.top;

    girl.setPointerCapture(e.pointerId);
});

girl.addEventListener("pointermove", (e) => {

    if (!girlDragging) return;

    const rect = room.getBoundingClientRect();

    let x = e.clientX - rect.left - grabX;
    let y = e.clientY - rect.top - grabY;

    x = Math.max(0, Math.min(x, room.clientWidth - girl.offsetWidth));
    y = Math.max(0, Math.min(y, room.clientHeight - girl.offsetHeight));

    if (e.movementX < 0) {
        girl.style.transform = "scaleX(-1)";
    }

    if (e.movementX > 0) {
        girl.style.transform = "scaleX(1)";
    }

    girl.style.left = x + "px";
    girl.style.top = y + "px";
});

girl.addEventListener("pointerup", () => {
    girlDragging = false;
    girl.style.cursor = "grab";
});

girl.addEventListener("pointercancel", () => {
    girlDragging = false;
    girl.style.cursor = "grab";
});