/*jslint regexp: true */
define({
	extJsClassRegularExpression: /Ext.define/i,

	transform: function(text, url) {
		var harness = (window.opener || window.parent).Siesta.my.activeHarness;
		var harnessUrl = this.getHarnessUrl(text, url);
		var coverageUnit = this.extJsClassRegularExpression.test(text) ? harness.getCoverageUnit() : undefined;
		return harness.currentContentManager.instrument(harness.instrumenter, text, harnessUrl, coverageUnit);
	},

	getHarnessUrl: function(text, url) {
		var isClass = text.indexOf("Ext.define") > -1;
		if (!isClass) {
			var nameRe = /Terrasoft\/(.*)(\w*?).js.*/;
			var nameMatch = nameRe.exec(url);
			if (nameMatch && nameMatch[1]) {
				url = "Terrasoft/" + nameMatch[1] + ".js";
			}
		}		
		return url;
	},

	fetchText: function(url, name, callback) {
		require(["ext-base", name], function(Ext){
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
						require.undef(name);
						callback(xhr.responseText);
					}
				}
			};
			xhr.send(null);
		});
	},

	load: function(name, req, onload) {
		var url = req.toUrl(name + ".js");
		var scope = this;
		this.fetchText(url, name, function(text) {
			text = scope.transform(text, url);
			onload.fromText(text);
		});
	}
});
