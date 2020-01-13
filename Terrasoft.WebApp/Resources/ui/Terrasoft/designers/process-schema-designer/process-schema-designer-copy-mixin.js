/**
 */
Ext.define("Terrasoft.core.mixins.ProcessSchemaDesignerCopyMixin", {

	alternateClassName: "Terrasoft.ProcessSchemaDesignerCopyMixin",

	//region Properties: Private

	/**
	 * Last paste element identifier.
	 * @private
	 * @type {String}
	 */
	lastPasteElementUId: null,

	/**
	 * Last paste element shift by X and Y axis.
	 * @private
	 * @type {Number}
	 */
	lastPasteElementShift: 0,

	//endregion

	//region Methods: Private

	/**
	 * Creates item copy.
	 * @private
	 * @param {Terrasoft.BaseProcessSchema} sourceItem Source item.
	 * @return {Terrasoft.BaseProcessSchema} Item copy.
	 */
	createItemCopy: function(sourceItem) {
		var managerItemUId = sourceItem.managerItemUId;
		var config = {};
		sourceItem.getSerializableObject(config);
		var propertiesForDelete = ["uId", "name", "caption", "parameters"];
		propertiesForDelete.forEach(function(propertyName) {
			delete config[propertyName];
		});
		var item = this.elementSchemaManager.createInstance(managerItemUId, config);
		item.uId = Terrasoft.generateGUID();
		this.onGenerateItemNameAndCaption(item);
		var caption = "";
		if (sourceItem.caption) {
			var sourceCaption = sourceItem.caption.getValue();
			caption = sourceCaption ? sourceCaption + Terrasoft.Resources.SchemaDesigner.CopySuffixCaption : "";
		}
		item.caption = Ext.create("Terrasoft.LocalizableString", {cultureValues: caption});
		return item;
	},

	/**
	 * Returns new position for pasted item.
	 * @private
	 * @param {ej.Diagram.Node} sourceNode Source element node.
	 * @return {{X: Number, Y: Number}}
	 */
	getPasteItemPosition: function(sourceNode) {
		var sourceElementUId = sourceNode.tag;
		if (this.lastPasteElementUId !== sourceElementUId) {
			this.lastPasteElementUId = sourceElementUId;
			this.lastPasteElementShift = 0;
		}
		this.lastPasteElementShift += 20;
		var shift = this.lastPasteElementShift;
		return {
			x: sourceNode.offsetX + shift,
			y: sourceNode.offsetY + shift
		};
	},

	/**
	 * Transfers parameters source values from sourceItem to item.
	 * @protected
	 * @param {Terrasoft.BaseProcessSchema} item Destination parameters element.
	 * @param {Terrasoft.BaseProcessSchema} sourceItem Source parameters element.
	 */
	cloneParameters: function(item, sourceItem) {
		if (!sourceItem.parameters) {
			return;
		}
		const sourceParameters = sourceItem.parameters.getRoots();
		if (sourceParameters.isEmpty()) {
			return;
		}
		var processMappings = item.parentSchema.mappings;
		item.parameters.each(function(parameter) {
			processMappings.removeByKey(parameter.uId);
			item.parameters.remove(parameter);
		});
		sourceParameters.each(function(sourceParameter) {
			var parameter = sourceParameter.clone();
			if (!sourceParameter.getIsDynamic()) {
				var mappingInfo = item.createMappingInfo(parameter.uId, parameter);
				var sourceMapping = processMappings.find(sourceParameter.uId);
				if (sourceMapping) {
					mappingInfo.sourceParameterUId = sourceMapping.sourceParameterUId;
				}
				processMappings.add(mappingInfo.targetUId, mappingInfo);
			}
			item.parameters.add(parameter.uId, parameter);
		});
	},

	/**
	 * Pastes element copy.
	 * @protected
	 * @param {ej.Diagram.Node} sourceNode Source element node.
	 */
	pasteElement: function(sourceNode) {
		var sourceElementUId = sourceNode.tag;
		var items = this.get("Items");
		var copyItems = items.filter(function(item) {
			return item.uId === sourceElementUId;
		});
		var sourceItem = copyItems.collection.getAt(0);
		if (!this.elementSchemaManager.allowElementCopy(sourceItem)) {
			return;
		}
		var item = this.createItemCopy(sourceItem);
		var position = this.getPasteItemPosition(sourceNode);
		item.position = item.getCenterPosition(position.x, position.y);
		items.add(item.name, item);
		this.cloneParameters(item, sourceItem);
		this.loadPropertiesPage(item.name);
	}

	//endregion

});
