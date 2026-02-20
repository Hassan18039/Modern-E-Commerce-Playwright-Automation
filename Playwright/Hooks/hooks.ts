import { Before, After, BeforeAll, AfterAll, ITestCaseHookParameter, setDefaultTimeout } from '@cucumber/cucumber';
import { CustomWorld } from '../Fixtures/Worlds';
import { HomePage } from '../Pages/HomePage/homePage';

setDefaultTimeout(30 * 1000); // 30 seconds

BeforeAll(async function () {
    console.log('💡 Starting the BDD test suite');
});

Before(async function (this: CustomWorld) {
    console.log('🚀 Launching browser for scenario');
    await this.init();
    // Initialize page objects once — this.page is guaranteed to be set here
    this.homePage = new HomePage(this.page);
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