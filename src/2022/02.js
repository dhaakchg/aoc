const {splitClean} = require("../util/inputUtils");
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



module.exports = (input) => {
  let totalScore = 0
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

  splitClean(input).forEach((round, index) => {
    const [theirs, mine] = round.split(' ')
    const myWeapon = chooseMove(oppMoves[theirs].name, myMoves[mine].chooseResult)
    // const fightResult = didIWin(oppMoves[theirs].name, myMoves[mine].name)
    const fightResult = didIWin(oppMoves[theirs].name, myWeapon)
    // let roundScore = myMoves[mine].score
    let roundScore = Object.values(myMoves).filter(e => e.name === myWeapon).map(e => e.score).reduce((a, s) => a + s, 0)
    if (fightResult === null) {
      roundScore += 3
    } else if (fightResult === true) {
      roundScore += 6
    }
    totalScore += roundScore
  })
  return totalScore
}
