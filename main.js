
let app;
let player;
let playerAnim = {};
let playerIsMoving = false;
let playerIsIdling = false;
let playerPreState = 0;
let playerState = 0;
let playerDirection = 1;
let scale = 3;

let playerClass;

let isAssetLoaded = false;

let landY;
let gravity;

let enemy;
let cutManAnim = {};
let numberAnim = {};
let numberUI = [];
let goalUI = [];
let oneNumber = {};
let allUnits = [];
let score = 0;
let scoreGoal = 1000;

let stage1;

let deadEffectAnim = {};
let deadEffectArray = [];
let deadEffectIndex = 0;
let deadEffectIndexMax = 20;

let shootEffectAnim = {};
let shootEffectArray = [];
let shootEffectIndex = 0;
let shootEffectIndexMax = 20;

let hitEffectAnim = {};
let hitEffectArray = [];
let hitEffectIndex = 0;
let hitEffectIndexMax = 20;

let enemyScore = 127;
let enemyRespawnTime = 0;
let enemyRespawnTimeMax = 200;

let keys = {};
let keysDiv;

let bullets = [];
let bulletSpeed = 10;
let bigBullets = [];

let hpArray = [];
let hpBackground;

// 디버그용
let NOENEMY = true;

let titleScreen;
let gameScreen;
let endScreen;

// LOADING
let isGameSceneOn = false;
let isEndSceneOn = false;
let loadingText;
let loadingTextLabel;
let loadingScreen;

// OPENING
let startRect;
let selector;

// ENDING
let winText;
let loseText;
let isWin = false;
let isLost = false;

let digit = 4;
let winEvent;


window.onload = function () {
    app = new PIXI.Application(
        {
            width: 215 * (scale * 2),  // 6*215 = 1290
            height: 112 * (scale * 2), // 6*112 = 672
            backgroundColor: 0x000000
        }
    );

    document.querySelector("#gameDiv").appendChild(app.view);

    app.stage.interactive = true;
    document.querySelector("#gameDiv").addEventListener("pointerdown", FireBigBullet);

    // Container
    // let root = new PIXI.Container();
    // root.displayList = new PIXI.DisplayList();



    // preload asset
    app.loader.baseUrl = "images";
    app.loader.add("bullet", "Bullet.png")
        .add("bigBullet", "BigBullet.png")
        .add("bigBulletLeft", "BigBulletLeft.png")
        .add("bigBulletRight", "BigBulletRight.png")
        .add("player", "player.png")
        .add("CutMan", "CutMan.png")
        .add("playerRunRight", "PlayerRunRight.png")
        .add("playerRunLeft", "PlayerRunLeft.png")
        .add("playerIdleRight", "PlayerIdleRight.png")
        .add("playerIdleLeft", "PlayerIdleLeft.png")
        .add("playerGetHitRight", "PlayerGetHitRight.png")
        .add("playerGetHitLeft", "PlayerGetHitLeft.png")
        .add("jumpRight", "JumpRight.png")
        .add("jumpLeft", "JumpLeft.png")
        .add("idleShootRight", "IdleShootRight.png")
        .add("idleShootLeft", "IdleShootLeft.png")
        .add("runShootRight", "RunShootRight.png")
        .add("runShootLeft", "RunShootLeft.png")
        .add("jumpShootLeft", "JumpShootLeft.png")
        .add("jumpShootRight", "JumpShootRight.png")

        .add("cutManIdle", "CutManIdle.png")
        .add("cutManMoveRight", "CutManMoveRight.png")
        .add("cutManMoveLeft", "CutManMoveLeft.png")
        .add("cutManGetHitRight", "CutManGetHitRight.png")
        .add("cutManGetHitLeft", "CutManGetHitLeft.png")

        .add("deadEffect", "DeadEffect.png")
        .add("hitEffect", "HitEffect.png")
        .add("bulletStartEffectRight", "BigBulletStartRight.png")
        .add("bulletStartEffectLeft", "BigBulletStartLeft.png")

        .add("oneHP", "OneHP.png") // 10, 2
        .add("hpBackground", "HPBackground.png") // 10, 59
        .add("number", "Number.png") // 10, 59

        .add("mainScreen", "OpeningScene.png")
        .add("endScreen", "EndingScene.png")
        .add("selector", "Selector.png")

        .add("stage1", "Stage1.png"); // 215, 112

    // LOADER SETUP
    loadingText = new PIXI.Text("0 %");
    loadingText.x = app.view.width/2;
    loadingText.y = app.view.height/2;
    loadingText.anchor.set(0.5);
    loadingText.style = new PIXI.TextStyle({
        fill: 0x000000,
        fontSize: 40,
        fontFamily: "Arial",
        fontStyle: "bold",
        stroke: 0xFFFFFF,
        strokeThickness: 3
    });

    
    loadingTextLabel = new PIXI.Text("LOADING");
    loadingTextLabel.x = app.view.width/2;
    loadingTextLabel.y = app.view.height/2 - 100;
    loadingTextLabel.anchor.set(0.5);
    loadingTextLabel.style = new PIXI.TextStyle({
        fill: 0xff0000,
        fontSize: 40,
        fontFamily: "Arial",
        fontStyle: "bold",
        stroke: 0xFF0000,
        strokeThickness: 3
    });

    


    // 410, 111


    app.loader.onProgress.add(showProgress);
    app.loader.onComplete.add(doneLoading);
    app.loader.onError.add(reportError);

    app.loader.load();

    winEvent = window.event;

    // Create our screens  
    loadingScreen = new PIXI.Container();
    titleScreen = new PIXI.Container();
    gameScreen = new PIXI.Container();
    endScreen = new PIXI.Container();

    titleScreen.visible = false;
    gameScreen.visible = false;
    endScreen.visible = false;
    app.stage.addChild(loadingScreen);
    app.stage.addChild(titleScreen);
    app.stage.addChild(gameScreen);
    app.stage.addChild(endScreen);
    
    
    loadingScreen.addChild(loadingText);
    loadingScreen.addChild(loadingTextLabel);

    // keyboard event handlers
    window.addEventListener("keydown", keysDown);
    window.addEventListener("keyup", keysUp);
    keysDiv = document.querySelector("#keys");

    landY = app.view.height/1.3;
    gravity = 20;

    // Update
    app.ticker.add(gameLoop);

 
}

function SwitchContainer()
{

}

function DeadEffectIndex()
{
    let result = deadEffectIndex++;

    if(deadEffectIndexMax <= deadEffectIndex )
    {
        deadEffectIndex = 0;

    }

    return result;
}

function ShootEffectIndex()
{
    let result = shootEffectIndex++;

    if(shootEffectIndexMax <= shootEffectIndex )
    {
        shootEffectIndex = 0;

    }

    return result;
}

function HitEffectIndex()
{
    let result = hitEffectIndex++;

    if(hitEffectIndexMax <= hitEffectIndex )
    {
        hitEffectIndex = 0;

    }

    return result;
}

function fireBullet(e) {


    let bullet = createBullet();
    bullets.push(bullet);
}

function FireBigBullet() {


    let bullet = createBigBullet();
    bigBullets.push(bullet);

    // 쏘는 애니메이션
    playerClass.Shoot();

    let effect = shootEffectArray[ShootEffectIndex()];

    effect.SetDirection(playerClass.GetDirection());

    effect.Init(playerClass.animatedSprite.x + playerClass.GetDirection() * 95, playerClass.animatedSprite.y + 5);
}

function createBullet() {
    let bullet = new Bullet(new PIXI.Sprite.from(app.loader.resources.bullet.texture), scale);
    bullet.Init(playerClass.GetAnimation().x, playerClass.GetAnimation().y
    , bulletSpeed, playerClass.GetDirection());

    return bullet;
}

function createBigBullet() {
    let bullet = new Bullet(new PIXI.Sprite.from(app.loader.resources.bigBullet.texture), scale);
    bullet.SetDirectionAnim(new PIXI.Sprite.from(app.loader.resources.bigBulletLeft.texture), new PIXI.Sprite.from(app.loader.resources.bigBulletRight.texture));
    bullet.SetDirection(playerClass.GetDirection());
    bullet.Init(playerClass.GetAnimation().x + playerClass.GetDirection() * 70, playerClass.GetAnimation().y + 10
    , bulletSpeed, playerClass.GetDirection());

    return bullet;
}

// function createDeadEffect() {
//     for(let i = 0; i < 20; ++i)
//     {
//     let effect = new  PIXI.AnimatedSprite(app.loader.resources.deadEffectAnim);
//         deadEffectArray.push(effect);
//     }
 
// }

function keysDown(e) {
    // console.log(e.keyCode);
    keys[e.keyCode] = true;
}

function keysUp(e) {
    keys[e.keyCode] = false;
}





function showProgress(e) {

    for(let i = 0; i < 90000000; ++i)
    {
        let a = 0;
    }

    let string = Math.floor(e.progress) + " %";
    console.log(string);
    loadingText.text = string;
}

function reportError(e) {
    console.error("Error: " + e.message);
}

function doneLoading(e) {
    console.log("DONE LOADING.");
    // Setup title Screen

    loadingScreen.visible = false;
    titleScreen.visible = true;

    let screen = new PIXI.Sprite.from(app.loader.resources.mainScreen.texture);
    screen.height = app.view.height;
    screen.width = app.view.width;
    screen.anchor.set(0.5);
    screen.x = app.view.width / 2;
    screen.y = app.view.height / 2;
    titleScreen.addChild(screen);

    screen = new PIXI.Sprite.from(app.loader.resources.endScreen.texture);
    screen.height = app.view.height;
    screen.width = app.view.width;
    screen.anchor.set(0.5);
    screen.x = app.view.width / 2;
    screen.y = app.view.height / 2;
    endScreen.addChild(screen);

    startRect = new PIXI.Graphics();
    startRect.beginFill(0xffffff);
    startRect.drawRect(490- 410/2,412-111/2,410,111);
    startRect.endFill();
    startRect.blendMode = PIXI.BLEND_MODES.NONE;
    startRect.interactive = true;
    startRect.buttonMode = true;
    startRect.on("pointerover", DoPointerOver);
    startRect.on("pointerout", DoPointerOut);
    startRect.on("pointerup", DoPointerUp);
    startRect.alpha = 0;
    titleScreen.addChild(startRect);

    selector = new PIXI.Sprite.from(app.loader.resources.selector.texture);
    selector.height = 111;
    selector.width = 410;
    selector.anchor.set(0.5);
    selector.x = 490 ;
    selector.y = 412 ;
    selector.visible = false;
    titleScreen.addChild(selector);

    LoadPlayer();

    if (true == NOENEMY) {
        LoadEnemy();
    }

    LoadUI();

    isAssetLoaded = true;

    winText = new PIXI.Text("YOU WIN!");
    winText.x = app.view.width/2;
    winText.y = app.view.height/2 - 100;
    winText.anchor.set(0.5);
    winText.style = new PIXI.TextStyle({
        fill: 0x00ff00,
        fontSize: 80,
        fontFamily: "Arial",
        fontStyle: "bold",
        stroke: 0xFF0000,
        strokeThickness: 3
    });

    loseText = new PIXI.Text("YOU LOSE...");
    loseText.x = app.view.width/2;
    loseText.y = app.view.height/2 - 100;
    loseText.anchor.set(0.5);
    loseText.style = new PIXI.TextStyle({
        fill: 0xff0000,
        fontSize: 80,
        fontFamily: "Arial",
        fontStyle: "bold",
        stroke: 0xFF0000,
        strokeThickness: 3
    });



    loseText.visible = false;
    winText.visible = false;

    endScreen.addChild(loseText);
    endScreen.addChild(winText);
}

function DoPointerOver()
{
    selector.visible = true;
    console.log("mouse on");
}

function DoPointerOut()
{
    selector.visible = false;
    console.log("mouse out");
}


function DoPointerUp()
{
    titleScreen.visible = false;
    gameScreen.visible = true;
    isGameSceneOn = true;
}
