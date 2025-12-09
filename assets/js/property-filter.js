// Property Filter System
(function($) {
    "use strict";

    // Property data from favourites.js
    const propertyData = {
        'property1': {
            id: 'property1',
            title: 'Luxury 4BHK Villa with Garden',
            location: 'Alkapuri, Vadodara, Gujarat',
            price: 0, // Contact for price
            priceUnit: ' for price',
            beds: 4,
            bathrooms: 4,
            area: '1257 sq.ft',
            image: 'assets/images/resource/property1.jpeg',
            detailPage: 'property.html',
            tag: 'Newly Launched',
            type: 'residential'
        },
        'property2': {
            id: 'property2',
            title: 'Spacious 4BHK Garden Apartment',
            location: 'Sayajigunj, Vadodara, Gujarat',
            price: 0, // Contact for price
            priceUnit: ' for price',
            beds: 4,
            bathrooms: 2,
            area: '5000 sq.ft',
            image: 'assets/images/resource/property2.jpg',
            detailPage: 'property.html',
            tag: 'Coming Soon',
            type: 'residential'
        },
        'property3': {
            id: 'property3',
            title: 'Premium Penthouse with Terrace',
            location: 'Gotri Road, Vadodara, Gujarat',
            price: 0, // Contact for price
            priceUnit: ' for price',
            beds: 4,
            bathrooms: 2,
            area: '3818 sq.ft',
            image: 'assets/images/resource/property3.jpg',
            detailPage: 'property.html',
            tag: 'Newly Launched',
            type: 'residential'
        },
        'property4': {
            id: 'property4',
            title: 'Modern Corporate Office Space',
            location: 'Alkapuri, Vadodara, Gujarat',
            price: 150000,
            priceUnit: '/month',
            beds: 0,
            bathrooms: 10,
            area: '2500 sq.ft',
            image: 'assets/images/resource/property4.jpg',
            detailPage: 'property.html',
            tag: 'Featured',
            type: 'commercial',
            capacity: '50 Capacity'
        },
        'property5': {
            id: 'property5',
            title: 'Premium Retail Shop in Mall',
            location: 'Inorbit Mall, Vadodara, Gujarat',
            price: 95000,
            priceUnit: '/month',
            beds: 0,
            bathrooms: 0,
            area: '800 sq.ft',
            image: 'assets/images/resource/property5.jpg',
            detailPage: 'property.html',
            tag: 'Featured',
            discount: '20% off',
            type: 'commercial'
        },
        'property6': {
            id: 'property6',
            title: 'Industrial Warehouse with Facilities',
            location: 'GIDC Makarpura, Vadodara, Gujarat',
            price: 250000,
            priceUnit: '/month',
            beds: 0,
            bathrooms: 0,
            area: '10000 sq.ft',
            image: 'assets/images/resource/property6.jpg',
            detailPage: 'property.html',
            tag: 'Featured',
            type: 'commercial'
        }
    };

    // Format price in Indian currency
    function formatPrice(price) {
        if (price === 0) return 'Contact';
        if (price >= 100000) {
            return '₹' + (price / 100000).toFixed(2) + ' Lakh';
        }
        return '₹' + price.toLocaleString('en-IN');
    }

    // Generate property card HTML
    function generatePropertyCard(property) {
        const bedsDisplay = property.type === 'residential' 
            ? `<li><span><img src="assets/images/icons/bed.svg" alt="" /></span>${property.beds} Beds</li>`
            : `<li><span><img src="assets/images/icons/bed.svg" alt="" /></span>${property.area}</li>`;
        
        const bathsDisplay = property.type === 'residential'
            ? `<li><span><img src="assets/images/icons/bath.svg" alt="" /></span>${property.bathrooms} Bathrooms</li>`
            : property.capacity 
                ? `<li><span><img src="assets/images/icons/bath.svg" alt="" /></span>${property.capacity}</li>`
                : `<li><span><img src="assets/images/icons/bath.svg" alt="" /></span>${property.bathrooms > 0 ? property.bathrooms + ' Parking' : 'Parking'}</li>`;
        
        const areaDisplay = property.type === 'residential'
            ? `<li><span><img src="assets/images/icons/square.svg" alt="" /></span>${property.area}</li>`
            : `<li><span><img src="assets/images/icons/square.svg" alt="" /></span>Loading Bay</li>`;

        const priceDisplay = property.price === 0 
            ? `Contact<span>${property.priceUnit}</span>`
            : `${formatPrice(property.price)}<span>${property.priceUnit}</span>`;

        return `
            <div class="property-block_one style-three col-lg-4 col-md-6 col-sm-12 property-item" 
                 data-type="${property.type}" 
                 data-price="${property.price}" 
                 data-beds="${property.beds}"
                 data-location="${property.location.toLowerCase()}">
                <div class="property-block_one-inner wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
                    <div class="property-block_one-image">
                        <div class="property-block_one-title">${property.tag}</div>
                        <a href="${property.detailPage}"><img src="${property.image}" alt="" /></a>
                    </div>
                    <div class="property-block_one-content">
                        <div class="property-block_one-location"><i class="flaticon-maps-and-flags"></i>${property.location}</div>
                        <h4 class="property-block_one-heading"><a href="${property.detailPage}">${property.title}</a></h4>
                        <ul class="property-block_one-info">
                            ${bedsDisplay}
                            ${bathsDisplay}
                            ${areaDisplay}
                        </ul>
                        <div class="d-flex justify-content-between align-items-center flex-wrap">
                            <div class="property-block_one-price">${priceDisplay}</div>
                            <a class="property-block_one-heart" data-property-id="${property.id}"><img src="assets/images/icons/heart.svg" alt="" /></a>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Initialize properties display
    function initializeProperties() {
        const container = $('#propertiesContainer');
        if (container.length === 0) return;

        let html = '';
        Object.values(propertyData).forEach(property => {
            html += generatePropertyCard(property);
        });
        container.html(html);
    }

    // Filter properties
    function filterProperties() {
        const priceMax = parseInt($('#priceRange').val());
        const propertyType = $('#propertyType').val();
        const bedrooms = $('#bedroomsFilter').val();
        const location = $('#locationFilter').val().toLowerCase().trim();

        let visibleCount = 0;

        $('.property-item').each(function() {
            const $item = $(this);
            const itemPrice = parseInt($item.attr('data-price'));
            const itemType = $item.attr('data-type');
            const itemBeds = parseInt($item.attr('data-beds'));
            const itemLocation = $item.attr('data-location');

            let showItem = true;

            // Price filter (0 means "Contact" - always show)
            if (itemPrice > 0 && itemPrice > priceMax) {
                showItem = false;
            }

            // Type filter
            if (propertyType && itemType !== propertyType) {
                showItem = false;
            }

            // Bedrooms filter (only for residential)
            if (bedrooms && itemType === 'residential') {
                const bedsNum = parseInt(bedrooms);
                if (bedsNum === 4) {
                    // 4+ beds
                    if (itemBeds < 4) showItem = false;
                } else {
                    if (itemBeds !== bedsNum) showItem = false;
                }
            }

            // Location filter
            if (location && !itemLocation.includes(location)) {
                showItem = false;
            }

            if (showItem) {
                $item.show();
                visibleCount++;
            } else {
                $item.hide();
            }
        });

        // Show no results message
        if (visibleCount === 0) {
            if ($('.no-properties-message').length === 0) {
                $('#propertiesContainer').append(`
                    <div class="col-12 no-properties-message">
                        <i class="fa fa-home"></i>
                        <h3>No Properties Found</h3>
                        <p>Try adjusting your filters to see more results.</p>
                    </div>
                `);
            }
        } else {
            $('.no-properties-message').remove();
        }
    }

    // Update price display
    function updatePriceDisplay() {
        const value = parseInt($('#priceRange').val());
        const formatted = formatPrice(value);
        $('#priceValue').text(formatted);
    }

    // Clear all filters
    function clearFilters() {
        $('#priceRange').val(5000000);
        $('#propertyType').val('');
        $('#bedroomsFilter').val('');
        $('#locationFilter').val('');
        updatePriceDisplay();
        $('.property-item').show();
        $('.no-properties-message').remove();
    }

    // Initialize on document ready
    $(document).ready(function() {
        // Initialize properties
        initializeProperties();

        // Price range slider
        $('#priceRange').on('input', updatePriceDisplay);

        // Apply filters button
        $('#applyFilters').on('click', function() {
            filterProperties();
        });

        // Clear filters button
        $('#clearFilters').on('click', function() {
            clearFilters();
        });

        // Real-time filtering on Enter key
        $('#locationFilter').on('keypress', function(e) {
            if (e.which === 13) {
                filterProperties();
            }
        });

        // Initialize price display
        updatePriceDisplay();
    });

})(jQuery);
