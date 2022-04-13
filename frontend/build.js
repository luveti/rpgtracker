const { build } = require('esbuild')
const { solidPlugin } = require('esbuild-plugin-solid')
const { nodeExternalsPlugin } = require('esbuild-node-externals')

build({
	entryPoints: ['src/index.tsx'],
	bundle: true,
	outfile: 'dist/index.js',
	minify: true,
	platform: 'node',
	sourcemap: true,
	target: 'node14',
	loader: {
		'.svg': 'dataurl',
	},
	logLevel: 'info',
	plugins: [solidPlugin(), nodeExternalsPlugin()],
}).catch(() => process.exit(1))
