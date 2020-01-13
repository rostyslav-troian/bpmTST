Terrasoft.configuration.Structures["SectionManagerItem"] = {innerHierarchyStack: ["SectionManagerItem"]};
define("SectionManagerItem", ["SectionManagerItemResources", "SysModuleEntityManager"], function() {

	/**
	 * @class Terrasoft.SectionManagerItem
	 * Class of section manager element.
	 */

	Ext.define("Terrasoft.SectionManagerItem", {
		extend: "Terrasoft.ObjectManagerItem",
		alternateClassName: "Terrasoft.SectionManagerItem",

		// region Properties: Private

		/**
		 * Caption.
		 * @private
		 * @type {String}
		 */
		caption: null,

		/**
		 * Code.
		 * @private
		 * @type {String}
		 */
		code: null,

		/**
		 * SysModule entity identifier.
		 * @private
		 * @type {Object}
		 */
		sysModuleEntity: null,

		/**
		 * Schema identifier.
		 * @private
		 * @type {String}
		 */
		schemaUId: null,

		/**
		 * Module schema identifier.
		 * @private
		 * @type {String}
		 */
		moduleSchemaUId: null,

		/**
		 * Global search available.
		 * @private
		 * @type {Boolean}
		 */
		globalSearchAvailable: null,

		/**
		 * Left panel logo identifier.
		 * @private
		 * @type {Object}
		 */
		leftPanelLogo: null,

		/**
		 * Folder mode.
		 * @private
		 * @type {Object}
		 */
		folderMode: null,

		/**
		 * Typed attribute.
		 * @private
		 * @type {Object}
		 */
		attribute: null,

		/**
		 * Is left panel logo changed.
		 * @private
		 * @type {Boolean}
		 */
		leftPanelLogoChanged: false,

		/**
		 * System section.
		 * @type {Boolean}
		 */
		isSystem: null,

		/**
		 * Type.
		 * @type {Integer}
		 */
		type: null,

		/**
		 * Last modified on date.
		 * @Type {Object}
		 */
		modifiedOn: null,

		// endregion

		// region Methods: Protected

		/**
		 * Returns if value is default.
		 * @protected
		 * @return {boolean} If value is default.
		 */
		getIsDefaultLeftPanelLogo: function() {
			const value = this.getLeftPanelLogo();
			return Ext.isEmpty(value) || value === Terrasoft.DesignTimeEnums.DefaultIcon.SECTION_DEFAULT_ICON_ID;
		},

		// endregion

		// region Methods: Public

		/**
		 * Returns caption.
		 * @return {String} Returns caption.
		 */
		getCaption: function() {
			return this.getPropertyValue("caption");
		},

		/**
		 * Sets caption.
		 * @param {String} caption Caption.
		 */
		setCaption: function(caption) {
			this.setPropertyValue("caption", caption);
		},

		/**
		 * Returns code.
		 * @return {String} Returns code.
		 */
		getCode: function() {
			return this.getPropertyValue("code");
		},

		/**
		 * Sets system section flag.
		 * @param {String} code Code.
		 */
		setIsSystem: function(code) {
			this.setPropertyValue("isSystem", code);
		},

		/**
		 * Returns system section flag.
		 * @return {String} Returns flag.
		 */
		getIsSystem: function() {
			return this.getPropertyValue("isSystem");
		},

		/**
		 * Sets code.
		 * @param {String} code Code.
		 */
		setCode: function(code) {
			this.setPropertyValue("code", code);
		},

		/**
		 * Returns module entity identifier.
		 * @return {Object} Returns module entity identifier.
		 */
		getSysModuleEntityId: function() {
			const sysModuleEntity = this.getPropertyValue("sysModuleEntity");
			return sysModuleEntity && sysModuleEntity.value;
		},

		/**
		 * Sets module entity identifier.
		 * @param {String} sysModuleEntityId Module entity identifier.
		 */
		setSysModuleEntityId: function(sysModuleEntityId) {
			this.setPropertyValue("sysModuleEntity", {
				value: sysModuleEntityId,
				displayValue: "",
				primaryImageValue: ""
			});
		},

		/**
		 * Returns schema identifier.
		 * @return {String} Returns schema identifier.
		 */
		getSchemaUId: function() {
			return this.getPropertyValue("schemaUId");
		},

		/**
		 * Sets schema identifier.
		 * @param {String} schemaUId Schema identifier.
		 */
		setSchemaUId: function(schemaUId) {
			this.setPropertyValue("schemaUId", schemaUId);
		},

		/**
		 * Returns module schema identifier.
		 * @return {String} Returns module schema identifier.
		 */
		getModuleSchemaUId: function() {
			return this.getPropertyValue("moduleSchemaUId");
		},

		/**
		 * Sets module schema identifier.
		 * @param {String} moduleSchemaUId module schema identifier.
		 */
		setModuleSchemaUId: function(moduleSchemaUId) {
			this.setPropertyValue("moduleSchemaUId", moduleSchemaUId);
		},

		/**
		 * Returns global search available.
		 * @return {Boolean} Returns global search available.
		 */
		getGlobalSearchAvailable: function() {
			return this.getPropertyValue("globalSearchAvailable");
		},

		/**
		 * Sets global search available.
		 * @param {String} globalSearchAvailable global search available.
		 */
		setGlobalSearchAvailable: function(globalSearchAvailable) {
			this.setPropertyValue("globalSearchAvailable", globalSearchAvailable);
		},

		/**
		 * Returns left panel logo identifier.
		 * @return {String} Returns left panel logo identifier.
		 */
		getLeftPanelLogo: function() {
			const leftPanelLogo = this.getPropertyValue("leftPanelLogo");
			return leftPanelLogo && leftPanelLogo.value;
		},

		/**
		 * Sets left panel logo identifier.
		 * @param {Guid} leftPanelLogo Left panel logo identifier.
		 */
		setLeftPanelLogo: function(leftPanelLogo) {
			const oldValue = this.getLeftPanelLogo();
			if (leftPanelLogo !== oldValue) {
				this.setPropertyValue("leftPanelLogo", {
					value: leftPanelLogo,
					displayValue: "",
					primaryImageValue: ""
				});
				this.leftPanelLogoChanged = true;
			}
		},

		/**
		 * Returns whether left panel logo has to be updated.
		 * @return {Boolean} Whether left panel logo has to be updated.
		 */
		needUpdateLeftPanelLogo: function() {
			return this.leftPanelLogoChanged && !this.getIsDefaultLeftPanelLogo();
		},

		/**
		 * Returns folder mode.
		 * @return {String} Folder mode.
		 */
		getFolderMode: function() {
			const folderMode = this.getPropertyValue("folderMode");
			return folderMode && folderMode.value;
		},

		/**
		 * Sets folder mode.
		 * @param {String} folderMode Folder mode.
		 */
		setFolderMode: function(folderMode) {
			this.setPropertyValue("folderMode", {
				value: folderMode,
				displayValue: "",
				primaryImageValue: ""
			});
		},

		/**
		 * Returns attribute.
		 * @return {String} Attribute.
		 */
		getAttribute: function() {
			return this.getPropertyValue("attribute");
		},

		/**
		 * Sets attribute.
		 * @param {String} attribute Attribute.
		 */
		setAttribute: function(attribute) {
			this.setPropertyValue("attribute", attribute);
		},

		/**
		 * Returns module entity manager element for current section manager item.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 * @return {Terrasoft.SysModuleEntityManagerItem} module entity manager element.
		 */
		getSysModuleEntityManagerItem: function(callback, scope) {
			Terrasoft.SysModuleEntityManager.initialize(null, function() {
				const sysModuleEntityId = this.getSysModuleEntityId();
				const item = Terrasoft.SysModuleEntityManager.findItem(sysModuleEntityId);
				callback.call(scope, item);
			}, this);
		},

		/**
		 * Returns section in workplace manager items for the section manager item.
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 * @return {Terrasoft.Collection} Section in workplace manager items.
		 */
		getSectionInWorkplaceManagerItems: function(callback, scope) {
			const sectionInWorkplaceManager = Terrasoft.SectionInWorkplaceManager;
			Terrasoft.chain(
				function(next) {
					sectionInWorkplaceManager.initialize(null, next, this);
				},
				function() {
					const id = this.getId();
					const filteredItems = sectionInWorkplaceManager.filterByFn(function(item) {
						return item.getSectionId() === id;
					});
					callback.call(scope, filteredItems);
				},
				this
			);
		},

		/**
		 * Returns SysModuleVisa identifier.
		 * @return {Object} Returns module visa identifier.
		 */
		getSysModuleVisaId: function() {
			const sysModuleVisa = this.getPropertyValue("sysModuleVisa");
			return sysModuleVisa && sysModuleVisa.value;
		},

		/**
		 * Sets SysModuleVisa identifier.
		 * @param {String} sysModuleVisaId SysModuleVisa identifier.
		 */
		setSysModuleVisaId: function(sysModuleVisaId) {
			this.setPropertyValue("sysModuleVisa", {
				value: sysModuleVisaId,
				displayValue: "",
				primaryImageValue: ""
			});
		}

		// endregion

	});

	return Terrasoft.SectionManagerItem;
});


