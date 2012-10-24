/**
 * Module of work list collection.
 * @author htanjo
 */

// Indicate global objects for JSHint.
/*global define:false*/

define([
    'backbone',
    'models/work'
], function (Backbone, Work) {

    // Enable Strict Mode.
    'use strict';

    var WorkList = Backbone.Collection.extend(
        /** @lends WorkList.prototype */
        {

            /**
             * Associated model class.
             */
            model: Work,

            /**
             * Create work list collection.
             * @class
             * @augments Backbone.Collection
             * @constructs
             */
            initialize: function () {
            }

        }
    );

    return WorkList;

});