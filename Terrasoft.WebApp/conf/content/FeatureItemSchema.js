Terrasoft.configuration.Structures["FeatureItemSchema"] = {innerHierarchyStack: ["FeatureItemSchema"]};
define('FeatureItemSchemaStructure', ['FeatureItemSchemaResources'], function(resources) {return {schemaUId:'8ef48f31-36fd-4072-97d4-f872f04e1fe5',schemaCaption: "FeatureItemSchema", parentSchemaName: "", schemaName:'FeatureItemSchema',parentSchemaUId:'',extendParent:false,type:Terrasoft.SchemaType.EDIT_VIEW_MODEL_SCHEMA,entitySchema:'',name:'',extend:'Terrasoft.model.BaseViewModel',schema:{leftPanel:[],rightPanel:[],actions:[],analytics:[]},methods:{},controlsConfig:{},customBindings:{},bindings:{},schemaDifferences:function(){

}};});
define("FeatureItemSchema", [], function() {
	return {
		entitySchemaName: "Feature",
		attributes: {
			/**
			 * Feature Enabled.
			 * @private
			 * @type {Terrasoft.DataValueType.BOOLEAN}
			 */
			"FeatureEnabled": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"ActualState": {
				"dataValueType": this.Terrasoft.DataValueType.INTEGER,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN
			},
			/**
			 * Is Changed Feature.
			 * @protected
			 * @type {Terrasoft.DataValueType.BOOLEAN}
			 */
			"IsChangedFeature": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			},
			"HasStateForGroup": {
				"dataValueType": this.Terrasoft.DataValueType.BOOLEAN,
				"type": this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
				"value": false
			}
		},
		diff: [
			{
				"operation": "insert",
				"name": "FeatureItemContainer",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["feature-item-wrap"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "FeatureNameWrap",
				"parentName": "FeatureItemContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["label-wrap", "feature-item-label-wrap"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "FeatureName",
				"parentName": "FeatureNameWrap",
				"propertyName": "items",
				"values": {
					"classes": {
						"labelClass": ["feature-item-label"]
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "Name",
						"bindConfig": {
							"converter": function (value) {
								return value || this.$Code;
							}
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "SwitchFeatureStateButtonWrap",
				"parentName": "FeatureNameWrap",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["feature-state-switch-wrap"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "FeatureEnabled",
				"parentName": "SwitchFeatureStateButtonWrap",
				"propertyName": "items",
				"values": {
					"bindTo": "FeatureEnabled",
					"labelConfig": {
						"visible": false
					},
					"controlConfig": {
						"classes": ["toggle-feature-state"],
						"className": "Terrasoft.ToggleEdit",
						"checked": {
							"bindTo": "FeatureEnabled"
						},
						"checkedchanged": {
							"bindTo": "onStateChanged"
						}
					}
				}
			},
			{
				"operation": "insert",
				"parentName": "FeatureNameWrap",
				"propertyName": "items",
				"name": "HeaderLabelInfoButton",
				"values": {
					"itemType": Terrasoft.ViewItemType.INFORMATION_BUTTON,
					"content": {bindTo: "getTipCaption"},
					"controlConfig": {
						"classes": {
							"wrapperClass": "feature-hint-button",
							"imageClass": "feature-hint-image"
						},
						"visible": {
							"bindTo": "HasStateForGroup"
						}
					}
				}
			},
			{
				"operation": "insert",
				"name": "FeatureDescriptionWrap",
				"parentName": "FeatureItemContainer",
				"propertyName": "items",
				"values": {
					"itemType": this.Terrasoft.ViewItemType.CONTAINER,
					"wrapClass": ["label-wrap", "feature-item-label-wrap"],
					"items": []
				}
			},
			{
				"operation": "insert",
				"name": "FeatureDescription",
				"parentName": "FeatureDescriptionWrap",
				"propertyName": "items",
				"values": {
					"classes": {
						"labelClass": ["feature-item-label", "feature-description"]
					},
					"itemType": this.Terrasoft.ViewItemType.LABEL,
					"caption": {"bindTo": "Description"}
				}
			}
		],
		methods: {
			/**
			 * Sets FeatureEnabled attribute according to actual state.
			 * @protected
			 */
			initEnabledState: function() {
				var state = this.get("ActualState");
				var enabled = (state === Terrasoft.FeatureState.ENABLED);
				this.set("FeatureEnabled", enabled);
			},

			/**
			 * Changes actual feature state handler.
			 * @private
			 * @param {Boolean} enabled FeatureEnabled attribute value.
			 */
			onStateChanged: function(enabled) {
				var state = enabled ? Terrasoft.FeatureState.ENABLED : Terrasoft.FeatureState.DISABLED;
				if (state !== this.get("ActualState")) {
					this.set("ActualState", state);
					this.set("IsChangedFeature", !this.get("IsChangedFeature"));
					this.fireEvent("changeFeatureState");
				}
			},

			/**
			 * Returns caption for the hint button.
			 * @private
			 * @return {String} Formatted caption depends on feature state.
			 */
			getTipCaption: function() {
				var hasGroupState = this.get("HasStateForGroup");
				var result = null;
				if (hasGroupState) {
					var state = this.get("GroupState");
					var enabled = (state === Terrasoft.FeatureState.ENABLED);
					var template = this.get("Resources.Strings.FeatureNameTipCaption");
					var stateCaption = enabled ? this.get("Resources.Strings.EnabledCaption")
							: this.get("Resources.Strings.DisabledCaption");
					result = Ext.String.format(template, stateCaption);
				}
				return result;
			},

			/**
			 * Initializes features view model class.
			 * @protected
			 */
			init: function() {
				this.initEnabledState();
				this.addEvents(
						/**
						 * @event
						 * Change feature state event.
						 * @param {Terrasoft.FeatureItemViewModel} viewModel View model of feature item.
						 */
						"changeFeatureState"
				);
				this.callParent(arguments);
			}
		}
	};
});


