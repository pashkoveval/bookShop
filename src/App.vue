<script setup>
	import { reactive } from 'vue';
	import {
		uploadFyles,
		btnLogin,
		signout,
		writeUserData,
		fbref,
		db,
		onValue,
	} from './fierbase/index.js';

	const users = fbref(db, 'users/');
	onValue(users, (snapshot) => {
		const data = snapshot.val();
		console.log(data, 'data');
		store.users = data;
	});

	const store = reactive({
		users: null,
	});

	const sendAvatar = async (e) => {
		if (e.target.files[0]) {
			const res = await uploadFyles(e.target.files[0]);
			console.log(res, 'res');
		}
	};
</script>

<template>
	<div>
		<img
			:src="store?.users?.[Object.keys(store?.users)[0]]?.photoURL"
			class="logo"
			alt="Аватар"
		/>
		<input type="file" class="input-avatar" @input="sendAvatar" />
	</div>
	{{ store }}
	<button @click="btnLogin">btnLogin</button>
	<button @click="signout">signout</button>
	<button @click="writeUserData('test', { test: 'test' })">Создать</button>
</template>

<style scoped>
	.logo {
		height: 6em;
		padding: 1.5em;
		will-change: filter;
		transition: filter 300ms;
	}
	.logo:hover {
		filter: drop-shadow(0 0 2em #646cffaa);
	}
	.logo.vue:hover {
		filter: drop-shadow(0 0 2em #42b883aa);
	}
</style>
