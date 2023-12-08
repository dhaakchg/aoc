module.exports = {
  alphabet: 'abcdefghijklmnopqrstuvwxyz',
  arrayToObject: function (array) { return array.reduce((ac,a) => ({...ac,[a]: a.toString()}),{}) },
  range: function (start, stop, step = 1) { return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step)) }
}
