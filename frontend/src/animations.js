// Animações e Interações Modernas para o Site

// Efeito de parallax suave no scroll
export const initParallax = () => {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.parallax');
    
    parallaxElements.forEach(element => {
      const speed = element.dataset.speed || 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
};

// Animação de contadores (números incrementando)
export const animateCounters = () => {
  console.log('🔢 Iniciando animação de contadores...');
  const counters = document.querySelectorAll('[data-count]');
  console.log('📊 Contadores encontrados:', counters.length);
  
  const animateCounter = (counter) => {
    const target = parseInt(counter.dataset.count);
    console.log(`🎯 Animando contador para: ${target}`);
    const duration = 2000; // 2 segundos
    const increment = target / (duration / 16); // 60 FPS
    let current = 0;
    
    const updateCounter = () => {
      current += increment;
      if (current < target) {
        counter.textContent = Math.ceil(current);
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target;
        console.log(`✅ Contador finalizado em: ${target}`);
      }
    };
    
    updateCounter();
  };
  
  // Intersection Observer para animar quando visível
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      console.log('👁️ Contador observado:', entry.target.dataset.count, 'visível:', entry.isIntersecting);
      if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
        console.log('🚀 Iniciando animação do contador:', entry.target.dataset.count);
        animateCounter(entry.target);
        entry.target.classList.add('animated');
      }
    });
  }, { threshold: 0.5 });
  
  counters.forEach(counter => {
    console.log('👀 Observando contador:', counter.dataset.count);
    observer.observe(counter);
  });
};

// Efeito de reveal ao scroll (aparecer suavemente)
export const initScrollReveal = () => {
  const revealElements = document.querySelectorAll('.reveal');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });
  
  revealElements.forEach(element => revealObserver.observe(element));
};

// Efeito de cursor customizado (opcional)
export const initCustomCursor = () => {
  const cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  document.body.appendChild(cursor);
  
  const cursorDot = document.createElement('div');
  cursorDot.className = 'custom-cursor-dot';
  document.body.appendChild(cursorDot);
  
  document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    
    setTimeout(() => {
      cursorDot.style.left = e.clientX + 'px';
      cursorDot.style.top = e.clientY + 'px';
    }, 50);
  });
  
  // Aumentar cursor em elementos clicáveis
  const clickables = document.querySelectorAll('a, button, .btn, .card');
  clickables.forEach(element => {
    element.addEventListener('mouseenter', () => {
      cursor.classList.add('cursor-hover');
      cursorDot.classList.add('cursor-hover');
    });
    element.addEventListener('mouseleave', () => {
      cursor.classList.remove('cursor-hover');
      cursorDot.classList.remove('cursor-hover');
    });
  });
};

// Efeito de partículas flutuantes no background
export const initParticles = () => {
  const particlesContainer = document.createElement('div');
  particlesContainer.className = 'particles-container';
  document.body.insertBefore(particlesContainer, document.body.firstChild);
  
  for (let i = 0; i < 30; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.animationDelay = Math.random() * 20 + 's';
    particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
    particlesContainer.appendChild(particle);
  }
};

// Smooth scroll para âncoras
export const initSmoothScroll = () => {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
};

// Adicionar classe de scroll ao header
export const initHeaderScroll = () => {
  const header = document.querySelector('header');
  if (!header) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
};

// Efeito de digitação (typing effect)
export const typeWriter = (element, text, speed = 50) => {
  let i = 0;
  element.textContent = '';
  
  const type = () => {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  };
  
  type();
};

// Inicializar todas as animações
export const initAllAnimations = () => {
  // Verificar se já foi inicializado
  if (window.animationsInitialized) return;
  window.animationsInitialized = true;
  
  // Aguardar DOM estar pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initScrollReveal();
      initSmoothScroll();
      initHeaderScroll();
      animateCounters();
    });
  } else {
    initScrollReveal();
    initSmoothScroll();
    initHeaderScroll();
    animateCounters();
  }
};

// Exportar como default também
export default {
  initParallax,
  animateCounters,
  initScrollReveal,
  initCustomCursor,
  initParticles,
  initSmoothScroll,
  initHeaderScroll,
  typeWriter,
  initAllAnimations
};
