# Images Folder Structure

This folder contains images for the Kwetu Place website, organized by category:

## Folder Structure

```
public/images/
├── hero/          # Hero section background images
├── apparel/        # Apparel product images and banners
├── barber/         # Barber service images and tools
├── car-wash/       # Car wash service images and equipment
├── events/          # Event photos, banners, and promotional graphics
└── general/         # General purpose images (logos, icons, etc.)
```

## Usage Guidelines

### File Naming Conventions
- Use lowercase with hyphens for filenames (e.g., `hero-background.jpg`)
- Include descriptive names for easy identification
- Use appropriate formats: `.jpg`, `.png`, `.webp` for photos; `.svg` for icons

### Image Specifications
- **Hero Images**: 1920x1080px minimum, high quality, optimized for web
- **Product Images**: Square format for consistency, 800x800px minimum
- **Icons**: SVG format when possible, PNG fallback
- **Compression**: Balance quality vs file size, aim for under 500KB per image

### Categories

#### Hero/
- Background images for home page hero section
- Overlay-friendly images with good contrast for text readability

#### Apparel/
- Product photography on clean backgrounds
- Lifestyle images showing products in use
- Category banners and promotional graphics

#### Barber/
- Service environment photos
- Tool and equipment close-ups
- Before/after styling examples

#### Car-Wash/
- Vehicle before/after photos
- Equipment and facility images
- Service process demonstrations

#### Events/
- Event photography and live performance shots
- Promotional banners and event posters
- Speaker/performer headshots
- Venue and atmosphere photos

#### General/
- Logo variations
- Favicon and app icons
- Utility icons and graphics

## Integration

Images in these folders can be referenced in the code as:

```tsx
// For images in public folder
import Image from 'next/image';

<Image 
  src="/images/hero/background.jpg" 
  alt="Kwetu Place luxury resort"
  width={1920}
  height={1080}
  priority
/>
```

## Optimization Tips

1. Use Next.js Image component for automatic optimization
2. Include proper alt text for accessibility
3. Specify dimensions to prevent layout shifts
4. Use priority attribute for above-the-fold images
5. Consider lazy loading for below-the-fold content
