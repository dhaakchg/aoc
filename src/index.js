const { getYearDirs } = require('./util/inputUtils')

const yearsWithSolutions = getYearDirs(__dirname)
const yearArgs = process.argv.slice(2)
const toRun = yearArgs.length > 0 ? yearsWithSolutions.filter(year => yearArgs.includes(year)) : yearsWithSolutions
toRun.forEach(dir => {
    const yearSolution = require(`./${dir}`)
    const results = yearSolution()
    console.log(results)
})