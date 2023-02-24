<!-- 💥 这里是一次性加载 LayoutComponents -->
<template>
	<Layout />
</template>

<script setup name="layout">
import Layout from "./Layout/index.vue";
</script>

<style scoped lang="scss">
.layout {
	min-width: 760px;
}
</style>
