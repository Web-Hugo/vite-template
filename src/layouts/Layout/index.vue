<!-- 横向布局 -->
<template>
	<el-container class="layout">
		<el-header>
			<div class="logo flx-center">
				<img src="@/assets/images/logo.svg" alt="logo" />
				<span>书刊</span>
			</div>
		</el-header>
		<Main />
	</el-container>
</template>

<script setup name="layoutTransverse">
import { computed } from "vue";

import { useRoute, useRouter } from "vue-router";
import Main from "@/layouts/components/Main/index.vue";

const route = useRoute();
const router = useRouter();
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>

<style lang="scss">
</style>
