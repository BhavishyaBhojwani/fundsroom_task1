/**
 * Property Category Tabs - JavaScript
 * Handles switching between Residential and Commercial property tabs
 */

(function($) {
    'use strict';

    // Tab Switching Functionality
    function initPropertyCategoryTabs() {
        const tabButtons = $('.category-tab-btn');
        const tabContents = $('.category-tab-content');

        // Tab button click handler
        tabButtons.on('click', function() {
            const category = $(this).data('category');
            
            // Remove active class from all buttons and contents
            tabButtons.removeClass('active');
            tabContents.removeClass('active');
            
            // Add active class to clicked button
            $(this).addClass('active');
            
            // Show corresponding tab content
            $('#' + category).addClass('active');
            
            // Re-trigger WOW.js animations for the newly shown properties
            if (typeof WOW !== 'undefined') {
                setTimeout(function() {
                    const wow = new WOW({
                        boxClass: 'wow',
                        animateClass: 'animated',
                        offset: 0,
                        mobile: true,
                        live: true
                    });
                    wow.init();
                }, 100);
            }
            
            // Smooth scroll to property section if needed
            const scrollOffset = $('.property-category-tabs').offset().top - 100;
            $('html, body').animate({
                scrollTop: scrollOffset
            }, 500);
        });
    }

    // Initialize on document ready
    $(document).ready(function() {
        initPropertyCategoryTabs();
        console.log('🏢 Property Category Tabs Initialized');
    });

    // Re-initialize on window load (for compatibility)
    $(window).on('load', function() {
        // Ensure first tab is active by default
        if ($('.category-tab-btn.active').length === 0) {
            $('.category-tab-btn').first().addClass('active');
            $('.category-tab-content').first().addClass('active');
        }
    });

})(jQuery);
