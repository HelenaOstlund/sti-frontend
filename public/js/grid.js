import Invader from "./invader.js";

export default class Grid {
    constructor(context, canvasWidth){
        this.canvasWidth = canvasWidth
        this.context = context
        this.position = {
            x: 0,
            y: 0
        }

        this.velocity = {
            x: 3,
            y: 0
        }

        this.invaders = []

        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)

        this.width = columns * 30

        for(let x = 0; x < columns; x++){
            for(let y = 0; y < rows; y++){
                this.invaders.push(
                    new Invader(context,{
                        position: {
                            x: x * 30,
                            y: y * 30
                        }
                    })
                )
            }
        }
    }
    update(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y

        this.velocity.y = 0

        if(this.position.x + this.width >= this.canvasWidth || this.position.x <= 0) {
            this.velocity.x = -this.velocity.x
            this.velocity.y = 30
        }
    }
}