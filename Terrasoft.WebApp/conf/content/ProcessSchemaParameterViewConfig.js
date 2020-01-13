Terrasoft.configuration.Structures["ProcessSchemaParameterViewConfig"] = {innerHierarchyStack: ["ProcessSchemaParameterViewConfig"]};
define("ProcessSchemaParameterViewConfig", ["css!ProcessSchemaParameterViewConfig"], function() {

	Ext.define("Terrasoft.ProcessSchemaParameterViewConfig", {
		extend: "Terrasoft.BaseObject",

		statics: {

			/**
			 * Generates process schema parameter view config.
			 * @param {String} [idPrefix] Prefix in generated id of elements.
			 * @returns {Object}
			 */
			generate: function(idPrefix) {
				if (Ext.isEmpty(idPrefix)) {
					idPrefix = "";
				}
				return {
					"id": "item",
					"itemType": Terrasoft.ViewItemType.CONTAINER,
					"items": [{
						"id": idPrefix + "item-view",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"visible": {
							"bindTo": "Visible"
						},
						"wrapClass": ["parameter-ct"],
						"items": [{
							"id": idPrefix + "parameter-datavaluetype",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["parameter-datavaluetype-ct"],
							"items": [{
								"id": "ParameterDataValueType",
								"generator": "ImageCustomGeneratorV2.generateCustomImageControl",
								"readonly": true,
								"imageSrc": {
									"bindTo": "DataValueTypeImage"
								},
								"name": "ParameterDataValueType"
							}
							],
							"name": "parameterDatavaluetype"
						}, {
							"id": idPrefix + "ParameterValueContainer",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["parameter-value-ct", "placeholderOpacity"],
							"items": [{
								"id": "ParameterToolsContainer",
								"itemType": Terrasoft.ViewItemType.CONTAINER,
								"wrapClass": ["tools-container-wrapClass"],
								"items": [{
									"id": "LabelWrap",
									"itemType": Terrasoft.ViewItemType.CONTAINER,
									"wrapClass": ["label-container-wrapClass"],
									"items": [{
										"id": "ParameterCaption",
										"itemType": Terrasoft.ViewItemType.LABEL,
										"caption": {
											"bindTo": "Caption"
										},
										"tag": {
											"containerId": idPrefix + "item-edit"
										},
										"isRequired": {
											"bindTo": "IsRequired"
										},
										"classes": {
											"labelClass": ["t-label-proc-param", "label-link"]
										},
										"click": {
											"bindTo": "onParameterLabelClick"
										},
										"name": "ParameterCaption"
									}
									],
									"name": "LabelWrap"
								}, {
									"id": idPrefix + "ToolsButtonWrap",
									"itemType": Terrasoft.ViewItemType.CONTAINER,
									"wrapClass": ["tools-button-container-wrapClass"],
									"items": [{
										"id": "ParameterEditToolsButton",
										"itemType": Terrasoft.ViewItemType.BUTTON,
										"style": "transparent",
										"imageConfig": {
											"source": 3,
											"params": {
												"schemaName": "ProcessFlowElementPropertiesPage",
												"resourceItemName": "ParameterEditToolsButtonImage",
												"hash": "df03c3177a972b7f3b6987430f988ca3"
											}
										},
										"menu": {
											"items": {
												"bindTo": "ParameterEditToolsButtonMenu"
											}
										},
										"classes": {
											"imageClass": ["button-background-no-repeat"],
											"wrapperClass": ["detail-tools-button-wrapper"],
											"menuClass": ["detail-tools-button-menu"]
										},
										"name": "ParameterEditToolsButton"
									}
									],
									"name": "ToolsButtonWrap"
								}
								],
								"name": "ParameterToolsContainer"
							}, {
								"id": idPrefix + "Value",
								"itemType": Terrasoft.ViewItemType.COMPONENT,
								"className": "Terrasoft.MappingEdit",
								"visible": {
									"bindTo": "HasNestedParameters",
									"bindConfig": {"converter": "invertBooleanValue"}
								},
								"value": {
									"bindTo": "Value"
								},
								"isRequired": {
									"bindTo": "IsRequired"
								},
								"openEditWindow": {
									"bindTo": "openExtendedMappingEditWindow"
								},
								"prepareMenu": {
									"bindTo": "onPrepareMenu"
								},
								"tag": "Value",
								"menu": {
									"items": {
										"bindTo": "MenuItems"
									}
								},
								"placeholder": "Select value",
								"name": "Value",
								"cleariconclick": "$onClearIconClick"
							}
							],
							"name": "ParameterValueContainer"
						}
						],
						"name": "itemView"
					}, {
						"id": idPrefix + "item-edit",
						"itemType": Terrasoft.ViewItemType.CONTAINER,
						"visible": {
							"bindTo": "Visible",
							"bindConfig": {
								"converter": "invertBooleanValue"
							}
						},
						"wrapClass": ["parameter-edit-ct"],
						"items": [],
						"name": "itemEdit"
					}, {
						"itemType": Terrasoft.ViewItemType.CONTROL_GROUP,
						"collapsed": "$HideNestedItems",
						"caption": "$ControlGroupCaption",
						"id": "nested-control-group",
						"name": "nestedControlGroup",
						"tag": "nestedControlGroup",
						"items": [{
							"id": "nested-parameters",
							"itemType": Terrasoft.ViewItemType.CONTAINER,
							"wrapClass": ["nested-parameters"],
							"items": []
						}],
						"visible": {
							"bindTo": "HasNestedParameters"
						}
					}
					],
					"visible": "$isAvailable",
					"name": "parameterItem"
				};
			}

		}

	});

	return Terrasoft.ProcessSchemaParameterViewConfig;

});


