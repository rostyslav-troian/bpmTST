Terrasoft.configuration.Structures["SectionDesignerUtils"] = {innerHierarchyStack: ["SectionDesignerUtils"]};
/*jshint maxparams: 11 */
define("SectionDesignerUtils", [
	"ext-base", "terrasoft", "SectionDesignerUtilsResources", "SectionDesignerEnums",
	"BaseEntity", "BaseFolder", "File", "BaseItemInFolder", "BaseTag", "BaseEntityInTag", "ConfigurationEnums",
	"BaseLookup", "css!SectionDesignerUtils"
], function(Ext, Terrasoft, resources, SectionDesignerEnums, BaseEntity, BaseFolder, File, BaseItemInFolder,
		BaseTag, BaseEntityInTag, ConfigurationEnums) {
	/**
	 * Localizable strings.
	 * @private
	 * @type {Object}
	 */
	var localizableStrings = resources.localizableStrings;

	/**
	 * Section design data module.
	 * @private
	 * @type {Object}
	 */
	var SectionDesignDataModule = null;

	/**
	 * Modules structure.
	 * @type {Object}
	 */
	var modulesStructure = {};

	/**
	 * Schema name prefix.
	 * @type {string}
	 */
	var schemaNamePrefix = "";

	/**
	 * Storage.
	 * @type {Object}
	 */
	var storage = Terrasoft.DomainCache;

	/**
	 * Multilingual support.
	 */
	function useMultilanguageData() {
		return !Terrasoft.Features.getIsEnabled("DoNotuseMultilanguageData");
	}

	/**
	 * Returns edit page template.
	 * @private
	 * @param {String} clientUnitSchemaName Client unit schema name.
	 * @param {String} entitySchemaName Entity schema name.
	 * @return {String}
	 */
	function getPageSchemaBody(clientUnitSchemaName, entitySchemaName) {
		var bodyTemplate =
				"define('{0}', ['{0}Resources', 'GeneralDetails'],\n" +
				"function(resources, GeneralDetails) {\n" +
				"	return {\n" +
				"		entitySchemaName: '{1}',\n" +
				"		details: /**SCHEMA_DETAILS*/{}/**SCHEMA_DETAILS*/,\n" +
				"		diff: /**SCHEMA_DIFF*/[\n" +
				"	{\n" +
				"		'operation': 'insert',\n" +
				"		'name': 'Name',\n" +
				"		'values': {\n" +
				"			'layout': {\n" +
				"				'column': 0,\n" +
				"				'row': 0,\n" +
				"				'colSpan': 12,\n" +
				"				'rowSpan': 1\n" +
				"			},\n" +
				"			'bindTo': 'Name',\n" +
				"			'caption':" + localizableStrings.PrimaryDisplayColumnCaption + "\n" +
				"		}," +
				"		'parentName': 'Header',\n" +
				"		'propertyName': 'items',\n" +
				"		'index': 0\n" +
				"	}\n" +
				"		]/**SCHEMA_DIFF*/,\n" +
				"		attributes: {},\n" +
				"		methods: {},\n" +
				"		rules: {},\n" +
				"		userCode: {}\n" +
				"	};\n" +
				"});\n";
		return Ext.String.format(bodyTemplate, clientUnitSchemaName, entitySchemaName);
	}

	/**
	 * Returns section page template.
	 * @private
	 * @param {String} clientUnitSchemaName Client unit schema name.
	 * @param {String} entitySchemaName Entity schema name.
	 * @return {String}
	 */
	function getSectionSchemaBody(clientUnitSchemaName, entitySchemaName) {
		var bodyTemplate =
				"define('{0}', ['GridUtilitiesV2'],\n" +
				"function() {\n" +
				"	return {\n" +
				"		entitySchemaName: '{1}',\n" +
				"		contextHelpId: '1001',\n" +
				"		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,\n" +
				"		messages: {},\n" +
				"		methods: {}\n" +
				"	};\n" +
				"});\n";
		return Ext.String.format(bodyTemplate, clientUnitSchemaName, entitySchemaName);
	}

	/**
	 * Returns section detail template.
	 * @private
	 * @param {String} clientUnitSchemaName Client unit schema name.
	 * @param {String} entitySchemaName Entity schema name.
	 * @return {String}
	 */
	function getSectionDetailSchemaBody(clientUnitSchemaName, entitySchemaName) {
		var bodyTemplate =
				"define('{0}', ['terrasoft'],\n" +
				"function(Terrasoft) {\n" +
				"	return {\n" +
				"		entitySchemaName: '{1}',\n" +
				"		attributes: {},\n" +
				"		diff: /**SCHEMA_DIFF*/[]/**SCHEMA_DIFF*/,\n" +
				"		methods: {},\n" +
				"		messages: {}\n" +
				"	};\n" +
				"});\n";
		return Ext.String.format(bodyTemplate, clientUnitSchemaName, entitySchemaName);
	}

	/**
	 * Determines if column exists.
	 * @param {Object} config Column configuration.
	 */
	function isExistColumn(config) {
		var callback = function(schema) {
			var result = Ext.isEmpty(schema.columns[config.name]);
			config.callback.call(this, result);
		};

		SectionDesignDataModule.getEntitySchemaByName({
			name: config.schemaName,
			isOriginal: config.isOriginal,
			callback: callback
		});
	}

	/**
	 * ########## ##### #### #####
	 * @private
	 * @param {String} schemaName ######## ######## #####
	 * @param {Terrasoft.SchemaType} schemaType ### #####
	 * @param {String} entitySchemaName ######## ####### #######
	 * @param {Terrasoft.SchemaPackageStatus} schemaPackageStatus ###### #####
	 * @param {Function} callback ####### ######### ######
	 * @param {Object} scope ###### # ######### ######## ##### ########### ####### ######### ######
	 * @return {String} ###### ######## #######
	 */
	function getSchemaBody(schemaName, schemaType, entitySchemaName, schemaPackageStatus, callback, scope) {
		Terrasoft.chain({}, [
			function(context) {
				if (schemaPackageStatus ===
						SectionDesignerEnums.SchemaPackageStatus.EXISTS_IN_CURRENT_PACKAGE) {
					getClientUnitSchemaBody(schemaName, function(body) {
						context.body = body;
						context.next();
					});
				} else {
					context.next();
				}
			},
			function(context) {
				var body = context.body;
				if (!body) {
					switch (schemaType) {
						case Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA:
							body = getPageSchemaBody(schemaName, entitySchemaName);
							break;
						case Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA:
							body = getSectionDetailSchemaBody(schemaName, entitySchemaName);
							break;
						default:
							body = getSectionSchemaBody(schemaName, entitySchemaName);
							break;
					}
				}
				scope = scope || this;
				callback.call(scope, body);
			}
		]);
	}

	/**
	 * ########## ##### #### ### ####### ####
	 * @private
	 * @param {Object[]} schemaConfig ###### ############ ######## ########## #####
	 * @param {String} schemaConfig.schemaName ######## ######## #####
	 * @param {Terrasoft.SchemaType} schemaConfig.schemaType ### #####
	 * @param {String} schemaConfig.entitySchemaName ######## ####### #######
	 * @param {Function} callback ####### ######### ######
	 * @param {Object} scope ###### # ######### ######## ##### ########### ####### ######### ######
	 * @param {Number} index ###### ######## ######## ####### ############
	 * @param {Object} resultOut ###### ############## ##########
	 */
	function getSchemeBody(schemaConfig, callback, scope, index, resultOut) {
		var result = resultOut || {};
		index = index || 0;
		if (index === schemaConfig.length) {
			scope = scope || this;
			callback.call(scope, result);
		} else {
			var schemaItem = schemaConfig[index];
			index = index + 1;
			var schemaName = schemaItem.schemaName;
			var schemaType = schemaItem.schemaType;
			var entitySchemaName = schemaItem.entitySchemaName;
			getSchemaBody(schemaName, schemaType, entitySchemaName, function(body) {
				result[schemaName] = body;
				getSchemeBody(schemaConfig, callback, scope, index, result);
			}, this);
		}
	}

	/**
	 * ####### #########
	 * @param {Object} renderTo ###### ### ######## ##### ######### ########
	 * @param {String} id ############# ######## ##########
	 * @return {Terrasoft.Container} ###### ########## ##########
	 */
	function createControlContainer(renderTo, id) {
		var container = Ext.create("Terrasoft.Container", {
			renderTo: renderTo,
			id: id,
			styles: {
				wrapStyles: {
					width: "100%",
					minHeight: "100%",
					margin: "20px"
				}
			},
			selectors: {
				wrapEl: "#" + id
			}
		});
		return container;
	}

	/**
	 * ####### ####### ######## ##########
	 * @param {Object} renderTo ###### ### ######## ##### ######### ########
	 * @param {String} caption ##### ####### ######## ##########
	 * @return {Terrasoft.Label} ###### ########## ########
	 */
	function createControlLabel(renderTo, caption) {
		var label = Ext.create("Terrasoft.Label", {
			caption: caption || "",
			renderTo: renderTo
		});
		return label;
	}

	/**
	 * ####### ####### ##########
	 * @param {Object} renderTo ###### ### ######## ##### ######### ########
	 * @param {Terrasoft.DataValueType} dataValueType ### ###### ######## ##########
	 * @param {Object} value ######## ######## ##########
	 * @return {Object} ###### ########## ######## ##########
	 */
	function createControlInput(renderTo, dataValueType, value) {
		var inputConfig = Terrasoft.getControlConfigByDataValueType(dataValueType);
		if (dataValueType !== Terrasoft.DataValueType.BOOLEAN) {
			inputConfig.value = value;
		} else {
			inputConfig.checked = value;
		}
		inputConfig.renderTo = renderTo;
		var input = Ext.create(inputConfig.className, inputConfig);
		return input;
	}

	/**
	 * ##### ###### ###-#######
	 * @param {Object} config ###### ##########:
	 * @param {String} methodName ######## ######
	 * @param {Object} parameters ######### ######
	 * @param {Function} callback ####### ######### ######
	 * @param {Number} timeout ##### ######## ###### #######
	 * @param {Object} scope ######## ########## ######## ######### ######
	 */
	function postServiceRequest(config) {
		var methodName, parameters, scope, callback;
		methodName = config.methodName;
		parameters = config.parameters;
		scope = config.scope;
		callback = config.callback;
		var serviceUrl = Terrasoft.workspaceBaseUrl + "/rest/DesignService/";
		var requestOptions = {
			url: serviceUrl + methodName,
			headers: {
				"Accept": "application/json",
				"Content-Type": "application/json"
			},
			method: "POST",
			jsonData: parameters,
			scope: scope,
			callback: callback
		};
		if (config.timeout) {
			requestOptions.timeout = config.timeout;
		}
		Terrasoft.AjaxProvider.request(requestOptions);
	}

	/**
	 * ####### ######### SectionDesignDataModule
	 * @param {Object} arg ######## #######
	 */
	function setSectionDesignDataModule(arg) {
		SectionDesignDataModule = arg;
	}

	/**
	 * ####### ############# schemaNamePrefix
	 * @param {String} value ######## ########
	 */
	function initSchemaNamePrefix(value) {
		schemaNamePrefix = value || "";
	}

	/**
	 * ####### ######## ######### ##########
	 * @param {Object} config ###### # #############
	 * @return {Object} controls ###### ######### ######### ##########
	 */
	function createInputControls(config) {
		if (!config) {
			return null;
		}
		var controls = {};
		Terrasoft.each(config, function(controlConfigItem, key) {
			var controlContainer = createControlContainer(controlConfigItem.renderTo, key);
			var controlContainerRenderToEl = controlContainer.getRenderToEl();
			var controlLabel = createControlLabel(controlContainerRenderToEl, controlConfigItem.caption);
			var controlInput = createControlInput(controlContainerRenderToEl, controlConfigItem.dataValueType,
					controlConfigItem.value);
			var item = {
				name: key,
				container: controlContainer,
				label: controlLabel,
				control: controlInput
			};
			controls[key] = item;
		}, this);
		return controls;
	}

	/**
	 * Validates system name.
	 * @param {String} name Name for validation.
	 * @param {Object} options Validation options.
	 * @param {Number} options.maxLength Maximum length.
	 * @param {Boolean} [validatePrefix] Validation prefix.
	 * @return {Object} Validation object.
	 */
	function validateSystemName(name, options, validatePrefix) {
		var result = {
			invalidMessage: "",
			isValid: true
		};
		var length = options.maxLength - 1;
		var regString = "^[a-zA-Z]{1}[a-zA-Z0-9]{0," + length + "}$";
		var reqExp = new RegExp(regString);
		if (!reqExp.test(name)) {
			if (name.length <= options.maxLength) {
				result.invalidMessage = localizableStrings.WrongSectionCodeMessage;
			} else {
				result.invalidMessage = Ext.String.format(localizableStrings.WrongSectionCodeLengthMessage,
						options.maxLength);
			}
			result.isValid = false;
		} else if (validatePrefix && !validateNamePrefix(name)) {
			var invalidMessage = Ext.String.format(localizableStrings.WrongPrefixMessage, getSchemaNamePrefix());
			result.invalidMessage = invalidMessage;
			result.isValid = false;
		}
		return result;
	}

	/**
	 * ####### ######### #### #######, ## ####### # ### ########
	 * @param {String} code ### #######
	 * @return {Boolean} ######### #########
	 */
	function validateNamePrefix(code) {
		var prefixReqExp = new RegExp("^" + schemaNamePrefix + ".*$");
		var isCodeValid = prefixReqExp.test(code);
		return isCodeValid;
	}

	/**
	 * ####### ######### ######## ##########
	 * @param {Terrasoft.TextEdit} textEdit ######## ##########
	 * @param {Function} validationMethod ####### #########
	 */
	function validateTextEdit(textEdit, validationMethod) {
		var value = textEdit.getValue();
		var validationInfo = validationMethod(value);
		textEdit.setValidationInfo(validationInfo);
	}

	/**
	 * ####### ######## ######
	 * @param {Object} config ###### # #############
	 * @return {Object} controls ###### ######### ######
	 */
	function createButtons(config) {
		if (!config) {
			return null;
		}
		var controls = {};
		Terrasoft.each(config, function(controlConfigItem, key) {
			var controlContainer = createControlContainer(controlConfigItem.renderTo, key);
			var controlContainerRenderToEl = controlContainer.getRenderToEl();
			controlConfigItem.renderTo = controlContainerRenderToEl;
			delete controlConfigItem.handler;
			var button = Ext.create("Terrasoft.Button", controlConfigItem);
			controls[key] = button;
		}, this);
		return controls;
	}

	/**
	 * ####### ######## ####### entity #####
	 * @param {Object} config ###### # ############# #######
	 * @return {Object} ####### entity #####
	 */
	function createEntitySchemaColumn(config) {
		var result = {
			uId: Terrasoft.generateGUID()
		};
		Ext.apply(result, config);
		return result;
	}

	/**
	 * ####### ######## ######## ############ ####### entity #####
	 * @return {Object} ####### entity #####
	 */
	function createEntitySchemaPrimaryDisplayColumn() {
		return createEntitySchemaColumn({
			caption: localizableStrings.PrimaryDisplayColumnCaption,
			dataValueType: Terrasoft.DataValueType.TEXT,
			isRequired: true,
			isValueCloneable: true,
			name: schemaNamePrefix + "Name",
			size: 250,
			usageType: 0
		});
	}

	/**
	 * ####### ######## reference ####### entity #####
	 * @param {Terrasoft.BaseEntitySchema} entity ###### Terrasoft.BaseEntitySchema
	 * @param {Object} config ############## ############ #######
	 * @return {Object} reference #######
	 */
	function createEntitySchemaReferenceColumn(entity, config) {
		var columnConfig = {};
		Ext.apply(columnConfig, config, entity);
		return createEntitySchemaColumn({
			dataValueType: Terrasoft.DataValueType.LOOKUP,
			referenceSchemaName: entity.name,
			referenceSchema: {
				caption: entity.caption,
				name: entity.name,
				primaryColumnName: entity.primaryColumnName,
				primaryDisplayColumnName: entity.primaryDisplayColumnName
			},
			isLookup: true,
			lookupType: "Exist",
			name: columnConfig.name,
			caption: columnConfig.caption,
			usageType: ConfigurationEnums.EntitySchemaColumnUsageType.General
		});
	}

	/**
	 * ####### ######## entity #####
	 * @param {Object} config ###### # ############# entity #####
	 * @return {Terrasoft.BaseEntitySchema} entity ###### Terrasoft.BaseEntitySchema
	 */
	function createEntitySchema(config) {
		var caption = config.caption;
		var name = config.name;
		var baseEntity = config.rootEntitySchema || BaseEntity;
		var administratedByRecords = config.administratedByRecords ? true : false;
		Ext.define("Terrasoft.data.models." + name, {
			extend: "Terrasoft.BaseEntitySchema",
			alternateClassName: "Terrasoft." + name,
			caption: caption,
			name: name,
			singleton: true,
			uId: Terrasoft.generateGUID(),
			primaryColumnName: baseEntity.primaryColumnName,
			primaryColumn: baseEntity.primaryColumn,
			primaryDisplayColumnName: baseEntity.primaryDisplayColumnName,
			primaryDisplayColumn: baseEntity.primaryDisplayColumn,
			hierarchicalColumnName: baseEntity.hierarchicalColumnName,
			hierarchicalColumn: baseEntity.hierarchicalColumn || null,
			administratedByRecords: administratedByRecords,
			columns: baseEntity.columns
		});
		Terrasoft[name].rootEntitySchema = baseEntity;
		return Terrasoft[name];
	}

	/**
	 * ####### ######## ###### ######### #####
	 * @param {Terrasoft.BaseEntitySchema} entity ######### #####
	 * @param {Object[]} columns ###### ######## #######
	 * @return {Object} ###### ###### ######### #####
	 */
	function getEntitySchemaDesignData(entity, columns) {
		var entityRootSchema = entity.rootEntitySchema || BaseEntity;
		var result = {
			metaInfo: {
				modificationType: SectionDesignerEnums.ModificationType.NEW,
				modifiedData: {
					rootEntitySchemaId: entityRootSchema.uId,
					caption: entity.caption,
					name: entity.name,
					uId: entity.uId,
					primaryColumnName: entity.primaryColumnName,
					primaryColumn: entity.primaryColumn,
					primaryDisplayColumnName: entity.primaryDisplayColumnName,
					primaryDisplayColumn: entity.primaryDisplayColumn,
					hierarchicalColumnName: entity.hierarchicalColumnName,
					hierarchicalColumn: entity.hierarchicalColumn || null,
					administratedByRecords: true,
					columns: {}
				}
			},
			schema: entity
		};
		var modifiedData = result.metaInfo.modifiedData;
		var designDataColumns = modifiedData.columns;
		for (var i = 0, columnsLength = columns.length; i < columnsLength; i++) {
			var columnItem = columns[i];
			var column = columnItem.column;
			designDataColumns[column.uId] = column;
			if (columnItem.isPrimaryDisplayColumn) {
				modifiedData.primaryDisplayColumn = column;
				modifiedData.primaryDisplayColumnName = column.name;
			}
		}
		return result;
	}

	/**
	 * ####### ######## client unit #####
	 * @param {Object} config ###### # ############# client unit #####:
	 * @param {String} config.name ### #####
	 * @param {String} config.caption ######## #####
	 * @param {String} config.type ### #####
	 * @param {String} config.parentSchemaUId ############# ####### #####
	 * @param {String} config.code ### #######
	 * @return {Terrasoft.BaseViewModel} ###### Terrasoft.BaseViewModel
	 */
	function createClientUnitSchema(config) {
		var result = {
			resources: {
				localizableImages: {},
				localizableStrings: {}
			},
			structure: {
				extendParent: false,
				parentSchemaUId: config.parentSchemaUId,
				schemaCaption: config.caption,
				schemaName: config.name,
				schemaUId: Terrasoft.generateGUID(),
				parentSchemaName: config.parentSchemaName,
				type: config.type
			},
			schema: {
				messages: {},
				mixins: {},
				attributes: {},
				methods: {},
				diff: []
			}
		};
		if (config.type === Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA) {
			Ext.apply(result.schema, {
				entitySchemaName: config.code,
				details: {},
				rules: {}
			});
		} else if (config.type === Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA) {
			Ext.apply(result.schema, {
				entitySchemaName: config.code
			});
		}
		return result;
	}

	/**
	 * ####### ######### #### ###### #######
	 * @param {Object} config ############ #####:
	 * @param {String} config.code ### #######
	 * @param {String} config.caption ######### #######
	 * @param {GUID} config.sectionIconId ########## ############# ######## ####### # ####
	 * @param {GUID} config.sectionLogoId ########## ############# ######## ####### # #####
	 * @param {GUID} config.workplaceId ############# ######## #####
	 */
	function createModuleScheme(config) {
		var code = config.code;
		var sectionIconId = config.sectionIconId;
		var sectionLogoId = config.sectionLogoId;
		var workplaceId = config.workplaceId;
		var caption = config.caption || code;
		var codeWithPrefix = code;
		if (!validateNamePrefix(codeWithPrefix)) {
			codeWithPrefix = schemaNamePrefix + code;
		}
		var moduleDesignData = {
			module: {},
			mainModuleName: code,
			schemaManager: {
				entity: {},
				clientUnit: {}
			},
			gridSettings: {},
			workplaceId: workplaceId
		};
		var defaultModuleConfig = {
			isNew: true,
			code: code,
			caption: caption,
			entityTagId: "",
			entityTagName: "",
			entityInTagId: "",
			entityInTagName: "",
			entityFolderId: "",
			entityFolderName: "",
			entityInFolderId: "",
			entityInFolderName: "",
			entityId: "",
			entityName: "",
			header: Ext.String.format(localizableStrings.ModuleHeaderTemplate, caption),
			id: Terrasoft.generateGUID(),
			pages: [],
			details: [],
			sectionIconId: sectionIconId,
			sectionLogoId: sectionLogoId,
			sectionSchemaId: "",
			sectionSchemaName: "",
			typeColumnId: null,
			sysModuleEntityId: Terrasoft.generateGUID()
		};
		var entities = moduleDesignData.schemaManager.entity;
		var clientUnits = moduleDesignData.schemaManager.clientUnit;
		var entity, primaryDisplayColumn;
		if (config.sectionEntitySchema) {
			entity = config.sectionEntitySchema;
			primaryDisplayColumn = entity.primaryDisplayColumn;
		} else {
			entity = createEntitySchema({
				name: code,
				caption: caption,
				administratedByRecords: true
			});
			primaryDisplayColumn = createEntitySchemaPrimaryDisplayColumn();
		}
		entities[entity.name] = getEntitySchemaDesignData(entity, [{
			column: primaryDisplayColumn,
			isPrimaryDisplayColumn: true
		}]);
		defaultModuleConfig.entityId = entity.uId;
		defaultModuleConfig.entityName = entity.name;
		var entityFolder = createEntitySchema({
			name: codeWithPrefix + "Folder",
			caption: Ext.String.format(localizableStrings.EntityFolder, caption),
			rootEntitySchema: BaseFolder
		});
		entities[entityFolder.name] = getEntitySchemaDesignData(entityFolder, [], Terrasoft.BaseFolder.uId);
		defaultModuleConfig.entityFolderId = entityFolder.uId;
		defaultModuleConfig.entityFolderName = entityFolder.name;
		var entityTag = createEntitySchema({
			name: codeWithPrefix + "Tag",
			caption: Ext.String.format(localizableStrings.EntityTagCaption, caption),
			rootEntitySchema: BaseTag,
			administratedByRecords: true
		});
		entities[entityTag.name] = getEntitySchemaDesignData(entityTag, [], Terrasoft.BaseTag.uId);
		defaultModuleConfig.entityTagId = entityTag.uId;
		defaultModuleConfig.entityTagName = entityTag.name;
		var entityInTag = createEntitySchema({
			name: codeWithPrefix + "InTag",
			caption: Ext.String.format(localizableStrings.EntityInTagCaption, caption),
			rootEntitySchema: BaseEntityInTag,
			administratedByRecords: false
		});
		var tagColumnConfig = Terrasoft.deepClone(BaseEntityInTag.columns.Tag);
		tagColumnConfig.referenceSchemaName = entityTag.name;
		var entityColumnConfig = Terrasoft.deepClone(BaseEntityInTag.columns.Entity);
		entityColumnConfig.referenceSchemaName = codeWithPrefix;
		entities[entityInTag.name] = getEntitySchemaDesignData(entityInTag, [
			{column: createEntitySchemaColumn(tagColumnConfig)},
			{column: createEntitySchemaColumn(entityColumnConfig)}
		]);
		defaultModuleConfig.entityInTagId = entityInTag.uId;
		defaultModuleConfig.entityInTagName = entityInTag.name;
		var entityInFolder = createEntitySchema({
			name: codeWithPrefix + "InFolder",
			caption: Ext.String.format(localizableStrings.EntityInFolderCaption, caption),
			rootEntitySchema: BaseItemInFolder
		});
		var folderColumnConfig = Terrasoft.deepClone(BaseItemInFolder.columns.Folder);
		folderColumnConfig.referenceSchemaName = entityFolder.name;
		entities[entityInFolder.name] = getEntitySchemaDesignData(entityInFolder, [
			{column: createEntitySchemaReferenceColumn(entity, {name: codeWithPrefix})},
			{column: createEntitySchemaColumn(folderColumnConfig)}
		]);
		defaultModuleConfig.entityInFolderId = entityInFolder.uId;
		defaultModuleConfig.entityInFolderName = entityInFolder.name;
		var entityFile = createEntitySchema({
			name: codeWithPrefix + "File",
			caption: Ext.String.format(localizableStrings.EntityFile, caption),
			rootEntitySchema: File
		});
		entities[entityFile.name] = getEntitySchemaDesignData(entityFile, [{
			column: createEntitySchemaReferenceColumn(entity, {name: codeWithPrefix})
		}]);
		defaultModuleConfig.details.push(entityFile.name);
		var sectionSchemaName = codeWithPrefix + "Section";
		var schemaConfig = {
			name: sectionSchemaName,
			caption: Ext.String.format(localizableStrings.SectionPage, caption),
			code: code,
			type: Terrasoft.SchemaType.MODULE_VIEW_MODEL_SCHEMA,
			parentSchemaUId: SectionDesignerEnums.BaseSchemeUIds.BASE_SECTION,
			parentSchemaName: SectionDesignerEnums.BaseClientUnitSchemeNames.BASE_SECTION_NAME
		};
		var entitySection = createClientUnitSchema(schemaConfig);
		var sectionSchemaUId = entitySection.structure.schemaUId;
		sectionSchemaName = entitySection.structure.schemaName;
		clientUnits[sectionSchemaName] = getNewClientUnitSchemaDesignData(entitySection);
		var sectionDetailName = codeWithPrefix + "Detail";
		var detailSchemaConfig = {
			name: sectionDetailName,
			caption: Ext.String.format(localizableStrings.SectionDetail, caption),
			code: code,
			type: Terrasoft.SchemaType.GRID_DETAIL_VIEW_MODEL_SCHEMA,
			parentSchemaUId: SectionDesignerEnums.BaseSchemeUIds.BASE_GRID_DETAIL,
			parentSchemaName: SectionDesignerEnums.BaseClientUnitSchemeNames.BASE_GRID_NAME
		};
		var entitySectionDetail = createClientUnitSchema(detailSchemaConfig);
		var detailDesignData = getNewClientUnitSchemaDesignData(entitySectionDetail);
		clientUnits[sectionDetailName] = detailDesignData;
		var detailResourcesMetaInfo = detailDesignData.resources.metaInfo;
		Ext.merge(detailResourcesMetaInfo.modifiedData, {
			localizableStrings: {
				Caption: caption
			}
		});
		var detailDiff = getDefaultDetailDiff(primaryDisplayColumn.name);
		var detailSchemasMetaInfo = detailDesignData.schema.metaInfo;
		Ext.merge(detailSchemasMetaInfo.modifiedData, {
			diff: [detailDiff]
		});
		var detailSchemaUId = entitySectionDetail.structure.schemaUId;
		sectionDetailName = entitySectionDetail.structure.schemaName;
		defaultModuleConfig.sectionSchemaId = sectionSchemaUId;
		defaultModuleConfig.sectionSchemaName = sectionSchemaName;
		defaultModuleConfig.sectionDetailId = detailSchemaUId;
		defaultModuleConfig.sectionDetailName = sectionDetailName;
		moduleDesignData.module[code] = defaultModuleConfig;
		SectionDesignDataModule.addEntity("SysModuleEntity", {
			Id: defaultModuleConfig.sysModuleEntityId,
			SysEntitySchemaUId: entity.uId
		});
		SectionDesignDataModule.addEntity("SysDetail", {
			Id: defaultModuleConfig.sectionDetailId,
			EntitySchemaUId: entity.uId,
			DetailSchemaUId: detailSchemaUId,
			Caption: caption
		});
		var editPageConfig = {
			pageName: codeWithPrefix + "Page",
			pageCaption: caption,
			pageSchemaCaption: Ext.String.format(localizableStrings.SectionEditPage, caption),
			sectionCode: code
		};
		var page = createEditPage(moduleDesignData, editPageConfig);
		defaultModuleConfig.pages.push(page);
		SectionDesignDataModule.addEntity("SysModule", {
			Id: defaultModuleConfig.id,
			Caption: caption,
			SysModuleEntity: defaultModuleConfig.sysModuleEntityId,
			FolderMode: SectionDesignerEnums.ModuleFolderType.MultiFolderEntry,
			GlobalSearchAvailable: true,
			HasAnalytics: true,
			HasActions: true,
			Code: code,
			ModuleHeader: defaultModuleConfig.header,
			CardSchemaUId: page.id,
			SectionModuleSchemaUId: SectionDesignerEnums.SectionSchemaIds.SectionModuleSchemaUId,
			SectionSchemaUId: sectionSchemaUId,
			CardModuleUId: SectionDesignerEnums.SectionSchemaIds.CardModuleUId,
			Image32: sectionIconId,
			Logo: sectionLogoId
		});
		SectionDesignDataModule.addEntity("SysModuleInSysModuleFolder", {
			SysModule: defaultModuleConfig.id,
			SysModuleFolder: SectionDesignerEnums.TempSysModuleFolderId,
			Position: 20
		});
		if (useMultilanguageData()) {
			defaultModuleConfig.sysModuleCaptionLczId = addModuleLcz(caption,
					SectionDesignerEnums.SysModuleLczColumns.Caption, defaultModuleConfig.id);
			defaultModuleConfig.sysModuleHeaderLczId = addModuleLcz(defaultModuleConfig.header,
					SectionDesignerEnums.SysModuleLczColumns.Header, defaultModuleConfig.id);
		}
		Ext.apply(moduleDesignData, getDefaultGridSettings(sectionSchemaName, false, moduleDesignData));
		return moduleDesignData;
	}

	/**
	 * ########## ###### ######### ####### ###### #######
	 * @param {String} primaryDisplayColumnName ### ######### ### ########### #######
	 * @param {String} typeColumnName ### ####### ####
	 * @return {Object} ########## ###### ######### ####### ###### #######
	 * ######:
	 *    {
		 *		{
		 *			operation: string,
		 *			name: string,
		 *			values: {
		 *				type: string,
		 *				listedConfig: {
		 *					name: string,
		 *					items: Array
		 *				},
		 *				tiledConfig: {
		 *					name: string,
		 *					grid: {
		 *						columns: number,
		 *						rows: number
		 *					},
		 *					items: Array
		 *				}
		 *			}
		 *		}
		 *	}
	 */
	function getDefaultDetailDiff(primaryDisplayColumnName, typeColumnName) {
		var isTyped = Boolean(typeColumnName);
		var tiledItems = [
			{
				name: primaryDisplayColumnName + "TiledGridColumn",
				bindTo: primaryDisplayColumnName,
				type: Terrasoft.GridCellType.TEXT,
				position: {
					row: 1,
					column: 0,
					colSpan: isTyped ? 16 : 24
				},
				captionConfig: {
					visible: false
				}
			}
		];
		var listedItems = [
			{
				name: primaryDisplayColumnName + "ListedGridColumn",
				bindTo: primaryDisplayColumnName,
				type: Terrasoft.GridCellType.TEXT,
				position: {
					column: 0,
					colSpan: isTyped ? 16 : 24
				}
			}
		];
		if (isTyped) {
			tiledItems.push({
				name: typeColumnName + "TiledGridColumn",
				bindTo: typeColumnName,
				type: Terrasoft.GridCellType.TEXT,
				position: {
					row: 1,
					column: 16,
					colSpan: 8
				},
				captionConfig: {
					visible: true
				}
			});
			listedItems.push({
				name: typeColumnName + "ListedGridColumn",
				bindTo: typeColumnName,
				type: Terrasoft.GridCellType.TEXT,
				position: {
					column: 16,
					colSpan: 8
				}
			});
		}
		return {
			"operation": "merge",
			"name": "DataGrid",
			"values": {
				type: "listed",
				listedConfig: {
					name: "DataGridListedConfig",
					items: listedItems
				},
				tiledConfig: {
					name: "DataGridTiledConfig",
					grid: {columns: 24, rows: 1},
					items: tiledItems
				}
			}
		};
	}

	/**
	 * ########## ###### ######### ##### #######
	 * @param {String} sectionSchemaName ######## ######## #######
	 * @param {Boolean} isTypedModule ####### ####, ### ###### ##############
	 * @param {Object} moduleDesignData ###### ###### #########
	 * @return {Object} ########## ###### ######### ##### #######
	 */
	function getDefaultGridSettings(sectionSchemaName, isTypedModule, moduleDesignData) {
		var moduleName = moduleDesignData.mainModuleName;
		var moduleData = moduleDesignData.module[moduleName];
		var entityName = moduleData.entityName;
		var typeColumnId = moduleData.typeColumnId;
		var entityDesignData = moduleDesignData.schemaManager.entity[entityName].metaInfo.modifiedData;
		var primaryDisplayColumnName = entityDesignData.primaryDisplayColumnName;
		var typeColumnName;
		if (!Ext.isEmpty(typeColumnId) && !Terrasoft.isEmptyGUID(typeColumnId)) {
			Terrasoft.each(entityDesignData.columns, function(column, key) {
				if (key === typeColumnId) {
					typeColumnName = column.name;
					return;
				}
			});
		}
		typeColumnName = typeColumnName || "";
		var gridSettingsKey = Ext.String.format("{0}GridSettingsGridDataView", sectionSchemaName);
		var simpleModuleGridSettingConfig = {
			"tiledConfig": "{\"grid\":{\"rows\":1,\"columns\":24},\"items\":[{\"bindTo\":\"" +
			primaryDisplayColumnName + "\",\"caption\":\"" + localizableStrings.PrimaryDisplayColumnCaption +
			"\",\"position\":{\"column\":0," +
			"\"colSpan\":24,\"row\":1},\"dataValueType\":1,\"captionConfig\":{\"visible\":false}}]}",
			"listedConfig": "{\"items\":[{\"bindTo\":\"" + primaryDisplayColumnName + "\",\"caption\":" +
			"\"" + localizableStrings.PrimaryDisplayColumnCaption +
			"\",\"position\":{\"column\":0,\"colSpan\":24,\"row\":1},\"dataValueType\":1}]}",
			"isTiled": true,
			"type": "tiled"
		};
		var typedModuleGridSettingsConfig = {
			"tiledConfig": "{\"grid\":{\"rows\":1,\"columns\":24},\"items\":[{\"bindTo\":\"" +
			primaryDisplayColumnName + "\",\"caption\":\"" + localizableStrings.PrimaryDisplayColumnCaption +
			"\",\"position\":{\"column\":0," +
			"\"colSpan\":16,\"row\":1},\"dataValueType\":1,\"captionConfig\":{\"visible\":false}}," +
			"{\"bindTo\":\"" + typeColumnName + "\",\"caption\":\"" + localizableStrings.TypeColumnCaption +
			"\",\"position\":{\"column\":16," +
			"\"colSpan\":8,\"row\":1},\"captionConfig\":{\"visible\":true}}]}",
			"listedConfig": "{\"items\":[{\"bindTo\":\"" + primaryDisplayColumnName + "\",\"caption\":\"" +
			localizableStrings.PrimaryDisplayColumnCaption + "\"" +
			",\"position\":{\"column\":0,\"colSpan\":16,\"row\":1},\"dataValueType\":1},{\"bindTo\":\"" +
			typeColumnName + "\",\"caption\":\"" + localizableStrings.TypeColumnCaption +
			"\",\"position\":{\"column\":16,\"colSpan\":8,\"row\":1}}]}",
			"isTiled": true,
			"type": "tiled"
		};
		var typedModuleVerticalGridSettingsConfig = {
			"tiledConfig": "{\"grid\":{\"rows\":2,\"columns\":24},\"items\":[{\"bindTo\":\"" +
			primaryDisplayColumnName + "\",\"caption\":\"" + localizableStrings.PrimaryDisplayColumnCaption +
			"\",\"position\":{\"column\":0," +
			"\"colSpan\":24,\"row\":1},\"dataValueType\":1,\"captionConfig\":{\"visible\":false}}," +
			"{\"bindTo\":\"" + typeColumnName + "\",\"caption\":\"" + localizableStrings.TypeColumnCaption +
			"\",\"position\":{\"column\":0," +
			"\"colSpan\":24,\"row\":2},\"captionConfig\":{\"visible\":true}}]}",
			"listedConfig": "{\"items\":[{\"bindTo\":\"" + primaryDisplayColumnName + "\",\"caption\":" +
			"\"" + localizableStrings.PrimaryDisplayColumnCaption +
			"\",\"position\":{\"column\":0,\"colSpan\":16,\"row\":1},\"dataValueType\":1}," +
			"{\"bindTo\":\"" + typeColumnName + "\",\"caption\":\"" + localizableStrings.TypeColumnCaption +
			"\",\"position\":{\"column\":16," +
			"\"colSpan\":8,\"row\":1}}]}",
			"isTiled": true,
			"type": "tiled"
		};
		var typedModuleMobileGridSettingsConfig = {
			"listedConfig": "{\"items\":[{\"bindTo\":\"" + primaryDisplayColumnName + "\",\"caption\":" +
			"\"" + localizableStrings.PrimaryDisplayColumnCaption +
			"\",\"position\":{\"column\":0,\"colSpan\":16,\"row\":1},\"dataValueType\":1}," +
			"{\"bindTo\":\"" + typeColumnName + "\",\"caption\":\"" + localizableStrings.TypeColumnCaption +
			"\",\"position\":{\"column\":16," +
			"\"colSpan\":8,\"row\":1}}]}",
			"isTiled": false,
			"type": "listed"
		};
		var gridSettingsConfig = (isTypedModule) ?
				typedModuleGridSettingsConfig :
				simpleModuleGridSettingConfig;
		var verticalGridSettingsConfig = (isTypedModule)
				? typedModuleVerticalGridSettingsConfig
				: simpleModuleGridSettingConfig;
		var defaultGridSettingsTemplate = {
			gridSettings: {
				"modifiedData": {
					"key": gridSettingsKey,
					"isTiled": true,
					"tiledColumnsConfig": "{}",
					"listedColumnsConfig": "{}",
					"DataGrid": gridSettingsConfig,
					"DataGridVerticalProfile": verticalGridSettingsConfig,
					"MobileDataGrid": typedModuleMobileGridSettingsConfig
				},
				"originalData": {
					"key": gridSettingsKey,
					"isTiled": true
				}
			}
		};
		return defaultGridSettingsTemplate;
	}

	/**
	 * ############# ######### ####### ### ########### ######## ############## ###### #######
	 * @param {Object} designData - ###### #########
	 * @param {String} sectionCode - ### #######
	 * @param {Object} entityPage - ########
	 */
	function setEntityPrimaryDisplayColumn(designData, sectionCode, entityPage) {
		var entitySchema = designData.schemaManager.entity[sectionCode];
		var primaryDisplayColumnName = entitySchema.metaInfo.modifiedData.primaryDisplayColumnName ||
				entitySchema.schema.primaryDisplayColumnName;
		var primaryDisplayColumnConfig = {
			"operation": "insert",
			"parentName": "Header",
			"propertyName": "items",
			"name": primaryDisplayColumnName,
			"values": {
				"layout": {"column": 0, "row": 0, "colSpan": 24}
			}
		};
		if (!Terrasoft.isArray(entityPage.schema.diff)) {
			entityPage.schema.diff = [primaryDisplayColumnConfig];
		} else {
			entityPage.schema.diff.push(primaryDisplayColumnConfig);
		}
	}

	/**
	 * Sets default edit page tab.
	 * @param {Object} entityPage Entity page.
	 * @param {Object} newClientUnitSchema New client unit schema.
	 */
	function setDefaultEditPageTab(entityPage, newClientUnitSchema) {
		var defaultTabConfig = {
			"operation": "insert",
			"name": "GeneralInfoTab",
			"parentName": "Tabs",
			"propertyName": "tabs",
			"index": 0,
			"values": {
				"caption": {"bindTo": "Resources.Strings.GeneralInfoTabCaption"},
				"items": []
			}
		};
		if (!Terrasoft.isArray(entityPage.schema.diff)) {
			entityPage.schema.diff = [defaultTabConfig];
		} else {
			entityPage.schema.diff.push(defaultTabConfig);
		}
		var modifiedResource = {
			localizableStrings: {
				GeneralInfoTabCaption: localizableStrings.GeneralInfoTabCaption
			}
		};
		Ext.merge(newClientUnitSchema.resources.metaInfo.modifiedData, modifiedResource);
	}

	/**
	 * ####### ########## ##### ### ######## ############## # ########## ############ ######## ##############
	 * @param {Object} designData ###### #########
	 * @param {object} config ############ ### ##### ########
	 * @param {String} config.pageName ### ########
	 * @param {String} config.pageSchemaCaption ######### ##### ########
	 * @param {String} config.sectionCode ### #######
	 * @param {String} config.typeColumnValue ############# ####### ####
	 * @param {String} config.pageCaption ######### ########
	 * @param {String} config.actionCaption ######### ######## ### ########
	 * @return {Object} ############ ########
	 * @return {GUID} returns.id ########## ############## ##### ########
	 * @return {String} returns.name ### #######
	 * @return {GUID} returns.typeColumnValue ############# #### ######
	 * @return {String} returns.moduleCode ### #######
	 * @return {GUID} returns.recordId ############# ###### # ####### SysModuleEdit
	 */
	function createEditPage(designData, config) {
		var position = config.position || 0;
		var sectionCode = config.sectionCode;
		var pageConfig = {
			name: config.pageName,
			caption: config.pageSchemaCaption,
			code: sectionCode,
			type: Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,
			parentSchemaUId: SectionDesignerEnums.BaseSchemeUIds.BASE_PAGE,
			parentSchemaName: SectionDesignerEnums.BaseClientUnitSchemeNames.BASE_PAGE_NAME
		};
		var entityPage = createClientUnitSchema(pageConfig);
		var pageSchemaUId = entityPage.structure.schemaUId;
		var pageSchemaName = entityPage.structure.schemaName;
		var newClientUnitSchema = designData.schemaManager.clientUnit[pageSchemaName] =
				getNewClientUnitSchemaDesignData(entityPage);
		setEntityPrimaryDisplayColumn(designData, sectionCode, entityPage);
		setDefaultEditPageTab(entityPage, newClientUnitSchema);
		var module = designData.module[designData.mainModuleName];
		var page = {
			id: pageSchemaUId,
			name: pageSchemaName,
			typeColumnValue: (isEmptyOrEmptyGUID(config.typeColumnValue)) ? null : config.typeColumnValue,
			moduleCode: config.sectionCode,
			recordId: Terrasoft.generateGUID(),
			position: position
		};
		var actionCaption;
		var pageCaption;
		if (page.typeColumnValue) {
			actionCaption = config.actionCaption;
			pageCaption = config.pageCaption;
		} else {
			actionCaption = localizableStrings.AddRecord;
			pageCaption = config.pageSchemaCaption;
		}
		page.pageCaption = pageCaption;
		SectionDesignDataModule.addEntity("SysModuleEdit", {
			Id: page.recordId,
			SysModuleEntity: module.sysModuleEntityId,
			TypeColumnValue: page.typeColumnValue,
			UseModuleDetails: true,
			CardSchemaUId: page.id,
			ActionKindCaption: config.actionCaption || actionCaption,
			PageCaption: config.pageCaption,
			ActionKindName: config.pageName,
			Position: position
		});
		if (useMultilanguageData()) {
			var newActionKindId = addModuleEditLcz(actionCaption,
					SectionDesignerEnums.SysModuleEditLczColumns.ActionKindCaption, page.recordId);
			var newPageCaptionId = addModuleEditLcz(pageCaption,
					SectionDesignerEnums.SysModuleEditLczColumns.PageCaption, page.recordId);
			if (newActionKindId) {
				page.actionKindCaptionLczId = newActionKindId;
			}
			if (newPageCaptionId) {
				page.pageCaptionLczId = newPageCaptionId;
			}
		}
		return page;
	}

	/**
	 * ######### ###### # ####### ########### ### ####### ##############
	 * @param {String} value ############## ########
	 * @param {GUID} columnId ############# ############## #######
	 * @param {GUID} pageId ############# ######## ##############
	 * @return {GUID} ############# ########### ######
	 */
	function addModuleEditLcz(value, columnId, pageId) {
		var newRecordId;
		newRecordId = Terrasoft.generateGUID();
		SectionDesignDataModule.addEntity("SysModuleEditLczOld", {
			Id: newRecordId,
			ColumnUId: columnId,
			Record: pageId,
			SysCulture: Terrasoft.Resources.CultureSettings.currentCultureId,
			Value: value
		});
		return newRecordId;
	}

	/**
	 * ######### ###### # ####### ########### ### #######
	 * @param {String} value ############## ########
	 * @param {GUID} columnId ############# ############## #######
	 * @param {GUID} sectionId ############# ######## ##############
	 * @return {GUID} ############# ########### ######
	 */
	function addModuleLcz(value, columnId, sectionId) {
		var newRecordId;
		newRecordId = Terrasoft.generateGUID();
		SectionDesignDataModule.addEntity("SysModuleLczOld", {
			Id: newRecordId,
			ColumnUId: columnId,
			Record: sectionId,
			SysCulture: Terrasoft.Resources.CultureSettings.currentCultureId,
			Value: value
		});
		return newRecordId;
	}

	/**
	 * ########## ############ ###### ###### ### ########## #####
	 * @param {Object} clientUnit ########## #####
	 * @return {Object} ############ ########## #####
	 * @return {Object} returns.metaInfo #### ########## #####
	 * @return {ModificationType} returns.metaInfo.modificationType ### ###########
	 * @return {Object} returns.metaInfo.modifiedData ################ ######
	 * @return {Object} returns.schema ##### ######
	 */
	function getNewClientUnitSchemaDesignData(clientUnit) {
		return {
			resources: getClientUnitSchemaDesignDataBlock(clientUnit.resources,
					SectionDesignerEnums.ModificationType.NEW),
			structure: getClientUnitSchemaDesignDataBlock(clientUnit.structure,
					SectionDesignerEnums.ModificationType.NEW),
			schema: getClientUnitSchemaDesignDataBlock(clientUnit.schema,
					SectionDesignerEnums.ModificationType.NEW)
		};
	}

	/**
	 * ########## #### ###### ######### ### ########## #####
	 * @param {Object} schemaBlock #### ########## #####
	 * @param {SectionDesignerEnums.ModificationType} modificationType ### ###########
	 * @return {Object}
	 */
	function getClientUnitSchemaDesignDataBlock(schemaBlock, modificationType) {
		return {
			metaInfo: {
				modificationType: modificationType,
				modifiedData: {}
			},
			originData: schemaBlock
		};
	}

	/**
	 * ######### ########## ######### #######
	 * @param {Object} config ###### ##########:
	 * @param {String} config.moduleCode ### #######
	 * @param {Function} config.callback ####### ######### ######
	 * @param {Object} config.scope ######## ########## ######## ######### ######
	 */
	function getModuleInfo(config) {
		var moduleCode, callback, scope;
		moduleCode = config.moduleCode;
		callback = config.callback;
		scope = config.scope || this;
		var moduleStructure = this.modulesStructure[moduleCode];
		if (moduleStructure) {
			callback.call(scope, moduleStructure);
		} else {
			postServiceRequest({
				methodName: "GetModuleStructureInfo",
				parameters: {
					ModuleCode: moduleCode
				},
				scope: this,
				callback: function(request, success, response) {
					var existingModuleConfig = null;
					if (success) {
						var responseObject = Terrasoft.decode(response.responseText);
						if (responseObject.GetModuleStructureInfoResult) {
							existingModuleConfig = Terrasoft.decode(responseObject.GetModuleStructureInfoResult);
							var clientUnitSchemaNames = getSectionSchemaNames(existingModuleConfig, {
								clientUnitSchemaNameOnly: true
							});
							validateClientUnitScheme(clientUnitSchemaNames, function() {
								var sectionSchemaNames = getSectionSchemaNames(existingModuleConfig);
								tryLockSectionScheme(sectionSchemaNames, function() {
									callback.call(scope, existingModuleConfig);
								}, this);
							}, this);
							return;
						}
					}
					callback.call(scope, existingModuleConfig);
				}
			});
		}
	}

	/**
	 * ######### ########## ######### #######
	 * @param {String[]} sectionSchemaNames ###### #### #### #######
	 * @param {Function} callback ####### ######### ######
	 * @param {Object} scope ######## ########## ####### ######### ######
	 */
	function tryLockSectionScheme(sectionSchemaNames, callback, scope) {
		var maskId = Terrasoft.Mask.show();
		var packageUId = storage.getItem("SectionDesigner_CurrentPackageUId");
		postServiceRequest({
			methodName: "LockPackageElements",
			parameters: {
				schemaNames: sectionSchemaNames,
				packageUId: packageUId
			},
			scope: this,
			callback: function(request, success, response) {
				if (success) {
					var responseObject = Terrasoft.decode(response.responseText);
					var result = responseObject.LockPackageElementsResult;
					if (!result.Success) {
						var showMessage = result.ErrorMessage;
						var errorMessages = result.ErrorMessages;
						var userScheme = {};
						if (errorMessages && errorMessages.length > 0) {
							Terrasoft.each(errorMessages, function(item) {
								var userName = item.Value;
								userScheme[userName] = userScheme[userName] || [];
								userScheme[userName].push(item.Key);
							}, this);
							var userSchemaString = "\n";
							Terrasoft.each(userScheme, function(schemaNames, userName) {
								userSchemaString += Ext.String.format(" - {0}: {1};\n", userName,
										schemaNames.join(", "));
							}, this);
							showMessage = Ext.String.format(localizableStrings.LockSchemeError, userSchemaString);
						}
						Terrasoft.Mask.hide(maskId);
						Terrasoft.utils.showMessage({
							caption: showMessage,
							buttons: ["ok"],
							defaultButton: 0,
							style: Terrasoft.MessageBoxStyles.BLUE,
							handler: function() {
								Terrasoft.DomainCache.setItem("SectionDesigner_DetailsInfo", null);
								Terrasoft.DomainCache.setItem("DetailsInfo", null);
								window.close();
							}
						});
					} else {
						callback.call(scope);
					}
				}
			}
		});
	}

	/**
	 * ######### ######### ########## #### #######.
	 * @param {String[]} clientUnitSchemaNames ###### #### ########## #### #######.
	 * @param {Function} callback ####### ######### ######.
	 * @param {Object} scope ######## ########## ####### ######### ######.
	 */
	function validateClientUnitScheme(clientUnitSchemaNames, callback, scope) {
		var maskId = Terrasoft.Mask.show();
		postServiceRequest({
			methodName: "ValidateClientUnitSchemes",
			parameters: {
				schemaNames: clientUnitSchemaNames
			},
			scope: this,
			callback: function(request, success, response) {
				Terrasoft.Mask.hide(maskId);
				if (success) {
					var responseObject = Terrasoft.decode(response.responseText);
					var result = responseObject.ValidateClientUnitSchemesResult;
					if (result.Success) {
						callback.call(scope);
					} else {
						var errorMessage = result.ErrorMessages.map(function(item) {
							return item.Key + " - " + item.Value;
						});
						var errorText = localizableStrings.InvalidSchemasMessage + ":\n\n" +
								errorMessage.join(";\n");
						Terrasoft.utils.showMessage({
							caption: errorText,
							buttons: ["ok"],
							defaultButton: 0,
							style: Terrasoft.MessageBoxStyles.BLUE,
							handler: function() {
								Terrasoft.DomainCache.setItem("SectionDesigner_DetailsInfo", null);
								Terrasoft.DomainCache.setItem("DetailsInfo", null);
								window.close();
							}
						});
					}
				}
			}
		});
	}

	/**
	 * ######### ###### #### #### #######
	 * @private
	 * @param {Object} moduleConfig ###### ####### #######
	 * @param {Object} config ###### ############## ########## ######
	 * @param {Boolean} config.clientUnitSchemaNameOnly ########## ##### ###### ########## ####
	 * @param {Boolean} config.entitySchemaNameOnly ########## ##### ###### entity ####
	 * return {String[]} ######### ###### #### #### #######
	 */
	function getSectionSchemaNames(moduleConfig, config) {
		config = config || {};
		var schemaNameProperties = [];
		var clientUnitSchemaPropertyNames = ["sectionDetailName", "sectionSchemaName"];
		var entitySchemaPropertyNames = ["entityTagName", "entityInTagName", "entityFolderName",
			"entityInFolderName", "entityName"];
		if (config.clientUnitSchemaNameOnly) {
			schemaNameProperties = clientUnitSchemaPropertyNames;
		} else if (config.entitySchemaNameOnly) {
			schemaNameProperties = entitySchemaPropertyNames;
		} else {
			schemaNameProperties = Ext.Array.merge(entitySchemaPropertyNames, clientUnitSchemaPropertyNames);
		}
		var propertyValuesArray = Terrasoft.getPropertyValuesArray(schemaNameProperties, moduleConfig);
		var moduleScheme = Terrasoft.deleteEmptyItems(propertyValuesArray);
		var pages = moduleConfig.pages;
		Terrasoft.each(pages, function(pageConfig) {
			Ext.Array.include(moduleScheme, pageConfig.name);
		}, this);
		return moduleScheme;
	}

	/**
	 * ########## ########## # #####
	 * @param {Object} config ###### ##########:
	 * @param {String} config.schemaId ############# #####
	 * @param {String} config.schemaName ######## #####
	 * @param {Boolean} config.isClientUnit ####### ####, ### ##### ######## ########## #######
	 * @param {Function} config.callback ####### ######### ######
	 * @param {Object} config.scope ######## ########## ######## ######### ######
	 */
	function getSchemaInfo(config) {
		var serviceParameterValue, scope, callback, isClientUnit;
		scope = config.scope || this;
		callback = config.callback;
		isClientUnit = config.isClientUnit;
		var webServiceGetMethodPrefix = (!isClientUnit) ? "GetEntitySchemaInfoBy" : "GetClientUnitSchemaInfoBy";
		var serviceMethodName;
		if (config.schemaId) {
			serviceMethodName = webServiceGetMethodPrefix + "Id";
			serviceParameterValue = config.schemaId;
		} else if (config.schemaName) {
			serviceMethodName = webServiceGetMethodPrefix + "Name";
			serviceParameterValue = config.schemaName;
		}
		postServiceRequest({
			methodName: serviceMethodName,
			parameters: {
				schema: serviceParameterValue
			},
			scope: this,
			callback: function(request, success, response) {
				var schemaInfo = null;
				if (success) {
					var responseObject = Terrasoft.decode(response.responseText);
					if (responseObject[serviceMethodName + "Result"]) {
						schemaInfo = Terrasoft.decode(responseObject[serviceMethodName + "Result"]);
					}
				}
				callback.call(scope, schemaInfo);
			}
		});
	}

	/**
	 * ####### ######## ####### ##### ####### ####### # ###### #######
	 * @private
	 * @param {Function} callback ####### ######### ######
	 */
	function createEntityTypeColumn(callback) {
		var result = {
			module: {},
			schemaManager: {
				entity: {}
			},
			needCreateTypeColumn: false
		};
		var mainModuleName = result.mainModuleName = SectionDesignDataModule.getMainModuleName();
		var moduleStructure = SectionDesignDataModule.getModuleStructure(mainModuleName);
		var entityName = moduleStructure.entityName;
		var mainModule = result.module[mainModuleName] = {
			entityName: entityName
		};
		var entitySchemaManager = result.schemaManager.entity;
		var entity;
		var sectionSchemaName = moduleStructure.sectionSchemaName;
		SectionDesignDataModule.getEntitySchemaByName({
			name: entityName,
			callback: function(entitySchema) {
				entity = entitySchema;
				var entityType = createEntitySchema({
					name: entityName + "Type",
					caption: Ext.String.format(localizableStrings.EntityType, entity.caption),
					rootEntitySchema: Terrasoft.BaseLookup
				});
				var entityTypeReferenceColumn = createEntitySchemaReferenceColumn(entityType, {
					name: schemaNamePrefix + "Type",
					caption: localizableStrings.TypeColumnCaption
				});
				entitySchemaManager[entityType.name] = getEntitySchemaDesignData(entityType, []);
				mainModule.typeColumnId = entityTypeReferenceColumn.uId;
				mainModule.typeColumnName = entityTypeReferenceColumn.value;
				entitySchemaManager[entityName] = getEntitySchemaDesignData(entity, [{
					column: entityTypeReferenceColumn
				}]);
				Ext.apply(result, getDefaultGridSettings(sectionSchemaName, true, result));
				var detailDiff = getDefaultDetailDiff(entity.primaryDisplayColumnName,
						entityTypeReferenceColumn.name);
				SectionDesignDataModule.modifyClientUnitSchema(moduleStructure.sectionDetailName, {
					diff: [detailDiff]
				});
				SectionDesignDataModule.setDesignData(result);
				if (callback) {
					callback(entityTypeReferenceColumn);
				}
			}
		});
	}

	/**
	 * ############# ##### ######### #######. ########## ### ########### ########### # ######### ######## #
	 * ########## ######
	 * @param {String} caption #########
	 * @param {Function} callback ####### ######### ######
	 * @param {Object} scope ######## ### ####### ######### ######
	 */
	function setSectionCaption(caption, callback, scope) {
		SectionDesignDataModule.getDesignData(function(data) {
			var sectionData = data.module[data.mainModuleName];
			var header = Ext.String.format(localizableStrings.ModuleHeaderTemplate, caption);
			var editPages = sectionData.pages;
			var modifiedSectionData = {
				caption: caption,
				header: header,
				pages: editPages
			};
			SectionDesignDataModule.modifyEntitySchemaDesignData(
					data.mainModuleName,
					null,
					{caption: caption}
			);
			SectionDesignDataModule.modifyEntitySchemaDesignData(
					data.mainModuleName + "File",
					null,
					{caption: Ext.String.format(localizableStrings.EntityFile, caption)}
			);
			SectionDesignDataModule.modifyEntitySchemaDesignData(
					data.mainModuleName + "Tag",
					null,
					{caption: Ext.String.format(localizableStrings.EntityTagCaption, caption)}
			);
			SectionDesignDataModule.modifyEntitySchemaDesignData(
					data.mainModuleName + "InTag",
					null,
					{caption: Ext.String.format(localizableStrings.EntityInTagCaption, caption)}
			);
			SectionDesignDataModule.modifyEntitySchemaDesignData(
					data.mainModuleName + "Folder",
					null,
					{caption: Ext.String.format(localizableStrings.EntityFolder, caption)}
			);
			SectionDesignDataModule.modifyEntitySchemaDesignData(
					data.mainModuleName + "InFolder",
					null,
					{caption: Ext.String.format(localizableStrings.EntityInFolderCaption, caption)}
			);
			SectionDesignDataModule.modifyClientUnitStructure(sectionData.sectionSchemaName,
					{schemaCaption: Ext.String.format(localizableStrings.SectionPage, caption)}
			);
			if (sectionData.sectionDetailName) {
				SectionDesignDataModule.modifyClientUnitStructure(sectionData.sectionDetailName,
						{schemaCaption: Ext.String.format(localizableStrings.SectionDetail, caption)}
				);
				SectionDesignDataModule.modifyClientUnitResources(sectionData.sectionDetailName,
						{localizableStrings: {Caption: caption}}
				);
			}
			SectionDesignDataModule.modifyEntity("SysModule", {
				Caption: caption,
				ModuleHeader: header
			}, sectionData.id);
			if (useMultilanguageData) {
				SectionDesignDataModule.modifyEntity("SysModuleLczOld", {
					Value: caption
				}, sectionData.sysModuleCaptionLczId);
				SectionDesignDataModule.modifyEntity("SysModuleLczOld", {
					Value: header
				}, sectionData.sysModuleHeaderLczId);
			}
			SectionDesignDataModule.modifyEntity("SysDetail", {
				Caption: caption
			}, sectionData.sectionDetailId);
			if (!isEmptyOrEmptyGUID(sectionData.typeColumnId)) {
				SectionDesignDataModule.getEntitySchemaByName({
					name: data.mainModuleName,
					callback: function(entitySchema) {
						var typeColumn;
						var columns = entitySchema.columns;
						Terrasoft.each(columns, function(column) {
							if (column.uId === sectionData.typeColumnId) {
								typeColumn = column;
								return false;
							}
						});
						SectionDesignDataModule.modifyEntitySchemaDesignData(
								typeColumn.referenceSchemaName,
								null,
								{caption: Ext.String.format(localizableStrings.EntityType, caption)}
						);
						SectionDesignDataModule.getEntities(typeColumn.referenceSchemaName, ["Name"], false,
								function(entitySchemaData) {
									var currentEditPage;
									Terrasoft.each(entitySchemaData, function(item) {
										currentEditPage = null;
										for (var i = 0, length = editPages.length; i < length; i++) {
											var editPage = editPages[i];
											if (editPage.typeColumnValue === item.Id) {
												currentEditPage = editPage;
												break;
											}
										}
										if (currentEditPage) {
											modifyTypedEditPage(caption, currentEditPage, item.Name, item.Id,
													currentEditPage.position);
										}
									});
									setSectionDesignData(data.mainModuleName, modifiedSectionData);
									callback.call(scope || this);
								}
						);
					}
				});
			} else {
				modifyEditPage(editPages[0], caption);
				setSectionDesignData(data.mainModuleName, modifiedSectionData);
				callback.call(scope || this);
			}
		});
	}

	/**
	 * ############# ##### ####### ##### #######
	 * @param {String} workplaceId ########## ############# ######## ##### #######
	 */
	function setSectionWorkplace(workplaceId) {
		SectionDesignDataModule.setDesignData({
			workplaceId: workplaceId
		});
	}

	/**
	 * ############# ##### ###### #######
	 * @param {String} sectionIconId ########## ############# ###### #######
	 * @param {Function} callback ####### ######### ######
	 * @param {Object} scope ######## ### ####### ######### ######
	 */
	function setSectionIcon(sectionIconId, callback, scope) {
		SectionDesignDataModule.getDesignData(function(data) {
			var sectionData = data.module[data.mainModuleName];
			setSectionDesignData(data.mainModuleName, {
				sectionIconId: sectionIconId
			});
			SectionDesignDataModule.modifyEntity("SysModule", {Image32: sectionIconId}, sectionData.id);
			callback.call(scope || this);
		});
	}

	/**
	 * ############# ##### ###### #######
	 * @param {String} sectionLogoId ########## ############# ###### #######
	 * @param {Function} callback ####### ######### ######
	 * @param {Object} scope ######## ### ####### ######### ######
	 */
	function setSectionLogo(sectionLogoId, callback, scope) {
		SectionDesignDataModule.getDesignData(function(data) {
			var sectionData = data.module[data.mainModuleName];
			setSectionDesignData(data.mainModuleName, {
				sectionLogoId: sectionLogoId
			});
			SectionDesignDataModule.modifyEntity("SysModule", {Logo: sectionLogoId}, sectionData.id);
			callback.call(scope || this);
		});
	}

	/**
	 * ############# ##### ###### #######
	 * @param {String} sectionCode ### #######
	 * @param {Object} modifiedSectionData ######
	 */
	function setSectionDesignData(sectionCode, modifiedSectionData) {
		var newData = {
			module: {}
		};
		newData.module[sectionCode] = modifiedSectionData;
		SectionDesignDataModule.setDesignData(newData);
	}

	/**
	 * ####### ######## ##############, ############### ## ######### ##### # ###### # ########### #####
	 * @param {Object} designData ###### #########
	 * @param {GUID} typeId ############# #### ######
	 */
	function removeEditPage(designData, typeId) {
		var sectionData = designData.module[designData.mainModuleName];
		var editPages = sectionData.pages;
		var currentEditPage;
		for (var i = 0, length = editPages.length; i < length; i++) {
			var editPage = editPages[i];
			if (editPage.typeColumnValue === typeId) {
				editPages.splice(i, 1);
				currentEditPage = editPage;
				break;
			}
		}
		if (currentEditPage.typeColumnSchemaName) {
			SectionDesignDataModule.revertEntityChanges(currentEditPage.typeColumnSchemaName, [typeId]);
			if (useMultilanguageData()) {
				SectionDesignDataModule.deleteEntity("SysModuleEditLczOld", currentEditPage.actionKindCaptionLczId);
				SectionDesignDataModule.deleteEntity("SysModuleEditLczOld", currentEditPage.pageCaptionLczId);
			}
		}
		SectionDesignDataModule.deleteEntity("SysModuleEdit", currentEditPage.recordId);
		SectionDesignDataModule.deleteClientUnitSchema(currentEditPage.name);
		delete designData.schemaManager.clientUnit[currentEditPage.name];
	}

	/**
	 * ####### ##### ####### ############## #######. ####### ########## # ########## ###### ######### # ########
	 * ######### # ########### ##### ########
	 * @param {Object} designData ###### #########
	 */
	function clearEditPages(designData) {
		var sectionData = designData.module[designData.mainModuleName];
		var editPages = sectionData.pages;
		var typesForDelete = [];
		var sysModuleEditRecords = [];
		var sysModuleEditLczRecords = [];
		Terrasoft.each(editPages, function(page) {
			typesForDelete.push(page.typeColumnValue);
			sysModuleEditRecords.push(page.recordId);
			if (useMultilanguageData()) {
				sysModuleEditLczRecords.push(page.actionKindCaptionLczId);
				sysModuleEditLczRecords.push(page.pageCaptionLczId);
			}
		});
		Terrasoft.each(typesForDelete, function(typeId) {
			removeEditPage(designData, typeId);
		});
		Terrasoft.each(sysModuleEditRecords, function(sysModuleEditId) {
			SectionDesignDataModule.deleteEntity("SysModuleEdit", sysModuleEditId);
		}, this);
		Terrasoft.each(sysModuleEditLczRecords, function(sysModuleEditLczId) {
			SectionDesignDataModule.deleteEntity("SysModuleEditLczOld", sysModuleEditLczId);
		}, this);
	}

	/**
	 * ########### ###### # ############## ###. ######### ######### ## ############ ######### ############## ###
	 * ##### # ####### ##### ##### ### ######## ##############
	 * @param {Object} designData
	 * @param {Function} callback
	 */
	function convertIntoSinglePageSection(designData, callback) {
		changeSectionTypeColumn(designData);
		var code = designData.mainModuleName;
		var codeWithPrefix = designData.mainModuleName;
		if (!validateNamePrefix(codeWithPrefix)) {
			codeWithPrefix = getSchemaNamePrefix() + codeWithPrefix;
		}
		var sectionData = designData.module[code];
		getSectionLikeSchemaNames(designData, function(names) {
			var pageNameTpl = codeWithPrefix + "{0}Page";
			var pageName = Ext.String.format(pageNameTpl, "");
			var i = 0;
			var schemaManager = designData.schemaManager;
			var clientUnitManager = schemaManager.clientUnit;
			var entityManager = schemaManager.entity;
			while (names.indexOf(pageName) !== -1 || clientUnitManager[pageName] || entityManager[pageName]) {
				pageName = Ext.String.format(pageNameTpl, ++i);
			}
			var page = createEditPage(designData, {
				pageName: pageName,
				pageCaption: sectionData.caption,
				pageSchemaCaption: Ext.String.format(localizableStrings.SectionEditPage,
						sectionData.caption),
				sectionCode: code
			});
			SectionDesignDataModule.modifyEntity("SysModule", {
				CardSchemaUId: page.id
			}, sectionData.id);
			sectionData.pages.push(page);
			if (callback) {
				callback(designData);
			}
		});
	}

	/**
	 * ######## ####### #### ### #######. ### #### ########## ###### ####### ############## ### #######
	 * @param {Object} designData ###### #########
	 * @param {Object} column ##### ####### ####
	 */
	function changeSectionTypeColumn(designData, column) {
		clearEditPages(designData);
		var sectionData = designData.module[designData.mainModuleName];
		sectionData.typeColumnId = (column) ? column.uId : null;
		sectionData.typeColumnName = (column) ? column.value : null;
		SectionDesignDataModule.modifyEntity("SysModule", {
			Attribute: sectionData.typeColumnName
		}, sectionData.id);
		SectionDesignDataModule.modifyEntity("SysModuleEntity", {
			TypeColumnUId: sectionData.typeColumnId
		}, sectionData.sysModuleEntityId);
	}

	/**
	 * Returns schema name prefix.
	 * @return {String}
	 */
	function getSchemaNamePrefix() {
		return schemaNamePrefix;
	}

	/**
	 * ############ ######## ####### #### ## ###### ####### ######## ########
	 * @param {Function} callback ####### ######### ######
	 * @param {Object} scope ###### # ######### ######## ##### ########### ####### ######### ######
	 * @return {Object} ######### ######## ####### #### ## ###### ####### ######## ########
	 * @return {Boolean} return.canUseSectionDesigner ####### ####### #### ## ###### ####### ######## ########
	 * @return {String} return.message ######### ########
	 */
	function getCanUseSectionDesigner(callback, scope) {
		scope = scope || this;
		this.postServiceRequest({
			methodName: "GetCanUseSectionDesigner",
			parameters: null,
			callback: function(request, success, response) {
				var result = {
					canUseSectionDesigner: false,
					message: ""
				};
				if (success) {
					var responseObject = Terrasoft.decode(response.responseText);
					if (responseObject.GetCanUseSectionDesignerResult) {
						var responseResultObject = responseObject.GetCanUseSectionDesignerResult;
						result = {
							canUseSectionDesigner: responseResultObject.Success,
							message: responseResultObject.ErrorMessage
						};
					}
				}
				callback.call(scope, result);
			}
		});
	}

	/**
	 * ############ ######## ########### ######### ######
	 * @param {Function} callback ####### ######### ######
	 * @param {Object} scope ###### # ######### ######## ##### ########### ####### ######### ######
	 * @return {Object} ######### ######## ########### ######### ######
	 * @return {Boolean} return.canEditPackage ####### ########### ##############
	 * @return {String} return.message ######### ########
	 */
	function getAvailablePackages(callback, scope) {
		scope = scope || this;
		postServiceRequest({
			methodName: "GetAvailablePackages",
			parameters: null,
			callback: function(request, success, response) {
				var result = {
					canEditPackage: false,
					currentPackageUId: Terrasoft.GUID_EMPTY,
					availablePackages: null,
					message: ""
				};
				if (success) {
					var responseObject = Terrasoft.decode(response.responseText);
					if (responseObject.GetAvailablePackagesResult) {
						var responseResultObject = responseObject.GetAvailablePackagesResult;
						result = {
							canEditPackage: responseResultObject.Success,
							message: responseResultObject.ErrorMessage,
							currentPackageUId: responseResultObject.CurrentPackageUId
						};
						if (responseResultObject.AvailablePackages) {
							var availablePackages = {};
							Terrasoft.each(responseResultObject.AvailablePackages, function(pack) {
								availablePackages[pack.Key] = {
									value: pack.Key,
									displayValue: pack.Value
								};
							});
							result.availablePackages = availablePackages;
						}
					}
				}
				callback.call(scope, result);
			}
		});
	}

	/**
	 * ############ ######## ########### ######### ######
	 * @param {Function} callback ####### ######### ######
	 * @param {Object} scope ###### # ######### ######## ##### ########### ####### ######### ######
	 * @return {Number} ############ ##### ######## ##### #######
	 */
	function getMaxEntitySchemaNameLength(callback, scope) {
		scope = scope || this;
		postServiceRequest({
			methodName: "GetMaxEntitySchemaNameLength",
			parameters: null,
			callback: function(request, success, response) {
				if (success) {
					var responseObject = Terrasoft.decode(response.responseText);
					if (responseObject.GetMaxEntitySchemaNameLengthResult) {
						var result = responseObject.GetMaxEntitySchemaNameLengthResult;
						callback.call(scope, result);
					}
				}
			}
		});
	}

	function getCurrentPackageUId(callback, scope) {
		getAvailablePackages(function(availablePackagesResult) {
			if (!availablePackagesResult.canEditPackage) {
				var message = availablePackagesResult.message ||
						localizableStrings.CanNotEditPackage;
				Terrasoft.utils.showMessage({
					caption: message,
					buttons: ["ok"],
					defaultButton: 0,
					style: Terrasoft.MessageBoxStyles.BLUE,
					handler: function() {
						callback.call(scope || this, false);
					}
				});
			} else {
				var currentPackageUId = availablePackagesResult.currentPackageUId;
				storage.setItem("SectionDesigner_CurrentPackageUId", currentPackageUId);
				var packages = availablePackagesResult.availablePackages;
				var currentPackage = packages[currentPackageUId];
				if (currentPackage) {
					storage.setItem("SectionDesigner_CurrentPackageName", currentPackage.displayValue);
				}
				callback.call(scope || this, true);
			}
		});
	}

	function start(url) {
		Terrasoft.chain({}, [
			function(context) {
				getCurrentPackageUId(function(result) {
					if (result) {
						context.next();
					}
				});
			},
			function(context) {
				context.next();
				/*
				TODO: #252193 UI: ######## ##########. ########### ########## ##### ################
				##########/############# #### ########
				if (isNew) {
				context.next();
				} else {
				...
				}
				*/
			},
			function() {
				window.open(url);
			}
		]);
	}

	/**
	 * ######### ######## ############## ### #######.
	 * @param {Object} designData ###### #########
	 * @param {GUID} typeId ############# ####
	 * @param {String} typeCaption ######### ####
	 * @param {Number} position
	 * @param {String} typeColumnSchemaName ### ##### ####
	 * @param {Function} callback ####### ######### ######
	 */
	function addTypedEditPage(designData, typeId, typeCaption, position, typeColumnSchemaName, callback) {
		var sectionConfig = designData.module[designData.mainModuleName];
		var pages = sectionConfig.pages;
		var pageSchemaCaption = Ext.String.format(localizableStrings.SectionTypeEditPage,
				sectionConfig.caption, typeCaption);
		var pageCaption = typeCaption;
		var actionCaption = Ext.String.format(localizableStrings.ActionCaption, typeCaption);
		getSectionLikeSchemaNames(designData, function(names) {
			var codeWithPrefix = designData.mainModuleName;
			if (!validateNamePrefix(codeWithPrefix)) {
				codeWithPrefix = getSchemaNamePrefix() + codeWithPrefix;
			}
			var pageNameTpl = codeWithPrefix + "Type{0}Page";
			var i = 1;
			var pageName = Ext.String.format(pageNameTpl, i);
			var schemaManager = designData.schemaManager;
			var clientUnitManager = schemaManager.clientUnit;
			var entityManager = schemaManager.entity;
			while (names.indexOf(pageName) !== -1 || clientUnitManager[pageName] || entityManager[pageName]) {
				pageName = Ext.String.format(pageNameTpl, ++i);
			}
			var currentPage = createEditPage(designData, {
				sectionCode: designData.mainModuleName,
				pageName: pageName,
				pageCaption: pageCaption,
				pageSchemaCaption: pageSchemaCaption,
				typeColumnValue: typeId,
				actionCaption: actionCaption,
				position: position
			});
			currentPage.typeColumnSchemaName = typeColumnSchemaName;
			pages.push(currentPage);
			if (callback) {
				callback(designData, currentPage);
			}
		});
	}

	/**
	 * ############ ######## ##############
	 * @param {Object} pageConfig ############ ######## ##############
	 * @param {String} sectionCaption ######### #######
	 */
	function modifyEditPage(pageConfig, sectionCaption) {
		var pageSchemaCaption = Ext.String.format(localizableStrings.SectionEditPage, sectionCaption);
		pageConfig.caption = pageSchemaCaption;
		SectionDesignDataModule.modifyClientUnitStructure(pageConfig.name, {schemaCaption: pageSchemaCaption});
		SectionDesignDataModule.modifyEntity("SysModuleEdit", {PageCaption: sectionCaption}, pageConfig.recordId);
	}

	/**
	 * ############ ######## ##############
	 * @param {String} sectionCaption ######### #######0
	 * @param {Object} currentPage ####### ########
	 * @param {String} typeCaption ######### ####
	 * @param {GUID} typeId ############# ####
	 * @param {Number} position ####### ########
	 */
	function modifyTypedEditPage(sectionCaption, currentPage, typeCaption, typeId, position) {
		var pageSchemaCaption = Ext.String.format(localizableStrings.SectionTypeEditPage,
				sectionCaption, typeCaption);
		var pageCaption = typeCaption;
		var actionCaption = Ext.String.format(localizableStrings.ActionCaption, typeCaption);
		SectionDesignDataModule.modifyEntity("SysModuleEdit", {
			ActionKindCaption: actionCaption,
			PageCaption: pageCaption,
			TypeColumnValue: typeId,
			Position: position
		}, currentPage.recordId);
		SectionDesignDataModule.modifyClientUnitStructure(currentPage.name, {schemaCaption: pageSchemaCaption});
		currentPage.actionCaption = actionCaption;
		currentPage.pageCaption = pageCaption;
		currentPage.position = position;
		if (useMultilanguageData()) {
			var newActionKindId = modifySysModuleEditLcz(currentPage.actionKindCaptionLczId, actionCaption,
					SectionDesignerEnums.SysModuleEditLczColumns.ActionKindCaption, currentPage.recordId);
			var newPageCaptionId = modifySysModuleEditLcz(currentPage.pageCaptionLczId, pageCaption,
					SectionDesignerEnums.SysModuleEditLczColumns.PageCaption, currentPage.recordId);
			if (newActionKindId) {
				currentPage.actionKindCaptionLczId = newActionKindId;
			}
			if (newPageCaptionId) {
				currentPage.pageCaptionLczId = newPageCaptionId;
			}
		}
	}

	/**
	 * ############ ####### ########### ### ####### ############## #######
	 * @param {GUID} recordId ############# ###### # ####### ###########
	 * @param {String} value ############## ########
	 * @param {GUID} columnId ############# #######, ####### ##############
	 * @param {GUID} pageId ############# ######## ##############
	 * @return {GUID}
	 */
	function modifySysModuleEditLcz(recordId, value, columnId, pageId) {
		var newRecordId;
		if (!isEmptyOrEmptyGUID(recordId)) {
			SectionDesignDataModule.modifyEntity("SysModuleEditLczOld", {
				Value: value
			}, recordId);
		} else if (useMultilanguageData()) {
			newRecordId = addModuleEditLcz(value, columnId, pageId);
		}
		return newRecordId;
	}

	/**
	 * ######## ##### ####, ########## # ######## ### #######
	 * @param {Object} designData ###### #########
	 * @param {Function} callback ####### ######### ######
	 */
	function getSectionLikeSchemaNames(designData, callback) {
		if (designData.likeSchemaNames) {
			callback(designData.likeSchemaNames);
		} else {
			SectionDesignDataModule.loadLikeSchemaNames(designData.mainModuleName, function(names) {
				designData.likeSchemaNames = names;
				callback(designData.likeSchemaNames);
			});
		}
	}

	/**
	 * ######## ## ###### GUID
	 * @param {GUID} uId #############
	 * @return {Boolean}
	 */
	function isEmptyOrEmptyGUID(uId) {
		return Terrasoft.isEmpty(uId);
	}

	/**
	 * ########## ##### #### #####
	 * @param {String} schemaName ######## ######
	 * @param {Function} callback ####### ######### ######
	 * @param {Object} scope ######## ########## ######## ######### ######
	 */
	function getClientUnitSchemaBody(schemaName, callback, scope) {
		scope = scope || this;
		postServiceRequest({
			methodName: "GetClientUnitSchemaBody",
			parameters: {
				schemaName: schemaName
			},
			scope: this,
			callback: function(request, success, response) {
				if (success) {
					var responseObject = Terrasoft.decode(response.responseText);
					callback.call(scope, responseObject.GetClientUnitSchemaBodyResult);
				}
			}
		});
	}

	/**
	 * ########## ##### #### #####
	 * @param {String} schemaName ######## ######
	 * @param {Function} callback ####### ######### ######
	 * @param {Object} scope ######## ########## ######## ######### ######
	 */
	function getSchemaPackageStatus(schemaName, callback, scope) {
		scope = scope || this;
		var packageUId = storage.getItem("SectionDesigner_CurrentPackageUId");
		postServiceRequest({
			methodName: "GetSchemaPackageStatus",
			parameters: {
				schemaName: schemaName,
				packageUId: packageUId
			},
			scope: this,
			callback: function(request, success, response) {
				if (success) {
					var responseObject = Terrasoft.decode(response.responseText);
					callback.call(scope, responseObject.GetSchemaPackageStatusResult);
				}
			}
		});
	}

	Ext.define("Terrasoft.configuration.SectionDesignerUtils", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.SectionDesignerUtils",
		getSchemaPackageStatus: getSchemaPackageStatus,
		isExistColumn: isExistColumn,
		createButtons: createButtons,
		createClientUnitSchema: createClientUnitSchema,
		createEntitySchemaColumn: createEntitySchemaColumn,
		createEntitySchemaPrimaryDisplayColumn: createEntitySchemaPrimaryDisplayColumn,
		createEntitySchemaReferenceColumn: createEntitySchemaReferenceColumn,
		createEntitySchema: createEntitySchema,
		createInputControls: createInputControls,
		createModuleScheme: createModuleScheme,
		setSectionDesignDataModule: setSectionDesignDataModule,
		initSchemaNamePrefix: initSchemaNamePrefix,
		validateSystemName: validateSystemName,
		validateNamePrefix: validateNamePrefix,
		validateTextEdit: validateTextEdit,
		getModuleInfo: getModuleInfo,
		getSchemaInfo: getSchemaInfo,
		getEntitySchemaDesignData: getEntitySchemaDesignData,
		postServiceRequest: postServiceRequest,
		modulesStructure: modulesStructure,
		createEditPage: createEditPage,
		convertIntoSinglePageSection: convertIntoSinglePageSection,
		addModuleEditLcz: addModuleEditLcz,
		addModuleLcz: addModuleLcz,
		createEntityTypeColumn: createEntityTypeColumn,
		setSectionCaption: setSectionCaption,
		setSectionIcon: setSectionIcon,
		setSectionLogo: setSectionLogo,
		getSchemeBody: getSchemeBody,
		getSchemaBody: getSchemaBody,
		removeEditPage: removeEditPage,
		clearEditPages: clearEditPages,
		changeSectionTypeColumn: changeSectionTypeColumn,
		getSchemaNamePrefix: getSchemaNamePrefix,
		getCanUseSectionDesigner: getCanUseSectionDesigner,
		getMaxEntitySchemaNameLength: getMaxEntitySchemaNameLength,
		start: start,
		modifyTypedEditPage: modifyTypedEditPage,
		addTypedEditPage: addTypedEditPage,
		isEmptyOrEmptyGUID: isEmptyOrEmptyGUID,
		getClientUnitSchemaDesignDataBlock: getClientUnitSchemaDesignDataBlock,
		setSectionWorkplace: setSectionWorkplace,
		tryLockSectionScheme: tryLockSectionScheme,
		getCurrentPackageUId: getCurrentPackageUId
	});
	return Ext.create("Terrasoft.SectionDesignerUtils");
});
/*jshint maxparams: 10 */


