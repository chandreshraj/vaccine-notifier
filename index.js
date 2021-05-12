// Email notification sent once the Vaccine is available
'use strict'

const fs = require('fs')

let rawdata = fs.readFileSync('data.json')
let student = JSON.parse(rawdata)
console.log(JSON.parse(student))
