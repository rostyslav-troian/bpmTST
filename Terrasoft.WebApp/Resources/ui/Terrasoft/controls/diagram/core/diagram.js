/**
 * The class implements the display of a collection of diagram elements and sequence flows .
 */
Ext.define("Terrasoft.controls.Diagram", {
	extend: "Terrasoft.Container",
	alternateClassName: "Terrasoft.Diagram",

	mixins: {
		connectorRemoval: "Terrasoft.ConnectorRemovalMixin"
	},

	statics: {

		/**
   * List of overlapped methods ej.Diagram
   * @type {object}
   */
		custom: {}

	},

	/**
  * Collection of items
  * @type {Terrasoft.Collection}
  */
	items: null,

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#initItems
	 * @override
	 */
	initItems: Ext.emptyFn,

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#prepareItems
	 * @override
	 */
	prepareItems: Ext.emptyFn,

	/**
	 * @inheritdoc Terrasoft.AbstractContainer#destroyItems
	 * @override
	 */
	destroyItems: Ext.emptyFn,

	/**
  * Minimum chart height
  * @type {Number}
  */
	minHeight: 300,

	/**
  * Enables autoscrolling from the chart container
  * @type {Boolean}
  */
	autoScroll: true,

	/**
  * The currently selected item with which the user is working.
  * @type {object}
  */
	selectedItem: null,

	/**
  * Instance of the diagram.
  * @type {ej.Diagram}
  */
	diagram: null,

	/**
  * The initial state of the diagram.
  * @type {object}
  */
	diagramSnap: null,

	/**
  * The initial state of the svg controller.
  * @type {ej.Diagram.SvgContext}
  */
	svgContextSnap: null,

	/**
  * Flag of disabling diagram events.
  * @type {Boolean}
  */
	cancelDiagramEvents: false,

	/**
  * A set of behavior constraints for diagram elements.
  * @type {ej.Diagram.NodeConstraints}
  */
	nodeConstraints: null,

	/**
  * Port configuration for the diagram element
  * @type {Object}
  */
	portDefaultsConfig: null,

	/**
  * Configuring the basic elements of the diagram
  * @type {Object}
  */
	nodeBaseDefaultsConfig: null,
	/**
  * A set of behavior constraints for diagram management flows.
  * @type {ej.Diagram.ConnectorConstraints}
  */
	connectorConstraints: null,

	/**
  * Control flow color
  */
	connectorLineColor: "#A4A4A4",

	/**
  * The color of the selected control flow
  */
	selectionColor: "#E3E9F9",

	/**
  * Color of the port on the control stream
  */
	connectorPortColor: "#5FADEA",

	/**
  * Port radius on the element and control flow
  */
	portRadius: 3.5,

	/**
  * Indents from the boundary of the chart container when autoscrolling is on
  */
	autoScrollBorder: null,

	/**
  * Diagram container Selector
  * @type {String}
  */
	renderToSelector: null,

	/**
  * Diagram container svg selector
  * @type {String}
  */
	svgContainerSelector: null,

	/**
	 * Distance between last right element shape and diagram bottom border.
	 * @type {Number}
	 */
	bottomScrollContentOffset: 0,

	/**
	 * Distance between last right element shape and diagram right border.
	 * @type {Number}
	 */
	rightScrollContentOffset: 0,

	/**
  * The cache of the dimensions of the diagram element. See {@link #getItemBounds}.
  * @private
  * @type {Object[]}
  */
	itemsBounds: null,

	constructor: function() {
		ej.Diagram = ej.datavisualization.Diagram;
		this.svgContextSnap = Terrasoft.deepClone(ej.Diagram.SvgContext);
		this.items = Ext.create("Terrasoft.Collection");
		this.itemsBounds = [];
		this.autoScrollBorder = {
			left: 50,
			top: 50,
			right: 50,
			bottom: 50
		};
		this.nodeBaseDefaultsConfig = {
			constraints: ej.Diagram.NodeConstraints.Delete,
			inputPortCount: 0,
			outputPortCount: 0,
			children: []
		};
		this.portDefaultsConfig = {
			visibility: ej.Diagram.PortVisibility.Connect,
			fillColor: "#FFFFFF",
			shape: ej.Diagram.PortShapes.Circle,
			size: this.portRadius * 2,
			borderColor: this.connectorPortColor,
			borderWidth: 1,
			constraints: ej.Diagram.PortConstraints.Connect
		};
		this.connectorConstraints = ej.Diagram.ConnectorConstraints.Delete |
			ej.Diagram.ConnectorConstraints.DragSourceEnd |
			ej.Diagram.ConnectorConstraints.DragTargetEnd |
			ej.Diagram.ConnectorConstraints.Select;
		this.nodeConstraints = ej.Diagram.NodeConstraints.Select |
			ej.Diagram.NodeConstraints.Drag |
			ej.Diagram.NodeConstraints.Delete |
			ej.Diagram.NodeConstraints.Connect |
			ej.Diagram.NodeConstraints.Shadow;
		this.initUtils();
		this.callParent(arguments);
	},

	/**
  * Initialize diagram utilities.
  * @protected
  */
	initUtils: function() {
		var utils = this.utils = {};
		utils.svg = this.getSvgUtils();
		utils.labelUtils = this.getLabelUtils(utils.svg);
	},

	/**
  * Gets the utility for working with SVG elements.
  * @protected
  * @return {Terrasoft.TsDiagramModule.SvgUtils}
  */
	getSvgUtils: function() {
		return Ext.create("Terrasoft.TsDiagramModule.SvgUtils");
	},

	/**
  * Gets the utility for working with the diagram element labels.
  * @param {Terrasoft.TsDiagramModule.SvgUtils} svgUtils A utility for working with SVG elements.
  * @protected
  * @return {Terrasoft.TsDiagramModule.LabelUtils}
  */
	getLabelUtils: function(svgUtils) {
		return Ext.create("Terrasoft.TsDiagramModule.LabelUtils", {
			svgUtils: svgUtils
		});
	},

	/**
	 * @inheritdoc Terrasoft.controls.Container#tpl
	 */
	tpl: [
		/*jshint white:false */
		"<div id=\"diagram-{id}\" class=\"{wrapClassName}\"></div>"
		/*jshint white:true */
	],

	/**
	 * @inheritdoc Terrasoft.Component#getTplData
	 * @override
	 */
	getTplData: function() {
		var tplData = this.callParent(arguments);
		this.selectors = this.getSelectors();
		return tplData;
	},

	/**
	 * @inheritdoc Terrasoft.Component#getSelectors
	 * @override
	 */
	getSelectors: function() {
		return {
			wrapEl: "#diagram-" + this.id
		};
	},

	/**
  * Ges the state of the diagram
  * @return {jQuery}
  */
	getState: function() {
		var diagram = this.getInstance();
		return diagram.save();
	},

	/**
  * Draws an element on the diagram. The element must be previously added to the diagram, because the method does not
  * register the element.
  * @param {ej.Diagram.Node} item Diagram element.
  * @param {String} parentName The name of the parent element. If the parameter is not set, an error will be generated.
  */
	renderItem: function(item, parentName) {
		var diagram = this.getInstance();
		var svgNode = diagram._svg;
		var parentNode = svgNode.getElementById(parentName);
		if (item.type === "group") {
			ej.Diagram.SvgContext.renderGroup(item, svgNode, parentNode, diagram.nameTable, diagram);
		} else if (item.segments) {
			ej.Diagram.SvgContext.renderConnector(item, svgNode, parentNode);
		} else {
			ej.Diagram.SvgContext.renderNode(item, svgNode, parentNode);
		}
		if (item.isContainer === true) {
			this.iterateItemChildrens(item, function(child) {
				this.renderItem(child, item.name);
			}, this);
		}
	},

	/**
  * Returns the diagram element by its id.
  * @param {String} elementId
  * @return {ej.Diagram.Node}
  */
	getElementById: function(elementId) {
		var diagram = this.getInstance();
		return diagram.findNode(elementId);
	},

	/**
  * Returns the svg element by its identifier.
  * @param {String} id Identifier.
  * @return {SVGElement}
  */
	getSvgElementById: function(id) {
		var diagram = this.getInstance();
		return diagram._svg.getElementById(id);
	},

	/**
  * Adds the css class to the html element passed.
  * @param {HTMLElement} el The element for which you want to add a css class.
  * @param {String []} classes An array of css classes to add.
  */
	addCls: function(el, classes) {
		var classList = el.classList;
		classList.add.apply(classList, classes);
	},

	/**
  * Returns the selected element of the diagram.
  * @return {ej.Diagram.Node}
  */
	getSelectedItem: function() {
		var diagram = this.getInstance();
		return diagram.selectionList[0];
	},

	/**
  * Sorts out all the children of the passed item.
  * @param {ej.Diagram.Node} item The element for which you want to go through child elements.
  * @param {Function} iterator Iterator function.
  * @param {ej.Diagram.Node} iterator.child Child.
  * @param {Number} iterator.index The index of the item in the collection.
  * @param {Object} scope The context for calling the iterator.
  */
	iterateItemChildrens: function(item, iterator, scope) {
		if (item.children) {
			item.children.forEach(function(child, index) {
				if (typeof child === "string") {
					child = this.getElementById(child);
				}
				iterator.call(scope, child, index);
			}, this);
		}
	},

	/**
  * Gets the dimensions and position of the diagram element, taking into account the labels and children.
  * @param {ej.Diagram.Node} item diagram element.
  * @param {Boolean} [updateCache] Cache update flag.
  * @return {Object} The position is returned for the upper-left corner of the element.
  * @return {Number} return.x Shifts the element horizontally.
  * @return {Number} return.y The offset of the element vertically.
  * @return {Number} return.width The width of the element.
  * @return {Number} return.height The height of the element.
  */
	getItemBounds: function(item, updateCache) {
		var itemName = item.name;
		var cachedBounds = this.itemsBounds[itemName];
		if (cachedBounds && updateCache !== true) {
			return cachedBounds;
		}
		var bounds = ej.Diagram.Util.bounds(item);
		var nodeBounds = {
			x: bounds.x,
			y: bounds.y
		};
		item.labels.forEach(function(label) {
			if (label.text) {
				var labelTextEl = this.getSvgElementById(item.name + "_" + label.name);
				if (labelTextEl) {
					var transformValues = this.utils.svg.getSvgElTranslateValues(labelTextEl, ["e", "f"]);
					var bBox = label.bBox;
					if (!bBox) {
						bBox = label.bBox = labelTextEl.getBBox();
					}
					var width = bBox.width;
					var height = bBox.height;
					var x = nodeBounds.x + transformValues.e - width / 2;
					var labelBackgroundEl = this.getSvgElementById(item.name + "_" + label.name + "_lblbg");
					var transformBackgroundValues = this.utils.svg.getSvgElTranslateValues(labelBackgroundEl, ["f"]);
					var y = nodeBounds.y + transformBackgroundValues.f;
					var labelTextElRect = ej.Diagram.Rectangle(x, y, width, height);
					bounds = ej.Diagram.Geometry.union(bounds, labelTextElRect);
				}
			}
		}, this);
		if (item.isContainer === false) {
			this.iterateItemChildrens(item, function(child) {
				var childBounds = this.getItemBounds(child);
				bounds = ej.Diagram.Geometry.union(bounds, childBounds);
			}, this);
		}
		this.itemsBounds[itemName] = bounds;
		return bounds;
	},

	/**
  * Removes the sizes of the element and its parents from the cache.
  * @param {ej.Diagram.Node} item diagram element.
  */
	removeItemBoundsCache: function(item) {
		if (item) {
			delete this.itemsBounds[item.name];
			if (item.parent) {
				var parent = this.getElementById(item.parent);
				this.removeItemBoundsCache(parent);
			}
		}
	},

	/**
  * Hides the standard behavior of the TsDiagramModule library.
  * @private
  */
	disableDiagramFeatures: function() {
		ej.Diagram.prototype._handleMouseWheel = Ext.emptyFn;
		ej.Diagram.prototype._onContextMenuOpen = Ext.emptyFn;
		ej.Diagram.prototype._initContextMenu = Ext.emptyFn;
		ej.Diagram.prototype._renderContextMenu = Ext.emptyFn;
		ej.Diagram.prototype._createScrollbar = Ext.emptyFn;
	},

	/**
  * Overrides the standard behavior of the TsDiagramModule MouseMove handler.
  * @private
  */
	customizeMouseMove: function() {
		var renderToSelector = "#" + this.renderToSelector;
		if (!Terrasoft.Diagram.custom.enableAutoScroll) {
			var baseEnableAutoScroll = ej.Diagram.prototype.enableAutoScroll;
			ej.Diagram.prototype.enableAutoScroll = function() {
				if (arguments.length > 0 && arguments[0] === "customized") {
					return true;
				}
				baseEnableAutoScroll.apply(this, arguments);
			};
			Terrasoft.Diagram.custom.enableAutoScroll = true;
		}
		if (!Terrasoft.Diagram.custom._mousemove) {
			var baseMouseMove = ej.Diagram.prototype._mousemove;
			ej.Diagram.prototype._mousemove = function(evt) {
				baseMouseMove.apply(this, arguments);
				if (this.activeTool.inAction && this.enableAutoScroll("customized")) {
					var defAutoScrollDelay = 200;
					var defAutoScrollDelayStep = 10;
					var scrollOffset = 10;
					var viewPort = ej.Diagram.ScrollUtil._viewPort(this);
					var pt = this._mousePosition(evt, true);
					var autoScrollBorder = this.model.pageSettings.autoScrollBorder;
					var container = $(renderToSelector);
					var beginAutoScroll = function(direction, evt) {
						this.canvasBBox = null;
						if (!this._canAutoScroll) {
							this._canAutoScroll = true;
							this._beginAutoScrollDelay = defAutoScrollDelay;
							this._beginAutoScroll(direction, evt);
						}
						this._beginAutoScrollDelay -= defAutoScrollDelayStep;
					}.bind(this);
					var scrollLeft = container.scrollLeft();
					var scrollTop = container.scrollTop();
					if (pt.x - scrollLeft + autoScrollBorder.right >= viewPort.width - scrollOffset) {
						if (this.activeTool.previousPoint && (pt.x < (this.activeTool.previousPoint.x))) {
							this._canAutoScroll = false;
							return;
						}
						beginAutoScroll("right", evt);
					} else if (pt.x - scrollLeft <= autoScrollBorder.left) {
						if (this.activeTool.previousPoint && (pt.x > (this.activeTool.previousPoint.x))) {
							this._canAutoScroll = false;
							return;
						}
						beginAutoScroll("left", evt);
					} else if (pt.y - scrollTop + autoScrollBorder.bottom >= viewPort.height - scrollOffset) {
						if (this.activeTool.previousPoint && (pt.y < (this.activeTool.previousPoint.y))) {
							this._canAutoScroll = false;
							this._autoScrollStartPoint = null;
							return;
						}
						beginAutoScroll("bottom", evt);
					} else if (pt.y - scrollTop <= autoScrollBorder.top) {
						if (this.activeTool.previousPoint && (pt.y > (this.activeTool.previousPoint.y))) {
							this._canAutoScroll = false;
							return;
						}
						beginAutoScroll("top", evt);
					} else {
						this._canAutoScroll = false;
					}
				}
			};
			Terrasoft.Diagram.custom._mousemove = true;
		}
	},

	/**
  * Overrides the standard behavior of the _updateSelectionOnScroll handler for the TsDiagramModule library.
  * @private
  */
	customizeUpdateSelectionOnScroll: function() {
		if (Terrasoft.Diagram.custom._updateSelectionOnScroll) {
			return;
		}
		var base = ej.Diagram.prototype._updateSelectionOnScroll;
		ej.Diagram.prototype._updateSelectionOnScroll = function(x, y) {
			var tool = this.activeTool;
			if (tool.name === "move" && tool.helper) {
				tool._updateHelperXY(tool.helper, tool.previousPoint, tool.currentPoint);
				ej.Diagram.SvgContext._updateContainerHelper(this);
				tool.currentPoint = ej.Diagram.Point(tool.currentPoint.x + x, tool.currentPoint.y + y);
				this._translate(tool.helper, x, y, this.nameTable);
				tool.previousPoint = ej.Diagram.Point(tool.currentPoint.x, tool.currentPoint.y);
				return;
			}
			base.apply(this, arguments);
		};
		Terrasoft.Diagram.custom._updateSelectionOnScroll = true;
	},

	/**
  * Overrides the standard behavior of the _beginAutoScroll handler for the TsDiagramModule library.
  * @private
  */
	customizeBeginAutoScroll: function() {
		if (Terrasoft.Diagram.custom._beginAutoScroll) {
			return;
		}
		var renderToSelector = "#" + this.renderToSelector;
		ej.Diagram.prototype._beginAutoScroll = function(option, evt) {
			var delay = this._beginAutoScrollDelay > 0 ? this._beginAutoScrollDelay : 0;
			var callBack = this;
			var left = 0, top = 0;
			var scrollOffset = 10;
			if (this._canAutoScroll) {
				var container = $(renderToSelector);
				var scrollLeft = container.scrollLeft();
				var scrollTop = container.scrollTop();
				switch (option) {
					case "right":
						left = scrollOffset;
						container.scrollLeft(scrollLeft + left);
						break;
					case "left":
						if (scrollLeft === 0) {
							return;
						}
						left -= scrollOffset;
						container.scrollLeft(scrollLeft + left);
						break;
					case "top":
						if (scrollTop === 0) {
							return;
						}
						top -= scrollOffset;
						container.scrollTop(scrollTop + top);
						break;
					case "bottom":
						top = scrollOffset;
						container.scrollTop(scrollTop + top);
						break;
				}
				setTimeout(function() {
					callBack._raiseEvent("autoScrollChange", {delay: delay});
					callBack._updateScrollBar(left, top, option, evt);
				}, delay);
			}
		};
		Terrasoft.Diagram.custom._beginAutoScroll = true;
	},

	/**
  * Overrides the standard behavior of the _setScrollContentSize handler for the TsDiagramModule library.
  * @private
  */
	customizeSetScrollContentSize: function() {
		var rightOffset = this.rightScrollContentOffset;
		var bottomOffset = this.bottomScrollContentOffset;
		ej.Diagram.ScrollUtil._setScrollContentSize = function(diagram) {
			if (diagram.disableSetScrollContentSize === true) {
				return;
			}
			diagram.viewPortSize = null;
			var viewPort = ej.Diagram.ScrollUtil._viewPort(diagram);
			viewPort = ej.Diagram.Rectangle(diagram._hScrollOffset, diagram._vScrollOffset,
				viewPort.width, viewPort.height);
			var left = diagram._spatialSearch.pageLeft;
			var right = diagram._spatialSearch.pageRight;
			var top = diagram._spatialSearch.pageTop;
			var bottom = diagram._spatialSearch.pageBottom;
			var diagramArea = ej.Diagram.Rectangle(0, 0, 0, 0);
			diagramArea = this._union(diagramArea, ej.Diagram.Rectangle(0, 0, viewPort.width, viewPort.height));
			diagramArea = this._union(diagramArea, ej.Diagram.Geometry.rect([
				{
					x: left,
					y: top
				},
				{
					x: right,
					y: bottom
				}
			]));
			var tool = diagram.activeTool;
			var width = diagramArea.width;
			var height = diagramArea.height;
			if (tool && (tool.name === "move") && tool.helper) {
				var helper = tool.helper;
				if (tool.currentPoint.x > width) {
					width = helper.offsetX + helper.width;
				}
				if (tool.currentPoint.y > height) {
					height = helper.offsetY + helper.height;
				}
			}
			if (width > viewPort.width) {
				width += rightOffset;
			}
			if (height > viewPort.height) {
				height += bottomOffset;
			}
			ej.Diagram.SvgContext.setSize(diagram._svg, width, height);
		};
	},

	/**
  * Overrides the logic of the drag event of the element in the diagram.
  * @private
  */
	customizeContainerMouseMove: function() {
		var scope = this;
		ej.Diagram.MoveTool.prototype._containerMouseMove = function() {
			var helper = this.helper;
			if (!helper) {
				helper = this.helper = this._getCloneNode(this.selectedObject);
				helper.name = "helper";
				helper.labels = [];
				var bounds = ej.Diagram.Util.bounds(this.selectedObject);
				helper.offsetX = bounds.center.x + this.currentPoint.x - this.previousPoint.x;
				helper.offsetY = bounds.center.y + this.currentPoint.y - this.previousPoint.y;
				ej.Diagram.SvgContext._drawContainerHelper(this.diagram);
				if (this.selectedObject.type !== "pseudoGroup") {
					this._renderHelper();
				}
			} else {
				this._updateHelperXY(helper, this.previousPoint, this.currentPoint);
				ej.Diagram.SvgContext._updateContainerHelper(this.diagram);
			}
		};
		if (!Terrasoft.Diagram.custom._endAction) {
			var base = ej.Diagram.MoveTool.prototype._endAction;
			ej.Diagram.MoveTool.prototype._endAction = function() {
				if (this.helper) {
					var selectedObject = this.selectedObject;
					if (selectedObject.type !== "pseudoGroup") {
						var diagram = this.diagram;
						var startPoint = this.startPoint;
						var endPoint = this.currentPoint;
						var towardsLeft = endPoint.x < startPoint.x;
						var towardsTop = endPoint.y < startPoint.y;
						var bounds = scope.getItemBounds(selectedObject);
						if (towardsLeft) {
							var endpointX = Math.ceil(endPoint.x);
							if (Math.abs(endpointX) <= bounds.width) {
								endPoint.x = Math.ceil(bounds.width / 2);
							}
						}
						if (towardsTop) {
							var endPointY = Math.ceil(endPoint.y);
							if (Math.abs(endPointY) <= bounds.height) {
								endPoint.y = Math.ceil(bounds.height / 2);
							}
						}
						this._updateXY(selectedObject, startPoint, endPoint);
						ej.Diagram.DiagramContext.update(selectedObject, diagram);
						diagram._renderTooltip(selectedObject);
						this._updateSelection();
						diagram._updateSelectionHandle(true);
					}
				}
				base.apply(this, arguments);
			};
			Terrasoft.Diagram.custom._endAction = true;
		}
	},

	/**
  * Overrides the logic of deletion of the parent from descendants.
  * @private
  */
	customizeRemoveChildParent: function() {
		var base = ej.Diagram.MoveTool.prototype._removeChildParent;
		ej.Diagram.MoveTool.prototype._removeChildParent = function(node) {
			if (node.type !== "pseudoGroup") {
				base.apply(this, arguments);
			}
		};
	},

	/**
  * Overrides the standard behavior of the TsDiagramModule library.
  * @private
  */
	customizeDiagram: function() {
		// TODO # CRM-18298 Give a general view of the customization of the ej.Diagram methods on the products Sales,
		// Marketing, Service
		this.customizeMouseMove();
		this._customizeWrapTextAlign();
		this.customizeUpdateSelectionOnScroll();
		this.customizeBeginAutoScroll();
		this.customizeSetScrollContentSize();
		this.customizeContainerMouseMove();
		this.customizeRemoveChildParent();
		this.customizeSvgImage();
		this.customizeDisConnect();
		this.customizeRemoveConnector();
		this.customizeRecordPinPointChanged();
		this.customizeRecordRotationChanged();
		this.customizeRecordSizeChanged();
		var scope = this;
		var svgContext = ej.Diagram.SvgContext;
		svgContext.updateUserHandles = function(handles, node, svg, isMultipleSelection, isDragging, scale) {
			if (handles && handles.length > 0) {
				for (var handleIndex = 0; handleIndex < handles.length; handleIndex++) {
					var handle = handles[handleIndex];
					if (!(node.toolsConstraint & handle.constraint)) {
						continue;
					}
					if (isMultipleSelection && handle.enableMultiSelection || !isMultipleSelection) {
						if (handle.upateHandle) {
							handle.upateHandle.call(this, handle, node, svg, isDragging, scale, scope);
						} else {
							this._updateHandle(handle, node, svg, isDragging, scale);
						}
					}
				}
			}
		};
		svgContext.renderUserHandles = function(handles, shape, svg, isMultipleSelection, scale, parent) {
			for (var handleIndex = 0; handleIndex < handles.length; handleIndex++) {
				if ((isMultipleSelection && handles[handleIndex].enableMultiSelection) || !isMultipleSelection) {
					var handle = handles[handleIndex];
					// TODO: CRM-14989 The nodes must know what tools do they need
					if (handle.visible && (shape.toolsConstraint & handle.constraint)) {
						var isHidden = (handle.tool && handle.tool.test && !handle.tool.test(shape));
						if (isHidden) {
							continue;
						}
						if (handle.renderUserHandle) {
							handle.renderUserHandle.call(this, handle, shape, svg, scale, parent, scope);
						} else {
							this._renderUserHandle(handle, shape, svg, scale, parent);
						}
					}
				}
			}
		};
		var baseUpdateConnector = svgContext._updateConnector;
		svgContext._updateConnector = function(connector, svg, diagram) {
			baseUpdateConnector.apply(this, arguments);
			var path = this._findPath(connector, diagram);
			svg.path({
				id: connector.name + "_segments_selection",
				d: path
			});
		};
		var connectorPortColor = this.connectorPortColor;
		var portRadius = this.portRadius;
		svgContext._renderOrthogonalThumb = function(corner, x, y, svg, visibility) {
			var handle = svg.getElementById(svg.document.id + "handle_g");
			var fill = connectorPortColor;
			var attr = {
				"id": corner,
				"class": "segmentEnd",
				"fill": fill,
				"r": portRadius,
				"stroke": connectorPortColor,
				"transform": "translate(" + x + "," + y + ")",
				"visibility": visibility
			};
			handle.appendChild(svg.circle(attr));
		};
		svgContext._updateOrthoThumb = function(corner, x, y, svg, visibility) {
			var attr = {
				"id": corner,
				"visibility": visibility,
				"transform": "translate(" + x + "," + y + ")"
			};
			svg.circle(attr);
		};
		svgContext._updateEndPointCorner = function(corner, x, y, isConnected, svg, isenabled) {
			var fill = isConnected ? "#aad4ff" : "white";
			if (!isenabled) {
				fill = "darkgray";
			}
			var attr = {
				id: corner,
				fill: fill,
				cx: x,
				cy: y
			};
			svg.circle(attr);
		};
		svgContext._renderEndPointCorner = function(corner, x, y, isConnected, svg, isenabled) {
			var handle = svg.getElementById(svg.document.id + "handle_g");
			var fill = isConnected ? "#FFFFFF" : "rgba(0,0,0,0)";
			var stroke = isConnected ? connectorPortColor : "rgba(0,0,0,0)";
			var opacity = isConnected ? 0.75 : 0;
			if (!isenabled) {
				fill = "darkgray";
			}
			var attr = {
				"id": corner,
				"class": corner,
				"opacity": opacity,
				"fill": fill,
				"stroke": stroke,
				"stroke-width": 1,
				"cx": x,
				"cy": y,
				"r": portRadius
			};
			handle.appendChild(svg.circle(attr));
		};
		var _getHandlePosition = svgContext._getHandlePosition;
		svgContext._getHandlePosition = function(handle, node, scale) {
			var position = handle.position;
			if (typeof(position) === "object") {
				var positionPoints = ej.Diagram.Point();
				var bounds = ej.Diagram.Util.bounds(node);
				positionPoints.x = bounds.center.x + position.x;
				positionPoints.y = bounds.center.y + position.y;
				return positionPoints;
			}
			return _getHandlePosition(handle, node, scale);
		};

		svgContext._renderLabelBackground = function(label, node, text, svg) {
			return scope.utils.labelUtils.getLabelBackgroundEl({
				label: label,
				node: node,
				textNode: text,
				svg: svg
			});
		};

		svgContext.updateGroup = function(group, svg, diagram, layout) {
			if (group.nodeType === Terrasoft.diagram.UserHandlesConstraint.Lane) {
				return;
			}
			var visible = group.visible ? "visible" : "hidden";
			var style = "display:block;";
			if (!(group.visible)) {
				style = "display:none;";
			}
			svg.g({
				"id": group.name,
				"visibility": "visible",
				"style": "display:block"
			});
			if (group.type === "pseudoGroup") {
				var children = diagram._getChildren(group.children);
				for (var i = 0, len = children.length; i < len; i++) {
					var child = diagram.nameTable[children[i]];
					if (child) {
						if (child.type === "group") {
							this.updateGroup(child, svg, diagram, layout);
						} else if (child.segments) {
							this.updateConnector(child, svg, diagram);
						} else {
							this.updateNode(child, svg, diagram, layout);
						}
					}
				}
			}
			svg.g({
				"id": group.name,
				"visibility": visible,
				"style": style
			});
			this._updateGoupBackground(group, svg);
			this._updateAssociatedConnector(group, svg, diagram);
			this._updateLabels(group, svg);
			this._updatePorts(group, svg);
			var diagramPhases = diagram.model.phases;
			if (group.isSwimlane && diagramPhases && diagramPhases.length > 0) {
				var des = null;
				for (var j = 0; j < diagramPhases.length; j++) {
					des = diagramPhases[j];
					if (des.parent === group.name) {
						this._updatephase(des, diagram);
					}
				}
			}
		};

		var baseRenderFilter = svgContext._renderFilter;
		svgContext._renderFilter = function(node, svg) {
			if (node.constraints & ej.Diagram.NodeConstraints.Shadow) {
				var existingFilter = svg.getElementById(node.name + "_filter");
				if (!existingFilter) {
					return baseRenderFilter.apply(this, arguments);
				}
			}
		};

		svgContext._enableSelectedNode = Ext.emptyFn;
		svgContext._disableSelectedNode = Ext.emptyFn;

		var baseRenderPort = svgContext._renderPort;
		svgContext._renderPort = function(node, port, svg) {
			var portElName = node.name + "_" + port.name;
			var portEl = svg.getElementById(portElName);
			if (portEl) {
				return portEl;
			}
			return baseRenderPort.apply(this, arguments);
		};

		svgContext.updateNode = function(node, svg, diagram) {
			var g, bounds;
			if (node.shape.type === "html" && ej.browserInfo().name === "msie") {
				g = document.getElementById(node.name + "_html").getBoundingClientRect();
				bounds = {
					x: g.left,
					y: g.top,
					width: g.width,
					height: g.height
				};
			} else {
				g = svg.getElementById(node.name + "_shape");
			}
			if (g && !bounds) {
				bounds = ej.Diagram.Util.bounds(node);
			}
			this._updateNode(node, svg);
			if (diagram._layoutInAction) {
				return;
			}
			this._updateAssociatedConnector(node, svg, diagram);
			var activeTool = diagram.activeTool;
			if (!activeTool.inAction || activeTool.name !== "move" && activeTool.name !== "rotate") {
				this._updateLabels(node, svg);
				if (bounds && (bounds && bounds.width !== node.width || bounds.height !== node.height)) {
					this._updatePorts(node, svg);
				}
			}
		};
		if (!Terrasoft.Diagram.custom._addSelection) {
			var baseAddSelection = ej.Diagram.prototype._addSelection;
			ej.Diagram.prototype._addSelection = function() {
				if (this.disableDefaultSelection === true) {
					return;
				}
				return baseAddSelection.apply(this, arguments);
			};
			Terrasoft.Diagram.custom._addSelection = true;
		}
		if (!Terrasoft.Diagram.custom._updateCursor) {
			var baseUpdateCursor = ej.Diagram.prototype._updateCursor;
			ej.Diagram.prototype._updateCursor = function() {
				if (this.cursor !== this._currentCursor) {
					this.cursor = this._currentCursor;
					baseUpdateCursor.apply(this, arguments);
				}
			};
			Terrasoft.Diagram.custom._updateCursor = true;
		}
		if (!Terrasoft.Diagram.custom._mousePosition) {
			ej.Diagram.prototype._mousePosition = function(evt, exOffset) {
				var e = this._isTouchEvent(evt);
				var scrollLeft = 0;
				var scrollTop = 0;
				var canvasBBox = this.canvasBBox;
				if (canvasBBox == null) {
					canvasBBox = this.canvasBBox = this._canvas.getBoundingClientRect();
				}
				var layerx = (e.clientX + scrollLeft) - canvasBBox.left;
				var layery = (scrollTop + e.clientY) - canvasBBox.top;
				if (!exOffset) {
					layerx = (layerx + this._hScrollOffset) / this._currZoom;
					layery = (layery + this._vScrollOffset) / this._currZoom;
				}
				return new ej.Diagram.Point(Math.round(layerx * 100) / 100, Math.round(layery * 100) / 100);
			};
			Terrasoft.Diagram.custom._mousePosition = true;
		}
		ej.Diagram.ScrollUtil._viewPort = function(diagram) {
			var viewPortSize = diagram.viewPortSize;
			if (viewPortSize != null) {
				return viewPortSize;
			}
			var element = diagram.element[0];
			var eWidth = Math.floor($(element)[0].getBoundingClientRect().width);
			var eHeight = $(element).height();
			var bRect = diagram.element[0].getBoundingClientRect();
			var screenX = (window.screenX < 0) ? window.screenX * -1 : window.screenX;
			if (eWidth === 0) {
				eWidth = Math.floor(((window.innerWidth - screenX) - Math.floor(bRect.left)));
			}
			var screenY = (window.screenY < 0) ? window.screenY * -1 : window.screenY;
			if (eHeight === 0) {
				eHeight = Math.floor(((window.innerHeight - screenY) - Math.floor(bRect.top)));
			}
			viewPortSize = diagram.viewPortSize = ej.Diagram.Size(eWidth, eHeight);
			return viewPortSize;
		};
		ej.Diagram.ScrollUtil._transform = function(diagram, hOffset, vOffset, canScale) {
			ej.Diagram.SvgContext.transformView(diagram, -hOffset, -vOffset);
			if (canScale) {
				ej.Diagram.SvgContext.scaleContent(diagram, diagram._currZoom);
			}
			ej.Diagram.PageUtil._updatePageSize(diagram);
			ej.Diagram.SvgContext._updateBackground(
					hOffset, vOffset, diagram._currZoom, diagram);
			ej.Diagram.SvgContext._updateGrid(hOffset, vOffset, diagram._currZoom, diagram);
		};
		if (!Terrasoft.Diagram.custom._updateScrollOffset) {
			ej.Diagram.prototype._updateScrollOffset = function(hScrollOffset, vScrollOffset, canScale) {
				ej.Diagram.ScrollUtil._transform(this, hScrollOffset, vScrollOffset, canScale);
				var diagram = this;
				this._views.forEach(function(viewid) {
					var view = diagram._views[viewid];
					if (view.type === "overview") {
						var ovw = $("#" + viewid).ejOverview("instance");
						if (ovw) {
							ovw._scrollOverviewRect(hScrollOffset, vScrollOffset, diagram._currZoom);
						}
					}
				});
			};
			Terrasoft.Diagram.custom._updateScrollOffset = true;
		}
		ej.Diagram.Util.removeItem = function(array, item) {
			var index;
			while ((index = array.indexOf(item)) >= 0) {
				array.splice(index, 1);
			}
		};
		/*jshint evil: true */
		var replaceColor = function(funcBody) {
			return funcBody.replace(/#07EDE1/g, connectorPortColor);
		};
		svgContext._renderSideAlignmentLines =
				new Function("return " + replaceColor(svgContext._renderSideAlignmentLines.toString()))();
		svgContext._renderCenterAlignmentLines =
				new Function("return " + replaceColor(svgContext._renderCenterAlignmentLines.toString()))();
		svgContext._renderSpacingLines =
				new Function("return " + replaceColor(svgContext._renderSpacingLines.toString()))();
		/*jshint evil: false */
		var self = this;
		ej.Diagram.Util._rotateChildBounds = function(child) {
			var bounds = self.getItemBounds(child, true);
			var padding = 10;
			if (bounds.x - padding > 0 && bounds.y - padding > 0) {
				bounds.x -= padding;
				bounds.y -= padding;
				bounds.height += padding * 2;
				bounds.width += padding * 2;
			}
			return bounds;
		};
	},

	/**
	 * Customize wrap text align.
	 * @private
	 */
	_customizeWrapTextAlign: function() {
		ej.Diagram.SvgContext._wrapTextAlign = this.utils.labelUtils.wrapTextAlign;
	},

	/**
  * Sets the default values for diagram elements
  */
	setDefaults: function() {
		Ext.apply(ej.Diagram.PortDefaults, this.portDefaultsConfig);
		Ext.apply(ej.Diagram.NodeBaseDefaults, this.nodeBaseDefaultsConfig);
	},

	/**
  * Component initialization.
  * @protected
  * @override
  */
	init: function() {
		this.callParent(arguments);
		this.renderToSelector = "diagram-" + this.id;
		this.svgContainerSelector = this.renderToSelector + "_canvas_svg";
		this.customizeDiagram();
		this.customizeRenderNode();
		this.disableDiagramFeatures();
		this.setDefaults();
		this.addEvents(
			/**
    * @event
    * Click event by element
    */
			"click",
			/**
    * @event
    * Double-click event by element
    */
			"doubleClick",
			/**
    * @event
    * Event of changing the selected item
    */
			"selectionChange",
			/**
    * @event
    * Connector change event
    */
			"connectionChange",
			/**
    * @event
    * The mouseUp event
    */
			"mouseUp",
			/**
    * @event
    * The mouseMove event
    */
			"mouseMove",
			/**
    * @event
    * Event for changing the collection of items
    */
			"nodesCollectionChange",
			/**
    * @event
    * Connector collection change event
    */
			"connectorsCollectionChange",
			/**
    * @event
    *  Connector change event. It is generated when a connector has a connection point with a diagram element.
    */
			"connectorsNodesChange",
			/**
    * @event
    * Event of changing the signature of the diagram element.
    */
			"textChange"
		);
	},

	/**
  * Returns the value of the data-item-marker attribute
  */
	getNodeDataItemMarker: function(node) {
		var dataItemMarker = node.name;
		if (!Ext.isEmpty(node.labels) && !Ext.isEmpty(node.labels[0].text)) {
			dataItemMarker += " " + node.labels[0].text;
		}
		return dataItemMarker;
	},

	/**
  * Adds the data-item-marker attribute to the element
  */
	customizeRenderNode: function() {
		var self = this;
		var svgContext = ej.Diagram.SvgContext;
		var baseRenderNode = svgContext.renderNode;
		svgContext.renderNode = function(node, svg) {
			baseRenderNode.apply(this, arguments);
			var dataItemMarker = self.getNodeDataItemMarker(node);
			svg.g({
				id: node.name + "_shape",
				"data-item-marker": dataItemMarker
			});
		};
	},

	/**
  * Returns an existing instance of the diagram.
  * @return {ej.Diagram} diagram.
  */
	getInstance: function() {
		var diagram = this.diagram;
		if (this.isDiagramLoaded()) {
			diagram = this.diagram = $("#diagram-" + this.id).ejDiagram("instance");
		}
		return diagram;
	},

	/**
  * Returns the width of the diagram container.
  * @return {Number}
  */
	getWidth: function() {
		var diagram = this.getInstance();
		var bBox = diagram._svg.document.getBBox();
		return bBox.width;
	},

	/**
	 * Returns the height of the diagram container.
	 * @return {Number}
	*/
	getHeight: function() {
		var height = $(window).height() - $("#diagram-" + this.id).offset().top;
		return Math.max(this.minHeight, height);
	},

	/**
  * Enables auto scrolling of the diagram container.
  */
	setConteinerAutoOverflow: function() {
		var diagramContainer = Ext.get("diagram-" + this.id);
		diagramContainer.setStyle("overflow", "auto");
		diagramContainer.on("scroll", this.onScroll, this);
	},

	/**
  * Scroll event handler for the diagram.
  * @private
  */
	onScroll: function() {
		var diagram = this.getInstance();
		diagram.canvasBBox = null;
	},

	/**
  * A flag that the diagram is loaded
  * @return {Boolean}
  */
	isDiagramLoaded: function() {
		return $("#diagram-" + this.id).hasClass("e-datavisualization-diagram");
	},

	/**
  * Clears the diagram.
  * @private
  */
	clearDiagram: function() {
		if (this.isDiagramLoaded()) {
			var diagram = this.getInstance();
			diagram.clear();
			if (Ext.isIE) {
				// TsDiagramModule diagram.clear () in IE10, IE11 does not clean the DOM elements of the htmlLayer node
				Ext.select("[class=\"htmlLayer\"] > *").remove();
			}
		}
	},

	/**
   * Sets the visibility flag for the ports of the diagram node.
   * @private
   * @param {Object} diagram Diagram.
   * @param {Object} node The diagram node.
   * @param {Boolean} hide The visibility sign.
   */
	setPortsVisibility: function(diagram, node, hide) {
		var ports = node.ports || [];
		var len = ports.length;
		var portShape;
		var port;
		var visibility = hide ? "hidden" : "visible";
		for (var i = 0; i < len; ++i) {
			port = ports[i];
			if (port.visibility & ej.Diagram.PortVisibility.Hover ||
				port.visibility & ej.Diagram.PortVisibility.Connect) {
				portShape = diagram._svg.getElementById(node.name + "_" + port.name);
				if (portShape) {
					portShape.setAttribute("visibility", visibility);
				}
			}
		}
	},

	/**
  * Returns a set of custom event handlers for the diagram.
  * @return {Array} A set of custom event handlers for the diagram.
  * @protected
  */
	getUserHandles: function() {
		return [];
	},

	/**
  * Creates ports based on the resulting set of configurations.
  * @param {Array} portsSet A set of port configurations.
  * @return {Array} Set of ports.
  */
	createPorts: function(portsSet) {
		return portsSet.map(function(port) {
			return {
				name: port.name,
				offset: port.offset
			};
		});
	},

	/**
  * Returns the collection of diagram nodes.
  * @return {Array}.
  */
	getNodes: function() {
		var nodes = [];
		nodes = this.items.filterByFn(this.isItemNode, this);
		return nodes.getItems();
	},

	/**
  * Returns the collection with a diagram control flow.
  * @return {Array}.
  */
	getConnectors: function() {
		var connectors = [];
		connectors = this.items.filterByFn(this.isItemConnector, this);
		return connectors.getItems();
	},

	/**
  * Gets the configuration object of settings for the diagram.
  * @protected
  * @returns {Object}
  */
	getDiagramConfig: function() {
		var nodes = this.getNodes();
		var connectors = [];
		if (nodes && (nodes.length > 0)) {
			connectors = this.getConnectors();
		}
		var diagramConfig = {
			renderTo: "#diagram-" + this.id,
			diagram: {
				nodes: nodes,
				connectors: connectors,
				selectedItems: {
					userHandles: this.getUserHandles()
				},
				constraints: ej.Diagram.DiagramConstraints.Default | ej.Diagram.DiagramConstraints.Zoomable,
				snapSettings: {
					enableSnapToObject: true,
					snapConstraints: ej.Diagram.SnapConstraints.SnapToLines
				},
				selectorConstraints: ej.Diagram.SelectorConstraints.UserHandles |
					ej.Diagram.SelectorConstraints.Resizer,
				enableVisualGuide: false,
				defaultSettings: {
					connector: {
						constraints: this.connectorConstraints,
						segments: [{
							type: "orthogonal"
						}]
					}
				},
				showTooltip: false,
				pageSettings: {
					scrollLimit: "diagram",
					autoScrollBorder: this.autoScrollBorder
				},
				width: "100%",
				height: this.getHeight()
			}
		};
		if (Ext.isIE) {
			Ext.apply(diagramConfig.diagram.snapSettings, {
				enableSnapToObject: false,
				snapObjectDistance: 1,
				horizontalGridLines: {
					snapInterval: [1]
				},
				verticalGridLines: {
					snapInterval: [1]
				}
			});
		}
		return diagramConfig;
	},

	/**
  * Initializes a diagram.
  * @protected
  */
	initDiagram: function() {
		this.cancelDiagramEvents = true;
		var diagramConfig = this.getDiagramConfig();
		this.clearDiagram();
		$(diagramConfig.renderTo).ejDiagram(Ext.apply(diagramConfig.diagram, {
			"nodeCollectionChange": this.onNodesCollectionChange.bind(this),
			"connectorCollectionChange": this.onConnectorsCollectionChange.bind(this),
			"itemClick": this.onItemClick.bind(this),
			"click": this.onClick.bind(this),
			"doubleClick": this.onDoubleClick.bind(this),
			"textChange": this.onTextChange.bind(this),
			"drag": this.onDrag.bind(this)
		}));
		if (this.autoScroll) {
			this.setConteinerAutoOverflow();
		}
		var diagram = this.getInstance();
		if (!Terrasoft.isEmptyObject(this.diagramSnap)) {
			diagram.load(this.diagramSnap);
		}
		var scope = this;
		diagram._on($(window), "resize", function() {
			var container = document.getElementById(this._id);
			var height = scope.getHeight();
			$(container).height(height);
			this._svg.document.setAttribute("height", height);
			this._updateScrollOffset(0, 0);
		});
		var svgDocument = $(diagram._canvas);
		diagram._on(svgDocument, ej.eventType.mouseUp, this.onDiagramMouseUp.bind(this));
		diagram._on(svgDocument, ej.eventType.mouseMove, this.onDiagramMouseMove.bind(this));
		//TODO Sign up on the event only after the ProcessSchema load

		diagram.model.selectionChange = this.onSelectionChange.bind(this);
		diagram.model.connectionChange = this.onConnectionChange.bind(this);
		this.initConnectorRemovalMixin();
	},

	/**
	 * Initialize connector removal mixin.
	 * @private
	 */
	initConnectorRemovalMixin: function() {
		this.mixins.connectorRemoval.init(this.getInstance());
	},

	/**
  * Called to customize the appearance before rendering the element
  * @param diagram {ej.Diagram}
  * @param node {Object}
  * Example:
  *  itemTemplate: function(node) {
  *   item.labels[0].text = node.name;
  *  }
  */
	nodeTemplate: Ext.emptyFn,

	/**
  * Called to customize the appearance before rendering an element/control flow
  * @param diagram {ej.Diagram}
  * @param item {Object}
  * Example:
  *  itemTemplate: function(diagram, connector) {
  *   connector.labels[0].text = connector.name;
  *  }
  */
	connectorTemplate: Ext.emptyFn,

	/**
  * The event handler for changing the selected item on the chart.
  * @private
  */
	onSelectionChange: function(event) {
		var element = event.element;
		var elementName;
		var i;
		var len;
		if (element && event.changeType === "insert") {
			if (Ext.isArray(element) && element.length > 0) {
				elementName = element[0].name;
			} else {
				elementName = element.name;
			}
		}
		var diagram = this.getInstance();
		var svg = diagram._svg;
		var model = diagram.model;
		var connectors = model.connectors;
		len = connectors.length;
		for (i = 0; i < len; i++) {
			var connector = connectors[i];
			var selected = (connector.name === elementName);
			this.updateConnectorSelection(svg, connector, selected);
		}
		this.setPortsVisibilityOnSelectionChange(event, diagram, model.nodes);
		this.fireEvent("selectionChange", event);
	},

	/**
  * Sets the port visibility for the extended elements.
  * @param {Object} event The event object.
  * @param {Object} diagram Instance of the diagram.
  * @param {Array} nodes diagram elements.
  * @protected
  */
	setPortsVisibilityOnSelectionChange: function(event, diagram, nodes) {
		var element = event.element;
		var elementName;
		if (element) {
			elementName = element.name;
		}
		var len = nodes.length;
		for (var i = 0; i < len; i++) {
			var node = nodes[i];
			this.setPortsVisibility(diagram, node, node.name !== elementName);
		}
	},

	/**
  * Updates the connection type in the diagram.
  * @param {Object} svg The element of drawing graphics in the diagram.
  * @param {Object} connector Connection on the diagram.
  * @param {Boolean} selected The characteristic of the selected item.
  */
	updateConnectorSelection: function(svg, connector, selected) {
		var connectorName = connector.name;
		var segments = svg.path({"id": connectorName + "_segments"});
		var connectorConfig = {
			"id": connectorName + "_segments_selection",
			"fill": "none",
			"color": selected ? this.selectionColor : this.connectorLineColor,
			"stroke-width": 1,
			"stroke-opacity": selected ? 13 : 0,
			"d": segments.attributes.getNamedItem("d").value
		};
		segments.parentNode.appendChild(svg.path(connectorConfig));
	},

	/**
  * The event handler for the control flow change.
  * @private
  */
	onConnectionChange: function(event) {
		var connector = event.element;
		var node = event.connection;
		var port = event.port;
		if (connector && node && port) {
			var isSourcePoint = (event.endPoint === "sourceEndPoint");
			var changedProperty = isSourcePoint ? "sourceNode" : "targetNode";
			var currentPort = isSourcePoint ? connector.sourcePort : connector.targetPort;
			var newPort = port.name;
			if (connector[changedProperty] === node.name && currentPort === newPort) {
				return;
			}
			this.fireEvent("connectorsNodesChange", [{
				changedProperty: changedProperty,
				connectorName: connector.name,
				nodeName: node.name,
				port: newPort
			}]);
		}
	},

	/**
  * Double-click event handler for the element in the diagram.
  * @private
  * @param {Object} event Event object.
  */
	onDoubleClick: function(event) {
		//prevent element double click to disable text editing.
		event.cancel = true;
		this.fireEvent("doubleClick", event);
	},

	/**
  * The event handler for the element's signature change on the diagram.
  * @private
  * @param {Object} event Event object.
  */
	onTextChange: function(event) {
		this.fireEvent("textChange", event);
	},

	/**
  * The handler of the click event on the diagram.
  * @private
  * @param {Object} event Event object.
  */
	onClick: function(event) {
		this.fireEvent("click", event);
	},

	/**
  * The click event handler for the element on the diagram.
  * @param {Object} event Event object.
  * @private
  */
	onItemClick: function(event) {
		this.fireEvent("itemClick", event);
	},

	/**
  * The mouse button event handler in the diagram.
  * @private
  */
	onDiagramMouseUp: function(event) {
		Ext.select(".hitTest").set({"pointer-events": "stroke"});
		this.fireEvent("mouseUp", event);
	},

	/**
  * The handler for the mouse movement event on the diagram.
  * @private
  */
	onDiagramMouseMove: function(event) {
		this.fireEvent("mouseMove", event);
	},

	/**
  * The event handler for moving items on the diagram.
  * @private
  */
	onDrag: function(event) {
		this.fireEvent("drag", event);
	},

	/**
  * The event handler for changing the number of nodes in the diagram.
  * @private
  */
	onNodesCollectionChange: function(event) {
		this.onDiagramItemsChange(event);
		this.fireEvent("nodesCollectionChange", event);
	},

	/**
  * The event handler for changing the number of diagram connectors.
  * @private
  */
	onConnectorsCollectionChange: function(event) {
		this.onDiagramItemsChange(event);
		this.fireEvent("connectorsCollectionChange", event);
	},

	/**
  * The event handler for changing the collection of items on the diagram. Synchronizes the chart elements and the
  * items collection.
  * @param {Object} event The TsDiagramModule event parameter.
  * @protected
  */
	onDiagramItemsChange: function(event) {
		var changeType = event.changeType;
		if (changeType === "remove") {
			var element = event.element;
			var items = this.items;
			// The collection indexes are rebuilt after the remove event is generated. In the event handler for this event
			// another item is deleted. Due to an incorrectly defined index, the wrong item is deleted.
			items.collection.rebuildIndexMap();
			var elementName = element.name;
			if (items.contains(elementName)) {
				items.removeByKey(elementName);
			}
		}
	},

	/**
  * Creates a structure of the connections to the diagram elements for the transferred connectors and generates
  * a {@link #connectorsNodesChange} event.
  * @param {String []} inEdgesConnectors An array with the names of the connectors for which you want to process
  * incoming connections.
  * @param {String []} outEdgesConnectors An array with the names of the connectors for which you want to process
  * outbound connections.
  */
	linkConnectors: function(inEdgesConnectors, outEdgesConnectors) {
		var eventArgs = [];
		var self = this;
		var incomingConnectors = inEdgesConnectors || [];
		var outcomingConnectors = outEdgesConnectors || [];
		function processConnector(connectorName, changedProperty) {
			var connector = self.getElementById(connectorName);
			if (connector) {
				eventArgs.push({
					changedProperty: changedProperty,
					connectorName: connectorName,
					nodeName: connector[changedProperty]
				});
			}
		}
		incomingConnectors.forEach(function(connectorName) {
			processConnector(connectorName, "targetNode");
		}, this);
		outcomingConnectors.forEach(function(connectorName) {
			processConnector(connectorName, "sourceNode");
		}, this);
		this.fireEvent("connectorsNodesChange", eventArgs);
	},

	/**
  * Bind all the elements to the model
 * @override
 * @param {Terrasoft.data.modules.BaseViewModel} model Data model.
 */
	bind: function(model) {
		this.mixins.bindable.bind.call(this, model);
	},

	/**
  * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
  * @protected
  * @override
  */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var diagramBindConfig = {
			items: {
				changeMethod: "onCollectionDataLoaded"
			}
		};
		return Ext.apply(diagramBindConfig, bindConfig);
	},

	/**
	 * @inheritdoc Terrasoft.Component#reRender
	 * @override
	 */
	reRender: function() {
		if (this.allowRerender()) {
			this.callParent(arguments);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @protected
	 * @override
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.afterRenderOrAfterReRender();
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterReRender
	 * @protected
	 * @override
	 */
	onAfterReRender: function() {
		this.callParent(arguments);
		this.diagram = null;
		this.afterRenderOrAfterReRender();
	},

	/**
  * Creates an instance of the diagram. Displays it in the created container.
  * @override
  */
	afterRenderOrAfterReRender: function() {
		this.initDiagram();
		this.cancelDiagramEvents = false;
	},

	/**
  * Updates the dimensions of the diagram.
  */
	updatePageSize: function() {
		var diagram = this.getInstance();
		ej.Diagram.PageUtil._updatePageSize(diagram);
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @protected
	 * @override
	 */
	subscribeForCollectionEvents: function(binding, property, model) {
		this.callParent(arguments);
		var collection = model.get(binding.modelItem);
		collection.on("dataLoaded", this.onCollectionDataLoaded, this);
		collection.on("add", this.onAddItem, this);
		collection.on("remove", this.onRemoveItem, this);
		collection.on("clear", this.clearDiagram, this);
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#unSubscribeForCollectionEvents
	 * @protected
	 * @override
	 */
	unSubscribeForCollectionEvents: function(binding, property, model) {
		if (!model) {
			return;
		}
		var collection = model.get(binding.modelItem);
		collection.un("dataLoaded", this.onCollectionDataLoaded, this);
		collection.un("add", this.onAddItem, this);
		collection.un("remove", this.onRemoveItem, this);
		collection.un("clear", this.clearDiagram, this);
		this.callParent(arguments);
	},

	/**
  * The "dataLoaded" event handler for the Terrasoft.Collection
  * @protected
  */
	onCollectionDataLoaded: function(items, newItems) {
		items = newItems || items;
		if (items && items.getCount() > 0) {
			var isDiagramLoaded = this.isDiagramLoaded();
			var diagram;
			if (isDiagramLoaded) {
				diagram = this.getInstance();
				diagram.disableSetScrollContentSize = true;
				diagram.disableDefaultSelection = true;
			}
			var ownItems = this.items;
			ownItems.suspendEvents(false);
			items.each(function(item) {
				this.onAddItem(item, true);
			}, this);
			ownItems.resumeEvents();
			if (isDiagramLoaded) {
				diagram.disableSetScrollContentSize = false;
				diagram.disableDefaultSelection = false;
				ej.Diagram.ScrollUtil._setScrollContentSize(diagram);
			}
		}
	},

	/**
  * Checks whether the element is a control thread
  * @param {Object} item
  * @returns {boolean}
  */
	isItemConnector: function(item) {
		if (item.sourceNode || item.sourcePoint) {
			return true;
		}
		return false;
	},

	/**
  * Checks whether the element is a node of the diagram.
  * @param {Object} item
  * @returns {boolean}
  */
	isItemNode: function(item) {
		return !this.isItemConnector(item);
	},

	/**
  * The "add" event handler of the Terrasoft.Collection
  * @protected
  * @param {Object} item
  * @param {Boolean} isDataLoaded A flag of the initial boot.
  */
	onAddItem: function(item, isDataLoaded) {
		if (this.isDiagramLoaded()) {
			if (this.isItemConnector(item)) {
				this.connectorTemplate(item);
			} else {
				item.offsetX = item.offsetX + this.diagram._hScrollOffset;
				item.offsetY = item.offsetY + this.diagram._vScrollOffset;
				item.constraints = item.constraints || this.nodeConstraints;
				//create ports when connections to node allowed
				if (item.constraints & ej.Diagram.NodeConstraints.Connect) {
					var portsSet = item.portsSet ? item.portsSet : Terrasoft.diagram.PortsSet.All;
					item.ports = this.createPorts(portsSet);
				}
				this.nodeTemplate(item);
			}
			this.addItem(item, isDataLoaded);
		}
	},

	/**
  * Adds an element to the diagram.
  * @param {ej.Diagram.Node} item The element to add to the diagram.
  */
	addItem: function(item) {
		if (this.isDiagramLoaded()) {
			var diagram = this.getInstance();
			diagram.add(item);
		}
	},

	/**
  * The "remove" event handler for the Terrasoft.Collection
  * @protected
  * @param {Object} item
  */
	onRemoveItem: function(item) {
		if (this.isDiagramLoaded()) {
			var element = this.getElementById(item.name);
			// Hack. TsDiagramModule does not generate any event when the connector is automatically redirected to another chart
			// element.
			// Redirection occurs when the node is deleted.
			// Here we save all the nodes of the node before it is deleted. After removing the node for all stored connectors
			// we generate a change event for the (see linkConnectors) mount points.
			var inEdges = null;
			var outEdges = null;
			var elementType = element.type;
			if (elementType === "node") {
				inEdges = element.inEdges;
				outEdges = element.outEdges;
			}
			var diagram = this.getInstance();
			diagram.remove(element);
			if (elementType === "node") {
				this.linkConnectors(inEdges, outEdges);
			}
		}
	},

	/**
  * Destroy the chart and its components.
  * @override
  */
	onDestroy: function() {
		this.callParent(arguments);
		if (this.diagram) {
			this.diagram.destroy();
		}
		this.diagram = null;
		if (this.svgContextSnap) {
			ej.Diagram.SvgContext = Terrasoft.deepClone(this.svgContextSnap);
			this.svgContextSnap = null;
		}
	},

	/**
  * Overrides the creation of the image in the Svg element of the TsDiagramModule library.
  * @private
  */
	customizeSvgImage: function() {
		ej.Diagram.Svg.prototype.image = function(attr) {
			var element = this.element(attr, "image");
			if (Ext.isGecko) {
				var el = Ext.fly(element);
				el.on("click", function(event) {
					if (event.ctrlKey === true || event.shiftKey === true) {
						event.preventDefault();
					}
				});
			}
			return element;
		};
	},

	/**
	 * Updates _disConnect function to reconnect connectors to first non-recursive.
	 * @protected
	 */
	customizeDisConnect: function() {
		if (Terrasoft.Diagram.custom._disConnect) {
			return;
		}
		var connectorRemoval = this.mixins.connectorRemoval;
		ej.Diagram.prototype._disConnect = function(node, args, isChild) {
			connectorRemoval.disconnect(node, args, isChild);
		};
	},

	/**
	 * Updates _removeConnector function to remove connectors with null references.
	 * @protected
	 */
	customizeRemoveConnector: function() {
		if (Terrasoft.Diagram.custom._removeConnector) {
			return;
		}
		var connectorRemoval = this.mixins.connectorRemoval;
		ej.Diagram.prototype._removeConnector = function(node, args) {
			connectorRemoval.removeConnector(node, args);
		};
		Terrasoft.Diagram.custom._removeConnector = true;
	},

	/**
	 * Overrides ej.Diagram.prototype._recordPinPointChanged
	 */
	customizeRecordPinPointChanged: function() {
		if (Terrasoft.Diagram.custom._recordPinPointChanged) {
			return;
		}
		var baseRecordPinPointChanged = ej.Diagram.prototype._recordPinPointChanged;
		ej.Diagram.prototype._recordPinPointChanged = function(args) {
			if (!args.object.node) {
				return;
			}
			baseRecordPinPointChanged.apply(this, arguments);
		};
	},

	/**
	 * Overrides ej.Diagram.prototype._recordRotationChanged
	 */
	customizeRecordRotationChanged: function() {
		if (Terrasoft.Diagram.custom._recordRotationChanged) {
			return;
		}
		var baseRecordRotationChanged = ej.Diagram.prototype._recordRotationChanged;
		ej.Diagram.prototype._recordRotationChanged = function(args) {
			if (!args.object.node) {
				return;
			}
			baseRecordRotationChanged.apply(this, arguments);
		};
	},

	/**
	 * Overrides ej.Diagram.prototype._recordSizeChanged
	 */
	customizeRecordSizeChanged: function() {
		if (Terrasoft.Diagram.custom._recordSizeChanged) {
			return;
		}
		var baseRecordSizeChanged = ej.Diagram.prototype._recordSizeChanged;
		ej.Diagram.prototype._recordSizeChanged = function(args) {
			if (!args.object.node) {
				return;
			}
			baseRecordSizeChanged.apply(this, arguments);
		};
	}

});
