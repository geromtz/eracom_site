document.addEventListener("DOMContentLoaded", function() {
    const brands = [
      { name: "HP", imgSrc: "../assets/img/brands/hp_logo.png" },
      { name: "Apple", imgSrc: "../assets/img/brands/apple_logo.png" },
      { name: "Logitech", imgSrc: "../assets/img/brands/logitech_logo.png" },
      { name: "Microsoft", imgSrc: "../assets/img/brands/microsoft_logo.png" },
      { name: "Lenovo", imgSrc: "../assets/img/brands/lenovo_logo.png" },
      { name: "Dell", imgSrc: "../assets/img/brands/dell_logo.png" },
      { name: "Intel", imgSrc: "../assets/img/brands/intel_logo.png" },
      { name: "Hikvision", imgSrc: "../assets/img/brands/hikvision_logo.png" },
      { name: "Adata", imgSrc: "../assets/img/brands/adata_logo.png" }
    ];

});



const tags = [
  'JavaScript', 'HTML', 'CSS', 'PHP', 'Node.js', 
  'React', 'Vue.js', 'Angular', 'SASS', 'Webpack',
  'jQuery', 'Bootstrap', 'Python', 'Django', 'Flask',
  'Ruby', 'Rails', 'Java', 'Spring', 'Hibernate'
];

const sphere = document.getElementById('tagcloud');
const radius = 150;
const tagElements = [];
let lastX, lastY;
let isDragging = false;
let velocityX = 0, velocityY = 0;
const friction = 0.95;
const impulse = 0.05;

const createTagElement = (text, x, y, z) => {
  const tagElement = document.createElement('a');
  tagElement.className = 'tag';
  tagElement.href = '#';
  tagElement.innerText = text;
  tagElement.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
  sphere.appendChild(tagElement);
  return tagElement;
};

const initTags = () => {
  const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle
  tags.forEach((tag, index) => {
      const y = 1 - (index / (tags.length - 1)) * 2;
      const radius = Math.sqrt(1 - y * y);
      const theta = phi * index;
      const x = Math.cos(theta) * radius * 150;
      const z = Math.sin(theta) * radius * 150;
      const tagElement = createTagElement(tag, x, y * 150, z);
      tagElements.push({ element: tagElement, x, y: y * 150, z });
  });
};

const rotateSphere = (deltaX, deltaY) => {
  const angleX = deltaX * 0.004;
  const angleY = deltaY * 0.004;

  const cosX = Math.cos(angleX);
  const sinX = Math.sin(angleX);
  const cosY = Math.cos(angleY);
  const sinY = Math.sin(angleY);

  tagElements.forEach(tag => {
      let { x, y, z, element } = tag;

      // Rotate around Y axis
      let newX = x * cosY - z * sinY;
      let newZ = z * cosY + x * sinY;
      x = newX;
      z = newZ;

      // Rotate around X axis
      let newY = y * cosX - z * sinX;
      z = z * cosX + y * sinX;
      y = newY;

      tag.x = x;
      tag.y = y;
      tag.z = z;

      element.style.transform = `translate3d(${x}px, ${y}px, ${z}px)`;
  });
};

const animateSphere = () => {
  if (velocityX || velocityY) {
      rotateSphere(velocityX, velocityY);
      velocityX *= friction;
      velocityY *= friction;
      requestAnimationFrame(animateSphere);
  }
};

const startDrag = (x, y) => {
  lastX = x;
  lastY = y;
  isDragging = true;
  sphere.style.cursor = 'grabbing';
};

const drag = (x, y) => {
  if (isDragging) {
      const deltaX = x - lastX;
      const deltaY = y - lastY;
      rotateSphere(deltaX, deltaY);
      lastX = x;
      lastY = y;
  }
};

const endDrag = (x, y) => {
  if (isDragging) {
      isDragging = false;
      sphere.style.cursor = 'grab';
      velocityX = (lastX - x) * impulse;
      velocityY = (lastY - y) * impulse;
      requestAnimationFrame(animateSphere);
  }
};

sphere.addEventListener('mousedown', (event) => {
  startDrag(event.clientX, event.clientY);
});

sphere.addEventListener('mousemove', (event) => {
  drag(event.clientX, event.clientY);
});

sphere.addEventListener('mouseup', (event) => {
  endDrag(event.clientX, event.clientY);
});

sphere.addEventListener('touchstart', (event) => {
  const touch = event.touches[0];
  startDrag(touch.clientX, touch.clientY);
});

sphere.addEventListener('touchmove', (event) => {
  const touch = event.touches[0];
  drag(touch.clientX, touch.clientY);
});

sphere.addEventListener('touchend', (event) => {
  const touch = event.changedTouches[0];
  endDrag(touch.clientX, touch.clientY);
});

document.addEventListener('wheel', (event) => {
  event.preventDefault();
});

initTags();