import { When, Then } from '@cucumber/cucumber';
import { CustomWorld } from '../Fixtures/Worlds';

When('I navigate to the home page', async function (this: CustomWorld) {
    await this.homePage.navigateToHomePage();
});

Then('I should see the home page', async function (this: CustomWorld) {
    await this.homePage.verifyHomePage();
});

Then('I should see the hero heading {string}', async function (this: CustomWorld, text: string) {
    await this.homePage.verifyHeroHeading(text);
});

Then('I should see the hero subtitle containing {string}', async function (this: CustomWorld, text: string) {
    await this.homePage.verifyHeroSubtitle(text);
});

Then('I should see the {string} button in the hero section', async function (this: CustomWorld, label: string) {
    await this.homePage.verifyHeroButton(label);
});

When('I click the {string} button', async function (this: CustomWorld, label: string) {
    await this.homePage.clickHeroButton(label);
});

Then('I should be on the products page', async function (this: CustomWorld) {
    await this.homePage.verifyOnProductsPage();
});

Then('I should see the section heading {string}', async function (this: CustomWorld, heading: string) {
    await this.homePage.verifySectionHeading(heading);
});

Then('I should see the heading {string}', async function (this: CustomWorld, heading: string) {
    await this.homePage.verifySectionHeading(heading);
});

Then('I should see the {string} category card', async function (this: CustomWorld, category: string) {
    await this.homePage.verifyCategoryCard(category);
});

When('I click the {string} category card', async function (this: CustomWorld, category: string) {
    await this.homePage.clickCategoryCard(category);
});

Then('I should be on the products page filtered by {string}', async function (this: CustomWorld, category: string) {
    await this.homePage.verifyFilteredProductsPage(category);
});

Then('I should see {string} product cards in the featured section', async function (this: CustomWorld, count: string) {
    await this.homePage.verifyFeaturedProductCount(parseInt(count, 10));
});

Then('I should see the {string} button', async function (this: CustomWorld, label: string) {
    await this.homePage.verifyButton(label);
});

Then('I should see the feature {string}', async function (this: CustomWorld, feature: string) {
    await this.homePage.verifyFeatureTitle(feature);
});

Then('I should see the {string} navigation button', async function (this: CustomWorld, label: string) {
    await this.homePage.verifyNavButton(label);
});

When('I click the {string} navigation button', async function (this: CustomWorld, label: string) {
    await this.homePage.clickNavButton(label);
});

Then('I should see the cart icon in the navigation bar', async function (this: CustomWorld) {
    await this.homePage.verifyCartIcon();
});