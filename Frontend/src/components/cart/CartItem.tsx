import React from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import {
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { CartItem as CartItemType } from '../../types/cart.types';
import { useCart } from '../../hooks/useCart';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { increaseQuantity, decreaseQuantity, removeFromCart } = useCart();

  const itemTotal = item.product.price * item.quantity;

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" spacing={2} alignItems="center">
          <CardMedia
            component="img"
            sx={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 1 }}
            image={item.product.image}
            alt={item.product.name}
          />

          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" gutterBottom>
              {item.product.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              ${item.product.price.toFixed(2)} each
            </Typography>
            <Stack direction="row" spacing={1} alignItems="center" sx={{ mt: 1 }}>
              <IconButton
                data-testid={`cart-page-decrease-${item.id}`}
                size="small"
                onClick={() => decreaseQuantity(item.id)}
                disabled={item.quantity === 1}
                sx={{
                  border: '1px solid',
                  borderColor: item.quantity === 1 ? 'action.disabled' : 'divider',
                }}
              >
                <RemoveIcon fontSize="small" />
              </IconButton>
              <Typography
                data-testid={`cart-page-qty-${item.id}`}
                variant="body1"
                sx={{
                  minWidth: 40,
                  textAlign: 'center',
                  fontWeight: 'bold',
                }}
              >
                {item.quantity}
              </Typography>
              <IconButton
                data-testid={`cart-page-increase-${item.id}`}
                size="small"
                onClick={() => increaseQuantity(item.id)}
                sx={{
                  border: '1px solid',
                  borderColor: 'divider',
                }}
              >
                <AddIcon fontSize="small" />
              </IconButton>
            </Stack>
          </Box>

          <Box sx={{ textAlign: 'right' }}>
            <Typography variant="h6" color="primary" fontWeight="bold" gutterBottom>
              ${itemTotal.toFixed(2)}
            </Typography>
            <IconButton
              data-testid={`cart-page-remove-${item.id}`}
              color="error"
              onClick={() => removeFromCart(item.id)}
              aria-label="Remove from cart"
            >
              <DeleteIcon />
            </IconButton>
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};
