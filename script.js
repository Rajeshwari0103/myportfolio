// script.js — Frontend JavaScript
// Hosted on: GitHub Pages
// Backend API: Render

// ⚠️ Replace this with your actual Render backend URL after deploying
const BACKEND_URL = 'https://your-backend-name.onrender.com';

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const name    = document.getElementById('name').value.trim();
  const email   = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const status  = document.getElementById('formStatus');

  status.textContent = 'Sending...';

  try {
    const res = await fetch(`${BACKEND_URL}/contact`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, message })
    });

    const data = await res.json();

    if (res.ok) {
      status.textContent = '✅ Message sent! I will get back to you soon.';
      document.getElementById('contactForm').reset();
    } else {
      status.textContent = '❌ Error: ' + (data.error || 'Something went wrong.');
    }
  } catch (err) {
    status.textContent = '⚠️ Could not reach server. Make sure backend is running on Render.';
  }
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});