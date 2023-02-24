<template>
	<svg :style="iconStyle" aria-hidden="true">
		<use :xlink:href="symbolId" />
	</svg>
</template>

<script setup name="SvgIcon">
import { computed } from "vue";

// 接收父组件参数并设置默认值
const props = withDefaults(defineProps(), {
	prefix: "icon",
	iconStyle: () => ({ width: "100px", height: "100px" })
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
