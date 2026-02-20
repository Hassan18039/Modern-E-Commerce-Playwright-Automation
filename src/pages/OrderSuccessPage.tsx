import React from 'react';
import { Container, Box, Typography, Button, Card, CardContent, Stack } from '@mui/material';
import { CheckCircle as CheckCircleIcon } from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';

export const OrderSuccessPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as {
    orderTotal?: number;
    paymentMethod?: string;
    orderId?: string;
  } | null;

  return (
    <Container maxWidth="sm" sx={{ py: 8 }}>
      <Card>
        <CardContent>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              py: 4,
            }}
          >
            <CheckCircleIcon data-testid="success-icon" sx={{ fontSize: 100, color: 'success.main', mb: 3 }} />

            <Typography data-testid="success-heading" variant="h4" gutterBottom fontWeight="bold">
              Order Successful!
            </Typography>

            <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
              Thank you for your purchase. Your order has been confirmed and will be processed shortly.
            </Typography>

            {state?.orderTotal && (
              <Card variant="outlined" sx={{ width: '100%', mb: 3 }}>
                <CardContent>
                  <Stack spacing={2}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="body2" color="text.secondary">
                        Order Total:
                      </Typography>
                      <Typography data-testid="order-total" variant="h6" color="primary" fontWeight="bold">
                        ${state.orderTotal.toFixed(2)}
                      </Typography>
                    </Box>
                    {state.paymentMethod && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Payment Method:
                        </Typography>
                        <Typography data-testid="order-payment-method" variant="body2" fontWeight="medium">
                          {state.paymentMethod.split('-').map(word =>
                            word.charAt(0).toUpperCase() + word.slice(1)
                          ).join(' ')}
                        </Typography>
                      </Box>
                    )}
                    {state.orderId && (
                      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Typography variant="body2" color="text.secondary">
                          Order Number:
                        </Typography>
                        <Typography data-testid="order-number" variant="body2" fontWeight="medium">
                          #{state.orderId}
                        </Typography>
                      </Box>
                    )}
                  </Stack>
                </CardContent>
              </Card>
            )}

            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
              A confirmation email has been sent to your registered email address.
            </Typography>

            <Stack direction="row" spacing={2} sx={{ width: '100%' }}>
              <Button
                data-testid="continue-shopping"
                fullWidth
                variant="outlined"
                onClick={() => navigate('/products')}
              >
                Continue Shopping
              </Button>
              <Button
                data-testid="back-to-home"
                fullWidth
                variant="contained"
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </Stack>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};
