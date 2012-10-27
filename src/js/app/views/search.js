/**
 * Module of search widget view.
 * @module search
 * @author Tanjo, Hiroyuki
 */

// Indicate global objects for JSHint.
/*global define:false*/

define([
    'backbone',
    'jquery'
], function (Backbone, $) {

    // Enable Strict Mode.
    'use strict';

    /**
     * Class of search widget view.
     * @class Search
     * @constructor
     * @extends Backbone.View
     */
    var Search = Backbone.View.extend({

        /**
         * DOM event binding.
         * @property events
         * @type Object
         */
        events: {
            'focus #searchBox': 'activate',
            'blur #searchBox': 'deactivate',
            'click .search-clear': 'clear',
            'click .search-submit': 'search',
            'keyup #searchBox': 'handleInput'
        },

        /**
         * Initialize search widget view.
         * @method initialize
         */
        initialize: function () {
            // Events
            this.model.on('change:input', this.renderInput, this);
            this.model.on('change:hitNumber', this.renderResult, this);
        },

        /**
         * Render search box.
         * @method renderInput
         * @return {Search}
         */
        renderInput: function () {
            var value = this.model.get('input');
            this.$('#searchBox').val(value);
            if (value) {
                this.$el.addClass('active fixed').removeClass('changed');
            }
            else {
                this.$el.removeClass('fixed changed');
                if (!this.$('#searchBox:focus').length) {   // If search box is focused, remain active.
                    this.$el.removeClass('active');
                }
            }
            return this;
        },

        /**
         * Render result view.
         * @method renderResult
         * @return {Search}
         */
        renderResult: function () {
            var hit = this.model.get('hitNumber'),
                resultText = '';
            if (hit === 0) {
                resultText = 'No results';
            }
            else if (hit === 1) {
                resultText = '1 result';
            }
            else {
                resultText = hit + ' results';
            }
            this.$('.search-result').text(resultText);
            return this;
        },

        /**
         * Activate search box.
         * @method activate
         */
        activate: function () {
            this.$el.addClass('active');
        },

        /**
         * Deactivate search box when input is empty.
         * @method deactivate
         */
        deactivate: function () {
            if (!this.$('#searchBox').val() && !this.$el.hasClass('fixed')) {
                this.$el.removeClass('active changed');
            }
        },

        /**
         * Clear search input.
         * @method clear
         */
        clear: function () {
            location.hash = '#!/';
        },

        /**
         * Submit search query.
         * @method search
         */
        search: function () {
            var keyword,
                hash,
                $searchBox = $('#searchBox');
            $searchBox.val($.trim($searchBox.val()));
            keyword = $searchBox.val();
            hash = (keyword) ? '#!/search?keyword=' + encodeURIComponent(keyword) : '#!/';
            location.hash = hash;
        },

        /**
         * Handle keyup event.
         * @method handleInput
         * @param {Event} event
         */
        handleInput: function (event) {
            this.checkInputChange();
            if (event.keyCode === 13 || event.which === 13) {
                this.search();
            }
        },

        /**
         * Check input was changed or not.
         * @method checkInputChange
         */
        checkInputChange: function () {
            if (this.$('#searchBox').val() === this.model.get('input')) {
                this.$el.removeClass('changed');
            }
            else {
                this.$el.addClass('changed');
            }
        }
    });

    return Search;

});