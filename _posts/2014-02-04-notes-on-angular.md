---
layout: post
title: Notes on Angular.js
tags: [js, angularjs]
---

I have recently have had the pleasure to work with Angular.js. The first couple of hours were mostly spend trying to wrap my head around an existing code base and an unfamiliar framework. Over the weekend I had a chance to read up on the documentation. I took some notes on best practices:

### Modules

Break up your application/features into multiple modules:

- A service module
- A directive module
- A filter module
- An application level module which depends on the above modules, and which has initialization code.

### Controllers

Do not use Controllers for:

- DOM manipulation - Use `directives` instead.
- Input formatting — Use `form controls` instead.
- Output filtering — Use `filters` instead.
- Sharing stateless or stateful code across Controllers — Use `services` instead.
- Managing the life-cycle of other components (for example, to create service instances).

### Services

The purpose of the service factory function is to generate the single object, or function,
that represents the service to the rest of the application. That object, or function,
will then be injected into any component (controller, service, filter or directive) that specifies a dependency on the service.

### Dependency Injection

Use the inline DI annotation.

{% highlight js %}
someModule.factory('greeter', ['$window', function(renamed$window) {
    ...
}]);
{% endhighlight %}

### Directives

- Use the dash-delimited names (e.g. `ng-bind` for `ngBind`). Prefix with `-data` if HTML validation is an issue.
- Use directives via tag name or attributes.
- Return a definition object from the factory function.
- Prefix custom directive names.
- Load anything but trivial templates using `templateUrl`.
- Use an element (`restrict: 'E'`) when you are creating a component that is in control of the template.
- Use an attribute (`restrict: 'A'`) when you are decorating an existing element with new functionality.
- Use `scope` to create isolated scopes for reusable components.
- Use `$scope.on('desctroy', ...)` or `element.on('destroy', ...)` to clean up (e.g. remove event listeners).
- Only use `transclude: true` for directives that wrap arbitrary content.
- Use `&attr` in `scope` to expose an API for behaviours.
- Use `controller` to expose an API to other directives. Otherwise use link.

Other Notes:

- attributes in the `scope` option of directives are normalized (e.g. `bind-to-this="thing"` => `=bindToThis`)
- isolated scopes do *not* prototypically inherit.


### Conventions

- `factory` functions should include "Factory" in their name (e.g. `lazerswordFactory`)
- Use `$log`, set `ng.$logProvider#debugEnabled(false)` in `app.config` to suppress.
- Package by feature -> see [here](http://clintberry.com/2013/modular-angularjs-application-design/) and [here](http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript)
- `'use strict';`