Ext.util.Observable.prototype.addEvents = function(o) {
	var me = this,
		events = me.events || (me.events = {}),
		arg, args, i;

	if (typeof o === "string") {
		for (args = arguments, i = args.length; i--;) {
			arg = args[i];
			if (!events[arg]) {
				events[arg] = true;
			}
		}
	} else {
		Ext.applyIf(me.events, o);
	}
};

Ext.EventObject = Ext.event.Event;

Ext.data.IdGenerator = {
	get: function(type) {
		switch (type) {
			case "uuid":
				return Ext.data.identifier.Uuid.Global;
			default:
				return Ext.data.identifier.Sequential.prototype;
		}
	}
};

Ext.data.SequentialIdGenerator = Ext.data.identifier.Sequential;

(function(Ext) {
	var select = Ext.select;
	Ext.select = function(selector, composite, root) {
		if (composite === undefined) {
			composite = true;
		}
		return select(selector, composite, root);
	};
})(Ext);

//ST compability
Ext.onReady(function() {
	var dispatcher = Ext.event.Dispatcher.getInstance();
	var publishers = dispatcher.getPublishers();
	var elementPublisher = new Ext.event.publisher.ElementPaint();
	publishers.elementPaint = elementPublisher;
	dispatcher.registerPublisher(elementPublisher);
	Ext.get(window).on('unload', dispatcher.destroy, dispatcher);
}, null, {
	priority: 2000
});
