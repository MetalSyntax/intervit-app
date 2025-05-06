# Commercial Visit Registration Application

Web application for managing commercial visits with product registration, built with Vue.js, Nuxt.js, and Tailwind CSS.

## 🚀 Key Features

- **Smart Form:**
  - Automatic visit date field
  - Client registration with validation
  - Visit frequency and region/zone selectors (Venezuela)
  
- **Product Management:**
  - Product selection from local JSON
  - Detailed product preview
  - Add/remove product system
  - Interactive list with complete details (code, description, line)

- **Data Export:**
  - CSV generation with all records
  - Dynamic filename with date
  - Automatic field reset post-export

- **Advanced UI/UX:**
  - Animated toast notifications
  - Responsive adaptive design
  - Custom color palette (#e89e16, #ebbe1c, #4e4e4d, #d43123)
  - Smooth hover effects and transitions
  - Visual feedback for critical actions

- **Reusable Components:**
  - Customizable navbar with logo
  - Modular form with validations
  - Integrated notification system
  - Dynamic footer with copyright

## 🛠 Technologies Used

- **Frontend:**
  - Vue.js 3.x
  - Nuxt.js 3.x
  - Tailwind CSS 3.x
  - TypeScript
  - PostCSS
  - Autoprefixer

- **Additional Features:**
  - Custom CSS transitions
  - Local JSON management
  - Service Worker support
  - Progressive Web App (PWA) capabilities

## 📁 Project Structure

```
├── assets/
│   ├── data/                # Product JSON data
│   └── styles/             # Global CSS configurations
├── components/             # Reusable Vue components
├── public/                 # Static assets (logo.png)
├── server/                 # Server-side code
├── service-worker/         # PWA service worker
├── nuxt.config.ts          # Nuxt configuration
├── tailwind.config.js      # Tailwind configuration
└── package.json
```

## ⚙️ Configuration

1. Environment Variables:
```bash
NUXT_PORT=3000
NUXT_HOST=localhost
```

2. Tailwind Customization:

Edit `tailwind.config.js` to:
   - Adjust corporate colors
   - Modify responsive breakpoints
   - Customize utility classes

3. Product Data:

Modify `/assets/data/products.json` to:
- Add/remove products
- Update codes and descriptions

## 🖥 Installation

1. Clone repository:
```bash
git clone https://github.com/MetalSyntax/intervit-app.git
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm run dev
```

4. Build for production:
```bash
npm run build
npm start
```

## 🎨 Customization

1. Notifications
Adjust in the `saveCSV` method:

```javascript
// Notification duration (ms)
setTimeout(() => {
  this.showNotification = false
}, 5000) // 5 seconds
```

## 🛠️ Requirements

- Node.js ≥14.x
- npm ≥6.x

## 📱 PWA Features

- Offline support
- Add to Home Screen
- Push notifications
- Service Worker integration

## 🏗️ Project Setup

The project is configured as a TypeScript-based Nuxt.js application with:
- Hot Module Replacement (HMR)
- TypeScript support
- PWA capabilities
- Tailwind CSS integration
- Service Worker for offline support
- Responsive design
- SEO optimization


## 🤝 Contributions
Contributions are welcome! To collaborate:
1. Fork the repository.
2. Create a branch (`git checkout -b feature/your-feature-name`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push your branch (`git push origin feature/your-feature-name`) and open a Pull Request.


## 📄 License
This project is licensed under the [MIT License](LICENSE). See the `LICENSE` file for details.


## 💬 Support
Have questions or found an issue?
- 🐛 Report problems on [Issues](https://github.com/MetalSyntax/Lior-App/issues).


## 👥 Authors
- Wonder Diaz – [GitHub](https://github.com/MetalSyntax) | [Portfolio](https://metalsyntax.vercel.app/)
