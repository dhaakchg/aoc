const solution = require('./11')
const primerp1 = `aaa: you hhh
you: bbb ccc
bbb: ddd eee
ccc: ddd eee fff
ddd: ggg
eee: out
fff: out
ggg: out
hhh: ccc fff iii
iii: out`

test('Day 11 p1', () => {
    expect(solution(primerp1)).toEqual({ part1: 5, part2: 0 })
})

const primerp2 = `svr: aaa bbb
aaa: fft
fft: ccc
bbb: tty
tty: ccc
ccc: ddd eee
ddd: hub
hub: fff
eee: dac
dac: fff
fff: ggg hhh
ggg: out
hhh: out`

test('Day 11 p2', () => {
  expect(solution(primerp2)).toEqual({ part1: 0, part2: 2 })
})
