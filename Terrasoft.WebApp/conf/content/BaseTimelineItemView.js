Terrasoft.configuration.Structures["BaseTimelineItemView"] = {innerHierarchyStack: ["BaseTimelineItemView"]};
define("BaseTimelineItemView", ["MultilineLabel", "CollapsibleContainer", "ImageCustomGeneratorV2", "css!TimelineCSS"],
		function() {
	/**
	 * Base timeline item view class.
	 */
	Ext.define("Terrasoft.configuration.BaseTimelineItemView", {
		extend: "Terrasoft.BaseObject",
		alternateClassName: "Terrasoft.BaseTimelineItemView",

		// region Properties: Protected

		/**
		 * The maximum visible body size.
		 * If body content size is larger than this value,"Show more" button will be displayed.
		 * @type {Number}
		 */
		bodyVisibilityHeight: 78,

		// endregion

		// region Methods: Private

		/**
		 * Returns default text with label container configuration.
		 * @private
		 * @param {String} containerId Container Id.
		 * @param {Object} visibleBindingObj Visible value binding configuration.
		 * @param {Object} labelBindingObj Label value binding configuration.
		 * @param {Object} textValueBindingObj Text value binding configuration.
		 * @return {Object} Default text with label container configuration.
		 */
		_getDefaultTextWithLabelContainerConfig: function(containerId, visibleBindingObj, labelBindingObj,
			textValueBindingObj) {
			return {
				"name": "TextWithLabelContainer" + containerId,
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"visible": visibleBindingObj,
				"classes": {
					"wrapClassName": ["timeline-text-with-label-container"]
				},
				"items": [
					this.getSimpleLabelViewConfig(labelBindingObj, "timeline-text-light"),
					this.getSimpleLabelViewConfig(textValueBindingObj, "timeline-text-normal")
				]
			};
		},

		// endregion

		// region Methods: Protected

		/**
		 * Finds child item view config in specific view config.
		 * @protected
		 * @param {Object} parentItemConfig Parent item view config.
		 * @param {String} childItemName Name of child item to find.
		 * @return {Object|null} Child item view config or null when child item was not found.
		 */
		findChildItemConfig: function(parentItemConfig, childItemName) {
			if (!parentItemConfig || !childItemName || !Ext.isArray(parentItemConfig.items)) {
				return null;
			}
			var childItemConfig = parentItemConfig.items.filter(function(item) {
				return item.name === childItemName;
			})[0];
			return childItemConfig || null;
		},

		/**
		 * Finds property value in object (independently of property depth).
		 * @protected
		 * @param {Object} object Object containing property to find.
		 * @param {String} propertyName Property name.
		 * @return {*} Value of property if it has found, otherwise null.
		 */
		findProperty: function(object, propertyName) {
			if (!Ext.isObject(object) || Ext.isEmpty(propertyName)) {
				return null;
			}
			var result = object[propertyName];
			if (!Ext.isEmpty(result)) {
				return result;
			}
			for (var objectProperty in object) {
				if (object.hasOwnProperty(objectProperty) && Ext.isObject(object[objectProperty])) {
					result = this.findProperty(object[objectProperty], propertyName);
					if (!Ext.isEmpty(result)) {
						return result;
					}
				}
			}
			return null;
		},

		/**
		 * Inserts or replace new class into classes array.
		 * @protected
		 * @param {Array} classes Classes array.
		 * @param {String} newClass New class.
		 * @param {String} replacementClass (optional) Replacement class.
		 */
		insertClass: function(classes, newClass, replacementClass) {
			if (!Ext.isArray(classes)) {
				return;
			}
			if (!Ext.isEmpty(replacementClass)) {
				var replacementClassIndex = Ext.Array.indexOf(classes, replacementClass);
				if (replacementClassIndex >= 0) {
					Ext.Array.replace(classes, replacementClassIndex, 1, [newClass]);
				} else {
					Ext.Array.insert(classes, classes.length, [newClass]);
				}
			} else {
				Ext.Array.insert(classes, classes.length, [newClass]);
			}
		},

		/**
		 * Returns item classes.
		 * @protected
		 * @param {Object} item Timeline view item.
		 * @param {String} classesPropertyName (optional) Classes property name.
		 * @return {Array} Item classes.
		 */
		getItemClasses: function(item, classesPropertyName) {
			if (!Ext.isObject(item)) {
				return;
			}
			classesPropertyName = classesPropertyName || "wrapClassName";
			return this.findProperty(item, classesPropertyName);
		},

		/**
		 * Returns header container config.
		 * @protected
		 * @return {Object} Header container config.
		 */
		getHeaderViewConfig: function() {
			return {
				"name": "HeaderContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["timeline-item-header-container"]
				},
				"items": [
					this.getEntityIconViewConfig(),
					this.getLeftHeaderViewConfig(),
					this.getRightHeaderViewConfig()
				]
			};
		},

		/**
		 * Returns entity icon config.
		 * @return {Object} Entity icon config.
		 */
		getEntityIconViewConfig: function() {
			return {
				"name": "EntityIcon",
				"itemType": Terrasoft.ViewItemType.IMAGE,
				"getSrcMethod": "getEntityIconSrc",
				"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
				"onPhotoChange": Terrasoft.emptyFn,
				"classes": {
					"wrapClass": ["timeline-item-entity-icon"]
				}
			};
		},

		/**
		 * Returns author initials container config.
		 * @return {Object} Author initials container config.
		 */
		getAuthorInitialsViewConfig: function() {
			return {
				"name": "AuthorInitials",
				"itemType": Terrasoft.ViewItemType.LABEL,
				"caption": {
					"bindTo": "AuthorName",
					"bindConfig": {
						"converter": "getAuthorInitials"
					}
				},
				"visible": {
					"bindTo": "Author",
					"bindConfig": {
						"converter": "checkIsAuthorInitialsVisible"
					}
				},
				"classes": {
					"labelClass": ["timeline-item-author-initials"]
				}
			};
		},

		/**
		 * Returns author photo image view config.
		 * @return {Object} Author initials container config.
		 */
		getAuthorPhotoViewConfig: function() {
			return {
				"name": "AuthorPhoto",
				"itemType": Terrasoft.ViewItemType.IMAGE,
				"getSrcMethod": "getAuthorPhotoUrl",
				"visible": {
					"bindTo": "Author",
					"bindConfig": {
						"converter": "checkIsAuthorPhotoVisible"
					}
				},
				"readonly": true,
				"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
				"classes": {
					"wrapClass": ["timeline-item-author-photo"]
				}
			};
		},

		/**
		 * Returns author icon config.
		 * @return {Object} Author icon config.
		 */
		getAuthorIconViewConfig: function() {
			return {
				"name": "AuthorIcon",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["timeline-item-author-icon-container"]
				},
				"visible": {
					"bindTo": "ShowAuthorIcon"
				},
				"items": [
					this.getAuthorPhotoViewConfig(),
					this.getAuthorInitialsViewConfig()
				]
			};
		},

		/**
		 * Returns author caption config.
		 * @return {Object} Author caption config.
		 */
		getAuthorCaptionViewConfig: function() {
			return {
				"name": "AuthorCaption",
				"itemType": Terrasoft.ViewItemType.HYPERLINK,
				"caption": {
					"bindTo": "AuthorName"
				},
				"markerValue": {
					"bindTo": "AuthorName"
				},
				"click": {
					"bindTo": "onAuthorCaptionClick"
				},
				"href": {
					"bindTo": "getAuthorUrl"
				},
				"visible": {
					"bindTo": "UseAuthorCaption"
				},
				"linkMouseOver": {
					"bindTo": "authorLinkMouseOver"
				},
				"classes": {
					"hyperlinkClass": ["timeline-item-caption", "timeline-item-author-caption"]
				}
			};
		},

		/**
		 * Returns caption config.
		 * @return {Object} Caption config.
		 */
		getCaptionViewConfig: function() {
			return {
				"name": "Caption",
				"itemType": Terrasoft.ViewItemType.HYPERLINK,
				"caption": {
					"bindTo": "Caption"
				},
				"click": {
					"bindTo": "onCaptionClick"
				},
				"href": {
					"bindTo": "getRecordUrl"
				},
				"markerValue": {
					"bindTo": "Caption"
				},
				"visible": {
					"bindTo": "UseAuthorCaption",
					"bindConfig": {
						"converter": "invertBooleanValue"
					}
				},
				"linkMouseOver": {
					"bindTo": "captionLinkMouseOver"
				},
				"domAttributes": {
					"bindTo": "getCaptionDomAttributes"
				},
				"classes": {
					"hyperlinkClass": ["timeline-item-caption"]
				}
			};
		},

		/**
		 * Returns "go to page" button view config.
		 * @protected
		 * @return {Object} View config for "go to page" button.
		 */
		getGoToPageButtonViewConfig: function() {
			return {
				"name": "GoToPageButton",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["timeline-item-go-to-page-container"]
				},
				"items": [{
					"name": "GoToPageLink",
					"itemType": Terrasoft.ViewItemType.HYPERLINK,
					"click": {
						"bindTo": "onCaptionClick"
					},
					"href": {
						"bindTo": "getRecordUrl"
					},
					"classes": {
						"hyperlinkClass": ["timeline-item-go-to-page-link"]
					}
				}, {
					"itemType": Terrasoft.ViewItemType.BUTTON,
					"name": "GoToPageIcon",
					"controlConfig": {
						"imageConfig": {
							"bindTo": "Resources.Images.GoToPageIcon"
						},
						"style": Terrasoft.controls.ButtonEnums.style.TRANSPARENT
					},
					"classes": {
						"wrapperClass": ["timeline-item-go-to-page-icon-wrapper"],
						"imageClass": ["timeline-item-go-to-page-icon-image"]
					}
				}]
			};
		},

		/**
		 * Returns label "to:" view config.
		 * @protected
		 * @return {Object}
		 */
		getToLabelViewConfig: function() {
			return this.getSimpleLabelViewConfig("Resources.Strings.ToLabelCaption", "timeline-item-to-label");
		},

		/**
		 * Returns left header container config.
		 * @protected
		 * @return {Object} Left header container config.
		 */
		getLeftHeaderViewConfig: function() {
			return {
				"name": "LeftHeaderContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["timeline-item-left-header-container"]
				},
				"items": [
					this.getAuthorIconViewConfig(),
					this.getAuthorCaptionViewConfig(),
					this.getCaptionViewConfig()
				]
			};
		},

		/**
		 * Returns right header container config.
		 * @protected
		 * @return {Object} Right header container config.
		 */
		getRightHeaderViewConfig: function() {
			return {
				"name": "RightHeaderContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["timeline-item-right-header-container"]
				},
				"items": [{
					"name": "Author",
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "AuthorName"
					},
					"visible": {
						"bindTo": "UseAuthorCaption",
						"bindConfig": {
							"converter": "invertBooleanValue"
						}
					},
					"classes": {
						"labelClass": ["timeline-item-author"]
					}
				}, {
					"name": "FormattedDate",
					"itemType": Terrasoft.ViewItemType.LABEL,
					"caption": {
						"bindTo": "TimelineSortDate",
						"bindConfig": {
							"converter": "getFormattedDate"
						}
					},
					"classes": {
						"labelClass": ["timeline-item-date"]
					}
				}]
			};
		},

		/**
		 * Returns message config.
		 * @return {Object} Message config.
		 */
		getMessageViewConfig: function() {
			return {
				"name": "Message",
				"className": "Terrasoft.MultilineLabel",
				"showReadMoreButton": false,
				"itemType": Terrasoft.ViewItemType.LABEL,
				"caption": {
					"bindTo": "Message"
				},
				"contentVisible": true,
				"classes": {
					"labelClass": ["timeline-item-message", "timeline-text-normal"]
				}
			};
		},

		/**
		 * Returns body container config.
		 * @protected
		 * @return {Object} Body container config.
		 */
		getBodyViewConfig: function() {
			return {
				"name": "BodyContainer",
				"className": "Terrasoft.CollapsibleContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["timeline-item-body-container"]
				},
				"controlConfig": {
					"auto": true,
					"visibilityHeight": this.bodyVisibilityHeight,
					"collapsed": {
						"bindTo": "IsCollapsed"
					}
				},
				"items": [
					this.getMessageViewConfig()
				]
			};
		},

		/**
		 * Returns footer container config.
		 * @protected
		 * @return {Object} Footer container config.
		 */
		getFooterViewConfig: function() {
			return {
				"name": "FooterContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["timeline-item-footer-container"]
				},
				"items": []
			};
		},

		/**
		 * Returns item tile container config.
		 * @protected
		 * @return {Object} Tile container config.
		 */
		getItemTileContainerConfig: function() {
			return {
				"name": "ItemContainer",
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"classes": {
					"wrapClassName": ["timeline-item-tile"]
				},
				"items": [
					this.getHeaderViewConfig(),
					this.getBodyViewConfig(),
					this.getFooterViewConfig()
				]
			};
		},

		/**
		 * Returns group icon container view config.
		 * @protected
		 * @deprecated
		 * @return {Object} Group icon container view config.
		 */
		getGroupIconContainerConfig: function() {
			return {
				"name": "GroupIconContainer",
				"classes": {
					"wrapClassName": ["timeline-item-group-icon-container"]
				},
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"items": [{
					"name": "GroupIcon",
					"itemType": Terrasoft.ViewItemType.IMAGE,
					"getSrcMethod": "getGroupIconSrc",
					"generator": "ImageCustomGeneratorV2.generateSimpleCustomImage",
					"onPhotoChange": Terrasoft.emptyFn,
					"classes": {
						"wrapClass": ["timeline-item-group-icon"]
					}
				}]
			};
		},

		/**
		 * Returns group caption label view config.
		 * @protected
		 * @return {Object} Group caption label view config.
		 */
		getGroupCaptionConfig: function() {
			return {
				"name": "GroupCaption",
				"itemType": Terrasoft.ViewItemType.LABEL,
				"caption": {
					"bindTo": "GroupCaption"
				},
				"markerValue": {
					"bindTo": "GroupCaption"
				},
				"classes": {
					"labelClass": ["timeline-item-group-caption"]
				}
			};
		},

		/**
		 * Returns group caption item container view config.
		 * @protected
		 * @return {Object} Group caption item container view config.
		 */
		getGroupCaptionContainerConfig: function() {
			return {
				"name": "ItemGroupCaptionContainer",
				"classes": {
					"wrapClassName": ["timeline-item-group-caption-container"]
				},
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"visible": {
					"bindTo": "GroupCaption",
					"bindConfig": {
						"converter": "isNotEmptyValue"
					}
				},
				"items": [this.getGroupCaptionConfig()]
			};
		},

		/**
		 * Returns text with label container view config that hides when text is empty and on tile collapse.
		 * @protected
		 * @param {String} labelBinding Label text binding.
		 * @param {String} valueColumnName Name of the column containing value to display. If value of this
		 * column is empty container doesn't display.
		 * @param {Object} config Text with label container configuration object.
		 * @param {String} [config.labelConverter] Label text converter function.
		 * @param {String} [config.textValueConverter] Text value converter function.
		 * @param {String} [config.visibleBinding] Container custom visible binding.
		 * @param {String} [config.cssWrapClass] Container css wrap class.
		 * @return {Object} Text with label container view config.
		 */
		getTextWithLabelContainerViewConfig: function(labelBinding, valueColumnName, config) {
			var containerId = Terrasoft.generateGUID();
			config = config || {};
			var defaultVisibleBindingObj = {
				"bindTo": valueColumnName,
				"bindConfig": {
					"converter": "isNotEmptyValue"
				}
			};
			var visibleBindingObj = config.visibleBinding
				? {"bindTo": config.visibleBinding}
				: defaultVisibleBindingObj;
			var labelBindingObj = {
				"bindTo": labelBinding,
				"bindConfig": config.labelConverter
					? {"converter": config.labelConverter}
					: null
			};
			var textValueBindingObj = {
				"bindTo": valueColumnName,
				"bindConfig": config.textValueConverter
					? {"converter": config.textValueConverter}
					: null
			};
			var viewConfig = this._getDefaultTextWithLabelContainerConfig(containerId, visibleBindingObj,
				labelBindingObj, textValueBindingObj);
			if (Ext.isString(config.cssWrapClass)) {
				viewConfig.classes.wrapClassName.push(config.cssWrapClass);
			}
			return viewConfig;
		},

		/**
		 * Returns view config of simple label with custom text binding and CSS-classes.
		 * @protected
		 * @param {String|Object} labelTextBinding Label text binding object or string.
		 * @param {String|Array} cssClasses Array with label CSS-classes or string with one CSS-class.
		 * @return Label view config.
		 */
		getSimpleLabelViewConfig: function(labelTextBinding, cssClasses) {
			var captionBinding;
			if (Ext.isString(labelTextBinding)) {
				captionBinding = {
					"bindTo": labelTextBinding
				};
			} else if (Ext.isObject(labelTextBinding) && !Ext.isEmpty(labelTextBinding.bindTo)) {
				captionBinding = labelTextBinding;
			} else {
				captionBinding = null;
			}
			var cssClassesArray;
			if (Ext.isArray(cssClasses)) {
				cssClassesArray = cssClasses;
			} else if (Ext.isString(cssClasses)) {
				cssClassesArray = [cssClasses];
			} else {
				cssClassesArray = [];
			}
			return {
				"name": "Label" + Terrasoft.generateGUID(),
				"itemType": Terrasoft.ViewItemType.LABEL,
				"caption": captionBinding,
				"classes": {
					"labelClass": cssClassesArray
				}
			};
		},

		// endregion

		// region Methods: Public

		/**
		 * Returns timeline item view config.
		 * @return {Array} Timeline view items config array.
		 */
		getViewConfig: function() {
			return [{
				"name": "TimelineItemContainer",
				"classes": {
					"wrapClassName": ["timeline-item-container"]
				},
				"itemType": Terrasoft.ViewItemType.CONTAINER,
				"items": [
					this.getGroupCaptionContainerConfig(),
					this.getItemTileContainerConfig()
				]
			}];
		}

		// endregion

	});
});


