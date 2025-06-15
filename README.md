# Shopify E-Commerce

A modern e-commerce frontend application built with Next.js 15 and integrated with Shopify Storefront API, displaying products from "Mindera Test Store".

## 🌐 Live Demo

**🚀 [View Live Application](https://shopify-ecom-gold.vercel.app/)**

## 🚀 Features

- **Modern Stack**: Next.js 15 with React 19, TypeScript, and Tailwind CSS
- **Shopify Integration**: Direct integration with Shopify Storefront API
- **Product Display**: Display product listings with images and pricing
- **Sorting**: Sort products by price (low to high, high to low)
- **Infinite Loading**: Load more products with pagination
- **Responsive Design**: Responsive design for all devices
- **Modern UI**: Using Radix UI components and Lucide icons

## 📱 Screenshots

- **Banner Section**: Hero banner with title "Spring Summer SS2024"
- **Filter Controls**: Dropdown to sort products
- **Products Grid**: Responsive grid layout displaying products
- **Load More**: Button to load additional products

## 📦 Project Structure

```
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/products/       # API routes
│   │   ├── globals.css         # Global styles
│   │   ├── layout.tsx          # Root layout
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── custom/             # Custom components
│   │   │   ├── Banner.tsx      # Hero banner
│   │   │   ├── FilterControls.tsx # Sort controls
│   │   │   └── ProductsGrid.tsx   # Products display
│   │   └── ui/                 # UI components (Radix)
│   ├── lib/
│   │   └── utils.ts            # Utilities (cn, formatPrice)
│   ├── models/                 # TypeScript interfaces
│   │   ├── common.model.ts     # Common types
│   │   └── products.model.ts   # Product types
│   └── services/
│       ├── shopify.service.ts  # Shopify client
│       └── products.service.ts # Products API
├── public/
│   └── shopping-banner.jpeg    # Hero banner image
├── components.json             # Shadcn/ui config
├── next.config.ts              # Next.js config
├── package.json                # Dependencies
├── tailwind.config.ts          # Tailwind config
└── tsconfig.json               # TypeScript config
```

## 🛠️ Installation and Setup

### System Requirements

- Node.js >= 18
- npm, yarn, pnpm or bun

### 1. Install dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

### 2. Run development server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

## 🔧 Available Scripts

- `npm run dev` - Run development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Run production server
- `npm run lint` - Run ESLint checks

## 🛍️ Shopify Integration

### Configuration

- **Store**: `mindera-test-store.myshopify.com`
- **API Version**: `2025-04`
- **Access Token**: Configured in `shopify.service.ts`

### API Endpoints

- `GET /api/products` - Fetch product listings with parameters:
  - `first`: Number of products (default: 12)
  - `after`: Cursor for pagination
  - `sortBy`: `PRICE_LOW_TO_HIGH` or `PRICE_HIGH_TO_LOW`
  - `query`: Search query (not yet implemented)

### GraphQL Queries

Uses Shopify Storefront API with GraphQL to:

- Fetch products with variants, prices, and images
- Support pagination with cursor-based navigation
- Sort by price using sortKey

## 🎨 Tech Stack

### Core

- **Next.js 15** - React framework with App Router
- **React 19** - UI library with latest features
- **TypeScript** - Type safety and better DX

### Styling

- **Tailwind CSS 4** - Utility-first CSS framework
- **PostCSS** - CSS processing
- **tw-animate-css** - Animation utilities

### UI Components

- **Radix UI** - Accessible component primitives
- **class-variance-authority** - Component variants
- **Lucide React** - Modern icon library
- **clsx + tailwind-merge** - Conditional classes

### Shopify

- **@shopify/storefront-api-client** - Official Shopify client
- **GraphQL** - Query language for Shopify API

## 🎯 Key Features Implementation

### 1. Product Display (`ProductsGrid.tsx`)

- Responsive grid layout (2 cols mobile, 4 cols desktop)
- Product cards with hover effects
- Image optimization with Next.js Image
- Price formatting with GBP currency
- Sale prices with strikethrough

### 2. Sorting (`FilterControls.tsx`)

- Dropdown menu for sort options
- Support for price low-to-high and high-to-low
- Clean UI with Radix DropdownMenu

### 3. Pagination

- Cursor-based pagination from Shopify
- Load more button instead of traditional pagination
- Loading states with spinner

### 4. API Layer (`services/`)

- Clean separation with service classes
- Error handling and TypeScript interfaces
- Reusable Shopify client configuration

### Environment Variables

If you need to customize Shopify config:

```env
NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
NEXT_PUBLIC_SHOPIFY_ACCESS_TOKEN=your-access-token
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Create a Pull Request
