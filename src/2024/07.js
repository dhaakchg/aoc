const { splitClean } = require("../util/inputUtils");
const { permutate } = require("../util/helpers")

const getEquations = (input) => {
    return splitClean(input).map(line => {
        const s = line.split(': ')
        const testValue = parseInt(s[0])
        const operands = s[1].trim().split(' ').map(Number)
        return { testValue, operands }
    })
}

function generatePermutations(operands, operators) {
    const slots = operands.length - 1
    const perms = permutate(operators, slots)
    return perms.map(perm => {
        return operands.reduce((acc, operand, idx) => {
            if(idx === operands.length - 1) return acc.concat([operand])
            return acc.concat([operand, perm[idx]])
        }, [])
    })
}

const evaluate = (equation) => {
    let result = equation[0]
    for(let i = 1; i < equation.length; i += 2) {
        if(equation[i] === '+') {
            result += equation[i + 1]
        } else if(equation[i] === '*') {
            result *= equation[i + 1]
        }
    }
    return result
}

module.exports = (input) => {
    const equations = getEquations(input)

    const part1 = equations
      .map(({ testValue, operands }) => {
          return {
              testValue,
              perms: generatePermutations(operands, ['+', '*']).map(perm => evaluate(perm))
          }
      })
      .filter(({ testValue, perms }) => perms.includes(testValue))
      .reduce((acc, curr) => acc + curr.testValue, 0)

    const part2 = equations
      .map(({ testValue, operands }) => {
          return {
              testValue,
              perms: generatePermutations(operands, ['+', '*', '||'])
          }
      })

    return { part1, part2: 0 }
}
