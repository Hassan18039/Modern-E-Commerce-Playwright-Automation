import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  Grid,
  Divider,
} from '@mui/material';

export interface UserDetails {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  country: string;
  city: string;
}

interface UserDetailsFormProps {
  onDetailsChange?: (details: UserDetails) => void;
}

export const UserDetailsForm: React.FC<UserDetailsFormProps> = ({
  onDetailsChange,
}) => {
  const [details, setDetails] = useState<UserDetails>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    country: '',
    city: '',
  });

  const handleChange = (field: keyof UserDetails) => (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const updatedDetails = {
      ...details,
      [field]: event.target.value,
    };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  const formatPhoneNumber = (value: string): string => {
    // Only allow digits and basic phone characters
    return value.replace(/[^\d\s\-\+\(\)]/g, '');
  };

  const handlePhoneChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(event.target.value);
    const updatedDetails = {
      ...details,
      phone: formatted,
    };
    setDetails(updatedDetails);
    onDetailsChange?.(updatedDetails);
  };

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Delivery Information
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Full Name"
              placeholder="Enter your full name"
              value={details.fullName}
              onChange={handleChange('fullName')}
              inputProps={{ 'data-testid': 'fullname-input' }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              type="email"
              label="Email"
              placeholder="your.email@example.com"
              value={details.email}
              onChange={handleChange('email')}
              inputProps={{ 'data-testid': 'email-input' }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Phone Number"
              placeholder="+1 (234) 567-8900"
              value={details.phone}
              onChange={handlePhoneChange}
              inputProps={{ maxLength: 20, 'data-testid': 'phone-input' }}
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              fullWidth
              required
              label="Address"
              placeholder="Street address, apartment, suite, etc."
              value={details.address}
              onChange={handleChange('address')}
              multiline
              rows={2}
              inputProps={{ 'data-testid': 'address-input' }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="Country"
              placeholder="Enter your country"
              value={details.country}
              onChange={handleChange('country')}
              inputProps={{ 'data-testid': 'country-input' }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              required
              label="City"
              placeholder="Enter your city"
              value={details.city}
              onChange={handleChange('city')}
              inputProps={{ 'data-testid': 'city-input' }}
            />
          </Grid>
        </Grid>

        <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 1 }}>
          <Typography variant="caption" color="info.dark">
            Your delivery information will be used to ship your order and contact you if needed.
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
