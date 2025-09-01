# Mi Chic Website

A beautiful, responsive e-commerce website for premium beauty products.

## Features

- ✅ Working login/signup functionality
- ✅ Shopping cart with add/remove items
- ✅ Responsive design with mobile hamburger menu
- ✅ Separate product pages (Perfumes, Skincare, Makeup)
- ✅ Professional product images
- ✅ Social media footer with 2025 copyright

## How to Run

### Option 1: Using Live Server (Recommended)
1. Install the "Live Server" extension in VS Code
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. The website will open in your browser with full functionality

### Option 2: Using Python HTTP Server
1. Open terminal in the project directory
2. Run: `python -m http.server 8000`
3. Open browser and go to: `http://localhost:8000`

### Option 3: Using Node.js HTTP Server
1. Install http-server globally: `npm install -g http-server`
2. Run: `http-server`
3. Open the provided URL in your browser

## File Structure

```
mi-chic-rebuilt/
├── index.html          # Home page
├── perfumes.html       # Perfumes product page
├── skincare.html       # Skincare product page
├── makeup.html         # Makeup product page
├── styles.css          # Main stylesheet
├── script.js           # JavaScript functionality
├── mi_chic_logo.png    # Brand logo
└── images/             # Product images
    ├── skin.avif
    ├── make1.avif
    ├── makeup.avif
    ├── perfume1.avif
    ├── perfume2.avif
    └── additional/     # Additional high-quality images
        ├── perfume_new.jpg
        ├── skincare_new1.jpg
        ├── skincare_new2.jpg
        ├── makeup_new1.jpg
        └── makeup_new2.jpg
```

## Troubleshooting

### Images Not Loading
If images are not loading:

1. **Check Console**: Open browser developer tools (F12) and check the console for error messages
2. **File Paths**: Ensure all image files are in the correct directories
3. **Server Required**: The website requires a local server to function properly (not just opening HTML files directly)
4. **Cache**: Try hard refresh (Ctrl+F5) to clear browser cache

### JavaScript Not Working
If the interactive features aren't working:

1. **Enable JavaScript**: Ensure JavaScript is enabled in your browser
2. **Console Errors**: Check browser console for JavaScript errors
3. **File Loading**: Ensure `script.js` is loading properly

## Product Categories

- **Perfumes**: 3 luxury fragrances with premium scents
- **Skincare**: 4 professional skincare products for all skin types
- **Makeup**: 4 high-quality makeup products for perfect looks

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Support

If you encounter any issues, please check:
1. All files are in the correct directories
2. You're using a local server (not opening files directly)
3. JavaScript is enabled in your browser
4. Images are in the `images/` directory

