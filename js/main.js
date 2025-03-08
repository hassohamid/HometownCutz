document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");

  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenuBtn.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    // Close mobile menu when clicking any nav link
    navLinks.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenuBtn.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Header scroll effect
  const header = document.querySelector(".header");
  let lastScroll = 0;

  window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll <= 0) {
      header.classList.remove("scroll-up");
      return;
    }

    if (
      currentScroll > lastScroll &&
      !header.classList.contains("scroll-down")
    ) {
      header.classList.remove("scroll-up");
      header.classList.add("scroll-down");
    } else if (
      currentScroll < lastScroll &&
      header.classList.contains("scroll-down")
    ) {
      header.classList.remove("scroll-down");
      header.classList.add("scroll-up");
    }
    lastScroll = currentScroll;
  });

  // Testimonials Slider
  const testimonials = document.querySelectorAll(".testimonial-card");
  const dots = document.querySelectorAll(".nav-dot");
  let currentTestimonial = 0;
  let testimonialInterval;

  function showTestimonial(index) {
    // Remove active class from all testimonials and dots
    testimonials.forEach((testimonial) =>
      testimonial.classList.remove("active")
    );
    dots.forEach((dot) => dot.classList.remove("active"));

    // Add active class to current testimonial and dot
    testimonials[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
  }

  // Initialize slider interval
  function startTestimonialInterval() {
    testimonialInterval = setInterval(nextTestimonial, 3000);
  }

  // Add click events to dots
  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(testimonialInterval);
      currentTestimonial = index;
      showTestimonial(currentTestimonial);
      startTestimonialInterval();
    });
  });

  // Start the automatic slider
  startTestimonialInterval();

  // Pause on hover
  const testimonialContainer = document.querySelector(".testimonial-container");
  testimonialContainer.addEventListener("mouseenter", () => {
    clearInterval(testimonialInterval);
  });

  testimonialContainer.addEventListener("mouseleave", () => {
    startTestimonialInterval();
  });
});
