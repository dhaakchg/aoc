const { getRawInput, getSolutions, toRunPaddedSet, requirePaddedModule } = require('../util/inputUtils')
const path = require('path')
const year = path.basename(__dirname)
const allSolutions = getSolutions(__dirname)

module.exports = (daysToRun) => {
    const solutionsToRun = toRunPaddedSet(daysToRun, allSolutions)
    solutionsToRun.forEach(solutionDay => {
        const solutionModule = requirePaddedModule(__dirname, solutionDay)
        console.log(`Day ${solutionDay}: `, solutionModule(getRawInput(year, solutionDay)))
    })
}