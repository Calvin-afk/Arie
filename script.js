// Initialize GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });

        // Handle link clicks in mobile menu
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                const isDropdownParent = link.parentElement.classList.contains('nav-dropdown');
                
                if (window.innerWidth <= 992 && isDropdownParent) {
                    // On mobile, if it's a dropdown parent, toggle the dropdown instead of closing menu
                    e.preventDefault();
                    link.parentElement.classList.toggle('mobile-open');
                } else {
                    // For regular links, close the menu
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // 2. Hero Reveal on Page Load
    const heroTl = gsap.timeline({
        defaults: { ease: 'power4.out', duration: 1.5 }
    });

    heroTl
        .fromTo('.reveal-text', 
            { y: 100, opacity: 0 }, 
            { y: 0, opacity: 1, stagger: 0.2, delay: 0.5 }
        )
        .fromTo('.hero-bg, .reveal-image', 
            { scale: 1.1, opacity: 0 }, 
            { scale: 1, opacity: 1, duration: 2, stagger: 0.3 }, 
            '-=1.5'
        );

    // 3. Scroll Triggered Reveals (Unmask/Fade In)
    const revealElements = document.querySelectorAll('.reveal-up');

    revealElements.forEach((el) => {
        gsap.fromTo(el, 
            { 
                y: 60, 
                opacity: 0 
            }, 
            { 
                y: 0, 
                opacity: 1, 
                duration: 1.2, 
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: el,
                    start: 'top 85%', 
                    end: 'bottom 15%',
                    toggleActions: 'play reverse play reverse' 
                }
            }
        );
    });

    // 4. Smooth Sticky Header Shadow
    window.addEventListener('scroll', () => {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            header.style.height = '70px';
        } else {
            header.style.boxShadow = 'none';
            header.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
            header.style.height = '80px';
        }
    });

    // 5. Form Handling (Mock)
    const inquiryForm = document.getElementById('inquiry-form');
    if (inquiryForm) {
        inquiryForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = inquiryForm.querySelector('button');
            const originalText = btn.innerText;
            
            btn.innerText = 'Sending...';
            btn.disabled = true;

            setTimeout(() => {
                btn.innerText = 'Message Sent!';
                btn.style.backgroundColor = '#28a745'; // Success green
                inquiryForm.reset();

                setTimeout(() => {
                    btn.innerText = originalText;
                    btn.style.backgroundColor = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }

    // 6. Parallax Effect for Hero Image
    gsap.to('.hero-img', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: true
        }
    });

    // 7. Anchor Link Smooth Scrolling
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 70, // Offset for sticky header
                    behavior: 'smooth'
                });
            }
        });
    });

    // 8. Property Modal Logic
    const modalOverlay = document.getElementById('property-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.getElementById('close-modal');
    const propertyCards = document.querySelectorAll('.property-card');

    const propertyData = {
        '1': {
            title: '15458 Lori Boulevard',
            location: 'San Francisco, CA, USA',
            price: '$680,000',
            image: 'images/prop-1.jpg',
            description: 'This stunning modern home offers spacious living areas, a gourmet kitchen, and a beautifully landscaped garden. Perfect for families looking for comfort and style in a prime location.',
            specs: { beds: 4, baths: 2, levels: 2, sqft: 1234 }
        },
        '2': {
            title: '25557 Grove Street',
            location: 'San Francisco, CA, USA',
            price: '$750,000',
            image: 'images/prop-2.jpg',
            description: 'A masterpiece of architecture, this home features high ceilings, natural light, and premium finishes throughout. Located in the heart of San Francisco.',
            specs: { beds: 4, baths: 2, levels: 3, sqft: 1234 }
        },
        '3': {
            title: 'The Azure Villa',
            location: 'Beverly Hills, CA, USA',
            price: '$5,500 / mo',
            image: 'images/prop-3.jpg',
            description: 'Experience luxury living at its finest. This villa offers breathtaking views, a private pool, and expansive terraces. Ideal for those who appreciate privacy and elegance.',
            specs: { beds: 3, baths: 3, levels: 2, sqft: 2100 }
        },
        '4': {
            title: 'Horizon Heights',
            location: 'Miami, FL, USA',
            price: '$1,200,000',
            image: 'images/prop-4.jpg',
            description: 'A contemporary waterfront estate featuring an open-concept design, floor-to-ceiling windows, and a private dock. A true tropical paradise.',
            specs: { beds: 5, baths: 4, levels: 3, sqft: 3500 }
        },
        '5': {
            title: 'Skyline Loft',
            location: 'Manhattan, NY, USA',
            price: '$4,200 / mo',
            image: 'images/prop-5.jpg',
            description: 'Modern industrial living in the heart of the city. This loft features exposed brick, high ceilings, and stunning city views.',
            specs: { beds: 2, baths: 2, levels: 1, sqft: 1500 }
        },
        '6': {
            title: 'Coastal Cottage',
            location: 'Malibu, CA, USA',
            price: '$6,800 / mo',
            image: 'images/prop-6.jpg',
            description: 'A charming beachside retreat with direct access to the ocean. Enjoy the sound of the waves from your private balcony.',
            specs: { beds: 3, baths: 2, levels: 2, sqft: 1800 }
        }
    };

    if (propertyCards.length > 0) {
        propertyCards.forEach(card => {
            card.addEventListener('click', () => {
                const propId = card.getAttribute('data-prop');
                const data = propertyData[propId];
                
                if (data) {
                    modalBody.innerHTML = `
                        <div class="modal-grid">
                            <div class="modal-image">
                                <img src="${data.image}" alt="${data.title}">
                            </div>
                            <div class="modal-details">
                                <h2>${data.title}</h2>
                                <div class="property-location"><i data-lucide="map-pin"></i> ${data.location}</div>
                                <div class="modal-price">${data.price}</div>
                                <div class="modal-desc">${data.description}</div>
                                <div class="modal-specs property-specs">
                                    <div class="spec-item">
                                        <i data-lucide="bed"></i>
                                        <span>Beds</span>
                                        <strong>${data.specs.beds}</strong>
                                    </div>
                                    <div class="spec-item">
                                        <i data-lucide="bath"></i>
                                        <span>Baths</span>
                                        <strong>${data.specs.baths}</strong>
                                    </div>
                                    <div class="spec-item">
                                        <i data-lucide="layers"></i>
                                        <span>Levels</span>
                                        <strong>${data.specs.levels}</strong>
                                    </div>
                                    <div class="spec-item">
                                        <i data-lucide="maximize"></i>
                                        <span>Sqft</span>
                                        <strong>${data.specs.sqft}</strong>
                                    </div>
                                </div>
                                <a href="contact.html" class="btn btn-primary">Enquire About This Property</a>
                            </div>
                        </div>
                    `;
                    
                    // Re-initialize icons in modal
                    lucide.createIcons();
                    
                    modalOverlay.classList.add('active');
                    document.body.style.overflow = 'hidden';
                }
            });
        });
    }

    if (closeModal) {
        closeModal.addEventListener('click', () => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
        });

        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                modalOverlay.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
});
