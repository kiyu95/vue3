<template>
	<h1>Home Page</h1>
	<p>{{ $route.path }}</p>
	<!-- route: 현재 활성 라우트 정보에 접근할 수 있다.
	Options API: this.$route
	Composition API: useRoute()
	template: $rout
	-->

	<button class="btn btn-primary" @click="goAboutPage">About으로 이동</button>
	<!-- router: 라우터 인스턴스로 JavaScript에서 다른 페이지(컴포넌트)로 이동할 수 있다.
	Options API: this.$router
	Composition API: useRouter()
	template: $router
	-->
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
console.log('route.path: ', route.path);

const router = useRouter();
const goAboutPage = () => {
	router.push('/about');
};
</script>

<style lang="scss" scoped></style>
