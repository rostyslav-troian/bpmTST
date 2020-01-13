Terrasoft.configuration.Structures["SchemaDesigner"] = {innerHierarchyStack: ["SchemaDesigner"]};
define("SchemaDesigner", ["ext-base", "terrasoft", "ej-diagram", "process-schema-diagram", "process-schema-diagram-5x",
		"SchemaDesignerResources", "BaseViewModule"],
	function(Ext, Terrasoft) {
		/**
		 * @class Terrasoft.configuration.SchemaDesigner
		 * Class of schemes designer.
		 */
		Ext.define("Terrasoft.configuration.SchemaDesigner", {
			extend: "Terrasoft.BaseViewModule",
			alternateClassName: "Terrasoft.SchemaDesigner",

			/**
			 * Schema designer instance. Type of designer calculated by hash.
			 * @private
			 * @type {Terrasoft.BaseSchemaDesigner}
			 */
			designer: null,

			/**
			 * Manager of schemes.
			 * @private
			 * @type {Object}
			 */
			schemaManager: null,

			/**
			 * @inheritdoc Terrasoft.BaseViewModule#diff
			 * @overridden
			 */
			diff: null,

			/**
			 * @inheritdoc Terrasoft.BaseViewModule#onHistoryStateChanged
			 * Hides base implementation, becouse designer does not support loading schemes by historyState
			 * @overridden
			 */
			onHistoryStateChanged: Terrasoft.emptyFn,

			/**
			 * @inheritdoc Terrasoft.BaseViewModule#loadMainPanelsModules
			 * Hides base implementation, becouse designer does not load nested modules.
			 * @overridden
			 */
			loadMainPanelsModules: function() {
				var currentState = this.sandbox.publish("GetHistoryState");
				var hash = currentState.hash.historyState;
				this.initDesigner({
					hash: hash
				});
				if (!this.designer) {
					return;
				}
				this.designer.render({
					renderTo: this.renderTo,
					sandbox: this.sandbox
				});
			},

			/**
			 * Parse received hash string and return config.
			 * @param {String} hash Hash
			 * @private
			 * @return {Object}
			 * @return {String} return.designerName Designer type name.
			 * @return {String} return.id Schema UId.
			 * @return {String} return.packageId Package UId.
			 */
			parseHash: function(hash) {
				var params = hash.split("/");
				var designer = params[0];
				var schemaId = params[1];
				var packageId = params[2];
				return {
					designerName: designer,
					id: (schemaId === "add") ? "" : schemaId,
					packageId: packageId
				};
			},

			/**
			 * Initialize schema deisgner(see {@link #designer}) by hash.
			 * @private
			 * @param {Object} config Configuration object.
			 * @param {String} config.hash Hash.
			 */
			initDesigner: function(config) {
				var designer;
				var params = this.parseHash(config.hash);
				var Ext = this.Ext;
				switch (params.designerName) {
					case "process":
						designer = Ext.create("Terrasoft.ProcessSchemaDesigner", {
							sandbox: this.sandbox,
							schemaUId: params.id,
							packageUId: params.packageId
						});
						break;
					case "entityProcess":
						designer = Ext.create("Terrasoft.EmbeddedProcessSchemaDesigner", {
							sandbox: this.sandbox,
							schemaUId: params.id,
							packageUId: params.packageId
						});
						break;
					case "processLog":
						designer = Ext.create("Terrasoft.ProcessSchemaDesignerLog", {
							sandbox: this.sandbox,
							sysProcessLogId: params.id
						});
						break;
					case "process5x":
						designer = Ext.create("Terrasoft.ProcessSchemaDesigner5X", {
							sandbox: this.sandbox,
							schemaUId: params.id
						});
						break;
					case "packageDependenciesDiagram":
						designer = Ext.create("Terrasoft.PackageDependenciesDiagram", {
							sandbox: this.sandbox
						});
						break;
				}
				this.designer = designer;
			},

			/**
			 * Render designer.
			 * @param {Ext.Element} renderTo Container to render designer.
			 */
			render: function(renderTo) {
				this.renderTo = renderTo;
				this.loadNonVisibleModules();
			},

			/**
			 * @overridden
			 * @inheritdoc Terrasoft.BaseObject#onDestroy
			 */
			onDestroy: function() {
				var designer = this.designer;
				if (designer) {
					designer.destroy();
				}
				this.callParent(arguments);
			}

		});

		return Terrasoft.SchemaDesigner;
	});


