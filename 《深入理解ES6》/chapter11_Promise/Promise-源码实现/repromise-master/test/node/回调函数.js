const fs = require('fs')

fs.readFile('./file1.txt', (err, data) => {
  if (err) {
    console.log(err)
  } else {
    console.log('file1.txt:', data.toString())
    fs.readFile('./file2.txt', (err, data) => {
      if (err) {
        console.log(err)
      } else {
        console.log('file2.txt:', data.toString())
      }
    })
  }
})