import { stringInputToArray } from "../../utils/utils";
import { testInput, input } from "../input";
const inputData = stringInputToArray(input)

let cards: number[] = []
inputData.forEach((row, index) => {
    const rowTokens = row.split(':')
    const nums = rowTokens[1].split('|')
    const winningNums = nums[0].trim().split(' ')
    const myWinningNums = nums[1].trim().split(' ').filter(num => num !== '' && winningNums.includes(num))
    cards[index] = myWinningNums.length
})

console.log(cards)

const cardCount = new Array(cards.length).fill(1);
let multiplier = 1;
for(let i = 0; i < cards.length; i++) {
    console.log(`For card ${i + 1}`)
    if(cards[i] > 0) {
        
        for(let j = 1; j <= cards[i]; j++) {
            console.log(`Adding ${multiplier} of card ${i + j + 1}`)
            cardCount[i + j] +=  multiplier;
        }
    }
    multiplier = cardCount[i+1]
}

let sum = cardCount.reduce((acc, curVal) => acc + curVal);
console.log(sum)