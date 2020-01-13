Terrasoft.configuration.Structures["InlineCodeTextEdit"] = {innerHierarchyStack: ["InlineCodeTextEdit"]};
define("InlineCodeTextEdit", ["SourceCodeEditMixin", "EmailImageMixin"],
	function() {

		/**
		 * Class of inline code text edit.
		 */
		Ext.define("Terrasoft.controls.InlineCodeTextEdit", {
			extend: "Terrasoft.controls.InlineTextEdit",
			alternateClassName: "Terrasoft.InlineCodeTextEdit",

			/**
			 * Images collection.
			 * @private
			 * @type {Terrasoft.Collection}
			 */
			images: null,

			showEmailTemplateLinkButton: Terrasoft.Features.getIsEnabled("IsObjectLinkEnabled"),

			mixins: {
				SourceCodeEditMixin: "Terrasoft.SourceCodeEditMixin",

				/**
				 * @class Terrasoft.EmailImageMixin
				 * Mixin for inserting email images.
				 */
				EmailImageMixin: "Terrasoft.EmailImageMixin"
			},

			/**
			 * @overridden
			 * @inheritdoc Terrasoft.Component#init
			 */
			init: function() {
				this.addEvents(

					/*
					 * @event imagePasted
					 * Handles pasting image from buffer.
					 * @param {Object} item Pasted image.
					 */
					"imagePasted"
				);
				this.images = Ext.create("Terrasoft.Collection");
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.Component#destroy
			 * @overridden
			 */
			destroy: function() {
				if (this.images) {
					this.images.un("dataLoaded", this.onImagesLoaded, this);
					this.images.un("add", this.onAddImage, this);
				}
				this.callParent(arguments);
			},

			/**
			 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
			 * @overridden
			 */
			subscribeForCollectionEvents: function(binding, property, model) {
				this.callParent(arguments);
				var collection = model.get(binding.modelItem);
				collection.on("dataLoaded", this.onImagesLoaded, this);
				collection.on("add", this.onAddImage, this);
			},

			/**
			 * @inheritdoc Terrasoft.Bindable#subscribeForEvents
			 * @overridden
			 */
			subscribeForEvents: function(binding, property, model) {
				this.callParent(arguments);
				if (property !== "value") {
					return;
				}
				var validationMethodName = binding.config.validationMethod;
				if (validationMethodName) {
					var validationMethod = this[validationMethodName];
					model.validationInfo.on("change:" + binding.modelItem,
						function(collection, value) {
							validationMethod.call(this, value);
						},
						this
					);
				}
			},

			/**
			 * @inheritdoc Terrasoft.BaseEdit#getBindConfig
			 * @overridden
			 */
			getBindConfig: function() {
				var bindConfig = this.callParent(arguments);
				Ext.apply(bindConfig, {
					images: {
						changeMethod: "onImagesLoaded"
					}
				});
				return bindConfig;
			},

			/**
			 * @inheritdoc Terrasoft.InlineTextEdit#onContentDom
			 * @overridden
			 */
			onContentDom: function() {
				this.callParent(arguments);
				var editor = this.editor;
				var editableElement = editor.editable() || editor.document;
				editableElement.on("paste", this.mixins.EmailImageMixin.onPaste.bind(this), null, {editor: editor});
			},

			/**
			 * @inheritdoc Terrasoft.InlineTextEdit#initExtraPluginsToolbar
			 * @overridden
			 */
			initExtraPluginsToolbar: function() {
				this.callParent(arguments);
				this.createButton("bpmonlinesource", this.onSourceButtonClick);
			},

			/**
			 * Handles source button click.
			 * @protected
			 * @virtual
			 */
			onSourceButtonClick: function() {
				this.setFocused(false);
				this.mixins.SourceCodeEditMixin.openSourceCodeEditModalBox.call(this);
			},

			/**
			 * Reutns source value.
			 * @protected
			 * @virtual
			 * @return {String} Source code.
			 */
			loadSourceCodeValue: function() {
				return this.getValue();
			},

			/**
			 * Set source code to editor.
			 * @protected
			 * @virtual
			 * @param {String} Source code.
			 */
			saveSourceCodeValue: function(value) {
				this.setValue(value);
			},

			/**
			 * @inheritdoc Terrasoft.Component#onDestroy
			 * @overridden
			 */
			onDestroy: function() {
				this.mixins.SourceCodeEditMixin.destroySourceCodeEdit.apply(this, arguments);
				this.callParent(arguments);
			}
		});
		return Terrasoft.SourceCodeEditMixin;
	});


