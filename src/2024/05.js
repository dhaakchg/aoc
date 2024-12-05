const {splitClean} = require("../util/inputUtils");
let RULES = []
let UPDATES = []

const processInput = (input) => {
    const processed = splitClean(input)
    processed.forEach(line => {
        if(line.match(/\d+\|/)) RULES.push(line.split('|').map(Number))
        if(line.match(/\d+,/)) UPDATES.push(line.split(',').map(Number))
    })
}

const middlePage = (arr) => {
    return arr[Math.floor(arr.length / 2)]
}

const rulesForPage = (page) => {
    return {
        rulesBefore: RULES.filter(rule => page === rule[1]).map(rule => rule[0]),
        rulesAfter: RULES.filter(rule => page === rule[0]).map(rule => rule[1])
    }
}

const updateInOrder = (update) => {
    for(let i = 0; i < update.length; i++) {
        const currentPage = update[i]
        const { rulesBefore, rulesAfter } = rulesForPage(currentPage)
        const pagesBefore = update.slice(0, i)
        const pagesAfter = update.slice(i + 1)

        if( !pagesBefore.every(pb => rulesBefore.includes(pb)) || !pagesAfter.every(pa => rulesAfter.includes(pa)) ) {
            return false
        }
    }
    return true
}

function compareFn(a, b) {
    const { rulesBefore: rulesBeforeA, rulesAfter: rulesAfterA } = rulesForPage(a)
    const { rulesBefore: rulesBeforeB, rulesAfter: rulesAfterB } = rulesForPage(b)

    if (rulesBeforeB.includes(a) || rulesAfterA.includes(b)) {
        // a is less than b by some ordering criterion
        return -1
    } else if (rulesAfterB.includes(a) || rulesBeforeA.includes(b)) {
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
