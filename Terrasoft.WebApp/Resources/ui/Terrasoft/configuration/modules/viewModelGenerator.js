define(['ext-base', 'terrasoft'], function(Ext, Terrasoft) {
	var exports = {};
	//------------------------------------------------------------------------------------------------------------------

	exports.localizableStrings = {
		duplicateColumnNames: 'Элемент с именем {} уже существует'
	};

	var entitySchema;
	var duplicateExceptionMessage = exports.localizableStrings.duplicateColumnNames;

	function getFullViewModelSchema(sourceViewModelSchema) {
		var viewModelSchema = Terrasoft.utils.common.deepClone(sourceViewModelSchema);
		applyUserCode(viewModelSchema, sourceViewModelSchema);
		return viewModelSchema;
	}

	function applyUserCode(viewModelSchema, sourceViewModelSchema) {
		sourceViewModelSchema.userCode.call(viewModelSchema);
	}

	function generateViewModelColumn(schemaItem) {
		return {
			type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
			caption: schemaItem.caption,
			name: schemaItem.name,
			columnPath: schemaItem.columnPath
		};
	}

	function generateViewModelLookupListColumn(schemaItem) {
		var entitySchemaColumn = entitySchema.getColumnByPath(schemaItem.columnPath);
		var lookupListColumnConfig = null;
		if (entitySchemaColumn.isLookup) {
			lookupListColumnConfig = {
				type: Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				name: schemaItem.list || schemaItem.name + 'List'
			};
		}
		return lookupListColumnConfig;
	}

	function checkColumnsNames(columns, name) {
		if (columns[name] !== undefined) {
			var errorMessage = Ext.String.format(duplicateExceptionMessage, name);
			throw new Terrasoft.ItemAlreadyExistsException({message: errorMessage});
		}
	}

	function getViewModelColumns(columns, columnsContainer) {
		Terrasoft.each(columnsContainer, function(schemaItem) {
			var itemType = schemaItem.type;
			switch (itemType) {
				case Terrasoft.ViewModelSchemaItem.ATTRIBUTE:
					var columnConfig = Terrasoft.utils.common.deepClone(schemaItem);
					var column = generateViewModelColumn(columnConfig);
					checkColumnsNames(columns, schemaItem.name);
					columns[schemaItem.name] = column;
					var lookupListColumnConfig = generateViewModelLookupListColumn(schemaItem);
					if (lookupListColumnConfig) {
						checkColumnsNames(columns, lookupListColumnConfig.name);
						columns[lookupListColumnConfig.name] = lookupListColumnConfig;
					}
					break;
				case Terrasoft.ViewModelSchemaItem.GROUP:
					var groupedColumns = getViewModelColumns(columns, schemaItem.items);
					Ext.apply(columns, groupedColumns);
					break;
				case Terrasoft.ViewModelSchemaItem.DETAIL:
					break;
				default:
					break;
			}
		}, this);
	}

	Ext.apply(exports, {
		generate: function(viewModelSchema) {
			var fullViewModelSchema = getFullViewModelSchema(viewModelSchema);
			entitySchema = Ext.ClassManager.classes[fullViewModelSchema.entitySchema];
			var config = {
				extend: fullViewModelSchema.extend,
				alternateClassName: 'Terrasoft.' + fullViewModelSchema.name,
				entitySchema: Ext.ClassManager.classes[fullViewModelSchema.entitySchema],
				name: fullViewModelSchema.name,
				columns: {},
				primaryColumnName: '',
				primaryDisplayColumnName: ''
			};
			Ext.apply(config, fullViewModelSchema.methods);
			getViewModelColumns(config.columns, fullViewModelSchema.schema.leftPanel);
			return config;
		}
	});

	//------------------------------------------------------------------------------------------------------------------
	return exports;
});