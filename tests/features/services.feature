Feature: Services Page
  As a user
  I want to view available services
  So that I can understand what services are offered

  Background:
    Given I navigate to the Services page

  Scenario: Services page displays section information
    Then the page should display section heading
    And the section should display company description

  Scenario: Services page displays testimonial
    Then the page should display a testimonial section
    And the testimonial should contain customer quote

  Scenario: Services page displays content
    Then the page should display service-related image
    And there should be descriptive content about services
