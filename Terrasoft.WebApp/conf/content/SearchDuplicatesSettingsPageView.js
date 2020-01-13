Terrasoft.configuration.Structures["SearchDuplicatesSettingsPageView"] = {innerHierarchyStack: ["SearchDuplicatesSettingsPageView"]};
define("SearchDuplicatesSettingsPageView", ["ext-base", "terrasoft", "SearchDuplicatesSettingsPageViewResources"],
		function(Ext, Terrasoft, resources) {

			function generate() {
				var viewConfig = {
					id: "searchDuplicatesSettingsContainer",
					selectors: {
						wrapEl: "#searchDuplicatesSettingsContainer"
					},
					items: [
						{
							className: "Terrasoft.Container",
							id: "SearchDuplicatesSettingsButtonsContainer",
							selectors: {
								wrapEl: "#SearchDuplicatesSettingsButtonsContainer"
							},
							items: [
								{
									className: "Terrasoft.Button",
									id: "acceptButton",
									caption: resources.localizableStrings.OkButtonCaption,
									style: Terrasoft.controls.ButtonEnums.style.GREEN,
									tag: "AcceptButton",
									click: {
										bindTo: "okClick"
									}
								},
								{
									className: "Terrasoft.Button",
									caption: resources.localizableStrings.CancelButtonCaption,
									tag: "CancelButton",
									click: {
										bindTo: "cancelClick"
									}
								}
							]
						},
						{
							className: "Terrasoft.Label",
							caption: resources.localizableStrings.ByPeriodSettingsGroupCaption,
							classes: {
								labelClass: ["t-label dulpicates-settings-label"]
							}
						},
						{
							className: "Terrasoft.Container",
							id: "byPeriodSettingsControlGroup",
							selectors: {
								wrapEl: "#byPeriodSettingsControlGroup"
							},
							items: [
								{
									className: "Terrasoft.Container",
									id: "byPeriodSettingsForAllContainer1",
									items: [
										{
											className: "Terrasoft.Container",
											id: "byPeriodSettingsOnTimeContainer",
											selectors: {
												wrapEl: "#byPeriodSettingsOnTimeContainer"
											},
											items: [
												{
													className: "Terrasoft.Label",
													caption: resources.localizableStrings.DateFromCaption
												},
												{
													className: "Terrasoft.TimeEdit",
													classes: {
														wrapClass: ["datetime-timecontrol"]
													},
													value: {
														bindTo: "onTime"
													},
													markerValue: "StartTime",
													enabled: true
												},
												{
													className: "Terrasoft.Label",
													caption: resources.localizableStrings.WeekCaption
												}
											]
										},
										{
											className: "Terrasoft.Container",
											id: "byPeriodSettingsWeekContainer",
											selectors: {
												wrapEl: "#byPeriodSettingsWeekContainer"
											},
											items: [
												{
													className: "Terrasoft.Container",
													id: "byPeriodSettingsWeekLeftContainer",
													selectors: {
														wrapEl: "#byPeriodSettingsWeekLeftContainer"
													},
													classes: {
														wrapClassName: ["custom-inline"]
													},
													items: [
														{
															className: "Terrasoft.Container",
															id: "byPeriodSettingsIsMondayContainer",
															selectors: {
																wrapEl: "#byPeriodSettingsIsMondayContainer"
															},
															items: [
																{
																	className: "Terrasoft.CheckBoxEdit",
																	tag: "isMonday",
																	checked: {
																		bindTo: "isMonday"
																	},
																	markerValue: "IsMonday",
																	enabled: true
																},
																{
																	className: "Terrasoft.Label",
																	caption: resources.localizableStrings.MondayCaption
																}
															]
														},
														{
															className: "Terrasoft.Container",
															id: "byPeriodSettingsIsTuesdayContainer",
															selectors: {
																wrapEl: "#byPeriodSettingsIsTuesdayContainer"
															},
															items: [
																{
																	className: "Terrasoft.CheckBoxEdit",
																	tag: "isTuesday",
																	checked: {
																		bindTo: "isTuesday"
																	},
																	markerValue: "IsTuesday",
																	enabled: true
																},
																{
																	className: "Terrasoft.Label",
																	caption: resources.localizableStrings.TuesdayCaption
																}
															]
														},
														{
															className: "Terrasoft.Container",
															id: "byPeriodSettingsIsWednesdayContainer",
															selectors: {
																wrapEl: "#byPeriodSettingsIsWednesdayContainer"
															},
															items: [
																{
																	className: "Terrasoft.CheckBoxEdit",
																	tag: "isWednesday",
																	checked: {
																		bindTo: "isWednesday"
																	},
																	markerValue: "IsWednesday",
																	enabled: true
																},
																{
																	className: "Terrasoft.Label",
																	caption: resources.localizableStrings.WednesdayCaption
																}
															]
														},
														{
															className: "Terrasoft.Container",
															id: "byPeriodSettingsIsThursdayContainer",
															selectors: {
																wrapEl: "#byPeriodSettingsIsThursdayContainer"
															},
															items: [
																{
																	className: "Terrasoft.CheckBoxEdit",
																	tag: "isThursday",
																	checked: {
																		bindTo: "isThursday"
																	},
																	markerValue: "IsThursday",
																	enabled: true
																},
																{
																	className: "Terrasoft.Label",
																	caption: resources.localizableStrings.ThursdayCaption
																}
															]
														}
													]
												},
												{
													className: "Terrasoft.Container",
													id: "byPeriodSettingsWeekRightContainer",
													selectors: {
														wrapEl: "#byPeriodSettingsWeekRightContainer"
													},
													classes: {
														wrapClassName: ["custom-inline"]
													},
													items: [
														{
															className: "Terrasoft.Container",
															id: "byPeriodSettingsIsFridayContainer",
															selectors: {
																wrapEl: "#byPeriodSettingsIsFridayContainer"
															},
															items: [
																{
																	className: "Terrasoft.CheckBoxEdit",
																	tag: "isFriday",
																	checked: {
																		bindTo: "isFriday"
																	},
																	markerValue: "IsFriday",
																	enabled: true
																},
																{
																	className: "Terrasoft.Label",
																	caption: resources.localizableStrings.FridayCaption
																}
															]
														},
														{
															className: "Terrasoft.Container",
															id: "byPeriodSettingsIsSaturdayContainer",
															selectors: {
																wrapEl: "#byPeriodSettingsIsSaturdayContainer"
															},
															items: [
																{
																	className: "Terrasoft.CheckBoxEdit",
																	tag: "isSaturday",
																	checked: {
																		bindTo: "isSaturday"
																	},
																	markerValue: "IsSaturday",
																	enabled: true
																},
																{
																	className: "Terrasoft.Label",
																	caption: resources.localizableStrings.SaturdayCaption
																}
															]
														},
														{
															className: "Terrasoft.Container",
															id: "byPeriodSettingsIsSundayContainer",
															selectors: {
																wrapEl: "#byPeriodSettingsIsSundayContainer"
															},
															items: [
																{
																	className: "Terrasoft.CheckBoxEdit",
																	tag: "isSunday",
																	checked: {
																		bindTo: "isSunday"
																	},
																	markerValue: "IsSunday",
																	enabled: true
																},
																{
																	className: "Terrasoft.Label",
																	caption: resources.localizableStrings.SundayCaption
																}
															]
														}
													]
												}
											]
										}
									]
								}
							]
						}
					]
				};
				return viewConfig;
			}

			return {
				generate: generate
			};
		});


