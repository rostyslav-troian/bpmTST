Terrasoft.configuration.Structures["MobileSocialMessageHtmlField"] = {innerHierarchyStack: ["MobileSocialMessageHtmlField"]};
/**
 * @class Terrasoft.Configuration.controls.SocialMessageContentEdit
 *
 * Component that allows to input text with tags.
 */
Ext.define("Terrasoft.Configuration.controls.SocialMessageContentEdit", {
	extend: "Ext.Component",
	xtype: "cfsocialmessagecontentedit",

	config: {

		/**
		 * @cfg {Boolean} autoCapitalize True to set the field's DOM element autocapitalize attribute to "on",
		 * false to set to "off".
		 */
		autoCapitalize: null,

		/**
		 * @cfg {String} placeHolder A string value displayed in the input when the control is empty.
		 */
		placeHolder: null,

		/**
		 * @cfg {String} name The field's name.
		 */
		name: null

	},

	focus: Ext.emptyFn,

	blur: Ext.emptyFn

});

/**
 * @class Terrasoft.Configuration.controls.SocialMessageHtmlField
 *
 * Html field with tags.
 */
Ext.define("Terrasoft.configuration.controls.SocialMessageHtmlField", {
	extend: "Ext.field.Text",
	alternateClassName: "Terrasoft.SocialMessageHtmlField",
	xtype: "cfsocialmessagehtmlfield",

	config: {

		/**
		 * @cfg {Array} tags Array of configuration objects with supported tags.
		 */
		tags: null,

		/**
		 * @cfg {Terrasoft.Configuration.controls.SocialMessageContentEdit} component Inner component.
		 */
		component: {
			xtype: "cfsocialmessagecontentedit"
		},

		/**
		 * @cfg {Number} processFieldDelay Timeout for processing value in the field.
		 */
		processFieldDelay: 2000

	},

	/**
	 * @private
	 */
	mentions: [],

	/**
	 * @private
	 */
	parseTask: null,

	/**
	 * @private
	 */
	picker: null,

	/**
	 * @private
	 */
	currentMatches: null,

	/**
	 * @private
	 */
	currentTagSymbol: null,

	/**
	 * @private
	 */
	currentTags: null,

	/**
	 * @private
	 */
	nbspSymbol: "&" + "nbsp;",

	/**
	 * @private
	 */
	hasTag: function(tagName) {
		for (var i = 0, ln = this.currentTags.length; i < ln; i++) {
			var tag = this.currentTags[i];
			if (tag.name === tagName) {
				return true;
			}
		}
		return false;
	},

	/**
	 * @private
	 */
	trackTagUsageEvent: function(feedTag) {
		Terrasoft.AnalyticsManager.trackEvent({
			eventName: Terrasoft.AnalyticsManagerEventNames.Tap,
			properties: {
				FeedTag: feedTag
			}
		});
	},

	/**
	 * @private
	 */
	processFieldValue: function() {
		var value = this.getInnerValue();
		value = value.replace(new RegExp("(\n|" + this.nbspSymbol + ")", "g"), " ");
		var tags = this.getTags();
		if (!tags) {
			return;
		}
		for (var tag in tags) {
			if (tags.hasOwnProperty(tag)) {
				var tagRegExpressionText = "( |^)[" + tag + "](.+?)(?=( |$))";
				var tagRegExp = new RegExp(tagRegExpressionText);
				var matches = [];
				var match = tagRegExp.exec(value);
				if (match) {
					this.currentTagSymbol = tag;
					var matched = match[2];
					matched = matched.replace(new RegExp("( |<|,|!|[?]).*"), "").replace(new RegExp("[" +
						tag + "]", "g"), "");
					matches.push(matched);
				}
				if (this.currentMatches.toString() !== matches.toString()) {
					this.currentMatches = matches;
					this.blur();
					this.showLookupPiker(matches[matches.length - 1]);
					this.trackTagUsageEvent(tag);
				}
				if (matches && matches.length > 0) {
					break;
				}
			}
		}
	},

	/**
	 * @private
	 */
	getCurrentModelName: function() {
		var supportedTags = this.getTags();
		var tagConfig = supportedTags[this.currentTagSymbol];
		return tagConfig.modelName;
	},

	/**
	 * @private
	 */
	getCurrentModelPrimaryDisplayColumnName: function() {
		var modelName = this.getCurrentModelName();
		var model = Ext.ClassManager.get(modelName);
		return model.PrimaryDisplayColumnName;
	},

	/**
	 * @private
	 */
	needRecreatePicker: function() {
		var currentModelName = this.getCurrentModelName();
		var pickerList = this.picker.getComponent();
		var pickerStore = pickerList.getStore();
		return (pickerStore.modelName !== currentModelName);
	},

	/**
	 * @private
	 */
	doFocusWithTimeout: function(scope) {
		setTimeout(function() {
			this.focus(true);
		}.bind(scope), 1000);
	},

	/**
	 * @private
	 */
	getPickerQueryConfig: function() {
		var modelName = this.getCurrentModelName();
		var queryConfig = Terrasoft.sdk.LookupGridPage.getQueryConfig(modelName);
		var primaryDisplayColumnName = this.getCurrentModelPrimaryDisplayColumnName();
		queryConfig.addColumn(primaryDisplayColumnName);
		return queryConfig;
	},

	/**
	 * @private
	 */
	getAttributeValue: function(link, attributeName, apostrophe) {
		apostrophe = apostrophe || "'";
		var attributeDelimiter = "=" + apostrophe;
		var beginIndex = link.indexOf(attributeName + attributeDelimiter);
		link = link.substring(beginIndex + attributeName.length + attributeDelimiter.length, link.length);
		return link.substring(0, link.indexOf(apostrophe));
	},

	/**
	 * @private
	 */
	getTagSymbolByModelName: function(modelName) {
		var tags = this.getTags();
		for (var tagSymbol in tags) {
			var tagSymbolConfig = tags[tagSymbol];
			if (modelName === tagSymbolConfig.modelName) {
				return tagSymbol;
			}
		}
		return "";
	},

	/**
	 * @private
	 */
	getTagElement: function(id, text) {
		return Ext.String.format("<span class='x-tag' contenteditable='true' recordid='{0}'>{1}</span>",
			id, text);
	},

	/**
	 * @private
	 */
	findTags: function(value) {
		this.currentTags = [];
		var linkDelimiter = "<a ";
		var links = value.split(linkDelimiter);
		for (var i = 0, ln = links.length; i < ln; i++) {
			var link = links[i];
			if (Ext.isEmpty(link) || link.indexOf("data-value") === -1) {
				continue;
			}
			var id = this.getAttributeValue(link, "data-value");
			var findWithApostrophe = false;
			if (Ext.isEmpty(id)) {
				id = this.getAttributeValue(link, "data-value", "\"");
				findWithApostrophe = !Ext.isEmpty(id);
			}
			var apostropheSymbol = (findWithApostrophe) ? "\"" : null;
			var name = this.getAttributeValue(link, "title", apostropheSymbol);
			var modelName = this.getAttributeValue(link, "data-schemaname", apostropheSymbol);
			if (id && name && modelName && !this.hasTag(name)) {
				var tagSymbol = this.getTagSymbolByModelName(modelName);
				this.currentTags.push({
					id: id,
					name: name,
					tagSymbol: tagSymbol
				});
			}
		}
	},

	/**
	 * @private
	 */
	removeTagIfChanged: function(tagElement) {
		var currentTagValue = tagElement.getHtml();
		currentTagValue = currentTagValue.replace(new RegExp(this.nbspSymbol, "g"), " ");
		var id = tagElement.getAttribute("recordid");
		for (var i = 0, ln = this.currentTags.length; i < ln; i++) {
			var tag = this.currentTags[i];
			if (tag.id === id && tag.name !== currentTagValue) {
				tagElement.dom.remove();
				this.currentTags.splice(i, 1);
				this.removeMention(id);
				break;
			}
		}
	},

	/**
	 * @private
	 */
	getSelection: function() {
		return window.getSelection();
	},

	/**
	 * @private
	 */
	getCaretPosition: function(editableDiv) {
		var caretPos = 0;
		var selection = this.getSelection();
		if (selection.rangeCount) {
			var range = selection.getRangeAt(0);
			if (range.commonAncestorContainer.parentNode === editableDiv) {
				caretPos = range.endOffset;
			}
		}
		return caretPos;
	},

	/**
	 * @private
	 */
	doFocus: function() {
		var range = document.createRange();
		var selection = this.getSelection();
		range.selectNodeContents(this.element.dom);
		range.collapse(false);
		selection.removeAllRanges();
		selection.addRange(range);
	},

	/**
	 * @private
	 */
	getClosestTagElement: function() {
		var selection = this.getSelection();
		var anchorNode = selection.anchorNode;
		var parentElement = anchorNode && anchorNode.parentElement;
		if (parentElement && parentElement.className === "x-tag") {
			return parentElement;
		}
		return null;
	},

	/**
	 * @private
	 */
	separateTextFromTag: function(tagDomElement) {
		var tagElement = Ext.get(tagDomElement);
		var currentTagValue = tagElement.getHtml();
		currentTagValue = currentTagValue.replace(new RegExp(this.nbspSymbol, "g"), " ");
		var caretPosition = this.getCaretPosition(tagDomElement);
		if (caretPosition === currentTagValue.length) {
			var id = tagElement.getAttribute("recordid");
			for (var i = 0, ln = this.currentTags.length; i < ln; i++) {
				var tag = this.currentTags[i];
				var tagName = tag.name;
				if (tag.id === id && tagName !== currentTagValue) {
					if (currentTagValue.length < tagName.length) {
						this.removeTagIfChanged(tagElement);
						return;
					}
					var symbol;
					var innerHTML = "";
					if (currentTagValue.indexOf(tagName) !== -1) {
						symbol = currentTagValue.replace(tagName, "");
						innerHTML = tagName;
					} else {
						symbol = currentTagValue;
					}
					tagElement.setHtml(innerHTML);
					if (symbol === " ") {
						symbol = this.nbspSymbol;
					}
					tagDomElement.outerHTML += "<span contenteditable='true'>" + symbol + "</span>";
					this.doFocus();
				}
			}
		}
	},

	/**
	 * @private
	 */
	getFormattedInnerValue: function(innerValue) {
		innerValue = Terrasoft.util.String.replaceAll(innerValue, "</div>", "");
		innerValue = Terrasoft.util.String.replaceAll(innerValue, "<div>", "\n");
		return innerValue;
	},

	/**
	 * @private
	 */
	encodeValueForReplace: function(value) {
		return ">" + value + "<";
	},

	/**
	 * @private
	 */
	getValueWithTags: function(value) {
		if (this.currentTags && this.currentTags.length > 0) {
			var tagTpl = "<a data-value='{0}' data-schemaname='{1}' href='{2}' target='_self' title='{3}'>{3}</a>";
			var supportedTags = this.getTags();
			for (var i = 0, ln = this.currentTags.length; i < ln; i++) {
				var tag = this.currentTags[i];
				var recordId = tag.id;
				var tagConfig = supportedTags[tag.tagSymbol];
				var modelName = tagConfig.modelName;
				var urlTpl = tagConfig.urlTpl;
				var name = tag.name;
				var url = Ext.String.format(urlTpl, recordId);
				var href = Terrasoft.util.encodeServiceUrl(url);
				var link = Ext.String.format(tagTpl, recordId, modelName, href, name);
				value = Terrasoft.util.String.replaceAll(value, this.encodeValueForReplace(name),
					this.encodeValueForReplace(link));
			}
		}
		value = value.replace(new RegExp("(&" + "nbsp;)", "g"), " ");
		return value;
	},

	/**
	 * @private
	 */
	getValueWithoutTags: function(value) {
		value = value.replace(/(<div>|<\/div>|<\/span>|<span (.*?)>|<p>|<\/p>)/g, "");
		this.findTags(value);
		for (var i = 0, ln = this.currentTags.length; i < ln; i++) {
			var tag = this.currentTags[i];
			var linkBeginIndex = value.indexOf("<a data-value");
			var linkEndIndex = value.indexOf("</a>");
			var link = value.substring(linkBeginIndex, linkEndIndex + 4);
			value = Terrasoft.util.String.replaceAll(value, link, this.getTagElement(tag.id, tag.name));
		}
		return value;
	},

	/**
	 * @private
	 */
	addMention: function(modelName, recordId) {
		this.mentions.push({
			modelName: modelName,
			recordId: recordId
		});
	},

	/**
	 * @private
	 */
	removeMention: function(recordId) {
		this.mentions = this.mentions.filter(function(item) {
			return item.recordId !== recordId;
		});
	},

	/**
	 * Returns new mentions from message.
	 * @protected
	 * @virtual
	 * @returns {Object[]} Mentions of objects.
	 */
	getMentions: function() {
		return this.mentions;
	},

	/**
	 * Returns component for invalid message.
	 * @protected
	 * @virtual
	 * @returns {Object} Component for invalid message.
	 */
	getComponentToInvalidMessage: function() {
		return this.element.getParent();
	},

	/**
	 * Focuses component.
	 * @protected
	 * @overridden
	 */
	focus: function() {
		if (!this.element) {
			return;
		}
		this.element.dom.contentEditable = true;
		this.callParent(arguments);
		this.element.dom.focus();
	},

	/**
	 * Removes focus from component.
	 * @protected
	 * @overridden
	 */
	blur: function() {
		if (!this.element) {
			return;
		}
		this.callParent(arguments);
		this.element.dom.blur();
		this.element.dom.contentEditable = false;
	},

	/**
	 * Updates placeholder in component.
	 * @protected
	 * @overridden
	 * @cfg-updater
	 */
	updatePlaceHolder: function(value) {
		this.element.dom.setAttribute("placeholder", value);
	},

	/**
	 * Handler that occures when component is touching.
	 * @protected
	 * @virtual
	 */
	onTouchStart: function() {
		this.element.dom.contentEditable = true;
	},

	/**
	 * Handler that occures when component is focusing.
	 * @protected
	 * @virtual
	 */
	onFocus: function() {
		Terrasoft.nativeApi.Keyboard.ActiveElement = this.element.dom;
		Terrasoft.nativeApi.Keyboard.showIfNeeded();
		this.callParent(arguments);
		this.addCls("x-field-focused");
		this.doFocus();
	},

	/**
	 * Handler that occures when component is losing focus.
	 * @protected
	 * @virtual
	 */
	onBlur: function() {
		Terrasoft.nativeApi.Keyboard.ActiveElement = null;
		Terrasoft.nativeApi.Keyboard.hideIfNeeded();
		this.callParent(arguments);
		this.removeCls("x-field-focused");
		this.element.dom.contentEditable = false;
	},

	/**
	 * Handler that occures when component's value is changed.
	 * @param {Object} e Event.
	 * @protected
	 * @virtual
	 */
	onFieldChange: function() {
		var tagElement = this.getClosestTagElement();
		if (tagElement) {
			this.separateTextFromTag(tagElement);
		}
		this.parseTask.delay(this.getProcessFieldDelay());
	},

	/**
	 * Handler that occures when value is selected in picker.
	 * @param {Terrasoft.controls.List} el Picker's list.
	 * @param {Number} index The index of the item tapped.
	 * @param {Ext.dataview.component.SimpleListItem} target List item.
	 * @param {Terrasoft.model.BaseModel} record Selected record.
	 * @protected
	 * @virtual
	 */
	onPickerSelect: function(el, index, target, record) {
		var value = this.getInnerValue();
		var currentTag = this.currentMatches[this.currentMatches.length - 1];
		var primaryDisplayColumnName = this.getCurrentModelPrimaryDisplayColumnName();
		var selectedValue = record.get(primaryDisplayColumnName);
		var recordId = record.get("Id");
		this.addMention(record.modelName, recordId);
		var whitespaceSymbol = "\u00A0";
		var valueWithTag = this.getTagElement(recordId, selectedValue) + whitespaceSymbol;
		value = value.replace(this.currentTagSymbol + currentTag, valueWithTag);
		this.setInternalValue(value);
		if (!this.hasTag(selectedValue)) {
			this.currentTags.push({
				id: recordId,
				name: selectedValue,
				tagSymbol: this.currentTagSymbol
			});
		}
		this.doFocusWithTimeout(this);
		this.currentMatches = [];
	},

	/**
	 * Handler that occures when picker's filter is changed.
	 * @protected
	 * @virtual
	 */
	onPickerFilterChange: function() {
		var picker = this.picker;
		var filterPanel = picker.getFilterPanel();
		var filters = filterPanel.getFilters();
		var store = picker.getComponent().getStore();
		store.loadPage(1, {
			filters: filters,
			queryConfig: this.getPickerQueryConfig(),
			scope: this
		});
	},

	/**
	 * Handler that occures when 'input' event is fired.
	 * @protected
	 * @virtual
	 */
	onInput: function(e) {
		var browserEvent = e.browserEvent;
		if (browserEvent && browserEvent.inputType && browserEvent.inputType === "insertFromPaste" &&
				browserEvent.dataTransfer) {
			var dataTransfer = browserEvent.dataTransfer;
			var inputText = dataTransfer.getData("text/plain");
			var inputHtml = dataTransfer.getData("text/html");
			var currentValue = this.getValue();
			currentValue = currentValue.replace(inputHtml, inputText);
			this.setValue(currentValue);
			this.onFieldChange();
		}
	},

	/**
	 * Returns inner value.
	 * @protected
	 * @virtual
	 * @returns {String} Inner value.
	 */
	getInnerValue: function() {
		if (!this.element) {
			return "";
		}
		var html = this.element.dom.innerHTML;
		return this.getFormattedInnerValue(html);
	},

	/**
	 * Sets inner value.
	 * @protected
	 * @virtual
	 */
	setInternalValue: function(value) {
		if (Ext.isEmpty(value, true)) {
			value = "";
		}
		this.element.setHtml(Terrasoft.util.String.replaceAll(value, "\n", "</div><div>"));
	},

	/**
	 * Creates component.
	 */
	constructor: function() {
		this.callParent(arguments);
		this.currentMatches = [];
		this.currentTags = [];
		this.mentions = [];
		this.parseTask = Ext.create("Terrasoft.util.DelayedTask", this.processFieldValue, this, null, {isCancelable: true});
	},

	/**
	 * Initializes component.
	 */
	initialize: function() {
		this.callParent(arguments);
		this.addCls("cf-social-message-html-field");
		this.element.on({
			keyup: this.onFieldChange,
			focus: this.onFocus,
			touchstart: this.onTouchStart,
			blur: this.onBlur,
			scope: this
		});
		if (Terrasoft.Platform.isIOS) {
			this.element.on({
				input: this.onInput,
				scope: this
			});
		} else {
			this.element.on({
				paste: this.onFieldChange,
				scope: this
			});
		}
		this.element.dom.contentEditable = true;
		this.element.setHtml("");
	},

	/**
	 * Returns picker.
	 * @returns {Ext.Terrasoft.LookupPicker} Picker.
	 */
	getPicker: function() {
		var modelName = this.getCurrentModelName();
		var store = Ext.create("Terrasoft.store.BaseStore", {
			model: modelName
		});
		var gridModelConfig = Terrasoft.sdk.LookupGridPage.getConfig(modelName);
		var primaryDisplayColumnName = this.getCurrentModelPrimaryDisplayColumnName();
		var defaultImageUrl = Terrasoft.Configuration.getDefaultOwnerImage();
		var moduleConfig = Terrasoft.ApplicationConfig.getModuleConfig(modelName);
		var title = moduleConfig && moduleConfig.Title;
		if (!title) {
			var model = Ext.ClassManager.get(modelName);
			title = model.Caption;
		}
		var picker = this.picker;
		if (!picker || this.needRecreatePicker()) {
			if (picker) {
				Ext.destroy(picker);
			}
			picker = this.picker = Ext.create("Ext.Terrasoft.LookupPicker", {
				component: {
					store: store,
					primaryColumn: primaryDisplayColumnName,
					secondaryColumn: gridModelConfig.secondaryColumn,
					imageColumn: gridModelConfig.imageColumn,
					defaultImage: defaultImageUrl
				},
				listeners: {
					itemtap: this.onPickerSelect,
					scope: this
				},
				toolbar: {
					clearButton: false
				},
				title: title,
				popup: true
			});
		}
		var filterPanel = picker.getFilterPanel();
		filterPanel.on("filterchange", this.onPickerFilterChange, this);
		var me = this;
		filterPanel.addModule({
			xtype: Terrasoft.FilterModuleTypes.Search,
			filterColumnNames: [primaryDisplayColumnName],
			name: "LookupSearch",
			component: {
				listeners: {
					painted: function() {
						if (!Terrasoft.util.isWindowsPlatform()) {
							me.doFocusWithTimeout(this);
						}
					}
				}
			}
		});
		return picker;
	},

	/**
	 * Shows picker.
	 */
	showLookupPiker: function(searchString) {
		if (Ext.isEmpty(searchString)) {
			return;
		}
		var picker = this.getPicker();
		var filterPanel = picker.getFilterPanel();
		var searchFilterModule = filterPanel.getModuleByName("LookupSearch");
		var searchComponent = searchFilterModule.getComponent();
		var inputComponent = searchComponent.getComponent();
		inputComponent.setValue(searchString);
		filterPanel.fireEvent("filterchange");
		if (!picker.getParent()) {
			Ext.Viewport.add(picker);
		}
		picker.show();
	},

	/**
	 * Returns value.
	 * @returns {String} Value.
	 */
	getValue: function() {
		var value = this.getInnerValue();
		value = this.getValueWithTags(value);
		return value;
	},

	/**
	 * Sets value.
	 */
	setValue: function(value) {
		if (!Ext.isEmpty(value, true)) {
			value = this.getValueWithoutTags(value);
		}
		if (Ext.isEmpty(value)) {
			this.mentions = [];
		}
		this.setInternalValue(value);
	},

	/**
	 * Destroys component.
	 */
	destroy: function() {
		var delayedTask = this.parseTask.extDelayedTask;
		delayedTask.cancel();
		this.callParent(arguments);
		Ext.destroy(this.picker);
		this.parseTask.destroy();
	}
});


