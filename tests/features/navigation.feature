Feature: Navigation and Page Layout
  As a user
  I want to navigate through the website
  So that I can access different sections

  Scenario: User can access the home page
    Given I navigate to the home page
    Then the page title should contain "Home"
    And the navigation menu should be visible

  Scenario: User can navigate to About page
    Given I am on the home page
    When I click on the About navigation link
    Then I should be on the About page
    And the page should display about content

  Scenario: User can navigate to Gallery page
    Given I am on the home page
    When I click on the Gallery navigation link
    Then I should be on the Gallery page
    And gallery images should be loaded

  Scenario: User can navigate to Services page
    Given I am on the home page
    When I click on the Services navigation link
    Then I should be on the Services page
    And service cards should be visible

  Scenario: User can navigate to Clients page
    Given I am on the home page
    When I click on the Clients navigation link
    Then I should be on the Clients page
    And client logos should be displayed

  Scenario: User can navigate to Pricing page
    Given I am on the home page
    When I click on the Pricing navigation link
    Then I should be on the Pricing page
    And pricing plans should be listed

  Scenario: User can navigate to Testimonials page
    Given I am on the home page
    When I click on the Testimonials navigation link
    Then I should be on the Testimonials page
    And testimonial cards should be visible

  Scenario: User can access non-existent page
    Given I navigate to a non-existent page
    Then I should see the not found page
    And an error message should be displayed
