// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    const icon = document.getElementById('theme-icon');
    if (icon) {
        icon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
}

// Ticker Update
function updateTicker() {
    const tickerItems = document.querySelectorAll('.ticker-item-content');
    const now = new Date();
    const timeStr = now.toLocaleTimeString('ar-EG', { hour12: false });
    const dateStr = now.toLocaleDateString('ar-EG', { day: '2-digit', month: '2-digit', year: '2-digit' }).replace(/\//g, '.');
    
    tickerItems.forEach(item => {
        item.textContent = `${dateStr} في الساعة ${timeStr} بتوقيتك المحلي [09 مقالات متاحة]`;
    });
}

// Typewriter Utility (used in detail pages for metadata if needed)
function setupTypewriter(id, text, speed = 50) {
    const element = document.getElementById(id);
    if (!element) return;
    
    let index = 0;
    element.textContent = "";
    
    function type() {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Initial Setup
document.addEventListener('DOMContentLoaded', () => {
    // Theme initialization
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);
    
    // Ticker loop
    if (document.querySelector('.ticker')) {
        updateTicker();
        setInterval(updateTicker, 1000);
    }
    
    // Font size toggle in article page
    const smallBtn = document.getElementById('font-small');
    const largeBtn = document.getElementById('font-large');
    const articleBody = document.querySelector('.article-body');
    
    if (smallBtn && largeBtn && articleBody) {
        smallBtn.addEventListener('click', () => {
            articleBody.style.fontSize = '1.15rem';
            smallBtn.classList.add('active');
            largeBtn.classList.remove('active');
        });
        
        largeBtn.addEventListener('click', () => {
            articleBody.style.fontSize = '1.5rem';
            largeBtn.classList.add('active');
            smallBtn.classList.remove('active');
        });
    }
});
