import React from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export const EmptyCart: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '50vh',
          textAlign: 'center',
          py: 8,
        }}
      >
        <ShoppingCartIcon sx={{ fontSize: 120, color: 'text.secondary', mb: 3 }} />
        <Typography variant="h4" gutterBottom>
          Your cart is empty
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Looks like you haven't added anything to your cart yet.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/products')}
        >
          Start Shopping
        </Button>
      </Box>
    </Container>
  );
};
