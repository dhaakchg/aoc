const getOperands = (input) => {
    return [...input.matchAll(/mul\((?<lhs>[0-9]{1,3}),(?<rhs>[0-9]{1,3})\)/g)]
      .map(match => match.groups)
      .map(({lhs, rhs}) => [parseInt(lhs), parseInt(rhs)])
}

const part1 = (input) => {
    return getOperands(input).map(([lhs, rhs]) => lhs * rhs).reduce((a, c) => a + c)
}

module.exports = (input) => {
    return { part1: part1(input) }
}
