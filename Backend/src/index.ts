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

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
