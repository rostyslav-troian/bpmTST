/**
 */
Ext.define("Terrasoft.controls.mixins.FileUpload", {

	alternateClassName: "Terrasoft.FileUpload",

	fileUploadIdPrefix: "-fileupload",

	fileUploadInputFormEl: null,

	fileUploadInputEl: null,

	fileUploadFiles: null,

	fileUpload: false,

	fileUploadMultiSelect: true,

	fileApiWrapperCss: "js-fileapi-wrapper",

	/**
	 * An array of valid MIME file types to load
	 * @type {String[]}
	 */
	fileTypeFilter: null,

	constructor: function() {
		this.callParent(arguments);
		this.fileTypeFilter = this.fileTypeFilter || [];
		if (this.fileUpload) {
			/**
			 * @event
			 * File selection event
			 * @param {Array} files
			 */
			this.addEvents("filesSelected");
		}
	},

	createHtmlConfig: function() {
		/**
		 * BrowserSupport: <IE11>
		 * It is necessary to wrap the input field in the form for the subsequent reset of the form itself, rather than the input field
		 */
		var inputFileHtml = {
			tag: "input",
			id: this.id + this.fileUploadIdPrefix,
			type: "file",
			style: "display: none;"
		};
		if (!Ext.isEmpty(this.markerValue)) {
			inputFileHtml["data-item-marker"] = this.markerValue;
		}
		var fileTypeFilter = this.fileTypeFilter;
		if (fileTypeFilter.length > 0) {
			inputFileHtml.accept = fileTypeFilter.join(",");
		}
		if (this.fileUploadMultiSelect) {
			inputFileHtml.multiple = "multiple";
		}
		if (Ext.isIE11) {
			return {
				tag: "form",
				id: "form-" + this.id + this.fileUploadIdPrefix,
				style: "display: none",
				children: [inputFileHtml]
			};
		} else {
			return inputFileHtml;
		}
	},

	addInputFile: function(wrapper) {
		/**
		 * BrowserSupport: <IE11>
		 * The input field is wrapped in a form. This should be taken into account when receiving links to elements
		 */
		var wrapInForm = Ext.isIE11;
		var htmlConfig = this.createHtmlConfig();
		var wrapEl = wrapper || this.getWrapEl();
		var fileUploadContainer = (FileAPI.Flash) ? wrapEl : Ext.getBody();
		if (wrapInForm) {
			this.fileUploadInputFormEl = Ext.DomHelper.append(fileUploadContainer, htmlConfig, true);
			this.fileUploadInputEl = this.fileUploadInputFormEl.child("input[type='file']");
		} else {
			this.fileUploadInputEl = Ext.DomHelper.append(fileUploadContainer, htmlConfig, true);
		}
		if (FileAPI.Flash) {
			wrapEl.addCls(this.fileApiWrapperCss);
			FileAPI.Flash.mouseover({
				target: this.fileUploadInputEl.dom
			});
		}
		this.initInputFileEvents();
	},

	initInputFileEvents: function() {
		var self = this;
		this.on("click", this.onInputFileClick, this);
		if (this.fileUploadInputEl.dom.addEventListener) {
			this.fileUploadInputEl.dom.addEventListener("change", function(event) {
				self.onInputFileChange(event, self);
			}, false);
		} else if (this.fileUploadInputEl.dom.attachEvent) {
			this.fileUploadInputEl.dom.attachEvent("onchange", function(event) {
				self.onInputFileChange(event, self);
			});
		} else {
			this.fileUploadInputEl.on("change", this.onInputFileChange, this);
		}
	},

	onInputFileClick: function(event) {
		Ext.EventManager.stopEvent(event);
		if (!FileAPI.Flash) {
			this.fileUploadInputEl.dom.click();
		}
	},

	onInputFileChange: function(event, scope) {
		if (!scope) {
			scope = this;
		}
		Ext.EventManager.stopEvent(event);
		var files = FileAPI.getFiles(event);
		scope.setFiles(files);
		/**
		 * BrowserSupport: <IE11>
		 * Resetting the value of the input field in this way, otherwise the reset occurs through the form.
		 */
		if (Ext.isIE11) {
			this.fileUploadInputFormEl.dom.reset();
		} else {
			scope.fileUploadInputEl.dom.value = null;
		}
	},

	setFiles: function(files) {
		this.fileUploadFiles = files;
		this.fireEvent("filesSelected", this.fileUploadFiles);
	},

	/**
	 * Encodes to base64 and returns an image by object from FileAPI
	 * @param file - a file with metadata that is encoded in base64
	 * @param callback - return function after the end of the encoding
	 * @param scope - the namespace of the return function
	 */
	getUploadImageData: function(file, callback, scope) {
		FileAPI.readAsDataURL(file, function(e) {
			callback.call(scope || this, e.result);
		});
	},

	destroy: function() {
		if (!this.fileUploadInputEl || !this.fileUploadInputEl.dom) {
			return;
		}
		var self = this;
		this.un("click", this.onInputFileClick, this);
		if (this.fileUploadInputEl.dom.removeEventListener) {
			this.fileUploadInputEl.dom.removeEventListener("change", function(event) {
				self.onInputFileChange(event, self);
			}, false);
		} else if (this.fileUploadInputEl.dom.detachEvent) {
			this.fileUploadInputEl.dom.detachEvent("onchange", function(event) {
				self.onInputFileChange(event, self);
			});
		} else {
			this.fileUploadInputEl.un("change", this.onInputFileChange, this);
		}
		Ext.removeNode(this.fileUploadInputEl.dom);
		/**
		 * BrowserSupport: <IE11>
		 * Since the entry field is wrapped in the form for IE10, IE11, it must therefore be deleted
		 */
		if (this.fileUploadInputFormEl) {
			Ext.removeNode(this.fileUploadInputFormEl.dom);
		}
	},

	addFileUploadBindConfig: function(config) {
		config.fileUploadFiles = {
			changeEvent: "filesSelected"
		};
	}

});
