import { stringInputToArray, readAs2DArray, print2DArray } from "../../utils/utils";
import { input, testInput } from "../input";
const inputData = readAs2DArray(stringInputToArray(input))
// print2DArray(inputData)

const gearNums: {[a: string]: string[]} = {}
let numHasGearNeighbors = false;
let num = '';
let gearId = '';

const isGearSymbol = (char: string): boolean => {
    return char === '*'
}

inputData.forEach((row, i) => {
    row.forEach((col, j) => {
        /* @ts-ignore */
        if(!isNaN(col)) {
            for(let m = -1; m <= 1; m++) {
                for(let n = -1; n <= 1; n ++){
                    if(i + m < 0 || j + n < 0 || i + m >= inputData.length || j + n >= inputData[i+m].length || (m == 0 && n == 0)) {
                        continue;
                    }
                    if(isGearSymbol(inputData[i+m][j+n])) {
                        numHasGearNeighbors = true;
                        if(`${i+m}${j+n}` !== gearId) {
                            gearId = `${i+m}a${j+n}`
                        }
                    }
                }
            }
        }

        /* @ts-ignore */
        if(!isNaN(col)) {
            num += col
        } else {
            /* @ts-ignore */
            if (num && numHasGearNeighbors && gearId) {
                console.log("num: " + num)
                if(gearNums[`gear${gearId}`]) {
                    gearNums[`gear${gearId}`].push(num);
                } else {
                    gearNums[`gear${gearId}`] = [num]
                }
            }
            num = ''
            numHasGearNeighbors = false;
            gearId = ''
        }
    })
    if (num && numHasGearNeighbors && gearId) {
        console.log("num: " + num)
        if(gearNums[`gear${gearId}`]) {
            gearNums[`gear${gearId}`].push(num);
        } else {
            gearNums[`gear${gearId}`] = [num]
        }
    }
    num = ''
    numHasGearNeighbors = false;
    gearId = ''
} )

let sum = 0;
console.log(gearNums)
Object.entries(gearNums).forEach(([key, value]) => {
    if(value.length == 2) {
        let product = 1;
        value.forEach(n => {
            product *= parseInt(n)
        })
        sum += product;
    }
})
console.log(sum)