const path = require('path');
const fs = require("fs");
const INPUT_DIR = path.join(__dirname, '..', '..', 'input');

const pathToFile = (year, day) => {
    day = String(day).padStart(2, '0')
    return path.join(INPUT_DIR, String(year), `${day}.txt`)
};

module.exports = (year, day) => {
    return fs.readFileSync(pathToFile(year, day), 'utf8')
}
