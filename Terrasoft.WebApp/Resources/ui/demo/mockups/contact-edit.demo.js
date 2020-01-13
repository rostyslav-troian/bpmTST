define(["ext-base", "terrasoft", "sandbox"], function(Ext, Terrasoft, sandbox) {
	return {
		"render": function(renderTo) {
			var rootContainer = Ext.create("Terrasoft.Container", {
				renderTo: renderTo,
				id: 'pagelayout',
				classes: {
					wrapClassName: ['container']
				},
				selectors: {
					el: '#pagelayout',
					wrapEl: '#pagelayout'
				}
			});
			var leftPanel = Ext.create("Terrasoft.Container", {
				id: 'leftpanel',
				classes: {
					wrapClassName: ['leftpanel']
				},
				selectors: {
					el: '#leftpanel',
					wrapEl: '#leftpanel'
				}
			});
			var centerPanel = Ext.create("Terrasoft.Container", {
				id: 'centerPanel',
				classes: {
					wrapClassName: ['centerPanel']
				},
				selectors: {
					el: '#centerPanel',
					wrapEl: '#centerPanel'
				}
			});
			rootContainer.add([leftPanel, centerPanel]);
			sandbox.subscribe("render", function (data) {
				sandbox.loadModule("contact-edit-main-panel", {renderTo: centerPanel.el});
				console.log("render: ", data);
			});
			sandbox.loadModule("contact-edit-left-panel", {renderTo: leftPanel.el});
			sandbox.subscribe("testPtpEvent", function() {
				return {
					test: "test"
				};
			});
			sandbox.subscribe("testAsyncPtpEvent", function(callback) {
				window.setTimeout(function() {
					var data = {
						test: "test"
					};
					callback.call(null, data);
				}, 1000);
			});
		},
		"unload": function(renderTo) {
		}
	};
});