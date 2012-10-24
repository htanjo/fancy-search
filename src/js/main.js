/**
 * Application bootstrap.
 * @author htanjo
 */

// Indicate global objects for JSHint.
/*global require:false*/

require.config({
    paths: {
        // Frameworks & Libraries
        'requireLib':   'libs/require/require',
        'jquery':       'libs/jquery/jquery-1.8.1',
        'underscore':   'libs/documentcloud/underscore-1.3.3',
        'backbone':     'libs/documentcloud/backbone-0.9.2',
        'handlebars':   'libs/handlebars/handlebars-1.0.0.beta.6',
        'text':         'libs/require/text',

        // Plugins
        'jq-masonry':   'libs/jquery/plugins/jquery.masonry',
        'jq-tipsy':     'libs/jquery/plugins/jquery.tipsy',
        'jq-lightbox':  'libs/jquery/plugins/jquery.lightbox_me',

        // Application
        'models':       'app/models',
        'collections':  'app/collections',
        'views':        'app/views',
        'routers':      'app/routers',
        'templates':    'app/templates'
    },
    shim: {
        'underscore': {
            exports:    '_'
        },
        'backbone': {
            deps:       ['underscore', 'jquery'],
            exports:    'Backbone'
        },
        'handlebars': {
            exports:    'Handlebars'
        },
        'jq-tipsy':     ['jquery'],
        'jq-lightbox':  ['jquery']
    }
});

require([
    'backbone',
    'jquery',
    'routers/router'
], function (Backbone, $, Router) {

    // Enable Strict Mode.
    'use strict';

    // Initialize main router when DOM ready.
    $(function () {
        if (!$('html').hasClass('lt-ie8')) {
            new Router();
            Backbone.history.start();
        }
    });

});
