Terrasoft.configuration.Structures["CasePageUtilities"] = {innerHierarchyStack: ["CasePageUtilities"]};
define("CasePageUtilities", ["CasePageUtilitiesResources", "CasesEstimateLabel"],
	function(resources, CasesEstimateLabel) {
		var CasePageUtilitiesClass = this.Ext.define("Terrasoft.configuration.mixins.CasePageUtilities", {

			alternateClassName: "Terrasoft.CasePageUtilities",

			/**
			 * ########## # ########## ###### ##### ####, ### ######### ############ ###########
			 */
			renderCaptionStyle: function() {
				if (CasesEstimateLabel.isCaptionVisible(this)) {
					CasesEstimateLabel.setCaptionStyle(this);
				}
			},

			/**
			 * Planned date change event handler
			 */
			onPlanedDateChanged: function() {
				if (!this.get("Status")) {
					return;
				}
				this.setDateDiff();
				this.renderCaptionStyle();
			},

			/**
			 * ###### ####### ## ####### ### ######## ####### # ##########
			 * @protected
			 * @virtual
			 */
			setDateDiff: function() {
				if (!CasesEstimateLabel.isCaptionVisible(this)) {
					return;
				}
				CasesEstimateLabel.calculateDateDiff("SolutionDate", "SolutionDateCaption",
					"IsSolutionOverdue", this);
			},

			/**
			 * ############# ######## ########## #### # ##### ### ####.##########
			 * @returns {string}
			 */
			getSolutionDateDay: function() {
				var isOverdue = this.get("IsSolutionOverdue");
				return CasesEstimateLabel.setDayDiff("SolutionDateCaption", isOverdue, this);
			},

			/**
			 * ############# ######## ########## ##### ### ####.##########
			 * @returns {string}
			 */
			getSolutionDateMinute: function() {
				return CasesEstimateLabel.getDateMinute("SolutionDateCaption", this);
			},

			/**
			 * ########## ######## ##### ### ####.##########
			 * @returns {boolean|*|*}
			 */
			isSolutionHourVisible: function() {
				return (CasesEstimateLabel.isHourVisible("SolutionDateCaption", this) && this.isSolutionCaptionVisible());
			},

			/**
			 * ########## ######## ##### ### ####.##########
			 * @returns {*|boolean}
			 */
			isSolutionTimerImageVisible: function() {
				return (this.isTimerImageVisible() && this.isSolutionCaptionVisible());
			},

			/**
			 * ########## ######### # ############ #####
			 * @returns {*|boolean}
			 */
			isTimerImageVisible: function() {
				var status = this.get("Status");
				if (!status) {
					return false;
				}
				return !(status.IsPaused || status.IsFinal || status.IsResolved);
			},

			isSolutionCaptionVisible: function() {
				var CaseStatus = this.get("Status");
				var solutionDate = CasesEstimateLabel.isSolutionDate(this);
				return ((CasesEstimateLabel.isCaptionVisible(this) && solutionDate && CaseStatus &&
				(!CaseStatus.IsFinal && !CaseStatus.IsResolved && !CaseStatus.IsPaused)) ||
				(this.get("IsSolutionOverdue") && CasesEstimateLabel.isCaptionVisible(this) && solutionDate));
			},

			getSolutionCaptionPrefix: function() {
				return this.get("IsSolutionOverdue") ?
					this.get("Resources.Strings.DelayHeaderCaptionSuffix") :
					this.get("Resources.Strings.LeftHeaderCaptionSuffix");
			},

			/**
			 * ######### #######, ####### ############# ## ########## ####
			 * @overridden
			 * @private
			 * @param {String} columnName ######## #######
			 * @return {Terrasoft.FilterGroup} ########## ###### ########
			 */
			getLookupQueryFilters: function(columnName) {
				var parentColumnName = this.get("ParentColumnName");
				var parentFilters = this.get(parentColumnName + "Filters");
				var filterGroup = this.callParent([columnName]);
				if (columnName === parentColumnName && parentFilters) {
					filterGroup.add(parentFilters);
				}
				return filterGroup;
			},

			/**
			 * ########## ######### EntitySchemaQuery ### ######### ###### lookup #######
			 * @overridden
			 * @private
			 * @param {String} filterValue ###### ### primaryDisplayColumn
			 * @param {String} columnName ### ####### ViewModel
			 * @param {Boolean} isLookup ####### ########### ####
			 * @return {Terrasoft.EntitySchemaQuery}
			 */
			getLookupQuery: function(filterValue, columnName, isLookup) {
				var parentColumnName = this.get("ParentColumnName");
				var parentFilters = this.get(parentColumnName + "Filters");
				var entitySchemaQuery = this.getLookupQueryParent([filterValue, columnName, isLookup]);
				if (columnName === parentColumnName && parentFilters) {
					entitySchemaQuery.filters.add(parentColumnName + "Filter", parentFilters);
				}
				return entitySchemaQuery;
			},

			updateOriginals: function(isNull) {
				var status = isNull ? null : this.get("Status");
				this.set("OriginalStatus", status);
				if (status) {
					this.set("IsOriginalStatusPaused", status.IsPaused);
				}
				this.set("OriginalSolutionProvidedOn", isNull ? null : this.get("SolutionProvidedOn"));
			},

			/**
			 * ########## ######### EntitySchemaQuery ### ######### ###### lookup #######
			 * @overridden
			 * @private
			 * @param {String} filterValue ###### ### primaryDisplayColumn
			 * @param {String} columnName ### ####### ViewModel
			 * @param {Boolean} isLookup ####### ########### ####
			 * @return {Terrasoft.EntitySchemaQuery}
			 */
			getLookupQueryParent: function(filterValue, columnName, isLookup) {
				var prepareListColumnName = this.get("PrepareListColumnName");
				var prepareListFilters = this.get(prepareListColumnName + "Filters");
				var entitySchemaQuery = this.callParent([filterValue, columnName, isLookup]);
				if (columnName === prepareListColumnName && prepareListFilters) {
					entitySchemaQuery.filters.add(prepareListColumnName + "Filter", prepareListFilters);
				}
				return entitySchemaQuery;
			},

			/**
			 * ############# ##### #########
			 */
			setCaseNumber: function() {
				this.getIncrementCode(function(response) {
					this.set("Number", response);
				});
			},

			/**
			 * ######### ############ ##### "#######" ### "##########"
			 * @param {Function} callback
			 * @param {Terrasoft.BaseSchemaViewModel} scope ######## ########## callback-#######
			 */
			validateAccountOrContactFilling: function(callback, scope) {
				var account = this.get("Account");
				var contact = this.get("Contact");
				var result = {
					success: true
				};
				if (this.Ext.isEmpty(account) && this.Ext.isEmpty(contact)) {
					result.message = this.get("Resources.Strings.RequiredContactOrAccountMessage");
					result.success = false;
				}
				callback.call(scope || this, result);
			},

			/**
			 * ##########, ####### ######### ######## ## ######### ###########.
			 * ### ######## ######### # ######### ########## ########### #### "########### ##########"
			 * @param {Object} status ######### #########
			 */
			handleResolvedStatus: function(status) {
				if (status.IsResolved && !this.get("SolutionProvidedOn")) {
					this.set("SolutionProvidedOn", new Date());
				}
			},

			/**
			 * ####### #### "########### ########", #### ######### #### ######## # ############ # ## ########
			 * @param {Object} status ######### #########
			 */
			clearSolutionProvidedOn: function(status) {
				var previousStatus = this.get("PreviousStatus");
				if (!status.IsFinal && previousStatus.IsResolved && this.get("SolutionProvidedOn")) {
					this.set("SolutionProvidedOn", 0);
				}
			},

			/**
			 * ##########, ####### ######### ######## ## ######### ########.
			 * #### ### ########, ############# ######## # #### "#### ########" # "### ########".
			 * @param {Object} status ######### #########
			 */
			handleFinalStatus: function(status) {
				if (status.IsFinal && !this.get("ClosureDate")) {
					this.set("ClosureDate", new Date());
					if (this.get("OriginalSolutionProvidedOn")) {
						this.set("SolutionProvidedOn", this.get("OriginalSolutionProvidedOn"));
					}
					if (!this.get("ClosureCode")) {
						this.Terrasoft.SysSettings.querySysSettingsItem("CaseClosureCodeDef", function(value) {
							this.set("ClosureCode", value);
						}, this);
					}
				} else {
					this.set("ClosureDate", null);
					this.set("ClosureCode", null);
				}
			},

			/**
			 * ########## ####### ######### ######## ## ######### ######.
			 * ### ######## ######### # ######### ##### #########
			 * @param {Object} status ######### #########
			 */
			handlePausedStatus: function(status) {
				if (status.IsPaused) {
					this.set("SolutionDateGetter", this.get("SolutionDate"));
					this.set("SolutionDate", null);
					if (this.get("IsOriginalStatusPaused") === false && this.get("SolutionDateGetter")) {
						this.calculateRemains(true);
					}
				} else {
					if (this.get("IsOriginalStatusPaused")) {
						this.calculateDateAfterPause(true);
					}
				}
			},

			/**
			 * ########## ####### ######### #### "######".
			 * ### ######## ######### ## ########## ######### # ##### ###### #### "########### #######"
			 * ########### ####### ##### # ########
			 * @protected
			 */
			onStatusChanged: function() {
				var status = this.get("Status");
				if (!status) {
					return;
				}
				if (this.isStatusDef() === false && !this.get("RespondedOn")) {
					this.set("RespondedOn", new Date());
				} else {
					if (this.isStatusDef()) {
						this.set("RespondedOn", null);
					}
				}
				var originalStatus = this.get("OriginalStatus");
				if (!originalStatus) {
					return;
				}
				if (this.isNew || originalStatus !== status) {
					this.handleFinalStatus(status);
					this.handleResolvedStatus(status);
				}

				this.clearSolutionProvidedOn(status);
				this.set("PreviousStatus", status);
			},

			/**
			 * ######### ############# #### "########### #######" # #### ## ### ######## ## ##### ####### ########
			 * @protected
			 * @returns {Boolean}
			 */
			needUpdateRespondedOn: function() {
				return this.get("RespondedOn") && this.changedValues && this.changedValues.RespondedOn;
			},

			/**
			 * ######### ############# #### "########### ##########" # #### ## ### ######## ## ##### ####### ########
			 * @protected
			 * @returns {Boolean}
			 */
			needUpdateSolutionProvidedOn: function() {
				return this.get("SolutionProvidedOn") && this.changedValues && this.changedValues.SolutionProvidedOn;
			},

			/**
			 * ######### ##### ## ######## #### "#########" ######## ##
			 * ######### ######### "######### <### #########> ## #########"
			 * @protected
			 * @returns {Boolean}
			 */
			isStatusDef: function() {
				var status = this.get("Status");
				var statusDefSysSettingsValue = this.get("StatusDefSysSettingsValue");
				if (!status || !statusDefSysSettingsValue) {
					return;
				}
				return statusDefSysSettingsValue.value === status.value;
			}
		});
		return this.Ext.create(CasePageUtilitiesClass);
	});


