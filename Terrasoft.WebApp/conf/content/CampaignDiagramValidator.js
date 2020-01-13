Terrasoft.configuration.Structures["CampaignDiagramValidator"] = {innerHierarchyStack: ["CampaignDiagramValidator"]};
define("CampaignDiagramValidator", ["CampaignDiagramValidatorResources", "CampaignEnums", "ServiceHelper"],
	function(resources, CampaignEnums, ServiceHelper) {

		/**
		 * @class Terrasoft.configuration.CampaignDiagramValidator
		 * Class validate campaign diagram.
		 */
		Ext.define("Terrasoft.configuration.CampaignDiagramValidator", {

			extend: "Terrasoft.BaseObject",

			alternateClassName: "Terrasoft.CampaignDiagramValidator",

			/**
			 * Campaign diagram validators.
			 */
			diagramValidations: [
				{
					"validateFn": "hasStartElement",
					"message": resources.localizableStrings.DiagramContainsStartElementMessage
				},
				{
					"validateFn": "hasCommunicationElements",
					"message": resources.localizableStrings.DiagramContainsCommunicationElementsMessage
				},
				{
					"validateFn": "hasUnlinkedAudience",
					"message": resources.localizableStrings.DiagramAudienceLinkedMessage
				},
				{
					"validateFn": "hasUnlinkedLanding",
					"message": resources.localizableStrings.DiagramLandingLinkedMessage
				},
				{
					"validateFn": "validateTargetElementLink",
					"message": resources.localizableStrings.DiagramTargetLinkedMessage
				},
				{
					"validateFn": "validateCommunicationElementsLinks",
					"message": resources.localizableStrings.DiagramCommunicationElementsLinkedMessage
				},
				{
					"validateFn": "isDiagramElementsFilled",
					"message": resources.localizableStrings.DiagramElementsFilledMessage
				}
			],

			/**
			 * Asynchronous campaign diagram validators.
			 */
			diagramValidationsAsync: [
				{
					"validateFn": "hasEmptyTemplate"
				},
				{
					"validateFn": "validateLandingElements"
				}
			],

			/**
			 * Campaign diagram errors list.
			 */
			errors: null,

			/**
			 * Campaign diagram.
			 */
			diagram: null,

			/**
			 * Check if step must contain link to entity.
			 * @protected
			 * @virtusl
			 * @param {Object} stepType Step type.
			 * @return {Boolean}
			 */
			stepNeedsContainEntity: function(stepType) {
				var stepTypes = [CampaignEnums.StepType.EMAIL_MAILING, CampaignEnums.StepType.EVENT,
					CampaignEnums.StepType.LANDING];
				return Terrasoft.contains(stepTypes, stepType);
			},

			/**
			 * Check if step is communication element.
			 * @protected
			 * @virtusl
			 * @param {Object} stepType Step type.
			 * @return {Boolean}
			 */
			isCommunicationElementType: function(stepType) {
				var stepTypes = [CampaignEnums.StepType.EMAIL_MAILING, CampaignEnums.StepType.EVENT,
					CampaignEnums.StepType.CREATE_LEAD];
				return Terrasoft.contains(stepTypes, stepType);
			},

			/**
			 * Check if start diagram element exists.
			 * @protected
			 * @virtual
			 * @return {Boolean}
			 */
			hasStartElement: function() {
				var startElements = [CampaignEnums.StepType.LANDING, CampaignEnums.StepType.CAMPAIGN_AUDIENCE];
				var diagram = this.diagram;
				var result = false;
				var nodes = diagram.nodes;
				var length = (nodes && nodes.length);
				for (var i = 0; i < length; i++) {
					var node = nodes[i];
					if (Terrasoft.contains(startElements, node.stepType)) {
						result = true;
						break;
					}
				}
				return result;
			},

			/**
			 * Check if diagram have Audience without OUTgoing link.
			 * @protected
			 * @virtual
			 * @return {Boolean}
			 */
			hasUnlinkedAudience: function() {
				var diagram = this.diagram;
				var result = true;
				var nodes = diagram.nodes;
				var length = (nodes && nodes.length);
				for (var i = 0; i < length; i++) {
					var node = nodes[i];
					if (node.stepType === CampaignEnums.StepType.CAMPAIGN_AUDIENCE) {
						result = false;
						if (node.outEdges) {
							result = (node.outEdges.length > 0);
						}
						break;
					}
				}
				return result;
			},

			/**
			 * Check if diagram have Landing without OUTgoing link.
			 * @protected
			 * @virtual
			 * @return {Boolean}
			 */
			hasUnlinkedLanding: function() {
				var diagram = this.diagram;
				var result = true;
				var nodes = diagram.nodes;
				var length = (nodes && nodes.length);
				for (var i = 0; i < length; i++) {
					var node = nodes[i];
					if (node.stepType === CampaignEnums.StepType.LANDING) {
						result = false;
						if (node.outEdges) {
							result = (node.outEdges.length > 0);
						}
						break;
					}
				}
				return result;
			},

			/**
			 * Check if all communication elements in diagram are filled.
			 * @protected
			 * @virtual
			 * @return {Boolean}
			 */
			isDiagramElementsFilled: function() {
				var diagram = this.diagram;
				var result = true;
				var nodes = diagram.nodes;
				var length = (nodes && nodes.length);
				for (var i = 0; i < length; i++) {
					var node = nodes[i];
					if (this.stepNeedsContainEntity(node.stepType)) {
						result = ((node.addInfo && node.addInfo.RecordId) !== undefined);
						if (!result) {
							break;
						}
					}
				}
				return result;
			},

			/**
			 * Checks if all Landing elements are valid.
			 * @protected
			 * @param {Function} callback Callback function.
			 */
			validateLandingElements: function(callback) {
				if (Terrasoft.Features.getIsEnabled("OutboundCampaign")) {
					var chainActions = [];
					var diagram = this.diagram;
					var nodes = diagram.nodes;
					Terrasoft.each(nodes, function(node) {
						chainActions.push(this.isLandingElementsValid.bind(this, node));
					}, this);
					chainActions.push(callback);
					Terrasoft.chain.apply(this, chainActions);
				} else {
					callback();
				}
			},

			/**
			 * Checks if Landing elements is valid.
			 * @param {Object} node Node.
			 * @param {Function} callback Callback function.
			 */
			isLandingElementsValid: function(node, callback) {
				var addInfo = node.addInfo;
				if (node.stepType === CampaignEnums.StepType.LANDING && addInfo && addInfo.RecordId &&
						!Ext.isEmpty(node.inEdges)) {
					var recordId = addInfo.RecordId;
					this.getLanding(recordId, function(response) {
						if (response.success && response.collection.getCount() === 0) {
							this.errors.push({message: resources.localizableStrings.DiagramLandingValidMessage});
						}
						callback();
					}, this);
				} else {
					callback();
				}
			},

			/**
			 * Returns landing by recordId if its type is correct.
			 * @param {String} recordId Record unique identifier.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			getLanding: function(recordId, callback, scope) {
				var esq = this.getLandingEntitySchemaQuery(recordId);
				esq.getEntityCollection(function(response) {
					Ext.callback(callback, this, [response]);
				}, scope || this);
			},

			/**
			 * Returns EntitySchemaQuery for Landing validation
			 * @param {String} recordId Record unique identifier.
			 */
			getLandingEntitySchemaQuery: function(recordId) {
				var esq = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "GeneratedWebForm"
				});
				esq.addColumn("Id");
				var filterGroup = Terrasoft.createFilterGroup();
				filterGroup.logicalOperation = Terrasoft.LogicalOperatorType.AND;
				filterGroup.add("IdFilter", Terrasoft.createColumnFilterWithParameter(
					Terrasoft.ComparisonType.EQUAL, "Id", recordId));
				filterGroup.addItem(Terrasoft.createColumnInFilterWithParameters(
					"Type.SchemaUid.Name", [
						"EventTarget",
						"Lead"
					]));
				esq.filters.add(filterGroup);
				return esq;
			},

			/**
			 * Check if all communication elements have incoming link.
			 * @protected
			 * @virtual
			 * @return {Boolean}
			 */
			validateCommunicationElementsLinks: function() {
				var diagram = this.diagram;
				var result = true;
				var nodes = diagram.nodes;
				var length = (nodes && nodes.length);
				for (var i = 0; i < length; i++) {
					var node = nodes[i];
					if (this.isCommunicationElementType(node.stepType)) {
						result = false;
						if (node.inEdges) {
							result = (node.inEdges.length > 0);
						}
						if (!result) {
							break;
						}
					}
				}
				return result;
			},

			/**
			 * Check if diagram contains at least one element except start.
			 * @protected
			 * @virtual
			 * @return {Boolean}
			 */
			hasCommunicationElements: function() {
				var diagram = this.diagram;
				var result = false;
				var nodes = diagram.nodes;
				var length = (nodes && nodes.length);
				for (var i = 0; i < length; i++) {
					var node = nodes[i];
					if (this.isCommunicationElementType(node.stepType)) {
						result = true;
						break;
					}
				}
				return result;
			},

			/**
			 * Chek if diagram target element is linked.
			 * @protected
			 * @virtual
			 * @return {Boolean}
			 */
			validateTargetElementLink: function() {
				var diagram = this.diagram;
				var result = true;
				var nodes = diagram.nodes;
				var length = (nodes && nodes.length);
				for (var i = 0; i < length; i++) {
					var node = nodes[i];
					if (node.stepType === CampaignEnums.StepType.TARGET) {
						result = false;
						if (node.inEdges) {
							result = (node.inEdges.length > 0);
						}
						break;
					}
				}
				return result;
			},

			/**
			 * Check if all emails have template.
			 * @protected
			 * @virtual
			 * @param {Function} callback Callback function.
			 */
			hasEmptyTemplate: function(callback) {
				if (!Ext.isEmpty(this.errors)) {
					callback();
				}
				var diagram = this.diagram;
				var nodes = diagram.nodes;
				var emails = [];
				Terrasoft.each(nodes, function(node) {
					if (node.stepType === CampaignEnums.StepType.EMAIL_MAILING) {
						var recordId = (node.addInfo && node.addInfo.RecordId);
						if (Terrasoft.isGUID(recordId)) {
							emails.push(recordId);
						}
					}
				}, this);
				if (!Ext.isEmpty(emails)) {
					var dataSend = {
						bulkEmailIds: emails
					};
					var serviceName = "CampaignService";
					var methodName = "EmptyTemplateValidation";
					ServiceHelper.callService(serviceName, methodName, function(response) {
						var result = response[methodName + "Result"];
						if (result) {
							this.errors.push({message: resources.localizableStrings.EmptyTemplateExistMessage});
						}
						callback();
					}, dataSend, this);
				} else {
					callback();
				}
			},

			/**
			 * Validate campaign diagram.
			 * @virtual
			 * @param {Object} diagram Campaign diagram.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope The scope in which the callback function is executed.
			 */
			validateDiagram: function(diagram, callback, scope) {
				this.errors = [];
				this.diagram = diagram;
				var validators = this.diagramValidations;
				if (validators) {
					var length = validators.length;
					for (var i = 0; i < length; i++) {
						var validation = validators[i];
						var valid = this[validation.validateFn]();
						if (!valid) {
							this.errors.push({
								message: validation.message
							});
						}
					}
				}
				var asyncActions = [];
				var validatorsAsync = this.diagramValidationsAsync;
				if (validatorsAsync) {
					var lengthAsync = validatorsAsync.length;
					for (var y = 0; y < lengthAsync; y++) {
						asyncActions.push(this[validatorsAsync[y].validateFn]);
					}
				}
				asyncActions.push(function() {
					if (callback) {
						var result = Ext.isEmpty(this.errors) ? null : this.errors;
						callback.call(scope, result);
					}
				});
				Terrasoft.chain.apply(this, asyncActions);
			}

		});

		return Terrasoft.CampaignDiagramValidator;
	});


