<!-- PostListView 페이지네이션 component(AppPagination) 분리하기전 version (인프런 Vue 실전편. 섹션4-3 까지) -->

<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<form @submit.prevent>
			<div class="row g-3">
				<div class="col">
					<input v-model="params.title_like" type="text" class="form-control" />
				</div>
				<div class="col-3">
					<select v-model="params._limit" class="form-select">
						<option value="3">3개씩 보기</option>
						<option value="6">6개씩 보기</option>
						<option value="9">9개씩 보기</option>
					</select>
				</div>
			</div>
		</form>
		<hr class="my-4" />
		<div class="row g-3">
			<div v-for="post in posts" :key="post.id" class="col-4">
				<PostItem
					v-bind:title="post.title"
					v-bind:content="post.content"
					:created-at="post.createdAt"
					@click="goPage(post.id)"
				></PostItem>
			</div>
		</div>
		<nav class="mt-5" aria-label="Page navigation example">
			<ul class="pagination justify-content-center">
				<li class="page-item" v-bind:class="{ disabled: params._page === 1 }">
					<a
						class="page-link"
						href="#"
						aria-label="Previous"
						@click.prevent="--params._page"
					>
						<span aria-hidden="true">&laquo;</span>
					</a>
				</li>
				<li
					v-for="page in pageCount"
					:key="page"
					class="page-item"
					:class="{ active: params._page === page }"
				>
					<a class="page-link" href="#" @click.prevent="params._page = page">{{
						page
					}}</a>
				</li>
				<li
					class="page-item"
					v-bind:class="{ disabled: params._page >= pageCount }"
				>
					<a
						class="page-link"
						href="#"
						aria-label="Next"
						@click.prevent="++params._page"
					>
						<span aria-hidden="true">&raquo;</span>
					</a>
				</li>
			</ul>
		</nav>
		<hr class="my-5" />
		<AppCard>
			<PostDetailView :id="1"></PostDetailView>
		</AppCard>
	</div>
</template>

<script setup>
import PostItem from '@/components/posts/PostItem.vue';
import PostDetailView from './PostDetailView.vue';
import AppCard from '@/components/AppCard.vue';
import { getPosts } from '@/api/posts';
import { computed, ref, watchEffect } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const posts = ref([]);

const params = ref({
	_sort: 'createdAt',
	_order: 'desc',
	_page: 1,
	_limit: 3,
	title_like: '',
});

// const fetchPosts = () => {
// 	posts.value = getPosts();

// 	// getPosts는 promise객체이므로 then 으로 값을 받아온다.
// 	getPosts()
// 		.then(response => {
// 			console.log('response: ', response);
// 		})
// 		.catch(error => {
// 			console.log('error: ', error);
// 		});
// };

// pagination
const totalCount = ref(0);
const pageCount = computed(() =>
	Math.ceil(totalCount.value / params.value._limit),
);

// then을 사용하지 않고 async, await 사용
const fetchPosts = async () => {
	try {
		const response = await getPosts(params.value);
		posts.value = response.data;
		totalCount.value = response.headers['x-total-count'];
		// console.dir(response); // 객체를 로그로 출력할 때 console.dir 사용하면 편하다
	} catch (error) {
		console.error(error);
	}
};
watchEffect(fetchPosts); // fetchPosts 콜백함수 안에서 반응형 데이터가 변경되면 콜백함수가 다시 실행된다
// fetchPosts();

const goPage = id => {
	// router.push('/posts/' + id); 도 가능
	// router.push(`/posts/${id}`); 도 가능
	router.push({
		name: 'PostDetail',
		params: {
			id,
		},
	});
};
</script>

<style lang="scss" scoped></style>
