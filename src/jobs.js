// export default addJob;
const cronJob = require('cron').CronJob;
const notifier = require('node-notifier');

const jobs = [];

function addJob(reminder) {
    const date = reminder.date.split('-');
    const time = reminder.time.split(':');
    date[1] = date[1] === '01' ? '0' : date[1] - 1;
    jobs.push(
        new cronJob( `00 ${time[1]} ${time[0]} ${date[2]} ${date[1]} *`, function() {
            notifier.notify({
                title: "This is a notification",
                message: "Hello, swati"
            })
        }, null, true)
    );
}

export {addJob}; 