import React, { useState, useMemo } from 'react';
import {
  Container,
  Grid,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  Divider,
  Stack,
  Alert,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack as ArrowBackIcon, Lock as LockIcon } from '@mui/icons-material';
import { useCart } from '../hooks/useCart';
import { PaymentMethod, PaymentMethodType } from '../components/payment/PaymentMethod';
import { UserDetailsForm, UserDetails } from '../components/checkout/UserDetailsForm';

export const CheckoutPage: React.FC = () => {
  const { state, clearCart } = useCart();
  const navigate = useNavigate();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethodType>('credit-card');
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [processing, setProcessing] = useState(false);
  const [formError, setFormError] = useState('');

  const tax = state.subtotal * 0.1;
  const total = state.subtotal + tax;

  const handlePaymentSelect = (method: PaymentMethodType) => {
    setSelectedPaymentMethod(method);
  };

  const handleDetailsChange = (details: UserDetails) => {
    setUserDetails(details);
    setFormError('');
  };

  // Memoized — computed once per userDetails change, not on every render
  const formValid = useMemo((): boolean => {
    if (!userDetails) return false;
    return (
      userDetails.fullName.trim() !== '' &&
      userDetails.email.trim() !== '' &&
      userDetails.phone.trim() !== '' &&
      userDetails.address.trim() !== '' &&
      userDetails.country.trim() !== '' &&
      userDetails.city.trim() !== ''
    );
  }, [userDetails]);

  const handleCompleteOrder = () => {
    if (!formValid) {
      setFormError('Please fill in all delivery information fields');
      return;
    }

    setProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false);
      clearCart();
      navigate('/order-success', {
        state: {
          orderTotal: total,
          paymentMethod: selectedPaymentMethod,
          userDetails: userDetails,
          orderId: `ORD-${Date.now()}`,
        }
      });
    }, 2000);
  };

  if (state.items.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Alert severity="warning" sx={{ mb: 3 }}>
          Your cart is empty. Add items to proceed with checkout.
        </Alert>
        <Button data-testid="go-to-products" variant="contained" onClick={() => navigate('/products')}>
          Go to Products
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Button
        data-testid="back-to-cart"
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/cart')}
        sx={{ mb: 3 }}
      >
        Back to Cart
      </Button>

      <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
        Checkout
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={7}>
          <Stack spacing={3}>
            <UserDetailsForm onDetailsChange={handleDetailsChange} />
            <PaymentMethod onPaymentSelect={handlePaymentSelect} />
          </Stack>
        </Grid>

        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Order Summary
              </Typography>
              <Divider sx={{ my: 2 }} />

              <Stack spacing={2}>
                {state.items.map((item) => (
                  <Box
                    key={item.id}
                    data-testid={`order-item-${item.id}`}
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box>
                      <Typography variant="body2" fontWeight="medium">
                        {item.product.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                      </Typography>
                    </Box>
                    <Typography variant="body2" fontWeight="bold">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </Typography>
                  </Box>
                ))}
              </Stack>

              <Divider sx={{ my: 2 }} />

              <Stack spacing={1.5}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Subtotal ({state.totalItems} items):</Typography>
                  <Typography data-testid="checkout-subtotal" variant="body1">${state.subtotal.toFixed(2)}</Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="body1">Tax (10%):</Typography>
                  <Typography data-testid="checkout-tax" variant="body1">${tax.toFixed(2)}</Typography>
                </Box>
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6" fontWeight="bold">
                    Total:
                  </Typography>
                  <Typography data-testid="checkout-total" variant="h6" color="primary" fontWeight="bold">
                    ${total.toFixed(2)}
                  </Typography>
                </Box>
              </Stack>

              <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                  <LockIcon fontSize="small" sx={{ color: 'success.dark' }} />
                  <Typography variant="body2" fontWeight="medium" color="success.dark">
                    Secure Checkout
                  </Typography>
                </Box>
                <Typography variant="caption" color="text.secondary">
                  Your payment information is encrypted and secure
                </Typography>
              </Box>

              {formError && (
                <Alert data-testid="form-error-alert" severity="error" sx={{ mt: 2 }}>
                  {formError}
                </Alert>
              )}

              <Button
                data-testid="place-order-button"
                fullWidth
                variant="contained"
                size="large"
                onClick={handleCompleteOrder}
                disabled={processing || !formValid}
                sx={{ mt: 3 }}
              >
                {processing
                  ? 'Processing...'
                  : selectedPaymentMethod === 'cash-on-delivery'
                    ? 'Place Order'
                    : `Pay $${total.toFixed(2)}`}
              </Button>

              {!formValid && !formError && (
                <Alert data-testid="form-incomplete-alert" severity="info" sx={{ mt: 2 }}>
                  Please complete all delivery information fields to continue
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};
