Feature: About Page
  As a user
  I want to view information about the company
  So that I can understand their background and features

  Scenario: About page displays company information
    Given I navigate to the About page
    Then the page should have an introduction section
    And the page should display company description

  Scenario: About page displays features
    Given I navigate to the About page
    When I view the features section
    Then feature blocks should be displayed
    And each feature should have an icon and description

  Scenario: Feature blocks are properly formatted
    Given I navigate to the About page
    When I view the features section
    Then each feature block should have a title
    And each feature block should have descriptive text
    And feature blocks should be aligned in a grid
