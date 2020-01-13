Terrasoft = window.Terrasoft || {};
Ext.onReady(registerViewPage);

function registerViewPage() {
	var viewPageTemplate = [
		'<div class="main">',
			'<div id="leftPanel" class="leftPanel">',
				/*'<div class="leftItem">',
				'</div>',
				'<div class="leftItem">',
				'</div>',
				'<div class="leftItem">',
				'</div>',*/
			'</div>',
			'<div class="rightPanel">',
				'<div id="topPanel" class="topPanel">',
					/*'<label style="height: 100%; display: inline-block; font-size: 25px;">SchemaCaption:</label>',
					'<span style="height: 100%; display: inline-block; font-size: 25px;">Button</span>',
					'<input type="text" class="box-sizing"', 'style="right: 0px; width: 800px; height: 100%; position: absolute; font-size: 23px; border: 2px solid #DDD;">',*/
				'</div>',
				'<div class="schema-content">',
					'<div class="" style="position: absolute; left: 0px; top: 0px; right: 0px; height: 30px;">',
					'</div>',
					'<div class="" style="position: absolute; left: 0px; right: 0px; bottom: 0px; top: 30px; margin-top: 10px;">',
					'</div>',
				'</div>',
			'</div>',
		'</div>'
	];

	Terrasoft.viewPage = {
		tpl: new Ext.XTemplate(viewPageTemplate),
		selectors: {
			leftPanel: '#leftPanel',
			topPanel: '#topPanel',
			schemaContent: '.schema-content'
		}
	};
}