Terrasoft.configuration.Structures["CampaignEnums"] = {innerHierarchyStack: ["CampaignEnums"]};
define("CampaignEnums", ["CampaignEnumsResources"],
	function(resources) {
		return {
			/**
			 * @enum
			 * Campaign diagram element type.
			 */
			StepType: {
				/* Bulk email */
				EMAIL_MAILING: "0270a11d-534c-40ec-8a72-c4902d6afb09",
				/* Event */
				EVENT: "75b0f8d2-a3f4-4715-ad37-a501543af26c",
				/* Campaign audience */
				CAMPAIGN_AUDIENCE: "36503c76-9542-45b6-a934-a61f2b9bce48",
				/* Target */
				TARGET: "30eb28eb-bb1f-4d18-9358-55556d80d833",
				/* Exiting from campaign */
				EXITING_CAMPAIGN: "b748cdc5-b478-4ed1-8b52-51513ee49ed9",
				/* Landing */
				LANDING: "5e9d3401-8047-4833-b9f0-c2c8d3dbbe62",
				/* Create lead */
				CREATE_LEAD: "12c48da4-8305-4aa7-92a9-2c75dc5d458b"
			},

			/**
			 * @enum
			 * Campaign filter types.
			 */
			CampaignFilter: {
				FORM_SUBMITTED: "71eb567e-4342-4442-bd28-70f0f32f7267",
				FORM_NOT_SUBMITTED: "b5bea8f2-04de-4a8f-a6c3-a35c14df6881",
				EMAIL_CLICKED: "7eaff636-eab8-4ebd-817a-5fb82a728f17"
			},

			/**
			 * @enum
			 * Campaign status.
			 */
			CampaignStatus: {
				/* Executed */
				EXECUTED: "49cc0a4f-75df-4b47-953b-0faa4983321d",
				/* Finished */
				FINISHED: "5b792494-d40f-4b2b-8cfd-ab75ac5d33aa",
				/* Planned */
				PLANNED: "24b80784-2172-4903-94ad-ca1fddf368dd",
				/* Stopped */
				STOPPED: "9168c6b6-68e9-469c-9792-769bb39de25f",
				/* Scheduled */
				SCHEDULED: "d55a44bb-fa64-45f5-b83d-c5ef7cd76208"
			},

			/**
			 * Singleton step types.
			 */
			SingletonStepTypes: Terrasoft.Features.getIsEnabled("OutboundCampaign")
					? [
						/* Campaign Audience */
						"36503c76-9542-45b6-a934-a61f2b9bce48"
					]
					: [
						/* Campaign audience*/
						"36503c76-9542-45b6-a934-a61f2b9bce48",
						/* Lending */
						"5e9d3401-8047-4833-b9f0-c2c8d3dbbe62"
					],

			/**
			 * Element sizes.
			 */
			StepTypeSize: {
				/* Default value */
				"Default": {
					"height": 56,
					"width": 56
				},
				/* Value for small elements */
				"Small": {
					"height": 47,
					"width": 49
				}
			},

			/**
			 * CampaignSchemaElementType to indicate type of flow element
			 * @type {Object}
			 */
			CampaignSchemaElementTypes: {
				/* Conditional transition element */
				CONDITIONAL_TRANSITION: "ConditionalTransition",
				/* Simple transition element */
				TRANSITION: "Transition",
				/* Marketing email element */
				MARKETING_EMAIL: "MarketingEmail",
				/* Campaign landing element */
				CAMPAIGN_LANDING: "CampaignLanding",
				/* Campaign event element */
				CAMPAIGN_EVENT: "CampaignEvent",
				/* Add audience element */
				ADD_AUDIENCE: "AddAudience",
				/* Exit audience element */
				EXIT_AUDIENCE: "ExitAudience",
				/* Campaign timer element */
				CAMPAIGN_TIMER: "CampaignTimer",
				/* Campaign add object element */
				ADD_OBJECT_ELEMENT: "CampaignAddObject",
				/* Campaign update object element */
				UPDATE_OBJECT_ELEMENT: "CampaignUpdateObject"
			},

			/**
			 * Available operations on campaign page.
			 * @type {Object}
			 */
			CampaignPageOperations: {
				UPDATE_SCHEMA: "UpdateSchema"
			},

			/**
			 * CampaignFlowSchemaValidationRules to validate campaign flow schema
			 * @type {Object}
			 */
			CampaignFlowSchemaValidationRules: {
				/* Async element without incoming sequence flows */
				ASYNC_WITHOUT_INCOMINGS: "AsyncWithoutIncomings",
				/* Add campaign participant element without outgoing sequence flows */
				ADD_AUDIENCE_WITHOUT_OUTGOINGS: "AddAudienceWithoutOutgoings",
				/* Contains the name of rule in case of flow schema loop without delayed transitions */
				LOOP_WITHOUT_DELAYED_TRANSITIONS: "LoopWithoutDelayedTransitions"
			},

			/**
			 * BulkEmail response ids based on response status
			 */
			BulkEmailResponses: {
				DELIVERED: "9c56db88-d16a-438f-b223-148b00c66c80",
				OPEN: "5788b052-74ab-481d-8d0f-efe87a19848f",
				CLICKS: "62a08686-cc06-4b4d-88e2-a6df4d4f6b77",
				SPAM_COMPLAINED: "dc5fed60-4c3b-46bd-bf12-7f3defc099b2",
				UNSUBSCRIBED: "a670ee81-2166-4c85-9e41-88901ca9ca38",
				HARD_BOUNCE: "cba985b0-32b8-48f7-924e-7f33e8bd45b8"
			},

			/**
			 * Campaign item completed condition
			 */
			StepCompletedConditions: {
				COMPLETED: 0,
				NOT_COMPLETED: 1,
				ANY: 2
			},

			CampaignScheduledMode: {
				/* Run manually */
				RUN_MANUALLY: "229d71cf-80c8-4158-ae9d-b0da644ed6a8",
				/* Run at the specified time */
				AT_THE_SPECIFIED_TIME: "5ee38934-d028-4c1e-a1c8-2b039991baea"
			},

			/**
			 * Returns element parameters.
			 * @param {Object} stepType Element type.
			 * @return {Object}
			 */
			GetStepTypeConfig: function(stepType) {
				var stepTypeConfigs = {
					/* BulkEmail */
					"0270a11d-534c-40ec-8a72-c4902d6afb09": {
						"sysImage": "StepTypeEmailImage",
						"portsSet": Terrasoft.diagram.PortsSet.Basic,
						"constraints": ["Select", "Drag", "Connect", "Shadow", "Delete"]
					},
					/* Event */
					"75b0f8d2-a3f4-4715-ad37-a501543af26c": {
						"sysImage": "StepTypeEventImage",
						"portsSet": Terrasoft.diagram.PortsSet.Basic,
						"constraints": ["Select", "Drag", "Connect", "Shadow", "Delete"]
					},
					/* Campaign audience */
					"36503c76-9542-45b6-a934-a61f2b9bce48": {
						"sysImage": "StepTypeAudienceImage",
						"portsSet": Terrasoft.diagram.PortsSet.Basic,
						"outgoingConnectionsLimit": 1,
						"incomingConnectionsLimit": -1,
						"constraints": ["Select", "Drag", "Connect", "Shadow", "Delete"]
					},
					/* Target */
					"30eb28eb-bb1f-4d18-9358-55556d80d833": {
						"sysImage": "StepTypeTargetImage",
						"portsSet": Terrasoft.diagram.PortsSet.Basic,
						"outgoingConnectionsLimit": -1,
						"constraints": ["Select", "Drag", "Connect", "Shadow"]
					},
					/* Exclude from campaign */
					"b748cdc5-b478-4ed1-8b52-51513ee49ed9": {
						"sysImage": "StepTypeExitingImage",
						"portsSet": Terrasoft.diagram.PortsSet.Basic,
						"outgoingConnectionsLimit": -1,
						"constraints": ["Select", "Drag", "Connect", "Shadow"]
					},
					/* Lending */
					"5e9d3401-8047-4833-b9f0-c2c8d3dbbe62": {
						"sysImage": "StepTypeLandingImage",
						"portsSet": Terrasoft.diagram.PortsSet.Basic,
						"outgoingConnectionsLimit": Terrasoft.Features.getIsEnabled("OutboundCampaign") ? 2 : 1,
						"incomingConnectionsLimit": Terrasoft.Features.getIsEnabled("OutboundCampaign") ? 1 : -1,
						"constraints": ["Select", "Drag", "Connect", "Shadow", "Delete"],
						"positions": {
							"start": {
								isInPosition: function(node) {
									return Ext.isEmpty(node.inEdges);
								},
								"outgoingConnectionsLimit": 1,
								"incomingConnectionsLimit": Terrasoft.Features.getIsEnabled("OutboundCampaign") ? null : -1
							},
							"middle": {
								isInPosition: function(node) {
									return !Ext.isEmpty(node.inEdges);
								},
								"outgoingConnectionsLimit": Terrasoft.Features.getIsEnabled("OutboundCampaign") ? 2 : 1,
								"incomingConnectionsLimit": Terrasoft.Features.getIsEnabled("OutboundCampaign") ? null : -1
							}
						}
					},
					/* Create lead */
					"12c48da4-8305-4aa7-92a9-2c75dc5d458b": {
						"sysImage": "StepTypeCreateLeadImage",
						"portsSet": Terrasoft.diagram.PortsSet.Basic,
						"outgoingConnectionsLimit": 1,
						"constraints": ["Select", "Drag", "Connect", "Shadow", "Delete"],
						"height": this.StepTypeSize.Small.height,
						"width": this.StepTypeSize.Small.width
					}
				};
				return Ext.merge({}, this.StepTypeSize.Default, stepTypeConfigs[stepType]);
			},

			/**
			 * Returns default campaign node config.
			 * @return {Object}
			 */
			GetDefaultCampaign: function() {
				var targetId = Terrasoft.generateGUID();
				var endTaskId = Terrasoft.generateGUID();
				return {
					"nodes": [
						{
							"offsetX": 435,
							"offsetY": 70,
							"labels": [{
								"text": resources.localizableStrings.TargetCaption
							}],
							"stepType": this.StepType.TARGET,
							"name": targetId
						},
						{
							"offsetX": 435,
							"offsetY": 210,
							"labels": [{
								"text": resources.localizableStrings.ExitingCampaignCaption
							}],
							"stepType": this.StepType.EXITING_CAMPAIGN,
							"name": endTaskId
						}
					],
					"connectors": []
				};
			},

			/**
			 * Returns default email node config.
			 * @return {Object}
			 */
			GetDefaultEmailNode: function() {
				var emailId = Terrasoft.generateGUID();
				return {
					"offsetX": 150,
					"offsetY": 150,
					"labels": [
						{
							"text": resources.localizableStrings.BulkEmailCaption
						}
					],
					"stepType": this.StepType.EMAIL_MAILING,
					"name": emailId,
					"isDBObject": true
				};
			},

			/**
			 * Returns default event node config.
			 * @return {Object}
			 */
			GetDefaultEventNode: function() {
				var eventId = Terrasoft.generateGUID();
				return {
					"offsetX": 150,
					"offsetY": 150,
					"labels": [
						{
							"text": resources.localizableStrings.EventCaption
						}
					],
					"stepType": this.StepType.EVENT,
					"name": eventId,
					"isDBObject": true
				};
			},

			/**
			 * Returns default landing node config.
			 * @return {Object}
			 */
			GetDefaultLandingNode: function() {
				var id = Terrasoft.generateGUID();
				return {
					"offsetX": 150,
					"offsetY": 150,
					"labels": [
						{
							"text": resources.localizableStrings.LandingCaption
						}
					],
					"stepType": this.StepType.LANDING,
					"name": id,
					"isDBObject": true
				};
			},

			/**
			 * Returns default audience node config.
			 * @return {Object}
			 */
			GetDefaultAudienceNode: function() {
				var id = Terrasoft.generateGUID();
				return {
					"offsetX": 150,
					"offsetY": 150,
					"labels": [
						{
							"text": resources.localizableStrings.CampaignAudienceCaption
						}
					],
					"stepType": this.StepType.CAMPAIGN_AUDIENCE,
					"name": id,
					"isDBObject": true
				};
			},

			/**
			 * Returns default create lead node config.
			 * @return {Object}
			 */
			GetDefaultCreateLeadNode: function() {
				var id = Terrasoft.generateGUID();
				var result = {
					"offsetX": 150,
					"offsetY": 150,
					"labels": [
						{
							"text": resources.localizableStrings.CreateLeadCaption
						}
					],
					"stepType": this.StepType.CREATE_LEAD,
					"name": id,
					"isDBObject": true
				};
				return Ext.merge(result, this.StepTypeSize.Small);
			},

			/**
			 * Checked if element have to be singleton
			 * @param {Object} stepType Element type.
			 * @return {Boolean}
			 */
			IsSingletonStepType: function(stepType) {
				return Ext.Array.contains(this.SingletonStepTypes, stepType);
			},

			/**
			 * Checks if we can create connection with same type we needed
			 * @param {Object} sourceStepType Element type.
			 * @param {Object} targetStepType Element type.
			 * @return {Boolean}
			 */
			IsStepTypeConnectionAllow: function(sourceStepType, targetStepType) {
				var denyCombinations = [
					[
						this.StepType.LANDING,
						this.StepType.CREATE_LEAD
					],
					[
						this.StepType.LANDING,
						this.StepType.LANDING
					],
					[
						this.StepType.CAMPAIGN_AUDIENCE,
						this.StepType.LANDING
					],
					[
						this.StepType.CREATE_LEAD,
						this.StepType.CREATE_LEAD
					],
					[
						this.StepType.CAMPAIGN_AUDIENCE,
						this.StepType.EXITING_CAMPAIGN
					],
					[
						this.StepType.CAMPAIGN_AUDIENCE,
						this.StepType.TARGET
					]
				];
				if (!Terrasoft.Features.getIsEnabled("OutboundCampaign")) {
					denyCombinations.push([
						this.StepType.LANDING,
						this.StepType.EXITING_CAMPAIGN
					], [
						this.StepType.LANDING,
						this.StepType.TARGET
				]);
				}
				var result = true;
				Terrasoft.each(denyCombinations, function(stepCombination) {
					if ((stepCombination[0] === sourceStepType) && (stepCombination[1] === targetStepType)) {
						result = false;
						return result;
					}
				}, this);
				return result;
			}

		};
	});


