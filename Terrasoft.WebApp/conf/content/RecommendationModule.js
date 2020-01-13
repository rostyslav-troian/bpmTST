Terrasoft.configuration.Structures["RecommendationModule"] = {innerHierarchyStack: ["RecommendationModule"]};
define("RecommendationModule", ["RecommendationModuleResources", "TooltipUtilities", "ViewGeneratorV2"],
	function(Resources) {
		var recomendationViewModelClass = Ext.define("Terrasoft.configuration.RecommendationModuleViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.RecommendationModuleViewModel",
			mixins: {
				TooltipUtilitiesMixin: "Terrasoft.TooltipUtilities"
			},
			values: {
				recommendation: "",
				informationOnStep: ""
			}
		});

		/**
		 * @class Terrasoft.configuration.RecommendationModule
		 * Represents additional information that it is got from the business-process element.
		 */
		Ext.define("Terrasoft.configuration.RecommendationModule", {
			extend: "Terrasoft.BaseModule",
			alternateClassName: "Terrasoft.RecommendationModule",
			Ext: null,
			Terrasoft: null,
			sandbox: null,

			/**
			 * Creates config to generate view.
			 * @param {Object} executionData Information data.
			 * @return {Terrasoft.Container} Configuration of view
			 */
			getView: function(executionData) {
				var viewGenerator = this.Ext.create("Terrasoft.ViewGenerator");
				var containerName = "displayingInformationContainer";
				var viewConfig = {
					className: "Terrasoft.Container",
					items: [],
					id: containerName,
					selectors: {
						wrapEl: "#" + containerName
					}
				};
				if (executionData.recommendation) {
					var recommendation = {
						className: "Terrasoft.Label",
						classes: {
							labelClass: ["information", "recommendation"]
						},
						caption: {
							bindTo: "recommendation"
						},
						markerValue: {
							bindTo: "recommendation"
						}
					};
					viewConfig.items.push(recommendation);
				}
				if (executionData.informationOnStep) {
					var informationOnStepButton = viewGenerator.generatePartial({
						itemType: this.Terrasoft.ViewItemType.INFORMATION_BUTTON,
						name: "InformationOnStep",
						markerValue: "InformationOnStep",
						content: {bindTo: "informationOnStep"}
					}, {
						schemaName: "RecommendationModule",
						schema: {},
						viewModelClass: recomendationViewModelClass
					});
					viewConfig.items.push(informationOnStepButton[0]);
				}
				return this.Ext.create("Terrasoft.Container", viewConfig);
			},

			/**
			 * @inheritdoc Terrasoft.BaseModule#render
			 * @protected
			 * @overridden
			 */
			render: function(renderTo) {
				this.callParent(arguments);
				var processExecData = this.sandbox.publish("GetProcessExecData");
				if (processExecData && (processExecData.recommendation || processExecData.informationOnStep)) {
					var recommendation = processExecData.recommendation ||
						Resources.localizableStrings.DefaultInformationOnStep;
					var informationOnStep = processExecData.informationOnStep || null;
					var view = this.getView({
						"recommendation": recommendation,
						"informationOnStep": informationOnStep
					});
					var viewModel = this.Ext.create("Terrasoft.RecommendationModuleViewModel");
					viewModel.set("recommendation", recommendation);
					viewModel.set("informationOnStep", informationOnStep);
					view.bind(viewModel);
					view.render(renderTo);
				}
			}
		});

		return Terrasoft.RecommendationModule;
	}
);


