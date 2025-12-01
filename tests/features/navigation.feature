Feature: Navigation and Page Layout
  As a user
  I want to navigate through the website
  So that I can access different sections and explore content

  Background:
    Given I am on the home page

  Scenario: Navigation menu is accessible from all pages
    Then the navigation menu should be visible
    And all navigation links should be accessible
    And the navigation should have proper styling

  Scenario: User can navigate to About page
    When I click on the About navigation link
    Then I should be on the About page
    And the About page content should load
    And introduction section should be visible

  Scenario: User can navigate to Gallery page
    When I click on the Gallery navigation link
    Then I should be on the Gallery page
    And gallery images should be loaded
    And the gallery section should be visible

  Scenario: User can navigate to Services page
    When I click on the Services navigation link
    Then I should be on the Services page
    And service content should be visible
    And testimonial section should be displayed

  Scenario: User can navigate to Clients page
    When I click on the Clients navigation link
    Then I should be on the Clients page
    And client logos should be displayed
    And client section should be visible

  Scenario: User can navigate to Pricing page
    When I click on the Pricing navigation link
    Then I should be on the Pricing page
    And pricing plans should be listed
    And pricing cards should be visible

  Scenario: User can navigate to Testimonials page
    When I click on the Testimonials navigation link
    Then I should be on the Testimonials page
    And testimonial cards should be visible
    And testimonial content should be loaded

  Scenario: User can return to home page
    Given I am on the About page
    When I click on the Home navigation link
    Then I should be on the home page
    And the hero banner should be visible

  Scenario: Navigation links are properly labeled
    Then all navigation links should have text labels
    And navigation links should be descriptive
    And navigation menu structure should be logical

  Scenario: Page navigation is responsive
    When I resize the window to mobile size
    Then the navigation should adapt to mobile
    And navigation menu should be accessible on mobile
    When I resize the window to desktop size
    Then navigation should display in full layout

  Scenario: Navigation maintains active state
    When I navigate to a page
    Then the corresponding navigation link should be active
    And active link should be visually highlighted
    And active state should be maintained on page

  Scenario: User receives 404 for non-existent page
    Given I navigate to a non-existent page
    Then I should see the not found page
    And an error message should be displayed
    And I should have option to navigate back

  Scenario: All page links are working
    When I navigate through all page links
    Then all pages should load successfully
    And no broken links should be found
    And page transitions should be smooth
