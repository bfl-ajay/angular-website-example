Feature: Services Page
  As a user
  I want to view available services
  So that I can understand what services are offered

  Scenario: Services page displays service cards
    Given I navigate to the Services page
    Then service cards should be displayed
    And each service card should have a title
    And each service card should have a description

  Scenario: Service cards have proper information
    Given I navigate to the Services page
    When I view the service cards
    Then each card should have an icon
    And each card should have a service name
    And each card should have service details

  Scenario: Services page is responsive
    Given I navigate to the Services page with mobile viewport
    Then service cards should stack vertically
    And cards should be properly formatted for mobile
    And all content should be readable on mobile
