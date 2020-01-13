/**
 */
Ext.define("Terrasoft.manager.ProcessBaseElementSchema", {
	extend: "Terrasoft.configuration.BaseProcessSchemaElement",
	alternateClassName: "Terrasoft.ProcessBaseElementSchema",

	//region Properties: Private

	/**
	 * Actual element schema name.
	 * @private
	 * @type {String}
	 */
	realName: null,

	//endregion

	//region Properties: Protected

	/**
	 * Technical property for old designer compatibility.
	 * @protected
	 * @type {String}
	 */
	dragGroupName: null,

	/**
	 * Technical property for old designer compatibility.
	 * @protected
	 * @type {Number}
	 */
	containerItemIndex: 0,

	/**
	 * Manager item identifier.
	 * @protected
	 * @type {String}
	 */
	managerItemUId: null,

	/**
	 * Created in schema owner identifier. For old designer compatibility.
	 * @protected
	 * @type {String}
	 */
	createdInOwnerSchemaUId: null,

	/**
	 * Schema manager name for get schema in which element was created. For embeded processes.
	 * For old designer compatibility.
	 * @protected
	 * @type {String}
	 */
	ownerSchemaManagerName: null,

	/**
	 * Offset X on old designer.
	 * @protected
	 * @type {Number}
	 */
	silverlightOffsetX: 0,

	/**
	 * Offset Y on old designer.
	 * @protected
	 * @type {Number}
	 */
	silverlightOffsetY: 0,

	/**
	 * Node type.
	 * @protected
	 * @type {Terrasoft.diagram.UserHandlesConstraint}
	 */
	nodeType: null,

	/**
	 * Elements group.
	 * @protected
	 * @type {Terrasoft.core.enums.FlowElementGroup}
	 */
	group: null,

	/**
	 * Element name.
	 * @type {String}
	 */
	name: null,

	/**
	 * Font size.
	 * @protected
	 * @type {Number}
	 */
	fontSize: 13,

	/**
	 * Execution count icon font size.
	 * @protected
	 * @type {Number}
	 */
	executionCountFontSize: 13,

	/**
	 * Execution count icon fill color.
	 * @protected
	 * @type {String}
	 */
	executionCountFillColor: "#6dc9f4",

	/**
	 * Execution count icon font color.
	 * @protected
	 * @type {String}
	 */
	executionCountFontColor: "#fff",

	/**
	 * Execution count icon label tag.
	 * @protected
	 * @type {String}
	 */
	executionCountLabelTag: Terrasoft.diagram.labelBackgroundTag.ELLIPSE,

	/**
	 * Execution count icon label padding.
	 * @protected
	 * @type {Number}
	 */
	executionCountLabelPadding: 2.5,

	/**
	 * Font family.
	 * @protected
	 * @type {String}
	 */
	fontFamily: "'Bpmonline Open Sans', serif",

	/**
	 * Font color.
	 * @protected
	 * @type {String}
	 */
	fontColor: "#444444",

	/**
	 * Caption background color.
	 * @protected
	 * @type {String}
	 */
	captionBackcolor: "rgba(255, 255, 255, 0)",

	/**
	 * Caption fill color.
	 * @protected
	 * @type {String}
	 */
	captionFillColor: "rgba(255,255,255,0)",

	/**
	 * Caption width in pixels.
	 * @protected
	 * @type {Number}
	 */
	captionWidth: 120,

	/**
	 * Max caption width in pixels.
	 * @protected
	 * @type {Number}
	 */
	maxLengthCaption: 51,

	/**
	 * Element position.
	 * @protected
	 * @type {Object}
	 */
	position: "0;0",

	/**
	 * Horizontal offset.
	 * @protected
	 * @type {Number}
	 */
	offsetX: 0,

	/**
	 * Vertical offset.
	 * @protected
	 * @type {Number}
	 */
	offsetY: 0,

	/**
	 * Use empty caption when adding element to diagram.
	 * @protected
	 * @type {Boolean}
	 */
	emptyDiagramCaption: false,

	/**
	 * Element type caption.
	 * @protected
	 * @type {String}
	 */
	typeCaption: null,

	/**
	 * Image resource manager name.
	 * @protected
	 * @type {String}
	 */
	resourceManagerName: "Terrasoft.Nui",

	/**
	 * Small image name.
	 * @protected
	 * @type {String}
	 */
	smallImageName: "",

	/**
	 * Large image name.
	 * @protected
	 * @type {String}
	 */
	largeImageName: "",

	/**
	 * Title properties page image name.
	 * @protected
	 * @type {String}
	 */
	titleImageName: "",

	/**
	 * Element color.
	 * @protected
	 * @type {String}
	 */
	color: "#839DC3",

	/**
	 * Tools edit constraint.
	 * @type {[type]}
	 */
	toolsConstraint: 0,

	/**
	 * Show properties window on adding in collection.
	 * @type {Boolean}
	 */
	showPropertiesWindowOnAdding: false,

	/**
	 * Prevent show properties window on adding.
	 * @type {Boolean}
	 */
	preventShowPropertiesWindowOnAdding: false,

	/**
	 * Element executed count on process log diagram.
	 * @type {Number}
	 */
	executedCount: 0,

	/**
	 * Mode of use.
	 * @protected
	 * @type {Terrasoft.ProcessSchemaUsageType}
	 */
	usageType: null,

	/**
	 * Default element caption.
	 * @protected
	 * @type {String}
	 */
	defaultCaption: null,

	/**
	 * Not valid element unicode symbol.
	 * @protected
	 * @type {String}
	 */
	notValidCaptionPrefix: "\u2691",

	/**
	 * Not valid element caption font color.
	 * @protected
	 * @type {String}
	 */
	notValidCaptionFontColor: "#F15440",

	/**
	 * Validation information display value.
	 * @protected
	 * @type {String}
	 */
	validationInfoCaption: null,

	/**
	 * Indicates whether the current element is used background mode.
	 * @protected
	 * @type {Boolean}
	 */
	useBackgroundMode: false,

	//endregion

	//region Constructors: Public

	/**
	 * @inheritdoc Terrasoft.manager.BaseObject#constructor
	 * @override
	 */
	constructor: function() {
		this.defaultCaption = this.caption;
		this.callParent(arguments);
		if (this.position) {
			this.position = this.parsePoint(this.position);
		}
		this.typeCaption = this.getTypeCaption();
		if (this.emptyDiagramCaption) {
			this.caption.setValue("");
		}
	},

	//endregion

	//region Methods: Private

	/**
	 * Returns element type caption.
	 * @private
	 * @return {String} Element type caption.
	 */
	getTypeCaption: function() {
		var caption = this.caption || "";
		if (typeof caption.getValue === "function") {
			caption = caption.getValue();
		}
		return caption;
	},

	//endregion

	//region Methods: Protected

	/**
	 * Returns element image config.
	 * @protected
	 * @param {String} imageName Image name.
	 * @return {Object} Element image config.
	 */
	getImageConfig: function(imageName) {
		return {
			source: Terrasoft.ImageSources.RESOURCE_MANAGER,
			params: {
				resourceManagerName: this.resourceManagerName,
				resourceItemName: "ProcessSchemaDesigner." + imageName
			}
		};
	},

	/**
	 * Returns small image config.
	 * @protected
	 * @return {Object} Element image config.
	 */
	getSmallImage: function() {
		return this.getImageConfig(this.smallImageName);
	},

	/**
	 * Returns large image config.
	 * @protected
	 * @return {Object} Element image config.
	 */
	getLargeImage: function() {
		return this.getImageConfig(this.largeImageName);
	},

	/**
	 * Returns title properties page image config.
	 * @protected
	 * @return {Object} Element image config.
	 */
	getTitleImage: function() {
		return this.getImageConfig(this.titleImageName);
	},

	/**
	 * Returns element display config.
	 * @param {Object} config Additional config properties.
	 * @return {Object} Display element config.
	 */
	getDiagramConfig: function(config) {
		var caption = this.caption || "";
		if (typeof caption.getValue === "function") {
			caption = caption.getValue();
		}
		var nodeConfig = {
			name: this.name,
			caption: caption || "",
			nodeType: this.nodeType,
			tag: this.uId,
			offsetX: this.position ? this.position.X + this.width / 2 : 0,
			offsetY: this.position ? this.position.Y + this.height / 2 : 0
		};
		if (this.executedCount > 0) {
			nodeConfig.labels = [
				{
					name: this.name + "_execCount_label",
					text: this.executedCount.toString(),
					textAlign: ej.Diagram.TextAlign.Center,
					verticalAlignment: ej.Diagram.VerticalAlignment.Center,
					fillColor: this.executionCountFillColor,
					fontColor: this.executionCountFontColor,
					fontSize: this.executionCountFontSize,
					fontFamily: this.fontFamily,
					tag: this.executionCountLabelTag,
					offset: ej.Diagram.Point(0, 0),
					padding: this.executionCountLabelPadding,
					labelType: Terrasoft.LabelType.STATISTIC_INFO
				}
			];
		}
		nodeConfig = Ext.apply(nodeConfig, config);
		return nodeConfig;
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableObject
	 * @override
	 */
	getSerializableObject: function(serializableObject) {
		this.callParent(arguments);
		serializableObject.name = this.getSerializableProperty(this.getName());
		serializableObject.position = this.getSerializablePosition();
	},

	/**
	 * @inheritdoc Terrasoft.manager.BaseSchema#getSerializableProperties
	 * @override
	 */
	getSerializableProperties: function() {
		var baseSerializableProperties = this.callParent(arguments);
		return Ext.Array.push(baseSerializableProperties, ["containerItemIndex",
			"dragGroupName", "managerItemUId", "createdInOwnerSchemaUId"]);
	},

	/**
	 * Returns serialized Position property.
	 * @private
	 * @return {Object}
	 */
	getSerializablePosition: function() {
		var position = this.position;
		var positionString = "0;0";
		if (position) {
			positionString = Terrasoft.serializeObject({
				source: position,
				properties: ["X", "Y"],
				format: "{X};{Y}",
				valueConverter: function(value) {
					var integerValue = parseInt(value, 10);
					return integerValue || 0;
				}
			});
		}
		return this.getSerializableProperty(positionString);
	},

	/**
	 * Performs string parsing point coordinates of the form x_value;y_value to an object.
	 * @param {string} pointString Point string.
	 * @protected
	 * @return {{X: Number Horizontal coordinate, Y: Number Vertical coordinate}}
	 */
	parsePoint: function(pointString) {
		var result = this.parseValuePairString(pointString);
		return {
			X: result[0],
			Y: result[1]
		};
	},

	/**
	 * Returns the value of parsed string of the form 'value1;value2' in the form of an array of values.
	 * @param {String} str String to parse.
	 * @return {Number[]} Parsed values.
	 * @protected
	 */
	parseValuePairString: function(str) {
		var positionRe = /\s*(-?\d+)\s*;\s*(-?\d+)\s*/;
		var result = positionRe.exec(str);
		return [
			parseInt(result[1], 10),
			parseInt(result[2], 10)
		];
	},

	/**
	 * Returns object JSON view for sending to server ProcessSchemaDesigner aspx-page.
	 * @return {Object} View config.
	 */
	getUIJsonData: function() {
		var serializableObject = {};
		this.getSerializableObject(serializableObject);
		this.setSerializableProperty(serializableObject, "caption");
		return {
			Id: serializableObject.uId,
			Name: serializableObject.name,
			Caption: serializableObject.caption,
			Position: serializableObject.position,
			ContainerUId: serializableObject.containerUId
		};
	},

	/**
	 * Subscribes on changed event.
	 * @param {Function} handler Event handler.
	 * @param {Object} scope Execution context.
	 */
	subscribeOnChangedEvent: function(handler, scope) {
		this.on("changed", handler, scope);
	},

	/**
	 * Unsubscribes on changed event.
	 * @param {Function} handler Event handler.
	 * @param {Object} scope Execution context.
	 */
	unsubscribeOnChangedEvent: function(handler, scope) {
		this.un("changed", handler, scope);
	},

	//endregion

	//region Methods: Public

	/**
	 * Returns flag that indicates whether process with this item require compilation.
	 * @return {Boolean} True if process must be compiled, else false.
	 */
	requireCompilation: function() {
		return false;
	},

	/**
	 * Returns label text for element.
	 * @param {String} caption Element caption.
	 * @param {Boolean} isValid Element validation state.
	 * @return {String} Label text for element.
	 */
	getLabelText: function(caption, isValid) {
		var labelText = caption && caption.toString() || "";
		return isValid ? labelText : this.notValidCaptionPrefix + " " + labelText;
	},

	/**
	 * Returns label font color for element.
	 * @param {Boolean} isValid Element validation state.
	 * @return {String} Label font color for element.
	 */
	getLabelFontColor: function(isValid) {
		return isValid ? this.fontColor : this.notValidCaptionFontColor;
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchema#getPackageUId
	 * @override
	 */
	getPackageUId: function() {
		return this.parentSchema.getPackageUId();
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchema#setName
	 * @override
	 */
	setName: function(name) {
		if (this.name !== name) {
			this.setPropertyValue("realName", name);
		}
	},

	/**
	 * @inheritdoc Terrasoft.BaseSchema#getName
	 * @override
	 */
	getName: function() {
		return this.realName || this.name;
	}

	//endregion

});
