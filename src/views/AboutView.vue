<template>
	<h1>About View</h1>
	<p>{{ $route.path }}</p>
	<button class="btn btn-primary" @click="$router.push('/')">
		Home으로 이동
	</button>
</template>

<script setup></script>

<style lang="scss" scoped></style>
