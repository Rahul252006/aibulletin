
const getApiUrl = () => {
  if (localStorage.getItem('API_URL')) {
    return localStorage.getItem('API_URL');
  }
  const hostname = window.location.hostname;
  if (hostname === 'localhost' || hostname === '127.0.0.1') {
    return 'http://localhost:5001/api';
  }
  return '/api';
};
const API_URL = getApiUrl();

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'short', day: 'numeric' };
  return new Date(dateString).toLocaleDateString('en-US', options);
};

const getToken = () => localStorage.getItem('adminToken');

const setupNavbar = () => {
  const token = getToken();
  const authLinks = document.getElementById('nav-auth-links');
  const mobileAuthLinks = document.getElementById('mobile-auth-links');

  if (token) {
    if (authLinks) {
      authLinks.innerHTML = `
        <a href="admin.html" class="hidden sm:block text-xs font-black uppercase tracking-widest text-black bg-orange-500 hover:bg-orange-600 active:scale-[0.98] transition-all rounded px-4 py-2">Dashboard</a>
        <button onclick="logout()" class="w-8 h-8 rounded bg-neutral-900 hover:bg-neutral-800 hover:text-white flex items-center justify-center transition-all text-neutral-400 border border-neutral-800 active:scale-[0.95]">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
        </button>
      `;
    }
    if (mobileAuthLinks) {
      mobileAuthLinks.innerHTML = `
        <a href="admin.html" class="px-4 py-3 text-gray-300 hover:bg-gray-800 rounded font-medium block">Dashboard</a>
        <button onclick="logout()" class="text-left px-4 py-3 text-gray-300 hover:bg-gray-800 rounded font-medium w-full">Logout</button>
      `;
    }
  } else {
    if (authLinks) {
      authLinks.innerHTML = `
        <a href="admin-login.html" class="hidden sm:block text-xs font-black uppercase tracking-widest text-neutral-400 hover:text-white transition-all border border-neutral-800 hover:border-orange-500 rounded px-4 py-2 hover:bg-neutral-900/50">Admin</a>
      `;
    }
    if (mobileAuthLinks) {
      mobileAuthLinks.innerHTML = `
        <a href="admin-login.html" class="px-4 py-3 text-gray-300 hover:bg-gray-800 rounded font-medium block">Admin Login</a>
      `;
    }
  }

  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  const searchForms = document.querySelectorAll('.search-form');
  searchForms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input').value;
      if (input.trim()) {
        window.location.href = `articles.html?search=${encodeURIComponent(input)}`;
      }
    });
  });
};

const logout = async () => {
  const confirmed = await showPopup('Confirm Logout', 'Are you sure you want to log out?', true);
  if (confirmed) {
    localStorage.removeItem('adminToken');
    window.location.href = 'index.html';
  }
};

const showPopup = (title, message, isConfirm = false) => {
  return new Promise((resolve) => {
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4 backdrop-blur-sm fade-in-up';

    const box = document.createElement('div');
    box.className = 'bg-gray-900 rounded border border-gray-800 p-6 w-full max-w-sm shadow-2xl shadow-black';

    box.innerHTML = `
      <h3 class="text-xl font-serif font-black text-white uppercase tracking-tight mb-2">${title}</h3>
      <p class="text-gray-400 font-serif text-sm mb-6 leading-relaxed">${message}</p>
      <div class="flex gap-3 justify-end">
        ${isConfirm ? `<button id="popup-cancel" class="px-4 py-2 border-2 border-gray-700 text-xs font-bold uppercase tracking-wider hover:bg-gray-800 transition-colors">Cancel</button>` : ''}
        <button id="popup-ok" class="px-4 py-2 bg-orange-500 rounded text-white text-xs font-bold uppercase tracking-wider hover:bg-orange-600 transition-colors">OK</button>
      </div>
    `;

    overlay.appendChild(box);
    document.body.appendChild(overlay);

    document.getElementById('popup-ok').addEventListener('click', () => {
      overlay.remove();
      resolve(true);
    });

    if (isConfirm) {
      document.getElementById('popup-cancel').addEventListener('click', () => {
        overlay.remove();
        resolve(false);
      });
    }
  });
};

const fetchAPI = async (endpoint, options = {}) => {
  const token = getToken();
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json();
  if (!response.ok) {
    if (response.status === 401) {
      logout();
    }
    throw data;
  }
  return data;
};

document.addEventListener('DOMContentLoaded', () => {
  setupNavbar();
});
