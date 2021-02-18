import resolve from '@rollup/plugin-node-resolve'
import babel from '@rollup/plugin-babel'
//import stripExports from 'rollup-plugin-strip-exports'

const babel_options = {
	babelHelpers: 'bundled',
	exclude: ['node_modules/**']
}

export default {
	input: 'src/app.js',

	output: {
		file: 'dist/weather.widget.js',
		format: 'es'
	},

	plugins: [
		resolve(),
		babel(babel_options),
		//stripExports()
	]
}