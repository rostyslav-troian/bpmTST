// TODO: Delete after updating Siesta to 1.2 Release
// A temporary solution to support ExtJS 4.2 on Siesta 1.2beta and below
Function.prototype.$extIsFunction = true;

var Harness = Siesta.Harness.Browser;

var preloadConfig = [];

preloadConfig.push("../normalize/es5shim.js");

preloadConfig.push(
	"../stylesheet/base.css",
	"../fonts/fonts.css",
	"./amd/core-modules-object.js",
	"./amd/core-modules-object.mobile.js",
	"./amd/core-modules.mobile.js",
	"./amd/bootstrap.js",
	"../requirejs/require.js",
	"./amd/bootstrap.tests.mobile.js"
);

Harness.configure({
	runCore: "sequential",
	defaultTimeout: 60000,
	waitForTimeout: 60000,
	title: "Nui Tests",
	testClass: Terrasoft.Test.Class,
	disableCaching: true,
	autoCheckGlobals: false,
	breakOnFail: false,
	preload: preloadConfig
});

Harness.start({
	group: "Controls",
	items: [{
		group: "Container",
		items: [
			"./controls/container/tests/container.mobile.unit.tests.js",
			"./controls/container/tests/container.mobile.ui.tests.js"
		]
	}]
});