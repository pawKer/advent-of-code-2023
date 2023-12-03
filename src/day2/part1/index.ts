import { stringInputToArray } from "../../utils/utils";
import { input } from "../input";
const inputData = stringInputToArray(input)
const total: {[a: string]: number} = {
    "red": 12,
    "green": 13,
    "blue": 14
}
let gameIdSum = 0;
inputData.forEach(row => {
    // For each game
    const gameTokens = row.split(":");
    const gameId = parseInt(gameTokens[0].split(" ")[1])
    const subsetTokens = gameTokens[1].split(";")
    let gameViable = true;
    subsetTokens.forEach(round => {
        // For each subset of balls
        const colourTokens = round.split(',');
        // For each colour extracted
        colourTokens.forEach(col => {
            const tokens = col.trim().split(" ")
            const colour = tokens[1]
            const number = parseInt(tokens[0])
            if(number > total[colour]) {
                // Game is not viable
                console.log(`Game ${gameId} is not viable`)
                gameViable = false;
            }
        })
        
    })
    if(gameViable) {
        gameIdSum += gameId;
    }
})
console.log(gameIdSum)
