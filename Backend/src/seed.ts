import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

// Hardcoded mock data to seed
const mockProducts = [
  {
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Premium over-ear headphones with active noise cancellation, 40-hour battery life, and superior sound quality.',
    price: 299.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80',
    stock: 45,
  },
  {
    name: 'Smart Watch Pro',
    description: 'Advanced fitness tracker with heart rate monitor, GPS, and 7-day battery life.',
    price: 249.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&q=80',
    stock: 62,
  },
  {
    name: 'Minimalist Leather Backpack',
    description: 'Stylish and durable leather backpack perfect for work or travel. Features laptop compartment.',
    price: 129.99,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
    stock: 34,
  },
  {
    name: 'Portable Bluetooth Speaker',
    description: '360-degree sound with deep bass, waterproof design, and 20-hour playback time.',
    price: 79.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&q=80',
    stock: 89,
  },
  {
    name: 'Premium Coffee Maker',
    description: 'Programmable coffee maker with thermal carafe, brew strength control, and 12-cup capacity.',
    price: 159.99,
    category: 'Home',
    imageUrl: 'https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=500&q=80',
    stock: 23,
  },
  {
    name: 'Classic White Sneakers',
    description: 'Versatile white leather sneakers with cushioned insole. Perfect for everyday wear.',
    price: 89.99,
    category: 'Fashion',
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&q=80',
    stock: 78,
  },
  {
    name: '4K Action Camera',
    description: 'Waterproof 4K action camera with image stabilization and wide-angle lens.',
    price: 199.99,
    category: 'Electronics',
    imageUrl: 'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=500&q=80',
    stock: 56,
  },
];

async function seed() {
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  // @ts-ignore
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log('Seeding products...');
  
  // Clear existing products
  await prisma.product.deleteMany({});
  
  // Insert new products
  const result = await prisma.product.createMany({
    data: mockProducts,
  });

  console.log(`Successfully seeded ${result.count} products!`);
}

seed().catch((error) => {
  console.error('Failed to seed:', error);
  process.exit(1);
});
