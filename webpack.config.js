const PATH = require('path')
const fs = require('fs')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const LiveReloadPlugin = require('webpack-livereload-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const IS_DEV = process.env.NODE_ENV === 'development'
const PATHS = {
	js: PATH.resolve(__dirname, 'src/js'),
	dist: PATH.resolve(__dirname, `dist`),
	build: `dist`
}
const setFilename = (name, ext) => `${PATHS.build}/${name}.${ext}`
const fileOptimization = () => {
	const CONFIG = {
		splitChunks: {
			chunks: 'all'
		}
	}

	return CONFIG
}
const setBabelOptions = preset => {
	const OPTIONS = {
		presets: [
			'@babel/preset-env'
		],

		plugins: [
			'@babel/plugin-proposal-class-properties'
		]
	}

	if (preset) OPTIONS.presets.push(preset)

	return OPTIONS
}
const setJsLoaders = () => {
	const LOADERS = [
		{
			loader: 'babel-loader',
			options: setBabelOptions()
		}
	]

	if (IS_DEV) LOADERS.push('eslint-loader')

	return LOADERS
}
const addPlugins = () => {
	const BASE_PLUGINS = [
		new HTMLWebpackPlugin(),
		new CleanWebpackPlugin(),
		new LiveReloadPlugin({
			appendScriptTag: true
		})
	]

	return BASE_PLUGINS
}

module.exports = {
	context: PATH.resolve(__dirname, 'src'),

	entry: {
		app: './app.js'
	},

	output: {
		filename: setFilename('weather', 'js'),
		path: PATH.resolve(__dirname, `dist`)
	},

	resolve: {
		alias: {
			'@': PATH.resolve(__dirname, 'src')
		}
	},

	optimization: fileOptimization(),

	devServer: {
		port: 4200,
		hot: IS_DEV
	},

	devtool: IS_DEV ? 'source-map' : '',

	mode: 'development',

	plugins: addPlugins(),

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: setJsLoaders()
			}
		]
	}
}