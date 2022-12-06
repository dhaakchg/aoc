const { splitClean } = require('../util/inputUtils');

const didIWin = (theirWeapon, myWeapon) => {
  let result
  if (theirWeapon === myWeapon) {
    result = null
  } else if (theirWeapon === 'Rock') {
    result = myWeapon !== 'Scissors'
  } else if (theirWeapon === 'Paper') {
    result = myWeapon !== 'Rock'
  } else if (theirWeapon === 'Scissors') {
    result = myWeapon !== 'Paper'
  }
  return result
}

const chooseMove = (theirWeapon, desired) => {
  let result
  if(desired === 'lose') {
    if(theirWeapon === 'Rock') {
      result = 'Scissors'
    } else if (theirWeapon === 'Paper' ) {
      result = 'Rock'
    } else {
      result = 'Paper'
    }
  } else if (desired === 'win' ) {
    if (theirWeapon === 'Rock') {
      result = 'Paper'
    } else if (theirWeapon === 'Paper') {
      result = 'Scissors'
    } else {
      result = 'Rock'
    }
  } else {
    result = theirWeapon
  }
  return result
}

const scoreFight = (result) => {
  if (result === null) {
    return 3
  } else if (result === true) {
    return 6
  } else {
    return 0
  }
}

module.exports = (input) => {
  const oppMoves = {
    'A': {name: 'Rock'},
    'B': {name: 'Paper'},
    'C': {name: 'Scissors'}
  }
  const myMoves = {
    'X': {name: 'Rock', score: 1, chooseResult: 'lose'},
    'Y': {name: 'Paper', score: 2, chooseResult: 'draw'},
    'Z': {name: 'Scissors', score: 3, chooseResult: 'win'}
  }

  const part1 = splitClean(input).map(round => {
    const [theirs, mine] = round.split(' ')
    const fightResult = didIWin(oppMoves[theirs].name, myMoves[mine].name)
    let roundScore = myMoves[mine].score
    return roundScore + scoreFight(fightResult)
  }).reduce((a, c) => a + c)

  const part2 = splitClean(input).map(round => {
    const [theirs, mine] = round.split(' ')
    const myWeapon = chooseMove(oppMoves[theirs].name, myMoves[mine].chooseResult)
    const fightResult = didIWin(oppMoves[theirs].name, myWeapon)
    let roundScore = Object.values(myMoves).filter(e => e.name === myWeapon).map(e => e.score).reduce((a, s) => a + s, 0)
    return roundScore + scoreFight(fightResult)
  }).reduce((a, c) => a + c)
  return [part1, part2]
}
