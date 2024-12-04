const part1 = (input) => {
    return [...input.matchAll(/mul\((?<lhs>[0-9]{1,3}),(?<rhs>[0-9]{1,3})\)/g)]
      .map(match => match.groups)
      .map(({lhs, rhs}) => [parseInt(lhs), parseInt(rhs)])
      .map(([lhs, rhs]) => lhs * rhs).reduce((a, c) => a + c)
}

const part2 = (input) => {
    let enabled = true
    const operations = [...input.matchAll(/(mul\((?<lhs>[0-9]{1,3}),(?<rhs>[0-9]{1,3})\)|(?<on>do\(\))|(?<off>don't\(\)))/g)].map(match => match.groups)
    let sum = 0
    operations.forEach(({lhs, rhs, on, off}) => {
        if(on) {
            enabled = true
        } else if(off) {
            enabled = false
        } else if(enabled && lhs && rhs) {
            sum += parseInt(lhs) * parseInt(rhs)
        }
    })
    return sum
}

module.exports = (input) => {
    return { part1: part1(input), part2: part2(input) }
}
