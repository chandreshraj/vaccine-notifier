// Email notification sent once the Vaccine is available
'use strict'

const fs = require('fs')
const nodemailer = require('nodemailer')
const axios = require('axios')
const moment = require('moment')

// let rawdata = fs.readFileSync('data.json')
// let cowinData = JSON.parse(rawdata)
let rawdata
let cowinData
let available = []

async function generateData () {
  let today = moment()
  let dateString = today.format('DD-MM-YYYY')
  let config = {
    method: 'get',
    url: `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByDistrict?district_id=294&date=${dateString}`,
    headers: {
      accept: 'application/json',
      'Accept-Language': 'hi_IN',
      'accept-encoding': 'gzip, deflate, br',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'max-age=0',
      dnt: '1',
      'if-none-match': 'W/"1b98f-vIIY8WreaighBJho0tLBco3thWw"',
      'sec-ch-ua':
        '" Not A;Brand";v="99", "Chromium";v="90", "Google Chrome";v="90"',
      'sec-ch-ua-mobile': '?0',
      'sec-fetch-dest': 'document',
      'sec-fetch-mode': 'navigate',
      'sec-fetch-site': 'none',
      'sec-fetch-user': '?1',
      'upgrade-insecure-requests': '1',
      'user-agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.93 Safari/537.36'
    }
  }
  console.log(config)
  rawdata = await axios(config)
  cowinData = rawdata.data
  for (let i = 0; i < cowinData.centers.length; i++) {
    let center = cowinData.centers[i]
    if (center.sessions && center.sessions.length > 0) {
      for (let j = 0; j < center.sessions.length; j++) {
        let session = center.sessions[j]
        if (
          session &&
          session.min_age_limit == 18 &&
          session.available_capacity > 0
        ) {
          available.push(
            `<tr><td>${center.name}</td><td>${center.pincode}</td><td>${session.date}</td><td>${session.available_capacity}</td>`
          )
        }
      }
    }
  }
}

function sendMail () {
  let mailData = `<html>
        <style>
            .styled-table {
                border-collapse: collapse;
                margin: 25px 0;
                font-size: 0.9em;
                font-family: sans-serif;
                min-width: 400px;
                box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
            }
            .styled-table th,
            .styled-table td {
                padding: 12px 15px;
            }
            .styled-table tbody tr {
                border-bottom: 1px solid #dddddd;
            }
            
            .styled-table thead tr {
                background-color: #009879;
                color: #ffffff;
                text-align: left;
            }
            .styled-table tbody tr:nth-of-type(even) {
                background-color: #f3f3f3;
            }
            
            .styled-table tbody tr:last-of-type {
                border-bottom: 2px solid #009879;
            }
            .styled-table tbody tr.active-row {
                font-weight: bold;
                color: #009879;
            }
        </style>
        <body>
            <table class="styled-table">
            <thead>
            <tr>
            <th>Center Name</th><th>Pincode</th><th>Date</th><th>Available Capacity</th>
            </tr>
            </thead>
            ${available.toString().replace(/,/g, '')}
            </table>
        </body>
    </html>`
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gmail-id',
      pass: 'gmail-password'
    }
  })

  var mailOptions = {
    from: '<sender_email_address>',
    to: '<to_email_address>',
    subject: 'Sending Available Vacination center for 18+ years',
    html: mailData
  }

  console.log(mailData)
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error)
    } else {
      console.log(
        `${Date()} - Availablility is Sent over Mail - ${info.response}`
      )
    }
  })
}

async function run () {
  await generateData()
  console.log(`CenterName \t Pincode \t Date \t Available capacity`)
  console.log(available)
  if (available.length > 0) {
    await sendMail()
  } else {
    console.log(`${Date()} - There is no Availablility of Vaccine now`)
  }
}

run()
