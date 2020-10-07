// @ts-check


function gameLoop(delta) {
    keysDiv.innerHTML = JSON.stringify(keys);


 // a
 if (keys["66"]) {
    isEndSceneOn = true;
    }

    if (false == isAssetLoaded) {
        return;
    }

    if(false == isGameSceneOn)
    {        
        OpeningSceneUpdate(delta);
        return;
    }

    if(false == isEndSceneOn)
    {
    }
    else
    {

        EndingSceneUpdate(delta);

        return;
    }

    if(scoreGoal < score)
    {
        isWin = true;
        isEndSceneOn = true;
    }

    playerClass.JumpUpdate(delta);
    // enemy.GetHit(delta);
    if(true == NOENEMY)
    {
        UpdateEnemy(delta);
    }
    UpdateBullets(delta);

    playerClass.GetHitUpdate(delta);

    // if (true == playerClass.invincible) {
    //     console.log("INVINCIBLE");
    //     return;
    // }

    let direction = 0;

    // a
    if (keys["65"]) {
        direction = -1;

        if(false == playerClass.isJumping)
        {
            playerClass.state = 1;
        }
    }
    // d
    else if (keys["68"]) {
        direction = 1;

        if(false == playerClass.isJumping)
        {
            playerClass.state = 1;
        }
    }
    else {
        if (false == playerClass.isJumping && false == playerClass.isShooting) {
            playerClass.state = 0;
            playerClass.isShooting = false;
            direction = 0;
        }
    }

    // w
    if (keys["87"]) {
        if (false == playerClass.isJumping) {
            playerClass.isJumping = true;
            playerClass.state = 2;
        }
    }

    // m
    if (keys["77"]) {
        FireBigBullet();
    }

    playerClass.Move(direction);
    UpdateAnimation();
    UpdateEffect(delta);
    UpdateNumber(delta);
}



function UpdateAnimation() {
    if (false == isAssetLoaded) {
        return;
    }

// 0 12 34 5 6 7
// 7 = 미사일
    UpdatePlayerAnimation(); 
  
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////

    for (let i = 0; i < allUnits.length; ++i) {
        // // 달려야 한다
        // if (2 == allUnits[i].GetState()) {
        //     // 이전에 서있었다. 그러면 달린다.
        //     if (2 != allUnits[i].GetPreState()) {
        //         allUnits[i].SetAnimation(cutManAnim.MoveRight);
        //     }

        // }
        // // 달려야 한다
        // else if (3 == allUnits[i].GetState()) {
        //     // 이전에 서있었다. 그러면 달린다.
        //     if (3 != allUnits[i].GetPreState()) {
        //         allUnits[i].SetAnimation(cutManAnim.MoveLeft);
        //     }
        // } else if (4 == allUnits[i].GetState()) {
        //     // 처음 맞음
        //     if (4 != allUnits[i].GetPreState()) {
        //         allUnits[i].SetAnimation(cutManAnim.GetHitRight);
        //         allUnits[i].GetAnimation().loop = false;
        //     }
        //     else {

        //         if (false == allUnits[i].GetAnimation().playing) {
        //             allUnits[i].GetAnimation().loop = true;
        //             allUnits[i].SetAnimation(cutManAnim.Idle);
        //             allUnits[i].SetState(0);
        //             allUnits[i].SetDirection(1);
        //             allUnits[i].GetAnimation().play();
        //         }
        //     }
        // }
        // else if (5 == allUnits[i].GetState()) {
        //     // 처음 맞음
        //     if (5 != allUnits[i].GetPreState()) {
        //         allUnits[i].SetAnimation(cutManAnim.GetHitLeft);
        //         allUnits[i].GetAnimation().loop = false;
        //     }
        //     else {

        //         if (false == allUnits[i].GetAnimation().playing) {
        //             allUnits[i].GetAnimation().loop = true;
        //             allUnits[i].SetAnimation(cutManAnim.Idle);
        //             allUnits[i].SetState(0);
        //             allUnits[i].SetDirection(-1);
        //         }
        //     }

        // }
        allUnits[i].UpdateAnimation();
        allUnits[i].SetPreState(allUnits[i].GetState());
        allUnits[i].preDirection = allUnits[i].autoDirection;
    }


    playerClass.SetPreState(playerClass.GetState());
    playerClass.preDirection = playerClass.direction;



}

function UpdateEffect(delta) {
    let length = 20;
    for (let i = 0; i < length; ++i) {
        deadEffectArray[i].Update(delta);
        shootEffectArray[i].Update(delta);
        hitEffectArray[i].Update(delta);
    }
}

function CheckAnimation(state) {

}

function UpdateBullets(delta) {
    for (let i = 0; i < bullets.length; ++i) {
        bullets[i].Update(delta);

        if (app.view.width < bullets[i].GetSprite().x) {
            gameScreen.removeChild(bullets[i]);
            bullets.splice(i, 1);
            --i;
        }
    }

    for (let i = 0; i < bigBullets.length; ++i) {
        bigBullets[i].Update(delta);

        if (app.view.width < bigBullets[i].GetSprite().x) {
            gameScreen.removeChild(bigBullets[i]);
            bigBullets.splice(i, 1);
            --i;
        }
    }
}

function UpdateEnemy(delta) {
    // collision with enemies
    enemyRespawnTime += delta;

    if (enemyRespawnTimeMax < enemyRespawnTime) {
        enemyRespawnTime = 0;
        LoadEnemy();
    }

    for (let i = 0; i < allUnits.length; ++i) {


        if (true == Collision(delta, playerClass.GetAnimation(), allUnits[i].GetAnimation())) {
            // 무적상태
            if (false == playerClass.invincible) {
                playerClass.isGetHit = true;
                hpArray[playerClass.hp - 1].visible = false;
            }
        }

        for (let j = 0; j < bigBullets.length; ++j) {
            if (true == CollisionBullet(delta, allUnits[i].GetAnimation(), bigBullets[j].GetSprite())) {
                if (false == allUnits[i].invincible) {
                    allUnits[i].isGetHit = true;

                    console.log("CutMan GetHit.");

                    // 총알 없어짐

                    bigBullets[j].GetSprite().visible = false;
                    gameScreen.removeChild(bigBullets[j]);
                    bigBullets.splice(j, 1);
                    --j;
                    continue;
                }
            }
        }

        allUnits[i].GetHitUpdate(delta);
        allUnits[i].MoveAuto();
        if (true == allUnits[i].dead) {
            allUnits.splice(i, 1);
            --i
            console.log("CutMan Destroyed.");
            score += enemyScore;
            continue;
        }

    }

}

function UpdateNumber(delta) {
    let string = score;

    for (let i = 0; i < digit; ++i) {
        if (string.toString().length < i) {
            numberUI[digit - i].textures = numberAnim.zero;

            continue;
        }
        else {
            let index = string.toString()[string.toString().length - i - 1];
            switch (index) {
                case '0':
                    numberUI[digit - i - 1].textures = numberAnim.zero;
                    break;
                case '1':
                    numberUI[digit - i - 1].textures = numberAnim.one;
                    break;
                case '2':
                    numberUI[digit - i - 1].textures = numberAnim.two;
                    break;
                case '3':
                    numberUI[digit - i - 1].textures = numberAnim.three;
                    break;
                case '4':
                    numberUI[digit - i - 1].textures = numberAnim.four;
                    break;
                case '5':
                    numberUI[digit - i - 1].textures = numberAnim.five;
                    break;
                case '6':
                    numberUI[digit - i - 1].textures = numberAnim.six;
                    break;
                case '7':
                    numberUI[digit - i - 1].textures = numberAnim.seven;
                    break;
                case '8':
                    numberUI[digit - i - 1].textures = numberAnim.eight;
                    break;
                case '9':
                    numberUI[digit - i - 1].textures = numberAnim.nine;
                    break;
            }
        }
    }

    string = scoreGoal;

    for (let i = 0; i < digit; ++i) {
        if (string.toString().length < i) {
            numberUI[digit - i].textures = numberAnim.zero;

            continue;
        }
        else {
            let index = string.toString()[string.toString().length - i - 1];
            switch (index) {
                case '0':
                    goalUI[digit - i - 1].textures = numberAnim.zero;
                    break;
                case '1':
                    goalUI[digit - i - 1].textures = numberAnim.one;
                    break;
                case '2':
                    goalUI[digit - i - 1].textures = numberAnim.two;
                    break;
                case '3':
                    goalUI[digit - i - 1].textures = numberAnim.three;
                    break;
                case '4':
                    goalUI[digit - i - 1].textures = numberAnim.four;
                    break;
                case '5':
                    goalUI[digit - i - 1].textures = numberAnim.five;
                    break;
                case '6':
                    goalUI[digit - i - 1].textures = numberAnim.six;
                    break;
                case '7':
                    goalUI[digit - i - 1].textures = numberAnim.seven;
                    break;
                case '8':
                    goalUI[digit - i - 1].textures = numberAnim.eight;
                    break;
                case '9':
                    goalUI[digit - i - 1].textures = numberAnim.nine;
                    break;
            }
        }
    }
}

function UpdatePlayerAnimation()
{
   playerClass.UpdateAnimation();
}

function OpeningSceneUpdate(delta)
{

     
    
}

function EndingSceneUpdate(delta)
{
    gameScreen.alpha -= 1 * delta * 0.01;

    if(0 >= gameScreen.alpha)
    {
        gameScreen.alpha = 0;
        gameScreen.visible = false;
        endScreen.visible = true;
        
        if(true == isWin)
        {
            winText.visible = true;
        }
        else if(true == isLost)
        {
            loseText.visible = true;
        }
    }  
}