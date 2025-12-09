/**
 * EMI Calculator - JavaScript
 * Handles EMI calculation and slide-in panel interactions
 */

(function($) {
	'use strict';

	// Format number with Indian comma separator
	function formatIndianNumber(number) {
		const numStr = Math.round(number).toString();
		const lastThree = numStr.substring(numStr.length - 3);
		const otherNumbers = numStr.substring(0, numStr.length - 3);
		if (otherNumbers !== '') {
			return otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ",") + "," + lastThree;
		}
		return lastThree;
	}

	// Calculate EMI
	function calculateEMI(principal, annualRate, years) {
		const monthlyRate = annualRate / (12 * 100);
		const numberOfPayments = years * 12;
		
		if (monthlyRate === 0) {
			return principal / numberOfPayments;
		}
		
		const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments) / 
					(Math.pow(1 + monthlyRate, numberOfPayments) - 1);
		
		return emi;
	}

	// Update display values
	function updateDisplayValues() {
		const propertyPrice = parseFloat($('#propertyPrice').val()) || 0;
		const loanPercentage = parseFloat($('#loanPercentage').val()) || 80;
		const interestRate = parseFloat($('#interestRate').val()) || 8.5;
		const tenure = parseFloat($('#tenure').val()) || 20;

		// Update display texts
		$('#propertyPriceDisplay').text(formatIndianNumber(propertyPrice));
		$('#loanPercentageDisplay').text(loanPercentage);
		$('#interestRateDisplay').text(interestRate);
		$('#tenureDisplay').text(tenure);
	}

	// Calculate and display EMI
	function displayEMI() {
		const propertyPrice = parseFloat($('#propertyPrice').val()) || 0;
		const loanPercentage = parseFloat($('#loanPercentage').val()) || 80;
		const interestRate = parseFloat($('#interestRate').val()) || 8.5;
		const tenure = parseFloat($('#tenure').val()) || 20;

		// Calculate loan amount
		const loanAmount = propertyPrice * (loanPercentage / 100);

		// Calculate EMI
		const emi = calculateEMI(loanAmount, interestRate, tenure);
		const totalAmount = emi * tenure * 12;
		const totalInterest = totalAmount - loanAmount;

		// Display results
		$('#emiAmount').text(formatIndianNumber(emi));
		$('#loanAmount').text(formatIndianNumber(loanAmount));
		$('#totalInterest').text(formatIndianNumber(totalInterest));
		$('#totalAmount').text(formatIndianNumber(totalAmount));

		// Show result section with animation
		$('#emiResult').slideDown(400);
	}

	// Open EMI Calculator Panel
	function openEMICalculator() {
		$('#emiCalculatorPanel').addClass('active');
		$('body').css('overflow', 'hidden');
		updateDisplayValues();
		console.log('📊 EMI Calculator Opened');
	}

	// Close EMI Calculator Panel
	function closeEMICalculator() {
		$('#emiCalculatorPanel').removeClass('active');
		$('body').css('overflow', '');
		console.log('📊 EMI Calculator Closed');
	}

	// Initialize EMI Calculator
	function initEMICalculator() {
		// Open calculator button
		$('#openEmiCalculator').on('click', function(e) {
			e.preventDefault();
			openEMICalculator();
		});

		// Close calculator button
		$('#closeEmiCalculator').on('click', function(e) {
			e.preventDefault();
			closeEMICalculator();
		});

		// Close on overlay click
		$('#emiCalculatorOverlay').on('click', function() {
			closeEMICalculator();
		});

		// Close on ESC key
		$(document).on('keydown', function(e) {
			if (e.key === 'Escape' && $('#emiCalculatorPanel').hasClass('active')) {
				closeEMICalculator();
			}
		});

		// Update displays on slider change
		$('#propertyPrice').on('input', updateDisplayValues);
		$('#loanPercentage').on('input', updateDisplayValues);
		$('#interestRate').on('input', updateDisplayValues);
		$('#tenure').on('input', updateDisplayValues);

		// Calculate EMI button
		$('#calculateEmiBtn').on('click', function(e) {
			e.preventDefault();
			displayEMI();
		});

		// Auto-calculate on any input change (optional)
		$('#propertyPrice, #loanPercentage, #interestRate, #tenure').on('change', function() {
			if ($('#emiResult').is(':visible')) {
				displayEMI();
			}
		});

		// Initial display update
		updateDisplayValues();

		console.log('💰 EMI Calculator Initialized');
	}

	// Initialize on document ready
	$(document).ready(function() {
		initEMICalculator();
	});

	// Re-initialize on window load
	$(window).on('load', function() {
		// Ensure calculator is hidden on load
		$('#emiCalculatorPanel').removeClass('active');
	});

})(jQuery);
