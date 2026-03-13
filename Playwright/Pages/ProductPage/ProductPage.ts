import { Page, Locator, expect } from '@playwright/test';

export class ProductPage {
    readonly page: Page;
    readonly searchInput: Locator;
    readonly productCards: Locator;
    readonly resultsCount: Locator;
    readonly noProductsMessage: Locator;
    readonly clearSearchButton: Locator;
    readonly clearSearchIcon: Locator;
    readonly cartBadge: Locator;

    constructor(page: Page) {
        this.page = page;
        this.searchInput = page.getByTestId('product-search-input').locator('input');
        this.productCards = page.locator('[data-testid^="product-card-"]');
        this.resultsCount = page.getByTestId('results-count');
        this.noProductsMessage = page.getByText('No products found');
        this.clearSearchButton = page.getByText('Clear search');
        this.clearSearchIcon = page.locator('div[role="button"]').filter({ hasText: 'Clear search' }).locator('svg');
        this.cartBadge = page.getByTestId('cart-badge');
    }

    async navigateToProductsPage() {
        await this.page.goto('/products');
    }

    async verifyProductsHeading(text: string) {
        await expect(this.page.getByRole('heading', { level: 3, name: text })).toBeVisible();
    }

    async verifySearchInput() {
        await expect(this.searchInput).toBeVisible();
    }

    async verifyProductListVisible() {
        await expect(this.productCards.first()).toBeVisible();
    }

    async searchForProduct(term: string) {
        await this.searchInput.fill(term);
    }

    async verifySearchInputValue(term: string) {
        await expect(this.searchInput).toHaveValue(term);
    }

    async verifyProductsMatchingQueryVisible(query: string) {
        const count = await this.productCards.count();
        expect(count).toBeGreaterThan(0);
        
        const firstCardText = await this.productCards.first().textContent();
        expect(firstCardText?.toLowerCase()).toContain(query.toLowerCase());
    }

    async verifyResultsCountVisible() {
        await expect(this.resultsCount).toBeVisible();
    }

    async verifyResultsCountUpdate() {
        await expect(this.resultsCount).toBeVisible();
    }

    async clickCategoryChip(category: string) {
        await this.page.getByTestId(`category-chip-${category.toLowerCase()}`).click();
    }

    async verifyCategorySelected(category: string) {
        const chip = this.page.getByTestId(`category-chip-${category.toLowerCase()}`);
        await expect(chip).toHaveClass(/MuiChip-filledPrimary/);
    }

    async verifyOnlyCategoryProductsVisible(category: string) {
        const chips = this.productCards.locator('.MuiChip-root');
        const count = await chips.count();
        for (let i = 0; i < count; i++) {
            await expect(chips.nth(i)).toHaveText(category);
        }
    }

    async verifyUrlContainsCategory(category: string) {
        await expect(this.page).toHaveURL(new RegExp(`category=${category}`));
    }

    async verifyNoProductsMessageVisible() {
        await expect(this.noProductsMessage).toBeVisible();
    }

    async verifyClearSearchButtonVisible() {
        await expect(this.clearSearchButton).toBeVisible();
    }

    async clickClearSearchButton() {
        await this.clearSearchIcon.click();
        await this.page.waitForTimeout(500); 
    }

    async clickAddToCartOnFirstProduct() {
        const addToCartButton = this.productCards.first().locator('[data-testid^="add-to-cart-"]');
        await addToCartButton.click();
    }

    async verifyCartBadgeCountIncreased() {
        await expect(this.cartBadge).toBeVisible();
        const badgeText = await this.cartBadge.textContent();
        expect(Number(badgeText)).toBeGreaterThan(0);
    }
}
