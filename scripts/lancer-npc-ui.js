Hooks.once("init", () => {
  // Add button group to the scene controls (left sidebar)
  Hooks.on("getSceneControlButtons", controls => {
    controls.push({
      name: "lancer-npc-ui",
      title: "Lancer NPC UI",
      icon: "fas fa-robot",
      layer: null,
      tools: [
        {
          name: "open-lancer-npc-ui",
          title: "Open Lancer NPC UI",
          icon: "fas fa-robot",
          onClick: () => new LancerNPCUI().render(true),
          button: true
        }
      ],
      visible: true
    });
  });
});

Hooks.on("canvasReady", () => {
  // Remove existing button if present
  $("#lancer-npc-ui-floating-btn").remove();
  // Create the floating button
  const btn = $(`
    <button id="lancer-npc-ui-floating-btn" title="Lancer NPC UI">
      <i class="fas fa-robot"></i>
    </button>
  `);
  // Style the button (positioned to the left of the right UI bar)
  btn.css({
    position: "fixed",
    top: "50%",
    right: "60px", // adjust as needed to sit left of the right bar
    transform: "translateY(-50%)",
    zIndex: 100,
    width: "48px",
    height: "48px",
    borderRadius: "50%",
    background: "#0099ff",
    color: "#fff",
    border: "2px solid #fff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
    cursor: "pointer",
    fontSize: "1.5rem"
  });
  btn.on("click", () => {
    new LancerNPCUI().render(true);
  });
  $(document.body).append(btn);
});

class LancerNPCUI extends Application {
  static get defaultOptions() {
    return mergeObject(super.defaultOptions, {
      id: "lancer-npc-ui-app",
      title: "Lancer NPC UI",
      template: "modules/lancer-npc-ui/templates/lancer-npc-ui.html",
      classes: ["lancer-npc-ui"],
      width: 500,
      height: 600,
      resizable: true
    });
  }
  async activateListeners(html) {
    super.activateListeners(html);
    // Ensure Swiper CSS is loaded
    if (!document.getElementById('swiper-css')) {
      const link = document.createElement('link');
      link.id = 'swiper-css';
      link.rel = 'stylesheet';
      link.href = 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.css';
      document.head.appendChild(link);
    }
    // Ensure Swiper JS is loaded
    if (!window.Swiper) {
      await new Promise(resolve => {
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/npm/swiper@9/swiper-bundle.min.js';
        script.onload = resolve;
        document.body.appendChild(script);
      });
    }
    // Wait for DOM to be ready
    setTimeout(() => {
      const swiperEl = html.find('.mySwiper');
      if (swiperEl.length && window.Swiper) {
        console.log('Initializing Swiper on', swiperEl[0]);
        new Swiper('.mySwiper', {
          effect: 'coverflow',
          grabCursor: true,
          centeredSlides: true,
          loop: true,
          slidesPerView: 'auto',
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 150,
            modifier: 2.5,
            slideShadows: true,
          }
      
        });
      } else {
        console.warn('Swiper element or library not found!');
      }
    }, 100);
  }
}
