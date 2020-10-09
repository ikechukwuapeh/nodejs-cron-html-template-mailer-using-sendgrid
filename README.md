# nodejs-cron-mailer-using-sendgrid

This sends out HTML templated mails to the emails you specify ind the data.csv file

To get Started, 
1. clone the repo
2. npm install
3. Open the .env file and change the api key to your sendgrid.net api key. Also specify the email you wish to send the mails as
4. You can change the intervals at which the mails are sent from the cronRunner.js file by changing the cronTime
5. Sample cronTimes can be seen at the bottom of the cronRunner.js file

### To start, 
npm start