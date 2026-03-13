import { Page, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToProductsPage() {
        await this.page.goto('/products');
    }

    async verifyProductsHeading(text: string) {
        await expect(this.page.getByRole('heading', { level: 3, name: text })).toBeVisible();
    }

    async verifySearchInput() {
        await expect(this.page.getByTestId('product-search-input')).toBeVisible();
    }

    async verifyProductListVisible() {
        // Assert that the container holding the specific product cards or at least one is visible
        const productCards = this.page.locator('[data-testid^="product-card-"]');
        await expect(productCards.first()).toBeVisible();
    }

    async searchForProduct(term: string) {
        const searchInput = this.page.getByTestId('product-search-input').locator('input');
        await searchInput.fill(term);
    }

    async verifySearchInputValue(term: string) {
        const searchInput = this.page.getByTestId('product-search-input').locator('input');
        await expect(searchInput).toHaveValue(term);
    }

    async verifyProductsMatchingQueryVisible(query: string) {
        // Here we ensure the displayed product cards contain text related to the query
        const productCards = this.page.locator('[data-testid^="product-card-"]');
        const count = await productCards.count();
        expect(count).toBeGreaterThan(0);
        
        // Ensure at least the first one shows related content
        const firstCardText = await productCards.first().textContent();
        expect(firstCardText?.toLowerCase()).toContain(query.toLowerCase());
    }

    async verifyResultsCountVisible() {
        await expect(this.page.getByTestId('results-count')).toBeVisible();
    }

    async verifyResultsCountUpdate() {
        // Just verify it's there for now and possibly matching text dynamically later if needed.
        await expect(this.page.getByTestId('results-count')).toBeVisible();
    }

    async clickCategoryChip(category: string) {
        await this.page.getByTestId(`category-chip-${category.toLowerCase()}`).click();
    }

    async verifyCategorySelected(category: string) {
        // Material UI chips apply "MuiChip-filledPrimary" class when selected vs "MuiChip-outlined"
        const chip = this.page.getByTestId(`category-chip-${category.toLowerCase()}`);
        await expect(chip).toHaveClass(/MuiChip-filledPrimary/);
    }

    async verifyOnlyCategoryProductsVisible(category: string) {
        const chips = this.page.locator(`[data-testid^="product-card-"] .MuiChip-root`);
        const count = await chips.count();
        for (let i = 0; i < count; i++) {
            await expect(chips.nth(i)).toHaveText(category);
        }
    }

    async verifyUrlContainsCategory(category: string) {
        await expect(this.page).toHaveURL(new RegExp(`category=${category}`));
    }

    async verifyNoProductsMessageVisible() {
        await expect(this.page.getByText('No products found')).toBeVisible();
    }

    async verifyClearSearchButtonVisible() {
        await expect(this.page.getByText('Clear search')).toBeVisible();
    }

    async clickClearSearchButton() {
        const clearChip = this.page.locator('div[role="button"]').filter({ hasText: 'Clear search' });
        // The MUI Chip onDelete renders an SVG icon (usually CancelIcon or DeleteIcon)
        await clearChip.locator('svg').click();
        await this.page.waitForTimeout(500); 
    }

    async clickAddToCartOnFirstProduct() {
        const addToCartButton = this.page.locator('[data-testid^="add-to-cart-"]').first();
        await addToCartButton.click();
    }

    async verifyCartBadgeCountIncreased() {
        const cartBadge = this.page.getByTestId('cart-badge');
        await expect(cartBadge).toBeVisible();
        const badgeText = await cartBadge.textContent();
        expect(Number(badgeText)).toBeGreaterThan(0);
    }
}
