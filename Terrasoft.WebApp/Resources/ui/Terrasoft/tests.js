﻿/* globals Joose */

/*jshint freeze: false */
Function.prototype.$extIsFunction = true;
/*jshint freeze: true */

var harness = new Terrasoft.Utils.Harness();

var preloadConfig = [];

preloadConfig.push(
		"../normalize/es5shim.js",
		"../normalize/classList-shim.js",
		"../normalize/pathSeg-polyfill.js",
		"../stylesheet/base.css",
		"../fonts/fonts.css",
		"./amd/core-modules-object.js",
		"./amd/configuration-modules-object.js",
		"./amd/core-modules.js",
		"./amd/bootstrap.js",
		"../requirejs/require.js",
		"./amd/bootstrap.tests.js"
);

Terrasoft.Test.CookieUtils.set("CoreTests.EnableCodeCoverage", "false");

harness.configure({
	runCore: "sequential",
	defaultTimeout: 60000,
	waitForTimeout: 60000,
	isReadyTimeout: 60000,
	title: "Core Nui Tests",
	testClass: Terrasoft.Test.Class,
	sandbox: true,
	cachePreload: true,
	disableCaching: false,
	autoCheckGlobals: false,
	breakOnFail: false,
	warnOnNotBDD: true,
	preload: preloadConfig,
	listeners: {
		beforetestfinalize: function(event, test) {
			var hrns = test && test.harness;
			if (hrns && hrns.warnOnNotBDD === true) {
				var bddConverter = Terrasoft.BDDConverter;
				var builders = bddConverter.getBuildersFromContext(test);
				if (builders && builders.length) {
					Joose.A.each(builders, function(builder) {
						bddConverter.addBDDAssertion(builder, test);
					}, this);
					bddConverter.setVisibleCopyButton(test, true);
				} else {
					bddConverter.setVisibleCopyButton(test, false);
				}
			}
		}
	}
});

Ext.Ajax.request({
	url: "tests.json",
	method: "GET",
	headers: {"Content-Type": "application/json"},
	success: function(conn) {
		var testDescriptors = Ext.decode(conn.responseText);
		harness.start(testDescriptors);
	},
	failure: function() {
		window.console.error("Can't load test descriptors!");
	}
});

Ext.onReady(function() {
	Ext.get("copyBddAssertion").el.on("click",
		Terrasoft.BDDConverter.copyBddAssertionToClipboard);
	Ext.create("Ext.Button", {
		renderTo: Ext.getDom("coverageButton"),
		text: "Enable coverage",
		listeners: {
			click: function() {
				var location = window.location;
				var pathname = location.pathname;
				var href = location.href.replace(pathname, pathname.replace("tests.html", "tests.coverage.html"));
				location.replace(href);
			}
		}
	});
});
