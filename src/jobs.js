const cronJob = require('node-cron');
const {ipcRenderer} = window.require('electron');

let jobs = [];

function addJob(reminder) {
    const date = reminder.date.split('-');
    const time = reminder.time.split(':');

    jobs.push({
            id: reminder.id,
            cb: cronJob.schedule( `00 ${time[1]} ${time[0]} ${date[2]} ${date[1]} *`, function() {
                ipcRenderer.send('notify', reminder.message);
                let updatedStorage = JSON.parse(localStorage.reminders).filter(r => r.id != reminder.id );
                localStorage.reminders = JSON.stringify(updatedStorage);
            }, {scheduled: true})
        }
    );
}

function deleteJob(id) {
    jobs.forEach(job => job.cb.stop());

    jobs = jobs.filter(job => job.id != id);

    jobs.forEach(job => job.cb.start());
}

export { addJob, deleteJob }; 