class Character {
    constructor(name, animatedSprite) {
        this.animatedSprite = animatedSprite;
        this.name = name;

        this.animatedSprite.animationSpeed = 0.1;
        this.animatedSprite.loop = true;

        gameScreen.addChild(this.animatedSprite);

        this.animatedSprite.play();
        this.direction = 1;
        this.preDirection = 1;
        this.state = 0;
        this.preState = 0;

        this.hp = 20;
        this.invincible = false;
        this.invincibleMax = 50.0;
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

    }

    GetAnimation() { return this.animatedSprite; }

    GetHP() { return this.hp; }
    SetHP(hp) { this.hp = hp; }

    GetPreState() { return this.preState; }
    SetPreState(preState) { this.preState = preState; }

    GetDirection() { return this.direction; }
    SetDirection(direction) { this.direction = direction; }

    GetState() { return this.state; }
    SetState(state) {

        this.state = state;

    }

    ResetState() {
        this.isShooting = false;
        this.isJumping = false;
    }

    Shoot() {
        this.isShooting = true;
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

                    isLose = true;
                    isEndSceneOn = true;
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


    JumpUpdate(delta) {
        if (true == this.isJumping) {
            this.velocity = this.velocity + delta * -0.98;
            this.animatedSprite.y = this.animatedSprite.y - delta * this.velocity;
            // this.state = 6;


            // 착지
            if (landY <= this.animatedSprite.y) {
                this.animatedSprite.y = landY;
                this.velocity = this.velocityOriginal;
                this.isJumping = false;
                this.state = 0;
            }
        }


        else {

        }
    }

    SetTransform(x, y, height, width, speed) {
        this.animatedSprite.x = x;
        this.animatedSprite.y = y;
        this.animatedSprite.width = width;
        this.animatedSprite.height = height;
        this.animatedSprite.anchor.set(0.5);
        this.speed = speed;
    }

    SetAnimation(anim) {
        this.animatedSprite.textures = anim;
        this.animatedSprite.play();
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

        this.direction = direction;
        this.animatedSprite.x += this.direction * this.speed;



        // 점프 중이라면
        if (true == this.isJumping) {
            this.state = 2;
        }
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
        if (true == this.isShooting) {
            this.state = 4;
            this.IdleShoot();
            return;
        }

        // 첫 IDLE
        if (0 != this.preState) {
            if (-1 == this.direction) {
                this.SetAnimation(playerAnim.IdleLeft);
            }
            else {
                this.SetAnimation(playerAnim.IdleRight);
            }


        }

    }

    Run() {
        if (true == this.isShooting) {
            this.state = 5;
            this.RunShoot();
            return;
        }

        // 첫 IDLE
        if (1 != this.preState || this.preDirection != this.direction) {
            if (-1 == this.direction) {
                this.SetAnimation(playerAnim.RunLeft);

            }
            else {
                this.SetAnimation(playerAnim.RunRight);

            }
        }
    }

    Jump() {
        if (true == this.isShooting) {
            this.state = 6;
            this.JumpShoot();
            return;
        }

        // 첫 IDLE
        if (2 != this.preState || this.preDirection != this.direction) {
            if (-1 == this.direction) {
                this.SetAnimation(playerAnim.JumpLeft);
   
            }
            else {
                this.SetAnimation(playerAnim.JumpRight);

            }
        }
    }

    GetHit() {
        // 첫 IDLE
        if (3 != this.preState) {
            if (-1 == this.direction) {
                this.SetAnimation(playerAnim.GetHitLeft);
                console.log("GetHit Left");
            }
            else {
                this.SetAnimation(playerAnim.GetHitRight);
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

    IdleShoot() {
        // 첫 IDLE
        if (4 != this.preState) {
            if (-1 == this.direction) {
                this.SetAnimation(playerAnim.IdleShootLeft);

            }
            else {
                this.SetAnimation(playerAnim.IdleShootRight);

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

    RunShoot() {
        // 첫 IDLE
        if (5 != this.preState) {
            if (-1 == this.direction) {
                this.SetAnimation(playerAnim.RunShootLeft);

            }
            else {
                this.SetAnimation(playerAnim.RunShootRight);

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

    JumpShoot() {
        // 첫 IDLE
        if (6 != this.preState) {
            if (-1 == this.direction) {
                this.SetAnimation(playerAnim.JumpShootLeft);
    
            }
            else {
                this.SetAnimation(playerAnim.JumpShootRight);

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

