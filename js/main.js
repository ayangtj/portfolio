// Main JavaScript for April Yang's Portfolio

document.addEventListener('DOMContentLoaded', function() {
  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Add fade-in animation for all sections
  const animatedElements = document.querySelectorAll('.intro, .project-card, .case-study-section, .skills-column');
  
  if (animatedElements.length > 0) {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('fade-in');
          }, 100); // Small delay for staggered effect
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    animatedElements.forEach(item => {
      observer.observe(item);
    });
  }
  
  // Enlarge images on click for better viewing
  const caseStudyImages = document.querySelectorAll('.case-study-image, .wireframe, .wireframe-small, .change-image');
  
  caseStudyImages.forEach(image => {
    image.addEventListener('click', function() {
      // Create modal container
      const modal = document.createElement('div');
      modal.classList.add('image-modal');
      
      // Create image element
      const modalImg = document.createElement('img');
      modalImg.src = this.src;
      modalImg.alt = this.alt;
      
      // Add close button
      const closeBtn = document.createElement('button');
      closeBtn.classList.add('modal-close');
      closeBtn.innerHTML = '&times;';
      closeBtn.addEventListener('click', function() {
        document.body.removeChild(modal);
        document.body.classList.remove('modal-open');
      });
      
      // Add elements to modal
      modal.appendChild(modalImg);
      modal.appendChild(closeBtn);
      
      // Add modal to body
      document.body.appendChild(modal);
      document.body.classList.add('modal-open');
      
      // Close modal when clicking outside the image
      modal.addEventListener('click', function(e) {
        if (e.target === modal) {
          document.body.removeChild(modal);
          document.body.classList.remove('modal-open');
        }
      });
    });
  });
  
  // Add CSS for the modal
  const style = document.createElement('style');
  style.textContent = `
    .image-modal {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.9);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
      cursor: pointer;
    }
    
    .image-modal img {
      max-width: 90%;
      max-height: 90%;
      object-fit: contain;
      cursor: auto;
    }
    
    .modal-close {
      position: absolute;
      top: 20px;
      right: 30px;
      color: white;
      font-size: 40px;
      font-weight: bold;
      background: none;
      border: none;
      cursor: pointer;
    }
    
    body.modal-open {
      overflow: hidden;
    }
  `;
  document.head.appendChild(style);
});