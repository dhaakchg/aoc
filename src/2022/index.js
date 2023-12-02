const { getRawInput, getSolutions, toRunPaddedSet, requirePaddedModule } = require('../util/inputUtils')
const path = require('path')
const year = path.basename(__dirname)
const allSolutions = getSolutions(__dirname)

module.exports = (daysToRun) => {
    const solutionsToRun = toRunPaddedSet(daysToRun, allSolutions)
    solutionsToRun.forEach(solutionDay => {
        const solutionModule = requirePaddedModule(__dirname, solutionDay)
        if(solutionDay === 15) {
            console.log(`Day ${solutionDay}: `, solutionModule(getRawInput(year, solutionDay), { yPos: 2000000, bBounds: [0, 4000000]}))
        } else {
            console.log(`Day ${solutionDay}: `, solutionModule(getRawInput(year, solutionDay)))
        }
    })
}