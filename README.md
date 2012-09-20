singletonfactory.js
==================

This is a simple utility module for creating singleton modules. It only really makes sense to use this library when
already using a module loader in your application (CommonJS or AMD). When defining a module that will be reused by
other modules and it is desired that this module will only ever exist once, use this libary to create a singleton instance
that will be reused everwhere that module is referenced. This already can easily be done by returning a new instance
of a module where it is defined. This works great, but you can never recreate or modify the reference to the singleton
instance that is used by other modules.


SingletonFactory.js embeds into a singleton instance convenience methods for destroying or re-initializing the 
singleton module. This might be useful in a Backbone.js app where you have a layoutManager view that only has one instance,
but sometimes that instance needs to be recreated. 

Essentially singletonfactory.js provides a global way of getting at an instance of an object without putting it into some
sort of global name space. Minified and gzipped the code is 279 bytes.

## Options

Require the SingletonFactory as a module dependency.
Create a singleton by calling `SingletonFactory.create(module, [params])`
 * `module` (required) - The actual module definition, required to create a singleton. The new operator will be called
                          on this parameter, make sure it is a constructor function.
 * `params` (optional) - Parameters to pass to the new singleton instance's constructor function;

Once the singleton is created, whenever the dependency is referenced, the following api is available:
 * `getInstance`     - Get the instance of the singleton
 * `resetInstance`   - Reset the instance (call the constructor)
 * `destroyInstance` - Set the output instance to null
 * `getInitCount`    - Convenience method for determining how many times the instance
                       has been reset (how many times the constructor has been called).
 
## Example:

The singleton module definition:

```javascript 
requrie(['singletonfactory.js', 'backbone.js'], function(SingletonFactory, Backbone) {
  
  var layoutManager = Backbone.View.extend({
    initialize: function() {
      //do some work
    },
    render: function() {
      //render something
    }
  });
  
  return SingletonFactory.create(layoutManager);  
}); 
```

Another module that references the singleton module definition:
```javascript 
require(['ModalDialogView'], function(ModalDialogView) {
  ModalDialogView.getInstance().render();
});
```