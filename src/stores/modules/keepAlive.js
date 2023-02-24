import { defineStore } from "pinia";

// KeepAliveStore
export const KeepAliveStore = defineStore({
	id: "KeepAliveStore",
	state: () => ({
		keepAliveName: []
	}),
	actions: {
		// addKeepAliveName
		async addKeepAliveName(name) {
			!this.keepAliveName.includes(name) && this.keepAliveName.push(name);
		},
		// removeKeepAliveName
		async removeKeepAliveName(name) {
			this.keepAliveName = this.keepAliveName.filter(item => item !== name);
		},
		// setKeepAliveName
		async setKeepAliveName(keepAliveName) {
			this.keepAliveName = keepAliveName;
		}
	}
});
