/**
 * singleton-factory.js
 * 
 * Author Bret Little
 * Version: 0.2
 *
 * This is a utility module for creating singleton modules. It embeds into a singleton instance
 * convenience methods for destroying or re-initializing the singleton module.
 *
 * Require the SingletonFactory as a module dependency.
 * Create a singleton by calling SingletonFactory.create(module, [params])
 *      module (required) - The actual module definition, required to create a singleton. The new operator will be called
 *                          on this parameter, make sure it is a constructor function.
 *      params (optional) - Parameters to pass to the new singleton instance's constructor function;
 *
 * Example:
 *
 *  SingletonFactory.create(ModalDialogView)
 *
 *
 * Once the singleton is created, whenever the dependency is referenced, the following api is available:
 *      getInstance     - Get the instance of the singleton
 *      resetInstance   - Reset the instance (call constructor)
 *      destroyInstance - Set the output instance to null
 *      getInitCount    - Convenience method for determining how many times the instance
 *                        has been reset (how many times the constructor has been called).
 *
 * Example:
 *
 *  require(['ModalDialogView'], function(ModalDialogView) {
 *      ModalDialogView.getInstance().render();
 *  });
 *
 */

(function (root, factory) {
	if (typeof exports === 'object') {
		// Node. Does not work with strict CommonJS, but
		// only CommonJS-like enviroments that support module.exports,
		// like Node.
		module.exports = factory(require('b'));
	} else if (typeof define === 'function' && define.amd) {
		// AMD. Register as an anonymous module.
		define([], factory);
	} else {
		// Browser globals
		root.returnExports = factory();
	}
}(this, function () {
	"use strict";

	var SingletonFactory = {

		create: function(module, _params) {

			var ModuleDef = module,
				params    = _params || {},
				singletonInitCount, singletonInit, singletonDestroy, tempDef,
				instance, initCount = 0;

			singletonInit = function() {
				instance = new (ModuleDef)(params);
				initCount++;
				return instance;
			};

			singletonDestroy = function() {
				instance = null;
				return instance;
			};

			singletonInit();

			return {
				getInstance: function() {
					if(!instance) {
						return singletonInit();
					}
					return instance;
				},

				resetInstance: function() {
					return singletonInit();
				},

				destroyInstance: function() {
					return singletonDestroy();
				},

				getInitCount: function() {
					return initCount;
				}
			};
		}

	};

	return SingletonFactory;
}));
