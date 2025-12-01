Feature: About Page
  As a user
  I want to view information about the company
  So that I can understand their background and features

  Background:
    Given I navigate to the About page

  Scenario: About page displays introduction section
    Then the page should have an introduction section
    And the section should display a tagline
    And the section should display the company title
    And the section should display company description

  Scenario: About page displays features section
    When I view the features section
    Then feature blocks should be displayed
    And at least two feature blocks should be visible

  Scenario: Feature blocks have complete information
    When I view the features section
    Then each feature block should have an icon
    And each feature block should have a title
    And each feature block should have descriptive text

  Scenario: Feature blocks are properly formatted
    When I view the features section
    Then feature blocks should be aligned properly
    And feature icons should be visible
    And all feature titles should be readable

  Scenario: About page layout is responsive
    When I resize the window to mobile size
    Then the introduction section should be visible
    And feature blocks should be visible
    When I resize the window to desktop size
    Then the about section layout should be correct

  Scenario: About page content is loaded asynchronously
    Then the page should load introduction data
    And the page should load features data
    And all content should be properly rendered

  Scenario: Feature block styling and spacing
    When I view the features section
    Then each feature block should have proper spacing
    And feature block descriptions should wrap correctly
    And feature icons should be centered
