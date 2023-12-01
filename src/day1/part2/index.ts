import { stringInputToArray } from "../../utils/utils";
import { input, testInput2 } from "../input";
const inputData = stringInputToArray(input)
let sum = 0;
const digitsAsStrings = [["one", "1"], ["two", "2"], ["three", "3"], ["four", "4"], ["five", "5"], ["six", "6"], ["seven", "7"], ["eight", "8"], ["nine","9"]]
const digits: string[] = digitsAsStrings.map(i => i[0])
const objDigits: {[a: string]: string} = {
    "one": "1ne",
    "two": "2wo",
    "three": "3re",
    "four": "4ur",
    "five": "5ve",
    "six": "6ix",
    "seven": "7en",
    "eight": "8ht",
    "nine": "9ne"
}
inputData.map(item => {
    let tempItem = item;
    const indArray: string[] = []
    digits.forEach((dig) => {
        const ind = tempItem.indexOf(dig)
        
        if(ind !== -1) {
            indArray[ind] = dig;
        }
    
    })
    digits.forEach((itm) => {
        if(tempItem.includes(itm)){
            tempItem = tempItem.replaceAll(itm, objDigits[itm])
        }
    })
    const newItem = tempItem.replace(/[a-z]/g, '')
    console.log(newItem)
    if(newItem.length > 1){
        const num = parseInt(`${newItem[0]}${newItem[newItem.length - 1]}`)
        console.log(num + "+")
        sum += num
    } else if (newItem.length == 1) {
        const num = parseInt(`${newItem[0]}${newItem[0]}`)
        console.log(num+ "+")
        sum += num
    }
})
console.log(sum)