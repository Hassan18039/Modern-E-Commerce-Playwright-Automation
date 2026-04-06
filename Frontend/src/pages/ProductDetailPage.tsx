import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Box,
  Typography,
  Button,
  Rating,
  Chip,
  Stack,
  Divider,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  ShoppingCart as ShoppingCartIcon,
  Add as AddIcon,
  Remove as RemoveIcon,
  ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';
import { useCart } from '../hooks/useCart';

export const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!response.ok) {
          setProduct(null);
          return;
        }
        const data = await response.json();
        
        // Map backend product structure to match expected frontend structure
        setProduct({
          ...data,
          image: data.imageUrl,
          inStock: data.stock > 0,
          // Add default static fields if they are not stored in db for details
          rating: data.rating || 4.5,
          reviewCount: data.reviewCount || 128,
        });
      } catch (error) {
        console.error('Failed to fetch product details', error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, display: 'flex', justifyContent: 'center', minHeight: '50vh', alignItems: 'center' }}>
        <CircularProgress size={50} />
      </Container>
    );
  }

  if (!product) {
    return (
      <Container maxWidth="lg" sx={{ py: 8, textAlign: 'center' }}>
        <Typography variant="h4" gutterBottom>
          Product not found
        </Typography>
        <Button data-testid="back-to-products" variant="contained" onClick={() => navigate('/products')}>
          Back to Products
        </Button>
      </Container>
    );
  }

  const handleAddToCart = () => {
    // Guard: ensure quantity doesn't exceed available stock
    const safeQuantity = Math.min(quantity, product.stock);
    // Dispatch a single ADD_TO_CART per click, loop only if needed
    for (let i = 0; i < safeQuantity; i++) {
      addToCart(product);
    }
    setQuantity(1);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        data-testid="back-to-products"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/products')}
        sx={{ mb: 3 }}
      >
        Back to Products
      </Button>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box
            component="img"
            src={product.image}
            alt={product.name}
            sx={{
              width: '100%',
              height: 'auto',
              maxHeight: 500,
              objectFit: 'cover',
              borderRadius: 2,
            }}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <Chip data-testid="product-category" label={product.category} color="primary" sx={{ mb: 2 }} />
          <Typography data-testid="product-name" variant="h3" component="h1" gutterBottom>
            {product.name}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Rating data-testid="product-rating" value={product.rating} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({product.reviewCount} reviews)
            </Typography>
          </Box>

          <Typography data-testid="product-price" variant="h4" color="primary" fontWeight="bold" sx={{ mb: 3 }}>
            ${product.price.toFixed(2)}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body1" paragraph>
            {product.description}
          </Typography>

          {product.features && product.features.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography variant="h6" gutterBottom>
                Features:
              </Typography>
              <Stack spacing={1}>
                {product.features.map((feature: string, index: number) => (
                  <Typography key={index} variant="body2">
                    • {feature}
                  </Typography>
                ))}
              </Stack>
            </Box>
          )}

          <Divider sx={{ my: 3 }} />

          <Box sx={{ mb: 3 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Quantity:
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <IconButton
                data-testid="decrease-quantity"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                sx={{ border: '1px solid', borderColor: 'divider' }}
              >
                <RemoveIcon />
              </IconButton>
              <Typography data-testid="quantity-display" variant="h6" sx={{ minWidth: 40, textAlign: 'center' }}>
                {quantity}
              </Typography>
              <IconButton
                data-testid="increase-quantity"
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                sx={{ border: '1px solid', borderColor: 'divider' }}
              >
                <AddIcon />
              </IconButton>
            </Stack>
            <Typography data-testid="stock-count" variant="caption" color="text.secondary" sx={{ mt: 1, display: 'block' }}>
              {product.stock} items in stock
            </Typography>
          </Box>

          <Button
            data-testid="add-to-cart-detail"
            variant="contained"
            size="large"
            fullWidth
            startIcon={<ShoppingCartIcon />}
            onClick={handleAddToCart}
            disabled={!product.inStock}
          >
            {product.inStock ? 'Add to Cart' : 'Out of Stock'}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};
