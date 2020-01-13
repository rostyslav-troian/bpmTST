define(["ext-base", "terrasoft", "sandbox"], function(Ext, Terrasoft, sandbox) {
	var router = Terrasoft.router.Router;
	var spacer = {
		className: "Terrasoft.Component",
		html: "<div class='spacer'></div>",
		selectors: {
			el: ".spacer",
			wrapEl: ".spacer"
		}
	};
	var mainContainer, demoContainer;
	var isDocked = false;
	var captionPrefix = "Демо-страница элемента управления ";

	function dockMainContainer() {
		Ext.getBody().removeCls("centered");
		mainContainer.el.addCls("docked");
		demoContainer.el.addCls("docked");
		mainContainer.items.each(function() {
			var caption = this.caption;
			if (caption) {
				this.setCaption(caption.replace(captionPrefix, ""));
			}
		});
		isDocked = true;
	}

	function unDockMainContainer() {
		Ext.getBody().addCls("centered");
		mainContainer.el.removeCls("docked");
		demoContainer.el.removeCls("docked");
		mainContainer.items.each(function(item, index) {
			if (index < 3) {
				return;
			}
			var caption = this.caption;
			if (caption) {
				this.setCaption(captionPrefix + caption);
			}
		});
		isDocked = false;
	}

	function handler() {
		router.pushState(null, null, this.tag);
	}

	function onRouterStateChanged(token) {
		var demoContainerEl = demoContainer.el;
		if (token === "") {
			unDockMainContainer();
			demoContainerEl.hide();
		} else {
			if (!isDocked) {
				dockMainContainer();
			}
			demoContainerEl.show();
			demoContainerEl.dom.scrollIntoView(true);
			sandbox.loadModule(token, {renderTo: demoContainerEl});
		}
	}

	function createButton(module, caption) {
		return {
			tag: module + ".demo",
			className: "Terrasoft.Button",
			caption: caption
		};
	}

	return {
		"renderTo": Ext.getBody(),
		"render": function(renderTo) {
			Ext.getBody().addCls("centered");
			mainContainer = Ext.create("Terrasoft.Container", {
				id: "mainContainer",
				selectors: {
					wrapEl: "#mainContainer",
					el: "#mainContainer"
				},
				renderTo: renderTo,
				items: [
					spacer,
					createButton("multi-lookup-edit", `${captionPrefix} "MultiLookupEdit"`), spacer,
					createButton("lookup-edit", captionPrefix + "\"LookupEdit\""), spacer,
					createButton("combo-box-edit", captionPrefix + "\"ComboBoxEdit\""), spacer,
					createButton("DcmDesignStageControlItem", "\"DcmDesignStageControlItem\""), spacer,
					createButton("inline-text-edit", "\"InlineTextEdit\""), spacer,
					createButton("reorderable", "\"Reorderable\""), spacer,
					createButton("content-builder", "\"Content Builder\""), spacer,
					createButton("content-html-element", "\"Content Html element\""), spacer,
					createButton("content-image", "\"Content Image Element\""), spacer,
					createButton("json", "\"JSON differ/applier\""), spacer,
					createButton("grid-layout-edit", "\"GridLayoutEdit\""), spacer,
					createButton("grid-layout", "GridLayout"), spacer,
					createButton("contact-edit", "Страница карточки редактирования контакта"), spacer,
					createButton("bindable", "Демо-страница механизма Binding"), spacer,
					createButton("bindable-dom", "Демо-страница механизма Binding на DOM"), spacer,
					createButton("validation", "Демо-страница механизма валидации модели"), spacer,
					createButton("bindable-grid", "Демо-страница механизма binding для элемента Grid"), spacer,
					createButton("bindable-menu", "Демо-страница механизма binding для элемента Menu"), spacer,
					createButton("baseedit", captionPrefix + "\"BaseEdit\""), spacer,
					createButton("filter-edit", captionPrefix + "\"FilterEdit\""), spacer,
					createButton("button", captionPrefix + "\"Button\""), spacer,
					createButton("label", captionPrefix + "\"Label\""), spacer,
					createButton("hyperlink", captionPrefix + "\"Hyperlink\""), spacer,
					createButton("menu", captionPrefix + "\"Menu\""), spacer,
					createButton("text-edit", captionPrefix + "\"TextEdit\""), spacer,
					createButton("progress-spinner", captionPrefix + "\"ProgressSpinner\""), spacer,
					createButton("check-box", captionPrefix + "\"CheckBoxEdit\""), spacer,
					createButton("radio-button", captionPrefix + "\"RadioButton\""), spacer,
					createButton("control-group", captionPrefix + "\"ControlGroup\""), spacer,
					createButton("float-edit", captionPrefix + "\"FloatEdit\""), spacer,
					createButton("integer-edit", captionPrefix + "\"IntegerEdit\""), spacer,
					createButton("list-view", captionPrefix + "\"ListView\""), spacer,
					createButton("memo-edit", captionPrefix + "\"MemoEdit\""), spacer,
					createButton("date-edit", captionPrefix + "\"DateEdit\""), spacer,
					createButton("time-edit", captionPrefix + "\"TimeEdit\""), spacer,
					createButton("date-picker", captionPrefix + "\"DatePicker\""), spacer,
					createButton("grid", captionPrefix + "\"Grid\""), spacer,
					createButton("message-box", captionPrefix + "\"MessageBox\""), spacer,
					createButton("side-bar", captionPrefix + "\"SideBar\""), spacer,
					createButton("schedule-edit", captionPrefix + "\"Schedule-Edit\""), spacer,
					createButton("html-control", captionPrefix + "\"HtmlControl\""), spacer,
					createButton("command-line", captionPrefix + "\"Command-Line\""), spacer,
					createButton("html-edit", captionPrefix + "\"Html-Edit\""), spacer,
					createButton("fileupload", captionPrefix + "\"FileUpload\""), spacer,
					createButton("color-button", captionPrefix + "\"Color-Button\""), spacer,
					createButton("tip", captionPrefix + "\"Tip\""), spacer,
					createButton("image-edit", captionPrefix + "\"Image-Edit\""), spacer,
					createButton("cti-model", "Демо-страница CTI модели"), spacer,
					createButton("mask", "Демо-страница маски"), spacer,
					createButton("tabpanel", captionPrefix + "\"TabPanel\""), spacer
				]
			});
			mainContainer.items.each(function(item) {
				item.on("click", handler, item);
			}, this);
			mainContainer.items.add("main-page-scrolling", Ext.create("Terrasoft.HtmlControl", {
				id: "main-page-scrolling",
				selectors: {
					wrapEl: "#main-page-scrolling"
				},
				/*jshint quotmark:false */
				html: "<a id=\"main-page-scrolling\" href=\"./Resources/demo/main-page-scrolling/TestScroll.html\">" +
					"Демо-страница скроллинга основной страницы</a>"
				/*jshint quotmark:double */
			}));
			demoContainer = Ext.create("Terrasoft.Container", {
				id: "demoContainer",
				selectors: {
					wrapEl: "#demoContainer",
					el: "#demoContainer"
				},
				renderTo: renderTo
			});
			demoContainer.el.setVisibilityMode(Ext.dom.AbstractElement.DISPLAY);
			router.on("stateChanged", onRouterStateChanged, router);
			var token = router.getHash();
			router.pushState(null, null, token);
		}
	};
});
