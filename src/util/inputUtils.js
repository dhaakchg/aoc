const path = require('path');
const fs = require("fs");
const INPUT_DIR = path.join(__dirname, '..', '..', 'input');

const pathToFile = (year, day) => {
  day = String(day).padStart(2, '0')
  return path.join(INPUT_DIR, String(year), `${day}.txt`)
};

const getRawInput = (year, day) => {
  return fs.readFileSync(pathToFile(year, day), 'utf8')
}

const splitClean = (raw) => {
  return raw.replaceAll('\r', '').split('\n').map(chunk => chunk.trim()).filter(chunk => chunk)
}

module.exports = { splitClean, getRawInput }
