<%@ Page Language="C#" CodeBehind="WorkspaceExplorerModule.aspx.cs" Inherits="Terrasoft.WebApp.WorkspaceExplorerModule" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<style id="SearchValueStyle">
		#SearchValue {
			font-size: 13px;
		}
		#SearchValue.x-form-text {
			padding-top: 1px;
		}
	</style>
	<script language="javascript" type="text/javascript">

		function onSearchStartWithClick() {
			if (SearchStartWith.checked) {
				onSearchButtonClientClick();
			}
		}

		function onSearchEqualClick() {
			if (SearchEqual.checked) {
				onSearchButtonClientClick();
			}
		}

		function onSearchContainsClick() {
			if (SearchContains.checked) {
				onSearchButtonClientClick();
			}
		}

		function onFileUploaded() {
			Ext.EventManager.un(this, 'beforeunload', onFileUploaded);
			Terrasoft.AjaxMethods.CheckImportSchemaVersion();
		}

		function onSqlFileUploaded() {
			Ext.EventManager.un(this, 'beforeunload', onSqlFileUploaded);
			Terrasoft.AjaxMethods.ImportSqlFile();
		}

		function onSearchButtonClientClick(e) {
			ToolButtonClearSearch.show();
			Terrasoft.AjaxMethods.RefreshDataOnSelectedElementsTab();
		}

		function onClearSearchValue(e) {
			SearchValue.setValue('');
			ToolButtonClearSearch.hide();
			SearchValue.getEl().removeClass('x-qf-text');
			Terrasoft.AjaxMethods.RefreshDataOnSelectedElementsTab();
		}

		function onActionsGridLookupValueClick(primaryColumnValue, columnName, value, ctrlKey) {
			var controlId = Ext.util.JSON.decode(primaryColumnValue);
			var control = Ext.getCmp(controlId);
			if (control) {
				if (control.enabled) {
					Terrasoft.AjaxMethods.ActionsGridOnLookupValueClick(primaryColumnValue, columnName, value, ctrlKey);
				}
			}
		}

		function onSearchValueSpecialKey(el, e) {
			var key = e.getKey();
			startText = SearchValue.startValue;
			text = SearchValue.getValue();
			var showToolButton = true;
			var refreshData = true;
			var keyHandled = false;
			switch (key) {
				case e.ENTER:
					keyHandled = true;
					showToolButton = Ext.isEmpty(text) ? false : true;
					break;
				case e.ESC:
					keyHandled = true;
					showToolButton = false;
					refreshData = !Ext.isEmpty(startText);
					SearchValue.setValue('');
					break;
			}
			if (keyHandled === true) {
				if (showToolButton === true) {
					ToolButtonClearSearch.show();
					SearchValue.getEl().addClass('x-qf-text');
				} else {
					ToolButtonClearSearch.hide();
					SearchValue.getEl().removeClass('x-qf-text');
				}
				if (refreshData === true) {
					Terrasoft.AjaxMethods.RefreshDataOnSelectedElementsTab();
				}
			}
		}

		function onComponentsSearchSpecialKey(el, e) {
			var key = e.getKey();
			text = psdComponentsSearch.getValue();
			var oneList = ActionsMenuPanel.oneList;
			switch (key) {
				case e.ENTER:
					var restoreMenu = Ext.isEmpty(text) ? (oneList ? true : false) : false;
					var buildOneList = Ext.isEmpty(text) ? false : (oneList ? false : true);
					var addCssClass = Ext.isEmpty(text) ? false : true;
					var removeCssClass = Ext.isEmpty(text) ? true : false;
					var filter = Ext.isEmpty(text) ? false : true;
					var showSearchToolButton = Ext.isEmpty(text) ? false : true;
					break;
				case e.ESC:
					var restoreMenu = oneList ? true : false;
					var buildOneList = false;
					var addCssClass = false;
					var removeCssClass = oneList ? true : false;
					var filter = false;
					var showSearchToolButton = false;
					psdComponentsSearch.setValue('');
					break;
				default:
					return;
			}
			if (restoreMenu) {
				ActionsMenuPanel.removeFilter();
				ActionsMenuPanel.restoreMenu();
			}
			if (buildOneList) {
				ActionsMenuPanel.buildOneLevelMenu();
			}
			if (showSearchToolButton) {
				psdToolButtonClearSearch.show();
			} else {
				psdToolButtonClearSearch.hide();
			}
			if (addCssClass) {
				psdComponentsSearch.getEl().addClass('x-qf-text');
			}
			if (removeCssClass) {
				psdComponentsSearch.getEl().removeClass('x-qf-text');
			}
			if (filter) {
				ActionsMenuPanel.setFilter(function(item) {
					if (item instanceof Ext.menu.Separator) {
						return false;
					}
					if (item.caption.toLowerCase().search(text.toLowerCase()) != -1 ||
						item.tag.toLowerCase().search(text.toLowerCase()) != -1) {
						return true;
					}
					return false;
				});
			}
		}

		function rebuildControlsTree(isAdvanced) {
			psdComponentsMenuPanel.rebuild(function(item) {
				if (item instanceof Ext.menu.Separator) {
					return true;
				}
				return isAdvanced ? true : item.usageType == 'General';
			});
		}

		function hideComponentsGroups(menuItem) {
			CollapseGroups.setDisabled(!menuItem.checked);
			ExpandGroups.setDisabled(!menuItem.checked);
			if (psdComponentsSearch.getValue() != '') {
				return;
			}
			if (menuItem.checked) {
				psdComponentsMenuPanel.restoreMenu();
			} else {
				psdComponentsMenuPanel.buildOneLevelMenu(false);
			}
		}

		function onClearActionsSearchValue(e) {
			psdComponentsSearch.setValue('');
			psdToolButtonClearSearch.hide();
			ActionsMenuPanel.removeFilter();
			ActionsMenuPanel.restoreMenu();
			psdComponentsSearch.getEl().removeClass('x-qf-text');
		}

		function isReadOnlyOnCheck(el) {
			if ((typeof PackageDependenciesDiagram) == "undefined") {
				return;
			}
			PackageDependenciesDiagram.scriptableObject.IsReadOnly = el.checked;
		}

		function canMoveItemsByResizedItemOnCheck(el) {
			if ((typeof PackageDependenciesDiagram) == "undefined") {
				return;
			}
			PackageDependenciesDiagram.scriptableObject.CanMoveItemsByResizedItem = el.checked;
		}

		function showOutgoingLinkAnimationOnCheck(el) {
			if ((typeof PackageDependenciesDiagram) == "undefined") {
				return;
			}
			PackageDependenciesDiagram.scriptableObject.ShowOutgoingLinkAnimation = el.checked;
		}

		function showIncomingLinkAnimationOnCheck(el) {
			if ((typeof PackageDependenciesDiagram) == "undefined") {
				return;
			}
			PackageDependenciesDiagram.scriptableObject.ShowIncomingLinkAnimation = el.checked;
		}

		function onAssemblyFileUploaded() {
			Ext.EventManager.un(this, 'beforeunload', onAssemblyFileUploaded);
			Terrasoft.AjaxMethods.AddPackageAssembly();
		}

		function onSqlScriptChanged() {
			Ext.EventManager.un(this, 'beforeunload', onSqlScriptChanged);
			var sqlScriptGrid = Ext.getCmp('SqlScriptGrid');
			sqlScriptGrid.refreshData();
		}

		function onSchemaDataChanged() {
			Ext.EventManager.un(this, 'beforeunload', onSchemaDataChanged);
			var schemaDataGrid = Ext.getCmp('SchemaDataGrid');
			schemaDataGrid.refreshData();
		}

		function onSchemaChanged() {
			Ext.EventManager.un(this, 'beforeunload', onSchemaChanged);
			var schemaGrid = Ext.getCmp('SchemaGrid');
			schemaGrid.refreshData();
		}

		function onRefreshDataGrids() {
			Ext.EventManager.un(this, 'beforeunload', onRefreshDataGrids);
			var schemaGrid = Ext.getCmp('SchemaGrid');
			schemaGrid.refreshData();
			var packageTree = Ext.getCmp('PackageTree');
			packageTree.refreshData();
			var assemblyGrid = Ext.getCmp('AssemblyGrid');
			assemblyGrid.refreshData();
			var sqlScriptGrid = Ext.getCmp('SqlScriptGrid');
			sqlScriptGrid.refreshData();
			var schemaDataGrid = Ext.getCmp('SchemaDataGrid');
			schemaDataGrid.refreshData();
		}

		function confirmDeleteSchema(scope) {
			var stringList = Ext.StringList('WebApp.Common');
			var schemaGrid = Ext.getCmp('SchemaGrid');
			var managerName = schemaGrid.dataSource.activeRow.getColumnValue('ManagerName');
			if (managerName === 'ProcessSchemaManager') {
				return Ext.MessageBox.ajaxEventConfirm(scope,
					stringList.getValue('Message.Confirm'),
					stringList.getValue('Message.DeleteProcessSchemaConfirm'));
			} else {
				return Ext.MessageBox.ajaxEventConfirm(scope,
					stringList.getValue('Message.Confirm'),
					stringList.getValue('Message.DeleteRecordConfirm'));
			}
		}

		function onDesignerLoaded() {
			PackageDependenciesDiagram.on("messagereceived", onMessageReceived);
		}

		function onMessageReceived(event) {
			var message = event.request.message;
			if (message === "GetMetaData") {
				var schemaMetaData = PackageDependenciesDiagram.schemaMetaData;
				var requestJson = {
					message: "ReadMetaData",
					metaData: schemaMetaData.metaData,
					resources: schemaMetaData.resources
				};
				var diagramWindow = PackageDependenciesDiagram.getWin();
				var request = Ext.encode(requestJson);
				diagramWindow.postMessage(request, window.location.origin);
			}
		}

		/*function UpdateMovePackageElementsMenuItem(moveMenuItem) {
			var menu = moveMenuItem.getMenu();
			var selectedPackageId = SysPackageDataSource.activeRow.columns["Id"];
			var items = menu.items.items;
			var index;
			for (index = 0; index < items.length; index++) {
				item = items[index];
				var isVisible = item.tag !== selectedPackageId;
				menu.setVisibleByIndex(index, isVisible)
			}
		}

		function onShowMovePackagesMenu(el) {
			UpdateMovePackageElementsMenuItem(MovePackagesMenuItem);
		}

		function onShowSchemaMenuItem(el) {
			UpdateMovePackageElementsMenuItem(MoveSchemaMenuItem);
		}

		function onShowMoveAssemblyMenu(el) {
			UpdateMovePackageElementsMenuItem(MoveAssemblyMenuItem);
		}

		function onShowMoveSqlScriptMenu(el) {
			UpdateMovePackageElementsMenuItem(MoveSqlScriptMenuItem);
		}

		function onShowMoveSchemaDataMenu(el) {
			UpdateMovePackageElementsMenuItem(MoveSchemaDataMenuItem);
		}*/

	</script>
	<script text="hot-keys" language="javascript" type="text/javascript">

		function getIsGridEvent(event) {
			return (event.target.className.indexOf("x-treegrid-focus") !== -1);
		}

		function getIsEnterKeyDown(event) {
			return (!event.ctrlKey && !event.shiftKey && event.keyCode === event.ENTER);
		}

		function showConfirmMessageBox(caption, message, callback) {
			return Ext.MessageBox.confirm(caption,
				message,
				function(button) {
					if (button === "yes") {
						callback();
					}
				});
		}

		function confirmDeleteGridItemByHotKey(callback) {
			var stringList = Ext.StringList("WebApp.Common");
			var caption = stringList.getValue("Message.Confirm");
			var message = stringList.getValue("Message.DeleteRecordConfirm");
			return showConfirmMessageBox(caption, message, callback);
		}

		function confirmDeleteSchemaByHotKey(callback) {
			var stringList = Ext.StringList("WebApp.Common");
			var schemaGrid = Ext.getCmp("SchemaGrid");
			var caption = stringList.getValue("Message.Confirm");
			var message = stringList.getValue("Message.DeleteRecordConfirm");
			var managerName = schemaGrid.dataSource.activeRow.getColumnValue("ManagerName");
			if (managerName === "ProcessSchemaManager") {
				message = stringList.getValue("Message.DeleteProcessSchemaConfirm");
				return showConfirmMessageBox(caption, message, callback);
			} else {
				return showConfirmMessageBox(caption, message, callback);
			}
		}

		function subscribeOnKeyDownEvents() {
			Ext.getDoc().on("keydown", onKeyDown, this);
			Ext.getCmp("SchemaGrid").on("keydown", onSchemaGridKeyDown, this);
			Ext.getCmp("SqlScriptGrid").on("keydown", onSqlScriptKeyDown, this);
			Ext.getCmp("SchemaDataGrid").on("keydown", onSchemaDataKeyDown, this);
			Ext.getCmp("PackageTree").on("keydown", onPackageTreeKeyDown, this);
			Ext.getCmp("AssemblyGrid").on("keydown", onAssemblyGridKeyDown, this);
		}

		function addHotKeyCaption(elementId, hotKey) {
			var element = Ext.getCmp(elementId);
			if (element) {
				element.setCaption(element.caption + " (" + hotKey + ")");
			}
		}

		function addHotKeysCaption() {
			addHotKeyCaption("SearchButton", "Ctrl+Shift+F");
			addHotKeyCaption("EditSchema", "Enter");
			addHotKeyCaption("DeleteSchema", "Delete");
			addHotKeyCaption("EditPageMenuItem", "Enter");
			addHotKeyCaption("EditClientUnitSchemaMenuItem", "Ctrl+Enter");
			addHotKeyCaption("DeletePageMenuItem", "Delete");
			addHotKeyCaption("SchemaDataEditMenuItem", "Enter");
			addHotKeyCaption("SchemaDataDeleteMenuItem", "Delete");
			addHotKeyCaption("SqlScriptEditMenuItem", "Enter");
			addHotKeyCaption("SqlScriptDeleteMenuItem", "Delete");
			addHotKeyCaption("AssemblyDeleteMenuItem", "Delete");
			addHotKeyCaption("DeletePackageAssemblyButton", "Delete");
			addHotKeyCaption("EditSchemaDataButton", "Enter");
			addHotKeyCaption("DeleteSchemaDataButton", "Delete");
			addHotKeyCaption("EditSqlScriptButton", "Enter");
			addHotKeyCaption("DeleteSqlScriptButton", "Delete");
			addHotKeyCaption("SourceMenuItem", "Ctrl+K");
			addHotKeyCaption("MetaDataMenuItem", "Ctrl+M");
			addHotKeyCaption("PackageEditMenuItem", "Enter");
			addHotKeyCaption("PackageDeleteMenuItem", "Delete");
			addHotKeyCaption("PackageUpdateMenuItem", "Ctrl+Shift+U");
			addHotKeyCaption("SinglePackageUpdateMenuItem", "Ctrl+U");
			addHotKeyCaption("PackageCommitMenuItem", "Ctrl+Shift+C");
			addHotKeyCaption("PackageDeployMenuItem", "Alt+I");
			addHotKeyCaption("PackageAddMenuItem", "Alt+N");
		}

		function registerHotKeys() {
			AjaxMethods = Terrasoft.AjaxMethods;
			subscribeOnKeyDownEvents();
		}

		function onAssemblyGridKeyDown(event) {
			if (event.keyCode === event.DELETE && onGridKeyDown(event)) {
				confirmDeleteGridItemByHotKey(AjaxMethods.OnDeletePackageAssemblyButtonClick);
				return false;
			}
		}

		function onPackageTreeKeyDown(event) {
			if (getIsEnterKeyDown(event) && onGridKeyDown(event)) {
				AjaxMethods.OnPackageEditMenuItemClick();
				return false;
			}
			if (event.keyCode === event.DELETE && onGridKeyDown(event)) {
				confirmDeleteGridItemByHotKey(AjaxMethods.OnPackageDeleteMenuItemClick);
				return false;
			}
			if (event.ctrlKey && event.shiftKey && event.keyCode === event.C && onGridKeyDown(event)) {
				AjaxMethods.OnPackageCommitMenuItemClick();
				return false;
			}
			if (event.ctrlKey && event.shiftKey && event.keyCode === event.U && onGridKeyDown(event)) {
				AjaxMethods.OnPackageUpdateMenuItemClick();
				return false;
			}
			if (event.ctrlKey && !event.shiftKey && event.keyCode === event.U && onGridKeyDown(event)) {
				AjaxMethods.OnSinglePackageUpdateMenuItemClick();
				return false;
			}
		}

		function onGridKeyDown(event) {
			if (getIsGridEvent(event)) {
				event.preventDefault();
				return true;
			}
			return false;
		}

		function onSchemaGridKeyDown(event) {
			if (event.ctrlKey && event.keyCode === event.ENTER) {
				AjaxMethods.OnEditClientUnitSchemaMenuItemClick();
				return false;
			}
			if (getIsEnterKeyDown(event) && onGridKeyDown(event)) {
				AjaxMethods.OnEditMenuItemClick();
				return false;
			}
			if (event.keyCode === event.DELETE && onGridKeyDown(event)) {
				confirmDeleteSchemaByHotKey(AjaxMethods.OnDeleteMenuItemClick);
				return false;
			}
			if (event.ctrlKey && event.keyCode === event.M && onGridKeyDown(event)) {
				AjaxMethods.OnViewMetaDataMenuItemClick();
				return false;
			}
			if (event.ctrlKey && event.keyCode === event.K && onGridKeyDown(event)) {
				AjaxMethods.OnViewSourceMenuItemClick();
				return false;
			}
		}

		function onSqlScriptKeyDown(event) {
			if (getIsEnterKeyDown(event) && onGridKeyDown(event)) {
				AjaxMethods.OnEditSqlScriptButtonClick();
				return false;
			}
			if (event.keyCode === event.DELETE && onGridKeyDown(event)) {
				confirmDeleteGridItemByHotKey(AjaxMethods.OnDeleteSqlScriptButtonClick);
				return false;
			}
		}

		function onSchemaDataKeyDown(event) {
			if (getIsEnterKeyDown(event) && onGridKeyDown(event)) {
				AjaxMethods.OnEditSchemaDataButtonClick();
				return false;
			}
			if (event.keyCode === event.DELETE && onGridKeyDown(event)) {
				confirmDeleteGridItemByHotKey(AjaxMethods.OnDeleteSchemaDataButtonClick);
				return false;
			}
		}

		function gridSelectAll(gridName) {
			var grid = Ext.getCmp(gridName);
			if (grid.isVisible()) {
				grid.selModel.selectAllVisibleNodes();
			}
		}

		function gridRefreshData(gridName) {
			var grid = Ext.getCmp(gridName);
			if (grid.isVisible()) {
				grid.refreshData();
			}
		}

		function getGrids() {
			return [
				"SchemaGrid",
				"AssemblyGrid",
				"SqlScriptGrid",
				"SchemaDataGrid"
			];
		}

		function onKeyDown(event) {
			if (!event.ctrlKey && !event.shiftKey && event.keyCode === event.F5) {
				event.preventDefault();
				getGrids().forEach(gridRefreshData);
				return false;
			}
			if (event.ctrlKey && !event.shiftKey && event.keyCode === event.A && onGridKeyDown(event)) {
				getGrids().forEach(gridSelectAll);
				return false;
			}
			if (event.shiftKey && !event.ctrlKey && event.keyCode === event.F5) {
				event.preventDefault();
				Ext.getCmp("PackageTree").refreshData();
				return false;
			}
			if (event.ctrlKey && event.shiftKey && event.keyCode === event.F) {
				event.preventDefault();
				var searchEdit = Ext.getCmp("SearchValue");
				searchEdit.selectText();
				searchEdit.focus();
				return false;
			}
			if (event.altKey && event.keyCode === event.I && onGridKeyDown(event)) {
				AjaxMethods.OnPackageDeployMenuItemClick();
				return false;
			}
			if (event.altKey && event.keyCode === event.N && onGridKeyDown(event)) {
				AjaxMethods.AddSchemaPackage();
				return false;
			}
		}

		function uploadZipPackage() {
			Ext.AjaxEvent.request({
				isUpload: true,
				timeout: 900000000,
				extraParams: {
					tag: 'uploadPackageZipFile'
				},
				control: Ext.getCmp('PackageExportMenuItem')
			});
		}

	</script>
	</head>
		<body>
		<form id="htmlForm" runat="server">
		<TS:ScriptManager ID="ScriptManager" runat="server" AjaxViewStateMode="Include" />
		<TS:EntityDataSource ID="SysPackageDataSource" runat="server" ManagerName="SystemEntitySchemaManager"
			HierarchicalDepth="-1" UseProfile="true" PageRowsCount="-1" />
		<TS:EntityDataSource ID="SysSchemaDataSource" runat="server" ManagerName="SystemEntitySchemaManager"
			UseProfile="true" />
		<TS:EntityDataSource ID="SysPackageReferenceAssemblyDataSource" runat="server" ManagerName="SystemEntitySchemaManager"
			UseProfile = "false" />
		<TS:EntityDataSource ID="SysPackageSqlScriptDataSource" runat="server" ManagerName="SystemEntitySchemaManager"
			UseProfile = "false" />
		<TS:EntityDataSource ID="SysPackageSchemaDataDataSource" runat="server" ManagerName="SystemEntitySchemaManager"
			UseProfile = "false" />
		<TS:Menu ID="SchemaMenu" runat="server">
			<Items>
				<TS:MenuItem ID="ButtonSchemaAddMenu" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption"
					runat="server">
					<Menu>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.EntitySchema.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-entityschemamanager.png}">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="EntitySchemaManager" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ExtendedEntitySchema.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-entityschemamanager.png}">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="EntitySchemaManager" />
										<TS:Parameter Name="ExtendParent" Value="true" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.SourceCodeSchema.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="SourceCodeSchemaManager" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ClientUnitSchema-Module.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}"
							ID="ModuleButtonSchemaAddMenuItem">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
										<TS:Parameter Name="SchemaType" Value="Module" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ExtendedClientUnitSchema.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
										<TS:Parameter Name="ExtendParent" Value="true" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ProcessSchema.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-processschemamanager.png}">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="ProcessSchemaManager" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuSeparator runat="server" />
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ClientUnitSchema-EditViewModelSchema.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}"
							ID="EditViewModelSchemaButtonSchemaAddMenuItem">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
										<TS:Parameter Name="SchemaType" Value="EditViewModelSchema" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ClientUnitSchema-ModuleViewModelSchema.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}"
							ID="ModuleViewModelSchemaButtonSchemaAddMenuItem">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
										<TS:Parameter Name="SchemaType" Value="ModuleViewModelSchema" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ClientUnitSchema-DetailViewModelSchema.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}"
							ID="DetailViewModelSchemaButtonSchemaAddMenuItem" Visible="false">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
										<TS:Parameter Name="SchemaType" Value="DetailViewModelSchema" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ClientUnitSchema-GridDetailViewModelSchema.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}"
							ID="GridDetailViewModelSchemaButtonSchemaAddMenuItem">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
										<TS:Parameter Name="SchemaType" Value="GridDetailViewModelSchema" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ClientUnitSchema-EditControlsDetailViewModelSchema.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}"
							ID="EditControlsDetailViewModelSchemaButtonSchemaAddMenuItem">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
										<TS:Parameter Name="SchemaType" Value="EditControlsDetailViewModelSchema" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ClientUnitSchema-UnitTestModule.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}"
							ID="UnitTestModuleButtonSchemaAddMenuItem">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
										<TS:Parameter Name="SchemaType" Value="UnitTestModule" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ProcessUserTaskSchema.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-processusertaskschemamanager.png}">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="ProcessUserTaskSchemaManager" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.PageSchema.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-pageschemamanager.png}">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="PageSchemaManager" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ExtendedPageSchema.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-pageschemamanager.png}">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="PageSchemaManager" />
										<TS:Parameter Name="ExtendParent" Value="true" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ImageListSchema.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-imagelistschemamanager.png}">
							<AjaxEvents>
								<Click OnEvent="OnTreeAddMenuItemClick">
									<ExtraParameters>
										<TS:Parameter Name="ManagerName" Value="ImageListSchemaManager" />
									</ExtraParameters>
								</Click>
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:MenuItem>
				<TS:MenuItem ID="EditPageMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Edit.Caption"
					runat="server">
					<AjaxEvents>
						<Click OnEvent="OnEditMenuItemClick" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="EditProcessMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.EditProcess.Caption"
					runat="server" Enabled="true">
					<AjaxEvents>
						<Click OnEvent="OnEditProcessMenuItemClick" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="OldEditProcessMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.OldEditProcess.Caption"
					runat="server" Enabled="true" Visible="false">
					<AjaxEvents>
						<Click OnEvent="OnOldEditProcessMenuItemClick" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="EditClientUnitSchemaMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.EditPage.Caption"
					runat="server" Enabled="true" Visible="false">
					<AjaxEvents>
						<Click OnEvent="OnEditClientUnitSchemaMenuItemClick" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="DeletePageMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption"
					runat="server">
					<AjaxEvents>
						<Click Before="return confirmDeleteSchema(this);"
							OnEvent="OnDeleteMenuItemClick" Timeout="9000000" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuSeparator runat="server" />
				<TS:MenuItem ID="MoveSchemaMenuItem_New" Caption="@Terrasoft.WebApp.BaseDesigner,MovePackageElements.Caption" runat="server" Enabled="false" Visible="false" />
				<TS:MenuItem ID="MoveSchemaMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.MovePackageElement.Caption" runat="server" Enabled="false" Visible="true">
					<AjaxEvents>
						<Click OnEvent="OnMoveSchemaMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuSeparator runat="server" />
				<TS:MenuItem ID="ViewPageMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewPage.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-menu-viewpage.png}"
					runat="server" Enabled="true">
					<AjaxEvents>
						<Click OnEvent="OnViewPageMenuItemClick" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuSeparator runat="server" />
				<TS:MenuItem ID="RollbackMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Rollback.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-undodelete.png}"
					runat="server" Enabled="false">
					<AjaxEvents>
						<Click Before="var stringList = Ext.StringList('WebApp.Common');return Ext.MessageBox.ajaxEventConfirm(this,stringList.getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.RollbackSchemasConfirm'));"
							OnEvent="OnRollbackMenuItemClick" ShowLoadMask="true" Timeout="900000000"/>
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="LockingMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Locking.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-lock.png}">
					<Menu>
						<TS:MenuItem ID="SchemaLockMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Lock.Caption"
							runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-lockgreen.png}">
							<AjaxEvents>
								<Click OnEvent="OnSchemaLockMenuItemClick" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem ID="SchemaUnlockMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Unlock.Caption"
							runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-lock.png}">
							<AjaxEvents>
								<Click OnEvent="OnSchemaUnlockMenuItemClick" />
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:MenuItem>
				<TS:MenuItem ID="WorkspaceMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Workspace.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourceview.png}">
					<Menu>
						<TS:MenuItem ID="CompileWorkspaceMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.CompileWorkspace"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-regenerateall.png}">
							<AjaxEvents>
								<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.CompileWorkspaceConfirm'));"
									OnEvent="OnCompileWorkspaceMenuItemClick" Timeout="900000000" ShowLoadMask="true" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem ID="CompileWorkspaceAllMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.CompileWorkspaceAll" Enabled="true"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-regenerateall.png}">
							<AjaxEvents>
								<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.CompileWorkspaceConfirm'));"
									OnEvent="OnCompileWorkspaceAllMenuItemClick" Timeout="900000000" ShowLoadMask="true" />
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:MenuItem>
				<TS:MenuItem ID="SourceMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewSource.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourceview.png}">
					<Menu>
						<TS:MenuItem ID="ViewSourcesMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Open.Caption"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourceview.png}"
							runat="server" Enabled="true">
							<AjaxEvents>
								<Click OnEvent="OnViewSourceMenuItemClick" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuSeparator runat="server">
						</TS:MenuSeparator>
						<TS:MenuItem ID="ReGenerateSelectedSchemasSourcesMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.ReGenerateSelected"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-regenerate.png}">
							<AjaxEvents>
								<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.RegenerateSchemasSourcesConfirm'));"
									OnEvent="OnReGenerateSelectedSchemasSourcesMenuItemClick" Timeout="900000000"
									ShowLoadMask="true" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ID="ReGenerateModifiedSchemasSourcesMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.ReGenerateModified"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-regeneratemodified.png}">
							<AjaxEvents>
								<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.RegenerateSchemasSourcesConfirm'));"
									OnEvent="OnReGenerateModifiedSchemasSourcesMenuItemClick" Timeout="900000000"
									ShowLoadMask="true" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" ID="ReGenerateRequiredSchemasSourcesMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.ReGenerateRequired"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-regeneraterequired.png}">
							<AjaxEvents>
								<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.RegenerateSchemasSourcesForRequiredConfirm'));"
									OnEvent="OnReGenerateRequiredSchemasSourcesMenuItemClick" Timeout="900000000" ShowLoadMask="true" ShowOpaqueMask="true" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem ID="ReGenerateAllSchemasSourcesMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.ReGenerateAll"
							Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-regenerateall.png}">
							<AjaxEvents>
								<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.RegenerateSchemasSourcesConfirm'));"
									OnEvent="OnReGenerateSourcesMenuItemClick" Timeout="900000000" ShowLoadMask="true" />
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:MenuItem>
				<TS:MenuItem ID="MetaDataMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewMetaData.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-metadataview.png}">
					<Menu>
						<TS:MenuItem ID="ViewMetaDataMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Open.Caption"
							runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-metadataview.png}">
							<AjaxEvents>
								<Click OnEvent="OnViewMetaDataMenuItemClick" />
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:MenuItem>
				<TS:MenuItem ID="UpdateDBStructureMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.UpdateDBStructure.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-updatedbstructure.png}">
					<Menu>
						<TS:MenuItem ID="UpdateDBStructureForSelectedMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.UpdateDBStructure.UpdateForSelected"
							runat="server" Enabled="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:saveindbactiongroup.png}">
							<AjaxEvents>
								<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.UpdateSelectedSchemasDBStructureConfirm'));"
									OnEvent="OnUpdateDBStructureForSelectedMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem ID="UpdateDBStructureForRequiredMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.UpdateDBStructure.UpdateForRequired"
							runat="server" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:saveindbactiongroup.png}">
							<AjaxEvents>
								<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.UpdateAllSchemasDBStructureConfirm'));"
									OnEvent="OnUpdateDBStructureForRequiredMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:MenuItem>
			</Items>
			<%--<AjaxEvents>
				<Show OnClientEvent="onShowSchemaMenuItem(el);"/>
			</AjaxEvents>--%>
		</TS:Menu>
		<TS:Menu ID="PackageMenu" runat="server">
			<Items>
				<TS:MenuItem ID="PackageAddMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption" runat="server">
					<AjaxEvents>
						<Click OnEvent="AddSchemaPackage" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="PackageEditMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Edit.Caption" runat="server">
					<AjaxEvents>
						<Click OnEvent="OnPackageEditMenuItemClick" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="PackageDeleteMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption" runat="server">
					<AjaxEvents>
						<Click Before="var stringList = Ext.StringList('WebApp.Common');return Ext.MessageBox.ajaxEventConfirm(this,stringList.getValue('Message.Confirm'),stringList.getValue('Message.DeleteRecordConfirm'));"
							OnEvent="OnPackageDeleteMenuItemClick" Timeout="9000000" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuSeparator ID="SourceControlMenuSeparatorItem" runat="server" />
				<TS:MenuItem ID="PackageUpdateMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Update.Caption" runat="server">
					<AjaxEvents>
						<Click OnEvent="OnPackageUpdateMenuItemClick" Timeout="9000000" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="SinglePackageUpdateMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,SingleUpdate.Caption" runat="server" Visible="False" CaptionColor="Black">
					<AjaxEvents>
						<Click OnEvent="OnSinglePackageUpdateMenuItemClick" Timeout="9000000" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="ProductPackagesUpdateMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,UpdateProductPackages.Caption" runat="server" Visible="False" CaptionColor="Green">
					<AjaxEvents>
						<Click OnEvent="OnProductPackagesUpdateMenuItemClick" Timeout="9000000" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="PackageCommitMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Commit.Caption" runat="server">
					<AjaxEvents>
						<Click OnEvent="OnPackageCommitMenuItemClick" Timeout="9000000" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="PackageDeployMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,DeployPackage.Caption" runat="server">
					<AjaxEvents>
						<Click OnEvent="OnPackageDeployMenuItemClick" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="PackageExportMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,ExportPackages.Caption" runat="server">
					<AjaxEvents>
						<Click OnEvent="OnPackageExportMenuItemClick" Timeout="900000000" ShowLoadMask ="true"
							ShowOpaqueMask="true" Success="uploadZipPackage();"/>
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="JsUnitTestPackagesRemoveMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,UninstallJSUnitTests.Caption" runat="server" Visible="False" CaptionColor="DarkRed">
					<AjaxEvents>
						<Click OnEvent="OnJSUnitTestPackagesRemoveMenuItemClick" Timeout="9000000" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="LoadPackageToFileSystem" Caption="@Terrasoft.WebApp.BaseDesigner,LoadPackageToFileSystem.Caption" runat="server" Visible="False">
					<AjaxEvents>
						<Click OnEvent="LoadPackageToFileSystemMenuItemClick" Timeout="9000000" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="UpdatePackageFromFileSystem" Caption="@Terrasoft.WebApp.BaseDesigner,UpdatePackageFromFileSystem.Caption" runat="server" Visible="False">
					<AjaxEvents>
						<Click OnEvent="UpdatePackageFromFileSystemMenuItemClick" Timeout="9000000" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="MovePackagesMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,MovePackageElements.Caption" runat="server" Enabled="false" Visible="false"/>
				<TS:MenuItem ID="RemoveIsModified" Caption="@Terrasoft.WebApp.BaseDesigner,RemoveIsModified.Caption" runat="server" Enabled="false" Visible="false">
					<AjaxEvents>
						<Click OnEvent="OnRemoveIsModifiedMenuItemClick" Timeout="9000000" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuSeparator runat="server" />
			</Items>
			<%--<AjaxEvents>
				<Show OnClientEvent="onShowMovePackagesMenu(el);"/>
			</AjaxEvents>--%>
		</TS:Menu>
		<TS:Menu ID="AssemblyMenu" runat="server">
			<Items>
				<TS:MenuItem ID="AssemblyAddMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption" runat="server">
					<AjaxEvents>
						<Click OnEvent="OnAddPackageAssemblyButtonClick" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="AssemblyDeleteMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption" runat="server">
					<AjaxEvents>
						<Click Before="var stringList = Ext.StringList('WebApp.Common');return Ext.MessageBox.ajaxEventConfirm(this,stringList.getValue('Message.Confirm'),stringList.getValue('Message.DeleteRecordConfirm'));"
							OnEvent="OnDeletePackageAssemblyButtonClick" Timeout="9000000" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuSeparator runat="server" />
				<TS:MenuItem ID="MoveAssemblyMenuItem_New" Caption="@Terrasoft.WebApp.BaseDesigner,MovePackageElements.Caption" runat="server" Enabled="false" Visible="false" />
				<TS:MenuItem ID="MoveAssemblyMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.MovePackageElement.Caption" runat="server" Enabled="false" Visible="true">
					<AjaxEvents>
						<Click OnEvent="OnMoveAssemblyMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuSeparator runat="server" />
				<TS:MenuItem ID="AssemblyRollbackMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Rollback.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-undodelete.png}"
					runat="server" Enabled="false">
					<AjaxEvents>
						<Click Before="var stringList = Ext.StringList('WebApp.Common');return Ext.MessageBox.ajaxEventConfirm(this,stringList.getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.RollbackSchemasConfirm'));"
							OnEvent="OnAssemblyRollbackMenuItemClick" ShowLoadMask="true" Timeout="900000000"/>
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="AssemblyLockingMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Locking.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-lock.png}">
					<Menu>
						<TS:MenuItem ID="AssemblyLockMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Lock.Caption"
							runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-lockgreen.png}">
							<AjaxEvents>
								<Click OnEvent="OnAssemblyLockMenuItemClick" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem ID="AssemblyUnlockMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Unlock.Caption"
							runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-lock.png}">
							<AjaxEvents>
								<Click OnEvent="OnAssemblyUnlockMenuItemClick" />
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:MenuItem>
				<TS:MenuItem ID="AssemblyPropertyMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.AssemblyProperties.Caption" Visible="false" Enabled="true">
					<Menu>
						<TS:MenuItem ID="LoadAssemblyOnAppStartMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.LoadAssemblyOnAppStart.Caption"
							runat="server" Enabled="true">
							<AjaxEvents>
								<Click OnEvent="OnLoadAssemblyOnAppStartMenuItemClick" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem ID="NotLoadAssemblyOnAppStartMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.NotLoadAssemblyOnAppStart.Caption"
							runat="server" Enabled="true">
							<AjaxEvents>
								<Click OnEvent="OnNotLoadAssemblyOnAppStartMenuItemClick" />
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:MenuItem>
			</Items>
			<%--<AjaxEvents>
				<Show OnClientEvent="onShowMoveAssemblyMenu(el);"/>
			</AjaxEvents>--%>
		</TS:Menu>
		<TS:Menu ID="SqlScriptMenu" runat="server">
			<Items>
				<TS:MenuItem ID="SqlScriptAddMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption" runat="server">
					<Menu>
						<TS:MenuItem runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption">
							<AjaxEvents>
								<Click OnEvent="OnAddSqlScriptButtonClick" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.AddSqlFile.Caption">
							<AjaxEvents>
								<Click OnEvent="OnAddPackageSqlFileScriptButtonClick" />
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:MenuItem>
				<TS:MenuItem ID="SqlScriptEditMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Edit.Caption" runat="server">
					<AjaxEvents>
						<Click OnEvent="OnEditSqlScriptButtonClick" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="SqlScriptDeleteMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption" runat="server">
					<AjaxEvents>
						<Click Before="var stringList = Ext.StringList('WebApp.Common');return Ext.MessageBox.ajaxEventConfirm(this,stringList.getValue('Message.Confirm'),stringList.getValue('Message.DeleteRecordConfirm'));"
							OnEvent="OnDeleteSqlScriptButtonClick" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuSeparator runat="server" />
				<TS:MenuItem ID="SqlScriptValidateMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Validate.Caption"
					runat="server">
					<AjaxEvents>
						<Click OnEvent="OnValidateSqlScriptClick" Timeout="9000000" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="MoveSqlScriptMenuItem_New" Caption="@Terrasoft.WebApp.BaseDesigner,MovePackageElements.Caption" runat="server" Enabled="false" Visible="false" />
				<TS:MenuItem ID="MoveSqlScriptMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.MovePackageElement.Caption" runat="server" Enabled="false" Visible="true">
					<AjaxEvents>
						<Click OnEvent="OnMoveSqlScriptMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuSeparator runat="server" />
				<TS:MenuItem ID="SqlScriptRollbackMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Rollback.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-undodelete.png}"
					runat="server" Enabled="false">
					<AjaxEvents>
						<Click Before="var stringList = Ext.StringList('WebApp.Common');return Ext.MessageBox.ajaxEventConfirm(this,stringList.getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.RollbackSchemasConfirm'));"
							OnEvent="OnSqlScriptRollbackMenuItemClick" ShowLoadMask="true" Timeout="900000000"/>
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="SqlScriptLockingMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Locking.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-lock.png}">
					<Menu>
						<TS:MenuItem ID="SqlScriptLockMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Lock.Caption"
							runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-lockgreen.png}">
							<AjaxEvents>
								<Click OnEvent="OnSqlScriptLockMenuItemClick" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem ID="SqlScriptUnlockMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Unlock.Caption"
							runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-lock.png}">
							<AjaxEvents>
								<Click OnEvent="OnSqlScriptUnlockMenuItemClick" />
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:MenuItem>
				<TS:MenuItem ID="InstallSqlScriptMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.InstallSqlScript.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-installsqlscript.png}">
					<Menu>
						<TS:MenuItem ID="InstallSqlScriptForSelectedMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.InstallSqlScript.Selected"
							runat="server" Enabled="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-installselectedsqlscript.png}">
							<AjaxEvents>
								<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.InstallSqlScriptForSelectedConfirm'));"
									OnEvent="OnInstallSqlScriptForSelectedMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem ID="InstallSqlScriptForRequiredMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.InstallSqlScript.Required"
							runat="server" Enabled="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-installrequiredsqlscript.png}">
							<AjaxEvents>
								<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.InstallSqlScriptForRequiredConfirm'));"
									OnEvent="OnInstallSqlScriptForRequiredMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:MenuItem>
			</Items>
			<%--<AjaxEvents>
				<Show OnClientEvent="onShowMoveSqlScriptMenu(el);"/>
			</AjaxEvents>--%>
		</TS:Menu>
		<TS:Menu ID="SchemaDataMenu" runat="server">
			<Items>
				<TS:MenuItem ID="SchemaDataAddMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption" runat="server">
					<AjaxEvents>
						<Click OnEvent="OnAddSchemaDataButtonClick" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="SchemaDataEditMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Edit.Caption" runat="server">
					<AjaxEvents>
						<Click OnEvent="OnEditSchemaDataButtonClick" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="SchemaDataDeleteMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption" runat="server">
					<AjaxEvents>
						<Click Before="var stringList = Ext.StringList('WebApp.Common');return Ext.MessageBox.ajaxEventConfirm(this,stringList.getValue('Message.Confirm'),stringList.getValue('Message.DeleteRecordConfirm'));"
							OnEvent="OnDeleteSchemaDataButtonClick" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuSeparator runat="server" />
				<TS:MenuItem ID="SchemaDataValidateMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Validate.Caption"
					runat="server">
					<AjaxEvents>
						<Click OnEvent="OnValidateSchemaDataClick" Timeout="9000000" ShowLoadMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="MoveSchemaDataMenuItem_New" Caption="@Terrasoft.WebApp.BaseDesigner,MovePackageElements.Caption" runat="server" Enabled="false" Visible="false" />
				<TS:MenuItem ID="MoveSchemaDataMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.MovePackageElement.Caption" runat="server" Enabled="false" Visible="true">
					<AjaxEvents>
						<Click OnEvent="OnMoveSchemaDataMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuSeparator runat="server" />
				<TS:MenuItem ID="SchemaDataRollbackMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Rollback.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-undodelete.png}"
					runat="server" Enabled="false">
					<AjaxEvents>
						<Click Before="var stringList = Ext.StringList('WebApp.Common');return Ext.MessageBox.ajaxEventConfirm(this,stringList.getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.RollbackSchemasConfirm'));"
							OnEvent="OnSchemaDataRollbackMenuItemClick" ShowLoadMask="true" Timeout="900000000"/>
					</AjaxEvents>
				</TS:MenuItem>
				<TS:MenuItem ID="SchemaDataLockingMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Locking.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-lock.png}">
					<Menu>
						<TS:MenuItem ID="SchemaDataLockMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Lock.Caption"
							runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-lockgreen.png}">
							<AjaxEvents>
								<Click OnEvent="OnSchemaDataLockMenuItemClick" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem ID="SchemaDataUnlockMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Unlock.Caption"
							runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-lock.png}">
							<AjaxEvents>
								<Click OnEvent="OnSchemaDataUnlockMenuItemClick" />
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:MenuItem>
				<TS:MenuItem ID="InstallSchemaDataMenuItem" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.InstallSchemaData.Caption"
					Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-installschemadata.png}">
					<Menu>
						<TS:MenuItem ID="InstallSchemaDataForSelectedMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.InstallSchemaData.Selected"
							runat="server" Enabled="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-installselectedschemadata.png}">
							<AjaxEvents>
								<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.InstallSchemaDataForSelectedConfirm'));"
									OnEvent="OnInstallSchemaDataForSelectedMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
							</AjaxEvents>
						</TS:MenuItem>
						<TS:MenuItem ID="InstallSchemaDataForRequiredMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.InstallSchemaData.Required"
							runat="server" Enabled="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-installrequiredschemadata.png}">
							<AjaxEvents>
								<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.InstallSchemaDataForRequiredConfirm'));"
									OnEvent="OnInstallSchemaDataForRequiredMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
							</AjaxEvents>
						</TS:MenuItem>
					</Menu>
				</TS:MenuItem>
			</Items>
			<%--<AjaxEvents>
				<Show OnClientEvent="onShowMoveSchemaDataMenu(el);"/>
			</AjaxEvents>--%>
		</TS:Menu>
		<TS:ControlLayout runat="server" ID="MainPanel" Width="100%" Height="100%" IsViewPort="true" HelpContextId="282">
			<TS:MessagePanel ID="MessagePanel" runat="server" Hidden="true" Width="100%" />
			<TS:ControlLayout runat="server" Width="100%" Height="100%" Direction="Horizontal">
			<TS:ControlLayout runat="server" ID="LeftPanel" Width="350px" Height="100%" HasSplitter="true"
				CollapseMode="CurrentItem" Padding="5 0 5 5">
				<TS:TabPanel runat="server" ID="ActionsTabPanel" Width="100%" Height="160px" HasSplitter="true" CollapseMode="CurrentItem" Collapsible="true">
					<AjaxEvents>
						<TabChange OnClientEvent="Terrasoft.AjaxMethods.TabPanelOnTabChange()" />
					</AjaxEvents>
					<Tabs>
						<TS:Tab runat="server" ID="ActionsTab" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Actions.Caption">
							<Body>
								<TS:ControlLayout ID="psdWrapControlLayout" runat="server" Direction="Vertical" Height="100%"
									Width="100%"
									DisplayStyle="Topbar" Edges="0 0 1 0" Margins="1 0 0 0">
									<TS:TextEdit runat="server" ID="psdComponentsSearch" Width="100%" EmptyText="@Terrasoft.UI.WebControls,SearchEmptyText.Caption">
										<Tools>
											<TS:ToolButton ID="psdToolButtonClearSearch" runat="server"
												Image="{ResourceManagerName:Terrasoft.UI.WebControls,ResourceItemName:toolbutton-close.gif,Source:ResourceManager}">
												<AjaxEvents>
													<Click OnClientEvent="onClearActionsSearchValue(e)" />
												</AjaxEvents>
											</TS:ToolButton>
										</Tools>
										<AjaxEvents>
											<SpecialKey OnClientEvent="onComponentsSearchSpecialKey(el, e);" />
										</AjaxEvents>
									</TS:TextEdit>
								</TS:ControlLayout>
								<TS:MenuPanel ID="ActionsMenuPanel" runat="server" Width="100%" Height="100%" CollapseMode="Multiple">
									<Menu>
										<TS:MenuSeparator runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.GeneralGroup.Caption"
											Collapsible="true" />
										<TS:MenuItem ID="ActionsMenuPanelViewPage" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewPage.Caption"
											Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-menu-viewpage.png}">
											<AjaxEvents>
												<Click OnEvent="OnViewPageMenuItemClick" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuSeparator runat="server" />
										<TS:MenuSeparator runat="server" />
										<TS:MenuItem Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.OpenWorkspaces.Caption"
											runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-solutions.png}">
											<AjaxEvents>
												<Click OnEvent="OnOpenWorkspacesMenuItemClick" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem ID="ActionsMenuPanelOpenRepositories" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.OpenRepositories.Caption"
											runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-solutions.png}">
											<AjaxEvents>
												<Click OnEvent="OnOpenRepositoriesMenuItemClick" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuSeparator ID="MenuSeparator1" runat="server" />
										<TS:MenuItem ID="ExportSchemaMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ExportSchema.Caption"
											runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-export.png}">
											<AjaxEvents>
												<Click OnEvent="OnExportMenuItemClick" IsUpload="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem ID="ImportSchemaMenuItem" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ImportSchema.Caption"
											runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-import.png}">
											<AjaxEvents>
												<Click OnEvent="OnImportMenuItemClick" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuSeparator runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Workspace.Caption"
											Collapsible="true" Collapsed="false" />
										<TS:MenuItem ID="ActionsMenuPanelCompileWorkspace" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.CompileWorkspace"
											Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-regenerate.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.CompileWorkspaceConfirm'));"
													OnEvent="OnCompileWorkspaceMenuItemClick" Timeout="900000000" ShowLoadMask="true" ShowOpaqueMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem ID="ActionsMenuPanelCompileWorkspaceAll" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.CompileWorkspaceAll" Enabled="true"
											Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-regenerate.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.CompileWorkspaceConfirm'));"
													OnEvent="OnCompileWorkspaceAllMenuItemClick" Timeout="900000000" ShowLoadMask="true" ShowOpaqueMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem ID="ActionsMenuPanelCleanUpWorkspaceMenuItem" runat="server"
											Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.CleanUpWorkspace"
											Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-regenerateall.png}">
											<AjaxEvents>
												<Click OnEvent="OnCleanUpWorkspaceMenuItemClick" Timeout="900000000" ShowLoadMask="true" ShowOpaqueMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem ID="LoadPackagesToFileSystemMenuItem" runat="server" Enabled="False"
											Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.LoadPackagesToFS"
											Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-export.png}">
											<AjaxEvents>
												<Click OnEvent="OnLoadPackagesToFileSystemMenuItemClick" Timeout="900000000" ShowLoadMask="true" ShowOpaqueMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem ID="LoadPackagesToDBMenuItem" runat="server" Enabled="False"
											Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.LoadPackagesToDB"
											Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-import.png}">
											<AjaxEvents>
												<Click OnEvent="OnLoadPackagesToDBMenuItemClick" Timeout="900000000" ShowLoadMask="true" ShowOpaqueMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuSeparator runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewSource.Caption"
											Collapsible="true" Collapsed="false" />
										<TS:MenuItem ID="ActionsMenuPanelViewSource" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Open.Caption"
											Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourceview.png}"
											runat="server" Enabled="true">
											<AjaxEvents>
												<Click OnEvent="OnViewSourceMenuItemClick" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuSeparator runat="server" />
										<TS:MenuItem ID="ActionsMenuPanelReGenerateSourcesSelected" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.ReGenerateSelected"
											Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-regenerate.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.RegenerateSchemasSourcesConfirm'));"
													OnEvent="OnReGenerateSelectedSchemasSourcesMenuItemClick" Timeout="900000000"
													ShowLoadMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem runat="server" ID="ActionsMenuPanelReGenerateSourcesModified" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.ReGenerateModified"
											Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-regeneratemodified.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.RegenerateSchemasSourcesConfirm'));"
													OnEvent="OnReGenerateModifiedSchemasSourcesMenuItemClick" Timeout="900000000"
													ShowLoadMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem runat="server" ID="ActionsMenuPanelReGenerateSourcesForRequired" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.ReGenerateRequired"
											Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-regeneraterequired.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.RegenerateSchemasSourcesForRequiredConfirm'));"
													OnEvent="OnReGenerateRequiredSchemasSourcesMenuItemClick" Timeout="900000000" ShowLoadMask="true" ShowOpaqueMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem ID="ActionsMenuPanelReGenerateSourcesAll" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.ReGenerateAll"
											Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-regenerateall.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.RegenerateSchemasSourcesConfirm'));"
													OnEvent="OnReGenerateSourcesMenuItemClick" Timeout="900000000" ShowLoadMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuSeparator runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewMetaData.Caption"
											Collapsible="true" Collapsed="false" />
										<TS:MenuItem ID="ActionsMenuPanelViewMetaData" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Open.Caption"
											runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-metadataview.png}">
											<AjaxEvents>
												<Click OnEvent="OnViewMetaDataMenuItemClick" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuSeparator runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Profile.Caption"
											Collapsible="true" Collapsed="false" />
										<TS:MenuItem ID="ActionsMenuPanelClearProfileSelectedSchemas" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Profile.ClearSelectedSchemas"
											runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-metadataview.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.ClearProfileSchemasConfirm'));"
													OnEvent="OnClearProfileSelectedSchemasMenuItemClick" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem ID="ActionsMenuPanelClearProfileAllSchemas" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Profile.ClearAllSchemas"
											runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-metadataview.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.ClearProfileSchemasConfirm'));"
													OnEvent="OnClearProfileAllSchemasMenuItemClick" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem ID="ActionsMenuPanelClearProfileAll" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Profile.ClearAll"
											runat="server" Enabled="true" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-metadataview.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.ClearProfileAllConfirm'));"
													OnEvent="OnClearProfileAllMenuItemClick" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuSeparator ID="ActionsMenuPanelUpdateDBStructure" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.UpdateDBStructure.Caption"
											Collapsible="true" Collapsed="false" />
										<TS:MenuItem ID="ActionsMenuPanelUpdateDBStructureForSelected" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.UpdateDBStructure.UpdateForSelected"
											runat="server" Enabled="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:saveindbactiongroup.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.UpdateSelectedSchemasDBStructureConfirm'));"
													OnEvent="OnUpdateDBStructureForSelectedMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem ID="ActionsMenuPanelUpdateDBStructureForRequired" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.UpdateDBStructure.UpdateForRequired"
											runat="server" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:saveindbactiongroup.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.UpdateAllSchemasDBStructureConfirm'));"
													OnEvent="OnUpdateDBStructureForRequiredMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuSeparator ID="ActionsMenuPanelInstallSqlScript" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.InstallSqlScript.Caption"
											Collapsible="true" Collapsed="false" />
										<TS:MenuItem ID="ActionsMenuPanelInstallSqlScriptForSelected" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.InstallSqlScript.Selected"
											runat="server" Enabled="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-installselectedsqlscript.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.InstallSqlScriptForSelectedConfirm'));"
													OnEvent="OnInstallSqlScriptForSelectedMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem ID="ActionsMenuPanelInstallSqlScriptForRequired" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.InstallSqlScript.Required"
											runat="server" Enabled="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-installrequiredsqlscript.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.InstallSqlScriptForRequiredConfirm'));"
													OnEvent="OnInstallSqlScriptForRequiredMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuSeparator ID="ActionsMenuPanelInstallSchemaData" runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.InstallSchemaData.Caption"
											Collapsible="true" Collapsed="false" />
										<TS:MenuItem ID="ActionsMenuPanelInstallSchemaDataForSelected" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.InstallSchemaData.Selected"
											runat="server" Enabled="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-installselectedschemadata.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.InstallSchemaDataForSelectedConfirm'));"
													OnEvent="OnInstallSchemaDataForSelectedMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem ID="ActionsMenuPanelInstallSchemaDataForRequired" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.InstallSchemaData.Required"
											runat="server" Enabled="false" Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-installrequiredschemadata.png}">
											<AjaxEvents>
												<Click Before="return Ext.MessageBox.ajaxEventConfirm(this,Ext.StringList('WebApp.Common').getValue('Message.Confirm'),Ext.StringList('WebApp.WorkspaceExplorerModule').getValue('Message.InstallSchemaDataForRequiredConfirm'));"
													OnEvent="OnInstallSchemaDataForRequiredMenuItemClick" Timeout="90000000" ShowLoadMask="true" ShowOpaqueMask="true" />
											</AjaxEvents>
										</TS:MenuItem>
									</Menu>
								</TS:MenuPanel>
							</Body>
						</TS:Tab>
					</Tabs>
				</TS:TabPanel>
				</TS:ControlLayout>
					<TS:ControlLayout runat="server" ID="PackagesControlLayout" Width="350px" Height="100%" HasSplitter="true" CollapseMode="CurrentItem" Padding="5 0 5 5" Visible="true">
					<TS:TabPanel runat="server" ID="PackagesTabPanel" Width="100%" Height="160px" HasSplitter="true" CollapseMode="CurrentItem" Collapsible="true">
						<Tabs>
							<TS:Tab runat="server" ID="Packages" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.PackageGrid.Caption">
								<Body>
									<TS:TreeGrid ID="PackageTree" runat="server" Width="100%" Height="100%" ImageList="Terrasoft.WebApp" FooterVisible="True"
										HideHeaders="true" StripeRows="true" HideRowBorders="true" IsSummaryVisible="false" AllowExportData="false" StyleSpec="" IsMultilineMode="false"
										DataSourceId="SysPackageDataSource" ContextMenuId="PackageMenu" EnableInnerDragDrop="false" DragDropGroup="SchemasDD" SelectionMode="MultiRows">
										<AjaxEvents>
											<CellIconClick OnClientEvent="Terrasoft.AjaxMethods.OnPackageGridIconClick(iconId, nodeId)" ShowOpaqueMask="true" ShowLoadMask="true" />
											<DblClick OnEvent="OnPackageEditMenuItemClick" />
											<SelectionChange OnClientEvent="Terrasoft.AjaxMethods.RefreshDataOnSelectedElementsTab()" />
										</AjaxEvents>
									</TS:TreeGrid>
								</Body>
							</TS:Tab>
						</Tabs>
					</TS:TabPanel>
				</TS:ControlLayout>
			<TS:ControlLayout runat="server" ID="Workspace" Width="100%" Height="100%" Padding="0 5 5 0">
				<TS:ControlLayout ID="SearchPanel" runat="server" Width="100%" IsCollapsible="false"
					Collapsed="false" FitHeightByContent="true" UseProfile="true"
					DisplayStyle="Controls" VerticalAlign="Middle" Direction="Horizontal" Margins="5 0 5 0">
					<TS:RadioButton runat="server" ID="SearchStartWith" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.SearchStartWith.CheckBox.Caption" UseProfile="true" Checked="true" GroupName="ComparissonType">
						<AjaxEvents>
							<Check OnClientEvent="onSearchStartWithClick()" />
						</AjaxEvents>
					</TS:RadioButton>
					<TS:RadioButton runat="server" ID="SearchContains" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.SearchContains.CheckBox.Caption" UseProfile="true" Checked="false" GroupName="ComparissonType">
						<AjaxEvents>
							<Check OnClientEvent="onSearchContainsClick()" />
						</AjaxEvents>
					</TS:RadioButton>
					<TS:RadioButton runat="server" ID="SearchEqual" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.SearchEqual.CheckBox.Caption" UseProfile="true" Checked="false" GroupName="ComparissonType">
						<AjaxEvents>
							<Check OnClientEvent="onSearchEqualClick()" />
						</AjaxEvents>
					</TS:RadioButton>
					<TS:CheckBox runat="server" ID="SearchCaption" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.SearchCaption.CheckBox.Caption" UseProfile="true" Checked="true">
						<AjaxEvents>
							<Check OnClientEvent="onSearchButtonClientClick()" />
						</AjaxEvents>
					</TS:CheckBox>
					<TS:TextEdit runat="server" ID="SearchValue" Width="100%" EmptyText="@Terrasoft.UI.WebControls,SearchEmptyText.Caption">
						<Tools>
							<TS:ToolButton ID="ToolButtonClearSearch" runat="server" Image="{ResourceManagerName:Terrasoft.UI.WebControls,ResourceItemName:toolbutton-close.gif,Source:ResourceManager}">
								<AjaxEvents>
									<Click OnClientEvent="onClearSearchValue(e)" />
								</AjaxEvents>
							</TS:ToolButton>
						</Tools>
						<AjaxEvents>
							<SpecialKey OnClientEvent="onSearchValueSpecialKey(el, e);" />
						</AjaxEvents>
					</TS:TextEdit>
					<TS:Button runat="server" ID="SearchButton" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.SearchButton.Caption">
						<AjaxEvents>
							<Click OnClientEvent="onSearchButtonClientClick(e)" />
						</AjaxEvents>
					</TS:Button>
				</TS:ControlLayout>
				<TS:TabPanel runat="server" ID="ElementsTabPanel" Width="100%" Height="100%" Margins="5 0 0 0"
					Collapsed="false" Collapsible="false" UseProfile="False">
					<AjaxEvents>
						<TabChange OnClientEvent="Terrasoft.AjaxMethods.RefreshDataOnSelectedElementsTab()" ShowLoadMask="true" Timeout="900000000" />
					</AjaxEvents>
					<Tabs>
						<TS:Tab runat="server" ID="Schemas" ShowMenuItemCaption="true" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.SchemaGrid.Caption">
							<Menu>
								<TS:CheckMenuItem runat="server" Group="ShowSchemas" Checked="true" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.All.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowAllSchemasMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
								<TS:CheckMenuItem ID="ShowAllModifiedSchemasMenuItem" runat="server" Group="ShowSchemas" Checked="false" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.AllModified.Caption" Visible="true">
									<AjaxEvents>
										<Click OnEvent="OnShowAllModifiedSchemasMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
								<TS:CheckMenuItem runat="server" Group="ShowSchemas" Checked="false" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.Favorite.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowFavoriteSchemasMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
								<TS:CheckMenuItem runat="server" Group="ShowSchemas" Checked="false" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.Changed.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowModifiedSchemasMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
								<TS:CheckMenuItem ID="ShowLockedSchemasMenuItem" runat="server" Group="ShowSchemas" Checked="false" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.Locked.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowLockedSchemasMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
								<TS:CheckMenuItem runat="server" Group="ShowSchemas" Checked="false" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.ChildDependency.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowChildDependencySchemasMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
								<TS:CheckMenuItem runat="server" Group="ShowSchemas" Checked="false" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.NeedUpdateStructure.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowNeedUpdateStructureSchemasMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
							</Menu>
							<Body>
								<TS:ControlLayout runat="server" ID="toolBar" DisplayStyle="Topbar" Width="100%"
									Edges="0 0 1 0" Margins="0 0 0 0">
									<TS:Button runat="server" ID="AddSchema" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption">
										<Menu>
											<TS:MenuSeparator runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.Elements.Caption"
												Collapsible="true" Collapsed="false" />
											<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.EntitySchema.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-entityschemamanager.png}">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="EntitySchemaManager" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ExtendedEntitySchema.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-entityschemamanager.png}">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="EntitySchemaManager" />
															<TS:Parameter Name="ExtendParent" Value="true" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem ID="AddSourceCodeSchemaMenuItem" runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.SourceCodeSchema.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="SourceCodeSchemaManager" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ClientUnitSchema-Module.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}"
												ID="ModuleAddSchemaMenuItem">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
															<TS:Parameter Name="SchemaType" Value="Module" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem ID="MenuItem1" runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ExtendedClientUnitSchema.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
															<TS:Parameter Name="ExtendParent" Value="true" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ProcessSchema.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-processschemamanager.png}">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="ProcessSchemaManager" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuSeparator runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.Extended.Caption"
												Collapsible="true" Collapsed="true" />
											<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ClientUnitSchema-EditViewModelSchema.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}"
												ID="EditViewModelSchemaAddSchemaMenuItem">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
															<TS:Parameter Name="SchemaType" Value="EditViewModelSchema" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ClientUnitSchema-ModuleViewModelSchema.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}"
												ID="ModuleViewModelSchemaAddSchemaMenuItem">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
															<TS:Parameter Name="SchemaType" Value="ModuleViewModelSchema" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ClientUnitSchema-DetailViewModelSchema.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}"
												ID="DetailViewModelSchemaAddSchemaMenuItem" Visible="false">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
															<TS:Parameter Name="SchemaType" Value="DetailViewModelSchema" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ClientUnitSchema-GridDetailViewModelSchema.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}"
												ID="GridDetailViewModelSchemaAddSchemaMenuItem">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
															<TS:Parameter Name="SchemaType" Value="GridDetailViewModelSchema" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ClientUnitSchema-EditControlsDetailViewModelSchema.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}"
												ID="EditControlsDetailViewModelSchemaAddSchemaMenuItem">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
															<TS:Parameter Name="SchemaType" Value="EditControlsDetailViewModelSchema" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ClientUnitSchema-UnitTestModule.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-sourcecodeschemamanager.png}"
												ID="UnitTestModuleAddSchemaMenuItem">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="ClientUnitSchemaManager" />
															<TS:Parameter Name="SchemaType" Value="UnitTestModule" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem ID="MenuItem3" runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ProcessUserTaskSchema.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-processusertaskschemamanager.png}">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="ProcessUserTaskSchemaManager" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem ID="MenuItem2" runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.PageSchema.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-pageschemamanager.png}">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="PageSchemaManager" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem ID="MenuItem4" runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ExtendedPageSchema.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-pageschemamanager.png}">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="PageSchemaManager" />
															<TS:Parameter Name="ExtendParent" Value="true" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem runat="server" ImageList="Terrasoft.WebApp" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.Action.Add.ImageListSchema.Caption"
												Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:solutionexplorermodule-imagelistschemamanager.png}">
												<AjaxEvents>
													<Click OnEvent="OnTreeAddMenuItemClick">
														<ExtraParameters>
															<TS:Parameter Name="ManagerName" Value="ImageListSchemaManager" />
														</ExtraParameters>
													</Click>
												</AjaxEvents>
											</TS:MenuItem>
										</Menu>
									</TS:Button>
									<TS:Button runat="server" ID="EditSchema" Caption="@Terrasoft.WebApp.BaseDesigner,Edit.Caption">
										<AjaxEvents>
											<Click OnEvent="OnEditMenuItemClick" />
										</AjaxEvents>
									</TS:Button>
									<TS:Button runat="server" ID="DeleteSchema" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption">
										<AjaxEvents>
											<Click Before="return confirmDeleteSchema(this);"
												OnEvent="OnDeleteMenuItemClick" Timeout="9000000" ShowLoadMask="true" />
										</AjaxEvents>
									</TS:Button>
									<TS:Spacer ID="Spacer1" runat="server" Size="100%">
									</TS:Spacer>
									<TS:Button runat="server" ID="contextHelpButton" ImageAsSprite="true" CanFocus="false"
										Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}"
										Hidden="true">
									</TS:Button>
								</TS:ControlLayout>
								<TS:TreeGrid ID="SchemaGrid" runat="server" Width="100%" Height="100%" ContextMenuId="SchemaMenu"
									Edges="0 0 0 0" ImageList="Terrasoft.WebApp" AutoExpandRootNode="false" FooterVisible="true"
									StyleSpec="" DataSourceId="SysSchemaDataSource" AllowExportData="false"
									EnableDragDrop="true" DragDropGroup="SchemasDD" Draggable="true" PrimaryDisplayColumnAsLookup="true">
									<AjaxEvents>
										<SelectionChange OnEvent="OnSchemaGridSelectionChange" />
										<DblClick OnEvent="OnEditMenuItemClick" />
										<CellIconClick OnClientEvent="Terrasoft.AjaxMethods.OnSchemaGridIconClick(iconId, nodeId)" />
									</AjaxEvents>
								</TS:TreeGrid>
							</Body>
						</TS:Tab>
						<TS:Tab runat="server" ID="PackageAssembliesTab" ShowMenuItemCaption="true" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.PackageReferenceAssembliesTab.Caption">
							<Menu>
								<TS:CheckMenuItem runat="server" Group="ShowAssemblies" Checked="true" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.All.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowAllAssembliesMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
								<TS:CheckMenuItem runat="server" Group="ShowAssemblies" Checked="false" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.Changed.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowModifiedAssembliesMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
								<TS:CheckMenuItem ID="ShowLockedAssembliesMenuItem" runat="server" Group="ShowAssemblies" Checked="false" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.Locked.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowLockedAssembliesMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
							</Menu>
							<Body>
								<TS:ControlLayout runat="server" ID="ControlLayout6" DisplayStyle="Topbar" Width="100%" Edges="0 0 1 0" Margins="0 0 0 0">
									<TS:Button runat="server" ID="AddPackageAssemblyButton" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption">
										<AjaxEvents>
											<Click OnEvent="OnAddPackageAssemblyButtonClick" />
										</AjaxEvents>
									</TS:Button>
									<TS:Button runat="server" ID="DeletePackageAssemblyButton" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption">
										<AjaxEvents>
											<Click Before="var stringList = Ext.StringList('WebApp.Common');return Ext.MessageBox.ajaxEventConfirm(this,stringList.getValue('Message.Confirm'),stringList.getValue('Message.DeleteRecordConfirm'));"
												OnEvent="OnDeletePackageAssemblyButtonClick" Timeout="9000000" ShowLoadMask="true" />
										</AjaxEvents>
									</TS:Button>
								</TS:ControlLayout>
								<TS:TreeGrid ID="AssemblyGrid" runat="server" Width="100%" Height="100%" ContextMenuId="AssemblyMenu"
									Edges="0 0 0 0" ImageList="Terrasoft.WebApp" AutoExpandRootNode="false" FooterVisible="true"
									StyleSpec="" DataSourceId="SysPackageReferenceAssemblyDataSource" AllowExportData="false"
									EnableDragDrop="true" DragDropGroup="SchemasDD" Draggable="true" PrimaryDisplayColumnAsLookup="true">
									<AjaxEvents>
										<SelectionChange OnEvent="OnAssemblyGridSelectionChange" />
										<CellIconClick OnClientEvent="Terrasoft.AjaxMethods.OnAssemblyGridIconClick(iconId, nodeId)" />
									</AjaxEvents>
								</TS:TreeGrid>
							</Body>
						</TS:Tab>
						<TS:Tab runat="server" ID="PackageSqlScriptsTab" ShowMenuItemCaption="true" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.PackageSqlScriptsTab.Caption">
							<Menu>
								<TS:CheckMenuItem runat="server" Group="ShowSqlScripts" Checked="true" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.All.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowAllSqlScriptsMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
								<TS:CheckMenuItem runat="server" Group="ShowSqlScripts" Checked="false" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.Changed.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowModifiedSqlScriptsMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
								<TS:CheckMenuItem ID="ShowLockedSqlScriptsMenuItem" runat="server" Group="ShowSqlScripts" Checked="false" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.Locked.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowLockedSqlScriptsMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
							</Menu>
							<Body>
								<TS:ControlLayout runat="server" ID="ControlLayout8" DisplayStyle="Topbar" Width="100%" Edges="0 0 1 0" Margins="0 0 0 0">
									<TS:Button runat="server" ID="AddSqlScriptButton" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption">
										<Menu>
											<TS:MenuItem runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption">
												<AjaxEvents>
													<Click OnEvent="OnAddSqlScriptButtonClick" />
												</AjaxEvents>
											</TS:MenuItem>
											<TS:MenuItem runat="server" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.AddSqlFile.Caption">
												<AjaxEvents>
													<Click OnEvent="OnAddPackageSqlFileScriptButtonClick" />
												</AjaxEvents>
											</TS:MenuItem>
										</Menu>
									</TS:Button>
									<TS:Button runat="server" ID="EditSqlScriptButton" Caption="@Terrasoft.WebApp.BaseDesigner,Edit.Caption">
										<AjaxEvents>
											<Click OnEvent="OnEditSqlScriptButtonClick" />
										</AjaxEvents>
									</TS:Button>
									<TS:Button runat="server" ID="DeleteSqlScriptButton" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption">
										<AjaxEvents>
											<Click Before="var stringList = Ext.StringList('WebApp.Common');return Ext.MessageBox.ajaxEventConfirm(this,stringList.getValue('Message.Confirm'),stringList.getValue('Message.DeleteRecordConfirm'));"
												OnEvent="OnDeleteSqlScriptButtonClick" ShowLoadMask="true" />
										</AjaxEvents>
									</TS:Button>
								</TS:ControlLayout>
								<TS:TreeGrid ID="SqlScriptGrid" runat="server" Width="100%" Height="100%" ContextMenuId="SqlScriptMenu"
									Edges="0 0 0 0" ImageList="Terrasoft.WebApp" AutoExpandRootNode="false" FooterVisible="true"
									StyleSpec="" DataSourceId="SysPackageSqlScriptDataSource" AllowExportData="false"
									EnableDragDrop="true" DragDropGroup="SchemasDD" Draggable="true" PrimaryDisplayColumnAsLookup="true">
									<AjaxEvents>
										<SelectionChange OnEvent="OnSqlScriptGridSelectionChange" />
										<DblClick OnEvent="OnEditSqlScriptButtonClick" />
										<CellIconClick OnClientEvent="Terrasoft.AjaxMethods.OnSqlScriptGridIconClick(iconId, nodeId)" />
									</AjaxEvents>
								</TS:TreeGrid>
							</Body>
						</TS:Tab>
						<TS:Tab runat="server" ID="PackageSchemaDataTab" ShowMenuItemCaption="true" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.PackageDataTab.Caption">
							<Menu>
								<TS:CheckMenuItem runat="server" Group="ShowSchemaDatas" Checked="true" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.All.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowAllSchemaDatasMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
								<TS:CheckMenuItem runat="server" Group="ShowSchemaDatas" Checked="false" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.Changed.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowModifiedSchemaDatasMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
								<TS:CheckMenuItem ID="ShowLockedSchemaDatasMenuItem" runat="server" Group="ShowSchemaDatas" Checked="false" Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.ViewElements.Locked.Caption">
									<AjaxEvents>
										<Click OnEvent="OnShowLockedSchemaDatasMenuItemClick" ShowLoadMask="true" />
									</AjaxEvents>
								</TS:CheckMenuItem>
							</Menu>
							<Body>
								<TS:ControlLayout runat="server" ID="ControlLayout7" DisplayStyle="Topbar" Width="100%" Edges="0 0 1 0" Margins="0 0 0 0">
									<TS:Button runat="server" ID="AddSchemaDataButton" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption">
										<AjaxEvents>
											<Click OnEvent="OnAddSchemaDataButtonClick" />
										</AjaxEvents>
									</TS:Button>
									<TS:Button runat="server" ID="EditSchemaDataButton" Caption="@Terrasoft.WebApp.BaseDesigner,Edit.Caption">
										<AjaxEvents>
											<Click OnEvent="OnEditSchemaDataButtonClick" />
										</AjaxEvents>
									</TS:Button>
									<TS:Button runat="server" ID="DeleteSchemaDataButton" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption">
										<AjaxEvents>
											<Click Before="var stringList = Ext.StringList('WebApp.Common');return Ext.MessageBox.ajaxEventConfirm(this,stringList.getValue('Message.Confirm'),stringList.getValue('Message.DeleteRecordConfirm'));"
												OnEvent="OnDeleteSchemaDataButtonClick" ShowLoadMask="true" />
										</AjaxEvents>
									</TS:Button>
								</TS:ControlLayout>
								<TS:TreeGrid ID="SchemaDataGrid" runat="server" Width="100%" Height="100%" ContextMenuId="SchemaDataMenu"
									Edges="0 0 0 0" ImageList="Terrasoft.WebApp" AutoExpandRootNode="false" FooterVisible="true"
									StyleSpec="" DataSourceId="SysPackageSchemaDataDataSource" AllowExportData="false"
									EnableDragDrop="true" DragDropGroup="SchemasDD" Draggable="true" PrimaryDisplayColumnAsLookup="true">
									<AjaxEvents>
										<SelectionChange OnEvent="OnSchemaDataGridSelectionChange" />
										<DblClick OnEvent="OnEditSchemaDataButtonClick" />
										<CellIconClick OnClientEvent="Terrasoft.AjaxMethods.OnSchemaDataGridIconClick(iconId, nodeId)" />
									</AjaxEvents>
								</TS:TreeGrid>
							</Body>
						</TS:Tab>
						<TS:Tab runat="server" ID="PackageDependenciesTab" Visible="True"
							Caption="@Terrasoft.WebApp,WorkspaceExplorerModule.PackageDependenciesDiagram.Caption">
							<Body>
								<TS:ControlLayout ID="PackageDependenciesDiagramLayout" runat="server" Width="100%" Height="100%" HasSplitter="true">
									<TS:DiagramContainer ID="PackageDependenciesDiagram" Width="100%" Height="100%" runat="server">
									</TS:DiagramContainer>
								</TS:ControlLayout>
							</Body>
						</TS:Tab>
					</Tabs>
				</TS:TabPanel>
			</TS:ControlLayout>
			</TS:ControlLayout>
		</TS:ControlLayout>
	</form>
</body>
</html>
