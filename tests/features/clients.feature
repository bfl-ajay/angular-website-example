Feature: Clients Page
  As a user
  I want to view client information
  So that I can see who the company works with

  Scenario: Clients page displays company logos
    Given I navigate to the Clients page
    Then company logos should be displayed
    And at least one company logo should be visible

  Scenario: Client logos are organized in blocks
    Given I navigate to the Clients page
    When I view the clients section
    Then client logos should be grouped in blocks
    And each block should have a company name

  Scenario: Clients page shows multiple companies
    Given I navigate to the Clients page
    Then at least two client companies should be displayed
    And each client should have proper formatting

  Scenario: Clients page is responsive
    Given I navigate to the Clients page with mobile viewport
    Then client logos should be responsive
    And logos should scale appropriately on mobile
