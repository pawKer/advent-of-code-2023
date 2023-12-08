import { stringInputToArray } from "../../utils/utils";
import { testInput, input } from "../input";
const inputData = stringInputToArray(input)
console.log(inputData)
const raceTimes = inputData[0].split(":")[1].trim().split(" ").filter(num => num != "").map(n => parseInt(n))
const recordDistances = inputData[1].split(":")[1].trim().split(" ").filter(num => num != "").map(n => parseInt(n))
console.log(raceTimes)
console.log(recordDistances)

let prod = 1;
raceTimes.forEach((time, index) => {
    let waysToWin = 0
    for(let buttonValue = 1; buttonValue < time; buttonValue++) {
        let boatSpeed = buttonValue;
        let distanceTravelled = 0;
        for(let tick = buttonValue; tick < time; tick++) {
            distanceTravelled += boatSpeed;
        }
        if(distanceTravelled > recordDistances[index]) {
            waysToWin++;
        }
    }
    prod *= waysToWin;
})
console.log(prod)