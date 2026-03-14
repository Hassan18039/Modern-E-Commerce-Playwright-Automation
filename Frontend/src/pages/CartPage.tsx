import React from 'react';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useCart } from '../hooks/useCart';
import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { EmptyCart } from '../components/cart/EmptyCart';

export const CartPage: React.FC = () => {
  const { state } = useCart();
  const navigate = useNavigate();

  if (state.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/products')}
        sx={{ mb: 3 }}
      >
        Continue Shopping
      </Button>

      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Shopping Cart
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Box>
            {state.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </Box>
        </Grid>

        <Grid item xs={12} md={4}>
          <CartSummary />
        </Grid>
      </Grid>
    </Container>
  );
};
