import { setWorldConstructor, World, IWorldOptions } from '@cucumber/cucumber';
import { Browser, BrowserContext, chromium, Page } from '@playwright/test';

export class CustomWorld extends World {
    browser!: Browser;
    context!: BrowserContext;
    page!: Page;

    constructor(options: IWorldOptions) {
        super(options);
    }

    async init() {
        this.browser = await chromium.launch({ headless: !!process.env.CI, slowMo: 500 });

        this.context = await this.browser.newContext({
            baseURL: process.env.BASE_URL ?? 'http://localhost:5173',
        });
        this.page = await this.context.newPage();
    }

    async cleanup() {
        await this.page.close();
        await this.context.close();
        await this.browser.close();
    }
}

setWorldConstructor(CustomWorld);