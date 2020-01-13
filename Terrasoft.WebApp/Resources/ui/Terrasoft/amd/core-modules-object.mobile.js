coreModules = window.coreModules ? coreModules : {};
coreModules["base-css.mobile"] = {
	path: "stylesheet",
	css: ["base.mobile"],
	file: "-"
};
coreModules["ext-base"] = coreModules["ext-base"] || {};
coreModules["ext-base"].file = "extjs5-base-debug";
coreModules["extjs5-compatibility"] = {
	"path": "ExtJs",
	"deps": ["ext-base"]
};
coreModules["base-css"] = {
	path: "stylesheet",
	css: ["base"],
	file: "-",
	"deps": ["base-css.mobile", "fonts"]
};
coreModules["component.extjs5-compatibility"] = {
	"path": "Terrasoft/controls/component",
	"deps": ["component"]
};
coreModules.container = {
	"path": "Terrasoft/controls/container",
	"deps": ["abstractcontainer"],
	"file": "container.mobile"
};
coreModules["button.extjs5-compatibility"] = {
	"path": "Terrasoft/controls/button",
	"deps": ["button"]
};
coreModules["baseviewport.mobile"] = {
	"path": "Terrasoft/controls/viewport",
	"deps": ["container"]
};
coreModules["androidviewport.mobile"] = {
	"path": "Terrasoft/controls/viewport",
	"deps": ["baseviewport.mobile"]
};
coreModules["iosviewport.mobile"] = {
	"path": "Terrasoft/controls/viewport",
	"deps": ["baseviewport.mobile"]
};
coreModules["controlsutils.mobile"] = {
	"path": "Terrasoft/utils/controls",
	"deps": ["baseviewport.mobile", "androidviewport.mobile", "iosviewport.mobile"]
};
coreModules["base-plugin"] = {
	"path": "Terrasoft/mobile/core/plugins",
	"deps": ["ext-base", "baseobject"]
};
coreModules["db-executor"] = {
	"path": "Terrasoft/mobile/core",
	"deps": ["baseobject"]
};
coreModules["scrollview.mobile"] = {
	"path": "Terrasoft/utils/scroll",
	"deps": ["baseobject"],
	"css": ["scroll.mobile"]
};
coreModules["scroller.mobile"] = {
	"path": "Terrasoft/utils/scroll",
	"deps": ["baseobject"]
};
