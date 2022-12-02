const fs = require('fs')
const data = fs.readFileSync('../../input/2022/dec-01.txt', 'utf8').split(/\n\s*\n/);
console.dir(data, {'maxArrayLength': null})
let bestElf = 0
let highestCalories = 0
let elves = {}
data.forEach((value, index) => {
    let food = value.trim().split('\n').map(food => Number.parseInt(food)).reduce((prev, curr) => prev + curr)
    elves[index] = food
    if(food > highestCalories) {
        highestCalories = food
        bestElf = index
    }
    console.log("Current Elf:", index, "Current Calories:", food, "Best Elf:", bestElf, "Best Food:", highestCalories)
})

console.log(Object.values(elves).sort((a, b) => b - a).slice(0,3).reduce((p, c) => p + c))
