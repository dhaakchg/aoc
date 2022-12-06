module.exports = {
  range: function (start, stop, step = 1) { return Array.from({ length: (stop - start) / step + 1}, (_, i) => start + (i * step)) }


}
