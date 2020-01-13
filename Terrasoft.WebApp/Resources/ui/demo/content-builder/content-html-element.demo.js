define(["ext-base", "terrasoft"],
	function(Ext, Terrasoft) {

		Ext.define("Terrasoft.ContentHTMLElementModel", {
			extend: "Terrasoft.BaseViewModel",
			columns: {
				ClassName: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "Terrasoft.ContentImageElement"
				},
				Content: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: '<p style="text-align:justify"><span style="font-family:tahoma,geneva,sans-serif">' +
					'<span style="font-size:16px">Платформа <span style="color:#336699"><strong>bpm’online' +
					'</strong></span>, созданная для управления бизнес-процессами продаж, маркетинга и сервиса' +
					',лидер по количеству баллов в категории сильнейших разработчиков мира в отчете <a data-cke-' +
					'saved-href="https://www.forrester.com/home/" target="_blank" href="https://www.forrester.com' +
					'/home/"><u>Forrester Wave</u></a>. </span></span></p><p style="text-align:justify"><span sty' +
					'le="font-family:tahoma,geneva,sans-serif"><span style="font-size:16px">В 2014 году издание CRM' +
					' Magazine признало продукт bpm’online sales мировым лидером на рынке программного обеспечения д' +
					'ля управления продажами.</span></span></p><p style="text-align:justify"><span style="font' +
					'-family:tahoma,geneva,sans-serif"><span style="font-size:16px"><span style="color:#FFA500"' +
					'><strong>6000 </strong></span>средних и крупных предприятий используют платформу bpm’online ' +
					'для автоматизации своих бизнес-процессов.</span></span></p>'
				},
				Placeholder: {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: "Здесь мог бы быть ваш html."
				}
			},

			onFileSelected: function(photo) {
				if (!photo || !Ext.isArray(photo)) {
					this.set("ImageConfig", null);
					return;
				}
				FileAPI.readAsText(photo[0], null, function(e) {
					if (e.type === "load") {
						var bodyHtml = e.result;
						var bodyRegex = /<body.*?>([\s\S]*)<\/body>/;
						if (bodyRegex.test(e.result)) {
							var bodyHtml = bodyRegex.exec(bodyHtml)[1];
						}
						this.set("Content", bodyHtml);
					}

				}.bind(this));
			},

			clearData: function() {
				this.set("Content", null);
			},

			editData: function() {
				var content = this.get("Content");
				var controls = {
					content: {
						customConfig: {
							className: "Terrasoft.MemoEdit",
							height: "200px"
						},
						dataValueType: Terrasoft.DataValueType.TEXT,
						value: content
					}
				};
				Terrasoft.utils.inputBox(
					"Редактирование html",
					this.contentInputBoxHandler,
					["ok", "cancel"],
					this,
					controls
				);
			},

			contentInputBoxHandler: function(returnCode, controlData) {
				if (returnCode === "ok") {
					this.set("Content", controlData.content.value);
				}
			}

		});

		return {
			"render": function(renderTo) {
				var model = Ext.create("Terrasoft.ContentHTMLElementModel");
				var contentImageElement = Ext.create("Terrasoft.ContentHTMLElement", {
					content: {bindTo: "Content"},
					placeholder: {bindTo: "Placeholder"},
					styles: {
						wrapStyle: {
							width: "400px"
						}
					},
					tools: [{
						className: "Terrasoft.Button",
						style: Terrasoft.controls.ButtonEnums.style.GREEN,
						fileUpload: true,
						filesSelected: {
							bindTo: "onFileSelected"
						},
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "./resources/demo/content-builder/images/icon-upload.png"
						}
					}, {
						className: "Terrasoft.Button",
						click: {bindTo: "editData"},
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "./resources/demo/content-builder/images/icon-edit.png"
						}
					}, {
						className: "Terrasoft.Button",
						style: Terrasoft.controls.ButtonEnums.style.RED,
						click: {bindTo: "clearData"},
						imageConfig: {
							source: Terrasoft.ImageSources.URL,
							url: "./resources/demo/content-builder/images/icon-clear.png"
						}
					}]
				});
				contentImageElement.bind(model);
				contentImageElement.render(renderTo);
			}
		};
	});
