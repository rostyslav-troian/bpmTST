Terrasoft.configuration.Structures["SspReadOnlyModeModule"] = {innerHierarchyStack: ["SspReadOnlyModeModule"]};
define("SspReadOnlyModeModule", ["SspReadOnlyModeModuleResources", "BaseViewModule", "css!SspReadOnlyModeModuleCSS"],
	function(resources) {
		Ext.define("Terrasoft.configuration.SspReadOnlyModeModule", {

			extend: "Terrasoft.BaseViewModule",
			alternateClassName: "Terrasoft.SspReadOnlyModeModule",

			/**
			 * Handler for read only button click.
			 * @public
			 */
			onReadOnlyButtonClick: Terrasoft.emptyFn,

			/**
			 * Provides configuration object for read only button and it's container.
			 * @private
			 * @return {Object} Configuration object for read only button container.
			 */
			_getReadOnlyButtonView: function() {
				var sspReadOnlyButton = Ext.create("Terrasoft.Button", {
					"caption": resources.localizableStrings.ReadOnlyButtonCaption,
					"style": Terrasoft.controls.ButtonEnums.style.BLUE,
					"classes": {
						"textClass": ["read-only-button"]
					},
					"click": {"bindTo": "onReadOnlyButtonClick"},
					"markerValue": "readOnlyButton"
				});
				var sspReadOnlyButtonContainer = Ext.create("Terrasoft.Container", {
					"items": [sspReadOnlyButton],
					"classes": {
						"wrapClassName": ["read-only-button-container"]
					}
				});
				return sspReadOnlyButtonContainer;
			},

			/**
			 * @inheritDoc Terrasoft.configuration.BaseViewModule#init
			 * @override
			 */
			init: function() {
				var sspReadOnlyButtonContainer = this._getReadOnlyButtonView();
				sspReadOnlyButtonContainer.bind(this);
				var container = Ext.get(this.renderToId);
				sspReadOnlyButtonContainer.render(container);
			}

		});
		return Terrasoft.SspReadOnlyModeModule;
	});


