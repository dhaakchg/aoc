const {splitClean} = require("../util/inputUtils");

const getReports = (input) => {
    return splitClean(input).map(line => line.split(' ').map(Number))
}

const reportSafe = (report) => {
    let safe = false
    if ( report[0] === report[1] ) return safe // if the first two values are the same, the report is unsafe

    const seed = report[0] > report[1] ? 'dec' : 'inc'

    let levels = []
    for (let i = 0; i < report.length - 1; i++) {
        levels.push(levelSafe(report[i], report[i + 1], seed))
    }
    return !levels.includes(false)
}

const processDampedReport = (report) => {
    if (reportSafe(report)) return true // if already safe, don't process
    const permutations = []
    for( let i = 0; i < report.length; i++) {
        permutations.push(reportSafe(report.toSpliced(i, 1)))
    }
    return permutations.includes(true)
}

const levelSafe = (a, b, dir) => {
    const diff = a - b
    if (Math.abs(diff) > 3 || diff === 0) return false
    if (dir === 'inc' && b < a ) return false
    return !(dir === 'dec' && b > a);
}

module.exports = (input) => {
    const part1 = getReports(input).map(report => reportSafe(report)).filter(report => report).length
    const part2 = getReports(input).map(report => processDampedReport(report)).filter(report => report).length
    return { part1, part2 }
}
