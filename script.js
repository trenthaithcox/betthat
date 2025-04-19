document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const sideMenu = document.getElementById('sideMenu');
    const overlay = document.getElementById('overlay');
    
    // Check if we need to increment the waitlist counter (after form submission)
    if (localStorage.getItem('incrementWaitlist') === 'true') {
        // Clear the flag
        localStorage.removeItem('incrementWaitlist');
        
        // Wait for the counter function to be available (it's defined in index.html)
        setTimeout(function() {
            // Only increment if we're on the homepage or if the function exists
            if (window.incrementWaitlistCounter) {
                window.incrementWaitlistCounter();
            } else if (window.location.pathname !== '/index.html' && 
                      window.location.pathname !== '/' && 
                      window.location.pathname !== '/betthat/' && 
                      window.location.pathname !== '/betthat/index.html') {
                // If we're not on the homepage, store the flag to increment later
                localStorage.setItem('pendingIncrement', 'true');
            }
        }, 1000);
    }
    
    // If there's a pending increment and we're on the homepage
    if (localStorage.getItem('pendingIncrement') === 'true' && window.incrementWaitlistCounter) {
        localStorage.removeItem('pendingIncrement');
        window.incrementWaitlistCounter();
    }
    
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
}); 