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

const startNodes =  Array.from(treeMap.keys()).filter((a: string) => a.endsWith('A'))
let curVals = startNodes
console.log(startNodes)
const paths: string[] = []
const instructionTokens = instructions.split('')

for(let i = 0; i < curVals.length; i++) {
    while(!curVals[i].endsWith('Z')) {
            for(let inst of instructionTokens){
                    let curElem = treeMap.get(curVals[i])
                    if(inst === 'R') {
                        curVals[i] = curElem!.right
                    } else {
                        curVals[i] = curElem!.left
                    }
                    if(paths[i]) {
                        paths[i] = paths[i] + inst
                    } else {
                        paths[i] = inst
                    }
                    if(curVals[i].endsWith('Z')) {
                        break
                    }
            }
            
    }
}

console.log(paths.map(p => p.length))

const gcd = (a:number, b:number): number => a ? gcd(b % a, a) : b;

const lcm = (a:number, b:number):number => a * b / gcd(a, b);

console.log(paths.map(p => p.length).reduce(lcm))
