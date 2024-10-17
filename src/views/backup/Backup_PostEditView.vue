<!-- PostEditView 공통 component 분리하기전 version (인프런 Vue 실전편. 섹션4-3 까지) -->
<template>
	<div>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<form v-on:submit.prevent="edit">
			<div class="mb-3">
				<label for="title" class="form-label">제목</label>
				<input
					v-model="form.title"
					type="text"
					class="form-control"
					id="title"
				/>
			</div>
			<div class="mb-3">
				<label for="content" class="form-label">내용</label>
				<textarea
					v-model="form.content"
					class="form-control"
					id="content"
					rows="3"
				></textarea>
			</div>
			<div class="pt-4">
				<button
					type="button"
					class="btn btn-outline-danger me-2"
					@click="goDetailPage"
				>
					취소
				</button>
				<button class="btn btn-primary">수정</button>
			</div>
		</form>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getPostById } from '@/api/posts';
import { ref } from 'vue';
import { updatePost } from '@/api/posts';

const route = useRoute();
const router = useRouter();
const id = route.params.id;

const goDetailPage = () => {
	router.push({
		name: 'PostDetail',
		params: {
			id: id,
		},
	});
};

const form = ref({
	title: null,
	content: null,
});

const fetchPost = async () => {
	const response = await getPostById(id);
	const data = response.data;
	setForm(data);
};

const setForm = ({ title, content }) => {
	form.value.title = title;
	form.value.content = content;
};

fetchPost();

const edit = async () => {
	try {
		await updatePost(id, { ...form.value });
		router.push({
			name: 'PostDetail',
			params: {
				id: id,
			},
		});
	} catch (error) {
		console.error(error);
	}
};
</script>

<style lang="scss" scoped></style>
