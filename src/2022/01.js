const getInput = require('../util/getInput')

const input = getInput(2022, 1);
let bestElf = 0
let highestCalories = 0
let elves = {}
input.split(/\n\s*\n/).forEach((value, index) => {
  let food = value.trim().split('\n').map(food => Number.parseInt(food)).reduce((prev, curr) => prev + curr)
  elves[index] = food
  if (food > highestCalories) {
    highestCalories = food
    bestElf = index
  }
  console.log("Current Elf:", index, "Current Calories:", food, "Best Elf:", bestElf, "Best Food:", highestCalories)
})

console.log(Object.values(elves).sort((a, b) => b - a).slice(0, 3).reduce((p, c) => p + c))
