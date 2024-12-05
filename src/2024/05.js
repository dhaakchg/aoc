const {splitClean} = require("../util/inputUtils");

const processInput = (input) => {
    let rules = []
    let updates = []
    const processed = splitClean(input)
    processed.forEach(line => {
        if(line.match(/\d+\|/)) rules.push(line.split('|').map(Number))
        if(line.match(/\d+,/)) updates.push(line.split(',').map(Number))
    })
    return { rules, updates }
}

const middlePage = (arr) => {
    return arr[Math.floor(arr.length / 2)]
}

const rulesForPage = (page, rules) => {
    return {
        rulesBefore: rules.filter(rule => page === rule[1]).map(rule => rule[0]),
        rulesAfter: rules.filter(rule => page === rule[0]).map(rule => rule[1])
    }
}

const updateInOrder = (rules, update) => {
    for(let i = 0; i < update.length; i++) {
        const { rulesBefore, rulesAfter } = rulesForPage(update[i], rules)
        const pagesBefore = update.slice(0, i)
        const pagesAfter = update.slice(i + 1)

        if( !pagesBefore.every(pb => rulesBefore.includes(pb)) || !pagesAfter.every(pa => rulesAfter.includes(pa)) ) {
            return false
        }
    }
    return true
}

const correctUpdate = (rules, update) => {

}

module.exports = (input) => {
    const { rules, updates } = processInput(input)
    const part1 = updates.filter(u => updateInOrder(rules, u))
      .map(u => middlePage(u))
      .reduce((acc, curr) => acc + curr, 0)
    const part2 = updates.filter(u => !updateInOrder(rules, u))
      .map(u => correctUpdate(u))
      .map(u => middlePage(u))
      .reduce((acc, curr) => acc + curr, 0)
    return { part1, part2 }
}
