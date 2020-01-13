Terrasoft.configuration.Structures["ModalBoxSchemaModule"] = {innerHierarchyStack: ["ModalBoxSchemaModule"]};
define("ModalBoxSchemaModule", ["ext-base", "ModalBox", "BaseSchemaModuleV2"], function(Ext, ModalBox) {

	/**
	 * Class of ModalBoxSchemaModule.
	 */
	Ext.define("Terrasoft.configuration.ModalBoxSchemaModule", {
		extend: "Terrasoft.BaseSchemaModule",
		alternateClassName: "Terrasoft.ModalBoxSchemaModule",

		/**
		 * Modal window default sizes range configuration.
		 * @protected
		 * @type {Object}
		 */
		modalBoxSize: {
			minHeight: "1",
			minWidth: "1",
			maxHeight: "100",
			maxWidth: "100"
		},

		/**
		 * Default modal window size (in pixels).
		 * @protected
		 * @type {Object}
		 */
		initialSize: {
			width: 820,
			height: 600
		},

		/**
		 * Main container css classes.
		 * @protected
		 * @type {Array}
		 */
		mainContainerWrapClasses: null,

		/**
		 * Header container css classes.
		 * @protected
		 * @type {Array}
		 */
		headerWrapClasses: null,

		/**
		 * Container name to render into.
		 * @type {String}
		 */
		renderTo: "ModalBox",

		/**
		 * Container to render module into.
		 * @protected
		 * @type {Object}
		 */
		modalBoxContainer: null,

		/**
		 * Module header view.
		 * @protected
		 * @type {Object}
		 */
		headerView: null,

		/**
		 * Module configuration.
		 * @protected
		 * @type {Object}
		 */
		moduleInfo: null,

		/**
		 * Returns ModalBox module instance.
		 * @protected
		 * @return {Object}
		 */
		getModalBox: function() {
			return ModalBox;
		},

		/**
		 * Unloads current module instance from sandbox, fires ModalBoxClosing message.
		 * @private
		 */
		onModalBoxClosed: function() {
			var viewModel = this.viewModel;
			if (viewModel && Ext.isFunction(viewModel.beforeModalBoxClosing)) {
				viewModel.beforeModalBoxClosing();
			}
			this.sandbox.unloadModule(this.sandbox.id);
		},

		/**
		 * Returns fixed container inside modal window.
		 * @protected
		 * @return {Object} Fixed size container.
		 */
		getFixedHeaderContainer: function() {
			var modalBox = this.getModalBox();
			return modalBox.getFixedBox();
		},

		/**
		 * Returns main container inside modal window.
		 * @protected
		 * @return {Object} Main container.
		 */
		getContentContainer: function() {
			return this.modalBoxContainer;
		},

		/**
		 * Updates window size depending on arguments or window content (in case no arguments defined).
		 * @protected
		 * @param {Number} width Window width.
		 * @param {Number} height Window height.
		 */
		updateSize: function(width, height) {
			var modalBox = this.getModalBox();
			if (width && height) {
				modalBox.setSize(width, height);
			} else {
				modalBox.updateSizeByContent();
			}
		},

		/**
		 * Combines (or overrides) default modal size settings with schema specific settings.
		 * @protected
		 * @param {Object} [modalConfig] Modal window custom configuration.
		 * @return {Object} Modal schema configuration.
		 */
		getModalConfig: function(modalConfig) {
			var moduleInfo = this.moduleInfo || {};
			var modalBoxConfig = moduleInfo.modalBoxConfig ? this.moduleInfo.modalBoxConfig : {};
			var config = Ext.apply(this.modalBoxSize, modalBoxConfig);
			if (modalConfig) {
				Ext.apply(config, modalConfig);
			}
			return config;
		},

		/**
		 * Prepares modal box for rendering. Sets default window size and applies config.
		 * @protected
		 * @param {Object} [config] Modal window cutom parameters.
		 * @param {Object} [config.modalBoxConfig] Modal box parameters.
		 * @param {Object} [config.initialSize] Modal box initial size.
		 */
		prepareModalBox: function(config) {
			if (!this.modalBoxContainer) {
				config = config || {};
				var modalBox = this.getModalBox();
				var modalBoxConfig = this.getModalConfig(config.modalBoxConfig);
				this.modalBoxContainer = modalBox.show(modalBoxConfig, this.onModalBoxClosed, this);
				var initialSize = config.initialSize || this.initialSize;
				modalBox.setSize(initialSize.width, initialSize.height);
			}
		},

		/**
		 * Makes modal window close.
		 * @protected
		 */
		closeModalBox: function() {
			if (this.modalBoxContainer) {
				var modalBox = this.getModalBox();
				modalBox.close(true);
				this.modalBoxContainer = null;
			}
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initSchemaName
		 * @override
		 */
		initSchemaName: function() {
			if (!this.moduleInfo) {
				this.moduleInfo = this.sandbox.publish("GetModuleInfo", null, [this.sandbox.id]);
			}
			this.schemaName = this.moduleInfo.schemaName;
			this.entitySchemaName = this.moduleInfo.entitySchemaName;
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#initHistoryState
		 * @override
		 */
		initHistoryState: Terrasoft.emptyFn,

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#createViewModel
		 * @override
		 */
		createViewModel: function() {
			var viewModel = this.callParent(arguments);
			viewModel.destroyModule = this.destroyModule.bind(this);
			viewModel.updateSize = this.updateSize.bind(this);
			return viewModel;
		},

		/**
		 * Returns view model configuration.
		 * @protected
		 * @return {Object} View model configuration object.
		 */
		getViewModelConfig: function() {
			var viewModelConfig = this.callParent(arguments);
			Ext.merge(viewModelConfig, {
				values: {moduleInfo: this.moduleInfo}
			});
			return viewModelConfig;
		},

		/**
		 * @inheritdoc Terrasoft.BaseSchemaModule#render
		 * @override
		 */
		render: function() {
			var viewModel = this.viewModel;
			var modalBoxConfig = Ext.isFunction(viewModel.getModalBoxInitialConfig)
				? viewModel.getModalBoxInitialConfig()
				: undefined;
			this.prepareModalBox(modalBoxConfig);
			var renderTo = this.getContentContainer();
			var headerRenderTo = this.getFixedHeaderContainer();
			var containerName = this.schemaName + this.autoGeneratedContainerSuffix;
			var headerContainerName = this.schemaName + this.autoGeneratedContainerSuffix + "header";
			var view = this.view;
			var headerView = this.headerView;
			if (!view || view.destroyed || !headerView || headerView.destroyed) {
				view = this.view = this.Ext.create("Terrasoft.Container", {
					id: containerName,
					selectors: {wrapEl: "#" + containerName},
					classes: {
						wrapClassName: Ext.Array.merge(this.mainContainerWrapClasses || [],
							["modal-box-schema-module-content", "schema-wrap", "one-el"])
					},
					items: Terrasoft.deepClone(this.viewConfig[0])
				});
				headerView = this.headerView = this.Ext.create("Terrasoft.Container", {
					id: headerContainerName,
					selectors: {wrapEl: "#" + headerContainerName},
					classes: {
						wrapClassName: Ext.Array.merge(this.headerWrapClasses || [],
							["modal-box-schema-module-header", "schema-wrap", "one-el"])
					},
					items: Terrasoft.deepClone(this.viewConfig[1])
				});
				view.bind(viewModel);
				view.render(renderTo);
				headerView.bind(viewModel);
				headerView.render(headerRenderTo);
			} else {
				view.reRender(0, renderTo);
				headerView.reRender(0, headerRenderTo);
			}
			viewModel.headerRenderTo = headerRenderTo.id;
			viewModel.renderTo = renderTo.id;
			viewModel.onRender();
		},

		/**
		 * Closes modal window.
		 */
		destroyModule: function() {
			this.closeModalBox();
		}

	});

	return Terrasoft.ModalBoxSchemaModule;
});


