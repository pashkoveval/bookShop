<script setup>
	import { RouterView } from 'vue-router';
</script>

<template>
	<RouterView v-slot="{ Component, route }">
		<Transition
			:name="route?.meta?.transitionName || 'fade-scale'"
			mode="out-in"
		>
			<KeepAlive>
				<main :key="route.name" class="main">
					<component :is="Component" />
				</main>
			</KeepAlive>
		</Transition>
	</RouterView>
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
