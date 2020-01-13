Terrasoft.configuration.Structures["EmptyGridMessageConfigBuilder"] = {innerHierarchyStack: ["EmptyGridMessageConfigBuilder"]};
define("EmptyGridMessageConfigBuilder", ["EmptyGridMessageConfigBuilderResources"],	function(resources) {
	Ext.define("Terrasoft.configuration.EmptyGridMessageConfigBuilder", {
		extend: "Terrasoft.ObjectBuilder",
		alternateClassName: "Terrasoft.EmptyGridMessageConfigBuilder",

		statics: {

			/**
			 * Returns default empty message config for wizard section.
			 * @param {String} academyUrl Academy url.
			 * @returns {Object} Empty message config.
			 */
			getDefaultWizardSectionConfig: function(academyUrl) {
				var references = Ext.create("Terrasoft.Collection");
				references.add({
					caption: resources.localizableStrings.EmptyInfoAcademyUrlCaption,
					url: academyUrl
				});
				var builder = Ext.create("Terrasoft.EmptyGridMessageConfigBuilder", {
					_baseClasses: ["empty-grid-message"]
				});
				builder.addInfoIcon();
				builder.addTitle(resources.localizableStrings.EmptyInfoTitle);
				builder.addDescription(resources.localizableStrings.EmptyInfoDescription);
				builder.addReference(resources.localizableStrings.EmptyInfoRecommendation, references);
				return builder.getResult();
			}
		},

		/**
		 * Base message cass classes.
		 * @private
		 * @type {Array}
		 */
		_baseClasses: null,

		/**
		 * Starts message element block.
		 * @private
		 * @param {Array} classes Cass classes.
		 */
		_startElement: function(classes) {
			this.start().object();
			this.add("className", "Terrasoft.Container");
			this.start().object("classes");
			this.add("wrapClassName", classes);
			this.end();
			this.start().array("items");
		},

		/**
		 * Ends message element block.
		 * @private
		 */
		_endElement: function() {
			this.end();
			this.end();
		},

		/**
		 * Adds description block to message.
		 * @private
		 * @param {Object} config Description config.
		 * @param {String} config.className Description css class name.
		 * @param {String} config.caption Description caption.
		 * @param {String} config.html Description html code.
		 * @param {String} config.selector Description selector.
		 * @param {Array} classes Description block css classes.
		 */
		_addDescriptionBlock: function(config, classes) {
			classes = classes || ["description"];
			this._startElement(classes);
			this._startElement(config.wrapClasses);
			this.start().object();
			this.start(!Ext.isEmpty(config.className)).add("className", config.className);
			this.start(!Ext.isEmpty(config.caption)).add("caption", config.caption);
			this.start(!Ext.isEmpty(config.html)).add("html", config.html);
			this.start(!Ext.isEmpty(config.selector)).object("selectors");
			this.add("wrapEl", config.selector);
			this.end();
			this.end();
			this._endElement();
			this._endElement();
		},

		/**
		 * Returns formatted html text with url links.
		 * @private
		 * @param {String} template Text template.
		 * @param {Terrasoft.Collection} references Reference collection. Reference is object with caption and
		 * url fields.
		 * @returns {String} Formatted html text.
		 */
		_prepareReferenceHtml: function(template, references) {
			var referencesCollection = references.select(function(config) {
				return Ext.String.format("<a target=\"_blank\" href=\"{0}\">{1}</a>", config.url, config.caption);
			}, this);
			var formatArguments = referencesCollection.getItems();
			formatArguments.unshift(template);
			return Ext.String.format.apply(this, formatArguments);
		},

		/**
		 * @inheritdoc Terrasoft.ObjectBuilder#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this._startElement(this._baseClasses);
		},

		/**
		 * Adds custom icon to message.
		 * @param {Object} iconResource Icon resource.
		 * @param {Array} classes Css classes for new icon.
		 */
		addIcon: function(iconResource, classes) {
			classes = classes || ["image-container"];
			var imgSrc = Terrasoft.ImageUrlBuilder.getUrl(iconResource);
			this._startElement(classes);
			this.add({
				"className": "Terrasoft.ImageEdit",
				"imageSrc": imgSrc,
				"readonly": true,
				"classes": {
					"wrapClass": ["image-control"]
				}
			});
			this._endElement();
		},

		/**
		 * Adds info icon to message.
		 * @param classes
		 */
		addInfoIcon: function(classes) {
			this.addIcon(resources.localizableImages.InfoIcon, classes);
		},

		/**
		 * Adds title to message.
		 * @param {String} caption Title caption.
		 * @param {Array} classes Title css classes.
		 */
		addTitle: function(caption, classes) {
			classes = classes || ["title"];
			this._startElement(classes);
			this.add({
				"className": "Terrasoft.Label",
				"caption": caption
			});
			this._endElement();
		},

		/**
		 * Adds description to message.
		 * @param {String} description Message description.
		 * @param {Array} classes Description css classes.
		 */
		addDescription: function(description, classes) {
			var config = {
				wrapClasses: ["action"],
				className: "Terrasoft.Label",
				caption: description
			};
			this._addDescriptionBlock(config, classes);
		},

		/**
		 * Adds description with url link to message.
		 * @param {String} template Description template.
		 * @param {Terrasoft.Collection} references Collection of url links.
		 * @param {Array} classes Description css classes.
		 */
		addReference: function(template, references, classes) {
			var referenceHtml = this._prepareReferenceHtml(template, references);
			var config = {
				wrapClasses: ["reference"],
				className: "Terrasoft.HtmlControl",
				html: referenceHtml,
				selector: ".reference"
			};
			this._addDescriptionBlock(config, classes);
		}
	});
	return Terrasoft.EmptyGridMessageConfigBuilder;
});


