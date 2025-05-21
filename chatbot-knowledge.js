// Bet That Knowledge Base for AI Chatbot
// This file contains structured information about Bet That that the chatbot can reference
console.log("Loading Bet That knowledge base...");

const betThatKnowledge = {
    // Company information
    company: {
        name: "Bet That",
        tagline: "Bet on anything, with anyone.",
        foundingYear: 2023,
        location: "Los Angeles, CA",
        founders: ["Trent Haithcox", "Jackson Bae", "Cody Lonardo"],
        contactEmail: "founders@betthat.io",
        socialMedia: {
            instagram: "@betthat.io",
            twitter: "@betthat_io",
            instagramUrl: "https://www.instagram.com/betthat.io/",
            twitterUrl: "https://x.com/betthat_io"
        },
        mission: "Formalize Internet Discourse and Put Your Money Where Your Mouth Is"
    },
    
    // Product information
    product: {
        name: "Bet That App",
        status: "Coming Soon",
        description: "A social prediction platform where users can create predictions and challenge friends.",
        uniqueSellingPoints: [
            "Peer-to-peer betting with no middleman",
            "Make predictions on anything, not just sports",
            "Social component lets you engage with friends",
            "No real money gambling",
            "User-moderated outcome determination"
        ],
        howItWorks: [
            {
                step: 1,
                title: "Post a Bet",
                description: "Make a prediction about anything — sports, music drops, trending drama, or even personal events. Set the terms and stakes."
            },
            {
                step: 2,
                title: "Challenge or Accept",
                description: "Invite friends to take your bet or browse public ones and join in. No bookie, no odds — just peer vs. peer."
            },
            {
                step: 3,
                title: "Win & Build Your Rep",
                description: "When you win, you get the satisfaction of being right. Build credibility and a reputation for accurate predictions."
            },
            {
                step: 4, 
                title: "Moderate & Play Free",
                description: "Help settle disputed bets. It's our way of keeping things fair and community-driven."
            }
        ],
        features: [
            "Create custom predictions on any topic",
            "Challenge specific friends or open to the community",
            "Track prediction history and success rate",
            "Earn reputation and bragging rights",
            "Community moderation for disputed outcomes"
        ]
    },
    
    // Legal information
    legal: {
        gambling: "We're building Bet That to operate within legal frameworks by focusing on social, peer-driven predictions — not acting as a traditional gambling operator. (More details coming soon as we finalize compliance.)",
        disclaimer: "Bet That is designed to operate within legal frameworks by focusing on social, peer-driven predictions rather than acting as a traditional gambling operator.",
        privacyPolicy: "We respect your privacy and protect your personal information. A detailed privacy policy is available on our website.",
        termsOfUse: "By using Bet That, you agree to our terms of service which prohibit illegal activity, harassment, and misuse of the platform."
    },
    
    // FAQ information
    faq: [
        {
            question: "Is Bet That gambling?",
            answer: "Bet That isn't a sportsbook — it's a peer-to-peer prediction platform where users create and accept friendly challenges. We don't set odds, take bets, or profit from outcomes. Think of it like a digital handshake — what you wager is between you and your opponent."
        },
        {
            question: "How does Bet That work?",
            answer: "You create a bet, set the terms, and challenge a friend (or the internet). If they accept, the wager is on. Once the outcome is clear, the winner gets the bragging rights and satisfaction of being right!"
        },
        {
            question: "What can I make predictions about?",
            answer: "Pretty much anything. Sports games, album drops, reality TV drama, crypto prices, your friend's dating life — if it can happen, you can bet on it. Just keep it respectful, legal, and fun."
        },
        {
            question: "How are outcomes determined?",
            answer: "First, our AI algorithm checks who wins each bet. If there is confusion, users from the community can step in to moderate. Moderators help resolve bets fairly."
        },
        {
            question: "What makes Bet That different from a sportsbook?",
            answer: "No odds, no house, no hidden fees. You're not betting against us — you're betting with or against other people. Just like it used to be."
        },
        {
            question: "Is Bet That legal?",
            answer: "We're building Bet That to operate within legal frameworks by focusing on social, peer-driven predictions — not acting as a traditional gambling operator. (More details coming soon as we finalize compliance.)"
        },
        {
            question: "How do I join Bet That?",
            answer: "Currently, Bet That is in development. You can join our waitlist by clicking 'Stay in the Loop' on our homepage to be notified when we launch."
        }
    ],
    
    // Job opportunities
    careers: {
        hiring: true,
        compensation: "Up to $3,000 for exceptional applicants",
        location: "UCLA-based",
        positions: [
            {
                title: "Student Developer",
                description: "Talented student programmers with experience in mobile or web development. Strong problem-solving skills and a passion for creating engaging user experiences."
            },
            {
                title: "Student Designer",
                description: "Creative UI/UX designers who can help craft intuitive, beautiful interfaces. Experience with mobile app design and a strong portfolio are valued."
            }
        ],
        benefits: [
            "Real-World Experience: Work on an actual product with real users and gain valuable startup experience.",
            "Compensation: Earn up to $3,000 for exceptional contributions to our team this quarter.",
            "UCLA Network: Connect with other talented UCLA students and alumni in the tech and startup space."
        ],
        applyUrl: "https://docs.google.com/forms/d/e/1FAIpQLSev_nmxk8RMnUAcDU72MfqbsN0fDCzlTqc7XfYenQSe314inQ/viewform"
    },
    
    // Technical details
    technical: {
        platform: "Mobile app (iOS & Android) with web companion",
        technologies: ["React Native", "Firebase", "Node.js"],
        security: "Industry-standard encryption and security protocols to protect user data",
        dataPrivacy: "We only collect essential information and never sell your data to third parties"
    }
};

// Make knowledge base available globally
if (typeof window !== 'undefined') {
    window.betThatKnowledge = betThatKnowledge;
    console.log("Bet That knowledge base initialized and globally available");
} 
