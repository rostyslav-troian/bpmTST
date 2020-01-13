Terrasoft.configuration.Structures["DcmSchemaStage"] = {innerHierarchyStack: ["DcmSchemaStage"]};
define("DcmSchemaStage", ["DcmSchemaStageResources", "DcmConstants"], function(resources) {
	/**
	 * @class Terrasoft.Designers.DcmSchemaStage
	 * Dcm stage schema class.
	 */
	Ext.define("Terrasoft.Designers.DcmSchemaStage", {
		extend: "Terrasoft.configuration.BaseProcessSchemaElement",
		alternateClassName: "Terrasoft.DcmSchemaStage",

		//region Properties: Protected

		/**
		 * @inheritdoc Terrasoft.configuration.BaseProcessSchemaElement#typeName
		 * @overridden
		 */
		typeName: "Terrasoft.Core.DcmProcess.DcmSchemaStage",

		/**
		 * Flag of permissions usage.
		 * @type {Boolean}
		 */
		usePermissions: false,

		/**
		 * Role identifiers that defining the state changes of this stage.
		 * @type {String}
		 */
		permissions: null,

		/**
		 * Default stage header color.
		 * @protected
		 * @type {String}
		 */
		defaultColor: "#8ecb60",

		//endregion

		//region Properties: Public

		/**
		 * Stage record identifier.
		 * @type {String}
		 */
		stageRecordId: null,

		/**
		 * Elements.
		 * @type {Terrasoft.Collection}
		 */
		elements: null,

		/**
		 * Parent alternative stage identifier.
		 * @type {String}
		 */
		parentStageUId: null,

		/**
		 * Stage header color.
		 * @type {String}
		 */
		color: "#8ecb60",

		/**
		 * @inheritdoc Terrasoft.configuration.BaseProcessSchemaElement#editPageSchemaName
		 * @overridden
		 */
		editPageSchemaName: "DcmSchemaStagePropertiesPage",

		/**
		 * @inheritdoc Terrasoft.manager.BaseProcessElementSchema#name
		 */
		name: "Stage",

		/**
		 * @inheritdoc Terrasoft.manager.BaseProcessElementSchema#caption
		 */
		caption: resources.localizableStrings.Caption,

		/**
		 * @inheritdoc Terrasoft.manager.BaseProcessElementSchema#typeCaption
		 */
		typeCaption: resources.localizableStrings.TypeCaption,

		/**
		 * Indicates if stage is successful.
		 * @type {Boolean}
		 */
		isSuccessful: true,

		/**
		 * Next stage transition type.
		 * @type {Terrasoft.DcmConstants.ElementRequiredType}
		 */
		transitionType: Terrasoft.DcmConstants.StageTransitionType.NONE.value,

		//endregion

		//region Constructors: Public

		/**
		 * @inheritdoc Terrasoft.BaseProcessSchemaElement#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.color = this.color || this.defaultColor;
			this.initCollection("elements", "Terrasoft.DcmSchemaElement", this.parentSchema);
		},

		//endregion

		//region Methods: Protected

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#loadLocalizableValues
		 * @overridden
		 */
		loadLocalizableValues: function(localizableValues) {
			this.callParent(arguments);
			var elementsLocalizableValues = localizableValues.Elements || {};
			this.elements.each(function(element) {
				element.loadLocalizableValues(elementsLocalizableValues[element.name] || {});
			});
		},

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#loadLocalizableValuesByUIds
		 * @overridden
		 */
		loadLocalizableValuesByUIds: function(localizableValues) {
			this.callParent(arguments);
			this.elements.each(function(element) {
				element.loadLocalizableValuesByUIds(localizableValues);
			});
		},

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableObject
		 * @overridden
		 */
		getSerializableObject: function(serializableObject) {
			this.callParent(arguments);
			this.setSerializableCollectionProperty(serializableObject, "elements");
		},

		/**
		 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
		 * @overridden
		 */
		getSerializableProperties: function() {
			let properties = this.callParent(arguments);
			properties = Ext.Array.push(properties, [
				"parentStageUId",
				"color",
				"stageRecordId",
				"isSuccessful",
				"transitionType"
			]);
			if (Terrasoft.Features.getIsEnabled("DcmStagesPermissions")) {
				properties = Ext.Array.push(properties, [
					"permissions",
					"usePermissions"
				]);
			}
			return properties;
		},

		/**
		 * @inheritdoc Terrasoft.manager.BaseProcessSchemaElement#getLocalizableValues
		 * @overridden
		 */
		getLocalizableValues: function(localizableValues) {
			this.callParent(arguments);
			this.elements.each(function(element) {
				element.getLocalizableValues(localizableValues);
			});
		},

		/**
		 * Returns header image config of the property page.
		 * @throws {Terrasoft.NotImplementedException}
		 * @protected
		 * @virtual
		 * @return {Object} Image config.
		 */
		getTitleImage: function() {
			return resources.localizableImages.TitleImage;
		},

		//endregion

		//region Methods: Public

		/**
		 * Returns stage items collection.
		 * @return {Terrasoft.core.collections.Collection} stage items.
		 */
		getItems: function() {
			return this.elements;
		},

		/**
		 * Adds dcm element to stage.
		 * @throws Terrasoft.NullOrEmptyException if parentSchema is null.
		 * @param {Terrasoft.configuration.DcmSchemaElement} item Dcm schema item.
		 */
		add: function(item) {
			this.checkParentSchema();
			item.containerUId = this.uId;
			this.parentSchema.addElement(item);
		},

		/**
		 * Removes dcm element from stage.
		 * @throws Terrasoft.NullOrEmptyException if parentSchema is null.
		 * @param {String} itemName Dcm schema item name.
		 */
		remove: function(itemName) {
			this.checkParentSchema();
			this.parentSchema.remove(itemName);
		},

		/**
		 * Returns True if stage is alternative.
		 * @return {Boolean} True if stage is alternative.
		 */
		getIsAlternative: function() {
			var parentStageUId = this.getParentStageUId();
			return parentStageUId != null;
		},

		/**
		 * Returns parent stage uId. If stage doesn't have parent stage, returns null.
		 * @throws Terrasoft.NullOrEmptyException if parentSchema is null.
		 * @return {String|null} Parent stage uId.
		 */
		getParentStageUId: function() {
			this.checkParentSchema();
			if (this.parentStageUId != null) {
				return this.parentStageUId;
			}
			var alternateStages = this.parentSchema.stages.filter("parentStageUId", this.uId);
			return alternateStages.isEmpty() ? null : this.uId;
		},

		/**
		 * Returns parent stage. If stage is not alternative stage, returns null.
		 * @return {Terrasoft.Designers.DcmSchemaStage|null} Parent stage.
		 */
		getParentStage: function() {
			var parentStageUId = this.getParentStageUId();
			if (parentStageUId == null) {
				return null;
			}
			return this.parentSchema.stages.get(parentStageUId);
		},

		/**
		 * Returns flag that indicates whether that stage instance is parent of alternative stages group.
		 * @return {Boolean} True if stage is parent of group, else False.
		 */
		getIsParent: function() {
			var parentStageUId = this.getParentStageUId();
			return parentStageUId === this.uId;
		},

		/**
		 * Returns alternative stages for parent stage. If stage is not parent of group, returns empty collection.
		 * @return {Terrasoft.core.collections.Collection}
		 */
		getChildren: function() {
			this.checkParentSchema();
			return this.parentSchema.stages.filter("parentStageUId", this.uId);
		},

		/**
		 * Returns flag that indicates whether the stage is last stage in group.
		 * If stage is not alternative to another stage, returns false.
		 * @return {Boolean}
		 */
		getIsLastStageInGroup: function() {
			var parentStage = this.getParentStage();
			if (parentStage == null) {
				return false;
			}
			var alternativeStages = parentStage.getChildren();
			var stageIndexInGroup = alternativeStages.indexOf(this);
			var groupLength = alternativeStages.getCount();
			return stageIndexInGroup === groupLength - 1;
		},

		/**
		 * Returns True if stage is last in collection.
		 * @return {Boolean}
		 */
		getIsLastStage: function() {
			var stageIndex = this.parentSchema.stages.indexOf(this);
			var stagesLength = this.parentSchema.stages.getCount();
			return stageIndex === stagesLength - 1;
		}

		//endregion

	});
	return Terrasoft.Designers.DcmSchemaStage;
});


