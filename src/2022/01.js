module.exports = (input) => {
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
  })
  const top3 = Object.values(elves).sort((a, b) => b - a).slice(0, 3).reduce((p, c) => p + c)
  return [highestCalories, top3]
}
