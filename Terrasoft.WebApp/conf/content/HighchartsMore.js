﻿Terrasoft.configuration.Structures["HighchartsMore"] = {innerHierarchyStack: ["HighchartsMore"]};
define("HighchartsMore", ["Highcharts"], function() {
	/*
 Highcharts JS v3.0.1 (2013-04-09)

 (c) 2009-2013 Torstein H##nsi

 License: www.highcharts.com/license
 */
(function(m,F) {function K(a,b,c){this.init.call(this,a,b,c)}function L(a,b,c){a.call(this,b,c);if(this.chart.polar)this.closeSegment=function(a) {var c=this.xAxis.center;a.push("L",c[0],c[1])},this.closedStacks=!0}function M(a,b){var c=this.chart,d=this.options.animation,e=this.group,g=this.markerGroup,f=this.xAxis.center,k=c.plotLeft,l=c.plotTop;if(c.polar){if(c.renderer.isSVG)if(d===!0&&(d={}),b){if(c={translateX:f[0]+k,translateY:f[1]+l,scaleX:0.001,scaleY:0.001},e.attr(c),g)g.attrSetters=e.attrSetters,
	g.attr(c)}else c={translateX:k,translateY:l,scaleX:1,scaleY:1},e.animate(c,d),g&&g.animate(c,d),this.animate=null}else a.call(this,b)}var Q=m.arrayMin,R=m.arrayMax,s=m.each,H=m.extend,p=m.merge,S=m.map,r=m.pick,u=m.pInt,n=m.getOptions().plotOptions,h=m.seriesTypes,A=m.extendClass,N=m.splat,o=m.wrap,O=m.Axis,B=m.Tick,z=m.Series,q=h.column.prototype,v=Math,I=v.round,C=v.floor,J=v.ceil,T=v.min,U=v.max,w=function() {};H(K.prototype,{init:function(a,b,c) {var d=this,e=d.defaultOptions;d.chart=b;if(b.angular)e.background=
{};d.options=a=p(e,a);(a=a.background)&&s([].concat(N(a)).reverse(),function(a) {var b=a.backgroundColor,a=p(d.defaultBackgroundOptions,a);if(b)a.backgroundColor=b;a.color=a.backgroundColor;c.options.plotBands.unshift(a)})},defaultOptions:{center:["50%","50%"],size:"85%",startAngle:0},defaultBackgroundOptions:{shape:"circle",borderWidth:1,borderColor:"silver",backgroundColor:{linearGradient:{x1:0,y1:0,x2:0,y2:1},stops:[[0,"#FFF"],[1,"#DDD"]]},from:Number.MIN_VALUE,innerRadius:0,to:Number.MAX_VALUE,
	outerRadius:"105%"}});var G=O.prototype,B=B.prototype,V={getOffset:w,redraw:function() {this.isDirty=!1},render:function() {this.isDirty=!1},setScale:w,setCategories:w,setTitle:w},P={isRadial:!0,defaultRadialGaugeOptions:{labels:{align:"center",x:0,y:null},minorGridLineWidth:0,minorTickInterval:"auto",minorTickLength:10,minorTickPosition:"inside",minorTickWidth:1,plotBands:[],tickLength:10,tickPosition:"inside",tickWidth:2,title:{rotation:0},zIndex:2},defaultRadialXOptions:{gridLineWidth:1,labels:{align:null,
	distance:15,x:0,y:null},maxPadding:0,minPadding:0,plotBands:[],showLastLabel:!1,tickLength:0},defaultRadialYOptions:{gridLineInterpolation:"circle",labels:{align:"right",x:-3,y:-2},plotBands:[],showLastLabel:!1,title:{x:4,text:null,rotation:90}},setOptions:function(a) {this.options=p(this.defaultOptions,this.defaultRadialOptions,a)},getOffset:function() {G.getOffset.call(this);this.chart.axisOffset[this.side]=0;this.center=this.pane.center=h.pie.prototype.getCenter.call(this.pane)},getLinePath:function(a,
																																																																																																																															  b) {var c=this.center,b=r(b,c[2]/2-this.offset);return this.chart.renderer.symbols.arc(this.left+c[0],this.top+c[1],b,b,{start:this.startAngleRad,end:this.endAngleRad,open:!0,innerR:0})},setAxisTranslation:function() {G.setAxisTranslation.call(this);if(this.center&&(this.transA=this.isCircular?(this.endAngleRad-this.startAngleRad)/(this.max-this.min||1):this.center[2]/2/(this.max-this.min||1),this.isXAxis))this.minPixelPadding=this.transA*this.minPointOffset+(this.reversed?(this.endAngleRad-this.startAngleRad)/
	4:0)},beforeSetTickPositions:function() {this.autoConnect&&(this.max+=this.categories&&1||this.pointRange||this.closestPointRange)},setAxisSize:function() {G.setAxisSize.call(this);if(this.center)this.len=this.width=this.height=this.isCircular?this.center[2]*(this.endAngleRad-this.startAngleRad)/2:this.center[2]/2},getPosition:function(a,b) {if(!this.isCircular)b=this.translate(a),a=this.min;return this.postTranslate(this.translate(a),r(b,this.center[2]/2)-this.offset)},postTranslate:function(a,b) {var c=
	this.chart,d=this.center,a=this.startAngleRad+a;return{x:c.plotLeft+d[0]+Math.cos(a)*b,y:c.plotTop+d[1]+Math.sin(a)*b}},getPlotBandPath:function(a,b,c) {var d=this.center,e=this.startAngleRad,g=d[2]/2,f=[r(c.outerRadius,"100%"),c.innerRadius,r(c.thickness,10)],k=/%$/,l,j=this.isCircular;this.options.gridLineInterpolation==="polygon"?d=this.getPlotLinePath(a).concat(this.getPlotLinePath(b,!0)):(j||(f[0]=this.translate(a),f[1]=this.translate(b)),f=S(f,function(a) {k.test(a)&&(a=u(a,10)*g/100);return a}),
	c.shape==="circle"||!j?(a=-Math.PI/2,b=Math.PI*1.5,l=!0):(a=e+this.translate(a),b=e+this.translate(b)),d=this.chart.renderer.symbols.arc(this.left+d[0],this.top+d[1],f[0],f[0],{start:a,end:b,innerR:r(f[1],f[0]-f[2]),open:l}));return d},getPlotLinePath:function(a,b) {var c=this.center,d=this.chart,e=this.getPosition(a),g,f,k;this.isCircular?k=["M",c[0]+d.plotLeft,c[1]+d.plotTop,"L",e.x,e.y]:this.options.gridLineInterpolation==="circle"?(a=this.translate(a))&&(k=this.getLinePath(0,a)):(g=d.xAxis[0],
	k=[],a=this.translate(a),c=g.tickPositions,g.autoConnect&&(c=c.concat([c[0]])),b&&(c=[].concat(c).reverse()),s(c,function(c,b) {f=g.getPosition(c,a);k.push(b?"L":"M",f.x,f.y)}));return k},getTitlePosition:function() {var a=this.center,b=this.chart,c=this.options.title;return{x:b.plotLeft+a[0]+(c.x||0),y:b.plotTop+a[1]-{high:0.5,middle:0.25,low:0}[c.align]*a[2]+(c.y||0)}}};o(G,"init",function(a,b,c) {var i;var d=b.angular,e=b.polar,g=c.isX,f=d&&g,k,l;l=b.options;var j=c.pane||0;if(d){if(H(this,f?V:P),
	k=!g)this.defaultRadialOptions=this.defaultRadialGaugeOptions}else if(e)H(this,P),this.defaultRadialOptions=(k=g)?this.defaultRadialXOptions:p(this.defaultYAxisOptions,this.defaultRadialYOptions);a.call(this,b,c);if(!f&&(d||e)){a=this.options;if(!b.panes)b.panes=[];this.pane=(i=b.panes[j]=b.panes[j]||new K(N(l.pane)[j],b,this),j=i);j=j.options;b.inverted=!1;l.chart.zoomType=null;this.startAngleRad=b=(j.startAngle-90)*Math.PI/180;this.endAngleRad=l=(r(j.endAngle,j.startAngle+360)-90)*Math.PI/180;this.offset=
	a.offset||0;if((this.isCircular=k)&&c.max===F&&l-b===2*Math.PI)this.autoConnect=!0}});o(B,"getPosition",function(a,b,c,d,e) {var g=this.axis;return g.getPosition?g.getPosition(c):a.call(this,b,c,d,e)});o(B,"getLabelPosition",function(a,b,c,d,e,g,f,k,l) {var j=this.axis,i=g.y,h=g.align,y=(j.translate(this.pos)+j.startAngleRad+Math.PI/2)/Math.PI*180;j.isRadial?(a=j.getPosition(this.pos,j.center[2]/2+r(g.distance,-25)),g.rotation==="auto"?d.attr({rotation:y}):i===null&&(i=u(d.styles.lineHeight)*0.9-d.getBBox().height/
	2),h===null&&(h=j.isCircular?y>20&&y<160?"left":y>200&&y<340?"right":"center":"center",d.attr({align:h})),a.x+=g.x,a.y+=i):a=a.call(this,b,c,d,e,g,f,k,l);return a});o(B,"getMarkPath",function(a,b,c,d,e,g,f) {var k=this.axis;k.isRadial?(a=k.getPosition(this.pos,k.center[2]/2+d),b=["M",b,c,"L",a.x,a.y]):b=a.call(this,b,c,d,e,g,f);return b});n.arearange=p(n.area,{lineWidth:1,marker:null,threshold:null,tooltip:{pointFormat:'<span style="color:{series.color}">{series.name}</span>: <b>{point.low}</b> - <b>{point.high}</b><br/>'},
	trackByArea:!0,dataLabels:{verticalAlign:null,xLow:0,xHigh:0,yLow:0,yHigh:0}});h.arearange=m.extendClass(h.area,{type:"arearange",pointArrayMap:["low","high"],toYData:function(a) {return[a.low,a.high]},pointValKey:"low",translate:function() {var a=this.yAxis;h.area.prototype.translate.apply(this);s(this.points,function(b) {if(b.y!==null)b.plotLow=b.plotY,b.plotHigh=a.translate(b.high,0,1,0,1)})},getSegmentPath:function(a) {var b=[],c=a.length,d=z.prototype.getSegmentPath,e,g;g=this.options;for(var f=
	g.step;c--;)e=a[c],b.push({plotX:e.plotX,plotY:e.plotHigh});a=d.call(this,a);if(f)f===!0&&(f="left"),g.step={left:"right",center:"center",right:"left"}[f];b=d.call(this,b);g.step=f;g=[].concat(a,b);b[0]="L";this.areaPath=this.areaPath.concat(a,b);return g},drawDataLabels:function() {var a=this.data,b=a.length,c,d=[],e=z.prototype,g=this.options.dataLabels,f,k=this.chart.inverted;if(g.enabled||this._hasPointLabels){for(c=b;c--;)f=a[c],f.y=f.high,f.plotY=f.plotHigh,d[c]=f.dataLabel,f.dataLabel=f.dataLabelUpper,
	f.below=!1,k?(g.align="left",g.x=g.xHigh):g.y=g.yHigh;e.drawDataLabels.apply(this,arguments);for(c=b;c--;)f=a[c],f.dataLabelUpper=f.dataLabel,f.dataLabel=d[c],f.y=f.low,f.plotY=f.plotLow,f.below=!0,k?(g.align="right",g.x=g.xLow):g.y=g.yLow;e.drawDataLabels.apply(this,arguments)}},alignDataLabel:h.column.prototype.alignDataLabel,getSymbol:h.column.prototype.getSymbol,drawPoints:w});n.areasplinerange=p(n.arearange);h.areasplinerange=A(h.arearange,{type:"areasplinerange",getPointSpline:h.spline.prototype.getPointSpline});
	n.columnrange=p(n.column,n.arearange,{lineWidth:1,pointRange:null});h.columnrange=A(h.arearange,{type:"columnrange",translate:function() {var a=this.yAxis,b;q.translate.apply(this);s(this.points,function(c) {var d=c.shapeArgs;c.plotHigh=b=a.translate(c.high,0,1,0,1);c.plotLow=c.plotY;d.y=b;d.height=c.plotY-b})},trackerGroups:["group","dataLabels"],drawGraph:w,pointAttrToOptions:q.pointAttrToOptions,drawPoints:q.drawPoints,drawTracker:q.drawTracker,animate:q.animate,getColumnMetrics:q.getColumnMetrics});
	n.gauge=p(n.line,{dataLabels:{enabled:!0,y:15,borderWidth:1,borderColor:"silver",borderRadius:3,style:{fontWeight:"bold"},verticalAlign:"top",zIndex:2},dial:{},pivot:{},tooltip:{headerFormat:""},showInLegend:!1});B={type:"gauge",pointClass:m.extendClass(m.Point,{setState:function(a) {this.state=a}}),angular:!0,drawGraph:w,trackerGroups:["group","dataLabels"],translate:function() {var a=this.yAxis,b=this.options,c=a.center;this.generatePoints();s(this.points,function(d) {var e=p(b.dial,d.dial),g=u(r(e.radius,
		80))*c[2]/200,f=u(r(e.baseLength,70))*g/100,k=u(r(e.rearLength,10))*g/100,l=e.baseWidth||3,j=e.topWidth||1,i=a.startAngleRad+a.translate(d.y,null,null,null,!0);b.wrap===!1&&(i=Math.max(a.startAngleRad,Math.min(a.endAngleRad,i)));i=i*180/Math.PI;d.shapeType="path";d.shapeArgs={d:e.path||["M",-k,-l/2,"L",f,-l/2,g,-j/2,g,j/2,f,l/2,-k,l/2,"z"],translateX:c[0],translateY:c[1],rotation:i};d.plotX=c[0];d.plotY=c[1]})},drawPoints:function() {var a=this,b=a.yAxis.center,c=a.pivot,d=a.options,e=d.pivot,g=a.chart.renderer;
		s(a.points,function(c) {var b=c.graphic,e=c.shapeArgs,j=e.d,i=p(d.dial,c.dial);b?(b.animate(e),e.d=j):c.graphic=g[c.shapeType](e).attr({stroke:i.borderColor||"none","stroke-width":i.borderWidth||0,fill:i.backgroundColor||"black",rotation:e.rotation}).add(a.group)});c?c.animate({translateX:b[0],translateY:b[1]}):a.pivot=g.circle(0,0,r(e.radius,5)).attr({"stroke-width":e.borderWidth||0,stroke:e.borderColor||"silver",fill:e.backgroundColor||"black"}).translate(b[0],b[1]).add(a.group)},animate:function(a) {var b=
		this;if(!a)s(b.points,function(a) {var d=a.graphic;d&&(d.attr({rotation:b.yAxis.startAngleRad*180/Math.PI}),d.animate({rotation:a.shapeArgs.rotation},b.options.animation))}),b.animate=null},render:function() {this.group=this.plotGroup("group","series",this.visible?"visible":"hidden",this.options.zIndex,this.chart.seriesGroup);h.pie.prototype.render.call(this);this.group.clip(this.chart.clipRect)},setData:h.pie.prototype.setData,drawTracker:h.column.prototype.drawTracker};h.gauge=m.extendClass(h.line,
		B);n.boxplot=p(n.column,{fillColor:"#FFFFFF",lineWidth:1,medianWidth:2,states:{hover:{brightness:-0.3}},threshold:null,tooltip:{pointFormat:'<span style="color:{series.color};font-weight:bold">{series.name}</span><br/>Minimum: {point.low}<br/>Lower quartile: {point.q1}<br/>Median: {point.median}<br/>Higher quartile: {point.q3}<br/>Maximum: {point.high}<br/>'},whiskerLength:"50%",whiskerWidth:2});h.boxplot=A(h.column,{type:"boxplot",pointArrayMap:["low","q1","median","q3","high"],toYData:function(a) {return[a.low,
		a.q1,a.median,a.q3,a.high]},pointValKey:"high",pointAttrToOptions:{fill:"fillColor",stroke:"color","stroke-width":"lineWidth"},drawDataLabels:w,translate:function() {var a=this.yAxis,b=this.pointArrayMap;h.column.prototype.translate.apply(this);s(this.points,function(c) {s(b,function(b) {c[b]!==null&&(c[b+"Plot"]=a.translate(c[b],0,1,0,1))})})},drawPoints:function() {var a=this,b=a.points,c=a.options,d=a.chart.renderer,e,g,f,k,l,j,i,h,y,m,t,n,r,x,o,p,v,q,w,u,B,A,z=a.doQuartiles!==!1,D=parseInt(a.options.whiskerLength,
		10)/100;s(b,function(b) {y=b.graphic;B=b.shapeArgs;t={};x={};p={};A=b.color||a.color;if(b.plotY!==F)if(e=b.pointAttr[b.selected?"selected":""],v=B.width,q=C(B.x),w=q+v,u=I(v/2),g=C(z?b.q1Plot:b.lowPlot),f=C(z?b.q3Plot:b.lowPlot),k=C(b.highPlot),l=C(b.lowPlot),t.stroke=b.stemColor||c.stemColor||A,t["stroke-width"]=b.stemWidth||c.stemWidth||c.lineWidth,t.dashstyle=b.stemDashStyle||c.stemDashStyle,x.stroke=b.whiskerColor||c.whiskerColor||A,x["stroke-width"]=b.whiskerWidth||c.whiskerWidth||c.lineWidth,
		p.stroke=b.medianColor||c.medianColor||A,p["stroke-width"]=b.medianWidth||c.medianWidth||c.lineWidth,i=t["stroke-width"]%2/2,h=q+u+i,m=["M",h,f,"L",h,k,"M",h,g,"L",h,l,"z"],z&&(i=e["stroke-width"]%2/2,h=C(h)+i,g=C(g)+i,f=C(f)+i,q+=i,w+=i,n=["M",q,f,"L",q,g,"L",w,g,"L",w,f,"L",q,f,"z"]),D&&(i=x["stroke-width"]%2/2,k+=i,l+=i,r=["M",h-u*D,k,"L",h+u*D,k,"M",h-u*D,l,"L",h+u*D,l]),i=p["stroke-width"]%2/2,j=I(b.medianPlot)+i,o=["M",q,j,"L",w,j,"z"],y)b.stem.animate({d:m}),D&&b.whiskers.animate({d:r}),z&&
		b.box.animate({d:n}),b.medianShape.animate({d:o});else{b.graphic=y=d.g().add(a.group);b.stem=d.path(m).attr(t).add(y);if(D)b.whiskers=d.path(r).attr(x).add(y);if(z)b.box=d.path(n).attr(e).add(y);b.medianShape=d.path(o).attr(p).add(y)}})}});n.errorbar=p(n.boxplot,{color:"#000000",grouping:!1,linkedTo:":previous",tooltip:{pointFormat:n.arearange.tooltip.pointFormat},whiskerWidth:null});h.errorbar=A(h.boxplot,{type:"errorbar",pointArrayMap:["low","high"],toYData:function(a) {return[a.low,a.high]},pointValKey:"high",
		doQuartiles:!1,getColumnMetrics:function() {return this.linkedParent&&this.linkedParent.columnMetrics||h.column.prototype.getColumnMetrics.call(this)}});o(G,"getSeriesExtremes",function(a,b) {a.call(this,b);if(!this.isXAxis){var c=this,d=[],e=!0;s(c.series,function(a) {if(a.visible&&a.stackKey&&!(a.type!=="waterfall"||HighchartsAdapter.inArray(a.stackKey)!==-1)){if(e)c.dataMin=c.dataMax=null,e=!1;var b=a.processedYData,k=b.length,h=b[0],j=b[0],i=a.options.threshold,m=c.stacks,n=a.stackKey,p="-"+n,t,
		o,q,x;for(x=0;x<k;x++){q=b[x]<i?p:n;t=m[q][x].total;if(x>i)t+=o,m[q][x].setTotal(t),m[q][x]._cum=null;t<h&&(h=t);t>j&&(j=t);o=t}a.dataMin=h;a.dataMax=j;c.dataMin=T(r(c.dataMin,h),h,i);c.dataMax=U(r(c.dataMax,j),j,i);d.push(a.stackKey);if(typeof i==="number")if(c.dataMin>=i)c.dataMin=i,c.ignoreMinPadding=!0;else if(c.dataMax<i)c.dataMax=i,c.ignoreMaxPadding=!0}})}});n.waterfall=p(n.column,{lineWidth:1,lineColor:"#333",dashStyle:"dot",borderColor:"#333"});h.waterfall=A(h.column,{type:"waterfall",upColorProp:"fill",
		pointArrayMap:["y","low"],pointValKey:"y",init:function(a,b) {b.stacking=!0;h.column.prototype.init.call(this,a,b)},translate:function() {var a=this.yAxis,b,c,d,e,g,f,k,l,j,i,m,n,o=this.options.borderWidth%2/2;h.column.prototype.translate.apply(this);d=this.points;j=k=d[0];f=l=d[0].y;for(c=1,b=d.length;c<b;c++)e=d[c],g=e.shapeArgs,i=this.getStack(c),m=this.getStack(c-1),n=this.getStackY(m),j===null&&(j=e,l=0),e.y&&!e.isSum&&!e.isIntermediateSum&&(f+=e.y,l+=e.y),e.isSum||e.isIntermediateSum?(e.isIntermediateSum?
			(i=this.getSumEdges(j,d[c-1]),e.y=l,j=null):(i=this.getSumEdges(k,d[c-1]),e.y=f),g.y=e.plotY=i[1],g.height=i[0]-i[1]):e.y<0?(m=i._cum===null?m.total:i._cum,i._cum=m+e.y,e=J(a.translate(m,0,1))-o,i=a.translate(i._cum,0,1),g.y=e,g.height=J(i-e)):g.height=C(n-g.y)},processData:function(a) {z.prototype.processData.call(this,a);var a=this.yData,b=a.length,c,d;for(d=0;d<b;d++)c=a[d],c!==null&&typeof c!=="number"&&(a[d]=c==="sum"?null:c==="intermediateSum"?null:c[0])},toYData:function(a) {if(a.isSum)return"sum";
		else if(a.isIntermediateSum)return"intermediateSum";return[a.y]},getAttribs:function() {h.column.prototype.getAttribs.apply(this,arguments);var a=this.options,b=a.states,c=a.upColor||this.color,a=m.Color(c).brighten(0.1).get(),d=p(this.pointAttr),e=this.upColorProp;d[""][e]=c;d.hover[e]=b.hover.upColor||a;d.select[e]=b.select.upColor||c;s(this.points,function(a) {if(a.y>0&&!a.color)a.pointAttr=d,a.color=c})},getGraphPath:function() {var a=this.data,b=a.length,c=I(this.options.lineWidth+this.options.borderWidth)%
			2/2,d=[],e,g,f;for(f=1;f<b;f++)g=a[f].shapeArgs,e=a[f-1].shapeArgs,g=["M",e.x+e.width,e.y+c,"L",g.x,e.y+c],a[f-1].y<0&&(g[2]+=e.height,g[5]+=e.height),d=d.concat(g);return d},getStack:function(a) {var b=this.yAxis.stacks,c=this.stackKey;this.processedYData[a]<this.options.threshold&&(c="-"+c);return b[c][a]},getStackY:function(a) {return J(this.yAxis.translate(a.total,null,!0))},getSumEdges:function(a,b) {var c,d,e;d=this.options.threshold;c=a.y>=d?a.shapeArgs.y+a.shapeArgs.height:a.shapeArgs.y;d=b.y>=
			d?b.shapeArgs.y:b.shapeArgs.y+b.shapeArgs.height;d>c&&(e=c,c=d,d=e);return[c,d]},drawGraph:z.prototype.drawGraph});n.bubble=p(n.scatter,{dataLabels:{inside:!0,style:{color:"white",textShadow:"0px 0px 3px black"},verticalAlign:"middle"},marker:{lineColor:null,lineWidth:1},minSize:8,maxSize:"20%",tooltip:{pointFormat:"({point.x}, {point.y}), Size: {point.z}"},zThreshold:0});h.bubble=A(h.scatter,{type:"bubble",pointArrayMap:["y","z"],trackerGroups:["group","dataLabelsGroup"],pointAttrToOptions:{stroke:"lineColor",
		"stroke-width":"lineWidth",fill:"fillColor"},applyOpacity:function(a) {var b=this.options.marker,c=r(b.fillOpacity,0.5),a=a||b.fillColor||this.color;c!==1&&(a=m.Color(a).setOpacity(c).get("rgba"));return a},convertAttribs:function() {var a=z.prototype.convertAttribs.apply(this,arguments);a.fill=this.applyOpacity(a.fill);return a},getRadii:function(a,b,c,d) {var e,g,f,k=this.zData,h=[];for(g=0,e=k.length;g<e;g++)f=b-a,f=f>0?(k[g]-a)/(b-a):0.5,h.push(v.round(c+f*(d-c))/2);this.radii=h},animate:function(a) {var b=
		this.options.animation;if(!a)s(this.points,function(a) {var d=a.graphic,a=a.shapeArgs;d&&a&&(d.attr("r",1),d.animate({r:a.r},b))}),this.animate=null},translate:function() {var a,b=this.data,c,d,e=this.radii;h.scatter.prototype.translate.call(this);for(a=b.length;a--;)c=b[a],d=e[a],c.negative=c.z<(this.options.zThreshold||0),d>=this.minPxSize/2?(c.shapeType="circle",c.shapeArgs={x:c.plotX,y:c.plotY,r:d},c.dlBox={x:c.plotX-d,y:c.plotY-d,width:2*d,height:2*d}):c.shapeArgs=c.plotY=c.dlBox=F},drawLegendSymbol:function(a,
																																																																																																																																			 b) {var c=u(a.itemStyle.fontSize)/2;b.legendSymbol=this.chart.renderer.circle(c,a.baseline-c,c).attr({zIndex:3}).add(b.legendGroup)},drawPoints:h.column.prototype.drawPoints,alignDataLabel:h.column.prototype.alignDataLabel});O.prototype.beforePadding=function() {var a=this.len,b=this.chart,c=0,d=a,e=this.isXAxis,g=e?"xData":"yData",f=this.min,k={},h=v.min(b.plotWidth,b.plotHeight),j=Number.MAX_VALUE,i=-Number.MAX_VALUE,m=this.max-f,n=a/m,o=[];this.allowZoomOutside=!0;this.tickPositions&&(s(this.series,
		function(a) {var b=a.options;if(a.type==="bubble"&&a.visible&&(o.push(a),e))s(["minSize","maxSize"],function(a) {var c=b[a],d=/%$/.test(c),c=u(c);k[a]=d?h*c/100:c}),a.minPxSize=k.minSize,a=a.zData,j=v.min(j,v.max(Q(a),b.displayNegative===!1?b.zThreshold:-Number.MAX_VALUE)),i=v.max(i,R(a))}),s(o,function(a) {var b=a[g],h=b.length,l;e&&a.getRadii(j,i,k.minSize,k.maxSize);if(m>0)for(;h--;)l=a.radii[h],c=Math.min((b[h]-f)*n-l,c),d=Math.max((b[h]-f)*n+l,d)}),m>0&&r(this.options.min,this.userMin)===F&&r(this.options.max,
		this.userMax)===F&&(d-=a,n*=(a+c-d)/a,this.min+=c/n,this.max+=d/n))};var E=z.prototype,n=m.Pointer.prototype;E.toXY=function(a) {var b,c=this.chart;b=a.plotX;var d=a.plotY;a.rectPlotX=b;a.rectPlotY=d;a.clientX=b/Math.PI*180;b=this.xAxis.postTranslate(a.plotX,this.yAxis.len-d);a.plotX=a.polarPlotX=b.x-c.plotLeft;a.plotY=a.polarPlotY=b.y-c.plotTop};o(h.area.prototype,"init",L);o(h.areaspline.prototype,"init",L);o(h.spline.prototype,"getPointSpline",function(a,b,c,d) {var e,g,f,h,l,j,i;if(this.chart.polar){e=
		c.plotX;g=c.plotY;a=b[d-1];f=b[d+1];this.connectEnds&&(a||(a=b[b.length-2]),f||(f=b[1]));if(a&&f)h=a.plotX,l=a.plotY,b=f.plotX,j=f.plotY,h=(1.5*e+h)/2.5,l=(1.5*g+l)/2.5,f=(1.5*e+b)/2.5,i=(1.5*g+j)/2.5,b=Math.sqrt(Math.pow(h-e,2)+Math.pow(l-g,2)),j=Math.sqrt(Math.pow(f-e,2)+Math.pow(i-g,2)),h=Math.atan2(l-g,h-e),l=Math.atan2(i-g,f-e),i=Math.PI/2+(h+l)/2,Math.abs(h-i)>Math.PI/2&&(i-=Math.PI),h=e+Math.cos(i)*b,l=g+Math.sin(i)*b,f=e+Math.cos(Math.PI+i)*j,i=g+Math.sin(Math.PI+i)*j,c.rightContX=f,c.rightContY=
		i;d?(c=["C",a.rightContX||a.plotX,a.rightContY||a.plotY,h||e,l||g,e,g],a.rightContX=a.rightContY=null):c=["M",e,g]}else c=a.call(this,b,c,d);return c});o(E,"translate",function(a) {a.call(this);if(this.chart.polar&&!this.preventPostTranslate)for(var a=this.points,b=a.length;b--;)this.toXY(a[b])});o(E,"getSegmentPath",function(a,b) {var c=this.points;if(this.chart.polar&&this.options.connectEnds!==!1&&b[b.length-1]===c[c.length-1]&&c[0].y!==null)this.connectEnds=!0,b=[].concat(b,[c[0]]);return a.call(this,
		b)});o(E,"animate",M);o(q,"animate",M);o(E,"setTooltipPoints",function(a,b) {this.chart.polar&&H(this.xAxis,{tooltipLen:360});return a.call(this,b)});o(q,"translate",function(a) {var b=this.xAxis,c=this.yAxis.len,d=b.center,e=b.startAngleRad,g=this.chart.renderer,f,h;this.preventPostTranslate=!0;a.call(this);if(b.isRadial){b=this.points;for(h=b.length;h--;)f=b[h],a=f.barX+e,f.shapeType="path",f.shapeArgs={d:g.symbols.arc(d[0],d[1],c-f.plotY,null,{start:a,end:a+f.pointWidth,innerR:c-r(f.yBottom,c)})},
		this.toXY(f)}});o(q,"alignDataLabel",function(a,b,c,d,e,g) {if(this.chart.polar){a=b.rectPlotX/Math.PI*180;if(d.align===null)d.align=a>20&&a<160?"left":a>200&&a<340?"right":"center";if(d.verticalAlign===null)d.verticalAlign=a<45||a>315?"bottom":a>135&&a<225?"top":"middle";E.alignDataLabel.call(this,b,c,d,e,g)}else a.call(this,b,c,d,e,g)});o(n,"getIndex",function(a,b) {var c,d=this.chart,e;d.polar?(e=d.xAxis[0].center,c=b.chartX-e[0]-d.plotLeft,d=b.chartY-e[1]-d.plotTop,c=180-Math.round(Math.atan2(c,
		d)/Math.PI*180)):c=a.call(this,b);return c});o(n,"getCoordinates",function(a,b) {var c=this.chart,d={xAxis:[],yAxis:[]};c.polar?s(c.axes,function(a) {var g=a.isXAxis,f=a.center,h=b.chartX-f[0]-c.plotLeft,f=b.chartY-f[1]-c.plotTop;d[g?"xAxis":"yAxis"].push({axis:a,value:a.translate(g?Math.PI-Math.atan2(h,f):Math.sqrt(Math.pow(h,2)+Math.pow(f,2)),!0)})}):d=a.call(this,b);return d})})(Highcharts);

	/*
	Highcharts funnel module, Beta

	 (c) 2010-2012 Torstein H##nsi

	 License: www.highcharts.com/license
	 */
(function(d) {var u=d.getOptions().plotOptions,p=d.seriesTypes,D=d.merge,B=function() {},z=d.each;u.funnel=D(u.pie,{center:["50%","50%"],width:"90%",neckWidth:"30%",height:"100%",neckHeight:"25%",dataLabels:{connectorWidth:1,connectorColor:"#606060"},size:!0,states:{select:{color:"#C0C0C0",borderColor:"#000000",shadow:!1}}});p.funnel=d.extendClass(p.pie,{type:"funnel",animate:B,translate:function() {var a=function(k,a) {return/%$/.test(k)?a*parseInt(k,10)/100:parseInt(k,10)},g=0,e=this.chart,f=e.plotWidth,
		e=e.plotHeight,h=0,c=this.options,C=c.center,b=a(C[0],f),d=a(C[0],e),p=a(c.width,f),i,q,j=a(c.height,e),r=a(c.neckWidth,f),s=a(c.neckHeight,e),v=j-s,a=this.data,w,x,u=c.dataLabels.position==="left"?1:0,y,m,A,n,l,t,o;this.getWidthAt=q=function(k) {return k>j-s||j===s?r:r+(p-r)*((j-s-k)/(j-s))};this.getX=function(k,a) {return b+(a?-1:1)*(q(k)/2+c.dataLabels.distance)};this.center=[b,d,j];this.centerX=b;z(a,function(a) {g+=a.y});z(a,function(a) {o=null;x=g?a.y/g:0;m=d-j/2+h*j;l=m+x*j;i=q(m);y=b-i/2;A=y+
		i;i=q(l);n=b-i/2;t=n+i;m>v?(y=n=b-r/2,A=t=b+r/2):l>v&&(o=l,i=q(v),n=b-i/2,t=n+i,l=v);w=["M",y,m,"L",A,m,t,l];o&&w.push(t,o,n,o);w.push(n,l,"Z");a.shapeType="path";a.shapeArgs={d:w};a.percentage=x*100;a.plotX=b;a.plotY=(m+(o||l))/2;a.tooltipPos=[b,a.plotY];a.slice=B;a.half=u;h+=x});this.setTooltipPoints()},drawPoints:function() {var a=this,g=a.options,e=a.chart.renderer;z(a.data,function(f) {var h=f.graphic,c=f.shapeArgs;h?h.animate(c):f.graphic=e.path(c).attr({fill:f.color,stroke:g.borderColor,"stroke-width":g.borderWidth}).add(a.group)})},
	drawDataLabels:function() {var a=this.data,g=this.options.dataLabels.distance,e,f,h,c=a.length,d,b;for(this.center[2]-=2*g;c--;)h=a[c],f=(e=h.half)?1:-1,b=h.plotY,d=this.getX(b,e),h.labelPos=[0,b,d+(g-5)*f,b,d+g*f,b,e?"right":"left",0];p.pie.prototype.drawDataLabels.call(this)}})})(Highcharts);

/**
 * Highcharts drilldown
 */
(function(g) {function s(a,b,d){return"rgba("+[Math.round(a[0]+(b[0]-a[0])*d),Math.round(a[1]+(b[1]-a[1])*d),Math.round(a[2]+(b[2]-a[2])*d),a[3]+(b[3]-a[3])*d].join(",")+")"}var t=function() {},o=g.getOptions(),i=g.each,p=g.extend,x=g.format,y=g.pick,q=g.wrap,l=g.Chart,n=g.seriesTypes,u=n.pie,m=n.column,v=HighchartsAdapter.fireEvent,z=HighchartsAdapter.inArray;p(o.lang,{drillUpText:""});o.drilldown={activeAxisLabelStyle:{cursor:"pointer",color:"#999999",fontWeight:"bold",textDecoration:"underline"},
	activeDataLabelStyle:{},animation:{duration:500},drillUpButton:{position:{align:"right",x:-10,y:10}}};g.SVGRenderer.prototype.Element.prototype.fadeIn=function(a) {this.attr({opacity:0.1,visibility:"inherit"}).animate({opacity:y(this.newOpacity,1)},a||{duration:250})};l.prototype.addSeriesAsDrilldown=function(a,b) {this.addSingleSeriesAsDrilldown(a,b);this.applyDrilldown()};l.prototype.addSingleSeriesAsDrilldown=function(a,
																																																																																																																														b) {var d=a.series,c=d.xAxis,f=d.yAxis,h;h=a.color||d.color;var e,w=[],g=[],k;k=d.levelNumber||0;b=p({color:h},b);e=z(a,d.points);i(d.chart.series,function(a) {if(a.xAxis===c)w.push(a),g.push(a.userOptions),a.levelNumber=a.levelNumber||0});h={levelNumber:k,seriesOptions:d.userOptions,levelSeriesOptions:g,levelSeries:w,shapeArgs:a.shapeArgs,bBox:a.graphic&&a.graphic.getBBox(),color:h,lowerSeriesOptions:b,pointOptions:d.options.data[e],pointIndex:e,oldExtremes:{xMin:c&&c.userMin,xMax:c&&c.userMax,yMin:f&&f.userMin,
	yMax:f&&f.userMax}};if(!this.drilldownLevels)this.drilldownLevels=[];this.drilldownLevels.push(h);h=h.lowerSeries=this.addSeries(b,!1);h.levelNumber=k+1;if(c)c.oldPos=c.pos,c.userMin=c.userMax=null,f.userMin=f.userMax=null;if(d.type===h.type)h.animate=h.animateDrilldown||t,h.options.animation=!0};l.prototype.applyDrilldown=function() {if(!this.drilldownLevels)return; var a=this.drilldownLevels,b=a[a.length-1].levelNumber;i(this.drilldownLevels,function(a) {a.levelNumber===b&&i(a.levelSeries,function(a) {a.levelNumber===b&&a.remove(!1)})});
	this.redraw();this.showDrillUpButton()};l.prototype.getDrilldownBackText=function() {var a=this.drilldownLevels[this.drilldownLevels.length-1];a.series=a.seriesOptions;return x(this.options.lang.drillUpText,a)};l.prototype.showDrillUpButton=function() {var a=this,b=this.getDrilldownBackText(),d=a.options.drilldown.drillUpButton,c,f;this.drillUpButton?this.drillUpButton.attr({text:b}).align():(f=(c=d.theme)&&c.states,this.drillUpButton=this.renderer.button(b,null,null,function() {a.drillUp()},c,f&&f.hover,
	f&&f.select).attr({align:d.position.align,zIndex:9}).add().align(d.position,!1,d.relativeTo||"plotBox"))};l.prototype.drillUp=function() {for(var a=this,b=a.drilldownLevels,d=b[b.length-1].levelNumber,c=b.length,f=a.series,h=f.length,e,g,j,k,l=function(b) {var c;i(f,function(a) {a.userOptions===b&&(c=a)});c=c||a.addSeries(b,!1);if(c.type===g.type&&c.animateDrillupTo)c.animate=c.animateDrillupTo;b===e.seriesOptions&&(j=c)};c--;)if(e=b[c],e.levelNumber===d){b.pop();g=e.lowerSeries;if(!g.chart)for(;h--;)if(f[h].options.id===
	e.lowerSeriesOptions.id){g=f[h];break}g.xData=[];i(e.levelSeriesOptions,l);v(a,"drillup",{seriesOptions:e.seriesOptions});if(j.type===g.type)j.drilldownLevel=e,j.options.animation=a.options.drilldown.animation,g.animateDrillupFrom&&g.animateDrillupFrom(e);j.levelNumber=d;g.remove(!1);if(j.xAxis)k=e.oldExtremes,j.xAxis.setExtremes(k.xMin,k.xMax,!1),j.yAxis.setExtremes(k.yMin,k.yMax,!1)}this.redraw();this.drilldownLevels.length===0?this.drillUpButton=this.drillUpButton.destroy():this.drillUpButton.attr({text:this.getDrilldownBackText()}).align()};
	m.prototype.supportsDrilldown=!0;m.prototype.animateDrillupTo=function(a) {if(!a){var b=this,d=b.drilldownLevel;i(this.points,function(a) {a.graphic.hide();a.dataLabel&&a.dataLabel.hide();a.connector&&a.connector.hide()});setTimeout(function() {i(b.points,function(a,b) {var h=b===(d&&d.pointIndex)?"show":"fadeIn",e=h==="show"?!0:void 0;a.graphic[h](e);if(a.dataLabel)a.dataLabel[h](e);if(a.connector)a.connector[h](e)})},Math.max(this.chart.options.drilldown.animation.duration-50,0));this.animate=t}};m.prototype.animateDrilldown=
		function(a) {var b=this,d=this.chart.drilldownLevels,c=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1].shapeArgs,f=this.chart.options.drilldown.animation;if(!a)i(d,function(a) {if(b.userOptions===a.lowerSeriesOptions)c=a.shapeArgs}),c.x+=this.xAxis.oldPos-this.xAxis.pos,i(this.points,function(a) {a.graphic&&a.graphic.attr(c).animate(a.shapeArgs,f);a.dataLabel&&a.dataLabel.fadeIn(f)}),this.animate=null};m.prototype.animateDrillupFrom=function(a) {var b=this.chart.options.drilldown.animation,
		d=this.group,c=this;i(c.trackerGroups,function(a) {if(c[a])c[a].on("mouseover")});delete this.group;i(this.points,function(c) {var h=c.graphic,e=g.Color(c.color).rgba,i=g.Color(a.color).rgba,j=function() {h.destroy();d&&(d=d.destroy())};h&&(delete c.graphic,b?h.animate(a.shapeArgs,g.merge(b,{step:function(a,b) {b.prop==="start"&&e.length===4&&i.length===4&&this.attr({fill:s(e,i,b.pos)})},complete:j})):(h.attr(a.shapeArgs),j()))})};u&&p(u.prototype,{supportsDrilldown:!0,animateDrillupTo:m.prototype.animateDrillupTo,
		animateDrillupFrom:m.prototype.animateDrillupFrom,animateDrilldown:function(a) {var b=this.chart.drilldownLevels[this.chart.drilldownLevels.length-1],d=this.chart.options.drilldown.animation,c=b.shapeArgs,f=c.start,h=(c.end-f)/this.points.length,e=g.Color(b.color).rgba;if(!a)i(this.points,function(a,b) {var i=g.Color(a.color).rgba;a.graphic.attr(g.merge(c,{start:f+b*h,end:f+(b+1)*h}))[d?"animate":"attr"](a.shapeArgs,g.merge(d,{step:function(a,b) {b.prop==="start"&&e.length===4&&i.length===4&&this.attr({fill:s(e,
			i,b.pos)})}}))}),this.animate=null}});g.Point.prototype.doDrilldown=function(a) {for(var b=this.series.chart,d=b.options.drilldown,c=(d.series||[]).length,f;c--&&!f;)d.series[c].id===this.drilldown&&(f=d.series[c]);v(b,"drilldown",{point:this,seriesOptions:f});f&&(a?b.addSingleSeriesAsDrilldown(this,f):b.addSeriesAsDrilldown(this,f))};q(g.Point.prototype,"init",function(a,b,d,c) {var f=a.call(this,b,d,c),h=b.chart,e=(a=b.xAxis&&b.xAxis.ticks[c])&&a.label;if(f.drilldown){if(g.addEvent(f,"click",function() {f.clickEvent=arguments[0];f.doDrilldown()}),
		e){if(!e._basicStyle)e._basicStyle=e.element.getAttribute("style");e.addClass("highcharts-drilldown-axis-label").css(h.options.drilldown.activeAxisLabelStyle).on("click",function() {var clickEvent=arguments[0];i(e.ddPoints,function(a) {a.clickEvent=clickEvent;a.doDrilldown&&a.doDrilldown(!0)});h.applyDrilldown()});if(!e.ddPoints)e.ddPoints=[];e.ddPoints.push(f)}}else e&&e._basicStyle&&e.element.setAttribute("style",e._basicStyle);return f});q(g.Series.prototype,"drawDataLabels",function(a) {var b=this.chart.options.drilldown.activeDataLabelStyle;a.call(this);
		i(this.points,function(a) {if(a.drilldown&&a.dataLabel)a.dataLabel.attr({"class":"highcharts-drilldown-data-label"}).css(b).on("click",function() {a.clickEvent=arguments[0];a.doDrilldown()})})});var r,o=function(a) {a.call(this);i(this.points,function(a) {a.drilldown&&a.graphic&&a.graphic.attr({"class":"highcharts-drilldown-point"}).css({cursor:"pointer"})})};for(r in n)n[r].prototype.supportsDrilldown&&q(n[r].prototype,"drawTracker",o)})(Highcharts);
});


