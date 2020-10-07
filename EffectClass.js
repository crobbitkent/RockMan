class Effect
{
    constructor(sprite, scale, speed)
    {
        this.speed = speed;

        this.sprite = sprite;       
        this.sprite.height =  this.sprite.height * scale;
        this.sprite.width =  this.sprite.width * scale;

        this.sprite.animationSpeed = speed;
        this.sprite.loop = false;

        gameScreen.addChild(this.sprite);

        this.enable = false;
        this.sprite.visible = false;

        this.spriteLeft;
        this.spriteRight;
    }

    GetSprite()
    {
        return this.sprite;
    }

    Init(startX, startY)
    {
        this.sprite.x = startX;
        this.sprite.y = startY;

        this.sprite.anchor.set(0.5);  
        this.enable = true;
    }

    SetDirectionAnim(left, right)
    {
        this.spriteLeft = left;    
        this.spriteLeft.height =  this.spriteLeft.height * scale;
        this.spriteLeft.width =  this.spriteLeft.width * scale;

        this.spriteLeft.animationSpeed = this.speed;
        this.spriteLeft.loop = false;
        this.spriteLeft.visible = false;
        this.spriteLeft.anchor.set(0.5);  

        gameScreen.addChild(this.spriteLeft);


        this.spriteRight = right;
        this.spriteRight.height =  this.spriteRight.height * scale;
        this.spriteRight.width =  this.spriteRight.width * scale;

        this.spriteRight.animationSpeed = this.speed;
        this.spriteRight.loop = false;
        this.spriteRight.visible = false;
        this.spriteRight.anchor.set(0.5);  

        gameScreen.addChild(this.spriteRight);
    }

    SetDirection(num)
    {
        if(-1 == num)
        {
            this.sprite = this.spriteLeft;
        }
        else
        {
            this.sprite = this.spriteRight;
        }

    }


    Update(delta)
    {
        if(true == this.enable)
        {
            if(false == this.sprite.visible)
            {
                
                this.sprite.gotoAndPlay(0);               
                this.sprite.visible = true;

               
                console.log(score);
            }

            if(false == this.sprite.playing)
            {
                this.sprite.visible = false;
                this.enable = false;

                console.log(score);
            }
        }
    }



}