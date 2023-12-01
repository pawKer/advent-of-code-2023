import { stringInputToArray } from "../../utils/utils";
import { input } from "../input";
const inputData = stringInputToArray(input)
let sum = 0;
inputData.map(item => {
    const newItem = item.replace(/[a-z]/g, '')
    console.log(newItem)
    if(newItem.length > 1){
        sum += parseInt(`${newItem[0]}${newItem[newItem.length - 1]}`)
    } else {
        sum += parseInt(`${newItem[0]}${newItem[0]}`)
    }
})
console.log(sum)