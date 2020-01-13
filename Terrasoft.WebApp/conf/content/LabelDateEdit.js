Terrasoft.configuration.Structures["LabelDateEdit"] = {innerHierarchyStack: ["LabelDateEdit"]};
define("LabelDateEdit", ["ext-base", "terrasoft", "sandbox",
		"LabelDateEditResources"],
	function(Ext, Terrasoft, sandbox, resources) {
		/**
		 * @class Terrasoft.controls.LabelDateEdit
		 * ##### ######## ########## ###### ####
		 */
		var LabelDateEdit = Ext.define("Terrasoft.controls.LabelDateEdit", {
			extend: "Terrasoft.DateEdit",
			alternateClassName: "Terrasoft.LabelDateEdit",

			/**
			 * ###### ######## ##########
			 * @private
			 * @overridden
			 * @type {Array}
			 */
			tpl: [
				"<label {inputId} id=\"{id}-wrap\" class = \"{labelClass}\" style = \"{labelStyle}\">{caption}",
				"</label>"
			],

			/**
			 * Css-#####, ######### ####### #####
			 * @private
			 * @type {String}
			 */
			noWordWrapClass: "t-label-nowordwrap",

			/**
			 * ####### css-##### ### ######## ##########
			 * @protected
			 * @virtual
			 * @type {String}
			 */
			labelClass: "t-label",

			/**
			 * ######### ####### ###### ########
			 * @type {String}
			 */
			caption: "",

			/**
			 * ###### ########, #### ########### ##### ##### ###### ##### ########### # ########,
			 * #### ########### ###### - ## ######## ######### ######## #########
			 * @type {String/Number}
			 */
			width: "",

			/**
			 * ##### ########
			 * @type {String}
			 */
			font: "",

			/**
			 * ###### ######, ## ######### true (#######)
			 * @type {Boolean}
			 */
			wordWrap: true,

			/**
			 * Id ######## # ######## ######## label
			 * @type {String}
			 */
			inputId: "",

			buttonEl: {},

			/**
			 * ############# ######## ##########
			 * @protected
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.addEvents(
					/**
					 * @event keypress
					 * ########### ##### ########## ####### #######.
					 */
					"click"
				);
			},

			/**
			 * ############## ###### ### ####### # ######### #########
			 * @protected
			 * @overridden
			 * @return {Object}
			 */
			getTplData: function() {
				var tplData = {
					id: this.id,
					self: this,
					tabIndex: this.tabIndex
				};
				Ext.apply(tplData, this.tplData || {});
				var labelTplData = {
					labelClass: this.getLabelClass(),
					caption: Terrasoft.utils.string.encodeHtml(this.caption)
				};
				var inputId = this.inputId;
				labelTplData.inputId = inputId
					? "for = \"" + Terrasoft.utils.string.encodeHtml(inputId) + "\""
					: "";
				Ext.apply(labelTplData, tplData, {});
				this.styles = this.getStyles();
				this.selectors = this.getSelectors();
				return labelTplData;
			},

			/**
			 * ########## ###### ## css-####### ## ######### ############ ######## ##########
			 * @protected
			 * @return {String} ########## ###### ####### ######## ######## css-#######
			 */
			getLabelClass: function() {
				var labelClass = [];
				labelClass.push(this.labelClass);
				if (this.wordWrap === false) {
					labelClass.push(this.noWordWrapClass);
				}
				return labelClass.join(" ");
			},

			/**
			 * ########## ###### inline ###### ## ######### ############ ######## ##########
			 * @protected
			 * @overridden
			 * @return {Object}
			 */
			getStyles: function() {
				var styles = {};
				styles.labelStyle = {};
				var labelStyle = styles.labelStyle;
				var font = this.font;
				var width = this.width;
				if (font) {
					labelStyle.font = font;
				}
				if (width) {
					labelStyle.width = width;
				}
				return styles;
			},

			/**
			 * ##### ########## ######### ######## ###########
			 * @protected
			 * @overridden
			 * @return {Object} ###### ##########
			 */
			getSelectors: function() {
				return {
					wrapEl: "#" + this.id + "-wrap",
					el: "#" + this.id + "-wrap"
				};
			},

			/**
			 * ############# ### ####### ####### #####
			 * @param {Boolean} wordWrap #### true - ############### ####### #####, #### false - ####### #####
			 * ###########
			 */
			setWordWrap: function(wordWrap) {
				if (this.wordWrap === wordWrap) {
					return;
				}
				this.wordWrap = wordWrap;
				this.safeRerender();
			},

			/**
			 * ############## ######## ## DOM-####### ######## ##########
			 * @overridden
			 * @protected
			 */
			initDomEvents: function() {
				var document = Ext.getDoc();
				/**
				 * @event mousedown
				 * ####### ##### #### # ####### #########.
				 */
				document.on("mousedown", this.onMouseDownCollapse, this);
				var el = this.getWrapEl();
				el.on("click", this.onButtonClick, this);
			},

			onButtonClick: function() {
				var datePicker = this.datePicker;
				if (datePicker) {
					datePicker.parentEl = this.wrapEl;
				} else {
					this.innerWrapEl = this.wrapEl;
				}
				this.callParent(arguments);
			},

			/**
			 * ############# ###### ########.
			 * @param {String} width ##### ###### ######## ##########, ###### ########## css ######## ### ######
			 */
			setWidth: function(width) {
				if (this.width === width) {
					return;
				}
				this.width = width;
				this.safeRerender();
			},

			/**
			 * ########## ############### ####### ### ######### ####### # ########.
			 * @protected
			 * @param {String} caption ######### #######.
			 * @return {String} ############### ######### ####### ### ########.
			 */
			getFormattedCaption: function(caption) {
				return caption || this.placeholder || resources.localizableStrings.EmptyDateDisplayValue;
			},

			/**
			 * ############# ######### ####### # ########
			 * @param {String} caption ######### #######
			 */
			setCaption: function(caption) {
				caption = this.getFormattedCaption(caption);
				if (this.caption === caption) {
					return;
				}
				this.caption = caption;
				this.safeRerender();
			},

			/**
			 * ############# ##### ########
			 * @param {String} font ###### ########## ######
			 */
			setFont: function(font) {
				if (this.font === font) {
					return;
				}
				this.font = font;
				this.safeRerender();
			},

			/**
			 * ##### ####### label ### ######## id ######## ##### inputId
			 * @param {String} inputId ###### ########## id ########
			 */
			setInputId: function(inputId) {
				if (this.inputId === inputId) {
					return;
				}
				this.inputId = inputId;
				this.safeRerender();
			},

			/**
			 * ############# ######## ######## ##########, ######### ### ######## ## ############.
			 * #### ####### ############ ############# ######## dom ########.
			 * @param {String/Date} date #### ######## ###### ########### ## # ###### Date.
			 */
			setValue: function(date) {
				this.changeValue(date);
				this.setCaption(this.getFormattedValue());
			},

			/**
			 * ####### ######## ## ####### ####### ###### # #### ##### ######## ##########
			 * @protected
			 */
			onDestroy: function() {
				if (this.rendered) {
					var document = Ext.getDoc();
					document.un("mousedown", this.onMouseDownCollapse, this);
					var el = this.getEl();
					el.un("click", this.onButtonClick, this);
				}
				this.callParent(arguments);
			}

		});
		return LabelDateEdit;
	}
);


