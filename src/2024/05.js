const { splitClean } = require('../util/inputUtils')
const _ = require('lodash')

let RULES = []
let UPDATES = []

const processInput = (input) => {
    splitClean(input).forEach(line => {
      if(line.match(/\d+\|/)) RULES.push(line.split('|').map(Number))
      if(line.match(/\d+,/)) UPDATES.push(line.split(',').map(Number))
    })
}

const middlePage = (arr) => {
    return arr[Math.floor(arr.length / 2)]
}

const updateInOrder = (update) => {
    const sorted = update.toSorted(compareFn)
    return _.isEqual(update, sorted)
}

function compareFn(a, b) {
    if (RULES.some(rule => rule[0] === a && rule[1] === b)) {
        // a is less than b by some ordering criterion
        return -1
    } else if (RULES.some(rule => rule[0] === b && rule[1] === a)) {
        // a is greater than b by the ordering criterion
        return 1
    }
    // a must be equal to b
    return 0
}

module.exports = (input) => {
    processInput(input)
    const part1 = UPDATES.filter(u => updateInOrder(u))
      .map(u => middlePage(u))
      .reduce((acc, curr) => acc + curr, 0)

    const part2 = UPDATES.filter(u => !updateInOrder(u))
      .map(u => u.toSorted(compareFn))
      .map(u => middlePage(u))
      .reduce((acc, curr) => acc + curr, 0)
    return { part1, part2 }
}
