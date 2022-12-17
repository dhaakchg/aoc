const {range} = require("./helpers");

class SimpleCpu {
  INITIAL_CYCLE = 20
  SIGNAL_CYCLE = 40

  constructor() {
    this.X = 1
    this.cycles = 0
    this.signal = []
  }

  tick() {
    this.signal.push(this.X)
    this.cycles += 1
  }

  noop() {
    this.tick()
  }

  addx(V) {
    const value = Number.parseInt(V)
    this.tick()
    this.tick()
    this.X += value
  }

  runProgram(input) {
    input.forEach(instruction => {
      const [cmd, val] = instruction.split(' ')
      if(cmd === 'noop') {
        this.noop()
      } else if(cmd === 'addx') {
        this.addx(val)
      }
    })
    this.signal.push(this.X)
  }

  analyzeSignal() {
    const interestingSignals = [this.INITIAL_CYCLE].concat(range(60, 220, this.SIGNAL_CYCLE))
    return interestingSignals.map(cycle => this.signal[cycle - 1] * cycle).reduce((a, c) => a + c)
  }
}

module.exports = SimpleCpu
