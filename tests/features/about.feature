Feature: About Page
  As a user
  I want to view company information
  So that I can understand their background

  Background:
    Given I navigate to the About page

  Scenario: About page displays introduction
    Then the page should have an introduction section
    And the section should display a tagline
    And the page should display company description

  Scenario: About page displays features
    When I view the features section
    Then feature blocks should be displayed
    And at least two feature blocks should be visible

  Scenario: Feature blocks have information
    When I view the features section
    Then each feature block should have an icon
    And each feature block should have a title
    And each feature block should have descriptive text
