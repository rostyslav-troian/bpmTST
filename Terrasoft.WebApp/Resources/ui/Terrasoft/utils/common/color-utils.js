Ext.ns("Terrasoft.utils.color");

/**
 * @singleton
 */

/**
 * Converts hsv to rgb color.
 * @param {Number} hue Color tone from 0 to 360.
 * @param {Number} saturation Saturation from 0 to 1.
 * @param {Number} brightness Color value or brightness from 0 to 1.
 * @return {Array} RGB color value.
 */
Terrasoft.utils.color.hsv2rgb = function(hue, saturation, brightness) {
	if (!Ext.isNumber(hue) || !Ext.isNumber(saturation) || !Ext.isNumber(brightness)) {
		throw new Terrasoft.UnsupportedTypeException();
	}
	var hsl = Terrasoft.hsv2hsl(hue, saturation, brightness);
	var rgb = Ext.draw.Color.fromHSL(hsl[0], hsl[1], hsl[2]);
	return [
		Math.round(rgb.getRed()),
		Math.round(rgb.getGreen()),
		Math.round(rgb.getBlue())
	];
};

/**
 * Alias for {@link Terrasoft.utils.color#hsv2rgb}
 * @member Terrasoft
 * @method hsv2rgb
 * @inheritdoc Terrasoft.utils.color#hsv2rgb
 */
Terrasoft.hsv2rgb = Terrasoft.utils.color.hsv2rgb;

/**
 * Converts hsv to hsl color.
 * @param {Number} hue Color tone from 0 to 360.
 * @param {Number} saturation Saturation from 0 to 1.
 * @param {Number} brightness Color value or brightness from 0 to 1.
 * @return {Array} HSL color value.
 */
Terrasoft.utils.color.hsv2hsl = function(hue, saturation, brightness) {
	if (!Ext.isNumber(hue) || !Ext.isNumber(saturation) || !Ext.isNumber(brightness)) {
		throw new Terrasoft.UnsupportedTypeException();
	}
	var lightness = (2 - saturation) * brightness;
	var hslSaturation = saturation * brightness;
	var divider = (lightness <= 1) ? lightness : 2 - lightness;
	hslSaturation = divider !== 0 ? hslSaturation / divider : 0;
	lightness /= 2;
	return [
		hue,
		hslSaturation,
		lightness
	];
};

/**
 * Alias for {@link Terrasoft.utils.color#hsv2hsl}
 * @member Terrasoft
 * @method hsv2hsl
 * @inheritdoc Terrasoft.utils.color#hsv2hsl
 */
Terrasoft.hsv2hsl = Terrasoft.utils.color.hsv2hsl;

/**
 * Converts rgb to hex color.
 * @param {Array} rgb Rgb color array.
 * @return {String} HEX color value.
 */
Terrasoft.utils.color.rgb2hex = function(rgb) {
	if (Ext.isArray(rgb)) {
		rgb = Ext.String.format("rgb({0}, {1}, {2})", rgb[0], rgb[1], rgb[2]);
	}
	if (!Ext.isString(rgb)) {
		throw new Terrasoft.UnsupportedTypeException();
	}
	return Ext.draw.Color.toHex(rgb);
};

/**
 * Alias for {@link Terrasoft.utils.color#rgb2hex}
 * @member Terrasoft
 * @method rgb2hex
 * @inheritdoc Terrasoft.utils.color#rgb2hex
 */
Terrasoft.rgb2hex = Terrasoft.utils.color.rgb2hex;

/**
 * Converts hex to rgb color.
 * @param {String} hex HEX color value.
 * @return {Array} RGB color array.
 */
Terrasoft.utils.color.hex2rgb = function(hex) {
	if (!Terrasoft.isHexValue(hex)) {
		throw new Terrasoft.UnsupportedTypeException();
	}
	var rgb = Ext.draw.Color.fromString(hex);
	return [
		parseInt(rgb.getRed()),
		parseInt(rgb.getGreen()),
		parseInt(rgb.getBlue())
	];
};

/**
 * Alias for {@link Terrasoft.utils.color#hex2rgb}
 * @member Terrasoft
 * @method hex2rgb
 * @inheritdoc Terrasoft.utils.color#hex2rgb
 */
Terrasoft.hex2rgb = Terrasoft.utils.color.hex2rgb;

/**
 * Converts rgb to hsv color.
 * @param {Array} rgb RGB color array.
 * @return {Array} HSV color array.
 */
Terrasoft.utils.color.rgb2hsv = function(rgb) {
	if (Ext.isArray(rgb)) {
		rgb = Ext.String.format("rgb({0}, {1}, {2})", rgb[0], rgb[1], rgb[2]);
	}
	if (!Ext.isString(rgb)) {
		throw new Terrasoft.UnsupportedTypeException();
	}
	var color = Ext.draw.Color.fromString(rgb);
	var hsl = color.getHSL();
	var hue = hsl[0];
	hue = Ext.isDefined(hue) ? hue : 0;
	var hsv = Terrasoft.hsl2hsv(hue, hsl[1], hsl[2]);
	return [
		hsv[0],
		hsv[1],
		hsv[2]
	];
};

/**
 * Alias for {@link Terrasoft.utils.color#rgb2hsv}
 * @member Terrasoft
 * @method rgb2hsv
 * @inheritdoc Terrasoft.utils.color#rgb2hsv
 */
Terrasoft.rgb2hsv = Terrasoft.utils.color.rgb2hsv;

/**
 * Converts hsl to hsv color.
 * @param {Number} hue Color tone from 0 to 360.
 * @param {Number} saturation Saturation from 0 to 1.
 * @param {Number} lightness Color value or lightness from 0 to 1.
 * @return {Array} HSL color value.
 */
Terrasoft.utils.color.hsl2hsv = function(hue, saturation, lightness) {
	if (!Ext.isNumber(hue) || !Ext.isNumber(saturation) || !Ext.isNumber(lightness)) {
		throw new Terrasoft.UnsupportedTypeException();
	}
	lightness *= 2;
	saturation *= (lightness <= 1) ? lightness : 2 - lightness;
	var brightness = (lightness + saturation) / 2;
	var mixed = lightness + saturation;
	var hsvSaturation = mixed !== 0 ? (2 * saturation) / mixed : 0;
	hue = Ext.isDefined(hue) ? hue : 0;
	return [
		hue,
		hsvSaturation,
		brightness
	];
};

/**
 * Alias for {@link Terrasoft.utils.color#hsl2hsv}
 * @member Terrasoft
 * @method hsl2hsv
 * @inheritdoc Terrasoft.utils.color#hsl2hsv
 */
Terrasoft.hsl2hsv = Terrasoft.utils.color.hsl2hsv;

/**
 * Converts hex to hsv color.
 * @param {String} hex HEX color value.
 * @return {Array} HSV color array.
 */
Terrasoft.utils.color.hex2hsv = function(hex) {
	return Terrasoft.rgb2hsv(Terrasoft.hex2rgb(hex));
};

/**
 * Alias for {@link Terrasoft.utils.color#hex2hsv}
 * @member Terrasoft
 * @method hex2hsv
 * @inheritdoc Terrasoft.utils.color#hex2hsv
 */
Terrasoft.hex2hsv = Terrasoft.utils.color.hex2hsv;

/**
 * Converts hsv to hex color.
 * @param {Number} hue Color tone from 0 to 360.
 * @param {Number} saturation Saturation from 0 to 1.
 * @param {Number} brightness Color value or brightness from 0 to 1.
 * @return {String} HEX color value.
 */
Terrasoft.utils.color.hsv2hex = function(hue, saturation, brightness) {
	var rgbColor = Terrasoft.hsv2rgb(hue, saturation, brightness);
	return Terrasoft.rgb2hex(rgbColor);
};

/**
 * Alias for {@link Terrasoft.utils.color#hsv2hex}
 * @member Terrasoft
 * @method hsv2hex
 * @inheritdoc Terrasoft.utils.color#hsv2hex
 */
Terrasoft.hsv2hex = Terrasoft.utils.color.hsv2hex;

/**
 * Converts rgb string to array.
 * @param {String} rgbString Rrb string value.
 * @return {Array} Converted rgb string to array.
 */
Terrasoft.utils.color.rgbString2Array = function(rgbString) {
	if (!Ext.isString(rgbString)) {
		throw new Terrasoft.UnsupportedTypeException();
	}
	var rgb = rgbString.substring(4, rgbString.length - 1).replace(/ /g, "").split(",");
	rgb = rgb.map(function(item) {
		return parseInt(item);
	});
	return rgb;
};

/**
 * Alias for {@link Terrasoft.utils.color#rgbString2Array}
 * @member Terrasoft
 * @method rgbString2Array
 * @inheritdoc Terrasoft.utils.color#rgbString2Array
 */
Terrasoft.rgbString2Array = Terrasoft.utils.color.rgbString2Array;

/**
 * Check if value is hex color.
 * @param {String} value Hex value.
 * @return {Boolean} Is hex color value.
 */
Terrasoft.utils.color.isHexValue = function(value) {
	if (!Ext.isString(value)) {
		return false;
	}
	var rgx = /^#+([a-fA-F0-9]{6}|[a-fA-F0-9]{3})$/;
	return value.match(rgx) ? true : false;
};

/**
 * Alias for {@link Terrasoft.utils.color#isHexValue}
 * @member Terrasoft
 * @method isHexValue
 * @inheritdoc Terrasoft.utils.color#isHexValue
 */
Terrasoft.isHexValue = Terrasoft.utils.color.isHexValue;

/**
 * Check if value is rgb color.
 * @param {Array|String} rgb Rrb array values.
 * @return {Boolean} Is rgb color value.
 */
Terrasoft.utils.color.isRgbValue = function(rgb) {
	if (Ext.isString(rgb) && rgb.indexOf("rgb") === 0) {
		rgb = Terrasoft.rgbString2Array(rgb);
	}
	if (!Ext.isArray(rgb) || rgb.length < 3) {
		return false;
	}
	return rgb.every(function(item) {
		return Ext.isNumber(item) && item >= 0 && item <= 255;
	});
};

/**
 * Alias for {@link Terrasoft.utils.color#isRgbValue}
 * @member Terrasoft
 * @method isRgbValue
 * @inheritdoc Terrasoft.utils.color#isRgbValue
 */
Terrasoft.isRgbValue = Terrasoft.utils.color.isRgbValue;

/**
 * Check if value is color by encoding.
 * @param {Array|String} value Color value.
 * @param {Terrasoft.core.enums.ColorEncoding} encoding Color encoding.
 * @return {Boolean} If value is color.
 */
Terrasoft.utils.color.checkIsColorByEncoding = function(value, encoding) {
	var result;
	var colorEncoding = Terrasoft.ColorEncoding;
	switch (encoding) {
		case colorEncoding.HEX:
			result = Terrasoft.isHexValue(value);
			break;
		case colorEncoding.RGB:
			result = Terrasoft.isRgbValue(value);
			break;
		default:
			throw new Terrasoft.UnsupportedTypeException();
	}
	return result;
};

/**
 * Alias for {@link Terrasoft.utils.color#checkIsColorByEncoding}
 * @member Terrasoft
 * @method checkIsColorByEncoding
 * @inheritdoc Terrasoft.utils.color#checkIsColorByEncoding
 */
Terrasoft.checkIsColorByEncoding = Terrasoft.utils.color.checkIsColorByEncoding;

/**
 * Returns color by encoding.
 * @param {Array} hsv HSV color array.
 * @param {Terrasoft.core.enums.ColorEncoding} encoding Color encoding.
 * @return {String|Array} Color value.
 */
Terrasoft.utils.color.getColorByEncoding = function(hsv, encoding) {
	var encodings = Terrasoft.ColorEncoding;
	var color;
	switch (encoding) {
		case encodings.HEX:
			color = Terrasoft.hsv2hex(hsv[0], hsv[1], hsv[2]);
			break;
		case encodings.RGB:
			color = Terrasoft.hsv2rgb(hsv[0], hsv[1], hsv[2]);
			color = Ext.String.format("rgb({0})", color.join(", "));
			break;
		default:
			throw new Terrasoft.UnsupportedTypeException();
	}
	return color;
};

/**
 * Alias for {@link Terrasoft.utils.color#getColorByEncoding}
 * @member Terrasoft
 * @method getColorByEncoding
 * @inheritdoc Terrasoft.utils.color#getColorByEncoding
 */
Terrasoft.getColorByEncoding = Terrasoft.utils.color.getColorByEncoding;

/**
 * Returns HSV color by encoding.
 * @param {Array|String} value Color value.
 * @param {Terrasoft.core.enums.ColorEncoding} encoding Color encoding.
 * @return {Array} HSV color value.
 */
Terrasoft.utils.color.getHSVByEncoding = function(value, encoding) {
	var encodings = Terrasoft.ColorEncoding;
	var hsv;
	switch (encoding) {
		case encodings.HEX:
			hsv = Terrasoft.hex2hsv(value);
			break;
		case encodings.RGB:
			hsv = Terrasoft.rgb2hsv(value);
			break;
		default:
			throw new Terrasoft.UnsupportedTypeException();
	}
	return hsv;
};

/**
 * Alias for {@link Terrasoft.utils.color#getHSVByEncoding}
 * @member Terrasoft
 * @method getHSVByEncoding
 * @inheritdoc Terrasoft.utils.color#getHSVByEncoding
 */
Terrasoft.getHSVByEncoding = Terrasoft.utils.color.getHSVByEncoding;

/**
 * Returns hue of color in hex format.
 * @param {String} hexColor Color value.
 * @param {Number} percent Range from -100 to 100.
 * @return {String} Hue of hexColor.
 */
Terrasoft.utils.color.getColorHue = function(hexColor, percent) {
	let R = parseInt(hexColor.substring(1,3),16);
	let G = parseInt(hexColor.substring(3,5),16);
	let B = parseInt(hexColor.substring(5,7),16);
	R = parseInt(R * (100 + percent) / 100);
	G = parseInt(G * (100 + percent) / 100);
	B = parseInt(B * (100 + percent) / 100);
	R = (R<255)?R:255;
	G = (G<255)?G:255;
	B = (B<255)?B:255;
	const RR = ((R.toString(16).length==1)?"0"+R.toString(16):R.toString(16));
	const GG = ((G.toString(16).length==1)?"0"+G.toString(16):G.toString(16));
	const BB = ((B.toString(16).length==1)?"0"+B.toString(16):B.toString(16));
	return "#"+RR+GG+BB;
};

/**
 * Alias for {@link Terrasoft.utils.color#getColorHue}
 * @member Terrasoft
 * @method getColorHue
 * @inheritdoc Terrasoft.utils.color#getColorHue
 */
Terrasoft.getColorHue = Terrasoft.utils.color.getColorHue;

