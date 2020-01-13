Terrasoft.configuration.Structures["SourceCodeEditMixin"] = {innerHierarchyStack: ["SourceCodeEditMixin"]};
define("SourceCodeEditMixin", ["ext-base", "terrasoft", "SourceCodeEditEnums", "SourceCodeEditMixinResources",
	"SourceCodeEdit", "css!SourceCodeEditMixin"],
	function(Ext, Terrasoft, sourceCodeEditEnums, resources) {
		/**
		 * @class Terrasoft.controls.mixins.SourceCodeEditMixin
		 * Class of source code edit mixin.
		 */
		Ext.define("Terrasoft.controls.mixins.SourceCodeEditMixin", {
			alternateClassName: "Terrasoft.SourceCodeEditMixin",

			//region Properties: Protected

			/**
			 * Source code editor instance.
			 * @protected
			 * @type {Terrasoft.SourceCodeEdit}
			 */
			sourceCodeEdit: null,

			/**
			 * Source code edit root container.
			 * @protected
			 * @type {Terrasoft.Container}
			 */
			sourceCodeEditContainer: null,

			//endregion

			//region Methods: Protected

			/**
			 * Update source code edit value from main source.
			 * @protected
			 * @virtual
			 */
			updateSourceCodeEditValue: function() {
				var value = this.loadSourceCodeValue();
				if (this.sourceCodeEdit) {
					this.sourceCodeEdit.setValue(value);
				}
			},

			/**
			 * Handler for modal box close button click.
			 * @protected
			 * @virtual
			 */
			onSourceCodeEditModalBoxClose: function() {
				this.hideSourceCodeEditModalBox();
			},

			/**
			 * Handler for modal box save button click.
			 * @protected
			 * @virtual
			 */
			onSourceCodeEditModalBoxSave: function() {
				if (this.sourceCodeEdit) {
					var value = this.sourceCodeEdit.getValue();
					this.saveSourceCodeValue(value);
				}
				this.onSourceCodeEditModalBoxClose();
			},

			/**
			 * Show source code modal box container.
			 * @protected
			 * @virtual
			 */
			showSourceCodeEditModalBox: function() {
				var wrapEl = this.getSourceCodeEditModalBoxWrapEl();
				if (wrapEl) {
					wrapEl.show();
					this.updateSourceCodeStyle();
				}
			},

			/**
			 * Hide source code modal box container.
			 * @protected
			 * @virtual
			 */
			hideSourceCodeEditModalBox: function() {
				var wrapEl = this.getSourceCodeEditModalBoxWrapEl();
				if (wrapEl) {
					wrapEl.hide();
				}
			},

			/**
			 * Returns true if source code edit is rendered, false - otherwise.
			 * @protected
			 * @virtual
			 * @return {Boolean} True if source code edit is rendered, false - otherwise.
			 */
			getIsSourceCodeEditModalBoxRendered: function() {
				var edit = this.sourceCodeEdit;
				return edit && edit.rendered;
			},

			/**
			 * Update source code modal box style.
			 * @protected
			 * @virtual
			 */
			updateSourceCodeStyle: function() {
				this.updateSourceCodeEditModalBoxStyle();
				this.updateSourceCodeEditStyle();
			},

			/**
			 * Update source code modal box content style.
			 * @protected
			 * @virtual
			 */
			updateSourceCodeEditModalBoxStyle: function() {
				var contentElId = this.getSourceCodeEditModalBoxContentId();
				var contentEl = Ext.get(contentElId);
				var modalBoxStyleConfig = this.getSourceCodeEditModalBoxStyleConfig();
				if (modalBoxStyleConfig && contentEl) {
					contentEl.setStyle(modalBoxStyleConfig);
				}
			},

			/**
			 * Update source code edit style.
			 * @protected
			 * @virtual
			 */
			updateSourceCodeEditStyle: function() {
				var elId = this.getSourceCodeEditModalBoxElId();
				var el = Ext.get(elId);
				var editStyleConfig = this.getSourceCodeEditStyleConfig();
				if (editStyleConfig && el) {
					el.setStyle(editStyleConfig);
				}
			},

			/**
			 * Returns source code edit modal box style config.
			 * @protected
			 * @virtual
			 * @return {Object} Source code modal box style config.
			 */
			getSourceCodeEditModalBoxStyleConfig: function() {
				return {
					"width": "850px",
					"height": "600px"
				};
			},

			/**
			 * Returns source code edit style config.
			 * @protected
			 * @virtual
			 * @return {Object} Source code style config.
			 */
			getSourceCodeEditStyleConfig: function() {
				return {
					"height": "460px"
				};
			},

			/**
			 * Init source code edit modal container.
			 * @protected
			 * @virtual
			 */
			initSourceCodeEditModalBox: function() {
				if (this.getIsSourceCodeEditModalBoxRendered()) {
					return;
				}
				this.renderSourceCodeEditModalBoxWrap();
				this.initSourceCodeEdit();
			},

			/**
			 * Returns id of source code edit modal box wrap element.
			 * @protected
			 * @virtual
			 * @return {String} Id of source code edit modal box wrap element.
			 */
			getSourceCodeEditModalBoxWrapId: function() {
				return this.id + "-source-code-edit-wrap";
			},

			/**
			 * Returns id of source code edit modal box content element.
			 * @protected
			 * @virtual
			 * @return {String} Id of source code edit modal box content element.
			 */
			getSourceCodeEditModalBoxContentId: function() {
				return this.id + "-source-code-edit-content";
			},

			/**
			 * Returns id of source code edit modal box editor element.
			 * @protected
			 * @virtual
			 * @return {String} Id of source code edit modal box editor element.
			 */
			getSourceCodeEditModalBoxElId: function() {
				return this.id + "-source-code-edit-el";
			},

			/**
			 * Returns source code edit modal box wrap element.
			 * @protected
			 * @virtual
			 * @return {Object} Source code edit modal box wrap element.
			 */
			getSourceCodeEditModalBoxWrapEl: function() {
				var id = this.getSourceCodeEditModalBoxWrapId();
				return Ext.get(id);
			},

			/**
			 * Returns source code edit mixin resources.
			 * @protected
			 * @virtual
			 * @return {Object} Source code edit mixin resources.
			 */
			getSourceCodeEditResources: function() {
				return resources;
			},

			/**
			 * Render source code edit modal box wrap element.
			 * @protected
			 * @virtual
			 */
			renderSourceCodeEditModalBoxWrap: function() {
				var config = this.getSourceCodeEditModalWrapConfig();
				this.sourceCodeEditContainer = Ext.create("Terrasoft.Container", config);
				this.sourceCodeEditContainer.bind(this);
				this.sourceCodeEditContainer.render(Ext.getBody());
			},

			/**
			 * Returns source code edit modal box wrap view config.
			 * @protected
			 * @virtual
			 * @return {Object} Source code edit modal box wrap view config.
			 */
			getSourceCodeEditModalWrapConfig: function() {
				var resources = this.getSourceCodeEditResources();
				var wrapId = this.getSourceCodeEditModalBoxWrapId();
				var contentId = this.getSourceCodeEditModalBoxContentId();
				var elId = this.getSourceCodeEditModalBoxElId();
				return {
					"classes": {"wrapClassName": "source-code-edit-wrap"},
					"id": wrapId,
					"selectors": {"wrapEl": "#" + wrapId},
					"items": [{
						"className": "Terrasoft.Container",
						"classes": {"wrapClassName": "source-code-edit-cover"}
					}, {
						"className": "Terrasoft.Container",
						"classes": {"wrapClassName": "source-code-edit-content"},
						"id": contentId,
						"selectors": {"wrapEl": "#" + contentId},
						"items": [{
							"className": "Terrasoft.Container",
							"classes": {"wrapClassName": "source-code-edit-header"},
							"items": [{
								"className": "Terrasoft.Label",
								"caption": resources.localizableStrings.ModalBoxHeader
							}]
						}, {
							"className": "Terrasoft.Container",
							"classes": {"wrapClassName": "source-code-edit-el"},
							"id": elId,
							"selectors": {"wrapEl": "#" + elId}
						}, {
							"className": "Terrasoft.Container",
							"classes": {"wrapClassName": "source-code-edit-actions"},
							"items": [{
								"className": "Terrasoft.Button",
								"caption": resources.localizableStrings.SaveButtonCaption,
								"style": Terrasoft.controls.ButtonEnums.style.BLUE,
								"click": {"bindTo": "onSourceCodeEditModalBoxSave"}
							}, {
								"className": "Terrasoft.Button",
								"caption": resources.localizableStrings.CancelButtonCaption,
								"style": Terrasoft.controls.ButtonEnums.style.DEFAULT,
								"click": {"bindTo": "onSourceCodeEditModalBoxClose"}
							}]
						}]
					}]
				};
			},

			/**
			 * Initialize source code edit.
			 * @protected
			 * @virtual
			 */
			initSourceCodeEdit: function() {
				var elId = this.getSourceCodeEditModalBoxElId();
				var el = Ext.get(elId);
				if (!this.sourceCodeEdit && el) {
					var config = this.getSourceCodeEditConfig();
					this.sourceCodeEdit = Ext.create("Terrasoft.SourceCodeEdit", config);
					this.sourceCodeEdit.render(el);
				}
			},

			/**
			 * Returns source code edit construct config.
			 * @protected
			 * @virtual
			 * @return {Object} Source code edit construct config.
			 */
			getSourceCodeEditConfig: function() {
				return {
					"language": sourceCodeEditEnums.Language.HTML,
					"theme": sourceCodeEditEnums.Theme.CRIMSON_EDITOR
				};
			},

			/**
			 * Set focuse on source code edit.
			 * @protected
			 * @virtual
			 */
			focusOnSourceCodeEdit: function() {
				if (this.sourceCodeEdit) {
					this.sourceCodeEdit.setFocused(true);
				}
			},

			//endregion

			//region Methods: Public

			/**
			 * Open source code edit modal box.
			 * @public
			 * @virtual
			 */
			openSourceCodeEditModalBox: function() {
				if (!this.getIsSourceCodeEditModalBoxRendered()) {
					this.initSourceCodeEditModalBox();
				}
				this.showSourceCodeEditModalBox();
				this.updateSourceCodeEditValue();
				this.focusOnSourceCodeEdit();
			},

			/**
			 * Returns master source value.
			 * @abstract
			 * @public
			 * @virtual
			 * @return {String} Source.
			 */
			loadSourceCodeValue: Terrasoft.abstractFn,

			/**
			 * Set source code to master.
			 * @abstract
			 * @public
			 * @virtual
			 * @param {String} Source.
			 */
			saveSourceCodeValue: Terrasoft.abstractFn,

			/**
			 * Destroy method for clear resource.
			 * @public
			 * @virtual
			 */
			destroySourceCodeEdit: function() {
				if (this.sourceCodeEdit) {
					this.sourceCodeEdit.destroy();
					this.sourceCodeEdit = null;
				}
				if (this.sourceCodeEditContainer) {
					this.sourceCodeEditContainer.destroy();
					this.sourceCodeEditContainer = null;
				}
			}

			//endregion

		});
		return Terrasoft.SourceCodeEditMixin;
	});


