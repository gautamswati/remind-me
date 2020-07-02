<template>
    <div  class="flex space-y-2 items-baseline hover:bg-gray-700 px-4 py-1 rounded-sm">
        <clock-icon size="1x" class="text-blue-300"></clock-icon> 
        <p class="text-md tracking-wide text-white ml-3 space-y-1">
            <span class="mx-3" v-text="getDate(reminder.date)"></span>  
            <span class="mx-3">{{ reminder.time }}</span> 
            <span class="mx-3">{{reminder.message}}</span> 
        </p>
        <button class="rounded-sm bg-red-500 shadow-lg p-1 text-white ml-auto transition duration-300 ease-in-out transform hover:translate-x-1" type="button"
          v-on:click="deleteReminder(reminder.id)">
          <trash-2-icon size="1x"></trash-2-icon> 
        </button>
    </div>
</template>

<script>
import {deleteJob} from '../jobs'; 
import { Trash2Icon, ClockIcon } from 'vue-feather-icons'

export default {
    name: 'Reminder',
    props: ['reminder'],
    components: {
        Trash2Icon,
        ClockIcon 
    },
    methods: {
        deleteReminder(id) {
            this.reminders = this.reminders.filter(item => item.id != id);
            localStorage.reminders = JSON.stringify(this.reminders);
            deleteJob(id);
        },
        getDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-GB');
        }
    },
    mounted() {
        console.log(this.reminder);
    }
}
</script>