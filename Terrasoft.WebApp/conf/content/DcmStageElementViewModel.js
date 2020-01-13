Terrasoft.configuration.Structures["DcmStageElementViewModel"] = {innerHierarchyStack: ["DcmStageElementViewModel"]};
define("DcmStageElementViewModel", ["ext-base", "DcmStageElement"],
	function(Ext) {
		/**
		 * @class Terrasoft.Designers.DcmStageElementViewModel
		 */
		Ext.define("Terrasoft.Designers.DcmStageElementViewModel", {

			extend: "Terrasoft.BaseViewModel",

			alternateClassName: "Terrasoft.DcmStageElementViewModel",

			mixins: {
				ReorderableItemVMMixin: "Terrasoft.ReorderableItemVMMixin",
				ObservableItem: "Terrasoft.ObservableItem"
			},

			columns: {
				/**
				 * Dcm schema.
				 * @type {Terrasoft.DcmSchema}
				 */
				Schema: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.core.enums.DataValueType.CUSTOM_OBJECT
				},

				/**
				 * Caption.
				 * @type {Terrasoft.String}
				 */
				Caption: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.core.enums.DataValueType.TEXT
				},

				/**
				 * Flag that indicators the element is selected.
				 * @type {Boolean}
				 */
				Selected: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.core.enums.DataValueType.BOOLEAN
				},

				/**
				 * Flag that indicators the element validation state.
				 * @type {Boolean}
				 */
				IsValid: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.core.enums.DataValueType.BOOLEAN
				},

				/**
				 * Flag that indicates whether element property page executes validation.
				 * @type {Boolean}
				 */
				IsValidateExecuted: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.core.enums.DataValueType.BOOLEAN
				},

				/**
				 * Flag that indicators the element required state.
				 * @type {Number}
				 */
				RequiredType: {
					type: Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
					dataValueType: Terrasoft.core.enums.DataValueType.INTEGER
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.mixins.ReorderableItemVMMixin.preInit.call(this);
				this.initAttributes();
				var element = this.getSchemaElement();
				this.subscribeOnItemChanged(element);
				this.subscribeOnItemChanged(element.processFlowElement);
			},

			/**
			 * Init attributes of view model.
			 * @protected
			 */
			initAttributes: function() {
				var element = this.getSchemaElement();
				this.set("Name", element.name);
				this.set("IsValidateExecuted", element.isValidateExecuted);
				this.set("IsValid", element.isValid);
				this.set("RequiredType", element.requiredType);
				var caption = element.caption;
				var captionValue = caption && caption.getValue();
				this.set("Caption", captionValue);
			},

			/**
			 * Returns DCM schema element.
			 * @return {Terrasoft.DcmSchemaElement|null}
			 */
			getSchemaElement: function() {
				var schema = this.get("Schema");
				var id = this.get("Id");
				var element = schema.findItemByUId(id);
				return element;
			},

			/**
			 * Returns image configuration.
			 * @protected
			 * @return {Object} Image config.
			 */
			getImageConfig: function() {
				var element = this.getSchemaElement();
				var image = element.getDcmSmallImage();
				var imageUrl = Terrasoft.ImageUrlBuilder.getUrl(image);
				return {
					source: Terrasoft.ImageSources.URL,
					url: imageUrl
				};
			},

			/**
			 * Returns module view configuration.
			 * @return {Object} Module view configuration.
			 */
			getViewConfig: function() {
				return {
					className: "Terrasoft.DcmStageElement",
					groupName: "dcm-stage-items",
					tag: this.get("Id"),
					id: this.get("Id"),
					caption: {
						bindTo: "Caption"
					},
					markerValue: {
						bindTo: "Caption"
					},
					isValidateExecuted: {
						bindTo: "IsValidateExecuted"
					},
					isValid: {
						bindTo: "IsValid"
					},
					requiredType: {
						bindTo: "RequiredType"
					},
					selected: {
						bindTo: "Selected"
					},
					imageConfig: {
						bindTo: "getImageConfig"
					},
					onDragEnter: {
						bindTo: "onDragEnter"
					},
					onDragDrop: {
						bindTo: "onDragDrop"
					},
					onDragOut: {
						bindTo: "onDragOut"
					}
				};
			},

			/**
			 * @inheritdoc Terrasoft.ObservableItem#getItemAttributeValue
			 * @overridden
			 */
			getItemAttributeValue: function(item, key) {
				var value = this.mixins.ObservableItem.getItemAttributeValue.call(this, item, key);
				if (value instanceof Terrasoft.LocalizableString) {
					value = value.getValue();
				}
				return value;
			},

			/**
			 * @inheritdoc Terrasoft.ObservableItem#getAttributeMap
			 * @overridden
			 */
			getAttributeMap: function() {
				var attributeMap = this.mixins.ObservableItem.getAttributeMap.call(this);
				var attributes = {
					caption: "Caption",
					isValidateExecuted: "IsValidateExecuted",
					isValid: "IsValid",
					requiredType: "RequiredType"
				};
				return Ext.apply(attributeMap, attributes);
			},

			/**
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 * @overridden
			 */
			onDestroy: function() {
				this.unsubscribeAllItems();
				this.callParent(arguments);
			},

			/**
			 * Set selected item.
			 * @param {Boolean} isSelected A flag that indicates that the item is selected.
			 */
			setSelected: function(isSelected) {
				this.set("Selected", isSelected);
			}
		});
		return Terrasoft.Designers.DcmStageElementViewModel;
	}
);


