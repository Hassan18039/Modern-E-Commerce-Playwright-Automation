import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../Fixtures/Worlds';

When('I navigate to the home page', async function (this: CustomWorld) {
    await this.homePage.navigateToHomePage();
});

Then('I should see the home page', async function (this: CustomWorld) {
    await this.homePage.verifyHomePage();
});