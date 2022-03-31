import Player from "./player.js"
import Projectile from "./projectile.js"
import Particle from "./particle.js"
import Grid from "./grid.js";

const CANVAS_WIDTH = 1024
const CANVAS_HEIGHT = 576
const UPDATE_INTERVAL = 3000

const scoreEl = document.querySelector('#scoreEl')
const canvas = document.querySelector('canvas')
canvas.width = CANVAS_WIDTH
canvas.height = CANVAS_HEIGHT
const context = canvas.getContext('2d')
const startGameBtn = document.querySelector('#startGameBtn')
const modalEl = document.querySelector('#modalEl')
const bigScoreEl = document.querySelector('#bigScoreEl')

setTimeout(updateHighscore, UPDATE_INTERVAL)

function updateHighscore() {
   // console.log(score)
    if(game.over){
        console.log("game over")
        let highscoreElement = document.getElementById("highscore")

        var xhr = new XMLHttpRequest()
        xhr.open("GET", "/js/data.json")
        xhr.onload = function(){
            let data = JSON.parse(this.response)
            highscoreElement.textContent = ""
            headerElement.appendChild(createTable(data))
            setTimeout(age,UPDATE_INTERVAL)
        }
        xhr.send()
    
        
       

        //scoreEl.textContent = ""
        //scoreEl.appendChild(headerElement)
    } else{
        scoreEl.innerHTML = score
        bigScoreEl.innerHTML = score
    }
}

function createTable(data){
    let table = document.createElement("table")
    table.appendChild(addRow("Nissen", 2000))
    table.appendChild(addRow("Helena", 1500))
    table.appendChild(addRow("Ebba", 700))
    return table
}

function addRow(player, score){
    let row = document.createElement("tr")
   
    let playerCell = document.createElement("td")
    playerCell.innerHTML = player
    let scoreCell = document.createElement("td")
    scoreCell.innerHTML = score
   
    row.appendChild(playerCell)
    row.appendChild(scoreCell)
    return row

}

let player = new Player(context, CANVAS_WIDTH, CANVAS_HEIGHT)
let projectiles = []
let grids = []
let invaderProjectiles = []

const particles = []
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    space: {
        pressed: false
    }
}

let frames = 0
let randomInterval = Math.floor(Math.random() * 500) + 500
let game = {
    over: false,
    active: true
}
let score = 0

for (let i = 0; i < 100; i++) {
    particles.push(
        new Particle(context, {
            position: {
                x: Math.random() * CANVAS_WIDTH,
                y: Math.random() * CANVAS_HEIGHT
            },
            velocity: {
                x: 0,
                y: 0.3
            },
            radius: Math.random() * 2,
            color: 'white'
        })
    )
}

function animate() {
    if (!game.active) return
    requestAnimationFrame(animate)
    context.fillStyle = 'black'
    context.fillRect(0, 0, canvas.width, canvas.height)
    player.update()
    particles.forEach((particle, i) => {

        if (particle.position.y - particle.radius >= canvas.height) {
            particle.position.x = Math.random() * canvas.width
            particle.position.y = -particle.radius
        }

        if (particle.opacity <= 0) {
            setTimeout(() => {
                particle.splice(i, 1)
            }, 0)
        } else {
            particle.update()
        }

    })
    invaderProjectiles.forEach((invaderProjectile, index) => {
        if ((invaderProjectile.position.y + invaderProjectile.height) >= canvas.height) {
            setTimeout(() => {invaderProjectiles.splice(index, 1)}, 0)
        } else invaderProjectile.update()

        // projectile hits player
        if(player.isHit(invaderProjectile)){
            console.log('you loose')
          
            setTimeout(() => {
                invaderProjectiles.splice(index, 1)
                player.opacity = 0
                game.over = true
                updateHighscore()
            }, 0)
            setTimeout(() => {game.active = false}, 2000)
            updateHighscore()
            setTimeout(() => {modalEl.style.display = 'flex'}, 2000)
        }
    })

    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        } else {
            projectile.update()
        }
    })

    grids.forEach((grid, gridIndex) => {
        grid.update()

        // spawn projectiles
        if (frames % 100 === 0 && grid.invaders.length > 0) {
            grid.invaders[Math.floor(Math.random() * grid.invaders.length)].shoot(invaderProjectiles)
        }

        grid.invaders.forEach((invader, i) => {
            invader.update({velocity: grid.velocity})

            //projectiles hit enemy
            projectiles.forEach((projectile, j) => {
                if (
                    projectile.position.y - projectile.radius <=
                    invader.position.y + invader.height &&
                    projectile.position.x + projectile.radius >=
                    invader.position.x &&
                    projectile.position.x - projectile.radius <=
                    invader.position.x + invader.width &&
                    projectile.position.y + projectile.radius >=
                    invader.position.y
                ) {


                    setTimeout(() => {
                        const invaderFound = grid.invaders.find(
                            (invader2) => invader2 === invader
                        )
                        const projectileFound = projectiles.find(
                            (projectile2) => projectile2 === projectile)

                        // remove invader and projectile
                        if (invaderFound && projectileFound) {
                            score += 100
                            updateHighscore()
                            grid.invaders.splice(i, 1)
                            projectiles.splice(j, 1)

                            if (grid.invaders.length > 0) {
                                const firstInvader = grid.invaders[0]
                                const lastInvader = grid.invaders[grid.invaders.length - 1]

                                grid.width = lastInvader.position.x -
                                    firstInvader.position.x + lastInvader.width
                                grid.position.x = firstInvader.position.x
                            } else {
                                grids.splice(gridIndex, 1)
                            }
                        }

                    }, 0)
                }
            })
        })
    })

    if (keys.a.pressed && player.position.x >= 0) {
        player.velocity.x = -7
        player.rotation = -0.15
    } else if (keys.d.pressed && player.position.x + player.width <= canvas.width) {
        player.velocity.x = 7
        player.rotation = 0.15
    } else {
        player.velocity.x = 0
        player.rotation = 0
    }

    if (frames % randomInterval === 0) {
        grids.push(new Grid(context, CANVAS_WIDTH))
        randomInterval = Math.floor(Math.random() * 500) + 500
        frames = 0
    }
    frames++
}

function restart() {
    projectiles = []
    grids = []
    invaderProjectiles = []

    score = 0
    updateHighscore()
    bigScoreEl.innerHTML = score
    game.active = true
    game.over = false
    player.opacity = 1
    requestAnimationFrame(animate)
    //animate()
}

addEventListener('keydown', ({key}) => {
    if (game.over) return
    switch (key) {
        case 'a',"ArrowLeft":
            keys.a.pressed = true
            break
        case 'd',"ArrowRight":
            keys.d.pressed = true
            break
        case ' ':
            projectiles.push(new Projectile(context, {
                position: {
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            }))
            break
    }

})

addEventListener('keyup', ({key}) => {
    switch (key) {
        case 'a',"ArrowLeft":
            keys.a.pressed = false
            break
        case 'd',"ArrowRight":
            keys.d.pressed = false
            break
        case ' ':
            break
    }
})

startGameBtn.addEventListener('click', () => {
    modalEl.style.display = 'none'
    restart()
})
