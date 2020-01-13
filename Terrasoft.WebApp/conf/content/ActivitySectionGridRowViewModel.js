Terrasoft.configuration.Structures["ActivitySectionGridRowViewModel"] = {innerHierarchyStack: ["ActivitySectionGridRowViewModel"]};
define("ActivitySectionGridRowViewModel", ["ext-base", "terrasoft", "BaseSectionGridRowViewModel",
		"CheckModuleDestroyMixin"],
		function(Ext, Terrasoft) {

	/**
	 * @class Terrasoft.configuration.ActivitySectionGridRowViewModel
	 */
	Ext.define("Terrasoft.configuration.ActivitySectionGridRowViewModel", {
		extend: "Terrasoft.BaseSectionGridRowViewModel",
		alternateClassName: "Terrasoft.ActivitySectionGridRowViewModel",

		mixins: ["Terrasoft.CheckModuleDestroyMixin"],

		/**
		 * Debounce save entity function.
		 * Prevents multiple update activity when the fields have changed.
		 * @private
		 * @param {Function} callback Callback function.
		 * @param {Object} scope Callback function context.
		 */
		debounceSaveEntityFunc: Terrasoft.emptyFn,

		/**
		 * ########## ######## ########### ######### ### ######## # ##########.
		 * @return {String} ######## ########### ######### ### ######## # ##########.
		 */
		getScheduleItemHint: function() {
			var timeFormat = Terrasoft.Resources.CultureSettings.timeFormat;
			var startDate = Ext.Date.format(this.get("StartDate"), timeFormat);
			var dueDate = Ext.Date.format(this.get("DueDate"), timeFormat);
			var title = this.get("Title");
			var account = this.get("Account");
			var accountDisplayValue = (account) ? account.displayValue + ": " : "";
			return Ext.String.format("{0}-{1} {2}{3}", startDate, dueDate, accountDisplayValue, title);
		},

		/**
		 * ########## ###### ######## ##########.
		 * @return {Terrasoft.ScheduleItemStatus} ###### ######## ##########.
		 */
		getScheduleItemStatus: function() {
			var isFinished = this.get("Status.Finish");
			var dueDate = this.get("DueDate");
			if (dueDate <= new Date() && !isFinished) {
				return Terrasoft.ScheduleItemStatus.OVERDUE;
			} else if (isFinished) {
				return Terrasoft.ScheduleItemStatus.DONE;
			}
			return Terrasoft.ScheduleItemStatus.NEW;
		},

		/**
		 * ########## ######## ######### ######## # ##########.
		 * @return {String} ######## ######### ######## # ##########.
		 */
		getScheduleItemTitle: function() {
			var title = this.get("Title");
			var account = this.get("Account");
			var accountDisplayValue = (account) ? account.displayValue + ": " : "";
			return Ext.String.format("{0}{1}", accountDisplayValue, title);
		},

		/**
		 * inheritdoc Terrasoft.BaseGridRowViewModel#getEntitySchemaQuery
		 */
		getEntitySchemaQuery: function() {
			var esq = this.callParent(arguments);
			if (!esq.columns.contains("Status.Finish")) {
				esq.addColumn("Status.Finish");
			}
			return esq;
		},

		/**
		 * inheritdoc Terrasoft.BaseViewModel#setColumnValues
		 */
		setColumnValues: function(entity) {
			this.set("Status.Finish", entity.get("Status.Finish"));
			this.callParent(arguments);
		},

		/**
		 * @inheritdoc Terrasoft.BaseViewModel#constructor
		 * @overridden
		 */
		constructor: function() {
			this.callParent(arguments);
			this.debounceSaveEntityFunc = Terrasoft.debounce(this.saveEntity, 500);
		},

		/**
		 * ############ ####### ######### #### "######".
		 * @protected
		 * @param {Date} date ##### ######## ####.
		 */
		onStartDateChanged: function(date) {
			this.set("StartDate", date);
			this.debounceSaveEntityFunc(Terrasoft.emptyFn, this);
		},

		/**
		 * ############ ####### ######### #### "##########".
		 * @protected
		 * @param {Date} date ##### ######## ####.
		 */
		onDueDateChanged: function(date) {
			this.set("DueDate", date);
			this.debounceSaveEntityFunc(Terrasoft.emptyFn, this);
		},

		/**
		 * ############ ####### ######### #### "#########".
		 * @protected
		 */
		onTitleChanged: Terrasoft.emptyFn,

		/**
		 * ############ ####### ######### #### "#########".
		 * @protected
		 */
		onStatusChanged: Terrasoft.emptyFn

	});

	return Terrasoft.ActivitySectionGridRowViewModel;
});


