Terrasoft.configuration.Structures["ContentMjTextElementViewModel"] = {innerHierarchyStack: ["ContentMjTextElementViewModel"]};
define("ContentMjTextElementViewModel", ["ContentMjTextElementViewModelResources", "ContentElementBaseViewModel",
		"InlineCodeTextEdit", "ckeditor-base"], function(resources) {
	Ext.define("Terrasoft.ContentBuilder.ContentMjTextElementViewModel", {
		extend: "Terrasoft.ContentElementBaseViewModel",
		alternateClassName: "Terrasoft.ContentMjTextElementViewModel",

		/**
		 * Content element class name.
		 * @protected
		 * @type {String}
		 */
		className: "Terrasoft.ContentTextElement",

		/**
		 * @inheritdoc BaseContentSerializableViewModelMixin#serializableSlicePropertiesCollection
		 * @override
		 */
		serializableSlicePropertiesCollection: ["ItemType", "Content", "Styles"],

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.initResourcesValues(resources);
			this.on("change:SelectedText", this.onSelectedTextChanged, this);
		},

		/**
		 * @inheritDoc BaseContentItemViewModel#getPreparedConfigBeforeCreate
		 */
		getPreparedConfigBeforeCreate: function(config) {
			var changedConfig = this.callParent(arguments);
			changedConfig.Styles = Ext.apply({
				"font-family": Terrasoft.FontSet.ARIAL,
				"font-size": "13px",
				"color": "#000001",
				"line-height": "22px",
				"text-align": Terrasoft.Align.LEFT
			}, config.Styles);
			return changedConfig;
		},

		/**
		 * Handler for SelectedText change event.
		 * @protected
		 * @virtual
		 */
		onSelectedTextChanged: function() {
			this.fireEvent("change", this, {
				event: "selectedtextchanged",
				deprecatedEvent: "selectedtextсhanged",
				arguments: arguments
			});
		},

		/**
		 * @inheritdoc Terrasoft.ContentElementBaseViewModel#getViewConfig
		 * @overridden
		 */
		getViewConfig: function() {
			var config = this.callParent(arguments);
			Ext.apply(config, {
				"items": [{
					"className": "Terrasoft.InlineCodeTextEdit",
					"value": "$Content",
					"placeholder": "$Resources.Strings.Placeholder",
					"macrobuttonclicked": "$onMacroButtonClicked",
					"emailtemplatelinkclicked": "$onEmailTemplateLinkClicked",
					"selectedText": "$SelectedText",
					"ckeditorDefaultConfig": {
						"allowedContent": true,
						"removeButtons":
							"Font," +
							"FontSize," +
							"JustifyLeft," +
							"JustifyCenter," +
							"JustifyRight," +
							"JustifyBlock," +
							"Indent," +
							"Outdent," +
							"indentpanel," +
							"lineheight," +
							"lineheightpanel," +
							"letterspacing," +
							"letterspacingpanel"
					}
				}],
				"align": "$Align"
			});
			return config;
		},

		/**
		 * Handler for macrobuttonclicked event.
		 * @protected
		 * @virtual
		 */
		onMacroButtonClicked: function() {
			this.fireEvent("change", this, {
				event: "macrobuttonclicked",
				arguments: arguments
			});
		},

		/**
		 * Handles macros button click.
		 * @protected
		 * @param {Object} event Event info object.
		 */
		onEmailTemplateLinkClicked: function() {
			this.fireEvent("change", this, {
				event: "emailtemplatelinkclicked"
			});
		},

		/**
		 * Returns config object to init and open an edit page.
		 * @override
		 * @returns {Object} Full edit page config.
		 */
		getEditConfig: function() {
			var config = {
				ItemType: this.$ItemType,
				Styles: this.$Styles,
				ElementInfo: {
					Type: this.$ItemType,
					DesignTimeConfig: {
						Caption: resources.localizableStrings.PropertiesPageCaption
					},
					Settings: {
						schemaName: "ContentMjTextPropertiesPage",
						panelIcon: resources.localizableImages.PropertiesPageIcon,
						contextHelpText: resources.localizableStrings.PropertiesPageContextHelp
					}
				}
			};
			return config;
		}
	});
});


