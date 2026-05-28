const langBtn = document.getElementById('lang-btn');
const themeBtn = document.getElementById('theme-btn');
const themeIcon = document.getElementById('theme-icon');
const langText = document.getElementById('lang-text');

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

// Initialize with saved preferences
if (currentLang === 'en') {
    setLanguage('en');
}
if (currentTheme === 'dark') {
    setTheme('dark');
}
