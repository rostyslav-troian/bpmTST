Terrasoft.configuration.Structures["DuplicatesMergeViewModelV2"] = {innerHierarchyStack: ["DuplicatesMergeViewModelV2"]};
define("DuplicatesMergeViewModelV2", ["AcademyUtilities", "ModalBox", "DuplicatesMergeViewModelV2Resources"],
	function(AcademyUtilities, ModalBox, resources) {
		Ext.define("Terrasoft.configuration.DuplicatesMergeViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.DuplicatesMergeViewModel",

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			columns: {
				/**
				 * The text of the header caption.
				 */
				"MergeModuleCaption": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					value: ""
				},
				/**
				 * The text of the description.
				 */
				"MergeModuleDescription": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					value: resources.localizableStrings.DescriptionText
				},
				/**
				 * Collection of columns for merge.
				 */
				"MergeColumns": {
					type: Terrasoft.ViewModelColumnType.ENTITY_COLUMN,
					value: []
				}
			},

			/**
			 * On render handler.
			 */
			onRender: Ext.emptyFn,

			/**
			 * Close page.
			 */
			close: function() {
				if (ModalBox.getInnerBox()) {
					ModalBox.close(true);
				}
			},

			/**
			 * Merge button click handler.
			 */
			onMergeButtonClick: function() {
				var mergeColumns = this.get("MergeColumns");
				var mergeConfig = {};
				Terrasoft.each(mergeColumns, function(columnName) {
					mergeConfig[columnName] = this.get(columnName);
				}, this);
				var sandbox = this.sandbox;
				sandbox.publish("Merge", mergeConfig, [sandbox.id]);
				this.close();
			},

			/**
			 * Cancel button click handler.
			 */
			onCancelButtonClick: function() {
				this.close();
			},

			/**
			 * Initialize text of caption.
			 * @param {Object} config Parameters to initialize.
			 */
			initMergeModuleCaption: function(config) {
				var descriptionString = resources.localizableStrings.HeaderCaption;
				var mergeRecordsCount = config.mergeRecordsCount;
				this.set("MergeModuleCaption",
					Ext.String.format(descriptionString, mergeRecordsCount)
				);
			},

			/**
			 * Callback function for initDescriptionLinkText.
			 * @protected
			 * @param {string} url Academy url.
			 */
			initDescriptionLinkTextCallback: function(url) {
				var academyLinkCaption = resources.localizableStrings.AcademyLinkCaption;
				this.set("MergeModuleDescriptionUrl", url);
				this.set("MergeModuleDescriptionLink",
					Ext.String.format(academyLinkCaption, "<a href=\"" + url + "\" target=\"_blank\">", "</a>")
				);
			},

			/**
			 * Initialize how it works link.
			 */
			initDescriptionLinkText: function() {
				AcademyUtilities.getUrl({
					scope: this,
					contextHelpId: 1586,
					callback: this.initDescriptionLinkTextCallback
				});
			},

			/**
			 * Returns localizable string name for description text.
			 * @param {String} schemaName Name of entity schema.
			 * @returns {String} Localizable string name.
			 */
			getDescriptionStringName: function(schemaName) {
				return Ext.String.format("{0}DescriptionText", schemaName);
			},

			/**
			 * Initialize model properties.
			 */
			initProperties: function() {
				var parameters = this.values;
				this.initMergeModuleCaption(parameters);
				this.initDescriptionLinkText();
				var primaryColumnName = parameters.primaryColumnName;
				var mergeColumns = Object.keys(parameters.columns);
				this.set("MergeColumns", mergeColumns);
				var values = parameters.rows[0] || [];
				Terrasoft.each(mergeColumns, function(columnName) {
					var value = values[primaryColumnName];
					this.set(columnName, value);
				}, this);
			},

			/**
			 * Initialize model.
			 * @param {Function} callback Callback function.
			 * @param {Object} scope Execution context.
			 */
			init: function(callback, scope) {
				this.initProperties();
				callback.call(scope || this);
			}
		});
	});


