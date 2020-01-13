/**
 */
Ext.define("Terrasoft.manager.ProcessIntermediateCatchTimerSchema", {
	extend: "Terrasoft.ProcessBaseEventSchema",
	alternateClassName: "Terrasoft.ProcessIntermediateCatchTimerSchema",

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#managerItemUId
	 */
	managerItemUId: "97d1af3d-ef13-465c-b6d8-5425f78bf000",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#emptyDiagramCaption
	 * @override
	 */
	emptyDiagramCaption: false,

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#caption
	 */
	caption: Terrasoft.Resources.ProcessSchemaDesigner.Elements.IntermediateCatchTimerCaption,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#group
	 */
	group: Terrasoft.FlowElementGroup.IntermediateEvent,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#name
	 */
	name: "IntermediateCatchTimer",

	/**
	 * @inheritdoc Terrasoft.ProcessBaseElementSchema#typeName
	 * @override
	 */
	typeName: "Terrasoft.Core.Process.ProcessSchemaIntermediateCatchTimerEvent",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#smallImageName
	 */
	smallImageName: "intermediateCatchTimer_small.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#largeImageName
	 */
	largeImageName: "intermediateCatchTimer_large.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#titleImageName
	 * @override
	 */
	titleImageName: "intermediateCatchTimer_title.svg",

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#useBackgroundMode
	 * @override
	 */
	useBackgroundMode: true,

	/**
	 * @inheritdoc Terrasoft.manager.ProcessBaseElementSchema#editPageSchemaName
	 */
	editPageSchemaName: "IntermediateCatchTimerPropertiesPage",

	/**
	 * @protected
	 * @type {Boolean}
	 */
	cancelActivity: false,

	/**
	 * @protected
	 * @type {enum}
	 */
	boundaryItemAlignment: null,

	/**
	 * @inheritdoc Terrasoft.manager.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.parameters = [{
			uId: Terrasoft.generateGUID(),
			name: "StartOffset",
			caption: Ext.create("Terrasoft.LocalizableString", {
				cultureValues: Terrasoft.Resources.ProcessSchemaDesigner.Parameters.StartOffSetCaption
			}),
			dataValueType: Terrasoft.DataValueType.INTEGER,
			sourceValue: {
				value: "0",
				source: Terrasoft.ProcessSchemaParameterValueSource.ConstValue,
				displayValue: Ext.create("Terrasoft.LocalizableString", {
					cultureValues: "0"
				})
			}
		}];
		this.callParent(arguments);
	}

});
