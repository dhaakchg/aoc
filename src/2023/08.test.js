const solution = require('./08')
test('Day 8 test1', () => {

    const input = `RL

AAA = (BBB, CCC)
BBB = (DDD, EEE)
CCC = (ZZZ, GGG)
DDD = (DDD, DDD)
EEE = (EEE, EEE)
GGG = (GGG, GGG)
ZZZ = (ZZZ, ZZZ)`

    expect(solution(input)).toEqual({ part1: 6, part2: 20 })
})

test('Day 8 test2', () => {

    const input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`

    expect(solution(input)).toEqual({ part1: 2, part2: 20 })
})