/* globals CaptionLcz */
define(["ext-base", "terrasoft", "unit-tests-cs-view-model"], function(Ext, Terrasoft) {

	Ext.define("Terrasoft.UnitTestsCSModule", {
		extend: "Terrasoft.BaseObject",

		renderTo: Ext.getBody(),

		renderHeader: function() {
			var btnLoadTests = Ext.create("Terrasoft.Button", {
				caption: CaptionLcz.LoadTests,
				pressed: true,
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				classes: {
					textClass: ["margin-right"]
				},
				click: {
					bindTo: "loadAllTests"
				},
				markerValue: CaptionLcz.LoadTests
			});

			var btnRunTests = Ext.create("Terrasoft.Button", {
				caption: CaptionLcz.RunTests,
				pressed: true,
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				classes: {
					textClass: ["margin-right"]
				},
				enabled: {
					bindTo: "isTestsLoaded"
				},
				click: {
					bindTo: "runAllTests"
				},
				markerValue: CaptionLcz.RunTests
			});

			var btnRunSelectedTest = Ext.create("Terrasoft.Button", {
				caption: CaptionLcz.RunSelectedTest,
				pressed: true,
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				classes: {
					textClass: ["margin-right"]
				},
				enabled: {
					bindTo: "selectedTest",
					bindConfig: {
						converter: "isNotEmptyValue"
					}
				},
				click: {
					bindTo: "runSelectedTest"
				},
				markerValue: CaptionLcz.RunSelectedTest
			});

			var headerContainer = Ext.create("Terrasoft.Container", {
				classes: {
					wrapClassName: ["content-container", "header-container"]
				},
				items: [btnLoadTests, btnRunTests, btnRunSelectedTest]
			});

			return headerContainer;
		},

		renderTestDetailsHeader: function() {
			var header = Ext.create("Terrasoft.Label", {
				caption: {
					bindTo: "selectedTestName"
				}
			});
			var container = Ext.create("Terrasoft.Container", {
				classes: {
					wrapClassName: ["caption"]
				},
				markerValue: {
					bindTo: "selectedTestStatus",
					bindConfig: {
						converter: "getTestStatusMarkerValue"
					}
				},
				items: [header]
			});
			return container;
		},

		createBindLabel: function(captionBind) {
			return Ext.create("Terrasoft.Label", {
				caption: {
					bindTo: captionBind
				},
				visible: {
					bindTo: captionBind,
					bindConfig: {
						converter: "isNotEmptyValue"
					}
				}
			});
		},

		renderTestDetailsContainer: function() {
			var testDetailsContainer = Ext.create("Terrasoft.Container", {
				visible: {
					bindTo: "selectedTest",
					bindConfig: {
						converter: "isNotEmptyValue"
					}
				},
				items: []
			});
			var items = testDetailsContainer.items;
			var header = this.renderTestDetailsHeader();
			items.add(header);
			var labels = [];
			labels.push("selectedTestMessage");
			labels.push("selectedTestStackTrace");
			for (var labelIndex in labels) {
				var label = labels[labelIndex];
				items.add(this.createBindLabel(label));
			}
			return testDetailsContainer;
		},

		renderTestsContainer: function() {
			var testsContainer = Ext.create("Terrasoft.Grid", {
				type: "listed",
				listedZebra: false,
				hierarchical: true,
				hierarchicalColumnName: "ParentId",
				classes: {
					wrapClassName: ["content-container"]
				},
				collection: {
					bindTo: "tests"
				},
				selectRow: {bindTo: "onTestSelect"},
				openRecord: {bindTo: "onTestDoubleClick"},
				columnsConfig: [
					[
						{
							cols: 21,
							key: [
								{
									name: {
										bindTo: "Name"
									}
								}
							]
						},
						{
							cols: 3,
							key: [
								{
									name: {
										bindTo: "StatusCaption"
									}
								}
							]
						}
					]
				],
				captionsConfig: [
					{
						cols: 21,
						name: CaptionLcz.TestName
					},
					{
						cols: 3,
						name: CaptionLcz.TestStatus
					}
				]
			});
			return testsContainer;
		},

		prepareModel: function() {
			this.model = Ext.create("Terrasoft.UnitTestsCSViewModel", {
				values: {
					tests: Ext.create("Terrasoft.BaseViewModelCollection"),
					isTestsLoaded: false,
					selectedTest: null,
					selectedTestName: null,
					selectedTestStatus: null,
					selectedTestMessage: null,
					selectedTestStackTrace: null
				}
			});
		},

		renderView: function(renderTo) {
			var header = this.renderHeader();
			var tests = this.renderTestsContainer();
			var testDetails = this.renderTestDetailsContainer();
			var testsWrapper = Ext.create("Terrasoft.Container", {
				classes: {
					wrapClassName: ["content-container", "tests-container"]
				},
				items: [tests]
			});
			var testDetailsWrapper = Ext.create("Terrasoft.Container", {
				classes: {
					wrapClassName: ["content-container"]
				},
				items: [testDetails]
			});
			var container = Ext.create("Terrasoft.GridLayout", {
				classes: {
					wrapClassName: ["content-container"]
				},
				items: [
					{
						"item": testsWrapper,
						"colSpan": 8,
						"rowSpan": 1,
						"column": 0,
						"row": 0
					},
					{
						"item": testDetailsWrapper,
						"colSpan": 16,
						"rowSpan": 1,
						"column": 8,
						"row": 0
					}
				]
			});
			this.view = Ext.create("Terrasoft.Container", {
				classes: {
					wrapClassName: ["content-container"]
				},
				items: [header, container],
				renderTo: renderTo
			});
		},

		render: function(renderTo) {
			this.prepareModel();
			this.model.init();
			this.renderView(renderTo);
			this.view.bind(this.model);
		}

	});

	return Ext.create("Terrasoft.UnitTestsCSModule");
});
