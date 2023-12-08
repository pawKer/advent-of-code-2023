import { stringInputToArray } from "../../utils/utils";
import { testInput, input } from "../input";
const inputData = stringInputToArray(input)
const instructions = inputData[0]
inputData.shift()
inputData.shift()

type Leaf = {
    left: string,
    right: string,
}

const treeMap = new Map<string, Leaf>()
inputData.forEach(node => {
    const data = node.split(" = ")
    const neighbors = data[1].replace('(', '').replace(')', '').replace(" ", '').split(',')
    treeMap.set(data[0], {
        left: neighbors[0],
        right: neighbors[1]
    }) 
})

let curVal = 'AAA'
let steps = 1
let curElem = treeMap.get(curVal)

while(curVal !== 'ZZZ') {
    for(let inst of instructions.split('')){
        if(inst === 'R') {
            curVal = curElem!.right
            if(curVal === 'ZZZ') {
                break
            }
            curElem = treeMap.get(curElem!.right)
        } else {
            curVal = curElem!.left
            if(curVal === 'ZZZ') {
                break
            }
            curElem = treeMap.get(curElem!.left)
        }
        steps++
    }
}

console.log(steps)