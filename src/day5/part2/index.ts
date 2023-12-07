import { stringInputToArray } from "../../utils/utils";
import { testInput, input } from "../input";
const inputData = stringInputToArray(input)

const seeds = inputData[0].split(':')[1].trim().split(' ').map(s => parseInt(s))
console.log("Original: ", seeds)

const maps = input.split('\n\n');
maps.shift()

maps.forEach(map => {
    const lines = map.split('\n')
    lines.shift()

    let leftoverSeeds: number[] = []
    let modIndices: number[] = []

    lines.forEach(line => {
        const nums = line.split(' ').map(n => parseInt(n))
        for(let i = 0; i < seeds.length - 2; i += 2) {
            const rangeStart = seeds[i]
            const rangeEnd = seeds[i] + seeds[i + 1]

            const mapAndTranslationRange = nums[2]

            const mapRangeStart = nums[1]
            const mapRangeEnd = nums[1] + mapAndTranslationRange

            const translationRangeStart = nums[0]

            if(!modIndices.includes(i)) {
                console.log(`Range: [${rangeStart}, ${rangeEnd}), Map range: [${mapRangeStart} - ${mapRangeEnd}), Translate range: [${translationRangeStart}, ${translationRangeStart + mapAndTranslationRange})`)
                if(rangeStart >= mapRangeStart && rangeEnd < mapRangeEnd) { // Interval included
                    seeds[i] = translationRangeStart + (seeds[i] - mapRangeStart)
                    modIndices.push(i)
                    console.log(`Translated: [${seeds[i]}, ${seeds[i]+seeds[i+1]})`)
                } else if (rangeStart < mapRangeStart && rangeEnd >= mapRangeEnd) { // Interval bigger on both sides
                    seeds[i] = translationRangeStart
                    seeds[i+1] = mapAndTranslationRange
                    leftoverSeeds.push(rangeStart, mapRangeStart - rangeStart)
                    leftoverSeeds.push(mapRangeEnd, rangeEnd - mapRangeEnd)
                    modIndices.push(i)
                    console.log(`Translated: [${seeds[i]}, ${seeds[i]+seeds[i+1]})`)
                } else if (rangeStart >= mapRangeStart && rangeStart < mapRangeEnd && rangeEnd >= mapRangeEnd ) { // Interval bigger to right
                    seeds[i] = translationRangeStart + (seeds[i] - mapRangeStart)
                    seeds[i+1] = seeds[i+1] - (rangeEnd - mapRangeEnd)
                    leftoverSeeds.push(mapRangeEnd, rangeEnd - mapRangeEnd)
                    modIndices.push(i)
                    console.log(`Translated: [${seeds[i]}, ${seeds[i]+seeds[i+1]})`)
                } else if (rangeEnd < mapRangeEnd && rangeEnd >= mapRangeStart && rangeStart < mapRangeStart) { // Interval bigger to left
                    seeds[i] = translationRangeStart
                    seeds[i+1] = seeds[i+1] - (mapRangeStart - rangeStart)
                    leftoverSeeds.push(rangeStart, mapRangeStart - rangeStart)
                    modIndices.push(i)
                    console.log(`Translated: [${seeds[i]}, ${seeds[i]+seeds[i+1]})`)
                }
                
            }
            
        }
        
    })

    seeds.push(...leftoverSeeds)
    console.log(seeds)
})

let seedsOnly = []
let seedsPlus = []
for(let i = 0; i <= seeds.length - 2; i+=2) {
    seedsOnly.push(seeds[i])
    // for (let j = seeds[i]; j< seeds[i] + seeds[i+1]; j++) {
    //     seedsPlus.push(j)
    // }
}

console.log(seedsOnly.length)
console.log(Math.min.apply(null, seedsOnly))