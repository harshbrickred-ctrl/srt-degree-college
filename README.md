# SRT Degree College Website

A simple, modern marketing website for **SRT Degree College** (College Code: 1290).

Built with plain **HTML, CSS, and JavaScript** — no build step, no dependencies. Deploy anywhere in minutes.

## Sections

- Home
- About Us (College info, Principal's & Founder's messages)
- Programmes (B.Com, B.A.F, B.A)
- Prospectus
- Infrastructure
- Admission (UG courses, online admission)
- Gallery (Images & Videos)
- Notices & Circulars
- Contact Us

## Local Preview

Open `index.html` in your browser, or run a local server:

```bash
# Python
python -m http.server 8000

# Node.js (if npx is available)
npx serve .
```

Then visit `http://localhost:8000`

## Deploy to Live (Free Options)

### Option 1: Netlify (Recommended — easiest)

1. Go to [netlify.com](https://www.netlify.com) and sign up (free)
2. Drag and drop the entire `SRT_DegreeCollege` folder onto the Netlify dashboard
3. Your site is live instantly with a URL like `https://random-name.netlify.app`
4. Add a custom domain in Site Settings → Domain Management

### Option 2: Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Import the project folder or connect a GitHub repo
3. Deploy — no configuration needed for static HTML

### Option 3: GitHub Pages

1. Push this folder to a GitHub repository
2. Go to Settings → Pages → Source: `main` branch, folder `/ (root)`
3. Site will be at `https://yourusername.github.io/repo-name`

### Option 4: Cloudflare Pages

1. Go to [pages.cloudflare.com](https://pages.cloudflare.com)
2. Upload the folder or connect Git
3. Deploy with zero config

## Customization Checklist

Before going live, update these placeholders:

| Item | Location |
|------|----------|
| College address | `#contact` section in `index.html` |
| Email address | Footer & Contact section |
| Google Form link | `#google-form-link` in `index.html` |
| Prospectus PDF | Upload PDF and update download link |
| Gallery images | Replace placeholder divs with `<img>` tags |
| Video embeds | Add YouTube/Vimeo iframe in gallery videos section |
| Notice content | Update notice cards with real announcements |
| Principal/Founder messages | Edit text in About section |

## Contact Form Setup

The contact form shows a demo alert. For real submissions, choose one:

- **Google Forms**: Create a form, embed or redirect to it
- **Formspree**: Sign up at formspree.io, set form `action` to your endpoint
- **Netlify Forms**: Add `netlify` attribute to `<form>` when deployed on Netlify

## File Structure

```
SRT_DegreeCollege/
├── index.html          # Main page (all sections)
├── images/
│   └── logo.png        # College logo
├── css/
│   └── style.css       # Styles & animations
├── js/
│   └── main.js         # Navigation, tabs, scroll effects
└── README.md
```

## Tech Stack

- HTML5
- CSS3 (custom properties, flexbox, grid, animations)
- Vanilla JavaScript (Intersection Observer, smooth scroll)
- Google Fonts (Inter + Playfair Display)

No frameworks. No npm install. Just upload and go live.
