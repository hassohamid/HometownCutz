document.addEventListener("DOMContentLoaded", function () {
  const services = [
    {
      name: "Classic Haircut",
      description: "Precision cut tailored to your style",
      price: "$30",
      category: "haircut",
      image: "images/classic-cut.jpg",
    },
    {
      name: "Hot Towel Shave",
      description: "Traditional straight razor experience",
      price: "$25",
      category: "facial",
      image: "images/hot-towel.jpg",
    },
    {
      name: "Beard Trim",
      description: "Shape and style your facial hair",
      price: "$20",
      category: "facial",
      image: "images/beard-trim.jpg",
    },
    {
      name: "Kids Cut",
      description: "Gentle styling for our younger clients",
      price: "$25",
      category: "haircut",
      image: "images/kids-cut.jpg",
    },
    {
      name: "Fade",
      description: "Seamless gradient from skin to length",
      price: "$35",
      category: "haircut",
      image: "images/fade.jpg",
    },
    {
      name: "Line Up",
      description: "Clean, sharp edges and precise lines",
      price: "$15",
      category: "special",
      image: "images/lineup.jpg",
    },
    {
      name: "Hair Design",
      description: "Custom hair art and patterns",
      price: "$45",
      category: "special",
      image: "images/design.jpg",
    },
    {
      name: "Hair Color",
      description: "Professional coloring and highlights",
      price: "$60",
      category: "special",
      image: "images/color.jpg",
    },
    {
      name: "Facial Treatment",
      description: "Relaxing facial with hot towel",
      price: "$35",
      category: "facial",
      image: "images/facial.jpg",
    },
    {
      name: "Full Package",
      description: "Haircut, beard trim, and facial",
      price: "$75",
      category: "special",
      image: "images/package.jpg",
    },
  ];

  const servicesGrid = document.querySelector(".services-grid");
  const filterBtns = document.querySelectorAll(".filter-btn");

  // Initial render
  renderServices("all");

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      renderServices(btn.dataset.filter);
    });
  });

  function renderServices(filter) {
    servicesGrid.innerHTML = "";

    const filteredServices =
      filter === "all"
        ? services
        : services.filter((service) => service.category === filter);

    filteredServices.forEach((service, index) => {
      const delay = index * 100; // Stagger animation
      const serviceCard = document.createElement("div");
      serviceCard.className = "service-card";
      serviceCard.style.animationDelay = `${delay}ms`;

      serviceCard.innerHTML = `
        <div class="service-image" style="background-image: url(${service.image})"></div>
        <div class="service-content">
          <h3>${service.name}</h3>
          <p>${service.description}</p>
          <span class="service-price">${service.price}</span>
        </div>
      `;

      servicesGrid.appendChild(serviceCard);
    });
  }
});
