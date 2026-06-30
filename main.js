/**
 * HathHunar Digital Marketing Agency - Dynamic Features & UI Interactions
 * Location: Prayagraj, Uttar Pradesh, India
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }

  // 1. Mobile Menu Navigation Toggle
  const mobileToggle = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const menuIcon = document.getElementById('menu-icon');

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const isOpen = navMenu.classList.contains('open');
      
      // Toggle icon between menu and x
      if (isOpen) {
        menuIcon.setAttribute('data-lucide', 'x');
      } else {
        menuIcon.setAttribute('data-lucide', 'menu');
      }
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });

    // Close mobile menu when a nav link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        menuIcon.setAttribute('data-lucide', 'menu');
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      });
    });
  }

  // 2. Sticky Glassmorphic Navbar on Scroll
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // 3. Page entrance animations on page load
  setTimeout(() => {
    const fadeElements = document.querySelectorAll('.fade-in-up');
    fadeElements.forEach(el => el.classList.add('visible'));
  }, 100);

  // 4. Stat Counter Animation
  const statsElements = document.querySelectorAll('.stat-number');
  let statsTriggered = false;

  const countUp = (element) => {
    const target = parseInt(element.getAttribute('data-target'), 10);
    const duration = 2000;
    const stepTime = Math.max(Math.floor(duration / target), 15);
    let current = 0;

    const timer = setInterval(() => {
      current += Math.ceil(target / (duration / stepTime));
      if (current >= target) {
        element.textContent = target + (element.getAttribute('data-target').includes('%') || element.textContent.includes('%') ? '%' : '');
        if (element.getAttribute('data-target') === '280' || element.getAttribute('data-target') === '45' || element.getAttribute('data-target') === '95') {
          element.textContent = '+' + target;
        } else if (element.getAttribute('data-target') === '99') {
          element.textContent = target + '%';
        } else {
          element.textContent = target;
        }
        clearInterval(timer);
      } else {
        if (element.getAttribute('data-target') === '280' || element.getAttribute('data-target') === '45' || element.getAttribute('data-target') === '95') {
          element.textContent = '+' + current;
        } else if (element.getAttribute('data-target') === '99') {
          element.textContent = current + '%';
        } else {
          element.textContent = current;
        }
      }
    }, stepTime);
  };

  const triggerStatsCounting = () => {
    if (!statsTriggered && statsElements.length > 0) {
      statsElements.forEach(stat => countUp(stat));
      statsTriggered = true;
    }
  };

  // Run stats counting on page load if stats exist
  triggerStatsCounting();

  // 6. Portfolio Category Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button class
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      portfolioItems.forEach(item => {
        const itemCategory = item.getAttribute('data-category');
        
        // Custom scale and opacity transition
        if (filterValue === 'all' || itemCategory === filterValue) {
          item.style.display = 'block';
          setTimeout(() => {
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          }, 50);
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.85)';
          setTimeout(() => {
            item.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  // 7. Testimonials Slider
  const slides = document.querySelectorAll('.testimonial-card');
  const btnPrev = document.getElementById('slider-prev');
  const btnNext = document.getElementById('slider-next');
  let currentSlide = 0;
  let slideInterval;

  const showSlide = (n) => {
    slides.forEach((slide, idx) => {
      slide.classList.remove('active', 'prev');
      if (idx === n) {
        slide.classList.add('active');
      } else if (idx === (n - 1 + slides.length) % slides.length) {
        slide.classList.add('prev');
      }
    });
    currentSlide = n;
  };

  const nextSlide = () => {
    const nextIdx = (currentSlide + 1) % slides.length;
    showSlide(nextIdx);
  };

  const prevSlide = () => {
    const prevIdx = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(prevIdx);
  };

  const startAutoSlide = () => {
    slideInterval = setInterval(nextSlide, 8000); // Auto change slide every 8s
  };

  const resetAutoSlide = () => {
    clearInterval(slideInterval);
    startAutoSlide();
  };

  if (slides.length > 0) {
    // Start auto slide initially
    startAutoSlide();

    if (btnNext && btnPrev) {
      btnNext.addEventListener('click', () => {
        nextSlide();
        resetAutoSlide();
      });

      btnPrev.addEventListener('click', () => {
        prevSlide();
        resetAutoSlide();
      });
    }
  }

  // 8. Service Card Cursor Spot Light Glow Effect
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // x position within the element.
      const y = e.clientY - rect.top;  // y position within the element.
      
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 9. Contact Form Interactive Action & Mock Validation
  const contactForm = document.getElementById('hathhunar-contact');
  const formSuccess = document.getElementById('form-success');
  const formError = document.getElementById('form-error');
  const formSubmitBtn = document.getElementById('form-submit');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Basic client-side check
      const name = document.getElementById('contact-name').value.trim();
      const email = document.getElementById('contact-email').value.trim();
      const service = document.getElementById('contact-service').value;
      const message = document.getElementById('contact-message').value.trim();

      if (!name || !email || !service || !message) {
        formError.style.display = 'block';
        formSuccess.style.display = 'none';
        return;
      }

      // Enter loading state
      formSubmitBtn.disabled = true;
      formSubmitBtn.innerHTML = `Sending Strategy Request... <i class="loader-placeholder"></i>`;
      formError.style.display = 'none';
      formSuccess.style.display = 'none';

      // Mock API call delay
      setTimeout(() => {
        // Log query details for developer diagnostic verification
        console.log('--- HathHunar Marketing Inquiry ---');
        console.log(`Lead Name: ${name}`);
        console.log(`Contact Email: ${email}`);
        console.log(`Selected Interest: ${service}`);
        console.log(`Inquiry Message: ${message}`);
        console.log(`Source Location: Prayagraj Hub Client Interface`);
        console.log('-----------------------------------');

        // Exit loading, show success feedback
        formSubmitBtn.disabled = false;
        formSubmitBtn.innerHTML = `Send Message <i data-lucide="send" style="width: 18px; height: 18px;"></i>`;
        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }

        formSuccess.style.display = 'block';
        contactForm.reset();

        // Hide success label after 8 seconds
        setTimeout(() => {
          formSuccess.style.display = 'none';
        }, 8000);

      }, 1500);
    });
  }

  // 10. Home Page Slideshow Animate (5 Seconds Rotation)
  const homeSlides = document.querySelectorAll('.home-slide');
  const homeDots = document.querySelectorAll('.slideshow-dot');
  let currentHomeSlide = 0;
  let homeSlideshowInterval;

  const showHomeSlide = (index) => {
    if (homeSlides.length === 0) return;
    
    // Remove active state
    homeSlides.forEach(slide => slide.classList.remove('active'));
    homeDots.forEach(dot => dot.classList.remove('active'));

    // Set new active slide
    currentHomeSlide = index;
    homeSlides[currentHomeSlide].classList.add('active');
    if (homeDots[currentHomeSlide]) {
      homeDots[currentHomeSlide].classList.add('active');
    }
  };

  const nextHomeSlide = () => {
    if (homeSlides.length === 0) return;
    const nextIdx = (currentHomeSlide + 1) % homeSlides.length;
    showHomeSlide(nextIdx);
  };

  const startHomeSlideshow = () => {
    homeSlideshowInterval = setInterval(nextHomeSlide, 5000); // 5 seconds
  };

  const resetHomeSlideshow = () => {
    clearInterval(homeSlideshowInterval);
    startHomeSlideshow();
  };

  if (homeSlides.length > 0) {
    startHomeSlideshow();

    homeDots.forEach(dot => {
      dot.addEventListener('click', () => {
        const slideIndex = parseInt(dot.getAttribute('data-slide'), 10);
        showHomeSlide(slideIndex);
        resetHomeSlideshow();
      });
    });
  }

  // 11. Upload Section Drag-and-Drop & Submission
  const dragDropArea = document.getElementById('drag-drop-area');
  const fileInput = document.getElementById('upload-file');
  const fileLabel = document.getElementById('file-label');
  const uploadForm = document.getElementById('hathhunar-upload');
  const uploadSuccess = document.getElementById('upload-success');
  const uploadError = document.getElementById('upload-error');
  const uploadSubmitBtn = document.getElementById('upload-submit');
  const progressContainer = document.getElementById('upload-progress-container');
  const progressBar = document.getElementById('upload-progress-bar');
  const progressPercent = document.getElementById('upload-percent');

  if (dragDropArea && fileInput) {
    dragDropArea.addEventListener('click', () => {
      fileInput.click();
    });

    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        fileLabel.innerHTML = `Selected file: <span style="color: var(--primary); font-weight: 600;">${fileInput.files[0].name}</span>`;
      }
    });

    ['dragenter', 'dragover'].forEach(eventName => {
      dragDropArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        dragDropArea.classList.add('dragover');
      }, false);
    });

    ['dragleave', 'dragend', 'drop'].forEach(eventName => {
      dragDropArea.addEventListener(eventName, (e) => {
        e.preventDefault();
        dragDropArea.classList.remove('dragover');
      }, false);
    });

    dragDropArea.addEventListener('drop', (e) => {
      const dt = e.dataTransfer;
      const files = dt.files;
      if (files.length > 0 && files[0].type.startsWith('image/')) {
        fileInput.files = files;
        fileLabel.innerHTML = `Dropped file: <span style="color: var(--primary); font-weight: 600;">${files[0].name}</span>`;
      }
    });
  }

  if (uploadForm) {
    uploadForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const company = document.getElementById('upload-company').value.trim();
      const files = fileInput.files;

      if (!company || files.length === 0) {
        uploadError.style.display = 'block';
        uploadSuccess.style.display = 'none';
        return;
      }

      uploadError.style.display = 'none';
      uploadSuccess.style.display = 'none';
      progressContainer.style.display = 'block';
      uploadSubmitBtn.disabled = true;
      uploadSubmitBtn.innerHTML = `Uploading Assets...`;

      let progress = 0;
      progressBar.style.width = '0%';
      progressPercent.textContent = '0%';

      const progressInterval = setInterval(() => {
        progress += 10;
        progressBar.style.width = `${progress}%`;
        progressPercent.textContent = `${progress}%`;

        if (progress >= 100) {
          clearInterval(progressInterval);

          setTimeout(() => {
            console.log('--- HathHunar Brand Assets Upload ---');
            console.log(`Company Name: ${company}`);
            console.log(`File Name: ${files[0].name}`);
            console.log(`File Size: ${(files[0].size / 1024).toFixed(2)} KB`);
            console.log(`Mime Type: ${files[0].type}`);
            console.log('------------------------------------');

            progressContainer.style.display = 'none';
            uploadSuccess.style.display = 'block';
            uploadForm.reset();
            fileLabel.innerHTML = `Drag & drop your files here, or <span style="color: var(--primary); font-weight: 600;">Browse</span>`;
            
            uploadSubmitBtn.disabled = false;
            uploadSubmitBtn.innerHTML = `Submit Brand Assets <i data-lucide="upload" style="width: 18px; height: 18px;"></i>`;
            if (typeof lucide !== 'undefined') {
              lucide.createIcons();
            }

            setTimeout(() => {
              uploadSuccess.style.display = 'none';
            }, 8000);

          }, 400);
        }
      }, 150); // Increment progress bar over 1.5s
    });
  }

  // 5. Dynamic Floating Bubbles Generator (Mockup Style)
  const createFloatingBubbles = () => {
    // Create Background Gradient Wrapper (z-index: -2)
    const bgWrapper = document.createElement('div');
    bgWrapper.style.position = 'fixed';
    bgWrapper.style.top = '0';
    bgWrapper.style.left = '0';
    bgWrapper.style.width = '100%';
    bgWrapper.style.height = '100%';
    bgWrapper.style.background = 'var(--bg-gradient)';
    bgWrapper.style.pointerEvents = 'none';
    bgWrapper.style.zIndex = '-2';
    document.body.appendChild(bgWrapper);

    // Create Bubbles Container (z-index: -1)
    const bubbleContainer = document.createElement('div');
    bubbleContainer.style.position = 'fixed';
    bubbleContainer.style.top = '0';
    bubbleContainer.style.left = '0';
    bubbleContainer.style.width = '100%';
    bubbleContainer.style.height = '100%';
    bubbleContainer.style.overflow = 'hidden';
    bubbleContainer.style.pointerEvents = 'none';
    bubbleContainer.style.zIndex = '-1';
    document.body.appendChild(bubbleContainer);

    const bubbleCount = 14;
    for (let i = 0; i < bubbleCount; i++) {
      const bubble = document.createElement('div');
      bubble.classList.add('floating-bubble');
      
      const size = Math.floor(Math.random() * 70) + 20;
      bubble.style.width = `${size}px`;
      bubble.style.height = `${size}px`;
      
      bubble.style.left = `${Math.random() * 100}%`;
      bubble.style.top = `${Math.random() * 100}%`;
      
      const duration = Math.floor(Math.random() * 15) + 15;
      const delay = Math.floor(Math.random() * 10) * -1;
      bubble.style.animationDuration = `${duration}s`;
      bubble.style.animationDelay = `${delay}s`;
      
      bubble.style.opacity = (Math.random() * 0.35 + 0.35).toFixed(2);
      
      bubbleContainer.appendChild(bubble);
    }
  };

  createFloatingBubbles();

  // 6. Dynamic Floating WhatsApp Button
  const createWhatsAppButton = () => {
    const waLink = document.createElement('a');
    waLink.href = 'https://wa.me/918707270409?text=Hello%20HathHunar%21%20I%20want%20to%20know%20more%20about%20your%20digital%20marketing%20services.';
    waLink.target = '_blank';
    waLink.rel = 'noopener noreferrer';
    waLink.className = 'whatsapp-floating-btn';
    waLink.setAttribute('aria-label', 'Contact HathHunar on WhatsApp');
    
    waLink.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" fill="currentColor">
        <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L3 496l133.9-35.1c32.7 17.4 69.4 26.5 106.9 26.5 122.4 0 222-99.6 222-222.2 0-59.3-25.2-115-67.1-157c-24.4-24.4-55.1-37.9-88.1-37.9zM223.9 453c-33.2 0-65.7-8.9-94-25.7l-6.7-4-79.8 20.9 21.3-77.8-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.7-186.6 184.7zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7 .9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"/>
      </svg>
    `;
    
    document.body.appendChild(waLink);
  };
  createWhatsAppButton();
});
