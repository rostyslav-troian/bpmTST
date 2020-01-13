Terrasoft.configuration.Structures["RemindingsUtilities"] = {innerHierarchyStack: ["RemindingsUtilities"]};
define("RemindingsUtilities", ["ext-base", "terrasoft", "Reminding", "ServiceHelper"],
		function(Ext, Terrasoft, Reminding, ServiceHelper) {
			function remindingFilters() {
				var filters = Terrasoft.createFilterGroup();
				var currentContactId = Terrasoft.core.enums.SysValue.CURRENT_USER_CONTACT.value;
				filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"Contact", currentContactId));
				filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.LESS_OR_EQUAL,
						"RemindTime", new Date(Ext.Date.now())));
				var workspaceIdFilter = Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"SysEntitySchema.SysWorkspace.Id", Terrasoft.SysValue.CURRENT_WORKSPACE.value);
				filters.add("workspaceIdFilter", workspaceIdFilter);

				// Activity
				var existFilterActivity = Ext.create("Terrasoft.CompareFilter", {
					comparisonType: Terrasoft.ComparisonType.EQUAL,
					leftExpression: Ext.create("Terrasoft.SubQueryExpression", {
						columnPath: "[Activity:Id:SubjectId].Id",
						aggregationType: Terrasoft.AggregationType.COUNT
					}),
					rightExpression: Ext.create("Terrasoft.ParameterExpression", {parameterValue: 0})
				});
				var subFilterActivity = existFilterActivity.leftExpression.subFilters;
				subFilterActivity.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"Status.Finish", true));
				filters.add("activityStatusFinishedFilter", existFilterActivity);
				// Invoice
				var existFilterInvoice = Ext.create("Terrasoft.CompareFilter", {
					comparisonType: Terrasoft.ComparisonType.EQUAL,
					leftExpression: Ext.create("Terrasoft.SubQueryExpression", {
						columnPath: "[Invoice:Id:SubjectId].Id",
						aggregationType: Terrasoft.AggregationType.COUNT
					}),
					rightExpression: Ext.create("Terrasoft.ParameterExpression", {parameterValue: 0})
				});
				var subFilterInvoice = existFilterInvoice.leftExpression.subFilters;
				subFilterInvoice.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"PaymentStatus.FinalStatus", true));
				filters.add("invoiceStatusFinishedFilter", existFilterInvoice);

				return filters;
			}

			function getRemindingSelect() {
				var select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchema: Reminding,
					rowViewModelClassName: "Terrasoft.ViewModelWithMixins"
				});
				select.isDistinct = true;
				select.addColumn("Id");
				select.addColumn("Author");
				select.addColumn("Contact");
				var column = select.addColumn("RemindTime");
				column.orderDirection = Terrasoft.OrderDirection.DESC;
				select.addColumn("Description");
				select.addColumn("SubjectId");
				select.addColumn("Source");
				select.addColumn("SysEntitySchema");
				select.addColumn("SubjectCaption");
				select.addColumn("TypeCaption");
				select.addColumn("[SysSchema:UId:SysEntitySchema].Name", "SchemaName");
				select.filters = remindingFilters();
				return select;
			}

			function getVisaSelect(rowCount) {
				var rCount = !Ext.isEmpty(rowCount) ? rowCount : 40;
				var select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "VwVisa",
					rowCount: rCount
				});
				select.addColumn("Id");
				var column = select.addColumn("CreatedOn");
				column.orderDirection = Terrasoft.OrderDirection.ASC;
				select.addColumn("Title");
				select.addColumn("Objective");
				select.addColumn("VisaOwner");
				select.addColumn("VisaSchemaName");
				select.addColumn("VisaObjectId");
				select.addColumn("VisaSchemaTypeId");
				select.addColumn("VisaTypeName");
				select.addColumn("VisaSchemaCaption");
				select.filters = visaFilters();
				return select;
			}

			function getEmailSelect(rowCount) {
				var rCount = !Ext.isEmpty(rowCount) ? rowCount : 40;
				var select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "Activity",
					isDistinct: true,
					rowCount: rCount
				});
				select.addColumn("Id");
				select.addColumn("Author");
				select.addColumn("Owner");
				select.addColumn("Contact");
				select.addColumn("Sender");
				select.addColumn("Type");
				select.addColumn("MessageType");
				select.addColumn("Title");
				var column = select.addColumn("StartDate");
				column.orderDirection = Terrasoft.OrderDirection.DESC;
				select.addColumn("[ActivityParticipant:Activity:Id].ReadMark");
				select.filters = emailFilters();
				return select;
			}

			function emailFilters() {
				var filters = Terrasoft.createFilterGroup();
				var currentContactId = Terrasoft.core.enums.SysValue.CURRENT_USER_CONTACT.value;
				filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"Type.Id", "E2831DEC-CFC0-DF11-B00F-001D60E938C6"));
				filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"MessageType.Id", "7F9D1F86-F36B-1410-068C-20CF30B39373"));
				filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"[ActivityParticipant:Activity:Id].Participant.Id", currentContactId));
				filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"[ActivityParticipant:Activity:Id].ReadMark", false));
				return filters;
			}

			function visaFilters() {
				var filters = Terrasoft.createFilterGroup();
				var sysAdminUnitId = Terrasoft.core.enums.SysValue.CURRENT_USER.value;
				filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"VisaOwner", sysAdminUnitId));
				filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"Status.IsFinal", false));
				filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"IsCanceled", false));
				return filters;
			}

			function getActivityParticipant(activityId) {
				var select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "ActivityParticipant",
					isDistinct: true
				});
				select.addColumn("Activity.Id");
				select.addColumn("[Contact:Id:Participant].Id", "ContactId");
				select.addColumn("[Contact:Id:Participant].Name", "ContactName");
				var filters = Terrasoft.createFilterGroup();
				filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"Activity.Id", activityId));
				filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"Role.Id", "6A6390C4-A6E1-DF11-971B-001D60E938C6"));
				select.filters = filters;
				return select;
			}

			//ATTENTION: In future may be hidden
			function getRemindingsCountersSelect() {
				var select = Ext.create("Terrasoft.EntitySchemaQuery", {
					rootSchemaName: "VwRemindingsCount"
				});
				select.isDistinct = true;
				select.addColumn("RemindingsCount");
				select.addColumn("EmailsCount");
				select.addColumn("SysAdminUnit");
				var filters = Terrasoft.createFilterGroup();
				var currentContactId = Terrasoft.core.enums.SysValue.CURRENT_USER.value;
				filters.addItem(Terrasoft.createColumnFilterWithParameter(Terrasoft.ComparisonType.EQUAL,
						"SysAdminUnit", currentContactId));
				select.filters = filters;
				return select;
			}

			function getRemindingsCounters(scope, callback) {
				var currentContactId = Terrasoft.core.enums.SysValue.CURRENT_USER.value;
				var currentDate = new Date(Ext.Date.now());
				ServiceHelper.callService(
					"RemindingsDataService",
					"GetRemindingsCount",
					function(response) {
						var responseObject = Terrasoft.decode(response);
						var result = Terrasoft.decode(responseObject.GetRemindingsCountResult);
						var remindingsCount = result.RemindingsCount;
						var emailsCount = result.EmailsCount;
						var visaCount = result.VisaCount;
						var sysAdminUnit = result.SysAdminUnit;
						var esnNotificationsCount = result.ESNNotificationsCount;
						callback.call(scope, {
							remindingsCount: remindingsCount,
							emailsCount: emailsCount,
							visaCount: visaCount,
							sysAdminUnit: sysAdminUnit,
							esnNotificationsCount: esnNotificationsCount
						});
					},
					{
						sysAdminUnitId: currentContactId,
						dueDate: currentDate
					},
					this);
			}

			function getRemindings(scope, callback, config) {
				var currentContactId = Terrasoft.core.enums.SysValue.CURRENT_USER.value;
				var currentDate = new Date(Ext.Date.now());
				var useNotificationsOnOneClassJob = Terrasoft.Features.getIsEnabled("NotificationsOnOneClassJob");
				if (useNotificationsOnOneClassJob) {
					getNotificationInfo(config);
				}
				ServiceHelper.callService(
					"RemindingsDataService",
					"GetPopupConfig",
					function(response) {
						var responseObject = Terrasoft.decode(response);
						var result = Terrasoft.decode(responseObject.GetPopupConfigResult);
						if (Ext.isEmpty(result)) {
							var console = Ext.global.console;
							if (console && console.error) {
								console.error(response);
								return;
							}
						}
						var counters = result.Counter;
						var popupConfig = Terrasoft.decode(result.PopupConfig);
						var remindingsCount = counters.RemindingsCount;
						var notificationsCounts = counters.NotificationCount;
						var emailsCount = counters.EmailsCount;
						var visaCount = counters.VisaCount;
						var sysAdminUnit = counters.SysAdminUnit;
						var esnNotificationsCount = counters.ESNNotificationsCount;
						var esnNotifications = counters.ESNNotifications;
						var anniversariesCount = counters.AnniversariesCount;
						callback.call(scope, {
							remindingsCount: remindingsCount,
							reminders: popupConfig,
							emailsCount: emailsCount,
							visaCount: visaCount,
							sysAdminUnit: sysAdminUnit,
							esnNotificationsCount: esnNotificationsCount,
							esnNotifications: esnNotifications,
							notificationsCount: notificationsCounts,
							anniversariesCount: anniversariesCount
						});
					},
					{
						sysAdminUnitId: currentContactId,
						dueDate: currentDate
					}, this);
			}

			function getNotificationInfo(config, callback, scope) {
				var groupName = config ? config.groupName : null;
				ServiceHelper.callService(
						"NotificationInfoService",
						"PublishNotificationInfo",
						function(response) {
							var publishNotificationInfoResult = response.PublishNotificationInfoResult;
							if (publishNotificationInfoResult.success) {
								if (callback) {
									callback.call(scope || this);
								}
							} else {
								throw new Terrasoft.UnknownException({
									message: publishNotificationInfoResult.errorInfo.message
								});
							}
						},{
							"groupName": groupName
						}, this);
			}

			//ATTENTION: In future may be hidden
			function getCounters(scope, callback) {
				var bq = Ext.create("Terrasoft.BatchQuery");
				bq.add(getRemindingsCountersSelect());
				bq.execute(callback, scope);
			}

			return {
				getCounters: getCounters,
				getRemindingsCounters: getRemindingsCounters,
				getRemindings: getRemindings,
				getRemindingSelect: getRemindingSelect,
				getEmailSelect: getEmailSelect,
				remindingFilters: remindingFilters,
				emailFilters: emailFilters,
				getActivityParticipant: getActivityParticipant,
				getVisaSelect: getVisaSelect,
				visaFilters: visaFilters
			};
		});


