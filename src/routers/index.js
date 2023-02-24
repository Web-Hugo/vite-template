import { createRouter, createWebHashHistory, createWebHistory } from "vue-router";
import NProgress from "@/config/nprogress";

// layouts
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
const routes = setupLayouts(generatedRoutes)

const router = createRouter({
	history: createWebHashHistory(),
	routes: routes,
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
	// 1.NProgress 开始
	NProgress.start();
	// // 2.动态设置标题
	// const title = import.meta.env.VITE_GLOB_APP_TITLE;
	// document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

	next();
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
	NProgress.done();
});

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
	NProgress.done();
	console.warn("路由错误", error.message);
});

export default router;
