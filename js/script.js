$(document).ready(() => {
    // Hero Carousel
    $('.hero-carousel').slick({
        dots: true,
        infinite: true,
        speed: 800,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000,
        fade: true,
        arrows: true
    });

    // Gallery Carousel
    $('.gallery-carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }]
    });

    // Room Carousel
    $('.room-carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }]
    });

    // Testimonials Carousel
    $('.testimonials-slider').slick({
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000
    });

    // GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    gsap.from('.hero-text', {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power2.out'
    });

    gsap.utils.toArray('.feature').forEach(feature => {
        gsap.from(feature, {
            opacity: 0,
            y: 50,
            duration: 1,
            scrollTrigger: {
                trigger: feature,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    gsap.utils.toArray('.content-image').forEach(image => {
        gsap.from(image, {
            opacity: 0,
            x: -50,
            duration: 1,
            scrollTrigger: {
                trigger: image,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        });
    });

    // Smooth Scrolling
    $('a[href*="#"]').click(function(e) {
        e.preventDefault();
        const target = $(this.hash);
        $('html, body').animate({ scrollTop: target.offset().top }, 800);
    });

    // Search Bar (Placeholder)
    $('.search-bar button').click(function(e) {
        e.preventDefault();
        alert('Search functionality coming soon!');
    });
});