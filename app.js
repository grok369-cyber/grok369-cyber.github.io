// ==========================================
    // INITIAL SYSTEM STATES & SEED ARRAYS
    // ==========================================
    const DEFAULT_BLOGS = [
      {
        id: 1,
        title: 'Annual STEM Exhibition 2026',
        date: 'July 15, 2026',
        tag: 'Academic',
        content: 'We are thrilled to announce our upcoming STEM Showcase. Submissions for engineering drafts, software architectures, and sustainable technology projects are open to all Senior Leadership students.',
        imageUrl: 'https://images.unsplash.com/photo-1562774053-701939374585?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 2,
        title: 'Savio Academy Debaters Win National Trophy',
        date: 'July 10, 2026',
        tag: 'Extracurricular',
        content: 'Our debate team won the regional championship. Students led discussions on digital ethics and educational equality, capturing the final trophy in a display of exceptional eloquence.',
        imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80'
      },
      {
        id: 3,
        title: 'Curriculum Improvements: Web Tech Integration',
        date: 'July 04, 2026',
        tag: 'Technology',
        content: 'Beginning next term, Middle College students will start using responsive web development environments to design school applications, aligning with modern technology needs.',
        imageUrl: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=600&auto=format&fit=crop&q=80'
      }
    ];

    const DEFAULT_GALLERY = [
      {
        id: 1,
        title: 'The Digital Learning Studio',
        caption: 'Students collaborating on dynamic prototypes, interactive interfaces, and computing basics.',
        imageUrl: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 2,
        title: 'Advanced Science Laboratory',
        caption: 'Equipped with precision testing platforms for biology, physics, and chemistry experiments.',
        imageUrl: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?w=800&auto=format&fit=crop&q=80'
      },
      {
        id: 3,
        title: 'Athletics & Main Field Complex',
        caption: 'Fostering strong teamwork, strategic outdoor layouts, and physical stamina during match weeks.',
        imageUrl: 'https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&auto=format&fit=crop&q=80'
      }
    ];

    // Global App State Object
    const state = {
      currentTab: 'home',
      mobileMenuOpen: false,
      isDarkMode: true,
      isAdmin: localStorage.getItem('savio_admin_logged_in') === 'true',
      blogs: JSON.parse(localStorage.getItem('savio_blogs')) || DEFAULT_BLOGS,
      gallery: JSON.parse(localStorage.getItem('savio_gallery')) || DEFAULT_GALLERY
    };

    // Initialize layout configurations on load
    window.onload = function () {
      initTheme();
      renderAll();
    };

    // ==========================================
    // NOTIFICATION popups (Custom visual alternative to alert)
    // ==========================================
    function triggerToast(message, type = 'success') {
      const container = document.getElementById('toast-container');
      if (!container) return;
      const toast = document.createElement('div');
      
      const badgeColor = type === 'error' ? 'bg-red-500/10 border-red-500/30 text-red-400' :
                        type === 'info' ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' :
                        'bg-emerald-500/10 border-emerald-500/30 text-emerald-400';

      toast.className = `px-4 py-3 rounded-xl shadow-2xl border text-xs font-bold flex items-center gap-2.5 pointer-events-auto savio-toast bg-slate-950 ${badgeColor}`;
      toast.innerHTML = `
        <span class="w-2 h-2 rounded-full bg-current"></span>
        <span>${message}</span>
      `;
      
      container.appendChild(toast);
      setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateY(-10px)';
        setTimeout(() => toast.remove(), 300);
      }, 4000);
    }

    // ==========================================
    // THEME MANIPULATION CONTROL
    // ==========================================
    function initTheme() {
      const localTheme = localStorage.getItem('savio_theme');
      if (localTheme) {
        state.isDarkMode = localTheme === 'dark';
      } else {
        state.isDarkMode = true; // default dark
      }
      applyThemeClasses();
    }

    function toggleDarkMode() {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('savio_theme', state.isDarkMode ? 'dark' : 'light');
      applyThemeClasses();
    }

    function applyThemeClasses() {
      const rootHtml = document.documentElement;
      const body = document.body;
      const header = document.getElementById('main-header');
      const footer = document.getElementById('main-footer');
      const logoIconBg = document.getElementById('logo-icon-bg');
      const brandTitle = document.getElementById('brand-title');
      
      // Hero settings
      const heroBg = document.getElementById('hero-bg');
      const heroHeading = document.getElementById('hero-heading');
      const heroSubtext = document.getElementById('hero-subtext');
      const aboutHeroBtn = document.getElementById('about-hero-btn');

      // Goals settings
      const goalsSection = document.getElementById('goals-section');
      const goal1 = document.getElementById('goal-card-1');
      const goal2 = document.getElementById('goal-card-2');
      const goal3 = document.getElementById('goal-card-3');

      // Blogs section headers
      const blogTitle = document.getElementById('blog-section-title');
      const galleryTitle = document.getElementById('gallery-section-title');
      const gallerySect = document.getElementById('gallery-container-section');

      // Academics tab cards
      const acTitle = document.getElementById('academic-title');
      const acCard1 = document.getElementById('academic-card-1');
      const acCard2 = document.getElementById('academic-card-2');
      const acCard3 = document.getElementById('academic-card-3');
      const acSub1 = document.getElementById('academic-sub-1');
      const acSub2 = document.getElementById('academic-sub-2');
      const acSub3 = document.getElementById('academic-sub-3');

      // Heritage settings
      const heritageTitle = document.getElementById('heritage-title');
      const heritageFooterBox = document.getElementById('heritage-footer-box');

      // Forms
      const loginFormCard = document.getElementById('login-form-card');
      const dashboardHeaderCard = document.getElementById('dashboard-header-card');
      const bFormCard = document.getElementById('blog-form-card');
      const gFormCard = document.getElementById('gallery-form-card');
      const bManageCard = document.getElementById('manage-blogs-card');
      const gManageCard = document.getElementById('manage-gallery-card');

      if (state.isDarkMode) {
        rootHtml.classList.add('dark');
        body.className = "bg-slate-950 text-slate-100 font-body transition-colors duration-200 min-h-screen flex flex-col relative";
        header.className = "sticky top-0 z-40 backdrop-blur-md border-b border-slate-900 bg-slate-950/95 transition-colors duration-200";
        footer.className = "py-10 border-t border-slate-900 bg-slate-950 transition-colors duration-200 mt-auto";
        logoIconBg.className = "relative w-11 h-11 rounded-xl flex items-center justify-center text-indigo-500 bg-slate-950 border border-slate-800";
        brandTitle.className = "text-xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent";
        
        // Sun/Moon Icons
        document.getElementById('sun-icon').classList.remove('hidden');
        document.getElementById('moon-icon').classList.add('hidden');
        document.getElementById('sun-icon-mobile').classList.remove('hidden');
        document.getElementById('moon-icon-mobile').classList.add('hidden');

        // Hero components
        if (heroBg) heroBg.className = "relative overflow-hidden pt-16 pb-20 md:pt-28 md:pb-32 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.15),rgba(255,255,255,0))]";
        if (heroHeading) heroHeading.className = "text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight text-white font-display";
        if (heroSubtext) heroSubtext.className = "mt-6 max-w-2xl mx-auto text-sm sm:text-base text-slate-400 leading-relaxed";
        if (aboutHeroBtn) aboutHeroBtn.className = "w-full sm:w-auto px-6 py-3 font-semibold rounded-xl border bg-slate-900 hover:bg-slate-800 text-slate-200 border-slate-800 transition-all text-sm";

        // Goals section
        if (goalsSection) goalsSection.className = "py-12 border-y border-slate-900 bg-slate-900/40";
        [goal1, goal2, goal3].forEach(el => {
          if (el) el.className = "p-6 rounded-xl border border-slate-850 bg-slate-900 hover:border-slate-800 transition-colors";
        });

        if (blogTitle) blogTitle.className = "text-2xl font-black text-white font-display";
        if (galleryTitle) galleryTitle.className = "text-2xl font-black text-white font-display";
        if (gallerySect) gallerySect.className = "py-16 bg-slate-900/20 border-t border-slate-900";

        // Academics
        if (acTitle) acTitle.className = "text-3xl font-black text-white font-display";
        [acCard1, acCard2, acCard3].forEach(el => {
          if (el) el.className = "p-6 rounded-xl border border-slate-850 bg-slate-900 hover:border-slate-800 flex flex-col justify-between";
        });
        [acSub1, acSub2, acSub3].forEach((el, index) => {
          const colors = ['text-indigo-400', 'text-purple-400', 'text-pink-400'];
          if (el) el.className = `mt-6 pt-4 border-t border-slate-800 text-[11px] font-semibold ${colors[index]}`;
        });

        // Heritage
        if (heritageTitle) heritageTitle.className = "text-3xl font-black mb-4 text-white font-display";
        if (heritageFooterBox) heritageFooterBox.className = "p-5 rounded-xl border border-slate-800 bg-slate-900/40 text-xs text-slate-400";

        // Login & Dashboard Cards
        if (loginFormCard) loginFormCard.className = "w-full max-w-md p-8 rounded-2xl border border-slate-850 bg-slate-900";
        if (dashboardHeaderCard) dashboardHeaderCard.className = "p-6 rounded-2xl border border-slate-850 bg-slate-900 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4";
        if (bFormCard) bFormCard.className = "p-6 rounded-2xl border border-slate-850 bg-slate-900/60 shadow-sm";
        if (gFormCard) gFormCard.className = "p-6 rounded-2xl border border-slate-850 bg-slate-900/60 shadow-sm";
        if (bManageCard) bManageCard.className = "p-6 rounded-2xl border border-slate-850 bg-slate-900/40";
        if (gManageCard) gManageCard.className = "p-6 rounded-2xl border border-slate-850 bg-slate-900/40";

      } else {
        rootHtml.classList.remove('dark');
        body.className = "bg-slate-50 text-slate-800 font-body transition-colors duration-200 min-h-screen flex flex-col relative";
        header.className = "sticky top-0 z-40 backdrop-blur-md border-b border-slate-200 bg-white/95 shadow-sm transition-colors duration-200";
        footer.className = "py-10 border-t border-slate-200 bg-slate-100 shadow-inner transition-colors duration-200 mt-auto";
        logoIconBg.className = "relative w-11 h-11 rounded-xl flex items-center justify-center text-indigo-500 bg-white border border-slate-200 shadow-sm";
        brandTitle.className = "text-xl font-extrabold tracking-tight text-slate-900";

        // Sun/Moon Icons
        document.getElementById('sun-icon').classList.add('hidden');
        document.getElementById('moon-icon').classList.remove('hidden');
        document.getElementById('sun-icon-mobile').classList.add('hidden');
        document.getElementById('moon-icon-mobile').classList.remove('hidden');

        // Hero components
        if (heroBg) heroBg.className = "relative overflow-hidden pt-16 pb-20 md:pt-28 md:pb-32 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(99,102,241,0.06),rgba(255,255,255,0))]";
        if (heroHeading) heroHeading.className = "text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 font-display";
        if (heroSubtext) heroSubtext.className = "mt-6 max-w-2xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed";
        if (aboutHeroBtn) aboutHeroBtn.className = "w-full sm:w-auto px-6 py-3 font-semibold rounded-xl border bg-white hover:bg-slate-100 text-slate-700 border-slate-200 shadow-sm transition-all text-sm";

        // Goals section
        if (goalsSection) goalsSection.className = "py-12 border-y border-slate-200 bg-slate-100";
        [goal1, goal2, goal3].forEach(el => {
          if (el) el.className = "p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 shadow-sm transition-colors";
        });

        if (blogTitle) blogTitle.className = "text-2xl font-black text-slate-900 font-display";
        if (galleryTitle) galleryTitle.className = "text-2xl font-black text-slate-900 font-display";
        if (gallerySect) gallerySect.className = "py-16 bg-slate-100/50 border-t border-slate-200";

        // Academics
        if (acTitle) acTitle.className = "text-3xl font-black text-slate-900 font-display";
        [acCard1, acCard2, acCard3].forEach(el => {
          if (el) el.className = "p-6 rounded-xl border border-slate-200 bg-white hover:border-slate-300 shadow-sm flex flex-col justify-between";
        });
        [acSub1, acSub2, acSub3].forEach((el, index) => {
          const colors = ['text-indigo-600', 'text-purple-600', 'text-pink-600'];
          if (el) el.className = `mt-6 pt-4 border-t border-slate-200 text-[11px] font-semibold ${colors[index]}`;
        });

        // Heritage
        if (heritageTitle) heritageTitle.className = "text-3xl font-black mb-4 text-slate-900 font-display";
        if (heritageFooterBox) heritageFooterBox.className = "p-5 rounded-xl border border-slate-200 bg-slate-100 text-xs text-slate-600";

        // Login & Dashboard Cards
        if (loginFormCard) loginFormCard.className = "w-full max-w-md p-8 rounded-2xl border border-slate-200 bg-white shadow-xl";
        if (dashboardHeaderCard) dashboardHeaderCard.className = "p-6 rounded-2xl border border-slate-200 bg-white mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm";
        if (bFormCard) bFormCard.className = "p-6 rounded-2xl border border-slate-200 bg-white shadow-sm";
        if (gFormCard) gFormCard.className = "p-6 rounded-2xl border border-slate-200 bg-white shadow-sm";
        if (bManageCard) bManageCard.className = "p-6 rounded-2xl border border-slate-200 bg-white shadow-sm";
        if (gManageCard) gManageCard.className = "p-6 rounded-2xl border border-slate-200 bg-white shadow-sm";
      }

      // Re-trigger visual content render so dynamically generated elements capture classes properly
      renderBlogs();
      renderGallery();
      renderManagementLists();
      renderNavButtons();
    }

    // ==========================================
    // NAVIGATION CONTROLLER
    // ==========================================
    function navigateTo(tabId) {
      state.currentTab = tabId;
      state.mobileMenuOpen = false;
      
      const drawer = document.getElementById('mobile-drawer');
      if (drawer) drawer.classList.add('hidden');

      // Define tab elements
      const tabs = ['home', 'academics', 'about', 'admin-login', 'admin-dashboard'];
      
      tabs.forEach(t => {
        const sect = document.getElementById(`tab-${t}`);
        if (sect) {
          if (t === tabId) {
            sect.classList.remove('hidden');
          } else {
            sect.classList.add('hidden');
          }
        }
      });

      renderNavButtons();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    function toggleMobileMenu() {
      state.mobileMenuOpen = !state.mobileMenuOpen;
      const drawer = document.getElementById('mobile-drawer');
      if (!drawer) return;
      if (state.mobileMenuOpen) {
        drawer.classList.remove('hidden');
      } else {
        drawer.classList.add('hidden');
      }
    }

    // Render navigation links styling highlights based on states
    function renderNavButtons() {
      const links = ['home', 'academics', 'about'];
      links.forEach(link => {
        const desktopBtn = document.getElementById(`nav-${link}`);
        if (desktopBtn) {
          if (state.currentTab === link) {
            desktopBtn.className = "text-sm font-semibold transition-colors text-indigo-500";
          } else {
            desktopBtn.className = `text-sm font-semibold transition-colors ${state.isDarkMode ? 'text-slate-400 hover:text-indigo-500' : 'text-slate-650 hover:text-indigo-500'}`;
          }
        }
      });

      // Show/Hide Admin menu paths
      const adminNavDesktop = document.getElementById('nav-admin-dashboard');
      const adminNavMobile = document.getElementById('nav-admin-dashboard-mobile');
      if (state.isAdmin) {
        if (adminNavDesktop) adminNavDesktop.classList.remove('hidden');
        if (adminNavMobile) adminNavMobile.classList.remove('hidden');
      } else {
        if (adminNavDesktop) adminNavDesktop.classList.add('hidden');
        if (adminNavMobile) adminNavMobile.classList.add('hidden');
      }

      // Dynamic Auth Buttons swap in Header
      const authDesktop = document.getElementById('auth-actions-desktop');
      const authMobile = document.getElementById('auth-actions-mobile');
      
      const desktopContent = state.isAdmin ? `
        <button onclick="submitAdminLogout()" class="px-4 py-2 bg-red-600/10 hover:bg-red-600 text-red-500 hover:text-white rounded-xl text-xs font-bold transition-all border border-red-500/20 flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg> Exit Admin
        </button>
      ` : `
        <button onclick="navigateTo('admin-login')" class="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-indigo-600/20 flex items-center gap-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> Portal Login
        </button>
      `;

      const mobileContent = state.isAdmin ? `
        <button onclick="submitAdminLogout()" class="w-full text-center py-2.5 bg-red-600 hover:bg-red-500 text-white rounded-xl font-bold text-xs shadow-md">
          Exit Admin Workspace
        </button>
      ` : `
        <button onclick="navigateTo('admin-login')" class="w-full text-center py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold text-xs shadow-md">
          Admin Portal Login
        </button>
      `;

      if (authDesktop) authDesktop.innerHTML = desktopContent;
      if (authMobile) authMobile.innerHTML = mobileContent;
    }

    function handleFloatingAdminClick() {
      if (state.isAdmin) {
        navigateTo('admin-dashboard');
      } else {
        navigateTo('admin-login');
      }
    }

    // ==========================================
    // VISUALS RENDER ROUTINES
    // ==========================================
    function renderAll() {
      renderBlogs();
      renderGallery();
      renderManagementLists();
      renderNavButtons();
    }

    function renderBlogs() {
      const blogsGrid = document.getElementById('blogs-grid');
      if (!blogsGrid) return;

      if (state.blogs.length === 0) {
        blogsGrid.className = "block";
        blogsGrid.innerHTML = `
          <div class="p-12 text-center rounded-2xl border border-dashed ${state.isDarkMode ? 'border-slate-800' : 'border-slate-300'}">
            <p class="${state.isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm">No blog posts currently published. Use the Admin Panel to write the first one!</p>
          </div>
        `;
        return;
      }

      blogsGrid.className = "grid grid-cols-1 md:grid-cols-3 gap-8";
      let blogsHtml = '';

      state.blogs.forEach(post => {
        const cardStyle = state.isDarkMode ? 'bg-slate-900 border-slate-850 hover:border-slate-800 text-slate-100' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm text-slate-800';
        const textMuted = state.isDarkMode ? 'text-slate-400' : 'text-slate-600';
        const textTitle = state.isDarkMode ? 'text-white' : 'text-slate-900';
        const borderAlt = state.isDarkMode ? 'border-slate-800' : 'border-slate-150';

        blogsHtml += `
          <article class="rounded-xl border overflow-hidden flex flex-col justify-between ${cardStyle} hover:scale-[1.01] transition-transform duration-200">
            <div>
              <div class="relative h-44 overflow-hidden bg-slate-800">
                <img src="${post.imageUrl}" alt="${escapeHtml(post.title)}" class="w-full h-full object-cover hover:scale-105 transition duration-300" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80'" />
                <span class="absolute top-3 left-3 text-[9px] uppercase font-bold tracking-wider text-white bg-indigo-600 px-2 py-0.5 rounded">
                  ${escapeHtml(post.tag)}
                </span>
              </div>
              <div class="p-5">
                <span class="text-[10px] text-slate-400 font-mono block mb-1">${post.date}</span>
                <h4 class="text-base font-bold mb-2 leading-snug font-display ${textTitle}">${escapeHtml(post.title)}</h4>
                <p class="${textMuted} text-xs leading-relaxed line-clamp-3">${escapeHtml(post.content)}</p>
              </div>
            </div>
            <div class="px-5 pb-5 pt-3 border-t ${borderAlt} flex justify-between items-center text-xs">
              <span class="text-slate-400">Published by: Admin</span>
              <span class="text-indigo-550 font-bold cursor-pointer hover:underline">Read Full Article</span>
            </div>
          </article>
        `;
      });

      blogsGrid.innerHTML = blogsHtml;
    }

    function renderGallery() {
      const galleryGrid = document.getElementById('gallery-grid');
      if (!galleryGrid) return;

      if (state.gallery.length === 0) {
        galleryGrid.className = "block";
        galleryGrid.innerHTML = `
          <div class="p-12 text-center rounded-2xl border border-dashed ${state.isDarkMode ? 'border-slate-800' : 'border-slate-300'}">
            <p class="${state.isDarkMode ? 'text-slate-400' : 'text-slate-600'} text-sm">Gallery is empty. Log in as an Admin to upload showcasing images!</p>
          </div>
        `;
        return;
      }

      galleryGrid.className = "grid grid-cols-1 md:grid-cols-3 gap-6";
      let galleryHtml = '';

      state.gallery.forEach(item => {
        const cardBorder = state.isDarkMode ? 'border-slate-900 bg-slate-900' : 'border-slate-200 bg-slate-100';

        galleryHtml += `
          <div class="group rounded-xl overflow-hidden border ${cardBorder} relative aspect-video shadow-md">
            <img src="${item.imageUrl}" alt="${escapeHtml(item.title)}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'" />
            <div class="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent p-4 flex flex-col justify-end opacity-90 group-hover:opacity-100 transition duration-300">
              <h4 class="text-sm font-bold text-white mb-0.5 font-display">${escapeHtml(item.title)}</h4>
              <p class="text-[11px] text-slate-300 leading-snug">${escapeHtml(item.caption)}</p>
            </div>
          </div>
        `;
      });

      galleryGrid.innerHTML = galleryHtml;
    }

    // Render management list triggers in the Admin Dashboard
    function renderManagementLists() {
      const adminBlogsList = document.getElementById('admin-blogs-list');
      const adminGalleryList = document.getElementById('admin-gallery-list');
      if (!adminBlogsList || !adminGalleryList) return;
      
      const containerStyle = state.isDarkMode ? 'bg-slate-950 border-slate-900' : 'bg-slate-50 border-slate-200';
      const textTitle = state.isDarkMode ? 'text-white' : 'text-slate-900';

      // 1. Render Blogs Table
      if (state.blogs.length === 0) {
        adminBlogsList.innerHTML = `<p class="text-xs text-slate-400 italic">No posts in database.</p>`;
      } else {
        let blogsListHtml = '';
        state.blogs.forEach(post => {
          blogsListHtml += `
            <div class="p-3 rounded-lg border ${containerStyle} flex justify-between items-center">
              <div class="truncate pr-3">
                <p class="text-xs font-bold truncate ${textTitle}">${escapeHtml(post.title)}</p>
                <span class="text-[9px] text-slate-400 font-mono">${post.date} • ${escapeHtml(post.tag)}</span>
              </div>
              <button 
                onclick="deleteBlog(${post.id})"
                class="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition shrink-0"
                title="Delete Post"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          `;
        });
        adminBlogsList.innerHTML = blogsListHtml;
      }
      
      // Update header count
      const manageBlogsHeader = document.getElementById('manage-blogs-header');
      if (manageBlogsHeader) manageBlogsHeader.textContent = `Manage Blogs Table (${state.blogs.length})`;

      // 2. Render Gallery Table
      if (state.gallery.length === 0) {
        adminGalleryList.innerHTML = `<p class="text-xs text-slate-400 italic">No photos in database.</p>`;
      } else {
        let galleryListHtml = '';
        state.gallery.forEach(item => {
          galleryListHtml += `
            <div class="p-3 rounded-lg border ${containerStyle} flex justify-between items-center">
              <div class="flex items-center gap-3 truncate pr-3">
                <img src="${item.imageUrl}" alt="" class="w-8 h-8 rounded object-cover" onerror="this.onerror=null; this.src='https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&auto=format&fit=crop&q=80'" />
                <div class="truncate">
                  <p class="text-xs font-bold truncate ${textTitle}">${escapeHtml(item.title)}</p>
                  <span class="text-[9px] text-slate-400 block truncate">${escapeHtml(item.caption)}</span>
                </div>
              </div>
              <button 
                onclick="deleteGalleryItem(${item.id})"
                class="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-500/10 transition shrink-0"
                title="Delete Image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-4 h-4"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            </div>
          `;
        });
        adminGalleryList.innerHTML = galleryListHtml;
      }
      
      // Update header count
      const manageGalleryHeader = document.getElementById('manage-gallery-header');
      if (manageGalleryHeader) manageGalleryHeader.textContent = `Manage Showcase Gallery (${state.gallery.length})`;
    }

    // ==========================================
    // ACTION HANDLERS & DATABASE SUBMISSIONS
    // ==========================================
    function submitAdminLogin(e) {
      e.preventDefault();
      const pInput = document.getElementById('password-input');
      const errBanner = document.getElementById('login-error-banner');
      if (!pInput || !errBanner) return;
      
      if (pInput.value === 'SavioAdmin2026') {
        state.isAdmin = true;
        localStorage.setItem('savio_admin_logged_in', 'true');
        errBanner.classList.add('hidden');
        pInput.value = '';
        navigateTo('admin-dashboard');
        triggerToast('Welcome Back, Administrator! Access Authorized.', 'success');
      } else {
        errBanner.textContent = 'Invalid Admin Passcode. Please check spelling.';
        errBanner.classList.remove('hidden');
        triggerToast('Authentication Failed.', 'error');
      }
    }

    function submitAdminLogout() {
      state.isAdmin = false;
      localStorage.removeItem('savio_admin_logged_in');
      navigateTo('home');
      triggerToast('Logged out of Admin Portal.', 'info');
    }

    function fillMockBlog() {
      document.getElementById('blog-title-input').value = 'Exploring Future Space Systems';
      document.getElementById('blog-category-input').value = 'Academic';
      document.getElementById('blog-content-input').value = 'Our Senior Leadership course introduced an astrophysics unit today exploring deep-space satellite telemetry and sustainable mechanics.';
      document.getElementById('blog-image-input').value = 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80';
      triggerToast('Mock article details pre-filled!', 'info');
    }

    function fillMockGallery() {
      document.getElementById('gallery-title-input').value = 'Creative Design Workshop';
      document.getElementById('gallery-caption-input').value = 'Collaborating with digital tools during practical visual media hours.';
      document.getElementById('gallery-image-input').value = 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=800&auto=format&fit=crop&q=80';
      triggerToast('Mock gallery details pre-filled!', 'info');
    }

    function submitNewBlog(e) {
      e.preventDefault();
      const title = document.getElementById('blog-title-input').value.trim();
      const tag = document.getElementById('blog-category-input').value;
      const imageUrlInput = document.getElementById('blog-image-input').value.trim();
      const content = document.getElementById('blog-content-input').value.trim();

      if (!title || !content) {
        triggerToast('Please fill out the Title and Content!', 'error');
        return;
      }

      const newPost = {
        id: Date.now(),
        title: title,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        tag: tag,
        content: content,
        imageUrl: imageUrlInput || 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&auto=format&fit=crop&q=80'
      };

      state.blogs.unshift(newPost);
      localStorage.setItem('savio_blogs', JSON.stringify(state.blogs));

      // Reset Form fields
      document.getElementById('blog-title-input').value = '';
      document.getElementById('blog-image-input').value = '';
      document.getElementById('blog-content-input').value = '';

      renderBlogs();
      renderManagementLists();
      triggerToast('Blog article successfully published!', 'success');
    }

    function submitNewGallery(e) {
      e.preventDefault();
      const title = document.getElementById('gallery-title-input').value.trim();
      const caption = document.getElementById('gallery-caption-input').value.trim();
      const imageUrl = document.getElementById('gallery-image-input').value.trim();

      if (!title || !imageUrl) {
        triggerToast('Title and Image URL are required!', 'error');
        return;
      }

      const newPhoto = {
        id: Date.now(),
        title: title,
        caption: caption,
        imageUrl: imageUrl
      };

      state.gallery.unshift(newPhoto);
      localStorage.setItem('savio_gallery', JSON.stringify(state.gallery));

      // Reset Form fields
      document.getElementById('gallery-title-input').value = '';
      document.getElementById('gallery-caption-input').value = '';
      document.getElementById('gallery-image-input').value = '';

      renderGallery();
      renderManagementLists();
      triggerToast('New visual showcase photo uploaded!', 'success');
    }

    function deleteBlog(id) {
      state.blogs = state.blogs.filter(post => post.id !== id);
      localStorage.setItem('savio_blogs', JSON.stringify(state.blogs));
      renderBlogs();
      renderManagementLists();
      triggerToast('Blog post deleted successfully.', 'info');
    }

    function deleteGalleryItem(id) {
      state.gallery = state.gallery.filter(item => item.id !== id);
      localStorage.setItem('savio_gallery', JSON.stringify(state.gallery));
      renderGallery();
      renderManagementLists();
      triggerToast('Gallery showcase photo deleted.', 'info');
    }

    // Helper functions to prevent XSS injections
    function escapeHtml(text) {
      if (!text) return '';
      return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
    }