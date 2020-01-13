Terrasoft.configuration.Structures["WizardStepsControl"] = {innerHierarchyStack: ["WizardStepsControl"]};
/**
 * @class Terrasoft.controls.WizardStepsControl
 * ##### ######## ########## ##### #######.
 */
Ext.define("Terrasoft.controls.WizardStepsControl", {
	extend: "Terrasoft.AbstractContainer",
	alternateClassName: "Terrasoft.WizardStepsControl",

	/**
	 * ######### ##### #######.
	 * @type {Array}
	 */
	wizardSteps: null,

	/**
	 * ####### ### #######.
	 * @type {Number}
	 */
	currentStep: null,

	/**
	 * ### ####### ############# ### ##########.
	 * @type {Number}
	 */
	passedStep: null,

	/**
	 * CSS ##### ####### ######## ##########.
	 * @type {String}
	 */
	wrapClass: "wizard-steps",

	/**
	 * CSS ##### ####.
	 * @type {String}
	 */
	stepClass: "step-item",

	/**
	 * CSS ##### ######## ####.
	 * @type {String}
	 */
	currentStepClass: "step-current",

	/**
	 * CSS ##### ########### ####.
	 * @type {String}
	 */
	passedStepClass: "step-passed",

	/**
	 * @inheritdoc Terrasoft.Component#classes
	 */
	classes: null,

	/**
	 * @inheritdoc Terrasoft.Component#tpl
	 * @overriden
	 */
	tpl: [
		// jscs:disable validateQuoteMarks
		/*jshint quotmark: false */
		'<div id="{id}-wrap" class="{wrapClass}">',
		'{%this.renderItems(out, values)%}',
		'</div>'
		/*jshint quotmark: true */
		// jscs:enable validateQuoteMarks
	],

	/**
	 * @inheritdoc Terrasoft.Component#getTplData
	 * @overriden
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.selectors.wrapEl = "#" + this.id + "-wrap";
		var itemsTplData = {
			wrapClass: [this.wrapClass]
		};
		Ext.apply(itemsTplData, tplData, {});
		return itemsTplData;
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#init
	 * @overriden
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event
			 * ####### ########### ##### ######### ######## ####.
			 * @param {Number} currentStep ####### ##### ####.
			 * @param {Terrasoft.WizardStepsControl} this
			 */
			"afterStepChange",
			/**
			 * @event
			 * ####### ########### ## ######### ######## ####.
			 * @param {Number} currentStep ####### ##### ####.
			 * @param {Number} newStep ##### ##### ####.
			 * @param {Terrasoft.WizardStepsControl} this
			 */
			"beforeStepChange"
		);
		this.selectors = {
			wrapEl: ""
		};
	},

	/**
	 * @inheritdoc Terrasoft.Component#getBindConfig
	 * @overriden
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var buttonBindConfig = {
			currentStep: {
				changeEvent: "afterStepChange",
				changeMethod: "setStep"
			},
			passedStep: {
				changeMethod: "setPassedStep"
			}
		};
		Ext.apply(buttonBindConfig, bindConfig);
		return buttonBindConfig;
	},

	/**
	 * @inheritDoc Terrasoft.Component#constructor
	 * @overriden
	 */
	constructor: function(config) {
		this.wrapClass = config.wrapClass || this.wrapClass;
		this.wizardSteps = config.wizardSteps || [];
		Terrasoft.each(this.wizardSteps, function(item, index) {
			item.tplData = {
				clienIndex: index + 1,
				caption: item.caption,
				scope: this,
				generateStepClasses: this.generateStepClasses,
				generateStepStyles: this.generateStepStyles,
				totalSteps: this.wizardSteps.length
			};
		}, this);
		this.callParent(arguments);
	},

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#initItems
	 * @overriden
	 */
	initItems: function() {
		this.callParent(arguments);
		Terrasoft.each(this.wizardSteps, function(step, index) {
			var parentSelector = this.id;
			var wrapElId = parentSelector + "-" + index;
			var stepEl = Ext.create("Terrasoft.Button", {
				tpl: [
					// jscs:disable validateQuoteMarks
					/*jshint quotmark: false */
					'<div id="{id}-textEl" class="{%this.generateStepClasses(out, values)%}" style="{textStyle}">',
					'<div class="step-icon" style="{%this.generateStepStyles(out, values)%}" >',
					'<div class="step-index">{clienIndex}</div>',
					'</div>',
					'<div class="step-caption">{caption}</div>',
					'<tpl if="clienIndex &lt; totalSteps">',
					'<div class="step-connector"></div>',
					'</tpl>',
					'</div>'
					/*jshint quotmark: true */
					// jscs:enable validateQuoteMarks
				],
				selectors: {
					wrapEl: "#" + wrapElId
				},
				caption: step.tplData.clienIndex,
				tag: step.tplData.clienIndex,
				tplData: step.tplData
			});
			stepEl.on("click", this.onStepClick, this);
			this.items.add(stepEl);
		}, this);
	},

	/**
	 * Generates styles for the step.
	 * @protected
	 * @param {Array} buffer HTML markup of the control.
	 * @param {Object} data The parameter object of the control's rendering template.
	 */
	generateStepStyles: function(buffer, data) {
		var controlScope = data.self.tplData.scope;
		var clientIndex = data.self.tag;
		if (clientIndex <= controlScope.passedStep) {
			var imgConf = {
				source: Terrasoft.ImageSources.SOURCE_CODE_SCHEMA,
				params: {
					schemaName: "WizardStepsControl",
					resourceItemName: "WizardStepPassed"
				}
			};
			var imgUrl = Terrasoft.ImageUrlBuilder.getUrl(imgConf);
			var bgUrl = "background-image: url(" + imgUrl + "); ";
			var bgRpt = "background-repeat: no-repeat; ";
			var bgPos = "background-position: center; ";
			buffer.push(bgUrl);
			buffer.push(bgRpt);
			buffer.push(bgPos);
		}
	},

	/**
	 * ############# ####### ### ### ######## ##########.
	 * @protected
	 * @param {Number} value ##### ####.
	 * @return {Boolean} True, #### ########## ######## ## ######### # #######.
	 */
	setStep: function(value) {
		value = value || 0;
		value = value > this.wizardSteps.length ? 0 : value;
		if (value === 0) {
			return;
		}
		var isChanged = this.changeValue(value);
		if (this.allowRerender()) {
			this.reRender();
		}
		return isChanged;
	},

	/**
	 * ############# ########## ### ### ######## ##########.
	 * @protected
	 * @param {Number} value ##### ####.
	 */
	setPassedStep: function(value) {
		value = value || 0;
		if (this.passedStep === value) {
			return;
		}
		this.passedStep = value;
		if (this.allowRerender()) {
			this.reRender();
		}
	},

	/**
	 * ######## ######## ######## ####. ########## ####### beforeStepChange, #### ######### true ###########
	 * ######### ###### ########. ##### ######### ########, ########## ####### afterStepChange.
	 * @protected
	 * @param {String} value ##### ####.
	 * @return {Boolean} true - #### ######## ##########, # ######### ###### - false.
	 */
	changeValue: function(value) {
		var isChanged = (value !== this.currentStep);
		if (!isChanged) {
			return false;
		}
		var canChange = this.fireEvent("beforeStepChange", this.currentStep, value, this);
		canChange = Ext.isEmpty(canChange) ? true : canChange;
		if (canChange) {
			this.currentStep = value;
			this.setMarkerValue(value);
			this.fireEvent("afterStepChange", value, this);
			return true;
		}
		return false;
	},

	/**
	 * ########## ###### ## ######## DOM-####### ########## (##. {@link #el el}).
	 * @return {Ext.Element}
	 */
	getEl: function() {
		return this.el;
	},

	/**
	 * ########## CSS ##### ### ###### ####.
	 * @protected
	 * @param {Array} buffer HTML-######## ######## ##########.
	 * @param {Object} data ###### ########## ####### ########## ######## ##########.
	 */
	generateStepClasses: function(buffer, data) {
		var controlScope = data.self.tplData.scope;
		var clientIndex = data.self.tag;
		var html = controlScope.stepClass;
		html += controlScope.currentStep === clientIndex ? " " + controlScope.currentStepClass : "";
		html += clientIndex <= controlScope.passedStep ? " " + controlScope.passedStepClass : "";
		buffer.push(html);
	},

	/**
	 * ########## ####### ##### ## ###### ####.
	 * @protected
	 * @param {Terrasoft.Button} stepControl ####### ########## ###### ####.
	 */
	onStepClick: function(stepControl) {
		var newStepIndex = stepControl.tag;
		this.setStep(newStepIndex);
	}

});


