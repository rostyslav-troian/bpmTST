Terrasoft.configuration.Structures["ContentMjColumnViewModel"] = {innerHierarchyStack: ["ContentMjColumnViewModel"]};
define("ContentMjColumnViewModel", ["ContentMjColumnViewModelResources", "ContentColumnViewModel"],
	function(resources) {
		/**
		 * Class for ContentMjColumnViewModel.
		 */
		Ext.define("Terrasoft.controls.ContentMjColumnViewModel", {
			extend: "Terrasoft.controls.ContentColumnViewModel",
			alternateClassName: "Terrasoft.ContentMjColumnViewModel",

			/**
			 * Name of the view class.
			 * @protected
			 * @type {String}
			 */
			className: "Terrasoft.ContentMjColumn",

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#constructor
			 * @override
			 */
			constructor: function(config) {
				this.callParent(arguments);
				this.initResourcesValues(resources);
			},

			/**
			 * Prepares values for view model constructor.
			 * @public
			 * @param {Object} config Config for create view model.
			 * @returns {Object} Sliced values object.
			 */
			prepareValues: function(config) {
				var values = this.mixins.SerializableMixin.prepareValues.apply(this, arguments);
				var relativeWidth = config.WrapperStyles && config.WrapperStyles.width;
				relativeWidth = relativeWidth && Number(relativeWidth.replace("%", ""));
				values.RelativeWidth = relativeWidth || config.Width;
				return values;
			},

			/**
			 * @inheritdoc Terrasoft.BaseContentBlockViewModel#getViewConfig
			 * @override
			 */
			getViewConfig: function() {
				var config = this.callParent(arguments);
				Ext.apply(config, {
					"width": "$RelativeWidth",
					"tools": this.getToolsConfig(),
					"groupId": "$GroupId"
				});
				return config;
			},

			/**
			 * Handles events on grouping column action.
			 * @protected
			 */
			onGroupingColumns: function() {
				this.fireEvent("change", this, {
					event: "groupcolumns",
					arguments: {
						id: this.$Id
					}
				});
			},

			/**
			 * Handles events on ungrouping column action.
			 * @protected
			 */
			onUngroupingColumns: function() {
				this.$GroupId = null;
				this.fireEvent("change", this, {
					event: "ungroupcolumns",
					arguments: {
						id: this.$Id
					}
				});
			},

			/**
			 * Flag to indicate ungrouping action posibility.
			 * @protected
			 * @returns {Boolean}
			 */
			_canUngroup: function() {
				return Boolean(this.$GroupId);
			},

			/**
			 * Flag to indicate grouping action posibility.
			 * @protected
			 * @returns {Boolean}
			 */
			_canGroup: function() {
				return !this.$GroupId;
			},

			/**
			 * Generates configuration object of element tools.
			 * @protected
			 * @return {Array} Configuration object of element tools.
			 */
			getToolsConfig: function() {
				return [
					{
						className: "Terrasoft.Button",
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						markerValue: "group-column-button",
						imageConfig: "$Resources.Images.ContentGroupDefault",
						classes: {wrapperClass: "column-group-button"},
						click: "$onGroupingColumns",
						enabled: "$_canGroup"
					}, {
						className: "Terrasoft.Button",
						style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
						markerValue: "ungroup-column-button",
						imageConfig: "$Resources.Images.ContentUngroup",
						classes: {wrapperClass: "column-ungroup-button"},
						click: "$onUngroupingColumns",
						enabled: "$_canUngroup"
					}
				];
			}
		});
	}
);


