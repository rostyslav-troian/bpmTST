/*jslint regexp: true */
define(["module", "ext-base"], function(module, Ext) {
	"use strict";
	var jscover = {
		transform: function(text, url) {
			var harness = (window.opener || window.parent).Siesta.my.activeHarness;
			var info = this.getHarnessInfo(text, url);
			return harness.currentContentManager.instrument(harness.instrumenter, text, info.name, info.mode);
		},

		check: function(text) {
			try {
				requirejs.exec(text);
				return true;
			} catch (e) {
				return false;
			}
		},

		getHarnessInfo: function(text, url) {
			var isClass = text.indexOf("Ext.define") > -1;
			if (!isClass) {
				var nameRe = /\/(\w*?).js.*/;
				var nameMatch = nameRe.exec(url);
				if (nameMatch && nameMatch[1]) {
					url = "Terrasoft/configuration/" + nameMatch[1];
				}
			}
			var mode = isClass ? "extjs_class" : undefined;
			return {
				mode: mode,
				name: url,
				isClass: isClass
			};
		},

		fetchText: function(url, callback) {
			var xhr = new XMLHttpRequest();
			url = Ext.String.format("{0}?timestamp={1}", url, Ext.encode(new Date()));
			xhr.open("GET", url, true);
			xhr.onreadystatechange = function() {
				var status, err;
				if (xhr.readyState === 4) {
					status = xhr.status;
					if (status > 399 && status < 600) {
						err = new Error(url + " HTTP status: " + status);
						err.xhr = xhr;
						window.console.log(err);
					} else {
						callback(xhr.responseText);
					}
				}
			};
			xhr.send(null);
		},

		load: function(name, req, onload) {
			var url = req.toUrl(name + ".js");
			var scope = this;
			this.fetchText(url, function(text) {
				var transformedText = scope.transform(text, url);
				var isCorrect = scope.check(transformedText);
				onload.fromText(isCorrect ? transformedText : text);
			});
		}
	};
	return jscover;
});
