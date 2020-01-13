Ext.ns("Terrasoft");

/**
 * Abstract base class of a control.
 * Implements logic for creating, initializing, rendering and destroying for visual controls.
 * @private
 * @abstract
 */
Ext.define("Terrasoft.controls.Component", {
	extend: "Terrasoft.core.BaseObject",
	alternateClassName: "Terrasoft.Component",

	mixins: {
		bindable: "Terrasoft.Bindable",
		expandableTip: "Terrasoft.ExpandableTip"
	},

	statics: {
		/**
		 * Unique identifier generator.
		 * @private
		 * @static
		 * @type {Ext.data.SequentialIdGenerator}
		 */
		idGenerator: null,

		/**
		 * Default conponent identifier suffix.
		 * @private
		 * @static
		 * @type {String}
		 */
		defaultComponentId: "t-comp",

		/**
		 * The method returns a serial identifier generator.
		 * @private
		 * @static
		 * @return {Ext.data.SequentialIdGenerator}
		 */
		getIdGenerator: function() {
			if (this.idGenerator === null) {
				this.idGenerator = new Ext.data.SequentialIdGenerator({
					prefix: this.defaultComponentId,
					seed: 0
				});
			}
			return this.idGenerator;
		},

		/**
		 * Generates unique identifier.
		 * @private
		 * @static
		 * @return {String}
		 */
		generateId: function() {
			var idGenerator = this.getIdGenerator();
			return idGenerator.generate();
		}
	},

	id: null,

	/**
	 * Focus index
	 * @type {Number}
	 */
	tabIndex: 1,

	/**
	 * A reference to the wrapper element of the component.
	 * @private
	 * @type {Ext.dom.Element}
	 */
	wrapEl: null,

	/**
	 * Regular expression pattern for parsing HTML component markup for parameterizing inline styles
	 * @private
	 * @type {String}
	 */
	styleRegexTemplate: "style\\s*=\\s*\"{(\\w*)}\"",
	/**
	 * Regular expression pattern for parsing HTML component markup for parametrizing CSS classes
	 * @private
	 * @type {String}
	 */
	cssRegexTemplate: "class\\s*=\\s*\"{(\\w*)}\"",

	/**
	 * A flag that indicates that the component is rendered.
	 * @readonly
	 * @type {Boolean}
	 */
	rendered: false,

	/**
	 * A flag that indicates that the component is in the rendering phase.
	 * @readonly
	 * @type {Boolean}
	 */
	rendering: false,
	uses: [
		"Ext.Element",
		"Ext.DomHelper",
		"Ext.XTemplate",
		"Ext.ComponentQuery",
		"Ext.ComponentLoader",
		"Ext.EventManager"
	],

	/**
	 * This property provides a shorter alternative to creating objects than using a full class name.
	 * Using `className` is the most convenient way to define components, especially in containers.
	 * For example, the definition of a container with three text elements in the general form is written as follows:
	 *
	 * var container = Ext.create('Terrasoft.Container', {
	 *  id: 'someContainer',
	 *  items: [
	 *   Ext.create('Terrasoft.textedit.TextEdit', {
	 *    id: 'textEdit-1'
	 *   }),
	 *   Ext.create('Terrasoft.textedit.TextEdit', {
	 *    id: 'textEdit-2'
	 *   }),
	 *   Ext.create('Terrasoft.textedit.TextEdit', {
	 *    id: 'textEdit-3'
	 *   })
	 *  ]
	 * });
	 *
	 * Using className, the code can be rewritten as follows:
	 *
	 * var container = Ext.create('Terrasoft.Container', {
	 *  id: 'someContainer',
	 *  items: [
	 *   {
	 *    className: 'Terrasoft.TextEdit',
	 *    id: 'textEdit-1'
	 *   },
	 *   {
	 *    className: 'Terrasoft.TextEdit',
	 *    id: 'textEdit-2'
	 *   },
	 *   {
	 *    className: 'Terrasoft.TextEdit',
	 *    id: 'textEdit-3'
	 *   }
	 *  ]
	 * });
	 *
	 * When creating your component successor, you must specify a unique className.
	 * @type {String}
	 */

	/**
	 * A template string that performs the basic rendering function.
	 * @protected
	 * @type {String}
	 */
	renderTpl: "{%this.renderComponent(out, values)%}",

	/**
	 * Class to disable the control.
	 * @protected
	 * @property {String} disabledClass
	 */
	disabledClass: "",

	/**
	 * An object that describes the {@link Ext.DomQuery DomQuery-selectors} for the internal DOM elements of the
	 * component. Selectors must be specified by the component's successors during rendering.
	 * The best place to create selectors are the {@link #getTpl getTpl ()} and {@link #getTplData getTplData ()}
	 * methods. If there are no selectors at the time of the {@link #afterrender afterrender} event, an exception will
	 * be thrown. When the component is rendered in several nested containers, the component itself does not actually
	 * place its HTML markup in the DOM. It generates it and passes it to its container and subscribes to the
	 * container's afterrender event, in whose handler it starts its afterrender event. Thus, there can be an
	 * indefinite time between the insertion time of the HTML component markup in the DOM and the time of the
	 * afterrender event. The component needs to be able to find itself in the DOM.
	 * For this, the selector mechanism is implemented, which ensures that the component has at least two elements:
	 * {@link #wrapEl wrapEl} and {@link #el el}.
	 * The selector mechanism runs on the {@link #afterrender afterrender} event when HTML is already
	 * inserted in the DOM. Upon completion of the mechanism, the name of the selector will be the name of the
	 * component's property, and the value will become a reference to the DOM element.
	 * @protected
	 * @type {Object}
	 */
	selectors: null,

	/**
	 * {@link Ext.XTemplate Template} component HTML markup.
	 * When rendering the control, the {@link #getTpl getTpl ()} method must return the element template.
	 * But if the control in any of its states has the same HTMl-markup,
	 * then there is no need to implement a method for generating a template, just redefine the tpl property and
	 * the base implementation of the  {@link #getTpl getTpl ()} method will return this template.
	 * @type {String []}
	 */
	tpl: null,

	/**
	 * An object containing parameters for the {@link #tpl template} of the control.
	 * When rendering the control, the {@link #getTplData getTplData ()} method must return the parameter object for
	 * the template. If there is no need to implement a method for generating parameters when the control
	 * is not dynamic, it is enough to override the tplData property and the base implementation of
	 * the {@link #getTplData getTplData ()} method will return the object.
	 * @type {Object}
	 */
	tplData: null,

	/**
	 * @cfg {Ext.dom.Element} renderTo
	 * Specifies a reference to the {@link Ext.Element Ext.Element} into which the control will be rendered.
	 * If the property is specified, then the component will start rendering immediately after the initialization
	 * is complete. If the property is not specified, then you must call the {@link #render render ()} method yourself
	 * @type {Object}
	 */
	renderTo: null,

	/**
	 * The object for specifying the inline styles of the component specified in the template.
	 * If the {@link #tpl template} specifies the name of the style, then the style object must have a property with
	 * the same name. If a property with styles is not found, the attribute with styles will be removed
	 * from the template. You can specify the component styles in either of the two methods {@link #getTpl getTpl ()}
	 * and {@link #getTplData getTplData ()}.
	 * Example:
	 *
	 *      tpl: [
	 *          '<div id="someId" style="{wrapStyle}">',
	 *          '<input type="text" style="{elStyle}">',
	 *          '</div>'
	 *      ],
	 *      styles: {
	 *          wrapStyle: {
	 *              border: '1px solid black;',
	 *              'background-color': 'white',
	 *              padding: '5px'
	 *          }
	 *      }
	 *
	 * As a result, following HTML markup will be inserted into the DOM:
	 *
	 *      '<div id="someId" style="border:1px solid black; background-color:white; padding:5px;">',
	 *      '<input type="text" >',
	 *      '</div>'
	 *
	 * @type {Object}
	 */
	styles: null,

	/**
	 * The object for specifying the CSS classes of the component specified in the template.
	 * If the {@link #tpl template} specifies the class name, then the class object must have a property with the
	 * same name. If a property with a class is not found, the attribute with the class will be removed from the
	 * template. You can specify component classes in either of the two methods {@link #getTpl getTpl ()}
	 * and {@link #getTplData getTplData ()}.
	 * Example:
	 *
	 *      tpl: [
	 *          '<div id="someId" class="{wrapClass}">',
	 *          '<input type="text" class="{elClass}">',
	 *          '</div>'
	 *      ],
	 *      classes: {
	 *          wrapClass: [
	 *              'component-wrap',
	 *              'component-disabled',
	 *              'component-firstitem.component-important'
	 *          ]
	 *      }
	 *
	 * As a result, such HTML markup will be inserted into the DOM:
	 *
	 *      '<div id="someId" class="component-wrap component-disabled component-firstitem.component-important">',
	 *      '<input type="text" >',
	 *      '</div>'
	 *
	 * @type {Object}
	 */
	classes: null,

	/**
	 * The flag indicates the visibility of the control.
	 * @type {Boolean}
	 */
	visible: true,

	/**
	 * The flag indicates that the component is enabled
	 * @type {Boolean}
	 */
	enabled: true,

	/**
	 * A string of finished HTML markup for insertion into the DOM.
	 * At the moment of rendering of the control if the finished HTML-marking is given, then the template construction
	 * mechanism does not start And the specified line is inserted into the DOM. Later, on
	 * the {@link #afterrender, the aftertender} event the selector mechanism is started.
	 * (see {@link #selectors selectors})
	 * @type {String}
	 */
	html: null,

	/**
	 * The string of additional parameters for the component. Is not used in the code.
	 * The property is intended for use by the developer.
	 * @type {String}
	 */
	tag: "",

	/**
	 * An attribute that indicates that this object is a component.
	 * @type {String}
	 */
	isComponent: true,

	/**
	 * The value of the marker DOM attribute data-item-marker.
	 * @type {String}
	 */
	markerValue: "",

	/**
	 * An attribute that indicates that this component uses marker value.
	 * @type {Boolean}
	 */
	useMarkerValue: false,

	/**
	 * The sign of the mask display.
	 * @type {Boolean}
	 */
	maskVisible: false,

	/**
	 * The mask identifier.
	 * @type {String}
	 * @private
	 */
	maskId: "",

	/**
	 * Mask delay time
	 * @type {Number}
	 * @private
	 */
	maskTimeout: null,

	/**
	 *  Parent element.
	 * @type {Terrasoft.Component}
	 * @private
	 */
	ownerCt: null,

	/**
	 * Event handlers for the parent component. The object supports the implementation of the 'destroy' method
	 * see {@link Ext.util.Observable # addListener addListener} with the 'destroyable' parameter.
	 * @type {Object}
	 * @private
	 */
	ownerCtListeners: null,

	/**
	 * Dom element attributes.
	 * @type {Object}
	 * @private
	 */
	domAttributes: null,

	/**
	 * Owner component view items property name.
	 * @type {String}
	 * @private
	 */
	ownerCtPropertyName: null,

	/**
	 * True if need observe component mutations.
	 */
	observeMutations: null,

	/**
	 * Config for MutationObserver.
	 */
	mutationConfig: null,

	/**
	 * The direction of the text. Left to right or right to left.
	 * @protected
	 * @type {String}
	 */
	direction: null,

	/**
	 * Class constructor. Performs component initialization, id generation, if not specified, and registration
	 * in {@link Ext.ComponentManager Component Manager}.If the {@link #renderTo renderTo} parameter is specified
	 * in the configuration object, the constructor calls the {@link #render render ()} method when the renderTo
	 * parameter is passed as an argument.
	 * @param {Object} config configuration object initializing the instance of the component.
	 */
	constructor: function(config) {
		this.useMarkerValue = Terrasoft.useMarkerValue;
		this.className = this.$className;
		this.mixins.expandableTip.constructor.call(this, config);
		this.mixins.bindable.constructor.call(this, config);
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event init
			 * Triggers when component initialization is complete. If the developer in the heir class overrides the
			 * constructor, the event will start when the component's base constructor completes.
			 * Therefore, initialization is best implemented in the {@link #init init ()} method
			 */
			"init",
			/**
			 * @event added
			 * Triggers after the component has been added to the container.
			 * It is assumed that the container after adding the element will call the {@link #added added ()} method.
			 * The base container element implements this logic, but if the user decides to write his own implementation
			 * of the container, then he must call this method himself.
			 * @param {Terrasoft.Component} component component
			 * @param {Terrasoft.Container} ownertCt container to which the component was added
			 */
			"added",
			"enabledchanged",
			"visiblechanged",
			/**
			 * @event beforererender
			 * Works before the component has been rendered and its HTML representation is in the DOM.
			 * @param {Terrasoft.Component} component component
			 */
			"beforererender",
			/**
			 * @event afterrender
			 * Triggers after the component has been rendered and its HTML representation is in the DOM.
			 * @param {Terrasoft.Component} component component
			 * @param {Terrasoft.Container} ownertCt container in which the component was rendered
			 */
			"afterrender",
			/**
			 * @event afterrerender
			 * Triggers after the component completes the rendering and its HTML representation is updated in the DOM.
			 * @param {Terrasoft.Component} component component
			 * @param {Terrasoft.Container} ownertCt container in which the component is rendered
			 */
			"afterrerender",
			/**
			 * @event destroy
			 * Works before the final destruction of the control. Runs in the implementation of the base destructor,
			 * before removing it from the component manager, deleting all event handlers, and destroying the
			 * component's DOM if it was rendered. This is the last opportunity to clean the heirs before the final
			 * destruction of the component.
			 * @param {Terrasoft.Component} component component
			 */
			"destroy",
			/**
			 * Fires during the start of the run check method.
			 * @event canExecute
			 * @param {Object} config
			 * @param {Function} config.method Resume function.
			 * @param {Array} config.args Resume function arguments.
			 * @param {Object} config.scope Resume function scope.
			 * @return {Boolean} True if allowed to continue execute check method otherwise false.
			 */
			"canExecute",
			/**
			 * Fires when DOM element mutate.
			 */
			"mutate"
		);
		if (Ext.isEmpty(this.id)) {
			this.id = Terrasoft.Component.generateId();
		}
		this.init();
		this.fireEvent("init", this);
		Terrasoft.ComponentManager.register(this);
		if (this.renderTo) {
			this.render(this.renderTo, null);
		}
	},

	/**
	 * Inits mutatio observer.
	 * @private
	 */
	initMutationObserver: function() {
		var target = document.getElementById(this.id);
		this.mutationObserver = new MutationObserver(function(mutations) {
			Terrasoft.each(mutations, function(mutation) {
				this.fireEvent("mutate", mutation);
			}, this);
		}.bind(this));
		this.mutationObserver.observe(target, this.mutationConfig);
	},

	/**
	 * Returns the parent element in the hierarchy of the controls.
	 * The method is used by the {@link Ext.util.Observable Observable} mixin to implement pop-up events.
	 * See {@link Ext.util.Observable # enableBubble enableBubble ()}
	 * @override
	 * @return {Terrasoft.Component} Parent element
	 */
	getBubbleParent: function() {
		return this.ownerCt;
	},

	/**
	 * The method implements the mechanism {@link #selectors of selectors}. It starts when the component is rendered.
	 * Searches for the DOM elements of the component at the specified {@link # selectors} selectors and stores the
	 * references to the found elements in the instance of the class. If no wrapEl selectors are specified or the
	 * result of searching by the wrapEl selector will be null - an exception will be thrown.
	 * @private
	 * @throws {Terrasoft.UnknownException}
	 * Throws if the component was not rendered.
	 * @throws {Terrasoft.NullOrEmptyException}
	 * An exception throws if the component does not pass {@link #verifySelectors check selectors}.
	 * @throws {Terrasoft.ItemNotFoundException}
	 * An exception throws if the wrapEl selector does not find any html-element.
	 * @param {Ext.dom.Element} rootNode
	 * The root element of which will be searched. If an element is not specified, the search will be relative to the
	 * body of the document.
	 */
	applySelectors: function(rootNode) {
		if (!this.rendered) {
			throw new Terrasoft.UnknownException({
				message: Terrasoft.Resources.Controls.Component.ComponentIsNotRendered
			});
		}
		if (!this.verifySelectors()) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.Controls.Component.RequiredSelectorsAreNotDefined
			});
		}
		var selectors = this.selectors;
		var wrapElSelector = selectors.wrapEl;
		var root = Ext.getDom(rootNode);
		if (!root) {
			root = Ext.getBody().dom;
		}
		var wrapEl = Ext.DomQuery.is(root, wrapElSelector) ? Ext.get(root) : this.selectNode(wrapElSelector, root);
		if (wrapEl == null) {
			throw new Terrasoft.ItemNotFoundException();
		}
		this.wrapEl = wrapEl;
		var wrapDom = wrapEl.dom;
		for (var selectorName in selectors) {
			if (!selectors.hasOwnProperty(selectorName) || selectorName === "wrapEl") {
				continue;
			}
			var selectorConfig = selectors[selectorName];
			var selector;
			if (Ext.isObject(selectorConfig)) {
				selector = selectorConfig.selector;
			} else {
				selector = selectorConfig;
			}
			var selectedNode = this.selectNode(selector, wrapDom);
			this[selectorName] = selectedNode;
		}
		this.bindSelectors();
	},

	/**
	 * The method looks for {@link Ext.Element} in the DOM at the specified {@link Ext.DomQuery DomQuery-selector}
	 * relative to the root element. If at least one of the parameters is not specified, the method throws an exception.
	 * @param {String} selector {@link Ext.DomQuery DomQuery-selector}
	 * @param {Ext.dom.Element} root The element to be searched for
	 * @return {Ext.dom.Element}
	 * @private
	 */
	selectNode: function(selector, root) {
		if (!selector || !root) {
			throw new Terrasoft.ArgumentNullOrEmptyException();
		}
		var selectNode = Ext.DomQuery.selectNode(selector, root);
		// Hack. The selector by ID does not check the root
		if (!selectNode && Ext.DomQuery.is(root, selector)) {
			selectNode = root;
		}
		return Ext.get(selectNode);
	},

	/**
	 * The method prepares the rendering configuration object of the control.
	 * @return {Object}
	 * @private
	 */
	generateRenderConfig: function() {
		var config = {};
		var tpl = config.tpl = this.generateRenderTemplate();
		if (!Ext.isEmpty(tpl)) {
			config.tplData = {};
			this.initRenderData(config.tplData);
		}
		return config;
	},

	/**
	 * The method generates a template for rendering the component. Not to be confused with the tpl template.
	 * @return {Ext.XTemplate}
	 * @private
	 */
	generateRenderTemplate: function() {
		var tpl = Ext.XTemplate.getTpl(this, "renderTpl");
		this.initRenderTemplate(tpl);
		return tpl;
	},

	/**
	 * The main method of rendering the component. If the parameter {@link #html html} was specified in the
	 * configuration object of the component, the specified HTML markup is inserted into the DOM.
	 * Otherwise, the (see {@link #getTpl, getTpl ()}) parametrized HTML markup template is collected,
	 * the (see {@link #getTplData, getTplData ()}) parameters are prepared,
	 * the  (see {@ link #processTemplate, processTemplate ()}) template preprocessing is performed.
	 * After that the template is compiled into HTML-code and added to the transferred buffer.
	 * Since the method is executed in the context of {@link Ext.XTemplate Ext.XTemplate}, then to get the reference
	 * to the component, you must use renderData.self.
	 * @param {String []} buffer Buffer for generating HTML
	 * @param {Object} renderData Parameters passed to the {@link #renderTpl renderTpl}  template.
	 * @private
	 */
	renderComponent: function(buffer, renderData) {
		var self = renderData.self;
		if (self.html) {
			Ext.DomHelper.generateMarkup(self.html, buffer);
			return;
		}
		var tpl = self.getTpl();
		var tplData = self.getTplData();
		tpl = self.processTemplate(tpl, tplData);
		var template = new Ext.XTemplate(tpl);
		self.prepareTpl(template, tplData);
		template.applyOut(tplData, buffer);
	},

	/**
	 * The method copies properties of the object with the name passed as a parameter (sourceName) from the component
	 * to the template parameter object passed as the (tplData) parameter. Used when preprocessing a template.
	 * @param {String} sourceName The name of the object with properties in the component
	 * @param {Object} tplData Parameter object for the rendering template
	 * @private
	 */
	copySourceToTplData: function(sourceName, tplData) {
		var source = this[sourceName] || {};
		var customClasess;
		if (sourceName === "classes") {
			customClasess = this.classes || {};
		}
		for (var propertyName in source) {
			if (!source.hasOwnProperty(propertyName)) {
				continue;
			}
			var sourceValue = Terrasoft.deepClone(source[propertyName]);
			if (sourceName === "classes") {
				sourceValue = Ext.Array.merge(tplData[propertyName] || [], customClasess[propertyName] || []);
			} else if (tplData[propertyName]) {
				continue;
			}
			tplData[propertyName] = Ext.isArray(sourceValue) ? sourceValue : Ext.apply({}, sourceValue);
		}
	},

	/**
	 * The method searches for the regular expression regexTemplate in the tpl line.
	 * If a match is found, it performs the substitution according to the following algorithm:
	 *
	 * 1. If in the matching substring the value of the group is empty - the entire matched string is replaced by
	 * an empty string.
	 * 2. If there is no property in the rendering template parameter object with the name of the matched group,
	 * the entire matched string is replaced by an empty string.
	 * 3. The replaced replaceFn function is being executed.
	 *
	 * The method is used when preprocessing a rendering template, for parameterizing {@link #styles inline-styles}
	 * and {@link #classes of CSS classes}.
	 * @param {String} regexTemplate - A string for generating a regular expression for searching.
	 * It is expected that there will be at least one group in the regular expression.
	 * @param {String} tpl - The string in which the search and replace are performed.
	 * @param {Object} tplData - Parameter object of the rendering template
	 * @param {Function} replaceFn - Replace function
	 * @return {String} The converted template string
	 * @private
	 */
	processTpl: function(regexTemplate, tpl, tplData, replaceFn) {
		var stylesRegex = new RegExp(regexTemplate, "gm");
		return tpl.replace(stylesRegex, function(matchedString, groupValue) {
			if (!groupValue) {
				return "";
			}
			var group = tplData[groupValue];
			if (!group) {
				return "";
			}
			return replaceFn(group);
		});
	},

	/**
	 * The method deletes all {@link Ext.Element Ext.Elements}, the references to which were set by
	 * the {@Link #selectors selectors}  mechanism.
	 * In the case when the component does not have a reference to the element that is specified in the selector
	 * object, an exception is thrown.
	 * @private
	 * @param {Boolean} [removeOnlySelectors = false] (optional) specifies whether to remove both selectors and
	 * DOM elements
	 */
	removeElementsBySelectors: function(removeOnlySelectors) {
		var selectors = this.selectors;
		for (var selectorName in selectors) {
			if (!selectors.hasOwnProperty(selectorName)) {
				continue;
			}
			var el = this[selectorName];
			if (el == null) {
				continue;
			}
			delete this[selectorName];
			if (removeOnlySelectors === true) {
				continue;
			}
			el.destroy();
		}
	},

	/**
	 * The method preprocesses the control's rendering template. Implemented for parameterization
	 * {@link #styles inline-styles} and {@link #classes CSS classes} of the component.
	 * @param {String / String []} tpl The template for rendering the control
	 * @param {Object} tplData - Parameter object of the rendering template
	 * @protected
	 * @return {String}
	 */
	processTemplate: function(tpl, tplData) {
		var template = tpl;
		if (Ext.isArray(template)) {
			template = template.join("");
		}
		this.copySourceToTplData("styles", tplData);
		this.copySourceToTplData("classes", tplData);
		template = this.processTpl(this.styleRegexTemplate, template, tplData, function(style) {
			var stylesString = Ext.isString(style) ? style : Ext.DomHelper.generateStyles(style);
			return "style=\"" + stylesString + "\"";
		});
		template = this.processTpl(this.cssRegexTemplate, template, tplData, function(cssClass) {
			var classString = Ext.isArray(cssClass) ? cssClass.join(" ") : cssClass;
			return "class=\"" + classString + "\"";
		});
		template = this.encodeHtmlTemplate(template);
		return template;
	},

	/**
	 * Encodes specified symbols.
	 * @param {String} template Control render template.
	 * @return {String} Encoded control render template.
	 */
	encodeHtmlTemplate: function(template) {
		if (Ext.isString(template)) {
			template = template.replace(/\s+/g, " ");
			template = template.replace(/\\u/g, "&#92;u");
			template = template.replace(/\\x/g, "&#92;x");
		}
		return template;
	},

	/**
	 * The method of initializing the component. In the base implementation, the
	 * {@link #afterrender afterrender} event is subscribed. When overriding it is necessary to call the base method.
	 * @protected
	 */
	init: function() {
		this.on("afterrender", this.onAfterRender, this);
		this.on("afterrerender", this.onAfterReRender, this);
		this.on("beforererender", this.onBeforeReRender, this);
	},

	/**
	 * Fires canExecute event with resume method.
	 * @protected
	 * @param {Object} config
	 * @param {Function} config.method Check method.
	 * @param {Mixed} config.args Arguments of the check method.
	 * @return {Boolean} True if allowed to continue execute check method.
	 */
	canExecute: function(config) {
		var args = config.args;
		var event = args[args.length - 1];
		if (event && event.isComeBack) {
			return true;
		}
		Array.prototype.push.call(config.args, {
			isComeBack: true
		});
		Ext.apply(config, {scope: this});
		var canExecute = this.fireEvent("canExecute", config);
		return canExecute;
	},

	/**
	 * The {@link #afterrender afterrender} event handler. Sets the flags that the component is rendered and starts the
	 * {@link # selectors of selectors} mechanism. After setting the references to the DOM elements, it calls the
	 * function to subscribe to the DOM events.
	 * @param {Terrasoft.Component} component Component.
	 * @param {Ext.dom.Element} containerEl DOM element in which the component was rendered.
	 * @protected
	 */
	onAfterRender: function(component, containerEl) {
		this.rendered = true;
		this.rendering = false;
		this.applySelectors(containerEl);
		this.initDomEvents();
		this.addWrapAttr();
		this.setDomAttributes(this.domAttributes);
		if (this.observeMutations) {
			this.initMutationObserver();
		}
	},

	/**
	 * The {@link #beforererender} event handler. Sets the flag that selectors must be bound to a model
	 * @protected
	 */
	onBeforeReRender: function() {
		this.selectorsWereBind = false;
	},

	/**
	 * Adds a marker data-item-marker to the control.
	 * @protected
	 */
	addWrapMarkerValue: function() {
		if (!this.useMarkerValue) {
			return;
		}
		var markerValue = this.markerValue;
		var wrapEl;
		if (!Ext.isEmpty(markerValue) && (wrapEl = this.getWrapEl())) {
			wrapEl.dom.setAttribute("data-item-marker", Terrasoft.encodeHtml(markerValue));
		}
	},

	/**
	 * Adds attributes to the control.
	 * @protected
	 */
	addWrapAttr: function() {
		this.addWrapMarkerValue();
	},

	/**
	 * The {@link #afterrender afterrerender} event handler. Sets the flags that the component is rendered and starts
	 * the {@link # selectors of selectors} mechanism. After setting the references to the DOM elements, it calls the
	 * function to subscribe to the DOM events.
	 * @param {Terrasoft.Component} component Component.
	 * @param {Ext.dom.Element} containerEl DOM element in which the component was rendered.
	 * @protected
	 */
	onAfterReRender: function(component, containerEl) {
		this.rendered = true;
		this.rendering = false;
		this.applySelectors(containerEl);
		this.initDomEvents();
		this.addWrapAttr();
		this.setDomAttributes(this.domAttributes);
		if (this.observeMutations) {
			this.initMutationObserver();
		}
	},

	/**
	 * The method checks for the presence of the {@link #selectors of selectors} object, as well as the presence of
	 * the wrapEl selector.
	 * If no selector is found, an exception will be thrown. Called before the selector mechanism is used.
	 * If the class heir needs to guarantee the presence of a certain selector, then the method must be redefined.
	 * For example, for the MyTextComponent class to work, you must have a link to the text input field.
	 *
	 *       Ext.define('Terrasoft.MyTextComponent', {
	 *        extend: 'Terrasoft.Component',
	 *        className: 'mycomponent',
	 *        ...
	 *        getSelectors: function() {
	 *         this.selectors = {
	 *          wrapEl: '#' + this.id,
	 *          el: '#' + this.id + '-editor'
	 *         }
	 *        },
	 *        verifySelectors: function() {
	 *         var result = this.callParent(arguments);
	 *         var selectors = this.selectors;
	 *         if (!selectors.el) {
	 *          return false;
	 *         }
	 *         return result;
	 *        }
	 *       });
	 *
	 * @protected
	 * @return {Boolean}
	 */
	verifySelectors: function() {
		var selectors = this.selectors;
		var result = false;
		if (selectors && selectors.wrapEl) {
			result = true;
		}
		return result;
	},

	/**
	 * The method is implemented to subscribe to DOM events for the controls.
	 * @protected
	 */
	initDomEvents: function() {
		this.mixins.expandableTip.initDomEvents.call(this);
	},

	/**
	 * The method deletes the subscribers to the DOM events of the controls.
	 * In the base implementation, the events of the elements that were received using
	 * the {@link #selectors of selectors} mechanism are deleted.
	 * @protected
	 */
	clearDomListeners: function() {
		var selectors = this.selectors;
		for (var selectorName in selectors) {
			if (!selectors.hasOwnProperty(selectorName)) {
				continue;
			}
			var el = this[selectorName];
			if (el == null) {
				continue;
			}
			Ext.EventManager.removeAll(el);
		}
		this.selectorsWereBind = false;
		this.mixins.expandableTip.clearDomListeners.call(this);
	},

	/**
	 * The method prepares a rendering template. Creates references for inline methods
	 * @param {Ext.XTemplate} tpl Template for processing.
	 * @protected
	 */
	initRenderTemplate: function(tpl) {
		tpl.renderComponent = this.renderComponent;
	},

	/**
	 * The method prepares a parameter object for rendering the control. A link to the component is installed.
	 * @param {Object} renderData parameter object for processing.
	 * @protected
	 */
	initRenderData: function(renderData) {
		renderData.self = this;
	},

	/**
	 * The method returns a rendering template for the control. The base implementation returns the property
	 * of the {@link #tpl tpl} component. Class heirs must override the method and return the current template.
	 * @return {String[]}
	 * @protected
	 */
	getTpl: function() {
		return this.tpl || "";
	},

	/**
	 * The method returns the parameter object of the control's rendering template.
	 * The base implementation returns the property of the {@link #tplData tplData} component supplemented with the
	 * id parameters and a reference to the self component.
	 * Class successors must override the method and return the current parameter object.
	 * @return {Object}
	 * @protected
	 */
	getTplData: function() {
		var tplData = {
			id: this.id,
			self: this,
			tabIndex: this.tabIndex,
			direction: this.direction
		};
		return Ext.apply(tplData, this.tplData || {});
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 */
	getBindConfig: function() {
		var bindConfig = {
			visible: {
				changeMethod: "setVisible"
			},
			enabled: {
				changeMethod: "setEnabled"
			},
			maskVisible: {
				changeMethod: "setMaskVisible"
			},
			markerValue: {
				changeMethod: "setMarkerValue",
				disabled: !this.useMarkerValue
			},
			domAttributes: {
				changeMethod: "setDomAttributes"
			},
			wrapStyle: {
				changeMethod: "setWrapStyle"
			}
		};
		return bindConfig;
	},

	/**
	 * The method does a check for the possibility of component rendering. The basic implementation checks only that
	 * the component is rendered and visible.
	 * ** Important! ** There is no verification in the {@link #reRender reRender ()} method.
	 * The developer must call the method on his own, and if the result is true, call the method reRender ().
	 * @return {Boolean}
	 * @protected
	 */
	allowRerender: function() {
		return (this.visible === true && this.rendered === true);
	},

	/**
	 * The method re-renders the control. If the component was not rendered, an exception will be thrown.
	 * All DOM elements of the component are destroyed during the rendering process, after which the rendering
	 * engine starts, but with some differences (the  {@link #afterrender afterrender} event will not be started).
	 * @param {Number} index (optional) The position for the component to be re-rendered. Used for compatibility
	 * with the old version of the re-rendering
	 * @param {Ext.dom.Element} container (optional) Reference to Ext.Element, where the component will be rendered.
	 * If the parameter is not specified, an exception will be thrown. Used for compatibility with the old version
	 * of the re-rendering
	 * @protected
	 */
	reRender: function(index, container) {
		if (!Ext.isEmpty(index) || !Ext.isEmpty(container)) {
			this.deprecatedReRender(index, container);
			return;
		}
		this.rendering = true;
		this.fireEvent("beforeRerender", this);
		var wrapEl = this.getWrapEl();
		if (Ext.isEmpty(wrapEl)) {
			if (this.ownerCt.allowRerender()) {
				this.ownerCt.reRender();
			}
			return;
		}
		this.clearDomListeners();
		this.removeElementsBySelectors(true);
		var html = this.generateHtml();
		var parent = wrapEl.parent();
		var domNode = Ext.DomHelper.append(parent, html);
		wrapEl.dom.parentNode.replaceChild(domNode, wrapEl.dom);
		var el = Ext.get(domNode);
		this.fireEvent("afterrerender", this, el);
	},

	/**
	 * Rerenders control if it visible and rendered.
	 */
	safeRerender: function() {
		if (this.allowRerender()) {
			this.reRender.apply(this, arguments);
		}
	},

	/**
	 * {@inheritdoc #reRender}
	 * Deprecated implementation of the method. Used for compatibility
	 * @deprecated
	 */
	deprecatedReRender: function(index, container) {
		this.rendering = true;
		this.fireEvent("beforeRerender", this);
		var wrapEl = this.getWrapEl();
		var wrapDom = wrapEl ? wrapEl.dom : {};
		var prevNode = wrapDom.previousSibling;
		var ownerCt = this.ownerCt;
		var ownerCtEl = ownerCt ? ownerCt.getRenderToEl(this) : null;
		let containerEl;
		if (container) {
			containerEl = container.dom;
		} else {
			containerEl = ownerCt ? ownerCtEl.dom : wrapDom.parentNode;
		}
		var insertPosition = "beforeend";
		var referenceNode = containerEl;
		var visibleNodes = [];
		if (index != null) {
			if (index < 0) {
				throw Terrasoft.ArgumentNullOrEmptyException();
			}
			if (container) {
				if (index === 0) {
					insertPosition = "afterbegin";
				} else {
					visibleNodes = Terrasoft.getVisibleDomItems(containerEl.childNodes, [wrapDom]);
					referenceNode = visibleNodes[index - 1];
					insertPosition = "afterend";
				}
			} else {
				if (index === 0) {
					prevNode = null;
				} else {
					visibleNodes = Terrasoft.getVisibleDomItems(containerEl.childNodes, [wrapDom]);
					prevNode = visibleNodes[index - 1];
				}
				if (prevNode === wrapDom) {
					prevNode = prevNode.nextSibling;
				}
			}
		}
		if (!container) {
			referenceNode = (prevNode == null) ? containerEl : prevNode;
			insertPosition = (prevNode == null) ? "afterbegin" : "afterend";
		}
		this.clearDomListeners();
		this.removeElementsBySelectors();
		var html = this.generateHtml();
		Ext.DomHelper.insertHtml(insertPosition, referenceNode, html);
		this.fireEvent("afterrerender", this, containerEl);
	},

	/**
	 * The event handler {@link #beforererender beforererender} of the parent component.
	 * In the method, the component signs off from the DOM events and destroys the view.
	 */
	onOwnerCtBeforeRerender: function() {
		this.fireEvent("beforererender", this);
		if (this.rendered) {
			this.clearDomListeners();
			this.removeElementsBySelectors();
			this.rendered = false;
		}
	},

	/**
	 * The event handler {@link #afterrender afterrender} and the {@link #afterrerender afterrerender} of the parent
	 * component. The method starts its own rendering events to start the mechanism {@link # selectors of selectors},
	 * in order for the component to generate links to its DOM elements after the rendering.
	 * @param {String} eventName The name of the event to be processed.
	 */
	onOwnerCtAfterRenderOrAfterRerender: function(eventName) {
		if (this.rendering !== true) {
			return;
		}
		if (!this.visible) {
			return;
		}
		var ownerCtEl = this.ownerCt.getWrapEl();
		this.fireEvent(eventName, this, ownerCtEl);
	},

	/**
	 * The method is called by the {@link Terrasoft.Container} container into which the component is added.
	 * In the method, a subscription to container rendering events is performed to start its rendering events.
	 * If the container is rendered, the {@link #render render ()} method is called.
	 * The reference to the handler object of the parent component is also stored.
	 * @param {Terrasoft.Container} ownerCt The container in which the component was added.
	 * @protected
	 */
	added: function(ownerCt) {
		this.ownerCt = ownerCt;
		this.fireEvent("added", this, ownerCt);
		this.ownerCtListeners = ownerCt.on({
			beforererender: this.onOwnerCtBeforeRerender,
			afterrender: {
				fn: this.onOwnerCtAfterRenderOrAfterRerender.bind(this, "afterrender"),
				scope: this
			},
			afterrerender: this.onOwnerCtAfterRenderOrAfterRerender.bind(this, "afterrerender"),
			scope: this,
			destroyable: true
		});
		if (ownerCt.rendered === true) {
			var index = ownerCt.indexOf(this);
			var renderEl = ownerCt.getRenderToEl(this);
			this.render(renderEl, index);
		}
	},

	/**
	 * The method is called by the {@link Terrasoft.Container} container from which the component is removed.
	 * In the method, there is an unsubscription from the container rendering events and a nulling
	 * of the {@link #ownerCt} property.
	 * @protected
	 */
	removed: function() {
		this.ownerCt = null;
		var ownerCtListeners = this.ownerCtListeners;
		ownerCtListeners.destroy();
	},

	/**
	 * In the method, the component's rendering template is prepared to generate HTML markup.
	 * Because for the work of the {@link Ext.XTemplate Ext.XTemplate} class it is necessary that all the
	 * inline functions used in the template are in the instance of the Ext.XTemplate object, then there is a link
	 * to these functions from the template parameter object, tplData.
	 * @param {Ext.XTemplate} tpl Rendering Template
	 * @param {Object} tplData Template parameter object
	 * @protected
	 */
	prepareTpl: function(tpl, tplData) {
		for (var propertyName in tplData) {
			if (!tplData.hasOwnProperty(propertyName)) {
				continue;
			}
			var property = tplData[propertyName];
			if (Ext.isFunction(property)) {
				tpl[propertyName] = property;
			}
		}
	},

	/**
	 * The method destroys the control. The component is removed from the component manager, all subscribers
	 * are deleted, both for the component and for the DOM elements. All DOM elements are deleted.
	 * @override
	 */
	onDestroy: function() {
		var ownerCt = this.ownerCt;
		if (ownerCt) {
			ownerCt.remove(this);
			this.ownerCt = null;
			this.ownerCtListeners.destroy();
		}
		this.fireEvent("destroy", this);
		this.mixins.bindable.destroy.call(this);
		this.mixins.expandableTip.destroy.call(this);
		Terrasoft.ComponentManager.unregister(this);
		this.clearListeners();
		if (this.rendered) {
			this.clearDomListeners();
			this.removeElementsBySelectors();
		}
		this.rendered = false;
		this.callParent(arguments);
		if (this.mutationObserver) {
			this.mutationObserver.disconnect();
		}
	},

	/**
	 * The method returns a reference to the DOM element wrapper component (see {@link #wrapEl wrapEl}).
	 * @return {Ext.dom.Element}
	 */
	getWrapEl: function() {
		return this.wrapEl;
	},

	/**
	 * The method starts the rendering of the control.
	 * @param {Ext.dom.Element} container A reference to the Ext.Element where the component will be rendered.
	 * If the parameter is not specified, an exception will be thrown.
	 * @param {Number} [index] The rendering position. Indicates optional.
	 */
	render: function(container, index) {
		if (!container) {
			throw new Terrasoft.ArgumentNullOrEmptyException();
		}
		if (!container.dom) {
			throw new Terrasoft.UnsupportedTypeException();
		}
		if (this.rendered === true) {
			var messageTemplate = Terrasoft.Resources.Controls.Component.ComponentIsAlreadyRendered;
			var errorMessage = Terrasoft.getFormattedString(messageTemplate, this.id);
			this.log(errorMessage, Terrasoft.LogMessageType.ERROR);
			return;
		}
		if (this.visible !== true) {
			return;
		}
		var containerDom = container.dom;
		var html = this.generateHtml();
		var insertPosition = "beforeend";
		var referenceNode = containerDom;
		if (index != null) {
			if (index < 0) {
				throw Terrasoft.ArgumentNullOrEmptyException();
			}
			if (index === 0) {
				referenceNode = containerDom;
				insertPosition = "afterbegin";
			} else {
				var nodes = containerDom.childNodes;
				referenceNode = nodes[index - 1];
				insertPosition = "afterend";
				if (!referenceNode) {
					if (nodes.length === 0) {
						referenceNode = containerDom;
						insertPosition = "afterbegin";
					} else {
						referenceNode = nodes[nodes.length - 1];
					}
				}
			}
		}
		Ext.DomHelper.insertHtml(insertPosition, referenceNode, html);
		this.fireEvent("afterrender", this, container);
	},

	/**
	 * The method returns the HTML markup of the control.
	 * @return {String}
	 */
	generateHtml: function() {
		if (this.visible !== true) {
			return "";
		}
		var generateHtml = [];
		this.rendering = true;
		var renderConfig = this.generateRenderConfig();
		renderConfig.tpl.applyOut(renderConfig.tplData, generateHtml);
		return generateHtml.join("");
	},

	/**
	 * Returns owner component property name.
	 * @return {String} Owner component property name.
	 */
	getOwnerCtViewItemsPropertyName: function() {
		return this.ownerCtPropertyName;
	},

	/**
	 * Sets owner component property name.
	 * @param {String} value Owner component property name.
	 */
	setOwnerCtViewItemsPropertyName: function(value) {
		this.ownerCtPropertyName = value;
	},

	/**
	 * Sets dom attributes.
	 * @param {Object} attributes Dom attributes.
	 */
	setDomAttributes: function(attributes) {
		if (attributes && !Ext.isEmpty(attributes["data-item-marker"])) {
			throw new Terrasoft.InvalidOperationException();
		}
		var attributesToSet = {};
		Terrasoft.each(Object.keys(this.domAttributes || {}), function(attribute) {
			attributesToSet[attribute] = undefined;
		}, this);
		Ext.apply(attributesToSet, attributes);
		this.domAttributes = attributes;
		if (this.wrapEl) {
			this.wrapEl.set(attributesToSet);
		}
	},

	/**
	 * Sets inline styles to wrapper.
	 * @param {Object} styles Style attributes.
	 */
	setWrapStyle: function(styles) {
		if (Ext.isObject(styles)) {
			this.styles = Ext.apply(this.styles || {}, {
				wrapStyle: styles
			});
			this.safeRerender();
		}
	},

	/**
	 * Returns dom attributes.
	 * @return {Object} Returns dom attributes/
	 */
	getDomAttributes: function() {
		return this.domAttributes;
	},

	/**
	 * The method enables or disables the control.
	 * @param {Boolean} enabled
	 */
	setEnabled: function(enabled) {
		if (this.enabled === enabled) {
			return;
		}
		this.enabled = enabled;
		var disabledClass = this.disabledClass;
		var wrapEl = this.getWrapEl();
		if (wrapEl && disabledClass && this.rendered) {
			if (enabled) {
				wrapEl.removeCls(disabledClass);
			} else {
				wrapEl.addCls(disabledClass);
			}
		}
		this.fireEvent("enabledchanged", enabled, this);
	},

	/**
	 * Calculate text direction and update direction property.
	 * @protected
	 * @param {String} text Text for which it is necessary to calculate the direction.
	 */
	updateDirection: function(text) {
		var direction = Terrasoft.getTextDirection(text);
		this.direction = direction;
	},

	/**
	 * Checks the visibility of a component based on its parent elements.
	 * @return {Boolean}
	 */
	isVisible: function() {
		if (this.visible === false || this.rendered === false) {
			return false;
		}
		if (this.ownerCt && !this.ownerCt.isVisible()) {
			return false;
		}
		var wrapEl = this.getWrapEl();
		return wrapEl.isVisible(true);
	},

	/**
	 * Hides or shows the control.
	 * If the component was hidden and un-rendered, then when the component.setVisible (true) is called for the control,
	 * rendering is started.
	 * @param {Boolean} visible
	 */
	setVisible: function(visible) {
		if (this.visible === visible) {
			return;
		}
		this.visible = visible;
		if (visible === true) {
			var ownerCt = this.ownerCt;
			var container;
			var index = null;
			if (ownerCt) {
				container = ownerCt.getRenderToEl(this);
				index = ownerCt.indexOf(this);
			} else {
				container = this.renderTo;
			}
			if (this.rendered === false) {
				if (container) {
					if (index === -1) {
						index = null;
					}
					this.render(container, index);
				}
			} else {
				this.reRender();
			}
		} else if (this.rendered === true) {
			var wrapEl = this.getWrapEl();
			if (wrapEl) {
				wrapEl.dom.style.display = (visible ? "" : "none");
			}
		}
		this.fireEvent("visiblechanged", this, visible);
	},

	/**
	 * The method returns a reference to the DOM element where the elements will be displayed.
	 * @return {Ext.dom.Element}
	 */
	getRenderToEl: function() {
		return this.getWrapEl();
	},

	/**
	 * The method returns a reference to the DOM element where the elements will be displayed.
	 * {@link #setMarkerValue}.
	 * @param {String} markerValue Marker value.
	 */
	setMarkerValue: function(markerValue) {
		if (this.markerValue === markerValue) {
			return;
		}
		this.markerValue = markerValue;
		if (this.rendered) {
			this.addWrapAttr();
		}
	},

	/**
	 * The method displays or hides the mask.
	 * The method uses the static class Terrasoft.Mask. The mask identifier is stored in the maskId property.
	 * The mask is superimposed on the element returned by the {@link #getMaskEl} method.
	 * The mask configuration is generated using the {@link #getMaskConfig} method.
	 * @param {Boolean} maskVisible
	 */
	setMaskVisible: function(maskVisible) {
		if (this.maskVisible === maskVisible || !this.rendered) {
			// TODO #CRM-30568 Fix mask visibility after component render
			return;
		}
		this.maskVisible = maskVisible;
		if (maskVisible) {
			var maskConfig = this.getMaskConfig();
			this.maskId = Terrasoft.Mask.show(maskConfig);
		} else {
			Terrasoft.Mask.hide(this.maskId);
			this.maskId = null;
		}
	},

	/**
	 * Returns the element for masking.
	 * @protected
	 * @return {Ext.dom.Element}
	 */
	getMaskEl: function() {
		return this.getWrapEl();
	},

	/**
	 * Returns an object mask configuration to be applied to the component. Used by method
	 * {@link #setMaskVisible}. Selector generates method {@link #getMaskEl}.
	 * @protected
	 * @return {Object}
	 * - **selector** String: Selector DOM-element
	 * - **caption** String: Header
	 */
	getMaskConfig: function() {
		var maskEl = this.getMaskEl();
		var maskConfig = {
			selector: "#" + maskEl.id,
			caption: "",
			frameVisible: false
		};
		if (this.maskTimeout !== null) {
			maskConfig.timeout = this.maskTimeout;
		}
		return maskConfig;
	},

	/**
	 * Validates binding context.
	 * @param {Terrasoft.BaseViewModel} model Model.
	 */
	validateBindingContext: function(model) {
		if (this.className !== "Terrasoft.controls.Component" && this.model !== model) {
			this.log(Terrasoft.Resources.Controls.Component.BindingContextWarningMessage);
		}
	},

	/**
	 * Binds the control to the model.
	 * Initializes the property with initial data and subscribes to changes to the corresponding properties
	 * or methods of the model.
	 * For correct bindingContext use this.model instead of model argument for item bindings.
	 * @param {Terrasoft.BaseViewModel} model Model.
	 */
	bind: function(model) {
		this.mixins.bindable.bind.call(this, model);
		this.mixins.expandableTip.bind.call(this, this.model);
		this.validateBindingContext(model);
	},

	/**
	 * Clears timer by it's name.
	 * @param {String} timerName Name of the timer.
	 * @return {Boolean} True, if timer was active.
	 */
	clearTimer: function(timerName) {
		var timerId = this[timerName];
		if (timerId) {
			clearTimeout(timerId);
			this[timerName] = null;
		}
		return Boolean(timerId);
	},

	/**
	 * Checks whether the event target is a children of component dom.
	 * @param {Event} event Event to checks.
	 * @return {Boolean} True in the case of a positive result.
	 */
	isEventWithin: function(event) {
		var result = false;
		var wrapEl = this.getWrapEl();
		if (wrapEl) {
			result = event.within(wrapEl);
		}
		return result;
	}

});
