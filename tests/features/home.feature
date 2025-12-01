Feature: Home Page
  As a visitor
  I want to view the home page
  So that I can understand the website purpose and navigate through the site

  Background:
    Given I navigate to the home page

  Scenario: Home page displays complete hero banner
    Then the hero banner should be visible
    And the header title should be displayed
    And the header description should be displayed
    And the header call-to-action button should be visible

  Scenario: Home page banner has background image
    Then the banner should have a background image
    And the banner content should be properly positioned

  Scenario: Home page displays footer information
    When I scroll to the bottom of the page
    Then the footer should be visible
    And the footer should contain copyright information
    And the footer should contain company information

  Scenario: Home page has functional social media links
    When I scroll to the footer section
    Then social media icons should be displayed
    And at least two social media links should be present
    And social media links should be clickable

  Scenario: Home page navigation is accessible
    Then the main navigation menu should be visible
    And all navigation links should be accessible
    And the navigation should be fixed or sticky

  Scenario: Home page is responsive
    When I resize the window to mobile size
    Then the hero banner should still be visible
    And the footer should be visible on mobile
    When I resize the window to desktop size
    Then the page layout should adjust appropriately

  Scenario: Home page loads all async data
    Then the page header data should load successfully
    And all page elements should render without errors
