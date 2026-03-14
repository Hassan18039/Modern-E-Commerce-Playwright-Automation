import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Box,
  Chip,
} from '@mui/material';
import { ShoppingCart as ShoppingCartIcon } from '@mui/icons-material';
import { Product } from '../../types/product.types';
import { useCart } from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleCardClick = () => {
    navigate(`/products/${product.id}`);
  };

  const fallbackImage = 'https://via.placeholder.com/400x300?text=Product+Image';

  return (
    <Card
      data-testid={`product-card-${product.id}`}
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
      }}
      onClick={handleCardClick}
    >
      <CardMedia
        component="img"
        height="250"
        image={imageError ? fallbackImage : product.image}
        alt={product.name}
        onError={() => setImageError(true)}
        sx={{ objectFit: 'cover' }}
      />
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ mb: 1 }}>
          <Chip label={product.category} size="small" color="primary" />
        </Box>
        <Typography gutterBottom variant="h6" component="h2" noWrap>
          {product.name}
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            mb: 1,
          }}
        >
          {product.description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 1 }}>
          <Rating value={product.rating} precision={0.5} size="small" readOnly />
          <Typography variant="body2" color="text.secondary">
            ({product.reviewCount})
          </Typography>
        </Box>
        <Typography variant="h5" color="primary" fontWeight="bold">
          ${product.price.toFixed(2)}
        </Typography>
        {!product.inStock && (
          <Chip label="Out of Stock" size="small" color="error" sx={{ mt: 1 }} />
        )}
      </CardContent>
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button
          data-testid={`add-to-cart-${product.id}`}
          fullWidth
          variant="contained"
          startIcon={<ShoppingCartIcon />}
          onClick={handleAddToCart}
          disabled={!product.inStock}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  );
};
