// @ts-nocheck
import { stringInputToArray, readAs2DArray, print2DArray } from "../../utils/utils";
import { input, testInput } from "../input";
const inputData = readAs2DArray(stringInputToArray(input))
// print2DArray(inputData)
let sum = 0;
const isSpecialSymbol = (char: string): boolean => {
    return isNaN(char) && char !== '.'
}
let numHasNeighbors = false;
let num = '';
inputData.forEach((row, i) => {
    row.forEach((col, j) => {
        /* @ts-ignore */
        if(!isNaN(col)) {
            for(let m = -1; m <= 1; m++) {
                for(let n = -1; n <= 1; n ++){
                    if(i + m < 0 || j + n < 0 || i + m >= inputData.length || j + n >= inputData[i+m].length || (m == 0 && n == 0)) {
                        continue;
                    }
                    if(isSpecialSymbol(inputData[i+m][j+n])) {
                        numHasNeighbors = true;
                    }
                }
            }
        }
        /* @ts-ignore */
        if(!isNaN(col)) {
            num += col
        } else {
            /* @ts-ignore */
            if (num && numHasNeighbors) {
                console.log("num: " + num)
                sum += parseInt(num)
            }
            num = ''
            numHasNeighbors = false;
        }
    })
    if (num && numHasNeighbors) {
        console.log("num: " + num)
        sum += parseInt(num)
    }
    num = ''
    numHasNeighbors = false;
} )
console.log(sum)