class SiteNavbar extends HTMLElement {
  connectedCallback(){
    this.render();
    this.setupBehavior();
  }

  render(){
    this.innerHTML = `
  <header class="site-navbar bg-blue-900 text-white shadow-md">
        <div class="container mx-auto px-6 py-4 flex items-center justify-between">
          <a href="index.html" class="text-xl font-bold">Master Guide <span class="text-yellow-400">Murungi Samuel</span></a>

          <nav class="hidden md:flex items-center space-x-6">
            <a href="index.html" class="hover:text-yellow-300">Home</a>
            <a href="about.html" class="hover:text-yellow-300">About Me</a>
            <a href="projects.html" class="hover:text-yellow-300">Projects</a>
            <a href="resources.html" class="hover:text-yellow-300">Resources</a>
            <a href="gallery.html" class="hover:text-yellow-300">Gallery</a>
            <a href="contact.html" class="hover:text-yellow-300">Contact</a>
          </nav>

          <div class="md:hidden">
            <button id="nav-toggle" class="text-white focus:outline-none" aria-label="Open navigation">
              <svg class="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
            </button>
          </div>
        </div>

        <div id="mobile-menu" class="hidden md:hidden bg-indigo-900/95">
          <a href="index.html" class="block px-6 py-3 text-white border-b border-indigo-800">Home</a>
          <a href="about.html" class="block px-6 py-3 text-white border-b border-indigo-800">About Me</a>
          <a href="projects.html" class="block px-6 py-3 text-white border-b border-indigo-800">Projects</a>
          <a href="resources.html" class="block px-6 py-3 text-white border-b border-indigo-800">Resources</a>
          <a href="gallery.html" class="block px-6 py-3 text-white border-b border-indigo-800">Gallery</a>
          <a href="contact.html" class="block px-6 py-3 text-white">Contact</a>
        </div>
      </header>
    `;
  }

  setupBehavior(){
    // mobile toggle
    const toggle = this.querySelector('#nav-toggle');
    const mobileMenu = this.querySelector('#mobile-menu');
    if(toggle && mobileMenu){
      toggle.addEventListener('click', ()=>{
        mobileMenu.classList.toggle('hidden');
      });
    }

    // hide on scroll down, show on scroll up
    let lastY = window.scrollY;
    const navbar = this.querySelector('.site-navbar');
    let ticking = false;
    window.addEventListener('scroll', ()=>{
      if(!navbar) return;
      const currentY = window.scrollY;
      if(!ticking){
        window.requestAnimationFrame(()=>{
          if(currentY > lastY && currentY > 80){
            // scrolling down
            navbar.style.transform = 'translateY(-110%)';
            navbar.style.transition = 'transform 300ms ease-in-out';
          } else {
            // scrolling up
            navbar.style.transform = 'translateY(0)';
            navbar.style.transition = 'transform 300ms ease-in-out';
          }
          lastY = currentY;
          ticking = false;
        });
        ticking = true;
      }
    }, {passive:true});
  }
}

customElements.define('site-navbar', SiteNavbar);
