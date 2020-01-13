Terrasoft.configuration.Structures["FixedSectionGridCaptionsPlugin"] = {innerHierarchyStack: ["FixedSectionGridCaptionsPlugin"]};
define("FixedSectionGridCaptionsPlugin", ["sandbox"], function(sandbox) {
	Ext.define("Terrasoft.FixedSectionGridCaptionsPlugin", {
		sandbox: Ext.create(sandbox),
		/**
		 * Checks that fixed section grid captions should be enabled.
		 * @protected
		 */
		isEnabledFixedSectionGridCaptions: function() {
			return Terrasoft.Features.getIsEnabled("FixedSectionGridCaptions");
		},

		/**
		 * Checks possibility captions container updates.
		 * @protected
		 */
		canUpdateGridCaptionsContainer: function() {
			var analyticsContainerEl = Ext.select("#AnalyticsGridLayoutContainer").elements[0];
			var historyState = this.sandbox.publish("GetHistoryState") || {};
			var state = historyState.state || {};
			var operation = state.operation || "";
			return this.isEnabledFixedSectionGridCaptions() &&
				operation === "" && (!analyticsContainerEl || analyticsContainerEl.offsetHeight === 0);
		},

		/**
		 * Updates width and position of the captions container element in the section grid.
		 * @public
		 */
		updateGridCaptionsContainer: function() {
			var canUpdate = this.canUpdateGridCaptionsContainer();
			if (!canUpdate) {
				return;
			}
			var rightSectionContainerSelector = "#RightSectionContainer";
			var gridCaptions = Ext.select(rightSectionContainerSelector + " .grid-captions").elements[0];
			var gridRow = Ext.select(rightSectionContainerSelector + " .grid-listed-row, "
				+ rightSectionContainerSelector + " .grid-active-selectable").elements[0];
			var utilsContainer =
			Ext.select(rightSectionContainerSelector + " .utils-container-wrapClass").elements[0];
			if (!gridCaptions || !gridRow || !utilsContainer) {
				return;
			}
			var utilsContainerBoundingRect = utilsContainer.getBoundingClientRect();
			Ext.get(gridCaptions).setStyle({
				top: (utilsContainerBoundingRect.top + utilsContainerBoundingRect.height) + "px",
				width: gridCaptions.parentElement.clientWidth + "px",
				position: "fixed"
			});
			var gridList = Ext.select(rightSectionContainerSelector + " .grid.grid-listed").elements[0];
			Ext.get(gridList).setStyle({
				paddingTop: gridCaptions.clientHeight + "px"
			})
		},

		/**
		 * Subscribes on window "scroll" event by updating grid captions.
		 * @public
		 */
		subscribeUpdateGridCaptionsContainer: function() {
			if (!this.isEnabledFixedSectionGridCaptions()) {
				return;
			}
			var updateDelay = 200;
			var updateDebounceFn = Terrasoft.debounce(this.updateGridCaptionsContainer.bind(this), updateDelay);
			Ext.EventManager.addListener(window, "scroll", updateDebounceFn, this);
		},

		constructor: function() {
			var messages = {
				"GetHistoryState": {
					mode: Terrasoft.MessageMode.PTP,
					direction: Terrasoft.MessageDirectionType.PUBLISH
				}
			};
			this.sandbox.registerMessages(messages);
		}
	});

	return Ext.create("Terrasoft.FixedSectionGridCaptionsPlugin");
});


