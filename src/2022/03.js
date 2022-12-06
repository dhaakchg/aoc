const {splitClean} = require("../util/inputUtils");
const alphabet = 'abcdefghijklmnopqrstuvwxyz'

module.exports = (input) => {
  return splitClean(input).map(rucksack => {
    const comp1 = new Set(rucksack.slice(0, rucksack.length / 2).split(''))
    const comp2 = new Set(rucksack.slice(rucksack.length / 2).split(''))
    const inBoth = new Set([...comp1].filter(c => comp2.has(c))).values().next().value
    return /[a-z]/.test(inBoth) ? alphabet.indexOf(inBoth) + 1 : alphabet.toUpperCase().indexOf(inBoth) + 27
  }).reduce((acc, curr) => acc + curr)
}
