import React from 'react';
import { Grid, Typography, Box } from '@mui/material';
import { Product } from '../../types/product.types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, title }) => {
  return (
    <Box>
      {title && (
        <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 4 }}>
          {title}
        </Typography>
      )}
      {products.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No products found
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCard product={product} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};
