<template>
	<div>
		<h2>{{ post.title }}</h2>
		<p>{{ post.content }}</p>
		<p class="text-muted">{{ post.createdAt }}</p>
		<hr class="my-4" />
		<div class="row g-2">
			<div class="col-auto">
				<button class="btn btn-outline-dark">이전글</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-dark">다음글</button>
			</div>
			<div class="col-auto me-auto"></div>
			<div class="col-auto">
				<button class="btn btn-outline-dark" @click="goListPage">목록</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-primary" @click="goEditPage">
					수정
				</button>
			</div>
			<div class="col-auto">
				<button class="btn btn-outline-danger" @click="remove">삭제</button>
			</div>
		</div>
	</div>
</template>

<script setup>
// import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';
import { getPostById } from '@/api/posts';
import { ref } from 'vue';
import { deletePost } from '@/api/posts';

// router에서 props: true
const props = defineProps({
	id: Number,
});

// const route = useRoute();
const router = useRouter();

// const id = route.params.id;
const post = ref({});

// const fetchPost = () => {
// 	// const data = getPostById(id);
// 	const data = getPostById(props.id);
// 	form.value = { ...data }; // 객체 복사를 해서 값을 넣어줌
// };
// fetchPost();

const fetchPost = async () => {
	try {
		const response = await getPostById(props.id);
		const data = response.data;
		setPost(data);
		// post.value = { ...data };
	} catch (error) {
		console.error(error);
	}
};
const setPost = ({ title, content, createdAt }) => {
	post.value.title = title;
	post.value.content = content;
	post.value.createdAt = createdAt;
};
fetchPost();

const goListPage = () => {
	router.push({
		name: 'PostList',
	});
};

const goEditPage = () => {
	router.push({
		name: 'PostEdit',
		params: {
			id: props.id,
		},
	});
};

const remove = async () => {
	try {
		if (confirm('삭제 하시겠습니까?') === false) {
			return;
		}
		await deletePost(props.id);
		router.push({
			name: 'PostList',
		});
	} catch (error) {
		console.error(error);
	}
};
</script>

<style lang="scss" scoped></style>
