function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Event listener for "Download CV" button
document.getElementById('download-cv-btn').addEventListener('click', () => {
  // Create a temporary anchor element to trigger the download
  const link = document.createElement('a');
  link.href = './assets/prajwal resume.pdf';
  link.download = 'prajwal resume.pdf'; // This is the filename the user will see
  
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});

// Event listener for "Contact Info" button
document.getElementById('contact-info-btn').addEventListener('click', () => {
  location.href = './#contact';
});

// Add event listener to the hamburger icon itself
document.querySelector('.hamburger-icon').addEventListener('click', toggleMenu);

// --- Dark/Light Mode Toggle ---

const themeToggleDesktop = document.getElementById('theme-toggle-icon-desktop');
const themeToggleHamburger = document.getElementById('theme-toggle-icon-hamburger');
const body = document.body;
const sunIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Ccircle cx='12' cy='12' r='5'/%3E%3Cline x1='12' y1='1' x2='12' y2='3'/%3E%3Cline x1='12' y1='21' x2='12' y2='23'/%3E%3Cline x1='4.22' y1='4.22' x2='5.64' y2='5.64'/%3E%3Cline x1='18.36' y1='18.36' x2='19.78' y2='19.78'/%3E%3Cline x1='1' y1='12' x2='3' y2='12'/%3E%3Cline x1='21' y1='12' x2='23' y2='12'/%3E%3Cline x1='4.22' y1='19.78' x2='5.64' y2='18.36'/%3E%3Cline x1='18.36' y1='5.64' x2='19.78' y2='4.22'/%3E%3C/svg%3E";
const moonIcon = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z'%3E%3C/path%3E%3C/svg%3E";

// Function to set the theme
function setTheme(theme) {
  body.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (theme === 'dark') {
    if(themeToggleDesktop) themeToggleDesktop.src = moonIcon;
    if(themeToggleHamburger) themeToggleHamburger.src = moonIcon;
    if(themeToggleDesktop) themeToggleDesktop.alt = "Dark mode";
    if(themeToggleHamburger) themeToggleHamburger.alt = "Dark mode";
  } else {
    if(themeToggleDesktop) themeToggleDesktop.src = sunIcon;
    if(themeToggleHamburger) themeToggleHamburger.src = sunIcon;
    if(themeToggleDesktop) themeToggleDesktop.alt = "Light mode";
    if(themeToggleHamburger) themeToggleHamburger.alt = "Light mode";
  }
}

// Function to toggle the theme
function toggleTheme() {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  setTheme(newTheme);
}

// Event listeners for the toggle icons
if(themeToggleDesktop) themeToggleDesktop.addEventListener('click', toggleTheme);
if(themeToggleHamburger) themeToggleHamburger.addEventListener('click', toggleTheme);

// Check for saved theme in localStorage on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'light'; // Default to light
  setTheme(savedTheme);
});

// --- Scroll Animations ---

const revealSection = function (entries, observer) {
  const [entry] = entries;

  // Guard clause: do nothing if the section is not intersecting
  if (!entry.isIntersecting) return;

  // Remove the hidden class to reveal the section
  entry.target.classList.remove('section--hidden');
  
  // Stop observing the element after it has been revealed
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null, // Observing relative to the viewport
  threshold: 0.15, // Trigger when 15% of the section is visible
});

// Observe each section that has the 'section--hidden' class
document.querySelectorAll('.section--hidden').forEach(section => sectionObserver.observe(section));
