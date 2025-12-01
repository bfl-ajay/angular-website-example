Feature: Navigation and Page Layout
  As a user
  I want to navigate through the website
  So that I can access different sections

  Background:
    Given I am on the home page

  Scenario: User can navigate to About page
    When I click on the About navigation link
    Then I should be on the About page

  Scenario: User can navigate to Gallery page
    When I click on the Gallery navigation link
    Then I should be on the Gallery page

  Scenario: User can navigate to Services page
    When I click on the Services navigation link
    Then I should be on the Services page

  Scenario: User can navigate to Clients page
    When I click on the Clients navigation link
    Then I should be on the Clients page

  Scenario: User can navigate to Pricing page
    When I click on the Pricing navigation link
    Then I should be on the Pricing page

  Scenario: User can navigate to Testimonials page
    When I click on the Testimonials navigation link
    Then I should be on the Testimonials page

  Scenario: User can return to home page
    Given I am on the About page
    When I click on the Home navigation link
    Then I should be on the home page

  Scenario: Navigation menu is visible
    Then the navigation menu should be visible
    And all navigation links should be accessible
