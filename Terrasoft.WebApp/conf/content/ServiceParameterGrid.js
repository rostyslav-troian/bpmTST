Terrasoft.configuration.Structures["ServiceParameterGrid"] = {innerHierarchyStack: ["ServiceParameterGrid"], structureParent: "BaseServiceParameterGrid"};
define('ServiceParameterGridStructure', ['ServiceParameterGridResources'], function(resources) {return {schemaUId:'1a7d8f84-863d-4ed3-9aeb-51a3e67068a2',schemaCaption: "ServiceParameterGrid", parentSchemaName: "BaseServiceParameterGrid", schemaName:'ServiceParameterGrid',parentSchemaUId:'f490e67e-05d5-4f48-a374-299e1f1e8232',extendParent:false,type:Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("ServiceParameterGrid", ["ServiceParameterGridResources", "css!ServiceDesignerStyles"],
		function(resources) {
	return {
		messages: {

			/**
			 * @message ParameterUIdChange
			 * Sends parameters for update state of ServiceParameterPage.
			 * @return {Object} Parameters for get target parameter from ServiceSchemaManager.
			 */
			ParameterUIdChange: {
				mode: Terrasoft.MessageMode.PTP,
				direction: Terrasoft.MessageDirectionType.BIDIRECTIONAL
			}

		},
		modules: {

			ServiceParameterPage: {
				moduleId: "ServiceRequestParameterPage",
				moduleName: "ConfigurationModuleV2",
				config: {
					isSchemaConfigInitialized: false,
					schemaName: "ServiceParameterPage",
					parameters: {
						viewModelConfig: {
							ServiceSchemaUId: {
								attributeValue: "ServiceSchemaUId"
							},
							MethodUId: {
								attributeValue: "MethodUId"
							},
							ParameterUId: {
								attributeValue: "ParameterUId"
							},
							CanEditSchema: {
								attributeValue: "CanEditSchema"
							}
						}
					},
					useHistoryState: false
				}
			}

		},
		properties: {
			/**
			 * @private
			 */
			_serviceSchema: null
		},
		attributes: {

			/**
			 * Indicates is current item allow to append child elements.
			 */
			CanAddNested: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},

			/**
			 * UId of schema in ServiceSchemaManager.
			 */
			ServiceSchemaUId: {
				dataValueType: Terrasoft.DataValueType.GUID
			},

			/**
			 * Is allow edit fields.
			 */
			CanEditSchema: {
				dataValueType: Terrasoft.DataValueType.BOOLEAN
			},


			/**
			 * UId of method in ServiceSchemaManager.
			 */
			MethodUId: {
				dataValueType: Terrasoft.DataValueType.GUID
			},

			/**
			 * UId of parameter in ServiceSchemaManager.
			 */
			ParameterUId: {
				dataValueType: Terrasoft.DataValueType.GUID
			}

		},
		methods: {

			//region Methods: Private

			/**
			 * @private
			 */
			_updateDuplicatedCode: function() {
				_.map(_.groupBy(this.$GridData.getItems(), function(item) {
					return item.$Name;
				}, this), function(grouped) {
					if (grouped.length > 1) {
						for (var i = 1; i < grouped.length; i++) {
							grouped[i].$Name = this._generateParameterUniqName("name", grouped[i].$Name);
						}
					}
				}, this);
			},

			/**
			 * Fires when changes selected row in grid. Publishes message to ServiceParameterPage.
			 * @private
			 */
			_onActiveRowChange: function() {
				var gridDataItem = this.$GridData.firstOrDefault(function(parameter) {
					return parameter.$Id === this.$ActiveRow;
				}, this);
				if (this.$MethodUId && this.$ActiveRow) {
					var hasParent = false;
					if (gridDataItem) {
						hasParent = gridDataItem.$ParentId !== undefined;
					}
					var sandboxParameter = {
						ServiceSchemaUId: this.$ServiceSchemaUId,
						MethodUId: this.$MethodUId,
						ParameterUId: this.$ActiveRow,
						HasParent: hasParent
					};
					this.sandbox.publish("ParameterUIdChange", sandboxParameter, [this.getParameterEditPageTag()]);
				}
				this._setCanAddNested(gridDataItem);
			},

			/**
			 * Throttled _onActiveRowChange.
			 * @private
			 */
			_onActiveRowChangeThrottled: null,

			/**
			 * Sets attribute that allow or disallow to append child parameters.
			 * @param {Terrasoft.ServiceParameterViewModel} value Element from GridData correspond to ActiveRow.
			 * @private
			 */
			_setCanAddNested: function(value) {
				this.$CanAddNested = this.canAddNestedItem(value);
			},

			/**
			 * @private
			 */
			_getParentCollection: function(parameterUId) {
				var result = this.$Parameters;
				if (parameterUId) {
					var targetParemeter = this._findParameterByUId(parameterUId, result);
					result = targetParemeter && targetParemeter.itemProperties || result;
				}
				return result;
			},

			/**
			 * @private
			 */
			_generateParameterUniqName: function(propertyName, prefix) {
				return Terrasoft.ServiceDesignerUtilities.generateSequencesName(propertyName, prefix,
					this.$Parameters, {hierarchicalProperty: "itemProperties"});
			},

			/**
			 * Fires grid's model events required for proper grid work.
			 * @private
			 */
			_refreshGrid: function() {
				this.$GridData.fireEvent("clear");
				this.$GridData.fireEvent("dataLoaded");
			},

			/**
			 * Provides recursive find of parameter by parameter uId.
			 * @param {Guid} targetUId UId parameter to find.
			 * @param {Terrasoft.ObjectCollection} collection Collection in which find element.
			 * @private
			 */
			_findParameterByUId: function(targetUId, collection) {
				var targetParemeter = collection.firstOrDefault(function(item) {
					return item.uId === targetUId;
				}, this);
				if (targetParemeter) {
					if (!targetParemeter.itemProperties) {
						targetParemeter.itemProperties = this.Ext.create("Terrasoft.ObjectCollection");
					}
				} else {
					collection.each(function(item) {
						if (item.itemProperties) {
							var result = this._findParameterByUId(targetUId, item.itemProperties);
							if (result) {
								targetParemeter = result;
							}
						}
					}, this);
				}
				return targetParemeter;
			},

			/**
			 * Adds parameter to ViewModel collection.
			 * @private
			 */
			_addParameterToViewModelCollection: function(parameter, parentId) {
				this.convertParameterToViewModel(this.$GridData, parameter, parentId);
			},

			/**
			 * Removes parameter and it's nested parameters from ViewModel collection.
			 * @private
			 */
			_removeServiceParameterViewModel: function(parameterUId) {
				this.$GridData.removeByKey(parameterUId);
				var children = this.$GridData.filterByFn(function(parameterViewModel) {
					return parameterViewModel.$ParentId === parameterUId;
				});
				children.eachKey(function(nestedParameterUId) {
					this._removeServiceParameterViewModel(nestedParameterUId);
				}, this);
			},

			/**
			 * @private
			 */
			_onParameterRemoved: function(parameter) {
				this._removeServiceParameterViewModel(parameter.uId);
			},


			/**
			 * @private
			 */
			_removeServiceParameter: function(parameterUId) {
				var parameterViewModel = this.$GridData.find(parameterUId);
				if (parameterViewModel) {
					var source = this._getParentCollection(parameterViewModel.$ParentId);
					var parameter = this._findParameterByUId(parameterUId, this.$Parameters);
					source.remove(parameter);
				}
			},

			/**
			 * @private
			 */
			_removeSelectedRows: function() {
				// TODO: remove unnesesary events
				if (this.$SelectedRows && this.$SelectedRows.length > 0) {
					this.$Parameters.fireEvent("changed");
				}
				this.$Parameters.suspendEvents();
				Terrasoft.each(this.$SelectedRows, function(selectedRow) {
					this._removeServiceParameter(selectedRow);
					this._removeServiceParameterViewModel(selectedRow);
				}, this);
				this.$Parameters.resumeEvents();
				this.$SelectedRows = [];
			},

			//endregion

			//region Methods: Protected

			/**
			 * @inheritdoc Terrasoft.BaseServiceParameterGrid#getMethodParameters
			 * @override
			 */
			getMethodParameters: function(method) {
				return method.request.parameters;
			},

			/**
			 * Returns parameter edit page tag.
			 * @returns {String} Tag
			 * @protected
			 */
			getParameterEditPageTag: function() {
				return "ParameterEditPage";
			},

			/**
			 * Returns parameter grid tag.
			 * @returns {String} Tag
			 * @protected
			 */
			getParameterGridTag: function() {
				return "ServiceParameterGrid";
			},

			/**
			 * @inheritdoc Terrasoft.BaseServiceParameterGrid#getServiceBuilderTags
			 * @override
			 */
			getServiceBuilderTags: function() {
				return ["ServiceMethodBuilder"];
			},

			/**
			 * Updates grid view model and sorts.
			 * @protected
			 */
			reSort: function() {
				this.updateGridViewModel();
				this._updateDuplicatedCode();
				this.initSortingSettings(this.getSortSettingsConfig());
			},

			/**
			 * Fetchs the target parameters collection from ServiceSchemaManager.
			 * @protected
			 */
			initParameters: function(callback, scope) {
				Terrasoft.chain(
					function(next) {
						Terrasoft.ServiceSchemaManager.initialize(next, this);
					},
					function(next) {
						Terrasoft.ServiceSchemaManager.getInstanceByUId(this.$ServiceSchemaUId, next, this);
					},
					function(next, schema) {
						this._serviceSchema = schema;
						Terrasoft.ServiceDesignerUtilities.canEditSchema(schema, function(result) {
							this.$CanEditSchema = result;
							var method = schema.methods.find(this.$MethodUId);
							if (method) {
								this.$Parameters = this.getMethodParameters(method);
								this.$Parameters.on("add", this._updateDuplicatedCode, this);
								this.$Parameters.on("remove", this._onParameterRemoved, this);
								this.$Parameters.on("dataLoaded", this.reSort, this);
								this.updateGridViewModel();
							}
							Ext.callback(callback, scope);
						}, this);
					}, this);
			},

			/**
			 * @inheritDoc Terrasoft.BaseObject#onDestroy.
			 * @overridden
			 */
			onDestroy: function() {
				this.un("change:ActiveRow", this._onActiveRowChangeThrottled, this);
				if (this.$Parameters) {
					this.$Parameters.un("add", this._updateDuplicatedCode, this);
					this.$Parameters.un("remove", this._onParameterRemoved, this);
					this.$Parameters.un("dataLoaded", this.reSort, this);
				}
				Terrasoft.ServiceDesignerUtilities.clearSysSettings();
				this.callParent(arguments);
			},

			//endregion

			//region Methods: Public

			/**
			 * @inheritdoc Terrasoft.BaseObject#constructor
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this._onActiveRowChangeThrottled = Terrasoft.throttle(this._onActiveRowChange, 300);
				this.on("change:ActiveRow", this._onActiveRowChangeThrottled, this);
				this.sandbox.subscribe("ParameterUIdChange", this._onActiveRowChangeThrottled, this,
					[this.getParameterGridTag()]);
			},

			/**
			 * Fires when user click on correspond button. Adds new parameter to root.
			 * @public
			 */
			onAddButtonClick: function() {
				if (this.$CanEditSchema) {
					var parameters = this.$Parameters;
					var parameter = this.createParameter();
					parameter.isNew = true;
					parameters.add(parameter.uId, parameter);
					this._addParameterToViewModelCollection(parameter);
					this._refreshGrid();
					this.$ActiveRow = parameter.uId;
				} else {
					this.showInformationDialog(resources.localizableStrings.DenyAccess);
				}
			},

			/**
			 * Fires when user click on correspond button. Adds new parameter to existed with uId equal to selected row.
			 * @public
			 */
			onAddNestedItemButtonClick: function() {
				if (this.$CanEditSchema) {
					var parameters = this._getParentCollection(this.$ActiveRow);
					var parameter = this.createParameter({
						type: Terrasoft.services.enums.ServiceParameterType.BODY
					});
					parameter.isNew = true;
					parameters.add(parameter.uId, parameter);
					this._addParameterToViewModelCollection(parameter, this.$ActiveRow);
					this._refreshGrid();
					this.$ActiveRow = parameter.uId;
				} else {
					this.showInformationDialog(resources.localizableStrings.DenyAccess);
				}
			},

			/**
			 * Fires when user click on correspond button. Copies selected parameter and inserts it in current level.
			 * @public
			 */
			onCopyButtonClick: function() {
				if (this.$CanEditSchema) {
					var parameters = this.$Parameters;
					if (this.$ActiveRow) {
						var sourceParameter = this._findParameterByUId(this.$ActiveRow, parameters);
						var newParameter = sourceParameter.copy({
							copyCaptionSufix: resources.localizableStrings.CopyCaptionSufix
						});
						newParameter.isNew = true;
						var activeRow = this.$GridData.get(this.$ActiveRow);
						var destinationCollection = this._getParentCollection(activeRow.$ParentId);
						destinationCollection.add(newParameter.uId, newParameter);
						this.$Parameters.fireEvent("changed");
						this._addParameterToViewModelCollection(newParameter, activeRow.$ParentId);
						this._refreshGrid();
						this._updateDuplicatedCode();
						const newArray = Terrasoft.deepClone(this.$ExpandHierarchyLevels);
						[].push.apply(newArray, this.getHierarchicalNodesUIds(this.$GridData, newParameter.uId));
						this.$ExpandHierarchyLevels = newArray;
						this.$ActiveRow = newParameter.uId;
					}
				} else {
					this.showInformationDialog(resources.localizableStrings.DenyAccess);
				}
			},

			/**
			 * Fires when user click on correspond menu item. Removes parameter with uIds equal to selected rows.
			 * @public
			 */
			onMultiRemoveButtonClick: function() {
				if (this.$CanEditSchema && !this.$IsGridDataEmpty) {
					this.showConfirmationDialog(this.get("Resources.Strings.RemoveMultipleConfirmationMessage"),
						function(result) {
							if (result === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
								this._removeSelectedRows();
								if (this.$GridData.isEmpty()) {
									this.set("MultiSelect", false);
								}
							}
						}, [this.Terrasoft.MessageBoxButtons.NO.returnCode,
							this.Terrasoft.MessageBoxButtons.YES.returnCode], null);
				} else {
					this.showInformationDialog(resources.localizableStrings.DenyAccess);
				}
			},

			/**
			 * Fires when user click on correspond menu item. Removes parameter with uId equal to selected row.
			 * @public
			 */
			onRemoveButtonClick: function() {
				if (this.$CanEditSchema && this.$ActiveRow) {
					this.showConfirmationDialog(this.get("Resources.Strings.RemoveConfirmationMessage"),
						function(result) {
							if (result === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
								var selectedItem = this.$GridData.get(this.$ActiveRow);
								var source = this._getParentCollection(selectedItem.$ParentId);
								var parameter = this._findParameterByUId(this.$ActiveRow, this.$Parameters);
								source.remove(parameter);
								this.$Parameters.fireEvent("changed");
								this._removeServiceParameterViewModel(parameter.uId);
							}
						}, [this.Terrasoft.MessageBoxButtons.NO.returnCode,
							this.Terrasoft.MessageBoxButtons.YES.returnCode], null);
				} else {
					this.showInformationDialog(resources.localizableStrings.DenyAccess);
				}
			},

			/**
			 * Generates default instance of Terrasoft.ServiceParameter.
			 * @type {Object} config Additional values of properties to set in new instance.
			 * @returns {Terrasoft.ServiceParameter}
			 */
			createParameter: function(config) {
				var namePrefix = Terrasoft.ServiceSchemaManager.schemaNamePrefix + "Parameter";
				var captionPrefix = this.get("Resources.Strings.ParameterDefaultCaption") + " ";
				var constructorConfig = {
					uId: Terrasoft.generateGUID(),
					name: this._generateParameterUniqName("name", namePrefix),
					caption: this._generateParameterUniqName("caption", captionPrefix),
					path: null,
					defValue: {
						value: null,
						source: Terrasoft.services.enums.ServiceParameterValueSource.CONST
					},
					type: Terrasoft.services.enums.ServiceParameterType.URL_SEGMENT,
					dataValueTypeName: Terrasoft.services.enums.DataValueTypeName.Text,
					_serviceSchema: this._serviceSchema,
					isRequired: true
				};
				if (config) {
					constructorConfig = Ext.Object.merge(constructorConfig, config);
				}
				return Ext.create("Terrasoft.ServiceParameter", constructorConfig);
			},

			/**
			 * Returns is selected parameter can has nested items.
			 * @param {Terrasoft.ServiceParameterViewModel} parameter Parameter to detects ability to has nested items.
			 * @public
			 * @returns {Boolean}
			 */
			canAddNestedItem: function(parameter) {
				var allowedType = Terrasoft.services.enums.DataValueTypeName.Object;
				return parameter && parameter.$DataValueTypeName === allowedType && parameter.$IsArray;
			}

			//endregion

		},
		diff: /**SCHEMA_DIFF*/[
			{
				operation: "insert",
				name: "AddButton",
				parentName: "ToolbarContainer",
				propertyName: "items",
				index: 0,
				values: {
					itemType: Terrasoft.ViewItemType.BUTTON,
					style: Terrasoft.controls.ButtonEnums.style.BLUE,
					caption: {
						bindTo: "Resources.Strings.AddCaption"
					},
					click: {
						bindTo: "onAddButtonClick"
					},
					classes: {
						textClass: "actions-button-margin-right"
					},
					visible: {
						bindTo: "CanAddNested",
						bindConfig: {
							converter: "invertBooleanValue"
						}
					},
					enabled: {
						bindTo: "MultiSelect",
						bindConfig: {
							converter: "invertBooleanValue"
						}
					}
				}
			},
			{
				operation: "insert",
				name: "AddChildButton",
				parentName: "ToolbarContainer",
				propertyName: "items",
				index: 0,
				values: {
					itemType: Terrasoft.ViewItemType.BUTTON,
					style: Terrasoft.controls.ButtonEnums.style.BLUE,
					caption: {
						bindTo: "Resources.Strings.AddCaption"
					},
					menu: {
						items: [
							{
								caption: {
									bindTo: "Resources.Strings.AddToRoot"
								},
								click: {
									bindTo: "onAddButtonClick"
								}
							},
							{
								caption: {
									bindTo: "Resources.Strings.AddNested"
								},
								click: {
									bindTo: "onAddNestedItemButtonClick"
								}
							}
						]
					},
					visible: "$CanAddNested",
					enabled: {
						bindTo: "MultiSelect",
						bindConfig: {
							converter: "invertBooleanValue"
						}
					},
					classes: {
						wrapperClass: "actions-button-margin-right"
					}
				}
			},
			{
				operation: "insert",
				name: "CopyButton",
				parentName: "CombinedModeCustomActionsButton",
				propertyName: "menu",
				index: 0,
				values: {
					caption: {
						bindTo: "Resources.Strings.CopyCaption"
					},
					click: {
						bindTo: "onCopyButtonClick"
					},
					enabled: {
						bindTo: "activeRowIsNotEmpty"
					},
					visible: {
						bindTo: "MultiSelect",
						bindConfig: {
							converter: "invertBooleanValue"
						}
					}
				}
			},
			{
				operation: "insert",
				name: "MultiRemoveButtonClick",
				parentName: "CombinedModeCustomActionsButton",
				propertyName: "menu",
				index: 1,
				values: {
					caption: {
						bindTo: "Resources.Strings.RemoveCaption"
					},
					click: {
						bindTo: "onMultiRemoveButtonClick"
					},
					visible: "$MultiSelect",
					enabled: {
						bindTo: "selectedRowsIsNotEmpty"
					}
				}
			},
			{
				operation: "insert",
				name: "RemoveButtonClick",
				parentName: "CombinedModeCustomActionsButton",
				propertyName: "menu",
				index: 2,
				values: {
					caption: {
						bindTo: "Resources.Strings.RemoveCaption"
					},
					click: {
						bindTo: "onRemoveButtonClick"
					},
					visible: {
						bindTo: "MultiSelect",
						bindConfig: {
							converter: "invertBooleanValue"
						}
					},
					enabled: {
						bindTo: "activeRowIsNotEmpty"
					}
				}
			},
			{
				operation: "insert",
				parentName: "MainContainer",
				name: "ServiceParameterPage",
				propertyName: "items",
				values: {
					itemType: Terrasoft.ViewItemType.MODULE,
					visible: {
						bindTo: "ActiveRow",
						bindConfig: {converter: "activeRowIsNotEmpty"}
					},
					classes: {wrapClassName: ["service-parameter-grid-page"]}
				}
			}
		]/**SCHEMA_DIFF*/
	};
});


