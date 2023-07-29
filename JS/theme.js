// Imports 

import { themeButtons as buttons } from "../JS/main.js";

// Store icons and colors for light and dark mode

const lightModeIcon = '<i class="fa-regular fa-sun"></i>';
const darkModeIcon = '<li class= "fa-regular fa-moon"></i>';
const darkColors = ['#ff8a00', '#fff', '#13071c', '#1a0725'];
const lightColors = ['#ff8a00', '#fff', '#fff', '#E6E6E6'];
const colorVariables = ['--primary-text', 'secondary-text', '--primary-background', '--secondary-background'];

// Using sessions storage and toggling between themes

export function setTheme() {
    let mode = sessionStorage.getItem('mode');
    if (mode === 'dark') {
        setLightMode();
    } else {
        setDarkMode();
    }
}

export function setDarkMode() {
    sessionStorage.setItem('mode', 'dark');
    buttons.forEach(button => {
        button.innerHTML = darkModeIcon;
    });
    for (let i = 0; i < darkColors.length; i++) {
        setStyleProperty(colorVariables[i], darkColors[i]);
    };
}

export function setLightMode() {
    sessionStorage.setItem('mode', 'light');
    buttons.forEach(button => {
        button.innerHTML = lightModeIcon;
    });
    for (let i = 0; i < lightColors.length; i++) {
        setStyleProperty(colorVariables[i], lightColors[i]);
    };
}

function setStyleProperty(property, color) {
    document.documentElement.style.setProperty(property, color);
}