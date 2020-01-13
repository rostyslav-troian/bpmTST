Terrasoft.configuration.Structures["MultipleInput"] = {innerHierarchyStack: ["MultipleInput"]};
define("MultipleInput", ["ext-base", "terrasoft", "MultipleInputResources", "css!MultipleInput"],
		function(Ext, Terrasoft, resources) {
			/**
			 * Component for rendering stylized strings, received from entered string.
			 * Stylized strings received after splitting and validating entered string.
			 * Splitting and validation logic located on view model.
			 */
			return Ext.define("Terrasoft.controls.MultipleInput", {
				extend: "Terrasoft.controls.Component",
				alternateClassName: "Terrasoft.MultipleInput",

				//region Properties: Private
				/**
				 * Source for remove item button background image.
				 * @type {Object}
				 */
				_removeEmailImageSource: Terrasoft.ImageUrlBuilder.getUrl(resources.localizableImages.RemoveEmailIcon),

				//endregion

				//region Properties: Protected

				/**
				 * @inheritdoc Terrasoft.Component#tpl
				 * @override
				 */
				tpl: [
					"<div id=\"{id}-wrap\" class=\"{wrapClass}\">",
					"<div id=\"{id}-input-wrap\" class=\"{inputWrapClass}\">",
					"<ul id=\"{id}-items-list\" class=\"{itemsListClass}\"></ul>",
					"<input id=\"{id}-item-input\" class=\"{editInputClass}\" type=\"text\" placeholder=\"{placeholder}\"",
					"value=\"{value}\">",
					"</div>",
					"<span id=\"{id}-validation\" class=\"{validationClass}\" style=\"{validationStyle}\">" +
					"{validationText}</span>",
					"</div>"
				],

				/**
				 * Sorted items, separated by commas.
				 * @type {String}
				 */
				value: "",

				/**
				 * Rendered items collection.
				 * @type {Terrasoft.Collection}
				 */
				renderedItemsCollection: null,

				/**
				 * An object that contains information about the validity of the value in the control.
				 * @protected
				 * @type {Object}
				 */
				validationInfo: null,

				/**
				 * Css-class for control when he doesn't pass validation.
				 * @type {String}
				 */
				errorClass: "items-list-validation-visible",

				/**
				 * Css-class for control when it is focused.
				 * @type {String}
				 */
				inputWrapElFocused: "input-wrap-el-focused",

				/**
				 * Delay for the DOM item removal process.
				 * @type {Number}
				 */
				removeItemDelay: 100,

				/**
				 * Minimum length of input string.
				 * @type {Number}
				 */
				minLineLength: 5,

				//endregion

				//region Methods: Private

				_getInputDomValue: function() {
					return this.rendered ? this.inputEl.getValue() : null;
				},

				/**
				 * @private
				 */
				_subscribeOnValueColumnChange: function(binding, property, model) {
					const validationMethodName = binding.config.validationMethod;
					if (validationMethodName) {
						const validationMethod = this[validationMethodName];
						model.validationInfo.on("change:" + binding.modelItem, function(collection, value) {
							validationMethod.call(this, value);
						}, this);
					}
				},

				//endregion

				//region Methods: Protected

				/**
				 * Extends the binding mechanism of {@link Terrasoft.Bindable} mixin events
				 * by working with a column of the type directory.
				 * @protected
				 * @override
				 */
				subscribeForEvents: function(binding, property, model) {
					this.callParent(arguments);
					if (property === "value" && model.canValidate) {
						this._subscribeOnValueColumnChange(binding, property, model);
					}
				},

				/**
				 * @inheritdoc Terrasoft.Component#getTplData
				 * @override
				 */
				getTplData: function() {
					const tplData = this.callParent(arguments);
					let baseEditTplData = {};
					this.selectors = this.getSelectors();
					Ext.apply(baseEditTplData, tplData, {});
					Ext.apply(baseEditTplData, this.combineClasses(), {});
					return baseEditTplData;
				},

				/**
				 * @inheritdoc Terrasoft.Component#initDomEvents
				 * @override
				 */
				initDomEvents: function() {
					this.callParent(arguments);
					this.inputEl.on("keyup", this.onInputElKeyUp, this);
					this.inputEl.on("focus", this.onInputElFocus, this);
					this.inputEl.on("blur", this.onInputElBlur, this);
				},

				/**
				 * The method returns the selectors of the control.
				 * @protected
				 * @return {Object} The selector object.
				 */
				getSelectors: function() {
					const id = this.id;
					return {
						wrapEl: "#" + id + "-wrap",
						inputWrapEl: "#" + id + "-input-wrap",
						inputEl: "#" + id + "-item-input",
						itemsListEl: "#" + id + "-items-list",
						validationEl: "#" + id + "-validation"
					};
				},

				/**
				 * Counts the styles for the control based on the configuration.
				 * @protected
				 * @return {Object} Config object containing a list of CSS classes.
				 */
				combineClasses: function() {
					return {
						inputWrapClass: ["base-edit", "ts-box-sizing", "item-input-wrap-box"],
						editInputClass: ["base-edit-input", "ts-box-sizing"],
						itemsListClass: ["items-list"],
						validationClass: ["items-list-validation"]
					};
				},

				/**
				 * @inheritdoc Terrasoft.controls.Component#init
				 * @override
				 */
				init: function() {
					this.callParent(arguments);
					this.renderedItemsCollection = Ext.create("Terrasoft.Collection");
					this.renderedItemsCollection.on("changed", this.onRenderedItemsCollectionChanged, this);
					this.addEvents(
							/**
							 * @event valueChange
							 * Called when the value of the control is changed.
							 */
							"valueChange",

							/**
							 * @event renderedItemsCollectionChanged
							 * Called when renderedItemsCollection has changed.
							 */
							"renderedItemsCollectionChanged",

							/**
							 * @event handleValue
							 *
							 */
							"handleValue",

							/**
							 * @event validateArray
							 *
							 */
							"validateItems"
					);
				},

				/**
				 * Handler for renderedItemsCollection "change" event.
				 * @protected
				 */
				onRenderedItemsCollectionChanged: function() {
					this.fireEvent("renderedItemsCollectionChanged", this.renderedItemsCollection);
				},

				/**
				 * Sets the information about the result of the validation for the control.
				 * @protected
				 */
				setValidationInfo: function(info) {
					if (this.validationInfo === info) {
						return;
					}
					this.validationInfo = info;
					if (!this.rendered) {
						return;
					}
					this.setMarkOut();
				},

				/**
				 * Adds a CSS class to the control, depending on the isValid flag.
				 * If isValid is set to true, the class that signals the error is removed,
				 * if isValid is set to false, the class that signals the error is added.
				 * @protected
				 */
				setMarkOut: function() {
					if (!this.rendered) {
						return;
					}
					if (!this.validationEl) {
						return;
					}
					const wrap = this.getWrapEl();
					this.validationEl.setStyle("width", "");
					if (!this.validationInfo.isValid) {
						this.validationEl.addCls(this.errorClass);
						this.showValidationMessage(this.validationInfo.invalidMessage);
					} else {
						this.validationEl.removeCls(this.errorClass);
						this.showValidationMessage("");
					}
					const wrapWidth = wrap.getWidth();
					const validationElWidth = this.validationEl.getWidth();
					if (validationElWidth > wrapWidth) {
						this.validationEl.setWidth(wrapWidth);
					}
				},

				/**
				 * Returns the value of the control - items separeted by comma.
				 * @protected
				 * @return {String}
				 */
				getValue: function() {
					return this.value;
				},

				/**
				 * Inserts the validation text into the component's DOM element.
				 * @protected
				 */
				showValidationMessage: function(message) {
					this.validationEl.update(message);
				},

				/**
				 * The handler of the focus acquisition control event.
				 * @protected
				 */
				onInputElFocus: function() {
					this.inputWrapEl.addCls(this.inputWrapElFocused);
				},

				/**
				 * The event handler for the focus loss by the control.
				 * If the focus is lost, the highlighting around the control is removed and the display mode
				 * of the input field is changed.
				 */
				onInputElBlur: function() {
					this.inputWrapEl.removeCls(this.inputWrapElFocused);
					const elementValue = this._getInputDomValue();
					if (elementValue && elementValue.length > this.minLineLength) {
						this.changeValue(elementValue);
					}
					this.inputEl.dom.value = "";
				},

				/**
				 * @inheritdoc Terrasoft.Component#clearDomListeners
				 * @override
				 */
				clearDomListeners: function() {
					this.callParent(arguments);
					this.inputEl.un("keyup", this.onInputElKeyUp, this);
					this.inputEl.un("focus", this.onInputElFocus, this);
					this.inputEl.un("blur", this.onInputElBlur, this);
				},

				/**
				 * The "key released" event handler in the input field of the control.
				 * @protected
				 */
				onInputElKeyUp: function(event) {
					const code = event.keyCode;
					if (code === event.TAB || code === event.SPACE || code === 188 || code === event.ENTER) {
						const elementValue = this._getInputDomValue();
						if (elementValue && elementValue.length > this.minLineLength) {
							this.changeValue(elementValue);
						}
						this.inputEl.dom.value = "";
					}
				},

				/**
				 * Changes control value.
				 * @param value
				 */
				changeValue: function(value) {
					const isAppended = this.appendValue(value);
					if (isAppended) {
						let config = {
							"rawString": value
						};
						this.fireEvent("validateItems", config);
						this.renderItems(config.items);
						this.fireEvent("valueChange", this.value);
					}
				},

				/**
				 * Appends control value.
				 * @param value
				 * @returns {boolean} True value is appended.
				 */
				appendValue: function(value) {
					let valueConfig = {
						"rawString": value
					};
					this.fireEvent("handleValue", valueConfig);
					const isChanged = (valueConfig.proccededString !== this.getValue());
					if (isChanged) {
						let newValue = valueConfig.itemsArray;
						if (this.value) {
							newValue = newValue.concat(this.value.split(","));
						}
						this.value = newValue.sort().join(",");
					}
					return isChanged;
				},

				/**
				 * Render stylized items.
				 * @param items
				 */
				renderItems: function(items) {
					for (let i = 0; i < items.length; i++) {
						const itemDomConfig = this.getItemDomElementConfig(items[i]);
						this.renderSingleItem(itemDomConfig);
						this.renderedItemsCollection.add(items[i].itemId, items[i]);
					}
				},

				/**
				 * Render stylized single item.
				 * @param itemDomConfig
				 */
				renderSingleItem: function(itemDomConfig) {
					const extDomItemConfig = this.getExtDomItemConfig(itemDomConfig);
					Ext.DomHelper.append(this.itemsListEl, extDomItemConfig);
					const clearIcon = Ext.get(itemDomConfig.removeButtonId);
					clearIcon.on("click", this.onRemoveItemButtonClick, this);
				},

				/**
				 * Returns stylized DOM element config.
				 * @param {Object} item Item config object.
				 * @param {String} item.itemId Unique item identifier.
				 * @param {Boolean} item.isValid Flag, that indicates item correctness.
				 * @param {String} item.value String value, that should be rendered.
				 * @returns {Object}
				 */
				getItemDomElementConfig: function(item) {
					const removeButtonId = item.itemId + "-remove-button";
					const cls = item.isValid ? "items-list-item" : "error-items-list-item";
					return {
						itemId: item.itemId,
						removeButtonId: removeButtonId,
						cls: cls,
						value: item.value
					};
				},

				/**
				 * Returns stylized Ext DOM element config.
				 * @param {Object} itemDomConfig Item DOM config object.
				 * @param {String} itemDomConfig.itemId Unique item identifier.
				 * @param {String} itemDomConfig.cls item CSS class.
				 * @param {String} itemDomConfig.value String value, that should be rendered.
				 * @param {String} itemDomConfig.removeButtonId Unique remove button identifier.
				 * @returns {Object}
				 */
				getExtDomItemConfig: function(itemDomConfig) {
					return {
						tag: "li",
						cls: itemDomConfig.cls,
						html: "<div id=\"" + itemDomConfig.itemId + "\"><span>" +
						itemDomConfig.value + "</span><img id =\"" + itemDomConfig.removeButtonId +
						"\" class=\"remove-button\"" + " src=\"" + this._removeEmailImageSource + "\"></div>"
					};
				},

				/**
				 * Listener for remove item dom element click.
				 * @param {Event} event Remove button click event.
				 */
				onRemoveItemButtonClick: function(event) {
					const emailDomElement = event.currentTarget.parentElement.parentElement;
					const emailElement = Ext.get(emailDomElement);
					emailElement.setStyle({
						"animation": "remove .1s ease-in-out",
						"animation-fill-mode": "forwards"
					});
					this.modifyItems(event.currentTarget.parentElement);
					Terrasoft.delay(this.removeItemFromDom, this, this.removeItemDelay, [emailElement]);
				},

				/**
				 * Modifies control's renderedItemsCollection and value.
				 * @param {HTMLElement} emailContainer item DOM container.
				 */
				modifyItems: function(emailContainer) {
					const id = emailContainer.id;
					this.renderedItemsCollection.removeByKey(id);
					this.value = this.renderedItemsCollection.mapArrayByPath("value").sort().join(",");
					this.fireEvent("valueChange", this.value);
				},

				/**
				 * Remove stylized DOM element.
				 * @param element
				 */
				removeItemFromDom: function(element) {
					element.remove();
				},

				//endregion

				//region Methods: Public

				/**
				 * Sets the values of the control. Checks for correctness.
				 * @param value
				 */
				setValue: function(value) {
					if (value) {
						this.changeValue(value);
						this.inputEl.dom.value = "";
					}
				},

				/**
				 * @inheritdoc Terrasoft.Component#getBindConfig
				 * @override
				 */
				getBindConfig: function() {
					let bindConfig = this.callParent(arguments);
					const config = {
						value: {
							changeEvent: "valueChange",
							changeMethod: "setValue",
							validationMethod: "setValidationInfo"
						}
					};
					Ext.apply(bindConfig, config);
					return bindConfig;
				}

				//endregion
			});
		});


