import { stringInputToArray } from "../../utils/utils";
import { testInput, input } from "../input";
const inputData = stringInputToArray(input)
const seeds = inputData[0].split(':')[1].trim().split(' ').map(s => BigInt(s))
console.log(seeds)
const maps = input.split('\n\n');
maps.shift()
let modIndices: number[] = []
maps.forEach(map => {
    const lines = map.split('\n')
    lines.shift()
    lines.forEach(line => {
        const nums = line.split(' ').map(n => BigInt(n))
        for(let i = 0; i < seeds.length; i++) {
            if(seeds[i] >= nums[1] && seeds[i] < nums[1] + nums[2] && !modIndices.includes(i)) {
                seeds[i] = nums[0] + (seeds[i] - nums[1])
                modIndices.push(i)
            }
        }
    })
    modIndices = []
    console.log(seeds)
})
const bigIntMin = (...args: any[]) => args.reduce((m:any, e:any) => e < m ? e : m);

console.log(bigIntMin(...seeds))