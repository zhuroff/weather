import babel from '@rollup/plugin-babel'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'

const babel_options = {
	babelHelpers: 'bundled',
	exclude: ['node_modules/**']
}

const serve_options = {
	open: true,
	contentBase: 'dist',
	host: 'localhost',
  port: 10001,
}

export default {
	input: 'src/app.js',

	output: {
		file: 'dist/weather.widget.js',
		format: 'es'
	},

	plugins: [
		babel(babel_options),
		serve(serve_options),
		livereload()
	]
}