Terrasoft.configuration.Structures["DuplicateRulesSettings"] = {innerHierarchyStack: ["DuplicateRulesSettings"]};
define('DuplicateRulesSettingsStructure', ['DuplicateRulesSettingsResources'], function(resources) {return {schemaUId:'5af25621-b59b-495c-9519-f0eaea50fc05',schemaCaption: "DuplicateRulesSettings", parentSchemaName: "", schemaName:'DuplicateRulesSettings',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("DuplicateRulesSettings", ["DuplicateRulesSettingsResources", "BaseGridRowViewModel",
		"DetailRuleColumnsMixin", "css!DuplicateRulesSettingsCSS"],
	function(resources) {
		return {
			messages: {
				/**
				 * @message EntityInitialized
				 * Master's entity initialized event.
				 */
				"EntityInitialized": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.BIDIRECTIONAL
				},
				/**
				 * @message GetColumnsValues
				 * Returns requested column values.
				 */
				"GetColumnsValues": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message UpdateCardProperty
				 */
				"UpdateCardProperty": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				},
				/**
				 * @message DiscardChanges
				 */
				"DiscardChanges": {
					mode: Terrasoft.MessageMode.BROADCAST,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message ChangeObject
				 */
				"ChangeObject": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				},
				/**
				 * @message GetAdditionalColumns
				 */
				"GetAdditionalColumns": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.SUBSCRIBE
				}
			},
			attributes: {
				RuleBody: {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				},
				RuleColumns: {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				},
				IsEmptyRuleColumns: {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: true
				},
				SelectedRows: {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				},
				ActiveRow: {
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				},
				ToolsButtonMenu: {
					dataValueType: Terrasoft.DataValueType.COLLECTION
				}
			},
			mixins: {
				DetailRuleColumnsMixin: "Terrasoft.DetailRuleColumnsMixin"
			},
			methods: {

				//region Methods: Public

				/**
				 * Handler of the add rule button click.
				 */
				onAddRuleClick: function() {
					const schemaName = this.get("SchemaName");
					Terrasoft.StructureExplorerUtilities.open({
						moduleName: "StructureExploreModuleV2",
						moduleConfig: {
							schemaName: schemaName,
							lookupsColumnsOnly: true,
							firstColumnsOnly: true,
							columnsFiltrationMethod: this._columnsFiltrationMethod.bind(this)
						},
						handlerMethod: function(result) {
							const path = Ext.Array.from(result.path);
							const metaPath = Ext.Array.from(result.metaPath);
							const id = metaPath.shift();
							const columnName = path.shift();
							const selectedConfig = result.selectedConfig || {
								columnName: columnName,
								schemaName: schemaName
							};
							this._addColumn(id, selectedConfig);
						},
						scope: this,
						sandbox: this.sandbox
					});
				},

				/**
				 * Handler of the remove rule button click.
				 */
				onRemoveRuleClick: function() {
					const selectedRows = this.get("SelectedRows");
					if (this.$ActiveRow) {
						selectedRows.push(this.$ActiveRow);
					}
					const ruleBody = this.get("RuleBody");
					const rules = ruleBody.filters;
					selectedRows.forEach(function(id) {
						const row = Terrasoft.findWhere(rules, {Id: id});
						Ext.Array.remove(rules, row);
					});
					this.setRuleColumnsCollection();
					this.update();
				},

				/**
				 * State of the add rule button enabled.
				 * @return {Boolean} True if add rule button is enabled.
				 */
				getAddRuleButtonEnabled: function() {
					const schemaName = this.get("SchemaName");
					return Boolean(schemaName) && this.isEditable();
				},

				/**
				 * Visible state of the attribute info button.
				 * @return {Boolean} True if attribute info button is visible.
				 */
				getAttributeInfoButtonVisible: function() {
					return !this.isEditable();
				},

				/**
				 * State of the remove rule button enabled.
				 * @return {Boolean} True if remove rule button is enabled.
				 */
				getRemoveRuleButtonEnabled: function() {
					const selectedRows = this.get("SelectedRows");
					const selected = Boolean(selectedRows && selectedRows.length || this.$ActiveRow);
					return selected;
				},

				/**
				 * @override
				 * @inheritdoc
				 */
				init: function(callback, scope) {
					this.callParent([
						function() {
							const args = arguments;
							this.initSubscribers();
							this.initAttributes();
							this.addMenuItems();
							this.fetchRuleBodyJson();
							Promise.all([
								this.requireEntities(),
								this.mixins.DetailRuleColumnsMixin.init.call(this)
							]).then(function() {
								this.setRuleColumnsCollection();
								Ext.callback(callback, scope, args);
							}.bind(this));
						}, this
					]);
				},

				/**
				 * Initialize sandbox subscribers.
				 * @protected
				 */
				initSubscribers: function() {
					this.sandbox.subscribe("EntityInitialized", this.onEntityInitialized, this, [this.sandbox.id]);
					this.sandbox.subscribe("DiscardChanges", this.onEntityInitialized, this, [this.sandbox.id]);
					this.sandbox.subscribe("ChangeObject", this.onEntityInitialized, this, [this.sandbox.id]);
					this.sandbox.subscribe("GetAdditionalColumns",
						this.getDetailsRuleColumns, this, [this._getStructureExplorerModuleSandboxId()]);
				},

				/**
				 * Gets is columns editable.
				 * @return {Boolean} True if rules is editable.
				 */
				isEditable: function() {
					const object = this._getCardAttributeValue("Object") || {};
					const searchObject = this._getCardAttributeValue("SearchObject") || {};
					if (this.isEmpty(object.value) || this.isEmpty(searchObject.value)) {
						return true;
					}
					return Boolean(object.value === searchObject.value);
				},

				//endregion

				//region Methods: Protected

				/**
				 * Handler of the entity initialized.
				 * @protected
				 * @return {Promise}
				 */
				onEntityInitialized: function() {
					this.fetchRuleBodyJson();
					this.setObjectEntitySchemaName();
					return this.requireEntities()
						.then(this.setRuleColumnsCollection.bind(this));
				},

				/**
				 * Gets detail rule settings columns.
				 * @protected
				 * @param {String} rootEntitySchemaName Name of the root entity schema.
				 * @return {Object} Detail rule settings columns.
				 */
				getDetailsRuleColumns: function(rootEntitySchemaName) {
					const detailRuleColumnsMixin = this.mixins.DetailRuleColumnsMixin;
					const columns = detailRuleColumnsMixin.getDetailsRuleColumns.call(this, rootEntitySchemaName);
					const columnsFiltrations = Ext.Array.filter(columns, this._columnsFiltrationMethod, this);
					return Ext.Array.toValueMap(columnsFiltrations, "id");
				},

				/**
				 * Trigger after add or remove column in rule.
				 * Notification parent module.
				 * @protected
				 */
				update: function() {
					this._updateRuleBody();
					this._updateRuleCaption();
					this.set("SelectedRows", []);
				},

				/**
				 * Sets RuleColumns collection from RuleBody data.
				 * @protected
				 */
				setRuleColumnsCollection: function() {
					const ruleBody = this.get("RuleBody");
					const filters = ruleBody.filters || [];
					const rules = filters.map(this._ruleConvertToGridRowModel.bind(this));
					const collection = this.get("RuleColumns");
					const tmpCollection = Ext.create("Terrasoft.Collection");
					rules.forEach(function(ruleViewModel) {
						const id = ruleViewModel.get("Id");
						tmpCollection.add(id, ruleViewModel);
					});
					collection.clear();
					this.set("IsEmptyRuleColumns", tmpCollection.isEmpty());
					collection.loadAll(tmpCollection);
				},

				/**
				 * Gets RuleBody from parent module, parse and sets to attribute model.
				 * @protected
				 */
				fetchRuleBodyJson: function() {
					const columnValue = this.sandbox.publish("GetColumnsValues", ["RuleBody"], [this.sandbox.id]);
					const ruleBodyJson = columnValue && columnValue.RuleBody;
					const ruleBody = ruleBodyJson ? JSON.parse(ruleBodyJson) : {filters: []};
					this.set("RuleBody", ruleBody);
				},

				/**
				 * Initialize attributes.
				 * @protected
				 */
				initAttributes: function() {
					this.set("ToolsButtonMenu", Ext.create("Terrasoft.BaseViewModelCollection"));
					this.set("RuleColumns", Ext.create("Terrasoft.BaseViewModelCollection"));
					this.set("SelectedRows", []);
					this.setObjectEntitySchemaName();
				},

				/**
				 * Adds delete button to expand menu.
				 * @protected
				 */
				addMenuItems: function() {
					const toolsButtonMenu = this.get("ToolsButtonMenu");
					this.set("ToolsButtonMenu", toolsButtonMenu);
					const deleteMenuItem =  this.getButtonMenuItem({
						Caption: {"bindTo": "Resources.Strings.DeleteMenuCaption"},
						Click: {"bindTo": "onRemoveRuleClick"},
						Enabled: {"bindTo": "getRemoveRuleButtonEnabled"}
					});
					toolsButtonMenu.addItem(deleteMenuItem);
				},

				/**
				 * Sets schema name of the Object column.
				 * @protected
				 */
				setObjectEntitySchemaName: function() {
					this.set("SchemaName", this._getObjectEntitySchemaName());
				},

				/**
				 * Load entities from the RuleBody attribute.
				 * @protected
				 * @return {Promise}
				 */
				requireEntities: function() {
					const ruleBody = this.get("RuleBody");
					const filters = ruleBody.filters || [];
					const schemaNameList = Ext.Array.pluck(filters, "schemaName");
					return this.requireEntity(schemaNameList);
				},

				//endregion

				//region Methods: Private

				/**
				 * @private
				 */
				_updateRuleCaption: function() {
					this.sandbox.publish("UpdateCardProperty", {
						key: "Name",
						value: this._getRuleCaption()
					}, [this.sandbox.id]);
				},

				/**
				 * @private
				 */
				_updateRuleBody: function() {
					const ruleBody = this._getOmitRuleBody();
					const ruleBodyJson = JSON.stringify(ruleBody);
					this.sandbox.publish("UpdateCardProperty", {
						key: "RuleBody",
						value: ruleBodyJson
					}, [this.sandbox.id]);
				},

				/**
				 * @private
				 * @return {Object}
				 */
				_getOmitRuleBody: function() {
					const omitAttributes = ["Id", "Name"];
					const ruleBody = this.get("RuleBody") || {filters: []};
					const filters = ruleBody.filters.map(function(ruleColumn) {
						return _.omit(ruleColumn, omitAttributes);
					});
					return {filters: filters};
				},

				/**
				 * @private
				 */
				_getRuleCaption: function() {
					const result = this.sandbox.publish("GetColumnsValues", ["Object"], [this.sandbox.id]);
					const objectName = result.Object.displayValue;
					const ruleColumnsCollection = this.get("RuleColumns");
					const ruleColumns = ruleColumnsCollection.getItems();
					const columnsName = Ext.Array.map(ruleColumns, function(ruleColumn) {
						return this._getColumnRuleName(ruleColumn.getJSON());
					}, this);
					const template = this.get("Resources.Strings.RuleCaptionTemplate");
					return Ext.String.format(template, objectName, columnsName.join(", "));
				},

				/**
				 * @private
				 */
				_getObjectEntitySchemaName: function() {
					const values = this.sandbox.publish("GetColumnsValues", ["Object"], [this.sandbox.id]) || {Object: {}};
					const editEntityUid = values && values.Object && values.Object.value;
					if (!editEntityUid) {
						return null;
					}
					const entitySchema = Ext.Object.getValues(Terrasoft.configuration.ModuleStructure)
						.find(function(item) {
							const entitySchemaUId = item.entitySchemaUId;
							return entitySchemaUId
								&& Terrasoft.includes(entitySchemaUId.toLocaleLowerCase(), editEntityUid);
						});
					return entitySchema.entitySchemaName;
				},

				/**
				 * @private
				 */
				_ruleConvertToGridRowModel: function(ruleObj) {
					Ext.apply(ruleObj, {
						Id: Terrasoft.generateGUID(),
						Name: this._getColumnRuleName(ruleObj)
					});
					return Ext.create("Terrasoft.BaseGridRowViewModel", {
						values: ruleObj,
						columns: {
							Id: {dataValueType: Terrasoft.DataValueType.GUID},
							Name: {dataValueType: Terrasoft.DataValueType.TEXT}
						}
					});
				},

				/**
				 * @private
				 */
				_getColumnRuleName: function(ruleObj) {
					const detailColumnCaption = this.getDetailColumnCaption(ruleObj);
					if (detailColumnCaption) {
						return detailColumnCaption;
					}
					return this._getSectionColumnName(ruleObj.schemaName, ruleObj.columnName);
				},

				/**
				 * @private
				 */
				_getSectionColumnName: function(schemaName, columnName) {
					const entity = Terrasoft[schemaName] || {};
					const columns = entity.columns || {};
					const column = columns[columnName] || {};
					return column.caption || columnName;
				},

				/**
				 * @private
				 */
				_addColumn: function(id, columnConfig) {
					const ruleBody = this.get("RuleBody");
					Ext.apply(columnConfig, {Id: id});
					ruleBody.filters.push(columnConfig);
					this.setRuleColumnsCollection();
					this.update();
				},

				/**
				 * @private
				 */
				_columnsFiltrationMethod: function(column) {
					const dataValueType = column.dataValueType;
					const allowTypes = [
						Terrasoft.DataValueType.LOOKUP,
						Terrasoft.DataValueType.TEXT,
						Terrasoft.DataValueType.SHORT_TEXT,
						Terrasoft.DataValueType.MEDIUM_TEXT,
						Terrasoft.DataValueType.MAXSIZE_TEXT,
						Terrasoft.DataValueType.LONG_TEXT
					];
					const allowType = Ext.Array.contains(allowTypes, dataValueType);
					if (!allowType) {
						return false;
					}
					const columnName = column.name;
					const ruleBody = this.get("RuleBody");
					const selectedConfig = column.selectedConfig || {};
					const hasDetailColumn = this.hasDetailColumn(selectedConfig, ruleBody.filters);
					const hasColumn = Terrasoft.findWhere(ruleBody.filters, {columnName: columnName});
					return !Boolean(hasDetailColumn || hasColumn);
				},

				/**
				 * @private
				 * @return {String}
				 */
				_getStructureExplorerModuleSandboxId: function() {
					return Ext.String.format("{0}_StructureExplorerModule", this.sandbox.id);
				},

				/**
				 * @private
				 * @param {String} attributeName
				 * @return {*}
				 */
				_getCardAttributeValue: function(attributeName) {
					const sandbox = this.sandbox;
					const objectValues = sandbox.publish("GetColumnsValues", [attributeName], [sandbox.id]) || {};
					return objectValues[attributeName];
				},

				//endregion
			},
			diff: [
				{
					"operation": "insert",
					"name": "DuplicateRulesSettingsWrapper",
					"parentName": "Header",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"wrapClass": ["duplicate-rules-settings"],
						"items": []
					}
				},
				{
					"operation": "insert",
					"name": "ButtonTools",
					"parentName": "DuplicateRulesSettingsWrapper",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"layout": {"column": 0, "row": 2, "colSpan": 12, "rowSpan": 0},
						"wrapClass": ["button-tools"],
						"items": []
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "GridName",
					"parentName": "ButtonTools",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": resources.localizableStrings.GridCaption,
						"classes": {
							"labelClass": ["grid-caption"]
						}
					},
					"index": 0
				},
				{
					"operation": "insert",
					"name": "AddColumnRule",
					"parentName": "ButtonTools",
					"propertyName": "items",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"imageConfig": {"bindTo": "Resources.Images.AddButtonImage"},
						"classes": {"wrapperClass": ["add-button"]},
						"click": {"bindTo": "onAddRuleClick"},
						"enabled": {"bindTo": "getAddRuleButtonEnabled"},
						"visible": {"bindTo": "isEditable"}
					},
					"index": 1
				},
				{
					"operation": "insert",
					"name": "RemoveColumnRule",
					"propertyName": "items",
					"parentName": "ButtonTools",
					"values": {
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": {"bindTo": "Resources.Images.ToolsButtonImage"},
						"classes": {"wrapperClass": ["menu-button"]},
						"visible": {"bindTo": "isEditable"},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						"menu": {
							"items": {
								"bindTo": "ToolsButtonMenu"
							}
						}
					},
					"index": 2
				},
				{
					"operation": "insert",
					"parentName": "ButtonTools",
					"propertyName": "items",
					"name": "AttributeInfoButton",
					"values": {
						"itemType": this.Terrasoft.ViewItemType.INFORMATION_BUTTON,
						"content": {
							"bindTo": "Resources.Strings.AttributeInformationText"
						},
						"controlConfig": {
							"visible": {
								"bindTo": "getAttributeInfoButtonVisible"
							}
						}
					},
					"index": 3
				},
				{
					"operation": "insert",
					"name": "RuleColumnsSettings",
					"parentName": "DuplicateRulesSettingsWrapper",
					"propertyName": "items",
					"values": {
						"type": "listed",
						"columnsConfig": [
							{
								cols: 24,
								key: [{ name: { bindTo: "Name" } }]
							}
						],
						"captionsConfig": [
							{
								"cols": 24,
								"name": resources.localizableStrings.GridColumnCaption
							}
						],
						"itemType": Terrasoft.ViewItemType.GRID,
						"listedZebra": true,
						"collection": {"bindTo": "RuleColumns"},
						"primaryColumnName": "Id",
						"primaryDisplayColumnName": "Name",
						"selectedRows": {"bindTo": "SelectedRows"},
						"activeRow": {"bindTo": "ActiveRow"},
						"isEmpty": {"bindTo": "IsEmptyRuleColumns"}
					},
					"index": 1
				}
			]
		};
	});


