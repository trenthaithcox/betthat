// Firebase configuration for Bet That waitlist counter
const firebaseConfig = {
  apiKey: "AIzaSyC0qGKB0JLjgW_dKBXI7uJVz-NGdF-vJO8",
  authDomain: "betthat-waitlist.firebaseapp.com",
  projectId: "betthat-waitlist",
  storageBucket: "betthat-waitlist.appspot.com",
  messagingSenderId: "912345678901",
  appId: "1:912345678901:web:abc123def456ghi789jkl",
  databaseURL: "https://betthat-waitlist-default-rtdb.firebaseio.com"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const counterRef = database.ref('waitlistCounter');

// Get current count from Firebase
function getWaitlistCount(callback) {
  counterRef.once('value', (snapshot) => {
    const count = snapshot.val() || 2457; // Default to 2457 if no value exists
    callback(count);
  });
}

// Increment the counter in Firebase
function incrementWaitlistCount(callback) {
  // Use Firebase transaction to safely increment the counter
  counterRef.transaction((currentCount) => {
    return (currentCount || 2457) + 1;
  }, (error, committed, snapshot) => {
    if (error) {
      console.error('Error incrementing counter:', error);
      return;
    }
    
    if (committed) {
      const newCount = snapshot.val();
      if (callback) callback(newCount);
    }
  });
}

// Update local display with count from Firebase
function updateCounterDisplay(counterElement, count) {
  if (counterElement) {
    counterElement.textContent = count.toLocaleString();
  }
}

// Initialize counter when the script loads 
window.addEventListener('DOMContentLoaded', () => {
  const counterElement = document.getElementById('userCounter');
  if (counterElement) {
    getWaitlistCount((count) => {
      updateCounterDisplay(counterElement, count);
      
      // Set up animation only after we have the count
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            animateCounter(counterElement, 0, count, 2000);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });
      
      observer.observe(counterElement);
    });
  }
});

// Function to animate counter
function animateCounter(element, start, end, duration) {
  let startTimestamp = null;
  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    const currentValue = Math.floor(progress * (end - start) + start);
    element.textContent = currentValue.toLocaleString();
    
    if (progress < 1) {
      window.requestAnimationFrame(step);
    }
  };
  window.requestAnimationFrame(step);
} 