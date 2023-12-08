import { stringInputToArray } from "../../utils/utils";
import { testInput, input } from "../input";
const inputData = stringInputToArray(input)
const raceTime = parseInt(inputData[0].split(":")[1].trim().replaceAll(' ', ''))
const recordDistance = parseInt(inputData[1].split(":")[1].trim().replaceAll(' ', ''))
console.log(raceTime)
console.log(recordDistance)

let waysToWin = 0
for(let buttonValue = 1; buttonValue < raceTime; buttonValue++) {
    let boatSpeed = buttonValue;
    let distanceTravelled = boatSpeed * (raceTime - buttonValue);
    if(distanceTravelled > recordDistance) {
        waysToWin++;
    }
}
console.log(waysToWin)