import { Page } from '@playwright/test';

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
}
