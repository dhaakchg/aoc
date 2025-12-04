const parseInput = (input) => {
  return input.split(',').map(range => {
    const [firstId, lastId] = range.split('-').map(Number)
    return { firstId, lastId }
  })
}

const isIdInvalid1 = (id) => {
  const idStr = id.toString()
  if(idStr.length % 2 === 1) return false // odd length ids are valid
  const mid = idStr.length / 2
  const firstHalf = idStr.slice(0, mid)
  const secondHalf = idStr.slice(mid)
  return firstHalf === secondHalf
}

const isIdInvalid2 = (id) => {
  const idStr = id.toString()
  for(let s = idStr.length / 2; s >= 1; s--) {
    const chunk = idStr.slice(0, s)
    const re = new RegExp(String.raw`^(?:${chunk}){2,}$`, "g");
    if(re.test(idStr)) {
      // console.log(`regex match for chunk "${chunk}" in id ${id}`)
      return true
    }
  }
  return false
}

module.exports = (input) => {
  const ranges = parseInput(input)
  let part1 = 0
  let part2 = 0
  ranges.forEach(r => {
    for(let id = r.firstId; id <= r.lastId; id++) {
      if (isIdInvalid1(id)) {
        // console.log(`Invalid ID (part 1): ${id}`)
        part1 += id
      }
      if (isIdInvalid2(id)) {
        // console.log(`Invalid ID (part 2): ${id}`)
        part2 += id
      }
    }
  })
  return { part1, part2 }
}
