import autoprefixer from 'autoprefixer';
import combineSelectors from 'postcss-combine-duplicated-selectors';
import combineMediaQueries from 'postcss-combine-media-query';
import compress from 'vite-plugin-compression';
import imageMin from 'vite-plugin-imagemin';
import ViteFonts from 'vite-plugin-fonts'

const path = require('path')
const isProd = process.env.NODE_ENV === 'production';

export default {
	publicDir : 'public',
	assetsInclude: ['**/*.otf'],
	css: {
		postcss: {
			plugins: [
				combineMediaQueries(),
				combineSelectors({ removeDuplicatedValues: true }),
				autoprefixer(),
			],
		},
	},
	build: {

		minify: isProd,

		root: path.join(__dirname, "src"),
		outDir: path.join(__dirname, "dist"),

		rollupOptions: {
			input: {
				'fields': path.resolve(__dirname, 'src', 'js', 'Fields.js'),
				'style': path.resolve(__dirname, 'src', 'scss', 'style.scss'),
				'demo': path.resolve(__dirname, 'src', 'scss', 'demo.scss'),
			},
			output: {
				entryFileNames: `[name].dist.js`,
				chunkFileNames: `[name].dist.js`,
				assetFileNames: `[name].dist.[ext]`
			}
		},

	},
	plugins: [
		imageMin({
			svgo: {
				plugins: [
				{ name: 'RemoveTitle', active: false },
				{ name: 'RemoveDescription', active: false },
				{ name: 'RemoveViewBox', active: false },
				{ name: 'removeDimensions', active: true },
				{ name: 'removeScriptElement', active: true },
				{ name: 'removeStyleElement', active: true },
				],
			},
		}),
		compress({
			algorithm: 'brotliCompress',
		}),
		ViteFonts({
			google: {
				families: ['Material Icons']
			},
		}),
	],

	server: {
		// open: true,
		// proxy: {
			// "/base": {
			// 	target: "http://localhost:19000",
			// 	// changeOrigin: true,
			// 	rewrite: (path) => path.replace(/^\/base/, ""),
			// },
		// },
	},
};