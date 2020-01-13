Terrasoft.configuration.Structures["ContentHTMLElementViewModel"] = {innerHierarchyStack: ["ContentHTMLElementViewModel"]};
define("ContentHTMLElementViewModel", ["ContentHTMLElementViewModelResources", "ContentElementBaseViewModel"],
	function(resources) {

		/**
		 * @class Terrasoft.ContentBuilder.ContentHTMLElementViewModel
		 * ##### ###### ############# ##### ########.
		 */
		Ext.define("Terrasoft.ContentBuilder.ContentHTMLElementViewModel", {
			extend: "Terrasoft.ContentElementBaseViewModel",
			alternateClassName: "Terrasoft.ContentHTMLElementViewModel",

			/**
			 * ### ###### ######## ###########.
			 * @protected
			 * @type {String}
			 */
			className: "Terrasoft.ContentHTMLElement",

			/**
			 * Sandbox.
			 * @protected
			 * @virtual
			 * @type {Object}
			 */
			sandbox: null,

			/**
			 * @inheritdoc Terrasoft.BaseViewModel#constructor
			 * @overridden
			 */
			constructor: function() {
				this.callParent(arguments);
				this.initResourcesValues(resources);
				this.subscribeMessages();
			},

			/**
			 * Uploads html file.
			 * @protected
			 * @virtual
			 * @param {Object|Object[]} photo Photo.
			 */
			onFileSelected: function(photo) {
				if (!photo || !Ext.isArray(photo)) {
					this.set("ImageConfig", null);
					return;
				}
				FileAPI.readAsText(photo[0], null, function(e) {
					if (e.type === "load") {
						var bodyHtml = e.result;
						var bodyRegex = /<body.*?>([\s\S]*)<\/body>/;
						if (bodyRegex.test(e.result)) {
							bodyHtml = bodyRegex.exec(bodyHtml)[1];
						}
						this.set("Content", bodyHtml);
					}
				}.bind(this));
			},

			/**
			 * Clears data.
			 * @protected
			 * @virtual
			 */
			clearData: function() {
				this.set("Content", null);
			},

			/**
			 * Edits data.
			 * @protected
			 * @virtual
			 */
			editData: function() {
				this.sandbox.loadModule("ModalBoxSchemaModule", {
					id: this.getHTMLElementModalBoxId()
				});
			},

			/**
			 * Subscribes messages.
			 * @protected
			 * @virtual
			 */
			subscribeMessages: function() {
				this.sandbox.subscribe("GetModuleInfo", this.getHTMLCodeEditModalBoxCongfig,
					this, [this.getHTMLElementModalBoxId()]);
				this.sandbox.subscribe("SaveHTMLElementContent", this.setContent,
					this, [this.getHTMLElementModalBoxId()]);
			},

			/**
			 * Returns HTML edit modal box config.
			 * @protected
			 * @virtual
			 */
			getHTMLCodeEditModalBoxCongfig: function() {
				return {
					schemaName: "HTMLCodeEditModalBox",
					modalBoxSize: {
						"width": "820px",
						"height": "600px"
					},
					content: this.get("Content")
				};
			},

			/**
			 * Sets HTML content.
			 * @protected
			 * @virtual
			 */
			setContent: function(config) {
				this.set("Content", config.content);
			},

			/**
			 * Returns HTML edit modal box config.
			 * @protected
			 * @virtual
			 */
			getHTMLElementModalBoxId: function() {
				return this.sandbox.id + this.instanceId + "_HTMLElementId";
			},

			/**
			 * @inheritdoc Terrasoft.ContentElementBaseViewModel#getViewConfig
			 * @overridden
			 */
			getViewConfig: function() {
				var config = this.callParent(arguments);
				Ext.apply(config, {
					"content": "$Content",
					"htmlTools": this.getToolsViewConfig(),
					"placeholder": "$Resources.Strings.Placeholder"
				});
				return config;
			},

			/**
			 * Generates configuration object of HTML element tools.
			 * @protected
			 * @return {Array} Configuration object of element tools.
			 */
			getToolsViewConfig: function() {
				return [{
					className: "Terrasoft.Button",
					style: Terrasoft.controls.ButtonEnums.style.GREEN,
					markerValue: "file-upload-button",
					fileUpload: true,
					fileTypeFilter: Ext.isGecko ? [".html", ".htm"] : ["text/html"],
					filesSelected: "$onFileSelected",
					imageConfig: "$Resources.Images.UploadIcon"
				}, {
					className: "Terrasoft.Button",
					markerValue: "edit-button",
					click: "$editData",
					imageConfig: "$Resources.Images.EditIcon"
				}, {
					className: "Terrasoft.Button",
					markerValue: "clear-button",
					click: "$clearData",
					imageConfig: "$Resources.Images.ClearIcon"
				}];
			}
		});
	});


