/*global require:false, QUnit:false*/
QUnit.config.autostart = false;

require.config({
    baseUrl: '../src/js',
    paths: {
        'tests': '../../test/tests'
    }
});

require(['main'], function () {
    require(
        [
            'jquery',
            'tests/routers-test',
            'tests/models-test'
        ],
        function ($) {
            'use strict';
            $(function () {
                QUnit.start();
            });
        }
    );
});