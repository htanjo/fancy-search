/**
 * Module of navigation view.
 * @module navigation
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
     * Class of navigation view.
     * @class Navigation
     * @constructor
     * @extends Backbone.View
     */
    var Navigation = Backbone.View.extend({

        /**
         * Construct article view.
         * @method initialize
         */
        initialize: function () {
            var self = this;

            // Events
            this.model.on('change:loadedPage', function(application, number) {
                self.render(number);
            });
            $(window).on('scroll', function () {
                self.renderSelected();
            });
        },

        /**
         * Render navigation to add or clear anchor.
         * @method render
         * @param {Number} number
         * @return {Navigation}
         */
        render: function (number) {
            var $list = this.$('ul'),
                $addItem;

            if (number === 0) {
                $list.empty().css('right', 0);
            }
            else {
                $addItem = $('<li data-anchor="#page' + number + '">' + number + '</li>');
                $addItem.click(function () {
                    var $target = $($(this).attr('data-anchor'));
                    $('html, body').animate({scrollTop: $target.offset().top - 43}, 250);
                });
                $list.append($addItem);
                this.renderSelected();
                this.renderPosition();
            }
            return this;
        },

        /**
         * Update selected item.
         * @method renderSelected
         * @return {Navigation}
         */
        renderSelected: function () {
            var selectedItemIndex = 0,
                $listItem = this.$('li'),
                $targetItem;
            $listItem.each(function (index) {
                var $target = $($(this).attr('data-anchor'));
                if ($target.offset().top >= $(window).scrollTop() + 200) {
                    return false;   // Break each().
                }
                selectedItemIndex = index;
            });
            $targetItem = $listItem.eq(selectedItemIndex);
            if (!$targetItem.hasClass('current')) {
                $listItem.removeClass('active');
                $targetItem.addClass('active');
                this.renderPosition();
            }
            return this;
        },

        /**
         * Update position of navigation.
         * @method renderPosition
         * @return {Navigation}
         */
        renderPosition: function () {
            var $targetItem = this.$('.active'),
                $list,
                activeRight,
                navWidth,
                targetWidth,
                targetPosition,
                visibleOffsetRight,
                visibleOffsetLeft;
            if ($targetItem.length === 1) {
                $list = this.$('ul');
                activeRight = parseInt($list.css('right'), 10);
                navWidth = this.$el.width();
                targetWidth = $targetItem.width();
                targetPosition = $targetItem.position().left;
                visibleOffsetRight = activeRight - targetPosition;
                visibleOffsetLeft = targetPosition + targetWidth;
                if (activeRight < visibleOffsetLeft) {
                    activeRight = visibleOffsetLeft;
                }
                else if (navWidth - 80 < visibleOffsetRight) {
                    activeRight = navWidth - 80 + targetPosition;
                }
                $list.css('right', activeRight);
            }
            return this;
        },

        /**
         * Scroll content area.
         * @method scrollContent
         */
        scrollContent: function () {

        }
    });

    return Navigation;

});