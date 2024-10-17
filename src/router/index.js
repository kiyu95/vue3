import HomeView from '@/views/HomeView.vue';
import AboutView from '@/views/AboutView.vue';
import { createRouter, createWebHistory } from 'vue-router';
import PostCreateView from '@/views/posts/PostCreateView.vue';
import PostDetailView from '@/views/posts/PostDetailView.vue';
import PostEditView from '@/views/posts/PostEditView.vue';
import PostListView from '@/views/posts/PostListView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import NestedView from '@/views/nested/NestedView.vue';
import NestedOneView from '@/views/nested/NestedOneView.vue';
import NestedTwoView from '@/views/nested/NestedTwoView.vue';
import NestedHomeView from '@/views/nested/NestedHomeView.vue';

const routes = [
	{
		path: '/',
		name: 'home',
		component: HomeView,
	},
	{
		path: '/about',
		name: 'about',
		component: AboutView,
	},
	{
		path: '/posts/create',
		name: 'PostCreate',
		component: PostCreateView,
	},
	{
		// 동적 세그먼트는 콜론(:) 으로 표시한다. (/users/alice, /users/emma URL은 모두 같은 경로 /users/:id 에 매핑된다.)
		// 그리고 컴포넌트에서 동적 세그먼트의 값은 $route.params 필드로 접근할 수 있다.
		// path: /users/:username | URL example: /users/alice | $route.params: { username: 'alice' }
		path: '/posts/:id',
		name: 'PostDetail',
		component: PostDetailView,
		// props: true,
		props: route => ({
			id: parseInt(route.params.id),
		}),
	},
	{
		path: '/posts/:id/edit',
		name: 'PostEdit',
		component: PostEditView,
	},
	{
		path: '/posts',
		name: 'PostList',
		component: PostListView,
	},
	{
		path: '/:pathMatch(.*)*',
		name: 'NotFound',
		component: NotFoundView,
	},
	{
		path: '/nested',
		name: 'Nested',
		component: NestedView,
		children: [
			{
				path: '',
				name: 'NestedHome',
				component: NestedHomeView,
			},
			{
				path: 'one',
				name: 'NestedOne',
				component: NestedOneView,
			},
			{
				path: 'two',
				name: 'NestedTwo',
				component: NestedTwoView,
			},
		],
	},
];

const router = createRouter({
	history: createWebHistory('/'),
	routes: routes, // 키,값이 같으므로 단축표현 routes, 로 대체 가능
});

export default router;
