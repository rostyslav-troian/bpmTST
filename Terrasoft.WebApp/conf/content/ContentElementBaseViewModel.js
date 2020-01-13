Terrasoft.configuration.Structures["ContentElementBaseViewModel"] = {innerHierarchyStack: ["ContentElementBaseViewModel"]};
define('ContentElementBaseViewModelStructure', ['ContentElementBaseViewModelResources'], function(resources) {return {schemaUId:'cdad9a03-52c1-46d1-8c46-e5047a4813c3',schemaCaption: "ContentElementBaseViewModel", parentSchemaName: "", schemaName:'ContentElementBaseViewModel',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ContentElementBaseViewModel", ["ContentElementBaseViewModelResources", "ContentBuilderConstants",
		"BaseContentItemViewModel"],
	function(resources) {

	Ext.define("Terrasoft.ContentBuilder.ContentElementBaseViewModel", {
		extend: "Terrasoft.BaseContentItemViewModel",
		alternateClassName: "Terrasoft.ContentElementBaseViewModel",

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.set("ClassName", this.className);
			this.set("Movable", true);
			this.set("Removable", true);
			this.set("Clonable", true);
			this.initResourcesValues(resources);
		},

		/**
		 * ############## ###### ########## ######## ## ####### ########.
		 * @protected
		 * @virtual
		 * @param {Object} resourcesObj ###### ########.
		 */
		initResourcesValues: function(resourcesObj) {
			var resourcesSuffix = "Resources";
			Terrasoft.each(resourcesObj, function(resourceGroup, resourceGroupName) {
				resourceGroupName = resourceGroupName.replace("localizable", "");
				Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
					var viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
					this.set(viewModelResourceName, resourceValue);
				}, this);
			}, this);
		},

		/**
		 * Inits styles with default values.
		 * @protected
		 */
		initDefaultStyles: function() {
			this.$Styles = this.$Styles || {};
			if (_.isUndefined(this.$Styles["padding-left"])) {
				this.$Styles["padding-left"] = "5px";
			}
			if (_.isUndefined(this.$Styles["padding-right"])) {
				this.$Styles["padding-right"] = "5px";
			}
			if (_.isUndefined(this.$Styles["padding-top"])) {
				this.$Styles["padding-top"] = "5px";
			}
			if (_.isUndefined(this.$Styles["padding-bottom"])) {
				this.$Styles["padding-bottom"] = "5px";
			}
		},

		/**
		 * ########## ###### ############ ############# ########.
		 * @return {Object} ###### ############ #############.
		 */
		getViewConfig: function() {
			this.initDefaultStyles();
			return {
				"className": this.className,
				"tag": this.$Id,
				"id": this.$Id,
				"wrapStyle": "$Styles",
				"selected": "$Selected",
				"groupName": [Terrasoft.ContentBuilder.constants.ElementDropGroup]
			};
		},

		/**
		 * Generates configuration object of element tools.
		 * @protected
		 * @return {Array} Configuration object of element tools.
		 */
		getToolsConfig: function() {
			var id = this.$Id;
			return [
				{
					className: "Terrasoft.Button",
					id: id + "-dragg-el",
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					markerValue: "move-button",
					imageConfig: "$Resources.Images.ContentMove",
					classes: {wrapperClass: "content-block-move-button"},
					visible: "$Movable"
				}, {
					className: "Terrasoft.Button",
					style: Terrasoft.controls.ButtonEnums.style.GREEN,
					markerValue: "copy-button",
					imageConfig: "$Resources.Images.ContentCopy",
					classes: {wrapperClass: "content-block-copy-button"},
					click: "$onCopyButtonClick",
					visible: "$Clonable"
				}, {
					className: "Terrasoft.Button",
					style: Terrasoft.controls.ButtonEnums.style.GREEN,
					markerValue: "remove-button",
					imageConfig: "$Resources.Images.ContentRemove",
					classes: {wrapperClass: "content-block-remove-button"},
					click: "$onRemoveButtonClick",
					visible: "$Removable"
				}
			];
		},

		/**
		 * Handles click of Remove button.
		 * @protected
		 */
		onRemoveButtonClick: function() {
			this.fireEvent("change", this, {
				event: "onremove",
				arguments: {Id: this.$Id}
			});
		},

		/**
		 * Handles click of Copy button.
		 * @protected
		 */
		onCopyButtonClick: function() {
			this.fireEvent("change", this, {
				event: "oncopy",
				arguments: {Id: this.$Id}
			});
		}

	});

});


