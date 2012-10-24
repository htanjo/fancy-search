/*global require:false*/
require([
    'backbone',
    'models/application'
], function (Backbone, Application) {

    // Enable Strict Mode.
    'use strict';

    var application;

    module('application', {
        setup: function () {
            application = new Application();
        },
        teardown: function () {
        }
    });

    test('initialize(): Application instance exists.', function () {
        ok(application, 'Exists.');
        ok(application instanceof Application, 'Pass "instanceof" operator.');
    });

});