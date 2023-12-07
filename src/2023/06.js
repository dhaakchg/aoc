const {splitClean} = require("../util/inputUtils");
const {range} = require('../util/helpers')

const parseRaces = (input) => {
    const [ time, distance ] = splitClean(input).map(val => val.split(':')[1]
        .match(/(\d+)/g)
        .map(m => parseInt(m))
    )
    const races = []
    for (let i = 0; i < time.length; i++) {
        races.push({ raceLength: time[i], recordDist: distance[i]})
    }
    console.log(races)
    return races
}

const waysToWin = (race) => {
    const { raceLength, recordDist } = race
    const buttonHolds = range(0, raceLength)
    const winningHolds = []
    for(let boatSpeed of buttonHolds) {
        const timeLeft = (raceLength - boatSpeed)
        const distance = boatSpeed * timeLeft
        console.log(`Held button for: ${boatSpeed}ms, boat moved at ${boatSpeed} mm/ms for ${timeLeft}ms for total: ${distance}mm vs record: ${recordDist}`)
        if(distance > recordDist) winningHolds.push(boatSpeed)
    }
    console.log(`Race: ${JSON.stringify(race)} had ${winningHolds.length} ways to win`)
    return winningHolds.length
}

module.exports = (input) => {
    const races = parseRaces(input)
    const part1 = races.map(race => waysToWin(race)).reduce((a, c) => a * c)
    return { part1, part2: 0 }
}