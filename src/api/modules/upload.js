import http from "@/api";

/**
 * @name 文件上传模块
 */
// * 图片上传
export const uploadImg = (url, params, headers) => {
	return http.post(url, params, headers);
};

// * 视频上传
export const uploadVideo = (url, params) => {
	return http.post(url, params);
};
