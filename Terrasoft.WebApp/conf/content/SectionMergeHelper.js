Terrasoft.configuration.Structures["SectionMergeHelper"] = {innerHierarchyStack: ["SectionMergeHelper"]};
define("SectionMergeHelper", ["SectionMergeHelperResources", "ModalBox", "DesktopPopupNotification",
		"DuplicatesMergeModuleV2"],
	function(resources, ModalBox, DesktopPopupNotification) {
		/**
		 * @class Terrasoft.configuration.mixins.SectionMergeHelper
		 * Mixin for merge in section.
		 */
		Ext.define("Terrasoft.configuration.mixins.SectionMergeHelper", {
			alternateClassName: "Terrasoft.SectionMergeHelper",

			mergeServiceName: "DeduplicationService",

			mergeServiceMethod: "MergeEntityDuplicatesAsync",

			mergeModule: "DuplicatesMergeModuleV2",

			/**
			 * Merges records.
			 * @param {Object} mergeConfig Config for the merge.
			 */
			mergeRecords: function(mergeConfig) {
				var items = this.getSelectedItems();
				if (items && items.length > 1) {
					var config = this.getMergeServiceConfig(items, mergeConfig);
					this.callService(config, this.handleMergeServiceResponse.bind(this, items), this);
				} else {
					this.showInformationDialog(resources.localizableStrings.SelectMoreThanOneRowErrorMessage);
				}
			},

			/**
			 * Returns config for the merge service.
			 * @param {Array} items List of selected elements.
			 * @param {Object} mergeConfig Config for the merge.
			 * @return {Object} Config for the merge service.
			 */
			getMergeServiceConfig: function(items, mergeConfig) {
				var config = {
					serviceName: this.mergeServiceName,
					methodName: this.mergeServiceMethod,
					data: {
						"schemaName": this.entitySchemaName,
						"groupId": 1,
						"deduplicateRecordIds": items,
						"mergeConfig": JSON.stringify(mergeConfig)
					}
				};
				return config;
			},

			/**
			 * Handles response from the merge service.
			 * @param {Array} items List of selected elements.
			 * @param {Object} response Response from the service.
			 */
			handleMergeServiceResponse: function(items, response) {
				if (!this.Ext.isEmpty(response)) {
					var responseResult = response.MergeEntityDuplicatesAsyncResult;
					if (!this.Ext.isEmpty(responseResult)) {
						if (responseResult.success) {
							this.showMergePopup(items.length);
							this.reloadGridData();
						} else {
							this.openDuplicatesMergePage(responseResult.conflicts);
						}
					}
				}
			},

			/**
			 * Show popup message with the merge info.
			 * @param {Number} mergeRecordsCount Count of records to merge.
			 */
			showMergePopup: function(mergeRecordsCount) {
				var config = this.getMergePopupConfig(mergeRecordsCount);
				DesktopPopupNotification.showNotification(config);
			},

			/**
			 * Returns the config of the popup notification.
			 * @param {Number} mergeRecordsCount Count of records to merge.
			 * @return {Object} Config of the popup notification.
			 */
			getMergePopupConfig: function(mergeRecordsCount) {
				var bodyTemplate = this.getMergePopupBodyTemplate();
				return {
					id: this.Terrasoft.generateGUID(),
					title: resources.localizableStrings.MergeNotificationTitleTemplate,
					body: this.Ext.String.format(bodyTemplate, mergeRecordsCount),
					icon: this.getMergePopupIconUrl(),
					onShow: this.onShowPopup,
					ignorePageVisibility: true
				};
			},

			/**
			 * Returns template for the message body.
			 * @return {String} Template for the message body.
			 */
			getMergePopupBodyTemplate: function() {
				var entitySchemaName = this.entitySchemaName;
				var localizableStrings = resources.localizableStrings;
				return localizableStrings.DefaultMergeNotificationBodyTemplate;
			},

			/**
			 * Returns url for the message icon.
			 * @return {String} Url.
			 */
			getMergePopupIconUrl: function() {
				return this.Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.DefMergeIcon);
			},

			/**
			 * Handling popup notification after display.
			 * @param {Event} event Event show.
			 */
			onShowPopup: function(event) {
				setTimeout(function() {
					DesktopPopupNotification.closeNotification(event.target);
				}, DesktopPopupNotification.defaultDisplayTimeout);
			},

			/**
			 * Opens page for merge duplicates.
			 * @param {Object} conflicts Config for the merge.
			 */
			openDuplicatesMergePage: function(conflicts) {
				var mergeModuleParameters = this.getMergeModuleConfig(conflicts);
				mergeModuleParameters.schemaName = this.entitySchemaName;
				var moduleId = this.getMergeModuleId();
				var modalBoxConfig = this.getModalBoxConfig();
				var renderTo = ModalBox.show(modalBoxConfig, function() {
					this.sandbox.unloadModule(moduleId, renderTo);
				}, this);
				this.loadMergeModule({
					id: moduleId,
					renderTo: renderTo.id,
					parameters: {
						config: mergeModuleParameters
					}
				});
			},

			/**
			 * Returns modalbox config.
			 * @return {Object} Config of modalbox.
			 */
			getModalBoxConfig: function() {
				var modalBoxConfig = {
					heightPixels: 420,
					widthPixels: 750
				};
				return modalBoxConfig;
			},

			/**
			 * Loads the merge module.
			 * @param {Object} config Config for the merge.
			 */
			loadMergeModule: function(config) {
				this.sandbox.loadModule(this.mergeModule, config);
			},

			/**
			 * Returns id for the merge module.
			 * @return {String} Merge module id.
			 */
			getMergeModuleId: function() {
				return this.sandbox.id + this.mergeModule;
			},

			/**
			 * Returns is merge button visible tag.
			 * @returns {Boolean} Is merge button visible tag.
			 */
			isMergeVisible: function () {
				return this.$MultiSelect;
			},

			/**
			 * Adds merge action in actions button.
			 * @param {Object} actionMenuItems Items menu button.
			 * @return {Terrasoft.Collection} Items menu button with added item.
			 */
			addMergeActionButton: function(actionMenuItems) {
				actionMenuItems.insert(8, "MergeRecords", this.getButtonMenuItem({
					"Click": {"bindTo": "mergeRecords"},
					"Caption": resources.localizableStrings.MergeRecordsCaption,
					"Visible": {"bindTo": "isMergeVisible"},
					"Enabled": {"bindTo": "isAnySelected"},
					"ImageConfig": resources.localizableImages.MergeBtnImage
				}));
				return actionMenuItems;
			}

		});
	});


