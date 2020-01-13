Terrasoft.configuration.Structures["CaseTermUtilities"] = {innerHierarchyStack: ["CaseTermUtilities"]};
define("CaseTermUtilities", ["CasesEstimateLabel", "FormatUtils"],
		function(CasesEstimateLabel, FormatUtils) {
			/**
			 * @class Terrasoft.configuration.mixins.CaseTermUtilities
			 * Mixin, that implements work with terms on page.
			 */
			Ext.define("Terrasoft.configuration.mixins.CaseTermUtilities", {
				alternateClassName: "Terrasoft.CaseTermUtilities",

				/**
				 * Application and updating css-styles after rerendering component.
				 * @protected
				 * @virtual
				 */
				renderCaptionStyle: function() {
					if (CasesEstimateLabel.isCaptionVisible(this)) {
						CasesEstimateLabel.setCaptionStyle(this);
					}
				},

				/**
				 * After term container rendered.
				 * @protected
				 */
				afterTermContainerRendered: function(containerProperty) {
					this.set(containerProperty, true);
					this.setDateDiff(true);
				},

				/**
				 * Calculation the date difference for Response date and solution date.
				 * @param {Boolean} afterRender Is called after containers render.
				 * @protected
				 */
				setDateDiff: function(afterRender) {
					if (!CasesEstimateLabel.isCaptionVisible(this) && afterRender) {
						return;
					}
					CasesEstimateLabel.calculateDateDiff("ResponseDate", "ResponseDateCaption",
							"IsResponseOverdue", this);
					CasesEstimateLabel.calculateDateDiff("SolutionDate", "SolutionDateCaption",
							"IsSolutionOverdue", this);
				},

				/**
				 * Returns is term container rendered.
				 * @param {Boolean} property Container is rendered model property.
				 * @return {Boolean}
				 * @protected
				 */
				isContainerRendered: function(property) {
					var propertyValue = this.get(property);
					return !this.Ext.isDefined(propertyValue) ||
							this.Ext.isDefined(propertyValue) && propertyValue;
				},

				/**
				 * Solution Date change event handler.
				 * @protected
				 * @virtual
				 */
				onPlanedDateChanged: function() {
					if (!this.get("Status")) {
						return;
					}
					this.setDateDiff();
					this.renderCaptionStyle();
				},

				/**
				 * Sets number of days and time for response date.
				 * @returns {string}
				 */
				getResponseDateDay: function() {
					var isOverdue = this.get("IsResponseOverdue");
					return CasesEstimateLabel.setDayDiff("ResponseDateCaption", isOverdue, this);
				},
				/**
				 * Sets value of remaining minutes for response date.
				 * @returns {string}
				 */
				getResponseDateMinute: function() {
					return CasesEstimateLabel.getDateMinute("ResponseDateCaption", this);
				},

				/**
				 * Displays time.
				 * @returns {boolean|*|*}
				 */
				isResponseHourVisible: function() {
					return (CasesEstimateLabel.isHourVisible("ResponseDateCaption", this) &&
					this.isResponseCaptionVisible());
				},

				/**
				 * Displays image.
				 * @returns {*|boolean}
				 */
				isResponseTimerImageVisible: function() {
					return (this.isTimerImageVisible() && this.isResponseCaptionVisible() &&
					CasesEstimateLabel.isNewRequest(this));
				},

				/**
				 * Gets the value of prefix of response date caption.
				 * @returns {string}
				 */
				getResponseCaptionPrefix: function() {
					return this.get("IsResponseOverdue") ?
							this.get("Resources.Strings.DelayHeaderCaptionSuffix") :
							this.get("Resources.Strings.LeftHeaderCaptionSuffix");
				},

				/**
				 * Displays the value of response date label.
				 * @returns {boolean|*|*}
				 */
				isResponseCaptionVisible: function() {
					var CaseStatus = this.get("Status");
					var responseDate = CasesEstimateLabel.isResponseDate(this);
					return ((CasesEstimateLabel.isCaptionVisible(this) && responseDate && CaseStatus &&
					CasesEstimateLabel.isNewRequest(this)) ||
					(CasesEstimateLabel.isCaptionVisible(this) && this.get("IsResponseOverdue") && responseDate));
				},

				/**
				 * Sets the date and time for Solution Date.
				 * @protected
				 * @returns {string} String line with the days and hours
				 */
				getSolutionDateDay: function() {
					var isOverdue = this.get("IsSolutionOverdue");
					return CasesEstimateLabel.setDayDiff("SolutionDateCaption", isOverdue, this);
				},

				/**
				 * Sets the minutes for Solution Date.
				 * @protected
				 * @returns {string} String line with the minutes
				 */
				getSolutionDateMinute: function() {
					return CasesEstimateLabel.getDateMinute("SolutionDateCaption", this);
				},

				/**
				 * Display hours for Solution Date.
				 * @protected
				 * @returns {Boolean} Hours visibility flag
				 */
				isSolutionHourVisible: function() {
					return (CasesEstimateLabel.isHourVisible("SolutionDateCaption", this) && this.isSolutionCaptionVisible());
				},

				/**
				 * Displays image from Solution Date.
				 * @protected
				 * @returns {Boolean} Timer image and solution caption visibility flag
				 */
				isSolutionTimerImageVisible: function() {
					return (this.isTimerImageVisible() && this.isSolutionCaptionVisible());
				},

				/**
				 * Displays clock container.
				 * @protected
				 * @returns {Boolean} Timer image visibility flag
				 */
				isTimerImageVisible: function() {
					var status = this.get("Status");
					if (!status) {
						return false;
					}
					return !(status.IsPaused || status.IsFinal || status.IsResolved);
				},

				/**
				 * Flag of Solution caption.
				 * @protected
				 * @returns {Boolean} Solution caption visibility flag
				 */
				isSolutionCaptionVisible: function() {
					var CaseStatus = this.get("Status");
					var solutionDate = CasesEstimateLabel.isSolutionDate(this);
					var isSolutionOverdue = this.get("IsSolutionOverdue");
					var isCaptionVisible = CasesEstimateLabel.isCaptionVisible(this);
					var result = ((isCaptionVisible && solutionDate && CaseStatus &&
					(!CaseStatus.IsFinal && !CaseStatus.IsResolved && !CaseStatus.IsPaused)) ||
					(isSolutionOverdue && isCaptionVisible && solutionDate));
					return Ext.isEmpty(result) ? false : result;
				},

				/**
				 * Gets prefix for Solution Date.
				 * @protected
				 * @returns {string} Solution caption
				 */
				getSolutionCaptionPrefix: function() {
					return this.get("IsSolutionOverdue") ?
							this.get("Resources.Strings.DelayHeaderCaptionSuffix") :
							this.get("Resources.Strings.LeftHeaderCaptionSuffix");
				},
				/**
				 * Returns solution date caption value.
				 * @protected
				 * @returns {String}
				 */
				getSolutionCaptionValue: function() {
					var prefix = "";
					var day = this.getSolutionDateDay();
					var minutes = this.getSolutionDateMinute();
					return FormatUtils.getDateCaption(prefix, day, minutes);
				},
				/**
				 * Returns response date caption value.
				 * @protected
				 * @returns {String}
				 */
				getResponseCaptionValue: function() {
					var prefix = "";
					var day = this.getResponseDateDay();
					var minutes = this.getResponseDateMinute();
					return FormatUtils.getDateCaption(prefix, day, minutes);
				},
				/**
				 * Returns Case created on hint.
				 * @protected
				 * @returns {String}
				 */
				getSolutionCaptionHint: function() {
					var prefix = this.getSolutionCaptionPrefix();
					return prefix ? prefix.replace(":", "") : "";
				},
				/**
				 * Returns Case created on hint.
				 * @protected
				 * @returns {String}
				 */
				getResponseCaptionHint: function() {
					var prefix = this.getSolutionCaptionPrefix();
					return prefix ? prefix.replace(":", "") : "";
				},

				/**
				 * InitEntity callback function. Get current user dateTime
				 * @param callback
				 * @param scope
				 */
				initEntityCallback: function(callback, scope) {
					this.getContactTimeAsync(this.Terrasoft.SysValue.CURRENT_USER_CONTACT.value,
							function(response) {
								if (response && response.GetContactTimezoneResult) {
									this.set("CurrentUserDate", this.Terrasoft.utils.date.parseDate(response.GetContactTimezoneResult));
								}
								if (this.Ext.isFunction(callback)) {
									callback.call(scope);
								}
							});
				}
			});
		});


