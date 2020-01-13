Terrasoft.configuration.Structures["ContentBuilderConstants"] = {innerHierarchyStack: ["ContentBuilderConstants"]};
Ext.ns("Terrasoft.ContentBuilder.enums");
Ext.ns("Terrasoft.ContentBuilder.constants");

/**
 * Represents string representation of drop group name for element.
 * @type {string}
 */
Terrasoft.ContentBuilder.constants.ElementDropGroup = "ContentColumn";

/**
 * Contains all content builder body types with string representation and name for mapping in mjml config.
 */
Terrasoft.ContentBuilder.enums.BodyItemType = {
	sheet: {
		value: "sheet",
		mjmlValue: "mj-body"
	},
	mjblock: {
		value: "mjblock",
		mjmlValue: "mj-wrapper"
	},
	section: {
		value: "section",
		mjmlValue: "mj-section"
	},
	mjgroup: {
		value: "mjgroup",
		mjmlValue: "mj-group"
	},
	column: {
		value: "column",
		mjmlValue: "mj-column"
	},
	mjraw: {
		value: "mjraw",
		mjmlValue: "mj-raw"
	},
	text: {
		value: "text",
		mjmlValue: "mj-text"
	},
	image: {
		value: "image",
		mjmlValue: "mj-image"
	},
	mjbutton: {
		value: "mjbutton",
		mjmlValue: "mj-button"
	},
	mjhero: {
		value: "mjhero",
		mjmlValue: "mj-hero"
	},
	mjimage: {
		value: "mjimage",
		mjmlValue: "mj-image"
	},
	separator: {
		value: "separator",
		mjmlValue: "mj-divider"
	},
	mjdivider: {
		value: "mjdivider",
		mjmlValue: "mj-divider"
	},
	table: {
		value: "table",
		mjmlValue: "mj-table"
	},
	spacer: {
		value: "spacer",
		mjmlValue: "mj-spacer"
	},
	navbar: {
		value: "navbar",
		mjmlValue: "mj-navbar"
	},
	navbarlink: {
		value: "navbarlink",
		mjmlValue: "mj-navbar-link"
	},
	carousel: {
		value: "carousel",
		mjmlValue: "mj-carousel"
	},
	carouselImage: {
		value: "carouselImage",
		mjmlValue: "mj-carousel-image"
	},
	accordion: {
		value: "accordion",
		mjmlValue: "mj-accordion"
	},
	accordionElement: {
		value: "accordionElement",
		mjmlValue: "mj-accordion-element"
	},
	accordionTitle: {
		value: "accordionTitle",
		mjmlValue: "mj-accordion-title"
	},
	accordionText: {
		value: "accordionText",
		mjmlValue: "mj-accordion-text"
	},
	social: {
		value: "social",
		mjmlValue: "mj-social"
	},
	socialElement: {
		value: "socialElement",
		mjmlValue: "mj-social-element"
	}
};

/**
 * Contains all content builder head types with string representation and name for mapping in mjml config.
 */
Terrasoft.ContentBuilder.enums.HeadItemType = {
	head: {
		value: "head",
		mjmlValue: "mj-head"
	},
	attributes: {
		value: "attributes",
		mjmlValue: "mj-attributes"
	},
	breakpoint: {
		value: "breakpoint",
		mjmlValue: "mj-breakpoint"
	},
	font: {
		value: "font",
		mjmlValue: "mj-font"
	},
	preview: {
		value: "preview",
		mjmlValue: "mj-preview"
	},
	style: {
		value: "style",
		mjmlValue: "mj-style"
	},
	title: {
		value: "title",
		mjmlValue: "mj-title"
	}
};

/**
 * Parameters which are defined the content builder working state.
 */
Terrasoft.ContentBuilder.enums.Params = {
	config: {
		GRID: 1,
		MJML: 2
	},
	mjmlFeature: {
		OFF: 4,
		ON: 8
	}
};

/**
 * Working state of content builder based on config type and MJML feature state.
 */
Terrasoft.ContentBuilder.enums.State = {
	GRID: Terrasoft.ContentBuilder.enums.Params.config.GRID
		| Terrasoft.ContentBuilder.enums.Params.mjmlFeature.OFF,
	MIGRATE: Terrasoft.ContentBuilder.enums.Params.config.GRID
		| Terrasoft.ContentBuilder.enums.Params.mjmlFeature.ON,
	MJML: Terrasoft.ContentBuilder.enums.Params.config.MJML
		| Terrasoft.ContentBuilder.enums.Params.mjmlFeature.ON,
	ERROR: Terrasoft.ContentBuilder.enums.Params.config.MJML
		| Terrasoft.ContentBuilder.enums.Params.mjmlFeature.OFF
};

/**
 * Code of columns grouping action based on item types to group.
 */
Terrasoft.ContentBuilder.enums.GroupingCode = {
	COLUMN_COLUMN: "column-column",
	COLUMN_GROUP: "column-mjgroup",
	GROUP_COLUMN: "mjgroup-column",
	GROUP_GROUP: "mjgroup-mjgroup"
};

/**
 * Code of columns ungrouping action based on initial action elements position in group.
 */
Terrasoft.ContentBuilder.enums.UngroupingCode = {
	SPLIT: 0,
	FIRST: 1,
	LAST: 2,
	ALL: 3
};

/**
 * Config type option for template entity.
 */
Terrasoft.ContentBuilder.enums.ConfigType = {
	GRID: 0,
	MJML: 1
};

/**
 * Abbreviation for {@link Terrasoft.ContentBuilder.enums.BodyItemType}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.ContentBuilder.enums.BodyItemType
 */
Terrasoft.ContentBuilderBodyItemType = Terrasoft.ContentBuilder.enums.BodyItemType;

/**
 * Abbreviation for {@link Terrasoft.ContentBuilder.enums.HeadItemType}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.ContentBuilder.enums.HeadItemType
 */
Terrasoft.ContentBuilderHeadItemType = Terrasoft.ContentBuilder.enums.HeadItemType;

/**
 * Abbreviation for {@link Terrasoft.ContentBuilder.enums.State}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.ContentBuilder.enums.State
 */
Terrasoft.ContentBuilderState = Terrasoft.ContentBuilder.enums.State;

/**
 * Abbreviation for {@link Terrasoft.ContentBuilder.enums.Params}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.ContentBuilder.enums.Params
 */
Terrasoft.ContentBuilderParams = Terrasoft.ContentBuilder.enums.Params;

/**
 * Abbreviation for {@link Terrasoft.ContentBuilder.enums.GroupingCode}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.ContentBuilder.enums.GroupingCode
 */
Terrasoft.ContentBuilderGroupingCode = Terrasoft.ContentBuilder.enums.GroupingCode;

/**
 * Abbreviation for {@link Terrasoft.ContentBuilder.enums.UngroupingCode}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.ContentBuilder.enums.UngroupingCode
 */
Terrasoft.ContentBuilderUngroupingCode = Terrasoft.ContentBuilder.enums.UngroupingCode;

/**
 * Abbreviation for {@link Terrasoft.ContentBuilder.enums.ConfigType}.
 * @member Terrasoft
 * @inheritdoc Terrasoft.ContentBuilder.enums.ConfigType
 */
Terrasoft.ContentBuilderConfigType = Terrasoft.ContentBuilder.enums.ConfigType;

/**
 * @enum [Terrasoft.enums.TextAlign]
 * Text alignment type.
 */
Terrasoft.enums.TextAlign = {
	LEFT: "left",
	CENTER: "center",
	RIGHT: "right",
	JUSTIFY: "justify"
};

/**
 * Alias for {@link Terrasoft.TextAlign}.
 */
Terrasoft.TextAlign = Terrasoft.enums.TextAlign;

/**
 * @enum [Terrasoft.enums.TextAlign]
 * Text alignment type.
 */
Terrasoft.enums.FontSet = {
	ARIAL: "Arial, Helvetica, sans-serif",
	VERDANA: "Verdana, Geneva, sans-serif"
};

/**
 * Alias for {@link Terrasoft.FontSet}.
 */
Terrasoft.FontSet = Terrasoft.enums.FontSet;

/**
 * Defines constants module for ContentBuilder.
 */
define("ContentBuilderConstants", [],
	function () {
		Ext.define("Terrasoft.configuration.ContentBuilderConstants", {
			alternateClassName: "Terrasoft.ContentBuilderConstants"
		});
	});


