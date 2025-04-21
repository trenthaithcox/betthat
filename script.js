document.addEventListener('DOMContentLoaded', function() {
    // Initialize side menu functionality
    initializeSideMenu();
    
    // Add random movement to the floating emojis if they exist
    const floatingEmojis = document.querySelectorAll('.floating-emoji');
    if (floatingEmojis.length > 0) {
        floatingEmojis.forEach(emoji => {
            addRandomMovement(emoji);
        });
    }
    
    // Initialize parallax effect based on mouse movement if hero section exists
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        initializeParallax();
    }
    
    // Initialize waitlist counter display
    initializeWaitlistCounter();
    
    // Setup all waitlist-related buttons
    setupWaitlistButtons();
});

// Function to identify and set up all buttons that should increment the waitlist counter
function setupWaitlistButtons() {
    // Known button selectors that should increment the counter
    const potentialButtons = [
        '#waitlistButton',
        'button[type="submit"]',
        '.download-btn',
        '#stayInLoopButton'
    ];
    
    // Find all the buttons that match our selectors
    let buttons = [];
    potentialButtons.forEach(selector => {
        const found = document.querySelectorAll(selector);
        if (found.length > 0) {
            buttons = [...buttons, ...found];
        }
    });
    
    // For each button, add the incrementWaitlist functionality
    buttons.forEach(button => {
        // Skip if the button already has the click handler
        if (button.getAttribute('data-waitlist-handler') === 'true') {
            return;
        }
        
        button.addEventListener('click', function() {
            // If incrementWaitlistCount function exists (firebase-config.js is loaded), use it
            if (typeof incrementWaitlistCount === 'function') {
                incrementWaitlistCount();
            } else {
                // Otherwise, increment the counter directly in localStorage
                let count = localStorage.getItem('waitlistCount');
                count = count ? parseInt(count) : 2457;
                count += 1;
                localStorage.setItem('waitlistCount', count);
                console.log('Waitlist counter incremented to:', count);
                
                // Update all waitlist counter displays on the page
                updateAllCounterDisplays(count);
            }
        });
        
        // Mark this button as having the handler
        button.setAttribute('data-waitlist-handler', 'true');
    });
    
    console.log(`Setup ${buttons.length} waitlist increment buttons`);
}

// Function to initialize the waitlist counter display
function initializeWaitlistCounter() {
    const counterElements = document.querySelectorAll('.waitlist-counter, #userCounter');
    if (counterElements.length > 0) {
        console.log('Initializing waitlist counter displays');
        // If Firebase is loaded, let it handle the counter
        if (typeof getWaitlistCount === 'function') {
            // Firebase will initialize the counter on its own
            console.log('Firebase is handling the counter display');
        } else {
            // Otherwise, use localStorage
            let count = localStorage.getItem('waitlistCount');
            count = count ? parseInt(count) : 2457;
            console.log('Using localStorage counter value:', count);
            updateAllCounterDisplays(count);
        }
    }
}

// Function to update all counter displays on the page
function updateAllCounterDisplays(count) {
    const counterElements = document.querySelectorAll('.waitlist-counter, #userCounter');
    counterElements.forEach(element => {
        // If element is already showing a value, update it
        if (element) {
            element.textContent = count.toLocaleString();
        }
    });
}

// Function to initialize side menu toggle functionality
function initializeSideMenu() {
    const sideMenuToggle = document.getElementById('sideMenuToggle');
    const sideDrawer = document.getElementById('sideDrawer');
    const overlay = document.getElementById('overlay');
    
    if (sideMenuToggle && sideDrawer && overlay) {
        sideMenuToggle.addEventListener('click', function() {
            sideDrawer.classList.toggle('translate-x-full');
            sideDrawer.classList.toggle('translate-x-0');
            overlay.classList.toggle('hidden');
        });
        
        overlay.addEventListener('click', function() {
            sideDrawer.classList.remove('translate-x-0');
            sideDrawer.classList.add('translate-x-full');
            overlay.classList.add('hidden');
        });
    }
}

// Add random floating movement to emoji elements
function addRandomMovement(element) {
    // Set initial position
    element.style.top = Math.random() * 80 + 10 + '%';
    element.style.left = Math.random() * 80 + 10 + '%';
    
    // Generate random duration between 20-40 seconds
    const duration = Math.random() * 20000 + 20000;
    
    // Generate random direction for initial movement
    const directionX = Math.random() > 0.5 ? 1 : -1;
    const directionY = Math.random() > 0.5 ? 1 : -1;
    
    // Set animation
    setInterval(() => {
        // Get current position
        const currentTop = parseFloat(element.style.top);
        const currentLeft = parseFloat(element.style.left);
        
        // Generate small random movement (1-3%)
        const moveX = (Math.random() * 2 + 1) * directionX;
        const moveY = (Math.random() * 2 + 1) * directionY;
        
        // Calculate new position ensuring it stays within bounds (10%-90%)
        let newTop = currentTop + moveY;
        let newLeft = currentLeft + moveX;
        
        // Bounce off the edges
        if (newTop < 10) newTop = 10;
        if (newTop > 90) newTop = 90;
        if (newLeft < 10) newLeft = 10;
        if (newLeft > 90) newLeft = 90;
        
        // Apply new position with transition
        element.style.transition = `top ${duration/1000}s ease, left ${duration/1000}s ease`;
        element.style.top = newTop + '%';
        element.style.left = newLeft + '%';
    }, duration);
}

// Initialize parallax effect based on mouse movement
function initializeParallax() {
    const heroSection = document.querySelector('.hero-section');
    
    document.addEventListener('mousemove', function(e) {
        // Calculate mouse position relative to the center of the window
        const mouseX = e.clientX / window.innerWidth - 0.5;
        const mouseY = e.clientY / window.innerHeight - 0.5;
        
        // Apply subtle transform to create parallax effect
        heroSection.style.transform = `translate(${mouseX * -20}px, ${mouseY * -20}px)`;
    });
}

// Elements
const menuToggle = document.getElementById('menuToggle');
const closeMenu = document.getElementById('closeMenu');
const sideMenu = document.getElementById('sideMenu');
const overlay = document.getElementById('overlay');

// Open menu
menuToggle.addEventListener('click', function() {
    sideMenu.classList.add('open');
    overlay.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
});

// Close menu
function closeMenuFunc() {
    sideMenu.classList.remove('open');
    overlay.classList.remove('show');
    document.body.style.overflow = '';
}

closeMenu.addEventListener('click', closeMenuFunc);
overlay.addEventListener('click', closeMenuFunc);

// Close menu when clicking on a menu item (optional)
const menuItems = sideMenu.querySelectorAll('a');
menuItems.forEach(item => {
    item.addEventListener('click', closeMenuFunc);
});

// Add random movement to floating emojis for more playfulness
const emojis = document.querySelectorAll('.floating-emoji');

emojis.forEach(emoji => {
    // Apply random starting positions within constraints
    const randomX = Math.random() * 10 - 5; // -5px to 5px
    const randomY = Math.random() * 10 - 5; // -5px to 5px
    emoji.style.transform = `translate(${randomX}px, ${randomY}px)`;
});

// Add parallax effect to floating emojis
window.addEventListener('mousemove', function(e) {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    emojis.forEach((emoji, index) => {
        const offsetX = (mouseX - 0.5) * (index + 1) * 15;
        const offsetY = (mouseY - 0.5) * (index + 1) * 15;
        
        emoji.style.transform = `translate(${offsetX}px, ${offsetY}px)`;
    });
});

// Download button effect
const downloadBtn = document.querySelector('.download-btn');

downloadBtn.addEventListener('mouseenter', function() {
    this.classList.add('pulse');
});

downloadBtn.addEventListener('mouseleave', function() {
    this.classList.remove('pulse');
}); 