// navigation bar
// This script handles the navigation bar's background color and position based on scroll
window.addEventListener('scroll', function () {
  const nav = document.getElementById('mainNav');
  if (window.scrollY > 10) {
    nav.classList.remove('bg-transparent', 'position-absolute');
    nav.classList.add('bg-light', 'sticky-top', 'shadow-sm');
    nav.querySelectorAll('.nav-link').forEach(link => link.classList.remove('text-black'));
  } else {
    nav.classList.add('bg-transparent', 'position-absolute');
    nav.classList.remove('bg-light', 'sticky-top', 'shadow-sm');
    nav.querySelectorAll('.nav-link').forEach(link => link.classList.add('text-black'));
  }
});

document.addEventListener("DOMContentLoaded", function() {
  // Load config to update images, social media links, and contact details
  fetch('./config.json')
    .then(response => response.json())
    .then(config => {
      document.getElementById('hero').style.backgroundImage = `url(${config.heroImage})`;
      document.querySelectorAll('.social-media a.facebook').forEach(link => link.href = config.facebook);
      document.querySelectorAll('.social-media a.twitter').forEach(link => link.href = config.twitter);
      document.querySelectorAll('.social-media a.instagram').forEach(link => link.href = config.instagram);
      document.getElementById('address').textContent = config.address;
      document.getElementById('phone').textContent = config.phone;
      document.getElementById('email').textContent = config.email;
    })
    .catch(error => console.error("Error loading config:", error));

  // Load and initialize services slider
  fetch('./services.json')
  .then(response => response.json())
  .then(services => {
    const servicesWrapper = document.querySelector('#services-slider .swiper-wrapper');
    services.forEach(service => {
      const slide = document.createElement('div');
      slide.className = "swiper-slide";
      slide.innerHTML = `
        <div class="card h-100">
          <img src="${service.image}" class="card-img-top" alt="${service.title}" onerror="this.onerror=null;this.src='images/default-services.jpg';">
          <div class="card-body">
            <h5 class="card-title">${service.title}</h5>
            <p class="card-text">${service.description}</p>
            <a href="${service.link}" class="btn btn-outline-primary">Contact Us</a>
          </div>
        </div>
      `;
      servicesWrapper.appendChild(slide);
    });

    new Swiper('#services-slider', {
      slidesPerView: 3,
      spaceBetween: 30,
      grid: {
        rows: 1,
        fill: 'row'
      },
      navigation: {
        nextEl: "#services-slider .swiper-button-next",
        prevEl: "#services-slider .swiper-button-prev"
      },
      breakpoints: {
        992: { slidesPerView: 3 }, //desktop
        768: { slidesPerView: 2 },
        576: { slidesPerView: 1 },
        0: { slidesPerView: 1 }    // Mobile
      }
    });
  })
  .catch(error => console.error("Error loading services:", error));

  // Load and initialize packages slider
  fetch('./packages.json')
  .then(response => response.json())
  .then(packages => {
    const packagesWrapper = document.querySelector('#packages-slider .swiper-wrapper');
    packages.forEach(pkg => {
      const slide = document.createElement('div');
      slide.className = "swiper-slide";
      slide.innerHTML = `
        <div class="card h-100">
          <img src="${pkg.image}" class="card-img-top" alt="${pkg.title}" onerror="this.onerror=null;this.src='images/default-package.jpg';">
          <div class="card-body">
            <h5 class="card-title">${pkg.title}</h5>
            <p class="card-text">${pkg.description}</p>
            <a href="${pkg.link}" class="btn btn-outline-primary">Contact Us</a>
          </div>
        </div>
      `;
      packagesWrapper.appendChild(slide);
    });

    new Swiper('#packages-slider', {
      slidesPerView: 3, 
      spaceBetween: 30,
      grid: {
      rows: 1,
      fill: 'row'
      },
      navigation: {
      nextEl: "#packages-slider .swiper-button-next",
      prevEl: "#packages-slider .swiper-button-prev"
      },
      breakpoints: {
        992: { slidesPerView: 3 }, //desktop
        768: { slidesPerView: 2 },
        576: { slidesPerView: 1 },
        0: { slidesPerView: 1 }    // Mobile
      }
    });
  })
  .catch(error => console.error("Error loading packages:", error));

  // Load testimonials data
  fetch('./testimonials.json')
  .then(response => response.json())
  .then(testimonials => {
    const testimonialsWrapper = document.querySelector('#testimonials-slider .swiper-wrapper');
    testimonials.forEach(testimonial => {
      const slide = document.createElement('div');
      slide.className = "swiper-slide";
      slide.innerHTML = `
        <div class="card p-3">
          <div class="card-body text-center">
            <img src="${testimonial.image}" alt="${testimonial.author}" class="rounded-circle mb-3" style="width:80px; height:80px; object-fit:cover;" onerror="this.onerror=null; this.src='images/default-profile.png';">
            <p class="card-text">"${testimonial.text}"</p>
            <h6 class="text-end">- ${testimonial.author}</h6>
          </div>
        </div>
      `;
      testimonialsWrapper.appendChild(slide);
    });

    new Swiper('#testimonials-slider', {
      slidesPerView: 1,
      spaceBetween: 10,
      pagination: {
        el: "#testimonials-slider .swiper-pagination",
        clickable: true
      },
      autoplay: { delay: 5000 }
    });
  })
  .catch(error => console.error("Error loading testimonials:", error));
});
