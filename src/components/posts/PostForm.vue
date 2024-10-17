<template>
	<form>
		<div class="mb-3">
			<label for="title" class="form-label">제목</label>
			<input
				:value="title"
				@input="$emit('update:title', $event.target.value)"
				type="text"
				class="form-control"
				id="title"
			/>
		</div>
		<div class="mb-3">
			<label for="content" class="form-label">내용</label>
			<textarea
				:value="content"
				@input="$emit('update:content', $event.target.value)"
				class="form-control"
				id="content"
				rows="3"
			></textarea>
		</div>
		<slot name="actions"> </slot>
		<!-- <div class="pt-4">
			<button
				type="button"
				class="btn btn-outline-dark me-2"
				@click="goListPage"
			>
				목록
			</button>
			<button class="btn btn-primary">저장</button>
		</div> -->
	</form>
</template>

<script setup>
defineProps({
	title: String,
	content: String,
});

// 다중 v-model 구현하기 위해 defineEmits
defineEmits(['update:title', 'update:content']);
</script>

<style lang="scss" scoped></style>
