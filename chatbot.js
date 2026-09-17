/* =========================================================
   SACHIN'S PERSONAL CHATBOT
========================================================= */

const SACHIN_DATA = {
  name: "Sachin Thakur",
  role: "Frontend Developer & B.Tech AI/ML Student",
  location: "India",
  phone: "6202335663",
  email: "saurabhhkashyap302@gmail.com",
  education: "B.Tech in Artificial Intelligence & Machine Learning (currently pursuing)",
  experience: "Frontend Developer — 1+ years of hands-on project experience",
  skills: {
    HTML5: "95%",
    "CSS3 / Tailwind": "90%",
    JavaScript: "88%",
    "React.js": "85%",
    "Git & GitHub": "80%",
    "Python (AI/ML)": "75%",
    "Responsive Design": "92%",
    "REST APIs": "78%"
  },
  projects: [
    {
      name: "Kaira AI — Voice Assistant",
      desc: "Voice-enabled AI assistant built from scratch. Talks, listens and opens apps via voice commands.",
      tech: "HTML, CSS, JavaScript, Web Speech API",
      live: "https://saurabhkashyap-maker.github.io/ai/"
    }
  ],
  about: "Sachin is a passionate Frontend Developer and B.Tech AI/ML student. He built Kaira AI — a voice assistant that runs entirely in the browser. He's open to internships and freelance work."
};

/* ============ INTENTS ============ */
const INTENTS = [
  {
    keywords: ['hi','hello','hey','namaste','hlo','yo'],
    reply: () => `Hi! 👋 I'm Sachin's AI assistant. Ask me about his skills, projects (including Kaira AI 🤖), education or contact info.`
  },
  {
    keywords: ['kaira','voice assistant','voice ai','assistant'],
    reply: () => `🤖 <strong>Kaira AI</strong> is Sachin's flagship project — a voice-enabled AI assistant that runs entirely in the browser.\n\nIt can:\n• Talk & respond to your questions\n• Open apps like YouTube, WhatsApp, Instagram via voice\n• Listen using the Web Speech API\n\nBuilt with pure HTML, CSS & JavaScript. Scroll up to the Projects section and click <strong>"Try Kaira AI Live"</strong> to use it right here! 🚀`
  },
  {
    keywords: ['skill','skills','tech','technolog','know','expert','stack'],
    reply: () => {
      const list = Object.entries(SACHIN_DATA.skills).map(([k,v]) => `• ${k} — ${v}`).join('\n');
      return `Sachin's tech skills 💻:\n\n${list}\n\nHe specializes in frontend development with React & Tailwind.`;
    }
  },
  {
    keywords: ['project','projects','work','built','portfolio','made'],
    reply: () => {
      const list = SACHIN_DATA.projects.map((p,i) =>
        `${i+1}. <strong>${p.name}</strong>\n   ${p.desc}\n   Tech: ${p.tech}`
      ).join('\n\n');
      return `Here are Sachin's projects 🚀:\n\n${list}\n\nYou can try Kaira AI live right on this page — check the Projects section!`;
    }
  },
  {
    keywords: ['education','study','college','btech','degree','student','university'],
    reply: () => `🎓 ${SACHIN_DATA.education}. He's combining his AI/ML knowledge with frontend development to build smarter web apps.`
  },
  {
    keywords: ['contact','email','phone','reach','hire','call','number','mobile'],
    reply: () => `📬 You can reach Sachin at:\n\n📧 Email: ${SACHIN_DATA.email}\n📱 Phone: ${SACHIN_DATA.phone}\n\nOr just fill the contact form on this page — he'll get back to you soon!`
  },
  {
    keywords: ['experience','years','worked','company','job','intern'],
    reply: () => `💼 ${SACHIN_DATA.experience}. He's built real projects like Kaira AI and is currently open to internships & freelance work.`
  },
  {
    keywords: ['about','who','yourself','intro','introduction','tell me'],
    reply: () => `👨‍💻 ${SACHIN_DATA.about}`
  },
  {
    keywords: ['hire','available','freelance','internship','opportunity'],
    reply: () => `✅ Yes! Sachin is currently available for freelance projects and internships. Contact him at ${SACHIN_DATA.email} or ${SACHIN_DATA.phone}.`
  },
  {
    keywords: ['location','where','city','live','based'],
    reply: () => `📍 Sachin is based in ${SACHIN_DATA.location}. He works remotely and is open to opportunities anywhere.`
  },
  {
    keywords: ['resume','cv','download'],
    reply: () => `📄 Sachin's resume is available on request. Just drop him a mail at ${SACHIN_DATA.email} and he'll share it!`
  },
  {
    keywords: ['react','frontend','javascript','html','css','tailwind'],
    reply: () => `Sachin is highly skilled in React.js, JavaScript, HTML, CSS and Tailwind CSS. Check the Skills section for full details! 💻`
  },
  {
    keywords: ['ai','ml','machine learning','artificial'],
    reply: () => `🤖 Sachin is pursuing B.Tech in AI/ML and already built <strong>Kaira AI</strong> — a working voice assistant. He's blending AI knowledge with web dev to build next-gen apps.`
  },
  {
    keywords: ['thank','thanks','thx','bye','ok','great'],
    reply: () => `You're welcome! 😊 Feel free to ask anything else, or reach out to Sachin directly at ${SACHIN_DATA.email}.`
  }
];

/* ============ BOT LOGIC ============ */
function getBotReply(userMsg){
  const msg = userMsg.toLowerCase().trim();
  for(const intent of INTENTS){
    if(intent.keywords.some(k => msg.includes(k))) return intent.reply();
  }
  return `Hmm, I'm not sure about that 🤔. Try asking about Sachin's:\n• Skills\n• Kaira AI project\n• Education\n• Experience\n• Contact info\n\nOr email him directly at ${SACHIN_DATA.email}`;
}

/* ============ UI ============ */
const chatToggle = document.getElementById('chatToggle');
const chatWindow = document.getElementById('chatWindow');
const chatClose = document.getElementById('chatClose');
const chatBody = document.getElementById('chatBody');
const chatInput = document.getElementById('chatInput');
const chatSend = document.getElementById('chatSend');
const suggestions = document.getElementById('suggestions');

chatToggle.addEventListener('click', () => {
  chatWindow.classList.toggle('open');
  if(chatWindow.classList.contains('open')) chatInput.focus();
});
chatClose.addEventListener('click', () => chatWindow.classList.remove('open'));

function addMessage(text, sender){
  const div = document.createElement('div');
  div.className = `msg ${sender}`;
  div.innerHTML = text.replace(/\n/g, '<br>');
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
  return div;
}

function showTyping(){
  const div = document.createElement('div');
  div.className = 'msg bot typing';
  div.innerHTML = '<span></span><span></span><span></span>';
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
  return div;
}

function handleUserMessage(text){
  if(!text.trim()) return;
  addMessage(text, 'user');
  chatInput.value = '';
  if(suggestions) suggestions.style.display = 'none';

  const typingEl = showTyping();
  const reply = getBotReply(text);

  setTimeout(() => {
    typingEl.remove();
    addMessage(reply, 'bot');
  }, 700 + Math.random() * 500);
}

chatSend.addEventListener('click', () => handleUserMessage(chatInput.value));
chatInput.addEventListener('keypress', (e) => {
  if(e.key === 'Enter') handleUserMessage(chatInput.value);
});

if(suggestions){
  suggestions.querySelectorAll('button').forEach(btn => {
    btn.addEventListener('click', () => handleUserMessage(btn.dataset.q));
  });
}

setTimeout(() => {
  if(!chatWindow.classList.contains('open')){
    chatToggle.style.animation = 'pulse 1s infinite';
  }
}, 8000);
