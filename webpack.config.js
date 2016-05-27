"use strict";

var path    = require('path');
var webpack = require('webpack');

var webpackConfig = module.exports = {
	entry: [
		"./bundle/index.js"
	],
	output: {
		path: path.join(__dirname, "./bundle"),
		filename: 'app.js'
	},
	module: {
		loaders: [{
			test: /.jsx?$/,
			loader: 'babel',
			exclude: /node_modules/,
			query: {
				presets:['react', 'es2015']
			}
		}]
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.OldWatchingPlugin()
	],
	target: 'electron-renderer'
};
