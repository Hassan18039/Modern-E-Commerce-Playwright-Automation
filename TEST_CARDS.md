# Test Card Numbers

Use these test card numbers for testing the payment functionality in the application.

## Credit Card Test Numbers

### Visa
- **Card Number:** `4532 1488 0343 6467`
- **Expiry Date:** Any future date (e.g., `12/25`)
- **CVV:** Any 3 digits (e.g., `123`)
- **Cardholder Name:** Any name (e.g., `John Doe`)

### Mastercard
- **Card Number:** `5425 2334 3010 9903`
- **Expiry Date:** Any future date (e.g., `12/25`)
- **CVV:** Any 3 digits (e.g., `456`)
- **Cardholder Name:** Any name (e.g., `Jane Smith`)

### American Express
- **Card Number:** `3782 822463 10005`
- **Expiry Date:** Any future date (e.g., `12/25`)
- **CVV:** Any 4 digits (e.g., `1234`)
- **Cardholder Name:** Any name (e.g., `Bob Johnson`)

### Discover
- **Card Number:** `6011 1111 1111 1117`
- **Expiry Date:** Any future date (e.g., `12/25`)
- **CVV:** Any 3 digits (e.g., `789`)
- **Cardholder Name:** Any name (e.g., `Alice Brown`)

## Additional Test Card Numbers

### Visa (Alternative)
- `4539 1488 0343 6467`
- `4556 7375 8689 9855`
- `4916 6498 6915 3207`

### Mastercard (Alternative)
- `5425 2334 3010 9903`
- `2221 0000 0000 0009`
- `5555 5555 5555 4444`

## Notes

1. **Card Number Formatting:** The card number field automatically formats with spaces (XXXX XXXX XXXX XXXX)
2. **Expiry Date Formatting:** The expiry date field automatically formats as MM/YY
3. **CVV:** Most cards use 3 digits, American Express uses 4 digits
4. **Testing Mode:** The application is in test mode and won't process real payments
5. **Any Future Date:** You can use any expiry date in the future (month 01-12, year 25 or later)

## Quick Test Data

For quick testing, use:
- **Card:** `4532 1488 0343 6467`
- **Name:** `Test User`
- **Expiry:** `12/28`
- **CVV:** `123`

## Features Tested

✅ Card number auto-formatting (adds spaces every 4 digits)
✅ Expiry date auto-formatting (adds slash MM/YY)
✅ CVV validation (3-4 digits only)
✅ Multiple payment methods (Card, PayPal, Google Pay, Apple Pay)
✅ Payment processing simulation
✅ Order confirmation page
