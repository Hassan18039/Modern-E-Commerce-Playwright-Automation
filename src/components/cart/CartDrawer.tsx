import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Stack,
} from '@mui/material';
import {
  Close as CloseIcon,
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose }) => {
  const { state, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const handleViewCart = () => {
    navigate('/cart');
    onClose();
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box data-testid="cart-drawer" sx={{ width: 350, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Shopping Cart</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider />

        {state.items.length === 0 ? (
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              p: 3,
            }}
          >
            <ShoppingCartIcon sx={{ fontSize: 80, color: 'text.secondary', mb: 2 }} />
            <Typography variant="body1" color="text.secondary" textAlign="center">
              Your cart is empty
            </Typography>
          </Box>
        ) : (
          <>
            <List sx={{ flex: 1, overflow: 'auto', p: 2 }}>
              {state.items.map((item) => (
                <ListItem
                  key={item.id}
                  sx={{
                    px: 0,
                    alignItems: 'flex-start',
                    flexDirection: 'column',
                    mb: 2,
                    pb: 2,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Box sx={{ display: 'flex', width: '100%', mb: 1 }}>
                    <ListItemAvatar>
                      <Avatar
                        src={item.product.image}
                        alt={item.product.name}
                        variant="rounded"
                        sx={{ width: 56, height: 56 }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography variant="body1" fontWeight="medium">
                          {item.product.name}
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body2" color="primary" fontWeight="bold">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </Typography>
                      }
                      sx={{ ml: 2, flex: 1 }}
                    />
                    <IconButton
                      data-testid={`remove-item-${item.id}`}
                      size="small"
                      color="error"
                      onClick={() => removeFromCart(item.id)}
                      sx={{ alignSelf: 'flex-start' }}
                    >
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                  <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    sx={{ ml: 8 }}
                  >
                    <IconButton
                      data-testid={`decrease-qty-${item.id}`}
                      size="small"
                      onClick={() => decreaseQuantity(item.id)}
                      disabled={item.quantity === 1}
                      sx={{
                        border: '1px solid',
                        borderColor: item.quantity === 1 ? 'action.disabled' : 'divider',
                        width: 28,
                        height: 28,
                      }}
                    >
                      <RemoveIcon fontSize="small" />
                    </IconButton>
                    <Typography
                      data-testid={`item-quantity-${item.id}`}
                      variant="body2"
                      sx={{
                        minWidth: 30,
                        textAlign: 'center',
                        fontWeight: 'bold',
                      }}
                    >
                      {item.quantity}
                    </Typography>
                    <IconButton
                      data-testid={`increase-qty-${item.id}`}
                      size="small"
                      onClick={() => increaseQuantity(item.id)}
                      sx={{
                        border: '1px solid',
                        borderColor: 'divider',
                        width: 28,
                        height: 28,
                      }}
                    >
                      <AddIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </ListItem>
              ))}
            </List>

            <Divider />
            <Box sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Typography variant="body1" fontWeight="bold">
                  Subtotal:
                </Typography>
                <Typography variant="body1" fontWeight="bold" color="primary">
                  ${state.subtotal.toFixed(2)}
                </Typography>
              </Box>
              <Button
                data-testid="view-cart-button"
                fullWidth
                variant="contained"
                size="large"
                onClick={handleViewCart}
              >
                View Cart
              </Button>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};
