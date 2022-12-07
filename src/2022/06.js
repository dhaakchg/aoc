const findMarker = (input, step) => {
  const msgBuffer = input.trim()
  let marker = 0
  for(let i = 0; i < input.length - step; i++) {
    marker = i + step
    let msgSlice = new Set(msgBuffer.slice(i, marker))
    if(msgSlice.size === step) break
  }
  return marker
}

module.exports = (input) => {
  return [findMarker(input, 4), findMarker(input, 14)]
}
