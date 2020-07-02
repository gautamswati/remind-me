<template>
    <div  class="flex items-baseline space-y-2 hover:bg-gray-700 px-4 py-1 rounded-sm">
        <div>
            <div class="flex items-baseline ">
                <clock-icon size="1x" class="text-blue-300"></clock-icon> 
                <p class="text-md tracking-wide text-gray-200 ml-3"> {{reminder.message}} </p>
            </div>
            <div class="flex">
                <p class="text-sm font-light tracking-wide text-gray-100 ml-5 space-y-1">
                    <span class="mx-3" v-text="getDate(reminder.date)"></span>  
                    <span class="mx-3">{{ reminder.time }}</span> 
                </p>
            </div>
        </div>
        <button class="rounded-sm bg-red-500 shadow-lg p-1 text-white ml-auto transition duration-300 ease-in-out transform hover:translate-x-1" type="button"
          v-on:click="$emit('delete', reminder.id)">
          <trash-2-icon size="1x"></trash-2-icon> 
        </button>
    </div>
</template>

<script>
import { Trash2Icon, ClockIcon } from 'vue-feather-icons'

export default {
    name: 'Reminder',
    props: ['reminder'],
    components: {
        Trash2Icon,
        ClockIcon 
    },
    methods: {
        getDate(dateString) {
            return new Date(dateString).toLocaleDateString('en-GB');
        },
    }
}
</script>