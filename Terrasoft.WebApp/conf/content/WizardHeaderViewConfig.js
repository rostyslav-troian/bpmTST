Terrasoft.configuration.Structures["WizardHeaderViewConfig"] = {innerHierarchyStack: ["WizardHeaderViewConfig"]};
define('WizardHeaderViewConfigStructure', ['WizardHeaderViewConfigResources'], function(resources) {return {schemaUId:'79c557e8-dac2-47a1-ab34-dd66aa5dd3e7',schemaCaption: "WizardHeaderViewConfig", parentSchemaName: "", schemaName:'WizardHeaderViewConfig',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Class generating configuration presenting the upper panel of the wizard.
 */
Ext.define("Terrasoft.configuration.WizardHeaderViewConfig", {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.WizardHeaderViewConfig",

	/**
	 * ########## ############ ####### ###### #######.
	 * @returns {Object[]} ########## ############ ############# ####### ###### #######.
	 */
	generate: function() {
		var itemsConfig = [];
		var wizardContainerViewConfig = this.getWizardContainerViewConfig();
		var wizardContainerItems = wizardContainerViewConfig.items;
		var headerCaptionContainerViewConfig = this.getHeaderCaptionContainerViewConfig();
		wizardContainerItems.push(headerCaptionContainerViewConfig);
		var utilsContainerViewConfig = this.getUtilsContainerViewConfig();
		wizardContainerItems.push(utilsContainerViewConfig);
		itemsConfig.push(wizardContainerViewConfig);
		return itemsConfig;
	},

	getWizardContainerViewConfig: function() {
		return {
			"name": "WizardContainer",
			"wrapClass": ["wizard-container"],
			"itemType": Terrasoft.ViewItemType.CONTAINER,
			"items": []
		};
	},

	getHeaderCaptionContainerViewConfig: function() {
		return {
			"name": "HeaderCaptionContainer",
			"itemType": Terrasoft.ViewItemType.CONTAINER,
			"wrapClass": ["header"],
			"items": [{
				"itemType": Terrasoft.ViewItemType.LABEL,
				"name": "HeaderCaption",
				"click": {bindTo: "onHeaderCaptionClick"},
				"caption": {bindTo: "caption"},
				"labelConfig": {
					classes: ["header-label", "header-section-caption-class"]
				}
			}]
		};
	},

	getUtilsContainerViewConfig: function() {
		var utilsLeftContainerViewConfig = this.getUtilsLeftContainerViewConfig();
		var utilsRightContainerViewConfig = this.getUtilsRightContainerViewConfig();
		return {
			"name": "UtilsContainer",
			"itemType": Terrasoft.ViewItemType.CONTAINER,
			"wrapClass": ["utils"],
			"items": [utilsLeftContainerViewConfig, utilsRightContainerViewConfig]
		};
	},

	getUtilsLeftContainerViewConfig: function() {
		return {
			"name": "utilsLeftContainer",
			"itemType": Terrasoft.ViewItemType.CONTAINER,
			"wrapClass": ["utils-left"],
			"items": [
				{
					itemType: Terrasoft.ViewItemType.BUTTON,
					style: Terrasoft.controls.ButtonEnums.style.GREEN,
					name: "SaveButton",
					caption: {bindTo: "Resources.Strings.SaveButtonCaption"},
					classes: {
						textClass: ["utils-button"],
						wrapperClass: ["utils-button"]
					},
					click: {bindTo: "saveButtonClick"},
					tips: [{
						itemType: Terrasoft.ViewItemType.TIP,
						displayMode: Terrasoft.TipDisplayMode.NARROW,
						content: {bindTo: "Resources.Strings.SaveButtonHint"},
						restrictAlignType: Terrasoft.AlignType.BOTTOM
					}],
					visible: {bindTo: "isSaveButtonVisible"}
				},
				{
					itemType: Terrasoft.ViewItemType.BUTTON,
					name: "CancelButton",
					caption: {bindTo: "Resources.Strings.CancelButtonCaption"},
					classes: {
						textClass: ["utils-button"],
						wrapperClass: ["utils-button"]
					},
					click: {bindTo: "cancelButtonClick"},
					visible: {bindTo: "isCancelButtonVisible"}
				}
			]
		};
	},

	getUtilsRightContainerViewConfig: function() {
		return {
			"name": "utilsRightContainer",
			"itemType": Terrasoft.ViewItemType.CONTAINER,
			"wrapClass": ["utils-right"],
			"items": [{
				itemType: Terrasoft.ViewItemType.BUTTON,
				name: "PreviousButton",
				imageConfig: {bindTo: "Resources.Images.ArrowLeft"},
				classes: {
					textClass: ["utils-button"],
					wrapperClass: ["utils-button"]
				},
				click: {bindTo: "previous"},
				enabled: {bindTo: "arrowLeftEnabled"}
			}, {
				"name": "DataGrid",
				"idProperty": "Id",
				"collection": {"bindTo": "StepCollection"},
				"classes": {wrapClassName: ["wizard-steps-collection"]},
				"generator": "ContainerListGenerator.generatePartial",
				"itemType": Terrasoft.ViewItemType.GRID,
				"itemConfig": [{
					itemType: Terrasoft.ViewItemType.BUTTON,
					name: "StepButton",
					caption: {bindTo: "caption"},
					imageConfig: {bindTo: "imageConfig"},
					click: {bindTo: "click"},
					classes: {
						textClass: ["utils-button"],
						wrapperClass: ["utils-button"]
					},
					pressed: {bindTo: "isSelected"},
					visible: {bindTo: "canUseStep"},
					controlConfig: {"menu": {"items": {"bindTo": "StepCollection"}}}
				}]
			}, {
				itemType: Terrasoft.ViewItemType.BUTTON,
				name: "NextButton",
				imageConfig: {bindTo: "Resources.Images.ArrowRight"},
				classes: {
					textClass: ["utils-button"],
					wrapperClass: ["utils-button"]
				},
				click: {bindTo: "next"},
				enabled: {bindTo: "arrowRightEnabled"}
			}]
		};
	}
});


