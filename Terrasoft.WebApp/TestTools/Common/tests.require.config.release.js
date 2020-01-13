requirejs.config({
	paths: {
		"configuration-loader": "../core/hash/Terrasoft/amd/configuration-loader",
		"configuration-bootstraps": "../core/hash/Terrasoft/amd/configuration-bootstraps",
		"require-config": "../core/hash/Terrasoft/amd/require-config",
		"require-url-config": "../core/hash/Terrasoft/amd/require-url-config",
		"core-base": "../core/hash/Terrasoft/amd/core-base",
		"bootstrap": "../core/hash/Terrasoft/amd/bootstrap",
		"performancecountermanager": "../core/hash/Terrasoft/amd/performancecountermanager",
		"loadbootstrap": "../core/hash/Terrasoft/amd/bootstrap.configuration-tests-fast-release",
		"jQuery": "../core/hash/jQuery/jQuery",
		"jQuery-easing": "../core/hash/jQueryEasing/jQuery-easing",
		"jsrender": "../core/hash/jsrender/jsrender",
		"ts-common-all": "../core/hash/ts-diagram-module/min/ts-common-all",
		"ts-diagram": "../core/hash/ts-diagram-module/min/ts-diagram",
		"process-schema-diagram": "../core/hash/Terrasoft/designers/process-schema-designer/process-schema-diagram",
		"process-schema-diagram-5x": "../core/hash/Terrasoft/designers/process-schema-designer/process-schema-diagram-5x",
		"ckeditor-base": "../core/hash/CKEditor/ckeditor",
		"html2canvas": "../core/hash/html2canvas/html2canvas",
		"chartjs": '../core/hash/Chartjs/Chart.bundle.min',
		"chartjs-label": '../core/hash/Chartjs/chartjs-plugin-labels',
		"chartjs-defaults": '../core/hash/Chartjs/chartjs-defaults',
		"chartjs-funnel": '../core/hash/Chartjs/chart.funnel',
		"chartjs-gauge": '../core/hash/Chartjs/Gauge'
	},
	map: {
		"*": {
			"ej-diagram": "ts-diagram"
		}
	},
	shim: {
		"jQuery-easing": {
			"deps": ["jQuery"]
		},
		"ts-common-all": {
			"deps": [
				"jQuery-easing"
			]
		},
		"ts-diagram": {
			"deps": [
				"ts-common-all",
				"jsrender"
			]
		},
		"process-schema-diagram": {
			"deps": [
				"ts-diagram"
			]
		},
		"process-schema-diagram-5x": {
			"deps": [
				"process-schema-diagram"
			]
		},
		"chartjs-label": {
			"deps": [
				"chartjs"
			]
		},
		"chartjs-funnel": {
			"deps": [
				"chartjs"
			]
		},
		"chartjs-gauge": {
			"deps": [
				"chartjs"
			]
		},
		"chartjs-defaults": {
			"deps": [
				"chartjs-label"
			]
		}
	}
});
require(["loadbootstrap"]);
