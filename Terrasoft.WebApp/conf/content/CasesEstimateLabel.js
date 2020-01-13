Terrasoft.configuration.Structures["CasesEstimateLabel"] = {innerHierarchyStack: ["CasesEstimateLabel"]};
define("CasesEstimateLabel", ["CasesEstimateLabelResources", "ext-base", "terrasoft", "css!CasesEstimateLabel"],
		function(resources, Ext, Terrasoft) {
			/**
			 * Returns a difference between two days.
			 * @param {DateTime} startDate Start date.
			 * @param {DateTime} endDate End date.
			 * @returns {Array} Array [days, hours, minutes, seconds].
			 */
			function dateDiff(startDate, endDate) {
				var date = endDate - startDate;
				var days = parseInt(date / (60 * 60 * 1000 * 24), 10);
				var hours = convertDateElement(parseInt(date / (60 * 60 * 1000), 10) % 24);
				var minutes = convertDateElement(parseInt(date / (1000 * 60), 10) % 60);
				var sec = convertDateElement(parseInt(date / 1000, 10) % 60);
				return [days, hours, minutes, sec];
			}

			/**
			 * ####### ######## ####### ########### # ######## ###########
			 * @param planDate ######## ######### #########
			 * @param attribute ######## ########, # ####### ######## ####### ## #######
			 * @param isOverdue ######## ########, # ####### ######## ####### ########## ## ######## ########
			 * @param scope
			 */
			function calculateDateDiff(planDate, attribute, isOverdue, scope) {
				var result;
				var date = scope.get(planDate);
				var status = scope.get("Status");
				var dateNow = scope.get("CurrentUserDate");
				if (planDate === "SolutionDate" && (status.IsFinal || status.IsResolved)) {
					dateNow = status.IsFinal ? scope.get("ClosureDate") : scope.get("SolutionProvidedOn");
				}
				if (planDate === "ResponseDate") {
					var responsed = scope.get("RespondedOn");
					dateNow = responsed ? responsed : dateNow;
				}
				if (date && dateNow) {
					result = (date > dateNow) ?
							dateDiff(dateNow, date) :
							dateDiff(date, dateNow);
					scope.set(isOverdue, (date < dateNow));
					scope.set(attribute, result);
				}
			}

			/**
			 * ######### ###### # ##### # ######
			 * @param attibute ############## ####### ## ####### ##### ######### ##########
			 * @param isOverdue ######## ########, # ####### ######## ####### ########## ## ######## ########
			 * @param scope
			 * @returns {string}
			 */
			function setDayDiff(attibute, isOverdue, scope) {
				var date = scope.get(attibute);
				if (!isCaptionVisible(scope) || !date) {
					return "";
				}
				var caption = "";
				if (date[0] && date[0] !== "0") {
					var daySuffix = scope.get("Resources.Strings.DaysCaptionSuffix");
					if (parseInt(date[0], 10) > 14) {
						return Ext.String.format("> 14 {0}", daySuffix);
					}
					caption += Ext.String.format("{0}{1} ", date[0], daySuffix);
				}
				caption += date[1];

				return caption;
			}

			function convertDateElement(value) {
				if (value < 10) {
					return "0" + value;
				}
				return value;
			}

			/**
			 * Returns minutes from the attribute containing time difference.
			 * @param {Object} attribute Attribute name.
			 * @param {Object} scope Scope.
			 * @returns {String} Minutes count in a string representation.
			 */
			function getDateMinute(attribute, scope) {
				var date = scope.get(attribute);
				return date ? date[2] : "";
			}

			/**
			 * Specifies whether to display the item.
			 * @param attribute the title attribute, which stores the time difference
			 * @param scope
			 * @returns {boolean|*}
			 */
			function isHourVisible(attribute, scope) {
				var date = scope.get(attribute);
				return (isCaptionVisible(scope) && date && (parseInt(date[0], 10) <= 14));
			}

			/**
			 * Caption label visibility status.
			 * @param {Object} scope scope.
			 * @returns {Boolean} Visibility status.
			 */
			function isCaptionVisible(scope) {
				var status = scope.get("Status");
				if (status && (status.IsResolved || status.IsFinal)) {
					return false;
				}
				var hidden = false;
				var solutionDate = scope.get("SolutionDate");
				var responseDate = scope.get("ResponseDate");
				if (scope.isNew) {
					hidden = !solutionDate && !responseDate;
				}
				return !hidden;
			}

			/**
			 * Sets term label caption styles.
			 * @param {Object} scope.
			 */
			function setCaptionStyle(scope) {
				var pageName = (scope && scope.name) || "PortalCasePage";
				var solutionContainer = Ext.get("SolutionCaptionContainer");
				var responseContainer = Ext.get("ResponseCaptionContainer");
				var solutionCaptionProfileContainer = Ext.get("CasePageSolutionCaptionProfileContainer");
				var portalResponseContainer = Ext.get(pageName + "ResponseCaptionProfileContainer");
				var portalSolutionContainer = Ext.get(pageName + "SolutionCaptionProfileContainer");
				var solutionDate = scope.get("SolutionDate");
				var responseDate = scope.get("ResponseDate");
				var currentUserDate = scope.get("CurrentUserDate");
				setStyle(solutionContainer, "TimerImageContainer", "EstimateSeconds", solutionDate, currentUserDate,
						scope);
				setStyle(solutionCaptionProfileContainer, "TimerImageContainer", "EstimateSeconds", solutionDate,
						currentUserDate, scope);
				setStyle(responseContainer, "ResponseTimerImageContainer", "ResponseEstimateSeconds",
						responseDate, currentUserDate, scope);
				setStyle(portalResponseContainer, "TimerImageContainer", "EstimateSeconds", responseDate, currentUserDate,
						scope);
				setStyle(portalSolutionContainer, "TimerImageContainer", "EstimateSeconds", solutionDate, currentUserDate,
						scope);
			}

			/**
			 * ########### ###### Label
			 * @param containerName #########, # ####### ########## #######
			 * @param imageContainer #########, # ####### ########### ########### #####
			 * @param blinkContainer #########, # ####### ############ ######## #########
			 * @param date ######## ####
			 * @param scope
			 */
			function setStyle(containerName, imageContainer, blinkContainer, date, currentUserDate, scope) {
				var container = Ext.get(containerName);
				if (container) {
					container.removeCls("label-red").removeCls("label-green");
					setColorStyle(container, imageContainer, date, currentUserDate);
					setBlinkStyle(blinkContainer, scope);
				}
			}

			/**
			 * ############# ##### ### ####### ########
			 * @param container #########, # ####### ############ ######## #########
			 * @param scope
			 */
			function setBlinkStyle(container, scope) {
				var seconds = Ext.get(container);
				var status = scope.get("Status");
				if (!seconds) {
					return;
				}
				if (status.IsPaused || status.IsFinal || status.IsResolved || (container === "ResponseEstimateSeconds" &&
						!isNewRequest(scope))) {
					seconds.removeCls("blink");
				} else {
					seconds.removeCls("blink");
					seconds.addCls("blink");
				}
			}

			/**
			 * ########### ##### ### Label # Image
			 * @param labelContainer ######### ### Label
			 * @param imageContainer ######### ### Image
			 * @param date #### #####
			 */
			function setColorStyle(labelContainer, imageContainer, date, currentUserDate) {
				if (!isOverdue(date, currentUserDate)) {
					labelContainer.addCls("label-green");
					setClockImage("green", imageContainer);
				} else {
					labelContainer.addCls("label-red");
					setClockImage("red", imageContainer);
				}
			}

			/**
			 * ######### ########## ## ####
			 * @param date #### ### #########
			 * @returns {boolean}
			 */
			function isOverdue(date, currentUserDate) {
				return date < currentUserDate;
			}

			/**
			 * ############### ########### #######
			 * @param color #### ###########
			 * @param container ######### ###########
			 */
			function setClockImage(color, container) {
				var imageContainer = Ext.get(container);
				var imageConfig = resources.localizableImages.ClockImage;
				if (imageContainer && imageConfig) {
					imageContainer.setStyle("background-image",
						"url(" + Terrasoft.ImageUrlBuilder.getUrl(imageConfig) + ")");
					if (color === "green") {
						imageContainer.setStyle("background-position", "0 0");
					} else {
						imageContainer.setStyle("background-position", "0 16px");
					}
				}
			}

			/**
			 * ########## ###### ###### #########
			 * @param scope
			 * @returns {boolean}
			 */
			function isNewRequest(scope) {
				if (scope.get("RespondedOn")) {
					return false;
				}
				return true;
			}

			function isSolutionDate(scope) {
				if (scope.get("SolutionDate")) {
					return true;
				}
				return false;
			}

			function isResponseDate(scope) {
				if (scope.get("ResponseDate")) {
					return true;
				}
				return false;
			}

			return {
				dateDiff: dateDiff,
				setCaptionStyle: setCaptionStyle,
				isOverdue: isOverdue,
				isNewRequest: isNewRequest,
				calculateDateDiff: calculateDateDiff,
				setDayDiff: setDayDiff,
				getDateMinute: getDateMinute,
				isHourVisible: isHourVisible,
				isCaptionVisible: isCaptionVisible,
				isResponseDate: isResponseDate,
				isSolutionDate: isSolutionDate
			};
		});


