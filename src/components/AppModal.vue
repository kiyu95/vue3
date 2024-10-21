<template>
	<!-- Modal -->
	<div v-if="modelValue">
		<div class="modal-backdrop fade show"></div>

		<div
			class="modal fade show d-block"
			tabindex="-1"
			aria-labelledby="exampleModalLabel"
			aria-hidden="true"
		>
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<slot name="header">
							<h1 class="modal-title fs-5" id="exampleModalLabel">
								{{ title }}
							</h1>
							<button
								type="button"
								class="btn-close"
								aria-label="Close"
								@click="$emit('update:modelValue', false)"
							></button>
						</slot>
					</div>
					<div class="modal-body">
						<slot></slot>
					</div>
					<div class="modal-footer">
						<slot name="actions"></slot>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
// 커스텀 컴포넌트에서 v-model을 구현하기 위해서는 modelValue와 이벤트는 update:modelValue를 사용할 수 있다
defineProps({
	modelValue: Boolean,
	title: String,
});

defineEmits(['close', 'update:modelValue']);
</script>

<style lang="scss" scoped></style>
