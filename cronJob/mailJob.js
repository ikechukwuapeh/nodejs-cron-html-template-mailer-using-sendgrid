const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');
const { reject } = require('bluebird');
dotenv.config();
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
EmailTemplate = require('email-templates').EmailTemplate,
path = require('path')
Promise = require('bluebird')
const Fs = require('fs');
const CsvReadableStream = require('csv-reader');


//Sends the email with the specified parameters
function sendEmail(email, subject, html){
    const msg ={
        to: email,
        from : process.env.SENDGRID_EMAIL,
        subject,
        html
    };
    sgMail.send(msg).then((sent) => {
        console.log("success");
    })
    .catch(error =>{
        console.log("failed");
    })
}

//Loads the template from the template folder with the specified name and parses it to the handlebar engine for proper templating with the specified data
function loadTemplate (templateName, contexts) {
    let template = new EmailTemplate(path.join(__dirname, 'templates', templateName));
    return Promise.all(contexts.map((context) => {
        return new Promise((resolve, reject) => {
            template.render(context, (err, result) => {
                if (err) reject(err);
                else resolve({
                    email: result,
                    context
                });
            });
        });
    }));
}

module.exports = function(){
    //Load the csv file containing the names and email addresses of the people you wish to send the mails to
    let inputStream = Fs.createReadStream('data.csv', 'utf8');
 
    inputStream
        .pipe(new CsvReadableStream({ parseNumbers: true, parseBooleans: true, trim: true }))
        .on('data', function (row) {
            
            //calls the loadTemplate function, and parses the name and email addresses as parameters
            loadTemplate('../../templates/mailtemplate',[{name: row[0], email:row[1]}]).then((results) => {
                return Promise.all(results.map((result) => {
                    sendEmail(result.context.email, result.email.subject, result.email.html);
                }))
            }
        )
    });
};
