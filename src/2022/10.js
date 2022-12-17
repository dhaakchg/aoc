const SimpleCpu = require('../util/simple-cpu')
const {splitClean} = require("../util/inputUtils");

module.exports = input => {
  const cpu = new SimpleCpu()
  cpu.runProgram(splitClean(input))
  return [cpu.analyzeSignal(), cpu.crt()]
}
