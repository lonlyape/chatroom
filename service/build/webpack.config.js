const webpack = require('webpack');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');


function _externals() {
	let manifest = require(resolve('./package.json'));
	let dependencies = manifest.dependencies;
	let externals = {};
	for (let p in dependencies) {
		externals[p] = 'commonjs ' + p;
	}
	return externals;
}

function resolve(route) {
	return path.resolve(__dirname, '../', route);
}

let externals = _externals();

module.exports = {
	entry: {
		app: './src/app.js'
	},
	output: {
		path: resolve('dist'),
		filename: '[name].js'
	},
	target: 'node',
	externals: externals,
	node: {
		console: true,
		global: true,
		process: true,
		Buffer: true,
		__filename: true,
		__dirname: true,
		setImmediate: true
	},
	module: {
		rules: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: /node_module/
		}]
	},
	optimization: {
		minimizer: [new TerserPlugin({
			terserOptions: {
				output: {
					comments: false
				}
			}
		})]
	},
	plugins: [
		// new UglifyJSPlugin()
	]
}