import { Before, After, BeforeAll, AfterAll, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';

setDefaultTimeout(30 * 1000); // 30 seconds
import { CustomWorld } from '../Fixtures/Worlds';
import { chromium } from '@playwright/test';

BeforeAll(async function () {
    console.log('💡 Starting the BDD test suite');
});

Before(async function (this: CustomWorld) {
    console.log('🚀 Launching browser for scenario');
    await this.init();
});

After(async function (this: CustomWorld, scenario: ITestCaseHookParameter) {
    console.log(`🧹 Cleaning up after scenario: ${scenario.pickle.name}`);

    if (scenario.result?.status === 'FAILED') {
        const screenshot = await this.page.screenshot();
        this.attach(screenshot, 'image/png');
    }

    await this.cleanup();
});

AfterAll(async function () {
    console.log('✅ Test suite finished');
});