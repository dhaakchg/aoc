const {range} = require('../util/helpers'
)
module.exports = (input) => {
  const msgBuffer = input.trim()
  const step = 4
  let part1marker = 0
  console.log('Input length:', input.length, 'Stop:', input.length - step)
  for(let i = 0; i < input.length - step; i++) {
    part1marker = i + step
    let msgSlice = new Set(msgBuffer.slice(i, part1marker))
    let allUnique = msgSlice.size === step
    console.log('i:', i, 'Slice:', msgSlice, 'Set size:', msgSlice.size, 'Marker:', part1marker, 'All unique?:', allUnique)
    if(allUnique) {
      break
    }
  }
  return part1marker
}
