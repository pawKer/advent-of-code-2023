import { stringInputToArray } from "../../utils/utils";
import { testInput, input } from "../input";

const inputData = stringInputToArray(input)
const pokerCards: {[a: string]: number} = {
    "A": 14,
    "K": 13,
    "Q": 12,
    "J": 11,
    "T": 10,
    "9": 9,
    "8": 8,
    "7": 7,
    "6": 6,
    "5": 5,
    "4": 4,
    "3": 3,
    "2": 2
}

const HAND_TYPE_MULTIPLIER = Math.pow(10, 11)

const HAND_TYPE_POINTS = {
    "FIVE_OF_A_KIND": 1000000 * HAND_TYPE_MULTIPLIER,
    "FOUR_OF_A_KIND": 100000 * HAND_TYPE_MULTIPLIER,
    "FULL_HOUSE": 10000 * HAND_TYPE_MULTIPLIER,
    "THREE_OF_A_KIND": 1000 * HAND_TYPE_MULTIPLIER,
    "TWO_PAIR": 100 * HAND_TYPE_MULTIPLIER,
    "ONE_PAIR": 10 * HAND_TYPE_MULTIPLIER,
    "HIGH_CARD": HAND_TYPE_MULTIPLIER,
}

const POSITION_MULTIPLIER = Math.pow(10, 10)

const calculateHandTypePoints = (cards: string[]) => {
    const cardCount: {[a: string]: number} = {}
    cards.forEach(card => {
        if(card in cardCount) {
            cardCount[card]++
        } else {
            cardCount[card] = 1
        }
            
    })
    let countIndex: number[] = new Array(6).fill(0);
    for(let [card, count] of Object.entries(cardCount)) {
        countIndex[count]++;
    }
    // console.log(countIndex)
    if(countIndex[5] === 1) {
        return HAND_TYPE_POINTS["FIVE_OF_A_KIND"]
    } else if (countIndex[4] === 1) {
        return HAND_TYPE_POINTS["FOUR_OF_A_KIND"]
    } else if (countIndex[2] === 1 && countIndex[3] === 1) {
        return HAND_TYPE_POINTS["FULL_HOUSE"]
    } else if (countIndex[3] === 1) {
        return HAND_TYPE_POINTS["THREE_OF_A_KIND"]
    } else if (countIndex[2] === 2) {
        return HAND_TYPE_POINTS["TWO_PAIR"]
    } else if (countIndex[2] === 1) {
        return HAND_TYPE_POINTS["ONE_PAIR"]
    } else {
        return HAND_TYPE_POINTS["HIGH_CARD"]
    }
}

const calculateCardValuePoints = (cards: string[])  => {
    let positionMultiplier = POSITION_MULTIPLIER;
    let points = 0;
    for(let i = 0; i < cards.length; i++) {
        points += positionMultiplier * pokerCards[cards[i]]
        positionMultiplier = positionMultiplier / 100;
    }
    return points
}

type Hand = {points: number, bet:number, hand: string}
const handPoints: Hand[] = []

inputData.forEach((row) => {
    const tokens = row.split(" ")
    const hand = tokens[0]
    const bet = parseInt(tokens[1])
    const cards = hand.split('')

    const handTypePoints = calculateHandTypePoints(cards);
    const cardValuePoints = calculateCardValuePoints(cards);
    const totalPoints = handTypePoints + cardValuePoints;

    handPoints.push({points: totalPoints, bet, hand})
})

const handCompareFn = (a: Hand, b: Hand) => a.points - b.points
handPoints.sort(handCompareFn)

console.log(handPoints.map(hand => hand.bet).reduce((acc, a, index) => acc + a * (index + 1)))