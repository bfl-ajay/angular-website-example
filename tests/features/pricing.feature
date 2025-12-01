Feature: Pricing Page
  As a user
  I want to view pricing plans
  So that I can understand the pricing options

  Background:
    Given I navigate to the Pricing page

  Scenario: Pricing page displays section information
    Then the page should display section heading
    And the section should display company description

  Scenario: Pricing page displays pricing plans
    Then pricing plan cards should be displayed
    And at least three pricing plans should be visible

  Scenario: Pricing cards show complete information
    When I view a pricing plan card
    Then it should display the plan title
    And it should display the price
    And it should have a call-to-action button
