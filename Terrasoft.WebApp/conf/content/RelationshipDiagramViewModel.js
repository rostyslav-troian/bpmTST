Terrasoft.configuration.Structures["RelationshipDiagramViewModel"] = {innerHierarchyStack: ["RelationshipDiagramViewModel"]};
/*global ej */
/* jshint bitwise: false */
define("RelationshipDiagramViewModel", ["RelationshipDiagramViewModelResources", "ServiceHelper",
		"NetworkUtilities", "LookupUtilities", "RightUtilities", "RelationshipDiagram"],
	function(resources, ServiceHelper, NetworkUtilities, LookupUtilities, RightUtilities) {
		Ext.define("Terrasoft.configuration.RelationshipDiagramViewModel", {
			extend: "Terrasoft.BaseViewModel",
			alternateClassName: "Terrasoft.RelationshipDiagramViewModel",
			mixins: {
				rightsUtilities: "Terrasoft.RightUtilitiesMixin"
			},

			Ext: null,
			sandbox: null,
			Terrasoft: null,

			PortPosition: {
				Top: this.Terrasoft.diagram.PortPosition.Top,
				Bottom: this.Terrasoft.diagram.PortPosition.Bottom,
				Left: this.Terrasoft.diagram.PortPosition.Left,
				BottomLeft: {
					name: "{X=-1,Y=-1}",
					offset: {
						x: 0.09,
						y: 1
					}
				}
			},
			NODE_BORDER_WIDTH: 0,
			NODE_SHAPE_TYPE: ej.datavisualization.Diagram.Shapes.Image,
			NODE_CORNER_RADIUS: 10,
			NODE_SELECTED_COLOR: "rgba(125, 158, 226, 0.2)",
			NODE_IMAGE_ID: "bae72dc6-a108-4171-aa30-bc6319a19a0d",
			CURRENT_NODE_IMAGE_ID: "1304dc05-76af-4c27-9862-78adec7ed1dc",
			NEW_NODE_IMAGE_ID: "fd4c3f76-673a-4a07-b1e6-08556a471a04",
			CONNECTOR_COLOR: "#D6D6D6",
			CONNECTOR_WIDTH: 1,
			CONNECTOR_SEGMENTS_TYPE: ej.datavisualization.Diagram.Segments.Orthogonal,
			DECORATOR_WIDTH: 8,
			DECORATOR_HEIGHT: 5,
			DECORATOR_COLOR: "#ACACAC",
			LABEL_WIDTH: 160,
			LABEL_MARGIN: {
				"left": 20,
				"right": 20
			},
			LABEL_MAX_LENGTH: 47,
			LABEL_FONT_FAMILY: "Segoe UI",
			LABEL_FONT_COLOR: "#668DDD",
			LABEL_CURRENT_NODE_FONT_COLOR: "#444444",
			LABEL_FONT_COLOR2: "#999999",
			LABEL_FONT_SIZE: 13,
			LABEL_NAME_OFFSET_X: 0.5,
			LABEL_NAME_OFFSET_Y: 0.38,
			LABEL_TYPE_OFFSET_X: 0.5,
			LABEL_TYPE_OFFSET_Y: 0.7,
			LABEL_NEW_OFFSET_Y: 0.5,
			LOOKUP_WIDTH: 150,

			/**
			 *########### ########## ######## ####### ### ######### ## #########.
			 */
			MIN_VERTICAL_NODE_COUNT: 4,

			/**
			 * ###### ########.
			 */
			NODE_WIDTH: 180,

			/**
			 * ###### ########.
			 */
			NODE_HEIGHT: 68,

			/**
			 * ########## ## ###### #### ######### ## ######## ######## ######.
			 */
			HPADDING1: 10,

			/**
			 * ########## ##### ########## ####### ######.
			 */
			HPADDING2: 50,

			/**
			 * ##### ######### ####### # ########### ####### ############ ############ #########.
			 */
			HPADDING3: 38,

			/**
			 * ########## ##### ########## ######## # ########### ####### # ###### #######.
			 */
			HPADDING4: 10,

			/**
			 * ########## ## ######## #### ######### ## ######## ######## ######.
			 */
			VPADDING1: 9,

			/**
			 * ########## ##### ########## ######## # ####### #######.
			 */
			VPADDING2: 40,

			/**
			 * ########## ##### ########## ####### # ####### #######.
			 */
			VPADDING3: 20,

			/**
			 * ########## ##### ########## ######## # ########### #######.
			 */
			VPADDING4: 15,

			/**
			 * Need reload relationships mark.
			 * @type {Boolean}
			 */
			RELOAD_AFTER_RENDER: false,

			/**
			 * ########## ########### ####### ############.
			 * @private
			 * @param  {Array} accounts ###### ############.
			 * @return {Number} ########### ####### ############.
			 */
			getMinLevel: function(accounts) {
				var min = Number.MAX_VALUE;
				accounts.forEach(function(item) {
					if (item.level < min) {
						min = item.level;
					}
				}, this);
				return min;
			},

			/**
			 * ########## ############ ####### ############.
			 * @private
			 * @param  {Array} accounts ###### ############.
			 * @return {Number} ############ ####### ############.
			 */
			getMaxLevel: function(accounts) {
				var max = -Number.MAX_VALUE;
				accounts.forEach(function(item) {
					if (item.level > max) {
						max = item.level;
					}
				}, this);
				return max;
			},

			/**
			 * Returns the width of the visible area of the chart.
			 * @private
			 * return {Number} The width of the visible region of the diagram.
			 */
			getClientWidth: function() {
				var cmp = this.getRelationshipDiagramDomEl();
				var width = cmp.clientWidth;
				if (width !== 0) {
					this.set("ClientWidth", width);
				} else {
					width = this.get("ClientWidth");
				}
				return width;
			},

			/**
			 * ####### ### ######## ## ######### #########.
			 * @private
			 */
			clearAllDiagramNodes: function() {
				var nodes = this.get("Nodes");
				nodes.each(function(item) {
					nodes.remove(item);
				});
			},

			/**
			 * ############### ####### ###### # ###### ########### ########.
			 * @private
			 * @param  {Array} list   ######## ######.
			 * @param  {Number} minLevel ########### ####### ########.
			 * @return {Array} ###### ########### ########.
			 */
			buildHierarchy: function(list, minLevel) {
				var treeList = [];
				var lookup = {};
				list.forEach(function(obj) {
					lookup[obj.id] = obj;
					obj.children = [];
				});
				list.forEach(function(obj) {
					if (obj.level === minLevel) {
						treeList.push(obj);
					} else {
						lookup[obj.parentId].children.push(obj);
					}
				});
				return treeList;
			},

			/**
			 * ############## ######### ######## ######.
			 * @protected
			 * @virtual
			 */
			init: function() {
				this.set("Nodes", this.Ext.create("Terrasoft.Collection"));
				this.set("Accounts", null);
				this.set("NewAccountList", this.Ext.create("Terrasoft.Collection"));
				this.set("ClientWidth", 0);
				this.createVirtalColumn("NewChildAccount");
				this.createVirtalColumn("NewParentAccount");
			},

			/**
			 * ####### ########### #######.
			 * @protected
			 * @param  {String} columnName ######## #######.
			 */
			createVirtalColumn: function(columnName) {
				var column = {
					dataValueType: this.Terrasoft.DataValueType.LOOKUP,
					type: this.Terrasoft.ViewModelColumnType.VIRTUAL_COLUMN,
					isLookup: true,
					referenceSchema: {
						name: "Account",
						primaryColumnName: "Id",
						primaryDisplayColumnName: "Name"
					},
					referenceSchemaName: "Account",
					lookupListConfig: {
						columns: ["Parent"],
						filter: this.getNotInAccountOnDiagramFilter
					}
				};
				this.columns[columnName] = column;
			},

			/**
			 * ########## ###### ########### ############, ####### ### ######### ## #########.
			 * @protected
			 * @return {Terrasoft.Filter} ######.
			 */
			getNotInAccountOnDiagramFilter: function() {
				var accounts = this.get("Accounts");
				var accountIds = [];
				accounts.forEach(function(item) {
					if (!item.isNew && !item.isVirtual) {
						accountIds.push(item.id);
					}
				}, this);
				var notInFilter = this.Terrasoft.createColumnInFilterWithParameters("Id", accountIds);
				notInFilter.comparisonType = this.Terrasoft.ComparisonType.NOT_EQUAL;
				return notInFilter;
			},

			/**
			 * Calls loading a relationship diagram.
			 * @protected
			 */
			loadRelationship: function() {
				var isRendered = this.getRelationshipDiagramDomEl();
				if (!isRendered) {
					this.RELOAD_AFTER_RENDER = true;
					return;
				}
				var accountId = this.get("MasterRecordId");
				this.set("NewChildAccount", null);
				this.set("NewParentAccount", null);
				this.clearAllDiagramNodes();
				if (accountId) {
					var data = {
						accountId: accountId,
						additionalColumnNames: []
					};
					ServiceHelper.callService("RelationshipDiagramService",
						"GetRelationshipDiagramInfo",
						this.relationshipDiagramServiceCallback,
						data,
						this
					);
				}
			},

			/**
			 * Gets root element of the relationship diagram.
			 * @private
			 */
			getRelationshipDiagramDomEl: function() {
				var el = Ext.get("diagram-RelationshipDiagram");
				return el && el.dom;
			},

			/**
			 * ############ ######### #######.
			 * @protected
			 * @param {Object} response ##### ## #######.
			 */
			relationshipDiagramServiceCallback: function(response) {
				if (response.GetRelationshipDiagramInfoResult &&
					response.GetRelationshipDiagramInfoResult.success === true) {
					this.set("Accounts", response.GetRelationshipDiagramInfoResult.accounts);
					this.replaceAllAccounts();
				} else {
					this.Terrasoft.showInformation(response.GetRelationshipDiagramInfoResult.errorInfo.errorCode);
				}
			},

			/**
			 * ############# ############ ## #########.
			 * @protected
			 */
			replaceAllAccounts: function() {
				var accounts = this.get("Accounts");
				var accountsCount = accounts.length;
				if (accountsCount !== 0) {
					var minLevel = this.getMinLevel(accounts);
					var maxLevel = this.getMaxLevel(accounts);
					var diffLevel = maxLevel - minLevel;
					if (accountsCount === 1) {
						this.placeOneAccount(accounts);
					} else if (accountsCount === 3 && diffLevel === 2) {
						this.placeThreeAccounts(accounts);
					} else if (diffLevel === 1 && (accountsCount - 1) > this.MIN_VERTICAL_NODE_COUNT) {
						this.placeOneLevelAccounts(accounts);
					} else {
						this.placeAccountsInTreeMode(accounts);
					}
					this.buildDiagramNodes(accounts);
				}
			},

			/**
			 * ######### #### ########## ## ######### # ####### ### ###########.
			 * @protected
			 * @param  {Array} accounts ###### ############.
			 */
			placeOneAccount: function(accounts) {
				var clientWidth = this.getClientWidth();
				var account = accounts[0];
				account.offsetX = clientWidth / 2;
				account.offsetY = this.VPADDING1 + this.NODE_HEIGHT * 2;
				account.toolsConstraint = 0;
				account.inPort = this.PortPosition.Top;
				account.outPort = this.PortPosition.Bottom;
				if (!this.get("CanAdd")) {
					return;
				}
				var virtualParentAccount = {
					id: this.Terrasoft.generateGUID(),
					parentId: null,
					isRoot: true,
					level: -1,
					isNew: true,
					isVirtual: true,
					inPort: this.PortPosition.null,
					outPort: this.PortPosition.Bottom,
					name: this.getAddParentAccountLabelCaption(),
					toolsConstraint: 0,
					columnName: "NewParentAccount",
					offsetX: clientWidth / 2,
					offsetY: this.VPADDING1 + this.NODE_HEIGHT / 2
				};
				account.parentId = virtualParentAccount.id;
				accounts.push(virtualParentAccount);
				var virtualChildAccount = {
					id: this.Terrasoft.generateGUID(),
					parentId: account.id,
					level: 1,
					isNew: true,
					isVirtual: true,
					inPort: this.PortPosition.Top,
					outPort: null,
					name: this.getAddChildAccountLabelCaption(),
					toolsConstraint: 0,
					columnName: "NewChildAccount",
					offsetX: clientWidth / 2,
					offsetY: this.VPADDING1 + this.NODE_HEIGHT * 3.5
				};
				accounts.push(virtualChildAccount);
			},

			/**
			 * ######### ########### ###########, ### #### ####### ############.
			 * @protected
			 * @param  {Array} accounts ###### ############
			 */
			placeOneLevelAccounts: function(accounts) {
				var accountsTree = this.buildHierarchy(accounts, this.getMinLevel(accounts));
				var clientWidth = this.getClientWidth();
				var rootAccount = accountsTree[0];
				rootAccount.isRoot = true;
				rootAccount.inPort = this.PortPosition.BottomLeft;
				rootAccount.outPort = this.PortPosition.BottomLeft;
				if (!rootAccount.isNew) {
					rootAccount.toolsConstraint = Terrasoft.diagram.ToolsConstraint.NodeSelectionTool |
						Terrasoft.diagram.ToolsConstraint.NodeAddTool;
				}
				rootAccount.offsetX = clientWidth / 2;
				rootAccount.offsetY = this.VPADDING1 + this.NODE_HEIGHT / 2;
				this.placeAccountsVerticaly(rootAccount, clientWidth);
			},

			/**
			 * ########## ############ ####### ###### ###########.
			 * @protected
			 * @param  {Object} parentAccount ##########.
			 * @param  {Number} clientWidth      ###### #########.
			 */
			placeAccountsVerticaly: function(parentAccount, clientWidth) {
				var accounts = parentAccount.children;
				for (var i = 0; i < accounts.length; i++) {
					var account = accounts[i];
					account.inPort = this.PortPosition.Left;
					account.outPort = this.PortPosition.BottomLeft;
					account.offsetX = this.HPADDING3 + clientWidth / 2;
					account.offsetY = this.VPADDING1 +
						this.VPADDING3 +
						this.VPADDING4 * i +
						this.NODE_HEIGHT * (i + 1) +
						this.NODE_HEIGHT / 2;
				}
			},

			/**
			 * ########## ############, ##### ##### ### ########### # ###### ######### ## ####### ####.
			 * @protected
			 * @param  {Array} accounts ###### ############.
			 */
			placeThreeAccounts: function(accounts) {
				var accountsTree = this.buildHierarchy(accounts, this.getMinLevel(accounts));
				var clientWidth = this.getClientWidth();
				var rootAccount = accountsTree[0];
				rootAccount.inPort = this.PortPosition.Bottom;
				rootAccount.outPort = this.PortPosition.Bottom;
				rootAccount.isRoot = true;
				if (!rootAccount.isNew) {
					rootAccount.toolsConstraint = Terrasoft.diagram.ToolsConstraint.NodeSelectionTool |
						Terrasoft.diagram.ToolsConstraint.NodeAddTool;
				}
				rootAccount.offsetX = clientWidth / 2;
				rootAccount.offsetY = this.VPADDING1 + this.NODE_HEIGHT / 2;
				var childAccount1 = rootAccount.children[0];
				childAccount1.inPort = this.PortPosition.Top;
				childAccount1.outPort = this.PortPosition.Bottom;
				childAccount1.offsetX = clientWidth / 2;
				childAccount1.offsetY = this.VPADDING1 + this.NODE_HEIGHT * 1.5 + this.VPADDING2;
				var childAccount2 = childAccount1.children[0];
				childAccount2.inPort = this.PortPosition.Top;
				childAccount2.outPort = this.PortPosition.BottomLeft;
				childAccount2.offsetX = clientWidth / 2;
				childAccount2.offsetY = this.VPADDING1 + this.NODE_HEIGHT * 2.5 + this.VPADDING2 * 2;
			},

			/**
			 * ########## ############ # ########### #####.
			 * @protected
			 * @param  {Array} accounts ###### ############.
			 */
			placeAccountsInTreeMode: function(accounts) {
				var clientWidth = this.getClientWidth();
				var accountsTree = this.buildHierarchy(accounts, this.getMinLevel(accounts));
				var rootAccount = accountsTree[0];
				rootAccount.inPort = this.PortPosition.Bottom;
				rootAccount.outPort = this.PortPosition.Bottom;
				rootAccount.isRoot = true;
				if (!rootAccount.isNew) {
					rootAccount.toolsConstraint = Terrasoft.diagram.ToolsConstraint.NodeSelectionTool |
						Terrasoft.diagram.ToolsConstraint.NodeAddTool;
				}
				this.nodeLevelX = 0;
				this.nodeLevelY = 0;
				var offsetX = this.placeAccountsRecursive(rootAccount, 0);
				var diagramWidth = rootAccount.children.length * this.NODE_WIDTH + offsetX;
				this.placeRootAccount(accountsTree);
				if (diagramWidth < clientWidth) {
					offsetX = (clientWidth - diagramWidth + this.HPADDING2) / 2;
				} else {
					offsetX = this.HPADDING1;
				}
				accounts.forEach(function(item) {
					item.offsetX += offsetX;
				}, this);
				if (accounts.length === 2) {
					rootAccount.children[0].outPort = this.PortPosition.Bottom;
				}
			},

			/**
			 * ######### ########## ######## ######:
			 * ### ######## ########## ########### ####### ###### - ### ###########,
			 * ### ###### ########## ############ ####### ###### - ##### ##### ############.
			 * @protected
			 * @param  {Array} accountsTree ###### ############.
			 */
			placeRootAccount: function(accountsTree) {
				var rootAccount = accountsTree[0];
				var children = rootAccount.children;
				var childCount = children.length;
				var x1, x2;
				if (childCount % 2 === 0) {
					x1 = children[childCount / 2 - 1].offsetX;
					x2 = children[childCount / 2].offsetX + this.NODE_WIDTH;
					rootAccount.offsetX = x1 + (x2 - x1 - this.NODE_WIDTH) / 2;
				} else {
					x1 = children[(childCount - 1) / 2].offsetX;
					rootAccount.offsetX = x1;
				}
				rootAccount.offsetY = this.VPADDING1 + this.NODE_HEIGHT / 2;
			},

			/**
			 * ########### ####### ########## ############ ## #########.
			 * @protected
			 * @param {Object} parentAccount ##########.
			 * @param {Number} offsetX ######## ## ###########.
			 * @return {Number} ########## ############ ######## ## ########### ####### ##### ###### ############.
			 */
			placeAccountsRecursive: function(parentAccount, offsetX) {
				var accounts = parentAccount.children;
				var maxOffsetX = 0;
				var minLevel = this.getMinLevel(this.get("Accounts"));
				for (var i = 0; i < accounts.length; i++) {
					var account = accounts[i];
					var level = account.level;
					if (!account.isNew) {
						account.toolsConstraint = Terrasoft.diagram.ToolsConstraint.NodeSelectionTool |
							Terrasoft.diagram.ToolsConstraint.NodeAddTool |
							Terrasoft.diagram.ToolsConstraint.NodeRemoveTool;
					}
					if (level === (minLevel + 1)) {
						account.inPort = this.PortPosition.Top;
						account.outPort = this.PortPosition.BottomLeft;
						//noinspection OverlyComplexArithmeticExpressionJS
						account.offsetX = this.NODE_WIDTH / 2 + this.NODE_WIDTH * this.nodeLevelX + offsetX;
						account.offsetY = this.VPADDING1 + this.VPADDING2 + this.NODE_HEIGHT + this.NODE_HEIGHT / 2;
						if (account.children.length !== 0) {
							offsetX += (this.placeAccountsRecursive(account, offsetX) + this.HPADDING4);
						} else {
							offsetX += this.HPADDING2;
						}
						this.nodeLevelX++;
						this.nodeLevelY = 0;
					} else if (level > (minLevel + 1)) {
						account.inPort = this.PortPosition.Left;
						account.outPort = this.PortPosition.BottomLeft;
						var absMinlevel = minLevel;
						var absLevel = level;
						if (minLevel < 0) {
							absMinlevel += Math.abs(minLevel);
							absLevel += Math.abs(minLevel);
						}
						//noinspection OverlyComplexArithmeticExpressionJS
						account.offsetX = this.NODE_WIDTH * this.nodeLevelX +
							this.NODE_WIDTH / 2 +
							this.HPADDING3 * (absLevel - absMinlevel - 1) +
							offsetX;
						//noinspection OverlyComplexArithmeticExpressionJS
						account.offsetY = this.VPADDING1 +
							this.VPADDING2 +
							this.NODE_HEIGHT * (this.nodeLevelY + 1) +
							this.VPADDING3 +
							this.VPADDING4 * this.nodeLevelY +
							this.NODE_HEIGHT +
							this.NODE_HEIGHT / 2;
						this.nodeLevelY++;
						if (account.children.length !== 0) {
							maxOffsetX = Math.max(this.placeAccountsRecursive(account, offsetX), maxOffsetX);
						}
					}
				}
				if (parentAccount.level >= (minLevel + 1)) {
					offsetX = maxOffsetX + this.HPADDING3;
				}
				return offsetX;
			},

			/**
			 * ############### ###### ############ # ######## #########.
			 * @protected
			 * @param  {Array} accounts ###### ############.
			 */
			buildDiagramNodes: function(accounts) {
				this.clearAllDiagramNodes();
				var nodes = this.get("Nodes");
				accounts.forEach(function(account) {
					nodes.add(account.id, this.getNodeConfig(account));
				}, this);
				this.createNodeConnections(accounts);
			},

			/**
			 * ####### ##### ######### #########.
			 * @protected
			 * @param  {Array} accounts ###### ############.
			 */
			createNodeConnections: function(accounts) {
				var nodes = this.get("Nodes");
				accounts.forEach(function(account) {
					if (account.parentId !== null && account.parentId !== this.Terrasoft.GUID_EMPTY) {
						var parentAccount = this.getAccountById(accounts, account.parentId);
						if (parentAccount !== null) {
							nodes.add(account.parentId + "/" + account.id,
								this.getConnectionConfig(account, parentAccount));
						}
					}
				}, this);
			},

			/**
			 * ########## ############ ######## ### #########.
			 * @protected
			 * @param {Object} config ############ ########### ########## ## #######.
			 * @return {Object} ########## ############ ######## #########.
			 */
			getNodeConfig: function(config) {
				var name = config.name;
				var type = config.accountType;
				var isCurrent = (config.id === this.get("MasterRecordId"));
				var imageId = isCurrent ? this.CURRENT_NODE_IMAGE_ID : this.NODE_IMAGE_ID;
				imageId = config.isVirtual ? this.NEW_NODE_IMAGE_ID : imageId;
				var node = {
					"name": config.id,
					"width": this.NODE_WIDTH,
					"height": this.NODE_HEIGHT,
					"offsetX": config.offsetX,
					"offsetY": config.offsetY,
					"shape": {
						"type": this.NODE_SHAPE_TYPE,
						"imageId": imageId,
						"cornerRadius": this.NODE_CORNER_RADIUS
					},
					"borderWidth": this.NODE_BORDER_WIDTH,
					"nodeType": this.Terrasoft.diagram.UserHandlesConstraint.Node,
					"isCurrent": isCurrent,
					"level": config.level,
					"parentId": config.parentId,
					"isNew": config.isNew,
					"labels": [],
					"inPort": config.inPort,
					"outPort": config.outPort,
					"toolsConstraint": Terrasoft.diagram.ToolsConstraint.NodeSelectionTool |
						Terrasoft.diagram.ToolsConstraint.NodeAddTool |
						Terrasoft.diagram.ToolsConstraint.NodeRemoveTool
				};
				if (!this.Ext.isEmpty(config.toolsConstraint)) {
					node.toolsConstraint = config.toolsConstraint;
				}
				node.portsSet = this.getNodePorts(node);
				if (!this.Ext.isEmpty(name)) {
					var nameLabel = this.getNodeLabelConfig({
						"text": name,
						"name": name,
						"isLink": true,
						"offset": {
							"x": this.LABEL_NAME_OFFSET_X,
							"y": this.LABEL_NAME_OFFSET_Y
						}
					});
					if (node.isNew) {
						nameLabel.fontColor = this.LABEL_FONT_COLOR2;
						nameLabel.isLink = true;
						nameLabel.offset.y = this.LABEL_NEW_OFFSET_Y;
					} else if (isCurrent) {
						nameLabel.fontColor = this.LABEL_CURRENT_NODE_FONT_COLOR;
						nameLabel.isLink = false;
					}
					node.labels.push(nameLabel);
				}
				if (!this.Ext.isEmpty(type)) {
					node.labels.push(this.getNodeLabelConfig({
						"text": type,
						"name": this.Terrasoft.generateGUID(),
						"fontColor": this.LABEL_FONT_COLOR2,
						"offset": {
							"x": this.LABEL_TYPE_OFFSET_X,
							"y": this.LABEL_TYPE_OFFSET_Y
						}
					}));
				}
				if (node.isNew && node.labels.length === 0) {
					node.lookupWidth = this.LOOKUP_WIDTH;
					node.lookupHeight = 30;
					node.lookupConfig = this.getNodeLookupConfig(config);
				}
				return node;
			},

			/**
			 * ########## ############ ############# ######.
			 * @protected
			 * @param  {Object} config ############ ########### ########## ## #######.
			 * @return {Object} ############ ############# ######.
			 */
			getNodeLookupConfig: function(config) {
				return {
					className: "Terrasoft.LookupEdit",
					list: {
						bindTo: "NewAccountList"
					},
					value: {
						bindTo: config.columnName
					},
					tag: config.columnName,
					loadVocabulary: {
						bindTo: "loadVocabulary"
					},
					showValueAsLink: true,
					change: {
						bindTo: "onLookupChange"
					}
				};
			},

			/**
			 * ########## ###### ###### ### #### #########.
			 * @protected
			 * @param  {Object} node ####### #########.
			 * @return {Array} ###### ######.
			 */
			getNodePorts: function(node) {
				var ports = [];
				if (node.inPort) {
					ports.push(node.inPort);
				}
				if (node.outPort) {
					ports.push(node.outPort);
				}
				return ports;
			},

			/**
			 * ########## ############ ######### ##### ### ######## #########.
			 * @protected
			 * @param  {Object} additionalConfig ############## #########.
			 * @return {Object} ############ ######### #####.
			 */
			getNodeLabelConfig: function(additionalConfig) {
				var label = {
					"fontSize": this.LABEL_FONT_SIZE,
					"fontFamily": this.LABEL_FONT_FAMILY,
					"fontColor": this.LABEL_FONT_COLOR,
					"width": this.LABEL_WIDTH,
					"margin": this.LABEL_MARGIN
				};
				this.Ext.apply(label, additionalConfig);
				return label;
			},

			/**
			 * ########## ############ ############## ####### ##### ##########.
			 * @protected
			 * @param  {Object} accountA ##########.
			 * @param  {Object} accountB ############ ##########.
			 * @return {Object}          ############ #######.
			 */
			getConnectionConfig: function(accountA, accountB) {
				var connector = {
					"name": accountA.parentId + "/" + accountA.id,
					"sourceNode": accountA.parentId,
					"targetNode": accountA.id,
					"lineColor": this.CONNECTOR_COLOR,
					"lineWidth": this.CONNECTOR_WIDTH,
					"segments": [{
						"type": this.CONNECTOR_SEGMENTS_TYPE
					}],
					"targetDecorator": {
						"width": this.DECORATOR_WIDTH,
						"height": this.DECORATOR_HEIGHT,
						"borderColor": this.DECORATOR_COLOR,
						"fillColor": this.DECORATOR_COLOR
					}
				};
				if (accountA.isVirtual || accountB.isVirtual) {
					connector.lineDashArray = "3 3";
				}
				connector.sourcePort = accountB.outPort.name;
				connector.targetPort = accountA.inPort.name;
				return connector;
			},

			/**
			 * ########## ########### ## ####### ## ######## id.
			 * @protected
			 * @param  {Array} array ###### ############.
			 * @param  {Guid} id ############# ###########.
			 * @return {Object} ##########.
			 */
			getAccountById: function(array, id) {
				return this.findInArrayByPropertyValue(array, "id", id);
			},

			/**
			 * ########## ########### ## ####### ## ######## parentId.
			 * @protected
			 * @param  {Array} array ###### ############.
			 * @param  {Guid} parentId ############# ############# ###########.
			 * @return {Object} ##########.
			 */
			getAccountByParentId: function(array, parentId) {
				return this.findInArrayByPropertyValue(array, "parentId", parentId);
			},

			/**
			 * ########## ####### ####### ## ######## ######## ########.
			 * @protected
			 * @param  {Array} array     ######.
			 * @param  {String} property ######## ########.
			 * @param  {Object} value    ########.
			 * @return {Object}          ####### #######.
			 */
			findInArrayByPropertyValue: function(array, property, value) {
				return this.Ext.Array.findBy(array, function(item) {
					return item[property] === value;
				});
			},

			/**
			 * ######### ######## ############## ###########.
			 * @protected
			 * @param  {Guid} id ############# ###########.
			 */
			openAccountCardInChain: function(id) {
				var sandbox = this.sandbox;
				var historyState = sandbox.publish("GetHistoryState");
				var config = {
					sandbox: sandbox,
					entitySchemaName: this.getLookupEntitySchemaName(),
					primaryColumnValue: id,
					historyState: historyState
				};
				NetworkUtilities.openCardInChain(config);
			},

			/**
			 * ########## ##### ## ###### # ######## #########.
			 * @protected
			 * @param {Object} node ####### #########.
			 */
			onLabelLinkClick: function(node) {
				if (node.isNew) {
					this.onVirtualAccountClick(node);
				} else {
					this.openAccountCardInChain(node.name);
				}
			},

			/**
			 * ########## ##### ############ ######## #########.
			 * @protected
			 * @param  {Object} node ####### #########.
			 */
			onVirtualAccountClick: function(node) {
				this.set("NewChildAccount", null);
				this.set("NewParentAccount", null);
				var accounts = this.get("Accounts");
				var oldVirtualAccount = this.get("OldVirtualAccount");
				if (oldVirtualAccount) {
					var oldAccount = this.getAccountById(accounts, oldVirtualAccount.id);
					if (oldAccount) {
						oldAccount.name = oldVirtualAccount.name;
						oldAccount.isVirtual = true;
					}
				}
				var account = this.getAccountById(accounts, node.name);
				this.set("OldVirtualAccount", {
					id: account.id,
					name: account.name
				});
				account.name = null;
				account.isVirtual = false;
				this.set("NewNodeValue", null);
				this.set("NewAccount", account);
				this.buildDiagramNodes(accounts);
			},

			/**
			 * ########## ##### ## ###### #### "######## ############ ########".
			 * @protected
			 * @param  {Object} node ####### #########.
			 */
			onAddParentAccountButtonClick: function(node) {
				if (node.isNew) {
					return;
				}
				this.set("NewParentAccount", null);
				var accounts = this.get("Accounts");
				var newParentAccount = this.get("NewAccount");
				this.removeNewAccount();
				newParentAccount = {
					id: this.Terrasoft.generateGUID(),
					parentId: this.Terrasoft.GUID_EMPTY,
					level: node.level - 1,
					children: [],
					isNew: true,
					isRoot: true,
					toolsConstraint: Terrasoft.diagram.ToolsConstraint.NodeRemoveTool,
					columnName: "NewParentAccount"
				};
				var currentAccount = this.getAccountById(accounts, node.name);
				if (currentAccount) {
					currentAccount.parentId = newParentAccount.id;
					currentAccount.isRoot = false;
				}
				this.set("NewAccount", newParentAccount);
				accounts.unshift(newParentAccount);
				this.replaceAllAccounts();
			},

			/**
			 * ########## ##### ## ###### #### "######## ######## ########".
			 * @protected
			 * @param  {Object} node ####### #########.
			 */
			onAddChildAccountButtonClick: function(node) {
				if (node.isNew) {
					return;
				}
				this.set("NewChildAccount", null);
				var accounts = this.get("Accounts");
				var newChildAccount = this.get("NewAccount");
				this.removeNewAccount();
				this.set("ParentAccountId", node.name);
				newChildAccount = {
					id: this.Terrasoft.generateGUID(),
					parentId: node.name,
					level: node.level + 1,
					isNew: true,
					toolsConstraint: Terrasoft.diagram.ToolsConstraint.NodeRemoveTool,
					columnName: "NewChildAccount"
				};
				this.set("NewAccount", newChildAccount);
				accounts.push(newChildAccount);
				this.replaceAllAccounts();
			},

			/**
			 * ########## ##### ## ###### "####### ############ ###########".
			 * @protected
			 * @param  {Object} node ####### #########.
			 */
			onRemoveParentRelationshipButtonClick: function(node) {
				var accountId = node.name;
				if (node.isNew) {
					this.removeNewAccount();
					this.replaceAllAccounts();
				} else if (accountId) {
					var confirmationMessage = this.getRemoveRelationshipMessage();
					this.Terrasoft.showConfirmation(confirmationMessage, function(returnCode) {
						if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
							this.updateRelationship(accountId, null, this.loadRelationship);
						}
					}, ["yes", "no"], this);
				}
			},

			/**
			 * ####### #####, ## #########, ########## ## #######,
			 * #### ### ######## #######, ## ###### ######## ########## ####### ####.
			 * @protected
			 */
			removeNewAccount: function() {
				var accounts = this.get("Accounts");
				for (var i = accounts.length - 1; i >= 0; i--) {
					var account = accounts[i];
					if (account.isNew) {
						if (account.isRoot) {
							var rootAccount = this.getAccountByParentId(accounts, account.id);
							rootAccount.isRoot = true;
							rootAccount.parentId = this.Terrasoft.GUID_EMPTY;
						}
						this.Ext.Array.remove(accounts, account);
						break;
					}
				}
			},

			/**
			 * ########## ###########.
			 * @protected
			 * @param  {Guid}     accountId ############# ###########.
			 * @param  {Guid}     parentAccountId ############# ############# ###########.
			 * @param  {Function} callback #######, ####### ##### ####### ## ##########.
			 */
			updateRelationship: function(accountId, parentAccountId, callback) {
				this.showBodyMask({
					timeout: 0
				});
				var updateQuery = function(result) {
					if (this.Ext.isEmpty(result)) {
						var updateAccount = this.Ext.create("Terrasoft.UpdateQuery", {
							rootSchemaName: "Account"
						});
						updateAccount.filters.add(updateAccount.createColumnFilterWithParameter(
							this.Terrasoft.ComparisonType.EQUAL, "Id",
							accountId));
						updateAccount.setParameterValue("Parent", parentAccountId, this.Terrasoft.DataValueType.GUID);
						updateAccount.execute(function(response) {
							if (response.success === true) {
								if (this.Ext.isFunction(callback)) {
									callback.apply(this);
								}
							}
							this.hideBodyMask();
						}, this);
					} else {
						this.hideBodyMask();
						this.Terrasoft.showInformation(result);
					}
				};
				RightUtilities.checkCanEdit({
					schemaName: "Account",
					primaryColumnValue: accountId
				}, updateQuery, this);
			},

			/**
			 * ######### ######## ###### ## ########### ### ######## ######## ######.
			 * @protected
			 * @param {Object} args #########.
			 * @param {Object} columnName ### ####.
			 */
			loadVocabulary: function(args, columnName) {
				var config = this.getLookupPageConfig(args, columnName);
				this.openLookup(config, this.onLookupResult, this);
			},

			/**
			 * ############# ######### # ########### ######## # ############### #### ######.
			 * @protected
			 * @virtual
			 * @param {Object} args #########.
			 */
			onLookupResult: function(args) {
				var columnName = args.columnName;
				var selectedRows = args.selectedRows;
				if (!selectedRows.isEmpty()) {
					this.set(columnName, selectedRows.getByIndex(0));
				}
			},

			/**
			 * ########## ######### ######## ###### ## ###########.
			 * @protected
			 * @param {Object} args #########.
			 * @param {String} columnName ######## #######.
			 * @return {Object} ######### ######## ###### ## ###########.
			 */
			getLookupPageConfig: function(args, columnName) {
				var config = {
					entitySchemaName: this.getLookupEntitySchemaName(),
					multiSelect: false,
					columnName: columnName,
					columnValue: this.get(columnName),
					searchValue: args.searchValue,
					filters: this.getLookupQueryFilters(columnName)
				};
				this.Ext.apply(config, this.getLookupListConfig(columnName));
				return config;
			},

			/**
			 * ####### ######### ######## # ####.
			 * @protected
			 * @param {Object} newValue ##### ########.
			 * @param {String} columnName ### ####.
			 */
			onLookupChange: function(newValue, columnName) {
				if (newValue && newValue.value !== this.Terrasoft.GUID_EMPTY) {
					var newAccount = this.get("NewAccount");
					if (newValue.Parent && newValue.Parent.value && columnName === "NewChildAccount") {
						var confirmationMessage = this.getGotoAccountMessage();
						this.Terrasoft.showConfirmation(confirmationMessage, function(returnCode) {
							if (returnCode === this.Terrasoft.MessageBoxButtons.YES.returnCode) {
								this.openAccountCardInChain(newValue.value);
							}
							this.set(columnName, null);
						}, ["yes", "no"], this);
					} else if (columnName === "NewChildAccount") {
						this.updateRelationship(newValue.value, newAccount.parentId, this.loadRelationship);
					} else if (columnName === "NewParentAccount") {
						var accounts = this.get("Accounts");
						var account = this.getAccountByParentId(accounts, newAccount.id);
						this.updateRelationship(account.id, newValue.value, this.loadRelationship);
					}
				}
			},

			/**
			 * ########## ######## ##### ####### ########### ####.
			 * @protected
			 * @return {String} ######## ##### ########### ####.
			 */
			getLookupEntitySchemaName: function() {
				return "Account";
			},

			/**
			 * ########## ########## # ########## ########## #######.
			 * @private
			 * @param {String} columnName ######## #######.
			 * @return {Object|null} ########## # ########## ########## #######.
			 */
			getLookupListConfig: function(columnName) {
				var schemaColumn = this.getColumnByName(columnName);
				if (!schemaColumn) {
					return null;
				}
				var lookupListConfig = schemaColumn.lookupListConfig;
				if (!lookupListConfig) {
					return null;
				}
				var excludedProperty = ["filters", "filter"];
				var config = {};
				this.Terrasoft.each(lookupListConfig, function(property, propertyName) {
					if (excludedProperty.indexOf(propertyName) === -1) {
						config[propertyName] = property;
					}
				});
				return config;
			},

			/**
			 * ######### ########## # ######### ####.
			 * @param {Object} config ############ ###########.
			 * @param {Function} callback ####### ######### ######.
			 * @param {Object} scope ######## ####### ######### ######.
			 */
			openLookup: function(config, callback, scope) {
				LookupUtilities.Open(this.sandbox, config, callback, scope || this, null, false, false);
			},

			/**
			 * ########## ##### ######### ### ######## ###########.
			 * @protected
			 * @return {String} ##### #########.
			 */
			getRemoveRelationshipMessage: function() {
				return resources.localizableStrings.RemoveRelationshipConfirmationDialogMessage;
			},

			/**
			 * ########## ##### ######### ### ######## ## ######## ############## ########.
			 * @protected
			 * @return {String} ##### #########.
			 */
			getGotoAccountMessage: function() {
				return resources.localizableStrings.GotoAccountConfirmationDialogMessage;
			},

			/**
			 * ########## ##### ###### ### ########## ############ #####.
			 * @protected
			 * @return {String} ##### ######.
			 */
			getAddParentAccountLabelCaption: function() {
				return resources.localizableStrings.AddParentAccountLabel;
			},

			/**
			 * ########## ##### ###### ### ########## ######## #####.
			 * @protected
			 * @return {String} ##### ######.
			 */
			getAddChildAccountLabelCaption: function() {
				return resources.localizableStrings.AddChildAccountLabel;
			},

			/**
			 * Handler for after render event.
			 * @protected
			 */
			onAfterRender: function() {
				if (this.RELOAD_AFTER_RENDER) {
					this.RELOAD_AFTER_RENDER = false;
					this.loadRelationship();
				}
			}

		});
		return Terrasoft.RelationshipDiagramViewModel;
	});


