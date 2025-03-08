document.addEventListener("DOMContentLoaded", function () {
  let currentStep = 1;
  const totalSteps = 3;

  // Elements
  const steps = document.querySelectorAll(".step");
  const sections = document.querySelectorAll(".booking-section");
  const nextBtn = document.querySelector(".nav-btn.next");
  const backBtn = document.querySelector(".nav-btn.back");
  const confirmBtn = document.querySelector(".nav-btn.confirm");
  const serviceCards = document.querySelectorAll(".service-card");

  // Booking data
  let bookingData = {
    service: null,
    date: null,
    time: null,
    price: null,
  };

  // Initialize the calendar
  initializeCalendar();

  // Service Selection
  serviceCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Remove selection from other cards
      serviceCards.forEach((c) => c.classList.remove("selected"));
      // Select this card
      card.classList.add("selected");
      // Update booking data
      bookingData.service = card.querySelector("h3").textContent;
      bookingData.price = card.querySelector(".price").textContent;
      updateSummary();
    });
  });

  // Navigation
  nextBtn.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        currentStep++;
        updateSteps();
        // Scroll to top of booking container
        document
          .querySelector(".booking-container")
          .scrollIntoView({ behavior: "smooth" });
      }
    }
  });

  backBtn.addEventListener("click", () => {
    if (currentStep > 1) {
      currentStep--;
      updateSteps();
      // Scroll to top of booking container
      document
        .querySelector(".booking-container")
        .scrollIntoView({ behavior: "smooth" });
    }
  });

  confirmBtn.addEventListener("click", () => {
    if (validateStep(currentStep)) {
      showBookingSummary();
    }
  });

  function updateSteps() {
    // Update step indicators
    steps.forEach((step, index) => {
      if (index + 1 === currentStep) {
        step.classList.add("active");
      } else if (index + 1 < currentStep) {
        step.classList.add("completed");
        step.classList.remove("active");
      } else {
        step.classList.remove("active", "completed");
      }
    });

    // Show/hide sections
    sections.forEach((section, index) => {
      if (index + 1 === currentStep) {
        section.classList.add("active");
      } else {
        section.classList.remove("active");
      }
    });

    // Update navigation buttons
    backBtn.style.display = currentStep === 1 ? "none" : "flex";
    nextBtn.style.display = currentStep === totalSteps ? "none" : "flex";
    confirmBtn.style.display = currentStep === totalSteps ? "flex" : "none";

    // Update navigation container class
    const navContainer = document.querySelector(".booking-navigation");
    if (currentStep === 1) {
      navContainer.classList.remove("has-back");
    } else {
      navContainer.classList.add("has-back");
    }
  }

  function validateStep(step) {
    switch (step) {
      case 1:
        return bookingData.service !== null;
      case 2:
        return bookingData.date !== null && bookingData.time !== null;
      case 3:
        return validateForm();
      default:
        return false;
    }
  }

  function validateForm() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    return name && email && phone;
  }

  function updateSummary() {
    document.getElementById("selected-service").textContent =
      bookingData.service || "Not selected";
    document.getElementById("selected-date").textContent =
      bookingData.date || "Not selected";
    document.getElementById("selected-time").textContent =
      bookingData.time || "Not selected";
    document.getElementById("selected-price").textContent =
      bookingData.price || "$0";
  }

  function initializeCalendar() {
    const calendar = document.querySelector(".calendar-grid");
    const monthDisplay = document.querySelector(".current-month");
    const today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();

    function renderCalendar() {
      const firstDay = new Date(currentYear, currentMonth, 1);
      const lastDay = new Date(currentYear, currentMonth + 1, 0);
      const startingDay = firstDay.getDay();
      const monthLength = lastDay.getDate();

      // Update month display
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      monthDisplay.textContent = `${monthNames[currentMonth]} ${currentYear}`;

      // Clear calendar
      calendar.innerHTML = "";

      // Add day labels
      const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
      days.forEach((day) => {
        const dayLabel = document.createElement("div");
        dayLabel.className = "calendar-day label";
        dayLabel.textContent = day;
        calendar.appendChild(dayLabel);
      });

      // Add blank spaces before first day
      for (let i = 0; i < startingDay; i++) {
        const blank = document.createElement("div");
        blank.className = "calendar-day";
        calendar.appendChild(blank);
      }

      // Add days
      for (let i = 1; i <= monthLength; i++) {
        const day = document.createElement("div");
        day.className = "calendar-day";
        day.textContent = i;

        const date = new Date(currentYear, currentMonth, i);
        if (date < today) {
          day.classList.add("disabled");
        } else {
          day.addEventListener("click", () => {
            document
              .querySelectorAll(".calendar-day")
              .forEach((d) => d.classList.remove("selected"));
            day.classList.add("selected");
            bookingData.date = `${monthNames[currentMonth]} ${i}, ${currentYear}`;
            // Show time slots section and generate slots
            const timeSlots = document.querySelector(".time-slots");
            timeSlots.style.display = "block";
            generateTimeSlots();
            updateSummary();
          });
        }

        calendar.appendChild(day);
      }
    }

    // Navigation
    document
      .querySelector(".calendar-nav.prev")
      .addEventListener("click", () => {
        if (
          currentMonth > today.getMonth() ||
          currentYear > today.getFullYear()
        ) {
          currentMonth--;
          if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
          }
          renderCalendar();
        }
      });

    document
      .querySelector(".calendar-nav.next")
      .addEventListener("click", () => {
        currentMonth++;
        if (currentMonth > 11) {
          currentMonth = 0;
          currentYear++;
        }
        renderCalendar();
      });

    // Initial render
    renderCalendar();
  }

  function generateTimeSlots() {
    const timeGrid = document.querySelector(".time-grid");
    timeGrid.innerHTML = "";

    // Add a loading message while generating slots
    timeGrid.innerHTML =
      "<div class='loading'>Loading available times...</div>";

    // Generate time slots from 9 AM to 7 PM
    for (let hour = 9; hour < 19; hour++) {
      for (let minute of ["00", "30"]) {
        // Format hour for display (9 -> 09, etc)
        const displayHour = hour.toString().padStart(2, "0");
        const timeString = `${displayHour}:${minute}`;

        const timeSlot = document.createElement("div");
        timeSlot.className = "time-slot";
        timeSlot.textContent = timeString;

        timeSlot.addEventListener("click", () => {
          document
            .querySelectorAll(".time-slot")
            .forEach((slot) => slot.classList.remove("selected"));
          timeSlot.classList.add("selected");
          bookingData.time = timeString;
          updateSummary();
        });

        timeGrid.appendChild(timeSlot);
      }
    }

    // Remove loading message if it exists
    const loading = timeGrid.querySelector(".loading");
    if (loading) loading.remove();
  }

  function showBookingSummary() {
    // Create modal with booking summary
    const modal = document.createElement("div");
    modal.className = "booking-modal";

    modal.innerHTML = `
      <div class="booking-summary">
        <h3>Booking Summary</h3>
        <div class="summary-details">
          <div class="summary-item">
            <span class="label">Service:</span>
            <span class="value">${bookingData.service}</span>
          </div>
          <div class="summary-item">
            <span class="label">Date:</span>
            <span class="value">${bookingData.date}</span>
          </div>
          <div class="summary-item">
            <span class="label">Time:</span>
            <span class="value">${bookingData.time}</span>
          </div>
          <div class="summary-item">
            <span class="label">Price:</span>
            <span class="value">${bookingData.price}</span>
          </div>
        </div>
        <div class="summary-actions">
          <button class="confirm-btn">Confirm Booking</button>
          <button class="cancel-btn">Cancel</button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    // Add event listeners for the buttons
    modal.querySelector(".confirm-btn").addEventListener("click", () => {
      modal.remove();
      showConfirmation();
    });

    modal.querySelector(".cancel-btn").addEventListener("click", () => {
      modal.remove();
    });
  }

  function showConfirmation() {
    const confirmation = document.createElement("div");
    confirmation.className = "booking-confirmation";

    confirmation.innerHTML = `
      <i class="fas fa-check-circle confirmation-icon"></i>
      <h3 class="confirmation-message">Booking Confirmed!</h3>
      <p class="confirmation-details">
        Thank you for choosing Hometown Cutz.<br>
        We'll send you a confirmation email shortly with your booking details.
      </p>
    `;

    document.body.appendChild(confirmation);

    // Remove the confirmation message and redirect after 3 seconds
    setTimeout(() => {
      confirmation.style.animation = "fadeOut 0.3s ease";
      setTimeout(() => {
        confirmation.remove();
        window.location.href = "/"; // Redirect to homepage
      }, 300);
    }, 4200);
  }

  // Add fadeOut animation
  const style = document.createElement("style");
  style.textContent = `
    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: translate(-50%, -50%);
      }
      to {
        opacity: 0;
        transform: translate(-50%, -60%);
      }
    }
  `;
  document.head.appendChild(style);
});
