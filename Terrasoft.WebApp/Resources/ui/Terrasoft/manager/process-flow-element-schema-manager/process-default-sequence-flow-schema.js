/**
 */
Ext.define("Terrasoft.manager.ProcessDefaultSequenceFlowSchema", {
	extend: "Terrasoft.ProcessSequenceFlowSchema",
	alternateClassName: "Terrasoft.ProcessDefaultSequenceFlowSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "573ed909-e069-4161-b193-ae8dd9437c68",

	/**
	 * @inheritdoc Terrasoft.ProcessSequenceFlowSchema#connectionUserHandleName
	 * @override
	 */
	connectionUserHandleName: "DefaultSequenceFlow",

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 * @protected
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.DefaultFlowCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "defaultSequenceFlow_title.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessSequenceFlowSchema#flowType
	 * @override
	 * @protected
	 */
	flowType: Terrasoft.ProcessSchemaEditSequenceFlowType.DEFAULT,

	/**
	 * Hint of element.
	 * @protected
	 * @type {String}
	 */
	hint:  Terrasoft.Resources.ProcessSchemaDesigner.Elements.DefaultFlowHint,

	//endregion

	//region Methods: Protected

	/**
	 * @inheritdoc Terrasoft.manager.ProcessSequenceFlowSchema#getFlowConfig
	 * @override
	 */
	getFlowConfig: function() {
		var flowConfig = this.callParent(arguments);
		flowConfig.sourceDecorator = {
			shape: ej.Diagram.DecoratorShapes.Path,
			"width": this.diamondWidth,
			"height": this.diamondHeight,
			"borderColor": this.connectorLineColor,
			"pathData": "M0 4L12 4M3 0 L12 8"
		};
		return flowConfig;
	}

	//endregion

});
