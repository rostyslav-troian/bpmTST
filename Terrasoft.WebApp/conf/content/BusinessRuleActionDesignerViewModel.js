Terrasoft.configuration.Structures["BusinessRuleActionDesignerViewModel"] = {innerHierarchyStack: ["BusinessRuleActionDesignerViewModel"]};
define("BusinessRuleActionDesignerViewModel", ["BusinessRuleActionDesignerViewModelResources",
	"BusinessRuleElementDesignerViewModel"], function(resources) {

		/**
		 * @class Terrasoft.Designers.BusinessRuleActionDesignerViewModel
		 */
		Ext.define("Terrasoft.Designers.BusinessRuleActionDesignerViewModel", {
			extend: "Terrasoft.BusinessRuleElementDesignerViewModel",
			alternateClassName: "Terrasoft.BusinessRuleActionDesignerViewModel",

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseModel#getModelColumns
			 * @protected
			 * @overridden
			 */
			getModelColumns: function() {
				var baseColumns = this.callParent(arguments);
				return this.Ext.apply(baseColumns, {
					"ControlClassName": {
						"type": Terrasoft.core.enums.ViewModelColumnType.VIRTUAL_COLUMN,
						"dataValueType": Terrasoft.core.enums.DataValueType.TEXT
					},
					"RemoveActionIcon": {
						"dataValueType": Terrasoft.DataValueType.IMAGE,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": resources.localizableImages.RemoveActionIcon
					},
					"DefaultExpressionCaption": {
						"dataValueType": Terrasoft.DataValueType.TEXT,
						"type": Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
						"value": resources.localizableStrings.DefaultExpressionCaption
					}
				});
			},

			/**
			 * Return action title.
			 * @abstract
			 * @protected
			 * @return {String} Action title.
			 */
			getActionTitle: Terrasoft.abstractFn,

			/**
			 * Return title items.
			 * @protected
			 * @return {Array} Title items.
			 */
			getTitleItems: function() {
				return [{
					"className": "Terrasoft.Label",
					"caption": {"bindTo": "getActionTitle"}
				}, {
					"className": "Terrasoft.Button",
					"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
					"click": {"bindTo": "onRemoveButtonClick"},
					"imageConfig": {"bindTo": "RemoveActionIcon"},
					"markerValue": "RemoveAction"
				}];
			},

			/**
			 * Handler of remove button click.
			 * @protected
			 */
			onRemoveButtonClick: function() {
				this.fireEvent("removeAction", this);
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseObject#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.addEvents(
					"removeAction"
				);
			},

			/**
			 * Enrich view config.
			 * @public
			 * @param  {Object} config View config.
			 */
			enrichViewConfig: function(config) {
				this.Ext.apply(config, {
					"className": this.get("ControlClassName"),
					"titleItems": this.getTitleItems()
				});
			}

			//endregion

		});
	});


