// Simple AI Chatbot Implementation for Bet That
console.log("Simple Chatbot Starting");

// Wait for page load
window.addEventListener('load', function() {
    console.log("Window loaded, creating chatbot elements");
    
    // Create toggle button
    const toggle = document.createElement('div');
    toggle.className = 'ai-chatbot-toggle';
    toggle.innerHTML = '<i class="fas fa-robot"></i>';
    toggle.style.cssText = 'position:fixed; bottom:20px; right:20px; width:70px; height:70px; border-radius:50%; background-color:#4096FF; color:white; display:flex; align-items:center; justify-content:center; cursor:pointer; box-shadow:0 5px 15px rgba(0,0,0,0.2); z-index:1000;';
    
    // Create chat window
    const container = document.createElement('div');
    container.className = 'ai-chatbot-container';
    container.style.cssText = 'position:fixed; bottom:100px; right:20px; width:350px; height:500px; background-color:white; border-radius:16px; box-shadow:0 8px 24px rgba(0,0,0,0.15); display:flex; flex-direction:column; z-index:999; opacity:0; transform:translateY(20px); pointer-events:none; transition:opacity 0.3s ease, transform 0.3s ease;';
    
    container.innerHTML = `
        <div style="padding:16px; background-color:#4096FF; color:white; display:flex; align-items:center; justify-content:space-between; border-top-left-radius:16px; border-top-right-radius:16px;">
            <h3 style="margin:0; font-weight:600;">Bet That Assistant</h3>
            <button class="ai-chatbot-close" style="background:none; border:none; color:white; cursor:pointer; font-size:20px;"><i class="fas fa-times"></i></button>
        </div>
        <div class="ai-chatbot-messages" style="flex:1; overflow-y:auto; padding:16px; display:flex; flex-direction:column; gap:12px;"></div>
        <div style="padding:12px 16px; border-top:1px solid #eaeaea; display:flex; gap:8px;">
            <input type="text" class="ai-chatbot-input" placeholder="Ask me anything..." style="flex:1; padding:12px 16px; border:1px solid #eaeaea; border-radius:24px; font-size:14px; outline:none;">
            <button class="ai-chatbot-send" style="background-color:#4096FF; color:white; border:none; width:40px; height:40px; border-radius:50%; display:flex; align-items:center; justify-content:center; cursor:pointer;"><i class="fas fa-paper-plane"></i></button>
        </div>
    `;
    
    // Add to document
    document.body.appendChild(toggle);
    document.body.appendChild(container);
    
    console.log("Chatbot elements created");
    
    // Setup event handlers
    toggle.addEventListener('click', function() {
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
        container.style.pointerEvents = 'all';
        
        const messages = document.querySelector('.ai-chatbot-messages');
        if (messages && messages.children.length === 0) {
            addBotMessage("Hi there! 👋 I'm the Bet That Assistant. How can I help you today?");
            
            // Add suggested questions after a brief delay
            setTimeout(() => {
                addBotMessage("You can ask me about:<br>• How Bet That works<br>• Creating predictions<br>• Inviting friends<br>• Who we are<br>• Or anything else!");
            }, 1000);
        }
    });
    
    // Close button
    document.querySelector('.ai-chatbot-close').addEventListener('click', function() {
        container.style.opacity = '0';
        container.style.transform = 'translateY(20px)';
        container.style.pointerEvents = 'none';
    });
    
    // Send message
    const sendMessage = function() {
        const input = document.querySelector('.ai-chatbot-input');
        const message = input.value.trim();
        if (message === '') return;
        
        // Add user message
        addUserMessage(message);
        input.value = '';
        
        // Show thinking animation
        const thinkingElem = document.createElement('div');
        thinkingElem.className = 'ai-chatbot-message bot thinking';
        thinkingElem.style.cssText = 'max-width:85%; padding:12px 16px; border-radius:18px; font-size:14px; line-height:1.4; background-color:#f0f2f5; color:#333; align-self:flex-start; border-bottom-left-radius:4px; display:flex; align-items:center; gap:4px;';
        thinkingElem.innerHTML = '<span style="width:8px; height:8px; background-color:#aaa; border-radius:50%; display:inline-block; animation:pulse 1.4s infinite ease-in-out;"></span><span style="width:8px; height:8px; background-color:#aaa; border-radius:50%; display:inline-block; animation:pulse 1.4s infinite ease-in-out; animation-delay:0.2s;"></span><span style="width:8px; height:8px; background-color:#aaa; border-radius:50%; display:inline-block; animation:pulse 1.4s infinite ease-in-out; animation-delay:0.4s;"></span>';
        
        document.querySelector('.ai-chatbot-messages').appendChild(thinkingElem);
        scrollToBottom();
        
        // Generate response after delay
        setTimeout(() => {
            document.querySelector('.ai-chatbot-messages').removeChild(thinkingElem);
            
            // Generate response based on input
            const response = generateResponse(message);
            addBotMessage(response);
        }, Math.random() * 1000 + 1000);
    };
    
    // Send on button click
    document.querySelector('.ai-chatbot-send').addEventListener('click', sendMessage);
    
    // Send on Enter key
    document.querySelector('.ai-chatbot-input').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Helper function to add user message
    function addUserMessage(text) {
        const message = document.createElement('div');
        message.style.cssText = 'max-width:85%; padding:12px 16px; border-radius:18px; font-size:14px; line-height:1.4; background-color:#4096FF; color:white; align-self:flex-end; border-bottom-right-radius:4px;';
        message.textContent = text;
        document.querySelector('.ai-chatbot-messages').appendChild(message);
        scrollToBottom();
    }
    
    // Helper function to add bot message
    function addBotMessage(text) {
        const message = document.createElement('div');
        message.style.cssText = 'max-width:85%; padding:12px 16px; border-radius:18px; font-size:14px; line-height:1.4; background-color:#f0f2f5; color:#333; align-self:flex-start; border-bottom-left-radius:4px;';
        message.innerHTML = text;
        document.querySelector('.ai-chatbot-messages').appendChild(message);
        scrollToBottom();
    }
    
    // Scroll chat to bottom
    function scrollToBottom() {
        const messages = document.querySelector('.ai-chatbot-messages');
        messages.scrollTop = messages.scrollHeight;
    }
    
    // Generate response based on input and knowledge base
    function generateResponse(input) {
        input = input.toLowerCase();
        
        // Try to use knowledge base if available
        const knowledge = window.betThatKnowledge || {};
        
        // Greetings
        if (input.match(/\b(hello|hi|hey|greetings|howdy|sup|yo|hiya)\b/i)) {
            return "Hello! How can I assist you with Bet That today?";
        }
        
        // Location/founding specific questions
        if (input.match(/\b(where|location|based|headquarter|office|from)\b.*\b(is|are|was|does|did)\b/i) || 
            input.match(/\b(where|location)\b.*\b(found|found\w+|locat\w+|base\w+|from|start\w+)\b/i)) {
            const company = knowledge.company || {};
            return `Bet That is based in ${company.location || "Los Angeles, CA"}. It was founded in ${company.foundingYear || "2023"}.`;
        }
        
        // When founded questions
        if (input.match(/\b(when|what year|what date|how long|since when)\b.*\b(found|start|create|establish|launch|begin|open)\w*\b/i)) {
            const company = knowledge.company || {};
            return `Bet That was founded in ${company.foundingYear || "2023"}.`;
        }
        
        // Founder specific questions
        if (input.match(/\b(who|which|what)\b.*\b(found|start|create|launch|make|build|own|run)\w*\b/i) ||
            input.match(/\b(founder|creator|owner|ceo|team)\b/i)) {
            const company = knowledge.company || {};
            const foundersList = company.founders ? company.founders.join(", ") : "a team of entrepreneurs";
            return `Bet That was founded by ${foundersList}.`;
        }
        
        // Company/mission questions
        if (input.match(/\b(what|tell|explain)\b.*\b(about|is|does|mission|vision|goal|aim|purpose|company|startup)\b/i)) {
            const company = knowledge.company || {};
            return `Bet That is a ${company.location || "Los Angeles"}-based startup. ${company.mission || "We're bringing back the handshake bet — no bookie, no vig."}`;
        }
        
        // Contact information questions
        if (input.match(/\b(how|where|contact|reach|email|talk|touch|connect|social|instagram|twitter|dm)\b.*\b(you|team|bet that|contact|reach|get)\b/i) ||
            input.match(/\b(contact|email|phone|instagram|twitter|social media)\b/i)) {
            const company = knowledge.company || {};
            return `You can reach us at ${company.contactEmail || "founders@betthat.io"}. You can also find us on Instagram at ${company.socialMedia?.instagram || "@betthat.io"} or Twitter/X at ${company.socialMedia?.twitter || "@betthat_io"}.`;
        }
        
        // How it works questions
        if (input.match(/\b(how|what|explain|tell)\b.*\b(work|use|play|function|operate|predict|place|create|make)\b/i)) {
            return "Bet That is a social prediction platform where you can create predictions and challenge friends! Here's how it works:<br><br><strong>1. Post a Bet</strong>: Make a prediction about anything.<br><strong>2. Challenge or Accept</strong>: Invite friends to take your bet.<br><strong>3. Win & Build Your Rep</strong>: When you win, you get the satisfaction of being right!<br><strong>4. Moderate & Play Free</strong>: Help settle disputed bets.";
        }
        
        // Prediction/bet questions
        if (input.match(/\b(prediction|bet|wager|challenge|contest)\b/i) && 
            !input.match(/\b(where|located|location|founded|who|when)\b/i)) {
            return "Creating a prediction is easy! Just choose an outcome, set stakes, invite friends, and track results. You can bet on anything from sports games to album drops, reality TV drama, crypto prices, or even your friend's dating life.";
        }
        
        // Friends/social features questions
        if (input.match(/\b(friend|social|invite|challenge|share|refer)\b/i)) {
            return "You can invite friends via email, SMS, or social media to join your predictions. Challenge them directly, or open your predictions to the whole community. The more friends you invite, the more fun predictions become!";
        }
        
        // Gambling/legal questions
        if (input.match(/\b(gambl|legal|money|cash|real|currency|pay|dollar|bet|wager)\b/i)) {
            return "We're building Bet That to operate within legal frameworks by focusing on social, peer-driven predictions — not acting as a traditional gambling operator. (More details coming soon as we finalize compliance.)";
        }
        
        // Sign up/join questions
        if (input.match(/\b(sign|join|register|download|get|install|use|try|test|access|available)\b/i)) {
            return `Currently, Bet That is ${knowledge.product?.status?.toLowerCase() || "coming soon"}. You can join our waitlist by clicking 'Stay in the Loop' on our homepage or visiting our <a href='signup.html' style='color:#4096FF'>signup page</a> directly!`;
        }
        
        // Job/career questions
        if (input.match(/\b(job|hire|hiring|career|work|position|employment|apply|join.*team|opportunit)\b/i)) {
            const careers = knowledge.careers || {};
            return `${careers.hiring ? "Yes, we're hiring!" : "We're not currently hiring."} ${careers.hiring ? `We have positions for ${careers.positions?.map(p => p.title).join(", ") || "developers and designers"}. You can apply through our <a href='join-team.html' style='color:#4096FF'>Join Our Team</a> page.` : ""}`;
        }
        
        // Thank you responses
        if (input.match(/\b(thank|thanks|thx|ty|appreciate)\b/i)) {
            return "You're welcome! Is there anything else I can help you with?";
        }
        
        // Default response
        return "Thanks for your question! We're still improving our AI assistant. For specific details about Bet That, please check our <a href='faq.html' style='color:#4096FF'>FAQ page</a> or contact us at founders@betthat.io.";
    }
    
    console.log("Chatbot initialization complete");
}); 