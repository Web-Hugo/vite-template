import http from "@/api";

// * 获取用户列表
export const getUserList = (params) => {
	return http.post(`/user/list`, params);
};