import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Badge,
  Box,
  Container,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Store as StoreIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../../hooks/useCart';
import { useThemeContext } from '../../context/ThemeContext';
import { CartDrawer } from '../cart/CartDrawer';

export const Header: React.FC = () => {
  const navigate = useNavigate();
  const { state } = useCart();
  const { mode, toggleColorMode } = useThemeContext();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <AppBar position="sticky">
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <StoreIcon sx={{ mr: 1 }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                flexGrow: 0,
                mr: 4,
                fontWeight: 700,
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              ModernShop
            </Typography>

            <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
              <Button data-testid="nav-home" color="inherit" onClick={() => navigate('/')}>
                Home
              </Button>
              <Button data-testid="nav-products" color="inherit" onClick={() => navigate('/products')}>
                Products
              </Button>
              <Button data-testid="nav-admin" color="secondary" variant="outlined" sx={{ ml: 2, borderColor: 'rgba(255,255,255,0.5)', color: 'white' }} onClick={() => navigate('/admin/products')}>
                Admin Panel
              </Button>
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton color="inherit" onClick={toggleColorMode}>
                {mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
              <IconButton
                data-testid="cart-icon-button"
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                aria-label="Shopping cart"
              >
                <Badge data-testid="cart-badge" badgeContent={state.totalItems} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};
