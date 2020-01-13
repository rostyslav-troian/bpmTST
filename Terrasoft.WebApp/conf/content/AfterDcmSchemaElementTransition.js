Terrasoft.configuration.Structures["AfterDcmSchemaElementTransition"] = {innerHierarchyStack: ["AfterDcmSchemaElementTransition"]};
define("AfterDcmSchemaElementTransition", ["AfterDcmSchemaElementTransitionResources",
		"DefaultDcmSchemaElementTransition"],
	function(resources) {
		Ext.define("Terrasoft.configuration.AfterDcmSchemaElementTransition", {
			extend: "Terrasoft.DefaultDcmSchemaElementTransition",
			alternateClassName: "Terrasoft.AfterDcmSchemaElementTransition",

			statics: {
				caption: resources.localizableStrings.Caption,
				typeUId: "f38307ae-26d6-4e66-ac91-1d07a0e1f252",
				typeName: "Terrasoft.Core.DcmProcess.AfterDcmSchemaElementTransition"
			},

			//region Properties: Public

			/**
			 * Source DcmSchemaElement uId after which {@link #elementUId} should be run.
			 */
			sourceElementUId: null,

			//endregion

			//region Methods: Protected

			/**
			 * Returns class statics members.
			 * @overridden
			 * @protected
			 * @return {Object}
			 */
			getStatics: function() {
				return this.statics();
			},

			//endregion

			//region Methods: Private

			/**
			 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
			 * @overridden
			 */
			getSerializableProperties: function() {
				var properties = this.callParent(arguments);
				return Ext.Array.push(properties, ["sourceElementUId"]);
			},

			//endregion

			//region Methods: Public

			/**
			 * Returns DcmSchemaElement transition source element. Returns source DcmSchemaElement.
			 * @overridden
			 * @return {Terrasoft.BaseProcessSchemaElement}
			 */
			findSourceElement: function() {
				return this.parentSchema.findItemByUId(this.sourceElementUId);
			},

			/**
			 * @inheritdoc Terrasoft.DefaultDcmSchemaElementTransition#validate
			 * @overridden
			 * @return {Boolean}
			 */
			validate: function() {
				var isValid = this.callParent(arguments);
				if (!isValid) {
					return false;
				}
				var sourceDcmElement = this.findSourceElement();
				var dcmElement = this.findElement();
				var sourceDcmElementContainerUId = sourceDcmElement ? sourceDcmElement.containerUId : null;
				var isElementsInOneContainer = sourceDcmElementContainerUId === dcmElement.containerUId;
				return isElementsInOneContainer;
			}

			//endregion

		});
		return Terrasoft.AfterDcmSchemaElementTransition;
	}
);


