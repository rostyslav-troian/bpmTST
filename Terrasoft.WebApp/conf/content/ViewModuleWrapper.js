Terrasoft.configuration.Structures["ViewModuleWrapper"] = {innerHierarchyStack: ["ViewModuleWrapper"]};
define("ViewModuleWrapper", ["ext-base", "sandbox", "terrasoft", "ConfigurationBootstrap", "css!CommonCSSV2",
	"css!ViewModule", "css!BasePageV2CSS", "css!BaseFontsCSS", "css!RtlCSS", "CheckWSConnectionMixin"],
	function(Ext, sandbox, Terrasoft) {
		/**
		 * @class Terrasoft.configuration.ViewModule
		 * ##### ######-####### ### ########## ####### #############.
		 */
		Ext.define("Terrasoft.configuration.ViewModuleWrapper", {
			extend: "Terrasoft.BaseObject",
			alternateClassName: "Terrasoft.ViewModuleWrapper",

			mixins: ["Terrasoft.CheckWSConnectionMixin"],

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			/**
			 * Default view module name.
			 * @type {String}
			 */
			defaultViewModule: "ConfigurationViewModule",

			/**
			 * Default view module name for section designer.
			 * @type {String}
			 */
			sectionDesignerViewModule: "SectionDesignerViewModule",

			/**
			 * Container for load module.
			 * @type {Object}
			 */
			renderTo: Ext.getBody(),

			/**
			 * Module async state.
			 * @type {Boolean}
			 */
			isAsync: true,

			/**
			 * ############## ######.
			 * @virtual
			 * @param {Function} callback #######, ####### ##### ####### ## ##########.
			 * @param {Object} scope ########, # ####### ##### ####### ####### callback.
			 */
			init: function(callback, scope) {
				this.initQueryParameters();
				this.subscribeMessages();
				if (this.isSectionDesigner()) {
					this.defaultViewModule = this.sectionDesignerViewModule;
				}
				this.initUiFeature();
				this.appendBrowserCssClasses();
				this.checkWSInitialized();
				callback.call(scope);
			},

			/**
			 * Initializes Terrasoft.QueryParameters object.
			 * @protected
			 */
			initQueryParameters: function() {
				var search = window.location.search;
				if (!search) {
					return;
				}
				search = search.substring(1);
				var urlParams = search.split("&");
				Terrasoft.QueryParameters = Terrasoft.QueryParameters || {};
				for (var i = 0; i < urlParams.length; i++) {
					var pair = urlParams[i].split("=");
					Terrasoft.QueryParameters[pair[0]] = pair[1];
				}
			},

			/**
			 * Appends to body browser css classes.
			 * @protected
			 */
			appendBrowserCssClasses: function() {
				if (this.Ext.isIE || this.Ext.isEdge) {
					this.renderTo.addCls("x-ie");
				}
				if (this.Ext.isEdge) {
					this.renderTo.addCls("x-edge");
				}
			},

			/**
			 * Initializes new UI.
			 * @protected
			 */
			initUiFeature: function() {
				this._setFeatureAttribute("OldUI");
				this._setFeatureAttribute("UseAnimationSpinner");
			},

			/**
			 * Sets feature attribute.
			 * @param {String} featureCode Feature code.
			 * @private
			 */
			_setFeatureAttribute: function(featureCode) {
				var featureState = Terrasoft.Features.getIsEnabled(featureCode);
				var renderTo = this.renderTo;
				renderTo.dom.setAttribute(featureCode, featureState);
			},

			/**
			 * #########, ######## ## ## # ########## ########.
			 * @protected
			 * @virtual
			 * @return {Boolean} ########## true #### ## ######## # ########## #######, false # ######## ######.
			 */
			isSectionDesigner: function() {
				var hash = Terrasoft.router.Router.getHash();
				return hash.indexOf("SectionDesigner") === 0;
			},

			/**
			 * ########### #############.
			 * @virtual
			 * @param {Ext.Element} renderTo ###### ## #########, # ####### ##### ############ #############.
			 */
			render: function(renderTo) {
				Ext.create("Terrasoft.Container", {
					renderTo: renderTo,
					id: "mainContentWrapper",
					classes: {wrapClassName: ["main-content-wrapper"]},
					selectors: {wrapEl: "#mainContentWrapper"}
				});
				this.reloadViewModule();
			},

			/**
			 * Subscribes for messages.
			 * @protected
			 * @virtual
			 */
			subscribeMessages: function() {
				var sandbox = this.sandbox;
				sandbox.subscribe("ReloadViewModule", this.reloadViewModule, this, [this.sandbox.id]);
			},

			/**
			 * ######### ###### #############.
			 * @protected
			 * @virtual
			 * @param {Object} config ###### ############.
			 * @param {String} config.viewModuleName ### ###### ### ########.
			 */
			reloadViewModule: function(config) {
				var queryParameters = Terrasoft.QueryParameters || {};
				var queryParameter = queryParameters.vm;
				var queryViewModuleName = queryParameter && queryParameter.split("/")[0];
				var viewModuleName = (config && config.viewModuleName) || queryViewModuleName || this.defaultViewModule;
				var sandbox = this.sandbox;
				sandbox.loadModule(viewModuleName, {
					renderTo: "mainContentWrapper",
					id: "ViewModule"
				});
			}
		});

		return Ext.create("Terrasoft.ViewModuleWrapper", {
			Ext: Ext,
			sandbox: sandbox,
			Terrasoft: Terrasoft
		});
	});


