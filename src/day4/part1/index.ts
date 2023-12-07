import { stringInputToArray } from "../../utils/utils";
import { testInput, input } from "../input";
const inputData = stringInputToArray(input)
let points = 0
inputData.forEach(row => {
    const rowTokens = row.split(':')
    const nums = rowTokens[1].split('|')
    const winningNums = nums[0].trim().split(' ')
    const myWinningNums = nums[1].trim().split(' ').filter(num => num !== '' && winningNums.includes(num))
    if (myWinningNums.length > 0)
        points += Math.pow(2, myWinningNums.length - 1)
})
console.log(points)