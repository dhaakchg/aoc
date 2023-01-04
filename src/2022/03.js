const {splitClean} = require('../util/inputUtils');
const { range, alphabet } = require('../util/helpers')
const getPriority = (char) => /[a-z]/.test(char) ? alphabet.indexOf(char) + 1 : alphabet.toUpperCase().indexOf(char) + 27

module.exports = (input) => {
  const cleaned = splitClean(input)
  const part1 = cleaned.map(rucksack => {
    const comp1 = new Set(rucksack.slice(0, rucksack.length / 2).split(''))
    const comp2 = new Set(rucksack.slice(rucksack.length / 2).split(''))
    const inBoth = new Set([...comp1].filter(c => comp2.has(c))).values().next().value
    return getPriority(inBoth)
  }).reduce((acc, curr) => acc + curr)

  const part2 = range(0, cleaned.length - 3, 3).map(r => {
    const group = cleaned.slice(r, r + 3)
    const sets = group.map(rucksack => new Set(rucksack))
    const intersect = [...sets].reduce((a, b) => new Set([...a].filter(x => b.has(x)))).values().next().value
    return getPriority(intersect)
  }).reduce((acc, curr) => acc + curr)

  return [part1, part2]
}
