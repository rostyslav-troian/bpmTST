Terrasoft.configuration.Structures["WorkResourceElementPageV2"] = {innerHierarchyStack: ["WorkResourceElementPageV2"], structureParent: "BasePageV2"};
define('WorkResourceElementPageV2Structure', ['WorkResourceElementPageV2Resources'], function(resources) {return {schemaUId:'d647bbe5-3973-4840-a2db-a4f0d21aebd3',schemaCaption: "WorkResourceElementPageV2", parentSchemaName: "BasePageV2", schemaName:'WorkResourceElementPageV2',parentSchemaUId:'d3cc497c-f286-4f13-99c1-751c468733c0',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("WorkResourceElementPageV2", ["WorkResourceElementServiceHelper", "ProjectServiceHelper", "ConfigurationEnums"],
		function(WorkResourceElementServiceHelper, ProjectServiceHelper, ConfigurationEnums) {
			return {
				entitySchemaName: "WorkResourceElement",
				attributes: {
					"Project": {
						"lookupListConfig": {
							"columns": ["ParentProject", "ParentProject.ProjectEntryType"]
						}
					},
					"ProjectResourceElement": {
						"lookupListConfig": {
							filter: function() {
								var rootProjectId = this.get("RootProjectId");
								return Terrasoft.createColumnFilterWithParameter(
										Terrasoft.ComparisonType.EQUAL, "Project",
										rootProjectId);
							}
						}
					}
				},
				methods: {
					/**
					 * ########## ###### ######### ######## ########
					 * @override
					 * @return {Terrasoft.BaseViewModelCollection} ########## ######### ######## ########
					 */
					getActions: function() {
						return this.Ext.create("Terrasoft.BaseViewModelCollection");
					},

					/**
					 * ####### ######### ############# ########
					 * @overridden
					 */
					onEntityInitialized: function() {
						this.callParent(arguments);
						this.set("RootProjectId", Terrasoft.GUID_EMPTY);
						var projectRes = this.get("ProjectResourceElement");
						this.set("oldProjectResourceElementId",
								(!Ext.isEmpty(projectRes) && Terrasoft.isGUID(projectRes.value)) ? projectRes.value : null);
						this.set("oldPlanningWork", this.get("PlanningWork"));

						var project = this.get("Project");
						if (!project || !Terrasoft.isGUID(project.value)) {
							return;
						}
						ProjectServiceHelper.getRootProjectId(project.value, function(rootProjectId) {
							this.set("RootProjectId", rootProjectId);
						}, this);
						if (this.get("Operation") === ConfigurationEnums.CardState.Add) {
							this.set("PlanningWork", 0);
							this.set("ActualWork", 0);
						}
					},

					/**
					 * ########## ######
					 * @overridden
					 */
					save: function() {
						var id = this.get("Id");
						var project = this.get("Project");
						var projectResourceElement = this.get("ProjectResourceElement");
						if (!this.validate() || Ext.isEmpty(project) || Ext.isEmpty(projectResourceElement) ||
							!Terrasoft.isGUID(projectResourceElement.value) ||
							Terrasoft.isEmptyGUID(projectResourceElement.value)) {
							return;
						}
						var resourceId = projectResourceElement.value;
						var projectId = project.value;
						if (this.isNew) {
							if (!this.projectResourceElementChecked) {
								WorkResourceElementServiceHelper.GetCanCreate(id, resourceId, projectId, function(response) {
									if (!response.Success) {
										this.showInformationDialog(this.get("Resources.Strings.ResourceExists"));
									} else {
										this.projectResourceElementChecked = true;
										this.save();
									}
								}, this);
								return;
							} else {
								this.projectResourceElementChecked = false;
								this.callParent(arguments);
							}
						} else {
							if (!this.canEditChecked) {
								var planingWork = this.get("PlanningWork") || 0;
								WorkResourceElementServiceHelper.GetCanEdit(id, resourceId, planingWork, function(response) {
									if (!response.Success) {
										switch (response.Code) {
											case 1010:
												this.showInformationDialog(this.get("Resources.Strings.ResourceExists"));
												break;
											case 2110:
												this.showInformationDialog(
														Ext.String.format(this.get("Resources.Strings.PlaningWorkIsLessMessage"),
																response.Plan));
												break;
											case 3010:
												this.showInformationDialog(this.get("Resources.Strings.HasChildWorkMessage"));
												break;
											case 3020:
												this.showInformationDialog(this.get("Resources.Strings.HasChildActivityMessage"));
												break;
											default:
												break;
										}
									} else {
										this.canEditChecked = true;
										this.save();
										return;
									}
								}, this);
								return;
							}
							this.callParent(arguments);
							this.canEditChecked = false;
						}
						return;
					}
				},
				diff: /**SCHEMA_DIFF*/[
					{
						"operation": "insert",
						"name": "WorkResourceElementPageGeneralTabContainer",
						"parentName": "CardContentContainer",
						"propertyName": "items",
						"values": {
							"itemType": 7,
							"items": []
						}
					},
					{
						"operation": "insert",
						"parentName": "WorkResourceElementPageGeneralTabContainer",
						"name": "WorkResourceElementPageGeneralBlock",
						"propertyName": "items",
						"values": {
							"itemType": 0,
							"items": []
						}
					},
					{
						"operation": "insert",
						"name": "Project",
						"parentName": "WorkResourceElementPageGeneralBlock",
						"propertyName": "items",
						"values": {
							"layout": {
								"row": 0,
								"column": 0,
								"colSpan": 24
							},
							"controlConfig": {
								"enabled": false
							},
							"caption": { bindTo: "Resources.Strings.WorkCaption"}
						}
					},
					{
						"operation": "insert",
						"name": "ProjectResourceElement",
						"parentName": "WorkResourceElementPageGeneralBlock",
						"propertyName": "items",
						"values": {
							"layout": {
								"row": 1,
								"column": 0,
								"colSpan": 24
							},
							"contentType": Terrasoft.ContentType.ENUM
						}
					},
					{
						"operation": "insert",
						"name": "PlanningWork",
						"parentName": "WorkResourceElementPageGeneralBlock",
						"propertyName": "items",
						"values": {
							"layout": {
								"row": 2,
								"column": 0,
								"colSpan": 24
							},
							"caption": { bindTo: "Resources.Strings.PlanningWorkCaption"}
						}
					},
					{
						"operation": "insert",
						"name": "ActualWork",
						"parentName": "WorkResourceElementPageGeneralBlock",
						"propertyName": "items",
						"values": {
							"layout": {
								"row": 3,
								"column": 0,
								"colSpan": 24
							},
							"controlConfig": {
								"enabled": false
							},
							"caption": { bindTo: "Resources.Strings.ActualWorkCaption"}
						}
					}
				]/**SCHEMA_DIFF*/
			};
		});


