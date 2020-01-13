const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

module.exports = {
	mode: "production",
	watch: false,
	entry: {
		"login-vue": "./Terrasoft/amd/bootstrap.login.vue.js",
		"vue-components": "./Terrasoft/vue/vue-components.js"
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		filename: '[name].js',
		publicPath: "/core/hash/dist/"
	},
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "..", "Resources/Terrasoft")
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: [
					"vue-loader"
				]
			},
			{
				test: /\.(css|less)$/,
				oneOf: [
					// this matches plain `<style>` or `<style scoped>`
					{
						use: [
							"vue-style-loader",
							"css-loader",
							"less-loader"
						]
					}
				]
			}
		]
	},
	plugins: [
		new VueLoaderPlugin()
	]
};