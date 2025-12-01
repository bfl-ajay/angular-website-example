Feature: Clients Page
  As a user
  I want to view client information
  So that I can see who the company works with

  Background:
    Given I navigate to the Clients page

  Scenario: Clients page displays introduction
    Then the page should display section heading
    And the section should display company description

  Scenario: Clients page displays company logos
    Then company logos should be displayed
    And at least three company logos should be visible

  Scenario: Client information is complete
    When I view the clients section
    Then each company block should have a logo
    And each company block should display company name
