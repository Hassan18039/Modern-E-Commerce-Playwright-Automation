import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  TextField,
  Grid,
  Stack,
  Divider,
} from '@mui/material';
import {
  CreditCard as CreditCardIcon,
  AccountBalanceWallet as WalletIcon,
  Apple as AppleIcon,
  LocalShipping as LocalShippingIcon,
} from '@mui/icons-material';

export type PaymentMethodType = 'credit-card' | 'paypal' | 'google-pay' | 'apple-pay' | 'cash-on-delivery';

interface PaymentMethodProps {
  onPaymentSelect?: (method: PaymentMethodType) => void;
}

export const PaymentMethod: React.FC<PaymentMethodProps> = ({
  onPaymentSelect,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>('credit-card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const handleMethodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const method = event.target.value as PaymentMethodType;
    setSelectedMethod(method);
    onPaymentSelect?.(method);
  };

  const formatCardNumber = (value: string): string => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Add space every 4 digits
    const formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
    return formatted;
  };

  const formatExpiryDate = (value: string): string => {
    // Remove all non-digit characters
    const digits = value.replace(/\D/g, '');
    // Add slash after 2 digits (MM/YY)
    if (digits.length >= 2) {
      return `${digits.slice(0, 2)}/${digits.slice(2, 4)}`;
    }
    return digits;
  };

  const handleCardDetailChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;

    if (field === 'cardNumber') {
      value = formatCardNumber(value);
    } else if (field === 'expiryDate') {
      value = formatExpiryDate(value);
    } else if (field === 'cvv') {
      // Only allow digits for CVV
      value = value.replace(/\D/g, '');
    }

    setCardDetails({ ...cardDetails, [field]: value });
  };

  const paymentOptions = [
    {
      value: 'credit-card',
      label: 'Credit/Debit Card',
      icon: <CreditCardIcon />,
      description: 'Pay securely with your card',
    },
    {
      value: 'cash-on-delivery',
      label: 'Cash on Delivery',
      icon: <LocalShippingIcon sx={{ color: '#2E7D32' }} />,
      description: 'Pay with cash when you receive your order',
    },
    {
      value: 'paypal',
      label: 'PayPal',
      icon: <WalletIcon sx={{ color: '#0070BA' }} />,
      description: 'Fast and secure PayPal checkout',
    },
    {
      value: 'google-pay',
      label: 'Google Pay',
      icon: <WalletIcon sx={{ color: '#4285F4' }} />,
      description: 'Quick checkout with Google Pay',
    },
    {
      value: 'apple-pay',
      label: 'Apple Pay',
      icon: <AppleIcon sx={{ color: '#000000' }} />,
      description: 'Pay easily with Apple Pay',
    },
  ];

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
          Payment Method
        </Typography>
        <Divider sx={{ mb: 3 }} />

        <FormControl component="fieldset" fullWidth>
          <RadioGroup value={selectedMethod} onChange={handleMethodChange}>
            <Stack spacing={2}>
              {paymentOptions.map((option) => (
                <Box
                  key={option.value}
                  data-testid={`payment-option-${option.value}`}
                  sx={{
                    border: '1px solid',
                    borderColor: selectedMethod === option.value ? 'primary.main' : 'divider',
                    borderRadius: 1,
                    p: 2,
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                    '&:hover': {
                      borderColor: 'primary.main',
                      bgcolor: 'action.hover',
                    },
                  }}
                  onClick={() => {
                    setSelectedMethod(option.value as PaymentMethodType);
                    onPaymentSelect?.(option.value as PaymentMethodType);
                  }}
                >
                  <FormControlLabel
                    value={option.value}
                    control={<Radio />}
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, width: '100%' }}>
                        {option.icon}
                        <Box sx={{ flex: 1 }}>
                          <Typography variant="body1" fontWeight="medium">
                            {option.label}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {option.description}
                          </Typography>
                        </Box>
                      </Box>
                    }
                    sx={{ width: '100%', m: 0 }}
                  />
                </Box>
              ))}
            </Stack>
          </RadioGroup>
        </FormControl>

        {selectedMethod === 'credit-card' && (
          <Box sx={{ mt: 3 }}>
            <Divider sx={{ mb: 3 }} />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="subtitle1">
                Card Details
              </Typography>
              <Box
                sx={{
                  px: 2,
                  py: 0.5,
                  bgcolor: 'info.light',
                  borderRadius: 1,
                  cursor: 'help',
                }}
                title="Test Cards:
Visa: 4532 1488 0343 6467
Mastercard: 5425 2334 3010 9903
Amex: 3782 822463 10005"
              >
                <Typography variant="caption" color="info.dark" fontWeight="medium">
                  Test Mode
                </Typography>
              </Box>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Card Number"
                  placeholder="1234 5678 9012 3456"
                  value={cardDetails.cardNumber}
                  onChange={handleCardDetailChange('cardNumber')}
                  inputProps={{ maxLength: 19, 'data-testid': 'card-number-input' }}
                  helperText="Test: 4532 1488 0343 6467 (Visa) | 5425 2334 3010 9903 (Mastercard)"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cardholder Name"
                  placeholder="John Doe"
                  value={cardDetails.cardName}
                  onChange={handleCardDetailChange('cardName')}
                  inputProps={{ 'data-testid': 'card-name-input' }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Expiry Date"
                  placeholder="MM/YY"
                  value={cardDetails.expiryDate}
                  onChange={handleCardDetailChange('expiryDate')}
                  inputProps={{ maxLength: 5, 'data-testid': 'expiry-date-input' }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  placeholder="123"
                  type="password"
                  value={cardDetails.cvv}
                  onChange={handleCardDetailChange('cvv')}
                  inputProps={{ maxLength: 4, 'data-testid': 'cvv-input' }}
                />
              </Grid>
            </Grid>
          </Box>
        )}

        {selectedMethod === 'cash-on-delivery' && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
            <Typography variant="body2" fontWeight="medium" color="success.dark" gutterBottom>
              Cash on Delivery Selected
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You will pay in cash when your order is delivered to your address. Please keep the exact amount ready.
            </Typography>
          </Box>
        )}

        {selectedMethod === 'paypal' && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              You will be redirected to PayPal to complete your payment
            </Typography>
          </Box>
        )}

        {(selectedMethod === 'google-pay' || selectedMethod === 'apple-pay') && (
          <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1, textAlign: 'center' }}>
            <Typography variant="body2" color="text.secondary">
              Click the button below to complete payment with{' '}
              {selectedMethod === 'google-pay' ? 'Google Pay' : 'Apple Pay'}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};
