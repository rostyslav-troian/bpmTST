coreModules = {
	"normalize-css": {
		"path": "normalize",
		"css": ["normalize"],
		"file": "-",
		"doNotTranspile": true
	},
	"fonts": {
		"path": "Fonts",
		"css": ["fonts"],
		"file": "-",
		"doNotTranspile": true
	},
	"base-css": {
		"path": "stylesheet",
		"css": ["base"],
		"file": "-",
		"deps": ["fonts"],
		"doNotTranspile": true
	},
	"resize-observer": {
		"path": "polyfills",
		"exports": "ResizeObserver",
		"doNotTranspile": true
	},
	"signalr": {
		"path": "SignalR",
		"exports": "signalR",
		"doNotTranspile": true
	},
	"jsxss": {
		"path": "JsXss",
		"file": "xss",
		"exports": "filterXSS",
		"doNotTranspile": true
	},
	"ext-base": {
		"path": "ExtJs",
		"exports": "Ext",
		"file": "extjs-base-debug",
		"requireDefine": false,
		"separateFromBuild": true,
		"deps": ["promise", "resize-observer", "array-polyfills"]
	},
	"extjs-temporary-fixes": {
		"path": "ExtJs",
		"deps": ["ext-base"],
		"doNotTranspile": true
	},
	"underscore": {
		"path": "Underscore",
		"exports": "_",
		"doNotTranspile": true
	},
	"backbone": {
		"path": "BackBone",
		"exports": "Backbone",
		"deps": ["underscore", "jQuery"],
		"doNotTranspile": true
	},
	"lottie_light": {
		"path": "lottie-web",
		"doNotTranspile": true
	},
	"base-schema-designer": {
		"path": "Terrasoft/designers/base-schema-designer",
		"deps": ["baseobject"],
		"scope": ["app"]
	},
	"diagram-draggable-container": {
		"path": "Terrasoft/designers/process-schema-designer",
		"deps": ["draggable-container"],
		"scope": ["app"]
	},
	"process-schema-designer-utilities": {
		"path": "Terrasoft/designers/process-schema-designer",
		"deps": [
			"baseobject",
			"imageurlbuilder",
			"process-constants",
			"diagram-enums"
		],
		"scope": ["app"]
	},
	"process-schema-designer-copy-mixin": {
		"path": "Terrasoft/designers/process-schema-designer",
		"deps": ["baseobject"],
		"scope": ["app"]
	},
	"base-process-schema-designer-validation-mixin": {
		"path": "Terrasoft/designers/base-process-schema-designer",
		"deps": ["baseobject"],
		"scope": ["app"]
	},
	"process-schema-designer-search-mixin": {
		"path": "Terrasoft/designers/process-schema-designer",
		"deps": ["baseobject"],
		"scope": ["app"]
	},
	"base-schema-designer-utilities": {
		"path": "Terrasoft/designers/base-schema-designer",
		"deps": ["baseobject"],
		"scope": ["app"]
	},
	"base-schema-designer-storage-mixin": {
		"path": "Terrasoft/designers/base-schema-designer",
		"deps": ["baseobject"],
		"scope": ["app"]
	},
	"process-schema-element-editable": {
		"path": "Terrasoft/designers/process-schema-designer",
		"deps": ["baseobject", "process-schema-designer-utilities"],
		"scope": ["app"]
	},
	"process-schema-designer-left-toolbar": {
		"path": "Terrasoft/designers/process-schema-designer",
		"deps": ["container", "process-flow-element-schema-manager", "process-constants"],
		"scope": ["app"]
	},
	"diagram-enums": {
		"path": "Terrasoft/controls/diagram",
		"deps": ["ext-base", "base-view-model"],
		"scope": ["app"]
	},
	"process-constants": {
		"path": "Terrasoft/designers/process-schema-designer",
		"deps": ["ext-base", "core-resources", "sysenums"],
		"scope": ["app"]
	},
	"process-schema-diagram": {
		"path": "Terrasoft/designers/process-schema-designer",
		"external": true,
		"separateFromBuild": true,
		"deps": [
			"core/diagram",
			"droppable",
			"connection-edit-tool",
			"node-selection-tool",
			"node-remove-tool",
			"connector-remove-tool",
			"process-constants"
		],
		"scope": ["app"]
	},
	"process-schema-diagram-5x": {
		"path": "Terrasoft/designers/process-schema-designer",
		"external": true,
		"separateFromBuild": true,
		"deps": [
			"process-schema-diagram"
		],
		"scope": ["app"]
	},
	"node-selection-tool": {
		"path": "Terrasoft/controls/diagram",
		"deps": ["ts-diagram", "diagram-enums"],
		"scope": ["app"]
	},
	"connection-edit-tool": {
		"path": "Terrasoft/controls/diagram",
		"deps": ["ts-diagram", "diagram-enums"],
		"scope": ["app"]
	},
	"node-remove-tool": {
		"path": "Terrasoft/controls/diagram",
		"deps": ["ts-diagram", "diagram-enums"],
		"scope": ["app"]
	},
	"connector-remove-tool": {
		"path": "Terrasoft/controls/diagram",
		"deps": ["ts-diagram", "diagram-enums"],
		"scope": ["app"]
	},
	"core/diagram": {
		"path": "Terrasoft/controls/diagram",
		"less": ["diagram"],
		"deps": [
			"container",
			"ts-diagram-module-label-utils"
		],
		"scope": ["app"]
	},
	"ts-diagram-module-label-utils": {
		"path": "Terrasoft/utils/ts-diagram-module",
		"deps": [
			"diagram-enums",
			"ts-diagram",
			"ts-diagram-module-svg-utils"
		],
		"scope": ["app"]
	},
	"ts-diagram-module-svg-utils": {
		"path": "Terrasoft/utils/ts-diagram-module",
		"deps": [
			"ts-diagram",
			"exceptions",
			"baseobject"
		],
		"scope": ["app"]
	},
	"connector-removal-mixin": {
		"path": "Terrasoft/controls/diagram",
		"file": "connector-removal-mixin",
		"deps": [
			"ts-diagram",
			"exceptions",
			"baseobject"
		],
		"scope": ["app"]
	},
	"base-process-schema-designer-view-model": {
		"path": "Terrasoft/designers/base-process-schema-designer",
		"deps": [
			"base-view-model",
			"base-schema-designer-utilities",
			"base-schema-designer-storage-mixin",
			"base-process-schema-designer-validation-mixin",
			"package-manager"
		],
		"scope": ["app"]
	},
	"process-schema-designer-view-model": {
		"path": "Terrasoft/designers/process-schema-designer",
		"deps": [
			"base-process-schema-designer-view-model",
			"base-view-model-collection",
			"process-schema-manager",
			"process-schema-designer-utilities",
			"process-schema-designer-copy-mixin",
			"process-schema-designer-search-mixin",
			"process-engine-utilities"
		],
		"scope": ["app"]
	},
	"process-schema-designer-view-model-5x": {
		"path": "Terrasoft/designers/process-schema-designer",
		"deps": [
			"base-view-model",
			"process-schema-manager"
		],
		"scope": ["app"]
	},
	"process-schema-designer-log-view-model": {
		"path": "Terrasoft/designers/process-schema-designer-log",
		"deps": [
			"process-schema-designer-view-model"
		],
		"scope": ["app"]
	},
	"package-dependencies-diagram-view-model": {
		"path": "Terrasoft/designers/package-dependencies-diagram",
		"deps": [
			"process-schema-designer-view-model"
		],
		"scope": ["app"]
	},
	"base-process-schema-designer": {
		"path": "Terrasoft/designers/base-process-schema-designer",
		"deps": [
			"base-schema-designer"
		],
		"scope": ["app"]
	},
	"process-schema-designer": {
		"path": "Terrasoft/designers/process-schema-designer",
		"deps": [
			"base-process-schema-designer",
			"process-schema-element-editable",
			"process-schema-designer-left-toolbar",
			"process-schema-diagram",
			"diagram-draggable-container",
			"process-schema-designer-view-model",
			"messagebox"
		],
		"less": ["process-schema-designer"],
		"scope": ["app"]
	},
	"process-schema-designer-5x": {
		"path": "Terrasoft/designers/process-schema-designer",
		"deps": [
			"base-schema-designer",
			"process-schema-element-editable",
			"process-schema-diagram-5x",
			"diagram-draggable-container",
			"process-schema-designer-view-model-5x"
		],
		"less": ["process-schema-designer"],
		"scope": ["app"]
	},
	"process-schema-designer-log": {
		"path": "Terrasoft/designers/process-schema-designer-log",
		"deps": [
			"base-schema-designer"
		],
		"scope": ["app"]
	},
	"package-dependencies-diagram": {
		"path": "Terrasoft/designers/package-dependencies-diagram",
		"deps": [
			"process-schema-designer-log"
		],
		"scope": ["app"]
	},
	"core-resources": {
		"path": "Terrasoft/loc",
		"deps": ["ext-base"]
	},
	"domutils": {
		"path": "Terrasoft/utils/dom",
		"less": ["domutils"],
		"deps": ["ext-base", "underscore", "exceptions", "html2canvas", "jQuery", "commonutils"]
	},
	"commonutils": {
		"path": "Terrasoft/utils/common",
		"deps": [
			"ext-base",
			"underscore",
			"exceptions",
			"arrayutils",
			"stringutils",
			"dateutils",
			"objectutils",
			"datavaluetypeutils",
			"guidutils",
			"numberutils",
			"enumsutils",
			"uriutils",
			"fileutils",
			"color-utils",
			"htmlutils"
		]
	},
	"ssoutils": {
		"path": "Terrasoft/utils/sso",
		"deps": ["ext-base", "stringutils"]
	},
	"object-builder": {
		"path": "Terrasoft/utils/builder",
		"deps": [
			"baseobject"
		]
	},
	"arrayutils": {
		"path": "Terrasoft/utils/common",
		"deps": ["ext-base", "underscore", "exceptions"]
	},
	"color-utils": {
		"path": "Terrasoft/utils/common",
		"deps": ["ext-base", "exceptions"]
	},
	"stringutils": {
		"path": "Terrasoft/utils/common",
		"deps": [
			"ext-base",
			"underscore",
			"exceptions",
			"Json5",
			"htmlutils"
		]
	},
	"htmlutils": {
		"path": "Terrasoft/utils/common",
		"deps": [
			"ext-base",
			"underscore",
			"exceptions",
			"jsxss"
		]
	},
	"dateutils": {
		"path": "Terrasoft/utils/common",
		"deps": ["ext-base", "exceptions"]
	},
	"objectutils": {
		"path": "Terrasoft/utils/common",
		"deps": ["ext-base", "underscore", "exceptions", "arrayutils"]
	},
	"uriutils": {
		"path": "Terrasoft/utils/common",
		"deps": ["ext-base", "objectutils"]
	},
	"fileutils": {
		"path": "Terrasoft/utils/common",
		"deps": ["ext-base"]
	},
	"datavaluetypeutils": {
		"path": "Terrasoft/utils/common",
		"deps": ["ext-base", "exceptions", "arrayutils", "sysenums"]
	},
	"guidutils": {
		"path": "Terrasoft/utils/common",
		"deps": ["ext-base", "exceptions"]
	},
	"numberutils": {
		"path": "Terrasoft/utils/common",
		"deps": ["ext-base", "sysenums", "stringutils"]
	},
	"enumsutils": {
		"path": "Terrasoft/utils/common",
		"deps": ["ext-base"]
	},
	"controlsutils": {
		"path": "Terrasoft/utils/controls",
		"deps": ["ext-base", "sysenums", "progressspinner", "bubble-spinner", "circle-spinner"]
	},
	"sysenums": {
		"path": "Terrasoft/core/enums",
		"deps": ["ext-base"]
	},
	"data-constants": {
		"path": "Terrasoft/data/constants",
		"deps": ["ext-base", "sysenums", "core-resources"]
	},
	"exceptions": {
		"path": "Terrasoft/core/exceptions",
		"deps": ["core-resources"]
	},
	"private-member-watcher": {
		"path": "Terrasoft/core",
		"deps": ["ext-base"]
	},
	"baseobject": {
		"path": "Terrasoft/core",
		"deps": ["private-member-watcher", "sysenums", "exceptions", "commonutils", "domutils", "core-resources"]
	},
	"base-module": {
		"path": "Terrasoft/core",
		"deps": ["ext-base", "baseobject"]
	},
	"local-store": {
		"path": "Terrasoft/data/store",
		"deps": ["baseobject"]
	},
	"memory-store": {
		"path": "Terrasoft/data/store",
		"deps": ["baseobject"]
	},
	"store-manager": {
		"path": "Terrasoft/data/store",
		"deps": ["memory-store", "local-store"]
	},
	"performancecountermanager": {
		"path": "Terrasoft/amd",
		"deps": ["ext-base"]
	},
	"basenavigationprovider": {
		"path": "Terrasoft/core/router",
		"deps": ["baseobject"]
	},
	"historynavigationprovider": {
		"path": "Terrasoft/core/router",
		"deps": ["basenavigationprovider"]
	},
	"hashnavigationprovider": {
		"path": "Terrasoft/core/router",
		"deps": ["basenavigationprovider"]
	},
	"iefamilyhistorynavigationprovider": {
		"path": "Terrasoft/core/router",
		"deps": ["historynavigationprovider"]
	},
	"router": {
		"path": "Terrasoft/core/router",
		"deps": ["historynavigationprovider", "hashnavigationprovider", "iefamilyhistorynavigationprovider"],
		"less": ["router"]
	},
	"cron-constants": {
		"path": "Terrasoft/core/cron",
		"deps": ["ext-base"]
	},
	"cron-expression": {
		"path": "Terrasoft/core/cron",
		"deps": ["baseobject", "cron-constants"]
	},
	"cron-expression-parser": {
		"path": "Terrasoft/core/cron",
		"deps": ["baseobject", "cron-expression"]
	},
	"cron-expression-descriptor": {
		"path": "Terrasoft/core/cron",
		"deps": ["baseobject", "cron-expression"]
	},
	"basecollection": {
		"path": "Terrasoft/core/collections",
		"deps": ["baseobject"]
	},
	"sortable": {
		"path": "Terrasoft/core/mixins",
		"deps": ["baseobject"]
	},
	"filterable": {
		"path": "Terrasoft/core/mixins",
		"deps": ["baseobject"]
	},
	"json": {
		"path": "Terrasoft/utils/common",
		"deps": ["ext-base"]
	},
	"serializable": {
		"path": "Terrasoft/core/mixins",
		"deps": ["json", "commonutils"]
	},
	"collection": {
		"path": "Terrasoft/core/collections",
		"deps": ["filterable", "basecollection", "sortable", "serializable"]
	},
	"objectcollectionitem": {
		"path": "Terrasoft/core/collections",
		"deps": ["baseobject", "serializable"]
	},
	"objectcollection": {
		"path": "Terrasoft/core/collections",
		"deps": ["collection", "objectcollectionitem"]
	},
	"localizable-value": {
		"path": "Terrasoft/core",
		"deps": ["baseobject", "sys-values"]
	},
	"localizable-string": {
		"path": "Terrasoft/core",
		"deps": ["localizable-value", "serializable"]
	},
	"localizable-image": {
		"path": "Terrasoft/core",
		"deps": ["localizable-value"]
	},
	"error-info": {
		"path": "Terrasoft/core",
		"deps": ["baseobject"]
	},
	"resource-mutex": {
		"path": "Terrasoft/core",
		"deps": ["baseobject"]
	},
	"base-request": {
		"path": "Terrasoft/core",
		"deps": ["baseobject", "base-response", "serializable"]
	},
	"base-core-request": {
		"path": "Terrasoft/core",
		"deps": ["base-request", "core-service-provider"]
	},
	"base-response": {
		"path": "Terrasoft/core",
		"deps": ["error-info"]
	},
	"base-server-channel-response": {
		"path": "Terrasoft/core",
		"deps": ["baseobject", "json"]
	},
	"base-schema-response": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-response", "base-schema"]
	},
	"entity-schema-response": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-response", "entity-schema"]
	},
	"client-unit-schema-response": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-response", "client-unit-schema"],
		"scope": ["app"]
	},
	"build-package-hierarchy-response": {
		"path": "Terrasoft/manager",
		"deps": ["base-response"]
	},
	"build-package-hierarchy-request": {
		"path": "Terrasoft/manager",
		"deps": ["base-request", "build-package-hierarchy-response"]
	},
	"get-available-packages-response": {
		"path": "Terrasoft/manager",
		"deps": ["base-response"]
	},
	"get-available-packages-request": {
		"path": "Terrasoft/manager",
		"deps": ["base-request", "get-available-packages-response"]
	},
	"update-package-schema-data-request": {
		"path": "Terrasoft/manager",
		"deps": ["base-request", "base-response"]
	},
	"delete-package-schema-data-request": {
		"path": "Terrasoft/manager",
		"deps": ["base-request", "base-response"]
	},
	"schema-designer-utilities-response": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-response"]
	},
	"client-unit-schema-message": {
		"path": "Terrasoft/core",
		"deps": ["baseobject", "serializable"]
	},
	"client-unit-schema-parameter": {
		"path": "Terrasoft/manager/client-unit-schema-manager",
		"deps": ["baseobject", "serializable", "process-schema-parameter"],
		"scope": ["app"]
	},
	"sys-settings": {
		"path": "Terrasoft/core",
		"deps": ["ajax-provider", "parametrized-request"]
	},
	"features": {
		"path": "Terrasoft/core",
		"deps": ["ajax-provider"]
	},
	"component-manager": {
		"path": "Terrasoft/core",
		"deps": ["baseobject"]
	},
	"sys-values": {
		"path": "Terrasoft/core",
		"deps": ["sysenums"]
	},
	"value-converter-mixin": {
		"path": "Terrasoft/data/models",
		"deps": ["collection"]
	},
	"base-model": {
		"path": "Terrasoft/data/models",
		"deps": ["backbone", "baseobject", "value-converter-mixin"]
	},
	"data-model": {
		"path": "Terrasoft/data/models",
		"deps": [
			"baseobject"
		]
	},
	"data-model-collection": {
		"path": "Terrasoft/data/models",
		"deps": [
			"data-model", "objectcollection", "entity-data-model"
		]
	},
	"entity-base-view-model-mixin": {
		"path": "Terrasoft/data/models",
		"deps": [
			"insert-query", "update-query", "delete-query", "base-entity-schema", "imageurlbuilder",
			"sys-settings", "sys-values", "data-constants", "baseobject"
		]
	},
	"view-model-resources-mixin": {
		"path": "Terrasoft/data/models",
		"deps": ["baseobject"]
	},
	"entity-data-model": {
		"path": "Terrasoft/data/models",
		"deps": [
			"data-model", "related-entity-columns-mixin"
		]
	},
	"base-view-model": {
		"path": "Terrasoft/data/models",
		"deps": [
			"base-model",
			"insert-query",
			"update-query",
			"delete-query",
			"base-entity-schema",
			"imageurlbuilder",
			"sys-settings",
			"sys-values",
			"data-constants",
			"data-model-collection",
			"entity-base-view-model-mixin",
			"view-model-resources-mixin"
		]
	},
	"sys-setting-view-model": {
		"path": "Terrasoft/data/models",
		"deps": ["base-view-model"]
	},
	"base-view-model-collection": {
		"path": "Terrasoft/data/models",
		"deps": ["objectcollection"]
	},
	"groupmanager": {
		"path": "Terrasoft/core",
		"deps": ["component", "collection"]
	},
	"bindable": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["sysenums", "commonutils"]
	},
	"droppable": {
		"path": "Terrasoft/core/mixins",
		"deps": ["sysenums", "commonutils"]
	},
	"draggable": {
		"path": "Terrasoft/core/mixins",
		"less": ["draggable"],
		"deps": ["sysenums", "commonutils"]
	},
	"reorderable": {
		"path": "Terrasoft/core/mixins",
		"deps": ["commonutils", "base-view-model-collection"],
		"less": ["reorderable"]
	},
	"tooltip": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["sysenums", "commonutils"],
		"less": ["tooltip"]
	},
	"tip": {
		"path": "Terrasoft/controls/tip",
		"deps": ["abstractcontainer", "alignable"],
		"less": ["tip"]
	},
	"expandabletip": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["baseobject"]
	},
	"alignable": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["baseobject"]
	},
	"resizable": {
		"path": "Terrasoft/controls/mixins",
		"less": ["resizable"],
		"deps": ["baseobject"]
	},
	"component": {
		"path": "Terrasoft/controls/component",
		"deps": ["baseobject", "bindable", "base-css", "mask", "expandabletip", "component-manager"]
	},
	"controlgroup": {
		"path": "Terrasoft/controls/controlgroup",
		"deps": ["container"],
		"less": ["controlgroup"]
	},
	"abstractcontainer": {
		"path": "Terrasoft/controls/container",
		"deps": ["component", "resizable"]
	},
	"container": {
		"path": "Terrasoft/controls/container",
		"deps": ["abstractcontainer"]
	},
	"draggable-container": {
		"path": "Terrasoft/controls/container",
		"deps": ["container", "draggable"]
	},
	"droppable-container": {
		"path": "Terrasoft/controls/container",
		"deps": ["container", "droppable"]
	},
	"reorderable-container": {
		"path": "Terrasoft/controls/container",
		"deps": [
			"droppable-container",
			"reorderable"
		],
		"less": ["reorderable-container"]
	},
	"reorderable-container-view-model-mixin": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["baseobject", "base-view-model-collection"]
	},
	"reorderable-item-mixin": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["draggable"]
	},
	"tools-mixin": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["baseobject"]
	},
	"reorderable-item-view-model-mixin": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["base-view-model"]
	},
	"lazy-container": {
		"path": "Terrasoft/controls/container",
		"deps": ["container"]
	},
	"content-sheet": {
		"path": "Terrasoft/controls/content",
		"deps": ["droppable-container", "reorderable"],
		"less": ["content-sheet"]
	},
	"base-content-element": {
		"path": "Terrasoft/controls/content",
		"deps": [
			"abstractcontainer",
			"reorderable-item-mixin",
			"draggable-content-element"
		],
		"less": ["base-content-element"]
	},
	"content-image-element": {
		"path": "Terrasoft/controls/content",
		"deps": ["base-content-element"],
		"less": ["content-image-element"]
	},
	"content-text-element": {
		"path": "Terrasoft/controls/content",
		"deps": ["base-content-element"],
		"less": ["content-text-element"]
	},
	"content-button-element": {
		"path": "Terrasoft/controls/content",
		"deps": ["base-content-element"],
		"less": ["content-button-element"]
	},
	"content-mjbutton": {
		"path": "Terrasoft/controls/content",
		"deps": ["content-button-element"],
		"less": ["content-mjbutton"]
	},
	"content-html-element": {
		"path": "Terrasoft/controls/content",
		"deps": ["base-content-element"],
		"less": ["content-html-element"]
	},
	"content-separator-element": {
		"path": "Terrasoft/controls/content",
		"deps": ["base-content-element"]
	},
	"content-mjdivider": {
		"path": "Terrasoft/controls/content",
		"deps": ["content-separator-element"],
		"less": ["content-mjdivider"]
	},
	"content-mjimage": {
		"path": "Terrasoft/controls/content",
		"deps": ["content-image-element"],
		"less": ["content-mjimage"]
	},
	"draggable-content-block": {
		"path": "Terrasoft/controls/content",
		"deps": ["draggable"]
	},
	"draggable-content-element": {
		"path": "Terrasoft/controls/content",
		"deps": ["draggable"]
	},
	"selectable-content-block": {
		"path": "Terrasoft/controls/content",
		"deps": ["baseobject"]
	},
	"content-block": {
		"path": "Terrasoft/controls/content",
		"deps": [
			"grid-layout",
			"content-block-mixin",
			"selectable-content-block",
			"draggable-content-block"
		],
		"less": ["content-block"]
	},
	"content-block-mixin": {
		"path": "Terrasoft/controls/content",
		"deps": ["sysenums", "commonutils"]
	},
	"content-block-group": {
		"path": "Terrasoft/controls/content",
		"deps": [
			"abstractcontainer",
			"content-block-mixin",
			"selectable-content-block",
			"draggable-content-block"
		],
		"less": ["content-block-group"]
	},
	"content-mjblock": {
		"path": "Terrasoft/controls/content",
		"deps": [
			"abstractcontainer",
			"content-block-mixin",
			"selectable-content-block",
			"draggable-content-block"
		],
		"less": ["content-mjblock"]
	},
	"content-section": {
		"path": "Terrasoft/controls/content",
		"deps": [
			"grid-layout",
			"content-block-mixin",
			"selectable-content-block"
		],
		"less": ["content-section"]
	},
	"content-mjgroup": {
		"path": "Terrasoft/controls/content",
		"deps": [
			"abstractcontainer",
			"content-block-mixin"
		],
		"less": ["content-mjgroup"]
	},
	"content-column": {
		"path": "Terrasoft/controls/content",
		"deps": [
			"reorderable-container",
			"content-block-mixin",
			"selectable-content-block"
		],
		"less": ["content-column"]
	},
	"content-mjcolumn": {
		"path": "Terrasoft/controls/content",
		"deps": ["content-column"],
		"less": ["content-mjcolumn"]
	},
	"content-mjhero": {
		"path": "Terrasoft/controls/content",
		"deps": ["content-column"],
		"less": ["content-mjhero"]
	},
	"content-mjraw": {
		"path": "Terrasoft/controls/content",
		"deps": ["base-content-element"],
		"less": ["content-mjraw"]
	},
	"content-spacer": {
		"path": "Terrasoft/controls/content",
		"deps": ["base-content-element"],
		"less": ["content-spacer"]
	},
	"content-navbar": {
		"path": "Terrasoft/controls/content",
		"deps": ["base-content-element","content-block-mixin"],
		"less": ["content-navbar"]
	},
	"content-navbar-link": {
		"path": "Terrasoft/controls/content",
		"deps": ["abstractcontainer"],
		"less": ["content-navbar-link"]
	},
	"base-content-exporter": {
		"path": "Terrasoft/exporters",
		"deps": ["baseobject"]
	},
	"email-content-templates": {
		"path": "Terrasoft/exporters",
		"deps": ["ext-base", "features"]
	},
	"email-content-exporter": {
		"path": "Terrasoft/exporters",
		"deps": ["base-content-exporter", "html-minifier", "features", "email-content-templates"]
	},
	"email-content-validator": {
		"path": "Terrasoft/exporters",
		"deps": ["baseobject"]
	},
	"baseedit": {
		"path": "Terrasoft/controls/baseedit",
		"deps": ["component", "clearicon", "predictableicon"],
		"less": ["baseedit"]
	},
	"inline-text-edit": {
		"path": "Terrasoft/controls/inline-text-edit",
		"deps": ["baseedit", "ckeditor-base", "sanitizehtml"],
		"less": ["inline-text-edit"]
	},
	"inline-text-edit-macros": {
		"path": "Terrasoft/controls/inline-text-edit",
		"deps": ["ext-base"],
		"less": ["inline-text-edit-macros"]
	},
	"formula-inline-text-edit": {
		"path": "Terrasoft/controls/formula-inline-text-edit",
		"deps": ["inline-text-edit", "memoedit"],
		"less": ["formula-inline-text-edit"]
	},
	"lefticon": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["ext-base", "imageurlbuilder"]
	},
	"clearicon": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["ext-base", "imageurlbuilder"],
		"less": ["clearicon"]
	},
	"sidebar": {
		"path": "Terrasoft/controls/sidebar",
		"deps": ["container"],
		"less": ["sidebar"]
	},
	"tabpanel": {
		"path": "Terrasoft/controls/tabpanel",
		"deps": ["container"],
		"less": ["tabpanel"]
	},
	"image-tab-panel": {
		"path": "Terrasoft/controls/image-tab-panel",
		"deps": ["container", "tabpanel"],
		"less": ["image-tab-panel"]
	},
	"schedule-edit": {
		"path": "Terrasoft/controls/schedule-edit",
		"deps": ["component", "schedule-item", "bindable", "collection", "schedule-floating-item", "store-manager"],
		"less": ["schedule-edit"]
	},
	"schedule-item": {
		"path": "Terrasoft/controls/schedule-edit",
		"deps": ["component"],
		"less": ["schedule-item"]
	},
	"schedule-floating-item": {
		"path": "Terrasoft/controls/schedule-edit",
		"deps": ["component"],
		"less": ["schedule-floating-item"]
	},
	"righticon": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["ext-base", "imageurlbuilder"]
	},
	"aggregation-query-column": {
		"path": "Terrasoft/data/columns",
		"deps": ["basequerycolumn", "aggregation-query-expression"]
	},
	"related-entity-columns-mixin": {
		"path": "Terrasoft/data/columns",
		"deps": ["commonutils"]
	},
	"FileAPI.min": {
		"path": "FileApi",
		"doNotTranspile": true
	},
	"imageApi": {
		"path": "Terrasoft/core/imageApi",
		"deps": ["baseobject", "FileAPI.min", "json"]
	},
	"fileupload": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["baseobject", "FileAPI.min"]
	},
	"menu-mixin": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["menu"]
	},
	"sanitizehtml": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["htmlutils"]
	},
	"button": {
		"path": "Terrasoft/controls/button",
		"deps": ["component", "groupmanager", "menu", "fileupload", "tooltip", "menu-mixin"],
		"less": ["button"]
	},
	"numberedit": {
		"path": "Terrasoft/controls/numberedit",
		"less": ["numberedit"],
		"deps": ["baseedit", "controlsutils"]
	},
	"floatedit": {
		"path": "Terrasoft/controls/floatedit",
		"deps": ["numberedit", "numberutils"]
	},
	"integeredit": {
		"path": "Terrasoft/controls/integeredit",
		"deps": ["numberedit", "numberutils"]
	},
	"phone-edit": {
		"path": "Terrasoft/controls/phone-edit",
		"deps": ["baseedit", "lefticon", "righticon"]
	},
	"label": {
		"path": "Terrasoft/controls/label",
		"deps": ["component"],
		"less": ["label"]
	},
	"tip-label": {
		"path": "Terrasoft/controls/tip-label",
		"deps": ["label"],
		"less": ["tip-label"]
	},
	"hyperlink": {
		"path": "Terrasoft/controls/hyperlink",
		"deps": ["label"],
		"less": ["hyperlink"]
	},
	"basemenuitem": {
		"path": "Terrasoft/controls/menu",
		"deps": ["component", "groupmanager", "imageurlbuilder"]
	},
	"menuseparator": {
		"path": "Terrasoft/controls/menu",
		"deps": ["basemenuitem"]
	},
	"menuitem": {
		"path": "Terrasoft/controls/menu",
		"deps": ["basemenuitem"]
	},
	"radiomenuitem": {
		"path": "Terrasoft/controls/menu",
		"deps": ["basemenuitem"]
	},
	"checkmenuitem": {
		"path": "Terrasoft/controls/menu",
		"deps": ["basemenuitem"]
	},
	"colormenuitem": {
		"path": "Terrasoft/controls/menu",
		"deps": ["basemenuitem"]
	},
	"color-picker-menu-item": {
		"path": "Terrasoft/controls/menu",
		"deps": ["basemenuitem"],
		"less": ["color-picker-menu-item"]
	},
	"basespinner": {
		"path": "Terrasoft/controls/basespinner",
		"deps": ["component"]
	},
	"baseanimationspinner": {
		"path": "Terrasoft/controls/baseanimationspinner",
		"deps": ["basespinner", "lottie_light"]
	},
	"progressspinner": {
		"path": "Terrasoft/controls/progressspinner",
		"deps": ["basespinner", "progressspinner-css"]
	},
	"progressspinner-css": {
		"path": "Terrasoft/controls/progressspinner",
		"less": ["progressspinner"],
		"file": "-"
	},
	"bubble-spinner": {
		"path": "Terrasoft/controls/bubble-spinner",
		"deps": ["baseanimationspinner"]
	},
	"circle-spinner": {
		"path": "Terrasoft/controls/circle-spinner",
		"deps": ["baseanimationspinner"]
	},
	"menu": {
		"path": "Terrasoft/controls/menu",
		"deps": ["collection", "component", "menuseparator", "menuitem", "controlsutils"],
		"less": ["menu"]
	},
	"textedit": {
		"path": "Terrasoft/controls/textedit",
		"deps": ["baseedit", "lefticon", "righticon"]
	},
	"checkboxedit": {
		"path": "Terrasoft/controls/checkboxedit",
		"deps": ["component"],
		"less": ["checkboxedit"]
	},
	"toggleedit": {
		"path": "Terrasoft/controls/toggleedit",
		"deps": ["checkboxedit"],
		"less": ["toggleedit"]
	},
	"expandable": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["ext-base", "baseobject"],
		"less": ["expandable"]
	},
	"expandablelist": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["ext-base", "sysenums"]
	},
	"comboboxedit": {
		"path": "Terrasoft/controls/comboboxedit",
		"deps": ["baseedit", "expandablelist", "righticon", "collection", "listview"],
		"less": ["comboboxedit"]
	},
	"listview": {
		"path": "Terrasoft/controls/listview",
		"deps": ["component", "collection", "controlsutils"],
		"less": ["listview"]
	},
	"radiobutton": {
		"path": "Terrasoft/controls/radiobutton",
		"deps": ["checkboxedit", "groupmanager"],
		"less": ["radiobutton"]
	},
	"memoedit": {
		"path": "Terrasoft/controls/memoedit",
		"deps": ["baseedit"],
		"less": ["memoedit"]
	},
	"lookupedit": {
		"path": "Terrasoft/controls/lookupedit",
		"deps": ["baseedit", "expandablelist", "righticon", "lefticon", "collection", "listview", "sys-settings"],
		"less": ["lookupedit"]
	},
	"predictableicon": {
		"path": "Terrasoft/controls/mixins",
		"deps": ["ext-base", "sysenums"],
		"less": ["predictableicon"]
	},
	"mappingedit": {
		"path": "Terrasoft/controls/mappingedit",
		"deps": ["lookupedit", "menu-mixin", "menu", "diagram-enums"],
		"less": ["mappingedit"],
		"scope": ["app"]
	},
	"dateedit": {
		"path": "Terrasoft/controls/dateedit",
		"deps": ["baseedit", "datepicker", "righticon"],
		"less": ["dateedit"]
	},
	"timeedit": {
		"path": "Terrasoft/controls/timeedit",
		"deps": ["comboboxedit"]
	},
	"draggable-grid-mixin": {
		"path": "Terrasoft/controls/grid",
		"deps": ["component"]
	},
	"hierarchical-grid-mixin": {
		"path": "Terrasoft/controls/grid",
		"deps": ["ext-base"]
	},
	"grid": {
		"path": "Terrasoft/controls/grid",
		"less": ["grid24-1"],
		"deps": ["component", "checkboxedit", "button", "numberutils",
			"draggable-grid-mixin", "hierarchical-grid-mixin", "controlsutils"]
	},
	"audio-grid": {
		"path": "Terrasoft/controls/grid/audio-grid",
		"deps": ["grid"]
	},
	"base-view-grid": {
		"path": "Terrasoft/controls/grid/base-view-grid",
		"less": ["base-view-grid"],
		"deps": ["grid", "listed-grid-html-generator", "tiled-grid-html-generator"]
	},
	"grid-cell-formatter": {
		"path": "Terrasoft/controls/grid/grid-cell-formatter",
		"deps": ["commonutils"]
	},
	"grid-html-generator": {
		"path": "Terrasoft/controls/grid/grid-html-generator",
		"deps": ["component", "grid-cell-formatter"]
	},
	"listed-grid-html-generator": {
		"path": "Terrasoft/controls/grid/listed-grid-html-generator",
		"deps": ["grid-html-generator"]
	},
	"tiled-grid-html-generator": {
		"path": "Terrasoft/controls/grid/tiled-grid-html-generator",
		"deps": ["grid-html-generator"]
	},
	"grid-layout": {
		"path": "Terrasoft/controls/grid-layout",
		"less": ["grid-layout.24-1"],
		"deps": ["container"]
	},
	"grid-layout-edit-item": {
		"path": "Terrasoft/controls/grid-layout-edit",
		"less": ["grid-layout-edit-item"],
		"deps": ["draggable-container", "imageurlbuilder"]
	},
	"grid-layout-edit": {
		"path": "Terrasoft/controls/grid-layout-edit",
		"less": ["grid-layout-edit"],
		"deps": ["grid-layout-edit-item", "collection", "droppable"]
	},
	"grid-layout-table-edit-item": {
		"path": "Terrasoft/controls/grid-layout-table-edit",
		"less": ["grid-layout-table-edit-item"],
		"deps": ["grid-layout-edit-item"]
	},
	"grid-layout-table-edit": {
		"path": "Terrasoft/controls/grid-layout-table-edit",
		"less": ["grid-layout-table-edit"],
		"deps": ["grid-layout-table-edit-item", "grid-layout-edit"]
	},
	"datepicker": {
		"path": "Terrasoft/controls/datepicker",
		"less": ["datepicker"],
		"deps": ["component"]
	},
	"imageurlbuilder": {
		"path": "Terrasoft/utils/common",
		"deps": ["baseobject"]
	},
	"filecontenturlbuilder": {
		"path": "Terrasoft/utils/common",
		"deps": ["baseobject"]
	},
	"schemaurlbuilder": {
		"path": "Terrasoft/utils/common",
		"deps": ["baseobject"]
	},
	"resourceurlbuilder": {
		"path": "Terrasoft/utils/common",
		"deps": ["baseobject"]
	},
	"imagedecorator": {
		"path": "Terrasoft/utils/common",
		"deps": ["baseobject"]
	},
	"resourceutility": {
		"path": "Terrasoft/utils/common",
		"deps": ["baseobject", "imagedecorator", "imageurlbuilder", "store-manager"]
	},
	"messagebox": {
		"path": "Terrasoft/controls/messagebox",
		"deps": [
			"controlsutils", "label", "textedit", "integeredit", "floatedit", "checkboxedit", "dateedit",
			"timeedit", "comboboxedit", "lookupedit", "container", "button", "memoedit"
		],
		"less": ["messagebox"]
	},
	"basefilter": {
		"path": "Terrasoft/data/filters",
		"deps": [
			"objectcollectionitem", "parameterexpression", "columnexpression", "functionexpression",
			"sub-query-expression", "aggregation-query-expression"
		]
	},
	"comparefilter": {
		"path": "Terrasoft/data/filters",
		"deps": ["basefilter"]
	},
	"exists-filter": {
		"path": "Terrasoft/data/filters",
		"deps": ["basefilter"]
	},
	"betweenfilter": {
		"path": "Terrasoft/data/filters",
		"deps": ["basefilter"]
	},
	"isnullfilter": {
		"path": "Terrasoft/data/filters",
		"deps": ["basefilter"]
	},
	"in-filter": {
		"path": "Terrasoft/data/filters",
		"deps": ["basefilter"]
	},
	"filter-enums": {
		"path": "Terrasoft/data/filters",
		"deps": ["core-resources", "sysenums"]
	},
	"filter-utils": {
		"path": "Terrasoft/data/filters",
		"deps": [
			"basefilter", "in-filter", "isnullfilter", "betweenfilter", "exists-filter",
			"comparefilter", "filter-group", "filter-enums"
		]
	},
	"filter-group": {
		"path": "Terrasoft/data/filters",
		"deps": ["objectcollection", "comparefilter", "betweenfilter", "isnullfilter", "in-filter"]
	},
	"filteredit-filter-input": {
		"path": "Terrasoft/controls/filteredit",
		"deps": ["timeedit", "dateedit", "textedit", "integeredit", "floatedit", "button"]
	},
	"filteredit-filter": {
		"path": "Terrasoft/controls/filteredit",
		"deps": ["filteredit-filter-input", "filteredit-item"]
	},
	"filteredit-group": {
		"path": "Terrasoft/controls/filteredit",
		"deps": ["filteredit-filter", "filteredit-item"]
	},
	"filteredit-item": {
		"path": "Terrasoft/controls/filteredit",
		"deps": ["baseobject"]
	},
	"filteredit": {
		"path": "Terrasoft/controls/filteredit",
		"less": ["filteredit"],
		"deps": ["component", "collection", "listview", "filter-group", "filteredit-group"]
	},
	"baseexpression": {
		"path": "Terrasoft/data/expressions",
		"deps": ["objectcollectionitem"]
	},
	"columnexpression": {
		"path": "Terrasoft/data/expressions",
		"deps": ["baseexpression", "base-entity-schema"]
	},
	"parameterexpression": {
		"path": "Terrasoft/data/expressions",
		"deps": ["baseexpression", "parameter"]
	},
	"functionexpression": {
		"path": "Terrasoft/data/expressions",
		"deps": ["baseexpression"]
	},
	"sub-query-expression": {
		"path": "Terrasoft/data/expressions",
		"deps": ["baseexpression"]
	},
	"aggregation-query-expression": {
		"path": "Terrasoft/data/expressions",
		"deps": ["baseexpression"]
	},
	"parameter": {
		"path": "Terrasoft/data/filters",
		"deps": ["objectcollectionitem"]
	},
	"parameters": {
		"path": "Terrasoft/data/filters",
		"deps": ["objectcollection", "parameter"]
	},
	"base-entity-schema": {
		"path": "Terrasoft/data/models",
		"deps": ["baseobject"]
	},
	"basequery": {
		"path": "Terrasoft/data/queries",
		"deps": [
			"serializable",
			"base-entity-schema",
			"parameters",
			"data-provider",
			"features",
			"execution-data-collector"
		]
	},
	"basefilterablequery": {
		"path": "Terrasoft/data/queries",
		"deps": ["basequery", "filter-group", "filter-utils"]
	},
	"basequerycolumn": {
		"path": "Terrasoft/data/columns",
		"deps": ["objectcollectionitem"]
	},
	"entityquerycolumn": {
		"path": "Terrasoft/data/columns",
		"deps": ["basequerycolumn", "columnexpression"]
	},
	"functionquerycolumn": {
		"path": "Terrasoft/data/columns",
		"deps": ["basequerycolumn", "functionexpression"]
	},
	"parameterquerycolumn": {
		"path": "Terrasoft/data/columns",
		"deps": ["basequerycolumn", "parameterexpression"]
	},
	"sub-query-column": {
		"path": "Terrasoft/data/columns",
		"deps": ["basequerycolumn", "sub-query-expression"]
	},
	"column-values": {
		"path": "Terrasoft/data/queries",
		"deps": [
			"objectcollection",
			"columnexpression",
			"functionexpression",
			"parameterexpression",
			"sub-query-expression"
		]
	},
	"querycolumns": {
		"path": "Terrasoft/data/columns",
		"deps": [
			"objectcollection",
			"entityquerycolumn",
			"functionquerycolumn",
			"parameterquerycolumn",
			"sub-query-column"
		]
	},
	"deferred-execution-function": {
		"path": "Terrasoft/core/deferred-execution",
		"deps": [ "baseobject" ]
	},
	"deferred-execution-dispatcher": {
		"path": "Terrasoft/core/deferred-execution",
		"deps": [ "deferred-execution-function" ]
	},
	"ajax-provider": {
		"path": "Terrasoft/core",
		"deps": [
			"baseobject",
			"server-channel",
			"store-manager",
			"performancecountermanager",
			"deferred-execution-dispatcher"
		]
	},
	"base-service-provider": {
		"path": "Terrasoft/core",
		"deps": ["ajax-provider", "features"]
	},
	"service-provider": {
		"path": "Terrasoft/core",
		"deps": ["base-service-provider"]
	},
	"core-service-provider": {
		"path": "Terrasoft/core",
		"deps": ["base-service-provider"]
	},
	"data-provider": {
		"path": "Terrasoft/core",
		"deps": ["service-provider", "batch-query"]
	},
	"entity-schema-query": {
		"path": "Terrasoft/data/queries",
		"deps": ["basefilterablequery", "querycolumns"]
	},
	"sys-setting-query": {
		"path": "Terrasoft/data/queries/sys-setting",
		"deps": [
			"entity-schema-query", "delete-sys-setting-request", "insert-sys-setting-request",
			"update-sys-setting-request"
		]
	},
	"delete-sys-setting-request": {
		"path": "Terrasoft/data/queries/sys-setting",
		"deps": ["base-request"]
	},
	"sys-setting-save-request": {
		"path": "Terrasoft/data/queries/sys-setting",
		"deps": ["base-request"]
	},
	"insert-sys-setting-request": {
		"path": "Terrasoft/data/queries/sys-setting",
		"deps": ["sys-setting-save-request"]
	},
	"update-sys-setting-request": {
		"path": "Terrasoft/data/queries/sys-setting",
		"deps": ["sys-setting-save-request"]
	},
	"delete-query": {
		"path": "Terrasoft/data/queries",
		"deps": ["basefilterablequery"]
	},
	"insert-query": {
		"path": "Terrasoft/data/queries",
		"deps": ["basequery", "column-values"]
	},
	"update-query": {
		"path": "Terrasoft/data/queries",
		"deps": ["basefilterablequery", "column-values"]
	},
	"batch-query": {
		"path": "Terrasoft/data/queries",
		"deps": ["baseobject", "serializable", "execution-data-collector"]
	},
	"base-filter-provider": {
		"path": "Terrasoft/data/filters",
		"deps": ["baseobject", "filter-utils"]
	},
	"filter-manager": {
		"path": "Terrasoft/data/filters",
		"deps": ["base-filter-provider", "filter-group", "filter-utils"]
	},
	"msg-channel": {
		"path": "Terrasoft/core",
		"deps": ["baseobject"]
	},
	"websocket-msg-channel": {
		"path": "Terrasoft/core",
		"deps": ["msg-channel"]
	},
	"signalr-msg-channel": {
		"path": "Terrasoft/core",
		"deps": ["msg-channel", "signalr"]
	},
	"server-channel": {
		"path": "Terrasoft/core",
		"deps": ["websocket-msg-channel", "json", "ext-base", "signalr-msg-channel"]
	},
	"websocket-maintenance": {
		"path": "Terrasoft/core",
		"deps": ["baseobject", "server-channel"]
	},
	"session-end-user-notification": {
		"path": "Terrasoft/core",
		"deps": ["baseobject", "server-channel"]
	},
	"htmlcontrol": {
		"path": "Terrasoft/controls/htmlcontrol",
		"deps": ["component"]
	},
	"iframe": {
		"path": "Terrasoft/controls/iframe",
		"deps": ["component", "sanitizehtml"],
		"less": ["iframe"]
	},
	"command-line": {
		"path": "Terrasoft/controls/command-line",
		"deps": ["baseedit", "expandablelist", "righticon", "collection", "listview"],
		"less": ["command-line"]
	},
	"image-edit": {
		"path": "Terrasoft/controls/image-edit",
		"deps": ["component", "fileupload"],
		"less": ["image-edit"]
	},
	"color-button": {
		"path": "Terrasoft/controls/color-button",
		"deps": ["baseedit", "button", "colormenuitem", "color-picker-menu-item", "controlsutils"],
		"less": ["color-button"]
	},
	"mask": {
		"path": "Terrasoft/controls/mask",
		"deps": ["baseobject", "progressspinner-css"],
		"less": ["mask"]
	},
	"logger": {
		"path": "Terrasoft/core",
		"deps": ["service-provider"]
	},
	"file-helper": {
		"path": "Terrasoft/core",
		"deps": ["data-provider", "FileAPI.min"]
	},
	"telephony-enums": {
		"path": "Terrasoft/integration/telephony",
		"deps": ["ext-base"]
	},
	"call": {
		"path": "Terrasoft/integration/telephony",
		"deps": ["baseobject", "serializable", "telephony-enums"]
	},
	"base-cti-provider": {
		"path": "Terrasoft/integration/telephony",
		"deps": ["baseobject", "logger", "telephony-enums"]
	},
	"cti-model": {
		"path": "Terrasoft/integration/telephony",
		"deps": ["base-cti-provider", "base-view-model", "call", "telephony-enums"]
	},
	"msg-command-info": {
		"path": "Terrasoft/integration/telephony/messaging",
		"deps": ["baseobject", "serializable", "telephony-enums"]
	},
	"msg-event-info": {
		"path": "Terrasoft/integration/telephony/messaging",
		"deps": ["baseobject", "serializable", "telephony-enums"]
	},
	"msg-service-cti-provider": {
		"path": "Terrasoft/integration/telephony/messaging",
		"deps": ["base-cti-provider", "websocket-msg-channel", "msg-command-info", "msg-event-info", "telephony-enums"]
	},
	"oktell-enums": {
		"path": "Terrasoft/integration/telephony/oktell",
		"deps": ["ext-base"]
	},
	"oktell-call": {
		"path": "Terrasoft/integration/telephony/oktell",
		"deps": ["call"]
	},
	"oktell-cti-provider": {
		"path": "Terrasoft/integration/telephony/oktell",
		"deps": ["base-cti-provider", "oktell-enums", "telephony-enums", "oktell-call"]
	},
	"callway-enums": {
		"path": "Terrasoft/integration/telephony/callway",
		"deps": ["ext-base"]
	},
	"callway-cti-provider": {
		"path": "Terrasoft/integration/telephony/callway",
		"deps": [
			"base-cti-provider", "callway-enums", "msg-command-info", "msg-event-info", "collection",
			"telephony-enums"
		]
	},
	"finesse-enums": {
		"path": "Terrasoft/integration/telephony/finesse",
		"deps": ["ext-base"]
	},
	"finesse-cti-provider": {
		"path": "Terrasoft/integration/telephony/finesse",
		"deps": ["base-cti-provider", "finesse-enums", "telephony-enums"]
	},
	"json-differ": {
		"path": "Terrasoft/utils/common",
		"deps": ["baseobject", "json", "jsondiffpatch"]
	},
	"json-applier": {
		"path": "Terrasoft/utils/common",
		"deps": ["memory-store"]
	},
	"jsondiffpatch": {
		"path": "JsonDiffPatch",
		"doNotTranspile": true
	},
	"dragdrophelper": {
		"path": "Terrasoft/utils/dragdrop",
		"deps": ["baseobject"]
	},
	"base-manager-item": {
		"path": "Terrasoft/manager/base-manager",
		"deps": ["baseobject", "outdated-schema-notification-mixin"]
	},
	"base-manager": {
		"path": "Terrasoft/manager/base-manager",
		"deps": ["baseobject", "base-manager-item", "collection", "server-channel", "outdated-schema-notification-mixin"]
	},
	"data-manager-item": {
		"path": "Terrasoft/manager/data-manager",
		"deps": ["base-manager-item"]
	},
	"data-manager": {
		"path": "Terrasoft/manager/data-manager",
		"deps": ["baseobject", "data-manager-item", "collection", "entity-schema-query"]
	},
	"object-manager-item": {
		"path": "Terrasoft/manager/object-manager",
		"deps": ["base-manager-item", "data-manager"]
	},
	"object-manager": {
		"path": "Terrasoft/manager/object-manager",
		"deps": [
			"base-manager",
			"object-manager-item",
			"update-package-schema-data-request",
			"delete-package-schema-data-request"
		]
	},
	"package-manager-item": {
		"path": "Terrasoft/manager/package-manager",
		"deps": ["base-manager-item"]
	},
	"package-manager": {
		"path": "Terrasoft/manager/package-manager",
		"deps": ["sys-settings", "object-manager", "package-manager-item"]
	},
	"schema-manager-data-provider": {
		"path": "Terrasoft/manager",
		"deps": ["base-manager", "service-provider"]
	},
	"schema-designer-utilities": {
		"path": "Terrasoft/manager",
		"deps": [
			"base-manager",
			"schema-manager-data-provider",
			"store-manager",
			"build-package-hierarchy-request"
		]
	},
	"base-schema": {
		"path": "Terrasoft/manager/base-schema-manager",
		"deps": ["meta-item", "serializable", "localizable-string"]
	},
	"base-process-schema": {
		"path": "Terrasoft/manager/process-schema-manager",
		"deps": [
			"base-schema",
			"parametrized-process-schema-element"
		],
		"scope": ["app"]
	},
	"base-schema-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-request"]
	},
	"outdated-schema-notification-mixin": {
		"path": "Terrasoft/manager",
		"deps": ["ext-base"]
	},
	"base-schema-manager-item": {
		"path": "Terrasoft/manager/base-schema-manager",
		"deps": [
			"base-manager-item",
			"base-schema",
			"base-schema-request",
			"schema-manager-data-provider",
			"outdated-schema-notification-mixin"
		]
	},
	"base-schema-manager": {
		"path": "Terrasoft/manager/base-schema-manager",
		"deps": [
			"baseobject",
			"entity-schema-query",
			"collection",
			"base-schema-manager-item",
			"schema-designer-utilities",
			"parametrized-request",
			"base-schema-manager-request",
			"package-manager"
		]
	},
	"entity-schema-column": {
		"path": "Terrasoft/manager/entity-schema-manager",
		"deps": ["baseobject", "serializable", "localizable-string"]
	},
	"entity-schema": {
		"path": "Terrasoft/manager/entity-schema-manager",
		"deps": ["base-schema", "objectcollection", "entity-schema-column"]
	},
	"entity-schema-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-request"]
	},
	"entity-schema-remove-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["entity-schema-request"]
	},
	"entity-schema-manager-item": {
		"path": "Terrasoft/manager/entity-schema-manager",
		"deps": ["base-schema-manager-item", "entity-schema", "entity-schema-request"]
	},
	"entity-schema-manager": {
		"path": "Terrasoft/manager/entity-schema-manager",
		"deps": ["base-schema-manager", "entity-schema-manager-item", "sys-values"]
	},
	"client-unit-schema-remove-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["client-unit-schema-request"]
	},
	"client-unit-schema": {
		"path": "Terrasoft/manager/client-unit-schema-manager",
		"deps": [
			"base-schema",
			"objectcollection",
			"localizable-image",
			"client-unit-schema-parameter",
			"localizable-string"
		],
		"scope": ["app"]
	},
	"client-unit-schema-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-request"]
	},
	"client-unit-schema-manager-item": {
		"path": "Terrasoft/manager/client-unit-schema-manager",
		"deps": ["base-schema-manager-item", "client-unit-schema", "client-unit-schema-request"],
		"scope": ["app"]
	},
	"client-unit-schema-manager": {
		"path": "Terrasoft/manager/client-unit-schema-manager",
		"deps": ["base-schema-manager", "client-unit-schema-manager-item"],
		"scope": ["app"]
	},
	"base-schema-update-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-request"]
	},
	"entity-schema-update-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-update-request"]
	},
	"client-unit-schema-update-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-update-request"]
	},
	"process-schema": {
		"path": "Terrasoft/manager/process-schema-manager",
		"deps": [
			"process-flow-element-schema-manager",
			"base-process-schema",
			"objectcollection",
			"schema-using"
		],
		"scope": ["app"]
	},
	"process-schema-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-request"],
		"scope": ["app"]
	},
	"process-schema-manager-item": {
		"path": "Terrasoft/manager/process-schema-manager",
		"deps": ["base-schema-manager-item", "process-schema", "process-schema-request"],
		"scope": ["app"]
	},
	"process-schema-manager": {
		"path": "Terrasoft/manager/process-schema-manager",
		"deps": ["base-process-schema-manager", "process-schema-manager-item"],
		"scope": ["app"]
	},
	"base-process-schema-manager": {
		"path": "Terrasoft/manager/base-process-schema-manager",
		"deps": ["package-manager", "base-schema-manager", "base-schema-manager-request"],
		"scope": ["app"]
	},
	"process-schema-response": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-response", "process-schema"],
		"scope": ["app"]
	},
	"process-schema-update-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-update-request"],
		"scope": ["app"]
	},
	"process-schema-remove-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["process-schema-request"],
		"scope": ["app"]
	},
	"process-schema-lazy-properties-helper": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["baseobject", "process-schema-designer-utilities"],
		"scope": ["app"]
	},
	"process-usertask-schema-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-request"],
		"scope": ["app"]
	},
	"process-usertask-schema-reset-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["process-usertask-schema-request"],
		"scope": ["app"]
	},
	"process-usertask-schema-reset-all-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-request"],
		"scope": ["app"]
	},
	"process-usertask-schema": {
		"path": "Terrasoft/manager/process-user-task-schema-manager",
		"deps": ["process-activity-schema"],
		"scope": ["app"]
	},
	"user-task-schema": {
		"path": "Terrasoft/manager/process-user-task-schema-manager",
		"deps": [
			"parametrized-process-schema-element",
			"client-unit-schema-manager",
			"base-schema"
		],
		"scope": ["app"]
	},
	"base-usertask-schema-manager": {
		"path": "Terrasoft/manager/base-usertask-schema-manager",
		"deps": [
			"base-schema-manager",
			"user-task-schema",
			"process-usertask-schema-manager-item"
		],
		"scope": ["app"]
	},
	"process-usertask-schema-manager-item": {
		"path": "Terrasoft/manager/process-user-task-schema-manager",
		"deps": [
			"process-flow-element-schema-manager-item",
			"process-usertask-schema",
			"process-usertask-schema-request",
			"process-usertask-schema-reset-request",
			"process-usertask-schema-reset-all-request"
		],
		"scope": ["app"]
	},
	"process-usertask-schema-manager": {
		"path": "Terrasoft/manager/process-user-task-schema-manager",
		"deps": [
			"base-usertask-schema-manager"
		],
		"scope": ["app"]
	},
	"process-usertask-schema-response": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-response", "process-usertask-schema"],
		"scope": ["app"]
	},
	"base-process-schema-element": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": [
			"base-process-schema-item",
			"process-constants"
		],
		"scope": ["app"]
	},
	"base-process-schema-item": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": [
			"base-schema"
		],
		"scope": ["app"]
	},
	"process-base-element-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": [
			"base-schema",
			"diagram-enums",
			"process-constants",
			"base-process-schema-element"
		],
		"scope": ["app"]
	},
	"process-flow-element-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": [
			"process-base-element-schema",
			"numberutils"
		],
		"scope": ["app"]
	},
	"process-lane-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-element-schema"],
		"scope": ["app"]
	},
	"process-laneset-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-lane-schema"],
		"scope": ["app"]
	},
	"process-flow-element-schema-manager-item": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": [
			"base-schema-manager-item",
			"process-flow-element-schema",
			"process-flow-element-schema-request"
		],
		"scope": ["app"]
	},
	"process-schema-parameter": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-element-schema", "diagram-enums", "sysenums"],
		"scope": ["app"]
	},
	"dynamic-process-schema-parameter": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-schema-parameter"],
		"scope": ["app"]
	},
	"process-schema-parameter-collection": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["ext-base", "collection"],
		"scope": ["app"]
	},
	"parametrized-process-schema-element": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": [
			"process-schema-parameter-collection",
			"process-schema-parameter",
			"dynamic-process-schema-parameter",
			"process-schema-lazy-properties-helper",
			"process-schema-designer-utilities",
			"process-constants"
		],
		"scope": ["app"]
	},
	"base-process-flow-element-schema-manager": {
		"path": "Terrasoft/manager/base-process-flow-element-schema-manager",
		"deps": ["base-schema-manager"],
		"scope": ["app"]
	},
	"process-flow-element-schema-manager": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": [
			"base-process-flow-element-schema-manager",
			"process-usertask-schema-manager",
			"process-flow-element-schema-manager-item",
			"process-exclusive-gateway-schema",
			"process-exclusive-event-based-gateway-schema",
			"process-inclusive-gateway-schema",
			"process-parallel-gateway-schema",
			"process-start-event-schema",
			"process-start-message-schema",
			"process-start-message-non-interrupting-schema",
			"process-start-signal-schema",
			"process-terminate-event-schema",
			"process-end-event-schema",
			"process-intermediate-catch-message-schema",
			"process-intermediate-catch-signal-schema",
			"process-intermediate-catch-timer-schema",
			"process-start-timer-event-schema",
			"process-intermediate-throw-message-schema",
			"process-intermediate-throw-signal-schema",
			"process-subprocess-schema",
			"process-webservice-schema",
			"process-scripttask-schema",
			"process-formulatask-schema",
			"process-lane-schema",
			"process-laneset-schema",
			"process-default-sequence-flow-schema",
			"process-conditional-sequence-flow-schema",
			"process-event-subprocess-schema",
			"process-event-base-gateway-schema",
			"process-schema-usertask",
			"features"
		],
		"scope": ["app"]
	},
	"process-flow-element-schema-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-request"],
		"scope": ["app"]
	},
	"process-flow-element-schema-response": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-response", "process-flow-element-schema"],
		"scope": ["app"]
	},
	"process-activity-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": [
			"process-flow-element-schema",
			"parametrized-process-schema-element"
		],
		"scope": ["app"]
	},
	"process-base-event-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": [
			"process-flow-element-schema",
			"parametrized-process-schema-element"
		],
		"scope": ["app"]
	},
	"process-terminate-event-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-event-schema"],
		"scope": ["app"]
	},
	"process-end-event-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-terminate-event-schema"],
		"scope": ["app"]
	},
	"process-start-event-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-event-schema"],
		"scope": ["app"]
	},
	"process-start-message-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-event-schema"],
		"scope": ["app"]
	},
	"process-start-message-non-interrupting-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-start-message-schema"],
		"scope": ["app"]
	},
	"process-start-signal-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-event-schema"],
		"scope": ["app"]
	},
	"process-intermediate-catch-message-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-event-schema"],
		"scope": ["app"]
	},
	"process-intermediate-catch-signal-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-event-schema"],
		"scope": ["app"]
	},
	"process-intermediate-catch-timer-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-event-schema"],
		"scope": ["app"]
	},
	"process-start-timer-event-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-event-schema"],
		"scope": ["app"]
	},
	"process-intermediate-throw-message-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-event-schema"],
		"scope": ["app"]
	},
	"process-intermediate-throw-signal-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-event-schema"],
		"scope": ["app"]
	},
	"process-base-gateway-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-flow-element-schema"],
		"scope": ["app"]
	},
	"process-exclusive-gateway-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-gateway-schema"],
		"scope": ["app"]
	},
	"process-exclusive-event-based-gateway-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-gateway-schema"],
		"scope": ["app"]
	},
	"process-inclusive-gateway-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-gateway-schema"],
		"scope": ["app"]
	},
	"process-parallel-gateway-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-gateway-schema"],
		"scope": ["app"]
	},
	"process-subprocess-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-activity-schema"],
		"scope": ["app"]
	},
	"process-webservice-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-activity-schema"],
		"scope": ["app"]
	},
	"process-event-subprocess-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-subprocess-schema"],
		"scope": ["app"]
	},
	"process-event-base-gateway-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-base-gateway-schema"],
		"scope": ["app"]
	},
	"process-schema-usertask": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-activity-schema"],
		"scope": ["app"]
	},
	"process-scripttask-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-activity-schema"],
		"scope": ["app"]
	},
	"process-formulatask-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-scripttask-schema"],
		"scope": ["app"]
	},
	"process-sequence-flow-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-flow-element-schema"],
		"scope": ["app"]
	},
	"process-default-sequence-flow-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-sequence-flow-schema"],
		"scope": ["app"]
	},
	"process-conditional-sequence-flow-schema": {
		"path": "Terrasoft/manager/process-flow-element-schema-manager",
		"deps": ["process-sequence-flow-schema"],
		"scope": ["app"]
	},
	"observable-item": {
		"path": "Terrasoft/manager",
		"deps": ["baseobject"]
	},
	"Json5": {
		"path": "json5",
		"file": "Json5",
		"exports": "JSON5",
		"doNotTranspile": true
	},
	"jQuery": {
		"path": "jQuery",
		"exports": "$",
		"external": true,
		"separateFromBuild": true
	},
	"jQuery-easing": {
		"path": "jQueryEasing",
		"deps": ["jQuery"],
		"external": true,
		"separateFromBuild": true
	},
	"jsrender": {
		"path": "jsrender",
		"deps": ["jQuery"],
		"external": true,
		"separateFromBuild": true
	},
	"ts-common-all": {
		"path": "ts-diagram-module",
		"exports": "ej",
		"external": true,
		"deps": ["jQuery-easing"],
		"separateFromBuild": true,
		"scope": ["app"]
	},
	"ej-diagram": {
		"mapTo": "ts-diagram",
		"scope": ["app"]
	},
	"ts-diagram": {
		"path": "ts-diagram-module",
		"exports": "ej",
		"external": true,
		"deps": ["ts-common-all", "jsrender"],
		"css": ["ts-diagram"],
		"separateFromBuild": true,
		"scope": ["app"]
	},
	"ckeditor-base": {
		"path": "CKEditor",
		"file": "ckeditor",
		"exports": "CKEDITOR",
		"external": true,
		"deps": ["jQuery"],
		"separateFromBuild": true
	},
	"html2canvas": {
		"path": "html2canvas",
		"exports": "html2canvas",
		"external": true,
		"separateFromBuild": true
	},
	"formula-parser-utils": {
		"path": "Terrasoft/manager/process-schema-manager",
		"deps": [
			"entity-schema-manager",
			"process-schema",
			"process-constants",
			"process-schema-designer-utilities",
			"formula-value-parser",
			"formula-display-value-parser"
		],
		"scope": ["app"]
	},
	"formula-value-parser": {
		"path": "Terrasoft/manager/process-schema-manager",
		"deps": [
			"process-schema",
			"process-constants",
			"process-schema-designer-utilities",
			"formula-parser"
		],
		"scope": ["app"]
	},
	"formula-display-value-parser": {
		"path": "Terrasoft/manager/process-schema-manager",
		"deps": [
			"process-schema",
			"process-constants",
			"process-schema-designer-utilities",
			"formula-parser"
		],
		"scope": ["app"]
	},
	"formula-parser": {
		"path": "Terrasoft/manager/process-schema-manager",
		"deps": [
			"process-schema",
			"process-constants",
			"process-schema-designer-utilities",
			"formula-macros"
		],
		"scope": ["app"]
	},
	"formula-macros": {
		"path": "Terrasoft/manager/process-schema-manager",
		"deps": [
			"process-schema",
			"process-constants",
			"process-schema-designer-utilities"
		],
		"scope": ["app"]
	},
	"schema-localizable-string": {
		"path": "Terrasoft/manager",
		"deps": ["baseobject", "serializable"]
	},
	"schema-using": {
		"path": "Terrasoft/manager",
		"deps": ["baseobject", "serializable"]
	},
	"package-market-module": {
		"path": "Terrasoft/core/package-market-module",
		"deps": ["ext-base", "baseobject", "button", "container", "label", "textedit", "package-market-view-model"],
		"less": ["package-market-module"]
	},
	"package-market-view-model": {
		"path": "Terrasoft/core/package-market-module",
		"deps": ["ext-base", "base-view-model"]
	},
	"package-market-view": {
		"path": "Terrasoft/core/package-market-module",
		"deps": ["ext-base", "baseobject", "button", "container", "label", "textedit"]
	},
	"parametrized-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-request", "base-response"]
	},
	"base-schema-manager-request": {
		"path": "Terrasoft/manager/base-schema-manager",
		"deps": ["baseobject", "base-response"]
	},
	"sys-user-property-helper": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["parametrized-request", "base-response"]
	},
	"meta-item": {
		"path": "Terrasoft/manager/base-schema-manager",
		"deps": [
			"baseobject",
			"serializable",
			"localizable-string"
		]
	},
	"business-rule-schema": {
		"path": "Terrasoft/manager/business-rule-schema-manager",
		"deps": [
			"base-schema",
			"business-rule-switch",
			"business-rule-element-utils"
		]
	},
	"invalid-business-rule-schema": {
		"path": "Terrasoft/manager/business-rule-schema-manager",
		"deps": [
			"business-rule-schema"
		]
	},
	"base-business-rule-element": {
		"path": "Terrasoft/manager/business-rule-schema-manager",
		"deps": [
			"meta-item",
			"business-rule-element-utils"
		]
	},
	"business-rule-case": {
		"path": "Terrasoft/manager/business-rule-schema-manager",
		"deps": [
			"base-business-rule-element",
			"base-business-rule-condition",
			"column-business-rule-action",
			"business-rule-element-utils"
		]
	},
	"base-business-rule-executable": {
		"path": "Terrasoft/manager/business-rule-schema-manager",
		"deps": ["base-business-rule-element"]
	},
	"base-business-rule-action": {
		"path": "Terrasoft/manager/business-rule-schema-manager/actions",
		"deps": [
			"base-business-rule-executable",
			"business-rule-element-utils"
		]
	},
	"business-rule-action-group": {
		"path": "Terrasoft/manager/business-rule-schema-manager/actions",
		"deps": ["base-business-rule-action"]
	},
	"column-business-rule-action": {
		"path": "Terrasoft/manager/business-rule-schema-manager/actions",
		"deps": ["base-business-rule-action"]
	},
	"attribute-business-rule-action": {
		"path": "Terrasoft/manager/business-rule-schema-manager/actions",
		"deps": ["base-business-rule-action"]
	},
	"visibility-business-rule-action": {
		"path": "Terrasoft/manager/business-rule-schema-manager/actions",
		"deps": ["attribute-business-rule-action"]
	},
	"enabled-business-rule-action": {
		"path": "Terrasoft/manager/business-rule-schema-manager/actions",
		"deps": ["attribute-business-rule-action"]
	},
	"read-only-business-rule-action": {
		"path": "Terrasoft/manager/business-rule-schema-manager/actions",
		"deps": ["column-business-rule-action"]
	},
	"required-business-rule-action": {
		"path": "Terrasoft/manager/business-rule-schema-manager/actions",
		"deps": ["attribute-business-rule-action"]
	},
	"filtration-business-rule-action": {
		"path": "Terrasoft/manager/business-rule-schema-manager/actions",
		"deps": [
			"attribute-business-rule-action",
			"comparison-business-rule-condition"
		]
	},
	"default-value-business-rule-action": {
		"path": "Terrasoft/manager/business-rule-schema-manager/actions",
		"deps": ["column-business-rule-action"]
	},
	"base-business-rule-condition": {
		"path": "Terrasoft/manager/business-rule-schema-manager/conditions",
		"deps": [
			"base-business-rule-element",
			"business-rule-element-utils"
		]
	},
	"comparison-business-rule-condition": {
		"path": "Terrasoft/manager/business-rule-schema-manager/conditions",
		"deps": [
			"base-business-rule-condition",
			"base-business-rule-expression"
		]
	},
	"business-rule-condition-group": {
		"path": "Terrasoft/manager/business-rule-schema-manager/conditions",
		"deps": [
			"base-business-rule-condition",
			"comparison-business-rule-condition"
		]
	},
	"base-business-rule-expression": {
		"path": "Terrasoft/manager/business-rule-schema-manager/expressions",
		"deps": ["base-business-rule-element"]
	},
	"attribute-business-rule-expression": {
		"path": "Terrasoft/manager/business-rule-schema-manager/expressions",
		"deps": ["base-business-rule-expression"]
	},
	"parameter-business-rule-expression": {
		"path": "Terrasoft/manager/business-rule-schema-manager/expressions",
		"deps": ["attribute-business-rule-expression"]
	},
	"column-business-rule-expression": {
		"path": "Terrasoft/manager/business-rule-schema-manager/expressions",
		"deps": ["base-business-rule-expression"]
	},
	"constant-business-rule-expression": {
		"path": "Terrasoft/manager/business-rule-schema-manager/expressions",
		"deps": ["base-business-rule-expression"]
	},
	"sys-setting-business-rule-expression": {
		"path": "Terrasoft/manager/business-rule-schema-manager/expressions",
		"deps": ["base-business-rule-expression"]
	},
	"sys-value-business-rule-expression": {
		"path": "Terrasoft/manager/business-rule-schema-manager/expressions",
		"deps": ["base-business-rule-expression"]
	},
	"business-rule-element-helper": {
		"path": "Terrasoft/manager/business-rule-schema-manager",
		"deps": ["baseobject"]
	},
	"business-rule-element-utils": {
		"path": "Terrasoft/manager/business-rule-schema-manager",
		"deps": [
			"baseobject",
			"business-rule-element-helper"
		]
	},
	"business-rule-switch": {
		"path": "Terrasoft/manager/business-rule-schema-manager",
		"deps": [
			"base-business-rule-executable",
			"business-rule-case",
			"base-business-rule-action",
			"business-rule-element-utils"
		]
	},
	"execution-data-collector": {
		"path": "Terrasoft/process",
		"deps": ["baseobject"]
	},
	"base-process-response": {
		"path": "Terrasoft/process",
		"deps": ["execution-data-collector", "base-response"]
	},
	"base-process-request": {
		"path": "Terrasoft/process",
		"deps": ["base-request", "base-process-response", "features"]
	},
	"parameterized-process-request": {
		"path": "Terrasoft/process",
		"deps": ["objectcollection", "base-process-request"]
	},
	"base-run-process-request": {
		"path": "Terrasoft/process",
		"deps": ["parameterized-process-request"]
	},
	"run-process-request": {
		"path": "Terrasoft/process",
		"deps": ["base-run-process-request"]
	},
	"complete-executing-request": {
		"path": "Terrasoft/process",
		"deps": ["parameterized-process-request"]
	},
	"complete-executing-response": {
		"path": "Terrasoft/process",
		"deps": ["base-process-response"]
	},
	"run-specified-process-version-request": {
		"path": "Terrasoft/process",
		"deps": ["base-run-process-request"]
	},
	"process-engine-utilities": {
		"path": "Terrasoft/process",
		"deps": [
			"commonutils",
			"run-process-request",
			"run-specified-process-version-request",
			"complete-executing-request",
			"complete-executing-response"
		],
		"scope": ["app"]
	},
	"process-execution-data-utils": {
		"path": "Terrasoft/process",
		"deps": ["ext-base", "commonutils"],
		"scope": ["app"]
	},
	"service-enums": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["ext-base"]
	},
	"service-meta-item": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["meta-item"]
	},
	"service-parameter-value": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["service-meta-item", "service-enums"]
	},
	"service-parameter": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["service-enums", "service-meta-item", "objectcollection", "service-parameter-value"]
	},
	"service-method-response": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["service-meta-item", "service-parameter"]
	},
	"service-method-request": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["service-method-response"]
	},
	"service-method": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["service-method-request", "service-method-response"]
	},
	"service-authentification-info": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["service-meta-item", "service-enums", "objectcollection"]
	},
	"service-schema": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["base-schema", "objectcollection", "service-method", "service-authentification-info"]
	},
	"service-schema-response": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["base-schema-response", "objectcollection", "service-schema"]
	},
	"service-schema-request": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["base-schema-request", "service-schema-response"]
	},
	"service-schema-update-request": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["base-schema-update-request"]
	},
	"service-schema-remove-request": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["process-schema-request", "process-schema-response"],
		"scope": ["app"]
	},
	"service-schema-manager-item": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": [
			"base-schema-manager-item",
			"service-schema",
			"service-schema-request",
			"service-schema-update-request",
			"service-schema-remove-request"
		],
		"scope": ["app"]
	},
	"service-schema-manager": {
		"path": "Terrasoft/manager/service-schema-manager",
		"deps": ["base-schema-manager", "service-schema-manager-item"],
		"scope": ["app"]
	},
	"html-minifier": {
		"path": "Terrasoft/utils",
		"deps": ["ext-base"]
	},
	"embedded-process-schema-designer": {
		"path": "Terrasoft/designers/embedded-process-schema-designer",
		"deps": [
			"base-process-schema-designer",
			"process-schema-element-editable",
			"embedded-process-schema-designer-left-toolbar",
			"process-schema-diagram",
			"diagram-draggable-container",
			"embedded-process-schema-designer-view-model",
			"messagebox"
		],
		"less": ["embedded-process-schema-designer"],
		"scope": ["app"]
	},
	"embedded-process-schema-designer-left-toolbar": {
		"path": "Terrasoft/designers/embedded-process-schema-designer",
		"deps": ["container", "process-flow-element-schema-manager", "process-constants"],
		"scope": ["app"]
	},
	"embedded-process-schema-designer-view-model": {
		"path": "Terrasoft/designers/embedded-process-schema-designer",
		"deps": [
			"process-schema-designer-view-model",
			"base-view-model-collection",
			"embedded-process-schema-manager",
			"process-schema-designer-utilities",
			"process-schema-designer-copy-mixin",
			"process-schema-designer-search-mixin",
			"process-engine-utilities"
		],
		"scope": ["app"]
	},
	"embedded-process-schema": {
		"path": "Terrasoft/manager/embedded-process-schema-manager",
		"deps": [
			"process-flow-element-schema-manager",
			"base-process-schema",
			"objectcollection",
			"schema-localizable-string",
			"schema-using",
			"guid-meta-item"
		],
		"scope": ["app"]
	},
	"embedded-process-schema-manager-item": {
		"path": "Terrasoft/manager/embedded-process-schema-manager",
		"deps": ["base-schema-manager-item", "embedded-process-schema", "embedded-process-schema-request"],
		"scope": ["app"]
	},
	"guid-meta-item": {
		"path": "Terrasoft/manager/embedded-process-schema-manager",
		"deps": ["meta-item"],
		"scope": ["app"]
	},
	"embedded-process-schema-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-request"],
		"scope": ["app"]
	},
	"embedded-process-schema-manager": {
		"path": "Terrasoft/manager/embedded-process-schema-manager",
		"deps": ["base-process-schema-manager", "embedded-process-schema-manager-item"],
		"scope": ["app"]
	},
	"embedded-process-schema-response": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-response", "embedded-process-schema", "embedded-process-schema-update-request"],
		"scope": ["app"]
	},
	"embedded-process-schema-update-request": {
		"path": "Terrasoft/manager/schema-request",
		"deps": ["base-schema-update-request"],
		"scope": ["app"]
	},
	"external-widget": {
		"path": "Terrasoft/controls/external-widget",
		"deps": ["container", "iframe", "uriutils"],
		"less": ["external-widget"]
	},
	"chartjs": {
		"path": "Chartjs",
		"file": "Chart.bundle.min",
		"deps": [],
		"less": ["Chart.min"],
		"separateFromBuild": true
	},
	"chartjs-label": {
		"path": "Chartjs",
		"file": "chartjs-plugin-labels",
		"deps": ["chartjs"],
		"separateFromBuild": true
	},
	"chartjs-funnel": {
		"path": "Chartjs",
		"file": "chart.funnel",
		"deps": ["chartjs"],
		"separateFromBuild": true
	},
	"chartjs-gauge": {
		"path": "Chartjs",
		"file": "Gauge",
		"deps": ["chartjs"],
		"separateFromBuild": true
	},
	"chartjs-defaults": {
		"path": "Chartjs",
		"file": "chartjs-defaults",
		"deps": ["chartjs-label", "ext-base"],
		"separateFromBuild": true
	}
};
