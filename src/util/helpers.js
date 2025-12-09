const Helpers = {
  alphabet: 'abcdefghijklmnopqrstuvwxyz',
  arrayToObject: function (array) { return array.reduce((ac,a) => ({...ac,[a]: a.toString()}),{}) },
  range: function (start, stop, step = 1) { return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step)) },
  gcd: (a, b) => b ? Helpers.gcd(b, a % b) : Math.abs(a),
  lcm: (a, b) => (a * b) / Helpers.gcd(a, b),
  manhattan: (coord1, coord2) => Math.abs(coord1.col - coord2.col) + Math.abs(coord1.row - coord2.row),
  euclideanDistance2d: (pointA, pointB) => Math.sqrt((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2),
  euclideanDistance3d: (pointA, pointB) => Math.sqrt((pointA.x - pointB.x) ** 2 + (pointA.y - pointB.y) ** 2 + (pointA.z - pointB.z) ** 2),
  combinationN: function* combinationN(array, n) {
    if (n === 1) {
      for (const a of array) {
        yield [a];
      }
      return;
    }

    for (let i = 0; i <= array.length - n; i++) {
      for (const c of combinationN(array.slice(i + 1), n - 1)) {
        yield [array[i], ...c];
      }
    }
  },
  permutate: (items, count) => {
    const results = []

    req([])

    return results

    function req(array) {
      if (array.length === count) {
        results.push(array)
        return
      }
      for (const item of items) {
        req(array.concat(item))
      }
    }
  },
  timeFn: (fn, ...fnArgs) => {
    const start = performance.now()
    const fnResult = fn(...fnArgs)
    const fnMs = (performance.now() - start).toFixed(3)
    return { fnResult, fnMs }
  }
}

module.exports = Helpers
