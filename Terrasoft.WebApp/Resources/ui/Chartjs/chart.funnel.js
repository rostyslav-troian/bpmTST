(function(Chart) {
	if (!Chart) {
		return;
	}
	var helpers = Chart.helpers;
	var globalOpts = Chart.defaults.global;

	globalOpts.elements.trapezium = {
		backgroundColor: globalOpts.defaultColor,
		borderWidth: 0,
		borderColor: globalOpts.defaultColor,
		borderSkipped: "bottom",
		type: "isosceles"  // isosceles, scalene
	};

	var pointInPolygon = function (point, vs) {
		var x = point[0], y = point[1];
		var inside = false;
		for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
			var xi = vs[i][0], yi = vs[i][1];
			var xj = vs[j][0], yj = vs[j][1];
			var intersect = ((yi > y) != (yj > y)) && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
			if (intersect)
				inside = !inside;
		}
		return inside;
	};

	Chart.elements.Trapezium = Chart.elements.Rectangle.extend({
		getCorners: function () {
			var vm = this._view;
			var globalOptionTrapeziumElements = globalOpts.elements.trapezium;

			var corners = [],
				type = vm.type || globalOptionTrapeziumElements.type,
				top = vm.y,
				borderWidth = vm.borderWidth || globalOptionTrapeziumElements.borderWidth,
				upHalfWidth = this.getUpperWidth() / 2,
				botHalfWidth = this.getBottomWidth() / 2,
				halfStroke = borderWidth / 2;

			halfStroke = halfStroke < 0 ? 0 : halfStroke;

			// An isosceles trapezium
			if (type == "isosceles") {
				var x = vm.x;

				// Corner points, from bottom-left to bottom-right clockwise
				// | 1 2 |
				// | 0 3 |
				corners = [
					[x - botHalfWidth + halfStroke, vm.base],
					[x - upHalfWidth + halfStroke, top + halfStroke],
					[x + upHalfWidth - halfStroke, top + halfStroke],
					[x + botHalfWidth - halfStroke, vm.base]
				];
			} else if (type == "scalene") {
				var x1 = vm.x1,
					x2 = vm.x2;

				corners = [
					[x2 - botHalfWidth + halfStroke, vm.base],
					[x1 - upHalfWidth + halfStroke, top + halfStroke],
					[x1 + upHalfWidth - halfStroke, top + halfStroke],
					[x2 + botHalfWidth - halfStroke, vm.base]
				];
			}


			return corners;
		},
		draw: function () {
			var ctx = this._chart.ctx;
			var vm = this._view;
			var globalOptionTrapeziumElements = globalOpts.elements.trapezium;

			var corners = this.getCorners();
			this._cornersCache = corners;

			ctx.beginPath();
			ctx.fillStyle = vm.backgroundColor || globalOptionTrapeziumElements.backgroundColor;
			ctx.strokeStyle = vm.borderColor || globalOptionTrapeziumElements.borderColor;
			ctx.lineWidth = vm.borderWidth || globalOptionTrapeziumElements.borderWidth;

			// Find first (starting) corner with fallback to "bottom"
			var borders = ["bottom", "left", "top", "right"];
			var startCorner = borders.indexOf(
				vm.borderSkipped || globalOptionTrapeziumElements.borderSkipped,
				0);
			if (startCorner === -1)
				startCorner = 0;

			function cornerAt(index) {
				return corners[(startCorner + index) % 4];
			}

			// Draw rectangle from "startCorner"
			ctx.moveTo.apply(ctx, cornerAt(0));
			for (var i = 1; i < 4; i++)
				ctx.lineTo.apply(ctx, cornerAt(i));
			if (vm.useShadow) {
				ctx.shadowColor = "#999";
				ctx.shadowBlur = 10;
			} else {
				ctx.shadowColor = null;
				ctx.shadowBlur = null;
			}
			ctx.fill();
			if (vm.borderWidth) {
				ctx.stroke();
			}
		},
		height: function () {
			var vm = this._view;
			if (!vm) {
				return 0;
			}

			return vm.base - vm.y;
		},
		inRange: function (mouseX, mouseY) {
			var vm = this._view;
			if (!vm) {
				return false;
			}
			var corners = this._cornersCache ? this._cornersCache : this.getCorners();
			return pointInPolygon([mouseX, mouseY], corners);
		},
		getBottomWidth: function() {
			var vm = this._view;
			return vm.bottomWidth + (vm.additionalWidth || 0);
		},
		getUpperWidth: function() {
			var vm = this._view;
			return vm.upperWidth + (vm.additionalWidth || 0);
		},
		inLabelRange: function (mouseX) {
			var x,
				vm = this._view;

			if (!vm) {
				return false;
			}
			var bottomWidth = this.getBottomWidth();
			var upperWidth = this.getUpperWidth();
			if (vm.type == "scalene") {
				if (vm.x1 > vm.x2) {
					return mouseX >= vm.x2 - bottomWidth / 2 && mouseX <= vm.x1 + upperWidth / 2;
				} else {
					return mouseX <= vm.x2 + bottomWidth / 2 && mouseX >= vm.x1 - upperWidth / 2;
				}
			}

			var maxWidth = Math.max(upperWidth, bottomWidth);
			return mouseX >= vm.x - maxWidth / 2 && mouseX <= vm.x + maxWidth / 2;
		},
		tooltipPosition: function () {
			var vm = this._view;
			return {
				x: vm.x || vm.x2,
				y: vm.base - (vm.base - vm.y) / 2
			};
		},
		getArea: function () {
			var vm = this._view;
			var total = 0;
			var corners = this._cornersCache ? this._cornersCache : this.getCorners();
			for (var i = 0, l = corners.length; i < l; i++) {
				var addX = corners[i][0];
				var addY = corners[i == corners.length - 1 ? 0 : i + 1][1];
				var subX = corners[i == corners.length - 1 ? 0 : i + 1][0];
				var subY = corners[i][1];
				total += (addX * addY * 0.5);
				total -= (subX * subY * 0.5);
			}
			return Math.abs(total);
		},
		getCenterPoint: function () {
			var corners = this._cornersCache ? this._cornersCache : this.getCorners();
			var vm = this._view;
			var x = 0, y = 0, i, j, f, point1, point2;
			for (i = 0, j = corners.length - 1; i < corners.length; j = i, i++) {
				point1 = corners[i];
				point2 = corners[j];
				f = point1[0] * point2[1] - point2[0] * point1[1];
				x += (point1[0] + point2[0]) * f;
				y += (point1[1] + point2[1]) * f;
			}
			f = this.getArea() * 6;
			return {x: x / f, y: y / f};
		}
	});

	Chart.defaults.tsfunnel = {
		hover: {
			mode: "label"
		},
		gap: 0,
		upperWidth: 0.8,
		bottomWidth: 0.45,
		keep: "auto",
		elements: {
			minHeight: 18,
			borderWidth: 0
		},
		tooltips: {
			callbacks: {
				title: function () {
					return "";
				},
				label: function (tooltipItem, data) {
					return data.labels[tooltipItem.index] + ": "
						+ data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
				}
			}
		},
		labelConfig: {
			font: "12px Open Sans",
			lineHeight: 18
		},
		scales: {
			yAxes: [{
				type: "category",
				display: false
			}],
			xAxes: [{
				type: "category",
				display: false
			}]
		}
	};

	Chart.controllers.tsfunnel = Chart.DatasetController.extend({

		dataElementType: Chart.elements.Trapezium,

		initialize: function (chart, datasetIndex) {
			Chart.controllers.bar.prototype.initialize.call(this, chart, datasetIndex);
			if (typeof chart.options !== "undefined" && typeof chart.options.sort !== "undefined"
				&& chart.options.sort.substr(0, 4) !== "data") {
				var dataset = chart.data.datasets[datasetIndex];
				var dataPositions = [];
				helpers.each(dataset.data, function (item, index) {
					dataPositions.push({index: index, value: item});
				});
				var keys = Object.keys(dataset);
				for (var i = 0, len = keys.length; i < len; i++) {
					var key = keys[i];
					var arr = dataset[key];
					if (dataset.hasOwnProperty(key) && Array.isArray(arr)) {
						var sortedArr = arr.map(function(item, index) {
							return arr[dataPositions[index].index];
						});
						dataset[key] = sortedArr;
					}
				}
			}
		},

		getAvailableHeight: function() {
			return this.chart.chartArea.bottom - this.chart.chartArea.top;
		},

		getAvailableWidth: function() {
			return this.chart.chartArea.right - this.chart.chartArea.left;
		},

		getMinHeight: function(values) {
			var availableHeight = this.getAvailableHeight();
			var minHeight = this.chart.options.elements.minHeight;
			while (values.length * minHeight > availableHeight && minHeight !== 0) {
				minHeight--;
			}
			return minHeight;
		},

		getTotalSum: function(values) {
			var totalValue = 0;
			for (var i = 0, ln = values.length; i < ln; i++) {
				totalValue += values[i];
			}
			return totalValue;
		},

		reCalculateValuesForMinValue: function(values, minHeight) {
			var totalSum = this.getTotalSum(values);
			var minValue = (totalSum * minHeight) / this.getAvailableHeight();
			var minValueSum = 0;
			var newMinValueSum = 0;
			var newValues = [];
			for (var i = 0, ln = values.length; i < ln; i++) {
				var value = values[i];
				if (value <= minValue) {
					newMinValueSum += minValue;
					minValueSum += value;
					newValues[i] = minValue;
				}
			}
			var delta = (totalSum - newMinValueSum) / (totalSum - minValueSum);
			//Round to bigger delta to prevent recursion when recalculates.
			delta = Math.ceil(delta * Math.pow(10, 10)) / Math.pow(10, 10);
			var shouldRecalculate = false;
			for (var j = 0, lnj = values.length; j < lnj; j++) {
				if (newValues[j] === undefined) {
					var newValue = values[j] * delta;
					if (newValue < minValue) {
						shouldRecalculate = true;
					}
					newValues[j] = newValue;
				}
			}
			if (shouldRecalculate) {
				return this.reCalculateValuesForMinValue(newValues, minHeight);
			}
			return newValues;
		},

		calculateDrawOptions: function(values) {
			var minHeight = this.getMinHeight(values);
			var chartArea = this.chart.chartArea;
			var availableWidth = this.getAvailableWidth();
			var availableHeight = this.getAvailableHeight();
			var upperWidthCoef = this.chart.options.upperWidth;
			var bottomWidthCoef = this.chart.options.bottomWidth;
			var upperWidth = availableWidth * upperWidthCoef;
			var angleRadian = Math.atan((2 * availableHeight) / (upperWidth - (availableWidth * bottomWidthCoef)));
			var options = [];
			if (minHeight !== 0) {
				values = this.reCalculateValuesForMinValue(values, minHeight);
			}
			var totalSum = this.getTotalSum(values);
			var x = (chartArea.left + chartArea.right)/2;
			var valueHeight = availableHeight / totalSum;
			var currentHeight = 0;
			var currentUpperWidth = upperWidth;
			for (var j = 0, lnj = values.length; j < lnj; j++) {
				var value = values[j];
				var y = chartArea.top + currentHeight;
				var elementHeight = value * valueHeight;
				if (elementHeight < minHeight) {
					elementHeight = minHeight;
				}
				currentHeight += elementHeight;
				var base = chartArea.top + currentHeight;
				var currentBottomWidth = currentUpperWidth - (2 * elementHeight / Math.tan(angleRadian));
				options.push({
					upperWidth: currentUpperWidth,
					bottomWidth: currentBottomWidth,
					x: x,
					y: y,
					base: base
				});
				currentUpperWidth = currentBottomWidth;
			}
			return options;
		},

		update: function update(reset) {
			var chart = this.chart;
			var meta = this.getMeta();
			var elements = meta.data;
			var dataset = this.getDataset();
			var elementsData = [];
			var drawOptions = this.calculateDrawOptions(dataset.data);
			helpers.each(dataset.data, function(value, index) {
				var backgroundColor = helpers.getValueAtIndexOrDefault(dataset.backgroundColor, index);
				elementsData.push({
					orgIndex: index,
					value: value,
					backgroundColor: backgroundColor,
					borderColor: helpers.getValueAtIndexOrDefault(dataset.borderColor, index, backgroundColor),
					label: helpers.getValueAtIndexOrDefault(chart.data.labels, index, dataset.label),
					drawOptions: drawOptions[index]
				});
			});
			this.elementsData = elementsData;
			helpers.each(elements, function (trapezium, index) {
				this.updateElement(trapezium, index, reset);
			}, this);
		},

		updateElement: function updateElement(trapezium, index, reset) {
			var elementData = this.elementsData[index];
			var drawOptions = elementData.drawOptions;
			helpers.extend(trapezium, {
				_datasetIndex: this.index,
				_index: elementData.orgIndex,
				_model: {
					type: "isosceles",
					y: drawOptions.y,
					base: drawOptions.base,
					x: drawOptions.x,
					x1: 0,
					x2: 0,
					upperWidth: reset ? 0 : drawOptions.upperWidth,
					bottomWidth: reset ? 0 : drawOptions.bottomWidth,
					borderWidth: 0,
					backgroundColor: elementData && elementData.backgroundColor,
					borderColor: elementData && elementData.borderColor
				}
			});
			trapezium.pivot();
		},

		updateDataBeforeDraw: function() {
			var selectedItemIndex = this.chart.config.selectedItemIndex;
			var meta = this.getMeta();
			for (var i = 0, ln = meta.data.length; i < ln; i++) {
				var model = meta.data[i]._model;
				if (selectedItemIndex === i) {
					model.additionalWidth = 5;
					model.useShadow = true;
				} else {
					model.additionalWidth = 0;
					model.useShadow = false;
				}
			}
		},

		draw: function(ease) {
			this.updateDataBeforeDraw();
			Chart.DatasetController.prototype.draw.call(this, ease);
			this.drawLabels();
		},

		drawLabels: function() {
			var ctx = this.chart.ctx;
			ctx.textAlign = "center";
			ctx.textBaseline = "top";
			ctx.font = this.chart.options.labelConfig.font;
			ctx.fillStyle = "white";
			helpers.each(this.elementsData, function (value) {
				this.drawLabel(value);
			}, this);
		},

		drawLabel: function(value) {
			var ctx = this.chart.ctx;
			var elementDrawOptions = value.drawOptions;
			var label = Array.isArray(value.label) ? value.label : [value.label];
			var lineHeight = this.chart.options.labelConfig.lineHeight;
			var elementHeight = elementDrawOptions.base - elementDrawOptions.y;
			var maxLines = Math.floor(elementHeight / lineHeight);
			var maxLineWidth = elementDrawOptions.bottomWidth;
			var lines = [];
			label.forEach(function(line) {
				var labelTextWidth = ctx.measureText(line).width;
				if (labelTextWidth > maxLineWidth) {
					var labelLines = this.splitLabelText(line, maxLineWidth, maxLines);
					lines = lines.concat(labelLines);
				} else {
					lines.push(line);
				}
			}, this);
			lines = lines.slice(0, maxLines || 1);
			var linesCount = lines.length;
			var topOffset = (elementHeight - (linesCount * lineHeight)) / 2;
			var x = elementDrawOptions.x;
			for (var i = 0, ln = lines.length; i < ln; i++) {
				var lineText = lines[i];
				var y = (elementDrawOptions.y + topOffset + i * lineHeight) ;
				ctx.fillText(lineText, x, y);
			}
		},

		splitLabelText: function(labelText, maxLineWidth, maxLines) {
			var lines = [""];
			var labelTextCount = labelText.length;
			var currentLineIndex = 0;
			for (var i = 0; i < labelTextCount; i++) {
				var char = labelText.charAt(i);
				if (this.chart.ctx.measureText(lines[currentLineIndex] + char).width > maxLineWidth) {
					currentLineIndex++;
					if (currentLineIndex == maxLines) {
						break;
					}
					lines[currentLineIndex] = char;
				} else {
					lines[currentLineIndex] += char;
				}
			}
			return lines;
		},

		removeHoverStyle: function (trapezium) {
			Chart.DatasetController.prototype.removeHoverStyle.call(this, trapezium, this.chart.options.elements.trapezium);
		}
	});

})(Chart);