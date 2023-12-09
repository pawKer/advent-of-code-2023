import { stringInputToArray } from "../../utils/utils";
import { testInput, input } from "../input";
const inputData = stringInputToArray(input)
let sum = 0;
inputData.forEach(row => {
    const nums = row.split(' ').map(n => parseInt(n))
    const seqs = [nums]
    let notZeros = true
    let cur = nums
    while(true) {
        const s = []
        for(let i = 0; i < cur.length - 1; i++){
            s.push(cur[i+1] - cur[i])
        }
        seqs.push(s)
        if(s.filter(n => n === 0).length === s.length) {
            break
        }
        cur = s;
    }
    seqs.reverse();
    for(let i = 0; i < seqs.length - 1; i++) {
        seqs[i+1].unshift(seqs[i+1][0] - seqs[i][0])
    }
    console.log(seqs)
    sum += seqs[seqs.length - 1][0]
})
console.log(sum)