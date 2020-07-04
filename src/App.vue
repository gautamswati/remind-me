<template>
    <div id="app">
        <h2 class="text-white text-center tracking-wide text-4xl mb-5">
            Remind Me<span class="text-blue-300">! </span> 
		</h2>
		<form action="#" class="flex max-w-xl border border-white rounded-md flex-col p-10 space-y-3 justify-center m-auto">
			<div class="flex space-x-5 items-baseline">
				<label class="text-blue-300 text-2xl" for="message">To </label>
				<input class="bg-transparent text-white border-white border-b w-full" 
					type="text" name="message" id="message" v-model="message" autofocus
                >
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
				<button class="rounded-lg text-white shadow-lg px-5 py-2 bg-blue-800 ml-auto hover:bg-blue-600" type="button"
					v-on:click="saveReminder">Save
				</button>
			</div>
			<p class="text-red-600 text-xs mt-2">{{ error }}</p>
		</form>
		<div class="max-w-xl p-10 m-auto">
			<ul>
				<li v-for="reminder in reminders" :key="reminder.id">
					<Reminder :reminder="reminder" v-on:delete="deleteReminder"></Reminder>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import Reminder from './components/Reminder'
import {addJob, deleteJob} from './jobs'; 

export default {
	name: 'App',
	data() {
		return {
		date: '',
		time: '',
		message: '',
		reminders: [],
		error: '',
		}
	},
	components: {
		Reminder,
	},
	methods: {
		saveReminder(e) {
			e.preventDefault();

			if(! this.validateForm())
				return;

			const id = this.reminders.length ?
				this.reminders[this.reminders.length - 1].id + 1: 1;
			const newReminder = {
				"id": id, 
				"date" : this.date,
				"time": this.time,
				"message": this.message
			}
			this.reminders.unshift(newReminder);
			localStorage.reminders = JSON.stringify(this.reminders);
			this.message = this.date = this.time = '';
			addJob(newReminder);
		},
		deleteReminder(id) {
			this.reminders = this.reminders.filter(reminder => reminder.id != id);
			localStorage.reminders = JSON.stringify(this.reminders);
			deleteJob(id);
		},
		validateForm() {
			if (this.date == '' || this.time == '' || this.message == '') {
				this.error = "All fields are required";
				return false;
			}
		
			const now = new Date();
			const inputTime = this.time.split(':');
			const inputDate = this.date.split('-');
			inputDate[1] = inputDate[1] === '01' ? '0' : inputDate[1] - 1;
            const dateFromInput = new Date(inputDate[0], inputDate[1], inputDate[2], inputTime[0], inputTime[1]);
            
			if( dateFromInput < now ) {
				this.error = "Invalid Date/ Time combination";
				return false;
			}

			return true;
		}
	},
	watch: {
		message(value) {
			if(value != '')
				this.error = '';
		},
		date(value) {
			if(value != '')
				this.error = '';
		},
		time(value) {
			if(value != '')
				this.error = '';
		}
	},
	mounted() {
		this.reminders = JSON.parse(localStorage.reminders) || [];
	}
}
</script>

<style src="./assets/tailwind.css">
