Terrasoft.configuration.Structures["CampaignSchemaDesigner"] = {innerHierarchyStack: ["CampaignSchemaDesigner"]};
define("CampaignSchemaDesigner", ["CampaignSchemaDesignerResources", "CampaignSchemaDesignerViewModel",
		"CampaignSchemaDesignerLeftToolbar", "CampaignSchemaDiagram",
	"CampaignElementSchemaManager", "CampaignElementSchemaManagerEx"], function(resources) {
	Ext.define("Terrasoft.Designers.CampaignSchemaDesigner", {
		extend: "Terrasoft.ProcessSchemaDesigner",
		alternateClassName: "Terrasoft.CampaignSchemaDesigner",

		/**
		 * @inheritdoc Terrasoft.Designers.ProcessSchemaDesigner#designerViewModelClassName
		 * @overridden
		 */
		designerViewModelClassName: "Terrasoft.CampaignSchemaDesignerViewModel",

		/**
		 * @inheritdoc Terrasoft.Designers.BaseProcessSchemaDesigner#propertiesEditModule
		 * @overridden
		 */
		propertiesEditModule: "CampaignSchemaElementPropertiesEdit",

		/**
		 * Name of left toolbar class.
		 * @protected
		 * @type {String}
		 */
		leftToolbarClassName: "Terrasoft.CampaignSchemaDesignerLeftToolbar",

		/**
		 * @inheritdoc Terrasoft.Designers.ProcessSchemaDesigner#leftToolbarHeaderButtonCaption
		 * @overridden
		 */
		leftToolbarHeaderButtonCaption: resources.localizableStrings.LeftToolbarCaption,

		/**
		 * Default campaign entity schema unique identifier.
		 * @type {String}
		 */
		entitySchemaUId: null,

		/**
		 * Default campaign unique identifier.
		 * @type {String}
		 */
		entityId: null,

		/**
		 * @inheritdoc Terrasoft.Designers.ProcessSchemaDesigner#schemaDiagramClassName
		 * @overridden
		 */
		schemaDiagramClassName: "Terrasoft.CampaignSchemaDiagram",

		/**F
		 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#createDesignContainer
		 * @overridden
		 */
		getDesignerViewModelConfig: function() {
			var config = this.callParent(arguments);
			config.values.EntitySchemaUId = this.entitySchemaUId;
			config.values.EntityId = this.entityId;
			return config;
		},

		/**
		 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#getSchemaPropertiesButtonConfig
		 * @overridden
		 */
		getSchemaPropertiesButtonConfig: function() {
			var config = this.callParent(arguments);
			config.hint = resources.localizableStrings.PropertiesButtonHint;
			return config;
		},

		/**
		 * @inheritDoc Terrasoft.BaseSchemaDesigner#init
		 * @override
		 */
		init: function() {
			this.callParent(arguments);
			this.sandbox.subscribe("ReRenderElement", this.onReRenderElement, this);
		},

		/**
		 * Event handler for changed element event to rerender it on diagram.
		 * @protected
		 * @param {Terrasoft.BaseCampaignElementSchema} element Changed element.
		 */
		onReRenderElement: function(element) {
			var diagram = this.diagram;
			var node = diagram.getElementById(element.name);
			if (node) {
				var url = element.getLargeImage().url;
				node.shape.src = url;
				diagram.renderItem(node);
			}
		},

		/**
		 * @inheritdoc Terrasoft.ProcessSchemaDesigner#createToolbarLeftContainer
		 * @overridden
		 */
		createToolbarLeftContainer: function() {
			var lczStrings = resources.localizableStrings;
			var elementCopyMenuItem = Ext.create("Terrasoft.MenuItem", {
				caption: lczStrings.CopyElementMenuItemCaption,
				onItemClick: this.onCopyElementClick.bind(this),
				tag: "CopyElement"
			});
			var elementPasteMenuItem = Ext.create("Terrasoft.MenuItem", {
				caption: lczStrings.PasteElementMenuItemCaption,
				onItemClick: this.onPasteElementClick.bind(this),
				tag: "PasteElement"
			});
			return {
				className: "Terrasoft.Container",
				id: this.id + "-toolbar-left",
				classes: {
					wrapClassName: ["toolbar-left"]
				},
				items: [
					{
						className: "Terrasoft.Button",
						id: this.id + "-save-btn",
						caption: lczStrings.SaveButtonCaption,
						style: Terrasoft.controls.ButtonEnums.style.GREEN,
						click: {bindTo: "save"},
						hint: lczStrings.SaveButtonHint
					},
					{
						className: "Terrasoft.Button",
						id: this.id + "-run-btn",
						caption: lczStrings.RunButtonCaption,
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						click: {bindTo: "onRunProcessClick"},
						hint: lczStrings.RunButtonHint,
						visible: false
					},
					{
						className: "Terrasoft.Button",
						id: this.id + "-actions-btn",
						caption: lczStrings.ActionsButtonCaption,
						classes: {
							wrapperClass: ["t-btn-actions"]
						},
						menu: {
							items: [
								elementCopyMenuItem,
								elementPasteMenuItem
							]
						}
					}
				]
			};
		},

		/**
		 * @inheritdoc Terrasoft.BaseProcessSchemaDesigner#createCaptionContainer
		 * @overridden
		 */
		createCaptionContainer: function() {
			var captionLabel = Ext.create("Terrasoft.Label", {
				id: this.id + "-caption",
				caption: {
					bindTo: "SchemaCaption"
				},
				markerValue: "SchemaCaption",
				classes: {
					labelClass: ["label-caption"]
				}
			});
			var captionContainer = Ext.create("Terrasoft.Container", {
				id: this.id + "-diagram-caption-ct",
				classes: {
					wrapClassName: ["control-width-15 ts-box-sizing diagram-caption-ct"]
				},
				items: [
					captionLabel
				]
			});
			return captionContainer;
		}
	});
	return Terrasoft.CampaignSchemaDesigner;
});


