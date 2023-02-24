import { uploadToken } from "@/api/modules/login";
import { uploadImg } from "@/api/modules/upload";
import * as qiniu from "qiniu-js";
// 上传文件
export const AilOss = {
	uploadFile: async (file, config) => {
		let keyValue = config.dir + file.name;
		let formData = new FormData();
		formData.append("name", file.name); // 文件名称
		formData.append("key", keyValue); // 存储在oss的文件路径
		formData.append("OSSAccessKeyId", config.accessid); // //accessKeyId
		formData.append("policy", config.policy); // policy
		formData.append("Signature", config.signature); //签名
		formData.append("success_action_status", "200");
		formData.append("file", file, file.name); // 如果是base64文件，那么直接把base64字符串转成blob对象进行上传即可
		await uploadImg(config.host, formData, {
			headers: {
				"Content-Type": "multipart/form-data"
			}
		});
		return config.host + "/" + keyValue;
	}
};

export const QiNiu = {
	uploadFile: async (file, uptoken) => {
		return new Promise((resolve, reject) => {
			const key = file.name;
			const config = {
				useCdnDomain: true,
				region: qiniu.region.z2,
				forceDirect: true // 是否上传全部采用直传方式
			};
			const putExtra = {
				fname: file.name, //文件原文件名
				mimeType: [null] //用来限制上传文件类型，为 null 时表示不对文件类型限制；
			};
			qiniu.upload(file, key, uptoken, putExtra, config).subscribe({
				next(res) {},
				error(err) {},
				complete(res) {
					resolve(res);
				}
			});
		});
	}
};

const useUpload = {
	checkUpload: async (file) => {
		const res = await uploadToken();
		if (res.data.channel == "QN") {
			let data = await QiNiu.uploadFile(file, res.data.token);
			let fileUrl = `${res.data.address}/${data.key}`;
			return fileUrl;
		} else {
			return await AilOss.uploadFile(file, res.data.token);
		}
	}
};

export default useUpload;
