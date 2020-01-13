/*jslint regexp: true */
define(["module", "ext-base"], function(module, Ext) {
	"use strict";
	var jscover = {
		transform: function(text, url, namespace) {
			var harness = (window.opener || window.parent).Siesta.my.activeHarness;
			return harness.currentContentManager.instrument(harness.instrumenter, text, namespace);
		},

		getModuleNamespace: function(name, packageName) {
			var root = "Terrasoft.Configuration/";
			packageName = packageName || "[TopSchemaPackage]";
			root += Ext.String.format("{0}.{1}", packageName, name);
			return root;
		},

		fetchText: function(url, callback, scope) {
			var xhr = new XMLHttpRequest();
			url = Ext.String.format("{0}?date={1}", url, Ext.encode(new Date()));
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
						callback.call(scope, xhr.responseText);
					}
				}
			};
			xhr.send(null);
		},

		transformSchemaByParts: function(name, text, url) {
			var firstLine = "define(\"" + name;
			var firstLineIndex = text.indexOf(firstLine);
			var header = text.substring(0, firstLineIndex);
			text = text.substring(firstLineIndex);
			var schemaParts = text.split(firstLine).slice(1);
			text = header;
			for (var part in schemaParts) {
				if (!schemaParts.hasOwnProperty(part)) {
					continue;
				}
				var partText = schemaParts[part];
				var packageName = partText.substring(0, partText.indexOf("\""));
				partText = firstLine + partText;
				var namespace = this.getModuleNamespace(name, packageName);
				text += this.transform(partText, url, namespace);
			}
			return text;
		},

		load: function(name, req, onload) {
			var url = req.toUrl(name + ".js");
			this.fetchText(url, function(text) {
				text = this.transformSchemaByParts(name, text, url);
				onload.fromText(text);
			}, this);
		}
	};
	return jscover;
});
