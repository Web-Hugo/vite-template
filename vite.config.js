import { defineConfig, loadEnv } from 'vite';
import { createHtmlPlugin } from "vite-plugin-html";
import vue from '@vitejs/plugin-vue';
import { resolve } from "path";
import { wrapperEnv } from "./src/utils/getEnv";
import { visualizer } from "rollup-plugin-visualizer";
import { createSvgIconsPlugin } from "vite-plugin-svg-icons";
import viteCompression from "vite-plugin-compression";
import VueSetupExtend from "vite-plugin-vue-setup-extend";
import vueJsx from "@vitejs/plugin-vue-jsx";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import {Plugin as importToCDN,autoComplete} from 'vite-plugin-cdn-import'
import postcsspxtoviewport from 'postcss-px-to-viewport-8-plugin'

// https://vitejs.dev/config/
export default defineConfig(({ mode })=>{
  const env = loadEnv(mode, process.cwd());
  const viteEnv = wrapperEnv(env)
  return{
    base: "./",
		resolve: {
			alias: {
				"@": resolve(__dirname, "./src")
			}
		},
    server: {
			// 服务器主机名，如果允许外部访问，可设置为 "0.0.0.0"
			host: "0.0.0.0",
			port: viteEnv.VITE_PORT,
			open: viteEnv.VITE_OPEN,
			cors: true, // 允许跨域
			// 跨域代理配置
			proxy: {
				"/api": {
					target: viteEnv.VITE_API_URL, // easymock
					changeOrigin: true,
					rewrite: path => path.replace(/^\/api/, "")
				}
			}
		},
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            title: viteEnv.VITE_GLOB_APP_TITLE,
          },
        },
      }),
      // * 使用 svg 图标
			createSvgIconsPlugin({
				iconDirs: [resolve(process.cwd(), "src/assets/icons")],
				symbolId: "icon-[dir]-[name]"
			}),

      // * vite 可以使用 jsx/tsx 语法
			vueJsx(),

      // * name 可以写在 script 标签上
			VueSetupExtend(),

      // * 是否生成包预览(分析依赖包大小,方便做优化处理)
			viteEnv.VITE_REPORT && visualizer(),
      // * gzip compress
			viteEnv.VITE_BUILD_GZIP &&
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz"
      }),

      // * demand import element
			AutoImport({
				imports: ["vue", "vue-router"],
				resolvers: [ElementPlusResolver()]
			}),
			Components({
				// 指定组件位置，默认是src/components
				dirs: ["src/components"],
				extensions: ["vue"],
			}),
      importToCDN({
        modules: [
          autoComplete('vue'),
          autoComplete('@vueuse/core'),
          autoComplete('@vueuse/shared'),
          autoComplete('lodash'),
          autoComplete('axios'),
        ],
      })
    ],
    css:{
      preprocessorOptions: {
				scss: {
					additionalData: `@import "@/styles/var.scss";`
				}
			},
      postcss:{
        plugins:[
          postcsspxtoviewport({
            unitToConvert: 'px', // 需要转换的单位，默认为"px"
            viewportWidth: 1920, // 设计稿的视口宽度
            unitPrecision: 5, // 单位转换后保留的精度
            propList: ['*'], // 能转化为vw的属性列表
            viewportUnit: 'vw', // 希望使用的视口单位
            fontViewportUnit: 'vw', // 字体使用的视口单位
            selectorBlackList: [], // 需要忽略的CSS选择器，不会转为视口单位，使用原有的px等单位。
            minPixelValue: 1, // 设置最小的转换数值，如果为1的话，只有大于1的值会被转换
            mediaQuery: false, // 媒体查询里的单位是否需要转换单位
            replace: true, //  是否直接更换属性值，而不添加备用属性
            exclude: [/node_modules/], // 忽略某些文件夹下的文件或特定文件，例如 'node_modules' 下的文件
            include: undefined, // 如果设置了include，那将只有匹配到的文件才会被转换,如：[/node_modules\/element-plus/]
            landscape: false, // 是否添加根据 landscapeWidth 生成的媒体查询条件 @media (orientation: landscape)
            landscapeUnit: 'vw', // 横屏时使用的单位
            landscapeWidth: 1920 // 横屏时使用的视口宽度
          })
        ]
      }
    },
    // * 打包去除 console.log && debugger
		esbuild: {
			pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
		},
    build: {
			outDir: "dist",
			minify: "esbuild",
			// esbuild 打包更快，但是不能去除 console.log，terser打包慢，但能去除 console.log
			// minify: "terser",
			// terserOptions: {
			// 	compress: {
			// 		drop_console: viteEnv.VITE_DROP_CONSOLE,
			// 		drop_debugger: true
			// 	}
			// },
			chunkSizeWarningLimit: 1500,
			rollupOptions: {
				output: {
					// Static resource classification and packaging
					chunkFileNames: "assets/js/[name]-[hash].js",
					entryFileNames: "assets/js/[name]-[hash].js",
					assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
				}
			}
		},
  }
})
