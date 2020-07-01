<template>
  <div id="app">
    <h2 class="text-white text-center tracking-wide text-4xl mb-5">
      Remind Me<span class="text-blue-300">! </span> </h2>
    <form action="" class="flex max-w-xl border border-white rounded-md flex-col p-10 space-y-3 justify-center m-auto">
        <div class="flex space-x-5 items-baseline">
          <label class="text-blue-300 text-2xl" for="message">To </label>
          <input class="bg-transparent text-white border-white border-b w-full" 
            type="text" name="message" id="message" v-model="message" autofocus>
        </div>
        <div class="flex">
          <div class="flex space-x-4 w-1/2">
            <label class="text-blue-300 text-2xl" for="date">On </label>
            <input class="bg-transparent text-white border-white border-b" type="date" 
              name="date" id="date" v-model="date">
          </div>
          <div class="flex space-x-4 mx-5 w-1/2">
            <label class="text-blue-300 text-2xl" for="time">At </label>
            <input class="bg-transparent text-white border-white border-b" 
              type="time" name="time" id="time" v-model="time">
          </div>
          <button class="rounded-lg text-white shadow-lg px-5 py-2 bg-blue-800 ml-auto" type="button"
            v-on:click="saveReminder">Save</button>
        </div>
    </form>
    <div class="max-w-xl p-10 m-auto">
      <ul>
        <li v-for="reminder in reminders" :key="reminder.id" class="flex space-y-2 items-baseline hover:bg-gray-700 px-4 py-1 rounded-sm">
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
        </li>
      </ul>
    </div>
    <HelloWorld/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import { Trash2Icon, ClockIcon } from 'vue-feather-icons'

export default {
  name: 'App',
  data() {
    return {
      date: '',
      time: '',
      message: '',
      reminders: [],
    }
  },
  components: {
    HelloWorld,
    Trash2Icon,
    ClockIcon 
  },
  methods: {
    saveReminder(e) {
      e.preventDefault();
      const id = this.reminders.length ?
        this.reminders[this.reminders.length - 1].id + 1: 1;
      this.reminders.push({
        "id": id, 
        "date" : this.date,
        "time": this.time,
        "message": this.message
      });
      localStorage.reminders = JSON.stringify(this.reminders);
    },
    deleteReminder(id) {
      this.reminders = this.reminders.filter(item => item.id != id);
      localStorage.reminders = JSON.stringify(this.reminders);
    },
    getDate(dateString) {
      console.log(dateString);
      return new Date(dateString).toLocaleDateString('en-GB');
    }
  },
  mounted() {
    this.reminders = JSON.parse(localStorage.reminders) || [];
  },
}
</script>

<style src="./assets/tailwind.css">
