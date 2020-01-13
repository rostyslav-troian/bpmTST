Terrasoft.configuration.Structures["ChangeProjectDates"] = {innerHierarchyStack: ["ChangeProjectDates"]};
define("ChangeProjectDates", ["ModalBox", "ChangeProjectDatesResources", "ProjectServiceHelper"],
	function(ModalBox, resources, ProjectServiceHelper) {
	/**
	 * @class Terrasoft.configuration.ChangeProjectDates
	 * ##### ChangeProjectDates ############ ### ######## ###### ### ##### # ########
	 */
	Ext.define("Terrasoft.configuration.ChangeProjectDates", {
		alternateClassName: "Terrasoft.ChangeProjectDates",
		extend: "Terrasoft.BaseModule",

		Ext: null,
		sandbox: null,
		Terrasoft: null,

		modalBoxSize: {
			minHeight : "1",
			minWidth : "1",
			maxHeight : "100",
			maxWidth : "100"
		},

		viewModel: null,

		modalBoxContainer: null,

		modalFixedContainer: null,

		generateViewModel: function() {
			var viewModelConfig = {
				name: "ChangeProjectDatesViewModel",
				methods: {
					onSaveButtonClick: function() {
						if (this.validate()) {
							var cardInfo = this.sandbox.publish("CardModuleEntityInfo", null, [this.sandbox.id]);
							var records = cardInfo.records;
							this.detailSandboxid = cardInfo.callerSandboxId;
							var daysCount = this.get("days") * this.get("direction");
							ProjectServiceHelper.changeProjectDates(records, daysCount, this.onSaved, this);
						}
					},
					onSaved: function() {
						this.sandbox.publish("UpdateDetail", {
							reloadAll: true
						}, [this.detailSandboxid]);
						ModalBox.close();
					},
					onCancelButtonClick: function() {
						ModalBox.close();
					},
					validate: function() {
						var result = true;
						var days = this.get("days");
						if (days > 10000) {
							this.showInformationDialog(resources.localizableStrings.TooManyDays);
							result = false;
						}
						if (days < 1) {
							result = false;
						}
						return result;
					}

				},
				columns: {
					direction: {
						type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
						name: "direction",
						dataValueType: Terrasoft.DataValueType.BOOLEAN
					},
					days: {
						type: Terrasoft.core.enums.ViewModelSchemaItem.ATTRIBUTE,
						name: "days",
						dataValueType: Terrasoft.DataValueType.INTEGER,
						isRequired: true
					}
				},
				validationConfig: {
					days: [
						function(value) {
							var result = { invalidMessage: "" };
							if (!isFinite(value) || value < 1) {
								result.invalidMessage = resources.localizableStrings.DaysCountValidation;
							}
							return result;
						}
					]
				},
				values: {
					direction: 1,
					days: 1
				}
			};
			var viewModel = Ext.create("Terrasoft.BaseViewModel", viewModelConfig);
			viewModel.Ext = this.Ext;
			viewModel.sandbox = this.sandbox;
			viewModel.Terrasoft = this.Terrasoft;
			return viewModel;
		},

		generateHeaderView: function() {
			var header = {
				className: "Terrasoft.Label",
				caption: resources.localizableStrings.ChangeElementDates,
				labelClass: "t-label change-dates-header"
			};
			var save = {
				className: "Terrasoft.Button",
				caption: resources.localizableStrings.Save,
				markerValue: resources.localizableStrings.Save,
				click: { bindTo: "onSaveButtonClick" },
				style: "GREEN",
				classes: { textClass: "save" }
			};
			var cancel = {
				className: "Terrasoft.Button",
				caption: resources.localizableStrings.Cancel,
				click: { bindTo: "onCancelButtonClick" }
			};
			var service = {
				id: "service",
				items: [save, cancel],
				className: "Terrasoft.Container",
				selectors: { wrapEl: "#service" },
				classes: { wrapClassName: "service" }
			};
			return Ext.create("Terrasoft.Container", {
				id: "changeDatesHeaderContainer",
				selectors: { wrapEl: "#changeDatesHeaderContainer" },
				classes: { wrapClass: ["container-change-dates-page-fixed"] },
				items: [header, service]
			});
		},

		generateView: function() {
			var text = {
				className: "Terrasoft.Label",
				caption: resources.localizableStrings.ChangeSelectedDates,
				labelClass: "t-label text"
			};
			var forwardCaption = {
				className: "Terrasoft.Label",
				caption: resources.localizableStrings.MoveForward,
				labelClass: "t-label caption"
			};
			var forward = {
				className: "Terrasoft.RadioButton",
				tag: 1,
				checked: { bindTo: "direction" }
			};
			var forwardContainer = {
				id: "forward",
				items: [forward, forwardCaption],
				className: "Terrasoft.Container",
				selectors: { wrapEl: "#forward" },
				classes: { wrapClassName: "forward" }
			};
			var backwardCaption = {
				className: "Terrasoft.Label",
				caption: resources.localizableStrings.MoveBack,
				labelClass: "t-label caption"
			};
			var backward = {
				className: "Terrasoft.RadioButton",
				tag: -1,
				checked: { bindTo: "direction" }
			};
			var backwardContainer = {
				id: "backward",
				items: [backward, backwardCaption],
				className: "Terrasoft.Container",
				selectors: { wrapEl: "#backward" }
			};
			var caption = {
				className: "Terrasoft.Label",
				caption: resources.localizableStrings.DaysCount,
				labelClass: "t-label daysControlCaption"
			};
			var value = {
				className: "Terrasoft.BaseEdit",
				value: { bindTo: "days" },
				classes: { wrapClass: "value" }
			};
			var daysCount = {
				id: "days",
				items: [caption, value],
				className: "Terrasoft.Container",
				classes: { wrapClassName: "daysControlContainer" },
				selectors: { wrapEl: "#days" }
			};

			return Ext.create("Terrasoft.Container", {
				id: "changeDatesContentContainer",
				selectors: {
					wrapEl: "#changeDatesContentContainer"
				},
				items: [
					text,
					forwardContainer,
					backwardContainer,
					daysCount
				]
			});
		},

		prepareModalBox: function() {
			this.modalBoxContainer = ModalBox.show(this.modalBoxSize);
			ModalBox.setSize(313, 340);
			this.modalFixedContainer = ModalBox.getFixedBox();
		},

		init: function() {
			if (!this.viewModel) {
				this.viewModel = this.generateViewModel();
			}
			var view = this.generateView();
			var headerView = this.generateHeaderView();
			view.bind(this.viewModel);
			headerView.bind(this.viewModel);
			this.prepareModalBox();
			view.render(this.modalBoxContainer);
			headerView.render(this.modalFixedContainer);
		}
	});
	return Terrasoft.ChangeProjectDates;
});


