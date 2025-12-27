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

// Form submission handling
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);

    // In a real implementation, you would send this to Formspree
    // For this demo, we'll simulate a submission
    const submitBtn = contactForm.querySelector('.form-submit-btn');
    const originalText = submitBtn.textContent;

    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    // Simulate API call delay
    setTimeout(() => {
      alert('Thank you for your message! Katherine will get back to you soon.');
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 1500);
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

// Call the function when page loads
document.addEventListener('DOMContentLoaded', initTypewriter);

// Testimonial auto-rotate (optional)
function initTestimonials() {
  const testimonialCards = document.querySelectorAll('.testimonial-card');
  if (testimonialCards.length === 0) return;

  let currentIndex = 0;

  function rotateTestimonials() {
    // Remove active class from all cards
    testimonialCards.forEach(card => {
      card.style.opacity = '0.7';
      card.style.transform = 'scale(0.95)';
    });

    // Add active class to current card
    if (testimonialCards[currentIndex]) {
      testimonialCards[currentIndex].style.opacity = '1';
      testimonialCards[currentIndex].style.transform = 'scale(1)';
    }

    // Move to next card
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

  // Start rotation if more than 1 testimonial
  if (testimonialCards.length > 1) {
    setInterval(rotateTestimonials, 4000);
  }
}

// Call in DOMContentLoaded
document.addEventListener('DOMContentLoaded', initTestimonials);

// Testimonials Carousel
function initTestimonialsCarousel() {
  const container = document.querySelector('.testimonials-container');
  const prevBtn = document.querySelector('.carousel-btn-prev');
  const nextBtn = document.querySelector('.carousel-btn-next');
  const dotsContainer = document.querySelector('.carousel-dots');

  if (!container || !prevBtn || !nextBtn) return;

  const cards = document.querySelectorAll('.testimonial-card');
  const cardWidth = cards[0] ? cards[0].offsetWidth + 30 : 330; // card width + gap
  const visibleCards = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  let currentPosition = 0;
  let maxPosition = Math.max(0, cards.length - visibleCards);

  // Create dots
  if (dotsContainer) {
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

  function goToPosition(position) {
    currentPosition = Math.max(0, Math.min(position, maxPosition));
    container.scrollTo({
      left: currentPosition * cardWidth,
      behavior: 'smooth'
    });
    updateDots();
  }

  // Next button
  nextBtn.addEventListener('click', () => {
    if (currentPosition < maxPosition) {
      goToPosition(currentPosition + 1);
    } else {
      goToPosition(0); // Loop back to start
    }
  });

  // Previous button
  prevBtn.addEventListener('click', () => {
    if (currentPosition > 0) {
      goToPosition(currentPosition - 1);
    } else {
      goToPosition(maxPosition); // Loop to end
    }
  });

  // Update on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newVisibleCards = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      maxPosition = Math.max(0, cards.length - newVisibleCards);

      // Remove extra dots if needed
      const dots = document.querySelectorAll('.carousel-dot');
      if (dots.length > maxPosition + 1) {
        for (let i = dots.length - 1; i > maxPosition; i--) {
          dots[i].remove();
        }
      }
      // Add dots if needed
      else if (dots.length < maxPosition + 1) {
        for (let i = dots.length; i <= maxPosition; i++) {
          const dot = document.createElement('button');
          dot.className = `carousel-dot ${i === currentPosition ? 'active' : ''}`;
          dot.setAttribute('aria-label', `Go to testimonial group ${i + 1}`);
          dot.addEventListener('click', () => {
            goToPosition(i);
          });
          dotsContainer.appendChild(dot);
        }
      }

      // Adjust current position if it's now beyond max
      if (currentPosition > maxPosition) {
        currentPosition = maxPosition;
        goToPosition(currentPosition);
      }
    }, 250);
  });

  // Optional: Auto-advance every 5 seconds
  let autoAdvanceInterval = setInterval(() => {
    if (currentPosition < maxPosition) {
      goToPosition(currentPosition + 1);
    } else {
      goToPosition(0);
    }
  }, 5000);

  // Pause auto-advance on hover
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

  // Initialize
  updateDots();
}

// Call in DOMContentLoaded
document.addEventListener('DOMContentLoaded', initTestimonialsCarousel);

// Experience Carousel with Modal
function initExperienceCarousel() {
  const container = document.querySelector('.experience-container');
  const prevBtn = document.querySelector('.exp-carousel-prev');
  const nextBtn = document.querySelector('.exp-carousel-next');
  const dotsContainer = document.querySelector('.exp-carousel-dots');
  const expCards = document.querySelectorAll('.experience-card');
  const modal = document.getElementById('experienceModal');
  const modalClose = document.querySelector('.exp-modal-close');
  const viewButtons = document.querySelectorAll('.exp-view-btn');

  if (!container || !prevBtn || !nextBtn) return;

  const cardWidth = expCards[0] ? expCards[0].offsetWidth + 30 : 330;
  const visibleCards = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
  let currentPosition = 0;
  let maxPosition = Math.max(0, expCards.length - visibleCards);

  // Experience data for modals
  const experienceData = {
    kindergarten: {
      title: "Kindergarten Magic 🏫",
      description: "Where every day is a new adventure! Creating colorful classrooms filled with giggles, games, and growing moments for ages 3-6.",
      images: [
        'https://www.successacademies.org/wp-content/uploads/2024/12/6-successacademies_25048656-1-scaled.jpg',
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

  // Create dots for main carousel
  if (dotsContainer) {
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

  function goToPosition(position) {
    currentPosition = Math.max(0, Math.min(position, maxPosition));
    container.scrollTo({
      left: currentPosition * cardWidth,
      behavior: 'smooth'
    });
    updateDots();
  }

  // Next button
  nextBtn.addEventListener('click', () => {
    if (currentPosition < maxPosition) {
      goToPosition(currentPosition + 1);
    } else {
      goToPosition(0);
    }
  });

  // Previous button
  prevBtn.addEventListener('click', () => {
    if (currentPosition > 0) {
      goToPosition(currentPosition - 1);
    } else {
      goToPosition(maxPosition);
    }
  });

  // Modal functionality
  function openModal(experienceType) {
    const data = experienceData[experienceType];
    if (!data) return;

    // Set modal content
    document.getElementById('modalTitle').textContent = data.title;
    document.getElementById('modalDescription').textContent = data.description;

    // Clear and add images
    const modalImages = document.querySelector('.modal-images');
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

    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  // Add click events to experience cards
  expCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (!e.target.closest('.exp-view-btn')) return;
      const experienceType = card.getAttribute('data-modal');
      openModal(experienceType);
    });
  });

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

  if (modalPrev) {
    modalPrev.addEventListener('click', () => {
      goToModalSlide(modalCurrentSlide - 1);
    });
  }

  if (modalNext) {
    modalNext.addEventListener('click', () => {
      goToModalSlide(modalCurrentSlide + 1);
    });
  }

  // Close modal
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      modal.classList.remove('active');
      document.body.style.overflow = 'auto';
    });
  }

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

  // Update on window resize
  let resizeTimeout;
  window.addEventListener('resize', () => {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(() => {
      const newVisibleCards = window.innerWidth >= 992 ? 3 : window.innerWidth >= 768 ? 2 : 1;
      maxPosition = Math.max(0, expCards.length - newVisibleCards);

      // Update dots if needed
      const dots = document.querySelectorAll('.exp-carousel-dot');
      if (dots.length > maxPosition + 1) {
        for (let i = dots.length - 1; i > maxPosition; i--) {
          dots[i].remove();
        }
      } else if (dots.length < maxPosition + 1) {
        for (let i = dots.length; i <= maxPosition; i++) {
          const dot = document.createElement('button');
          dot.className = `exp-carousel-dot ${i === currentPosition ? 'active' : ''}`;
          dot.setAttribute('aria-label', `Go to experience ${i + 1}`);
          dot.addEventListener('click', () => {
            goToPosition(i);
          });
          dotsContainer.appendChild(dot);
        }
      }

      if (currentPosition > maxPosition) {
        currentPosition = maxPosition;
        goToPosition(currentPosition);
      }
    }, 250);
  });

  // Initialize
  updateDots();
}

// Call in DOMContentLoaded
document.addEventListener('DOMContentLoaded', initExperienceCarousel);