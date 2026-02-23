Feature: Home Page
  As a visitor to ModernShop
  I want to see the home page content
  So that I can explore and navigate to products

  # ─────────────────────────────────────────────
  # 1. Page Load & URL
  # ─────────────────────────────────────────────

  Scenario: User successfully navigates to the home page
    When I navigate to the home page
    Then I should see the home page

  # ─────────────────────────────────────────────
  # 2. Hero Section
  # ─────────────────────────────────────────────

  Scenario: Hero section displays the welcome heading
    When I navigate to the home page
    Then I should see the hero heading "Welcome to ModernShop"

  Scenario: Hero section displays the subtitle text
    When I navigate to the home page
    Then I should see the hero subtitle containing "Discover amazing products at unbeatable prices"

  Scenario: Hero section has a Shop Now button
    When I navigate to the home page
    Then I should see the "Shop Now" button in the hero section

  Scenario: Hero section has a Browse Categories button
    When I navigate to the home page
    Then I should see the "Browse Categories" button in the hero section

  Scenario: Clicking Shop Now navigates to the products page
    When I navigate to the home page
    And I click the "Shop Now" button
    Then I should be on the products page

  Scenario: Clicking Browse Categories navigates to the products page
    When I navigate to the home page
    And I click the "Browse Categories" button
    Then I should be on the products page

  # ─────────────────────────────────────────────
  # 3. Category Cards Section
  # ─────────────────────────────────────────────

  Scenario: Shop by Category section heading is visible
    When I navigate to the home page
    Then I should see the section heading "Shop by Category"

  Scenario Outline: All category cards are displayed
    When I navigate to the home page
    Then I should see the "<category>" category card

    Examples:
      | category    |
      | Electronics |
      | Fashion     |
      | Home        |
      | Sports      |

  Scenario: Clicking the Electronics category navigates to its filtered products page
    When I navigate to the home page
    And I click the "Electronics" category card
    Then I should be on the products page filtered by "Electronics"

  Scenario: Clicking the Fashion category navigates to its filtered products page
    When I navigate to the home page
    And I click the "Fashion" category card
    Then I should be on the products page filtered by "Fashion"

  Scenario: Clicking the Home category navigates to its filtered products page
    When I navigate to the home page
    And I click the "Home" category card
    Then I should be on the products page filtered by "Home"

  Scenario: Clicking the Sports category navigates to its filtered products page
    When I navigate to the home page
    And I click the "Sports" category card
    Then I should be on the products page filtered by "Sports"

  # ─────────────────────────────────────────────
  # 4. Featured Products Section
  # ─────────────────────────────────────────────

  Scenario: Featured Products section heading is visible
    When I navigate to the home page
    Then I should see the section heading "Featured Products"

  Scenario: Featured Products section displays exactly 4 products
    When I navigate to the home page
    Then I should see "4" product cards in the featured section

  Scenario: View All Products button is visible in featured section
    When I navigate to the home page
    Then I should see the "View All Products" button

  Scenario: Clicking View All Products navigates to the products page
    When I navigate to the home page
    And I click the "View All Products" button
    Then I should be on the products page

  # ─────────────────────────────────────────────
  # 5. Value Propositions / Features Section
  # ─────────────────────────────────────────────

  Scenario: Free Shipping value proposition is displayed
    When I navigate to the home page
    Then I should see the feature "Free Shipping"

  Scenario: Secure Payment value proposition is displayed
    When I navigate to the home page
    Then I should see the feature "Secure Payment"

  Scenario: Easy Returns value proposition is displayed
    When I navigate to the home page
    Then I should see the feature "Easy Returns"

  # ─────────────────────────────────────────────
  # 6. Call to Action Section
  # ─────────────────────────────────────────────

  Scenario: Call to action heading is displayed
    When I navigate to the home page
    Then I should see the heading "Ready to Start Shopping?"

  Scenario: Explore All Products CTA button is visible
    When I navigate to the home page
    Then I should see the "Explore All Products" button

  Scenario: Clicking Explore All Products navigates to the products page
    When I navigate to the home page
    And I click the "Explore All Products" button
    Then I should be on the products page

  # ─────────────────────────────────────────────
  # 7. Header / Navigation
  # ─────────────────────────────────────────────

  Scenario: Navigation bar contains the Home button
    When I navigate to the home page
    Then I should see the "Home" navigation button

  Scenario: Navigation bar contains the Products button
    When I navigate to the home page
    Then I should see the "Products" navigation button

  Scenario: Clicking the Products nav button navigates to the products page
    When I navigate to the home page
    And I click the "Products" navigation button
    Then I should be on the products page

  Scenario: Cart icon is visible in the navigation bar
    When I navigate to the home page
    Then I should see the cart icon in the navigation bar