function getPos () {
    return {x: position.x, y: position.y}
}
function setFood () {
    foodPos = { x: randint(0, 4), y: randint(0, 4)};
}
let bright = 0
let dir = 0
let frame : number = -Infinity;
let position = {x: 0, y: 2};
let foodPos = {x : -1, y : -1};
setFood();

let trail = [getPos()];
trail.push(getPos());

function onStart() {
    basic.showString("A");
    input.onButtonPressed(Button.A, () => {
        frame = Infinity;
        basic.clearScreen();
    });
}
onStart();

basic.forever(function () {
    frame += 1
    if (frame < 20) {
        return;
    }
    frame = 0

    input.onButtonPressed(Button.A, () => { dir += 3; });
    input.onButtonPressed(Button.B, () => { dir ++; });

    dir = dir % 4;

    position.x += (dir == 0) ? 1 : ((dir == 2) ? -1 : 0);
    position.y += (dir == 1) ? 1 : ((dir == 3) ? -1 : 0);
    if (position.x < 0) position.x = 4;
    if (position.x > 4) position.x = 0;
    if (position.y < 0) position.y = 4;
    if (position.y > 4) position.y = 0;
    
    trail.shift();
    trail.push(getPos());
    basic.clearScreen();
    for (let i = 0; i <= trail.length - 1; i++) {
        bright = Math.map(i, -1, trail.length, 0, 205);
        led.plotBrightness(trail[i].x, trail[i].y, bright);
    }

    led.plot(foodPos.x, foodPos.y);
    
    if (position.x == foodPos.x) {
        if (position.y == foodPos.y) {
            trail.push(getPos());
            setFood();
        }
    }

    if (trail.length > 10) {
        endScreen();
        frame = -Infinity;
    }
});

function endScreen() {
    basic.showString("A");

    input.onButtonPressed(Button.A, () => {
        frame = Infinity;
        basic.clearScreen();
    });
}