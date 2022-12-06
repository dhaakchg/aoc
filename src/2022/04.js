const {splitClean} = require("../util/inputUtils");
const {range} = require("../util/helpers");

const rangeFullyContained = (r1, r2) => {
  const r1min = Math.min(...r1)
  const r1max = Math.max(...r1)
  const r2min = Math.min(...r2)
  const r2max = Math.max(...r2)
  return r1min >= r2min && r1max <= r2max
}

const overlapAtAll = (r1, r2) => {
  const [r1s, r2s] = [r1, r2].map(r => new Set(r))
  const overlap = new Set([...r1s].filter(x => r2s.has(x))) // r1 in r2
  return overlap.size > 0 // non-zero size means overlapped at some point
}

module.exports = (input) => {
  let part1 = 0
  let part2 = 0
  splitClean(input).map(assPairs => {
    const [sec1, sec2] = assPairs.split(',').map(section => {
      const [start, stop] = section.split('-').map(n => Number.parseInt(n))
      return range(start, stop)
    })
    const contained = rangeFullyContained(sec1, sec2) || rangeFullyContained(sec2, sec1)
    const overlapped = overlapAtAll(sec1, sec2) || overlapAtAll(sec2, sec1)
    if ( contained ) part1 += 1
    if ( overlapped ) part2 += 1
  })
  return [part1, part2]
}
