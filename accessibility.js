// accessibility.js
let colorblindMode = false;
let highContrastMode = false;
let fontSize = 1; // 0 = pequeno, 1 = médio, 2 = grande
let colorblindType = 'normal';

function toggleColorblindMode() {
    colorblindMode = !colorblindMode;
    localStorage.setItem('colorblindMode', colorblindMode);
    applyColorblindMode();
}

function toggleHighContrastMode() {
    highContrastMode = !highContrastMode;
    localStorage.setItem('highContrastMode', highContrastMode);
    applyHighContrastMode();
}

function changeFontSize(size) {
    fontSize = size;
    localStorage.setItem('fontSize', fontSize);
    applyFontSize();
    updateFontSizeSlider();
}

function changeColorblindType() {
    const select = document.getElementById('colorblind-type');
    colorblindType = select.value;
    localStorage.setItem('colorblindType', colorblindType);
    applyColorblindMode();
}

function applyColorblindMode() {
    const filters = {
        normal: 'none',
        protanomaly: 'url("#protanomaly-filter")',
        deuteranomaly: 'url("#deuteranomaly-filter")',
        tritanomaly: 'url("#tritanomaly-filter")',
        protanopia: 'url("#protanopia-filter")',
        deuteranopia: 'url("#deuteranopia-filter")',
        tritanopia: 'url("#tritanopia-filter")',
        achromatopsia: 'url("#achromatopsia-filter")',
        achromatomaly: 'url("#achromatomaly-filter")'
    };

    document.body.style.filter = filters[colorblindType];
}

function applyHighContrastMode() {
    if (highContrastMode) {
        document.body.classList.add('high-contrast');
    } else {
        document.body.classList.remove('high-contrast');
    }
}

function applyFontSize() {
    const sizes = ['14px', '16px', '18px'];
    document.body.style.fontSize = sizes[fontSize];
}

function updateFontSizeSlider() {
    const fontSizeRange = document.getElementById('font-size-range');
    if (fontSizeRange) {
        fontSizeRange.value = fontSize;
    }
}

function loadSettings() {
    colorblindMode = localStorage.getItem('colorblindMode') === 'true';
    highContrastMode = localStorage.getItem('highContrastMode') === 'true';
    fontSize = parseInt(localStorage.getItem('fontSize'));
    colorblindType = localStorage.getItem('colorblindType') || 'normal';
    
    if (isNaN(fontSize) || fontSize < 0 || fontSize > 2) {
        fontSize = 1;
    }

    applyColorblindMode();
    applyHighContrastMode();
    applyFontSize();
    updateFontSizeSlider();

    const colorblindTypeSelect = document.getElementById('colorblind-type');
    if (colorblindTypeSelect) {
        colorblindTypeSelect.value = colorblindType;
    }
}

window.addEventListener('DOMContentLoaded', () => {
    const fontSizeRange = document.getElementById('font-size-range');
    if (fontSizeRange) {
        fontSizeRange.addEventListener('input', (e) => {
            changeFontSize(parseInt(e.target.value));
        });
    }
});

window.onload = loadSettings;

// Adicione os filtros SVG ao final do body
document.body.insertAdjacentHTML('beforeend', `
    <svg xmlns="http://www.w3.org/2000/svg" style="display: none;">
        <defs>
            <filter id="protanomaly-filter">
                <feColorMatrix type="matrix" values="0.817,0.183,0,0,0 0.333,0.667,0,0,0 0,0.125,0.875,0,0 0,0,0,1,0"/>
            </filter>
            <filter id="deuteranomaly-filter">
                <feColorMatrix type="matrix" values="0.8,0.2,0,0,0 0.258,0.742,0,0,0 0,0.142,0.858,0,0 0,0,0,1,0"/>
            </filter>
            <filter id="tritanomaly-filter">
                <feColorMatrix type="matrix" values="0.967,0.033,0,0,0 0,0.733,0.267,0,0 0,0.183,0.817,0,0 0,0,0,1,0"/>
            </filter>
            <filter id="protanopia-filter">
                <feColorMatrix type="matrix" values="0.567,0.433,0,0,0 0.558,0.442,0,0,0 0,0.242,0.758,0,0 0,0,0,1,0"/>
            </filter>
            <filter id="deuteranopia-filter">
                <feColorMatrix type="matrix" values="0.625,0.375,0,0,0 0.7,0.3,0,0,0 0,0.3,0.7,0,0 0,0,0,1,0"/>
            </filter>
            <filter id="tritanopia-filter">
                <feColorMatrix type="matrix" values="0.95,0.05,0,0,0 0,0.433,0.567,0,0 0,0.475,0.525,0,0 0,0,0,1,0"/>
            </filter>
            <filter id="achromatopsia-filter">
                <feColorMatrix type="matrix" values="0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0.299,0.587,0.114,0,0 0,0,0,1,0"/>
            </filter>
            <filter id="achromatomaly-filter">
                <feColorMatrix type="matrix" values="0.618,0.320,0.062,0,0 0.163,0.775,0.062,0,0 0.163,0.320,0.516,0,0 0,0,0,1,0"/>
            </filter>
        </defs>
    </svg>
`);