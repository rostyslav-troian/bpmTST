define({
	"demo-main": {
		"path": "demo/demo-main",
		"less": ["demo-main"]
	},
	"contact-edit.demo": {
		"path": "demo/mockups",
		"less": ["contact-edit.demo"],
		"messages": {
			"render": {
				"direction": "subscribe",
				"mode": "broadcast"
			},
			"testPtpEvent": {
				"direction": "subscribe",
				"mode": "ptp"
			},
			"testAsyncPtpEvent": {
				"mode": "broadcast",
				"direction": "subscribe"
			}
		}
	},
	"contact-edit-left-panel": {
		"path": "demo/mockups",
		"messages": {
			"render": {
				"direction": "publish",
				"mode": "broadcast"
			},
			"testPtpEvent": {
				"mode": "ptp",
				"direction": "publish"
			},
			"testAsyncPtpEvent": {
				"mode": "broadcast",
				"direction": "publish"
			}
		}
	},
	"contact-edit-main-panel": {
		"path": "demo/mockups"
	},
	"json.demo": {
		"path": "demo/json"
	},
	"filter-edit.demo": {
		"path": "demo/filter-edit"
	},
	"button.demo": {
		"path": "demo/button",
		"css": ["button.demo"]
	},
	"check-box.demo": {
		"path": "demo/check-box",
		"css": ["check-box.demo"]
	},
	"combo-box-edit.demo": {
		"path": "demo/combo-box-edit",
		"css": ["combo-box-edit.demo"]
	},
	"control-group.demo": {
		"path": "demo/control-group",
		"css": ["control-group.demo"]
	},
	"float-edit.demo": {
		"path": "demo/float-edit"
	},
	"integer-edit.demo": {
		"path": "demo/integer-edit"
	},
	"label.demo": {
		"path": "demo/label",
		"css": ["label.demo"]
	},
	"hyperlink.demo": {
		"path": "demo/hyperlink",
		"css": ["hyperlink.demo"]
	},
	"list-view.demo": {
		"path": "demo/list-view",
		"css": ["list-view.demo", "icons"]
	},
	"menu.demo": {
		"path": "demo/menu",
		"css": ["menu.demo"]
	},
	"progress-spinner.demo": {
		"path": "demo/progress-spinner"
	},
	"radio-button.demo": {
		"path": "demo/radio-button",
		"css": ["radio-button.demo"]
	},
	"text-edit.demo": {
		"path": "demo/text-edit",
		"css": ["text-edit.demo"]
	},
	"baseedit.demo": {
		"path": "demo/baseedit"
	},
	"memo-edit.demo": {
		"path": "demo/memo-edit"
	},
	"lookup-edit.demo": {
		"path": "demo/lookup-edit",
		"css": ["lookup-edit.demo"]
	},
	"multi-lookup-edit.demo": {
		"path": "demo/multi-lookup-edit",
		"css": ["multi-lookup-edit.demo"]
	},
	"bindable.demo": {
		"path": "demo/bindable",
		"css": ["bindable.demo"]
	},
	"validation.demo": {
		"path": "demo/validation",
		"css": ["validation.demo"]
	},
	"bindable-grid.demo": {
		"path": "demo/bindable-grid",
		"css": ["bindable-grid.demo"]
	},
	"bindable-menu.demo": {
		"path": "demo/bindable-menu",
		"css": ["bindable-menu.demo"]
	},
	"date-edit.demo": {
		"path": "demo/date-edit",
		"css": ["date-edit.demo"]
	},
	"time-edit.demo": {
		"path": "demo/time-edit",
		"css": ["time-edit.demo"]
	},
	"date-picker.demo": {
		"path": "demo/date-picker"
	},
	"grid.demo": {
		"path": "demo/grid",
		"css": ["grid.demo"]
	},
	"grid-layout.demo": {
		"path": "demo/grid-layout",
		"css": ["grid-layout.demo"]
	},
	"content-builder.demo": {
		"path": "demo/content-builder",
		"css": ["content-builder.demo"]
	},
	"content-image.demo": {
		"path": "demo/content-image",
		"css": ["content-image.demo"]
	},
	"content-html-element.demo": {
		"path": "demo/content-builder",
		"css": ["content-html-element.demo"]
	},
	"inline-text-edit.demo": {
		"path": "demo/inline-text-edit"
	},
	"reorderable.demo": {
		"path": "demo/reorderable",
		"css": ["reorderable.demo"]
	},
	"grid-layout-edit.demo": {
		"path": "demo/grid-layout-edit",
		"css": ["grid-layout-edit.demo"]
	},
	"message-box.demo": {
		"path": "demo/message-box"
	},
	"side-bar.demo": {
		"path": "demo/side-bar"
	},
	"schedule-edit.demo": {
		"path": "demo/schedule-edit",
		"css": ["schedule-edit.demo"]
	},
	"html-control.demo": {
		"path": "demo/html-control"
	},
	"command-line.demo": {
		"path": "demo/command-line",
		"css": ["command-line.demo"]
	},
	"fileupload.demo": {
		"path": "demo/fileupload"
	},
	"html-edit.demo": {
		"path": "demo/html-edit",
		"css": ["html-edit.demo"]
	},
	"color-button.demo": {
		"path": "demo/color-button",
		"css": ["color-button.demo"]
	},
	"tip.demo": {
		"path": "demo/tip",
		"css": ["tip.demo"]
	},
	"bindable-dom.demo": {
		"path": "demo/bindable-dom"
	},
	"image-edit.demo": {
		"path": "demo/image-edit"
	},
	"cti-model.demo": {
		"path": "demo/cti-model",
		"css": ["cti-model.demo"]
	},
	"mask.demo": {
		"path": "demo/mask"
	},
	"tabpanel.demo": {
		"path": "demo/tabpanel",
		"css": ["tabpanel.demo"]
	},
	"DcmDesignStageControlItem.demo": {
		"path": "demo/DcmDesignStageControlItem",
		"css": ["DcmDesignStageControlItem.demo"]
	},
	"DTStagesVM": {
		"path": "demo/DcmDesignStageControlItem"
	},
	"DTStages": {
		"path": "demo/DcmDesignStageControlItem"
	},
	"DTStage": {
		"path": "demo/DcmDesignStageControlItem"
	},
	"DTStageVM": {
		"path": "demo/DcmDesignStageControlItem"
	},
	"DTStageElement": {
		"path": "demo/DcmDesignStageControlItem",
		"less": ["DTStageElement"]
	},
	"DTStageElementVM": {
		"path": "demo/DcmDesignStageControlItem"
	}
});
