# vaccine-notifier
mailer service when Vaccine is available 

# Update the Following things:

>user - Gmail Username <br/>
>pass - Gmail Password 

```javascript
 var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'gmail-id',
      pass: 'gmail-password'
    }
  })
```

>from - your Gmail Id <br/>
>to - respective users you want to send
     
```javascript
var mailOptions = {
    from: '<sender_email_address>',
    to: '<to_email_address>',
    subject: 'Sending Available Vacination center for 18+ years',
    html: mailData
  }
```
# running the Script:

1. can be execute manually using
node index.js

2. can configure it has a crontab
>*/5 * * * * node index.js >> whathappened.log

it will execute every 5 mins and respective generated log will be written in the .log file

Sample :


![image](https://user-images.githubusercontent.com/26027206/118491890-1188d400-b73d-11eb-930e-8cd9659a795a.png)

