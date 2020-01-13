/**
 */
Ext.define("Terrasoft.manager.ProcessFlowElementSchemaManager", {
	extend: "Terrasoft.manager.BaseProcessFlowElementSchemaManager",
	alternateClassName: "Terrasoft.ProcessFlowElementSchemaManager",

	singleton: true,

	//region Properties: Protected

	/**
	 * @inheritdoc Terrasoft.BaseSchemaManager#managerName
	 * @protected
	 * @override
	 */
	managerName: "ProcessFlowElementSchemaManager",

	/**
	 * @inheritdoc Terrasoft.BaseProcessFlowElementSchemaManager#coreElementClassNames
	 * @protected
	 * @override
	 */
	coreElementClassNames: [
		{
			itemType: "Terrasoft.ProcessStartEventSchema"
		},
		{
			itemType: "Terrasoft.ProcessStartMessageNonInterruptingSchema"
		},
		{
			itemType: "Terrasoft.ProcessStartMessageSchema",
			initialConfig: {
				isValid: false
			}
		},
		{
			itemType: "Terrasoft.ProcessStartSignalSchema",
			initialConfig: {
				waitingRandomSignal: false,
				waitingEntitySignal: true,
				isValid: false,
				useBackgroundMode: true
			}
		},
		{
			itemType: "Terrasoft.ProcessIntermediateCatchMessageSchema",
			initialConfig: {
				isValid: false
			}
		},
		{
			itemType: "Terrasoft.ProcessIntermediateCatchSignalSchema",
			initialConfig: {
				waitingRandomSignal: false,
				waitingEntitySignal: true,
				isValid: false,
				useBackgroundMode: true
			}
		},
		{
			itemType: "Terrasoft.ProcessIntermediateCatchTimerSchema",
			initialConfig: {
				isValid: false,
				useBackgroundMode: true
			}
		},
		{
			itemType: "Terrasoft.ProcessStartTimerEventSchema",
			initialConfig: {
				isValid: false
			}
		},
		{
			itemType: "Terrasoft.ProcessIntermediateThrowMessageSchema",
			initialConfig: {
				isValid: false
			}
		},
		{
			itemType: "Terrasoft.ProcessIntermediateThrowSignalSchema",
			initialConfig: {
				isValid: false
			}
		},
		{
			itemType: "Terrasoft.ProcessTerminateEventSchema"
		},
		{
			itemType: "Terrasoft.ProcessEndEventSchema"
		},
		{
			itemType: "Terrasoft.ProcessExclusiveGatewaySchema"
		},
		{
			itemType: "Terrasoft.ProcessExclusiveEventBasedGatewaySchema"
		},
		{
			itemType: "Terrasoft.ProcessInclusiveGatewaySchema"
		},
		{
			itemType: "Terrasoft.ProcessParallelGatewaySchema"
		},
		{
			itemType: "Terrasoft.ProcessSubprocessSchema",
			initialConfig: {
				isValid: false
			}
		},
		{
			itemType: "Terrasoft.ProcessScriptTaskSchema",
			initialConfig: {
				useFlowEngineScriptVersion: true
			}
		},
		{
			itemType: "Terrasoft.ProcessFormulaTaskSchema",
			initialConfig: {
				isValid: false
			}
		},
		{
			itemType: "Terrasoft.ProcessSequenceFlowSchema"
		},
		{
			itemType: "Terrasoft.ProcessConditionalSequenceFlowSchema",
			initialConfig: {
				isValid: false
			}
		},
		{
			itemType: "Terrasoft.ProcessDefaultSequenceFlowSchema"
		},
		{
			itemType: "Terrasoft.ProcessLaneSchema"
		},
		{
			itemType: "Terrasoft.ProcessLaneSetSchema"
		},
		{
			itemType: "Terrasoft.ProcessEventSubprocessSchema"
		},
		{
			itemType: "Terrasoft.ProcessEventBasedGatewaySchema"
		},
		{
			itemType: "Terrasoft.ProcessSchemaUserTask",
			initialConfig: {
				isValid: false
			}
		},
		{
			itemType: "Terrasoft.ProcessWebServiceSchema",
			initialConfig: {
				isValid: false
			}
		}
	],

	/**
	 * @inheritdoc Terrasoft.BaseProcessFlowElementSchemaManager#notImplementedElementNames
	 * @protected
	 * @override
	 */
	notImplementedElementNames: [],

	/**
	 * @inheritdoc Terrasoft.BaseProcessFlowElementSchemaManager#serviceTaskElementNames
	 * @protected
	 * @override
	 */
	serviceTaskElementNames: [
		"SendEmailUserTask",
		"FormulaTask",
		"ScriptTask",
		"ChangeAdminRightsUserTask",
		"LinkEntityToProcessUserTask",
		"ReadDataUserTask",
		"ChangeDataUserTask",
		"AddDataUserTask",
		"DeleteDataUserTask",
		"WebService",
		"MLDataPredictionUserTask"
	],

	/**
	 * @inheritdoc Terrasoft.BaseProcessFlowElementSchemaManager#obsoleteElementNames
	 * @protected
	 * @override
	 */
	obsoleteElementNames: [
		"SendEmailUserTask",
		"EmailUserTask"
	],

	/**
	 * Array of email elements.
	 * @protected
	 */
	emailElementNames: [
		"EmailUserTask",
		"SendEmailUserTask"
	],

	/**
	 * @inheritdoc Terrasoft.BaseProcessFlowElementSchemaManager#notImplementedElementsFeatureCode
	 * @override
	 */
	notImplementedElementsFeatureCode: "ProcessNotImplementedElements",

	/**
	 * @inheritdoc Terrasoft.BaseProcessFlowElementSchemaManager#obsoleteElementsFeatureCode
	 * @override
	 */
	obsoleteElementsFeatureCode: "ProcessObsoletedElements",

	/**
	 * @inheritdoc Terrasoft.BaseProcessFlowElementSchemaManager#userTaskSchemaManagerName
	 * @override
	 */
	userTaskSchemaManagerName: "ProcessUserTaskSchemaManager",

	//endregion

	//region Methods: Public

	/**
	 * Returns flag that indicates whether item is Email element.
	 * @param {Terrasoft.ProcessFlowElement} element Process element.
	 * @return {Boolean} True if item is Email element, else false.
	 */
	getIsEmailElement: function(element) {
		var managerItemUId = element.managerItemUId;
		if (!managerItemUId) {
			return false;
		}
		var item = this.findItem(managerItemUId);
		return item ? this.emailElementNames.indexOf(item.name) > -1 : false;
	},

	/**
	 * Returns if element can be coping.
	 * @param {Terrasoft.ProcessBaseElementSchema} element Element for copy.
	 * @return {Boolean}
	 */
	allowElementCopy: function(element) {
		if (!element) {
			return false;
		}
		var itemUId = element.managerItemUId;
		if (!itemUId) {
			return false;
		}
		var allowTypes = [
			Terrasoft.diagram.UserHandlesConstraint.Node,
			Terrasoft.diagram.UserHandlesConstraint.Gateway,
			Terrasoft.diagram.UserHandlesConstraint.Event,
			Terrasoft.diagram.UserHandlesConstraint.Subprocess
		];
		return Ext.Array.contains(allowTypes, element.nodeType);
	}

	//endregion

});
