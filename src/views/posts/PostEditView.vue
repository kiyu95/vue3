<template>
	<div>
		<h2>게시글 수정</h2>
		<hr class="my-4" />
		<PostForm
			v-on:submit.prevent="edit"
			v-model:title="form.title"
			v-model:content="form.content"
		>
			<template #actions>
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
			</template>
		</PostForm>
	</div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router';
import { getPostById } from '@/api/posts';
import { ref } from 'vue';
import { updatePost } from '@/api/posts';
import PostForm from '@/components/posts/PostForm.vue';

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
