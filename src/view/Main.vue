<script setup>
	import { Icon } from '@iconify/vue';
	import { reactive } from 'vue';
	import {
		storageUploadFyles,
		btnLogin,
		signout,
		writeUserData,
		databaseRef,
		database,
		databaseOnValue,
	} from '../fierbase/main.js';

	const store = reactive({
		users: null,
	});

	const users = databaseRef(database, 'users/');
	databaseOnValue(users, (snapshot) => {
		const data = snapshot.val();
		console.log(data, 'data');
		store.users = Object.values(data || {});
	});

	const sendAvatar = async (e) => {
		if (e.target.files[0]) {
			const res = await storageUploadFyles(e.target.files[0]);
			console.log(res, 'res');
		}
	};
</script>

<template>
	<div class="main__data">
		<div btnIcon w-30px ma-0>
			<Icon icon="ic:outline-log-out" size="30px" />
		</div>
		<Icon icon="ic:outline-log-in" size="30px" />
		<img
			:src="store?.users?.[Object.keys(store?.users)[0]]?.photoURL"
			class="logo"
			alt="Аватар"
		/>
		<input type="file" class="input-avatar" @input="sendAvatar" />
	</div>
	<h1 class="">
		{{ store }}
	</h1>
	<div class="fw">
		<button
			class="mr-auto animated animate-tada color-pp"
			title="выйти"
			@click="btnLogin"
		>
			btnLogin
		</button>

		<button hover="op10" transition-900 cursor-pointer @click="signout">
			signout
		</button>
	</div>
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
