<template>
	<el-main>
		<router-view v-slot="{ Component, route }">
			<transition appear name="fade-transform" mode="out-in">
				<keep-alive :include="keepAliveStore.keepAliveName">
					<component :is="Component" :key="route.path" v-if="isRouterShow" />
				</keep-alive>
			</transition>
		</router-view>
	</el-main>
	<el-footer>
		<Footer />
	</el-footer>
</template>

<script setup>
import { ref, provide } from "vue";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
import Footer from "@/layouts/components/Footer/index.vue";

const keepAliveStore = KeepAliveStore();

// 刷新当前页面
const isRouterShow = ref(true);
const refreshCurrentPage = (val) => (isRouterShow.value = val);
provide("refresh", refreshCurrentPage);
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
