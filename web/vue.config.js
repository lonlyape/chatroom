// vue.config.js
module.exports = {
	pages: {
		index: {
			entry: process.env.NODE_ENV === 'production' ? './src/main.build.js' : './src/main.dev.js',
			template: process.env.NODE_ENV === 'production' ? 'public/index-build.html' : 'public/index-dev.html',
			filename: 'index.html',
		}
	},
	baseUrl: process.env.NODE_ENV === 'production' ? './' : '/',
	lintOnSave: process.env.NODE_ENV !== 'production',
	css: {
		modules: false,
		loaderOptions: {
			sass: {
				data: '@import "src/common/style/variable.scss";'
			}
		}
	},
	devServer: {
		hot: true,
		overlay: {
			warnings: true,
			errors: true
		}
	},
	// outputDir: 'ipmclient',
	assetsDir: './static/',
	chainWebpack: config => {
		config.resolve.symlinks(true)
		return config
	}
}
