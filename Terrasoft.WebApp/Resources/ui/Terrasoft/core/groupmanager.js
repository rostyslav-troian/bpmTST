// TODO ######## ########. ########### # #.#######.
/**
 * The group class used by the mixin Terrasoft.Groupable
 * for adding group behavior.
 * In the group, only one element can be active.
 * When it is activated, the rest are deactivated.
 */
Ext.define('Terrasoft.util.Group', {
	extend: "Terrasoft.BaseObject",
	alternateClassName: "Terrasoft.Group",

	/**
  * Collection of group members
  * @type {Terrasoft.Collection}
  */
	items: null,

	/**
  * Group name
  * @type {String}
  */
	name: null,

	/**
  * Active member of the group
  * @type {Object}
  */
	activeItem: null,

	/**
  * Constructor
  * @param  {Object} config the group config
  * @private
  */
	constructor: function(config) {
		if (!config.name) {
			throw new Terrasoft.NullOrEmptyException({
				message: Terrasoft.Resources.GroupManager.EmptyGroupName
			});
		}
		this.callParent(arguments);
		this.items = Ext.create("Terrasoft.Collection");
	},

	/**
  * Unsubscribe from group member events
  * @param  {Object} item group participant
  * @private
  */
	unSubscribeItem: function(item) {
		item.un({
			activechanged: {
				fn: this.onItemActiveChanged,
				scope: this
			},
			destroy: {
				fn: this.onItemDestroy,
				scope: this
			}
		});
	},

	/**
  * Destroy the group and free resources
  * @private
  */
	onDestroy: function() {
		this.callParent(arguments);
		var items = this.items;
		items.each(function(item) {
			this.unSubscribeItem(item);
			item.group = null;
			item.groupName = null;
		}, this);
		this.items.clear();
		delete this.items;
		delete this.activeItem;
		var manager = Terrasoft.util.GroupManager;
		if (manager) {
			Terrasoft.util.GroupManager.removeGroup(this);
		}
	},

	/**
  * Member group activity change handler
  * @param  {Object} item group member
  * @param  {Boolean} active new selectivity value in the group
  * @private
  */
	onItemActiveChanged: function(item, active) {
		if (active === false) {
			return;
		}
		var activeItem = this.activeItem;
		if (activeItem) {
			activeItem.setActive(false);
		}
		activeItem = this.activeItem = item;
	},

	/**
  * Group member destruction handler
  * @param  {Object} item group member
  * @private
  */
	onItemDestroy: function(item) {
		this.removeItem(item);
	},

	/**
  * Add a group member
  * @param  {Object} item group member
  */
	addItem: function(item) {
		this.items.add(item.id, item);
		item.on({
			activechanged: {
				fn: this.onItemActiveChanged,
				scope: this
			},
			destroy: {
				fn: this.onItemDestroy,
				scope: this
			}
		});
		item.groupName = this.name;
		item.group = this;
	},

	/**
  * Remove group member
  * @param  {Object} item group member
  */
	removeItem: function(item) {
		this.items.remove(item);
		if (this.activeItem === item) {
			this.activeItem = null;
		}
		item.group = null;
		item.groupName = null;
		this.unSubscribeItem(item);
	}

});

/**
 * A mixin class that adds group behavior to a group.
 * In the group, only one object can be active - when one is activated,
 * others are deactivated.
 */
Ext.define('Terrasoft.util.Groupable', {
	alternateClassName: "Terrasoft.Groupable",
	extend: "Terrasoft.BaseObject",

	/**
  * Group
  * @type {Terrasoft.Group}
  * @protected
  */
	group: null,

	/**
  * Group name
  * @type {String}
  */
	groupName: null,

	/**
  * The initialization of the mixin must be called in the object that applies
  * this mixin
  * @param  {Object} config object config
  * @protected
  */
	constructor: function() {
		this.callParent(arguments);
		this.addEvents(
			'activechanged'
		);
		this.setGroup(this.groupName);
	},

	/**
  * Set a new value for the selected group
  * @param {Boolean} active new activity value in the group
  */
	setActive: function(active) {
		if (this.group) {
			this.fireEvent('activechanged', this, active);
		}
	},

	/**
  * Set group
  * @param {String} groupName Group name or null for deleting from group
  */
	setGroup: function(groupName) {
		var group = this.group;
		if (group) {
			if (group.name === groupName) {
				return;
			}
			group.removeItem(this);
		}
		if (groupName) {
			var manager = Terrasoft.util.GroupManager;
			group = manager.findGroup(groupName);
			if (!group) {
				group = manager.createGroup(groupName);
				manager.addGrooup(group);
			}
			group.addItem(this);
		}
	}

});

/**
 * Class of the group manager.
 * Contains and creates groups that are used by controls
 * using the Terrasoft.Groupable mixin
 * to add group behavior.
 * @static
 */
Terrasoft.util.GroupManager = (function() {

	var groupCollection = Ext.create("Terrasoft.Collection");

	return {

		/**
   * Create a group
   * @param  {String} groupName group name
   * @param  {Object} config group config
   * @return {Terrasoft.Group} group
   * @static
   */
		createGroup: function(groupName, config) {
			var group = Ext.create("Terrasoft.Group", {
				name: groupName
			});
			Ext.apply(group, config || {});
			return group;
		},

		/**
   * Add group to manager
   * @param {Terrasoft.Group} group
   * @static
   */
		addGrooup: function(group) {
			groupCollection.add(group.name, group);
		},

		/**
   * Delete a group from the manager
   * @param {Terrasoft.Group} group
   * @static
   */
		removeGroup: function(group) {
			groupCollection.remove(group);
		},

		/**
   * Get a group from the manager
   * @param  {String} groupName group name
   * @throws Terrasoft.ItemNotFoundException
   * If the item was not found, then an error is thrown
   * @return {Terrasoft.Group} group
   * @static
   */
		getGroup: function(groupName) {
			var group = this.findGroup(groupName);
			if (!group) {
				throw new Terrasoft.ItemNotFoundException({
					message: Terrasoft.Resources.GroupManager.GroupWithNameNotFound + ' - <' + groupName + '>'
				});
			}
			return group;
		},

		/**
   * Find a group from the manager
   * @param  {String} groupName group name
   * @return {Object} Terrasoft.Group or null if the group was not found
   * @static
   */
		findGroup: function(groupName) {
			var group = groupCollection.find(groupName);
			if (group) {
				return group;
			}
			return null;
		},

		/**
   * Clear the list of groups in the manager
   * @static
   */
		clear: function() {
			groupCollection.clear();
		},

		/**
   * Destroy the manager and free up resources
   * @static
   */
		destroy: function() {
			groupCollection.destroy();
			Terrasoft.util.GroupManager = null;
		}

	};
}());