document.addEventListener('DOMContentLoaded', () => {

    const form = document.getElementById('contactForm');
    // Ensure all elements are selected within the load event
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    // --- 1. Active Navigation Highlight Tracker (ScrollSpy) ---
    const activateLinkOnScroll = () => {
        // Use a generous offset (navbar height + buffer) to trigger the highlight earlier
        let currentScroll = window.scrollY + 180; 

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (correspondingLink) {
                // Logic: Is the current scroll position PAST the section's top AND before the section's bottom?
                if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                    
                    // Remove 'active' from ALL links first
                    navLinks.forEach(link => link.classList.remove('active'));
                    
                    // Add 'active' to the correct link
                    correspondingLink.classList.add('active');
                }
            }
        });
    };

    // --- CRITICAL FIX: Ensure the function runs after all images and CSS load ---
    window.addEventListener('load', () => {
        // Run the scroll function immediately after load
        activateLinkOnScroll();
        // Set the scroll listener after load
        window.addEventListener('scroll', activateLinkOnScroll);
    });
    
    // Fallback in case window.load doesn't fire correctly
    setTimeout(() => {
        activateLinkOnScroll();
        window.addEventListener('scroll', activateLinkOnScroll);
    }, 1000); // Run again after a 1-second delay


    // --- 2. Smooth Scrolling (Existing Code) ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            if (this.getAttribute('href').length > 1) {
                // The smooth scroll is primarily handled by CSS
            }
        });
    });

    // --- 3. Contact Form Validation (Existing Code) ---
    
    // Get form error elements 
    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const messageError = document.getElementById('messageError');
    
    const isValidEmail = (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        return re.test(String(email).toLowerCase());
    }

    form.addEventListener('submit', (e) => {
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        let isValid = true;
        
        nameError.textContent = '';
        emailError.textContent = '';
        messageError.textContent = '';

        if (nameInput.value.trim() === '') {
            nameError.textContent = 'Name is required.';
            isValid = false;
        }

        if (emailInput.value.trim() === '') {
            emailError.textContent = 'Email is required.';
            isValid = false;
        } else if (!isValidEmail(emailInput.value.trim())) {
            emailError.textContent = 'Please enter a valid email address.';
            isValid = false;
        }

        if (messageInput.value.trim() === '') {
            messageError.textContent = 'Message is required.';
            isValid = false;
        }

        if (!isValid) {
            e.preventDefault(); 
        } 
    });

});
