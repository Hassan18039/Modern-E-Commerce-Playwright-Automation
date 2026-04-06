import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/product/ProductGrid';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const categories = ['All', 'Electronics', 'Fashion', 'Home', 'Sports'];

  // Initialize category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams]);

  // Fetch products from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        if (searchQuery) queryParams.append('search', searchQuery);
        if (selectedCategory && selectedCategory !== 'All') queryParams.append('category', selectedCategory);
        
        const response = await fetch(`http://localhost:5000/api/products?${queryParams.toString()}`);
        const data = await response.json();
        
        const mappedProducts = data.map((p: any) => ({
          ...p,
          image: p.imageUrl,
          inStock: p.stock > 0,
        }));
        setFilteredProducts(mappedProducts);
      } catch (error) {
        console.error('Failed to fetch products', error);
      } finally {
        setLoading(false);
      }
    };
    
    // Simple debounce for typing search queries
    const timeoutId = setTimeout(() => fetchProducts(), 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, selectedCategory]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category !== 'All') {
      setSearchParams({ category });
    } else {
      setSearchParams({});
    }
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Page Header */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" gutterBottom fontWeight="bold">
          All Products
        </Typography>
        <Typography variant="h6" color="text.secondary">
          Browse our complete collection of amazing products
        </Typography>
      </Box>

      {/* Search and Filter Section */}
      <Paper elevation={2} sx={{ p: 3, mb: 4 }}>
        {/* Search Bar */}
        <TextField
          data-testid="product-search-input"
          fullWidth
          placeholder="Search products by name, description, or category..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{ mb: 3 }}
        />

        {/* Category Filters */}
        <Box>
          <Typography variant="subtitle1" gutterBottom fontWeight="medium">
            Categories
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap" useFlexGap>
            {categories.map((category) => (
              <Chip
                key={category}
                data-testid={`category-chip-${category.toLowerCase()}`}
                label={category}
                onClick={() => handleCategoryChange(category)}
                color={selectedCategory === category ? 'primary' : 'default'}
                variant={selectedCategory === category ? 'filled' : 'outlined'}
                sx={{
                  fontSize: '0.95rem',
                  py: 2.5,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: 2,
                  },
                }}
              />
            ))}
          </Stack>
        </Box>
      </Paper>

      {/* Results Summary */}
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography data-testid="results-count" variant="body1" color="text.secondary">
          Showing <strong>{filteredProducts.length}</strong> {filteredProducts.length === 1 ? 'product' : 'products'}
          {selectedCategory !== 'All' && ` in ${selectedCategory}`}
          {searchQuery && ` matching "${searchQuery}"`}
        </Typography>
      </Box>

      {/* Products Grid */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress size={50} />
        </Box>
      ) : filteredProducts.length > 0 ? (
        <ProductGrid products={filteredProducts} />
      ) : (
        <Paper sx={{ p: 8, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            No products found
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
            Try adjusting your search or filter to find what you're looking for.
          </Typography>
          {(searchQuery || selectedCategory !== 'All') && (
            <Stack direction="row" spacing={2} justifyContent="center">
              {searchQuery && (
                <Chip
                  label="Clear search"
                  onDelete={() => setSearchQuery('')}
                  color="primary"
                  variant="outlined"
                />
              )}
              {selectedCategory !== 'All' && (
                <Chip
                  label="Show all categories"
                  onDelete={() => handleCategoryChange('All')}
                  color="primary"
                  variant="outlined"
                />
              )}
            </Stack>
          )}
        </Paper>
      )}
    </Container>
  );
};
