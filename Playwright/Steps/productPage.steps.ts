import { Given, When, Then } from '@cucumber/cucumber';
import { ProductPage } from '../Pages/ProductPage/ProductPage';
import { CustomWorld } from '../Fixtures/Worlds';

Given('I navigate to the products page', async function (this: CustomWorld) {
    this.productPage = new ProductPage(this.page);
    await this.productPage.navigateToProductsPage();
});

Then('I should see the {string} heading', async function (this: CustomWorld, headingText: string) {
    await this.productPage.verifyProductsHeading(headingText);
});

Then('I should see the product search input', async function (this: CustomWorld) {
    await this.productPage.verifySearchInput();
});

Then('I should see a list of products', async function (this: CustomWorld) {
    await this.productPage.verifyProductListVisible();
});

Then('the results count should be visible', async function (this: CustomWorld) {
    await this.productPage.verifyResultsCountVisible();
});

When('I search for {string}', async function (this: CustomWorld, term: string) {
    await this.productPage.searchForProduct(term);
});

Then('I should see products matching {string}', async function (this: CustomWorld, term: string) {
    await this.productPage.verifyProductsMatchingQueryVisible(term);
});

Then('the results count should update', async function (this: CustomWorld) {
    await this.productPage.verifyResultsCountUpdate();
});

Then('the search input should retain the value {string}', async function (this: CustomWorld, term: string) {
    await this.productPage.verifySearchInputValue(term);
});

When('I click on the {string} category chip', async function (this: CustomWorld, category: string) {
    await this.productPage.clickCategoryChip(category);
});

Then('the {string} category should be selected', async function (this: CustomWorld, category: string) {
    await this.productPage.verifyCategorySelected(category);
});

Then('I should only see products from the {string} category', async function (this: CustomWorld, category: string) {
    await this.productPage.verifyOnlyCategoryProductsVisible(category);
});

Then('the URL should contain category {string}', async function (this: CustomWorld, category: string) {
    await this.productPage.verifyUrlContainsCategory(category);
});

Then('I should see products matching {string} in the {string} category', async function (this: CustomWorld, term: string, category: string) {
    await this.productPage.verifyProductsMatchingQueryVisible(term);
    await this.productPage.verifyOnlyCategoryProductsVisible(category);
});

Then('I should see the {string} message', async function (this: CustomWorld, message: string) {
    if (message === 'No products found') {
        await this.productPage.verifyNoProductsMessageVisible();
    }
});

Then('I should see the {string} button on products page', async function (this: CustomWorld, buttonName: string) {
    if (buttonName === 'Clear search') {
        await this.productPage.verifyClearSearchButtonVisible();
    }
});

When('I click the {string} button on products page', async function (this: CustomWorld, buttonName: string) {
    if (buttonName === 'Clear search') {
        await this.productPage.clickClearSearchButton();
    }
});

Then('I should see the default list of products', async function (this: CustomWorld) {
    await this.productPage.verifyProductListVisible();
});

When('I click {string} on the first available product', async function (this: CustomWorld, buttonAction: string) {
    if (buttonAction === 'Add to Cart') {
        await this.productPage.clickAddToCartOnFirstProduct();
    }
});

Then('the cart badge count should increase', async function (this: CustomWorld) {
    await this.productPage.verifyCartBadgeCountIncreased();
});
