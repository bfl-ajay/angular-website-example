Feature: Pricing Page
  As a user
  I want to view pricing plans
  So that I can understand the pricing options and choose the right plan

  Background:
    Given I navigate to the Pricing page

  Scenario: Pricing page displays section information
    Then the page should display section heading
    And the page should display pricing tagline
    And the page should display pricing title
    And the page should display pricing description

  Scenario: Pricing page displays pricing plan cards
    Then pricing plan cards should be displayed
    And at least three pricing plans should be visible
    And pricing cards should be arranged in a row

  Scenario: Pricing cards show complete information
    When I view a pricing plan card
    Then it should display the plan title
    And it should display the plan price
    And it should display the currency symbol
    And it should display plan description
    And it should have a call-to-action button

  Scenario: Pricing cards are properly formatted
    Then each pricing card should have proper spacing
    And pricing information should be clearly visible
    And all prices should be clearly displayed
    And all descriptions should be readable

  Scenario: Featured pricing plan is highlighted
    Then the featured pricing plan should be visually distinct
    And the featured plan should stand out from others
    And the featured plan styling should be consistent

  Scenario: Multiple pricing tiers are available
    Then at least three pricing plans should be shown
    And pricing plans should be clearly differentiated
    And pricing plans should be properly aligned
    And each plan should be independent

  Scenario: Pricing cards are interactive
    When I hover over a pricing card
    Then the card should have visual feedback
    And the call-to-action button should be highlighted

  Scenario: Pricing page is responsive
    When I resize the window to mobile size
    Then pricing cards should be responsive
    And cards should stack vertically on mobile
    And all pricing information should be readable
    When I resize the window to desktop size
    Then pricing cards should display in row format

  Scenario: Pricing page loads asynchronously
    Then the page should load pricing plan data
    And all pricing cards should render successfully
    And pricing information should be complete
