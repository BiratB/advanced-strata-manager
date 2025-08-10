// Modern animations and interactions
class StrataAnimations {
  constructor() {
    this.init();
  }

  init() {
    this.setupScrollAnimations();
    this.setupHoverEffects();
    this.setupCounterAnimations();
    this.setupParallaxEffects();
  }

  setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // Observe all feature cards
    document.querySelectorAll('.feature-card').forEach(card => {
      observer.observe(card);
    });
  }

  setupHoverEffects() {
    document.querySelectorAll('.feature-card').forEach(card => {
      card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
        card.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
        card.style.boxShadow = '0 10px 30px rgba(0,0,0,0.1)';
      });
    });
  }

  setupCounterAnimations() {
    const counters = document.querySelectorAll('.stat-number');
    
    const animateCounter = (counter) => {
      const target = parseInt(counter.textContent);
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const timer = setInterval(() => {
        current += step;
        if (current >= target) {
          counter.textContent = target;
          clearInterval(timer);
        } else {
          counter.textContent = Math.floor(current);
        }
      }, 16);
    };

    // Trigger counter animation when hero section is visible
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          counters.forEach(counter => animateCounter(counter));
          heroObserver.unobserve(entry.target);
        }
      });
    });

    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
      heroObserver.observe(heroSection);
    }
  }

  setupParallaxEffects() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      const parallaxElements = document.querySelectorAll('.hero-content');
      
      parallaxElements.forEach(element => {
        const speed = 0.5;
        element.style.transform = `translateY(${scrolled * speed}px)`;
      });
    });
  }
}

// Utility functions
function showEmergencyContact() {
  const modal = document.createElement('div');
  modal.className = 'emergency-modal';
  modal.innerHTML = `
    <div class="modal-content">
      <div class="modal-header">
        <h3><i class="fas fa-exclamation-triangle"></i> Emergency Contacts</h3>
        <button onclick="this.closest('.emergency-modal').remove()" class="close-btn">
          <i class="fas fa-times"></i>
        </button>
      </div>
      <div class="modal-body">
        <div class="emergency-contact">
          <i class="fas fa-fire"></i>
          <div>
            <strong>Fire Emergency</strong>
            <p>000</p>
          </div>
        </div>
        <div class="emergency-contact">
          <i class="fas fa-wrench"></i>
          <div>
            <strong>Building Manager</strong>
            <p>(02) 9999-1234</p>
          </div>
        </div>
        <div class="emergency-contact">
          <i class="fas fa-tint"></i>
          <div>
            <strong>Water/Gas Emergency</strong>
            <p>(02) 9999-5678</p>
          </div>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(modal);
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new StrataAnimations();
});

// Add loading animation
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});