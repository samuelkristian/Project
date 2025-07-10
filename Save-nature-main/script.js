$(document).ready(function() {

    // Typing effect for headline
    const headlineElement = $('#typing-headline');
    const headlineText = headlineElement.data('text');
    let headlineIndex = 0;
    let typingSpeedHeadline = 75; // Faster for headline

    function typeHeadline() {
        if (headlineIndex < headlineText.length) {
            headlineElement.text(headlineText.substring(0, headlineIndex + 1));
            headlineIndex++;
            setTimeout(typeHeadline, typingSpeedHeadline);
        } else {
            // Once headline is typed, start typing paragraph
            typeParagraph();
        }
    }

    // Typing effect for paragraph
    const paragraphElement = $('#typing-paragraph');
    const paragraphText = paragraphElement.data('text');
    let paragraphIndex = 0;
    let typingSpeedParagraph = 30; // Slower for paragraph

    function typeParagraph() {
        if (paragraphIndex < paragraphText.length) {
            paragraphElement.text(paragraphText.substring(0, paragraphIndex + 1));
            paragraphIndex++;
            setTimeout(typeParagraph, typingSpeedParagraph);
        }
    }

    // Start typing when home section is in view
    // Using Intersection Observer for better performance and flexibility
    const homeSection = document.querySelector('.home');
    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // trigger when 50% of the section is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                typeHeadline(); // Start typing when home section enters viewport
                observer.unobserve(entry.target); // Stop observing once triggered
            }
        });
    }, observerOptions);

    if (homeSection) {
        observer.observe(homeSection);
    }

    // Toggle navbar on menu icon click
    $('#menu').click(function() {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('active');
    });

    // Close navbar when a navbar link is clicked (for smooth scroll)
    $('.navbar a').click(function() {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('active');
    });

    // Smooth scroll to sections
    $('a[href*="#"]').on('click', function(e) {
        if (this.hash !== "") {
            e.preventDefault();
            const hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top - 75 // Adjust for fixed header
            }, 800, function() {
                window.location.hash = hash; // Add hash to URL after scroll
            });
        }
    });

    // Handle scroll events (e.g., for header shadow)
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 80) { // If scrolled past 80px
            $('header').addClass('scrolled'); // Add a class for potential styling
        } else {
            $('header').removeClass('scrolled');
        }
    });

    // Initial check for scroll position on page load
    if ($(window).scrollTop() > 80) {
        $('header').addClass('scrolled');
    }

    // --- Promo Popup Logic ---
    const promoPopup = $('#promo-popup');
    const closeButton = $('.close-button');
    // const doNotShowCheckbox = $('#do-not-show'); // Dihapus karena fungsionalitas dihilangkan
    // const localStorageKey = 'doNotShowPromoPopup'; // Dihapus karena fungsionalitas dihilangkan

    // Function to show the popup
    function showPromoPopup() {
        promoPopup.addClass('active');
    }

    // Function to hide the popup
    function hidePromoPopup() {
        promoPopup.removeClass('active');
    }

    // Pop-up akan selalu muncul saat halaman dimuat (setelah sedikit penundaan)
    setTimeout(showPromoPopup, 500); 

    // Close button event listener
    closeButton.on('click', function() {
        hidePromoPopup();
        // Logika untuk menyimpan preferensi "Jangan tampilkan lagi" telah dihapus
    });

    // Handle closing the popup if the user clicks outside of the content
    $(window).on('click', function(event) {
        if ($(event.target).is(promoPopup)) {
            hidePromoPopup();
            // Logika untuk menyimpan preferensi "Jangan tampilkan lagi" telah dihapus
        }
    });

    // Baris ini dihapus karena fungsionalitas "Jangan tampilkan lagi" telah dihapus
    // localStorage.removeItem(localStorageKey);
});
