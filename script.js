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
    translateDates(lang);
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

// Translate month abbreviations and "Present"/"Presente"
function translateDates(lang) {
    const enToPt = {
        Jan: 'jan', Feb: 'fev', Mar: 'mar', Apr: 'abr', May: 'mai', Jun: 'jun', Jul: 'jul', Aug: 'ago', Sep: 'set', Oct: 'out', Nov: 'nov', Dec: 'dez'
    };
    const ptToEn = Object.fromEntries(Object.entries(enToPt).map(([k,v]) => [v, k]));

    const els = document.querySelectorAll('.exp-date, .edu-year');
    els.forEach(el => {
        // store original if missing
        if (!el.dataset.original) el.dataset.original = el.textContent;
        let text = el.dataset.original;
        if (lang === 'pt') {
            Object.keys(enToPt).forEach(en => {
                const re = new RegExp('\\b' + en + '\\b', 'g');
                text = text.replace(re, enToPt[en]);
            });
            text = text.replace(/Present/g, 'Presente');
        } else {
            Object.keys(ptToEn).forEach(pt => {
                const re = new RegExp('\\b' + pt + '\\b', 'g');
                text = text.replace(re, ptToEn[pt]);
            });
            text = text.replace(/Presente/g, 'Present');
        }
        el.textContent = text;
    });
}

// ensure dates reflect the initial language
translateDates(currentLang);
