define(["ext-base", "terrasoft", "require"], function(Ext, Terrasoft, require) {
	return {
		"render": function(renderTo) {
			renderTo.dom.innerHTML =
				"<div>100 % width</div>" +
				"<div id='wr100'></div>" +
				"<div>AutoWidth</div>" +
				"<div id='wr0' class='button-inline-example' style=''></div>" +
				"<div>With size</div>" +
				"<div id='wr1' class='button-inline-example' style=';'></div>" +
				"<div>Without size (and long text) and Transparent Style</div>" +
				"<div id='wr2' class='button-inline-example' style=''></div>" +
				"<div>Disabled</div>" +
				"<div id='wr3' class='button-inline-example' style=''></div>" +
				"<div>Align test</div>" +
				"<div id='wr5' class='button-inline-example' style=''></div>" +
				"<div>Check public interface:</div>" +
				"<div id='wr4' class='button-inline-example' style=''></div>" +
				"<table>" +
					"<tr><td class='interface-caption'>setStyle</td><td id='interfaceStyle' class='interface-butttons'></td></tr>" +
					"<tr><td class='interface-caption'>setVisible</td><td id='interfaceVisible' class='interface-butttons'></td></tr>" +
					"<tr><td class='interface-caption'>setEnabled</td><td id='interfaceEnable' class='interface-butttons'></td></tr>" +
					"<tr><td class='interface-caption'>Menu</td><td id='interfaceMenu' class='interface-butttons'></td></tr>" +
					"<tr><td class='interface-caption'>Image</td><td id='interfaceImage' class='interface-butttons'></td></tr>" +
					"<tr><td class='interface-caption'>Image align</td><td id='interfaceImageAlign' class='interface-butttons'></td></tr>" +
				"<tr>" +
					"<td class='interface-caption'>Caption:</td>" +
					"<td id='interfaceCaption' class='interface-butttons'>" +
						"<input id='captionInput' type='text'>" +
					"</td>" +
				"</tr>" +
				"<tr>" +
				"<td class='interface-caption'>Width:</td>" +
					"<td id='interfaceWidth' class='interface-butttons'>" +
						"<input id='widthInput' type='text'>" +
					"</td>" +
				"</tr>" +
			"</table>";
			var buttons = {};
			var helpIconUrl ="./resources/demo/button/help.png";
			var printerUrl = "./resources/demo/button/printer.png";
			buttons.wr100 = {};
			buttons.wr0 = {};
			buttons.wr1 = {};
			buttons.wr2 = {};
			buttons.wr3 = {};
			buttons.wr4 = {};
			buttons.wr5 = {};
			var wr100 = Ext.get("wr100");
			var wr0 = Ext.get("wr0");
			var wr1 = Ext.get("wr1");
			var wr2 = Ext.get("wr2");
			var wr3 = Ext.get("wr3");
			var wr4 = Ext.get("wr4");
			var wr5 = Ext.get('wr5');
			//Ext.enableNestedListenerRemoval =  true;

			// GROUP wr100 ################################################# 100%
			var width = "100%";

			buttons.wr5.button0 = Ext.create('Terrasoft.Button', {
				groupName: "group5",
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				caption: "TghpHAi",
				renderTo:  wr5
			});

			buttons.wr5.button1 = Ext.create('Terrasoft.Button', {
				groupName: "group5",
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				caption: "TghpHAi",
				renderTo:  wr5
			});

			buttons.wr5.button2 = Ext.create('Terrasoft.Button', {
				groupName: "group5",
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				caption: "TghpHAi",
				renderTo:  wr5
			});

			buttons.wr5.button3 = Ext.create('Terrasoft.Button', {
				groupName: "group5",
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: "TghpHAi",
				renderTo:  wr5
			});

			buttons.wr5.button4 = Ext.create('Terrasoft.Button', {
				groupName: "group5",
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: "TghpHAi",
				renderTo:  wr5
			});

			buttons.wr5.button5 = Ext.create('Terrasoft.Button', {
				groupName: "group5",
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: "TghpHAi",
				renderTo:  wr5
			});

			buttons.wr5.button6 = Ext.create('Terrasoft.Button', {
				groupName: "group5",
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				caption: "TghpHAi",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				renderTo:  wr5
			});

			buttons.wr5.button7 = Ext.create('Terrasoft.Button', {
				groupName: "group5",
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				renderTo:  wr5
			});

			buttons.wr5.button8 = Ext.create('Terrasoft.Button', {
				groupName: "group5",
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				caption: "TghpHAi",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				renderTo:  wr5
			});

			buttons.wr5.button9 = Ext.create('Terrasoft.Button', {
				groupName: "group5",
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				caption: "TghpHAi",
				menu: {items:[{caption: "SingleMenuItem"}]},
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				renderTo:  wr5
			});

			buttons.wr5.button10 = Ext.create('Terrasoft.Button', {
				groupName: "group5",
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				menu: {items:[{caption: "SingleMenuItem"}]},
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				renderTo:  wr5
			});

			window.bt11 = buttons.wr5.button11 = Ext.create('Terrasoft.Button', {
				groupName: "group5",
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				caption: "TghpHAi",
				menu: {items:[{caption: "SingleMenuItem"}]},
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				renderTo:  wr5
			});


			buttons.wr100.button1 = Ext.create('Terrasoft.Button', {
				width: width,
				pressed: true,
				//margin: "10px",
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				caption: "Text",
				renderTo:  wr100
			});

			buttons.wr100.button2 = Ext.create('Terrasoft.Button', {
				width: width,
				pressed: true,
				groupName: "group1",
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				renderTo:  wr100
			});

			buttons.wr100.button3 = Ext.create('Terrasoft.Button', {
				width: width,
				pressed: true,
				groupName: "group1",
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: "Left Icon",
				renderTo:  wr100
			});

			buttons.wr100.button4 = Ext.create('Terrasoft.Button', {
				width: width,
				pressed: true,
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: "Top Icon",
				renderTo:  wr100
			});

			buttons.wr100.button5 = Ext.create('Terrasoft.Button', {
				width: width,
				groupName: "group1",
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: "Text",
				renderTo:  wr100
			});

			buttons.wr100.button6 = Ext.create('Terrasoft.Button', {
				width: width,
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				menu: {items:[{caption: "SingleMenuItem"}]},
				renderTo:  wr100
			});

			buttons.wr100.button7 = Ext.create('Terrasoft.Button', {
				width: width,
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: "Left Icon with menu",
				renderTo:  wr100
			});

			buttons.wr100.button8 = Ext.create('Terrasoft.Button', {
				width: width,
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: "Top Icon with menu",
				renderTo:  wr100
			});

			buttons.wr100.button9 = Ext.create('Terrasoft.Button', {
				width: width,
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.RIGHT,
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: "Right Icon",
				renderTo:  wr100
			});

			buttons.wr100.button10 = Ext.create('Terrasoft.Button', {
				width: width,
				groupName: "group1",
				menu: {items:[{caption: "SingleMenuItem"}]},
				renderTo:  wr100
			});

			// GROUP wr0 #################################################

			buttons.wr0.button1 = Ext.create('Terrasoft.Button', {
				pressed: true,
				//margin: "10px",
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				caption: "Text",
				renderTo:  wr0
			});
			buttons.wr0.button1.on('click', function(button) {
				alert("Handler");
			}, this);

			buttons.wr0.button2 = Ext.create('Terrasoft.Button', {
				pressed: true,
				groupName: "group1",
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				renderTo:  wr0
			});

			buttons.wr0.button3 = Ext.create('Terrasoft.Button', {
				pressed: true,
				groupName: "group1",
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: "Left Icon",
				renderTo:  wr0
			});

			buttons.wr0.button4 = Ext.create('Terrasoft.Button', {
				pressed: true,
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: "Top Icon",
				renderTo:  wr0
			});

			buttons.wr0.button5 = Ext.create('Terrasoft.Button', {
				groupName: "group1",
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: "Text",
				renderTo:  wr0
			});

			buttons.wr0.button6 = Ext.create('Terrasoft.Button', {
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				menu: {items:[{caption: "SingleMenuItem"}]},
				renderTo:  wr0
			});

			buttons.wr0.button7 = Ext.create('Terrasoft.Button', {
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: "Left Icon with menu",
				renderTo:  wr0
			});

			buttons.wr0.button8 = Ext.create('Terrasoft.Button', {
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: "Top Icon with menu",
				renderTo:  wr0
			});

			buttons.wr0.button9 = Ext.create('Terrasoft.Button', {
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.RIGHT,
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: "Right Icon",
				renderTo:  wr0
			});

			buttons.wr0.button10 = Ext.create('Terrasoft.Button', {
				groupName: "group1",
				menu: {items:[{caption: "SingleMenuItem"}]},
				renderTo:  wr0
			});

			// GROUP wr1 #################################################

			buttons.wr1.button1 = Ext.create('Terrasoft.Button', {
				groupName: "group2",
				width: 150,
				caption: "Text",
				renderTo: wr1
			});

			buttons.wr1.button2 = Ext.create('Terrasoft.Button', {
				groupName: "group2",
				width: 60,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				renderTo:  wr1
			});

			buttons.wr1.button3 = Ext.create('Terrasoft.Button', {
				groupName: "group2",
				width: 150,
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: "Left Icon",
				renderTo:  wr1
			});

			buttons.wr1.button4 = Ext.create('Terrasoft.Button', {
				groupName: "group2",
				width: 150,
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: "Top Icon",
				renderTo:  wr1
			});

			buttons.wr1.button5 = Ext.create('Terrasoft.Button', {
				groupName: "group2",
				width: 150,
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: "Text",
				renderTo:  wr1
			});

			buttons.wr1.button6 = Ext.create('Terrasoft.Button', {
				groupName: "group2",
				width: 150,
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				menu: {items:[{caption: "SingleMenuItem"}]},
				renderTo:  wr1
			});

			buttons.wr1.button7 = Ext.create('Terrasoft.Button', {
				groupName: "group2",
				width: 150,
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: "Left Icon with menu",
				renderTo:  wr1
			});

			buttons.wr1.button8 = Ext.create('Terrasoft.Button', {
				groupName: "group2",
				width: 150,
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: "Top Icon with menu",
				renderTo:  wr1
			});

			buttons.wr1.button9 = Ext.create('Terrasoft.Button', {
				groupName: "group2",
				width: 150,
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.RIGHT,
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: "Right Icon",
				renderTo:  wr1
			});

			buttons.wr1.button10 = Ext.create('Terrasoft.Button', {
				groupName: "group2",
				menu: {items:[{caption: "SingleMenuItem"}]},
				width: 40,
				renderTo:  wr1
			});

			// GROUP wr2 #################################################

			var longText = "This is very very very very looong text";
			buttons.wr2.button1 = Ext.create('Terrasoft.Button', {
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				width: 150,
				caption: longText,
				renderTo: wr2
			});

			buttons.wr2.button2 = Ext.create('Terrasoft.Button', {
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				width: 60,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				renderTo:  wr2
			});

			buttons.wr2.button3 = Ext.create('Terrasoft.Button', {
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				width: 150,
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: longText,
				renderTo:  wr2
			});

			buttons.wr2.button4 = Ext.create('Terrasoft.Button', {
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				width: 150,
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: longText,
				renderTo:  wr2
			});

			buttons.wr2.button5 = Ext.create('Terrasoft.Button', {
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				width: 150,
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: longText,
				renderTo:  wr2
			});

			buttons.wr2.button6 = Ext.create('Terrasoft.Button', {
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				width: 150,
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				menu: {items:[{caption: "SingleMenuItem"}]},
				renderTo:  wr2
			});

			buttons.wr2.button7 = Ext.create('Terrasoft.Button', {
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				width: 150,
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: longText,
				renderTo:  wr2
			});

			buttons.wr2.button8 = Ext.create('Terrasoft.Button', {
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				width: 150,
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.TOP,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				menu: {items:[{caption: "SingleMenuItem"}]},
				caption: longText,
				renderTo:  wr2
			});

			buttons.wr2.button9 = Ext.create('Terrasoft.Button', {
				width: 150,
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.RIGHT,
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: longText,
				renderTo:  wr2
			});

			buttons.wr2.button10 = Ext.create('Terrasoft.Button', {
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				menu: {items:[{caption: "SingleMenuItem"}]},
				width: 40,
				renderTo:  wr2
			});

			// GROUP wr3 #################################################

			buttons.wr3.button1 = Ext.create('Terrasoft.Button', {
				enabled: false,
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				style: Terrasoft.controls.ButtonEnums.style.DEFAULT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: "Default style",
				renderTo:  wr3
			});
			buttons.wr3.button1.on('click', function(button) {
				alert("Handler");
			}, this);

			buttons.wr3.button2 = Ext.create('Terrasoft.Button', {
				enabled: false,
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: "Green style",
				renderTo:  wr3
			});
			buttons.wr3.button2.on('click', function(button) {
				alert("Handler");
			}, this);

			buttons.wr3.button3 = Ext.create('Terrasoft.Button', {
				enabled: false,
				groupName: "group1",
				iconAlign: Terrasoft.controls.ButtonEnums.iconAlign.LEFT,
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				imageConfig: {
					source: Terrasoft.ImageSources.URL,
					url: helpIconUrl
				},
				caption: "Transparent stype",
				renderTo:  wr3
			});
			buttons.wr3.button3.on('click', function(button) {
				alert("Handler");
			}, this);

			// GROUP wr4 #################################################
			var interfaceVisible = Ext.get("interfaceVisible");
			var interfaceEnable = Ext.get("interfaceEnable");
			var interfaceMenu = Ext.get("interfaceMenu");
			var interfaceImage = Ext.get("interfaceImage");
			var interfaceImageAlign = Ext.get("interfaceImageAlign");
			var interfaceCaption = Ext.get("interfaceCaption");
			var interfaceWidth = Ext.get("interfaceWidth");
			var interfaceStyle = Ext.get("interfaceStyle");

			var testButton = buttons.wr4.testButton = Ext.create('Terrasoft.Button', {
				style: Terrasoft.controls.ButtonEnums.style.GREEN,
				caption: "TEST BUTTON",
				renderTo:  wr4
			});
			testButton.on('click', function(button) {
				alert("Handler");
			}, this);

			buttons.wr4.button1 = Ext.create('Terrasoft.Button', {
				caption: "Enable",
				groupName: "EnableDisableGroup",
				renderTo:  interfaceEnable
			});
			buttons.wr4.button1.on('click', function(button) {
				testButton.setEnabled(true);
			}, this);

			buttons.wr4.button2 = Ext.create('Terrasoft.Button', {
				caption: "Disable",
				groupName: "EnableDisableGroup",
				renderTo:  interfaceEnable
			});
			buttons.wr4.button2.on('click', function(button) {
				testButton.setEnabled(false);
			}, this);

			buttons.wr4.button3 = Ext.create('Terrasoft.Button', {
				caption: "Show",
				groupName: "ShowHideGroup",
				handler: function(button) {
					testButton.setVisible(true);
				},
				renderTo:  interfaceVisible
			});
			buttons.wr4.button3.on('click', function(button) {
				testButton.setVisible(true);
			}, this);

			buttons.wr4.button4 = Ext.create('Terrasoft.Button', {
				caption: "Hide",
				groupName: "ShowHideGroup",
				renderTo:  interfaceVisible
			});
			buttons.wr4.button4.on('click', function(button) {
				testButton.setVisible(false);
			}, this);

			buttons.wr4.button5 = Ext.create('Terrasoft.Button', {
				caption: "Add",
				groupName: "wr4menuGroup",
				renderTo:  interfaceMenu
			});
			buttons.wr4.button5.on('click', function(button) {
				testButton.addMenu({
					items: [
						{
							caption: "Menu item # 1"
						},{
							caption: "Menu item # 2"
						}
					]
				});
			}, this);

			buttons.wr4.button6 = Ext.create('Terrasoft.Button', {
				caption: "Remove",
				groupName: "wr4menuGroup",
				handler: function(button) {
					testButton.removeMenu();
				},
				renderTo:  interfaceMenu
			});
			buttons.wr4.button6.on('click', function(button) {
				testButton.removeMenu();
			}, this);

			buttons.wr4.button7 = Ext.create('Terrasoft.Button', {
				groupName: "wr4-style",
				caption: "green",
				renderTo: interfaceStyle
			});
			buttons.wr4.button7.on('click', function(button) {
				testButton.setStyle(Terrasoft.controls.ButtonEnums.style.GREEN);
			}, this);

			buttons.wr4.button8 = Ext.create('Terrasoft.Button', {
				groupName: "wr4-style",
				caption: "default",
				renderTo: interfaceStyle
			});
			buttons.wr4.button8.on('click', function(button) {
				testButton.setStyle(Terrasoft.controls.ButtonEnums.style.DEFAULT);
			}, this);

			buttons.wr4.button9 = Ext.create('Terrasoft.Button', {
				groupName: "wr4-style",
				caption: "transparent",
				renderTo: interfaceStyle
			});
			buttons.wr4.button9.on('click', function(button) {
				testButton.setStyle(Terrasoft.controls.ButtonEnums.style.TRANSPARENT);
			}, this);

			buttons.wr4.button10 = Ext.create('Terrasoft.Button', {
				caption: "printer icon",
				groupName: "icongroup",
				handler: function(button) {
					testButton.setImage(printerUrl)
				},
				renderTo: interfaceImage
			});
			buttons.wr4.button10.on('click', function(button) {
				testButton.setImage(printerUrl);
			}, this);

			buttons.wr4.button11 = Ext.create('Terrasoft.Button', {
				caption: "help icon",
				groupName: "icongroup",
				renderTo: interfaceImage
			});
			buttons.wr4.button11.on('click', function(button) {
				testButton.setImage(helpIconUrl);
			}, this);

			buttons.wr4.button12 = Ext.create('Terrasoft.Button', {
				caption: "none",
				groupName: "icongroup",
				renderTo: interfaceImage
			});
			buttons.wr4.button12.on('click', function(button) {
				testButton.removeImage();
			}, this);

			buttons.wr4.button13 = Ext.create('Terrasoft.Button', {
				caption: "Set width",
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				renderTo: interfaceWidth
			});
			buttons.wr4.button13.on('click', function(button) {
				var widthInput = Ext.get("widthInput").dom.value;
				testButton.setWidth(widthInput, false);
			}, this);

			buttons.wr4.button14 = Ext.create('Terrasoft.Button', {
				caption: "Set autoWidth",
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				renderTo: interfaceWidth
			});
			buttons.wr4.button14.on('click', function(button) {
				testButton.setWidth(null);
			}, this);

			buttons.wr4.button15 = Ext.create('Terrasoft.Button', {
				caption: "Remove caption",
				style: Terrasoft.controls.ButtonEnums.style.TRANSPARENT,
				renderTo: interfaceCaption
			});
			buttons.wr4.button15.on('click', function(button) {
				testButton.removeCaption();
			}, this);

			Ext.get("captionInput").on("keyup", function(event, input, args){
				testButton.setCaption(input.value);
			});

			buttons.wr4.button16 = Ext.create('Terrasoft.Button', {
				caption: "Left",
				groupName: "wr4-icon-align",
				renderTo: interfaceImageAlign
			});
			buttons.wr4.button16.on('click', function(button) {
				testButton.setIconAlign(Terrasoft.controls.ButtonEnums.iconAlign.LEFT);
			}, this);

			buttons.wr4.button17 = Ext.create('Terrasoft.Button', {
				caption: "Top",
				groupName: "wr4-icon-align",
				renderTo: interfaceImageAlign
			});
			buttons.wr4.button17.on('click', function(button) {
				testButton.setIconAlign(Terrasoft.controls.ButtonEnums.iconAlign.TOP);
			}, this);

			buttons.wr4.button18 = Ext.create('Terrasoft.Button', {
				caption: "Right",
				groupName: "wr4-icon-align",
				renderTo: interfaceImageAlign
			});
			buttons.wr4.button18.on('click', function(button) {
				testButton.setIconAlign(Terrasoft.controls.ButtonEnums.iconAlign.RIGHT);
			}, this);
		}
	};
});