const fs = require('fs')
const Promise = require('../../promise')

const readFile = Promise.wrap(fs.readFile)

readFile('./file1.txt')
  .then((data) => {
    console.log('file1.txt:', data.toString())
    return readFile('./file2.txt')
  })
  .then((data) => {
    console.log('file2.txt:', data.toString())
  })
  .catch((err) => {
    console.log(err)
  })
