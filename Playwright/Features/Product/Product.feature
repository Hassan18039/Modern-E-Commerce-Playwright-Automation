Feature: Products Page Functionality
  As a user
  I want to be able to view, search, and filter products
  So that I can easily find and purchase items I need

  Background:
    Given I navigate to the products page

  Scenario: View all products by default
    Then I should see the "All Products" heading
    And I should see the product search input
    And I should see a list of products
    And the results count should be visible

  Scenario: Search for a product
    When I search for "Wireless"
    Then I should see products matching "Wireless"
    And the results count should update
    And the search input should retain the value "Wireless"

  Scenario: Filter products by category
    When I click on the "Electronics" category chip
    Then the "Electronics" category should be selected
    And I should only see products from the "Electronics" category
    And the URL should contain category "Electronics"

  Scenario: Search and filter combined
    When I click on the "Sports" category chip
    And I search for "Running"
    Then I should see products matching "Running" in the "Sports" category

  Scenario: No products found
    When I search for "NonExistentProduct123"
    Then I should see the "No products found" message
    And I should see the "Clear search" button on products page

  Scenario: Clear search when no products found
    When I search for "NonExistentProduct123"
    And I click the "Clear search" button on products page
    Then I should see the default list of products

  Scenario: Add product to cart from products page
    When I click "Add to Cart" on the first available product
    Then the cart badge count should increase
