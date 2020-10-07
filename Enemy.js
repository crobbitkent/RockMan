
class Enemy {
    constructor(name, animatedSprite) {
        this.animatedSprite = animatedSprite;
        this.name = name;

        this.animatedSprite.animationSpeed = 0.1;
        this.animatedSprite.loop = true;

        gameScreen.addChild(this.animatedSprite);

        this.animatedSprite.play();
        this.direction = 1;
        this.preDirection = 1;
        this.state = 1;
        this.preState = 0;

        this.hp = 20;
        this.invincible = false;
        this.invincibleMax = 30.0;
        this.invincibleTime = 0.0;


        this.jumpTime = 0;
        this.jumpMax = 1;
        this.jumpSpeed = 1;
        this.velocityOriginal = 17;
        this.velocity = this.velocityOriginal;

        this.dead = false;

        this.isJumping = false;
        this.isShooting = false;
        this.isMoving = false;
        this.isGetHit = false;

        this.autoDirection = -1;
    }

    MoveAuto() {
        if (0 + 150 > this.animatedSprite.x) {
            this.autoDirection = 1;
            console.log("moveauto right");
        }
        else if (app.view.width - 150 < this.animatedSprite.x) {
            this.autoDirection = -1;
            console.log("moveauto left");
        }

        if (false == this.isGetHit) {
            this.Move(this.autoDirection);
        }

        
    }

    GetAnimation() { return this.animatedSprite; }

    GetHP() { return this.hp; }
    SetHP(hp) { this.hp = hp; }

    GetPreState() { return this.preState; }
    SetPreState(preState) { this.preState = preState; }

    GetState() { return this.state; }
    SetState(state) {

        this.state = state;

    }

    SetTransform(x, y, height, width, speed) {
        this.animatedSprite.x = x;
        this.animatedSprite.y = y;
        this.animatedSprite.width = width;
        this.animatedSprite.height = height;
        this.animatedSprite.anchor.set(0.5);
        this.speed = speed;
    }

    GetHitUpdate(delta) {

        if (true == this.isGetHit) {
            this.invincibleTime += delta;

            if (false == this.invincible) {
                this.SetState(3);
                this.hp -= 1;
                this.invincible = true;
                hitEffectArray[HitEffectIndex()].Init(this.animatedSprite.x, this.animatedSprite.y - 10);

                if (0 >= this.hp) {
                    this.dead = true;
                    gameScreen.removeChild(this.animatedSprite);
                    this.animatedSprite.visible = false;
                    deadEffectArray[DeadEffectIndex()].Init(this.animatedSprite.x, this.animatedSprite.y);
                }
            }

            if (this.invincibleMax < this.invincibleTime) {
                this.invincible = false;
                this.invincibleTime = 0;
                this.isGetHit = false;
                this.animatedSprite.loop = true;
            }
        }
    }

    Move(direction) {
        // 맞으면 이동 불가
        if (true == this.isGetHit) {
            this.state = 3;
            return;
        }

        if (0 == direction) {
            this.state = 0;

            // 점프 중이라면
            if (true == this.isJumping) {
                this.state = 2;
            }
            return;
        }

        this.autoDirection = direction;
        this.animatedSprite.x += this.autoDirection * this.speed;
        this.state = 1;


        // 점프 중이라면
        if (true == this.isJumping) {
            this.state = 2;
        }
    }

    SetAnimation(anim) {
        this.animatedSprite.textures = anim;
        this.animatedSprite.play();
    }


  UpdateAnimation() {
        switch (this.state) {
            // 서있기
            case 0:
                this.Idle();
                break;
            // 뛰기
            case 1: this.Run(); break;
            // 점프
            case 2: this.Jump(); break;
            // 맞기
            case 3: this.GetHit(); break;

            case 4: this.IdleShoot(); break;
            case 5: this.RunShoot(); break;
            case 6: this.JumpShoot(); break;
            case 7: break;
        }


    }

    Idle() {
        // 첫 IDLE
        if (0 != this.preState) {
            if (-1 == this.autoDirection) {
                this.SetAnimation(cutManAnim.IdleLeft);
            }
            else {
                this.SetAnimation(cutManAnim.IdleRight);
            }
        }
    }

    Run() {
        // 첫 IDLE
        if (1 != this.preState || this.autoDirection != this.preDirection) {
            if (-1 == this.autoDirection) {
                this.SetAnimation(cutManAnim.MoveLeft);
                console.log("cutman moveleft");
            }
            else {
                this.SetAnimation(cutManAnim.MoveRight);
                console.log("cutman moveright");
            }
        }
    }
    
    
    GetHit() {
        // 첫 IDLE
        if (3 != this.preState) {
            if (-1 == this.autoDirection) {
                this.SetAnimation(cutManAnim.GetHitLeft);
                console.log("GetHit Left");
            }
            else {
                this.SetAnimation(cutManAnim.GetHitRight);
                console.log("GetHit Right");
            }

            this.animatedSprite.loop = false;
        }
        else {
            // 애니메이션 완료
            if (false == this.animatedSprite.playing) {
                this.animatedSprite.loop = true;
                this.isShooting = false;
            }
        }
    }
}



