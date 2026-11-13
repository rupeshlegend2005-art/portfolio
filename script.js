/**
 * RUPESH - VIDEO EDITOR PORTFOLIO SCRIPTS
 * Interactive features: Dedicated Categories, Before/After Slider, Smart Video Modal (MP4 + YouTube), Metric Counters
 */

document.addEventListener('DOMContentLoaded', () => {
  initShowreel();
  initCategoryStickyScroll();
  initBeforeAfterSlider();
  initMetricCounters();
  initVideoModal();
  initMobileMenu();
  initContactForm();
  initCardVideoPreview();
});

/* ==========================================================================
   1. SHOWREEL VIDEO CONTROLS
   ========================================================================== */
function initShowreel() {
  const showreelVideo = document.getElementById('main-showreel-video');
  const playBtn = document.getElementById('play-showreel-btn');
  const overlay = document.getElementById('showreel-overlay');
  const soundBtn = document.getElementById('sound-toggle-btn');
  const soundIcon = soundBtn ? soundBtn.querySelector('i') : null;
  const modalExpandBtn = document.getElementById('modal-expand-btn');

  if (!showreelVideo) return;

  function playVideo() {
    showreelVideo.muted = false;
    showreelVideo.play().then(() => {
      if (overlay) overlay.classList.add('hidden');
      if (soundIcon) {
        soundIcon.className = 'fa-solid fa-volume-high';
      }
    }).catch(err => {
      // Autoplay with audio was blocked, fallback to muted play
      showreelVideo.muted = true;
      showreelVideo.play();
      if (overlay) overlay.classList.add('hidden');
      if (soundIcon) {
        soundIcon.className = 'fa-solid fa-volume-xmark';
      }
    });
  }

  if (playBtn) {
    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      playVideo();
    });
  }

  if (overlay) {
    overlay.addEventListener('click', playVideo);
  }

  if (soundBtn) {
    soundBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (showreelVideo.muted) {
        showreelVideo.muted = false;
        soundIcon.className = 'fa-solid fa-volume-high';
      } else {
        showreelVideo.muted = true;
        soundIcon.className = 'fa-solid fa-volume-xmark';
      }
    });
  }

  if (modalExpandBtn) {
    modalExpandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      openVideoModal({
        videoSrc: showreelVideo.querySelector('source')?.src || showreelVideo.src,
        title: "Looking for an Editor?",
        client: "Featured Edit Showcase",
        views: "High Velocity",
        retention: "4K Master",
        tools: "DaVinci Resolve, CapCut, Photoshop, Canva",
        description: "Transforming raw footage into scroll-stopping, cinematic masterpieces with rhythm, sound design, and color grading."
      });
    });
  }
}

/* ==========================================================================
   2. CATEGORY STICKY JUMP & ACTIVE TRACKING
   ========================================================================== */
function initCategoryStickyScroll() {
  const pills = document.querySelectorAll('.cat-pill');
  const sections = [
    document.getElementById('podcasts'),
    document.getElementById('gym-reels'),
    document.getElementById('commercial-ads'),
    document.getElementById('before-after')
  ].filter(Boolean);

  window.addEventListener('scroll', () => {
    let currentId = '';
    const scrollPos = window.scrollY + 200;

    sections.forEach(section => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.getAttribute('id');
      }
    });

    if (currentId) {
      pills.forEach(pill => {
        if (pill.getAttribute('href') === `#${currentId}`) {
          pill.classList.add('active');
        } else {
          pill.classList.remove('active');
        }
      });
    }
  }, { passive: true });
}

/* ==========================================================================
   3. INTERACTIVE BEFORE VS AFTER COMPARISON SLIDER
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.getElementById('comparison-slider');
  const afterWrapper = document.getElementById('after-image-wrapper');
  const handle = document.getElementById('slider-handle');

  if (!container || !afterWrapper || !handle) return;

  let isDragging = false;

  function updateSliderPosition(clientX) {
    const rect = container.getBoundingClientRect();
    let offsetX = clientX - rect.left;

    if (offsetX < 0) offsetX = 0;
    if (offsetX > rect.width) offsetX = rect.width;

    const percentage = (offsetX / rect.width) * 100;
    afterWrapper.style.width = `${percentage}%`;
    handle.style.left = `${percentage}%`;
  }

  // Mouse Events
  container.addEventListener('mousedown', (e) => {
    isDragging = true;
    updateSliderPosition(e.clientX);
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.clientX);
  });

  // Touch Events for Mobile / Tablet
  container.addEventListener('touchstart', (e) => {
    isDragging = true;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging) return;
    updateSliderPosition(e.touches[0].clientX);
  }, { passive: true });
}

/* ==========================================================================
   4. ANIMATED METRIC COUNTERS
   ========================================================================== */
function initMetricCounters() {
  const counters = document.querySelectorAll('.metric-number');
  let animated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !animated) {
        animated = true;
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target'), 10);
          const duration = 1800; // milliseconds
          const stepTime = 25;
          const steps = duration / stepTime;
          const increment = target / steps;
          let current = 0;

          const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
              clearInterval(timer);
            } else {
              counter.textContent = Math.floor(current);
            }
          }, stepTime);
        });
      }
    });
  }, { threshold: 0.3 });

  const metricsSection = document.querySelector('.hero-metrics');
  if (metricsSection) {
    observer.observe(metricsSection);
  }
}

/* ==========================================================================
   5. VIDEO LIGHTBOX MODAL (SUPPORTS MP4 & YOUTUBE / SHORTS)
   ========================================================================== */
let openVideoModal;

function initVideoModal() {
  const modal = document.getElementById('video-modal');
  const videoPlayer = document.getElementById('modal-video-player');
  const iframePlayer = document.getElementById('modal-iframe-player');
  const mediaContainer = document.getElementById('modal-media-wrapper');
  const closeBtn = document.getElementById('modal-close');
  const backdrop = document.getElementById('modal-backdrop');
  const modalTitle = document.getElementById('modal-title');
  const modalClient = document.getElementById('modal-client');
  const modalViews = document.getElementById('modal-views');
  const modalRetention = document.getElementById('modal-retention');
  const modalDesc = document.getElementById('modal-desc');
  const modalTools = document.getElementById('modal-tools');
  const hireBtn = document.getElementById('modal-hire-btn');
  const sourceBtn = document.getElementById('modal-source-btn');

  if (!modal) return;

  function parseYouTubeUrl(url) {
    if (!url) return null;
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=|shorts\/)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  }

  function parseInstagramUrl(url) {
    if (!url) return null;
    const regExp = /(?:https?:\/\/)?(?:www\.)?instagram\.com\/(?:reel|p)\/([A-Za-z0-9_-]+)/;
    const match = url.match(regExp);
    return match ? match[1] : null;
  }

  openVideoModal = function(data) {
    const ytId = parseYouTubeUrl(data.videoSrc);
    const igId = parseInstagramUrl(data.videoSrc);

    // Setup direct link to original platform
    if (sourceBtn) {
      sourceBtn.href = data.videoSrc;
      if (igId) {
        sourceBtn.innerHTML = '<i class="fa-brands fa-instagram"></i> Watch on Instagram';
        sourceBtn.style.display = 'inline-flex';
      } else if (ytId) {
        sourceBtn.innerHTML = '<i class="fa-brands fa-youtube"></i> Watch on YouTube';
        sourceBtn.style.display = 'inline-flex';
      } else if (data.videoSrc.startsWith('http')) {
        sourceBtn.innerHTML = '<i class="fa-solid fa-arrow-up-right-from-square"></i> Open Video';
        sourceBtn.style.display = 'inline-flex';
      } else {
        sourceBtn.style.display = 'none';
      }
    }

    if (ytId) {
      // Play via YouTube embed
      if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.classList.add('hidden');
      }
      if (iframePlayer) {
        iframePlayer.src = `https://www.youtube.com/embed/${ytId}?autoplay=1&rel=0`;
        iframePlayer.classList.remove('hidden');
      }
      if (mediaContainer) {
        mediaContainer.classList.remove('instagram-mode');
      }
    } else if (igId) {
      // Embed Instagram Reel
      if (videoPlayer) {
        videoPlayer.pause();
        videoPlayer.classList.add('hidden');
      }
      if (iframePlayer) {
        iframePlayer.src = `https://www.instagram.com/reel/${igId}/embed/`;
        iframePlayer.classList.remove('hidden');
      }
      if (mediaContainer) {
        mediaContainer.classList.add('instagram-mode');
      }
    } else {
      // Play standard video file
      if (iframePlayer) {
        iframePlayer.src = "";
        iframePlayer.classList.add('hidden');
      }
      if (videoPlayer) {
        videoPlayer.src = data.videoSrc;
        videoPlayer.classList.remove('hidden');
        videoPlayer.play().catch(() => {});
      }
      if (mediaContainer) {
        mediaContainer.classList.remove('instagram-mode');
      }
    }

    modalTitle.textContent = data.title;
    modalClient.textContent = data.client;
    modalViews.innerHTML = `<i class="fa-solid fa-fire"></i> ${data.views}`;
    modalRetention.innerHTML = `<i class="fa-solid fa-chart-line"></i> ${data.retention}`;
    modalDesc.textContent = data.description;
    modalTools.textContent = data.tools;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  function closeModal() {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    if (videoPlayer) {
      videoPlayer.pause();
      videoPlayer.src = "";
    }
    if (iframePlayer) {
      iframePlayer.src = "";
    }
    if (mediaContainer) {
      mediaContainer.classList.remove('instagram-mode');
    }
    document.body.style.overflow = '';
  }

  // Bind click event to all project cards
  const cards = document.querySelectorAll('.project-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const data = {
        videoSrc: card.getAttribute('data-video'),
        title: card.getAttribute('data-title'),
        client: card.getAttribute('data-client'),
        views: card.getAttribute('data-views'),
        retention: card.getAttribute('data-retention'),
        tools: card.getAttribute('data-tools'),
        description: card.getAttribute('data-description')
      };
      openVideoModal(data);
    });
  });

  closeBtn?.addEventListener('click', closeModal);
  backdrop?.addEventListener('click', closeModal);
  hireBtn?.addEventListener('click', closeModal);

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   6. MOBILE HAMBURGER MENU
   ========================================================================== */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (!toggle || !navLinks) return;

  toggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
    });
  });
}

/* ==========================================================================
   7. INTERACTIVE PROJECT FORM & WHATSAPP REDIRECT
   ========================================================================== */
function initContactForm() {
  const form = document.getElementById('project-form');
  const statusDiv = document.getElementById('form-status');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('client-name').value.trim();
    const contact = document.getElementById('client-email').value.trim();
    const link = document.getElementById('footage-link').value.trim();
    const details = document.getElementById('project-details').value.trim();

    // Collect checked services
    const checkedServices = [];
    form.querySelectorAll('input[name="services"]:checked').forEach(cb => {
      checkedServices.push(cb.value);
    });

    const servicesStr = checkedServices.length > 0 ? checkedServices.join(', ') : 'Video Editing';

    // Build WhatsApp message
    let waMsg = `Hi Rupesh! I saw your video editing portfolio.\n\n`;
    waMsg += `*Name/Brand:* ${name}\n`;
    waMsg += `*Contact:* ${contact}\n`;
    waMsg += `*Category Needed:* ${servicesStr}\n`;
    if (link) waMsg += `*Footage/Channel:* ${link}\n`;
    if (details) waMsg += `*Details:* ${details}\n`;

    const encodedMsg = encodeURIComponent(waMsg);
    const waUrl = `https://wa.me/918667652940?text=${encodedMsg}`;

    // Display feedback
    statusDiv.className = 'form-status success';
    statusDiv.innerHTML = `<i class="fa-solid fa-check-circle"></i> Opening WhatsApp with your project brief...`;

    setTimeout(() => {
      window.open(waUrl, '_blank');
      form.reset();
    }, 1000);
  });
}


/* ==========================================================================
   8. CARD VIDEO PREVIEW — auto-play muted on hover, pause on leave
   ========================================================================== */
function initCardVideoPreview() {
  const videoCards = document.querySelectorAll('.card-video-preview');

  videoCards.forEach(video => {
    const card = video.closest('.project-card');
    if (!card) return;

    card.addEventListener('mouseenter', () => {
      video.play().catch(() => {});
    });

    card.addEventListener('mouseleave', () => {
      video.pause();
      video.currentTime = 0;
    });
  });
}
