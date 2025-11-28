Feature: Pricing Page
  As a user
  I want to view pricing plans
  So that I can understand the pricing options available

  Scenario: Pricing page displays pricing plans
    Given I navigate to the Pricing page
    Then pricing plan cards should be displayed
    And at least one pricing plan should be visible

  Scenario: Pricing cards show complete information
    Given I navigate to the Pricing page
    When I view a pricing plan card
    Then it should display the plan name
    And it should display the price
    And it should display plan features
    And it should have a call-to-action button

  Scenario: Multiple pricing tiers are available
    Given I navigate to the Pricing page
    Then at least two pricing plans should be shown
    And pricing plans should be clearly differentiated
    And pricing plans should be properly aligned

  Scenario: Pricing page is responsive
    Given I navigate to the Pricing page with mobile viewport
    Then pricing cards should be responsive
    And cards should stack vertically on mobile
    And all text should be readable on mobile devices
