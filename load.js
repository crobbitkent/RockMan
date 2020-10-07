// 0 idle right
// 1 idle left
// 2 move
// 3
// 4 gethit right
// 5

function CreatePlayerAnimation() {
    let sheetRunRight = new PIXI.BaseTexture.from(app.loader.resources["playerRunRight"].url);
    let sheetRunLeft = new PIXI.BaseTexture.from(app.loader.resources["playerRunLeft"].url);
    let sheetIdleRight = new PIXI.BaseTexture.from(app.loader.resources["playerIdleRight"].url);
    let sheetIdleLeft = new PIXI.BaseTexture.from(app.loader.resources["playerIdleLeft"].url);
    let GetHitRight = new PIXI.BaseTexture.from(app.loader.resources["playerGetHitRight"].url);
    let GetHitLeft = new PIXI.BaseTexture.from(app.loader.resources["playerGetHitLeft"].url);
    let jumpRight = new PIXI.BaseTexture.from(app.loader.resources["jumpRight"].url);
    let jumpLeft = new PIXI.BaseTexture.from(app.loader.resources["jumpLeft"].url);
    let idleShootRight = new PIXI.BaseTexture.from(app.loader.resources["idleShootRight"].url);
    let idleShootLeft = new PIXI.BaseTexture.from(app.loader.resources["idleShootLeft"].url);
    let runShootRight = new PIXI.BaseTexture.from(app.loader.resources["runShootRight"].url);
    let runShootLeft = new PIXI.BaseTexture.from(app.loader.resources["runShootLeft"].url);
    let jumpShootRight = new PIXI.BaseTexture.from(app.loader.resources["jumpShootRight"].url);
    let jumpShootLeft = new PIXI.BaseTexture.from(app.loader.resources["jumpShootLeft"].url);
    
    let sheetCutmanIdle = new PIXI.BaseTexture.from(app.loader.resources["cutManIdle"].url);
    let sheetCutmanMoveRight = new PIXI.BaseTexture.from(app.loader.resources["cutManMoveRight"].url);
    let sheetCutmanMoveLeft = new PIXI.BaseTexture.from(app.loader.resources["cutManMoveLeft"].url);
    let cutManGetHitRight = new PIXI.BaseTexture.from(app.loader.resources["cutManGetHitRight"].url);
    let cutManGetHitLeft = new PIXI.BaseTexture.from(app.loader.resources["cutManGetHitLeft"].url);

    let deSheet =  new PIXI.BaseTexture.from(app.loader.resources["deadEffect"].url);
    let heSheet =  new PIXI.BaseTexture.from(app.loader.resources["hitEffect"].url);
    let seSheet =  new PIXI.BaseTexture.from(app.loader.resources["bulletStartEffectRight"].url);
    let seSheetLeft =  new PIXI.BaseTexture.from(app.loader.resources["bulletStartEffectLeft"].url);

    let numberSheet = new PIXI.BaseTexture.from(app.loader.resources["number"].url);

    let w = 27;
    let h = 32;

    playerAnim["RunRight"] = [
        new PIXI.Texture(sheetRunRight, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheetRunRight, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheetRunRight, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheetRunRight, new PIXI.Rectangle(3 * w, 0, w, h))
    ];

    playerAnim["RunLeft"] = [
        new PIXI.Texture(sheetRunLeft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheetRunLeft, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheetRunLeft, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheetRunLeft, new PIXI.Rectangle(3 * w, 0, w, h))
    ];

    playerAnim["IdleRight"] = [
        new PIXI.Texture(sheetIdleRight, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheetIdleRight, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheetIdleRight, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheetIdleRight, new PIXI.Rectangle(3 * w, 0, w, h)),
    ];

    playerAnim["IdleLeft"] = [
        new PIXI.Texture(sheetIdleLeft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheetIdleLeft, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheetIdleLeft, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheetIdleLeft, new PIXI.Rectangle(3 * w, 0, w, h)),
    ];

    playerAnim["GetHitLeft"] = [
        new PIXI.Texture(GetHitLeft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(GetHitLeft, new PIXI.Rectangle(1 * w, 0, w, h)),
    ];

    playerAnim["GetHitRight"] = [
        new PIXI.Texture(GetHitRight, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(GetHitRight, new PIXI.Rectangle(1 * w, 0, w, h)),
    ];

    playerAnim["JumpLeft"] = [
        new PIXI.Texture(jumpLeft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(jumpLeft, new PIXI.Rectangle(0 * w, 0, w, h)),
    ];

    playerAnim["JumpRight"] = [
        new PIXI.Texture(jumpRight, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(jumpRight, new PIXI.Rectangle(0 * w, 0, w, h)),
    ];

    w=35;h=35;
    playerAnim["IdleShootLeft"] = [
        new PIXI.Texture(idleShootLeft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(idleShootLeft, new PIXI.Rectangle(1 * w, 0, w, h)),
    ];

    playerAnim["IdleShootRight"] = [
        new PIXI.Texture(idleShootRight, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(idleShootRight, new PIXI.Rectangle(1 * w, 0, w, h)),
    ];

    playerAnim["RunShootLeft"] = [
        new PIXI.Texture(runShootLeft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(runShootLeft, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(runShootLeft, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(runShootLeft, new PIXI.Rectangle(3 * w, 0, w, h)),
    ];

    playerAnim["RunShootRight"] = [
        new PIXI.Texture(runShootRight, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(runShootRight, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(runShootRight, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(runShootRight, new PIXI.Rectangle(3 * w, 0, w, h)),
    ];

    playerAnim["JumpShootLeft"] = [
        new PIXI.Texture(jumpShootLeft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(jumpShootLeft, new PIXI.Rectangle(0 * w, 0, w, h)),
       
    ];

    playerAnim["JumpShootRight"] = [
        new PIXI.Texture(jumpShootRight, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(jumpShootRight, new PIXI.Rectangle(0 * w, 0, w, h)),

    ];


    w=27;h = 37; 

    cutManAnim["Idle"] = [
        new PIXI.Texture(sheetCutmanIdle, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanIdle, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanIdle, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanIdle, new PIXI.Rectangle(3 * w, 0, w, h)),
    ];

    cutManAnim["MoveRight"] = [
        new PIXI.Texture(sheetCutmanMoveRight, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanMoveRight, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanMoveRight, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanMoveRight, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanMoveRight, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanMoveRight, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanMoveRight, new PIXI.Rectangle(6 * w, 0, w, h)),
    ];

    cutManAnim["MoveLeft"] = [
        new PIXI.Texture(sheetCutmanMoveLeft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanMoveLeft, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanMoveLeft, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanMoveLeft, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanMoveLeft, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanMoveLeft, new PIXI.Rectangle(5 * w, 0, w, h)),
        new PIXI.Texture(sheetCutmanMoveLeft, new PIXI.Rectangle(6 * w, 0, w, h)),
    ];

    cutManAnim["GetHitLeft"] = [
        new PIXI.Texture(cutManGetHitLeft, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(cutManGetHitLeft, new PIXI.Rectangle(1 * w, 0, w, h)),
    ];

    cutManAnim["GetHitRight"] = [
        new PIXI.Texture(cutManGetHitRight, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(cutManGetHitRight, new PIXI.Rectangle(1 * w, 0, w, h)),
    ];

    w = 60;h=60;
    deadEffectAnim["deadEffect"] = [
        new PIXI.Texture(deSheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(deSheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(deSheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(deSheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(deSheet, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(deSheet, new PIXI.Rectangle(5 * w, 0, w, h)),
    ];

    w = 35;h=35;
    hitEffectAnim["hitEffect"] = [
        new PIXI.Texture(heSheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(heSheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(heSheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(heSheet, new PIXI.Rectangle(3 * w, 0, w, h)),

    ];

    w=33;h=30;
    shootEffectAnim["shootRight"] = [
        new PIXI.Texture(seSheet, new PIXI.Rectangle(0 * w, 0, w, h)),
        new PIXI.Texture(seSheet, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(seSheet, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(seSheet, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(seSheet, new PIXI.Rectangle(4 * w, 0, w, h))
    ];

    shootEffectAnim["shootLeft"] = [
        new PIXI.Texture(seSheetLeft, new PIXI.Rectangle(4 * w, 0, w, h)),
        new PIXI.Texture(seSheetLeft, new PIXI.Rectangle(3 * w, 0, w, h)),
        new PIXI.Texture(seSheetLeft, new PIXI.Rectangle(2 * w, 0, w, h)),
        new PIXI.Texture(seSheetLeft, new PIXI.Rectangle(1 * w, 0, w, h)),
        new PIXI.Texture(seSheetLeft, new PIXI.Rectangle(0 * w, 0, w, h))
    ];

    w=8;h=8;
    numberAnim["zero"] = [
        new PIXI.Texture(numberSheet, new PIXI.Rectangle(0 * w, 0, w, h)),      
    ];
    numberAnim["one"] = [
        new PIXI.Texture(numberSheet, new PIXI.Rectangle(1 * w, 0, w, h)),      
    ];
    numberAnim["two"] = [
        new PIXI.Texture(numberSheet, new PIXI.Rectangle(2 * w, 0, w, h)),      
    ];
    numberAnim["three"] = [
        new PIXI.Texture(numberSheet, new PIXI.Rectangle(3 * w, 0, w, h)),      
    ];
    numberAnim["four"] = [
        new PIXI.Texture(numberSheet, new PIXI.Rectangle(4 * w, 0, w, h)),      
    ];
    numberAnim["five"] = [
        new PIXI.Texture(numberSheet, new PIXI.Rectangle(5 * w, 0, w, h)),      
    ];
    numberAnim["six"] = [
        new PIXI.Texture(numberSheet, new PIXI.Rectangle(6 * w, 0, w, h)),      
    ];
    numberAnim["seven"] = [
        new PIXI.Texture(numberSheet, new PIXI.Rectangle(7 * w, 0, w, h)),      
    ];
    numberAnim["eight"] = [
        new PIXI.Texture(numberSheet, new PIXI.Rectangle(8 * w, 0, w, h)),      
    ];
    numberAnim["nine"] = [
        new PIXI.Texture(numberSheet, new PIXI.Rectangle(9 * w, 0, w, h)),      
    ];
}

function LoadPlayer() {

    stage1 = new PIXI.Sprite.from(app.loader.resources.stage1.texture);
    stage1.height = app.view.height;
    stage1.width = app.view.width;
    stage1.x = 0;
    stage1.y = 0;
    gameScreen.addChild(stage1);

    CreatePlayerAnimation();
    // player = new PIXI.AnimatedSprite(playerAnim.IdleRight);
    // player.anchor.set(0.5);
    // player.x = 100;
    // player.y = app.view.height / 1.3;
    // player.loop = true;
    // player.animationSpeed = 0.1;
    // player.height = 32 * scale;
    // player.width = 27 * scale;
    // gameScreen.addChild(player);
    // player.play();

    playerClass = new Character("player", new PIXI.AnimatedSprite(playerAnim.IdleRight));
    playerClass.SetTransform(200, app.view.height/1.3,32*scale,27*scale,5);

}

function LoadEnemy() {
    enemy = new Enemy("CutMan", new PIXI.AnimatedSprite(cutManAnim.Idle));
    enemy.SetTransform(app.view.width - 200, app.view.height/1.3,32*scale,27*scale,5);
    gameScreen.addChild(enemy.GetAnimation());
    enemy.hp = 2;
    allUnits.push(enemy);
}

function LoadUI()
{
    // background
    hpBackground = new PIXI.Sprite.from(app.loader.resources.hpBackground.texture);
    hpBackground.anchor.set(0.5);
    hpBackground.x = 100;
    hpBackground.y = 92;
    hpBackground.height = 42 * scale;
    hpBackground.width = 10 * scale;
    gameScreen.addChild(hpBackground);

    // HP
    for(let i = 0; i < 20; ++i)
    {
        let hpBar = new PIXI.Sprite.from(app.loader.resources.oneHP.texture);
        hpArray.push(hpBar);
        hpBar.anchor.set(0.5);
        hpBar.x = 100;
        hpBar.y = 150 - i * scale * 2;
        hpBar.height = 2 * scale;
        hpBar.width = 8 * scale;

        gameScreen.addChild(hpBar);
    }

    // NUMBER
    for(let i = 0; i < digit; ++i)
    {
    oneNumber = new PIXI.AnimatedSprite(numberAnim.zero);
    oneNumber.anchor.set(0.5);
    oneNumber.x = app.view.width * 0.5 + i * 8 * scale - 4 * 8 *scale;
    oneNumber.y = 50;
    oneNumber.height =  8 * scale;
    oneNumber.width =  8 * scale;
    gameScreen.addChild(oneNumber);
    numberUI.push(oneNumber);
    }

    // GOAL NUMBER 
    for(let i = 0; i < digit; ++i)
    {
    oneNumber = new PIXI.AnimatedSprite(numberAnim.zero);
    oneNumber.anchor.set(0.5);
    oneNumber.x = app.view.width * 0.5 + i * 8 * scale - 4 * 8 *scale + 400;
    oneNumber.y = 50;
    oneNumber.height =  8 * scale;
    oneNumber.width =  8 * scale;
    gameScreen.addChild(oneNumber);
    goalUI.push(oneNumber);
    }

    for(let i = 0; i < 20; ++i)
    {
        let effect = new Effect(new PIXI.AnimatedSprite(deadEffectAnim.deadEffect), scale, 0.3);
        deadEffectArray.push(effect);
    }

    for(let i = 0; i < 20; ++i)
    {
        let effect = new Effect(new PIXI.AnimatedSprite(shootEffectAnim.shootRight), scale, 0.5);
        effect.SetDirectionAnim(new PIXI.AnimatedSprite(shootEffectAnim.shootLeft), new PIXI.AnimatedSprite(shootEffectAnim.shootRight))

        shootEffectArray.push(effect);
    }

    for(let i = 0; i < 20; ++i)
    {
        let effect = new Effect(new PIXI.AnimatedSprite(hitEffectAnim.hitEffect), scale, 0.3);

        hitEffectArray.push(effect);
    }

}
