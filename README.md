# Modern E-Commerce Website

A modern, fully-functional e-commerce website built with React, TypeScript, and Material-UI.

## Features

✨ **Core E-Commerce Functionality:**
- ✅ Add products to cart
- ✅ Remove products from cart
- ✅ Increase/decrease product quantity in cart
- ✅ Cart persistence with localStorage
- ✅ Real-time cart updates

🎨 **Modern UI:**
- Material-UI components with custom theme
- Responsive design (mobile, tablet, desktop)
- Smooth animations and transitions
- Clean, professional interface
- Cart drawer for quick preview

🛍️ **Shopping Experience:**
- Product browsing with grid layout
- Product detail pages
- Category filtering
- Product ratings and reviews
- Stock availability indicators

## Tech Stack

- **Frontend Framework:** React 18 with TypeScript
- **UI Library:** Material-UI (MUI) v5
- **Routing:** React Router v6
- **State Management:** React Context API + useReducer
- **Build Tool:** Vite
- **Styling:** Emotion (MUI's styling solution)
- **Icons:** Material Icons

## Project Structure

```
src/
├── components/
│   ├── common/          # Header, Footer
│   ├── product/         # ProductCard, ProductGrid
│   └── cart/            # CartItem, CartSummary, CartDrawer, EmptyCart
├── pages/               # Home, ProductsPage, ProductDetailPage, CartPage
├── context/             # CartContext (state management)
├── hooks/               # useCart custom hook
├── types/               # TypeScript type definitions
├── data/                # Mock product data
├── theme/               # MUI theme configuration
└── utils/               # Helper functions
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and navigate to the URL shown in the terminal (typically `http://localhost:5173`)

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## How to Use

### Shopping Flow

1. **Browse Products:**
   - Visit the home page to see featured products
   - Click "Shop Now" or navigate to "Products" to see all items

2. **Add to Cart:**
   - Click "Add to Cart" on any product card
   - Or visit product detail page and adjust quantity before adding

3. **Manage Cart:**
   - Click cart icon in header to see quick preview
   - Use + and - buttons to adjust quantities
   - Click trash icon to remove items
   - Cart persists across page refreshes

4. **View Cart:**
   - Click "Cart" button or "View Cart" from drawer
   - See full cart with all items and totals
   - Proceed to checkout (placeholder)

### Cart Features Demonstrated

✅ **Add to Cart:** Click any "Add to Cart" button on product cards or detail pages

✅ **Remove from Cart:** Click the delete icon (🗑️) next to any cart item

✅ **Increase Quantity:** Click the + button on cart items

✅ **Decrease Quantity:** Click the - button on cart items (item removed when quantity reaches 0)

✅ **Persistence:** Cart data is saved in localStorage and persists across sessions

## Mock Data

The application includes 15 sample products across different categories:
- Electronics (headphones, speakers, cameras, etc.)
- Fashion (sneakers, sunglasses, backpacks)
- Home (coffee makers, desk lamps, kettles)
- Sports (yoga mats, running shoes)

All products include:
- High-quality placeholder images from Unsplash
- Realistic prices
- Product ratings and reviews
- Stock information
- Detailed descriptions and features

## Key Components

### CartContext (`src/context/CartContext.tsx`)
- Manages all cart state using useReducer
- Implements localStorage persistence
- Provides actions: addToCart, removeFromCart, increaseQuantity, decreaseQuantity

### CartItem (`src/components/cart/CartItem.tsx`)
- Displays individual cart items
- Implements quantity controls (+ / -)
- Includes remove button
- Shows item subtotal

### ProductCard (`src/components/product/ProductCard.tsx`)
- Displays product information
- "Add to Cart" button
- Hover effects and transitions
- Click to view details

## Customization

### Theme

Edit `src/theme/muiTheme.ts` to customize:
- Colors (primary, secondary)
- Typography
- Component styles
- Border radius, shadows, etc.

### Products

Edit `src/data/mockProducts.ts` to:
- Add/remove products
- Change product details
- Update categories
- Modify images

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This is a demonstration project created for educational purposes.

## Future Enhancements

Potential features to add:
- User authentication
- Product search and filtering
- Wishlist functionality
- Checkout and payment integration
- Order history
- Product reviews
- Admin panel
- Backend API integration
- Dark mode toggle

---

Built with ❤️ using React, TypeScript, and Material-UI
