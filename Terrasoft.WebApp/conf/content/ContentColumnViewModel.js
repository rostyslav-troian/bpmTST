Terrasoft.configuration.Structures["ContentColumnViewModel"] = {innerHierarchyStack: ["ContentColumnViewModel"]};
define("ContentColumnViewModel", ["ContentColumnViewModelResources", "BaseContentBlockViewModel",
	"ContentMjRawElementViewModel", "ContentMjTextElementViewModel", "ContentMjImageElementViewModel",
	"ContentMjButtonElementViewModel", "ContentMjDividerElementViewModel", "ContentSpacerElementViewModel",
	"ContentNavbarElementViewModel", "ContentSmartHtmlElementViewModel", "ContentBuilderConstants"],
	function(resources) {

		/**
		 * Class for ContentColumnViewModel.
		 */
		Ext.define("Terrasoft.controls.ContentColumnViewModel", {
			extend: "Terrasoft.controls.BaseContentBlockViewModel",
			alternateClassName: "Terrasoft.ContentColumnViewModel",

			/**
			 * Name of the view class.
			 * @protected
			 * @type {String}
			 */
			className: "Terrasoft.ContentColumn",

			/**
			 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
			 * @override
			 */
			serializableSlicePropertiesCollection: ["ItemType", "Width", "Styles", "WrapperStyles"],

			/**
			 * @inheritdoc BaseContentSerializableViewModelMixin#childItemTypes
			 */
			childItemTypes: {
				mjraw: "Terrasoft.ContentMjRawElementViewModel",
				smarthtml: "Terrasoft.ContentSmartHtmlElementViewModel",
				text: "Terrasoft.ContentMjTextElementViewModel",
				mjimage: "Terrasoft.ContentMjImageElementViewModel",
				mjbutton: "Terrasoft.ContentMjButtonElementViewModel",
				mjdivider: "Terrasoft.ContentMjDividerElementViewModel",
				navbar: "Terrasoft.ContentNavbarElementViewModel",
				spacer: "Terrasoft.ContentSpacerElementViewModel"
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
				this.set("ReorderableIndex", null);
			},

			/**
			 * @inheritDoc BaseContentItemViewModel#getPreparedConfigBeforeCreate
			 */
			getPreparedConfigBeforeCreate: function(config) {
				var changedConfig = this.callParent(arguments);
				changedConfig.WrapperStyles = Ext.apply({
					"vertical-align": "top",
					"direction": "ltr",
					"width": config.Width + "%"
				}, config.WrapperStyles);
				return changedConfig;
			},

			/**
			 * @inheritdoc Terrasoft.BaseContentBlockViewModel#getViewConfig
			 * @override
			 */
			getViewConfig: function() {
				var config = this.callParent(arguments);
				Ext.apply(config, {
					"selected": "$Selected",
					"columnStyle": "$Styles",
					"wrapStyle": "$WrapperStyles",
					"width": "$Width",
					"isSelectable": true,
					"elementSelectedChange": "$onElementSelected",
					"placeholder": "$Resources.Strings.ContentColumnPlaceholder",
					"reorderableIndex": "$ReorderableIndex",
					"dropGroupName": [Terrasoft.ContentBuilder.constants.ElementDropGroup]
				});
				return config;
			},

			/**
			 * Returns config object of view model edit page.
			 * @protected
			 * @virtual
			 * @returns {Object} Full edit page config.
			 */
			getEditConfig: function() {
				var config = {
					ItemType: this.$ItemType,
					Styles: this.$Styles,
					WrapperStyles: this.$WrapperStyles,
					ElementInfo: {
						Type: this.$ItemType,
						DesignTimeConfig: {
							Caption: resources.localizableStrings.PropertiesPageCaption
						},
						Settings: {
							schemaName: "ContentColumnPropertiesPage",
							panelIcon: resources.localizableImages.PropertiesPageIcon,
							contextHelpText: resources.localizableStrings.PropertiesPageContextHelp,
							useBackgroundImage: false,
							isStylesVisible: true
						}
					}
				};
				return config;
			},

			/**
			 * Handler of event 'itemChanged' of Terrasoft.Collection.
			 * @protected
			 * @param {Terrasoft.BaseViewModel} item Changed collection item.
			 * @param {Object} config Event parameters.
			 */
			onItemChanged: function(item, config) {
				if (config.event) {
					switch (config.event) {
						case "oncopy":
							this.onItemCopy(config.arguments);
							break;
						case "onremove":
							this.onItemRemove(config.arguments);
							break;
						default:
							this.callParent(arguments);
							break;
					}
				}
			},

			/**
			 * Handles events of block copy.
			 * @protected
			 * @param {Object} config Configuration object.
			 */
			onItemCopy: function(config) {
				this.fireEvent("change", this, {
					event: "onelementcopy",
					arguments: {
						id: config.Id,
						container: this
					}
				});
			},

			/**
			 * Handles events of removing element.
			 * @protected
			 * @param {Object} config Element remove config.
			 */
			onItemRemove: function(config) {
				var item = this.$Items.get(config.Id);
				var index = this.$Items.indexOf(item);
				this.$Items.removeByKey(config.Id);
				const itemsCount = this.$Items.getCount();
				if (config.silent) {
					return;
				}
				if (itemsCount > 0) {
					if (index === itemsCount) {
						index--;
					}
					const selectedItem = this.$Items.findByIndex(index);
					if (selectedItem) {
						selectedItem.set("Selected", true);
					}
				} else {
					this.onElementSelected(null);
				}
			},

			/**
			 * Handles events on dragging the element over insertion area.
			 * @protected
			 * @param {String} elementId Identifier of the drag over element.
			 */
			onElementDragOver: function(elementId) {
				var keys = this.$Items.getKeys();
				var index = elementId ? keys.indexOf(elementId) : keys.length - 1;
				this.set("ReorderableIndex", index);
			},

			/**
			 * Handles events on dragging out the element from the insertion area.
			 * @protected
			 */
			onElementDragOut: function() {
				this.set("ReorderableIndex", null);
			},

			/**
			 * Handles events of invalid dragging the item.
			 * @protected
			 */
			onElementInvalidDrop: function() {
				this.set("ReorderableIndex", null);
			},

			/**
			 * Handles events of element insertion.
			 * @protected
			 * @param {Terrasoft.model.BaseViewModel} element The insertion element.
			 */
			onElementDragDrop: function(element) {
				this.fireEvent("change", element, {
					event: "onelementmoved",
					arguments: {
						target: this,
						element: element
					}
				});
			},

			/**
			 * Adds item to collection.
			 * @protected
			 * @param {Terrasoft.model.BaseViewModel} viewModelItem Presentation model of element.
			 */
			addItem: function(viewModelItem) {
				const itemId = viewModelItem.$Id;
				var toIndex = this.$ReorderableIndex;
				if (Ext.isEmpty(toIndex)) {
					this.$Items.add(itemId, viewModelItem);
				} else {
					toIndex++;
					this.$Items.insert(toIndex, itemId, viewModelItem);
				}
				this.set("ReorderableIndex", null);
			}
		});

		return Terrasoft.ContentColumnViewModel;
	}
);


