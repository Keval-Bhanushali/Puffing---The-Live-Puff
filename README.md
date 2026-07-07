# Puffing - The Live Puff Website

A premium, interactive, and fully responsive static website showcasing the **Puffing - The Live Puff** food outlet located in Vastrapur, Ahmedabad. 

This project was built using details and high-resolution media assets extracted from the outlet's official Google Maps listing ([maps.app.goo.gl/vt34mzyVvxKCi5uS9](https://maps.app.goo.gl/vt34mzyVvxKCi5uS9)).

---

## ✨ Features

- **Piping Hot Brand Aesthetics:** Dark-chocolate backgrounds combined with crispy golden-brown gradients represent freshly baked puff pastry.
- **The "Live Puff" Concept Section:** Explains the unique preparation steps of preparing, filling, cheese-topping, and baking puffs fresh for each order.
- **Interactive Live Menu:** Category filtering tabs (Specialty Puffs, Sides, Shakes) alongside a real-time text search box to filter products.
- **Dynamic Grid Gallery:** Displays 17 high-resolution imagery assets extracted from the location. Clicking any photo opens a custom fullscreen lightbox overlay with manual controls, caption matching, and keyboard support (Arrow keys and Escape).
- **Google Review Slider:** A clean carousel showcasing real Google reviews with a 4.4/5 star rating dashboard.
- **Dark-Themed Location Embed:** Customized dark-mode styling on a Google Maps iframe showing the exact outlet location at Vastrapur, Ahmedabad.
- **Working Contact Form:** Beautiful validation styles and visual success/error notifications.
- **100% Responsive & Light:** Responsive layouts (CSS Grid + Flexbox) optimized for mobile, tablet, and widescreen viewports with zero external JS frameworks.

---

## 📂 File Structure

```text
Puffing - The Live Puff/
├── index.html       # Main web structure & semantic layout
├── README.md        # This file
└── assets/          # Project assets
    ├── css/
    │   └── style.css # Clean styling, CSS variables, glassmorphism, responsive grids
    ├── js/
    │   └── app.js    # Interactivity logic (mobile toggle, lightbox, menu filters, carousel)
    └── images/
        └── favicon.svg # Custom brand favicon illustrating freshly baked puff pastry
```

---

## 🚀 How to Run Locally

Since this is a lightweight static website, no complex installers or build tools (like Node.js, Webpack, etc.) are needed:

### Method 1: Double-Click (Simple file path)
Simply open the folder and double-click the `index.html` file to run it directly inside any browser of your choice.

### Method 2: XAMPP Local Server (Recommended)
Since this directory is situated inside `htdocs`, start the Apache server in XAMPP control panel and navigate to:
```text
http://localhost/Puffing - The Live Puff/
```

### Method 3: Python local server
Run this command inside the project directory:
```bash
python3 -m http.server 8000
```
Then visit `http://localhost:8000` in your web browser.
