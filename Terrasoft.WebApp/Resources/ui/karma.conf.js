process.env.CHROME_BIN = require('puppeteer').executablePath()

module.exports = function(config) {
	config.set({
		basePath: "",
		frameworks: ["jasmine", "requirejs"],
		files: [
			"./siesta-adapter.js",
			"./Terrasoft/amd/core-modules-object.js",
			"./Terrasoft/amd/configuration-modules-object.js",
			"./Terrasoft/amd/bootstrap.karma.js",
			{ pattern: "**/*.js", included: false },
			{ pattern: "**/*.less", included: false },
			{ pattern: "**/*.css", included: false },
			{ pattern: "**/*.png", included: false }
		],
		exclude: [
			'coverage/**/*',
		],
		preprocessors: config.reporters && config.reporters.includes('coverage') ? {
			'Terrasoft/controls/**/!(*.spec).js': 'coverage',
			'Terrasoft/designers/**/(*.spec).js': 'coverage',
			'Terrasoft/core/**/!(*.spec).js': 'coverage',
			'Terrasoft/data/**/!(*.spec).js': 'coverage',
			'Terrasoft/manager/**/!(*.spec).js': 'coverage',
			'Terrasoft/exporters/**/!(*.spec).js': 'coverage',
			'Terrasoft/integration/**/!(*.spec).js': 'coverage',
			'Terrasoft/utils/dom/**/!(*.spec).js': 'coverage',
			'Terrasoft/utils/dragdrop/**/!(*.spec).js': 'coverage',
			'Terrasoft/utils/syncfusion/**/!(*.spec).js': 'coverage',
			'Terrasoft/process/**/!(*.spec).js': 'coverage',
			'Terrasoft/configuration/applicationinstall/**/!(*.spec).js': 'coverage',
			'Terrasoft/amd/**/!(*.spec).js': 'coverage',
		}: {},
		reporters: ["progress", 'coverage'],
		port: 9876,
		colors: true,
		logLevel: config.LOG_INFO,
		autoWatch: true,
		browsers: ["ChromeHeadless"],
		singleRun: false,
		concurrency: Infinity,
		coverageReporter: {
			type: 'lcovonly',
			dir: 'coverage/',
			file : 'lcov.info',
			subdir: '.'
		},
		client: {
			args: ['--grep', config.grep],
			jasmine: {
				random: false
			}
		}
	});
};
