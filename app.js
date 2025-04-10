document.addEventListener("DOMContentLoaded", function() {
  // Load config to update images, social media links, and contact details
  fetch('./config.json')
    .then(response => response.json())
    .then(config => {
      // Set the hero background image from config.heroImage
      document.getElementById('hero').style.backgroundImage = `url(${config.heroImage})`;
      
      // Update social media links in contact section
      document.querySelectorAll('.social-media a.facebook').forEach(link => link.href = config.facebook);
      document.querySelectorAll('.social-media a.twitter').forEach(link => link.href = config.twitter);
      document.querySelectorAll('.social-media a.instagram').forEach(link => link.href = config.instagram);
      
      // Update contact details from config
      document.getElementById('address').textContent = config.address;
      document.getElementById('phone').textContent = config.phone;
      document.getElementById('email').textContent = config.email;
    })
    .catch(error => console.error("Error loading config:", error));

  // Load packages data and initialize packages slider
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
      // Initialize Swiper for packages with a 2-row grid and improved mousewheel control
      new Swiper('#packages-slider', {
        slidesPerView: 3,
        spaceBetween: 30,
        grid: {
          rows: 2,
          fill: 'row'
        },
        mousewheel: {
          forceToAxis: true,
          releaseOnEdges: true,
        },
        navigation: {
          nextEl: "#packages-slider .swiper-button-next",
          prevEl: "#packages-slider .swiper-button-prev"
        },
        breakpoints: {
          992: { slidesPerView: 3 },
          768: { slidesPerView: 2 },
          576: { slidesPerView: 1 }
        }
      });
    })
    .catch(error => console.error("Error loading packages:", error));

  // Load testimonials data and initialize testimonials slider
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
      // Initialize Swiper for testimonials (1 slide per view)
      new Swiper('#testimonials-slider', {
        slidesPerView: 1,
        spaceBetween: 10,
        mousewheel: {
          forceToAxis: true,
          releaseOnEdges: true,
        },
        pagination: {
          el: "#testimonials-slider .swiper-pagination",
          clickable: true
        },
        autoplay: {
          delay: 5000
        }
      });
    })
    .catch(error => console.error("Error loading testimonials:", error));
});
