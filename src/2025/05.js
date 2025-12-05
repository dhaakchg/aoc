const {splitClean} = require('../util/inputUtils')

const idRanges = []
const ids = []

const processInput = (input) => {
  splitClean(input).forEach(line => {
    if(line.match(/^\d+-\d+$/)) idRanges.push(line.split('-').map(Number))
    if(line.match(/^\d+$/)) ids.push(Number(line))
  })
}

const idInRange = (id, range) => {
  return range[0] <= id && id <= range[1]
}

const idInAnyRange = (id) => {
  return idRanges.some(range => idInRange(id, range))
}

const countFreshIds = () => {
  return ids.filter(id => idInAnyRange(id)).length
}

/**
 *   [ 3789428842004, 5709991969284 ],
 *   [ 11745995299669, 11745995299669 ],
 *   [ 11745995299669, 15721067146153 ],
 *   [ 22161113737564, 25972619829376 ],
 *   [ 23556556778726, 29187005843328 ],
 *   [ 32448406634242, 35482028197831 ],
 *   [ 35482028197832, 39330429165927 ],
 *   [ 40922560379023, 45361625965897 ],
 *   [ 45361625965899, 47427458143925 ],
 *   [ 51691752110650, 59870310846522 ],
 *   [ 55718522314941, 59870310846522 ],
 *   [ 64824035810845, 66190876358299 ],
 *   [ 66190876358299, 66190876358299 ],
 *   [ 70689854028220, 78685047535521 ],
 *   [ 74756502764290, 76233752675094 ],
 *   [ 83797828825790, 86111533566344 ],
 *   [ 83797828825790, 86111533566344 ],
 *   [ 90965560321456, 95371287170236 ],
 *   [ 90965560321456, 97612705983695 ],
 * @return {number}
 */
const mergeIdRanges = () => {
  idRanges.sort(sortRanges)

  for(let i = 0; i < idRanges.length - 1; i++) {
    const currentRange = idRanges[i]
    const nextRange = idRanges[i + 1]
    const [currentStart, currentEnd] = currentRange
    const [nextStart, nextEnd] = nextRange
    if(currentEnd >= nextStart) {
      // overlap, merge
      const mergedRange = [currentStart, Math.max(currentEnd, nextEnd)]
      idRanges.splice(i, 2, mergedRange)
      i-- // recheck this index
    }
  }
  return idRanges.reduce((acc, range) => {
    acc += range[1] - range[0] + 1
    return acc
  }, 0)
}

/**
 * 3-5
 * 10-14
 * 12-18
 * 16-20
 *
 * 435767821145222-437542065836164
 * 40922560379023-45361625965897
 * @param a
 * @param b
 */
const sortRanges = (a, b) => {
  /**
   * if the range end is less than or equal range start, it is lower in order
   * if the range end is greater than another range start, but less than its end, it is higher in order
   */
  const [aStart, aEnd] = a
  const [bStart, bEnd] = b

  if(aEnd < bStart) return -1
  if(aStart > bEnd) return 1
  if(aStart === bStart) return 0
  if(aStart < bStart) return -1
  if(aStart > bStart) return 1
}

module.exports = (input) => {
  processInput(input)
  return { part1: countFreshIds(), part2: mergeIdRanges() }
}
