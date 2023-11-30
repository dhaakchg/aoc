const { getYearDirs } = require('./util/inputUtils')

const argv = process.argv.slice(2).map(arg => parseInt(arg))
const yearArgs = new Set(argv.filter(arg => arg > 25))
const daysArgs = new Set(argv.filter(arg => arg >= 1 && arg <= 25))
const yearsToRun = getYearDirs(__dirname, yearArgs)

console.log(`Running years: ${[...yearsToRun]} and days: ${[...daysArgs]}`)
yearsToRun.forEach(dir => {
    const yearSolution = require(`./${dir}`)
    const results = yearSolution(daysArgs)
    console.log(results)
})