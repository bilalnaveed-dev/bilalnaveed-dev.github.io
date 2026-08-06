/* 
 * Muhammad Bilal Naveed - Portfolio Application Script
 * Features: Particle Network, Recruiter Matching, Modal Manager, Web3Forms Ajax
 * Graphic Designer Quality: 20 Years Experience Standard
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeToggle();
  initHeader();
  initMobileMenu();
  initParticleBackground();
  initRecruiterFilter();
  initProjectTabs();
  initCaseStudyModal();
  initContactForm();
  initScrollSpy();
});

/* ==========================================
   1. Header Scroll Effect
   ========================================== */
function initHeader() {
  const header = document.getElementById('main-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/* ==========================================
   2. Mobile Navigation Menu
   ========================================== */
function initMobileMenu() {
  const toggle = document.getElementById('mobile-toggle');
  const links = document.getElementById('nav-links');
  const navItems = links.querySelectorAll('a');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('active');
  });

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      toggle.classList.remove('active');
      links.classList.remove('active');
    });
  });
}

/* ==========================================
   3. Interactive Particle Canvas Background & Glitter Trail
   ========================================== */
function initParticleBackground() {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particlesArray = [];
  let trailParticles = [];
  const maxDistance = 120; // Max distance for drawing connecting lines
  
  // Mouse position tracking
  let mouse = {
    x: null,
    y: null,
    radius: 180
  };

  window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;

    // Spawn glitter trail sparks
    for (let k = 0; k < 2; k++) {
      trailParticles.push(new TrailParticle(mouse.x, mouse.y));
    }
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Handle Resize
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    initParticles();
  }
  window.addEventListener('resize', resizeCanvas);
  
  // Particle Class (Background Nodes)
  class Particle {
    constructor(x, y, directionX, directionY, size, color) {
      this.x = x;
      this.y = y;
      this.directionX = directionX;
      this.directionY = directionY;
      this.size = size;
      this.color = color;
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
      ctx.fillStyle = this.color;
      ctx.fill();
    }

    update() {
      // Check boundaries and bounce
      if (this.x > canvas.width || this.x < 0) {
        this.directionX = -this.directionX;
      }
      if (this.y > canvas.height || this.y < 0) {
        this.directionY = -this.directionY;
      }

      // Move particle
      this.x += this.directionX;
      this.y += this.directionY;

      // Mouse interactive push/pull (subtle)
      if (mouse.x !== null && mouse.y !== null) {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          // Push away slightly
          const force = (mouse.radius - distance) / mouse.radius;
          this.x -= (dx / distance) * force * 1.5;
          this.y -= (dy / distance) * force * 1.5;
        }
      }

      this.draw();
    }
  }

  // Trail Particle Class (Glitter Sparks)
  class TrailParticle {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.vx = (Math.random() - 0.5) * 2.2;
      this.vy = (Math.random() - 0.5) * 2.2;
      this.alpha = 1.0;
      this.decay = Math.random() * 0.025 + 0.018; // Fade speed
      this.size = Math.random() * 3.5 + 1.2;
      // Alternate between cyan/blue and gold sparks
      const isCyan = Math.random() > 0.45;
      this.color = isCyan ? 'rgba(0, 240, 255, ' : 'rgba(245, 158, 11, ';
      this.shadowColor = isCyan ? '#00f0ff' : '#f59e0b';
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.alpha -= this.decay;
      this.size -= 0.05;
      if (this.size < 0) this.size = 0;
    }

    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + this.alpha + ')';
      ctx.shadowBlur = 8;
      ctx.shadowColor = this.shadowColor;
      ctx.fill();
      ctx.restore();
    }
  }

  // Populate particles array
  function initParticles() {
    particlesArray = [];
    let numberOfParticles = Math.floor((canvas.width * canvas.height) / 12000);
    if (numberOfParticles > 100) numberOfParticles = 100;
    if (numberOfParticles < 30) numberOfParticles = 30;

    // Responsive palette based on active theme
    const isLight = document.body.classList.contains('light-mode');
    const colors = isLight ? [
      'rgba(6, 182, 212, 0.4)',  // Cyan
      'rgba(16, 185, 129, 0.35)', // Green
      'rgba(139, 92, 246, 0.3)',  // Purple
      'rgba(15, 23, 42, 0.12)'    // Soft Slate
    ] : [
      'rgba(0, 240, 255, 0.45)', // Cyan
      'rgba(16, 185, 129, 0.4)',  // Green
      'rgba(139, 92, 246, 0.3)',  // Purple
      'rgba(248, 250, 252, 0.25)' // Soft White
    ];

    for (let i = 0; i < numberOfParticles; i++) {
      let size = (Math.random() * 2) + 0.8;
      let x = Math.random() * (window.innerWidth - size * 2) + size;
      let y = Math.random() * (window.innerHeight - size * 2) + size;
      let directionX = (Math.random() * 0.4) - 0.2;
      let directionY = (Math.random() * 0.4) - 0.2;
      let color = colors[Math.floor(Math.random() * colors.length)];

      particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
    }
  }

  // Render & Connect Particles
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render background nodes
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update();
    }

    // Render mouse trail glitters
    for (let j = trailParticles.length - 1; j >= 0; j--) {
      trailParticles[j].update();
      if (trailParticles[j].alpha <= 0 || trailParticles[j].size <= 0) {
        trailParticles.splice(j, 1);
      } else {
        trailParticles[j].draw();
      }
    }

    connect();
    requestAnimationFrame(animate);
  }

  // Draw linking lines between close particles
  function connect() {
    let opacityValue = 1;
    const isLight = document.body.classList.contains('light-mode');
    
    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a + 1; b < particlesArray.length; b++) {
        let dx = particlesArray[a].x - particlesArray[b].x;
        let dy = particlesArray[a].y - particlesArray[b].y;
        let distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < maxDistance) {
          opacityValue = 1 - (distance / maxDistance);
          // Darker/fainter lines in light mode for readability
          ctx.strokeStyle = isLight 
            ? `rgba(15, 23, 42, ${opacityValue * 0.08})`
            : `rgba(0, 240, 255, ${opacityValue * 0.12})`;
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
          ctx.stroke();
        }
      }

      // Connect to mouse as well
      if (mouse.x !== null && mouse.y !== null) {
        let dx = particlesArray[a].x - mouse.x;
        let dy = particlesArray[a].y - mouse.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < mouse.radius) {
          opacityValue = 1 - (distance / mouse.radius);
          ctx.strokeStyle = isLight
            ? `rgba(6, 182, 212, ${opacityValue * 0.12})`
            : `rgba(0, 240, 255, ${opacityValue * 0.18})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  // Listen to theme change event to recreate particles with new colors
  window.addEventListener('theme-changed', () => {
    initParticles();
  });

  resizeCanvas();
  animate();
}

/* ==========================================
   4. Recruiter Fast-Track (Interactive Matcher)
   ========================================== */
function initRecruiterFilter() {
  const searchInput = document.getElementById('stack-search');
  const presetTags = document.querySelectorAll('.preset-tag');
  const projectCards = document.querySelectorAll('.project-card');
  const skillTags = document.querySelectorAll('.skill-tag');
  const searchFeedback = document.getElementById('search-feedback');
  const copyBtn = document.getElementById('btn-copy-email');
  const emailText = document.getElementById('email-text').innerText;
  const tooltip = document.getElementById('copy-tooltip');

  // Copy Email to Clipboard
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(emailText).then(() => {
      tooltip.classList.add('show');
      setTimeout(() => {
        tooltip.classList.remove('show');
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
    });
  });

  // Filter Trigger Logic
  function performFilter(query) {
    query = query.trim().toLowerCase();
    
    // Clear active preset tags if input changes
    if (query === "") {
      presetTags.forEach(t => t.classList.remove('active'));
    }

    let matchingProjectsCount = 0;
    
    // Filter Project Cards
    projectCards.forEach(card => {
      const techString = card.getAttribute('data-tech').toLowerCase();
      const isMatch = techString.includes(query);
      
      if (query === "") {
        card.classList.remove('fade-out');
        card.style.display = 'flex';
        matchingProjectsCount++;
      } else if (isMatch) {
        card.classList.remove('fade-out');
        card.style.display = 'flex';
        matchingProjectsCount++;
      } else {
        // Recruiter match effect: fade out non-matches
        card.classList.add('fade-out');
        // Optional: you can hide them completely, but visual fade is cleaner in "Matcher" mode.
        // Let's hide them if they are completely unrelated.
        card.style.display = 'none';
      }
    });

    // Highlight Matching Skills tags in Skills Grid
    skillTags.forEach(tag => {
      const skillName = tag.getAttribute('data-skill').toLowerCase();
      if (query !== "" && skillName.includes(query)) {
        // Highlight React-based stacks blue, and MongoDB/Node green
        if (skillName.includes('react') || skillName.includes('next') || skillName.includes('javascript')) {
          tag.classList.add('highlighted');
          tag.classList.remove('highlighted-green');
        } else {
          tag.classList.add('highlighted-green');
          tag.classList.remove('highlighted');
        }
      } else {
        tag.classList.remove('highlighted', 'highlighted-green');
      }
    });

    // Update feedback text
    if (query === "") {
      searchFeedback.innerText = `Showing all ${projectCards.length} projects`;
    } else {
      searchFeedback.innerText = `Found ${matchingProjectsCount} matching projects for "${query}"`;
    }
  }

  // Listen for search input typing
  searchInput.addEventListener('input', (e) => {
    performFilter(e.target.value);
  });

  // Listen for preset tags click
  presetTags.forEach(tag => {
    tag.addEventListener('click', () => {
      const isAlreadyActive = tag.classList.contains('active');
      
      presetTags.forEach(t => t.classList.remove('active'));
      
      if (isAlreadyActive) {
        searchInput.value = "";
        performFilter("");
      } else {
        tag.classList.add('active');
        const techVal = tag.getAttribute('data-tech');
        // Customize shorthand inputs
        let searchVal = techVal;
        if (techVal === 'mern') searchVal = 'react';
        searchInput.value = searchVal;
        performFilter(searchVal);
      }
    });
  });
}

/* ==========================================
   5. Project Tabs Filter (Category Toggles)
   ========================================== */
function initProjectTabs() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle button active state
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterVal = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-categories').split(' ');
        
        // Reset recruiter matcher fade effects first
        card.classList.remove('fade-out');

        if (filterVal === 'all' || categories.includes(filterVal)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Sync Search panel results text
      const visibleProjects = document.querySelectorAll('.project-card[style="display: flex;"]').length;
      document.getElementById('search-feedback').innerText = `Showing ${visibleProjects} projects in category`;
    });
  });
}

/* ==========================================
   6. Dynamic Case Study Modal Manager
   ========================================== */
const projectDetails = {
  smartcity: {
    title: 'Smart City ERP SaaS',
    subtitle: 'Multi-Tenant Real Estate Platform',
    stats: [
      { val: '80% Automation', lbl: 'Workflow Boost' },
      { val: '10+ Modules', lbl: 'Features Created' },
      { val: 'React/Node', lbl: 'Core Tech' }
    ],
    challenge: 'Real estate businesses struggle to manage booking pipelines, legal paperwork, and customer files across multiple offices and agents without manual errors and double-bookings.',
    solution: 'Designed and developed a multi-tenant ERP platform supporting role-based access control (RBAC), giving landlords, agents, and tenants isolated dashboards with automated property tracking.',
    contributions: [
      'Architected a multi-tenant backend architecture isolating client databases for enterprise security.',
      'Automated end-to-end booking contracts, reservation math, and installment timelines, replacing physical files.',
      'Built interactive SVG layouts mapping building plots, showing real-time occupancy status on vector overlays.',
      'Implemented full database normalization in MongoDB, utilizing populated references and composite indexes.'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'SVG Mapping', 'RBAC']
  },
  kidshub: {
    title: 'KidsHub LMS',
    subtitle: 'Gamified Learning System',
    stats: [
      { val: '4 Portals', lbl: 'Role Dashboards' },
      { val: 'Animation', lbl: 'Enriched UI' },
      { val: 'React/Flutter', lbl: 'Cross-Platform' }
    ],
    challenge: 'LMS platforms are routinely dry, rigid, and fail to provide primary students with motivating visual progress markers or teachers with intuitive learning diagnostics.',
    solution: 'Constructed an animation-enriched educational ecosystem containing mobile and web variants, customized interactive game templates, and progress visualizers.',
    contributions: [
      'Programmed 4 distinct dashboards for Students (mobile), Teachers, Parents, and Admins to handle grading workflows.',
      'Designed game engines using web Canvas coordinates to generate interactive pop-quizzes and math challenges.',
      'Integrated auto-grading microservices triggering immediate parent progress report cards.',
      'Crafted custom CSS animations and sound trigger hooks to keep elementary school students highly engaged.'
    ],
    tech: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Flutter', 'Web Canvas', 'Tailwind CSS']
  },
  aichatbot: {
    title: 'AI Chatbot Portal',
    subtitle: 'Full Stack Conversational AI',
    stats: [
      { val: 'Gemini API', lbl: 'Intelligence' },
      { val: 'OTP Auth', lbl: 'Secure Login' },
      { val: 'JWT Tokens', lbl: 'Session Security' }
    ],
    challenge: 'Many AI chatbot layers lack persistent conversation histories, session security, or responsive stream rendering, reducing user usability.',
    solution: 'Crafted a secure, database-backed chatbot interface using Google Gemini API offering seamless message loading and secure passwordless login.',
    contributions: [
      'Integrated Google Gemini API pipelines, managing chat history parameters for context-aware responses.',
      'Coded secure passwordless verification using Nodemailer email-OTP codes and JSON Web Tokens.',
      'Built persistent MongoDB database queries to auto-load past chat sessions seamlessly as the user scrolls.',
      'Engineered fluid typing stream renderings on the React frontend using text segment buffering.'
    ],
    tech: ['MERN Stack', 'Google Gemini API', 'JSON Web Tokens', 'Nodemailer', 'Vite', 'Tailwind CSS']
  },
  eyemouse: {
    title: 'Eye-Controlled Mouse',
    subtitle: 'Computer Vision Accessibility Tool',
    stats: [
      { val: 'Zero Hardware', lbl: 'Requirement' },
      { val: 'MediaPipe', lbl: 'Face Landmarks' },
      { val: 'OpenCV', lbl: 'Python Engine' }
    ],
    challenge: 'Physically disabled users are often locked out of computing systems due to the cost and complexity of custom head-mount mouse hardware.',
    solution: 'Engineered a lightweight python application converting standard webcams into gaze trackers capable of mouse navigation.',
    contributions: [
      'Utilized MediaPipe Face Mesh model to extract 468 3D facial coordinates at high frames per second.',
      'Authored gaze vector algorithms mapping eye movements directly to screen mouse coordinates.',
      'Wrote blink duration classification: single click, double click, and long clicks (drag-and-drop).',
      'Configured Kalman filters to eliminate webcam screen jitter, resulting in smooth mouse tracking.'
    ],
    tech: ['Python', 'OpenCV', 'MediaPipe', 'PyAutoGUI', 'Signal Processing']
  },
  crawler: {
    title: 'Automated Lead Crawler',
    subtitle: 'Lead Generation scraper',
    stats: [
      { val: 'Puppeteer', lbl: 'Headless Browser' },
      { val: 'Cheerio', lbl: 'DOM Traverser' },
      { val: 'JSON/CSV', lbl: 'Data Export' }
    ],
    challenge: 'Marketing campaigns require high quantities of business data, which generally takes employees hours of tedious manual copying and pasting.',
    solution: 'Formulated a multi-threaded web scraper running headless browsers to discover, clean, and structure email leads.',
    contributions: [
      'Built a crawler pipeline with Puppeteer to bypass rendering challenges on single-page websites.',
      'Utilized Cheerio query selectors to parse HTML structures and scrape emails, social profiles, and office locations.',
      'Coded automatic duplicate removal, phone syntax sanitization, and structured CSV generator.',
      'Created rotation user-agent variables to avoid crawler throttling on host servers.'
    ],
    tech: ['JavaScript', 'Node.js', 'Puppeteer', 'Cheerio', 'Data Mining']
  },
  smartquest: {
    title: 'Smart Quest System',
    subtitle: 'Academic Request Workflow',
    stats: [
      { val: 'Django Core', lbl: 'Python Backend' },
      { val: 'SQLite DB', lbl: 'Local Storage' },
      { val: 'Auto Escalation', lbl: 'Timer Tasks' }
    ],
    challenge: 'Academic petition requests in large universities easily get buried in physical mailboxes and long email chains without tracking mechanisms.',
    solution: 'Programmed an academic petition workflow tracker featuring approval hierarchies and automatic reviewer escalation.',
    contributions: [
      'Constructed a role-based workflow router (Student, Department Head, Dean) using Django authentication groups.',
      'Engineered automated request escalation: if a reviewer fails to respond in 48 hours, the request escalates.',
      'Developed real-time status trackers visually highlighting which reviewer currently holds the request.',
      'Created custom database fixtures in SQLite to mock departments, courses, and faculty hierarchies.'
    ],
    tech: ['Django', 'Python', 'SQLite', 'HTML/CSS', 'JavaScript', 'Role Workflows']
  }
};

function initCaseStudyModal() {
  const modal = document.getElementById('case-study-modal');
  const closeBtn = document.getElementById('btn-modal-close');
  const closeFooterBtn = document.getElementById('btn-modal-close-footer');
  const openButtons = document.querySelectorAll('[data-project-id]');
  
  // Modal DOM elements
  const modalSub = document.getElementById('modal-sub');
  const modalTitle = document.getElementById('modal-title');
  const modalBody = document.getElementById('modal-body-content');

  function openModal(projectId) {
    const data = projectDetails[projectId];
    if (!data) return;

    // Populate data
    modalSub.innerText = data.subtitle;
    modalTitle.innerText = data.title;

    // Build stats ribbon
    let statsHTML = `<div class="modal-stat-ribbon">`;
    data.stats.forEach(stat => {
      statsHTML += `
        <div class="modal-stat-box">
          <span class="val">${stat.val}</span>
          <span class="lbl">${stat.lbl}</span>
        </div>
      `;
    });
    statsHTML += `</div>`;

    // Build contributions list
    let contributionsHTML = `<ul>`;
    data.contributions.forEach(item => {
      contributionsHTML += `<li>${item}</li>`;
    });
    contributionsHTML += `</ul>`;

    // Build tech tags
    let techHTML = `<div class="project-tags" style="margin-top: 0.5rem;">`;
    data.tech.forEach(t => {
      techHTML += `<span class="project-tag" style="background: rgba(0, 240, 255, 0.06); color: var(--accent-cyan); border-color: rgba(0, 240, 255, 0.15);">${t}</span>`;
    });
    techHTML += `</div>`;

    // Build full body HTML
    modalBody.innerHTML = `
      ${statsHTML}
      
      <div class="modal-section">
        <h3>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
          The Challenge
        </h3>
        <p>${data.challenge}</p>
      </div>
      
      <div class="modal-section">
        <h3>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          The Solution & Outcome
        </h3>
        <p>${data.solution}</p>
      </div>
      
      <div class="modal-section">
        <h3>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
          Key Technical Accomplishments
        </h3>
        ${contributionsHTML}
      </div>

      <div class="modal-section">
        <h3>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
          Technologies Applied
        </h3>
        ${techHTML}
      </div>
    `;

    // Show modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('show');
    document.body.style.overflow = '';
  }

  // Event Listeners
  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const projId = btn.getAttribute('data-project-id');
      openModal(projId);
    });
  });

  closeBtn.addEventListener('click', closeModal);
  closeFooterBtn.addEventListener('click', closeModal);
  
  // Close on outer click
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close on Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      closeModal();
    }
  });
}

/* ==========================================
   7. Web3Forms Async Submit Handler
   ========================================== */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successOverlay = document.getElementById('form-success-overlay');
  const closeFeedbackBtn = document.getElementById('btn-close-feedback');
  
  const submitBtn = document.getElementById('btn-submit-form');
  const btnText = document.getElementById('btn-text');
  const btnIcon = document.getElementById('btn-icon');
  const btnSpinner = document.getElementById('btn-spinner');

  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Check access key
    const accessKeyInput = form.querySelector('input[name="access_key"]');
    if (accessKeyInput.value === 'YOUR_ACCESS_KEY_HERE') {
      // Default to a fallback mock submission behavior if user hasn't set their key,
      // letting the recruiter still interact with the form and see the success state!
      console.log('Using simulated contact submission (Access Key is placeholder).');
      showLoading(true);
      setTimeout(() => {
        showLoading(false);
        successOverlay.classList.add('show');
        form.reset();
      }, 1500);
      return;
    }

    showLoading(true);
    
    const formData = new FormData(form);
    
    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    })
    .then(async (response) => {
      let json = await response.json();
      showLoading(false);
      
      if (response.status === 200) {
        successOverlay.classList.add('show');
        form.reset();
      } else {
        console.error(json);
        alert(json.message || 'Something went wrong. Please try again.');
      }
    })
    .catch(error => {
      showLoading(false);
      console.error(error);
      alert('Network error. Please try again.');
    });
  });

  function showLoading(isLoading) {
    if (isLoading) {
      submitBtn.disabled = true;
      btnText.innerText = 'Sending...';
      btnIcon.style.display = 'none';
      btnSpinner.style.display = 'inline-block';
    } else {
      submitBtn.disabled = false;
      btnText.innerText = 'Send Message';
      btnIcon.style.display = 'inline-block';
      btnSpinner.style.display = 'none';
    }
  }

  // Close Success Overlay
  closeFeedbackBtn.addEventListener('click', () => {
    successOverlay.classList.remove('show');
  });
}

/* ==========================================
   8. Dark/Light Theme Manager
   ========================================== */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle');
  if (!toggleBtn) return;

  function setTheme(theme) {
    if (theme === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
    // Dispatch event to notify canvas colors
    window.dispatchEvent(new CustomEvent('theme-changed', { detail: theme }));
  }

  // Check saved preference or system time
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  } else {
    // Light mode during the day (6 AM - 6 PM), Dark mode at night (6 PM - 6 AM)
    const hour = new Date().getHours();
    const isDayTime = hour >= 6 && hour < 18;
    setTheme(isDayTime ? 'light' : 'dark');
  }

  toggleBtn.addEventListener('click', () => {
    const isCurrentlyLight = document.body.classList.contains('light-mode');
    const newTheme = isCurrentlyLight ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  });
}

/* ==========================================
   9. Scroll Spy Navigation Highlight
   ========================================== */
function initScrollSpy() {
  const sections = [
    document.getElementById('hero'),
    document.getElementById('recruiter-hub'),
    document.getElementById('skills'),
    document.getElementById('projects'),
    document.getElementById('experience'),
    document.getElementById('contact')
  ].filter(Boolean);

  const navLinks = {
    'hero': document.getElementById('lnk-home'),
    'recruiter-hub': document.getElementById('lnk-recruiter'),
    'skills': document.getElementById('lnk-skills'),
    'projects': document.getElementById('lnk-projects'),
    'experience': document.getElementById('lnk-experience'),
    'contact': document.getElementById('lnk-contact')
  };

  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    const scrollPos = window.scrollY + 120; // 120px offset for sticky header

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;

      if (scrollPos >= top && scrollPos < top + height) {
        currentSectionId = section.id;
      }
    });

    // Default to hero if at top of page
    if (window.scrollY < 100) {
      currentSectionId = 'hero';
    }

    Object.keys(navLinks).forEach(id => {
      const link = navLinks[id];
      if (link) {
        if (id === currentSectionId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });
}
