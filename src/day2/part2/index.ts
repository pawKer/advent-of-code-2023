import { stringInputToArray } from "../../utils/utils";
import { input } from "../input";
const inputData = stringInputToArray(input)
let gamePowerSum = 0;
inputData.forEach(row => {
    // For each game
    const gameTokens = row.split(":");
    const gameId = parseInt(gameTokens[0].split(" ")[1])
    const subsetTokens = gameTokens[1].split(";")
    let gameViable = true;
    const maxColours: {[a: string]: number} = {
        "red": 0,
        "green": 0,
        "blue": 0
    }
    subsetTokens.forEach(round => {
        // For each subset of balls
        const colourTokens = round.split(',');
        // For each colour extracted
        
        colourTokens.forEach(col => {
            const tokens = col.trim().split(" ")
            const colour = tokens[1]
            const number = parseInt(tokens[0])
            if(number > maxColours[colour]) {
                maxColours[colour] = number
            }
        })
        
    })
    console.log(maxColours)
    const gamePower = maxColours["red"] * maxColours["green"] * maxColours["blue"]
    gamePowerSum += gamePower;
    
})
console.log(gamePowerSum)
