export default class InvaderProjectile {
    constructor(context, { position, velocity }) {
        this.context = context
        this.position = position
        this.velocity = velocity
        this.width = 3
        this.height = 10
    }
    draw() {
        this.context.fillStyle = 'white'
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}