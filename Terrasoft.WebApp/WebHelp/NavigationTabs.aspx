<%@ Page Language="C#" CodeBehind="NavigationTabs.aspx.cs" Inherits="Terrasoft.WebApp.WebHelp.NavigationTabs" %>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
<link rel="Stylesheet" type="text/css" href="webhelp_navigation_tabs.css" />
<script language="javascript" src="whver.js"></script>
<script language="javascript1.2" src="whmsg.js"></script>
<script language="javascript1.2" src="whproxy.js"></script>
<script language="javascript1.2" src="whutils.js"></script>
<script language="javascript1.2" type="text/javascript" >

var gsBgColor="#F6F9FA"
var gsBgImage="";
var gnCurPane=0;
var gsFirstPane="";
var goTocFont=null;
var goIdxFont=null;
var goFtsFont=null;
var goGloFont=null;
var gPane=new Array();
var gShowFirst=0;
var gnTabType=0;

function window_unload() {
	UnRegisterListener2(this,WH_MSG_SHOWTOC);
	UnRegisterListener2(this,WH_MSG_SHOWIDX);
	UnRegisterListener2(this,WH_MSG_SHOWFTS);
	UnRegisterListener2(this,WH_MSG_SHOWGLO);
}

function setFont(sType,sFontName,sFontSize,sFontColor,sFontStyle,sFontWeight,sFontDecoration) {
	var vFont=new whFont(sFontName,sFontSize,sFontColor,sFontStyle,sFontWeight,sFontDecoration);
	if (sType=="Toc") {
		goTocFont=vFont;
	} else if (sType=="Idx") {
		goIdxFont=vFont;
	} else if (sType=="Fts") {
		goFtsFont=vFont;
	} else if (sType=="Glo") {
		goGloFont=vFont;
	}
}

function TocWriteClassStyle() {
	var sStyle="<STYLE TYPE='text/css'>";
	sStyle+=".TextTabToc {"+getFontStyle(goTocFont)+"}";
	sStyle+=".TextTabIdx {"+getFontStyle(goIdxFont)+"}";
	sStyle+=".TextTabFts {"+getFontStyle(goFtsFont)+"}";
	sStyle+=".TextTabGlo {"+getFontStyle(goGloFont)+"}";
	sStyle+="A:hover {text-decoration:underline;}";
	sStyle+="</STYLE>";
	document.write(sStyle);
}

function setBackgroundcolor(sBgColor) {
	if (sBgColor!=null&&sBgColor.length>0) {
		gsBgColor=sBgColor;
	}
}

function setBackground(sBgImage) {
	if (sBgImage!=null&&sBgImage.length>0) {
		gsBgImage=sBgImage;
	}
}

function selectToc() {
	var oMessage=new whMessage(WH_MSG_SHOWTOC,this,1,null);
	SendMessage(oMessage);
}

function selectIdx() {
	var oMessage=new whMessage(WH_MSG_SHOWIDX,this,1,null);
	SendMessage(oMessage);
}

function selectFts() {
	var oMessage=new whMessage(WH_MSG_SHOWFTS,this,1,null);
	SendMessage(oMessage);
}

function selectGlo() {
	var oMessage=new whMessage(WH_MSG_SHOWGLO,this,1,null);
	SendMessage(oMessage);
}

function onSendMessage(oMsg) {
	return true;
}

function showTab(n) {
	gnCurPane=n;
	if (gnTabType==0) {
		if (n<gPane.length) {
			if (document.images["TocTab"]&&document.images["TocTab"]!=null) {
				if (gPane[n]=="toc") {
					document.images["TocTab"].src=getBtnImage("toc",1);
				} else {
					document.images["TocTab"].src=getBtnImage("toc",0);
				}
			}
			if (document.images["IndexTab"]&&document.images["IndexTab"]!=null) {
				if (gPane[n]=="idx") {
					document.images["IndexTab"].src=getBtnImage("idx",1);
				} else {
					document.images["IndexTab"].src=getBtnImage("idx",0);
				}
			}
			if (document.images["FtsTab"]&&document.images["FtsTab"]!=null) {
				if (gPane[n]=="fts") {
					document.images["FtsTab"].src=getBtnImage("fts",1);
				} else {
					document.images["FtsTab"].src=getBtnImage("fts",0);
				}
			}
			if (document.images["GloTab"]&&document.images["GloTab"]!=null) {
				if (gPane[n]=="glo") {
					document.images["GloTab"].src=getBtnImage("glo",1);
				} else {
					document.images["GloTab"].src=getBtnImage("glo",0);
				}
			}
		}
	} else if (gnTabType==2) {
		if (n<gPane.length) {
			if (document.images["tabSelection"]!=null) {
				document.images["tabSelection"].src=getMapImage(gPane[n]);
			}
		}
	}
}

function addPane(sName) {
	gPane[gPane.length]=sName;
}

function setShowPane(sName) {
	if (gsFirstPane!="") {
		sName=gsFirstPane;
	}
	for (var i=0;i<gPane.length;i++) {
		if (gPane[i]==sName) {
			gShowFirst=i;
		}
	}
}

function selectDefaultTab() {
	showTab(gShowFirst);
	if (document.body) {
		if (gsBgImage&&gsBgImage.length>0) {
			document.body.background=gsBgImage;
		}
		if (gsBgColor&&gsBgColor.length>0) {
			document.body.bgColor=gsBgColor;
		}
	}
}

function getTabsHTML() {
	var sHTML="";
	for (var i=0;i<gPane.length;i++) {
		if (gnTabType==0) {
			sHTML+=getTabHTML(gPane[i]);
		} else if (gnTabType==1) {
			if (sHTML.length>0) {
				sHTML+=getSeparator();
			}
			sHTML+=getTabHTMLText(gPane[i]);
		}
	}
	return sHTML;
}

function getSeparator() {
	var sSep="";
	return sSep;
}

function mouseOverToc() {
	var sImg = "";
	if (gPane[gnCurPane] == "toc") {
		sImg = getBtnImage("toc", 3);
	} else {
		sImg = getBtnImage("toc", 2);
	}
	if (sImg.length > 0) {
		document.images["TocTab"].src = sImg;
	}
}

function mouseOverIdx() {
	var sImg = "";
	if (gPane[gnCurPane] == "idx") {
		sImg = getBtnImage("idx", 3);
	} else {
		sImg = getBtnImage("idx", 2);
	}
	if (sImg.length > 0) {
		document.images["IndexTab"].src = sImg;
	}
}

function mouseOverFts() {
	var sImg = "";
	if (gPane[gnCurPane] == "fts") {
		sImg = getBtnImage("fts", 3);
	} else {
		sImg = getBtnImage("fts", 2);
	}
	if (sImg.length > 0) {
		document.images["FtsTab"].src = sImg;
	}
}

function mouseOverGlo() {
	var sImg = "";
	if (gPane[gnCurPane] == "glo") {
		sImg = getBtnImage("glo", 3);
	} else {
		sImg = getBtnImage("glo", 2);
	}
	if (sImg.length > 0) {
		document.images["GloTab"].src = sImg;
	}
}

function mouseOutToc() {
	var sImg = "";
	if (gPane[gnCurPane] == "toc") {
		sImg = getBtnImage("toc", 1);
	} else {
		sImg = getBtnImage("toc", 0);
	}
	if (sImg.length > 0) {
		document.images["TocTab"].src = sImg;
	}
}

function mouseOutIdx() {
	var sImg = "";
	if (gPane[gnCurPane] == "idx") {
		sImg = getBtnImage("idx", 1);
	} else {
		sImg = getBtnImage("idx", 0);
	}
	if (sImg.length > 0) {
		document.images["IndexTab"].src = sImg;
	}
}

function mouseOutFts() {
	var sImg = "";
	if (gPane[gnCurPane] == "fts") {
		sImg = getBtnImage("fts", 1);
	} else {
		sImg = getBtnImage("fts", 0);
	}
	if (sImg.length > 0) {
		document.images["FtsTab"].src = sImg;
	}
}

function mouseOutGlo() {
	var sImg = "";
	if (gPane[gnCurPane] == "glo") {
		sImg = getBtnImage("glo", 1);
	} else {
		sImg = getBtnImage("glo", 0);
	}
	if (sImg.length > 0) {
		document.images["GloTab"].src = sImg;
	}
}

if(window.gbWhUtil&&window.gbWhMsg&&window.gbWhVer&&window.gbWhProxy) {
	RegisterListener2(this, WH_MSG_SHOWTOC);
	RegisterListener2(this, WH_MSG_SHOWIDX);
	RegisterListener2(this, WH_MSG_SHOWFTS);
	RegisterListener2(this, WH_MSG_SHOWGLO);
	window.onunload = window_unload;
	if (navigator.currentNavPen) {
		gsFirstPane = navigator.currentNavPen;
	}
	setBackgroundcolor("");
	addPane("toc","whtdhtml.htm");
	addPane("idx","whidhtml.htm");
	addPane("fts","whfdhtml.htm");
	setShowPane("toc");
	gnTabType = 0;
	TocWriteClassStyle();
} else {
	document.location.reload();
}
if (window.gbNav6) {
	var oMsg=new whMessage(WH_MSG_RELOADNS6,this, 1,null);
	SendMessage(oMsg);
}

</script>
</head>
<body>
	<form id="htmlForm" runat="server">
	<TS:ScriptManager ID="ScriptManager" runat="server" AjaxViewStateMode="Include">
	</TS:ScriptManager>
		<TS:ControlLayout runat="server" ID="MainPanel" Width="100%" Height="100%" Direction="Horizontal"
			IsViewPort="true">
			<TS:TabPanel runat="server" ID="NavigationTabPanel" Width="100%" Height="100%" Collapsible="false" HasOptionsButton="false">
				<Tabs>
					<TS:Tab runat="server" ID="ContentsTab" ShowMenuItemCaption="false" Caption="@Terrasoft.WebApp,WebHelp.TableOfContents.Caption">
						<AjaxEvents>
							<Activate OnClientEvent="selectToc();return false;"/>
						</AjaxEvents>
					</TS:Tab>
					<TS:Tab runat="server" ID="SearchTab" Caption="@Terrasoft.WebApp,WebHelp.Search.Caption">
						<AjaxEvents>
							<Activate OnClientEvent="selectFts();return false;"/>
						</AjaxEvents>
					</TS:Tab>
				</Tabs>
			</TS:TabPanel>
		</TS:ControlLayout>
	</form>
</body>
</html>
