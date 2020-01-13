Terrasoft.configuration.Structures["DynamicContentValidator"] = {innerHierarchyStack: ["DynamicContentValidator"]};
define('DynamicContentValidatorStructure', ['DynamicContentValidatorResources'], function(resources) {return {schemaUId:'c96e052e-3550-4114-bb83-04da01be8393',schemaCaption: "DynamicContentValidator", parentSchemaName: "", schemaName:'DynamicContentValidator',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
/**
 * Class to validate dynamic content template.
 */
define("DynamicContentValidator", ["DynamicContentValidatorResources"],
	function(resources) {
		/**
		 * @class Terrasoft.configuration.DynamicContentValidator
		 */
		Ext.define("Terrasoft.configuration.DynamicContentValidator", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.DynamicContentValidator",

			/**
			 * Constructor which calls base and initialize resources.
			 * @override
			 */
			constructor: function() {
				this.callParent(arguments);
				this._initResourcesValues(resources);
			},

			// #region Methods: Private

			/**
			 * Shows empty DCAttribute filters validation result warning dialog.
			 * @private
			 * @param {Array} rules Collection with invalid rule names.
			 * @param {Function} callback Callback function to continue action.
			 */
			_showRulesWithEmptyFilterMessage: function(rules, callback) {
				var names = rules.join(", ");
				var caption = Ext.String.format(this.get("Resources.Strings.RulesWithEmptyFilterMessage"), names);
				this.showWarningMessage(caption, callback);
			},

			/**
			 * Shows default content existing at blockgroup items validation result warning dialog.
			 * @private
			 * @param {Function} callback Callback function to continue action.
			 */
			_showNoDefaultContentMessage: function(callback) {
				var message = this.get("Resources.Strings.NoDefaultContentMessage");
				this.showWarningMessage(message, callback);
			},

			/**
			 * Checks filter object to be valid.
			 * @private
			 * @param {Terrasoft.BaseFilter} filters Deserialized filter object.
			 * @returns {Boolean} Validation result.
			 */
			_checkIsNotEmptyFilter: function(filters) {
				if (!filters || !filters.isEnabled) {
					return false;
				}
				return this._validateFilterItem(filters);
			},

			/**
			 * Validates filter item to contain complete filter condition.
			 * @private
			 * @param {Terrasoft.BaseFilter} filter Filter item instance.
			 * @returns {Boolean} False for disabled, not completed or empty filter.
			 * Otherwise - true.
			 */
			_validateFilterItem: function(filter) {
				var isValid = true;
				if (!filter.isEnabled || !filter.getIsCompleted()) {
					return false;
				}
				if (filter.filterType === Terrasoft.FilterType.FILTER_GROUP) {
					if (filter.isEmpty()) {
						return false;
					}
					Terrasoft.each(filter, function(el) {
						isValid = this._validateFilterItem(el);
						return !isValid;
					}, this);
				}
				return isValid;
			},

			/**
			 * Validates existing DCAttributes do not contain empty filters or conditions.
			 * @private
			 * @param {Array} attributes Collection of DCAttribute models.
			 * @param {Function} callback Callback function.
			 */
			_validateDCAttributes: function(attributes, callback) {
				var incorrectRules = [];
				this.checkDCAttributesFilters(attributes, incorrectRules)
					? callback.call(this)
					: this._showRulesWithEmptyFilterMessage(incorrectRules, callback);
			},

			/**
			 * Validates that at least one dynamic block contains default content.
			 * @private
			 * @param {Terrasoft.Collection} items Collection of template items.
			 * @param {Function} callback Callback function.
			 */
			_validateDefaultBlocks: function(items, callback) {
				this.checkDefaultBlocksInGroups(items)
					? callback.call(this)
					: this._showNoDefaultContentMessage(callback);
			},

			/**
			 * Initialize resource values from resource object.
			 * @private
			 * @param resourcesObj View model resources object.
			 */
			_initResourcesValues: function(resourcesObj) {
				var resourcesSuffix = "Resources";
				Terrasoft.each(resourcesObj, function(resourceGroup, resourceGroupName) {
					resourceGroupName = resourceGroupName.replace("localizable", "");
					Terrasoft.each(resourceGroup, function(resourceValue, resourceName) {
						var viewModelResourceName = [resourcesSuffix, resourceGroupName, resourceName].join(".");
						this.set(viewModelResourceName, resourceValue);
					}, this);
				}, this);
			},

			/**
			 * Cuts text for certain length.
			 * @private
			 * @param {String} value Target text.
			 * @param {Number} length Length limit.
			 * @returns {String} Returns cutted text.
			 */
			_cutString: function(value, length) {
				var ellipsis = Ext.String.ellipsis(value.substring(length), 0);
				return value.substring(0, length) + ellipsis;
			},

			// #endregion

			// #region Methods: Protected

			/**
			 * Shows base body mask.
			 * @protected
			 * @param {Object} config Parameters for the mask.
			 */
			showBodyMask: function(config) {
				var config = config || {timeout:0};
				Terrasoft.MaskHelper.showBodyMask(config);
			},

			/**
			 * Hides base body mask.
			 * @protected
			 */
			hideBodyMask: function() {
				Terrasoft.MaskHelper.hideBodyMask();
			},

			/**
			 * Shows message box with warning message and posibility to continue or cancel action.
			 * @protected
			 * @param {String} message Message box caption text.
			 * @param {Function} callback Callback function to call on dialog 'Ok' result.
			 */
			showWarningMessage: function(message, callback) {
				Terrasoft.utils.showMessage({
					caption: message,
					buttons: ["Ok", "Cancel"],
					handler: function(returnCode) {
						if (returnCode === "ok") {
							this.showBodyMask();
							callback.call();
						}
					},
					scope: this
				});
				this.hideBodyMask();
			},

			/**
			 * Validates DCAttribute filter property.
			 * @protected
			 * @param {Object} attribute DCAttribute model item to validate.
			 * @returns {Boolean} Returns true when filter is not empty
			 * and contains at least one complete filter item.
			 */
			validateDCAttributeFilter: function(attribute) {
				if (!attribute || attribute.Value === Terrasoft.emptyString) {
					return false;
				}
				var filters = Terrasoft.deserialize(attribute.Value);
				return this._checkIsNotEmptyFilter(filters);
			},

			// #endregion

			// #region Methods: Public

			/**
			 * Validates filters for all DCAttribute models for template.
			 * Adds attribute caption as invalid rule name for current rules array.
			 * @param {Array} attributes DCAttribute models collection to validate.
			 * @param {Array} rules Initial invalid rule names collection.
			 * @returns {Boolean} True when all attributes have filled filter conditions.
			 */
			checkDCAttributesFilters: function(attributes, rules) {
				Terrasoft.each(attributes, function(attr) {
					if (!this.validateDCAttributeFilter(attr)) {
						var name = Ext.String.format("\"{0}\"", attr.Caption);
						rules.push(this._cutString(name, 30));
					}
				}, this);
				return Ext.isEmpty(rules);
			},

			/**
			 * Validates default content existing for dynamic blocks in current template.
			 * If all groups do not contain default content - returns false.
			 * If at least one group contains default content - returns true.
			 * If there is no groups - returns true.
			 * @returns {Boolean} True when at least groups contain default block.
			 */
			checkDefaultBlocksInGroups: function(items) {
				var groups = items.filter(function(el) {
					return el.ItemType === "blockgroup";
				});
				if (Ext.isEmpty(groups)) {
					return true;
				}
				var result = false;
				Terrasoft.each(groups, function(group) {
					var defaultBlock = group.Items.find(function(block) {
						return block.IsDefault;
					});
					result = Boolean(defaultBlock);
					return !result;
				}, this);
				return result;
			},

			/**
			 * Validates current template config.
			 * @public
			 * @param {Object} config Template config to validate.
			 * @param {Function} resolve Resolve function.
			 * @param {Object} scope Context.
			 */
			validate: function(config, resolve, scope) {
				Terrasoft.chain(
					function(next) {
						this._validateDCAttributes(config.Attributes, next);
					},
					function(next) {
						this._validateDefaultBlocks(config.Items, next);
					},
					function() {
						resolve.call(scope);
					},
					this
				);
			}

			// #endregion

		});
		return Terrasoft.configuration.DynamicContentValidator;
	}
);


