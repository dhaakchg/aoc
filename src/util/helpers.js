const Helpers = {
  alphabet: 'abcdefghijklmnopqrstuvwxyz',
  arrayToObject: function (array) { return array.reduce((ac,a) => ({...ac,[a]: a.toString()}),{}) },
  range: function (start, stop, step = 1) { return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step)) },
  gcd: (a, b) => b ? Helpers.gcd(b, a % b) : Math.abs(a),
  lcm: (a, b) => (a * b) / Helpers.gcd(a, b),
}

module.exports = Helpers