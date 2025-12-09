// Favourites Management System
(function($) {
	"use strict";

	// Property data structure
	const propertyData = {
		'property1': {
			id: 'property1',
			title: 'Luxury 4BHK Villa with Garden',
			location: 'Alkapuri, Vadodara, Gujarat',
			price: 'Contact',
			priceUnit: ' for price',
			beds: '4 Beds',
			bathrooms: '4 Bathrooms',
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
			price: 'Contact',
			priceUnit: ' for price',
			beds: '4 Beds',
			bathrooms: '2 Bathrooms',
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
			price: 'Contact',
			priceUnit: ' for price',
			beds: '4 Beds',
			bathrooms: '2 Bathrooms',
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
			price: '₹1,50,000',
			priceUnit: '/month',
			beds: '2500 sq.ft',
			bathrooms: '10 Parking',
			area: '50 Capacity',
			image: 'assets/images/resource/property4.jpg',
			detailPage: 'property.html',
			tag: 'Featured',
			type: 'commercial'
		},
		'property5': {
			id: 'property5',
			title: 'Premium Retail Shop in Mall',
			location: 'Inorbit Mall, Vadodara, Gujarat',
			price: '₹95,000',
			priceUnit: '/month',
			beds: '800 sq.ft',
			bathrooms: 'Retail',
			area: 'Parking',
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
			price: '₹2,50,000',
			priceUnit: '/month',
			beds: '10000 sq.ft',
			bathrooms: 'Warehouse',
			area: 'Loading Bay',
			image: 'assets/images/resource/property6.jpg',
			detailPage: 'property.html',
			tag: 'Featured',
			type: 'commercial'
		}
	};

	// Get favourites from localStorage
	function getFavourites() {
		const favourites = localStorage.getItem('propertyFavourites');
		return favourites ? JSON.parse(favourites) : [];
	}

	// Save favourites to localStorage
	function saveFavourites(favourites) {
		localStorage.setItem('propertyFavourites', JSON.stringify(favourites));
		updateFavouriteCount();
	}

	// Check if property is in favourites
	function isFavourite(propertyId) {
		const favourites = getFavourites();
		return favourites.includes(propertyId);
	}

	// Add property to favourites
	function addToFavourites(propertyId) {
		let favourites = getFavourites();
		if (!favourites.includes(propertyId)) {
			favourites.push(propertyId);
			saveFavourites(favourites);
			return true;
		}
		return false;
	}

	// Remove property from favourites
	function removeFromFavourites(propertyId) {
		let favourites = getFavourites();
		const index = favourites.indexOf(propertyId);
		if (index > -1) {
			favourites.splice(index, 1);
			saveFavourites(favourites);
			return true;
		}
		return false;
	}

	// Toggle favourite status
	function toggleFavourite(propertyId) {
		if (isFavourite(propertyId)) {
			removeFromFavourites(propertyId);
			return false;
		} else {
			addToFavourites(propertyId);
			return true;
		}
	}

	// Update favourite count in header
	function updateFavouriteCount() {
		const favourites = getFavourites();
		const count = favourites.length;
		$('#fav-badge, #fav-badge-header').text(count);
		if (count > 0) {
			$('#fav-badge, #fav-badge-header').css('display', 'flex');
		} else {
			$('#fav-badge, #fav-badge-header').hide();
		}
	}

	// Update heart icon states on page load
	function updateHeartIcons() {
		$('.property-block_one-heart').each(function() {
			const $heart = $(this);
			const propertyId = $heart.data('property-id');
			
			if (!propertyId) return;
			
			// Check if this property is in favourites
			if (isFavourite(propertyId)) {
				// Add active class to show filled heart
				$heart.addClass('active');
				console.log('Property ' + propertyId + ' is favourited - showing filled heart');
			} else {
				// Remove active class to show outline heart
				$heart.removeClass('active');
			}
		});
		
		// Log for debugging
		const favourites = getFavourites();
		if (favourites.length > 0) {
			console.log('Loaded favourites:', favourites);
		}
	}

	// Generate property card HTML
	function generatePropertyCard(property) {
		const tagHTML = property.discount 
			? `<div class="property-block_one-off">${property.discount}</div>`
			: `<div class="property-block_one-title">${property.tag}</div>`;

		return `
			<div class="property-block_one style-three col-lg-4 col-md-6 col-sm-12" data-property-id="${property.id}">
				<div class="property-block_one-inner wow fadeInUp" data-wow-delay="0ms" data-wow-duration="1500ms">
					<div class="property-block_one-image">
						${tagHTML}
						<a href="${property.detailPage}"><img src="${property.image}" alt="" /></a>
					</div>
					<div class="property-block_one-content">
						<div class="property-block_one-location"><i class="flaticon-maps-and-flags"></i>${property.location}</div>
						<h4 class="property-block_one-heading"><a href="${property.detailPage}">${property.title}</a></h4>
						<ul class="property-block_one-info">
							<li><span><img src="assets/images/icons/bed.svg" alt="" /></span>${property.beds}</li>
							<li><span><img src="assets/images/icons/bath.svg" alt="" /></span>${property.bathrooms}</li>
							<li><span><img src="assets/images/icons/square.svg" alt="" /></span>${property.area}</li>
						</ul>
						<div class="d-flex justify-content-between align-items-center flex-wrap">
							<div class="property-block_one-price">${property.price} <span>${property.priceUnit}</span></div>
							<a class="property-block_one-heart active" data-property-id="${property.id}">
								<img src="assets/images/icons/heart.svg" alt="" />
							</a>
						</div>
					</div>
				</div>
			</div>
		`;
	}

	// Load favourites on favourites page
	function loadFavouritesPage() {
		const favourites = getFavourites();
		const container = $('#favourites-container');
		const emptyState = $('#empty-state');

		if (favourites.length === 0) {
			emptyState.show();
		} else {
			emptyState.hide();
			favourites.forEach(function(propertyId) {
				const property = propertyData[propertyId];
				if (property) {
					const cardHTML = generatePropertyCard(property);
					container.append(cardHTML);
				}
			});
		}
	}

	// Handle heart icon clicks
	$(document).on('click', '.property-block_one-heart', function(e) {
		e.preventDefault();
		const $heart = $(this);
		const propertyId = $heart.data('property-id');
		
		if (!propertyId) {
			console.error('Property ID not found');
			return;
		}

		const isNowFavourite = toggleFavourite(propertyId);
		
		// Update all heart icons with same property ID across the entire page
		$(`.property-block_one-heart[data-property-id="${propertyId}"]`).each(function() {
			if (isNowFavourite) {
				$(this).addClass('active');
			} else {
				$(this).removeClass('active');
			}
		});

		// If on favourites page and removing, remove the card
		if (!isNowFavourite && window.location.pathname.includes('favourites.html')) {
			$heart.closest('.property-block_one').fadeOut(400, function() {
				$(this).remove();
				// Check if no more favourites
				if ($('#favourites-container .property-block_one').length === 0) {
					$('#empty-state').fadeIn(400);
				}
			});
		}

		// Show feedback
		if (isNowFavourite) {
			showNotification('Added to favourites!');
			console.log('Added property ' + propertyId + ' to favourites');
		} else {
			showNotification('Removed from favourites!');
			console.log('Removed property ' + propertyId + ' from favourites');
		}
	});

	// Show notification
	function showNotification(message) {
		// Remove existing notification
		$('.fav-notification').remove();
		
		// Create notification
		const $notification = $('<div class="fav-notification">' + message + '</div>');
		$notification.css({
			position: 'fixed',
			top: '100px',
			right: '20px',
			background: 'var(--main-color)',
			color: 'white',
			padding: '15px 25px',
			borderRadius: '5px',
			boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
			zIndex: '99999',
			fontSize: '14px',
			fontWeight: '600',
			opacity: '0',
			transform: 'translateY(-20px)',
			transition: 'all 0.3s ease'
		});
		
		$('body').append($notification);
		
		// Animate in
		setTimeout(function() {
			$notification.css({
				opacity: '1',
				transform: 'translateY(0)'
			});
		}, 10);
		
		// Remove after 2 seconds
		setTimeout(function() {
			$notification.css({
				opacity: '0',
				transform: 'translateY(-20px)'
			});
			setTimeout(function() {
				$notification.remove();
			}, 300);
		}, 2000);
	}

	// Initialize on document ready
	$(document).ready(function() {
		console.log('🏠 Palace Favourites System Initialized');
		
		// Update favourite count
		updateFavouriteCount();
		
		// Update heart icons on property pages
		updateHeartIcons();
		
		// Load favourites if on favourites page
		if (window.location.pathname.includes('favourites.html')) {
			loadFavouritesPage();
		}
		
		// Log current favourites status
		const favourites = getFavourites();
		console.log('📊 Total Favourites:', favourites.length);
		if (favourites.length > 0) {
			console.log('❤️  Favourited Properties:', favourites.join(', '));
		}
	});
	
	// Also run on window load to ensure all elements are ready
	$(window).on('load', function() {
		updateHeartIcons();
		updateFavouriteCount();
		console.log('✅ Heart states synchronized');
	});

})(window.jQuery);
