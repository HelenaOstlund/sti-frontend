console.log("Initierar mitt spel")
let ageOfGame = 0

setTimeout(age, 1000)

function age() {
    console.log("Game is " + ageOfGame++ + " seconds old!")
    setTimeout(age, 1000)
}