define(["ext-base", "terrasoft", "button"], function(Ext, Terrasoft) {
	return {
		render: function(renderTo) {
			Ext.define("Terrasoft.ViewModel", {
				"extend": "Terrasoft.BaseViewModel",
				"columns": {
					"htmlEditValue": {
						"type": Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
						"caption": "ComboboxSelectionText",
						"dataValueType": Terrasoft.core.enums.DataValueType.TEXT
					}
				}
			});
			model = Ext.create("Terrasoft.ViewModel", {
				"values": {
					"htmlEditValue": ""
				}
			});

			var colorEditSimple = Ext.create("Terrasoft.ColorButton", {
				"simpleMode": true,
				"styles": {
					"wrapStyles": {
						"float": "left",
						"margin": "5px"
					}
				},
				"renderTo": renderTo
			});
			var colorEditMore = Ext.create("Terrasoft.ColorButton", {
				"simpleMode": false,
				"styles": {
					"wrapStyles": {
						"float": "left",
						"margin": "5px"
					}
				},
				"renderTo": renderTo
			});
			var colorPicker = Ext.create("Terrasoft.ColorButton", {
				"styles": {
					"wrapStyles": {
						"float": "left",
						"margin": "5px"
					}
				},
				"renderTo": renderTo,
				"defaultValue": "#11dd4e",
				"value": "#11dd4e",
				"menuItemClassName": Terrasoft.MenuItemType.COLOR_PICKER
			});
			var colorEditFont = Ext.create("Terrasoft.ColorButton", {
				"imageConfig": {
					"source": Terrasoft.ImageSources.URL,
					"url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAgklEQVR42u2SPQrAIAy" +
						"FPbCjq6t7J1dXR8/gETxQylewtCD+QbcGHoboe0lMlPrSjDECtsg554ustRb8ZQHvvYQQhBMsC9TMAH+JnFJ69Y5Pb" +
						"FrAOScxxptAK8SmyKWUg5Jb4G4oQGZrrbRG+qyqO/vWQ2LDnag/3iq1tra1E7/17QRe1HY6DA0erQAAAABJRU5ErkJ" +
						"ggg=="
				},
				"styles": {
					"wrapStyles": {
						"float": "left",
						"margin": "5px"
					}
				},
				"renderTo": renderTo
			});
			var colorEditBackground = Ext.create("Terrasoft.ColorButton", {
				"simpleMode": true,
				"imageConfig": {
					"source": Terrasoft.ImageSources.URL,
					"url": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABHUlEQVR42mPY++L3f0ow" +
						"A9UNaOqd9L+lrf3/03cf4WLltfX/t+3a8//i62/4Ddh0/cX/opLS/6Wlpf8vXb32//jLn6QZMH3djv/902b9nzR95v+" +
						"FK1b/v/HmK9yAeQsW/i8GGpyTk/O/v7///6O3nzANqGnt/L/38NH/aw+c/F8MdMmb9x/gBrQCvXX36Yv/W68/B7ty5+" +
						"7dYBfBDVh7/h5YAqapsKTs/6kzZ/+fevUDbMC6jZv/X3kNcVH71Dn/Zy1Y9P/2my8IAyYtWw92HjJesGABWBF6GIAMg" +
						"HkRbgDIxoOHj/w/9+o7mL/8+FWwix4/e47ihfVAl4IMP3PmDNh1YAMW7T+N4mf06KusrfvfCww4dJdRJyGNAsoBAPPZ" +
						"Rpvh9VREAAAAAElFTkSuQmCC"
				},
				"styles": {
					"wrapStyles": {
						"float": "left",
						"margin": "5px"
					}
				},
				"renderTo": renderTo
			});
		}
	};
});
