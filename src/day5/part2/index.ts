import { stringInputToArray } from "../../utils/utils";
import { testInput, input } from "../input";
const inputData = stringInputToArray(testInput)

const seeds = inputData[0].split(':')[1].trim().split(' ').map(s => parseInt(s))
console.log("Original: ", seeds)

const maps = testInput.split('\n\n');
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
                console.log(`Range: [${rangeStart}, ${rangeEnd}), Map range: [${mapRangeStart} - ${mapRangeEnd}), Translate range: [${nums[0]}, ${nums[0] + mapAndTranslationRange})`)
                if(rangeStart >= mapRangeStart && rangeEnd < mapRangeEnd) { // Interval included
                    seeds[i] = translationRangeStart + (seeds[i] - nums[1])
                    modIndices.push(i)
                    console.log(`Translated: [${seeds[i]}, ${seeds[i]+seeds[i+1]})`)
                } else if (rangeStart < mapRangeStart && rangeEnd >= mapRangeEnd) { // Interval bigger on both sides
                    leftoverSeeds.push(rangeStart, mapRangeStart - rangeStart)
                    leftoverSeeds.push(mapRangeEnd, rangeEnd - mapRangeEnd)
                    seeds[i] = translationRangeStart
                    seeds[i+1] = mapAndTranslationRange
                    modIndices.push(i)
                    console.log(`Translated: [${seeds[i]}, ${seeds[i]+seeds[i+1]})`)
                } else if (rangeStart >= mapRangeStart && rangeEnd >= mapRangeEnd && rangeStart < mapRangeEnd) { // Interval bigger to right
                    leftoverSeeds.push(mapRangeEnd, rangeEnd - mapRangeEnd)
                    seeds[i] = translationRangeStart + (seeds[i] - nums[1])
                    seeds[i+1] = seeds[i+1] - (rangeEnd - mapRangeEnd)
                    modIndices.push(i)
                    console.log(`Translated: [${seeds[i]}, ${seeds[i]+seeds[i+1]})`)
                } else if (rangeStart < mapRangeStart && rangeEnd < mapRangeEnd && rangeEnd >= mapRangeStart) { // Interval bigger to left
                    leftoverSeeds.push(rangeStart, mapRangeStart - rangeStart)
                    seeds[i] = translationRangeStart
                    seeds[i+1] = seeds[i+1] - (mapRangeStart - rangeStart)
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
    for (let j = seeds[i]; j< seeds[i] + seeds[i+1]; j++) {
        seedsPlus.push(j)
    }
}

console.log(seedsOnly.length)
console.log(Math.min.apply(null, seedsOnly))