import { When, Then, Before } from '@cucumber/cucumber';
import { CustomWorld } from '../Fixtures/Worlds';
import { HomePage } from '../Pages/HomePage/homePage';

let homePage: HomePage;

Before(async function (this: CustomWorld) {
    homePage = new HomePage(this.page);
});

When('I navigate to the home page', async function (this: CustomWorld) {
    await homePage.navigateToHomePage();
});

Then('I should see the home page', async function (this: CustomWorld) {
    await homePage.verifyHomePage();
});