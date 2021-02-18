const PATH = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	context: PATH.resolve(__dirname, 'src'),

	mode: 'development',

	entry: './app.js',

	output: {
		libraryTarget: 'var',
		library: 'Weather',
		filename: 'weather.widget.js',
		path: PATH.resolve(__dirname, 'dist')
	},

	resolve: {
		alias: {
			'@': PATH.resolve(__dirname, 'src/modules')
		}
	},

	optimization: {
    minimize: true
  },

	devServer: {
		contentBase: PATH.join(__dirname, 'dist'),
		port: 3000,
		open: true
	},

	devtool: false,

	plugins: [
		new CleanWebpackPlugin({
			cleanOnceBeforeBuildPatterns: ['!index.html']
		})
	],

	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader'
				}
			}
		]
	}
}