const cronJob = require('cron').CronJob;
const {ipcRenderer} = window.require('electron');

let jobs = [];

function addJob(reminder) {
    const date = reminder.date.split('-');
    const time = reminder.time.split(':');
    date[1] = date[1] === '01' ? '0' : date[1] - 1;

    jobs.push({
            id: reminder.id,
            cb: new cronJob( `00 ${time[1]} ${time[0]} ${date[2]} ${date[1]} *`, function() {
                ipcRenderer.send('notify', reminder.message);
                let updatedStorage = JSON.parse(localStorage.reminders).filter(r => r.id != reminder.id );
                localStorage.reminders = JSON.stringify(updatedStorage);
            }, null, true)
        }
    );
}

function deleteJob(id) {
    jobs.forEach(job => job.cb.stop());

    jobs = jobs.filter(job => job.id != id);

    jobs.forEach(job => job.cb.start());
}

export { addJob, deleteJob }; 