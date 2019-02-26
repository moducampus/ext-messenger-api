exports.next = done => () => new Promise((resolve) => {
  resolve()
  done()
})
