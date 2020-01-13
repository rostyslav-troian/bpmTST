Terrasoft.configuration.Structures["CallSectionGridRowViewModel"] = {innerHierarchyStack: ["CallSectionGridRowViewModel"]};
define("CallSectionGridRowViewModel", ["CallSectionGridRowViewModelResources", "CtiConstants",
		"BaseSectionGridRowViewModel"],
	function(resources, ctiConstants) {

		/**
		 * @class Terrasoft.configuration.CallSectionGridRowViewModel
		 * ##### ###### ############# ###### ####### "######".
		 */
		Ext.define("Terrasoft.configuration.CallSectionGridRowViewModel", {
			extend: "Terrasoft.BaseSectionGridRowViewModel",
			alternateClassName: "Terrasoft.CallSectionGridRowViewModel",
			Ext: null,
			Terrasoft: null,
			sandbox: null,

			columns: {

				/**
				 * ####### ########### ########### ###### ######.
				 * @type {Boolean}
				 */
				"IsRecordPlayAvailable": {
					dataValueType: Terrasoft.DataValueType.BOOLEAN,
					value: false
				},

				/**
				 * Url ###########.
				 * @type {String}
				 */
				"SourceUrl": {
					dataValueType: Terrasoft.DataValueType.TEXT,
					value: ""
				}
			},

			//region Methods: Private

			/**
			 * ########## ###### ## #######-####### ########## ###########.
			 * @private
			 * @return {Ext.Element} ###### ## #######-#######.
			 */
			getPlayer: function() {
				var recordId = this.get("Id");
				var queryElements = Ext.query("audio[sourceid='" + recordId + "']");
				if (!queryElements) {
					return null;
				}
				var playerElement = Ext.isArray(queryElements) ? queryElements[0] : queryElements;
				if (!playerElement) {
					return null;
				}
				var playerId = playerElement.getAttribute("id");
				return Ext.getCmp(playerId);
			},

			//endregion

			//region Methods: Public

			/**
			 * ########## ############# ###########.
			 * @return {String} ############# ###########.
			 */
			getSourceId: function() {
				return this.get("Id");
			},

			/**
			 * ########### ###### ##########.
			 * @param {Boolean} [autoStartPlay] ####### ############# ######### ########### ##### ##### ######### ######
			 * ## ###### #########.
			 */
			requestCallRecords: function(autoStartPlay) {
				var args = {
					callId: this.get("IntegrationId"),
					callback: this.prepareAudioPlayer.bind(this, autoStartPlay)
				};
				this.sandbox.publish("GetCallRecords", args, [ctiConstants.CallRecordsContextMessageId]);
			},

			/**
			 * ########## ######### ###### ############ ######.
			 * @return {String} ######### ######.
			 */
			getPlayerButtonCaption: function() {
				return resources.localizableStrings.PlayCaption;
			},

			/**
			 * ########## ############ ###### ###### ############ ######.
			 * @return {Object} ############ ######.
			 */
			getPlayerButtonImageConfig: function() {
				return resources.localizableImages.PlayImage;
			},

			/**
			 * ############ ####### ######### ############### ######.
			 */
			onPlaybackEnded: function() {
				this.set("IsRecordPlayAvailable", true);
			},

			/**
			 * ############ ####### ###### ### ############### ######.
			 * @protected
			 * @param {Number} errorCode ### ######.
			 */
			onPlayError: function(errorCode) {
				this.error(Ext.String.format(resources.localizableStrings.PlayErrorMessage, errorCode));
			},

			/**
			 * ############ ####### ######### ####### ##########.
			 * @param {Boolean} autoStartPlay ####### ############# ######### ########### ##### ##### ######### ######
			 * ## ###### #########.
			 * @param {Boolean} canGetCallRecords #######, ### #### ########### ######## ###### ########## ######.
			 * @param {String[]} callRecords ###### ###### ## ###### ########## ######.
			 * @deprecated
			 */
			onGetCallRecords: function(autoStartPlay, canGetCallRecords, callRecords) {
				this.prepareAudioPlayer(autoStartPlay, canGetCallRecords, callRecords);
			},

			/**
			 * ############## ######### ###########.
			 * @param {Boolean} autoStartPlay ####### ############# ######### ########### ##### ##### ######### ######
			 * ## ###### #########.
			 * @param {Boolean} canGetCallRecords #######, ### #### ########### ######## ###### ########## ######.
			 * @param {String[]} callRecords ###### ###### ## ###### ########## ######.
			 */
			prepareAudioPlayer: function(autoStartPlay, canGetCallRecords, callRecords) {
				if (!canGetCallRecords || !Ext.isArray(callRecords) || (callRecords.length === 0) || !callRecords[0]) {
					this.set("IsRecordPlayAvailable", false);
					return;
				}
				this.set({
					"IsRecordPlayAvailable": !autoStartPlay,
					"SourceUrl": callRecords[0]
				});
				if (autoStartPlay === true) {
					var player = this.getPlayer();
					player.setControlsEnabled();
					player.play();
				}
			},

			/**
			 * ############ ####### ####### ###### ############ ######.
			 */
			onRecordPlayerClick: function() {
				var player = this.getPlayer();
				if (!player) {
					return;
				}
				this.requestCallRecords(true);
			}

			//endregion

		});
	});


