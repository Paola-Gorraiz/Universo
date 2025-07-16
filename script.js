// Carrusel Funcional
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function showImage(index) {
  // Ensure index stays within bounds
  if (index >= images.length) currentIndex = 0;
  else if (index < 0) currentIndex = images.length - 1;
  else currentIndex = index;


  const containerWidth = carousel.parentElement.offsetWidth; // Width of .carousel-container
  carousel.style.transform = `translateX(-${currentIndex * containerWidth}px)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex--;
  showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex++;
  showImage(currentIndex);
});
// carousel aligned
window.addEventListener('resize', () => {
  showImage(currentIndex); // Recalculate translation on resize
});

// correct positioning
showImage(currentIndex);
      
let autoSlide = setInterval(() => {
  currentIndex++;
  showImage(currentIndex);
}, 5000); // Slide every 5 seconds

// Pause auto-slide on hover
carousel.parentElement.addEventListener('mouseenter', () => clearInterval(autoSlide));
carousel.parentElement.addEventListener('mouseleave', () => {
  autoSlide = setInterval(() => {
    currentIndex++;
    showImage(currentIndex);
  }, 5000);
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowLeft') {
    currentIndex--;
    showImage(currentIndex);
  } else if (e.key === 'ArrowRight') {
    currentIndex++;
    showImage(currentIndex);
  }
});

// Hamburger Menu Functionality
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
    });

     // Close menu when clicking a link
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
      });
    });

// Reservacion 
const reservationForm = {
  sessionType: Document.getElementById('session-type'),
  sessionDate: Document.getElementById('session-date'),
  participants: Document.getElementById('participants'),
  email: Document.getElementById('email'),
  submitBtn: Document.getElementById('submit-reservation'),
  status: Document.getElementById('reservation-status')
};

reservationForm.submitBtn.addEventListener('click', () => {
  const { sessionType, sessionDate, participants, email, status } = reservationForm;
  
  // Validacion
  if (!sessionType.value || !sessionDate.value || !participants.value || !email.value) {
    status.textContent = 'Por favor, completa todos los campos.';
    status.className = 'error';
    status.style.display = 'block';
    return;
  }

  const today = new Date();
  const selectedDate = new Date(sessionDate.value);
  if (selectedDate < today) {
    status.textContent = 'La fecha debe ser en el futuro.';
    status.className = 'error';
    status.style.display = 'block';
    return;
  }

  if (!email.value.includes('@')) {
    status.textContent = 'Por favor, ingresa un correo válido.';
    status.className = 'error';
    status.style.display = 'block';
    return;
  }

  // Mock reservacion
  const reservation = {
    id: Date.now(),
    session: sessionType.value,
    date: sessionDate.value,
    participants: participants.value,
    email: email.value
  };

  // Store in localStorage
  let reservations = JSON.parse(localStorage.getItem('reservations') || '[]');
  reservations.push(reservation);
  localStorage.setItem('reservations', JSON.stringify(reservations));

  // mensajes
  status.textContent = `Reserva confirmada para ${sessionType.value} el ${sessionDate.value}. Te enviaremos detalles a ${email.value}.`;
  status.className = 'success';
  status.style.display = 'block';

  // Reset
  sessionType.value = '';
  sessionDate.value = '';
  participants.value = '';
  email.value = '';
});
// Envío del mensaje de contacto
const contactForm = document.getElementById('contact-form');
const contactStatus = document.getElementById('contact-status');

contactForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const nombre = contactForm.nombre.value.trim();
  const mensaje = contactForm.mensaje.value.trim();

  if (!nombre || !mensaje) {
    contactStatus.textContent = 'Por favor completa todos los campos.';
    contactStatus.className = 'text-red-500';
    return;
  }

  // Simulación de envío
  console.log('Mensaje enviado:');
  console.log('Nombre:', nombre);
  console.log('Mensaje:', mensaje);

  contactStatus.textContent = 'Tu mensaje ha sido enviado con éxito.';
  contactStatus.className = 'text-green-500';

  contactForm.reset();
});