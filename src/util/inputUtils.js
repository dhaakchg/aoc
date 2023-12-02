const path = require('path');
const fs = require('fs');
const INPUT_DIR = path.join(__dirname, '..', '..', 'input');

const pathToFile = (year, day) => {
  day = String(day).padStart(2, '0')
  return path.join(INPUT_DIR, String(year), `${day}.txt`)
};

const requirePaddedModule = (dir, day) => {
    return require(path.join(dir, String(day).padStart(2, '0')))
}

const getRawInput = (year, day) => {
  return fs.readFileSync(pathToFile(year, day), 'utf8')
}

const splitClean = raw => {
  return raw.replaceAll('\r', '').split('\n').map(chunk => chunk.trim()).filter(chunk => chunk)
}

const getYearDirs = (dirPath, desiredYearsSet) => {
    const allYearsWithDir = fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory() && dirent.name.match(/\d\d\d\d/))
        .map(dirent => parseInt(dirent.name))

    if(desiredYearsSet.size > 0) {
        return new Set([...allYearsWithDir].filter(y => desiredYearsSet.has(y)))
    } else {
        return allYearsWithDir
    }
}

const getSolutions = dirPath => {
    return new Set(
        fs.readdirSync(dirPath, { withFileTypes: true })
        .filter(dirent => dirent.isFile() && dirent.name.match(/\d\d\.js/))
        .map(dirent => parseInt(path.basename(dirent.name)))
    )
}

const toRunPaddedSet = (desiredDaysSet, allSolutionSet) => {
    if(desiredDaysSet.size > 0) {
        return new Set([...allSolutionSet].filter(s => desiredDaysSet.has(s)))
    } else {
        return allSolutionSet
    }
}

module.exports = { splitClean, getRawInput, requirePaddedModule, getYearDirs, getSolutions, toRunPaddedSet }
