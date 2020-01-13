/**
 */
Ext.define("Terrasoft.core.PrivateMemberWatcher", {
	alternateClassName: "Terrasoft.PrivateMemberWatcher",

	singleton: true,

	/**
	 * @private
	 */
	_privateMembers: {},

	/**
	 * @private
	 */
	_classes: {},

	/**
	 * @private
	 */
	_violations: {},

	/**
	 * @private
	 */
	_getMixinParents: function(classRefProt, parents) {
		for(var mixin in classRefProt.mixins) {
			if (mixin) {
				var mixinClassRef = classRefProt.mixins[mixin];
				Ext.Array.include(parents, mixinClassRef.$className);
				this._getParentsRecursive(mixinClassRef.$className, parents);
			}
		}
	},

	/**
	 * @private
	 */
	_getParentsRecursive: function(className, parents) {
		var classRef = Ext.ClassManager.get(className);
		var classRefProt = classRef && classRef.prototype;
		if (classRefProt) {
			this._getMixinParents(classRefProt, parents);
			var parentClassName = classRefProt.__proto__ &&
				classRefProt.__proto__.$className;
			if (parentClassName) {
				Ext.Array.include(parents, parentClassName);
				this._getParentsRecursive(parentClassName, parents);
			}
		}
	},

	/**
	 * @private
	 */
	_getParents: function(className) {
		var result = [];
		this._getParentsRecursive(className, result);
		return result;
	},

	/**
	 * @private
	 */
	_getPrintMessage: function(member, violatedClasses) {
		return Ext.String.format(
			"Overriding private member in {0}, defined in:\n{1}",
			member,
			violatedClasses.sort().join("\n")
		);
	},

	/**
	 * @private
	 */
	_isPrivate: function(className, memberName) {
		var result = memberName.indexOf("_") === 0 && memberName !== "__privateMembers";
		if (!result) {
			var classRef = Ext.ClassManager.get(className);
			var classRefProt = classRef && classRef.prototype;
			if (classRefProt) {
				var privateMembers = classRefProt.__privateMembers || [];
				result = privateMembers.indexOf(memberName) > -1;
			}

		}
		return result;
	},

	_validateMemberViolation: function(privateMemberParents, parents, className, member) {
		if (privateMemberParents.length > 0) {
			var violatedClasses = Ext.Array.intersect(privateMemberParents, parents);
			if (violatedClasses.length > 0) {
				var classMemberName = className + "." + member;
				this._violations[classMemberName] = violatedClasses;
				console.error(this._getPrintMessage(classMemberName, violatedClasses));
			}
		}
	},

	/**
	 * Outputs violations into console.
	 */
	printAll: function() {
		Terrasoft.each(this._violations, function(classes, member) {
			console.error(this._getPrintMessage(member, classes));
		}, this);
	},

	/**
	 * Returns violations of private members overriding.
	 * @return {Object} Violations.
	 */
	getViolations: function() {
		return this._violations;
	},

	/**
	 * Returns overriden Ext.define method.
	 * @return {Function} Overriden Ext.define.
	 */
	getOverridenDefine: function(originFn) {
		var self = this;
		var overridenDefine = function(className, data, createdFn) {
			var definedClass = originFn.call(self, className, data, createdFn);
			try {
				if (data) {
					var parents = self._classes[className] = self._getParents(className);
					var privateMembers = Object.keys(data).filter(function (memberName) {
						return self._isPrivate(className, memberName);
					});
					privateMembers.map(function(member) {
						var privateMemberParents = self._privateMembers[member] = self._privateMembers[member] || [];
						self._validateMemberViolation(privateMemberParents, parents, className, member);
						Ext.Array.include(privateMemberParents, className);
					});
				}
			} finally {
				return definedClass;
			}
		};
		return overridenDefine;
	}
});
Ext.define = Terrasoft.PrivateMemberWatcher.getOverridenDefine(Ext.define);
