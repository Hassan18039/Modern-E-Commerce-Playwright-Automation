import { Page, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navigateToHomePage() {
        await this.page.goto('/');
    }

    async verifyHomePage() {
        const url = this.page.url();
        if (!url.includes('localhost:5173')) {
            throw new Error(`Expected home page URL, got: ${url}`);
        }
    }

    async verifyHeroHeading(text: string) {
        await expect(this.page.getByTestId('hero-heading')).toContainText(text);
    }

    async verifyHeroSubtitle(text: string) {
        await expect(this.page.getByTestId('hero-subtitle')).toContainText(text);
    }

    async verifyHeroButton(label: string) {
        const testIdMap: Record<string, string> = {
            'Shop Now': 'hero-shop-now-btn',
            'Browse Categories': 'hero-browse-categories-btn',
        };
        await expect(this.page.getByTestId(testIdMap[label])).toBeVisible();
    }

    async clickHeroButton(label: string) {
        const testIdMap: Record<string, string> = {
            'Shop Now': 'hero-shop-now-btn',
            'Browse Categories': 'hero-browse-categories-btn',
            'View All Products': 'view-all-products-btn',
            'Explore All Products': 'cta-explore-btn',
        };
        await this.page.getByTestId(testIdMap[label]).click();
    }

    async verifySectionHeading(heading: string) {
        const testIdMap: Record<string, string> = {
            'Shop by Category': 'section-heading-categories',
            'Featured Products': 'section-heading-featured',
            'Ready to Start Shopping?': 'cta-heading',
        };
        await expect(this.page.getByTestId(testIdMap[heading])).toContainText(heading);
    }

    async verifyCategoryCard(categoryName: string) {
        await expect(
            this.page.getByTestId(`category-card-${categoryName.toLowerCase()}`)
        ).toBeVisible();
    }

    async clickCategoryCard(categoryName: string) {
        await this.page.getByTestId(`category-card-${categoryName.toLowerCase()}`).click();
    }

    async verifyFilteredProductsPage(category: string) {
        await expect(this.page).toHaveURL(new RegExp(`/products\\?category=${category}`));
    }

    async verifyFeaturedProductCount(count: number) {
        const section = this.page.getByTestId('featured-products-section');
        const cards = section.locator('[data-testid^="product-card-"]');
        await expect(cards).toHaveCount(count);
    }

    async verifyFeatureTitle(featureTitle: string) {
        const testIdMap: Record<string, string> = {
            'Free Shipping': 'feature-free-shipping',
            'Secure Payment': 'feature-secure-payment',
            'Easy Returns': 'feature-easy-returns',
        };
        await expect(this.page.getByTestId(testIdMap[featureTitle])).toContainText(featureTitle);
    }

    async verifyButton(label: string) {
        const testIdMap: Record<string, string> = {
            'View All Products': 'view-all-products-btn',
            'Explore All Products': 'cta-explore-btn',
        };
        await expect(this.page.getByTestId(testIdMap[label])).toBeVisible();
    }

    async clickButton(label: string) {
        const testIdMap: Record<string, string> = {
            'View All Products': 'view-all-products-btn',
            'Explore All Products': 'cta-explore-btn',
        };
        await this.page.getByTestId(testIdMap[label]).click();
    }

    async verifyOnProductsPage() {
        await expect(this.page).toHaveURL(/\/products/);
    }

    async verifyNavButton(label: string) {
        await expect(this.page.getByTestId(`nav-${label.toLowerCase()}`)).toBeVisible();
    }

    async clickNavButton(label: string) {
        await this.page.getByTestId(`nav-${label.toLowerCase()}`).click();
    }

    async verifyCartIcon() {
        await expect(this.page.getByTestId('cart-icon-button')).toBeVisible();
    }
}
