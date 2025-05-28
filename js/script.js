'use strict';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(0, 'ScrollTrigger');

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

// Booking Form Validation
const bookingValidator = {
    validateStep1() {
        try {
            const $checkin = $('#checkin');
            const $checkout = $('#checkout');
            const $guests = $('#guests');
            const $stepError = $('#step-error');
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            if (!checkin.$value) {
                $stepError.text('Please select a check-in date.').show();
                return false;
            }
            if (!checkout$value$) {
                $stepError.text('Please select a check-out date.').show();
                return false;
            }
            if (!guestsChecked) {
                $stepError.text('Please select the number of guests.').show();
                return false;
            }

            const checkinDate = new Date(checkin$value);
            const checkoutDate = new Date(checkoutDate$value);

            if (isNaN(checkinDate.getTime())) {
                $stepError.text('Invalid check-in date format.').show();
                return false;
            }
            if (isNaN(checkoutDate.getTime())) {
                $stepError.text('Invalid check-out date format.').show();
                return false;
            }

            if (checkinDate < today) {
                $stepError.text('Check-in date cannot be in the past.').show();
                return false;
            }

            if (checkoutDate <= checkinDate) {
                $stepError.text('Check-out date must be after check-in date.').show();
                return false;
            }

            if (!this.checkAvailability()) {
                $stepError.text('No rooms available for selected dates.').show();
                return false;
            }

            $stepError.hide();
            return true;
        } catch (e) {
            console.error('Step 1 validation error:', e);
            $('#step-error').text('An unexpected error occurred. Please try again.').show();
            return false;
        }
    }

    validateStep2() {
        const $room = $('#room');
        const $availabilityStatus = $('#availability-status');
        if (!$room.val()) {
            $availabilityStatus.text('Please select a room type.').css('color', '#e63946').show();
            return false;
        }
        $availabilityStatus.hide();
        return true;
    }

    validateStep3() {
        const $name = $('#name').val();
        const $email = $('#email').val();
        const $phone = $('#phone').val();
        const $emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!$name || !$email || !$phone || !$emailRegex.test($email)) {
            $('#form-error').text('Please fill in all required fields with valid information.').show();
            return false;
        }
        $('#form-error').hide();
        return true;
    }

    checkAvailability() {
        try {
            const checkin = new Date($('#checkin').val());
            const checkout = new Date(document.getElementById('checkout').value);
            const $availabilityStatus = $('#availability-status');
            if (checkin && checkout && checkout > checkin) {
                const bookedDates = [
                    { start: new Date('2025-06-01'), end: new Date('2025-06-03') },
                    { start: new Date('2025-06-10'), end: new Date('2025-06-12') }
                ];
                const available = !bookedDates.some(range => 
                    return (
                        (checkin >= range.start && checkin <= range.end) ||
                        (checkout >= range.start && checkout <= range.end) ||
                        (checkin <= range.start && checkout >= range.end)
                    );
                });
                $availabilityStatus.text(available ? 'Available!' : 'No rooms available, please try different dates.').css('color', available ? 'var(--aqua-blue)' : '#e63946').show();
                return available;
            } else {
                $availabilityStatus.text('Please select valid dates.').css('color', '#e63946').show();
                return false;
            }
        } catch (e) {
            console.error('Availability check error:', e);
            return false;
        }
    }
};

// Main App
const AmbururuApp = {
    init() {
        console.log('Initializing Ambururu Waterfalls App. jQuery:', $.fn.jquery);
        this.setupCarousels();
        this.setupMobileMenu();
        this.setupSmoothScrolling();
        this.setupBackToTop();
        this.setupBookingForm();
        this.setupNewsletterForm();
        this.setupTooltips();
        this.setupGallery();
        this.setupAboutPage();
        this.setupActivitiesPage();
        this.setupStickyCTA();
        this.setupPagination();
        this.setupHeaderScroll();
        this.setupGSAPAnimations();
        this.setupIntersectionObserver();
        this.setupVirtualTours();
        this.setupQuickView();
        this.setupFormPersistence();
    },

    setupCarousels() {
        try {
            $('.hero-carousel, .hero-section .hero-carousel').slick({
                dots: true,
                infinite: true,
                speed: 800,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 5000,
                fade: true,
                cssEase: 'linear',
                arrows: true,
                lazyLoad: 'ondemand',
                prevArrow: '<button class="carousel-prev" aria-label="Previous slide">←</button>',
                nextArrow: '<button class="carousel-next" aria-label="Next slide">→</button>'
            });

            $('.testimonials-slider, .testimonial-slider').slick({
                dots: true,
                infinite: true,
                speed: 500,
                slidesToShow: 1,
                slidesToScroll: 1,
                autoplay: true,
                autoplaySpeed: 7000,
                adaptiveHeight: true,
                arrows: true,
                prevArrow: '<button class="slider-prev" aria-label="Previous testimonial">←</button>',
                nextArrow: '<button class="slider-next" aria-label="Next testimonial">→</button>'
            });

            if ($('.swiper-container').length) {
                new Swiper('.swiper-container', {
                    slidesPerView: 1,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev'
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    },
                    breakpoints: {
                        640: {
                            slidesPerView: 2,
                            spaceBetween: 30
                        }
                    }
                });
            }
        } catch (e) {
            console.error('Carousel setup error:', e);
        }
    },

    setupMobileMenu() {
        $('.menu-toggle').on('click', function() {
            const $nav = $('#main-nav');
            const isExpanded = $(this).attr('aria-expanded') === 'true';
            $nav.toggleClass('active');
            $(this).attr('aria-expanded', !isExpanded);
            new Audio('https://freesound.org/data/previews/170/170621_2885980-lq.mp3').play().catch(() => {});
        });

        $('#main-nav ul li a').on('click', function() {
            $('#main-nav').removeClass('active');
            $('.menu-toggle').attr('aria-expanded', 'false');
        });

        $('.dropdown > a').on('click', function(e) {
            if ($(window).width() <= 768) {
                e.preventDefault();
                $(this).siblings('.dropdown-menu').slideToggle();
            }
        });
    },

    setupSmoothScrolling() {
        $('a[href^="#"]').on('click', function(e) {
            e.preventDefault();
            const target = $(this.hash);
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 70
                }, 600);
            }
        });
    },

    setupBackToTop() {
        $(window).on('scroll', debounce(function() {
            $('#back-to-top').toggle($(this).scrollTop() > 100);
        }, 100));

        $('#back-to-top').on('click', function(e) {
            e.preventDefault();
            gsap.to(window, { scrollTo: 0, duration: 0.6, ease: 'power2.out' });
        });
    },

    setupBookingForm() {
        if (!$('#booking-form-element').length) return;

        const $form = $('#booking-form-element');
        const $checkin = $('#checkin');
        const $checkout = $('#checkout');
        const $room = $('#room');
        const $guests = $('#guests');
        const $totalCost = $('#total-cost');

        // Calendar
        try {
            const calendar = new FullCalendar.Calendar(document.getElementById('availability-calendar'), {
                initialView: 'dayGridMonth',
                selectable: true,
                select: function(arg) {
                    console.log('Calendar select:', arg.startStr, arg.endStr);
                    $checkin.val(arg.startStr);
                    const endDate = new Date(arg.endStr);
                    endDate.setDate(endDate.getDate() - 1);
                    $checkout.val(endDate.toISOString().split('T')[0]);
                    bookingValidator.checkAvailability();
                    AmbururuApp.calculateTotal();
                    AmbururuApp.suggestRoom();
                    AmbururuApp.updateSummary();
                    AmbururuApp.saveFormState();
                },
                events: [
                    { title: 'Booked', start: '2025-06-01', end: '2025-06-03', color: '#e63946' },
                    { title: 'Booked', start: '2025-06-10', end: '2025-06-12', color: '#e63946' }
                ]
            });
            calendar.render();
        } catch (e) {
            console.error('FullCalendar error:', e);
        }

        // Step Navigation
        $(document).on('click', '.next-step', function(e) {
            e.preventDefault();
            const $button = $(this);
            const nextStep = $button.data('next');
            const currentStep = $button.closest('.form-step').data('step');
            console.log('Next button clicked. Current:', currentStep, 'Next:', nextStep);

            let isValid = true;
            $('#step-error, #form-error, #availability-status').hide();

            if (currentStep === 1) {
                isValid = bookingValidator.validateStep1();
            } else if (currentStep === 2) {
                isValid = bookingValidator.validateStep2();
            } else if (currentStep === 3) {
                isValid = bookingValidator.validateStep3();
            }

            if (isValid) {
                $button.prop('disabled', true).text('Loading...');
                $('.form-step').removeClass('active');
                $(`.form-step[data-step="${nextStep}"]`).addClass('active').attr('aria-hidden', false);
                $('.form-step').not(`[data-step="${nextStep}"]`).attr('aria-hidden', true);
                $('.progress-step').removeClass('active');
                $(`.progress-step[data-step="${nextStep}"]`).addClass('active');
                $(`.progress-step[data-step="${currentStep}"] .step-check`).addClass('visible');
                gsap.from(`.form-step[data-step="${nextStep}"]`, { opacity: 0, x: 50, duration: 0.5 });
                gsap.to('.progress-bar', { '--progress': `${nextStep * 25}%`, duration: 0.5 });
                setTimeout(() => $button.prop('disabled', false).text('Next'), 500);
                new Audio('https://freesound.org/data/previews/170/170621_2885980-lq.mp3').play().catch(() => {});
                AmbururuApp.saveFormState();
            } else {
                gsap.to($button, { x: -10, duration: 0.1, repeat: 3, yoyo: true });
                console.log('Validation failed for step', currentStep);
            }
        });

        $(document).on('click', '.prev-step', function(e) {
            e.preventDefault();
            const prevStep = $(this).data('prev');
            $('.form-step').removeClass('active');
            $(`.form-step[data-step="${prevStep}"]`).addClass('active').attr('aria-hidden', false);
            $('.form-step').not(`[data-step="${prevStep}"]`).attr('aria-hidden', true);
            $('.progress-step').removeClass('active');
            $(`.progress-step[data-step="${prevStep}"]`).addClass('active');
            $(`.progress-step[data-step="${prevStep + 1}"] .step-check`).removeClass('visible');
            gsap.from(`.form-step[data-step="${prevStep}"]`, { opacity: 0, x: -50, duration: 0.5 });
            gsap.to('.progress-bar', { '--progress': `${prevStep * 25}%`, duration: 0.5 });
        });

        // Total Cost
        this.calculateTotal = debounce(function() {
            try {
                const checkinDate = new Date($checkin.val());
                const checkoutDate = new Date($checkout.val());
                const roomType = $room.val();
                const rates = { standard: 100, deluxe: 150, suite: 200 };
                const today = new Date();
                today.setHours(0, 0, 0, 0);

                if (checkinDate < today) {
                    $totalCost.text('Check-in date cannot be in the past.').css('color', '#e63946');
                    return 0;
                }
                if (checkoutDate <= checkinDate) {
                    $totalCost.text('Check-out must be after check-in.').css('color', '#e63946');
                    return 0;
                }

                if (checkinDate && checkoutDate && roomType) {
                    const nights = Math.round((checkoutDate - checkinDate) / (1000 * 60 * 60 * 24));
                    if (nights > 0) {
                        let total = nights * rates[roomType];
                        const discount = parseFloat($('#discount-result').data('discount') || 0);
                        if (discount) total *= (1 - discount / 100);
                        $totalCost.text(`Estimated Total: $${total.toFixed(2)} ${discount ? `(includes ${discount}% discount)` : ''}`).css('color', 'var(--coral)');
                        AmbururuApp.updateSummary();
                        return total;
                    }
                }
                $totalCost.text('');
                return 0;
            } catch (e) {
                console.error('Calculate total error:', e);
                $totalCost.text('Error calculating total.').css('color', '#e63946');
                return 0;
            }
        }, 300);

        // AI Suggestion
        this.suggestRoom = function() {
            try {
                const guests = parseInt($guests.val()) || 0;
                const checkin = new Date($checkin.val());
                const checkout = new Date($checkout.val());
                const nights = checkin && checkout ? Math.round((checkout - checkin) / (1000 * 60 * 60 * 24)) : 0;
                let suggestion = '';
                if (guests >= 3 || nights > 5) {
                    suggestion = `Perfect for ${guests} guests and ${nights} nights: Our Suite offers spacious luxury!`;
                } else if (guests === 2) {
                    suggestion = `Ideal for couples: The Deluxe Room is cozy and romantic for ${nights} nights!`;
                } else if (guests === 1) {
                    suggestion = `Solo traveler? The Standard Room is just right for your ${nights}-night stay!`;
                } else {
                    suggestion = 'Select guests to get a personalized room suggestion!';
                }
                $('#ai-suggestion').text(suggestion).css('color', 'var(--aqua-blue)');
                gsap.from('#ai-suggestion', { opacity: 0, y: 10, duration: 0.3 });
            } catch (e) {
                console.error('Room suggestion error:', e);
            }
        };

        // Summary
        this.updateSummary = function() {
            $('#summary-checkin').text($checkin.val() || '-');
            $('#summary-checkout').text($checkout.val() || '-');
            $('#summary-guests').text($guests.val() || '-');
            $('#summary-room').text($room.find('option:selected').text() || '-');
            $('#summary-total').text($totalCost.text() || '-');
        };

        // Form Events
        $checkin.on('change', () => {
            bookingValidator.checkAvailability();
            this.calculateTotal();
            this.suggestRoom();
            this.updateSummary();
            this.saveFormState();
        });
        $checkout.on('change', () => {
            bookingValidator.checkAvailability();
            this.calculateTotal();
            this.suggestRoom();
            this.updateSummary();
            this.saveFormState();
        });
        $room.on('change', () => {
            this.calculateTotal();
            this.updateSummary();
            this.saveFormState();
        });
        $guests.on('change', () => {
            this.calculateTotal();
            this.suggestRoom();
            this.updateSummary();
            this.saveFormState();
        });

        // Payment Method
        $('#payment-method').on('change', function() {
            $('.payment-details').hide();
            if (this.value === 'mpesa') $('#mpesa-details').fadeIn(300);
            else if (this.value === 'paypal') $('#paypal-button-container').fadeIn(300);
            else if (this.value === 'on-arrival') $('#on-arrival-details').fadeIn(300);
        });

        // PayPal
        try {
            paypal.Buttons({
                createOrder: (data, actions) => {
                    const total = this.calculateTotal();
                    if (!total || !bookingValidator.checkAvailability()) {
                        $('#form-error').text('Please complete the form and ensure rooms are available.').show();
                        return;
                    }
                    return actions.order.create({
                        purchase_units: [{ amount: { value: total.toFixed(2) } }]
                    });
                },
                onApprove: (data, actions) => {
                    $('#loading-modal').show();
                    return actions.order.capture().then(details => {
                        $('#loading-modal').hide();
                        $('#confirmation-modal').show();
                        const confetti = new JSConfetti();
                        confetti.addConfetti({ emojis: ['🎉', '🏞️', '🌊'] });
                        $form[0].reset();
                        $totalCost.text('');
                        $('.payment-details').hide();
                        $('.form-step').removeClass('active');
                        $('.progress-step').removeClass('active');
                        $('.step-check').removeClass('visible');
                        $('.form-step[data-step="1"]').addClass('active').attr('aria-hidden', false);
                        $('.progress-step[data-step="1"]').addClass('active');
                        gsap.to('.progress-bar', { '--progress': '25%', duration: 0.5 });
                        this.updateSummary();
                        new Audio('https://freesound.org/data/previews/511/511484_6890478-lq.mp3').play().catch(() => {});
                    });
                },
                onError: err => {
                    $('#loading-modal').hide();
                    $('#form-error').text('PayPal payment failed. Please try again.').show();
                    console.error('PayPal error:', err);
                }
            }).render('#paypal-button-container');
        } catch (e) {
            console.error('PayPal setup error:', e);
        }

        // Form Submission
        $form.on('submit', function(e) {
            e.preventDefault();
            const paymentMethod = $('#payment-method').val();
            const mpesaTransactionId = $('#mpesa-transaction-id').val();

            if (!bookingValidator.checkAvailability()) {
                $('#form-error').text('No rooms available for selected dates.').show();
                return;
            }
            if (paymentMethod === 'mpesa' && !mpesaTransactionId) {
                $('#form-error').text('Please enter a valid M-Pesa transaction ID.').show();
                return;
            }

            $('#loading-modal').show();
            $.ajax({
                url: this.action,
                method: this.method,
                data: $(this).serialize(),
                success: () => {
                    $('#loading-modal').hide();
                    $('#form-success').show();
                    const confetti = new JSConfetti();
                    confetti.addConfetti({ emojis: ['🎉', '🏞️', '🌊'] });
                    $form[0].reset();
                    $totalCost.text('');
                    $('.payment-details').hide();
                    $('.form-step').removeClass('active');
                    $('.progress-step').removeClass('active');
                    $('.step-check').removeClass('visible');
                    $('.form-step[data-step="1"]').addClass('active').attr('aria-hidden', false);
                    $('.progress-step[data-step="1"]').addClass('active');
                    gsap.to('.progress-bar', { '--progress': '25%', duration: 0.5 });
                    gsap.fromTo("#form-success", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 });
                    setTimeout(() => $('#form-success').fadeOut(), 5000);
                    this.updateSummary();
                    localStorage.removeItem('bookingForm');
                    new Audio('https://freesound.org/data/previews/511/511484_6890478-lq.mp3').play().catch(() => {});
                },
                error: (xhr, status, error) => {
                    $('#loading-modal').hide();
                    $('#form-error').text('An error occurred. Please try again.').show();
                    console.error('Form submission error:', status, error);
                }
            });
        });

        // 360° Viewer
        $('.view-360').on('click', function() {
            const panorama = $(this).data('panorama');
            $('#360-modal').fadeIn(300);
            pannellum.viewer('pannellum-viewer', {
                type: 'equirectangular',
                panorama: panorama,
                autoLoad: true,
                autoRotate: -2,
                hotSpots: [
                    { pitch: 10, yaw: 180, type: 'info', text: 'King-Size Bed' },
                    { pitch: -10, yaw: 90, type: 'info', text: 'Scenic Balcony' },
                    { pitch: 0, yaw: 0, type: 'info', text: 'Luxury Bath' }
                ]
            });
        });

        // AR Preview
        $('.view-ar').on('click', function() {
            alert('AR Preview is not fully supported. Please view the 360° tour or contact us for a demo.');
        });

        // Discount Wheel
        try {
            const wheelCanvas = document.getElementById('wheel-rate');
            const ctx = wheelCanvas.getContext('2d');
            const items = [
                { value: 0, label: 'Try Again', color: '#e63946' },
                { value: 5, label: '5% Off', color: '#4dd0e1' },
                { value: 10, label: '10% Off', color: '#ff6347' },
                { value: 15, label: '15% Off', color: '#ffd700' }
            ];

            function drawWheel() {
                const arcSize = (Math.PI * 2) / items.length;
                ctx.clearRect(0, 0, wheelCanvas.width, wheelCanvas.height);
                items.forEach((item, index) => {
                    ctx.beginPath();
                    ctx.fillStyle = item.color;
                    ctx.moveTo(100, 100');
                    ctx.arc(100, 100, 100, index * arcSize, (index + 1) * arcSize);
                    ctx.fill();
                    ctx.save();
                    ctx.translate(100, 100);
                    ctx.rotate(index * arcSize + arcSize / 2));
                    ctx.fillStyle = '#fff';
                    ctx.font = '16px Roboto';
                    ctx.fillText(item.label, 50, 10);
                    ctx.restore();
                });
            }
            drawWheel();

            $('#spin-wheel').on('click', function() {
                const spins = 5 + Math.random() * 5);
                totalAngle = spins * 360 + Math.random() * 360;
                gsap.to(wheelCanvas, {
                    rotation: finalAngle,
                    duration: 3.5,
                    ease: 'power2.out',
                    onComplete: () => {
                        const index = Math.floor((finalAngle % 360) / (360 / items.length));
                        const discount = items[index].value;
                        $('#discount-result').text(discount ? `You won ${discount}% off!` : 'Try again!').data('discount', discount);
                        gsap.from('#discount-result', { opacity: 0, y: 20, duration: 0.3 });
                        AmbururuApp.calculateTotal();
                        new Audio('https://freesound.org/data/freeview/120/120375_1670642-lq.mp3').play().catch(() => {});
                    }
                );
            });
        } catch (e) {
            console.error('Discount wheel error:', e);
        }

        // Form Persistence
        this.saveFormState = function() {
            try {
                const data = {
                    checkin: $checkin.val(),
                    checkout: $checkout.val(),
                    guests: $guests.val(),
                    room: $room.val()
                };
                localStorage.setItem('bookingFormState', JSON.stringify(data));
            } catch (e) {
                console.error('Form persistence error:', e);
            }
        };

        this.loadFormState = function() {
            try {
                const data = JSON.parse(localStorage.getItem('bookingFormState'));
                if (data) {
                    $checkin.val(data.checkin);
                    $checkout.val(data.checkout);
                    $guests.val(data.guests);
                    $room.val(data.room);
                    bookingValidator.checkAvailability();
                    this.calculateTotal();
                    this.suggestRoom();
                    this.updateSummary();
                }
            } catch (e) {
                console.error('Form load error:', e);
            }
        };
        this.loadFormState();
    },

    setupNewsletterForm() {
        $('#newsletter-form').on('submit', function(e) {
            e.preventDefault();
            const email = $(this).find('input[type="email"]').val();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email || !emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                return;
            }
            $(this).hide();
            $('.form-success').show();
            new Audio('https://freesound.org/data/previews/511/511484_6890476-lq.mp3').play().catch(() => {});
        });
    },

    setupTooltips() {
        $(document).on('click', '.more-info', function() {
            const $tooltip = $(this).siblings('.tooltip');
            const isVisible = $tooltip.hasClass('active');
            $('.tooltip').removeClass('active').hide();
            if (!isVisible) {
                $tooltip.show().addClass('active');
                gsap.fromTo($tooltipBody, 
                    { opacity: 0, y: 20 }, 
                    { opacity: 1, y: 0, duration: 0.3 }
                );
            }
        });

        $(document).on('click', '.tooltip-btn', function() {
            const $tooltip = $(this).parent().find('.tooltip-content');
            gsap.to($tooltipBody, {
                opacity: 0,
                y: 20,
                duration: 0.3,
                onComplete: () => {
                    $tooltip.removeClass('active').hide();
                }
            });
        });

        $(document).on('click', function(e) {
            if (!$(e.target).closest('.feature, .more-info').length) {
                $('.tooltip-content.active').each(function() {
                    const $tooltip = $(this);
                    gsap.to($tooltip, {
                        opacity: 0,
                        y: 20,
                        duration: 0.3,
                        onComplete: () => {
                            $tooltip.removeClass('active').hide();
                        }
                        });
                    });
                }
            });
    },

    setupGallery() {
        $('.gallery-tabs .tab-btn').click(function() {
            $('.gallery-tabs .tab-btn').on('click', function() {
                $('.gallery-tabs .tab-btn').removeClass('active');
                $(this).addClass('active');
                const filter = $(this).data('filter');
                if (filter === 'all') {
                    $('.gallery-content a').fadeIn(400);
                } else {
                    $('.gallery-content a').fadeOut(400);
                    $(`.gallery-content a[data-item="${filter}"]`).fadeIn(400);
                }
            });

            Fancybox.bind('[data-fancybox="gallery"]', {
                thumbs: { autoStart: true },
                toolbar: {
                    display: [
                        'prev', 'counter', 'next', 'zoom', 'slideshow', 
                        'fullscreen', 'download', 'thumbs', 'close'
                    ]
                },
                touch: true,
                captions: {
                    type: 'data',
                    source: 'caption'
                }
            });
        });
    },

    setupAboutPage() {
        $('.about .readmore-link').on('click', function() {
            $(this).siblings('.owner-details').toggleClass('active');
        });

        if ($('.attraction-slide').length) {
            let currentSlide = 0;
            const $slides = $('.attraction-slide');
            const totalSlides = $slides.length;

            function showSlide(index) {
                $slides.removeClass('active').eq(index).addClass('active');
            }

            $('.carousel-next').on('click', function() {
                currentSlide = (currentSlide + 1) % totalSlides;
                showSlide(currentSlide);
                });

            $('.carousel-prev').on('click', function() {
                currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
                showSlide(currentSlide);
            });

            setInterval(() => {
                currentSlide = (currentSlide + 1) % totalSlides;
                showSlide(totalSlide);
            }, 5000);

            showSlide(currentSlide);
        }
    },

    setupActivitiesPage() {
        $('.activity-tabs li').on('click', function() {
            $('.activity-tabs li').removeClass('active');
            $(this).addClass('active');
            const filter = $(this).data('tab');
            if (filter === 'all') {
                $('.activity-card').fadeIn(400);
            } else {
                $('.activity-card').fadeOut(400);
                $(`.activity-card[data-tab="${filter}"]').fadeIn(400);
                });
            }
        });
    },

    setupStickyCTA() {
        if ($('.fixedCTA').length) {
            $(window).on('scroll', debounce(function() {
                $('.fixedCTA').toggleClass('showCTA', $(this).scrollTop() > 600);
            }, 100));
        }
    },

    setupPagination() {
        if ($('.pagination').length) {
            $('.pagination').hide();
        }
    },

    setupHeaderScroll() {
        $(window).on('scroll', debounce(function() {
            $('.sticky-header').toggleClass('scrolled', $(this)).scrollTop() > 50);
        }, 10));
    },

    setupGSAPAnimations() {
        const animateFrom = (selector, options) => {
            gsap.from(selector, {
                scrollTrigger: {
                    trigger: selector,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                    ...options.scrollTrigger
                },
                opacity: 0,
                ...options
            });
        });

        // Header
        if ($('.header-container').length) {
            gsap.from('.header-container .logo', { x: -50, duration: 1.5, ease: 'power2.out' });
            gsap.from('.header-container .site-title').hasClass('site-title'), { x: 50, duration: 1.5, delay: 0.2, ease: 'power2.out' });
            gsap.from('nav.navbar-nav li').hasClass('nav-item'), { y: 20, duration: 0.8, stagger: 0.1, delay: 0,4, ease: .4 'power2.out' });
        }

        // Hero
        if ($('.hero.parallax').length) {
            gsap.from('.hero-overlay .hero-title', { scale: 0.8, duration: 1,2, ease: 'back.out(1.7)' });
            gsap.from('.hero-overlay .hero-subtitle', { y: 100, duration: 1,2, delay: 0.3, ease: 'power2.out' });
            gsap.from('.hero-overlay .cta-button', { scale: 0.5, duration: 0.8, delay: 0.6, ease: 'elastic.out(1, 0.5)' });
            if ($('.hero-content').length) {
                gsap.to('.hero-content', {
                    yPercent: -20,
                    ease: 'power2.out',
                    scrollTrigger: { trigger: '.hero.parallax', start: 'top top', end: 'bottom top', scrub: true }
                });
            }
        }

        // Buttons
        gsap.utils.toArray('.btn, .cta-button').forEach(btn => {
            btn.addEventListener('mouseenter', () => gsap.to(btn, { scale: 1.1, duration: 0.3, ease: 'power1.out' }));
            btn.addEventListener('mouseleave', () => gsap.to(btn, { scale: 1, duration: 0.3, ease: 'power1.out' }));
        });

        // About Page
        if ($('.history').length) {
            animateFrom('.history h2', { y: 25, duration: 1, ease: 'power2.out' });
            gsap.utils.toArray('.timeline-item').forEach((item, i) => {
                animateFrom(item, { y: 50, duration: 1, delay: i * 0.2, ease: 'back.out(1.7)' });
            });
        }

        if ($('.owner').length) {
            animateFrom('.owner h2', { y: 25, duration: 1, ease: 'power2.out' });
            animateFrom('.owner-image', { x: -100, duration: 1, delay: 0.2, ease: 'power2.out' });
            animateFrom('.owner-text', { x: 100, duration: 1, delay: 0.4, ease: 'power2.out' });
        }

        if ($('.community-impact').length) {
            animateFrom('.community-impact h2', { y: 25, duration: 1, ease: 'power2.out' });
            gsap.utils.toArray('.impact-card').forEach((card, i) => {
                animateFrom(card, { y: 50, duration: 1, delay: i * 0.2, ease: 'back.out(1.7)' });
            });
        }

        if ($('.attractions').length) {
            animateFrom('.attractions h2', { y: 25, duration: 1, ease: 'power2.out' });
            animateFrom('.attractions-carousel', { y: 50, duration: 1, delay: 0.2, ease: 'power2.out' });
            animateFrom('.carousel-controls', { y: 25, duration: 1, delay: 0.4, ease: 'power2.out' });
        }

        if ($('.map').length) {
            animateFrom('.map h2', { y: 25, duration: 1, ease: 'power2.out' });
            animateFrom('.map-container', { y: 50, duration: 1, delay: 0.2, ease: 'power2.out' });
            animateFrom('.map p', { y: 25, duration: 1, delay: 0.4, ease: 'power2.out' });
        }

        // Activities Page
        if ($('.video-section').length) {
            animateFrom('.video-section h2', { y: 25, duration: 1, ease: 'power2.out' });
            animateFrom('.video-container', { y: 50, duration: 1, delay: 0.2, ease: 'power2.out' });
            animateFrom('.video-section p', { y: 25, duration: 1, delay: 0.4, ease: 'power2.out' });
        }

        if ($('.activities').length) {
            animateFrom('.activity-filters', { y: 25, duration: 1, ease: 'power2.out' });
            gsap.utils.toArray('.activity-card').forEach((card, i) => {
                animateFrom(card, { y: 50, duration: 1, delay: i * 0.2, ease: 'back.out(1.7)' });
            });
        }

        if ($('.testimonials').length) {
            animateFrom('.testimonials h2', { y: 25, duration: 1, ease: 'power2.out' });
            animateFrom('.testimonial-slider', { y: 50, duration: 1, delay: 0.2, ease: 'power2.out' });
            animateFrom('.slider-controls', { y: 25, duration: 1, delay: 0.4, ease: 'power2.out' });
        }

        if ($('.book-activity').length) {
            animateFrom('#activity-booking-form', { y: 50, duration: 1, ease: 'power2.out' });
        }

        if ($('.share-moments').length) {
            animateFrom('.share-moments h2', { y: 25, duration: 1, ease: 'power2.out' });
            animateFrom('.share-moments p', { y: 25, duration: 1, delay: 0.2, ease: 'power2.out' });
            animateFrom('.share-links a', { y: 20, duration: 0.8, delay: 0.4, stagger: 0.2, ease: 'power2.out' });
        }

        if ($('.gallery-teaser').length) {
            animateFrom('.gallery-teaser h2', { y: 25, duration: 1, ease: 'power2.out' });
            animateFrom('.gallery-teaser p', { y: 25, duration: 1, delay: 0.2, ease: 'power2.out' });
            animateFrom('.gallery-teaser .cta-button', { scale: 0.5, duration: 0.8, delay: 0.4, ease: 'elastic.out(1, 0.5)' });
        }

        // Dining Page
        if ($('.menu-section').length) {
            gsap.utils.toArray('.menu-item').forEach((item, i) => {
                animateFrom(item, { x: i % 2 === 0 ? -100 : 100, duration: 1, ease: 'power2.out' });
            });
        }

        if ($('.chef-special').length) {
            animateFrom('.special-image', { x: -100, duration: 1.2, ease: 'power2.out' });
            animateFrom('.special-text', { x: 100, duration: 1.2, delay: 0.3, ease: 'power2.out' });
        }

        if ($('.book-table').length) {
            animateFrom('#booking-form', { y: 50, duration: 1, ease: 'power2.out' });
        }

        // Gallery
        if ($('.gallery').length) {
            animateFrom('.gallery-filters', { y: 25, duration: 1, ease: 'power2.out' });
            gsap.utils.toArray('.gallery-item').forEach((item, i) => {
                animateFrom(item, { y: 50, duration: 1, delay: i * 0.2, ease: 'power2.out' });
            });
        }

        // Footer
        footer {
            animateFrom('.footer .social-links a', { y: 20, duration: 0.8, stagger: 0.2, ease: 'power2.out' });
            animateFrom('.newsletter .form', { y: 20, duration: 0.8, delay: 0.4, ease: 'power2.out' });
        }

        // Hero Section
        if ($('.hero-section').length) {
            gsap.from('.hero-overlay h2', {
                opacity: 0,
                y: 60,
                duration: 1.2,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.hero-section', start: 'top 80%' }
            });
            gsap.from('.hero-overlay p', {
                opacity: 0,
                y: 60,
                duration: 1.2,
                delay: 0.3,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.hero-section', start: 'top 80%' }
            });
            gsap.from('.hero-overlay .cta-button', {
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                delay: 0.6,
                ease: 'elastic.out(1, 0.5)',
                scrollTrigger: { trigger: '.hero-section', start: 'top 80%' }
            });
        }

        if ($('.room-card').length) {
            gsap.from('.room-card', {
                opacity: 0,
                y: 60,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.resort-rooms', start: 'top 80%' }
            });
        }

        if ($('.hotel-card').length) {
            gsap.from('.hotel-card', {
                opacity: 0,
                y: 60,
                duration: 1.2,
                stagger: 0.2,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.nearby-hotels', start: 'top 80%' }
            });
        }

        if ($('.booking-form').length) {
            gsap.from('.booking-form', {
                opacity: .0,
                y: 60,
                duration: 1,
                ease: .2,
                'power2.out',
                scrollTrigger: {
                    trigger: '.booking-form',
                    start: 'top 80%'
                }
            });
        }

        // Features Heading
        if ($('#features-heading').length) {
            const headingText = $('#features-heading').text();
            $('#features-heading').html(headingText.split('').map(char => `<span>${char}</span>`).join(''));
            gsap.from('.letter span', {
                opacity: 0,
                y: 20,
                duration: 0.5,
                stagger: 0.05,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.features-header', start: 'top 80%' }
            });
            gsap.from('#features-subtitle', {
                opacity: 0,
                y: 30,
                duration: 0.8,
                delay: 0.5,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.features-header', start: 'top 80%' }
            });
            gsap.from('.header-decor', {
                opacity: 0,
                scale: 0.5,
                duration: 0.8,
                delay: 0.7,
                ease: 'elastic.out',
                scrollTrigger: { trigger: '.features-header', start: 'top 80%' }
            });
        }

        // Video Hero
        if ($('.video-hero').length) {
            gsap.from('.video-title', {
                opacity: 0,
                y: 30,
                duration: 1,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.video-hero', start: 'top 80%' }
            });
            gsap.from('.video-container', {
                opacity: 0,
                scale: 0.9,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.video-hero', start: 'top 80%' }
            });
            gsap.from('.video-cta', {
                opacity: 0,
                y: 20,
                duration: 0.8,
                delay: 0.3,
                ease: 'power2.out',
                scrollTrigger: { trigger: '.video-hero', start: 'top 80%' }
            });
        }
    },

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.feature, .testimonial').forEach(el => observer.observe(el));
    },

    setupVirtualTours() {
        $('.virtual-tour').on('click', function(e) {
            e.preventDefault();
            const room = $(this).data('room');
            const details = {
                standard: {
                    title: 'Standard Room Virtual Tour',
                    image: 'images/15.jpg',
                    description: 'Explore the cozy elegance of our Standard Room, designed for solo travelers or couples.'
                },
                deluxe: {
                    title: 'Deluxe Suite Virtual Tour',
                    image: 'images/14.jpg',
                    description: 'Discover the spacious luxury of our Deluxe Suite, perfect for families or groups.'
                }
            };
            const modal = $(`
                <div class="modal">
                    <div class="modal-content">
                        <span class="modal-close" aria-label="Close modal">×</span>
                        <h4>${details[room].title}</h4>
                        <img src="${details[room].image}" alt="${details[room].title}">
                        <p>${details[room].description}</p>
                        <a href="contact.html#booking-form" class="cta-button">Book Now</a>
                    </div>
                </div>
            `);
            $('body').append(modal);
            modal.fadeIn(300);
            gsap.from('.modal-content', { opacity: 0, scale: 0.8, duration: 0.5, ease: 'power2.out' });
            $('.modal-close').on('click', () => {
                modal.fadeOut(300, () => modal.remove());
            });
        });
    },

    setupQuickView() {
        $('.quick-view').on('click', function() {
            const overlay = $(this).closest('.room-overlay');
            overlay.css('opacity', overlay.css('opacity') == 1 ? 0 : 1);
        });
    }
};

// Google Maps
window.initMap = function() {
    try {
        if (document.getElementById('map')) {
            const ambururu = { lat: 0.199973, lng: 34.741566 };
            const map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: ambururu,
                styles: [
                    { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#a2daf2' }] },
                    { featureType: 'landscape', elementType: 'geometry', stylers: [{ color: '#d8f0e3' }] }
                ]
            });
            new google.maps.Marker({
                position: ambururu,
                map,
                title: 'Ambururu Waterfalls',
                icon: { url: 'images/map-marker.png', scaledSize: new google.maps.Size(40, 40) }
            });
        }
    } catch (e) {
        console.error('Google Maps error:', e);
    }
};

// Initialize
$(document).ready(() => {
    AmbururuApp.init();
});