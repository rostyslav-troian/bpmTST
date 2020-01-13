<%@ Page Language="C#" Caption="@Terrasoft.WebApp,PageSchemaDesigner.Caption" CodeBehind="PageSchemaDesigner.aspx.cs"
	Inherits="Terrasoft.WebApp.Designers.PageSchemaDesigner" %>

<%@ Register TagPrefix="UC" TagName="ObjectInspectorUserControl" Src="~/Templates/UserControls/ObjectInspectorUserControl.ascx" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
	<title></title>

	<script language="javascript" type="text/javascript">
		function onPageSchemaControlsTreeNodeDragOver(overEvent) {
			// TODO: необходимо отрефактроить с учетом новой реализации D&D в treegrid-е
			var rootNodeId = "B3FD54FA-11AB-490C-B85E-7A982CDFCF65";
			var topLevelControlId = "TopLevelControl";
			var parametersGroupControlId = "PageSchemaParameters";
			var dropNodes = overEvent.dropNodes;
			var targetNode = overEvent.target;
			var pt = overEvent.point;
			var targetTreeGrid = targetNode.getTreeGrid();
			var targetDataSource = targetTreeGrid.dataSource;
			var targetRow = targetDataSource.getRow(targetNode.id);
			var targetControlId = targetRow.getColumnValue("ControlId");
			var isTargetOneInnerPropertyShowed = targetRow.getColumnValue("IsOneInnerProperty");
			var targetControlType = targetRow.getColumnValue("ControlType");
			if (((targetControlId  == topLevelControlId) && (pt != "Append")) || (targetControlId == parametersGroupControlId)) {
				overEvent.cancel = true;
				return;
			}
			var innerDrag = (dropNodes.length > 0) && (dropNodes[0].treegrid == overEvent.treegrid);
			for (var n = 0; n < dropNodes.length; n++) {
				var dropNode = dropNodes[n];
				var dropTreeGrid = dropNode.getTreeGrid();
				var dropDataSource = dropTreeGrid.dataSource;
				var dropRow = dropDataSource.getRow(dropNode.id);
				var dropNodeType = dropRow.getColumnValue("NodeType");
				var targetNodeType = targetRow.getColumnValue("NodeType");
				var targetParentType = targetRow.getColumnValue("ParentType");
				var targetNodeIsContainer = targetRow.getColumnValue("IsContainer") == true;
				if ((targetNodeType == "InnerProperty" && pt != "Append") || 
					(pt == "Append" && dropNodeType != "InnerPropertyItem" && !targetNodeIsContainer)) {
					overEvent.cancel = true;
					return;
				}
				if (dropNodeType == "InnerProperty" || dropNodeType == "PageSchemaParameter"
					|| dropNodeType == "PageSchemaParametersGroup"
					|| ((dropNodeType == "PageControl" || dropNodeType == "InnerProperty") && targetNodeType == "PageSchemaParameter")) {
					overEvent.cancel = true;
					return;
				}
				if (targetNodeType != "InnerProperty" && dropNodeType == "InnerPropertyItem" &&
					 isTargetOneInnerPropertyShowed == false && targetNodeType != "InnerPropertyItem") {
					overEvent.cancel = true;
					return;
				} else if (targetNodeType == "InnerProperty" && dropNodeType == "InnerPropertyItem") {
					var dropNodeTypeName = dropRow.getColumnValue("TypeName");
					var targetNodeTypeName = targetRow.getColumnValue("TypeName");
					if (dropNodeTypeName + "Collection" != targetNodeTypeName) {
						overEvent.cancel = true;
						return;
					}
				}
				var targetDependences = targetRow.getColumnValue("Dependences");
				var dropControlType = dropRow.getColumnValue("ControlType");
				var dropParentType = dropRow.getColumnValue("ParentType");
				if (targetDependences) {
					var hasDependence = false;
					var dependences = Ext.decode(targetDependences);
					for (var i = 0; i < dependences.length; i++) {
						var dependence = dependences[i];
						if (pt != "Append" && ((targetNodeType != "InnerPropertyItem") ||
							dropControlType == targetControlType || targetParentType == dropParentType)) {
							hasDependence = true;
						}
						if (dependence.childType == dropControlType && pt != "Append" && (
								dropNodeType != targetNodeType)) {
							hasDependence = false;
						}
						if (dependence.childType == dropControlType && pt == "Append") {
							hasDependence = true;
						}
						if (dependence.childType != dropControlType &&
							dropControlType != targetControlType && targetParentType != dropParentType &&
							(targetNodeType == "InnerPropertyItem" || dropNodeType == "InnerPropertyItem") &&
							pt != "Append") {
							hasDependence = false;
						}
						if (hasDependence) {
							break;
						}
					}
					if (!hasDependence) {
						overEvent.cancel = true;
						return;
					}
				} else {
					if (isTargetOneInnerPropertyShowed == true && pt == "Append" &&
						dropNodeType == "InnerPropertyItem") {
						overEvent.cancel = true;
						return;
					}
					if (targetNodeType != "InnerProperty" && dropRow.getColumnValue("ParentDepended") == true && 
						(pt == "Append" || dropControlType != targetControlType)) {
						overEvent.cancel = true;
						return;
					}
					else if (pt != "Append") {
						if ((dropNodeType == "InnerPropertyItem" && (targetNodeType != "InnerPropertyItem")) || 
							(dropNodeType == "InnerPropertyItem" && dropControlType != targetControlType)) {
							overEvent.cancel = true;
							return;
						}
						if (dropControlType != targetControlType &&
							targetRow.getColumnValue("ParentDepended") == true) {
							overEvent.cancel = true;
							return;
						}
					}
				}
			}
		}

		function dropNodesHasInheritedControls(dropNodes) {
			for (var i = 0; i < dropNodes.length; i++) {
				var dropNode = dropNodes[i];
				var row = psdSchemaDataSource.getRow(dropNode.id);
				var controlId = row.getColumnValue("ControlId");
				if (!psdDesignModeManager.canMove(controlId)) {
					return true;
				}
			}
			return false;
		}

		function onPageSchemaControlsTreeBeforeNodesDrop(dropEvent) {
			psdDesignModeManager.unselectItems();
			return dropEvent.customDrop = true;
		}

		function removeSelectedControl() {
			var selNodeId = psdPageSchemaControlsTree.selModel.selNodes[0].id;
			var row = psdSchemaDataSource.getRow(selNodeId);
			var itemId = row.getColumnValue('ControlId');
			var parentPropertyId = row.getColumnValue('ParentId');
			var parentPropertyRow = psdSchemaDataSource.getRow(parentPropertyId);
			var parentItemId = parentPropertyRow.getColumnValue('ParentControlId');
			parentPropertyId = parentPropertyRow.getColumnValue('ControlId');
			psdDesignModeManager.removeItem(itemId, parentItemId, parentPropertyId);
		}

		function hideSelectedControl() {
			var controlId = psdDesignModeManager.currentItemId;
			psdHideComponentButton.setEnabled(false);
			if (controlId) {
				Terrasoft.AjaxMethods.HideControlById(controlId);
			}
		}

		function onSchemaDataSourceActiveRowChanged(dataSource, primaryColumnValue) {
			var activeRow = dataSource.getRow(primaryColumnValue);
			if (activeRow) {
				var controlId = activeRow.getColumnValue('ControlId');
				psdDesignModeManager.onItemSelect('', controlId);
				psdPageSchemaControlsTree.selectNodeById(primaryColumnValue);
				psdPageSchemaControlsTree.setActiveNodeById(primaryColumnValue);
				psdControlsCombobox.setValue(activeRow.getColumnValue('Caption'));
				//TODO добавить отключение кнопки удаления если надо
			}
		}

		function onSelectControlInUserMode(selectedItemId, requireTypeDescriptor, usageType, nodeAttributes) {
			var isHideButtonEnabled = false;
			var control = Ext.getCmp(selectedItemId);
			if (control) {
				isHideButtonEnabled = getCanHideSelectedControl(selectedItemId);
				selectControlById(selectedItemId);
				var row;
				var columnUId = control.columnUId;
				if (columnUId) {
					row = psdPrimaryEntitySchemaVirtualDataSource.findRow("ColumnUId", columnUId);
				}
				if (row) {
					psdPrimaryEntitySchemaVirtualDataSource.setActiveRow(row, false);
				} else if (psdPrimaryEntitySchemaColumnsTreeGrid.selModel.selData.length > 0) {
					psdPrimaryEntitySchemaColumnsTreeGrid.unselect();
					psdPrimaryEntitySchemaVirtualDataSource.setActiveRow(null, false);
				}
			}
			psdHideComponentButton.setEnabled(isHideButtonEnabled);
			return true;
		}

		function onPrimaryEntitySchemaVirtualDataSourceActiveRowChanged(dataSource, primaryColumnValue) {
			var activeRow = dataSource.getRow(primaryColumnValue);
			if (activeRow) {
				var controlId = activeRow.getColumnValue("ControlId");
				if (controlId) {
					selectControlById(controlId);
				}
				psdPrimaryEntitySchemaColumnsTreeGrid.selectNodeById(primaryColumnValue);
				psdPrimaryEntitySchemaColumnsTreeGrid.setActiveNodeById(primaryColumnValue);
			}
			setUserModeButtonsEnabled(activeRow);
		}

		function selectControlById(controlId) {
			var control = Ext.getCmp(controlId);
			if (control) {
				var ownerCt = control.ownerCt;
				if (ownerCt) {
					ownerCt.selectControl(control, true);
				}
			}
			psdDesignModeManager.currentItemId = controlId;
		}

		function getCanHideSelectedControl(controlId) {
			var isHideEnabled = false;
			var control = Ext.getCmp(controlId);
			if (control) {
				var isField = control instanceof Ext.form.Field;
				var isCompositLayoutControl = control instanceof Terrasoft.CompositeLayoutControl;
				isHideEnabled = isField || isCompositLayoutControl;
			}
			return isHideEnabled;
		}

		function setUserModeButtonsEnabled(activeRow) {
			var isHideButtonEnabled = false;
			var isEditButtonEnabled = false;
			var isDeleteButtonEnabled = false;
			if (activeRow) {
				var manageButtonsEnabled = activeRow.getColumnValue("ManageButtonsEnabled");
				if (manageButtonsEnabled.toLowerCase() == "true") {
					isEditButtonEnabled = true;
					isDeleteButtonEnabled = true;
				}
				var controlId = activeRow.getColumnValue("ControlId");
				if (controlId) {
					isHideButtonEnabled = getCanHideSelectedControl(controlId);
				}
			}
			psdEditButton.setEnabled(isEditButtonEnabled);
			psdDeleteButton.setEnabled(isDeleteButtonEnabled);
			psdHideComponentButton.setEnabled(isHideButtonEnabled);
		}

		function onPropertiesDataSourceLoaded(dataSource, rows, cfg) {
			psdPropertiesDataSource.setActiveRow(0);
		}

		function onPropertiesDataSourceStructureLoaded(dataSource) {
			if (psdDesignModeManager.isCurrentItemResponse) {
				var descriptor = psdDesignModeManager.getCurrentItemDescriptor();
				psdObjectInspector.rebuild(descriptor);
			}
		}

		function onSettingsDataSourceLoaded(dataSource, rows, cfg) {
			psdSettingsDataSource.setActiveRow(0);
		}

		function OnApplySettings() {
			psdDesignModeManager.onSettingChanged(Ext.encode(psdDesignModeManager.changedSettings));
		}

		function onComponentsSearchSpecialKey(el, e) {
			var key = e.getKey();
			var text = psdComponentsSearch.getValue();
			var oneList = psdComponentsMenuPanel.oneList;
			switch (key) {
				case e.ENTER :
					var restoreMenu = Ext.isEmpty(text) ? (oneList ? true : false) : false;
					var buildOneList = Ext.isEmpty(text) ? false : (oneList ? false : true);
					var addCssClass = Ext.isEmpty(text) ? false : true;
					var removeCssClass = Ext.isEmpty(text) ? true : false;
					var filter = Ext.isEmpty(text) ? false : true;
					var showSearchToolButton = Ext.isEmpty(text) ? false : true;
					break;
				case e.ESC :
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
				psdComponentsMenuPanel.removeFilter();
				if (ShowGroupsMenuItem.checked) {
					psdComponentsMenuPanel.restoreMenu();
				}
			}
			if (buildOneList) {
				psdComponentsMenuPanel.buildOneLevelMenu();
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
				psdComponentsMenuPanel.setFilter(function(item) {
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

		function onClearSearchValue(e) {
			psdComponentsSearch.setValue('');
			psdToolButtonClearSearch.hide();
			psdComponentsMenuPanel.removeFilter();
			if (ShowGroupsMenuItem.checked) {
				psdComponentsMenuPanel.restoreMenu();
			}
			psdComponentsSearch.getEl().removeClass('x-qf-text');
		}

		function onControlsComboboxSelect(control, recordParameter, index) {
			var record = Ext.decode(recordParameter);
			var id = record.value;
			psdDesignModeManager.selectItem(null, id);
		}

		function onControlsComboboxBeforeQuery(queryEvent) {
			var control = queryEvent.combo;
			var itemList = getControlsListBySchemaDataSource(psdSchemaDataSource);
			control.store.setDefaultSort('text');
			control.loadData(itemList);
		}

		function getControlsListBySchemaDataSource(psdSchemaDataSource) {
			var controlsList = new Array();
			for (var i = 0; i < psdSchemaDataSource.rows.length; i++) {
				var record = psdSchemaDataSource.rows.items[i];
				var nodeType = record.getColumnValue("NodeType");
				var typeName = record.getColumnValue("TypeName");
				if ((nodeType != "InnerProperty") && (typeName != "DataSourceStructureColumn")) {
					var control = new Array();
					control.push(record.getColumnValue("ControlId"));
					control.push(record.getColumnValue("Caption"));
					controlsList.push(control);
				}
			}
			return controlsList;
		}

		function onObjectInspectorDesignModeUsageTypeChange(designModeUsageType) {
			psdDesignModeManager.setUsageType(designModeUsageType);
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

		function sortControlTreeByAlphabet() {
			psdComponentsMenuPanel.sortItems('ASC', function (a, b) {
				return a.caption < b.caption ? -1 : 1;
			});
		}

		function sortControlTreeByPosition() {
			psdComponentsMenuPanel.sortItems('ASC', function (a, b) {
				return a.sortPosition < b.sortPosition ? -1 : 1;
			});
		}

		function actualizePsdControlsCombobox(value) {
			psdControlsCombobox.setRawValue(value);
		}

		function onPageSchemaControlsTreeNotifyOut(overEvent) {
			var dropNodes = overEvent.dropNodes;
			var targetNode = overEvent.target;
			var designerDDGroup = "DesignerDD";
			var treeDDGroup = "TreeDD";
			for (var n = 0; n < dropNodes.length; n++) {
				var dropNode = dropNodes[n];
				var dropTreeGrid = dropNode.getTreeGrid();
				var dropDataSource = dropTreeGrid.dataSource;
				var dropRow = dropDataSource.getRow(dropNode.id);
				var dragDropGroup = dropRow.getColumnValue("DragDropGroup");
				var dragDropSource = overEvent.source;
				if (dragDropGroup) {
					dragDropSource.addToGroup(dragDropGroup);
					dragDropSource.ddGroup = dragDropGroup;
				} else if (dragDropSource.ddGroup !== treeDDGroup) {
					dragDropSource.removeFromGroup(designerDDGroup);
					dragDropSource.ddGroup = treeDDGroup;
				}
			}
		}
		
		function scrollToEl(component, container) {
			var ownerCt = (container || component).ownerCt;
			if (ownerCt && ownerCt.autoScroll) {
				ownerCt.layout.contentTarget.dom.scrollToElement(component.getEl().dom);
			}
			if (!ownerCt) {
				return;
			}
			scrollToEl(component, ownerCt);
		}

	</script>

</head>
<body>
	<form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" AjaxViewStateMode="Include"/>
	<UC:ObjectInspectorUserControl ID="PropertiesWindow" runat="server" />
	<TS:VirtualDataSource ID="psdComponentsDataSource" runat="server" />
	<TS:VirtualDataSource ID="psdSchemaDataSource" runat="server" />
	<TS:VirtualDataSource ID="psdPropertiesDataSource" runat="server">
		<AjaxEvents>
			<Loaded OnClientEvent="onPropertiesDataSourceLoaded(dataSource,dataArray,request);" />
			<StructureLoaded OnClientEvent="onPropertiesDataSourceStructureLoaded(dataSource)" />
		</AjaxEvents>
	</TS:VirtualDataSource>
	<TS:VirtualDataSource ID="psdSettingsDataSource" runat="server">
		<AjaxEvents>
			<Loaded OnClientEvent="onSettingsDataSourceLoaded(dataSource,dataArray,request);" />
		</AjaxEvents>
	</TS:VirtualDataSource>
	<TS:VirtualDataSource ID="psdPrimaryEntitySchemaVirtualDataSource" runat="server" EnableServerActiveRow="false">
		<AjaxEvents>
			<ActiveRowChanged OnClientEvent="onPrimaryEntitySchemaVirtualDataSourceActiveRowChanged(dataSource, primaryColumnValue);" />
		</AjaxEvents>
	</TS:VirtualDataSource>
	<TS:PageSchemaDesignModeManager runat="server" ID="psdDesignModeManager" SchemaDataSourceId="psdSchemaDataSource"
		PropertyDataSourceId="psdPropertiesDataSource" SettingsDataSourceId="psdSettingsDataSource" OnSchemaChanged="DesignModeManager_OnSchemaChanged">
	</TS:PageSchemaDesignModeManager>
	<TS:Menu ID="psdVisualControlDesignerActionMenu" runat="server" ImageList="Terrasoft.WebApp">
		<Items>
			<TS:MenuItem runat="server" ID="psdVisualControlsDesignerAddMenuRootItem" Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption"
				ImageList="Terrasoft.WebApp" ImageName="common-icon-add.png">
				<AjaxEvents>
					<MenuItemClick OnEvent="OnControlsAddMenuItemClick" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem runat="server" ID="psdVisualControlsDesignerAddDependenceMenuRootItem"
				Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption" ImageName="common-icon-add.png">
				<AjaxEvents>
					<MenuItemClick OnEvent="OnControlsAddMenuItemClick" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuItem runat="server" ID="psdAddPageParameter"
				Caption="@Terrasoft.WebApp.BaseDesigner,Add.Caption" ImageName="common-icon-add.png">
				<AjaxEvents>
					<Click OnEvent="OnPsdAddPageParameterClick" />
				</AjaxEvents>
			</TS:MenuItem>
			<TS:MenuSeparator runat="server" ID="psdSeparatorAfterAddMenuItem" />
			<TS:MenuItem runat="server" ID="psdDeleteControlMenuItem" Caption="@Terrasoft.WebApp.BaseDesigner,Delete.Caption"
				ImageList="Terrasoft.WebApp" ImageName="common-icon-delete.png">
				<AjaxEvents>
					<Click OnClientEvent="removeSelectedControl();" />
				</AjaxEvents>
			</TS:MenuItem>
		</Items>
		<AjaxEvents>
			<Prepare OnEvent="OnVisualControlDesignerActionMenuPrepare" />
		</AjaxEvents>
	</TS:Menu>
	
	<TS:ControlLayout IsViewPort="true" runat="server" Direction="Vertical" Padding="5" HelpContextId="313">
		<TS:ControlLayout runat="server" Width="100%" DisplayStyle="Topbar" Margins="0 0 4 0">
			<TS:Button ID="psdSaveButtonInUserMode" runat="server" Hidden="True"
				Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName: commondesigner-save.png}">
				<AjaxEvents>
					<Click OnEvent="SaveButtonInUserModeOnClick" ShowLoadMask="true" Timeout="999999"/>
				</AjaxEvents>
			</TS:Button>
			<TS:Button ID="psdSaveButton" runat="server" Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName: commondesigner-save.png}">
				<AjaxEvents>
					<Click OnEvent="SaveButtonOnClick" ShowLoadMask="true" />
				</AjaxEvents>
				<Menu>
					<TS:MenuItem ID="psdSaveWithoutVerificationMenuItem" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Save.WithoutVerification"
						Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName: commondesigner-save.png}">
						<AjaxEvents>
							<Click OnEvent="SaveButtonOnClick" ShowLoadMask="true" />
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem ID="psdSaveWithVerificationMenuItem" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Save.WithVerification"
						Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp.BaseDesigner, ResourceItemName: commondesigner-savewithverification.png}">
						<AjaxEvents>
							<Click OnEvent="SaveWithVerificationOnClick" ShowLoadMask="true" Timeout="900000000"/>
						</AjaxEvents>
					</TS:MenuItem>
				</Menu>
			</TS:Button>
			<TS:Spacer ID="psdSpacerAfterSaveButton" StripeVisible="true" runat="server" />
			<TS:Button ID="psdSelectMode" runat="server" ImageAsSprite="false"
				Image="{Source: ResourceManager, ResourceManagerName: Terrasoft.WebApp, ResourceItemName: processschemadesigner-img-arrow-base.png}">
			</TS:Button>
			<TS:Button ID="psdDelete" runat="server" ImageAsSprite="false"
				Image="{Source: ResourceManager, ResourceManagerName: Terrasoft.WebApp, ResourceItemName: common-icon-delete.png}">
				<AjaxEvents>
					<Click OnClientEvent="removeSelectedControl();" />
				</AjaxEvents>
			</TS:Button>
			<TS:Spacer ID="psdSpacer2" StripeVisible="true" runat="server" />
			<TS:Button runat="server" ID="psdPreviewButton" Caption="@Terrasoft.WebApp,PageSchemaDesigner.PreviewCaption">
				<AjaxEvents>
					<Click OnEvent="PreviewButtonOnClick" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button runat="server" ID="psdRunButton" Caption="@Terrasoft.WebApp,PageSchemaDesigner.RunCaption">
				<AjaxEvents>
					<Click OnEvent="RunButtonOnClick" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button runat="server" ID="psdAddNewControl" Caption="@Terrasoft.WebApp.PageSchemaDesigner,EntityColumnMenu.Add.Caption" Hidden="true">
				<Menu>
					<TS:MenuItem ID="psdAddStringComponent" runat="server"  Tag="String" 
						Caption="@Terrasoft.WebApp.PageSchemaDesigner,EntityColumnMenu.DataType.String.Caption"
						Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName: textedit.png}">
						<AjaxEvents>
							<Click OnEvent="AddNewControlOnClick"/>
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem ID="psdAddIntegerComponent" runat="server"  Tag="Integer" 
						Caption="@Terrasoft.WebApp.PageSchemaDesigner,EntityColumnMenu.DataType.Integer.Caption"
						Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName: integeredit.png}">
						<AjaxEvents>
							<Click OnEvent="AddNewControlOnClick"/>
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem ID="psdAddFloatComponent" runat="server"  Tag="Float" 
						Caption="@Terrasoft.WebApp.PageSchemaDesigner,EntityColumnMenu.DataType.Float.Caption"
						Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName: floatedit.png}">
						<AjaxEvents>
							<Click OnEvent="AddNewControlOnClick"/>
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem ID="psdAddDateTimeComponent" runat="server"  Tag="DateTime" 
						Caption="@Terrasoft.WebApp.PageSchemaDesigner,EntityColumnMenu.DataType.DateTime.Caption"
						Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName: datetimeedit.png}">
						<AjaxEvents>
							<Click OnEvent="AddNewControlOnClick"/>
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem ID="psdAddLookupComponent" runat="server"  Tag="Lookup" 
						Caption="@Terrasoft.WebApp.PageSchemaDesigner,EntityColumnMenu.DataType.Lookup.Caption"
						Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName: lookupedit.png}">
						<AjaxEvents>
							<Click OnEvent="AddNewControlOnClick"/>
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem ID="psdAddBooleanComponent" runat="server"  Tag="Boolean" 
						Caption="@Terrasoft.WebApp.PageSchemaDesigner,EntityColumnMenu.DataType.Boolean.Caption"
						Image="{Source: ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName: checkbox.png}">
						<AjaxEvents>
							<Click OnEvent="AddNewControlOnClick"/>
						</AjaxEvents>
					</TS:MenuItem>
				</Menu>
			</TS:Button>
			<TS:Button runat="server" ID="psdHideComponentButton" Caption="@Terrasoft.WebApp.PageSchemaDesigner,EntityColumnMenu.Hide.Caption" Hidden="true">
				<AjaxEvents>
					<Click OnClientEvent="hideSelectedControl();"/>
				</AjaxEvents>
			</TS:Button>
			<TS:Button runat="server" ID="psdEditButton" Caption="@Terrasoft.WebApp.PageSchemaDesigner,EntityColumnMenu.Edit.Caption"
				Hidden="true">
				<AjaxEvents>
					<Click OnEvent="EditButtonOnClick" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button runat="server" ID="psdDeleteButton" Caption="@Terrasoft.WebApp.PageSchemaDesigner,EntityColumnMenu.Delete.Caption"
				Hidden="true">
			</TS:Button>
			<TS:Spacer ID="psdSpacer3" Size="100%" runat="server" />
			<TS:Button ID="psdAdditional" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Additional.Caption">
				<Menu>
					<TS:MenuItem ID="psdOpenProcessMenuItem" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,OpenProcess.Caption">
						<AjaxEvents>
							<Click OnClientEvent="Terrasoft.AjaxMethods.OpenPageSchemaProcess()" />
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuSeparator />
					<TS:MenuItem ID="psdViewSource" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,View.Source">
						<AjaxEvents>
							<Click OnEvent="ViewSourceButtonOnClick" />
						</AjaxEvents>
					</TS:MenuItem>
					<TS:MenuItem ID="psdViewMetaData" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,View.MetaData">
						<AjaxEvents>
							<Click OnEvent="ViewMetaDataButtonOnClick" />
						</AjaxEvents>
					</TS:MenuItem>
				</Menu>
			</TS:Button>
			<TS:Button ID="psdPropertiesButton" runat="server" Caption="@Terrasoft.WebApp.BaseDesigner,Settings.Caption">
				<AjaxEvents>
					<Click OnEvent="PropertiesButtonOnClick" />
				</AjaxEvents>
			</TS:Button>
			<TS:Button runat="server" ID="psdRedirectToBaseModeDesigner" Caption="@Terrasoft.WebApp.PageSchemaDesigner,ButtonPanel.RedirectToBaseModeDesigner.Caption"
				Hidden="true">
				<AjaxEvents>
					<Click Before="var stringList = Ext.StringList('WebApp.PageSchemaDesigner');return Ext.MessageBox.ajaxEventConfirm(this,stringList.getValue('Messages.RedirectToBaseModeDesignerConfirm.Caption'),stringList.getValue('Messages.RedirectToBaseModeDesignerConfirm.Msg'));"
						OnEvent="RedirectToBaseModeDesignerButtonOnClick" />
				</AjaxEvents>
			</TS:Button>
            <TS:Button runat="server" ID="psdHelpButton" ImageList="Terrasoft.WebApp" ImageAsSprite="true" CanFocus="false"
				Image="{Source:ResourceManager, ResourceManagerName:Terrasoft.WebApp, ResourceItemName:help.png}" Hidden="true" >
				<AjaxEvents>
					<Click OnClientEvent="Terrasoft.HelpContext.showHelp(null, 'psdHelpButton')" />
				</AjaxEvents>
			</TS:Button>
        </TS:ControlLayout>
		<TS:MessagePanel ID="MessagePanel" runat="server" Hidden="true" Width="100%" />
		<TS:ControlLayout runat="server" HasSplitter="true" Margins="0 0 5 0" Height="100%"
			Direction="Horizontal" Width="100%">
			<TS:TabPanel runat="server" ID="psdComponentsTabPanel" Width="300px" Height="100%" HasSplitter="true" DockSite="true"
				HasOptionsButton="false" Collapsible="false">
				<Tabs>
					<TS:Tab runat="server" ID="psdPrimaryDataSourceEntitySchemaColumnsTab" Caption="@Terrasoft.WebApp,PageSchemaDesigner.EntityFields.Caption" Hidden="true">
						<Body>
							<TS:TreeGrid ID="psdPrimaryEntitySchemaColumnsTreeGrid" runat="server" Height="100%" Width="100%"
								EnableInnerDragDrop="true" DataSourceId="psdPrimaryEntitySchemaVirtualDataSource" FooterVisible="false"
								ImageList="Terrasoft.WebApp" HideHeaders="true" ShowAutoWidthMenu="false" SelectionMode="SingleRow"
								ShowMultiLineMenu="false" ShowSummariesMenu="false" StripeRows="false" HideRowBorders="true"
								QuickViewMode="None">
							</TS:TreeGrid>
						</Body>
					</TS:Tab>
					<TS:Tab runat="server" ID="psdComponentsTab2" Caption="@Terrasoft.WebApp,PageSchemaDesigner.Elements.Caption">
						<Body>
							<TS:ControlLayout ID="psdWrapControlLayout" runat="server" Direction="Vertical" Height="100%" Width="100%"
								DisplayStyle="Topbar" Edges="0 0 1 0" Margins="1 0 0 0">
								<TS:TextEdit runat="server" ID="psdComponentsSearch" Width="100%" EmptyText="@Terrasoft.UI.WebControls,SearchEmptyText.Caption">
									<Tools>
										<TS:ToolButton ID="psdToolButtonClearSearch" runat="server"
											Image="{ResourceManagerName:Terrasoft.UI.WebControls,ResourceItemName:toolbutton-close.gif,Source:ResourceManager}">
											<AjaxEvents>
												<Click OnClientEvent="onClearSearchValue(e)" />
											</AjaxEvents>
										</TS:ToolButton>
									</Tools>
									<AjaxEvents>
										<SpecialKey OnClientEvent="onComponentsSearchSpecialKey(el, e);" />
									</AjaxEvents>
								</TS:TextEdit>
								<TS:Spacer runat="server" StripeVisible="true" />
								<TS:Button runat="server" ID="ComponentsPropertiesButton" ImageAsSprite="false"
									Image="{Source: ResourceManager, ResourceManagerName: Terrasoft.UI.WebControls, ResourceItemName: config.png}">
									<Menu>
										<TS:MenuSeparator runat="server" Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.Sorting" />
										<TS:CheckMenuItem runat="server" ID="SortByNameMenuItem" Group="ControlsSortingTypes"
											Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.PropertySortingType.Alphabet">
											<AjaxEvents>
												<Click OnClientEvent="sortControlTreeByAlphabet();" />
											</AjaxEvents>
										</TS:CheckMenuItem>
										<TS:CheckMenuItem runat="server" ID="SortByPositionMenuItem"  Group="ControlsSortingTypes" Checked="true"
											Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.PropertySortingType.Position">
											<AjaxEvents>
												<Click OnClientEvent="sortControlTreeByPosition();" />
											</AjaxEvents>
										</TS:CheckMenuItem>
										<TS:MenuSeparator runat="server" Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.Grouping" />
										<TS:CheckMenuItem runat="server" ID="ShowGroupsMenuItem" Checked="true" 
											Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.UseGroups">
											<AjaxEvents>
												<CheckChange OnClientEvent="hideComponentsGroups(el);" />
											</AjaxEvents>
										</TS:CheckMenuItem>
										<TS:MenuItem runat="server" ID="CollapseGroups"
											Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.CollapseGroups">
											<AjaxEvents>
												<Click OnClientEvent="psdComponentsMenuPanel.collapseAllGroups();" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuItem runat="server" ID="ExpandGroups"
											Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.ExpandGroups">
											<AjaxEvents>
												<Click OnClientEvent="psdComponentsMenuPanel.expandAllGroups();" />
											</AjaxEvents>
										</TS:MenuItem>
										<TS:MenuSeparator runat="server" Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.DisplayElements" />
										<TS:CheckMenuItem ID="DisplayGeneralControlsMenuItem" runat="server" Group="ControlsDisplayProperties" Checked="true"
											Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.DisplayProperty.General">
											<AjaxEvents>
												<Click OnClientEvent="rebuildControlsTree(false);" />
											</AjaxEvents>
										</TS:CheckMenuItem>
										<TS:CheckMenuItem ID="DisplayAvailiableControlsMenuItem" runat="server" Group="ControlsDisplayProperties"
											Caption="@Terrasoft.UI.WebControls.ObjectInspector,DisplaySettings.DisplayProperty.Availiable">
											<AjaxEvents>
												<Click OnClientEvent="rebuildControlsTree(true);" />
											</AjaxEvents>
										</TS:CheckMenuItem>
									</Menu>
								</TS:Button>
							</TS:ControlLayout>
							<TS:MenuPanel runat="server" ID="psdComponentsMenuPanel" Width="100%" Height="100%"
								CollapseMode="Multiple" AllowDraggingMenuItems="true" DragDropGroup="DesignerDD">
							</TS:MenuPanel>
						</Body>
					</TS:Tab>
				</Tabs>
			</TS:TabPanel>
			<TS:ControlLayout runat="server" ID="psdScrollingLayout" Margins="0 0 0 0" CollapseMode="Auto"
				Padding="10" Width="100%" HasSplitter="true" AutoScroll="true" Height="100%" Edges="1 1 1 1">
				<TS:ControlLayout runat="server" ID="psdTopLevelControl" DragDropMode="DragDrop" DragDropGroup="DesignerDD"
					Edges="1 1 1 1" StartNewAlignGroup="true">
				</TS:ControlLayout>
			</TS:ControlLayout>
			<TS:ControlLayout runat="server" ID="psdLeftControlLayout" Width="300px" Height="100%" Direction="Vertical">
				<TS:TabPanel runat="server" ID="psdControlTabs" HasSplitter="true" Width="100%" HasOptionsButton="false"
					Collapsible="true" Height="30%" Margins="0 0 0 0" AllowDraggingTabs="true" DockSite="true">
					<Tabs>
						<TS:Tab runat="server" ID="psdPageSchemaTab" Caption="@Terrasoft.WebApp.BaseDesigner,Schema.Caption"
							Draggable="true" AllowDraggingOutside="true">
							<Body>
								<TS:ControlLayout runat="server" Width="100%"
									DisplayStyle="Topbar" Edges="0 0 1 0" Margins="1 0 0 0">
									<TS:ComboBoxEdit runat="server" ID="psdControlsCombobox" Width="100%" Sorted="true">
										<AjaxEvents>
											<Select OnClientEvent="onControlsComboboxSelect(el, record, index);" />
											<BeforeQuery OnClientEvent="onControlsComboboxBeforeQuery(queryEvent);" />
										</AjaxEvents>
									</TS:ComboBoxEdit>
								</TS:ControlLayout>
								<TS:ControlLayout runat="server" Direction="Vertical" Height="100%" Width="100%"
									Padding="3 3 3 3">
									<TS:TreeGrid runat="server" ID="psdPageSchemaControlsTree" Height="100%" Width="100%"
										EnableInnerDragDrop="true" FooterVisible="false"
										ImageList="Terrasoft.WebApp" HideHeaders="true" ShowAutoWidthMenu="false"
										ShowMultiLineMenu="false" ShowSummariesMenu="false" StripeRows="false" HideRowBorders="true"
										QuickViewMode="None" ContextMenuId="psdVisualControlDesignerActionMenu">
										<AjaxEvents>
											<BeforeNodesDrop OnClientEvent="onPageSchemaControlsTreeBeforeNodesDrop(dropEvent)" />
											<NodesDrop OnClientEvent="Terrasoft.AjaxMethods.ControlTreeOnNodesDrop(nodes,targetNode,parentNode,movePosition)" />
											<NodeDragOver OnClientEvent="onPageSchemaControlsTreeNodeDragOver(overEvent)" />
											<NotifyOut OnClientEvent="onPageSchemaControlsTreeNotifyOut(overEvent)" />
										</AjaxEvents>
									</TS:TreeGrid>
								</TS:ControlLayout>
							</Body>
						</TS:Tab>
					</Tabs>
				</TS:TabPanel>
				<TS:TabPanel runat="server" HasOptionsButton="false" HasSplitter="true" Width="100%"
					Collapsible="true" Height="70%" AllowDraggingTabs="true" DockSite="true">
					<Tabs>
						<TS:Tab ID="psdObjectInspectorTab" Caption="@Terrasoft.WebApp.BaseDesigner,ObjectInspector.Caption"
							Draggable="true" AllowDraggingOutside="true" runat="server">
							<Body>
								<TS:ObjectInspector runat="server" Width="100%" Height="100%" ID="psdObjectInspector"
									ViewButtonsMode="AjaxControl" PropertiesDataSourceId="psdPropertiesDataSource">
									<AjaxEvents>
										<DesignModeUsageTypeChange OnClientEvent="onObjectInspectorDesignModeUsageTypeChange(designModeUsageType);" />
									</AjaxEvents>
								</TS:ObjectInspector>
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
