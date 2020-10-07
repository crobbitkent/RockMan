

function CollisionMouse(box)
{
let a = box.getBounds();
let eventx = winEvent.x;
    console.log(eventx);

    return a.x + a.width > winEvent.x
    && a.x < winEvent.x + 1
    && a.y + a.height > winEvent.y
    && a.y < winEvent.y + 1;
}

function Collision(delta, a, b) {
    let playerBox = a.getBounds();
    let bBox = b.getBounds();  

    return playerBox.x + playerBox.width > bBox.x
        && playerBox.x < bBox.x + bBox.width
        && playerBox.y + playerBox.height > bBox.y
        && playerBox.y < bBox.y + bBox.height;
}

function Collision(delta, a, b) {
    let playerBox = a.getBounds();
    let bBox = b.getBounds();

    return playerBox.x + playerBox.width > bBox.x
        && playerBox.x < bBox.x + bBox.width
        && playerBox.y + playerBox.height > bBox.y
        && playerBox.y < bBox.y + bBox.height;
}

function CollisionBullet(delta, a, b) {
    let playerBox = a.getBounds();
    let bBox = b.getBounds();

    return playerBox.x + playerBox.width > bBox.x
        && playerBox.x < bBox.x + bBox.width
        && playerBox.y + playerBox.height > bBox.y
        && playerBox.y < bBox.y + bBox.height;
}
