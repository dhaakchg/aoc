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

    expect(solution(input)).toEqual({ part1: 2, part2: 0 })
})

test('Day 8 test2', () => {

    const input = `LLR

AAA = (BBB, BBB)
BBB = (AAA, ZZZ)
ZZZ = (ZZZ, ZZZ)`

    expect(solution(input)).toEqual({ part1: 6, part2: 0 })
})

test.skip('Day 8 test3', () => {

    const input = `LR

11A = (11B, XXX)
11B = (XXX, 11Z)
11Z = (11B, XXX)
22A = (22B, XXX)
22B = (22C, 22C)
22C = (22Z, 22Z)
22Z = (22B, 22B)
XXX = (XXX, XXX)`

    expect(solution(input)).toEqual({ part1: 6, part2: 6 })
})