const langBtn = document.getElementById('lang-btn');
const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');
const langText = document.getElementById('lang-text');
const backToTopBtn = document.getElementById('back-to-top');

let currentLang = localStorage.getItem('language') || 'pt';
let currentTheme = localStorage.getItem('theme') || 'light';

function setLanguage(lang) {
    if (lang === 'en') {
        document.body.classList.add('lang-en');
        langText.textContent = 'PT';
    } else {
        document.body.classList.remove('lang-en');
        langText.textContent = 'EN';
    }
    currentLang = lang;
    localStorage.setItem('language', lang);
    document.documentElement.lang = lang;
}

function setTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-mode');
        themeIcon.classList.remove('fa-moon');
        themeIcon.classList.add('fa-sun');
    } else {
        document.body.classList.remove('dark-mode');
        themeIcon.classList.remove('fa-sun');
        themeIcon.classList.add('fa-moon');
    }
    currentTheme = theme;
    localStorage.setItem('theme', theme);
}

langBtn.addEventListener('click', () => {
    setLanguage(currentLang === 'pt' ? 'en' : 'pt');
});

themeBtn.addEventListener('click', () => {
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

function toggleBackToTop() {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}

window.addEventListener('scroll', toggleBackToTop, { passive: true });

// Initialize with saved preferences
if (currentLang === 'en') {
    setLanguage('en');
}
if (currentTheme === 'dark') {
    setTheme('dark');
}

toggleBackToTop();
