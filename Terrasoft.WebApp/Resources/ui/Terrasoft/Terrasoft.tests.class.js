/*jshint ignore:start*/

Class("Terrasoft.Utils.Harness", {
	isa: Siesta.Harness.Browser.ExtJS,
	has: {
		warnOnNotBDD: false
	}
});

Class("Siesta.Result.DiagnosticV2", {
	isa: Siesta.Result.Diagnostic,
	has: {
		isSpecForBDD: false
	},
	override: {
		toJSON: function() {
			var info = {
				parentId: this.parent && this.parent.id,
				isSpecForBDD: this.isSpecForBDD,
				type: this.meta.name,
				description: this.description
			};
			return info;
		}
	}
});

Class("Terrasoft.Utils.StringBuilder", {
	has: {
		items: Joose.I.Array
	},
	methods: {
		_appendString: function(text) {
			this.items.push(text);
		},
		_appendArray: function(array) {
			Joose.A.each(array, function(el) {
				this.append(el);
			}, this);
		},
		_appendObject: function(o) {
			if (o.toString) {
				this._appendString(o.toString());
			}
		},
		append: function(text) {
			if (text) {
				if (typeof text === "string") {
					this._appendString(text);
				} else if (text instanceof Array) {
					this._appendArray(text);
				} else {
					this._appendObject(text);
				}
			}
		},
		toString: function(separator) {
			return this.items.join(separator || "");
		},
		isEmpty: function() {
			return this.items.length === 0;
		},
		clear: function() {
			this.items = Joose.I.Array;
		}
	}
});

Class("Terrasoft.Utils.BddTestsBuilder", {
	isa: Terrasoft.Utils.StringBuilder,
	has: {
		describeTpl: "\t\ntest.describe(\"{0}\", function(test) {",
		beforeEachString: "\n\ttest.beforeEach(function(test) {",
		afterEachString: "\n\ttest.afterEach(function(test) {",
		itTpl: "\n\ttest.it(\"{0}\", function(test) {",
		closeString: "});\n",
		setUpRegExp: /\n^\s+test\.setUp\(\)\;$/gm,
		tearDownRegExp: /\n^\s+test\.tearDown\(\)\;$/gm,
		testDataRegExp: /test\.data/g,
		testMethodDoneRegExp: /\n^\s+test\.testMethodDone\(\)\;$/gm
	},
	methods: {
		_getMethodBody: function(func) {
			var result = "";
			if (Ext.isFunction(func)) {
				var entire = func.toString();
				var body = entire.slice(entire.indexOf("{") + 1, entire.lastIndexOf("}"));
				body = this._replaceSpecialEntries(body);
				result = body;
			}
			return result;
		},
		_replaceSpecialEntries: function(text, searchPattern, replaceValue) {
			text = text.replace(this.testDataRegExp, "test.getRootTest().data");
			if (searchPattern) {
				text = text.replace(searchPattern, replaceValue || "");
			}
			return text;
		},
		_appendSetup: function(testObj) {
			if (Ext.isFunction(testObj.setUp)) {
				this.append(this.beforeEachString);
				var body = this._getMethodBody(testObj.setUp);
				body = this._replaceSpecialEntries(body, this.setUpRegExp);
				this.append(body);
				this.appendClose();
			}
		},
		_appendTearDown: function(testObj) {
			if (Ext.isFunction(testObj.tearDown)) {
				this.append(this.afterEachString);
				var body = this._getMethodBody(testObj.tearDown);
				body = this._replaceSpecialEntries(body, this.tearDownRegExp);
				this.append(body);
				this.appendClose();
			}
		},
		_appendSpec: function(testObj) {
			this.append(Ext.String.format(this.itTpl, testObj.name));
			var body = this._getMethodBody(testObj.method);
			body = this._replaceSpecialEntries(body, this.testMethodDoneRegExp);
			this.append(body);
			this.appendClose();
		},
		toString: function(isClear) {
			this.append(this.closeString);
			this.append(this.closeString);
			var result = this.SUPERARG(arguments);
			return result;
		},
		appendClose: function() {
			this.append(this.closeString);
		},
		appendTestSuite: function(text, scope) {
			this.append(Ext.String.format(this.describeTpl, text));
			if (scope && (scope.tearDown || scope.setUp)) {
				this.appendTestArrange(scope);
			}
		},
		appendTestBody: function(testObj) {
			if (Ext.isFunction(testObj.setUp) || Ext.isFunction(testObj.tearDown)) {
				this.appendTestSuite(testObj.name, testObj);
				this._appendSpec(testObj);
				this.appendClose();
				return;
			}
			this._appendSpec(testObj);
		},
		appendTestArrange: function(testObj) {
			this._appendSetup(testObj);
			this._appendTearDown(testObj);
		}
	}
});
Class("Terrasoft.BDDConverter", {
	isa: Terrasoft.Utils.BddTestsBuilder,
	my: {
		methods: {
			addBDDAssertion: function(builder, test) {
				if (!builder.isEmpty()) {
					if (test.harness.writeToFileOnNotBDD) {
						test.addResult(new Siesta.Result.DiagnosticV2({
							description: String(builder.toString() || ""),
							isSpecForBDD: true
						}));
					}
					if (test.harness.warnOnNotBDD) {
						test.warn(builder.toString());
					}
					builder.clear();
				}
			},
			getBuildersFromContext: function(context) {
				var builders = [],
						builder = context.builder;
				if (builder.isEmpty()) {
					var results = context.getResults();
					results.each(function(item) {
						var innerCtx = item.test;
						builder = innerCtx && innerCtx.builder;
						if (builder && !builder.isEmpty()) {
							builders.push(builder);
						}
					}, this);
				} else {
					builders.push(context.builder);
				}
				return builders;
			},
			setVisibleCopyButton: function(test, value) {
				if (test.harness.warnOnNotBDD) {
					var copyBddAsertion = Ext.get("copyBddAssertion");
					if (copyBddAsertion) {
						if (value) {
							copyBddAsertion.el.removeCls("hidden");
						} else {
							copyBddAsertion.el.addCls("hidden");
						}
					}
				}
			},
			copyBddAssertionToClipboard: function() {
				var query = Ext.query("span[class='assertion-text']");
				var bdd = query[query.length - 1];
				var input = document.createElement("textarea");
				document.body.appendChild(input);
				input.value = bdd.innerText.replace("WARN: \t\n", "");
				input.focus();
				input.select();
				document.execCommand("Copy");
				input.remove();
			}
		}
	}
});

Class("Terrasoft.Test.Class", {
	isa: Siesta.Test.ExtJS,
	does: [
		Siesta.Test.ExtJSCore,
		Siesta.Test.ExtJS.Element,
		Siesta.Test.ExtJS.Observable,
		Siesta.Test.ExtJS.Ajax
	],
	has: {
		builder: {
			is: "rw",
			init: function() {
				return new Terrasoft.BDDConverter();
			}
		},
		queue: {
			is: "rw",
			init: function() {
				return [];
			}
		},
		data: {
			is: "rw",
			init: function() {
				return {};
			}
		},
		testsStarted: {
			is: "rw",
			init: false
		},
		firstRun: {
			is: "rw",
			init: true
		},
		lastDiag: {
			is: "rw",
			init: null
		},
		testFilter: {
			is: "rw",
			init: null,
			setterName: "setTestFilter"
		},
		_asyncTestTimeout: {
			is: "rw",
			init: undefined
		}
	},
	override: {

		initialize: function () {
			this.SUPERARG(arguments);
			this.on("beforetestfinalize", function(event, test) {
				var hrns = test && test.harness;
				if (hrns && hrns.warnOnNotBDD === true) {
					var builders = Terrasoft.BDDConverter.getBuildersFromContext(test);
					var bddConverter = Terrasoft.BDDConverter;
					if (builders && builders.length) {
						Joose.A.each(builders, function(builder) {
							bddConverter.addBDDAssertion(builder, test);
						}, this);
						bddConverter.setVisibleCopyButton(test, true);
					} else {
						bddConverter.setVisibleCopyButton(test, false);
					}
				}
			}, this);
		},

		/**
		 * This method output the diagnostic message.
		 * @param {String} message The text of diagnostic message.
		 * @param {Boolean} [isUseOriginal] Flag, which points on necessity of using original realisation.
		 */
		diag: function(message, isUseOriginal) {
			if (this.firstRun) {
				this.builder.appendTestSuite(this.name, this);
				this.firstRun = false;
			}
			if (isUseOriginal === true) {
				this.SUPERARG([message]);
				return;
			}
			if (this.lastDiag) {
				this.builder.appendClose();
			}
			this.lastDiag = message;
			this.builder.appendTestSuite(message);
			var queue = this.queue;
			if (queue.length === 0) {
				this.SUPERARG([message]);
			} else {
				this.queue.push(message);
			}
		},

		/**
		 * Mark a group of assertions as 'todo', assuming they most likely will fail, but it's still worth to try to
		 * run them.
		 * @param {String} message The reason/description for the todo.
		 */
		todo: function(message) {
			var todoMessage = message.toString();
			var result = new Siesta.Result.Assertion({
				isTodo: true
			});
			var saveIsTodo = this.isTodo;
			this.isTodo = true;
			var annotation = "TODO: " + todoMessage;
			this.fail(todoMessage, {
				annotation: annotation
			}, result);
			this.isTodo = saveIsTodo;
		},

		/**
		 * This assertion passes, when the func function throws the exception during executing.
		 * @param {Function} func The function which supposed to throw an exception.
		 * @param {String} exceptionType Type of exception.
		 * @param {String} message The description of the assertion.
		 */
		throwsOk: function(func, exceptionType, message) {
			var toString = Object.prototype.toString;
			if (typeof(exceptionType) === "string" || toString.call(exceptionType) === "[object RegExp]") {
				this.SUPERARG([func, exceptionType, message]);
				return;
			}
			var exception = null;
			try {
				func();
			} catch (catchedException) {
				exception = catchedException;
			}
			if (exception instanceof exceptionType) {
				this.pass(message);
			} else {
				this.fail(message, {
					assertionName: "throwsOk",
					got: exception,
					annotation: "Wrong exception type"
				});
			}
		},

		/**
		 * Method, which will be called for finalization of test.
		 */
		finalize: function() {
			var oldTearDown = this.tearDown;
			if (oldTearDown.length === 0) {
				this.tearDown = function(success) {
					if (success) {
						success();
					}
					if (!this.finalizationStarted && !this.isFinished()) {
						oldTearDown.apply(this, arguments);
					}
				};
			}
			try {
				this.SUPERARG(arguments);
			} catch (e) {
				var testObj = this.queue[0];
				this.fail(testObj.name + ": tearDown failed with exception - " + e.message, e.name);
			}
			if (this.finalizationStarted && this.isFinished()) {
				this.clearAfterTest();
			}
		}
	},

	methods: {
		/**
		 * Method for clearing context of current iframe.
		 */
		clearAfterTest: function() {
			var global = this.global;
			Ext.each(this.clearGlobal, function(item) {
				if (global[item]) {
					delete global[item];
				}
				global.require.undef(item);
			});
		},

		/**
		 * Method for declaring subtest of current test.
		 * @param {Object} testObj Configuration object.
		 * @param {Object} testObj.name Name of the subtest.
		 * @param {Object} testObj.method Method of the subtest.
		 * @param {Object} testObj.setUp Function, which will be executed before 'method'.
		 * @param {Object} testObj.tearDown Function, which will be executed after 'method'.
		 */
		testMethod: function(testObj) {
			if (typeof testObj.method !== "function") {
				throw "Config doesn't contain method";
			}
			testObj.name = testObj.name || "NoName test";
			if (this.firstRun) {
				this.builder.appendTestSuite(this.name, this);
				this.firstRun = false;
			}
			this.builder.appendTestBody(testObj);
			var queue = this.queue;
			var message = queue[0];
			var filterEmpty = !this.testFilter;
			if (filterEmpty || this.testFilter.test(testObj.name)) {
				queue.push(testObj);
			}
			if (queue.length === 1 && (filterEmpty || !this.testsStarted)) {
				this.testsStarted = true;
				this.runNextTest();
			}
		},

		/**
		 * Start next subtest in current test.
		 */
		runNextTest: function() {
			var testObj = this.queue[0];
			if (typeof testObj === "object") {
				var setUp = testObj.setUp || this.setUp;
				if (typeof setUp === "function") {
					try {
						setUp.call(this);
					} catch (e) {
						this.fail(testObj.name + ": setUp failed with exception - " + e.message, e.name);
					}
				}
				try {
					testObj.method();
				} catch (e) {
					this.fail(testObj.name + ": failed with exception " + e.message, e.name);
					this.testMethodDone();
				}
			} else if (typeof testObj === "string") {
				this.diag(testObj, true);
				this.queue.shift();
				this.runNextTest();
			}
		},

		/**
		 * Function, which will be called for end of subtest.
		 */
		testMethodDone: function() {
			var testObj = this.queue.shift();
			if (typeof testObj === "object") {
				var tearDown = testObj.tearDown || this.tearDown;
				if (typeof tearDown === "function") {
					try {
						tearDown.call(this, function() {
						}, function() {
						});
					} catch (e) {
						var testObj = this.queue[0];
						this.fail(testObj.name + ": tearDown failed with exception - " + e.message, e.name);
					}
				}
				this.data = {};
			}
			this.runNextTest();
		},

		/**
		 * Compare objects properties.
		 * @param {Object} testObject Test object.
		 * @param {Object} expectedPropertyValues Expected property values.
		 * @param {String} message Message template.
		 * @example
		 * "Message text {0}" - {0} it will be the property of expected object.
		 */
		compareObjectProperties: function(testObject, expectedPropertyValues, message) {
			if (!Ext.isObject(testObject) || !Ext.isObject(expectedPropertyValues)) {
				this.fail("Arguments must be an object - " + testObject + " " + expectedPropertyValues);
			} else {
				var expectedPropertyValuesKeys = Object.keys(expectedPropertyValues);
				message = message || "{0} is correct.";
				Ext.each(expectedPropertyValuesKeys, function(key) {
					this.isStrict(testObject[key], expectedPropertyValues[key],
							Ext.String.format(message, key));
				}, this);
			}
		},

		/**
		 * Compare array objects properties.
		 * @param {Array} testArrayObject
		 * @param {Array} expectedArrayPropertyValues
		 * @example
		 * test.compareArrayObjectProperties([{a: true}, {b: false}, {c: 0}], [{a: true}, {b: false}])
		 */
		compareArrayObjectProperties: function(testArrayObject, expectedArrayPropertyValues) {
			if (!Ext.isArray(testArrayObject) || !Ext.isArray(expectedArrayPropertyValues)) {
				this.fail("Arguments must be an array - " + testArrayObject + " " + expectedArrayPropertyValues);
				return;
			}
			for(const [index, expectedObject] of Object.entries(expectedArrayPropertyValues)) {
				const actualObject =  testArrayObject[index];
				const expectedPropertyValuesKeys = Object.keys(expectedObject);
				Ext.each(expectedPropertyValuesKeys, function(property) {
					this.expect(actualObject[property]).toEqual(expectedObject[property]);
				}, this);
			}
		},

		/**
		 * Checks that the current browser is PhantomJS.
		 * */
		isPhantom: function() {
			// BrowserSupport: PhantomJS
			var paramsString = window.location.search.substr(1);
			var paramsArray = paramsString.split("&");
			return paramsArray.indexOf("phantom=true") > -1;
		},

		/**
		 * Initializes regular expression to filter tests by name, useful for run single test method. Supported only
		 * for local host.
		 * @param {String} value Value to find in test name.
		 */
		setTestFilter: function(value) {
			if (window.location.hostname === "localhost") {
				this.testFilter = new RegExp(value, "gi");
			} else {
				throw new Error("Test file error. Are you forget to remove test.setTestFilter(...)? ");
			}
		},

		/**
		 * @override
		 * Disables passed test expectations stringify.
		 */
		start: function() {
			this.serializeFormatingPlaceholders = false;
			const isAsync = this.run && this.run.constructor && this.run.constructor.name === "AsyncFunction";
			if (isAsync) {
				const originalRun = this.run;
				const timeout = this._asyncTestTimeout;
				const me = this;
				this.run = function() {
					const async = me.beginAsync(timeout);
					const promise = originalRun.apply(this, arguments);
					promise.then(() => me.endAsync(async));
				};
			}
			this.SUPERARG(arguments);
		}

	}
});

Class("Terrasoft.Test.CookieUtils", {
	my: {
		methods: {
			_getCookieObject: function(){
				return decodeURIComponent(document.cookie)
					.split(";")
					.map(v => v.split("=").map(v => v.trim()))
					.reduce((result, keyValue) => {
						result[keyValue[0]]=keyValue[1];
						return result;
					}, {});
			},
			set: function(key, value) {
				document.cookie = `${key}=${value}`;
			},
			get: function(name) {
				const obj = this._getCookieObject();
				return obj[name];
			}
		}
	}

});
/*jshint ignore:end*/
