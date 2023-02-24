<template>
	<el-config-provider :button="config" :size="assemblySize">
		<router-view></router-view>
	</el-config-provider>
</template>

<script setup>
import { reactive, computed } from "vue";
import { GlobalStore } from "@/stores";
import { ElConfigProvider } from "element-plus";

const globalStore = GlobalStore();
// 配置element按钮文字中间是否有空格
const config = reactive({
	autoInsertSpace: false
});

// 配置全局组件大小
const assemblySize = computed(() => globalStore.assemblySize);
</script>
