<template>
	<AppModal v-model="show" title="게시글">
		<template #default>
			<div class="row g-3">
				<div class="col-3 text-muted">제목</div>
				<div class="col-9">{{ title }}</div>
				<div class="col-3 text-muted">내용</div>
				<div class="col-9">{{ content }}</div>
				<div class="col-3 text-muted">등록일</div>
				<div class="col-9">{{ createdAt }}</div>
			</div>
		</template>
		<template #actions>
			<button type="button" class="btn btn-secondary" @click="closeModal">
				닫기
			</button>
		</template>
	</AppModal>
</template>

<script setup>
import { computed } from 'vue';
import AppModal from '../AppModal.vue';

const props = defineProps({
	modelValue: Boolean,
	title: String,
	content: String,
	createdAt: [String, Number],
});

const emit = defineEmits(['update:modelValue']);

const show = computed({
	get() {
		return props.modelValue;
	},
	set(value) {
		emit('update:modelValue', value); // 여기서 수정이 발생했을 때에는 emit으로 이벤트를 올려준다
	},
});

const closeModal = () => {
	show.value = false;
};
</script>

<style lang="scss" scoped></style>
