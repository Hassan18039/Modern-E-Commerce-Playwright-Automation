import 'dotenv/config';
console.log('Starting Server...');
import express from 'express';
import cors from 'cors';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';

const app = express();
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
// @ts-ignore
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.send('Modern E-Commerce API is running');
});

// Example route to test DB connection
app.get('/api/products', async (req, res) => {
  try {
    const { search, category } = req.query;
    
    const whereCondition: any = {};
    
    if (category && category !== 'All') {
      whereCondition.category = String(category);
    }
    
    if (search) {
      whereCondition.OR = [
        { name: { contains: String(search), mode: 'insensitive' } },
        { description: { contains: String(search), mode: 'insensitive' } },
        { category: { contains: String(search), mode: 'insensitive' } },
      ];
    }
    
    const products = await prisma.product.findMany({
      where: whereCondition,
    });
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch products' });
  }
});

// Get a single product by ID
app.get('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id },
    });
    
    if (!product) {
      res.status(404).json({ error: 'Product not found' });
      return;
    }
    
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch product' });
  }
});

// Create a new product
app.post('/api/products', async (req, res) => {
  try {
    const { name, description, price, imageUrl, category, stock } = req.body;
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        price: Number(price),
        imageUrl,
        category,
        stock: Number(stock),
      },
    });
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create product' });
  }
});

// Update a product
app.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, price, imageUrl, category, stock } = req.body;
    
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        price: price !== undefined ? Number(price) : undefined,
        imageUrl,
        category,
        stock: stock !== undefined ? Number(stock) : undefined,
      },
    });
    res.json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to update product' });
  }
});

// Delete a product
app.delete('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({ where: { id } });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to delete product' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
