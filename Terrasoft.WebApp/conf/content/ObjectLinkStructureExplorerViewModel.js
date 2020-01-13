Terrasoft.configuration.Structures["ObjectLinkStructureExplorerViewModel"] = {innerHierarchyStack: ["ObjectLinkStructureExplorerViewModel"]};
define("ObjectLinkStructureExplorerViewModel", ["StructureExplorerMainViewModel"],
function() {

	/**
	 * @class Terrasoft.configuration.ObjectLinkStructureExplorerViewModel
	 * Object link structure explorer view model class.
	 */
	Ext.define("Terrasoft.configuration.ObjectLinkStructureExplorerViewModel", {
		extend: "Terrasoft.StructureExplorerMainViewModel",
		alternateClassName: "Terrasoft.ObjectLinkStructureExplorerViewModel",

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.StructureExplorerMainViewModel#init
		 * @overridden
		 */
		init: function(callback, scope) {
			this.$IsBottomPanelVisible = false;
			this.callParent([function() {
				Ext.callback(callback, scope || this);
			}, this]);
		},

		/**
		 * @inheritdoc Terrasoft.StructureExplorerMainViewModel#modifySelectResponse
		 * @overridden
		 */
		modifySelectResponse: function() {
			let response = this.callParent(arguments);
			response.linkColor = this.$LinkColor;
			return response;
		},

		/**
		 * @inheritdoc Terrasoft.StructureExplorerMainViewModel#setSourceItems
		 * @overridden
		 */
		setSourceItems: function(identifier, callback, scope) {
			this.callParent([identifier, function(items) {
				const referenceSchemaName = identifier.referenceSchemaName;
				const referenceSchema = Terrasoft[referenceSchemaName];
				if (referenceSchema) {
					var primaryDisplayColumn = referenceSchema.primaryDisplayColumn;
					if (primaryDisplayColumn) {
						var entitySchemaColumn = {
							columnName: primaryDisplayColumn.name,
							customHtml: primaryDisplayColumn.caption,
							dataValueType: Terrasoft.DataValueType.TEXT,
							displayValue: primaryDisplayColumn.caption,
							isLookup: false,
							markerValue: primaryDisplayColumn.name.concat(" ", primaryDisplayColumn.caption),
							value: primaryDisplayColumn.uId
						};
						this.set("EntitySchemaColumn", entitySchemaColumn);
					}
				}
				Ext.callback(callback, scope, [items]);
			}, this]);
			
			
		}

		//endregion

	});
	return Terrasoft.ObjectLinkStructureExplorerViewModel;
});


