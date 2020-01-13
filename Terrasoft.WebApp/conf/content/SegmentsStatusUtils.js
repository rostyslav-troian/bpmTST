Terrasoft.configuration.Structures["SegmentsStatusUtils"] = {innerHierarchyStack: ["SegmentsStatusUtils"]};
define("SegmentsStatusUtils",
		function() {
			var SegmentsStatusUtilsClass = Ext.define("Terrasoft.configuration.SegmentsStatusUtils", {

				alternateClassName: "Terrasoft.SegmentsStatusUtils",

				/*
				 * ##### ##### ####### ############ ######### ## ########## ######.
				 */
				timeoutBeforeUpdate: 2000,

				/*
				 * ######### ####### ########## ###### ##### # ######.
				 * @param scope (Object) ######.
				 * @param entitySchemaName (String) ######## ######## ### ####### ########### ###### #####.
				 * @param setCampaignFirstStep {Object} #######, ### ##### ########## ###### ### ### ########.
				 */
				updateContactList: function(scope, entitySchemaName, setCampaignFirstStep) {
					var isSetCampaignFirstStep = (typeof setCampaignFirstStep !== 'undefined') ? setCampaignFirstStep : false;
					var masterRecordId = scope.get("MasterRecordId");
					scope.callService({
						serviceName: "MandrillService",
						methodName: "UpdateTargetAudience",
						data: {schemaName: entitySchemaName, recordId: masterRecordId, isSetCampaignFirstStep: isSetCampaignFirstStep}
					}, function() {
						setTimeout(function() {
							scope.sandbox.publish("DetailChanged", {}, [scope.sandbox.id]);
							scope.reloadGridData();
						}, this.timeoutBeforeUpdate);
					}, scope);
				}
			});

			return Ext.create(SegmentsStatusUtilsClass);
		});


