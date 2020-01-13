define(["ext-base", "terrasoft", "button", "tip"], function(Ext, Terrasoft) {
	return {
		render: function(renderTo) {
			var rightButton = Ext.create("Terrasoft.Button", {
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				caption: "Подсказка справа от кнопки",
				styles: {
					textStyle: {
						width: "100px",
						float: "left",
						"margin-top": "50px"
					}
				}
			});
			var leftButton = Ext.create("Terrasoft.Button", {
				styles: {
					textStyle: {
						"margin-left": "200px",
						"margin-top": "50px"
					}
				},
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				caption: "Подсказка слева кнопки"
			});
			var colorEditSimple = Ext.create("Terrasoft.ColorButton", {
				simpleMode: true,
				styles: {
					wrapStyles: {
						float: "left",
						"margin-left": "250px"
					}
				}
			});
			var imageEdit = Ext.create("Terrasoft.ImageEdit", {
				styles: {
					wrapStyles: {
						float: "left",
						"margin-left": "200px"
					}
				}
			});
			var checkbox = Ext.create("Terrasoft.CheckBoxEdit", {
				enabled: false,
				checked: true,
				styles: {
					wrapStyle: {
						float: "left",
						"margin-left": "200px"
					}
				}
			});
			var baseEdit = Ext.create("Terrasoft.BaseEdit", {
					hasClearIcon: true,
					value: "test",
					enabled: false,
					width: "100px"
			});
			var containerBaseEdit = Ext.create("Terrasoft.Container", {
				styles: {
					wrapStyles: {
						float: "left",
						"margin-left": "200px"
					}
				},
				items: [baseEdit]
			});
			var upButton = Ext.create("Terrasoft.Button", {
				styles: {
					textStyle: {
						float: "left",
						"margin-left": "600px"
					}
				},
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				caption: "Подсказка вверху кнопки"
			});
			var browseButton = Ext.create("Terrasoft.Button", {
				styles: {
					textStyle: {
						float: "left",
						"margin-left": "400px"
					}
				},
				fileUpload: true,
				filesSelected: {bindTo: "onFileSelect"},
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				caption: "..."
			});
			var htmlTipButton = Ext.create("Terrasoft.Button", {
				styles: {
					textStyle: {
						float: "left",
						"margin-left": "10px"
					}
				},
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				caption: "Show html tip button"
			});
			var container2 = Ext.create("Terrasoft.Container", {
				styles: {
					wrapStyles: {
						float: "left",
						width: "100%"
					}
				},
				items: [upButton, browseButton, htmlTipButton]
			});
			var setPressed = function(component, value){
				if(component instanceof Terrasoft.Button){
					component.setPressed(value)
				}
			};
			var toggleTip = function(component, tipConfig){
				return function(){
					var onTipHide = function(component){
						component.tip.destroy();
						delete component.tip;
						setPressed(component, false);
					};
					if (component.tip){
						component.tip.hide();
						onTipHide(component);
					} else {
						var tip = component.tip = Ext.create("Terrasoft.Tip", {
							items: tipConfig.items? Terrasoft.deepClone(tipConfig.items): null,
							alignEl: component.getWrapEl(),
							tools: tipConfig.toolsConfig || null
						});
						var localContent = '<div><span style="font-size:16px;"><strong><span style="font-family:segoe ui;">Tooltip</span></strong></span></div><div><span style="font-family:segoe ui;"><span style="font-size:16px;">Hello <em>world&nbsp;<a href="https://www.google.com.ua" target="_blank" title="https://www.google.com.ua"><span>More</span></a></em></span></span></div>';
						var content = tipConfig.content || localContent;
						var config = Ext.apply({
							content: content
						}, tipConfig || {});
						tip.bind(component.model);
						tip.show(config);
						tip.on("tipClosed", function(){onTipHide(component);});
						setPressed(component, true);
					}
				}
			};
			var ViewModelExternal = Ext.create("Terrasoft.BaseViewModel", {
				methods: {
					onFileSelect: function(files) {
						var file = files[0];
						FileAPI.readAsText(file, null, function(e) {
							if (e.type === "load") {
								var bodyHtml = e.result;
								var bodyRegex = /<body.*?>([\s\S]*)<\/body>/;
								if (bodyRegex.test(e.result)) {
									bodyHtml = bodyRegex.exec(bodyHtml)[1];
								}
								htmlTipButton.on("click", toggleTip(htmlTipButton, {closable: true, style: Terrasoft.controls.ButtonEnums.style.GREEN, content: bodyHtml}));
							}
						}.bind(this));
					},
					sayHi: function() {
						alert("Hi!")
					}
				}
			});
			colorEditSimple.button.on("mouseover", toggleTip(colorEditSimple));
			leftButton.on("click", toggleTip(leftButton, {closable: true, style: Terrasoft.controls.ButtonEnums.style.GREEN, toolsConfig: {
				className: "Terrasoft.Button",
				caption: "ЫЫЫ"
			}}));
			rightButton.on("click", toggleTip(rightButton, {closable: false, style: Terrasoft.controls.ButtonEnums.style.GREY, items: [{className: "Terrasoft.Button", caption: "Hi", click: {bindTo: "sayHi"}, style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT}]}));
			upButton.on("click", toggleTip(upButton, {closable: true, style: Terrasoft.controls.ButtonEnums.style.RED, classes: { wrapClass: ["hello-tip"]}}));

			var container = Ext.create("Terrasoft.Container", {
				styles: {
					wrapStyles: {
						float: "left",
						width: "100%"
					}
				},
				items: [
					leftButton,
					rightButton,
					colorEditSimple,
					imageEdit,
					checkbox,
					containerBaseEdit,
					container2
				],
				renderTo: renderTo
			});
			container.bind(ViewModelExternal);
		}
	}
});