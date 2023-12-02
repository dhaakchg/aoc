const { splitClean } = require("../util/inputUtils");

const parseInput = (input) => {
    return splitClean(input).map(line => {
        const { game, setData } = line.match(/^Game (?<game>\d+):(?<setData>.+)$/).groups
        const sets = setData.split(';').map(sets => sets.split(',')).map(set => {
            const parsed = {}
            set.forEach(cubes => {
                const { count, color } = cubes.match(/\s+(?<count>\d+)\s+(?<color>(red|blue|green))/).groups
                return parsed[color] = parseInt(count)
            })
            return parsed
        })
        return { game, sets }
    })
}

class Bag {
    constructor(red = 12, blue = 14, green = 13) {
        this.red = red
        this.blue = blue
        this.green = green
    }
}

const findPossibleGames = (gameData, bag) => {
    const possible = []
    gameData.forEach(({game, sets}) => {
        const gamePossible = sets.map(set => Object.keys(set).map(color => set[color] <= bag[color]).every(Boolean)).every(Boolean)
        if (gamePossible) possible.push(parseInt(game))
    })
    return possible.reduce((a, c) => a + c, 0)
}

const findPower = (gameData) => {
    return gameData.map(({sets}) => {
        const bag = new Bag(0, 0, 0)
        sets.map(set => {
            Object.keys(set).forEach(color => bag[color] = set[color] > bag[color] ? set[color] : bag[color])
        })
        return Object.values(bag).reduce((a, c) => a * c)
    }).reduce((a, c) => a + c)
}

module.exports = (input) => {
    const parsedInput = parseInput(input)
    const part1 = findPossibleGames(parsedInput, new Bag())
    const part2 = findPower(parsedInput)
    return { part1, part2 }
}