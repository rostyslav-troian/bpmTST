define(["ext-base", "terrasoft"], function(Ext, Terrasoft) {
	return {
		"render": function(renderTo) {
			Ext.create('Terrasoft.MemoEdit', {
				renderTo: renderTo,
				value: 'Lorem ipsum dolor sit amet, mei an illum civibus, latine discere ei quo, '+
					'ex veritus facilisis has. Nam at audire liberavisse. No vim iudico persequeris signiferumque. '+
					'No elitr delectus adipisci sea. Omnes ullamcorper ea est. ' +
					'Nam iracundia scripserit ut, veri brute dolores ea ius, habemus volumus menandri ei usu. '+
					'Dicunt percipit te pro, brute vocibus ea sea. In omnes virtute deterruisset vel. '+
					'Ius ea veri dissentiet, vero utamur interesset ad qui. Ne eros expetenda pro. '+
					'Quo dicunt aliquam no. Velit salutatus has at. In fugit alienum eam, usu ad audire eligendi. '+
					'Et vim vide ornatus, duo bonorum deseruisse ex. Nam ex falli graeco. '+
					'Ea aeque nostrud eleifend qui, sed cu affert denique. Duis aeterno inciderint eum et. '+
					'No soluta omnesque vix. Mollis nominavi splendide vim ut. Cu has invidunt consulatu, '+
					'pri cu hinc malis consequuntur, ad malorum alienum accusamus vis. No pri voluptua apeirian. '+
					'Has percipit adipiscing no, semper delenit expetenda ex eam, id graece quaeque qui. '+
					'Dictas similique repudiandae eam ut. Et definiebas assueverit pri, dicit iudicabit sea id. '+
					'Te labitur legimus postulant cum, nam no agam omittam. Per choro pericula eu, '+
					'et ludus timeam sadipscing est. Purto persecuti qui ex, erat omittam eum at, '+
					'ex velit accusamus quo. Quo ea quas causae, ut sed congue iisque legimus, '+
					'nam ei vidit dicit adipiscing. Cum vero facer equidem at.',
				placeholder: 'Текст для пустого поля',
				width: '100%',
				height: '250px',
				classes: {
					wrapClass: ['someClass']
				}
			});
		}
	};
});