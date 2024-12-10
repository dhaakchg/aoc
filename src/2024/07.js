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

const eval2 = (equation) => {
    const stack = [...equation]
    stack.reverse()

    while(stack.length > 1) {
        const lhs = stack.pop()
        const operator = stack.pop()
        const rhs = stack.pop()
        if(operator === '+') {
            stack.push(lhs + rhs)
        } else if (operator === '*') {
            stack.push(lhs * rhs)
        } else if (operator === '||') {
            stack.push(Number(`${lhs}${rhs}`))
        }
    }
    return stack[0]
}

module.exports = (input) => {
    const equations = getEquations(input)

    const part1 = equations
      .map(({ testValue, operands }) => {
          return {
              testValue,
              perms: generatePermutations(operands, ['+', '*']).map(perm => eval2(perm))
          }
      })
      .filter(({ testValue, perms }) => perms.includes(testValue))
      .reduce((acc, curr) => acc + curr.testValue, 0)

    const part2 = equations
      .map(({ testValue, operands }) => {
          return {
              testValue,
              perms: generatePermutations(operands, ['+', '*', '||']).map(perm => eval2(perm))
          }
      })
      .filter(({ testValue, perms }) => perms.includes(testValue))
      .reduce((acc, curr) => acc + curr.testValue, 0)

    return { part1, part2 }
}
