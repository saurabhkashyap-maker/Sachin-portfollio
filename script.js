/* ============ PARTICLES ============ */
const canvas = document.getElementById('particles');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle{
  constructor(){
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 2 + 0.5;
  }
  update(){
    this.x += this.vx; this.y += this.vy;
    if(this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if(this.y < 0 || this.y > canvas.height) this.vy *= -1;
  }
  draw(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(99,102,241,0.6)';
    ctx.fill();
  }
}
function initParticles(){
  particles = [];
  const count = Math.min(80, Math.floor(window.innerWidth / 20));
  for(let i = 0; i < count; i++) particles.push(new Particle());
}
initParticles();
window.addEventListener('resize', initParticles);

function connectParticles(){
  for(let i = 0; i < particles.length; i++){
    for(let j = i + 1; j < particles.length; j++){
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      if(dist < 120){
        ctx.beginPath();
        ctx.strokeStyle = `rgba(99,102,241,${1 - dist/120})`;
        ctx.lineWidth = 0.5;
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.stroke();
      }
    }
  }
}
function animateParticles(){
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  connectParticles();
  requestAnimationFrame(animateParticles);
}
animateParticles();

/* ============ CURSOR GLOW ============ */
const glow = document.querySelector('.cursor-glow');
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top = e.clientY + 'px';
});

/* ============ TYPING EFFECT ============ */
const roles = ['Developer', 'Designer', 'Student', 'AI Builder'];
let roleIndex = 0, charIndex = 0, deleting = false;
const typedEl = document.getElementById('typed');

function type(){
  const current = roles[roleIndex];
  typedEl.textContent = deleting
    ? current.substring(0, charIndex--)
    : current.substring(0, charIndex++);
  let speed = deleting ? 60 : 120;
  if(!deleting && charIndex === current.length + 1){ deleting = true; speed = 1500; }
  else if(deleting && charIndex === 0){
    deleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    speed = 500;
  }
  setTimeout(type, speed);
}
type();

/* ============ SCROLL REVEAL ============ */
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add('active');
      const bar = entry.target.querySelector('.bar div');
      if(bar) setTimeout(() => { bar.style.width = bar.dataset.width; }, 200);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach(el => revealObserver.observe(el));

/* ============ KAIRA AI LIVE EMBED ============ */
const tryBtn = document.getElementById('tryKairaBtn');
const iframeWrap = document.getElementById('iframeWrap');
const kairaIframe = document.getElementById('kairaIframe');
const closeIframeBtn = document.getElementById('closeIframe');
const featuredPreview = document.getElementById('kairaPreview');

tryBtn.addEventListener('click', () => {
  if(!kairaIframe.src.includes('github.io')){
    kairaIframe.src = kairaIframe.dataset.src;
  }
  iframeWrap.classList.add('active');
  featuredPreview.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

closeIframeBtn.addEventListener('click', () => {
  iframeWrap.classList.remove('active');
});

/* ============ CONTACT FORM (FormSubmit.co) ============ */
const form = document.getElementById('contactForm');
const status = document.getElementById('formStatus');
const submitBtn = form.querySelector('.submit-btn');

// 👉 Aapka email — FormSubmit baaki sab handle karega
const FORMSUBMIT_EMAIL = 'saurabhhkashyap302@gmail.com';

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();

  // Validation
  if(!name || !email || !message){
    status.textContent = '⚠️ Please fill in all fields.';
    status.className = 'form-status error';
    return;
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRegex.test(email)){
    status.textContent = '⚠️ Please enter a valid email.';
    status.className = 'form-status error';
    return;
  }

  // Loading state
  submitBtn.classList.add('loading');
  submitBtn.disabled = true;
  status.textContent = '';
  status.className = 'form-status';

  try {
    const res = await fetch(`https://formsubmit.co/ajax/${FORMSUBMIT_EMAIL}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        message: message,
        _subject: `🚀 New Portfolio Message from ${name}`,
        _template: 'table',
        _captcha: 'false'
      })
    });

    const data = await res.json();

    if(!res.ok || !data.success){
      throw new Error('FormSubmit failed');
    }

    status.textContent = `✅ Thanks ${name}! Your message has been sent.`;
    status.className = 'form-status success';
    form.reset();
    setTimeout(() => {
      status.textContent = '';
      status.className = 'form-status';
    }, 5000);
  } catch(err){
    console.error('FormSubmit error:', err);
    status.textContent = '❌ Something went wrong. Please try again.';
    status.className = 'form-status error';
  } finally {
    submitBtn.classList.remove('loading');
    submitBtn.disabled = false;
  }
});

/* ============ SMOOTH SCROLL ============ */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
