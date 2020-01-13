define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {

			renderTo.el.dom.innerHTML = "";

			var innerHtml =
				"<table border='1' style='width: 100%; font-size: 8px;'>" +
					"<tr>" +
					"<td style='width: 100%' id='buttons' colspan='4'></td>" +
					"</tr>" +
					"<tr style='font-size: 12pt; text-align: center; font-weight: bold;'>" +
					"<td style='width: 25%; background: silver'>Primary Object</td>" +
					"<td style='width: 25%; background: silver'>Modified Object</td>" +
					"<td style='width: 25%; background: silver'>applyDiff()</td>" +
					"<td style='width: 25%; background: silver'>getJsonDiff()</td>" +
					"</tr>" +
					"<tr>" +
					"<td style='width: 25%' id='primaryObject'></td>" +
					"<td style='width: 25%' id='modifiedObject''></td>" +
					"<td style='width: 25%' id='apply'></td>" +
					"<td style='width: 25%' id='diff'></td>" +
					"</tr>" +
					"<tr>" +
					"<td style='width: 100%; height: 25px; font-size: 12px; background: silver;" +
					"padding-left: 10px;' id='messages' colspan='5'></td>" +
					"</tr>" +
				"</table>";

			renderTo.insertHtml("beforeend", innerHtml);

			var primaryObject = Ext.create("Terrasoft.MemoEdit", {
				renderTo: Ext.get("primaryObject"),
				width: "100%",
				height: "650px",
				placeholder: "Початковий об'єкт..."
			});

			var modifiedObject = Ext.create("Terrasoft.MemoEdit", {
				renderTo: Ext.get("modifiedObject"),
				width: "100%",
				height: "650px",
				placeholder: "Змінений об'єкт..."
			});

			var diff = Ext.create("Terrasoft.MemoEdit", {
				renderTo: Ext.get("diff"),
				width: "100%",
				height: "650px"
			});

			var apply = Ext.create("Terrasoft.MemoEdit", {
				renderTo: Ext.get("apply"),
				width: "100%",
				height: "650px"
			});

			var messages = Ext.create("Terrasoft.Label", {
				renderTo: Ext.get("messages")
			});

			var printResultMessage = function(message, isError) {
				var messageContainer = Ext.get("messages");
				if (isError) {
					messageContainer.setStyle({
						"background": "indianred",
						"color": "white",
						"font-weight": "bold"
					});
				} else {
					messageContainer.setStyle({
						"background": "green",
						"color": "white",
						"font-weight": "bold"
					});
				}
				messages.setCaption(message);
			};

			function getFormatedValue(value) {
				var tab = "\t";
				return JSON.stringify(value, null, tab);
			}

			var applyDiff = function() {
				try {
					var primaryObjectValue = Terrasoft.decode(primaryObject.getValue()) || {};
					primaryObject.setValue(getFormatedValue(primaryObjectValue));
					var jsonDiff = Terrasoft.decode(diff.getValue()) || {};
					diff.setValue(getFormatedValue(jsonDiff));
					var startOperationAt = new Date();
					var applyResult = Terrasoft.JsonApplier.applyDiff(primaryObjectValue, jsonDiff);
					var finishOperationAt = new Date();
					apply.setValue(getFormatedValue(applyResult));
					var modifiedObjectValue = Terrasoft.decode(modifiedObject.getValue()) || {};
					if (!Terrasoft.JsonDiffer.makeDiff(applyResult, modifiedObjectValue)) {
						var executionTime = (finishOperationAt - startOperationAt) / 1000;
						printResultMessage(Ext.String.format("Yeah! Applied in {0} sec.", executionTime));
					} else {
						printResultMessage("Nooooo!", true);
					}
				} catch (e) {
					printResultMessage(e.message, true);
				}
			};

			var getJsonDiff = function() {
				try {
					var primaryObjectValue = Terrasoft.decode(primaryObject.getValue()) || {};
					primaryObject.setValue(getFormatedValue(primaryObjectValue));
					var modifiedObjectValue = Terrasoft.decode(modifiedObject.getValue()) || {};
					modifiedObject.setValue(getFormatedValue(modifiedObjectValue));
					var jsonDiff = Terrasoft.JsonDiffer.getJsonDiff(primaryObjectValue, modifiedObjectValue);
					diff.setValue(getFormatedValue(jsonDiff));
				} catch (e) {
					printResultMessage(e.message, true);
				}
			};

			Ext.create("Terrasoft.Button", {
				caption: "Diff",
				renderTo: Ext.get("buttons"),
				style: Terrasoft.controls.ButtonEnums.style.BLUE,
				onClick: getJsonDiff
			});

			Ext.create("Terrasoft.Button", {
				caption: "Apply",
				renderTo: Ext.get("buttons"),
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				onClick: applyDiff
			});

			Ext.create("Terrasoft.Button", {
				caption: "Diff & Apply",
				renderTo: Ext.get("buttons"),
				onClick: function() {
					getJsonDiff();
					applyDiff();
				}
			});

			Ext.create("Terrasoft.Button", {
				caption: "Primary ↔ Modified",
				renderTo: Ext.get("buttons"),
				style: Terrasoft.controls.ButtonEnums.style.RED,
				onClick: function() {
					try {
						var primaryObjectValue = Terrasoft.decode(primaryObject.getValue()) || {};
						var modifiedObjectValue = Terrasoft.decode(modifiedObject.getValue()) || {};
						primaryObject.setValue(getFormatedValue(modifiedObjectValue));
						modifiedObject.setValue(getFormatedValue(primaryObjectValue));
					} catch (e) {
						printResultMessage(e.message, true);
					}
				}
			});


		}
	};
});

