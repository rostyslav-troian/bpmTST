/**
 * The class implements the display of data on a modular CSS grid.
 */
Ext.define("Terrasoft.controls.Grid", {
	extend: "Terrasoft.controls.Component",
	alternateClassName: "Terrasoft.Grid",

	mixins: {
		draggable: "Terrasoft.DraggableGridMixin",
		hierarchical: "Terrasoft.HierarchicalGridMixin"
	},

	/**
	 * Indicates the type of layout of the grid.
	 * @cfg {String} [type="tiled" "listed"]
	 */
	type: null,

	/**
	 * The parameter indicates the possibility of multiple sampling.
	 * @cfg {Boolean} [multiSelect="false" "true"]
	 */
	multiSelect: false,

	/**
	 * Indicates the need to use a "zebra" type design, i.e. alternating allocation of rows in color,
	 * in the list form of the list.
	 * @cfg {Boolean} [listedZebra="false"]
	 */
	listedZebra: false,

	/**
	 * A parameter that stores data in the form of a flat array of model objects.
	 * Filled and used when initializing.
	 *
	 *      An example of data for a tiled hierarchical structure
	 *      data: [
	 *          {
	 *              id: 1,
	 *              title: "Production Department",
	 *              personName: "Olga Ravenskaya",
	 *              department: "Production"
	 *          },
	 *          {
	 *              id: 2,
	 *              title: "Logistics",
	 *              personName: "Vyacheslav Pinkov",
	 *              department: "Production",
	 *              parent: 1
	 *          },
	 *          {
	 *              id: 3,
	 *              title: "Forwarding",
	 *              personName: "Constantin Constantinovich Constantinovsky",
	 *              department: "Escort of goods",
	 *              parent: 2
	 *          },
	 *          {
	 *              id: 4,
	 *              title: "Forwarding",
	 *              personName: "Kola Peninsula",
	 *              department: "Escort of goods",
	 *              parent: 2
	 *          },
	 *          {
	 *              id: 7,
	 *              title: "Forwarding",
	 *              personName: "Kola Peninsula",
	 *              department: "Escort of goods",
	 *              parent: 2
	 *          },
	 *          {
	 *              id: 5,
	 *              title: "Production",
	 *              personName: "Sergey Filin",
	 *              department: "Production",
	 *              parent: 1
	 *          },
	 *          {
	 *              id: 6,
	 *              title: "Production Department",
	 *              personName: "Constantine Constantinovskiy",
	 *              department: "Production"
	 *          }
	 *      ]
	 *
	 *      Example data for a tiled data structure
	 *      data: [
	 *          {
	 *              icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...",
	 *              title: "Control call to the client, find out the situation about the financing of the department",
	 *              responsibleName: "Evgeniy Mirnyi",
	 *              responsibleIcon: "data:image/png;base64,iVBORw0KGgo...",
	 *              startDate: "26.09.2012 19:30",
	 *              priority: "Normal",
	 *              status: "In progress"
	 *          },
	 *          {
	 *              icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...",
	 *              title: "Offer a client a reference meeting",
	 *              responsibleName: "Svetlana Filimonova",
	 *              responsibleIcon: "data:image/png;base64,iVBORw0KGgo...",
	 *              startDate: "25.09.2012 12:30",
	 *              priority: "Normal",
	 *              status: "Canceled",
	 *              result: "Canceled",
	 *              resultDetailed: "Canceled due to lack of necessity." The client made a decision in our favor",
	 *              counteragent: "Alphabusiness",
	 *              contact: "Vyacheslav Nosov",
	 *              countryIcon: "data:image/png;base64,iVBORw0KGgoAAAA...",
	 *              country: "Spain",
	 *              influence: "Exhibition",
	 *              sale: "101/Alphabusiness/Complex sale"
	 *          },
	 *          {
	 *              icon: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUg...",
	 *              title: "Offer a reference meeting to the client",
	 *              responsibleName: "Svetlana Filimonova",
	 *              responsibleIcon: "data:image/png;base64,iVBORw0KGgo...",
	 *              startDate: "28.09.2012 12:30",
	 *              priority: "Normal",
	 *              status: "Completed",
	 *                result: "Meeteing agreed",
	 *              resultDetailed: "We agreed to hold a meeting next week"
	 *          }
	 *      ]
	 * @protected
	 * @type {Object[]}
	 */
	rows: null,

	/**
	 * A parameter that stores styles for data records where the key is the identifier of the collection item,
	 * and the value is the styles in the form of an object that can process Ext.DomHelper.generateStyles.
	 * @type {Object}
	 */
	rowsStyles: null,

	/**
	 * A parameter that stores classes for certain cells.
	 * @type {Object}
	 */
	cellsClasses: null,

	/**
	 * Link to the collection.
	 * @type {Terrasoft.Collection}
	 */
	collection: null,

	/**
	 * Column configuration.
	 * Each array in the configuration is a string in the markup.
	 * Each object in the config is a parameterized cell for markup.
	 *
	 * The cell object has following configuration values and properties:
	 *      "cols": can take the values "grid-cols-1", "grid-cols-2", "grid-cols-3" ... "grid-cols-24";
	 *      the number of columns in the cell; maximum width of 24 columns, minimum 1 column;
	 *      column sizes in fractions of the line width;
	 *
	 *      "key": a data key object or an array of data key objects; the data key points to the name of the property
	 *      from the data set by where you can get the actual data
	 *
	 *      "key": {
	 *          the name of the key itself or the value for the "self-serving" column, for example "caption"; in order to
	 *              the corresponding property of the model could be tracked using
	 *          "type": can take following values
	 *              "text" (can be omitted, used by default),
	 *              "title" to use the heading style,
	 *              "* icon *" to indicate the icons; the type of icon is also the class of the way icons are displayed;
	 *              for example, specifying the type "grid-flag-icon-16x16"
	 *              the data source of the column will be substituted into the value
	 *              of the link to the image, and the type itself, as the CSS class
	 *              will be registered for the container of the displayed icon
	 *              "caption" caption to column
	 *              data type; is taken into account when the data is directly inserted into the cell;
	 *      }
	 *
	 * One line without content
	 *      columnsConfig: [
	 *          []
	 *      ]
	 *
	 * Two lines without content
	 *      columnsConfig: [
	 *          []
	 *          []
	 *      ]
	 *
	 * In the first line, two columns occupy 50% of the width.
	 *      columnsConfig: [
	 *          [
	 *              {
	 *                  cols: 12
	 *              },
	 *              {
	 *                  cols: 12
	 *              }
	 *          ],
	 *          []
	 *      ]
	 *
	 * Example configuration for hierarchical mapping
	 *      columnsConfig: [
	 *          [
	 *              {
	 *                  cols: 24,
	 *                  key: [
	 *                      {
	 *                          name: "title",
	 *                          type: "title"
	 *                      }
	 *                  ]
	 *              },
	 *          ],
	 *          [
	 *              {
	 *                  cols: 12,
	 *                  key: [
	 *                      {
	 *                          name: "Manager",
	 *                          type: "caption"
	 *                      },
	 *                      {
	 *                          name: "personName"
	 *                      }
	 *                  ]
	 *              },
	 *              {
	 *                  cols: 12,
	 *                  key: [
	 *                      {
	 *                          name: "Parent Department",
	 *                          type: "caption"
	 *                      },
	 *                      {
	 *                          name: "department"
	 *                      }
	 *                  ]
	 *              }
	 *          ]
	 *      ]
	 *
	 * Example of setting for a tiled display
	 *      columnsConfig: [
	 *          [
	 *              {
	 *                  cols: 24,
	 *                  key: [
	 *                      {
	 *                          name: "icon",
	 *                          type: "grid-header-icon-22x22"
	 *                      },
	 *                      {
	 *                          name: "title",
	 *                          type: "title"
	 *                      }
	 *                  ]
	 *              }
	 *          ],
	 *          [
	 *              {
	 *                  cols: 9,
	 *                  key: [
	 *                      {
	 *                          name: "responsibleIcon",
	 *                          type: "grid-icon-32x32"
	 *                      },
	 *                      {
	 *                              name: "Responsible",
	 *                              type: "caption"
	 *                      },
	 *                      {
	 *                              name: "responsibleName"
	 *                      }
	 *                  ]
	 *              },
	 *              {
	 *                  cols: 5,
	 *                  key: [
	 *                      {
	 *                          name: "Start date",
	 *                          type: "caption"
	 *                      },
	 *                      {
	 *                          name: "startDate"
	 *                      }
	 *                  ]
	 *              },
	 *              {
	 *                  cols: 5,
	 *                  key: [
	 *                      {
	 *                          name: "Priority",
	 *                          type: "caption"
	 *                      },
	 *                      {
	 *                          name: "priority",
	 *                      }
	 *                  ]
	 *              },
	 *              {
	 *                  cols: 5,
	 *                  key: [
	 *                      {
	 *                          name: "Status",
	 *                          type: "caption"
	 *                      },
	 *                      {
	 *                          name: "status"
	 *                      }
	 *                  ]
	 *              }
	 *          ],
	 *          [
	 *              {
	 *                  cols: 9,
	 *                  key: [
	 *                      {
	 *                          name: "Result",
	 *                          type: "caption"
	 *                      },
	 *                      {
	 *                          name: "result"
	 *                      }
	 *                  ]
	 *              },
	 *              {
	 *                  cols: 15,
	 *                  key: [
	 *                      {
	 *                          name: "Detailed result",
	 *                          type: "caption"
	 *                      },
	 *                      {
	 *                          name: "resultDetailed"
	 *                      }
	 *                  ]
	 *              }
	 *          ],
	 *          [
	 *              {
	 *                  cols: 6,
	 *                  key: [
	 *                      {
	 *                          name: "Account",
	 *                          type: "caption"
	 *                      },
	 *                      {
	 *                          name: "counteragent"
	 *                      }
	 *                  ]
	 *              },
	 *              {
	 *                  cols: 6,
	 *                  key:[
	 *                      {
	 *                          name: "Contact",
	 *                          type: "caption"
	 *                      },
	 *                      {
	 *                          name: "contact",
	 *                      }
	 *                  ]
	 *              },
	 *              {
	 *                  cols: 6,
	 *                  key: [
	 *                      {
	 *                          name: "Country",
	 *                          type: "caption"
	 *                      },
	 *                      {
	 *                          name: "countryIcon",
	 *                          type: "grid-flag-icon-16x16"
	 *                      },
	 *                      {
	 *                          name: "country",
	 *                      }
	 *                  ]
	 *              },
	 *              {
	 *                  cols: 6,
	 *                  key: [
	 *                      {
	 *                          name: "Influence",
	 *                          type: "caption"
	 *                      },
	 *                      {
	 *                          name: "influence"
	 *                      }
	 *                  ]
	 *              }
	 *          ],
	 *          [
	 *              {
	 *                  cols: 24,
	 *                  key: [
	 *                      {
	 *                          name: "Sale",
	 *                          type: "caption"
	 *                      },
	 *                      {
	 *                          name: "sale"
	 *                      }
	 *                  ]
	 *              }
	 *          ]
	 *      ]
	 * @protected
	 * @type {Array}
	 */
	columnsConfig: null,

	/**
	 * Configure signatures to the columns in list mode.
	 * Represents an array of objects, indicating the width of the column and the signature in the created cell.
	 * Configuration example
	 *      captionsConfig: [
	 *          {
	 *              cols: 10,
	 *              name: "Name",
	 *          }     *          {
	 *              cols: 8,
	 *            name: "Primary contact",
	 *          }     *          {
	 *              cols: 6,
	 *              name: "Owner"
	 *          }
	 *      ]
	 * @type {Object}
	 */
	captionsConfig: null,

	/**
	 * Parameter that stores the configuration of columns and headers.
	 * @type {Object}
	 */
	listedConfig: null,

	/**
	 * A parameter that stores the configuration of the columns.
	 * @type {Object}
	 */
	tiledConfig: null,

	/**
	 * The configuration of the "actions" for the active record
	 *      activeRowActions: [
	 *          {
	 *              className: "Terrasoft.Button",
	 *              style: Terrasoft.controls.ButtonEnums.style.BLUE,
	 *              caption: "Edit",
	 *              tag: "edit"
	 *          }     *          {
	 *              className: "Terrasoft.Button",
	 *              style: Terrasoft.controls.ButtonEnums.style.GREY,
	 *              caption: "Copy",
	 *              tag: "copy"
	 *          }     *          {
	 *              className: "Terrasoft.Button",
	 *              style: Terrasoft.controls.ButtonEnums.style.GREY,
	 *              caption: "Delete",
	 *              tag: "delete"
	 *          }
	 *      ]
	 * @cfg {Object}
	 */
	activeRowActions: null,

	/**
	 * A parameter indicating the permission to display actions for the row.
	 */
	isRowActionsVisible: true,

	/**
	 * The name of the column to determine the value of the data-item-marker attribute,
	 * if not specified, primaryDisplayColumn is used.
	 * @type {String}
	 */
	rowDataItemMarkerColumnName: null,

	/**
	 * The prefix of the DOM element identifier used to sign the columns of the list.
	 * @protected
	 * @property {String} captionPrefix
	 */
	captionPrefix: "-caption-",

	/**
	 * The CSS class used to highlight the row of the list.
	 * @protected
	 * @property {String} selectedRowCss
	 */
	selectedRowCss: "grid-row-selected",

	/**
	 * The markup for the sort identifier is up.
	 * @protected
	 * @property {String} sortIndicatorUp
	 */
	sortIndicatorUp: "<div class=\"grid-sort-arrow grid-sort-arrow-up\"></div>",

	/**
	 * The markup for the sort identifier down.
	 * @property {String} sortIndicatorDown
	 */
	sortIndicatorDown: "<div class=\"grid-sort-arrow grid-sort-arrow-down\"></div>",

	/**
	 * Sort column index.
	 * @type {Number}
	 */
	sortColumnIndex: null,

	/**
	 * Sort column direction. @see {@link Terrasoft.core.enums.OrderDirection}
	 * @type {Number}
	 */
	sortColumnDirection: Terrasoft.core.enums.OrderDirection.ASC,

	/**
	 * The "primaryColumnName" value from the collection. It comes from the first model in the collection.
	 * @protected
	 * @property {String} primaryColumnName
	 */
	primaryColumnName: "Id",

	/**
	 * The "primaryDisplayColumnName" value from the collection. It comes from the first model in the collection.
	 * @protected
	 */
	primaryDisplayColumnName: null,

	/**
	 * The prefix of the DOM element identifier corresponding to one model from the collection.
	 * @protected
	 * @property {String} collectionItemPrefix
	 */
	collectionItemPrefix: "-item-",

	/**
	 * List of #type describing "self-serving" (not subject to external processing,
	 * contain everything necessary for its full operation in the configuration object itself)
	 * types in the configuration of the #columnsConfig columns.
	 * @protected
	 * @property {String[]} internalColumns
	 */
	internalColumns: ["caption", "label"],

	/**
	 * A set of Terrasoft.CheckBoxEdit elements.
	 * @protected
	 * @type {Array}
	 */
	checkboxes: null,

	/**
	 * Progress spinner instance.
	 * @protected
	 * @type {Terrasoft.BaseSpinner}
	 */
	progressSpinner: null,

	/**
	 * List of the identifiers of the elements of the collection that are selected.
	 * @type {String[]}
	 */
	selectedRows: null,

	/**
	 * CSS class indicating that the DOM element can be selected.
	 * @protected
	 * @property {String} theoreticallyActiveRowCss
	 */
	theoreticallyActiveRowCss: "grid-active-selectable",

	/**
	 * Parameter that stores the identifier of the active record from the received data.
	 * @protected
	 */
	activeRow: null,

	/**
	 * Css class for the active row of the list.
	 * @protected
	 * @property {String} activeRowCss
	 */
	activeRowCss: "grid-row-selected",

	/**
	 * The prefix of the DOM element of the action set for the active record.
	 * @protected
	 * @property {String} actionsRowPrefix
	 */
	actionsRowPrefix: "-actions-item-",

	/**
	 * Element of the DOM element template of the action set for the active record.
	 * @protected
	 * @property {Ext.Template} actionsRowTpl
	 */
	actionsRowTpl: new Ext.Template("<div id=\"{id}\" class=\"grid-row-actions\"></div>"),

	/**
	 * CSS class for hiding elements.
	 * @protected
	 * @property {String} hiddenCss
	 */
	hiddenCss: "grid-row-hidden",

	/**
	 * A set of "action" elements for the active registry entry.
	 * @protected
	 * @type {Array}
	 */
	actionItems: null,

	/**
	 * A set of storing links to the rows of the registry.
	 * @protected
	 * @type {Array}
	 */
	theoreticallyActiveRows: null,

	/**
	 * The ordinal number of the row from the end of the list which appearance in the visible part of the browser to track.
	 * @property {Number} watchRowInViewport
	 */
	watchRowInViewport: 0,

	/**
	 * @type {Array}
	 */
	watchRowHistory: null,

	translate: Terrasoft.Resources.Grid,

	isEmpty: false,

	isEmptyCaption: null,

	isEmptyHtmlConfig: null,

	isEmptyCss: "grid-empty",

	isLoading: false,

	isLoadingHtmlConfig: null,

	/**
	 * Indicates the need to add external rows to the registry.
	 * @cfg {Boolean} [useRowActionsExternal=false]
	 */
	useRowActionsExternal: false,

	/**
	 * The prefix for the DOM of the Container ID of the external row action handlers.
	 * @protected
	 * @property {String} rowActionsExternalPrefix
	 */
	rowActionsExternalPrefix: "-external-actions-item-",

	/**
	 * CSS class to denote the container element of the external processing of row actions in the DOM.
	 * @protected
	 * @property {String} rowActionsExternalCss
	 */
	rowActionsExternalCss: "grid-row-actions-external",

	/**
	 * Indicates the need to add icons for the help fields in the list registry.
	 * @cfg {Boolean} [useListedLookupImages=false]
	 */
	useListedLookupImages: false,

	bottomSpinnerSpaceTpl: new Ext.Template("<span class=\"grid-bottom-spinner-space\"></span>"),

	isLoadingSpinners: null,

	hasNestingColumnName: "",

	spinnerRowPrefix: "-spinner-row-",

	/**
	 * Listed grid captions row css class.
	 * @protected
	 */
	captionsCss: "grid-captions",

	/**
	 * Grid listed row css class prefix.
	 * @protected
	 */
	listedRowsCss: "grid-listed-row",

	/**
	 * Grid column element css class prefix.
	 * @protected
	 */
	colsCss: "grid-cols",

	/**
	 * If there is a row in the {@link Terrasoft.Grid # columnsConfig columnsConfig} markup row where not all cells
	 * are filled with data and this flag is set to false, then the row does not fit into the list markup.
	 * @property {Boolean} isEmptyRowVisible
	 */
	isEmptyRowVisible: true,

	disabledClass: "grid-disabled",

	/**
	 * The object of the custom message about the empty registry.
	 * @protected
	 * @type {Object}
	 */
	emptyMessageControl: null,

	/**
	 * Scroll element.
	 * @protected
	 * @type {Object}
	 */
	scrollEl: null,

	/**
	 * Scroll element identifier.
	 * @type {String}
	 */
	scrollElId: null,

	/**
	 * Allow scrolling to row that is activated.
	 * @type {Boolean}
	 */
	allowScrollToActiveRow: false,

	/**
	 * Use parent element for positioning.
	 * @type {Boolean}
	 */
	scrollParent: false,

	/**
	 * Default image column name.
	 * @type {String}
	 */
	defaultImageColumnName: null,

	/**
	 * Flag that indicates whether multiSelect mode can be changed with grid click when ctrl or shift key was pressed.
	 * @type {Boolean}
	 */
	canChangeMultiSelectWithGridClick: true,

	/**
	 * Removes from ExpandHierarchyLevels items without sublevels.
	 * @private
	 */
	_updateExpandHierarchyLevels: function() {
		if (this.collection) {
			this.collection.each(function(value) {
				var sublevels = [];
				this.getAllItemChildren(sublevels, value.get(this.primaryColumnName));
				if (sublevels.length === 0) {
					this.removeExpandHierarchyLevel(value.get(this.primaryColumnName));
				}
			}, this);
		}
	},

	/**
	 * Template of the span cell.
	 * @private
	 * @type {Array}
	 */
	_spanCellTemplate: [
		"<span grid-data-type=\"{type}\"",
		"<tpl if=\"direction\"> dir=\"{direction}\"</tpl>",
		"<tpl if=\"title\"> title=\"{title}\"</tpl>",
		">{text}</span>"
	],

	/**
	 * Compiled template of the span cell.
	 * @private
	 * @type {Ext.XTemplate}
	 */
	_spanCellXTemplate: null,

	/**
	 * @inheritdoc Terrasoft.controls.Component
	 * @override
	 */
	reRender: function(config) {
		this.initDefaultCollectionItemPrefix();
		if (config && config.byCollection && this.rows) {
			var rowsId = this.rows.map(function(item) {
				return item.Id;
			});
			var collection = this.collection;
			collection = collection && collection.filter(function(item, key) {
				return !Ext.Array.contains(rowsId, key);
			});
			this.callParent(arguments);
			this.onCollectionDataLoaded(null, collection, null);
		} else {
			this.callParent(arguments);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#constructor
	 * @protected
	 */
	constructor: function(config) {
		this.rows = config.rows || [];
		this.rowsStyles = config.rowsStyles || {};
		this.cellsClasses = config.cellsClasses || {};
		this.listedConfig = config.listedConfig || null;
		this.tiledConfig = config.tiledConfig || null;
		this.columnsConfig = this.initColumnsConfig(config);
		this.captionsConfig = this.initCaptionsConfig(config);
		this.activeRowActions = config.activeRowActions || [];
		this.watchRowInViewport = this.watchRowInViewport || Math.abs(this.watchRowInViewport);
		this.watchRowHistory = [];
		this.primaryColumnName = config.primaryColumnName || this.primaryColumnName;
		this.hierarchicalColumnName = config.hierarchicalColumnName || this.hierarchicalColumnName;
		this.isEmptyCaption = config.isEmptyCaption || this.translate.isEmptyCaption;
		this.isEmptyHtmlConfig = {
			tag: "div",
			cls: "grid-status-message-empty",
			html: this.isEmptyCaption
		};
		this.isLoadingHtmlConfig = {
			tag: "div",
			cls: "grid-status-message-loading"
		};
		this.hasNestingColumnName = config.hasNestingColumnName || this.hasNestingColumnName;
		this.callParent(arguments);
	},

	/**
	 * Extends the configuration of the columns to display the pictures of lookup fields.
	 * @private
	 * @param {Object} row Data to display the registry string.
	 * @param {Terrasoft.BaseViewModel} item Collection item.
	 * @param {String} columnName Model column.
	 */
	addLookupImageInfo: function(row, item, columnName) {
		if (this.type === "listed" && !this.useListedLookupImages) {
			return;
		}
		row.keyImgExtension = row.keyImgExtension || {};
		var entitySchema = item.entitySchema;
		var column = item.columns[columnName];
		var columnPath = (column) ? column.columnPath : columnName;
		if (entitySchema && (columnPath === entitySchema.primaryDisplayColumnName)) {
			entitySchema.primaryImageColumnName = entitySchema.primaryImageColumnName || this.defaultImageColumnName;
			var primaryImageColumnName = entitySchema.primaryImageColumnName;
			if (!primaryImageColumnName) {
				return;
			}
			var primaryImageColumnValue = item.get(primaryImageColumnName);
			if (primaryImageColumnValue) {
				row.keyImgExtension[columnName] = item.getSchemaImageUrl(primaryImageColumnName,
					Terrasoft.ImageSize.IMAGE32X32);
			}
			return;
		}
		column = item.columns[columnName];
		var lookupValue = item.get(columnName);
		var hasImage = Boolean(column && column.isLookup && lookupValue);
		if (hasImage) {
			var modelMethodName = item.defGetLookupImageUrlMethod;
			var modelMethod = item[modelMethodName];
			row.keyImgExtension[columnName] = modelMethod.call(item, columnName, Terrasoft.ImageSize.IMAGE32X32);
		}
	},

	/**
	 * Add information about the presence of nested records.
	 * @param {Object} row The data to display the list string.
	 * @param {Terrasoft.BaseViewModel} item A collection item.
	 */
	addHasNestingInfo: function(row, item) {
		this.hasNestingColumnName = item.defHasNestingColumnName || this.hasNestingColumnName;
		var hasNestingColumnName = this.hasNestingColumnName;
		var hasNesting = item.get(hasNestingColumnName);
		row[hasNestingColumnName] = parseInt(hasNesting, 10);
	},

	/**
	 * Gets the image size by the predefined data key type.
	 * @private
	 * @param {Terrasoft.GridKeyType} keyType Data key type.
	 * @return {Object} The object with the width and height of the required image.
	 */
	getIconSize: function(keyType) {
		var result = Terrasoft.ImageSize.DEFAULT;
		switch (keyType) {
			case Terrasoft.GridKeyType.ICON16:
			case Terrasoft.GridKeyType.ICON16LISTED:
				result = Terrasoft.ImageSize.IMAGE16X16;
				break;
			case Terrasoft.GridKeyType.ICON22LISTED:
			case Terrasoft.GridKeyType.ICON22:
				result = Terrasoft.ImageSize.IMAGE22X22;
				break;
			case Terrasoft.GridKeyType.ICON32LISTED:
			case Terrasoft.GridKeyType.ICON32:
				result = Terrasoft.ImageSize.IMAGE32X32;
				break;
		}
		return result;
	},

	/**
	 * Inserts item to DOM.
	 * @private
	 * @param {Terrasoft.BaseViewModel} item Collection item.
	 * @param {Number} [index] Item index.
	 */
	insertItem: function(item, index) {
		this.theoreticallyActiveRows = null;
		var row = this.getRow(item);
		var rows = [row];
		var result = [];
		this.renderGrid(result, {rows: rows});
		var resultHtml = "";
		for (var i = 0, c = result.length; i < c; i += 1) {
			resultHtml += Ext.DomHelper.createHtml(result[i]);
		}
		var options = {mode: "bottom"};
		if (index === 0) {
			options.mode = "top";
		} else if (index && Number(index) > 0) {
			var itemToInsertAfter = this.collection.getByIndex(index - 1);
			options.target = itemToInsertAfter.get(this.primaryColumnName);
			options.mode = "after";
		}
		this.addRows(resultHtml, options);
	},

	/**
	 * @inheritdoc Terrasoft.Component#init
	 * @protected
	 */
	init: function() {
		this.callParent(arguments);
		this.addEvents(
			/**
			 * @event
			 * The row is selected.
			 */
			"selectRow",
			/**
			 * @event
			 * Unselect a row.
			 */
			"unSelectRow",
			/**
			 * @event
			 * Record opening event.
			 */
			"openRecord",
			/**
			 * @event
			 * Sort by column event.
			 */
			"sortColumn",
			/**
			 * @event
			 * Any "action event" with an active list entry.
			 */
			"activeRowAction",
			/**
			 * @event
			 * Event of appearance of the monitored row in the visible part.
			 */
			"watchedRowInViewport",
			/**
			 * @event
			 * Event after row rendering.
			 */
			"afterRowRender",
			/**
			 * @event
			 * Event of opening or closing a branch of the hierarchy.
			 * @param {String} levelId
			 * @param {Boolean} state
			 */
			"updateExpandHierarchyLevels",
			/**
			 * @event
			 * Click event by reference.
			 */
			"linkClick",
			/**
			 * @event
			 * Middle button click.
			 */
			"linkMiddleClick",
			/**
			 * @event
			 * ####### ######### ####### ## ######.
			 */
			"linkMouseOver",
			/**
			 * @event
			 * ####### ######## ####### ############ ### ################# ######### # ###### #######.
			 */
			"getEmptyMessageConfig",
			/**
			 * @event
			 * The event is called when the drag element crosses the drop-zone.
			 */
			"dragOver",
			/**
			 * @event
			 * The event is called when the drag element is dropped above the drop zone.
			 */
			"dragDrop",
			/**
			 * @event
			 * The event is called when the drag element is released not over the drop zone.
			 */
			"invalidDrop",
			/**
			 * @event
			 * The event is called when the multiSelect property changed.
			 */
			"multiSelectChanged",
			/**
			 * @event
			 * The event is called when Enter key pressed.
			 */
			"enterkeypressed",
			/**
			 * @event
			 * The event is called to load more grid data.
			 */
			"loadMore"
		);

		this.selectors = {
			wrapEl: ""
		};
		this.classes = {
			wrapEl: ["grid"]
		};
		this.actionItems = [];
		this.checkboxes = [];
		this.selectedRows = [];
		this.expandHierarchyLevels = [];
		this.initDefaultCollectionItemPrefix();
	},

	/**
	 * Initializing prefix of the DOM element identifier corresponding to one model from the collection.
	 * @protected
	 */
	initDefaultCollectionItemPrefix: function() {
		this.collectionItemPrefix = "-item-";
	},

	/**
	 * The "dataLoaded" event handler for the Terrasoft.Collection collection.
	 * @protected
	 * @param {Terrasoft.Collection} collection Collection.
	 * @param {Terrasoft.Collection} newItems New items.
	 * @param {Object} settings Settings.
	 */
	onCollectionDataLoaded: function(collection, newItems, settings) {
		this.theoreticallyActiveRows = null;
		if (!this.rows.length) {
			this.collection = this.collection || collection;
			this.prepareCollectionData();
			this.safeRerender();
			return;
		}
		if (Ext.Object.isEmpty(newItems) || !this.rendered) {
			return;
		}
		var rows = [];
		var options = {
			rows: rows
		};
		newItems.each(function(item) {
			this.prepareCollectionItem(item);
			var row = this.getRow(item);
			rows.push(row);
			if (settings) {
				if (settings.mode !== "top") {
					this.rows.push(row);
				} else {
					this.rows.splice(0, 0, row);
				}
			}
		}, this);
		if (this.hierarchical && !newItems.isEmpty()) {
			var firstItem = newItems.getByIndex(0);
			var firstItemParent = firstItem.get(this.hierarchicalColumnName);
			options[this.hierarchicalColumnName] = firstItemParent;
			if (this.type === "listed" && firstItemParent) {
				var firstItemParentDom = this.getDomRow(firstItemParent);
				var parentLevel = parseInt(firstItemParentDom.getAttribute("level"), 10);
				options.rowLevel = parentLevel + 1;
			}
		}
		var result = [];
		this.renderGrid(result, options);
		var resultHtml = "";
		for (var i = 0, c = result.length; i < c; i += 1) {
			resultHtml += Ext.DomHelper.createHtml(result[i]);
		}
		if (Ext.Object.isEmpty(settings)) {
			settings = {
				mode: "bottom"
			};
		}
		this.addRows(resultHtml, settings);
		this.checkNeedLoadData();
	},

	/**
	 * Event handler for "add" event of {@link Terrasoft.Collection}.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} item Collection item.
	 */
	onAddItem: function(item) {
		this.insertItem(item);
	},

	/**
	 * Event handler for "replace" event of {@link Terrasoft.Collection}.
	 * @protected
	 * @param {Object} config Replace information.
	 * @param {Terrasoft.BaseViewModel} config.removedItem Removed item.
	 * @param {String} config.removedItemKey Removed item key.
	 * @param {Terrasoft.BaseViewModel} config.insertedItem Inserted item.
	 * @param {String} config.insertedItemKey Inserted item key.
	 * @param {Number} config.index Item index.
	 */
	onReplaceItem: function(config) {
		this.onDeleteItem(config.removedItem);
		this.insertItem(config.insertedItem, config.index);
		return false;
	},

	/**
	 * The event handler for the record update.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} item Collection item.
	 */
	onUpdateItem: function(item) {
		if (!this.rendered) {
			return;
		}
		this.theoreticallyActiveRows = null;
		var row = this.getRow(item);
		this.updateRow(row);
		var rows = [];
		rows.push(row);
		var options = {
			rows: rows
		};
		if (this.hierarchical) {
			this.addAllItemChildren(item, rows);
			this.addHierarchicalOptions(item, options);
		}
		var result = [];
		this.renderGrid(result, options);
		var resultHtml = "";
		for (var i = 0, c = result.length; i < c; i += 1) {
			resultHtml += Ext.DomHelper.createHtml(result[i]);
		}
		var id = item.get(this.primaryColumnName);
		var oldRow = this.getDomRow(id);
		var newRow = oldRow.insertSibling(resultHtml, "after");
		try {
			oldRow.replaceWith(newRow);
		} catch(e){}
		this.initCheckboxesEvents();
		this.initActionItems();
		this.initLinkEvents();
	},

	/**
	 * Updates row.
	 * @protected
	 * @param {Object} newRow New row.
	 */
	updateRow: function(newRow) {
		var primaryColumnName = this.primaryColumnName;
		var newRowPrimaryColumnValue = newRow[primaryColumnName];
		var rows = this.rows;
		for (var i = 0; i < rows.length; i++) {
			if (rows[i][primaryColumnName] === newRowPrimaryColumnValue) {
				rows[i] = newRow;
				return;
			}
		}
	},

	/**
	 * Removes the child elements of the parent from the DOM and adds them to an array of rows.
	 * @private
	 * @param {BaseViewModel} item A collection item.
	 * @param {Array} rows An array of strings.
	 */
	addAllItemChildren: function(item, rows) {
		var children = [];
		this.getAllItemChildren(children, item.get(this.primaryColumnName));
		Ext.each(children, function(child) {
			var id = child.get(this.primaryColumnName);
			var rowId = this.id + this.collectionItemPrefix + id;
			this.deleteItemRowActions(id);
			this.deleteItemCheckbox(id);
			this.deleteRow(rowId);
			this.deleteItemHierarchicalToggle(item);
			rows.push(this.getRow(child));
		}, this);
	},

	/**
	 * Returns all children elements.
	 * @param {Array} result The result that contains the children elements.
	 * @param {String} id Identifier.
	 * @return {Boolean} Child elements
	 */
	getAllItemChildren: function(result, id) {
		var collection = this.collection;
		collection.each(function(item) {
			var parent = item.get(this.hierarchicalColumnName);
			if (id === parent) {
				var itemId = item.get(this.primaryColumnName);
				result.push(item);
				this.getAllItemChildren(result, itemId);
			}
		}, this);
	},

	/**
	 * @deprecated
	 */
	getAllItemChilds: function(result, id) {
		this.log(Ext.String.format(Terrasoft.Resources.ObsoleteMessages.ObsoleteMethodMessage,
			"getAllItemChilds", "getAllItemChildren"));
		this.getAllItemChildren(result, id);
	},

	/**
	 * The "remove" event handler of the Terrasoft.Collection collection.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} item A collection item.
	 */
	onDeleteItem: function(item) {
		if (!this.rendered) {
			return;
		}
		this.theoreticallyActiveRows = null;
		var id = item.get(this.primaryColumnName);
		var rowId = this.id + this.collectionItemPrefix + id;
		if (this.multiSelect) {
			var currentSelectedRows = Ext.Array.clone(this.selectedRows);
			var selectedRows = Terrasoft.without(currentSelectedRows, id);
			this.setSelectedRows(selectedRows);
		} else if (id === this.activeRow) {
			this.setActiveRow(null);
		}
		this.deleteItemRowActions(id);
		this.deleteItemCheckbox(id);
		this.deleteRow(rowId);
		this.deleteItemFromRows(id);
		this.deleteItemHierarchicalToggle(item);
	},

	/**
	 * Deletes the entry with the specified identifier from the array of model objects.
	 * @private
	 * @param {String} id The unique identifier of the record.
	 */
	deleteItemFromRows: function(id) {
		this.rows = Ext.Array.filter(this.rows, function(row) {
			return row.Id !== id;
		}, this);
	},

	deleteItemRowActions: function(id) {
		var actionsRowId = this.id + this.actionsRowPrefix + id;
		this.actionItems.forEach(function(item) {
			if (actionsRowId === item.renderTo.id) {
				item.destroy();
			}
		}, this);
	},

	deleteItemCheckbox: function(id) {
		var itemIndex = _.findIndex(this.checkboxes, function(cb) {
			return cb.value === id;
		});
		if (itemIndex !== -1) {
			var itemsToDelete = this.checkboxes.splice(itemIndex, 1);
			if (itemsToDelete.length > 0) {
				itemsToDelete[0].destroy();
			}
		}
	},

	deleteRow: function(id) {
		this.theoreticallyActiveRows = null;
		var element = Ext.get(id);
		if (element) {
			Ext.removeNode(element.dom);
		}
	},

	addRows: function(rows, options) {
		if (!this.rendered) {
			return;
		}
		var mode = options.mode;
		switch (mode) {
			case "top":
				this.addRowsTop(rows);
				break;
			case "after":
				this.addRowsAfter(rows, options);
				break;
			case "child":
				this.addRowsChild(rows, options);
				break;
			case "bottom":
				this.addRowsBottom(rows, options);
				break;
		}
		this.initCheckboxesEvents();
		this.initActionItems();
		this.initDraggable();
		this.initLinkEvents();
	},

	initLinkEvents: function() {
		var wrapEl = this.getWrapEl();
		var gridLinks = wrapEl.select("a:not([id])");
		gridLinks.addListener("mouseover", this.onLinkMouseOver, this);
		gridLinks.each(function(el) {
			el.dom.id = el.id = Terrasoft.Component.generateId();
		}, this);
	},

	onLinkMouseOver: function(event, target) {
		var targetEl = Ext.get(target);
		var root = this.getWrapEl().dom;
		var rowId = this.getRowId(target);
		var link = targetEl.findParent("a", root, true);
		if (link) {
			if (rowId) {
				var options = {
					rowId: rowId,
					columnName: link.getAttribute("data-column"),
					targetId: link.getAttribute("id")
				};
				this.fireEvent("linkMouseOver", options);
			}
		}
	},

	addRowsTop: function(rows) {
		var insertPlace;
		var insertAfter;
		var type = this.type;
		var wrapEl = this.getWrapEl();
		if (type === "tiled") {
			insertAfter = wrapEl;
			insertPlace = "afterBegin";
		} else if (type === "listed") {
			var insertAfterSelect = wrapEl.select("." + this.captionsCss);
			insertAfter = insertAfterSelect.first();
			insertPlace = "afterEnd";
		}
		if (insertAfter) {
			Ext.DomHelper.insertHtml(insertPlace, insertAfter.dom, rows);
		}
	},

	addRowsAfter: function(rows, options) {
		var wrapEl = this.getWrapEl();
		var target = options.target;
		var where = "afterEnd";
		var element = Ext.get(this.id + this.collectionItemPrefix + target, wrapEl);
		var type = this.type;
		var hierarchical = this.hierarchical;
		if (type === "tiled") {
			if (hierarchical) {
				var childrenWrapper = element.parent("[class*=\"-children-\"]");
				if (childrenWrapper) {
					element = childrenWrapper;
				}
			}
		}
		if (element) {
			Ext.DomHelper.insertHtml(where, element.dom, rows);
		}
	},

	addRowsChild: function(rows, options) {
		if (!this.hierarchical) {
			return;
		}
		var wrapEl = this.getWrapEl();
		var target = options.target;
		var where = "beforeEnd";
		var element = Ext.get(this.id + this.collectionItemPrefix + target, wrapEl);
		var type = this.type;
		if (type === "tiled" && element) {
			var actionsRow = element.select(".grid-row-actions").first();
			if (actionsRow) {
				element = actionsRow;
				where = "afterEnd";
			}
		} else if (type === "listed") {
			where = "afterEnd";
		}
		if (element) {
			Ext.DomHelper.insertHtml(where, element.dom, rows);
		}
	},

	addRowsBottom: function(rows, options) {
		var wrapEl = this.getWrapEl();
		var element = wrapEl.select("[class=\"grid-bottom-spinner-space\"]").item(0);
		var where = "beforeBegin";
		if (options.hasOwnProperty("spinner") && options.spinner) {
			where = "afterBegin";
		}
		Ext.DomHelper.insertHtml(where, element.dom, rows);
	},

	/**
	 * A method that collects data from a collection into a flat array.
	 * @protected
	 */
	prepareCollectionData: function() {
		var collection = this.collection;
		collection.each(function(item) {
			this.prepareCollectionItem(item);
			var row = this.getRow(item);
			this.rows.push(row);
		}, this);
	},

	/**
	 * Prepares collection elements. Adds styles for new row and classes for grid cells. Sets primaryColumnName and
	 * primaryDisplayColumnName if necessary.
	 * @param {Object} item New element for processing.
	 * @protected
	 */
	prepareCollectionItem: function(item) {
		this.primaryColumnName = this.primaryColumnName || item.primaryColumnName;
		this.primaryDisplayColumnName = this.primaryDisplayColumnName || item.primaryDisplayColumnName;
		var style = this.getRowStyle(item);
		var cellsClasses = this.getCellsClasses(item);
		this.rowsStyles[item.get(this.primaryColumnName)] = style;
		Ext.apply(this.cellsClasses, cellsClasses);
	},

	/**
	 * List cleaning method. Both DOM elements and data stored in the list are deleted, but not in the collection.
	 */
	clear: function() {
		this.onDestroy(true);
		this.rows = [];
		this.rowsStyles = {};
		this.cellsClasses = {};
		this.theoreticallyActiveRows = null;
		this.watchRowHistory = [];
		var wrapEl = this.getWrapEl();
		if (wrapEl && this.rendered) {
			this.bottomSpinnerSpaceTpl.append(wrapEl);
		}
	},

	/**
	 * @private
	 */
	_onMouseDown: function() {
		document.getSelection().removeAllRanges();
	},

	/**
	 * @inheritdoc Terrasoft.Component#initDomEvents
	 * @protected
	 */
	initDomEvents: function() {
		this.callParent(arguments);
		var wrapEl = this.getWrapEl();
		wrapEl.on("click", this.onGridClick, this);
		wrapEl.on("dblclick", this.onGridDoubleClick, this);
		wrapEl.on("mousedown", this._onMouseDown, this);
		this.debounceWindowScroll = this.debounceWindowScroll || Terrasoft.debounce(this.onWindowScroll, 150);
		var scrollEl = this.getScrollElement(this.scrollElId);
		Ext.EventManager.addListener(scrollEl, "scroll", this.debounceWindowScroll, this);
		if (Ext.isIE11 || Ext.isChrome || Ext.isSafari || Ext.isOpera) {
			Ext.EventManager.addListener(scrollEl, "mousewheel", this.debounceWindowScroll, this);
		} else if (Ext.isGecko) {
			Ext.EventManager.addListener(scrollEl, "DOMMouseScroll", this.debounceWindowScroll, this);
		} else {
			Ext.EventManager.addListener(scrollEl, "onmousewheel", this.debounceWindowScroll, this);
		}
		wrapEl.un("keydown", this.onKeyDown, this);
		wrapEl.on("keydown", this.onKeyDown, this);
	},

	/**
	 * The browser's event scrolling event handler.
	 * @protected
	 */
	onWindowScroll: function() {
		if (this.watchRowInViewport) {
			this.checkWatchedRow();
		}
	},

	/**
	 * Check watched row visibility in browser window.
	 * @protected
	 */
	checkWatchedRow: function() {
		var watchRow = this._getWatchRow();
		if (!watchRow) {
			return;
		}
		var watchRowId = watchRow.dom.id;
		var inViewport = this.elementInViewport(watchRow);
		if (inViewport) {
			if (Ext.Array.indexOf(this.watchRowHistory, watchRowId) >= 0) {
				return;
			}
			this.watchRowHistory.push(watchRowId);
			this.fireEvent("watchedRowInViewport", watchRowId);
		}
	},

	/**
	 * Checks need load data.
	 * Fire event watchedRowInViewport if last row element in the viewport.
	 * @protected
	 * @return {Boolean} False if not fired watchedRowInViewport event.
	 */
	checkNeedLoadData: function() {
		if (!this.watchRowInViewport) {
			return false;
		}
		var watchRow = this._getWatchRow(function(rows) {
			return rows.length - 1;
		});
		if (!watchRow) {
			return false;
		}
		var watchRowId = watchRow.id;
		var inViewport = this.elementInViewport(watchRow);
		if (!inViewport) {
			return false;
		}
		var result = this.fireEvent("watchedRowInViewport", watchRowId);
		return result;
	},

	/**
	 * Gets watching row element.
	 * @private
	 * @param {Function} [watchRowIndexFn] Function calculate watch row index value.
	 * @return {null|Ext.Element} Watching row element.
	 */
	_getWatchRow: function(watchRowIndexFn) {
		watchRowIndexFn = watchRowIndexFn || Terrasoft.emptyFn;
		var rows = this.hierarchical ? this.getRootDomRows() : this.getDomRows();
		if (!rows || !this.isVisible()) {
			return null;
		}
		var watchRowIndex = watchRowIndexFn.call(this, rows) || rows.length - this.watchRowInViewport;
		if (!rows.length || watchRowIndex < 0) {
			return null;
		}
		var watchRow = Ext.get(rows[watchRowIndex]);
		return watchRow;
	},

	/**
	 * Calculates the intersection of the coordinates of the visible part of the browser screen and the specified element.
	 * @param {Ext.dom.Element} el
	 * @return {Boolean}
	 */
	elementInViewport: function(el) {
		if (!el) {
			return false;
		}
		var body = Ext.getBody();
		var bodyViewRegion = body.getViewRegion();
		var elViewRegion = el.getViewRegion();
		return elViewRegion.bottom < bodyViewRegion.bottom;
	},

	/**
	 * Returns target's row identifier.
	 * @private
	 * @param {HTMLElement} target Target element.
	 * @returns {String} Row identifier.
	 */
	getRowId: function(target) {
		var targetEl = Ext.get(target);
		var root = this.getWrapEl().dom;
		var row = targetEl.findParent("[class*=\"" + this.theoreticallyActiveRowCss + "\"]", root, true);
		var rowId;
		if (row) {
			rowId = row.id.replace(this.id + this.collectionItemPrefix, "");
		}
		return rowId;
	},

	/**
	 * The event handler for the registry click.
	 * @param {Ext.EventObject} event
	 * @param {HTMLElement} target
	 */
	onGridClick: function(event, target) {
		if (!this.enabled) {
			event.stopEvent();
			return;
		}
		var bubble = true;
		var type = this.type;
		var targetEl = Ext.get(target);
		var root = this.getWrapEl().dom;
		var rowId = this.getRowId(target);
		var link = targetEl.findParent("a", root, true);
		if (link && rowId) {
			bubble = false;
			this.handleLinkClick(rowId, link, event);
		}
		if (this.hierarchical && bubble) {
			var toggleRows = Ext.dom.Query.select("[id*=\"" + this.hierarchicalTogglePrefix + "\"]", root);
			Terrasoft.each(toggleRows, function(toggle) {
				if (target === toggle) {
					event.stopEvent();
					bubble = false;
					var id = toggle.id.replace(this.id + this.hierarchicalTogglePrefix, "");
					this.toggleHierarchyFolding(id);
					return false;
				}
			}, this);
		}
		if (type === "listed" && bubble) {
			var caption = targetEl.findParent("[id*=\"" + this.id + this.captionPrefix + "\"]", root, true);
			if (caption) {
				event.stopEvent();
				bubble = false;
				var index = caption.id.replace(this.id + this.captionPrefix, "");
				this.fireEvent("sortColumn", index);
			}
		}
		if (rowId && bubble) {
			event.stopEvent();
			bubble = false;
			if (this.hierarchical ||
				(!this.multiSelect && !this.canChangeMultiSelectWithGridClick) ||
				(!this.multiSelect && !event.ctrlKey && !event.shiftKey)) {
				this.setActiveRow(rowId);
			} else {
				this.selectMultiRows(event, rowId);
			}
		}
	},

	/**
	 * @private
	 */
	_getRowsId: function() {
		return this.collection.getItems().map((item) => item.get(this.primaryColumnName));
	},

	/**
	 * @protected
	 */
	selectMultiRows: function(event, targetRow) {
		let activeRow = this.activeRow;
		if (!this.multiSelect) {
			this.setMultiSelect(true);
		}
		Terrasoft.defer(function() {
			if (event.shiftKey) {
				const rowsId = this._getRowsId();
				const finish = rowsId.indexOf(targetRow);
				if (!activeRow) {
					let minDistance = Number.MAX_VALUE;
					this.selectedRows.forEach(function(row) {
						const index = rowsId.indexOf(row);
						var distance = Math.abs(index - finish);
						if (minDistance > distance) {
							minDistance = distance;
							activeRow = row;
						}
					}, this);
				}
				const start = rowsId.indexOf(activeRow);
				if (start > -1 && finish > -1) {
					const selectRowsId = start > finish
						? rowsId.slice(finish, start + 1)
						: rowsId.slice(start, finish + 1);
					selectRowsId.forEach(function(rowId) {
						this.selectRowWithCheckbox(rowId, true);
					}, this);
				}
			} else {
				var targetRowChecked = _.contains(this.selectedRows, targetRow);
				this.selectRowWithCheckbox(targetRow, !targetRowChecked);
				if (event.ctrlKey && activeRow && activeRow !== targetRow) {
					this.selectRowWithCheckbox(activeRow, true);
				}
			}
		}, this);
	},

	/**
	 * Handles grid link click.
	 * @protected
	 * @param {String} rowId Row identifier.
	 * @param {HTMLElement} link Link html element.
	 * @param {Ext.EventObject} event Click event.
	 */
	handleLinkClick: function(rowId, link, event) {
		var linkClickResult;
		var href = link.getAttribute("href");
		var columnName = link.getAttribute("data-column");
		/**
		 * @event linkClick
		 * @param {String} rowId Clicked row identifier.
		 * @param {String} href Link href attribute.
		 * @param {String} columnName Column name.
		 */
		var mouseButton = Terrasoft.getMouseButton(event);
		if (mouseButton === Terrasoft.MouseButton.LEFT) {
			linkClickResult = this.fireEvent("linkClick", rowId, columnName, href);
			if (linkClickResult === false) {
				event.stopEvent();
			}
		}
		if (mouseButton === Terrasoft.MouseButton.MIDDLE) {
			linkClickResult = this.fireEvent("linkMiddleClick", rowId, columnName, href);
			if (linkClickResult === false) {
				event.stopEvent();
			}
		}
	},

	/**
	 * Method for obtaining references to all rows of the list in the DOM.
	 * @param {Object} root
	 * @return {Array|theoreticallyActiveRows}
	 */
	getDomRows: function(root) {
		if (!root) {
			var wrapEl = this.getWrapEl();
			if (wrapEl && wrapEl.dom) {
				root = wrapEl.dom;
			}
		}
		if ((!this.theoreticallyActiveRows || !this.theoreticallyActiveRows.length) && root) {
			this.theoreticallyActiveRows = Ext.dom.Query.select("[class*=\"" + this.theoreticallyActiveRowCss + "\"]",
				root);
		}
		return this.theoreticallyActiveRows;
	},

	/**
	 * Returns array of grid root rows.
	 * @param {Object} root Root dom element.
	 * @returns {Object[]} Root rows array.
	 */
	getRootDomRows: function(root) {
		if (!root) {
			var wrapEl = this.getWrapEl();
			if (wrapEl && wrapEl.dom) {
				root = wrapEl.dom;
			}
		}
		var result = [];
		if (root) {
			var selectorString = Ext.String.format("#{0}> .{1}:not([class*='{2}'])", root.id,
				this.theoreticallyActiveRowCss, this.hierarchicalChildrenPrefix);
			result = Ext.dom.Query.select(selectorString);
		}
		return result;
	},

	/**
	 * Returns grid dom rows array.
	 * @param {String} id Row id.
	 * @return {Ext.dom.Element} Returns a reference to the list row in the DOM.
	 */
	getDomRow: function(id) {
		if (!this.rendered || !id) {
			return;
		}
		var root = this.getWrapEl();
		var result = root.getById(this.id + this.collectionItemPrefix + id);
		return result;
	},

	/**
	 * Double event click event handler.
	 * @param {Ext.EventObject} event
	 */
	onGridDoubleClick: function(event) {
		if (!this.enabled || this.multiselect) {
			event.stopEvent();
			return;
		}
		var root = this.getWrapEl().dom;
		var theoreticallyActiveRows = Ext.dom.Query.select("[class*=\"" + this.theoreticallyActiveRowCss + "\"]", root);
		var row = _.find(theoreticallyActiveRows, (row) => event.within(row));
		if (row) {
			event.stopEvent();
			var id = row.id.replace(this.id + this.collectionItemPrefix, "");
			this.fireEvent("openRecord", id);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Component#onAfterRender
	 * @protected
	 */
	onAfterRender: function() {
		this.callParent(arguments);
		this.initCheckboxesEvents();
		this.initActionItems();
		this.initLinkEvents();
		this.initRowActionsExternal();
		var emptyMessageConfig = this.loadEmptyMessageConfig();
		if (!Ext.Object.isEmpty(emptyMessageConfig)) {
			this.displayIsEmpty(emptyMessageConfig);
		}
		this.mixins.draggable.onAfterRender.apply(this, arguments);
		this.checkNeedLoadData();
	},

	onAfterReRender: function() {
		this.callParent(arguments);
		this.initCheckboxesEvents();
		this.initActionItems();
		this.initLinkEvents();
		this.initRowActionsExternal();
		var emptyMessageConfig = this.loadEmptyMessageConfig();
		if (!Ext.Object.isEmpty(emptyMessageConfig)) {
			this.displayIsEmpty(emptyMessageConfig);
		}
		this.mixins.draggable.onAfterReRender.apply(this, arguments);
		this.checkNeedLoadData();
	},

	onBeforeReRender: function() {
		if (this.forceUpdateExpandHierarchyLevels) {
			this._updateExpandHierarchyLevels();
		}
		this.callParent(arguments);
		this.onDestroy(true);
	},

	/**
	 * Assignment of checkbox events.
	 * @protected
	 */
	initCheckboxesEvents: function() {
		var self = this;
		this.checkboxes.forEach(function(item) {
			if (!item.rendering) {
				return;
			}
			item.init();
			item.onAfterRender();
			item.on("click", self.onCheckboxClick, self);
		}, self);
	},

	initActionItems: function() {
		let list;
		if (this.multiSelect) {
			list = this.selectedRows;
		} else {
			list = this.activeRow ? [this.activeRow] : [];
		}
		list.forEach(function(item) {
			this.addRowActions(item);
		}, this);
	},

	initRowActionsExternal: function() {
		if (!this.useRowActionsExternal) {
			return;
		}
		var domRows = this.getDomRows();
		domRows.forEach(function(row) {
			var id = row.id.replace(this.id + this.collectionItemPrefix, "");
			var renderTo = Ext.get(row).select("#" + this.id + this.rowActionsExternalPrefix + id + " div").item(0);
			if (id && renderTo) {
				this.fireEvent("afterRowRender", id, renderTo);
			}
		}, this);
	},

	/**
	 * The handler of the click event on the checkbox.
	 * @param {Terrasoft.CheckBoxEdit} checkbox
	 */
	onCheckboxClick: function(checkbox) {
		var value = checkbox.value;
		var checked = checkbox.checked;
		this.changeRowChecked(value, checked);
	},

	/**
	 * Changes row checked state.
	 * @param {String} value Row identifier.
	 * @param {Boolean} checked New checked value.
	 */
	changeRowChecked: function(value, checked) {
		this.setRowSelected(value, checked);
		if (checked) {
			this.addRowActions(value);
			this.fireEvent("selectRow", value);
		} else {
			this.removeRowActions(value);
			this.fireEvent("unSelectRow", value);
		}
		this.fireEvent("rowsSelectionChanged");
	},

	/**
	 * @private
	 */
	selectRowWithCheckbox: function(rowId, value) {
		if (value && _.contains(this.selectedRows, rowId)) {
			return;
		}
		if (rowId) {
			this.changeRowChecked(rowId, value);
			_.filter(this.checkboxes, {value: rowId}).forEach(function(checkbox) {
				checkbox.setChecked(value);
			}, this);
			if (value) {
				this.activateRow(rowId);
				this.activeRow = rowId;
			} else {
				this.deactivateRow(rowId);
				this.activeRow = null;
			}
		}
	},

	/**
	 * Marks selected entries in the list by the list of identifiers newSelectedIds.
	 * With records, identifiers of which are not in this list, the selection is removed if it was.
	 * @param {String []} newSelectedIds
	 */
	setSelectedRows: function(newSelectedIds) {
		if (!Ext.isArray(newSelectedIds)) {
			return;
		}
		var selectedRows = Ext.Array.clone(this.selectedRows);
		var newSelectedLength = newSelectedIds.length;
		var oldSelectedIds = this.selectedRows;
		var oldSelectedLength = oldSelectedIds.length;
		var iterator = 0;
		for (; iterator < oldSelectedLength; iterator++) {
			var oldId = oldSelectedIds[iterator];
			if (!Terrasoft.contains(newSelectedIds, oldId)) {
				this.unselectRow(oldId);
				selectedRows = Terrasoft.without(selectedRows, oldId);
			}
		}
		iterator = 0;
		for (; iterator < newSelectedLength; iterator++) {
			var newId = newSelectedIds[iterator];
			if (!Terrasoft.contains(oldSelectedIds, newId)) {
				this.selectRow(newId);
				selectedRows.push(newId);
			}
		}
		this.selectedRows = selectedRows;
		this.fireEvent("rowsSelectionChanged");
	},

	/**
	 * Selects a line in the multiple selection mode.
	 * @protected
	 * @param {String} id The identifier of the string.
	 */
	selectRow: function(id) {
		if (this.rendered) {
			this.setCheckboxChecked(id, true);
			this.addRowActions(id);
		}
		this.fireEvent("selectRow", id);
	},

	/**
	 * Removes selection from a line in the multiple selection mode.
	 * @protected
	 * @param {String} id The identifier of the string.
	 */
	unselectRow: function(id) {
		if (this.rendered) {
			this.setCheckboxChecked(id, false);
			this.removeRowActions(id);
		}
		this.fireEvent("unSelectRow", id);
	},

	/**
	 * Specifies or deselects the checkbox.
	 * @param {String} id The identifier of the record; If the collection is connected,
	 * then this is the ID of the entry in the collection.
	 * @param {Boolean} checked
	 */
	setCheckboxChecked: function(id, checked) {
		if (!this.multiSelect) {
			return;
		}
		var checkboxes = this.checkboxes;
		for (var i = 0, c = checkboxes.length; i < c; i += 1) {
			var checkbox = checkboxes[i];
			if (checkbox.value !== id) {
				continue;
			}
			checkbox.setChecked(checked);
			this.setRowSelected(id, checked);
		}
	},

	/**
	 * Specifies or deselects a row.
	 * @param {String} id The identifier of the record; If the collection is connected,
	 * then this is the ID of the entry in the collection.
	 * @param {Boolean} selected
	 */
	setRowSelected: function(id, selected) {
		var selectedRows = Ext.Array.clone(this.selectedRows);
		var root = this.getWrapEl().dom;
		var domId = this.id + this.collectionItemPrefix + id;
		var element = Ext.get(Ext.dom.Query.selectNode("#" + domId, root));
		if (selected) {
			element && element.addCls(this.selectedRowCss);
			selectedRows.push(id);
		} else {
			element && element.removeCls(this.selectedRowCss);
			selectedRows = Terrasoft.without(this.selectedRows, id);
		}
		this.selectedRows = selectedRows;
	},

	/**
	 * Sets active row.
	 * @param {String||Object} newRowConfig Row unique identifier or row config.
	 * @param {String} newRowConfig.value Row unique identifier.
	 * @param {Boolean} newRowConfig.scrollPageToActiveRow Is need to scroll page to active row.
	 */
	setActiveRow: function(newRowConfig) {
		const newId = Ext.isObject(newRowConfig) ? newRowConfig.value : newRowConfig;
		const oldId = this.activeRow;
		if (!oldId && !newId) {
			return;
		}
		const valueChanged = newId !== oldId;
		if (valueChanged && newId) {
			const canExecute = oldId && this.canExecute({
				method: this.setActiveRow,
				args: arguments
			});
			if (canExecute === false) {
				return;
			}
		}
		if (valueChanged) {
			this.deactivateRow(oldId);
			this.activateRow(newId);
			this.activeRow = newId;
			this.expandHierarchyToActiveRow(newId);
			this.scrollPageToActiveRow(newRowConfig);
			this.fireEvent("unSelectRow", oldId);
			this.fireEvent("selectRow", this.activeRow);
		}
	},

	/**
	 * Scroll page to active row.
	 * @protected
	 * @param {Object} newRowConfig New row config.
	 * @param {String} newRowConfig.value Row unique identifier.
	 * @param {Boolean} newRowConfig.scrollPageToActiveRow Is need to scroll page to active row.
	 */
	scrollPageToActiveRow: function(newRowConfig) {
		var value = newRowConfig && newRowConfig.value;
		if (!this.rendered || !value || !newRowConfig.scrollPageToActiveRow) {
			return;
		}
		var row = this.getDomRow(value);
		if (!row) {
			return;
		}
		Terrasoft.setTopScroll(row.getTop());
	},

	/**
	 * Activates row.
	 * @param {String|Number} id Row id.
	 */
	activateRow: function(id) {
		if (!this.rendered || !id) {
			return;
		}
		var row = this.getDomRow(id);
		if (!row) {
			return;
		}
		if (this.allowScrollToActiveRow) {
			var parentEl = this.getWrapEl();
			Terrasoft.utils.dom.scrollToEl(row, parentEl, this.scrollParent);
		}
		row.addCls(this.activeRowCss);
		this.addRowActions(id);
	},

	/**
	 * Deactivates row.
	 * @param {String|Number} id Row unique identifier.
	 */
	deactivateRow: function(id) {
		if (!this.rendered || !id) {
			return;
		}
		var row = this.getDomRow(id);
		if (!row) {
			return;
		}
		row.removeCls(this.activeRowCss);
		this.removeRowActions(id);
	},

	/**
	 * Optionally adds or displays a row with "actions" for the active list entry.
	 * Accepts the data record ID as a parameter.
	 * @protected
	 * @param {String | Number} id The identifier of the record.
	 */
	addRowActions: function(id) {
		if (!this.activeRowActions.length || !this.isRowActionsVisible) {
			return;
		}
		var actionsRow = Ext.get(this.id + this.actionsRowPrefix + id);
		if (!actionsRow) {
			var renderTo = this.createActionsRow(id);
			if (renderTo) {
				this.renderRowActions(renderTo, id);
			}
		} else {
			actionsRow.removeCls(this.hiddenCss);
		}
	},

	/**
	 * Creates a row with "actions" for the active list entry
	 * @param {String | Number} id The identifier of the record.
	 * @return {HTMLElement | Ext.Element} A row with "actions".
	 */
	createActionsRow: function(id) {
		var item = Ext.get(this.id + this.collectionItemPrefix + id);
		if (!item) {
			return;
		}
		var type = this.type;
		var hierarchical = this.hierarchical;
		var renderTo;
		var where = "beforeEnd";
		var el = item.dom;
		var html = this.actionsRowTpl.apply({
			id: this.id + this.actionsRowPrefix + id
		});
		if (this.useRowActionsExternal) {
			var rowActionsExternal = item.select("#" + this.id + this.rowActionsExternalPrefix + id);
			if (rowActionsExternal.getCount()) {
				where = "beforeBegin";
				el = rowActionsExternal.first().dom;
			}
		}
		if (type === "tiled" && hierarchical) {
			var firstChildren = item.child("[class*=\"" + this.hierarchicalChildrenPrefix + "\"]", true);
			if (firstChildren) {
				where = "beforeBegin";
				el = firstChildren;
			}
		}
		var renderToNode = Ext.DomHelper.insertHtml(where, el, html);
		renderTo = Ext.get(renderToNode);
		return renderTo;
	},

	/**
	 * Hides the row of "actions" for the active list entry.
	 * Accepts the data record ID as a parameter.
	 * @protected
	 * @param {String | Number} id
	 */
	removeRowActions: function(id) {
		if (!this.activeRowActions.length) {
			return;
		}
		var actionsRow = Ext.get(this.id + this.actionsRowPrefix + id);
		if (actionsRow) {
			actionsRow.addCls(this.hiddenCss);
		}
	},

	/**
	 * Visualize the "action" elements for an active list entry.
	 * @protected
	 * @param {HTMLElement / Ext.Element} renderTo
	 * @param {String | Number} id
	 */
	renderRowActions: function(renderTo, id) {
		var rowActions = Ext.clone(this.activeRowActions);
		var self = this;

		function itemHandler(menu, item) {
			self.onActionItemClick(item.tag, id);
		}

		function actionHandler() {
			self.onActionItemClick(this.tag, id);
		}

		for (var i = 0, c = rowActions.length; i < c; i += 1) {
			var action = rowActions[i];
			action.renderTo = renderTo;
			if (action.hasOwnProperty("menu") && action.menu.hasOwnProperty("items")) {
				var items = action.menu.items;
				if (items && !items.bindTo) {
					for (var j in items) {
						if (!items[j].hasOwnProperty("handler")) {
							items[j].handler = itemHandler;
						}
					}
				}
			} else {
				Ext.merge(action, {listeners: {click: actionHandler}});
			}
			var actionItem = Ext.create(action.className, action);
			if (this.collection) {
				var selectedViewModel = this.collection.get(id);
				actionItem.bind(selectedViewModel);
			}
			actionItem.setEnabled(this.enabled);
			this.actionItems.push(actionItem);
		}
	},

	/**
	 * The click handler for the "action" element for the active list entry.
	 * @param {String} tag
	 * @param {String} id
	 */
	onActionItemClick: function(tag, id) {
		this.fireEvent("activeRowAction", tag, id);
	},

	/**
	 * Method for creating the Terrasoft.CheckBoxEdit element.
	 * @protected
	 * @param {Object} config
	 * @return {Terrasoft.CheckBoxEdit}
	 */
	createCheckbox: function(config) {
		return Ext.create("Terrasoft.CheckBoxEdit", config);
	},

	/**
	 * Returns the template configuration.
	 * @protected
	 * @param {Array} wrapElClasses Element classes.
	 * @param {String} type Type of layout of the grid.
	 * @return {Object} Template configuration.
	 */
	generateHtmlTpl: function(wrapElClasses, type) {
		var htmlConfig = {
			tag: "div",
			id: "grid-" + this.id + "-wrap",
			tabindex: 0,
			cls: wrapElClasses.join(" "),
			children: []
		};
		if (this.isEmpty) {
			var emptyMessageConfig = this.loadEmptyMessageConfig();
			if (Ext.Object.isEmpty(emptyMessageConfig)) {
				htmlConfig.children.push(this.isEmptyHtmlConfig);
			}
			htmlConfig.cls += " " + this.isEmptyCss;
		} else {
			if (type === "listed") {
				htmlConfig.children.push(this.renderCaptionsRow());
			}
			this.renderGrid(htmlConfig.children, {});
		}
		htmlConfig.children.push(this.bottomSpinnerSpaceTpl.apply());
		return htmlConfig;
	},

	/**
	 * Returns a item prefix of the collection.
	 * @protected
	 * @return {String} A item prefix of the collection.
	 */
	generateCollectionItemPrefix: function() {
		if (Terrasoft.Features.getIsEnabled("GenerateGridItemPrefixWithGuid")) {
			return Ext.String.format("-{0}{1}", Terrasoft.generateGUID(), this.collectionItemPrefix);
		}
		return this.collectionItemPrefix;
	},

	/**
	 * @inheritdoc Terrasoft.Component#generateHtml
	 * @protected
	 */
	generateHtml: function() {
		if (this.visible !== true) {
			this.tpl = "";
			return "";
		}
		this.collectionItemPrefix = this.generateCollectionItemPrefix();
		this.selectors.wrapEl = "#grid-" + this.id + "-wrap";
		var hierarchical = this.hierarchical;
		var multiSelect = this.multiSelect;
		var type = this.type;
		var wrapElClasses = this.classes.wrapEl;
		var listedZebra = this.listedZebra;
		Ext.Array.remove(wrapElClasses, "grid-tiled");
		Ext.Array.remove(wrapElClasses, "grid-listed");
		Ext.Array.remove(wrapElClasses, "grid-listed-zebra");
		if (type === "tiled") {
			wrapElClasses.push("grid-tiled");
		} else if (type === "listed") {
			wrapElClasses.push("grid-listed");
			if (listedZebra) {
				wrapElClasses.push("grid-listed-zebra");
			}
		}
		Ext.Array.remove(wrapElClasses, "grid-hierarchical");
		if (hierarchical) {
			wrapElClasses.push("grid-hierarchical");
		}
		Ext.Array.remove(wrapElClasses, "grid-multiselect");
		if (multiSelect) {
			wrapElClasses.push("grid-multiselect");
		}
		Ext.Array.remove(wrapElClasses, this.disabledClass);
		if (!this.enabled) {
			wrapElClasses.push(this.disabledClass);
		}
		var htmlConfig = this.generateHtmlTpl(wrapElClasses, type);
		this.tpl = Ext.DomHelper.markup(htmlConfig);
		return this.callParent(arguments);
	},

	/**
	 * ##### ###### ####### ########## # ########### ## ######### #### ####### ########## ## ######### #####.
	 * @protected
	 * @param {Array} result
	 * @param {Object} options
	 */
	renderGrid: function(result, options) {
		var hierarchical = this.hierarchical;
		var type = this.type;
		if (hierarchical) {
			if (type === "listed") {
				this.renderListedHierarchicalGrid(result, options);
			} else if (type === "tiled") {
				this.renderTiledHierarchicalGrid(result, options);
			}
		} else if (type === "listed") {
			this.renderListedGrid(result, options);
		} else if (type === "tiled") {
			this.renderTiledGrid(result, options);
		}

	},

	/**
	 * ##### ######## ################ ####### ### ########## ####### ########### ## ######### #####.
	 * @protected
	 * @param {Array} result
	 * @param {Object} options
	 */
	renderTiledGrid: function(result, options) {
		var rows = options.rows || this.rows;
		for (var index = 0, length = rows.length; index < length; index += 1) {
			var row = rows[index];
			options.row = row;
			var id = (row[this.primaryColumnName] || index).toString();
			var rowStyles = this.rowsStyles[id];
			var htmlConfig = this.getDefaultRowHtmlConfig(row);
			Ext.apply(htmlConfig, {
				tag: "div",
				cls: "grid-row grid-pad " + this.theoreticallyActiveRowCss,
				style: Ext.DomHelper.generateStyles(rowStyles),
				id: this.id + this.collectionItemPrefix + id,
				children: []
			});
			if (this.multiSelect) {
				var checkbox = this.createCheckbox({
					value: id
				});
				if (Terrasoft.contains(this.selectedRows, id)) {
					htmlConfig.cls += " " + this.selectedRowCss;
					checkbox.setChecked(true);
				}
				htmlConfig.children.push({
					tag: "div",
					cls: "grid-fixed-col",
					html: checkbox.generateHtml()
				});
				this.checkboxes.push(checkbox);
			} else if (this.activeRow === id) {
				htmlConfig.cls += " " + this.activeRowCss;
			}
			this.renderColumns(htmlConfig.children, options);
			if (this.useRowActionsExternal) {
				htmlConfig.children.push({
					tag: "div",
					id: this.id + this.rowActionsExternalPrefix + id,
					cls: this.rowActionsExternalCss,
					children: [
						{
							tag: "div",
							cls: this.colsCss + "-24"
						}
					]
				});
			}
			result.push(htmlConfig);
		}
	},

	getDefaultRowHtmlConfig: function(row) {
		var htmlConfig = {};
		var rowDataItemMarkerColumnName = this.rowDataItemMarkerColumnName || this.primaryDisplayColumnName;
		if (rowDataItemMarkerColumnName) {
			var markerValue = row[rowDataItemMarkerColumnName];
			if (!Ext.isEmpty(markerValue)) {
				Ext.apply(htmlConfig, {
					"data-item-marker": this.encodeHtml(markerValue)
				});
			}
		}
		return htmlConfig;
	},

	/**
	 * ##### ######## ################ ####### ### ########## ####### ########### ## ######### #####.
	 * @protected
	 * @param {Array} result
	 * @param {Object} options
	 */
	renderListedGrid: function(result, options) {
		var rows = options.rows || this.rows;
		for (var index = 0, length = rows.length; index < length; index += 1) {
			var row = rows[index];
			options.row = row;
			var id = (row[this.primaryColumnName] || index).toString();
			var rowStyles = this.rowsStyles[id];
			var htmlConfig = this.getDefaultRowHtmlConfig(row);
			Ext.apply(htmlConfig, {
				tag: "div",
				cls: this.listedRowsCss + " " + this.theoreticallyActiveRowCss,
				style: Ext.DomHelper.generateStyles(rowStyles),
				id: this.id + this.collectionItemPrefix + id,
				children: []
			});
			this.renderColumns(htmlConfig.children, options);
			if (this.multiSelect) {
				htmlConfig.children.unshift({
					tag: "div",
					cls: "grid-fixed-col",
					html: ""
				});
				var fixedCol = htmlConfig.children[0];
				var checkbox = this.createCheckbox({
					classes: {
						wrapClass: ["grid-listed-row-control"]
					},
					value: id
				});
				if (Terrasoft.contains(this.selectedRows, id)) {
					htmlConfig.cls += " " + this.selectedRowCss;
					checkbox.setChecked(true);
				}
				fixedCol.html = checkbox.generateHtml() + htmlConfig.children[0].html;
				this.checkboxes.push(checkbox);
			} else if (this.activeRow === id) {
				htmlConfig.cls += " " + this.activeRowCss;
			}
			result.push(htmlConfig);
		}
	},

	/**
	 * The method for starting the data rendering on the row settings file.
	 * @protected
	 * @param {Array} result
	 * @param {Object} options
	 */
	renderColumns: function(result, options) {
		var columns = this.getColumnsConfig();
		for (var level = 0, length = columns.length; level < length; level += 1) {
			var column = columns[level];
			if (Ext.isArray(column)) {
				options.column = column;
				this.renderRow(result, options);
			} else if (Ext.isObject(column)) {
				options.cell = column;
				this.renderCell(result, options);
			}
		}
	},

	/**
	 * Depending on the type, returns the current configuration of the columns.
	 * @protected
	 * @return {Array}
	 */
	getColumnsConfig: function() {
		var type = this.type;
		var config = this[type + "Config"];
		return (config ? config.columnsConfig : this.columnsConfig);
	},

	/**
	 * Depending on the type, returns the current header configuration.
	 * @return {Array}
	 */
	getCaptionsConfig: function() {
		var type = this.type;
		var config = this[type + "Config"];
		return (config ? config.captionsConfig : this.captionsConfig);
	},

	/**
	 * Initializes the initial value of the column configuration.
	 * @param {Object} gridConfig
	 * @return {Array}
	 */
	initColumnsConfig: function(gridConfig) {
		var type = gridConfig.type;
		var config = this[type + "Config"];
		var columnsConfig = (config ? config.columnsConfig : gridConfig.columnsConfig) || [];
		if (!gridConfig.columnsConfig) {
			gridConfig.columnsConfig = columnsConfig;
		}
		return columnsConfig;
	},

	/**
	 * Initializes the initial value of the header configuration.
	 * @param {Object} gridConfig
	 * @return {Array}
	 */
	initCaptionsConfig: function(gridConfig) {
		var type = gridConfig.type;
		var config = this[type + "Config"];
		var captionsConfig = (config ? config.captionsConfig : gridConfig.captionsConfig) || [];
		if (!gridConfig.captionsConfig) {
			gridConfig.captionsConfig = captionsConfig;
		}
		return captionsConfig;
	},

	/**
	 * Prepares config and render cell.
	 * @private
	 * @param {Object} renderRowOptions Render row options.
	 * @param {Object} column Profile column.
	 * @param {Object} htmlConfig Html config.
	 * @return {Number} Cell ready state.
	 */
	renderRowCell: function(renderRowOptions, column, htmlConfig) {
		renderRowOptions.cell = column;
		if (htmlConfig.cls.indexOf("grid-module") < 0) {
			htmlConfig.cls += " grid-module";
		}
		return this.renderCell(htmlConfig.children, renderRowOptions);
	},

	/**
	 * Renders vertical grid cells.
	 * @private
	 * @param {Object} column Profile column.
	 * @param {Number} rowReadyState Current row state.
	 * @param {Object} renderRowOptions Render row options.
	 * @param {Object} htmlConfig Html config.
	 * @return {Number} Current row state
	 */
	renderVerticalGridCells: function(column, rowReadyState, renderRowOptions, htmlConfig) {
		Terrasoft.each(column, function(col) {
			rowReadyState += this.renderRowCell(renderRowOptions, col, htmlConfig);
		}, this);
		return rowReadyState;
	},

	/**
	 * Render row.
	 * @protected
	 * @param {Array} result
	 * @param {Object} options
	 */
	renderRow: function(result, options) {
		var rowReadyState = 0;
		var htmlConfig = {
			tag: "div",
			cls: "grid-row",
			children: []
		};
		var verticalCellElementLength = 0;
		var length = options.column.length;
		for (var level = 0; level < length; level += 1) {
			var column = options.column[level];
			var newRenderOptions = Terrasoft.deepClone(options);
			if (Ext.isArray(column)) {
				if (this.isVertical) {
					verticalCellElementLength = column.length;
					rowReadyState = this.renderVerticalGridCells(column, rowReadyState, newRenderOptions, htmlConfig);
				} else {
					newRenderOptions.column = column;
					this.renderRow(htmlConfig.children, newRenderOptions);
					rowReadyState += 1;
				}
			} else if (Ext.isObject(column)) {
				rowReadyState += this.renderRowCell(newRenderOptions, column, htmlConfig);
			}
		}
		if (this.isEmptyRowVisible === false &&
			((!this.isVertical && length > rowReadyState) ||
				(this.isVertical && verticalCellElementLength > rowReadyState))) {
			return;
		}
		if (rowReadyState > 0) {
			result.push(htmlConfig);
		}
	},

	/**
	 * ######### ######.
	 * @protected
	 * @param {Array} result
	 * @param {Object} options
	 */
	renderCell: function(result, options) {
		var cellReadyState = 0;
		var cell = options.cell;
		var data = options.row;
		var link = this.getDataKey(options.cell.link);
		var styles = {};
		var cls = this.colsCss + "-" + cell.cols;
		if (cell.classes && Ext.isArray(cell.classes)) {
			cls += " " + cell.classes.join(" ");
		}
		var htmlConfig = {
			tag: "div",
			cls: cls,
			html: "",
			children: [],
			"grid-cell-type": []
		};
		if (cell.minHeight) {
			styles["min-height"] = cell.minHeight;
		}
		if (cell.maxHeight) {
			styles["max-height"] = cell.maxHeight;
			styles.overflow = "hidden";
		}
		htmlConfig.style = Ext.DomHelper.generateStyles(styles);
		var key = cell.key;
		if (Ext.isArray(key)) {
			for (var i = 0, length = key.length; i < length; i += 1) {
				var column = key[i];
				cellReadyState += this.formatCellContent(htmlConfig, data, column, link);
			}
		} else if (Ext.isObject(key)) {
			cellReadyState += this.formatCellContent(htmlConfig, data, key, link);
		}
		htmlConfig["grid-cell-type"] = Ext.Array.intersect(htmlConfig["grid-cell-type"]);
		if (htmlConfig["grid-cell-type"].length > 0) {
			htmlConfig["grid-cell-type"] = htmlConfig["grid-cell-type"].join(" ");
		} else {
			delete htmlConfig["grid-cell-type"];
		}
		if (cellReadyState > 0) {
			result.push(htmlConfig);
			return 1;
		} else {
			htmlConfig.html = "";
			result.push(htmlConfig);
			return 0;
		}
	},

	/**
	 * HtmlEncode string and replace symbols "{}".
	 * @private
	 * @param {String} value Changeable string.
	 * @return {String} Replaced string.
	 */
	encodeHtml: function(value) {
		value = Terrasoft.encodeHtml(value);
		if (Ext.isString(value)) {
			value = value.replace(/{/g, "&#123;");
			value = value.replace(/}/g, "&#125;");
			value = value.replace(/\\/g, "&#92;");
			value = value.replace(/&amp;laquo;/g, "«");
			value = value.replace(/&amp;raquo;/g, "»");
		}
		return value;
	},

	/**
	 * Generates html cell-link.
	 * @private
	 * @param {Object} linkData Link params.
	 * @param {String} dataColumn Links data-column attribute.
	 * @param {String} innerHtml Links internal content.
	 * @return {String} Cell html.
	 */
	formatCellLink: function(linkData, dataColumn, innerHtml) {
		var linkTpl = "<a href=\"{0}\" target=\"{1}\" title=\"{2}\" data-column=\"{3}\">{4}</a>";
		if (linkData.customUrlsExists) {
			var urlOccurrencePattern = "url_occurrence_{0}";
			linkData.customUrls.forEach(function(url, index) {
				innerHtml = innerHtml.replace(this.encodeHtml(url), Ext.String.format(urlOccurrencePattern, index));
			}, this);
			linkData.customUrls.forEach(function(url, index) {
				innerHtml = innerHtml.replace(Ext.String.format(urlOccurrencePattern, index),
					Ext.String.format(linkTpl, url, linkData.target, this.encodeHtml(url), "", url));
			}, this);
			return innerHtml;
		}
		return Ext.String.format(linkTpl, linkData.url, linkData.target, this.encodeHtml(linkData.title),
			dataColumn, innerHtml);
	},

	/**
	 * Generates html cell-image.
	 * @private
	 * @param {String} cellImage Image link.
	 * @param {String} type Image type.
	 * @return {String} Cell html.
	 */
	formatCellImage: function(cellImage, type) {
		var imageTpl = "<img src=\"{0}\" class=\"{1}\">";
		return Ext.String.format(imageTpl, cellImage, this.encodeHtml(type));
	},

	/**
	 * Generates html cell.
	 * @private
	 * @param {String} dataType Cell type.
	 * @param {String} cellData Cell text.
	 * @return {String} Cell html.
	 */
	formatCellSpan: function(dataType, cellData) {
		var spanCellXTemplate = this._getSpanCellXTemplate();
		var valueWithoutTags = Terrasoft.removeHtmlTags(cellData);
		var text = this.encodeHtml(valueWithoutTags);
		var direction = null;
		if (Terrasoft.getIsRtlMode()) {
			direction = Terrasoft.containsRtlChars(cellData) ? direction : "ltr";
		}
		var html = spanCellXTemplate.apply({
			type: dataType,
			text: text,
			direction: direction
		});
		return html;
	},

	/**
	 * Gets compiled template of the span cell.
	 * @private
	 * @return {Ext.XTemplate} Compiled template of the span cell.
	 */
	_getSpanCellXTemplate: function() {
		this._spanCellXTemplate = this._spanCellXTemplate || new Ext.XTemplate(this._spanCellTemplate);
		return this._spanCellXTemplate;
	},

	/**
	 * Generates html label.
	 * @private
	 * @param {String} name Label text.
	 * @return {String} Cell html.
	 */
	formatCellLabel: function(name) {
		var labelTpl = "<span class=\"grid-label\">{0}</span>";
		return Ext.String.format(labelTpl, this.encodeHtml(name));
	},

	/**
	 * Formats data for a cell.
	 * @protected
	 * @param {Object} cell Cell.
	 * @param {Object} data Data.
	 * @param {Object} column Configuration.
	 * @param {Object} link
	 * @return {Number} The amount of data, that was added during the iteration.
	 */
	formatCellContent: function(cell, data, column, link) {
		var cellReadyState = 0;
		var name = this.getDataKey(column.name);
		var type = column.type || "text";
		var gridType = this.type;
		var cellData = data[name];
		var cellImage = "";
		if (data.hasOwnProperty("keyImgExtension") && data.keyImgExtension.hasOwnProperty(name)
			&& type !== "label" && type !== "caption") {
			cellImage = data.keyImgExtension[name];
		} else if (type.indexOf("icon") > -1 && data.hasOwnProperty(name)) {
			cellImage = data[name];
		}
		var linkData;
		if (link && data.hasOwnProperty(link)) {
			linkData = data[link];
		}
		var internalColumn = Ext.Array.contains(this.internalColumns, type);
		var dimensionsRe = new RegExp("\\d+x\\d+", "i");
		if (!cellData && !cellImage && !internalColumn) {
			return cellReadyState;
		}
		var html;
		var size;
		if ((type.indexOf("icon") === -1) && cellImage) {
			var lookupImageType = column.lookupImageType || "grid-icon-fixed-32x32";
			size = dimensionsRe.exec(lookupImageType)[0];
			cell.cls += (lookupImageType) ? (" icon-spacer-" + size) : " icon-spacer-32x32";
			html = this.formatCellImage(cellImage, lookupImageType);
			cell.html += (linkData) ? this.formatCellLink(linkData, this.encodeHtml(name), html) : html;
		}
		var cellClass = this.cellsClasses[name];
		var dataType = type;
		if (type === "text") {
			if (cellClass && cellClass.typeClass) {
				dataType = cellClass.typeClass;
				cell["grid-cell-type"].push(cellClass.typeClass);
			}
			if (gridType === "tiled" && cell.html.length === 0 && (this.multiSelect || this.hierarchical)) {
				cell.style = "padding-top: 5px;";
			}
			html = this.formatCellSpan(dataType, cellData);
			cell.html += (linkData) ? this.formatCellLink(linkData, this.encodeHtml(name), html) : html;
			cellReadyState += 1;
		} else if (type === "caption") {
			if (gridType === "tiled" && cell.html.length === 0 && (this.multiSelect || this.hierarchical)) {
				cell.style = "padding-top: 6px;";
			}
			cell.html += this.formatCellLabel(name);
		} else if (type === "label") {
			html = this.formatCellLabel(name);
			cell.html += (linkData) ? this.formatCellLink(linkData, this.encodeHtml(name), html) : html;
			cellReadyState += 1;
		} else if ((type.indexOf("grid-icon") > -1) && cellImage) {
			html = this.formatCellImage(cellImage, type);
			cell.html += (linkData) ? this.formatCellLink(linkData, this.encodeHtml(name), html) : html;
			size = dimensionsRe.exec(type)[0];
			cell.cls += " icon-spacer-" + size;
			cellReadyState += 1;
		} else if ((type.indexOf("flag-icon") > -1) && cellImage) {
			html = this.formatCellImage(cellImage, type);
			cell.html += (linkData) ? this.formatCellLink(linkData, this.encodeHtml(name), html) : html;
			cellReadyState += 1;
		} else if ((type.indexOf("listed-icon") > -1) && cellImage) {
			html = this.formatCellImage(cellImage, type);
			cell.html += (linkData) ? this.formatCellLink(linkData, this.encodeHtml(name), html) : html;
			cellReadyState += 1;
		} else if (type === "title") {
			if (cellClass && cellClass.typeClass) {
				dataType = cellClass.typeClass;
				cell["grid-cell-type"].push(cellClass.typeClass);
			}
			html = this.formatCellSpan(dataType, cellData);
			cell.html += (linkData) ? this.formatCellLink(linkData, this.encodeHtml(name), html) : html;
			cell.cls += " grid-header";
			cellReadyState += 1;
		} else if (type === "link") {
			var linkHtmlConfig = Ext.DomHelper.createHtml({
				tag: "a",
				target: cellData.target || "_blank",
				html: this.encodeHtml(cellData.caption),
				href: cellData.url,
				"data-column": this.encodeHtml(name)
			});
			cell.html += linkHtmlConfig;
			cellReadyState += 1;
		}
		if (name === this.primaryDisplayColumnName) {
			cell.cls += " grid-primary-column";
		}
		return cellReadyState;
	},

	/**
	 * A method for retrieving data from a collection.
	 * @protected
	 * @param {Object} name
	 * @return {*}
	 */
	getDataKey: function(name) {
		if (Ext.isObject(name) && name.bindTo) {
			var binding = this.columnBindings[name.bindTo];
			if (binding) {
				name = binding.modelItem;
			}
		}
		return name;
	},

	/**
	 * Create an object for rendering the signatures of the columns of the list.
	 * @private
	 * @return {Object}
	 */
	renderCaptionsRow: function() {
		var captions = this.getCaptionsConfig();
		var columns = this.getColumnsConfig();
		var orderDirectionAsc = Terrasoft.core.enums.OrderDirection.ASC;
		var orderDirectionDesc = Terrasoft.core.enums.OrderDirection.DESC;
		var htmlConfig = {
			tag: "div",
			cls: this.captionsCss,
			children: []
		};
		for (var i = 0, c = captions.length; i < c; i += 1) {
			var captionConfig = captions[i];
			var sortIndicator = "";
			if (this.sortColumnIndex === i || captionConfig.sortColumnDirection) {
				if (this.captionsConfig[i].sortColumnDirection) {
					this.sortColumnIndex = i;
					this.sortColumnDirection = captionConfig.sortColumnDirection;
					delete this.captionsConfig[i].sortColumnDirection;
				}
				if (this.sortColumnDirection === orderDirectionAsc) {
					sortIndicator = this.sortIndicatorUp;
				} else if (this.sortColumnDirection === orderDirectionDesc) {
					sortIndicator = this.sortIndicatorDown;
				}
			}
			var caption = {
				tag: "div",
				cls: this.colsCss + "-" + captionConfig.cols,
				html: "<label title='" + captionConfig.name +"'>" + captionConfig.name + "</label>" + sortIndicator,
				id: this.id + this.captionPrefix + i,
				"data-item-marker": captionConfig.name
			};
			var column = columns[i];
			if (column) {
				var key = column.key;
				var columnName;
				if (Ext.isArray(key)) {
					columnName = this.getDataKey(key[0].name);
				} else if (Ext.isObject(key)) {
					columnName = this.getDataKey(key.name);
				}
				var cellClass = this.cellsClasses[columnName];
				if (cellClass && cellClass.typeClass) {
					caption["grid-caption-type"] = cellClass.typeClass;
				}
			}
			htmlConfig.children.push(caption);
		}
		return htmlConfig;
	},

	/**
	 t * Assign a sortable column and a visual update of the sort indicator. The parameter is the column number.
	 t * The column count starts from zero.
	 * @param {Number} index
	 */
	setSortColumnIndex: function(index) {
		if (this.sortColumnIndex === index || index == null) {
			return;
		}
		this.updateSortColumn(index, this.sortColumnDirection);
		this.sortColumnIndex = index;
	},

	/**
	 * Assign a sorting direction and visual update of the sort indicator.
	 * The index of the sorted column should already be assigned.
	 * @param {Terrasoft.core.enums.OrderDirection} direction Sort direction.
	 */
	setSortColumnDirection: function(direction) {
		if (this.sortColumnDirection === direction || direction == null) {
			return;
		}
		this.updateSortColumn(this.sortColumnIndex, direction);
		this.sortColumnDirection = direction;
	},

	/**
	 * Visual removal of column sort indicator.
	 * @private
	 */
	removeSortColumnIndicator: function() {
		if (!this.rendered) {
			return;
		}
		var sortColumnIndex = this.sortColumnIndex;
		var root = this.getWrapEl();
		if (sortColumnIndex != null) {
			var captionElSelect = root.select("[id=\"" + this.id + this.captionPrefix + sortColumnIndex + "\"]");
			var captionEl = captionElSelect.first();
			if (captionEl) {
				var captionHtml = captionEl.getHTML();
				var regExpSortIndicatorDown = new RegExp(this.sortIndicatorDown, "igm");
				var regExpSortIndicatorUp = new RegExp(this.sortIndicatorUp, "igm");
				var newHtml = captionHtml.replace(regExpSortIndicatorDown, "");
				newHtml = newHtml.replace(regExpSortIndicatorUp, "");
				captionEl.setHTML(newHtml);
			}
		}
	},

	/**
	 * Arrange the sort indicator to a specific column.
	 * @param {Number} index
	 * @param {Terrasoft.core.enums.OrderDirection} direction Sorting direction.
	 */
	addSortColumnIndicator: function(index, direction) {
		if (!this.rendered) {
			return;
		}
		var root = this.getWrapEl();
		var captionEl = root.select("[id=\"" + this.id + this.captionPrefix + index + "\"]").item(0);
		if (captionEl) {
			var captionHtml = captionEl.getHTML();
			var sortIndicator = "";
			if (direction === Terrasoft.core.enums.OrderDirection.ASC) {
				sortIndicator = this.sortIndicatorUp;
			} else if (direction === Terrasoft.core.enums.OrderDirection.DESC) {
				sortIndicator = this.sortIndicatorDown;
			}
			var newHtml = captionHtml + sortIndicator;
			captionEl.setHTML(newHtml);
		}
	},

	/**
	 * Consistently: delete the "old" sort indicator and add a new one according to the incoming parameters.
	 * @param {Number} index
	 * @param {Terrasoft.core.enums.OrderDirection} direction Sorting direction.
	 */
	updateSortColumn: function(index, direction) {
		if (!this.rendered) {
			return;
		}
		this.removeSortColumnIndicator();
		this.addSortColumnIndicator(index, direction);
	},

	/**
	 * A method that modifies the registry status attribute: empty, not empty.
	 * @param {Boolean} newState
	 */
	setIsEmpty: function(newState) {
		if (this.isEmpty === newState) {
			return;
		}
		this.isEmpty = newState;
		this.displayIsEmpty();
	},

	/**
	 * A method that synchronizes the state attribute and its external view.
	 * @protected
	 */
	displayIsEmpty: function(emptyMessageConfig) {
		if (!this.rendered) {
			return;
		}
		var wrapEl = this.getWrapEl();
		if (this.isEmpty) {
			this.clear();
			wrapEl.addCls(this.isEmptyCss);
			if (Ext.Object.isEmpty(emptyMessageConfig)) {
				emptyMessageConfig = this.loadEmptyMessageConfig();
			}
			if (!Ext.Object.isEmpty(emptyMessageConfig)) {
				this.emptyMessageControl = Ext.create(emptyMessageConfig.className, Ext.apply({},
					emptyMessageConfig, {
						renderTo: wrapEl
					}));
			} else {
				var element = wrapEl.select("[class=\"grid-bottom-spinner-space\"]").item(0);
				var html = Ext.DomHelper.createHtml(this.isEmptyHtmlConfig);
				Ext.DomHelper.insertHtml("beforeBegin", element.dom, html);
			}
		} else {
			var statusEl = wrapEl.select("[class*=\"grid-status-message\"]").item(0);
			if (statusEl) {
				wrapEl.removeCls(this.isEmptyCss);
				statusEl.destroy();
			}
		}
	},

	/**
	 * Checks for the presence of a configuration for a custom message about an empty list.
	 * If there is an external configuration, it returns it, otherwise it returns an empty object.
	 * @private
	 * @return {Object}
	 */
	loadEmptyMessageConfig: function() {
		var emptyMessageConfig = {};
		this.fireEvent("getEmptyMessageConfig", emptyMessageConfig);
		if (emptyMessageConfig && emptyMessageConfig.className) {
			return Ext.clone(emptyMessageConfig);
		}
		return {};
	},

	/**
	 * A method that modifies the list state attribute: data is loaded\data is not loaded.
	 * @param {Boolean} newState
	 */
	setIsLoading: function(newState) {
		var state;
		var options;
		if (Ext.isObject(newState)) {
			state = newState.state;
			options = newState.options;
		} else {
			state = newState;
			options = {
				mode: "bottom"
			};
			if (this.isLoading === state) {
				return;
			}
		}
		this.isLoading = state;
		this.displayIsLoading(options);
	},

	/**
	 * A method that synchronizes the state attribute and its external view.
	 * @protected
	 */
	displayIsLoading: function(options) {
		if (!this.rendered) {
			return;
		}
		if (this.isLoading) {
			var spinnerRow = this.createSpinnerRow(options);
			if (!spinnerRow) {
				return;
			}
			options.spinner = true;
			this.addRows(spinnerRow, options);
			this.progressSpinner.show();
		} else {
			var spinnerId = this.createProgressSpinnerId(options);
			this.deleteRow(spinnerId);
		}
	},

	createSpinnerRow: function(options) {
		var wrapEl = this.getWrapEl();
		var domId = this.createProgressSpinnerId(options);
		var rowAlreadyPresent = wrapEl.select("#" + domId);
		if (rowAlreadyPresent.getCount()) {
			return;
		}
		var type = this.type;
		var htmlConfig;
		var mode = options.mode;
		if (type === "tiled" && mode !== "bottom") {
			htmlConfig = {
				tag: "div",
				cls: "grid-row grid-pad",
				id: domId,
				children: [
					{
						tag: "div",
						cls: "grid-row grid-module"
					}
				]
			};
			htmlConfig.children[0].html = this.createProgressSpinner();
		} else if (type === "listed" && mode !== "bottom") {
			htmlConfig = {
				tag: "div",
				cls: this.listedRowsCss,
				id: domId
			};
			htmlConfig.html = this.createProgressSpinner();
		} else {
			htmlConfig = this.isLoadingHtmlConfig;
			htmlConfig.id = domId;
			htmlConfig.html = this.createProgressSpinner();
		}
		return Ext.DomHelper.markup(htmlConfig);
	},

	/**
	 * Creates progress spinner html.
	 * @return {String} Progress spinner html.
	 */
	createProgressSpinner: function() {
		this.progressSpinner = this.progressSpinner || Terrasoft.getSpinner("grid-loading-spinner");
		return this.progressSpinner.generateHtml();
	},

	createProgressSpinnerId: function(options) {
		var keyParts = Terrasoft.compact([options.mode, options.target]);
		var key = keyParts.join("-");
		return [this.id, this.spinnerRowPrefix, key].join("");
	},

	/**
	 * Delete the list and its components.
	 * @protected
	 * @param {Boolean} clear
	 */
	onDestroy: function(clear) {
		if (this.progressSpinner && !this.progressSpinner.destroyed) {
			this.progressSpinner.destroy();
		}
		if (this.dragDropGroupName) {
			this.mixins.draggable.onDestroy.apply(this, arguments);
		}
		if (this.checkboxes && this.checkboxes.length > 0) {
			this.checkboxes.forEach(function(element) {
				element.destroy();
			}, this);
			this.checkboxes = [];
		}
		if (this.actionItems && this.actionItems.length > 0) {
			this.actionItems.forEach(function(element) {
				if (element.destroyed !== true) {
					element.destroy();
				}
			}, this);
			this.actionItems = [];
		}
		if (this.emptyMessageControl) {
			this.emptyMessageControl.destroy();
			this.emptyMessageControl = null;
		}
		var wrapEl = this.getWrapEl();
		if (!clear) {
			if (wrapEl) {
				wrapEl.un("click", this.onGridClick, this);
				wrapEl.un("dblclick", this.onGridDoubleClick, this);
				wrapEl.un("mousedown", this._onMouseDown, this);
				wrapEl.un("keydown", this.onKeyDown, this);
			}
			if (this.debounceWindowScroll) {
				var scrollEl = this.getScrollElement();
				Ext.EventManager.removeListener(scrollEl, "scroll", this.debounceWindowScroll, this);
				if (Ext.isIE11 || Ext.isChrome || Ext.isSafari || Ext.isOpera) {
					Ext.EventManager.removeListener(scrollEl, "mousewheel", this.debounceWindowScroll, this);
				} else if (Ext.isGecko) {
					Ext.EventManager.removeListener(scrollEl, "DOMMouseScroll", this.debounceWindowScroll, this);
				} else {
					Ext.EventManager.removeListener(scrollEl, "onmousewheel", this.debounceWindowScroll, this);
				}
			}
		}
		if (wrapEl) {
			wrapEl.setHTML("");
		}
		if (!clear) {
			this.callParent(arguments);
		}
	},

	/**
	 * An object that describes the relationship of the columns of the list with the properties or methods of the model.
	 * @protected
	 * @type {Object}
	 */
	columnBindings: null,

	/**
	 * Returns grid row data by bindings.
	 * @protected
	 * @param {Terrasoft.BaseViewModel} item Collection item.
	 * @return {Object} Grid row.
	 */
	getRow: function(item) {
		var bindings = this.columnBindings;
		var row = {};
		var primaryColumnName = this.primaryColumnName;
		var hierarchicalColumnName = this.hierarchicalColumnName;
		row[primaryColumnName] = item.get(primaryColumnName);
		var primaryDisplayColumnName = this.primaryDisplayColumnName;
		if (primaryDisplayColumnName) {
			row[primaryDisplayColumnName] = item.get(primaryDisplayColumnName);
		}
		if (this.hierarchical) {
			var hierarchicalColumn = item.get(hierarchicalColumnName);
			if (hierarchicalColumn) {
				if (Ext.isObject(hierarchicalColumn) && hierarchicalColumn.hasOwnProperty("value")) {
					row[hierarchicalColumnName] = hierarchicalColumn.value;
				} else if (Ext.isString(hierarchicalColumn)) {
					row[hierarchicalColumnName] = hierarchicalColumn;
				}
			}
		}
		Terrasoft.each(bindings, (binding, property) => {
			if (!binding.bindingType) {
				var bindingType = this.getBindingType(property, binding, item);
				binding.bindingType = bindingType;
			}
			var value = this.getBindingValue(binding, item);
			var columnName = binding.modelItem;
			var type = item.getColumnDataType(columnName);
			var displayValue = value;
			if (type !== Terrasoft.DataValueType.CUSTOM_OBJECT && binding.bindingType === Terrasoft.BindingType.PROPERTY) {
				this.addLookupImageInfo(row, item, columnName);
				this.addHasNestingInfo(row, item, columnName);
				var column = item.columns[columnName];
				if (binding.imageSize || (type === Terrasoft.DataValueType.IMAGELOOKUP)) {
					var modelMethodName = item.defGetLookupImageUrlMethod;
					var modelMethod = item[modelMethodName];
					displayValue = modelMethod.call(item, columnName, binding.imageSize);
				} else if (column && column.isNotFound) {
					displayValue = this.translate.columnNotFound;
				} else {
					var precision = this.getColumnPrecision(item, columnName);
					displayValue = Terrasoft.getTypedStringValue(value, type, {decimalPrecision: precision});
				}
			}
			row[columnName] = displayValue;
		});
		return row;
	},

	/**
	 * Returns column decimal precision.
	 * @private
	 * @param {Terrasoft.BaseViewModel} item Collection item.
	 * @param {String} columnName Item column name.
	 * @return {Null|Number} Column decimal precision.
	 */
	getColumnPrecision: function(item, columnName) {
		var column = item.getColumnByName(columnName);
		return Ext.isEmpty(column) ? null : column.precision;
	},

	/**
	 * A method for retrieving the styles from a collection item.
	 * @protected
	 * @param {Object} item Collection item.
	 * @return {{}}
	 */
	getRowStyle: function(item) {
		var customStyle = {};
		if (item.hasOwnProperty("customStyle")) {
			customStyle = item.customStyle;
		}
		return customStyle;
	},

	/**
	 * Method for obtaining classes of cells based on data types.
	 * @protected
	 * @param {Object} item Cell configuration.
	 * @return {Object} Additional classes for the cell.
	 */
	getCellsClasses: function(item) {
		var cellsStyles = {};
		var bindings = this.columnBindings;
		Terrasoft.each(bindings, function(binding) {
			var columnName = binding.modelItem;
			var column = item.columns[columnName];
			if (column && column.isNotFound) {
				cellsStyles[columnName] = {
					typeClass: "columnNotFound"
				};
				return;
			}
			var type = item.getColumnDataType(columnName);
			switch (type) {
				case Terrasoft.DataValueType.INTEGER:
				case Terrasoft.DataValueType.FLOAT:
				case Terrasoft.DataValueType.MONEY:
					cellsStyles[columnName] = {
						typeClass: "number"
					};
					break;
			}
		}, this);
		return cellsStyles;
	},

	/**
	 * Resets the binding of the columns of the list based on the configuration object.
	 * @param {Object} columnsConfig The configuration object of the column binding.
	 */
	resetColumnBindings: function(columnsConfig) {
		this.columnBindings = {};
		this.initColumnBindings(columnsConfig);
	},

	/**
	 * Initializes the binding of the columns of the list based on the configuration object.
	 * @protected
	 * @param {Object} columnsConfig The configuration object of the column binding.
	 */
	initColumnBindings: function(columnsConfig) {
		var bindings = this.columnBindings;
		Terrasoft.each(columnsConfig, (configItem) => {
			if (Ext.isArray(configItem)) {
				this.initColumnBindings(configItem);
			} else {
				Terrasoft.each(configItem, (item, propertyName) => {
					if (Ext.isArray(item)) {
						this.initColumnBindings(item);
					} else if (Ext.isObject(item) && item.bindTo) {
						var binding = this.initBinding(propertyName, item);
						if (binding) {
							binding.config.isColumnConfig = true;
							var GridKeyType = Terrasoft.GridKeyType;
							if (propertyName.type === GridKeyType.ICON16 ||
								propertyName.type === GridKeyType.ICON22 ||
								propertyName.type === GridKeyType.ICON32 ||
								propertyName.type === GridKeyType.ICON16LISTED ||
								propertyName.type === GridKeyType.ICON22LISTED ||
								propertyName.type === GridKeyType.ICON32LISTED) {
								binding.imageSize = this.getIconSize(propertyName.type);
							}
							bindings[item.bindTo] = binding;
						}
					}
				});
			}
		});
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#initBinding
	 * @protected
	 */
	initBindings: function(config) {
		this.callParent(arguments);
		this.columnBindings = {};
		var columnsConfig = config.columnsConfig;
		this.initColumnBindings(columnsConfig);
	},

	/**
	 * Returns the configuration of the binding to the model. Implements the {@link Terrasoft.Bindable} mixin interface.
	 * @protected
	 */
	getBindConfig: function() {
		var bindConfig = this.callParent(arguments);
		var gridBindConfig = {
			collection: {
				changeMethod: "onCollectionDataLoaded"
			},
			selectedRows: {
				changeEvent: "rowsSelectionChanged",
				changeMethod: "setSelectedRows"
			},
			activeRow: {
				changeEvent: "selectRow",
				changeMethod: "setActiveRow"
			},
			isRowActionsVisible: {
				changeMethod: "setIsRowActionsVisible"
			},
			isEmpty: {
				changeMethod: "setIsEmpty"
			},
			isLoading: {
				changeMethod: "setIsLoading"
			},
			multiSelect: {
				changeMethod: "setMultiSelect"
			},
			sortColumnIndex: {
				changeEvent: "sortColumn",
				changeMethod: "setSortColumnIndex"
			},
			sortColumnDirection: {
				changeMethod: "setSortColumnDirection"
			},
			type: {
				changeMethod: "setType"
			},
			expandHierarchyLevels: {
				changeEvent: "updateExpandHierarchyLevels",
				changeMethod: "setExpandHierarchyLevel"
			},
			isEmptyRowVisible: {
				changeMethod: "setIsEmptyRowVisible"
			},
			listedZebra: {
				changeMethod: "setListedZebra"
			},
			hierarchical: {
				changeMethod: "setHierarchical"
			},
			canChangeMultiSelectWithGridClick: {
				changeMethod: "setCanChangeMultiSelectWithGridClick"
			}
		};
		Ext.apply(gridBindConfig, bindConfig);
		return gridBindConfig;
	},

	/**
	 * Assigns the {@link Terrasoft.Grid # hierarchical hierarchical} value.
	 * @param {Boolean} newState
	 */
	setHierarchical: function(newState) {
		if (this.hierarchical !== newState) {
			this.hierarchical = newState;
			this.safeRerender();
		}
	},

	/**
	 * Assigns the {@link Terrasoft.Grid # listedZebra listedZebra} value to the parameter.
	 * @param {Boolean} newState
	 */
	setListedZebra: function(newState) {
		if (this.listedZebra === newState) {
			return;
		}
		this.listedZebra = newState;
		this.activeRow = null;
		this.selectedRows = [];
		this.init();
		this.safeRerender();
	},

	/**
	 * Assigns a value to the {@link Terrasoft.Grid # is # isEmptyRowVisible is Empty Row Visible} parameter.
	 * @param {Boolean} newState
	 */
	setIsEmptyRowVisible: function(newState) {
		if (this.isEmptyRowVisible === newState) {
			return;
		}
		this.isEmptyRowVisible = newState;
	},

	/**
	 * Assigns a value to the {@link Terrasoft.Grid # is # isRowActionsVisible isRowActionsVisible} parameter.
	 * @param {Boolean} newState new value
	 */
	setIsRowActionsVisible: function(newState) {
		if (this.isRowActionsVisible === newState) {
			return;
		}
		this.isRowActionsVisible = newState;
	},

	setMultiSelect: function(newState) {
		if (this.multiSelect === newState) {
			return;
		}
		this.multiSelect = newState;
		if (!newState) {
			this.checkboxes = [];
			this.setSelectedRows(this.selectedRows.slice(0, 1));
		}
		this.safeRerender({byCollection: true});
		this.fireEvent("multiSelectChanged", newState);
	},

	setCanChangeMultiSelectWithGridClick: function(value) {
		this.canChangeMultiSelectWithGridClick = value;
	},

	setType: function(newType) {
		if (this.type === newType) {
			return;
		}
		this.type = newType;
		this.activeRow = null;
		this.selectedRows = [];
		this.init();
		this.safeRerender();
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#setControlPropertyValue
	 * @protected
	 */
	setControlPropertyValue: function(binding, value, model) {
		if (binding.config && binding.config.isColumnConfig) {
			this.onUpdateRow(model);
		} else {
			this.callParent(arguments);
		}
	},

	/**
	 * @inheritdoc Terrasoft.Bindable#subscribeForCollectionEvents
	 * @protected
	 */
	subscribeForCollectionEvents: function(binding, property, model) {
		this.callParent(arguments);
		var collection = model.get(binding.modelItem);
		collection.on("dataLoaded", this.onCollectionDataLoaded, this);
		collection.on("add", this.onAddItem, this);
		collection.on("remove", this.onDeleteItem, this);
		collection.on("itemChanged", this.onUpdateItem, this);
		collection.on("clear", this.clear, this);
		collection.on("replace", this.onReplaceItem, this);
	},

	unSubscribeForCollectionEvents: function(binding, property, model) {
		if (!model) {
			return;
		}
		this.callParent(arguments);
		var collection = model.get(binding.modelItem);
		collection.un("dataLoaded", this.onCollectionDataLoaded, this);
		collection.un("add", this.onAddItem, this);
		collection.un("remove", this.onDeleteItem, this);
		collection.un("itemChanged", this.onUpdateItem, this);
		collection.un("clear", this.clear, this);
	},

	/**
	 * @inheritdoc Terrasoft.Component#setEnabled
	 * @override
	 */
	setEnabled: function(enabled) {
		if (this.enabled === enabled) {
			return;
		}
		this.callParent(arguments);
		this.checkboxes.forEach(function(element) {
			element.setEnabled(enabled);
		}, this);
		this.actionItems.forEach(function(element) {
			element.setEnabled(enabled);
		}, this);
	},

	/**
	 * Returns scroll element.
	 * @protected
	 * @param {String} id Scroll element identifier.
	 * @return {Object} Scroll element.
	 */
	getScrollElement: function(id) {
		if (id && Ext.isString(id)) {
			this.scrollEl = Ext.get(id);
		}
		var scrollEl = this.scrollEl = this.scrollEl || window;
		return scrollEl;
	},

	/**
	 * Handler for key-down event.
	 * @protected
	 * @param {Object} event Event object.
	 * @return {Boolean}
	 */
	onKeyDown: function(event) {
		var handled = false;
		if (this._canHandleEvent(event)) {
			switch (event.keyCode) {
				case event.ENTER:
					handled = this.onEnterPressed(event);
					break;
				case event.DOWN:
					handled = this.gotToNextRow(1);
					break;
				case event.UP:
					handled = this.goToPreviousRow(1);
					break;
				case event.PAGE_DOWN:
					handled = this.gotToNextRow(15);
					break;
				case event.PAGE_UP:
					handled = this.goToPreviousRow(15);
					break;
				case event.END:
					handled = this.gotToNextRow(0);
					break;
				case event.HOME:
					handled = this.goToPreviousRow(0);
					break;
			}
		}
		if (handled) {
			event.preventDefault();
			return false;
		}
	},

	/**
	 * Handler for ENTER key pressed.
	 * @protected
	 * @return {Boolean} If event was handled.
	 */
	onEnterPressed: function() {
		this.fireEvent("enterkeypressed");
		return true;
	},

	/**
	 * Go to next row with step.
	 * @protected
	 * @param {Number} step Step. If 0 -- go to first record;
	 * @return {Boolean}
	 */
	gotToNextRow: function(step) {
		if (this.activeRow) {
			const rowsId = this._getRowsId();
			const index = rowsId.indexOf(this.activeRow);
			const lastIndex = rowsId.length - 1;
			if (index < lastIndex) {
				const nextRowId = (step ? rowsId[index + step] : rowsId[lastIndex]) || rowsId[lastIndex];
				this.setActiveRow(nextRowId);
				this.focus();
				const row = this.getDomRow(nextRowId);
				Terrasoft.scrollIntoView(row.dom, false);
			}
			if (index + step > lastIndex || step === 0) {
				return !this.fireEvent("loadMore");
			}
			return true;
		}
	},

	/**
	 * Go to previous row with step.
	 * @protected
	 * @param {Number} step Step. If 0 -- go to last record;
	 * @return {Boolean}
	 */
	goToPreviousRow: function(step) {
		if (this.activeRow) {
			const rowsId = this._getRowsId();
			const index = rowsId.indexOf(this.activeRow);
			if (index > 0) {
				const firstRowId = rowsId[0];
				let nextRowId = step ? rowsId[index - step] : firstRowId;
				nextRowId = nextRowId || firstRowId;
				this.setActiveRow(nextRowId);
				this.focus();
				this._scrollToRow(nextRowId);
				return true;
			}
		}
	},

	/**
	 * @private
	 */
	_scrollToRow: function(rowId) {
		const row = this.getDomRow(rowId);
		while (window.scrollY > 0 && !this._isElementVisible(row.dom)) {
			window.scrollBy(0, -1);
		}
	},

	/**
	 * Returns flag that indicates whether left-top corner of element is visible or not.
	 * @private
	 */
	_isElementVisible: function(element) {
		const rect = element.getBoundingClientRect();
		if (rect.top < 0) {
			return false;
		}
		let pointContainer = document.elementFromPoint(rect.left + 5, rect.top + 5);
		do {
			if (!pointContainer || pointContainer === element) {
				return true;
			}
			pointContainer = pointContainer.parentNode;
		} while (pointContainer);
		return false;
	},

	/**
	 * @private
	 */
	_canHandleEvent: function(event) {
		const wrapEl = this.getWrapEl();
		return wrapEl.id === event.target.id;
	},

	/**
	 * Sets the focus for the control and the DOM element.
	 * @param {Boolean} focused New value.
	 */
	focus: function() {
		if (this.rendered) {
			const wrapEl = this.getWrapEl();
			wrapEl.dom.focus({preventScroll: true});
		}
	}

});
