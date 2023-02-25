
import { HOME_URL } from "@/config/config";
//路由表
export const staticRouter = [
  {
		path: "/",
		redirect: HOME_URL
	},
  {
		path: "/layout",
		name: "layout",
		component: () => import("@/layouts/index.vue"),
		redirect: HOME_URL,
		children: []
	}
]

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
	{
		path: "/403",
		name: "403",
		component: () => import("@/components/ErrorMessage/403.vue"),
		meta: {
			title: "403页面"
		}
	},
	{
		path: "/404",
		name: "404",
		component: () => import("@/components/ErrorMessage/404.vue"),
		meta: {
			title: "404页面"
		}
	},
	{
		path: "/500",
		name: "500",
		component: () => import("@/components/ErrorMessage/500.vue"),
		meta: {
			title: "500页面"
		}
	}
];

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
	path: "/:pathMatch(.*)*",
	name: "notFound",
	redirect: { name: "404" }
};
