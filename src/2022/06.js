module.exports = (input, step) => {
  const msgBuffer = input.trim()
  let marker = 0
  // console.log('Input length:', input.length, 'Stop:', input.length - step)
  for(let i = 0; i < input.length - step; i++) {
    marker = i + step
    let msgSlice = new Set(msgBuffer.slice(i, marker))
    let allUnique = msgSlice.size === step
    // console.log('i:', i, 'Slice:', msgSlice, 'Set size:', msgSlice.size, 'Marker:', marker, 'All unique?:', allUnique)
    if(allUnique) {
      break
    }
  }
  return marker
}
