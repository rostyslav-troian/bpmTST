Terrasoft.configuration.Structures["DcmStageElement"] = {innerHierarchyStack: ["DcmStageElement"]};
define("DcmStageElement", ["ext-base", "terrasoft", "DcmStageElementResources", "css!DcmStageElement", "DcmConstants"],
	function(Ext, Terrasoft, resources) {
		/**
		 * @class Terrasoft.controls.DcmStageElement
		 */
		Ext.define("Terrasoft.controls.DcmStageElement", {

			alternateClassName: "Terrasoft.DcmStageElement",

			extend: "Terrasoft.Container",

			mixins: {
				reorderableItemMixin: "Terrasoft.ReorderableItemMixin"
			},

			wrapClassName: "dcm-stage-element",

			/**
			 * Css class name for caption.
			 * @protected
			 * @type {String}
			 */
			captionClassName: "stage-element-caption",

			/**
			 * Css class name for image.
			 * @protected
			 * @type {String}
			 */
			imageClassName: "stage-element-image",

			/**
			 * Element image configuration.
			 * @type {Object}
			 */
			imageConfig: null,

			/**
			 * Caption.
			 * @type {String}
			 */
			caption: null,

			/**
			 * Validation state.
			 */
			isValid: true,

			/**
			 * Required state.
			 * @type {Number}
			 */
			requiredType: Terrasoft.DcmConstants.ElementRequiredType.NOT_REQUIRED.value,

			/**
			 * Flag that indicates whether element property page executes validation.
			 * @type {Boolean}
			 */
			isValidateExecuted: true,

			/**
			 * Css class name for close button.
			 * @protected
			 * @type {String}
			 */
			removeButtonClassName: "stage-element-remove-button",

			/**
			 * Css class name for not valid element state.
			 * @protected
			 * @type {String}
			 */
			notValidClassName: "stage-element-not-valid",

			/**
			 * Css class name for required element type.
			 * @protected
			 * @type {String}
			 */
			requiredTypeClassName: "stage-element-required",

			/**
			 * Indicates that the item is selected.
			 * @private
			 * @type {Boolean}
			 */
			selected: false,

			/**
			 * Selected block style class.
			 * @protected
			 * @type {String}
			 */
			selectedClass: "stage-element-selected",

			/**
			 * @inheritdoc Terrasoft.controls.AbstractContainer#defaultRenderTpl
			 * @overridden
			 */
			defaultRenderTpl: [
				"<div id=\"{id}\" style=\"{wrapStyles}\" class=\"{wrapClassName}\">",
				"<span id=\"{id}-imageEl\" class=\"{imageClassName}\" style=\"{imageStyle}\"></span>",
				"<span id=\"{id}-caption\" style=\"{captionStyles}\" class=\"{captionClassName}\">{caption}</span>",
				"<div id=\"{id}-removeButtonEl\" class=\"{removeButtonClassName}\" style=\"{removeButtonStyle}\"></div>",
				"<div id=\"{id}-inner-container\" style=\"{innerContainerStyles}\" class=\"{innerContainerClassName}\">",
				"{%this.renderItems(out, values)%}",
				"</div>",
				"</div>"
			],

			/**
			 * @inheritdoc Terrasoft.AbstractContainer#init
			 * @overridden
			 */
			init: function() {
				this.callParent(arguments);
				this.mixins.reorderableItemMixin.init.apply(this, arguments);
				this.addEvents(
					"select",
					"dblclick",
					"removeBtnClick"
				);
			},

			/**
			 * Handles element click.
			 * @private
			 */
			onClick: function() {
				this.setSelected(true);
				this.fireEvent("select", this.tag);
			},

			/**
			 * Handles element double click.
			 * @private
			 */
			onDblClick: function() {
				this.fireEvent("dblclick", this.tag);
			},

			/**
			 * Handles element remove button click.
			 * @private
			 */
			onRemoveButtonClick: function() {
				this.fireEvent("removeBtnClick", this.tag);
			},

			/**
			 * @inheritdoc Terrasoft.Component#initDomEvents
			 * @overridden
			 */
			initDomEvents: function() {
				this.callParent(arguments);
				this.wrapEl.on("click", this.onClick, this);
				this.wrapEl.on("dblclick", this.onDblClick, this);
				var removeButtonEl = this.removeButtonEl;
				if (removeButtonEl) {
					removeButtonEl.on("click", this.onRemoveButtonClick, this);
				}
			},

			/**
			 * @inheritdoc Terrasoft.Component#getTplData
			 * @overridden
			 */
			getTplData: function() {
				var tplData = this.callParent(arguments);
				tplData.caption = this.caption;
				var image;
				if (this.imageConfig) {
					image = Terrasoft.ImageUrlBuilder.getUrl(this.imageConfig);
				}
				tplData.imageStyle = image ? "background-image: url(" + image + ");" : null;
				tplData.removeButtonStyle = this.getRemoveButtonImage();
				this.applyClasses(tplData);
				var selectors = this.getSelectors();
				Ext.apply(this.selectors, selectors);
				return tplData;
			},

			/**
			 * Apply wrap class.
			 * @protected
			 * @param {Object} tplData Template data.
			 */
			applyClasses: function(tplData) {
				var wrapClass = tplData.wrapClassName = tplData.wrapClassName || [];
				wrapClass.push(this.wrapClassName);
				var innerContainerClasses = tplData.innerContainerClassName = [];
				innerContainerClasses.push(this.innerContainerClassName);
				var captionClasses = tplData.captionClassName = [];
				captionClasses.push(this.captionClassName);
				var imageClasses = tplData.imageClassName = [];
				imageClasses.push(this.imageClassName);
				var closeButtonClasses = tplData.removeButtonClassName = [];
				closeButtonClasses.push(this.removeButtonClassName);
				if (this.selected) {
					wrapClass.push(this.selectedClass);
				}
				if (this.isValidateExecuted && !this.isValid) {
					innerContainerClasses.push(this.notValidClassName);
				}
				if (this.requiredType === Terrasoft.DcmConstants.ElementRequiredType.REQUIRED.value) {
					captionClasses.push(this.requiredTypeClassName);
				}
			},

			/**
			 * @inheritdoc Terrasoft.Component#onAfterRender
			 * @overridden
			 */
			onAfterRender: function() {
				this.callParent(arguments);
				this.mixins.reorderableItemMixin.onAfterRender.apply(this, arguments);
			},

			/**
			 * @inheritdoc Terrasoft.Component#onAfterReRender
			 * @overridden
			 */
			onAfterReRender: function() {
				this.callParent(arguments);
				this.mixins.reorderableItemMixin.onAfterReRender.apply(this, arguments);
			},

			/**
			 * @inheritdoc Terrasoft.Component#onDestroy
			 * @overridden
			 */
			onDestroy: function() {
				this.mixins.reorderableItemMixin.onDestroy.apply(this, arguments);
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.Component#clearDomListeners
			 * @overridden
			 */
			clearDomListeners: function() {
				this.callParent(arguments);
				this.wrapEl.un("click", this.onClick, this);
				this.wrapEl.un("dblclick", this.onDblClick, this);
				var removeButtonEl = this.removeButtonEl;
				if (removeButtonEl) {
					removeButtonEl.un("click", this.onRemoveButtonClick, this);
				}
			},

			/**
			 * Returns binding configuration. Implements interface of {@link Terrasoft.Bindable} mixin.
			 * @overridden
			 */
			getBindConfig: function() {
				var bindConfig = this.callParent(arguments);
				var elementConfig = {
					caption: {
						changeMethod: "setCaption"
					},
					imageConfig: {
						changeMethod: "setImage"
					},
					selected: {
						changeMethod: "setSelected"
					},
					isValidateExecuted: {
						changeMethod: "setIsValidateExecuted"
					},
					isValid: {
						changeMethod: "setIsValid"
					},
					requiredType: {
						changeMethod: "setRequiredType"
					}
				};
				Ext.apply(bindConfig, elementConfig);
				return bindConfig;
			},

			/**
			 * Sets caption.
			 * @param {String} caption Caption.
			 */
			setCaption: function(caption) {
				if (this.caption === caption) {
					return;
				}
				this.caption = caption;
				this.safeRerender();
			},

			/**
			 * Sets the indicator that the element is selected.
			 * @param {Boolean} selected The indicator that the element is selected.
			 */
			setSelected: function(selected) {
				if (this.selected === selected) {
					return;
				}
				this.selected = selected;
				var selectedClass = this.selectedClass;
				var wrapEl = this.getWrapEl();
				if (wrapEl && selectedClass && this.rendered) {
					if (selected) {
						wrapEl.addCls(selectedClass);
						Terrasoft.utils.dom.scrollIntoView(wrapEl.dom, false);
					} else {
						wrapEl.removeCls(selectedClass);
					}
				}
			},

			/**
			 * Sets image configuration.
			 * @param {Object} imageConfig Image configuration.
			 */
			setImage: function(imageConfig) {
				if (this.imageConfig === imageConfig) {
					return;
				}
				this.imageConfig = imageConfig;
				this.safeRerender();
			},

			/**
			 * Sets validation state.
			 * @param {Boolean} isValid Validation stage.
			 */
			setIsValid: function(isValid) {
				if (this.isValid === isValid) {
					return;
				}
				this.isValid = isValid;
				this.safeRerender();
			},

			/**
			 * Sets flag that indicates if the stage is already validated.
			 * @param {Boolean} isValidateExecuted Value.
			 */
			setIsValidateExecuted: function(isValidateExecuted) {
				if (this.isValidateExecuted === isValidateExecuted) {
					return;
				}
				this.isValidateExecuted = isValidateExecuted;
				this.safeRerender();
			},

			/**
			 * Sets required state.
			 * @param {Boolean} requiredType Required state.
			 */
			setRequiredType: function(requiredType) {
				if (this.requiredType === requiredType) {
					return;
				}
				this.requiredType = requiredType;
				this.safeRerender();
			},

			/**
			 * @inheritdoc Terrasoft.controls.Component#getSelectors
			 * @overridden
			 */
			getSelectors: function() {
				return {
					innerContainerEl: "#" + this.id + "-inner-container",
					captionEl: "#" + this.id + "-caption",
					removeButtonEl: "#" + this.id + "-removeButtonEl"
				};
			},

			/**
			 * Returns remove button image styles.
			 * @private
			 * @returns {string}
			 */
			getRemoveButtonImage: function() {
				var removeImage = resources.localizableImages.Remove;
				var removeImageUrl = Terrasoft.ImageUrlBuilder.getUrl(removeImage);
				var removeBackgroundImage = "background-image: url(" + removeImageUrl + ");";
				return removeBackgroundImage;
			}

		});

		return Terrasoft.controls.DcmStageElement;

	}
);


