import React, { useState, useMemo, useEffect } from 'react';
import {
  Container,
  Box,
  TextField,
  InputAdornment,
  Chip,
  Stack,
  Typography,
  Paper,
} from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { useSearchParams } from 'react-router-dom';
import { ProductGrid } from '../components/product/ProductGrid';
import { mockProducts } from '../data/mockProducts';

export const ProductsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  // Get unique categories from products
  const categories = useMemo(() => {
    const uniqueCategories = Array.from(new Set(mockProducts.map((p) => p.category)));
    return ['All', ...uniqueCategories.sort()];
  }, []);

  // Initialize category from URL params
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam && categories.includes(categoryParam)) {
      setSelectedCategory(categoryParam);
    }
  }, [searchParams, categories]);

  // Filter products based on search and category
  const filteredProducts = useMemo(() => {
    let filtered = mockProducts;

    // Filter by category
    if (selectedCategory !== 'All') {
      filtered = filtered.filter((product) => product.category === selectedCategory);
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    return filtered;
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
          Browse our complete collection of {mockProducts.length} amazing products
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
      {filteredProducts.length > 0 ? (
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
