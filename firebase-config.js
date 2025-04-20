// Firebase configuration for Bet That waitlist counter
// Replace this configuration with your actual Firebase project credentials
// from your Firebase console: Project Settings > Your Apps > SDK setup and configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVe1TbVV1aem-i9M54zAh5rx1GuCYGt44",
  authDomain: "bet-that-17a7e.firebaseapp.com",
  databaseURL: "https://bet-that-17a7e-default-rtdb.firebaseio.com",
  projectId: "bet-that-17a7e",
  storageBucket: "bet-that-17a7e.firebasestorage.app",
  messagingSenderId: "505082197838",
  appId: "1:505082197838:web:98d8255889adc452dc901f",
  measurementId: "G-2MYRLPMSV7"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const counterRef = database.ref('waitlistCounter');

// Get current count from Firebase
function getWaitlistCount(callback) {
  counterRef.once('value', (snapshot) => {
    // Check if the value exists in Firebase
    if (snapshot.exists()) {
      const count = snapshot.val();
      console.log("Counter value from Firebase:", count);
      callback(count);
    } else {
      // Initialize the counter in Firebase if it doesn't exist
      console.log("Counter not found in Firebase, initializing to 2457");
      const defaultCount = 2457;
      counterRef.set(defaultCount)
        .then(() => {
          console.log("Counter initialized successfully");
          callback(defaultCount);
        })
        .catch(error => {
          console.error("Error initializing counter:", error);
          // Fall back to local value if Firebase write fails
          callback(defaultCount);
        });
    }
  }).catch(error => {
    console.error("Error fetching counter:", error);
    // Fall back to default value in case of error
    callback(2457);
  });
}

// Increment the counter in Firebase
function incrementWaitlistCount(callback) {
  console.log("Attempting to increment waitlist counter");
  
  // Use Firebase transaction to safely increment the counter
  counterRef.transaction((currentCount) => {
    console.log("Transaction running, current count:", currentCount);
    
    // If counter doesn't exist yet, initialize it
    if (currentCount === null) {
      return 2457 + 1;
    }
    
    // Otherwise increment the existing count
    return currentCount + 1;
  }, (error, committed, snapshot) => {
    if (error) {
      console.error('Error incrementing counter:', error);
      return;
    }
    
    if (committed) {
      const newCount = snapshot.val();
      console.log("Counter successfully incremented to:", newCount);
      
      if (callback) callback(newCount);
      
      // Update all counter displays on the page
      const counterElements = document.querySelectorAll('.waitlist-counter, #userCounter');
      counterElements.forEach(element => {
        updateCounterDisplay(element, newCount);
      });
    } else {
      console.warn("Counter increment transaction was not committed");
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
    // Initially show placeholder content
    counterElement.textContent = "...";
    
    console.log("Fetching waitlist count from Firebase");
    getWaitlistCount((count) => {
      console.log("Received waitlist count:", count);
      
      // Set counter text directly first for immediate display
      updateCounterDisplay(counterElement, count);
      
      // Set up animation after we have the count
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            console.log("Counter in view, starting animation from 0 to", count);
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