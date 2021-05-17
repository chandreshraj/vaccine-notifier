# vaccine-notifier
mailer service when Vaccine is available 

Update the Following things:
1 -> 
     user - Gmail Username 
     pass - Gmail Password

 var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gmail-id',
      pass: 'gmail-password'
    }
  })
  
2 -> 
     from - your Gmail Id
     to - respective users you want to send
var mailOptions = {
    from: '<sender_email_address>',
    to: '<to_email_address>',
    subject: 'Sending Available Vacination center for 18+ years',
    html: mailData
  }

#running the Script:

1. can be execute manually using
node index.js

2. can configure it has a crontab
#cowin notifier
*/5 * * * * node index.js >> whathappened.log

it will execute every 5 mins and respective generated log will be written in the .log file
