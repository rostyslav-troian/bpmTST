define(["ext-base", "terrasoft", "container"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {

			var items0 = {
				"id": "grid-layout-0",
				"selectors": {
					"wrapEl": "#grid-layout-0"
				},
				"rowHeight": "64px",
				"classes": {
					"wrapClassName": [
						"mySomeClass"
					],
					"rowClassName": [
						"myRowClassName"
					],
					"columnClassName": [
						"myColumnClassName"
					],
					"spacerClassName": [
						"myCustomSpacerClassName"
					],
					"itemCell": [
						"itemCell"
					]
				},
				"items": [
					{
						"item": {
							"id": "ContactPageV2CloseCardButtonButton",
							"className": "Terrasoft.Button",
							"markerValue": "CloseCardButton"
						},
						"colSpan": 1,
						"rowSpan": 1,
						"column": 23,
						"row": 0
					},
					{
						"item": {
							"id": "ContactPageV2PhotoButton",
							"className": "Terrasoft.Button",
							"markerValue": "Photo",
							"caption": "Фото"
						},
						"colSpan": 4,
						"rowSpan": 3,
						"column": 0,
						"row": 0
					},
					{
						"item": {
							"id": "ContactPageV2NameButton",
							"className": "Terrasoft.Button",
							"markerValue": "Name",
							"caption": "ФИО"
						},
						"colSpan": 19,
						"rowSpan": 1,
						"column": 4,
						"row": 0
					},
					{
						"item": {
							"id": "ContactPageV2AccountButton",
							"className": "Terrasoft.Button",
							"markerValue": "Account",
							"caption": "Контрагент"
						},
						"colSpan": 20,
						"rowSpan": 1,
						"column": 4,
						"row": 1
					},
					{
						"item": {
							"id": "ContactPageV2TypeButton",
							"className": "Terrasoft.Button",
							"markerValue": "Type",
							"caption": "Тип",
							"classes": {
								"textClass": [
									"selected-item"
								]
							}
						},
						"colSpan": 10,
						"rowSpan": 2,
						"column": 4,
						"row": 2
					},
					{
						"item": {
							"id": "ContactPageV2OwnerButton",
							"className": "Terrasoft.Button",
							"markerValue": "Owner",
							"caption": "Ответственный"
						},
						"colSpan": 10,
						"rowSpan": 3,
						"column": 14,
						"row": 2
					},
					{
						"item": {
							"id": "ContactPageV2plus_3_0Button",
							"className": "Terrasoft.Button",
							"markerValue": "plus_3_0",
							"classes": {
								"textClass": [
									"add-button"
								]
							},
							"caption": "+"
						},
						"column": 0,
						"row": 3,
						"colSpan": 2
					},
					{
						"item": {
							"id": "ContactPageV2plus_3_14Button",
							"className": "Terrasoft.Button",
							"markerValue": "plus_3_14",
							"classes": {
								"textClass": [
									"add-button"
								]
							},
							"caption": "+"
						},
						"column": 14,
						"row": 3,
						"colSpan": 2
					},
					{
						"item": {
							"id": "ContactPageV2plus_4_0Button",
							"className": "Terrasoft.Button",
							"markerValue": "plus_4_0",
							"classes": {
								"textClass": [
									"add-button"
								]
							},
							"caption": "+"
						},
						"column": 0,
						"row": 4,
						"colSpan": 2
					}
				]
			};
			var items1 = [{
				row: 0,
				rowSpan: 1,
				column: 0,
				colSpan: 8,
				item: {
					id: "label1-0",
					className: "Terrasoft.Label",
					caption: "Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text "
				}
			}, {
				row: 1,
				rowSpan: 1,
				column: 0,
				colSpan: 8,
				item: {
					id: "label1-1",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 2,
				rowSpan: 1,
				column: 0,
				colSpan: 8,
				item: {
					id: "label1-2",
					className: "Terrasoft.Label",
					caption: "Some Text" +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some "
				}
			}, {
				row: 3,
				rowSpan: 1,
				column: 0,
				colSpan: 8,
				item: {
					id: "label1-3",
					className: "Terrasoft.Label",
					caption: "Some Text" +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some "
				}
			}, {
				row: 0,
				rowSpan: 2,
				column: 8,
				colSpan: 8,
				item: {
					id: "label1-4",
					className: "Terrasoft.Label",
					caption: "Some Text" +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some " +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some " +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some " +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some " +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some " +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some "
				}
			}, {
				row: 2,
				rowSpan: 2,
				column: 8,
				colSpan: 8,
				item: {
					id: "label1-5",
					className: "Terrasoft.Label",
					caption: "Some Text" +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some " +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some " +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some " +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some "
				}
			}, {
				row: 0,
				rowSpan: 4,
				column: 16,
				colSpan: 8,
				item: {
					id: "label1-6",
					className: "Terrasoft.Label",
					caption: "Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some " +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some " +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some " +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some " +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some " +
						"Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some Text Some "
				}
			}];
			var items2 = [{
				row: 0,
				rowSpan: 1,
				column: 0,
				colSpan: 8,
				item: {
					id: "label2-0",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 1,
				rowSpan: 2,
				column: 0,
				colSpan: 8,
				item: {
					id: "label2-1",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 3,
				rowSpan: 1,
				column: 0,
				colSpan: 8,
				item: {
					id: "label2-2",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 0,
				rowSpan: 4,
				column: 8,
				colSpan: 8,
				item: {
					id: "label2-3",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 0,
				rowSpan: 2,
				column: 16,
				colSpan: 8,
				item: {
					id: "label2-4",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 2,
				rowSpan: 2,
				column: 16,
				colSpan: 8,
				item: {
					id: "label2-5",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}];
			var items3 = [{
				row: 0,
				rowSpan: 1,
				column: 0,
				colSpan: 12,
				item: {
					id: "label3-0",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 1,
				rowSpan: 2,
				column: 0,
				colSpan: 12,
				item: {
					id: "label3-1",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 0,
				rowSpan: 3,
				column: 12,
				colSpan: 12,
				item: {
					id: "label3-2",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}];
			var items4 = [{
				row: 0,
				rowSpan: 1,
				column: 0,
				colSpan: 8,
				item: {
					id: "label4-0",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 1,
				rowSpan: 2,
				column: 0,
				colSpan: 8,
				item: {
					id: "label4-1",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 3,
				rowSpan: 1,
				column: 0,
				colSpan: 8,
				item: {
					id: "label4-2",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 0,
				rowSpan: 4,
				column: 8,
				colSpan: 8,
				item: {
					id: "label4-3",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 0,
				rowSpan: 2,
				column: 16,
				colSpan: 8,
				item: {
					id: "label4-4",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 2,
				rowSpan: 2,
				column: 16,
				colSpan: 8,
				item: {
					id: "label4-5",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 4,
				rowSpan: 1,
				column: 0,
				colSpan: 24,
				item: {
					id: "label4-6",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 4,
				rowSpan: 1,
				column: 0,
				colSpan: 24,
				item: {
					id: "label4-7",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 5,
				rowSpan: 1,
				column: 0,
				colSpan: 12,
				item: {
					id: "label4-8",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 6,
				rowSpan: 2,
				column: 0,
				colSpan: 12,
				item: {
					id: "label4-9",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 5,
				rowSpan: 3,
				column: 12,
				colSpan: 12,
				item: {
					id: "label4-10",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}];
			var items5 = [{
				row: 0,
				rowSpan: 1,
				column: 0,
				colSpan: 8,
				item: {
					id: "label5-0",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 1,
				rowSpan: 1,
				column: 0,
				colSpan: 8,
				item: {
					id: "label5-1",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 2,
				rowSpan: 1,
				column: 0,
				colSpan: 8,
				item: {
					id: "label5-2",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 3,
				rowSpan: 1,
				column: 0,
				colSpan: 8,
				item: {
					id: "label5-3",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 0,
				rowSpan: 2,
				column: 8,
				colSpan: 8,
				item: {
					id: "label5-4",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 2,
				rowSpan: 2,
				column: 8,
				colSpan: 8,
				item: {
					id: "label5-5",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 0,
				rowSpan: 4,
				column: 16,
				colSpan: 8,
				item: {
					id: "label5-6",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}];
			var items6 = [{
				row: 0,
				rowSpan: 4,
				column: 0,
				colSpan: 8,
				item: {
					id: "label6-0",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 0,
				rowSpan: 2,
				column: 8,
				colSpan: 8,
				item: {
					id: "label6-1",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 2,
				rowSpan: 2,
				column: 8,
				colSpan: 8,
				item: {
					id: "label6-2",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 0,
				rowSpan: 1,
				column: 16,
				colSpan: 8,
				item: {
					id: "label6-3",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 1,
				rowSpan: 1,
				column: 16,
				colSpan: 8,
				item: {
					id: "label6-4",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 2,
				rowSpan: 1,
				column: 16,
				colSpan: 8,
				item: {
					id: "label6-5",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 3,
				rowSpan: 1,
				column: 16,
				colSpan: 8,
				item: {
					id: "label6-6",
					className: "Terrasoft.Label",
					caption: "Some Text"
				}
			}, {
				row: 5,
				rowSpan: 1,
				column: 0,
				colSpan: 12,
				item: {
					id: "settingsButton1",
					className: "Terrasoft.Button",
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					caption: "Some Caption",
					menu: {
						items: [{
							caption: "Caption 1"
						}, {
							caption: "Caption 2"
						}, {
							caption: "Caption 3"
						}, {
							caption: "Caption 4"
						}, {
							caption: "Caption 5"
						}]
					}
				}
			}, {
				row: 5,
				rowSpan: 1,
				column: 12,
				colSpan: 12,
				item: {
					id: "edit1",
					className: "Terrasoft.TextEdit",
					value: "some value"
				}
			}];
			var items7 = [{
				row: 0,
				rowSpan: 1,
				column: 0,
				colSpan: 4,
				item: {
					id: "label7-0",
					className: "Terrasoft.Label",
					caption: "Some Text 0"
				}
			}, {
				row: 0,
				rowSpan: 1,
				column: 3,
				colSpan: 4,
				item: {
					id: "label7-1",
					className: "Terrasoft.Label",
					caption: "Some Text 1"
				}
			}];
			var items8 = [{
				row: 0,
				rowSpan: 2,
				column: 0,
				colSpan: 8,
				item: {
					id: "label8-0",
					className: "Terrasoft.Label",
					caption: "Some Text 0"
				}
			}, {
				row: 0,
				rowSpan: 4,
				column: 0,
				colSpan: 8,
				item: {
					id: "label8-1",
					className: "Terrasoft.Label",
					caption: "Some Text 1"
				}
			}];
			var items9 = [{
				row: 0,
				rowSpan: 2,
				column: 0,
				colSpan: 4,
				item: {
					id: "label9-0",
					className: "Terrasoft.Label",
					caption: "Some Text 0"
				}
			}, {
				row: 0,
				rowSpan: 1,
				column: 4,
				colSpan: 20,
				item: {
					id: "label9-1",
					className: "Terrasoft.Label",
					caption: "Some Text 1"
				}
			}, {
				row: 1,
				rowSpan: 1,
				column: 4,
				colSpan: 10,
				item: {
					id: "label9-3",
					className: "Terrasoft.Label",
					caption: "Some Text 3"
				}
			}, {
				row: 1,
				rowSpan: 1,
				column: 14,
				colSpan: 10,
				item: {
					id: "label9-4",
					className: "Terrasoft.Label",
					caption: "Some Text 4"
				}
			}];
			var items10 = [{
				row: 0,
				rowSpan: 3,
				column: 0,
				colSpan: 4,
				item: {
					id: "label10-0",
					className: "Terrasoft.Label",
					caption: "4"
				}
			}, {
				row: 0,
				rowSpan: 1,
				column: 4,
				colSpan: 20,
				item: {
					id: "label10-1",
					className: "Terrasoft.Label",
					caption: "20"
				}
			}, {
				row: 1,
				rowSpan: 2,
				column: 4,
				colSpan: 4,
				item: {
					id: "label10-2",
					className: "Terrasoft.Label",
					caption: "4"
				}
			}, {
				row: 1,
				rowSpan: 1,
				column: 8,
				colSpan: 8,
				item: {
					id: "label10-3",
					className: "Terrasoft.Label",
					caption: "8"
				}
			}, {
				row: 1,
				rowSpan: 1,
				column: 16,
				colSpan: 8,
				item: {
					id: "label10-4",
					className: "Terrasoft.Label",
					caption: "8"
				}
			}, {
				row: 2,
				rowSpan: 1,
				column: 8,
				colSpan: 6,
				item: {
					id: "label10-5",
					className: "Terrasoft.Label",
					caption: "6"
				}
			}, {
				row: 2,
				rowSpan: 1,
				column: 14,
				colSpan: 5,
				item: {
					id: "label10-6",
					className: "Terrasoft.Label",
					caption: "5"
				}
			}, {
				row: 2,
				rowSpan: 1,
				column: 19,
				colSpan: 5,
				item: {
					id: "label10-7",
					className: "Terrasoft.Label",
					caption: "5"
				}
			}];
			var items11 = [{
				row: 0,
				rowSpan: 2,
				column: 0,
				colSpan: 4,
				item: {
					id: "label11-0",
					className: "Terrasoft.Label",
					caption: "4"
				}
			}, {
				row: 0,
				rowSpan: 1,
				column: 4,
				colSpan: 10,
				item: {
					id: "label11-1",
					className: "Terrasoft.Label",
					caption: "10"
				}
			}, {
				row: 0,
				rowSpan: 1,
				column: 14,
				colSpan: 10,
				item: {
					id: "label11-2",
					className: "Terrasoft.Label",
					caption: "10"
				}
			}, {
				row: 1,
				rowSpan: 1,
				column: 4,
				colSpan: 7,
				item: {
					id: "label11-3",
					className: "Terrasoft.Label",
					caption: "7"
				}
			}, {
				row: 1,
				rowSpan: 1,
				column: 11,
				colSpan: 7,
				item: {
					id: "label11-4",
					className: "Terrasoft.Label",
					caption: "7"
				}
			}, {
				row: 1,
				rowSpan: 1,
				column: 18,
				colSpan: 6,
				item: {
					id: "label11-5",
					className: "Terrasoft.Label",
					caption: "6"
				}
			}];

			var legend = "Ячейки с элементами";
			renderTo.createChild({
				tag: "fieldset",
				style: Ext.DomHelper.generateStyles({
					height: "100%",
					position: "relative"
				}),
				children: [{
					tag: "legend",
					html: legend
				}, {
					id: "gridLayout0Items",
					tag: "textarea",
					html: JSON.stringify(items0, undefined, 4),
					style: Ext.DomHelper.generateStyles({
						position: "absolute",
						top: 0,
						left: 0,
						height: "90%",
						width: "35%"
					})
				}, {
					id: "applyGridLayout0",
					tag: "input",
					type: "button",
					value: "&nbsp;>&nbsp;",
					style: Ext.DomHelper.generateStyles({
						position: "absolute",
						top: "45%",
						left: "35.8%",
						padding: "15px",
						"background-color": "deeppink",
						color: "white",
						"font-size": "14px"
					})
				}, {
					id: "for-grid-layout-0",
					tag: "div",
					style: Ext.DomHelper.generateStyles({
						position: "absolute",
						top: 0,
						left: "40%",
						height: "90%",
						width: "60%",
						outline: "1px dotted grey"
					})
				}]
			});
			var updateGrid0 = function() {
				destroyGrid0();
				var value = Ext.get("gridLayout0Items").getValue();
				if (Ext.isEmpty(value)) {
					return;
				}
				var config = JSON.parse(value);
				if (!Ext.isEmpty(config)) {
					createGrid0(config);
				}
			};
			var createGrid0 = function(config) {
				var defaultGridLayoutConfig = {
					id: "grid-layout-0",
					selectors: {
						wrapEl: "#grid-layout-0"
					},
					classes: {
						wrapClassName: ["mySomeClass"],
						rowClassName: ["myRowClassName"],
						columnClassName: ["myColumnClassName"],
						spacerClassName: ["myCustomSpacerClassName"]
					}
				};
				var gridLayoutConfig = Ext.apply({}, config, defaultGridLayoutConfig);
				gridLayoutConfig.renderTo = Ext.get("for-grid-layout-0");
				Ext.create("Terrasoft.GridLayout", gridLayoutConfig);
			};
			var destroyGrid0 = function() {
				var grid0 = Ext.getCmp("grid-layout-0");
				if (!Ext.isEmpty(grid0)) {
					grid0.destroy();
				}
			};
			var button0 = Ext.get("applyGridLayout0");
			button0.on("click", updateGrid0, this);

			legend = "Непоследовательное объединение рядков";
			renderTo.createChild('<fieldset><legend>' + legend + '</legend><pre class="code">' +
				JSON.stringify(items2, undefined, 4) + '</pre></fieldset>');
			Ext.create("Terrasoft.GridLayout", {
				id: "grid-layout-2",
				selectors: {
					wrapEl: "#grid-layout-2"
				},
				renderTo: renderTo,
				items: items2
			});

			legend = "Указана высота рядка";
			renderTo.createChild('<fieldset><legend>' + legend + '</legend><pre class="code">' +
				JSON.stringify(items1, undefined, 4) + '</pre></fieldset>');
			Ext.create("Terrasoft.GridLayout", {
				id: "grid-layout-1",
				selectors: {
					wrapEl: "#grid-layout-1"
				},
				rowHeight: "50px",
				renderTo: renderTo,
				items: items1
			});

			legend = "Простой пример объединения рядков";
			renderTo.createChild('<fieldset><legend>' + legend + '</legend><pre class="code">' +
				JSON.stringify(items3, undefined, 4) + '</pre></fieldset>');
			Ext.create("Terrasoft.GridLayout", {
				id: "grid-layout-3",
				selectors: {
					wrapEl: "#grid-layout-3"
				},
				renderTo: renderTo,
				items: items3
			});

			legend = "Различные комбинации объединений рядков и столбцов";
			renderTo.createChild('<fieldset><legend>' + legend + '</legend><pre class="code">' +
				JSON.stringify(items4, undefined, 4) + '</pre></fieldset>');
			Ext.create("Terrasoft.GridLayout", {
				id: "grid-layout-4",
				selectors: {
					wrapEl: "#grid-layout-4"
				},
				renderTo: renderTo,
				items: items4
			});

			legend = "Увеличение объединения рядков справа налево";
			renderTo.createChild('<fieldset><legend>' + legend + '</legend><pre class="code">' +
				JSON.stringify(items5, undefined, 4) + '</pre></fieldset>');
			Ext.create("Terrasoft.GridLayout", {
				id: "grid-layout-5",
				selectors: {
					wrapEl: "#grid-layout-5"
				},
				renderTo: renderTo,
				items: items5
			});

			legend = "Увеличение объединения рядков слева направо";
			renderTo.createChild('<fieldset><legend>' + legend + '</legend><pre class="code">' +
				JSON.stringify(items6, undefined, 4) + '</pre></fieldset>');
			Ext.create("Terrasoft.GridLayout", {
				id: "grid-layout-6",
				selectors: {
					wrapEl: "#grid-layout-6"
				},
				renderTo: renderTo,
				items: items6
			});

			legend = "Пересечение ширин ячеек";
			renderTo.createChild('<fieldset><legend>' + legend + '</legend><pre class="code">' +
				JSON.stringify(items7, undefined, 4) + '</pre></fieldset>');
			Ext.create("Terrasoft.GridLayout", {
				id: "grid-layout-7",
				selectors: {
					wrapEl: "#grid-layout-7"
				},
				renderTo: renderTo,
				items: items7
			});

			legend = "Пересечение ширин рядков";
			renderTo.createChild('<fieldset><legend>' + legend + '</legend><pre class="code">' +
				JSON.stringify(items8, undefined, 4) + '</pre></fieldset>');
			Ext.create("Terrasoft.GridLayout", {
				id: "grid-layout-8",
				selectors: {
					wrapEl: "#grid-layout-8"
				},
				renderTo: renderTo,
				items: items8
			});

			legend = "Глобальная ширина ячеек";
			renderTo.createChild('<fieldset><legend>' + legend + '</legend><pre class="code">' +
				JSON.stringify(items9, undefined, 4) + '</pre></fieldset>');
			Ext.create("Terrasoft.GridLayout", {
				id: "grid-layout-9",
				selectors: {
					wrapEl: "#grid-layout-9"
				},
				renderTo: renderTo,
				items: items9
			});

			legend = "Глобальная ширина ячеек и несколько объединений";
			renderTo.createChild('<fieldset><legend>' + legend + '</legend><pre class="code">' +
				JSON.stringify(items10, undefined, 4) + '</pre></fieldset>');
			Ext.create("Terrasoft.GridLayout", {
				id: "grid-layout-10",
				selectors: {
					wrapEl: "#grid-layout-10"
				},
				renderTo: renderTo,
				items: items10
			});

			legend = "Глобальная ширина ячеек и несколько объединений";
			renderTo.createChild('<fieldset><legend>' + legend + '</legend><pre class="code">' +
				JSON.stringify(items11, undefined, 4) + '</pre></fieldset>');
			Ext.create("Terrasoft.GridLayout", {
				id: "grid-layout-11",
				selectors: {
					wrapEl: "#grid-layout-11"
				},
				renderTo: renderTo,
				items: items11
			});
		
		}
	};
});