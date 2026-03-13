import { Page, Locator, expect } from '@playwright/test';

export class HomePage {
    readonly page: Page;
    readonly heroHeading: Locator;
    readonly heroSubtitle: Locator;
    readonly shopNowButton: Locator;
    readonly browseCategoriesButton: Locator;
    readonly viewAllProductsButton: Locator;
    readonly exploreAllProductsButton: Locator;
    
    readonly shopByCategoryHeading: Locator;
    readonly featuredProductsHeading: Locator;
    readonly ctaHeading: Locator;
    
    readonly featuredProductsSection: Locator;
    readonly featureFreeShipping: Locator;
    readonly featureSecurePayment: Locator;
    readonly featureEasyReturns: Locator;
    
    readonly cartIconButton: Locator;

    constructor(page: Page) {
        this.page = page;
        
        // Hero Section
        this.heroHeading = page.getByTestId('hero-heading');
        this.heroSubtitle = page.getByTestId('hero-subtitle');
        this.shopNowButton = page.getByTestId('hero-shop-now-btn');
        this.browseCategoriesButton = page.getByTestId('hero-browse-categories-btn');
        
        // General Buttons
        this.viewAllProductsButton = page.getByTestId('view-all-products-btn');
        this.exploreAllProductsButton = page.getByTestId('cta-explore-btn');
        
        // Headings
        this.shopByCategoryHeading = page.getByTestId('section-heading-categories');
        this.featuredProductsHeading = page.getByTestId('section-heading-featured');
        this.ctaHeading = page.getByTestId('cta-heading');
        
        // Sections & Features
        this.featuredProductsSection = page.getByTestId('featured-products-section');
        this.featureFreeShipping = page.getByTestId('feature-free-shipping');
        this.featureSecurePayment = page.getByTestId('feature-secure-payment');
        this.featureEasyReturns = page.getByTestId('feature-easy-returns');
        
        // Navigation
        this.cartIconButton = page.getByTestId('cart-icon-button');
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
        await expect(this.heroHeading).toContainText(text);
    }

    async verifyHeroSubtitle(text: string) {
        await expect(this.heroSubtitle).toContainText(text);
    }

    async verifyHeroButton(label: string) {
        const button = label === 'Shop Now' ? this.shopNowButton : this.browseCategoriesButton;
        await expect(button).toBeVisible();
    }

    async clickHeroButton(label: string) {
        switch (label) {
            case 'Shop Now': await this.shopNowButton.click(); break;
            case 'Browse Categories': await this.browseCategoriesButton.click(); break;
            case 'View All Products': await this.viewAllProductsButton.click(); break;
            case 'Explore All Products': await this.exploreAllProductsButton.click(); break;
            default: throw new Error(`Unknown button: ${label}`);
        }
    }

    async verifySectionHeading(heading: string) {
        switch (heading) {
            case 'Shop by Category': await expect(this.shopByCategoryHeading).toContainText(heading); break;
            case 'Featured Products': await expect(this.featuredProductsHeading).toContainText(heading); break;
            case 'Ready to Start Shopping?': await expect(this.ctaHeading).toContainText(heading); break;
            default: throw new Error(`Unknown heading: ${heading}`);
        }
    }

    async verifyCategoryCard(categoryName: string) {
        await expect(this.page.getByTestId(`category-card-${categoryName.toLowerCase()}`)).toBeVisible();
    }

    async clickCategoryCard(categoryName: string) {
        await this.page.getByTestId(`category-card-${categoryName.toLowerCase()}`).click();
    }

    async verifyFilteredProductsPage(category: string) {
        await expect(this.page).toHaveURL(new RegExp(`/products\\?category=${category}`));
    }

    async verifyFeaturedProductCount(count: number) {
        const cards = this.featuredProductsSection.locator('[data-testid^="product-card-"]');
        await expect(cards).toHaveCount(count);
    }

    async verifyFeatureTitle(featureTitle: string) {
        switch (featureTitle) {
            case 'Free Shipping': await expect(this.featureFreeShipping).toContainText(featureTitle); break;
            case 'Secure Payment': await expect(this.featureSecurePayment).toContainText(featureTitle); break;
            case 'Easy Returns': await expect(this.featureEasyReturns).toContainText(featureTitle); break;
            default: throw new Error(`Unknown feature title: ${featureTitle}`);
        }
    }

    async verifyButton(label: string) {
        const button = label === 'View All Products' ? this.viewAllProductsButton : this.exploreAllProductsButton;
        await expect(button).toBeVisible();
    }

    async clickButton(label: string) {
        const button = label === 'View All Products' ? this.viewAllProductsButton : this.exploreAllProductsButton;
        await button.click();
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
        await expect(this.cartIconButton).toBeVisible();
    }
}
