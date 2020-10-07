class Bullet
{
    constructor(sprite, scale)
    {
        this.sprite = sprite;       
        this.sprite.height =  this.sprite.height * scale;
        this.sprite.width =  this.sprite.width * scale;
        this.sprite.visible = false;
        this.direction = 1;

        gameScreen.addChild(this.sprite);
    }

    GetSprite()
    {
        return this.sprite;
    }

    SetDirectionAnim(left, right)
    {
        this.spriteLeft = left;    
        this.spriteLeft.height =  this.spriteLeft.height * scale;
        this.spriteLeft.width =  this.spriteLeft.width * scale;

        this.spriteLeft.visible = false;
        this.spriteLeft.anchor.set(0.5);  

        gameScreen.addChild(this.spriteLeft);

        this.spriteRight = right;
        this.spriteRight.height =  this.spriteRight.height * scale;
        this.spriteRight.width =  this.spriteRight.width * scale;

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

    Init(startX, startY, speed, direction)
    {
        this.sprite.x = startX;
        this.sprite.y = startY;

        this.speed = speed;
        this.direction = direction;

        this.sprite.anchor.set(0.5);
        this.sprite.visible = true;
    }

    Update(delta)
    {
        this.sprite.x += this.speed * this.direction;
    }



}