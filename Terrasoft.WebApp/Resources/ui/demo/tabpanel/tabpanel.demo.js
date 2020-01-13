define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			Bindable = {};
			Ext.define("Terrasoft.ViewModel", {
				extend: "Terrasoft.BaseViewModel"
			});
			Ext.define("Terrasoft.DataViewModel", {
				extend: "Terrasoft.BaseViewModel",
				columns: {
					Caption: {
						type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
						caption: "Caption",
						dataValueType: Terrasoft.core.enums.DataValueType.TEXT
					},
					Name: {
						type: Terrasoft.core.enums.ViewModelColumnType.CALCULATED_COLUMN,
						caption: "Name",
						dataValueType: Terrasoft.core.enums.DataValueType.TEXT
					}
				}
			});
			Bindable.model = Ext.create("Terrasoft.ViewModel", {
				values: {
					TabsCollection: new Terrasoft.BaseViewModelCollection(),
					ActiveTabName: "Tab1",
					IsScrollVisible: false
				},
				methods: {
					prepareDataModel: function() {
						var tabsCollection = this.get("TabsCollection");
						var item1 = Ext.create("Terrasoft.DataViewModel", {
							values: {
								Caption: "Tab1",
								Name: "Tab1"
							}
						});
						var item2 = Ext.create("Terrasoft.DataViewModel", {
							values: {
								Caption: "Tab2",
								Name: "Tab2"
							}
						});
						var item3 = Ext.create("Terrasoft.DataViewModel", {
							values: {
								Caption: "Tab3",
								Name: "Tab3"
							}
						});
						var item4 = Ext.create("Terrasoft.DataViewModel", {
							values: {
								Caption: "Tab4",
								Name: "Tab4"
							}
						});
						var item5 = Ext.create("Terrasoft.DataViewModel", {
							values: {
								Caption: "Tab5",
								Name: "Tab5"
							}
						});
						var item6 = Ext.create("Terrasoft.DataViewModel", {
							values: {
								Caption: "Tab6",
								Name: "Tab6"
							}
						});
						var item7 = Ext.create("Terrasoft.DataViewModel", {
							values: {
								Caption: "Tab7",
								Name: "Ta7"
							}
						});
						var item8 = Ext.create("Terrasoft.DataViewModel", {
							values: {
								Caption: "Tab8",
								Name: "Tab8"
							}
						});
						tabsCollection.add(tabsCollection.getUniqueKey(), item1);
						tabsCollection.add(tabsCollection.getUniqueKey(), item2);
						tabsCollection.add(tabsCollection.getUniqueKey(), item3);
						tabsCollection.add(tabsCollection.getUniqueKey(), item4);
						tabsCollection.add(tabsCollection.getUniqueKey(), item5);
						tabsCollection.add(tabsCollection.getUniqueKey(), item6);
						tabsCollection.add(tabsCollection.getUniqueKey(), item7);
						tabsCollection.add(tabsCollection.getUniqueKey(), item8);
					},
					loadData: function() {
						this.prepareDataModel();
					}
				}
			});
			Ext.create("Terrasoft.Button", {
				renderTo: renderTo,
				handler: function() {
					Bindable.model.set("IsScrollVisible", !Bindable.model.get("IsScrollVisible"))
				},
				style: Terrasoft.controls.ButtonEnums.style.BLUE,
				caption: "Show/hide scroll",
				width: "10em"
			});
			var button = Ext.create("Terrasoft.Button", {
				style: Terrasoft.controls.ButtonEnums.style.BLUE,
				caption: "Tool",
				width: "4em"
			});
			DemoTabPanel = Ext.create("Terrasoft.TabPanel", {
				tabs: {
					bindTo: "TabsCollection"
				},
				activeTabName: {
					bindTo: "ActiveTabName"
				},
				isScrollVisible: {
					bindTo: "IsScrollVisible"
				},
				items: [button]
			});
			DemoTabPanel.bind(Bindable.model);
			Bindable.model.prepareDataModel();
			DemoTabPanel.render(renderTo);
		}
	}
});