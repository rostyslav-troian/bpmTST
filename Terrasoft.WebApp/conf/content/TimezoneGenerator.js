Terrasoft.configuration.Structures["TimezoneGenerator"] = {innerHierarchyStack: ["TimezoneGenerator"]};
define("TimezoneGenerator", ["TimezoneGeneratorResources", "css!TimezoneGenerator", "ViewGeneratorV2"],
		function(Resources) {
			/**
			 * @class Terrasoft.configuration.TimezoneGenerator
			 * Generator class for TimeZone component.
			 */
			Ext.define("Terrasoft.configuration.TimezoneGenerator", {
				alternateClassName: "Terrasoft.TimezoneGenerator",
				extend: "Terrasoft.ViewGenerator",

				Ext: null,
				sandbox: null,
				Terrasoft: null,

				/**
				 * Time Zone component service properties.
				 * @protected
				 * @type {String[]}
				 */
				serviceProperties: ["generator", "items", "wrapClass", "classes", "id", "timeZoneCaption", "hideIcon",
					"timeZoneCity"],

				/**
				 * Generate configuration TimeZone's component.
				 * @protected
				 * @param {Object} config Configuration which contains properties for generate TimeZone.
				 * @return {Object} TimeZone's configuration.
				 */
				generateTimeZone: function(config) {
					var id = config.name;
					var timeZoneConfig = {
						"className": "Terrasoft.Container",
						"classes": {"wrapClassName": config.wrapClass},
						"items": [
							{
								"className": "Terrasoft.ImageView",
								"wrapClasses": ["timezone-image"],
								"visible": !config.hideIcon,
								"imageSrc": Terrasoft.ImageUrlBuilder.getUrl(Resources.localizableImages.TimeZoneImage)
							},
							{
								"className": "Terrasoft.Label",
								"labelClass": ["timezone-label"],
								"visible": {"bindTo": "IsEmptyTimeZone"},
								"caption": Resources.localizableStrings.DefaultTimeZoneCaption
							},
							{
								"className": "Terrasoft.Label",
								"labelClass": ["timezone-label timezone-caption"],
								"caption": config.timeZoneCaption
							},
							{
								"className": "Terrasoft.Label",
								"labelClass": ["timezone-label timezone-city"],
								"caption": config.timeZoneCity
							}
						],
						"tips": [
							{
								"name": "TipTimeZone",
								"tip": {
									"content": {"bindTo": "TimeZoneTip"}
								}
							}
						]
					};
					this.applyControlId(timeZoneConfig, config, id);
					var serviceProperties = this.getConfigWithoutServiceProperties(config, this.serviceProperties);
					Ext.apply(timeZoneConfig, serviceProperties);
					this.applyControlConfig(timeZoneConfig, config);
					return timeZoneConfig;
				},

				/**
				 * Generate configuration timezone button component.
				 * @protected
				 * @param {Object} config Configuration which contains properties for generate timezone button.
				 * @param {Object} initializationConfig View generator config.
				 * @return {Object} TimeZone button configuration.
				 */
				generateTimezoneButton: function(config, initializationConfig) {
					this.viewModelClass = initializationConfig.viewModelClass;
					delete config.generator;
					var generatedModelItem = this.generateModelItem(config);
					this.addTimezoneButton(generatedModelItem, initializationConfig);
					return generatedModelItem;
				},

				/**
				 * Adds timezone button to generated control.
				 * @private
				 * @param {Object} control Generated control.
				 * @param {Object} initializationConfig View generator config.
				 */
				addTimezoneButton: function(control, initializationConfig) {
					var generatedTimezoneButton = this.getGeneratedTimezoneButton(initializationConfig);
					if (generatedTimezoneButton) {
						control.items[1].items[0].items.push(generatedTimezoneButton);
					}
				},

				/**
				 * Returns generated view of timezone button.
				 * @public
				 * @param initializationConfig View generator config.
				 * @return {Object} Generated view of timezone button.
				 */
				getGeneratedTimezoneButton: function(initializationConfig) {
					var configTimezoneButton = this.getConfigTimezoneButton();
					var initConfig = this.getInitConfig(initializationConfig);
					return this.generatePartial(configTimezoneButton, initConfig)[0];
				},

				/**
				 * Returns current generator initialization config, applies custom config to the default values.
				 * @private
				 * @param {Object} config Custom config.
				 * @return {Object} Custom config with default values.
				 */
				getInitConfig: function(config) {
					return Ext.apply({
						schema: {},
						schemaType: Terrasoft.SchemaType.MODULE
					}, config);
				},

				/**
				 * Returns timezone button config.
				 * @private
				 * @return {Object} Button config.
				 */
				getConfigTimezoneButton: function() {
					var config = {
						"id": "TimezoneButton",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"imageConfig": Resources.localizableImages.TimezoneButtonIcon,
						"markerValue": "TimezoneButton",
						"classes": {
							"wrapperClass": ["timezone-button"]
						},
						"click": {"bindTo": "onShowTimezone"},
						"tips": [this.getPopupContainerConfig()]
					};
					return config;
				},

				/**
				 * Returns popup container config.
				 * @private
				 * @return {Object} Popup container config.
				 */
				getPopupContainerConfig: function() {
					var config = {
						"id": "TimezoneContainer",
						"visible": {"bindTo": "TimezoneContainerVisible"},
						"style": Terrasoft.TipStyle.WHITE,
						"hideOnScroll": false,
						"behaviour": {
							"displayEvent": Terrasoft.TipDisplayEvent.NONE
						},
						"items": [{
							"id": "TimezoneContainerGrid",
							"itemType": Terrasoft.ViewItemType.GRID_LAYOUT,
							"classes": {
								"wrapClassName": ["timezone-grid-layout"]
							},
							"items": [
								this.getHeaderConfig(),
								this.getTimezoneLabelConfig(),
								this.getTimezoneConfig(),
								this.getOffsetStartDateLabelConfig(),
								this.getOffsetDueDateLabelConfig(),
								this.getOffsetStartDateConfig(),
								this.getOffsetDueDateConfig(),
								this.getButtonContainerConfig()
							]
						}],
						"tools": []
					};
					return config;
				},

				/**
				 * Returns header config.
				 * @private
				 * @return {Object} Header config.
				 */
				getHeaderConfig: function() {
					var config = {
						"name": "TimezoneHeader",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": Resources.localizableStrings.TimezoneHeader,
						"classes": {
							"labelClass": ["timezone-label"]
						},
						"layout": {
							"column": 0,
							"row": 0,
							"colSpan": 24
						}
					};
					return config;
				},

				/**
				 * Returns time zone label config.
				 * @returns {Object} Label config.
				 */
				getTimezoneLabelConfig: function() {
					var config = {
						"name": "TimezoneLabel",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": Resources.localizableStrings.TimezoneLabel,
						"classes": {
							"labelClass": ["timezone-label", "timezone-label-bottom"]
						},
						"layout": {
							"column": 0,
							"row": 1,
							"colSpan": 24
						}
					};
					return config;
				},

				/**
				 * Returns timezone list config.
				 * @private
				 * @return {Object} Timezone list config.
				 */
				getTimezoneConfig: function() {
					var config = {
						"bindTo": "TimeZone",
						"name": "TimeZone",
						"contentType": Terrasoft.ContentType.ENUM,
						"layout": {
							"column": 0,
							"row": 2,
							"colSpan": 24
						},
						"labelConfig": {
							"visible": false
						},
						"controlConfig": {
							"prepareList": {"bindTo": "onPrepareTimeZoneList"},
							"filterComparisonType": Terrasoft.StringFilterType.CONTAIN,
							"list": {"bindTo": "TimeZoneList"}
						}
					};
					return config;
				},

				/**
				 * Returns offset start date label config.
				 * @returns {Object} Label config.
				 */
				getOffsetStartDateLabelConfig: function() {
					var config = {
						"name": "StartDateLabel",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": Resources.localizableStrings.StartDateLabel,
						"classes": {
							"labelClass": ["timezone-label", "timezone-label-bottom"]
						},
						"layout": {
							"column": 0,
							"row": 3,
							"colSpan": 12
						}
					};
					return config;
				},

				/**
				 * Returns offset due date label config.
				 * @returns {Object} Label config.
				 */
				getOffsetDueDateLabelConfig: function() {
					var config = {
						"name": "DueDateLabel",
						"itemType": Terrasoft.ViewItemType.LABEL,
						"caption": Resources.localizableStrings.DueDateLabel,
						"classes": {
							"labelClass": ["timezone-label", "timezone-label-bottom", "due-date-right"]
						},
						"layout": {
							"column": 12,
							"row": 3,
							"colSpan": 12
						}
					};
					return config;
				},

				/**
				 * Returns config of start date component.
				 * @private
				 * @return {Object} Config of start date component.
				 */
				getOffsetStartDateConfig: function() {
					var config = {
						"bindTo": "OffsetStartDate",
						"name": "OffsetStartDate",
						"layout": {
							"column": 0,
							"row": 4,
							"colSpan": 12
						},
						"labelConfig": {
							"visible": false
						},
						"enabled": {"bindTo": "isTimezoneSelected"}
					};
					return config;
				},

				/**
				 * Returns config of due date component.
				 * @private
				 * @return {Object} Config of due date component.
				 */
				getOffsetDueDateConfig: function() {
					var config = {
						"bindTo": "OffsetDueDate",
						"name": "OffsetDueDate",
						"layout": {
							"column": 12,
							"row": 4,
							"colSpan": 12
						},
						"wrapClass": "due-date-right",
						"labelConfig": {
							"visible": false
						},
						"enabled": {"bindTo": "isTimezoneSelected"},
						"controlConfig": {
							"timeEdit": {
								"controlConfig": {
									"prepareList": {
										"bindTo": "loadDueDateList"
									}
								}
							}
						}
					};
					return config;
				},

				/**
				 * Returns timezone button container.
				 * @private
				 * @return {Object} Timezone button container.
				 */
				getButtonContainerConfig: function() {
					var config = {
						"name": "TimezoneButtonContainer",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"classes": {
							"wrapClassName": ["timezone-button-container"]
						},
						"layout": {
							"column": 0,
							"row": 5,
							"colSpan": 24
						},
						"items": [
							this.getSaveButtonConfig(),
							this.getCancelButtonConfig()
						]
					};
					return config;
				},

				/**
				 * Returns config save button.
				 * @private
				 * @return {Object} Config save button.
				 */
				getSaveButtonConfig: function() {
					var config = {
						"name": "TimezoneSaveButton",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": Resources.localizableStrings.TimezoneSaveButton,
						"style": Terrasoft.controls.ButtonEnums.style.BLUE,
						"click": {"bindTo": "onTimezoneSave"}
					};
					return config;
				},

				/**
				 * Returns config cancel button.
				 * @private
				 * @return {Object} Config cancel button.
				 */
				getCancelButtonConfig: function() {
					var config = {
						"name": "TimezoneCancelButton",
						"itemType": Terrasoft.ViewItemType.BUTTON,
						"caption": Resources.localizableStrings.TimezoneCancelButton,
						"click": {"bindTo": "onTimezoneCancel"}
					};
					return config;
				}
			});

			return Ext.create("Terrasoft.TimezoneGenerator");
		});


