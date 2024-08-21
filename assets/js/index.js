document.addEventListener('DOMContentLoaded', () => {
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    const carousel = document.querySelector('.carousel');
    const carouselItems = document.querySelectorAll('.carousel_item');
    const indicatorsContainer = document.querySelector('.carousel_indicators');
    
    let currentIndex = 0;
  
    // Generate indicators dynamically
    carouselItems.forEach((item, index) => {
      const indicator = document.createElement('span');
      indicator.classList.add('indicator');
      indicator.setAttribute('data-slide', index);
      if (index === 0) {
        indicator.classList.add('active');
      }
      indicatorsContainer.appendChild(indicator);
    });
  
    const indicators = document.querySelectorAll('.indicator');
  
    function updateCarousel() {
      carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
      indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentIndex);
      });
    }
  
    prevButton.addEventListener('click', () => {
      currentIndex = (currentIndex > 0) ? currentIndex - 1 : indicators.length - 1;
      updateCarousel();
    });
  
    nextButton.addEventListener('click', () => {
      currentIndex = (currentIndex < indicators.length - 1) ? currentIndex + 1 : 0;
      updateCarousel();
    });
  
    indicators.forEach(indicator => {
      indicator.addEventListener('click', () => {
        currentIndex = parseInt(indicator.getAttribute('data-slide'));
        updateCarousel();
      });
    });
  
    updateCarousel();
  });

 window.onload = function() {
        const video = document.querySelector('.main_container_video');
        video.play().catch(error => {
            console.error('Error al intentar reproducir el video:', error);
        });
    };


let currentIndex = 0;

function showSlides(index) {
    const slides = document.querySelectorAll('.carousel-image');
    if (index >= slides.length) {
        currentIndex = 0; // Reiniciar al principio
    } else if (index < 0) {
        currentIndex = slides.length - 1; // Volver al final
    } else {
        currentIndex = index; // Actualizar el índice actual
    }

    slides.forEach((slide, i) => {
        slide.classList.remove('active');
        if (i === currentIndex) {
            slide.classList.add('active');
        }
    });
}

function moveSlide(n) {
    showSlides(currentIndex + n);
}

// Mostrar la primera imagen al cargar
document.addEventListener('DOMContentLoaded', () => {
    showSlides(currentIndex);
});



