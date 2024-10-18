// import axios from 'axios';
import { posts } from '.';

// axios로 데이터 조회할 예정
// const posts = [
// 	{ id: 1, title: '제목1', content: '내용1', createdAt: '2021-01-01' },
// 	{ id: 2, title: '제목2', content: '내용2', createdAt: '2022-02-02' },
// 	{ id: 3, title: '제목3', content: '내용3', createdAt: '2023-03-03' },
// 	{ id: 4, title: '제목4', content: '내용4', createdAt: '2024-04-04' },
// 	{ id: 5, title: '제목5', content: '내용5', createdAt: '2025-05-05' },
// ];

// axios로 데이터 조회
// export function getPosts(params) {
// 	return axios.get('http://localhost:5000/posts', { params });
// }

// export function getPostById(id) {
// 	// const numberId = parseInt(id);
// 	return axios.get(`http://localhost:5000/posts/${id}`);
// }

// export function createPost(data) {
// 	return axios.post('http://localhost:5000/posts', data);
// }

// export function updatePost(id, data) {
// 	return axios.put(`http://localhost:5000/posts/${id}`, data);
// }

// export function deletePost(id) {
// 	return axios.delete(`http://localhost:5000/posts/${id}`);
// }

// api.index.js 에서 create instance 사용
export function getPosts(params) {
	return posts.get('/', { params });
}

export function getPostById(id) {
	// const numberId = parseInt(id);
	return posts.get(`/${id}`);
}

export function createPost(data) {
	return posts.post('/', data);
}

// export function updatePost(id, data) {
// 	return posts.put(`/${id}`, data);
// }

export function updatePost(id, data) {
	return posts.patch(`/${id}`, data);
}

export function deletePost(id) {
	return posts.delete(`/${id}`);
}
