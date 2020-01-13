define(["ext-base", "terrasoft"],
	function(Ext, Terrasoft) {

		Ext.define("Terrasoft.ContentImageElementModel", {
			extend: "Terrasoft.BaseViewModel",
			columns: {
				ImageConfig: {
					type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
					caption: "ImageConfig",
					dataValueType: Terrasoft.DataValueType.CUSTOM_OBJECT
				},
				Link: {
					type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
					caption: "Link",
					dataValueType: Terrasoft.DataValueType.TEXT
				},
				Placeholder: {
					type: Terrasoft.ViewModelColumnType.CALCULATED_COLUMN,
					caption: "Placeholder",
					dataValueType: Terrasoft.DataValueType.TEXT
				}
			},

			/**
    * Performs the initialization of the model.
    */
			init: function() {
				this.set("ClassName", "Terrasoft.ContentImageElement");
				this.set("Placeholder", "Добавьте изображение.");
			},

			/**
    * Displays a dialog box for adding a link to the image.
    */
			setLink: function() {
				var controls = {
					link: {
						dataValueType: Terrasoft.DataValueType.TEXT,
						value: this.get("Link")
					}
				};
				Terrasoft.utils.inputBox(
					"Укажите адрес",
					this.linkInputBoxHandler,
					["ok", "cancel"],
					this,
					controls
				);
			},

			/**
    * Processes the result of entering the link by the user.
    * @param {String} returnCode The code of the button that was clicked in the dialog box.
    * @param {Object} controlData Contains the data entered by the user.
    */
			linkInputBoxHandler: function(returnCode, controlData) {
				if (returnCode === "ok" && controlData.link.value) {
					this.set("Link", controlData.link.value);
				}
			},

			/**
    * Processes the image change.
    * @param {File} photo Image.
    */
			onImageChange: function(photo) {
				if (!photo || !Ext.isArray(photo)) {
					this.set("ImageConfig", null);
					return;
				}
				FileAPI.readAsDataURL(photo[0], function(e) {
					this.onImageUploaded(e.result);
				}.bind(this));
			},

			/**
    * The event handler for the image load.
    * @protected
    */
			onImageUploaded: function(imageSrc) {
				this.set("ImageConfig", {
					source: Terrasoft.ImageSources.URL,
					url: imageSrc
				});
			}
		});

		return {
			"render": function(renderTo) {
				renderTo.setWidth(300);
				var model = Ext.create("Terrasoft.ContentImageElementModel");
				model.init();
				var contentImageElement = Ext.create("Terrasoft.ContentImageElement", {
					id: "ContentImageElementControl",
					renderTo: renderTo,
					imageConfig: {bindTo: "ImageConfig"},
					placeholder: {bindTo: "Placeholder"},
					tools: [{
						className: "Terrasoft.Button",
						style: Terrasoft.controls.ButtonEnums.style.BLUE,
						fileUpload: true,
						filesSelected: {
							bindTo: "onImageChange"
						},
						classes: {
							imageClass: ["tools-image"]
						},
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "./resources/demo/content-image/upload-icon.png"
						}
					}, {
						className: "Terrasoft.Button",
						style: Terrasoft.controls.ButtonEnums.style.GREEN,
						click: {bindTo: "setLink"},
						classes: {
							imageClass: ["tools-image"]
						},
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "./resources/demo/content-image/link-icon.png"
						}
					}]
				});
				contentImageElement.bind(model);
			}
		};
	});
