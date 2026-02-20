import React from 'react';
import { Container, Box, Typography, Button, Grid, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductGrid } from '../components/product/ProductGrid';
import { mockProducts } from '../data/mockProducts';
import {
  Devices as ElectronicsIcon,
  Checkroom as FashionIcon,
  Home as HomeIcon,
  FitnessCenter as SportsIcon,
} from '@mui/icons-material';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const featuredProducts = mockProducts.slice(0, 4);

  const categories = [
    {
      name: 'Electronics',
      icon: <ElectronicsIcon sx={{ fontSize: 60 }} />,
      description: 'Latest gadgets & tech',
      image: 'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=500&q=80',
      color: '#1976d2',
    },
    {
      name: 'Fashion',
      icon: <FashionIcon sx={{ fontSize: 60 }} />,
      description: 'Trendy styles & accessories',
      image: 'https://images.unsplash.com/photo-1445205170230-053b83016050?w=500&q=80',
      color: '#d32f2f',
    },
    {
      name: 'Home',
      icon: <HomeIcon sx={{ fontSize: 60 }} />,
      description: 'Comfort & decor',
      image: 'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=500&q=80',
      color: '#388e3c',
    },
    {
      name: 'Sports',
      icon: <SportsIcon sx={{ fontSize: 60 }} />,
      description: 'Fitness & outdoor gear',
      image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=500&q=80',
      color: '#f57c00',
    },
  ];

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/products?category=${categoryName}`);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: 'white',
          py: { xs: 6, md: 10 },
          mb: 8,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h2" component="h1" gutterBottom fontWeight="bold" sx={{ fontSize: { xs: '2.5rem', md: '3.5rem' } }}>
                Welcome to ModernShop
              </Typography>
              <Typography variant="h5" sx={{ mb: 4, opacity: 0.95, lineHeight: 1.6 }}>
                Discover amazing products at unbeatable prices. Shop the latest trends in electronics, fashion, home, and sports.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  onClick={() => navigate('/products')}
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      bgcolor: 'grey.100',
                      transform: 'translateY(-2px)',
                      boxShadow: 4,
                    },
                    transition: 'all 0.3s',
                  }}
                >
                  Shop Now
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  onClick={() => navigate('/products')}
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    px: 4,
                    py: 1.5,
                    fontSize: '1.1rem',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: 'rgba(255,255,255,0.1)',
                    },
                  }}
                >
                  Browse Categories
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box
                component="img"
                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&q=80"
                alt="Shopping"
                sx={{
                  width: '100%',
                  height: 'auto',
                  borderRadius: 4,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" align="center" gutterBottom fontWeight="bold" sx={{ mb: 2 }}>
          Shop by Category
        </Typography>
        <Typography variant="h6" align="center" color="text.secondary" sx={{ mb: 5 }}>
          Explore our wide range of products across different categories
        </Typography>

        <Grid container spacing={3}>
          {categories.map((category) => (
            <Grid item xs={12} sm={6} md={3} key={category.name}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: 6,
                  },
                }}
              >
                <CardActionArea onClick={() => handleCategoryClick(category.name)} sx={{ height: '100%' }}>
                  <CardMedia
                    component="img"
                    height="180"
                    image={category.image}
                    alt={category.name}
                  />
                  <CardContent sx={{ textAlign: 'center', py: 3 }}>
                    <Box sx={{ color: category.color, mb: 1 }}>
                      {category.icon}
                    </Box>
                    <Typography variant="h6" component="h3" fontWeight="bold" gutterBottom>
                      {category.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {category.description}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Featured Products */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" gutterBottom fontWeight="bold">
              Featured Products
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Check out our handpicked selection
            </Typography>
          </Box>
          <Button
            variant="outlined"
            size="large"
            onClick={() => navigate('/products')}
            sx={{ display: { xs: 'none', md: 'block' } }}
          >
            View All Products
          </Button>
        </Box>
        <ProductGrid products={featuredProducts} />
        <Box sx={{ textAlign: 'center', mt: 4, display: { xs: 'block', md: 'none' } }}>
          <Button variant="contained" size="large" onClick={() => navigate('/products')}>
            View All Products
          </Button>
        </Box>
      </Container>

      {/* Features Section */}
      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h1" sx={{ mb: 2 }}>
                  🚚
                </Typography>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Free Shipping
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  Free delivery on orders over $50. Get your products delivered to your doorstep.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h1" sx={{ mb: 2 }}>
                  🔒
                </Typography>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Secure Payment
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  100% secure payment processing. Your information is always protected.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Typography variant="h1" sx={{ mb: 2 }}>
                  💝
                </Typography>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Easy Returns
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  30-day hassle-free return policy. Shop with complete confidence.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Call to Action */}
      <Box sx={{ py: 8, textAlign: 'center' }}>
        <Container maxWidth="md">
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Ready to Start Shopping?
          </Typography>
          <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
            Browse our collection of premium products and find exactly what you need
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/products')}
            sx={{ px: 6, py: 2, fontSize: '1.1rem' }}
          >
            Explore All Products
          </Button>
        </Container>
      </Box>
    </Box>
  );
};
