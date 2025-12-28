// DOM Elements
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contactForm');
const navItems = document.querySelectorAll('.nav-links a');
const currentYearSpan = document.getElementById('currentYear');

// Mobile menu toggle
mobileMenuBtn.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  mobileMenuBtn.innerHTML = navLinks.classList.contains('active')
    ? '<i class="fas fa-times"></i>'
    : '<i class="fas fa-bars"></i>';
});

// Close mobile menu when clicking on a link
navItems.forEach(item => {
  item.addEventListener('click', () => {
    navLinks.classList.remove('active');
    mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>';
  });
});

// Form submission with formspree
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validate first
    if (!validateForm()) {
      return false;
    }

    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const originalText = submitBtn.textContent;

    // Show loading state
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    try {
      const formData = new FormData(contactForm);
      const formAction = contactForm.getAttribute('action');

      const response = await fetch(formAction, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        contactForm.reset();
        alert('Thank you for your message! Katherine will get back to you soon.');
      } else {
        throw new Error('Form submission failed');
      }

    } catch (error) {
      console.error('Form error:', error);
      alert('There was an issue sending your message. Please try again or email Katherine directly at katherine.edu@gmail.com');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href') === '#') return;

    e.preventDefault();
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Add scroll effect to header
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 100) {
    header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
  }
});

// Set current year in footer
if (currentYearSpan) {
  currentYearSpan.textContent = new Date().getFullYear();
}

// Add animation to experience cards on scroll
const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Observe experience cards for animation
document.querySelectorAll('.experience-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(20px)';
  card.style.transition = 'opacity 0.5s, transform 0.5s';
  observer.observe(card);
});

// Simple form validation
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value.trim();

  if (!name) {
    alert('Please enter your name');
    return false;
  }

  if (!email) {
    alert('Please enter your email address');
    return false;
  }

  if (!subject) {
    alert('Please select a subject');
    return false;
  }

  if (!message) {
    alert('Please enter your message');
    return false;
  }

  // Simple email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert('Please enter a valid email address');
    return false;
  }

  return true;
}

// Add validation to form if it exists
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    if (!validateForm()) {
      e.preventDefault();
      return false;
    }
  });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function () {
  console.log('Katherine\'s portfolio website loaded successfully!');
});

// Typewriter Effect
function initTypewriter() {
  const typewriterElement = document.getElementById('typewriter-text');
  if (!typewriterElement) return;

  const titles = [
    "Kindergarten Teacher",
    "English Tutor",
    "Classroom Magician"
  ];

  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 100;

  function type() {
    const currentTitle = titles[titleIndex];

    if (!isDeleting && charIndex <= currentTitle.length) {
      // Typing forward
      typewriterElement.textContent = currentTitle.substring(0, charIndex);
      charIndex++;
      typingSpeed = 100;
    } else if (isDeleting && charIndex >= 0) {
      // Deleting backward
      typewriterElement.textContent = currentTitle.substring(0, charIndex);
      charIndex--;
      typingSpeed = 50;
    }

    // Check if we've finished typing current title
    if (!isDeleting && charIndex === currentTitle.length + 1) {
      // Pause at the end before deleting
      typingSpeed = 1500;
      isDeleting = true;
    } else if (isDeleting && charIndex === -1) {
      // Move to next title
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
      typingSpeed = 500;
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing after a short delay
  setTimeout(type, 1000);
}

// Testimonial auto-highlight
function initTestimonials() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  if (testimonialCards.length === 0) return;

  // Disable on mobile view
  const isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) {
    // Reset styles to avoid weird states
    testimonialCards.forEach(card => {
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
      card.style.transition = 'none';
    });
    return;
  }

  let currentIndex = 0;

  function rotateTestimonials() {
    testimonialCards.forEach(card => {
      card.style.opacity = '0.7';
      card.style.transform = 'scale(0.95)';
    });

    testimonialCards[currentIndex].style.opacity = '1';
    testimonialCards[currentIndex].style.transform = 'scale(1)';

    currentIndex = (currentIndex + 1) % testimonialCards.length;
  }

  // Initialize
  testimonialCards.forEach((card, index) => {
    card.style.transition = 'opacity 0.5s, transform 0.5s';
    if (index === 0) {
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
    } else {
      card.style.opacity = '0.7';
      card.style.transform = 'scale(0.95)';
    }
  });

  if (testimonialCards.length > 1) {
    setInterval(rotateTestimonials, 4000);
  }
}

// Enhanced Experience Carousel with swipe support
function initExperienceCarousel() {
  const container = document.querySelector('.experience-container');
  const prevBtn = document.querySelector('.exp-carousel-prev');
  const nextBtn = document.querySelector('.exp-carousel-next');
  const dotsContainer = document.querySelector('.exp-carousel-dots');
  const expCards = document.querySelectorAll('.experience-card');

  if (!container || expCards.length === 0) return;

  // Check if mobile (single card view)
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  // Calculate card width including gap and margins
  let cardWidth;
  if (isMobile) {
    // On mobile, cards have margins: calc(100% - 40px) + 20px margin on each side
    const cardStyle = window.getComputedStyle(expCards[0]);
    cardWidth = expCards[0].offsetWidth + parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);
  } else {
    // On desktop, use offsetWidth + gap (30px)
    cardWidth = expCards[0].offsetWidth + 30;
  }

  const visibleCards = isMobile ? 1 : (window.innerWidth >= 992 ? 3 : 2);
  let currentPosition = 0;
  let maxPosition = Math.max(0, expCards.length - visibleCards);

  // Create dots for main carousel
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxPosition; i++) {
      const dot = document.createElement('button');
      dot.className = `exp-carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to experience ${i + 1}`);
      dot.addEventListener('click', () => {
        goToPosition(i);
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = document.querySelectorAll('.exp-carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentPosition);
    });
  }

  // Update dots on scroll (for swipe)
  container.addEventListener('scroll', () => {
    const scrollPosition = container.scrollLeft;
    const newPosition = Math.round(scrollPosition / cardWidth);

    if (newPosition !== currentPosition && newPosition >= 0 && newPosition <= maxPosition) {
      currentPosition = newPosition;
      updateDots();
    }
  });

  function goToPosition(position, smooth = true) {
    currentPosition = Math.max(0, Math.min(position, maxPosition));

    // Calculate scroll position based on card width
    const scrollPosition = currentPosition * cardWidth;

    container.scrollTo({
      left: scrollPosition,
      behavior: smooth ? 'smooth' : 'auto'
    });
    updateDots();

    // Debug log
    console.log(`Scrolling to position ${currentPosition}, scrollLeft: ${scrollPosition}, cardWidth: ${cardWidth}`);
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Next button clicked, currentPosition:', currentPosition, 'maxPosition:', maxPosition);

      if (currentPosition < maxPosition) {
        goToPosition(currentPosition + 1);
      } else {
        goToPosition(0);
      }
    });
  }

  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Prev button clicked, currentPosition:', currentPosition);

      if (currentPosition > 0) {
        goToPosition(currentPosition - 1);
      } else {
        goToPosition(maxPosition);
      }
    });
  }

  // Update on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newIsMobile = window.matchMedia('(max-width: 768px)').matches;
      const newVisibleCards = newIsMobile ? 1 : (window.innerWidth >= 992 ? 3 : 2);
      maxPosition = Math.max(0, expCards.length - newVisibleCards);

      // Recalculate card width
      if (newIsMobile) {
        const cardStyle = window.getComputedStyle(expCards[0]);
        cardWidth = expCards[0].offsetWidth + parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);
      } else {
        cardWidth = expCards[0].offsetWidth + 30;
      }

      // Recreate dots if needed
      if (dotsContainer) {
        const dots = document.querySelectorAll('.exp-carousel-dot');
        if (dots.length !== maxPosition + 1) {
          dotsContainer.innerHTML = '';
          for (let i = 0; i <= maxPosition; i++) {
            const dot = document.createElement('button');
            dot.className = `exp-carousel-dot ${i === currentPosition ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to experience ${i + 1}`);
            dot.addEventListener('click', () => {
              goToPosition(i);
            });
            dotsContainer.appendChild(dot);
          }
        }
      }

      // Adjust current position if needed
      if (currentPosition > maxPosition) {
        currentPosition = maxPosition;
        goToPosition(currentPosition, false);
      }

      updateDots();
    }, 250);
  });

  // Initialize
  updateDots();
  console.log('Experience carousel initialized, cardWidth:', cardWidth, 'visibleCards:', visibleCards);

  // Modal functionality
  const modal = document.getElementById('experienceModal');
  const modalClose = document.querySelector('.exp-modal-close');

  if (modal && modalClose) {
    // Experience data for modals
    const experienceData = {
      kindergarten: {
        title: "Kindergarten Magic 🏫",
        description: "Where every day is a new adventure! Creating colorful classrooms filled with giggles, games, and growing moments for ages 3-6.",
        images: [
          'kat-angels.jpg',
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://www.successacademies.org/wp-content/uploads/2024/12/6-successacademies_25048656-1-scaled.jpg'
        ]
      },
      tutoring: {
        title: "English Adventures Online 🌍",
        description: "Cambridge-certified fun! Turning screen time into learning time with interactive sessions that make English exciting.",
        images: [
          'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1581094794329-c8112a89af12?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
      },
      activities: {
        title: "Creative Classroom Moments 🎭",
        description: "Songs, stories, and silly games! Watch how I turn learning into playtime with creative activities kids love.",
        images: [
          'https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1541692641319-981cc79ee10a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
          'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        ]
      }
    };

    // Add click events to experience cards
    expCards.forEach(card => {
      const viewBtn = card.querySelector('.exp-view-btn');
      if (viewBtn) {
        viewBtn.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          const experienceType = card.getAttribute('data-modal');
          if (experienceType) {
            openModal(experienceType);
          }
        });
      }
    });

    function openModal(experienceType) {
      const data = experienceData[experienceType];
      if (!data) return;

      // Set modal content
      document.getElementById('modalTitle').textContent = data.title;
      document.getElementById('modalDescription').textContent = data.description;

      // Clear and add images
      const modalImages = document.querySelector('.modal-images');
      if (modalImages) {
        modalImages.innerHTML = '';

        data.images.forEach((imgSrc, index) => {
          const img = document.createElement('img');
          img.src = imgSrc;
          img.alt = data.title;
          img.className = 'modal-image';
          img.loading = 'lazy';
          modalImages.appendChild(img);
        });

        // Create modal dots
        const modalDots = document.querySelector('.modal-carousel-dots');
        if (modalDots) {
          modalDots.innerHTML = '';

          data.images.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = `modal-carousel-dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => {
              goToModalSlide(index);
            });
            modalDots.appendChild(dot);
          });

          // Reset modal carousel position
          modalCurrentSlide = 0;
          modalImages.scrollLeft = 0;
        }
      }

      // Show modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    // Modal carousel functionality
    let modalCurrentSlide = 0;
    const modalImages = document.querySelector('.modal-images');
    const modalPrev = document.querySelector('.modal-prev');
    const modalNext = document.querySelector('.modal-next');

    function goToModalSlide(slideIndex) {
      if (!modalImages) return;
      const images = modalImages.querySelectorAll('.modal-image');
      if (slideIndex < 0) slideIndex = images.length - 1;
      if (slideIndex >= images.length) slideIndex = 0;

      modalCurrentSlide = slideIndex;
      modalImages.scrollTo({
        left: slideIndex * modalImages.offsetWidth,
        behavior: 'smooth'
      });

      // Update modal dots
      const dots = document.querySelectorAll('.modal-carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === slideIndex);
      });
    }

    // Add swipe support for mobile modal
    if (modalImages) {
      // Update dots on scroll (for swipe)
      modalImages.addEventListener('scroll', () => {
        const scrollPosition = modalImages.scrollLeft;
        const imageWidth = modalImages.offsetWidth;
        const newSlide = Math.round(scrollPosition / imageWidth);

        if (newSlide !== modalCurrentSlide && newSlide >= 0) {
          modalCurrentSlide = newSlide;

          // Update modal dots
          const dots = document.querySelectorAll('.modal-carousel-dot');
          dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === modalCurrentSlide);
          });
        }
      });
    }

    if (modalPrev) {
      modalPrev.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToModalSlide(modalCurrentSlide - 1);
      });
    }

    if (modalNext) {
      modalNext.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToModalSlide(modalCurrentSlide + 1);
      });
    }

    // Close modal
    modalClose.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });

    // Close modal when clicking outside
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('active')) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });
  }
}

// Enhanced Testimonials Carousel with swipe support
function initTestimonialsCarousel() {
  const container = document.querySelector('.testimonials-container');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (!container) return;

  const cards = document.querySelectorAll('.testimonial-card');
  if (cards.length === 0) return;

  // Check if mobile (single card view)
  const isMobile = window.matchMedia('(max-width: 768px)').matches;

  // Calculate card width including gap and margins
  let cardWidth;
  if (isMobile) {
    // On mobile, cards have margins: calc(100% - 40px) + 20px margin on each side
    const cardStyle = window.getComputedStyle(cards[0]);
    cardWidth = cards[0].offsetWidth + parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);
  } else {
    // On desktop, use offsetWidth + gap (30px)
    cardWidth = cards[0].offsetWidth + 30;
  }

  const visibleCards = isMobile ? 1 : (window.innerWidth >= 992 ? 3 : 2);
  let currentPosition = 0;
  let maxPosition = Math.max(0, cards.length - visibleCards);

  // Create dots
  if (dotsContainer) {
    dotsContainer.innerHTML = '';
    for (let i = 0; i <= maxPosition; i++) {
      const dot = document.createElement('button');
      dot.className = `carousel-dot ${i === 0 ? 'active' : ''}`;
      dot.setAttribute('aria-label', `Go to testimonial group ${i + 1}`);
      dot.addEventListener('click', () => {
        goToPosition(i);
      });
      dotsContainer.appendChild(dot);
    }
  }

  function updateDots() {
    const dots = document.querySelectorAll('.carousel-dot');
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === currentPosition);
    });
  }

  // Update dots on scroll (for swipe)
  container.addEventListener('scroll', () => {
    const scrollPosition = container.scrollLeft;
    const newPosition = Math.round(scrollPosition / cardWidth);

    if (newPosition !== currentPosition && newPosition >= 0 && newPosition <= maxPosition) {
      currentPosition = newPosition;
      updateDots();
    }
  });

  function goToPosition(position, smooth = true) {
    currentPosition = Math.max(0, Math.min(position, maxPosition));

    // Calculate scroll position based on card width
    const scrollPosition = currentPosition * cardWidth;

    container.scrollTo({
      left: scrollPosition,
      behavior: smooth ? 'smooth' : 'auto'
    });
    updateDots();

    // Debug log
    console.log(`Testimonials: Scrolling to position ${currentPosition}, scrollLeft: ${scrollPosition}, cardWidth: ${cardWidth}`);
  }

  // Next button
  if (nextBtn) {
    nextBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Testimonials Next button clicked, currentPosition:', currentPosition);

      if (currentPosition < maxPosition) {
        goToPosition(currentPosition + 1);
      } else {
        goToPosition(0);
      }
    });
  }

  // Previous button
  if (prevBtn) {
    prevBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      console.log('Testimonials Prev button clicked, currentPosition:', currentPosition);

      if (currentPosition > 0) {
        goToPosition(currentPosition - 1);
      } else {
        goToPosition(maxPosition);
      }
    });
  }

  // Update on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newIsMobile = window.matchMedia('(max-width: 768px)').matches;
      const newVisibleCards = newIsMobile ? 1 : (window.innerWidth >= 992 ? 3 : 2);
      maxPosition = Math.max(0, cards.length - newVisibleCards);

      // Recalculate card width
      if (newIsMobile) {
        const cardStyle = window.getComputedStyle(cards[0]);
        cardWidth = cards[0].offsetWidth + parseInt(cardStyle.marginLeft) + parseInt(cardStyle.marginRight);
      } else {
        cardWidth = cards[0].offsetWidth + 30;
      }

      // Recreate dots if needed
      if (dotsContainer) {
        const dots = document.querySelectorAll('.carousel-dot');
        if (dots.length !== maxPosition + 1) {
          dotsContainer.innerHTML = '';
          for (let i = 0; i <= maxPosition; i++) {
            const dot = document.createElement('button');
            dot.className = `carousel-dot ${i === currentPosition ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Go to testimonial group ${i + 1}`);
            dot.addEventListener('click', () => {
              goToPosition(i);
            });
            dotsContainer.appendChild(dot);
          }
        }
      }

      if (currentPosition > maxPosition) {
        currentPosition = maxPosition;
        goToPosition(currentPosition, false);
      }

      updateDots();
    }, 250);
  });

  // Auto-advance (desktop only)
  if (!isMobile) {
    let autoAdvanceInterval = setInterval(() => {
      if (currentPosition < maxPosition) {
        goToPosition(currentPosition + 1);
      } else {
        goToPosition(0);
      }
    }, 5000);

    container.addEventListener('mouseenter', () => {
      clearInterval(autoAdvanceInterval);
    });

    container.addEventListener('mouseleave', () => {
      autoAdvanceInterval = setInterval(() => {
        if (currentPosition < maxPosition) {
          goToPosition(currentPosition + 1);
        } else {
          goToPosition(0);
        }
      }, 5000);
    });
  }

  // Initialize
  updateDots();
  console.log('Testimonials carousel initialized, cardWidth:', cardWidth, 'visibleCards:', visibleCards);
}

// Call in DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('Katherine\'s portfolio website loaded successfully!');
  initTypewriter();
  initTestimonials();
  initExperienceCarousel();
  initTestimonialsCarousel();
});