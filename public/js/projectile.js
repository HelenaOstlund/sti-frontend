export default class Projectile {
    constructor(context, { position, velocity }) {
        this.context = context
        this.position = position
        this.velocity = velocity
        this.radius = 4
    }
    draw() {
        this.context.beginPath()
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        this.context.fillStyle = 'red'
        this.context.fill()
        this.context.closePath()
    }
    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}