// Chatbot loader - handles loading sequence for chatbot
console.log("Chatbot loader initializing");

// Function to load the chatbot
function loadChatbot() {
    console.log("Starting chatbot loading sequence");
    
    // First, load the knowledge base
    const knowledgeScript = document.createElement('script');
    knowledgeScript.src = 'chatbot-knowledge.js';
    knowledgeScript.async = true;
    
    // Once knowledge base is loaded, load the chatbot script
    knowledgeScript.onload = function() {
        console.log("Knowledge base loaded successfully");
        
        // Create and add the chatbot script
        const chatbotScript = document.createElement('script');
        chatbotScript.src = 'chatbot.js';
        chatbotScript.async = true;
        
        chatbotScript.onload = function() {
            console.log("Chatbot script loaded successfully");
            // The chatbot.js will initialize itself
        };
        
        chatbotScript.onerror = function() {
            console.error("Failed to load chatbot script");
        };
        
        document.body.appendChild(chatbotScript);
    };
    
    knowledgeScript.onerror = function() {
        console.error("Failed to load knowledge base");
    };
    
    // Add the knowledge script to the document
    document.body.appendChild(knowledgeScript);
}

// Initialize when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM loaded, calling loadChatbot()");
    loadChatbot();
});

// Fallback if DOMContentLoaded already fired
if (document.readyState === 'interactive' || document.readyState === 'complete') {
    console.log("DOM already loaded, calling loadChatbot() directly");
    loadChatbot();
} 