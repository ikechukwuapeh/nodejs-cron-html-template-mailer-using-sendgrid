const CronJob = require('cron').CronJob;
const mailJob = require("./mailJob");


module.exports = function() {
    var jobs = [
        new CronJob({
            cronTime: "00 */5 * * * *", //every five minutes
            onTick: function() {
                mailJob();
            },
            start: false, //don't start immediately
            timeZone: 'America/Los_Angeles'
        }),
    ];
    
    jobs.forEach(function(job) {
        job.start(); //start the jobs
    });
}

//sample CronTimes you can use
// "* * * * *" //every minute
// "*/30 * * * *" //every 30 minutes
// "0 0 * * *" //Daily
// "0 1 * * *" //Every 1AM
// "0 9 * * *" //Every morning at 9AM
// "0 0 * * FRI" //Every friday at midnight


//you can get more from https://crontab.guru/examples.html