<!-- PostListView AppModal 추가하기 전 version (인프런 Vue 실전편. 섹션6-3) -->

<template>
	<div>
		<h2>게시글 목록</h2>
		<hr class="my-4" />
		<PostFilter
			v-model:title="params.title_like"
			v-model:limit="params._limit"
		></PostFilter>

		<!-- 아래 주석코드 PostFilter.vue 컴포넌트로 교체 -->
		<!-- <form @submit.prevent>
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
		</form> -->
		<hr class="my-4" />
		<AppGrid :items="posts">
			<template v-slot="{ item }">
				<PostItem
					v-bind:title="item.title"
					v-bind:content="item.content"
					:created_at="item.createdAt"
					@click="goPage(item.id)"
				></PostItem>
			</template>
		</AppGrid>
		<!-- <div class="row g-3">
			<div v-for="post in posts" :key="post.id" class="col-4">
				<PostItem
					v-bind:title="post.title"
					v-bind:content="post.content"
					:created-at="post.createdAt"
					@click="goPage(post.id)"
				></PostItem>
			</div>
		</div> -->
		<AppPagination
			:current-page="params._page"
			:page-count="pageCount"
			@page="page => (params._page = page)"
		/>

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
import AppPagination from '@/components/AppPagination.vue';
import AppGrid from '@/components/AppGrid.vue';
import PostFilter from '@/components/posts/PostFilter.vue';

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
		// console.log('params.value: ', params.value);
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
