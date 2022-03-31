export default class Player {

    constructor(context, canvasWidth, canvasHeight) {
        this.context = context
        this.canvasWidth = canvasWidth
        this.canvasHeight = canvasHeight
        this.velocity = {
            x: 0,
            y: 0
        }
        this.rotation = 0
        this.opacity = 1

        const image = new Image()
        image.src = './spaceship.png'
        image.onload = () => {
            const scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvasWidth / 2 - this.width / 2,
                y: canvasHeight - this.height - 20
            }
        }

    }

    draw(context) {
        this.context.save()
        this.context.globalAlpha = this.opacity
        this.context.translate(
            this.position.x + this.width / 2,
            this.position.y + this.height / 2)
        this.context.rotate(this.rotation)

        this.context.translate(
            -this.position.x - this.width / 2,
            -this.position.y - this.height / 2)

        this.context.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )

        this.context.restore()
    }

    update(context) {
        if (this.image) {
            this.draw(context)
            this.position.x += this.velocity.x
        }
    }
    isHit(projectile){
        if(projectile.position.y + projectile.height < this.position.y){
            return false
        }
        if(projectile.position.x + projectile.width < this.position.x){
            return false
        }
        if(projectile.position.x > this.position.x + this.width){
            return false
        }
        return true
    }
}