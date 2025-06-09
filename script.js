// Carousel Functionality
const carousel = document.querySelector('.carousel');
const images = document.querySelectorAll('.carousel img');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 0;

function showImage(index) {
  if (index >= images.length) currentIndex = 0;
  if (index < 0) currentIndex = images.length - 1;
  carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
}

prevBtn.addEventListener('click', () => {
  currentIndex--;
  showImage(currentIndex);
});

nextBtn.addEventListener('click', () => {
  currentIndex++;
  showImage(currentIndex);
});

// Auto-slide every 5 seconds
setInterval(() => {
  currentIndex++;
  showImage(currentIndex);
}, 5000);

// Reservation System
const reservationForm = {
  sessionType: document.getElementById('session-type'),
  sessionDate: document.getElementById('session-date'),
  participants: document.getElementById('participants'),
  email: document.getElementById('email'),
  submitBtn: document.getElementById('submit-reservation'),
  status: document.getElementById('reservation-status')
};

reservationForm.submitBtn.addEventListener('click', () => {
  const { sessionType, sessionDate, participants, email, status } = reservationForm;
  
  // Validation
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

  // Mock reservation
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

  // Success message
  status.textContent = `Reserva confirmada para ${sessionType.value} el ${sessionDate.value}. Te enviaremos detalles a ${email.value}.`;
  status.className = 'success';
  status.style.display = 'block';

  // Reset form
  sessionType.value = '';
  sessionDate.value = '';
  participants.value = '';
  email.value = '';
});