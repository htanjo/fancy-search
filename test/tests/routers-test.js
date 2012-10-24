/*global require:false*/
require([
    'backbone',
    'routers/router',
    'models/application'
], function (Backbone, Router, Application) {

    // Enable Strict Mode.
    'use strict';

    var router;

    module('router', {
        setup: function () {
            location.hash = '';
            router = new Router();
        },
        teardown: function () {
            location.hash = '';
        }
    });

    test('initialize(): Router instance exists.', function () {
        ok(router, 'Exists.');
        ok(router instanceof Router, 'Pass "instanceof" operator.');
    });

    test('initialize(): Router has application instance as its model.', function () {
        ok(router.model instanceof Application, 'Has instance.');
    });

    test('home(): When access to "#!/", query is empty object.', function () {
        var expected = {},
            query;
        location.hash = '#!/';
        stop();
        setTimeout(function () {
            start();
            query = router.model.get('query');
            deepEqual(query, expected, 'Empty object.');
        }, 100);
    });

    test('search(): When access to "#!/search?foo=bar&baz=fooBar", query is {foo:"bar",baz:"fooBar"}.', function () {
        var expected = {foo:"bar",baz:"fooBar"},
            query;
        location.hash = '#!/search?foo=bar&baz=fooBar';
        stop();
        setTimeout(function () {
            start();
            query = router.model.get('query');
            deepEqual(query, expected, 'Deeply equal.');
        }, 100);
    });

});