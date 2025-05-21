# Bet That Website

This is the official website for Bet That, a social predictions platform.

## Features

- Responsive, mobile-first design
- Interactive hamburger menu with slide-out drawer
- Animated floating emoji elements
- Modern, clean UI with soft mint green theme
- Interactive button and UI element effects

## Tech Stack

- HTML5
- CSS3 with Tailwind CSS
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts (Poppins)

## Setup

This is a static website that can be deployed directly to GitHub Pages.

1. Fork or clone this repository
2. Enable GitHub Pages in your repository settings:
   - Go to Settings > Pages
   - Choose "main" as the source branch
   - Save to deploy

## Local Development

To run this website locally:

```bash
# Install dependencies
npm install

# Start the development server
npm start
```

The site will be available at http://localhost:8000

## Design Elements

- Mint green color palette
- Floating emoji-style animations
- Rounded corners and soft shadows
- Mobile-first responsive layout

## Form Handling

The contact and signup forms are configured to work in two ways:

1. **Local Development:** When running locally, forms submit to a Node.js server that saves data to JSON files in the `data/` directory.

2. **Production (GitHub Pages):** When deployed to GitHub Pages, forms use [Formspree](https://formspree.io/) for handling submissions.

## Deployment

This site is deployed using GitHub Pages. Any push to the `main` branch will trigger a deployment via GitHub Actions.

### Setting up Formspree

Before deployment, you need to:

1. Create a free account at [Formspree](https://formspree.io/)
2. Create a new form and get your form ID
3. Replace `yourformspree_id_here` in both `contact.html` and `signup.html` with your actual Formspree form ID

## License

MIT License
