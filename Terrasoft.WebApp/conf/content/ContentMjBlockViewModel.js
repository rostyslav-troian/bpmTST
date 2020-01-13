Terrasoft.configuration.Structures["ContentMjBlockViewModel"] = {innerHierarchyStack: ["ContentMjBlockViewModel"]};
define("ContentMjBlockViewModel", ["ContentMjBlockViewModelResources", "BaseContentBlockViewModel",
		"ContentSectionViewModel", "ContentMjHeroViewModel"],
	function(resources) {

		/**
		 * @class Terrasoft.controls.ContentMjBlockViewModel
		 */
		Ext.define("Terrasoft.ContentMjBlockViewModel", {
			extend: "Terrasoft.BaseContentBlockViewModel",

			/**
			 * @inheritdoc Terrasoft.BaseContentBlockViewModel#className
			 * @override
			 */
			className: "Terrasoft.ContentMjBlock",

			/**
			 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
			 * @override
			 */
			serializableSlicePropertiesCollection: ["ItemType", "Styles"],

			/**
			 * @inheritdoc BaseContentSerializableViewModelMixin#childItemTypes
			 */
			childItemTypes: {
				section: "Terrasoft.ContentSectionViewModel",
				mjhero: "Terrasoft.ContentMjHeroViewModel"
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * @inheritDoc BaseContentItemViewModel#getPreparedConfigBeforeCreate
			 */
			getPreparedConfigBeforeCreate: function(config) {
				var changedConfig = this.callParent(arguments);
				if (Ext.isEmpty(config.Items)) {
					changedConfig.Items = [{
						ItemType: "section",
						Styles: {
							direction: "ltr"
						}
					}];
				}
				var defaultStyles = {
					"background-position": "top center",
					"background-repeat": "no-repeat"
				};
				changedConfig.Styles = !Ext.Object.isEmpty(changedConfig.Styles) ? changedConfig.Styles : defaultStyles;
				return changedConfig;
			},

			/**
			 * @inheritdoc Terrasoft.BaseContentBlockViewModel#getViewConfig
			 * @override
			 */
			getViewConfig: function() {
				var config = this.callParent(arguments);
				Ext.apply(config, {
					"isSelectable": this.checkIsSelectable(),
					"selected": "$Selected",
					"ondragover": "$onDragOver",
					"ondragdrop": "$onDragDrop",
					"oninvaliddrop": "$onInvalidDrop",
					"groupName": ["ContentBlank"],
					"getDraggableConfig": this.getDraggableConfig,
					"tools": this.getToolsConfig()
				});
				return config;
			},

			/**
			 * Returns config object of block item edit.
			 * @protected
			 * @virtual
			 * @returns {Object} Block item edit config.
			 */
			getItemEditConfig: function(item) {
				return {
					Id: item.$Id,
					ItemType: item.$ItemType
				};
			},

			/**
			 * Returns config object of block view model edit.
			 * @protected
			 * @virtual
			 * @returns {Object} Block edit config.
			 */
			getEditConfig: function() {
				var config = {
					ItemType: this.$ItemType,
					Items: [],
					Styles: this.$Styles,
					UseBackgroundImage: false
				};
				Terrasoft.each(this.$Items, function(item) {
					config.Items.push(this.getItemEditConfig(item));
				}, this);
				return config;
			},

			/**
			 * @inheritdoc Terrasoft.BaseContentBlockViewModel#getToolsConfig
			 * @override
			 */
			getToolsConfig: function() {
				var config = this.callParent();
				config.push({
					className: "Terrasoft.Button",
					style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					markerValue: "save-block-button",
					imageConfig: "$Resources.Images.ContentBlockSave",
					classes: {wrapperClass: "content-block-save-button"},
					click: "$onSaveButtonClick"
				});
				return config;
			},

			/**
			 * Handles save button click action.
			 * @protected
			 */
			onSaveButtonClick: function() {
				this.fireEvent("change", this, {
					event: "onsave",
					arguments: {
						Id: this.$Id
					}
				});
			}

			//endregion

		});

		return Terrasoft.ContentMjBlockViewModel;
	}
);


