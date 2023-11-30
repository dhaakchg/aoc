const { getRawInput } = require('../util/inputUtils')
const path = require('path')
const year = path.basename(__dirname)
const day01 = require('./01')

module.exports = (daysToRun = []) => {
    daysToRun.forEach(() => {

    })
    console.log('Day 01: ', day01(getRawInput(year, 1)))
}