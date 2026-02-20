import React from 'react';
import { Card, CardContent, Typography, Button, Stack, Divider, Box } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';

export const CartSummary: React.FC = () => {
  const { state } = useCart();
  const navigate = useNavigate();

  const tax = state.subtotal * 0.1; // 10% tax
  const total = state.subtotal + tax;

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          Order Summary
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Stack spacing={1.5}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Items ({state.totalItems}):</Typography>
            <Typography variant="body1">${state.subtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body1">Tax (10%):</Typography>
            <Typography variant="body1">${tax.toFixed(2)}</Typography>
          </Box>
          <Divider />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="h6" fontWeight="bold">
              Total:
            </Typography>
            <Typography data-testid="cart-total" variant="h6" color="primary" fontWeight="bold">
              ${total.toFixed(2)}
            </Typography>
          </Box>
        </Stack>
        <Button
          data-testid="proceed-to-checkout"
          fullWidth
          variant="contained"
          size="large"
          startIcon={<ShoppingCartIcon />}
          sx={{ mt: 3 }}
          onClick={() => navigate('/checkout')}
        >
          Proceed to Checkout
        </Button>
      </CardContent>
    </Card>
  );
};
