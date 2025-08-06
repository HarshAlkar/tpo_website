# TPO Department Website

A modern, responsive website for the Training and Placement Department built with React, Vite, and Tailwind CSS.

## 🚀 Features

### Responsive Design
- **Mobile-First Approach**: Optimized for mobile devices with progressive enhancement
- **Breakpoint System**: 
  - `xs`: 475px (extra small devices)
  - `sm`: 640px (small devices)
  - `md`: 768px (medium devices)
  - `lg`: 1024px (large devices)
  - `xl`: 1280px (extra large devices)
  - `2xl`: 1536px (2x extra large devices)

### Key Responsive Features
- **Adaptive Navigation**: Collapsible mobile menu with smooth animations
- **Flexible Grid Layouts**: Responsive grid systems that adapt to screen size
- **Scalable Typography**: Text sizes that scale appropriately across devices
- **Touch-Friendly Interface**: Optimized touch targets for mobile devices
- **Responsive Images**: Images that scale and crop appropriately
- **Mobile-Optimized Forms**: Forms with proper input sizing and spacing

### Components
- **Navbar**: Responsive navigation with mobile hamburger menu
- **Hero Section**: Full-screen hero with responsive text and video background
- **WhyChooseUs**: Feature grid that adapts from 1 column (mobile) to 4 columns (desktop)
- **EventsSection**: Event cards that stack on mobile and grid on larger screens
- **CommitteeSection**: Team member cards with responsive layouts
- **Forms**: Registration and contact forms optimized for mobile input

### Pages
- **Home**: Responsive statistics, team section, and recruiter logos
- **Register**: Mobile-optimized registration form
- **Contact**: Responsive contact form and information display
- **WhyUs**: Adaptive feature showcase and statistics
- **Events**: Responsive event cards and featured event display
- **Committee**: Mobile-friendly team member profiles

## 🛠️ Technical Stack

- **React 18**: Modern React with hooks and functional components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework with custom responsive utilities
- **React Router**: Client-side routing
- **Heroicons**: Beautiful SVG icons
- **Custom Animations**: Smooth animations and transitions

## 📱 Responsive Breakpoints

The website uses a comprehensive responsive system:

```css
/* Mobile First Approach */
.container {
  /* Base mobile styles */
  padding: 1rem;
  font-size: 0.875rem;
}

/* Small devices (640px and up) */
@media (min-width: 640px) {
  .container {
    padding: 1.5rem;
    font-size: 1rem;
  }
}

/* Medium devices (768px and up) */
@media (min-width: 768px) {
  .container {
    padding: 2rem;
    font-size: 1.125rem;
  }
}

/* Large devices (1024px and up) */
@media (min-width: 1024px) {
  .container {
    padding: 2.5rem;
    font-size: 1.25rem;
  }
}
```

## 🎨 Design System

### Colors
- **Navy**: `#1a237e` - Primary brand color
- **Accent**: `#1976d2` - Secondary brand color
- **Purple**: `#9333ea` - Accent color for highlights

### Typography
- **Font Family**: Poppins (Google Fonts)
- **Responsive Text**: Scales from 14px (mobile) to 18px (desktop)
- **Headings**: Responsive heading sizes with proper line heights

### Spacing
- **Mobile**: 1rem (16px) base spacing
- **Tablet**: 1.5rem (24px) increased spacing
- **Desktop**: 2rem (32px) generous spacing

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd tpo-website
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 Mobile Optimization Features

### Touch-Friendly Design
- Minimum 44px touch targets for buttons and links
- Proper spacing between interactive elements
- Smooth touch feedback and animations

### Performance Optimizations
- Responsive images with proper sizing
- Optimized animations for mobile devices
- Reduced motion support for accessibility

### Accessibility
- Proper focus states for keyboard navigation
- Screen reader friendly markup
- High contrast ratios for text readability

## 🎯 Responsive Testing

The website has been tested across various devices and screen sizes:

- **Mobile**: iPhone SE, iPhone 12, Samsung Galaxy
- **Tablet**: iPad, iPad Pro, Samsung Galaxy Tab
- **Desktop**: 13" MacBook, 15" Windows Laptop, 27" Monitor
- **Large Screens**: 4K displays and ultra-wide monitors

## 🔧 Customization

### Adding New Responsive Components

1. Use the existing responsive utility classes:
```jsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {/* Your content */}
</div>
```

2. Follow the mobile-first approach:
```jsx
<h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
  Responsive Heading
</h1>
```

3. Use responsive spacing:
```jsx
<section className="py-8 sm:py-12 lg:py-16">
  {/* Content with responsive padding */}
</section>
```

### Custom Responsive Utilities

The project includes custom responsive utilities in `src/index.css`:

- `.mobile-first`: Mobile-first responsive container
- `.touch-friendly`: Touch-optimized buttons
- `.text-responsive`: Responsive text sizing
- `.heading-responsive`: Responsive heading sizes

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test across different screen sizes
5. Submit a pull request

## 📞 Support

For support or questions about the responsive design implementation, please open an issue in the repository.
