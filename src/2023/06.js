const {splitClean} = require("../util/inputUtils");

const parseRaces = (input) => {
    const [ time, distance ] = splitClean(input).map(val => val.split(':')[1]
        .match(/(\d+)/g)
        .map(m => parseInt(m))
    )
    const races = []
    for (let i = 0; i < time.length; i++) {
        races.push({ time: time[i], dist: distance[i]})
    }
    console.log(races)
    return races
}


module.exports = (input) => {
    const races = parseRaces(input)
    return { part1: 0, part2: 0 }
}