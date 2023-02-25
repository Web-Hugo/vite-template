import router from "@/routers/index";
import { isType } from "@/utils/util";
import { notFoundRouter } from "@/routers/modules/default";
import routes from '@/routers/routes.json';

// 引入 views 文件夹下所有 vue 文件
const modules = import.meta.glob("@/views/**/*.page.vue");
const allRouter = [...routes];
/**
 * 初始化动态路由
 */
export const initDynamicRouter = async () => {
	try {
		// 添加动态路由
		allRouter.forEach((item) => {
			item.children && delete item.children;
			if (item.component && isType(item.component) == "string") {
				item.component = modules["/src/views" + item.component + ".page.vue"];
			}
			if (item.meta.isFull) {
				router.addRoute(item);
			} else {
				router.addRoute("layout", item);
			}
		});
		// 最后添加 notFoundRouter
		router.addRoute(notFoundRouter);
	} catch (error) {
		// 💢 当按钮 || 菜单请求出错时，重定向到登陆页
		return Promise.reject(error);
	}
};
